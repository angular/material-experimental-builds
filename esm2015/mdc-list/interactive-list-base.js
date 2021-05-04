/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { MDCListFoundation } from '@material/list';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatListBase } from './list-base';
/** @docs-private */
export class MatInteractiveListBase extends MatListBase {
    constructor(_element, document) {
        super();
        this._element = _element;
        this._itemsArr = [];
        this._subscriptions = new Subscription();
        this._document = document;
        this._isNonInteractive = false;
    }
    _handleKeydown(event) {
        const index = this._indexForElement(event.target);
        this._foundation.handleKeydown(event, this._elementAtIndex(index) === event.target, index);
    }
    _handleClick(event) {
        // The `toggleCheckbox` parameter can always be `true` as it only has an effect if the list
        // is recognized as checkbox selection list. For such lists, we would always want to toggle
        // the checkbox on list item click. MDC added this parameter so that they can avoid dispatching
        // a fake `change` event when the checkbox is directly clicked for the list item. We don't
        // need this as we require such list item checkboxes to stop propagation of the change event.
        // https://github.com/material-components/material-components-web/blob/08ca4d0ec5f359bc3a20bd2a302fa6b733b5e135/packages/mdc-list/component.ts#L308-L310
        this._foundation.handleClick(this._indexForElement(event.target), 
        /* toggleCheckbox */ true);
    }
    _handleFocusin(event) {
        var _a;
        const itemIndex = this._indexForElement(event.target);
        const tabIndex = (_a = this._itemsArr[itemIndex]) === null || _a === void 0 ? void 0 : _a._hostElement.tabIndex;
        // If the newly focused item is not the designated item that should have received focus
        // first through keyboard interaction, the tabindex of the previously designated list item
        // needs to be cleared, so that only one list item is reachable through tab key at any time.
        // MDC sets a tabindex for the newly focused item, so we do not need to set a tabindex for it.
        // Workaround for: https://github.com/material-components/material-components-web/issues/6363.
        if (tabIndex === undefined || tabIndex === -1) {
            this._clearTabindexForAllItems();
        }
        this._foundation.handleFocusIn(itemIndex);
    }
    _handleFocusout(event) {
        this._foundation.handleFocusOut(this._indexForElement(event.target));
    }
    _initWithAdapter(adapter) {
        this._adapter = adapter;
        this._foundation = new MDCListFoundation(adapter);
    }
    ngAfterViewInit() {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this._foundation) {
            throw Error('MDC list foundation not initialized for Angular Material list.');
        }
        this._foundation.init();
        this._watchListItems();
        // Enable typeahead and focus wrapping for interactive lists.
        this._foundation.setHasTypeahead(true);
        this._foundation.setWrapFocus(true);
    }
    ngOnDestroy() {
        this._foundation.destroy();
        this._subscriptions.unsubscribe();
    }
    _watchListItems() {
        this._subscriptions.add(this._items.changes.pipe(startWith(null)).subscribe(() => {
            this._itemsArr = this._items.toArray();
            // Whenever the items change, the foundation needs to be notified through the `layout`
            // method. It caches items for the typeahead and detects the list type based on the items.
            this._foundation.layout();
            // The list items changed, so we reset the tabindex for all items and
            // designate one list item that will be reachable through tab.
            this._resetTabindexToFirstSelectedOrFocusedItem();
        }));
    }
    /**
     * Clears the tabindex of all items so that no items are reachable through tab key.
     * MDC intends to always have only one tabbable item that will receive focus first.
     * This first item is selected by MDC automatically on blur or by manually invoking
     * the `setTabindexToFirstSelectedOrFocusedItem` method.
     */
    _clearTabindexForAllItems() {
        for (let items of this._itemsArr) {
            items._hostElement.setAttribute('tabindex', '-1');
        }
    }
    /**
     * Resets tabindex for all options and sets tabindex for the first selected option or
     * previously focused item so that an item can be reached when users tab into the list.
     */
    _resetTabindexToFirstSelectedOrFocusedItem() {
        this._clearTabindexForAllItems();
        // MDC does not expose the method for setting the tabindex to the first selected
        // or previously focused item. We can still access the method as private class
        // members are accessible in the transpiled JavaScript. Tracked upstream with:
        // TODO: https://github.com/material-components/material-components-web/issues/6375
        this._foundation.setTabindexToFirstSelectedOrFocusedItem();
    }
    _elementAtIndex(index) {
        var _a;
        return (_a = this._itemsArr[index]) === null || _a === void 0 ? void 0 : _a._hostElement;
    }
    _indexForElement(element) {
        return element ?
            this._itemsArr.findIndex(i => i._hostElement.contains(element)) : -1;
    }
}
MatInteractiveListBase.decorators = [
    { type: Directive }
];
MatInteractiveListBase.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MatInteractiveListBase.propDecorators = {
    _handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    _handleClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    _handleFocusin: [{ type: HostListener, args: ['focusin', ['$event'],] }],
    _handleFocusout: [{ type: HostListener, args: ['focusout', ['$event'],] }]
};
// TODO: replace with class once material-components-web/pull/6256 is available.
/** Gets an instance of `MDcListAdapter` for the given interactive list. */
export function getInteractiveListAdapter(list) {
    return {
        getListItemCount() {
            return list._items.length;
        },
        listItemAtIndexHasClass(index, className) {
            const element = list._elementAtIndex(index);
            return element ? element.classList.contains(className) : false;
        },
        addClassForElementIndex(index, className) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.classList.add(className);
        },
        removeClassForElementIndex(index, className) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.classList.remove(className);
        },
        getAttributeForElementIndex(index, attr) {
            const element = list._elementAtIndex(index);
            return element ? element.getAttribute(attr) : null;
        },
        setAttributeForElementIndex(index, attr, value) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.setAttribute(attr, value);
        },
        getFocusedElementIndex() {
            var _a;
            return list._indexForElement((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
        },
        isFocusInsideList() {
            var _a;
            return list._element.nativeElement.contains((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
        },
        isRootFocused() {
            var _a;
            return list._element.nativeElement === ((_a = list._document) === null || _a === void 0 ? void 0 : _a.activeElement);
        },
        focusItemAtIndex(index) {
            var _a;
            (_a = list._elementAtIndex(index)) === null || _a === void 0 ? void 0 : _a.focus();
        },
        // Gets the text for a list item for the typeahead
        getPrimaryTextAtIndex(index) {
            return list._itemsArr[index]._getItemLabel();
        },
        // MDC uses this method to disable focusable children of list items. However, we believe that
        // this is not an accessible pattern and should be avoided, therefore we intentionally do not
        // implement this method. In addition, implementing this would require violating Angular
        // Material's general principle of not having components modify DOM elements they do not own.
        // A user who feels they really need this feature can simply listen to the `(focus)` and
        // `(blur)` events on the list item and enable/disable focus on the children themselves as
        // appropriate.
        setTabIndexForListItemChildren() { },
        // The following methods have a dummy implementation in the base class because they are only
        // applicable to certain types of lists. They should be implemented for the concrete classes
        // where they are applicable.
        hasCheckboxAtIndex() { return false; },
        hasRadioAtIndex(index) { return false; },
        setCheckedCheckboxOrRadioAtIndex(index, checked) { },
        isCheckboxCheckedAtIndex(index) { return false; },
        notifyAction() { },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUtbGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9pbnRlcmFjdGl2ZS1saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBR1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBR3pELG9CQUFvQjtBQUNwQixNQUFNLE9BQWdCLHNCQUNwQixTQUFRLFdBQVc7SUFxRG5CLFlBQTZCLFFBQWlDLEVBQ3RCLFFBQWE7UUFDbkQsS0FBSyxFQUFFLENBQUM7UUFGbUIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFSOUQsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQU1aLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUsxQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUF2REQsY0FBYyxDQUFDLEtBQW9CO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBcUIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLGVB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QyxRQUFRLENBQUMsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxhQUFhLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBQ0QsYUFBYTs7WUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxNQUFLLE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsYUFBYSxDQUFBLENBQUM7UUFDdkUsQ0FBQztRQUNELGdCQUFnQixDQUFDLEtBQWE7O1lBQzVCLE1BQUEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsMENBQUUsS0FBSyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUNELGtEQUFrRDtRQUNsRCxxQkFBcUIsQ0FBQyxLQUFhO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQyxDQUFDO1FBRUQsNkZBQTZGO1FBQzdGLDZGQUE2RjtRQUM3Rix3RkFBd0Y7UUFDeEYsNkZBQTZGO1FBQzdGLHdGQUF3RjtRQUN4RiwwRkFBMEY7UUFDMUYsZUFBZTtRQUNmLDhCQUE4QixLQUFJLENBQUM7UUFFbkMsNEZBQTRGO1FBQzVGLDRGQUE0RjtRQUM1Riw2QkFBNkI7UUFDN0Isa0JBQWtCLEtBQUssT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLGVBQWUsQ0FBQyxLQUFhLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hELGdDQUFnQyxDQUFDLEtBQWEsRUFBRSxPQUFnQixJQUFHLENBQUM7UUFDcEUsd0JBQXdCLENBQUMsS0FBYSxJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RCxZQUFZLEtBQUksQ0FBQztLQUNsQixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ0xpc3RBZGFwdGVyLCBNRENMaXN0Rm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0TGlzdEJhc2UsIE1hdExpc3RJdGVtQmFzZX0gZnJvbSAnLi9saXN0LWJhc2UnO1xuXG5ARGlyZWN0aXZlKClcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0SW50ZXJhY3RpdmVMaXN0QmFzZTxUIGV4dGVuZHMgTWF0TGlzdEl0ZW1CYXNlPlxuICBleHRlbmRzIE1hdExpc3RCYXNlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlS2V5ZG93bihcbiAgICAgIGV2ZW50LCB0aGlzLl9lbGVtZW50QXRJbmRleChpbmRleCkgPT09IGV2ZW50LnRhcmdldCwgaW5kZXgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBfaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAvLyBUaGUgYHRvZ2dsZUNoZWNrYm94YCBwYXJhbWV0ZXIgY2FuIGFsd2F5cyBiZSBgdHJ1ZWAgYXMgaXQgb25seSBoYXMgYW4gZWZmZWN0IGlmIHRoZSBsaXN0XG4gICAgLy8gaXMgcmVjb2duaXplZCBhcyBjaGVja2JveCBzZWxlY3Rpb24gbGlzdC4gRm9yIHN1Y2ggbGlzdHMsIHdlIHdvdWxkIGFsd2F5cyB3YW50IHRvIHRvZ2dsZVxuICAgIC8vIHRoZSBjaGVja2JveCBvbiBsaXN0IGl0ZW0gY2xpY2suIE1EQyBhZGRlZCB0aGlzIHBhcmFtZXRlciBzbyB0aGF0IHRoZXkgY2FuIGF2b2lkIGRpc3BhdGNoaW5nXG4gICAgLy8gYSBmYWtlIGBjaGFuZ2VgIGV2ZW50IHdoZW4gdGhlIGNoZWNrYm94IGlzIGRpcmVjdGx5IGNsaWNrZWQgZm9yIHRoZSBsaXN0IGl0ZW0uIFdlIGRvbid0XG4gICAgLy8gbmVlZCB0aGlzIGFzIHdlIHJlcXVpcmUgc3VjaCBsaXN0IGl0ZW0gY2hlY2tib3hlcyB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjaGFuZ2UgZXZlbnQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi8wOGNhNGQwZWM1ZjM1OWJjM2EyMGJkMmEzMDJmYTZiNzMzYjVlMTM1L3BhY2thZ2VzL21kYy1saXN0L2NvbXBvbmVudC50cyNMMzA4LUwzMTBcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUNsaWNrKHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLFxuICAgICAgLyogdG9nZ2xlQ2hlY2tib3ggKi8gdHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1c2luJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUZvY3VzaW4oZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICBjb25zdCB0YWJJbmRleCA9IHRoaXMuX2l0ZW1zQXJyW2l0ZW1JbmRleF0/Ll9ob3N0RWxlbWVudC50YWJJbmRleDtcblxuICAgIC8vIElmIHRoZSBuZXdseSBmb2N1c2VkIGl0ZW0gaXMgbm90IHRoZSBkZXNpZ25hdGVkIGl0ZW0gdGhhdCBzaG91bGQgaGF2ZSByZWNlaXZlZCBmb2N1c1xuICAgIC8vIGZpcnN0IHRocm91Z2gga2V5Ym9hcmQgaW50ZXJhY3Rpb24sIHRoZSB0YWJpbmRleCBvZiB0aGUgcHJldmlvdXNseSBkZXNpZ25hdGVkIGxpc3QgaXRlbVxuICAgIC8vIG5lZWRzIHRvIGJlIGNsZWFyZWQsIHNvIHRoYXQgb25seSBvbmUgbGlzdCBpdGVtIGlzIHJlYWNoYWJsZSB0aHJvdWdoIHRhYiBrZXkgYXQgYW55IHRpbWUuXG4gICAgLy8gTURDIHNldHMgYSB0YWJpbmRleCBmb3IgdGhlIG5ld2x5IGZvY3VzZWQgaXRlbSwgc28gd2UgZG8gbm90IG5lZWQgdG8gc2V0IGEgdGFiaW5kZXggZm9yIGl0LlxuICAgIC8vIFdvcmthcm91bmQgZm9yOiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9pc3N1ZXMvNjM2My5cbiAgICBpZiAodGFiSW5kZXggPT09IHVuZGVmaW5lZCB8fCB0YWJJbmRleCA9PT0gLTEpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGFiaW5kZXhGb3JBbGxJdGVtcygpO1xuICAgIH1cblxuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlRm9jdXNJbihpdGVtSW5kZXgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnLCBbJyRldmVudCddKVxuICBfaGFuZGxlRm9jdXNvdXQoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUZvY3VzT3V0KHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKTtcbiAgfVxuXG4gIC8qKiBJdGVtcyBpbiB0aGUgaW50ZXJhY3RpdmUgbGlzdC4gKi9cbiAgYWJzdHJhY3QgX2l0ZW1zOiBRdWVyeUxpc3Q8VD47XG4gIF9pdGVtc0FycjogVFtdID0gW107XG4gIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgcHJvdGVjdGVkIF9mb3VuZGF0aW9uOiBNRENMaXN0Rm91bmRhdGlvbjtcbiAgcHJvdGVjdGVkIF9hZGFwdGVyOiBNRENMaXN0QWRhcHRlcjtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLl9pc05vbkludGVyYWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2luaXRXaXRoQWRhcHRlcihhZGFwdGVyOiBNRENMaXN0QWRhcHRlcikge1xuICAgIHRoaXMuX2FkYXB0ZXIgPSBhZGFwdGVyO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDTGlzdEZvdW5kYXRpb24oYWRhcHRlcik7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmICF0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aHJvdyBFcnJvcignTURDIGxpc3QgZm91bmRhdGlvbiBub3QgaW5pdGlhbGl6ZWQgZm9yIEFuZ3VsYXIgTWF0ZXJpYWwgbGlzdC4nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLl93YXRjaExpc3RJdGVtcygpO1xuXG4gICAgLy8gRW5hYmxlIHR5cGVhaGVhZCBhbmQgZm9jdXMgd3JhcHBpbmcgZm9yIGludGVyYWN0aXZlIGxpc3RzLlxuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0SGFzVHlwZWFoZWFkKHRydWUpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0V3JhcEZvY3VzKHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF93YXRjaExpc3RJdGVtcygpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9pdGVtcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5faXRlbXNBcnIgPSB0aGlzLl9pdGVtcy50b0FycmF5KCk7XG4gICAgICAvLyBXaGVuZXZlciB0aGUgaXRlbXMgY2hhbmdlLCB0aGUgZm91bmRhdGlvbiBuZWVkcyB0byBiZSBub3RpZmllZCB0aHJvdWdoIHRoZSBgbGF5b3V0YFxuICAgICAgLy8gbWV0aG9kLiBJdCBjYWNoZXMgaXRlbXMgZm9yIHRoZSB0eXBlYWhlYWQgYW5kIGRldGVjdHMgdGhlIGxpc3QgdHlwZSBiYXNlZCBvbiB0aGUgaXRlbXMuXG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpO1xuXG4gICAgICAvLyBUaGUgbGlzdCBpdGVtcyBjaGFuZ2VkLCBzbyB3ZSByZXNldCB0aGUgdGFiaW5kZXggZm9yIGFsbCBpdGVtcyBhbmRcbiAgICAgIC8vIGRlc2lnbmF0ZSBvbmUgbGlzdCBpdGVtIHRoYXQgd2lsbCBiZSByZWFjaGFibGUgdGhyb3VnaCB0YWIuXG4gICAgICB0aGlzLl9yZXNldFRhYmluZGV4VG9GaXJzdFNlbGVjdGVkT3JGb2N1c2VkSXRlbSgpO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHRhYmluZGV4IG9mIGFsbCBpdGVtcyBzbyB0aGF0IG5vIGl0ZW1zIGFyZSByZWFjaGFibGUgdGhyb3VnaCB0YWIga2V5LlxuICAgKiBNREMgaW50ZW5kcyB0byBhbHdheXMgaGF2ZSBvbmx5IG9uZSB0YWJiYWJsZSBpdGVtIHRoYXQgd2lsbCByZWNlaXZlIGZvY3VzIGZpcnN0LlxuICAgKiBUaGlzIGZpcnN0IGl0ZW0gaXMgc2VsZWN0ZWQgYnkgTURDIGF1dG9tYXRpY2FsbHkgb24gYmx1ciBvciBieSBtYW51YWxseSBpbnZva2luZ1xuICAgKiB0aGUgYHNldFRhYmluZGV4VG9GaXJzdFNlbGVjdGVkT3JGb2N1c2VkSXRlbWAgbWV0aG9kLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2xlYXJUYWJpbmRleEZvckFsbEl0ZW1zKCkge1xuICAgIGZvciAobGV0IGl0ZW1zIG9mIHRoaXMuX2l0ZW1zQXJyKSB7XG4gICAgICBpdGVtcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGFiaW5kZXggZm9yIGFsbCBvcHRpb25zIGFuZCBzZXRzIHRhYmluZGV4IGZvciB0aGUgZmlyc3Qgc2VsZWN0ZWQgb3B0aW9uIG9yXG4gICAqIHByZXZpb3VzbHkgZm9jdXNlZCBpdGVtIHNvIHRoYXQgYW4gaXRlbSBjYW4gYmUgcmVhY2hlZCB3aGVuIHVzZXJzIHRhYiBpbnRvIHRoZSBsaXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9yZXNldFRhYmluZGV4VG9GaXJzdFNlbGVjdGVkT3JGb2N1c2VkSXRlbSgpIHtcbiAgICB0aGlzLl9jbGVhclRhYmluZGV4Rm9yQWxsSXRlbXMoKTtcbiAgICAvLyBNREMgZG9lcyBub3QgZXhwb3NlIHRoZSBtZXRob2QgZm9yIHNldHRpbmcgdGhlIHRhYmluZGV4IHRvIHRoZSBmaXJzdCBzZWxlY3RlZFxuICAgIC8vIG9yIHByZXZpb3VzbHkgZm9jdXNlZCBpdGVtLiBXZSBjYW4gc3RpbGwgYWNjZXNzIHRoZSBtZXRob2QgYXMgcHJpdmF0ZSBjbGFzc1xuICAgIC8vIG1lbWJlcnMgYXJlIGFjY2Vzc2libGUgaW4gdGhlIHRyYW5zcGlsZWQgSmF2YVNjcmlwdC4gVHJhY2tlZCB1cHN0cmVhbSB3aXRoOlxuICAgIC8vIFRPRE86IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy82Mzc1XG4gICAgKHRoaXMuX2ZvdW5kYXRpb24gYXMgYW55KS5zZXRUYWJpbmRleFRvRmlyc3RTZWxlY3RlZE9yRm9jdXNlZEl0ZW0oKTtcbiAgfVxuXG4gIF9lbGVtZW50QXRJbmRleChpbmRleDogbnVtYmVyKTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXNBcnJbaW5kZXhdPy5faG9zdEVsZW1lbnQ7XG4gIH1cblxuICBfaW5kZXhGb3JFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZWxlbWVudCA/XG4gICAgICB0aGlzLl9pdGVtc0Fyci5maW5kSW5kZXgoaSA9PiBpLl9ob3N0RWxlbWVudC5jb250YWlucyhlbGVtZW50KSkgOiAtMTtcbiAgfVxufVxuXG4vLyBUT0RPOiByZXBsYWNlIHdpdGggY2xhc3Mgb25jZSBtYXRlcmlhbC1jb21wb25lbnRzLXdlYi9wdWxsLzYyNTYgaXMgYXZhaWxhYmxlLlxuLyoqIEdldHMgYW4gaW5zdGFuY2Ugb2YgYE1EY0xpc3RBZGFwdGVyYCBmb3IgdGhlIGdpdmVuIGludGVyYWN0aXZlIGxpc3QuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50ZXJhY3RpdmVMaXN0QWRhcHRlcihcbiAgICBsaXN0OiBNYXRJbnRlcmFjdGl2ZUxpc3RCYXNlPE1hdExpc3RJdGVtQmFzZT4pOiBNRENMaXN0QWRhcHRlciB7XG4gIHJldHVybiB7XG4gICAgZ2V0TGlzdEl0ZW1Db3VudCgpIHtcbiAgICAgIHJldHVybiBsaXN0Ll9pdGVtcy5sZW5ndGg7XG4gICAgfSxcbiAgICBsaXN0SXRlbUF0SW5kZXhIYXNDbGFzcyhpbmRleDogbnVtYmVyLCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KTtcbiAgICAgIHJldHVybiBlbGVtZW50ID8gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6IGZhbHNlO1xuICAgIH0sXG4gICAgYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXgoaW5kZXg6IG51bWJlciwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0sXG4gICAgcmVtb3ZlQ2xhc3NGb3JFbGVtZW50SW5kZXgoaW5kZXg6IG51bWJlciwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH0sXG4gICAgZ2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGF0dHI6IHN0cmluZykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KTtcbiAgICAgIHJldHVybiBlbGVtZW50ID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cikgOiBudWxsO1xuICAgIH0sXG4gICAgc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGF0dHI6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgbGlzdC5fZWxlbWVudEF0SW5kZXgoaW5kZXgpPy5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgIH0sXG4gICAgZ2V0Rm9jdXNlZEVsZW1lbnRJbmRleCgpIHtcbiAgICAgIHJldHVybiBsaXN0Ll9pbmRleEZvckVsZW1lbnQobGlzdC5fZG9jdW1lbnQ/LmFjdGl2ZUVsZW1lbnQpO1xuICAgIH0sXG4gICAgaXNGb2N1c0luc2lkZUxpc3QoKSB7XG4gICAgICByZXR1cm4gbGlzdC5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGxpc3QuX2RvY3VtZW50Py5hY3RpdmVFbGVtZW50KTtcbiAgICB9LFxuICAgIGlzUm9vdEZvY3VzZWQoKSB7XG4gICAgICByZXR1cm4gbGlzdC5fZWxlbWVudC5uYXRpdmVFbGVtZW50ID09PSBsaXN0Ll9kb2N1bWVudD8uYWN0aXZlRWxlbWVudDtcbiAgICB9LFxuICAgIGZvY3VzSXRlbUF0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgbGlzdC5fZWxlbWVudEF0SW5kZXgoaW5kZXgpPy5mb2N1cygpO1xuICAgIH0sXG4gICAgLy8gR2V0cyB0aGUgdGV4dCBmb3IgYSBsaXN0IGl0ZW0gZm9yIHRoZSB0eXBlYWhlYWRcbiAgICBnZXRQcmltYXJ5VGV4dEF0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgcmV0dXJuIGxpc3QuX2l0ZW1zQXJyW2luZGV4XS5fZ2V0SXRlbUxhYmVsKCk7XG4gICAgfSxcblxuICAgIC8vIE1EQyB1c2VzIHRoaXMgbWV0aG9kIHRvIGRpc2FibGUgZm9jdXNhYmxlIGNoaWxkcmVuIG9mIGxpc3QgaXRlbXMuIEhvd2V2ZXIsIHdlIGJlbGlldmUgdGhhdFxuICAgIC8vIHRoaXMgaXMgbm90IGFuIGFjY2Vzc2libGUgcGF0dGVybiBhbmQgc2hvdWxkIGJlIGF2b2lkZWQsIHRoZXJlZm9yZSB3ZSBpbnRlbnRpb25hbGx5IGRvIG5vdFxuICAgIC8vIGltcGxlbWVudCB0aGlzIG1ldGhvZC4gSW4gYWRkaXRpb24sIGltcGxlbWVudGluZyB0aGlzIHdvdWxkIHJlcXVpcmUgdmlvbGF0aW5nIEFuZ3VsYXJcbiAgICAvLyBNYXRlcmlhbCdzIGdlbmVyYWwgcHJpbmNpcGxlIG9mIG5vdCBoYXZpbmcgY29tcG9uZW50cyBtb2RpZnkgRE9NIGVsZW1lbnRzIHRoZXkgZG8gbm90IG93bi5cbiAgICAvLyBBIHVzZXIgd2hvIGZlZWxzIHRoZXkgcmVhbGx5IG5lZWQgdGhpcyBmZWF0dXJlIGNhbiBzaW1wbHkgbGlzdGVuIHRvIHRoZSBgKGZvY3VzKWAgYW5kXG4gICAgLy8gYChibHVyKWAgZXZlbnRzIG9uIHRoZSBsaXN0IGl0ZW0gYW5kIGVuYWJsZS9kaXNhYmxlIGZvY3VzIG9uIHRoZSBjaGlsZHJlbiB0aGVtc2VsdmVzIGFzXG4gICAgLy8gYXBwcm9wcmlhdGUuXG4gICAgc2V0VGFiSW5kZXhGb3JMaXN0SXRlbUNoaWxkcmVuKCkge30sXG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIG1ldGhvZHMgaGF2ZSBhIGR1bW15IGltcGxlbWVudGF0aW9uIGluIHRoZSBiYXNlIGNsYXNzIGJlY2F1c2UgdGhleSBhcmUgb25seVxuICAgIC8vIGFwcGxpY2FibGUgdG8gY2VydGFpbiB0eXBlcyBvZiBsaXN0cy4gVGhleSBzaG91bGQgYmUgaW1wbGVtZW50ZWQgZm9yIHRoZSBjb25jcmV0ZSBjbGFzc2VzXG4gICAgLy8gd2hlcmUgdGhleSBhcmUgYXBwbGljYWJsZS5cbiAgICBoYXNDaGVja2JveEF0SW5kZXgoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICBoYXNSYWRpb0F0SW5kZXgoaW5kZXg6IG51bWJlcikgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgc2V0Q2hlY2tlZENoZWNrYm94T3JSYWRpb0F0SW5kZXgoaW5kZXg6IG51bWJlciwgY2hlY2tlZDogYm9vbGVhbikge30sXG4gICAgaXNDaGVja2JveENoZWNrZWRBdEluZGV4KGluZGV4OiBudW1iZXIpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgIG5vdGlmeUFjdGlvbigpIHt9LFxuICB9O1xufVxuIl19