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
import * as i0 from "@angular/core";
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
        const itemIndex = this._indexForElement(event.target);
        const tabIndex = this._itemsArr[itemIndex]?._hostElement.tabIndex;
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
        return this._itemsArr[index]?._hostElement;
    }
    _indexForElement(element) {
        return element ?
            this._itemsArr.findIndex(i => i._hostElement.contains(element)) : -1;
    }
}
MatInteractiveListBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatInteractiveListBase, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatInteractiveListBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatInteractiveListBase, host: { listeners: { "keydown": "_handleKeydown($event)", "click": "_handleClick($event)", "focusin": "_handleFocusin($event)", "focusout": "_handleFocusout($event)" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatInteractiveListBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { _handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], _handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], _handleFocusin: [{
                type: HostListener,
                args: ['focusin', ['$event']]
            }], _handleFocusout: [{
                type: HostListener,
                args: ['focusout', ['$event']]
            }] } });
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
            list._elementAtIndex(index)?.classList.add(className);
        },
        removeClassForElementIndex(index, className) {
            list._elementAtIndex(index)?.classList.remove(className);
        },
        getAttributeForElementIndex(index, attr) {
            const element = list._elementAtIndex(index);
            return element ? element.getAttribute(attr) : null;
        },
        setAttributeForElementIndex(index, attr, value) {
            list._elementAtIndex(index)?.setAttribute(attr, value);
        },
        getFocusedElementIndex() {
            return list._indexForElement(list._document?.activeElement);
        },
        isFocusInsideList() {
            return list._element.nativeElement.contains(list._document?.activeElement);
        },
        isRootFocused() {
            return list._element.nativeElement === list._document?.activeElement;
        },
        focusItemAtIndex(index) {
            list._elementAtIndex(index)?.focus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUtbGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9pbnRlcmFjdGl2ZS1saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBR1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLEVBQWtCLE1BQU0sYUFBYSxDQUFDOztBQUd6RCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFnQixzQkFDcEIsU0FBUSxXQUFXO0lBcURuQixZQUE2QixRQUFpQyxFQUN0QixRQUFhO1FBQ25ELEtBQUssRUFBRSxDQUFDO1FBRm1CLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBUjlELGNBQVMsR0FBUSxFQUFFLENBQUM7UUFNWixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBdkRELGNBQWMsQ0FBQyxLQUFvQjtRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQXFCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FDNUIsS0FBSyxFQUFFLElBQUksQ0FBQyxl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UUFDRCxpQkFBaUI7WUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxhQUFhO1lBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsZ0JBQWdCLENBQUMsS0FBYTtZQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxrREFBa0Q7UUFDbEQscUJBQXFCLENBQUMsS0FBYTtZQUNqQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUVELDZGQUE2RjtRQUM3Riw2RkFBNkY7UUFDN0Ysd0ZBQXdGO1FBQ3hGLDZGQUE2RjtRQUM3Rix3RkFBd0Y7UUFDeEYsMEZBQTBGO1FBQzFGLGVBQWU7UUFDZiw4QkFBOEIsS0FBSSxDQUFDO1FBRW5DLDRGQUE0RjtRQUM1Riw0RkFBNEY7UUFDNUYsNkJBQTZCO1FBQzdCLGtCQUFrQixLQUFLLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0QyxlQUFlLENBQUMsS0FBYSxJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRCxnQ0FBZ0MsQ0FBQyxLQUFhLEVBQUUsT0FBZ0IsSUFBRyxDQUFDO1FBQ3BFLHdCQUF3QixDQUFDLEtBQWEsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekQsWUFBWSxLQUFJLENBQUM7S0FDbEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENMaXN0QWRhcHRlciwgTURDTGlzdEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9saXN0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdExpc3RCYXNlLCBNYXRMaXN0SXRlbUJhc2V9IGZyb20gJy4vbGlzdC1iYXNlJztcblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdEludGVyYWN0aXZlTGlzdEJhc2U8VCBleHRlbmRzIE1hdExpc3RJdGVtQmFzZT5cbiAgZXh0ZW5kcyBNYXRMaXN0QmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUtleWRvd24oXG4gICAgICBldmVudCwgdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpID09PSBldmVudC50YXJnZXQsIGluZGV4KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy8gVGhlIGB0b2dnbGVDaGVja2JveGAgcGFyYW1ldGVyIGNhbiBhbHdheXMgYmUgYHRydWVgIGFzIGl0IG9ubHkgaGFzIGFuIGVmZmVjdCBpZiB0aGUgbGlzdFxuICAgIC8vIGlzIHJlY29nbml6ZWQgYXMgY2hlY2tib3ggc2VsZWN0aW9uIGxpc3QuIEZvciBzdWNoIGxpc3RzLCB3ZSB3b3VsZCBhbHdheXMgd2FudCB0byB0b2dnbGVcbiAgICAvLyB0aGUgY2hlY2tib3ggb24gbGlzdCBpdGVtIGNsaWNrLiBNREMgYWRkZWQgdGhpcyBwYXJhbWV0ZXIgc28gdGhhdCB0aGV5IGNhbiBhdm9pZCBkaXNwYXRjaGluZ1xuICAgIC8vIGEgZmFrZSBgY2hhbmdlYCBldmVudCB3aGVuIHRoZSBjaGVja2JveCBpcyBkaXJlY3RseSBjbGlja2VkIGZvciB0aGUgbGlzdCBpdGVtLiBXZSBkb24ndFxuICAgIC8vIG5lZWQgdGhpcyBhcyB3ZSByZXF1aXJlIHN1Y2ggbGlzdCBpdGVtIGNoZWNrYm94ZXMgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB0aGUgY2hhbmdlIGV2ZW50LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvMDhjYTRkMGVjNWYzNTliYzNhMjBiZDJhMzAyZmE2YjczM2I1ZTEzNS9wYWNrYWdlcy9tZGMtbGlzdC9jb21wb25lbnQudHMjTDMwOC1MMzEwXG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVDbGljayh0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSxcbiAgICAgIC8qIHRvZ2dsZUNoZWNrYm94ICovIHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNpbicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVGb2N1c2luKGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5faW5kZXhGb3JFbGVtZW50KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgY29uc3QgdGFiSW5kZXggPSB0aGlzLl9pdGVtc0FycltpdGVtSW5kZXhdPy5faG9zdEVsZW1lbnQudGFiSW5kZXg7XG5cbiAgICAvLyBJZiB0aGUgbmV3bHkgZm9jdXNlZCBpdGVtIGlzIG5vdCB0aGUgZGVzaWduYXRlZCBpdGVtIHRoYXQgc2hvdWxkIGhhdmUgcmVjZWl2ZWQgZm9jdXNcbiAgICAvLyBmaXJzdCB0aHJvdWdoIGtleWJvYXJkIGludGVyYWN0aW9uLCB0aGUgdGFiaW5kZXggb2YgdGhlIHByZXZpb3VzbHkgZGVzaWduYXRlZCBsaXN0IGl0ZW1cbiAgICAvLyBuZWVkcyB0byBiZSBjbGVhcmVkLCBzbyB0aGF0IG9ubHkgb25lIGxpc3QgaXRlbSBpcyByZWFjaGFibGUgdGhyb3VnaCB0YWIga2V5IGF0IGFueSB0aW1lLlxuICAgIC8vIE1EQyBzZXRzIGEgdGFiaW5kZXggZm9yIHRoZSBuZXdseSBmb2N1c2VkIGl0ZW0sIHNvIHdlIGRvIG5vdCBuZWVkIHRvIHNldCBhIHRhYmluZGV4IGZvciBpdC5cbiAgICAvLyBXb3JrYXJvdW5kIGZvcjogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzYzNjMuXG4gICAgaWYgKHRhYkluZGV4ID09PSB1bmRlZmluZWQgfHwgdGFiSW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLl9jbGVhclRhYmluZGV4Rm9yQWxsSXRlbXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUZvY3VzSW4oaXRlbUluZGV4KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUZvY3Vzb3V0KGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVGb2N1c091dCh0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSk7XG4gIH1cblxuICAvKiogSXRlbXMgaW4gdGhlIGludGVyYWN0aXZlIGxpc3QuICovXG4gIGFic3RyYWN0IF9pdGVtczogUXVlcnlMaXN0PFQ+O1xuICBfaXRlbXNBcnI6IFRbXSA9IFtdO1xuICBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIHByb3RlY3RlZCBfZm91bmRhdGlvbjogTURDTGlzdEZvdW5kYXRpb247XG4gIHByb3RlY3RlZCBfYWRhcHRlcjogTURDTGlzdEFkYXB0ZXI7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy5faXNOb25JbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbml0V2l0aEFkYXB0ZXIoYWRhcHRlcjogTURDTGlzdEFkYXB0ZXIpIHtcbiAgICB0aGlzLl9hZGFwdGVyID0gYWRhcHRlcjtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0xpc3RGb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiAhdGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhyb3cgRXJyb3IoJ01EQyBsaXN0IGZvdW5kYXRpb24gbm90IGluaXRpYWxpemVkIGZvciBBbmd1bGFyIE1hdGVyaWFsIGxpc3QuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fd2F0Y2hMaXN0SXRlbXMoKTtcblxuICAgIC8vIEVuYWJsZSB0eXBlYWhlYWQgYW5kIGZvY3VzIHdyYXBwaW5nIGZvciBpbnRlcmFjdGl2ZSBsaXN0cy5cbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldEhhc1R5cGVhaGVhZCh0cnVlKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldFdyYXBGb2N1cyh0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfd2F0Y2hMaXN0SXRlbXMoKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5faXRlbXMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2l0ZW1zQXJyID0gdGhpcy5faXRlbXMudG9BcnJheSgpO1xuICAgICAgLy8gV2hlbmV2ZXIgdGhlIGl0ZW1zIGNoYW5nZSwgdGhlIGZvdW5kYXRpb24gbmVlZHMgdG8gYmUgbm90aWZpZWQgdGhyb3VnaCB0aGUgYGxheW91dGBcbiAgICAgIC8vIG1ldGhvZC4gSXQgY2FjaGVzIGl0ZW1zIGZvciB0aGUgdHlwZWFoZWFkIGFuZCBkZXRlY3RzIHRoZSBsaXN0IHR5cGUgYmFzZWQgb24gdGhlIGl0ZW1zLlxuICAgICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcblxuICAgICAgLy8gVGhlIGxpc3QgaXRlbXMgY2hhbmdlZCwgc28gd2UgcmVzZXQgdGhlIHRhYmluZGV4IGZvciBhbGwgaXRlbXMgYW5kXG4gICAgICAvLyBkZXNpZ25hdGUgb25lIGxpc3QgaXRlbSB0aGF0IHdpbGwgYmUgcmVhY2hhYmxlIHRocm91Z2ggdGFiLlxuICAgICAgdGhpcy5fcmVzZXRUYWJpbmRleFRvRmlyc3RTZWxlY3RlZE9yRm9jdXNlZEl0ZW0oKTtcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSB0YWJpbmRleCBvZiBhbGwgaXRlbXMgc28gdGhhdCBubyBpdGVtcyBhcmUgcmVhY2hhYmxlIHRocm91Z2ggdGFiIGtleS5cbiAgICogTURDIGludGVuZHMgdG8gYWx3YXlzIGhhdmUgb25seSBvbmUgdGFiYmFibGUgaXRlbSB0aGF0IHdpbGwgcmVjZWl2ZSBmb2N1cyBmaXJzdC5cbiAgICogVGhpcyBmaXJzdCBpdGVtIGlzIHNlbGVjdGVkIGJ5IE1EQyBhdXRvbWF0aWNhbGx5IG9uIGJsdXIgb3IgYnkgbWFudWFsbHkgaW52b2tpbmdcbiAgICogdGhlIGBzZXRUYWJpbmRleFRvRmlyc3RTZWxlY3RlZE9yRm9jdXNlZEl0ZW1gIG1ldGhvZC5cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyVGFiaW5kZXhGb3JBbGxJdGVtcygpIHtcbiAgICBmb3IgKGxldCBpdGVtcyBvZiB0aGlzLl9pdGVtc0Fycikge1xuICAgICAgaXRlbXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRhYmluZGV4IGZvciBhbGwgb3B0aW9ucyBhbmQgc2V0cyB0YWJpbmRleCBmb3IgdGhlIGZpcnN0IHNlbGVjdGVkIG9wdGlvbiBvclxuICAgKiBwcmV2aW91c2x5IGZvY3VzZWQgaXRlbSBzbyB0aGF0IGFuIGl0ZW0gY2FuIGJlIHJlYWNoZWQgd2hlbiB1c2VycyB0YWIgaW50byB0aGUgbGlzdC5cbiAgICovXG4gIHByb3RlY3RlZCBfcmVzZXRUYWJpbmRleFRvRmlyc3RTZWxlY3RlZE9yRm9jdXNlZEl0ZW0oKSB7XG4gICAgdGhpcy5fY2xlYXJUYWJpbmRleEZvckFsbEl0ZW1zKCk7XG4gICAgLy8gTURDIGRvZXMgbm90IGV4cG9zZSB0aGUgbWV0aG9kIGZvciBzZXR0aW5nIHRoZSB0YWJpbmRleCB0byB0aGUgZmlyc3Qgc2VsZWN0ZWRcbiAgICAvLyBvciBwcmV2aW91c2x5IGZvY3VzZWQgaXRlbS4gV2UgY2FuIHN0aWxsIGFjY2VzcyB0aGUgbWV0aG9kIGFzIHByaXZhdGUgY2xhc3NcbiAgICAvLyBtZW1iZXJzIGFyZSBhY2Nlc3NpYmxlIGluIHRoZSB0cmFuc3BpbGVkIEphdmFTY3JpcHQuIFRyYWNrZWQgdXBzdHJlYW0gd2l0aDpcbiAgICAvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9pc3N1ZXMvNjM3NVxuICAgICh0aGlzLl9mb3VuZGF0aW9uIGFzIGFueSkuc2V0VGFiaW5kZXhUb0ZpcnN0U2VsZWN0ZWRPckZvY3VzZWRJdGVtKCk7XG4gIH1cblxuICBfZWxlbWVudEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IEhUTUxFbGVtZW50fHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zQXJyW2luZGV4XT8uX2hvc3RFbGVtZW50O1xuICB9XG5cbiAgX2luZGV4Rm9yRWxlbWVudChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVsZW1lbnQgP1xuICAgICAgdGhpcy5faXRlbXNBcnIuZmluZEluZGV4KGkgPT4gaS5faG9zdEVsZW1lbnQuY29udGFpbnMoZWxlbWVudCkpIDogLTE7XG4gIH1cbn1cblxuLy8gVE9ETzogcmVwbGFjZSB3aXRoIGNsYXNzIG9uY2UgbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvcHVsbC82MjU2IGlzIGF2YWlsYWJsZS5cbi8qKiBHZXRzIGFuIGluc3RhbmNlIG9mIGBNRGNMaXN0QWRhcHRlcmAgZm9yIHRoZSBnaXZlbiBpbnRlcmFjdGl2ZSBsaXN0LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEludGVyYWN0aXZlTGlzdEFkYXB0ZXIoXG4gICAgbGlzdDogTWF0SW50ZXJhY3RpdmVMaXN0QmFzZTxNYXRMaXN0SXRlbUJhc2U+KTogTURDTGlzdEFkYXB0ZXIge1xuICByZXR1cm4ge1xuICAgIGdldExpc3RJdGVtQ291bnQoKSB7XG4gICAgICByZXR1cm4gbGlzdC5faXRlbXMubGVuZ3RoO1xuICAgIH0sXG4gICAgbGlzdEl0ZW1BdEluZGV4SGFzQ2xhc3MoaW5kZXg6IG51bWJlciwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOiBmYWxzZTtcbiAgICB9LFxuICAgIGFkZENsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk/LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk/LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIGdldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpIDogbnVsbDtcbiAgICB9LFxuICAgIHNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICB9LFxuICAgIGdldEZvY3VzZWRFbGVtZW50SW5kZXgoKSB7XG4gICAgICByZXR1cm4gbGlzdC5faW5kZXhGb3JFbGVtZW50KGxpc3QuX2RvY3VtZW50Py5hY3RpdmVFbGVtZW50KTtcbiAgICB9LFxuICAgIGlzRm9jdXNJbnNpZGVMaXN0KCkge1xuICAgICAgcmV0dXJuIGxpc3QuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhsaXN0Ll9kb2N1bWVudD8uYWN0aXZlRWxlbWVudCk7XG4gICAgfSxcbiAgICBpc1Jvb3RGb2N1c2VkKCkge1xuICAgICAgcmV0dXJuIGxpc3QuX2VsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gbGlzdC5fZG9jdW1lbnQ/LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfSxcbiAgICBmb2N1c0l0ZW1BdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uZm9jdXMoKTtcbiAgICB9LFxuICAgIC8vIEdldHMgdGhlIHRleHQgZm9yIGEgbGlzdCBpdGVtIGZvciB0aGUgdHlwZWFoZWFkXG4gICAgZ2V0UHJpbWFyeVRleHRBdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBsaXN0Ll9pdGVtc0FycltpbmRleF0uX2dldEl0ZW1MYWJlbCgpO1xuICAgIH0sXG5cbiAgICAvLyBNREMgdXNlcyB0aGlzIG1ldGhvZCB0byBkaXNhYmxlIGZvY3VzYWJsZSBjaGlsZHJlbiBvZiBsaXN0IGl0ZW1zLiBIb3dldmVyLCB3ZSBiZWxpZXZlIHRoYXRcbiAgICAvLyB0aGlzIGlzIG5vdCBhbiBhY2Nlc3NpYmxlIHBhdHRlcm4gYW5kIHNob3VsZCBiZSBhdm9pZGVkLCB0aGVyZWZvcmUgd2UgaW50ZW50aW9uYWxseSBkbyBub3RcbiAgICAvLyBpbXBsZW1lbnQgdGhpcyBtZXRob2QuIEluIGFkZGl0aW9uLCBpbXBsZW1lbnRpbmcgdGhpcyB3b3VsZCByZXF1aXJlIHZpb2xhdGluZyBBbmd1bGFyXG4gICAgLy8gTWF0ZXJpYWwncyBnZW5lcmFsIHByaW5jaXBsZSBvZiBub3QgaGF2aW5nIGNvbXBvbmVudHMgbW9kaWZ5IERPTSBlbGVtZW50cyB0aGV5IGRvIG5vdCBvd24uXG4gICAgLy8gQSB1c2VyIHdobyBmZWVscyB0aGV5IHJlYWxseSBuZWVkIHRoaXMgZmVhdHVyZSBjYW4gc2ltcGx5IGxpc3RlbiB0byB0aGUgYChmb2N1cylgIGFuZFxuICAgIC8vIGAoYmx1cilgIGV2ZW50cyBvbiB0aGUgbGlzdCBpdGVtIGFuZCBlbmFibGUvZGlzYWJsZSBmb2N1cyBvbiB0aGUgY2hpbGRyZW4gdGhlbXNlbHZlcyBhc1xuICAgIC8vIGFwcHJvcHJpYXRlLlxuICAgIHNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbigpIHt9LFxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBtZXRob2RzIGhhdmUgYSBkdW1teSBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgYmFzZSBjbGFzcyBiZWNhdXNlIHRoZXkgYXJlIG9ubHlcbiAgICAvLyBhcHBsaWNhYmxlIHRvIGNlcnRhaW4gdHlwZXMgb2YgbGlzdHMuIFRoZXkgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciB0aGUgY29uY3JldGUgY2xhc3Nlc1xuICAgIC8vIHdoZXJlIHRoZXkgYXJlIGFwcGxpY2FibGUuXG4gICAgaGFzQ2hlY2tib3hBdEluZGV4KCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgaGFzUmFkaW9BdEluZGV4KGluZGV4OiBudW1iZXIpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgIHNldENoZWNrZWRDaGVja2JveE9yUmFkaW9BdEluZGV4KGluZGV4OiBudW1iZXIsIGNoZWNrZWQ6IGJvb2xlYW4pIHt9LFxuICAgIGlzQ2hlY2tib3hDaGVja2VkQXRJbmRleChpbmRleDogbnVtYmVyKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICBub3RpZnlBY3Rpb24oKSB7fSxcbiAgfTtcbn1cbiJdfQ==