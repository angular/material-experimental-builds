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
        this._foundation.handleFocusIn(event, itemIndex);
    }
    _handleFocusout(event) {
        this._foundation.handleFocusOut(event, this._indexForElement(event.target));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUtbGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9pbnRlcmFjdGl2ZS1saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBR1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBR3pELG9CQUFvQjtBQUNwQixNQUFNLE9BQWdCLHNCQUNwQixTQUFRLFdBQVc7SUFxRG5CLFlBQTZCLFFBQWlDLEVBQ3RCLFFBQWE7UUFDbkQsS0FBSyxFQUFFLENBQUM7UUFGbUIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFSOUQsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQU1aLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUsxQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUF2REQsY0FBYyxDQUFDLEtBQW9CO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBcUIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLGVB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QyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxhQUFhOztZQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLE1BQUssTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxhQUFhLENBQUEsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsZ0JBQWdCLENBQUMsS0FBYTs7WUFDNUIsTUFBQSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQywwQ0FBRSxLQUFLLEVBQUUsQ0FBQztRQUN2QyxDQUFDO1FBQ0Qsa0RBQWtEO1FBQ2xELHFCQUFxQixDQUFDLEtBQWE7WUFDakMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFFRCw2RkFBNkY7UUFDN0YsNkZBQTZGO1FBQzdGLHdGQUF3RjtRQUN4Riw2RkFBNkY7UUFDN0Ysd0ZBQXdGO1FBQ3hGLDBGQUEwRjtRQUMxRixlQUFlO1FBQ2YsOEJBQThCLEtBQUksQ0FBQztRQUVuQyw0RkFBNEY7UUFDNUYsNEZBQTRGO1FBQzVGLDZCQUE2QjtRQUM3QixrQkFBa0IsS0FBSyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEMsZUFBZSxDQUFDLEtBQWEsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDaEQsZ0NBQWdDLENBQUMsS0FBYSxFQUFFLE9BQWdCLElBQUcsQ0FBQztRQUNwRSx3QkFBd0IsQ0FBQyxLQUFhLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pELFlBQVksS0FBSSxDQUFDO0tBQ2xCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDTGlzdEFkYXB0ZXIsIE1EQ0xpc3RGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRMaXN0QmFzZSwgTWF0TGlzdEl0ZW1CYXNlfSBmcm9tICcuL2xpc3QtYmFzZSc7XG5cbkBEaXJlY3RpdmUoKVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRJbnRlcmFjdGl2ZUxpc3RCYXNlPFQgZXh0ZW5kcyBNYXRMaXN0SXRlbUJhc2U+XG4gIGV4dGVuZHMgTWF0TGlzdEJhc2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXhGb3JFbGVtZW50KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVLZXlkb3duKFxuICAgICAgZXZlbnQsIHRoaXMuX2VsZW1lbnRBdEluZGV4KGluZGV4KSA9PT0gZXZlbnQudGFyZ2V0LCBpbmRleCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIFRoZSBgdG9nZ2xlQ2hlY2tib3hgIHBhcmFtZXRlciBjYW4gYWx3YXlzIGJlIGB0cnVlYCBhcyBpdCBvbmx5IGhhcyBhbiBlZmZlY3QgaWYgdGhlIGxpc3RcbiAgICAvLyBpcyByZWNvZ25pemVkIGFzIGNoZWNrYm94IHNlbGVjdGlvbiBsaXN0LiBGb3Igc3VjaCBsaXN0cywgd2Ugd291bGQgYWx3YXlzIHdhbnQgdG8gdG9nZ2xlXG4gICAgLy8gdGhlIGNoZWNrYm94IG9uIGxpc3QgaXRlbSBjbGljay4gTURDIGFkZGVkIHRoaXMgcGFyYW1ldGVyIHNvIHRoYXQgdGhleSBjYW4gYXZvaWQgZGlzcGF0Y2hpbmdcbiAgICAvLyBhIGZha2UgYGNoYW5nZWAgZXZlbnQgd2hlbiB0aGUgY2hlY2tib3ggaXMgZGlyZWN0bHkgY2xpY2tlZCBmb3IgdGhlIGxpc3QgaXRlbS4gV2UgZG9uJ3RcbiAgICAvLyBuZWVkIHRoaXMgYXMgd2UgcmVxdWlyZSBzdWNoIGxpc3QgaXRlbSBjaGVja2JveGVzIHRvIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNoYW5nZSBldmVudC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iLzA4Y2E0ZDBlYzVmMzU5YmMzYTIwYmQyYTMwMmZhNmI3MzNiNWUxMzUvcGFja2FnZXMvbWRjLWxpc3QvY29tcG9uZW50LnRzI0wzMDgtTDMxMFxuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlQ2xpY2sodGhpcy5faW5kZXhGb3JFbGVtZW50KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCksXG4gICAgICAvKiB0b2dnbGVDaGVja2JveCAqLyB0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nLCBbJyRldmVudCddKVxuICBfaGFuZGxlRm9jdXNpbihldmVudDogRm9jdXNFdmVudCkge1xuICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gdGhpcy5faXRlbXNBcnJbaXRlbUluZGV4XT8uX2hvc3RFbGVtZW50LnRhYkluZGV4O1xuXG4gICAgLy8gSWYgdGhlIG5ld2x5IGZvY3VzZWQgaXRlbSBpcyBub3QgdGhlIGRlc2lnbmF0ZWQgaXRlbSB0aGF0IHNob3VsZCBoYXZlIHJlY2VpdmVkIGZvY3VzXG4gICAgLy8gZmlyc3QgdGhyb3VnaCBrZXlib2FyZCBpbnRlcmFjdGlvbiwgdGhlIHRhYmluZGV4IG9mIHRoZSBwcmV2aW91c2x5IGRlc2lnbmF0ZWQgbGlzdCBpdGVtXG4gICAgLy8gbmVlZHMgdG8gYmUgY2xlYXJlZCwgc28gdGhhdCBvbmx5IG9uZSBsaXN0IGl0ZW0gaXMgcmVhY2hhYmxlIHRocm91Z2ggdGFiIGtleSBhdCBhbnkgdGltZS5cbiAgICAvLyBNREMgc2V0cyBhIHRhYmluZGV4IGZvciB0aGUgbmV3bHkgZm9jdXNlZCBpdGVtLCBzbyB3ZSBkbyBub3QgbmVlZCB0byBzZXQgYSB0YWJpbmRleCBmb3IgaXQuXG4gICAgLy8gV29ya2Fyb3VuZCBmb3I6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2lzc3Vlcy82MzYzLlxuICAgIGlmICh0YWJJbmRleCA9PT0gdW5kZWZpbmVkIHx8IHRhYkluZGV4ID09PSAtMSkge1xuICAgICAgdGhpcy5fY2xlYXJUYWJpbmRleEZvckFsbEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVGb2N1c0luKGV2ZW50LCBpdGVtSW5kZXgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnLCBbJyRldmVudCddKVxuICBfaGFuZGxlRm9jdXNvdXQoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUZvY3VzT3V0KGV2ZW50LCB0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSk7XG4gIH1cblxuICAvKiogSXRlbXMgaW4gdGhlIGludGVyYWN0aXZlIGxpc3QuICovXG4gIGFic3RyYWN0IF9pdGVtczogUXVlcnlMaXN0PFQ+O1xuICBfaXRlbXNBcnI6IFRbXSA9IFtdO1xuICBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIHByb3RlY3RlZCBfZm91bmRhdGlvbjogTURDTGlzdEZvdW5kYXRpb247XG4gIHByb3RlY3RlZCBfYWRhcHRlcjogTURDTGlzdEFkYXB0ZXI7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy5faXNOb25JbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbml0V2l0aEFkYXB0ZXIoYWRhcHRlcjogTURDTGlzdEFkYXB0ZXIpIHtcbiAgICB0aGlzLl9hZGFwdGVyID0gYWRhcHRlcjtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0xpc3RGb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiAhdGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhyb3cgRXJyb3IoJ01EQyBsaXN0IGZvdW5kYXRpb24gbm90IGluaXRpYWxpemVkIGZvciBBbmd1bGFyIE1hdGVyaWFsIGxpc3QuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fd2F0Y2hMaXN0SXRlbXMoKTtcblxuICAgIC8vIEVuYWJsZSB0eXBlYWhlYWQgYW5kIGZvY3VzIHdyYXBwaW5nIGZvciBpbnRlcmFjdGl2ZSBsaXN0cy5cbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldEhhc1R5cGVhaGVhZCh0cnVlKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldFdyYXBGb2N1cyh0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfd2F0Y2hMaXN0SXRlbXMoKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5faXRlbXMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2l0ZW1zQXJyID0gdGhpcy5faXRlbXMudG9BcnJheSgpO1xuICAgICAgLy8gV2hlbmV2ZXIgdGhlIGl0ZW1zIGNoYW5nZSwgdGhlIGZvdW5kYXRpb24gbmVlZHMgdG8gYmUgbm90aWZpZWQgdGhyb3VnaCB0aGUgYGxheW91dGBcbiAgICAgIC8vIG1ldGhvZC4gSXQgY2FjaGVzIGl0ZW1zIGZvciB0aGUgdHlwZWFoZWFkIGFuZCBkZXRlY3RzIHRoZSBsaXN0IHR5cGUgYmFzZWQgb24gdGhlIGl0ZW1zLlxuICAgICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcblxuICAgICAgLy8gVGhlIGxpc3QgaXRlbXMgY2hhbmdlZCwgc28gd2UgcmVzZXQgdGhlIHRhYmluZGV4IGZvciBhbGwgaXRlbXMgYW5kXG4gICAgICAvLyBkZXNpZ25hdGUgb25lIGxpc3QgaXRlbSB0aGF0IHdpbGwgYmUgcmVhY2hhYmxlIHRocm91Z2ggdGFiLlxuICAgICAgdGhpcy5fcmVzZXRUYWJpbmRleFRvRmlyc3RTZWxlY3RlZE9yRm9jdXNlZEl0ZW0oKTtcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSB0YWJpbmRleCBvZiBhbGwgaXRlbXMgc28gdGhhdCBubyBpdGVtcyBhcmUgcmVhY2hhYmxlIHRocm91Z2ggdGFiIGtleS5cbiAgICogTURDIGludGVuZHMgdG8gYWx3YXlzIGhhdmUgb25seSBvbmUgdGFiYmFibGUgaXRlbSB0aGF0IHdpbGwgcmVjZWl2ZSBmb2N1cyBmaXJzdC5cbiAgICogVGhpcyBmaXJzdCBpdGVtIGlzIHNlbGVjdGVkIGJ5IE1EQyBhdXRvbWF0aWNhbGx5IG9uIGJsdXIgb3IgYnkgbWFudWFsbHkgaW52b2tpbmdcbiAgICogdGhlIGBzZXRUYWJpbmRleFRvRmlyc3RTZWxlY3RlZE9yRm9jdXNlZEl0ZW1gIG1ldGhvZC5cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyVGFiaW5kZXhGb3JBbGxJdGVtcygpIHtcbiAgICBmb3IgKGxldCBpdGVtcyBvZiB0aGlzLl9pdGVtc0Fycikge1xuICAgICAgaXRlbXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRhYmluZGV4IGZvciBhbGwgb3B0aW9ucyBhbmQgc2V0cyB0YWJpbmRleCBmb3IgdGhlIGZpcnN0IHNlbGVjdGVkIG9wdGlvbiBvclxuICAgKiBwcmV2aW91c2x5IGZvY3VzZWQgaXRlbSBzbyB0aGF0IGFuIGl0ZW0gY2FuIGJlIHJlYWNoZWQgd2hlbiB1c2VycyB0YWIgaW50byB0aGUgbGlzdC5cbiAgICovXG4gIHByb3RlY3RlZCBfcmVzZXRUYWJpbmRleFRvRmlyc3RTZWxlY3RlZE9yRm9jdXNlZEl0ZW0oKSB7XG4gICAgdGhpcy5fY2xlYXJUYWJpbmRleEZvckFsbEl0ZW1zKCk7XG4gICAgLy8gTURDIGRvZXMgbm90IGV4cG9zZSB0aGUgbWV0aG9kIGZvciBzZXR0aW5nIHRoZSB0YWJpbmRleCB0byB0aGUgZmlyc3Qgc2VsZWN0ZWRcbiAgICAvLyBvciBwcmV2aW91c2x5IGZvY3VzZWQgaXRlbS4gV2UgY2FuIHN0aWxsIGFjY2VzcyB0aGUgbWV0aG9kIGFzIHByaXZhdGUgY2xhc3NcbiAgICAvLyBtZW1iZXJzIGFyZSBhY2Nlc3NpYmxlIGluIHRoZSB0cmFuc3BpbGVkIEphdmFTY3JpcHQuIFRyYWNrZWQgdXBzdHJlYW0gd2l0aDpcbiAgICAvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9pc3N1ZXMvNjM3NVxuICAgICh0aGlzLl9mb3VuZGF0aW9uIGFzIGFueSkuc2V0VGFiaW5kZXhUb0ZpcnN0U2VsZWN0ZWRPckZvY3VzZWRJdGVtKCk7XG4gIH1cblxuICBfZWxlbWVudEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IEhUTUxFbGVtZW50fHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zQXJyW2luZGV4XT8uX2hvc3RFbGVtZW50O1xuICB9XG5cbiAgX2luZGV4Rm9yRWxlbWVudChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVsZW1lbnQgP1xuICAgICAgdGhpcy5faXRlbXNBcnIuZmluZEluZGV4KGkgPT4gaS5faG9zdEVsZW1lbnQuY29udGFpbnMoZWxlbWVudCkpIDogLTE7XG4gIH1cbn1cblxuLy8gVE9ETzogcmVwbGFjZSB3aXRoIGNsYXNzIG9uY2UgbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvcHVsbC82MjU2IGlzIGF2YWlsYWJsZS5cbi8qKiBHZXRzIGFuIGluc3RhbmNlIG9mIGBNRGNMaXN0QWRhcHRlcmAgZm9yIHRoZSBnaXZlbiBpbnRlcmFjdGl2ZSBsaXN0LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEludGVyYWN0aXZlTGlzdEFkYXB0ZXIoXG4gICAgbGlzdDogTWF0SW50ZXJhY3RpdmVMaXN0QmFzZTxNYXRMaXN0SXRlbUJhc2U+KTogTURDTGlzdEFkYXB0ZXIge1xuICByZXR1cm4ge1xuICAgIGdldExpc3RJdGVtQ291bnQoKSB7XG4gICAgICByZXR1cm4gbGlzdC5faXRlbXMubGVuZ3RoO1xuICAgIH0sXG4gICAgbGlzdEl0ZW1BdEluZGV4SGFzQ2xhc3MoaW5kZXg6IG51bWJlciwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOiBmYWxzZTtcbiAgICB9LFxuICAgIGFkZENsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk/LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk/LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIGdldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpIDogbnVsbDtcbiAgICB9LFxuICAgIHNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICB9LFxuICAgIGdldEZvY3VzZWRFbGVtZW50SW5kZXgoKSB7XG4gICAgICByZXR1cm4gbGlzdC5faW5kZXhGb3JFbGVtZW50KGxpc3QuX2RvY3VtZW50Py5hY3RpdmVFbGVtZW50KTtcbiAgICB9LFxuICAgIGlzRm9jdXNJbnNpZGVMaXN0KCkge1xuICAgICAgcmV0dXJuIGxpc3QuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhsaXN0Ll9kb2N1bWVudD8uYWN0aXZlRWxlbWVudCk7XG4gICAgfSxcbiAgICBpc1Jvb3RGb2N1c2VkKCkge1xuICAgICAgcmV0dXJuIGxpc3QuX2VsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gbGlzdC5fZG9jdW1lbnQ/LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfSxcbiAgICBmb2N1c0l0ZW1BdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uZm9jdXMoKTtcbiAgICB9LFxuICAgIC8vIEdldHMgdGhlIHRleHQgZm9yIGEgbGlzdCBpdGVtIGZvciB0aGUgdHlwZWFoZWFkXG4gICAgZ2V0UHJpbWFyeVRleHRBdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBsaXN0Ll9pdGVtc0FycltpbmRleF0uX2dldEl0ZW1MYWJlbCgpO1xuICAgIH0sXG5cbiAgICAvLyBNREMgdXNlcyB0aGlzIG1ldGhvZCB0byBkaXNhYmxlIGZvY3VzYWJsZSBjaGlsZHJlbiBvZiBsaXN0IGl0ZW1zLiBIb3dldmVyLCB3ZSBiZWxpZXZlIHRoYXRcbiAgICAvLyB0aGlzIGlzIG5vdCBhbiBhY2Nlc3NpYmxlIHBhdHRlcm4gYW5kIHNob3VsZCBiZSBhdm9pZGVkLCB0aGVyZWZvcmUgd2UgaW50ZW50aW9uYWxseSBkbyBub3RcbiAgICAvLyBpbXBsZW1lbnQgdGhpcyBtZXRob2QuIEluIGFkZGl0aW9uLCBpbXBsZW1lbnRpbmcgdGhpcyB3b3VsZCByZXF1aXJlIHZpb2xhdGluZyBBbmd1bGFyXG4gICAgLy8gTWF0ZXJpYWwncyBnZW5lcmFsIHByaW5jaXBsZSBvZiBub3QgaGF2aW5nIGNvbXBvbmVudHMgbW9kaWZ5IERPTSBlbGVtZW50cyB0aGV5IGRvIG5vdCBvd24uXG4gICAgLy8gQSB1c2VyIHdobyBmZWVscyB0aGV5IHJlYWxseSBuZWVkIHRoaXMgZmVhdHVyZSBjYW4gc2ltcGx5IGxpc3RlbiB0byB0aGUgYChmb2N1cylgIGFuZFxuICAgIC8vIGAoYmx1cilgIGV2ZW50cyBvbiB0aGUgbGlzdCBpdGVtIGFuZCBlbmFibGUvZGlzYWJsZSBmb2N1cyBvbiB0aGUgY2hpbGRyZW4gdGhlbXNlbHZlcyBhc1xuICAgIC8vIGFwcHJvcHJpYXRlLlxuICAgIHNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbigpIHt9LFxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBtZXRob2RzIGhhdmUgYSBkdW1teSBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgYmFzZSBjbGFzcyBiZWNhdXNlIHRoZXkgYXJlIG9ubHlcbiAgICAvLyBhcHBsaWNhYmxlIHRvIGNlcnRhaW4gdHlwZXMgb2YgbGlzdHMuIFRoZXkgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciB0aGUgY29uY3JldGUgY2xhc3Nlc1xuICAgIC8vIHdoZXJlIHRoZXkgYXJlIGFwcGxpY2FibGUuXG4gICAgaGFzQ2hlY2tib3hBdEluZGV4KCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgaGFzUmFkaW9BdEluZGV4KGluZGV4OiBudW1iZXIpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgIHNldENoZWNrZWRDaGVja2JveE9yUmFkaW9BdEluZGV4KGluZGV4OiBudW1iZXIsIGNoZWNrZWQ6IGJvb2xlYW4pIHt9LFxuICAgIGlzQ2hlY2tib3hDaGVja2VkQXRJbmRleChpbmRleDogbnVtYmVyKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICBub3RpZnlBY3Rpb24oKSB7fSxcbiAgfTtcbn1cbiJdfQ==