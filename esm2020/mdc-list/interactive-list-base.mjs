/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject } from '@angular/core';
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
        return element ? this._itemsArr.findIndex(i => i._hostElement.contains(element)) : -1;
    }
}
MatInteractiveListBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatInteractiveListBase, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatInteractiveListBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0", type: MatInteractiveListBase, host: { listeners: { "keydown": "_handleKeydown($event)", "click": "_handleClick($event)", "focusin": "_handleFocusin($event)", "focusout": "_handleFocusout($event)" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MatInteractiveListBase, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        '(keydown)': '_handleKeydown($event)',
                        '(click)': '_handleClick($event)',
                        '(focusin)': '_handleFocusin($event)',
                        '(focusout)': '_handleFocusout($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
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
        hasCheckboxAtIndex() {
            return false;
        },
        hasRadioAtIndex(index) {
            return false;
        },
        setCheckedCheckboxOrRadioAtIndex(index, checked) { },
        isCheckboxCheckedAtIndex(index) {
            return false;
        },
        notifyAction() { },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUtbGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9pbnRlcmFjdGl2ZS1saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsV0FBVyxFQUFrQixNQUFNLGFBQWEsQ0FBQzs7QUFVekQsb0JBQW9CO0FBQ3BCLE1BQU0sT0FBZ0Isc0JBQ3BCLFNBQVEsV0FBVztJQW1EbkIsWUFBNkIsUUFBaUMsRUFBb0IsUUFBYTtRQUM3RixLQUFLLEVBQUUsQ0FBQztRQURtQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQVI5RCxjQUFTLEdBQVEsRUFBRSxDQUFDO1FBTVosbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQXBERCxjQUFjLENBQUMsS0FBb0I7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFxQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWlCO1FBQzVCLDJGQUEyRjtRQUMzRiwyRkFBMkY7UUFDM0YsK0ZBQStGO1FBQy9GLDBGQUEwRjtRQUMxRiw2RkFBNkY7UUFDN0Ysd0pBQXdKO1FBQ3hKLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQXFCLENBQUM7UUFDbEQsb0JBQW9CLENBQUMsSUFBSSxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFpQjtRQUM5QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQXFCLENBQUMsQ0FBQztRQUNyRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFFbEUsdUZBQXVGO1FBQ3ZGLDBGQUEwRjtRQUMxRiw0RkFBNEY7UUFDNUYsOEZBQThGO1FBQzlGLDhGQUE4RjtRQUM5RixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFpQjtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQXFCLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFrQlMsZ0JBQWdCLENBQUMsT0FBdUI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDeEUsTUFBTSxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztTQUMvRTtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLDZEQUE2RDtRQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRVMsZUFBZTtRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZDLHNGQUFzRjtZQUN0RiwwRkFBMEY7WUFDMUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUUxQixxRUFBcUU7WUFDckUsOERBQThEO1lBQzlELElBQUksQ0FBQywwQ0FBMEMsRUFBRSxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyx5QkFBeUI7UUFDL0IsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDTywwQ0FBMEM7UUFDbEQsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsZ0ZBQWdGO1FBQ2hGLDhFQUE4RTtRQUM5RSw4RUFBOEU7UUFDOUUsbUZBQW1GO1FBQ2xGLElBQUksQ0FBQyxXQUFtQixDQUFDLHVDQUF1QyxFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFhO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQXVCO1FBQ3RDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7O21IQS9IbUIsc0JBQXNCLDRDQW9EOEIsUUFBUTt1R0FwRDVELHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQVQzQyxTQUFTO21CQUFDO29CQUNULElBQUksRUFBRTt3QkFDSixXQUFXLEVBQUUsd0JBQXdCO3dCQUNyQyxTQUFTLEVBQUUsc0JBQXNCO3dCQUNqQyxXQUFXLEVBQUUsd0JBQXdCO3dCQUNyQyxZQUFZLEVBQUUseUJBQXlCO3FCQUN4QztpQkFDRjs7MEJBc0RrRSxNQUFNOzJCQUFDLFFBQVE7O0FBOEVsRixnRkFBZ0Y7QUFDaEYsMkVBQTJFO0FBQzNFLE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsSUFBNkM7SUFFN0MsT0FBTztRQUNMLGdCQUFnQjtZQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsQ0FBQztRQUNELHVCQUF1QixDQUFDLEtBQWEsRUFBRSxTQUFpQjtZQUN0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pFLENBQUM7UUFDRCx1QkFBdUIsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7WUFDdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCwwQkFBMEIsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7WUFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDRCwyQkFBMkIsQ0FBQyxLQUFhLEVBQUUsSUFBWTtZQUNyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsQ0FBQztRQUNELDJCQUEyQixDQUFDLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYTtZQUNwRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELHNCQUFzQjtZQUNwQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFDRCxpQkFBaUI7WUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxhQUFhO1lBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsZ0JBQWdCLENBQUMsS0FBYTtZQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxrREFBa0Q7UUFDbEQscUJBQXFCLENBQUMsS0FBYTtZQUNqQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUVELDZGQUE2RjtRQUM3Riw2RkFBNkY7UUFDN0Ysd0ZBQXdGO1FBQ3hGLDZGQUE2RjtRQUM3Rix3RkFBd0Y7UUFDeEYsMEZBQTBGO1FBQzFGLGVBQWU7UUFDZiw4QkFBOEIsS0FBSSxDQUFDO1FBRW5DLDRGQUE0RjtRQUM1Riw0RkFBNEY7UUFDNUYsNkJBQTZCO1FBQzdCLGtCQUFrQjtZQUNoQixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxlQUFlLENBQUMsS0FBYTtZQUMzQixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxnQ0FBZ0MsQ0FBQyxLQUFhLEVBQUUsT0FBZ0IsSUFBRyxDQUFDO1FBQ3BFLHdCQUF3QixDQUFDLEtBQWE7WUFDcEMsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsWUFBWSxLQUFJLENBQUM7S0FDbEIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIE9uRGVzdHJveSwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDTGlzdEFkYXB0ZXIsIE1EQ0xpc3RGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRMaXN0QmFzZSwgTWF0TGlzdEl0ZW1CYXNlfSBmcm9tICcuL2xpc3QtYmFzZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBob3N0OiB7XG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgJyhmb2N1c2luKSc6ICdfaGFuZGxlRm9jdXNpbigkZXZlbnQpJyxcbiAgICAnKGZvY3Vzb3V0KSc6ICdfaGFuZGxlRm9jdXNvdXQoJGV2ZW50KScsXG4gIH0sXG59KVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRJbnRlcmFjdGl2ZUxpc3RCYXNlPFQgZXh0ZW5kcyBNYXRMaXN0SXRlbUJhc2U+XG4gIGV4dGVuZHMgTWF0TGlzdEJhc2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3lcbntcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlS2V5ZG93bihldmVudCwgdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpID09PSBldmVudC50YXJnZXQsIGluZGV4KTtcbiAgfVxuXG4gIF9oYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIFRoZSBgdG9nZ2xlQ2hlY2tib3hgIHBhcmFtZXRlciBjYW4gYWx3YXlzIGJlIGB0cnVlYCBhcyBpdCBvbmx5IGhhcyBhbiBlZmZlY3QgaWYgdGhlIGxpc3RcbiAgICAvLyBpcyByZWNvZ25pemVkIGFzIGNoZWNrYm94IHNlbGVjdGlvbiBsaXN0LiBGb3Igc3VjaCBsaXN0cywgd2Ugd291bGQgYWx3YXlzIHdhbnQgdG8gdG9nZ2xlXG4gICAgLy8gdGhlIGNoZWNrYm94IG9uIGxpc3QgaXRlbSBjbGljay4gTURDIGFkZGVkIHRoaXMgcGFyYW1ldGVyIHNvIHRoYXQgdGhleSBjYW4gYXZvaWQgZGlzcGF0Y2hpbmdcbiAgICAvLyBhIGZha2UgYGNoYW5nZWAgZXZlbnQgd2hlbiB0aGUgY2hlY2tib3ggaXMgZGlyZWN0bHkgY2xpY2tlZCBmb3IgdGhlIGxpc3QgaXRlbS4gV2UgZG9uJ3RcbiAgICAvLyBuZWVkIHRoaXMgYXMgd2UgcmVxdWlyZSBzdWNoIGxpc3QgaXRlbSBjaGVja2JveGVzIHRvIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNoYW5nZSBldmVudC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iLzA4Y2E0ZDBlYzVmMzU5YmMzYTIwYmQyYTMwMmZhNmI3MzNiNWUxMzUvcGFja2FnZXMvbWRjLWxpc3QvY29tcG9uZW50LnRzI0wzMDgtTDMxMFxuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlQ2xpY2soXG4gICAgICB0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSxcbiAgICAgIC8qIHRvZ2dsZUNoZWNrYm94ICovIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIF9oYW5kbGVGb2N1c2luKGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5faW5kZXhGb3JFbGVtZW50KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgY29uc3QgdGFiSW5kZXggPSB0aGlzLl9pdGVtc0FycltpdGVtSW5kZXhdPy5faG9zdEVsZW1lbnQudGFiSW5kZXg7XG5cbiAgICAvLyBJZiB0aGUgbmV3bHkgZm9jdXNlZCBpdGVtIGlzIG5vdCB0aGUgZGVzaWduYXRlZCBpdGVtIHRoYXQgc2hvdWxkIGhhdmUgcmVjZWl2ZWQgZm9jdXNcbiAgICAvLyBmaXJzdCB0aHJvdWdoIGtleWJvYXJkIGludGVyYWN0aW9uLCB0aGUgdGFiaW5kZXggb2YgdGhlIHByZXZpb3VzbHkgZGVzaWduYXRlZCBsaXN0IGl0ZW1cbiAgICAvLyBuZWVkcyB0byBiZSBjbGVhcmVkLCBzbyB0aGF0IG9ubHkgb25lIGxpc3QgaXRlbSBpcyByZWFjaGFibGUgdGhyb3VnaCB0YWIga2V5IGF0IGFueSB0aW1lLlxuICAgIC8vIE1EQyBzZXRzIGEgdGFiaW5kZXggZm9yIHRoZSBuZXdseSBmb2N1c2VkIGl0ZW0sIHNvIHdlIGRvIG5vdCBuZWVkIHRvIHNldCBhIHRhYmluZGV4IGZvciBpdC5cbiAgICAvLyBXb3JrYXJvdW5kIGZvcjogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzYzNjMuXG4gICAgaWYgKHRhYkluZGV4ID09PSB1bmRlZmluZWQgfHwgdGFiSW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLl9jbGVhclRhYmluZGV4Rm9yQWxsSXRlbXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUZvY3VzSW4oaXRlbUluZGV4KTtcbiAgfVxuXG4gIF9oYW5kbGVGb2N1c291dChldmVudDogRm9jdXNFdmVudCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlRm9jdXNPdXQodGhpcy5faW5kZXhGb3JFbGVtZW50KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpO1xuICB9XG5cbiAgLyoqIEl0ZW1zIGluIHRoZSBpbnRlcmFjdGl2ZSBsaXN0LiAqL1xuICBhYnN0cmFjdCBfaXRlbXM6IFF1ZXJ5TGlzdDxUPjtcbiAgX2l0ZW1zQXJyOiBUW10gPSBbXTtcbiAgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICBwcm90ZWN0ZWQgX2ZvdW5kYXRpb246IE1EQ0xpc3RGb3VuZGF0aW9uO1xuICBwcm90ZWN0ZWQgX2FkYXB0ZXI6IE1EQ0xpc3RBZGFwdGVyO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy5faXNOb25JbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbml0V2l0aEFkYXB0ZXIoYWRhcHRlcjogTURDTGlzdEFkYXB0ZXIpIHtcbiAgICB0aGlzLl9hZGFwdGVyID0gYWRhcHRlcjtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0xpc3RGb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiAhdGhpcy5fZm91bmRhdGlvbikge1xuICAgICAgdGhyb3cgRXJyb3IoJ01EQyBsaXN0IGZvdW5kYXRpb24gbm90IGluaXRpYWxpemVkIGZvciBBbmd1bGFyIE1hdGVyaWFsIGxpc3QuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fd2F0Y2hMaXN0SXRlbXMoKTtcblxuICAgIC8vIEVuYWJsZSB0eXBlYWhlYWQgYW5kIGZvY3VzIHdyYXBwaW5nIGZvciBpbnRlcmFjdGl2ZSBsaXN0cy5cbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldEhhc1R5cGVhaGVhZCh0cnVlKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldFdyYXBGb2N1cyh0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfd2F0Y2hMaXN0SXRlbXMoKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLl9pdGVtcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9pdGVtc0FyciA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKTtcbiAgICAgICAgLy8gV2hlbmV2ZXIgdGhlIGl0ZW1zIGNoYW5nZSwgdGhlIGZvdW5kYXRpb24gbmVlZHMgdG8gYmUgbm90aWZpZWQgdGhyb3VnaCB0aGUgYGxheW91dGBcbiAgICAgICAgLy8gbWV0aG9kLiBJdCBjYWNoZXMgaXRlbXMgZm9yIHRoZSB0eXBlYWhlYWQgYW5kIGRldGVjdHMgdGhlIGxpc3QgdHlwZSBiYXNlZCBvbiB0aGUgaXRlbXMuXG4gICAgICAgIHRoaXMuX2ZvdW5kYXRpb24ubGF5b3V0KCk7XG5cbiAgICAgICAgLy8gVGhlIGxpc3QgaXRlbXMgY2hhbmdlZCwgc28gd2UgcmVzZXQgdGhlIHRhYmluZGV4IGZvciBhbGwgaXRlbXMgYW5kXG4gICAgICAgIC8vIGRlc2lnbmF0ZSBvbmUgbGlzdCBpdGVtIHRoYXQgd2lsbCBiZSByZWFjaGFibGUgdGhyb3VnaCB0YWIuXG4gICAgICAgIHRoaXMuX3Jlc2V0VGFiaW5kZXhUb0ZpcnN0U2VsZWN0ZWRPckZvY3VzZWRJdGVtKCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgdGFiaW5kZXggb2YgYWxsIGl0ZW1zIHNvIHRoYXQgbm8gaXRlbXMgYXJlIHJlYWNoYWJsZSB0aHJvdWdoIHRhYiBrZXkuXG4gICAqIE1EQyBpbnRlbmRzIHRvIGFsd2F5cyBoYXZlIG9ubHkgb25lIHRhYmJhYmxlIGl0ZW0gdGhhdCB3aWxsIHJlY2VpdmUgZm9jdXMgZmlyc3QuXG4gICAqIFRoaXMgZmlyc3QgaXRlbSBpcyBzZWxlY3RlZCBieSBNREMgYXV0b21hdGljYWxseSBvbiBibHVyIG9yIGJ5IG1hbnVhbGx5IGludm9raW5nXG4gICAqIHRoZSBgc2V0VGFiaW5kZXhUb0ZpcnN0U2VsZWN0ZWRPckZvY3VzZWRJdGVtYCBtZXRob2QuXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclRhYmluZGV4Rm9yQWxsSXRlbXMoKSB7XG4gICAgZm9yIChsZXQgaXRlbXMgb2YgdGhpcy5faXRlbXNBcnIpIHtcbiAgICAgIGl0ZW1zLl9ob3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0YWJpbmRleCBmb3IgYWxsIG9wdGlvbnMgYW5kIHNldHMgdGFiaW5kZXggZm9yIHRoZSBmaXJzdCBzZWxlY3RlZCBvcHRpb24gb3JcbiAgICogcHJldmlvdXNseSBmb2N1c2VkIGl0ZW0gc28gdGhhdCBhbiBpdGVtIGNhbiBiZSByZWFjaGVkIHdoZW4gdXNlcnMgdGFiIGludG8gdGhlIGxpc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Jlc2V0VGFiaW5kZXhUb0ZpcnN0U2VsZWN0ZWRPckZvY3VzZWRJdGVtKCkge1xuICAgIHRoaXMuX2NsZWFyVGFiaW5kZXhGb3JBbGxJdGVtcygpO1xuICAgIC8vIE1EQyBkb2VzIG5vdCBleHBvc2UgdGhlIG1ldGhvZCBmb3Igc2V0dGluZyB0aGUgdGFiaW5kZXggdG8gdGhlIGZpcnN0IHNlbGVjdGVkXG4gICAgLy8gb3IgcHJldmlvdXNseSBmb2N1c2VkIGl0ZW0uIFdlIGNhbiBzdGlsbCBhY2Nlc3MgdGhlIG1ldGhvZCBhcyBwcml2YXRlIGNsYXNzXG4gICAgLy8gbWVtYmVycyBhcmUgYWNjZXNzaWJsZSBpbiB0aGUgdHJhbnNwaWxlZCBKYXZhU2NyaXB0LiBUcmFja2VkIHVwc3RyZWFtIHdpdGg6XG4gICAgLy8gVE9ETzogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzYzNzVcbiAgICAodGhpcy5fZm91bmRhdGlvbiBhcyBhbnkpLnNldFRhYmluZGV4VG9GaXJzdFNlbGVjdGVkT3JGb2N1c2VkSXRlbSgpO1xuICB9XG5cbiAgX2VsZW1lbnRBdEluZGV4KGluZGV4OiBudW1iZXIpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zQXJyW2luZGV4XT8uX2hvc3RFbGVtZW50O1xuICB9XG5cbiAgX2luZGV4Rm9yRWxlbWVudChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyB0aGlzLl9pdGVtc0Fyci5maW5kSW5kZXgoaSA9PiBpLl9ob3N0RWxlbWVudC5jb250YWlucyhlbGVtZW50KSkgOiAtMTtcbiAgfVxufVxuXG4vLyBUT0RPOiByZXBsYWNlIHdpdGggY2xhc3Mgb25jZSBtYXRlcmlhbC1jb21wb25lbnRzLXdlYi9wdWxsLzYyNTYgaXMgYXZhaWxhYmxlLlxuLyoqIEdldHMgYW4gaW5zdGFuY2Ugb2YgYE1EY0xpc3RBZGFwdGVyYCBmb3IgdGhlIGdpdmVuIGludGVyYWN0aXZlIGxpc3QuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50ZXJhY3RpdmVMaXN0QWRhcHRlcihcbiAgbGlzdDogTWF0SW50ZXJhY3RpdmVMaXN0QmFzZTxNYXRMaXN0SXRlbUJhc2U+LFxuKTogTURDTGlzdEFkYXB0ZXIge1xuICByZXR1cm4ge1xuICAgIGdldExpc3RJdGVtQ291bnQoKSB7XG4gICAgICByZXR1cm4gbGlzdC5faXRlbXMubGVuZ3RoO1xuICAgIH0sXG4gICAgbGlzdEl0ZW1BdEluZGV4SGFzQ2xhc3MoaW5kZXg6IG51bWJlciwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOiBmYWxzZTtcbiAgICB9LFxuICAgIGFkZENsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk/LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk/LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIGdldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBsaXN0Ll9lbGVtZW50QXRJbmRleChpbmRleCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpIDogbnVsbDtcbiAgICB9LFxuICAgIHNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICB9LFxuICAgIGdldEZvY3VzZWRFbGVtZW50SW5kZXgoKSB7XG4gICAgICByZXR1cm4gbGlzdC5faW5kZXhGb3JFbGVtZW50KGxpc3QuX2RvY3VtZW50Py5hY3RpdmVFbGVtZW50KTtcbiAgICB9LFxuICAgIGlzRm9jdXNJbnNpZGVMaXN0KCkge1xuICAgICAgcmV0dXJuIGxpc3QuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhsaXN0Ll9kb2N1bWVudD8uYWN0aXZlRWxlbWVudCk7XG4gICAgfSxcbiAgICBpc1Jvb3RGb2N1c2VkKCkge1xuICAgICAgcmV0dXJuIGxpc3QuX2VsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gbGlzdC5fZG9jdW1lbnQ/LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfSxcbiAgICBmb2N1c0l0ZW1BdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIGxpc3QuX2VsZW1lbnRBdEluZGV4KGluZGV4KT8uZm9jdXMoKTtcbiAgICB9LFxuICAgIC8vIEdldHMgdGhlIHRleHQgZm9yIGEgbGlzdCBpdGVtIGZvciB0aGUgdHlwZWFoZWFkXG4gICAgZ2V0UHJpbWFyeVRleHRBdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBsaXN0Ll9pdGVtc0FycltpbmRleF0uX2dldEl0ZW1MYWJlbCgpO1xuICAgIH0sXG5cbiAgICAvLyBNREMgdXNlcyB0aGlzIG1ldGhvZCB0byBkaXNhYmxlIGZvY3VzYWJsZSBjaGlsZHJlbiBvZiBsaXN0IGl0ZW1zLiBIb3dldmVyLCB3ZSBiZWxpZXZlIHRoYXRcbiAgICAvLyB0aGlzIGlzIG5vdCBhbiBhY2Nlc3NpYmxlIHBhdHRlcm4gYW5kIHNob3VsZCBiZSBhdm9pZGVkLCB0aGVyZWZvcmUgd2UgaW50ZW50aW9uYWxseSBkbyBub3RcbiAgICAvLyBpbXBsZW1lbnQgdGhpcyBtZXRob2QuIEluIGFkZGl0aW9uLCBpbXBsZW1lbnRpbmcgdGhpcyB3b3VsZCByZXF1aXJlIHZpb2xhdGluZyBBbmd1bGFyXG4gICAgLy8gTWF0ZXJpYWwncyBnZW5lcmFsIHByaW5jaXBsZSBvZiBub3QgaGF2aW5nIGNvbXBvbmVudHMgbW9kaWZ5IERPTSBlbGVtZW50cyB0aGV5IGRvIG5vdCBvd24uXG4gICAgLy8gQSB1c2VyIHdobyBmZWVscyB0aGV5IHJlYWxseSBuZWVkIHRoaXMgZmVhdHVyZSBjYW4gc2ltcGx5IGxpc3RlbiB0byB0aGUgYChmb2N1cylgIGFuZFxuICAgIC8vIGAoYmx1cilgIGV2ZW50cyBvbiB0aGUgbGlzdCBpdGVtIGFuZCBlbmFibGUvZGlzYWJsZSBmb2N1cyBvbiB0aGUgY2hpbGRyZW4gdGhlbXNlbHZlcyBhc1xuICAgIC8vIGFwcHJvcHJpYXRlLlxuICAgIHNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbigpIHt9LFxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBtZXRob2RzIGhhdmUgYSBkdW1teSBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgYmFzZSBjbGFzcyBiZWNhdXNlIHRoZXkgYXJlIG9ubHlcbiAgICAvLyBhcHBsaWNhYmxlIHRvIGNlcnRhaW4gdHlwZXMgb2YgbGlzdHMuIFRoZXkgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciB0aGUgY29uY3JldGUgY2xhc3Nlc1xuICAgIC8vIHdoZXJlIHRoZXkgYXJlIGFwcGxpY2FibGUuXG4gICAgaGFzQ2hlY2tib3hBdEluZGV4KCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgaGFzUmFkaW9BdEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHNldENoZWNrZWRDaGVja2JveE9yUmFkaW9BdEluZGV4KGluZGV4OiBudW1iZXIsIGNoZWNrZWQ6IGJvb2xlYW4pIHt9LFxuICAgIGlzQ2hlY2tib3hDaGVja2VkQXRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBub3RpZnlBY3Rpb24oKSB7fSxcbiAgfTtcbn1cbiJdfQ==