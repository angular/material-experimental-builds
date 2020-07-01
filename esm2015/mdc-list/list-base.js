/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ContentChildren, Directive, ElementRef, HostBinding, HostListener, Inject, NgZone, QueryList } from '@angular/core';
import { RippleRenderer, setLines } from '@angular/material/core';
import { MDCListFoundation } from '@material/list';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
function toggleClass(el, className, on) {
    if (on) {
        el.classList.add(className);
    }
    else {
        el.classList.remove(className);
    }
}
/** @docs-private */
export class MatListItemBase {
    constructor(_elementRef, _ngZone, _listBase, _platform) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._listBase = _listBase;
        this._platform = _platform;
        this.rippleConfig = {};
        this._subscriptions = new Subscription();
        this._initRipple();
    }
    ngAfterContentInit() {
        this._monitorLines();
    }
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
        this._rippleRenderer._removeTriggerEvents();
    }
    _initDefaultTabIndex(tabIndex) {
        const el = this._elementRef.nativeElement;
        if (!el.hasAttribute('tabIndex')) {
            el.tabIndex = tabIndex;
        }
    }
    _initRipple() {
        this.rippleDisabled = this._listBase._isNonInteractive;
        if (!this._listBase._isNonInteractive) {
            this._elementRef.nativeElement.classList.add('mat-mdc-list-item-interactive');
        }
        this._rippleRenderer =
            new RippleRenderer(this, this._ngZone, this._elementRef.nativeElement, this._platform);
        this._rippleRenderer.setupTriggerEvents(this._elementRef.nativeElement);
    }
    /**
     * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
     * change.
     */
    _monitorLines() {
        this._ngZone.runOutsideAngular(() => {
            this._subscriptions.add(this.lines.changes.pipe(startWith(this.lines))
                .subscribe((lines) => {
                this._elementRef.nativeElement.classList
                    .toggle('mat-mdc-list-item-single-line', lines.length <= 1);
                lines.forEach((line, index) => {
                    toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                    toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                });
                setLines(lines, this._elementRef, 'mat-mdc');
            }));
        });
    }
}
MatListItemBase.decorators = [
    { type: Directive }
];
MatListItemBase.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: MatListBase },
    { type: Platform }
];
/** @docs-private */
export class MatListBase {
    constructor() {
        this._isNonInteractive = true;
    }
}
MatListBase.decorators = [
    { type: Directive }
];
MatListBase.propDecorators = {
    _isNonInteractive: [{ type: HostBinding, args: ['class.mdc-list--non-interactive',] }]
};
export class MatInteractiveListBase extends MatListBase {
    constructor(_element, document) {
        super();
        this._element = _element;
        this._adapter = {
            getListItemCount: () => this._items.length,
            listItemAtIndexHasClass: (index, className) => this._elementAtIndex(index).classList.contains(className),
            addClassForElementIndex: (index, className) => this._elementAtIndex(index).classList.add(className),
            removeClassForElementIndex: (index, className) => this._elementAtIndex(index).classList.remove(className),
            getAttributeForElementIndex: (index, attr) => this._elementAtIndex(index).getAttribute(attr),
            setAttributeForElementIndex: (index, attr, value) => this._elementAtIndex(index).setAttribute(attr, value),
            getFocusedElementIndex: () => { var _a; return this._indexForElement((_a = this._document) === null || _a === void 0 ? void 0 : _a.activeElement); },
            isFocusInsideList: () => { var _a; return this._element.nativeElement.contains((_a = this._document) === null || _a === void 0 ? void 0 : _a.activeElement); },
            isRootFocused: () => { var _a; return this._element.nativeElement === ((_a = this._document) === null || _a === void 0 ? void 0 : _a.activeElement); },
            focusItemAtIndex: index => this._elementAtIndex(index).focus(),
            // MDC uses this method to disable focusable children of list items. However, we believe that
            // this is not an accessible pattern and should be avoided, therefore we intentionally do not
            // implement this method. In addition, implementing this would require violating Angular
            // Material's general principle of not having components modify DOM elements they do not own.
            // A user who feels they really need this feature can simply listen to the `(focus)` and
            // `(blur)` events on the list item and enable/disable focus on the children themselves as
            // appropriate.
            setTabIndexForListItemChildren: () => { },
            // The following methods have a dummy implementation in the base class because they are only
            // applicable to certain types of lists. They should be implemented for the concrete classes
            // where they are applicable.
            hasCheckboxAtIndex: () => false,
            hasRadioAtIndex: () => false,
            setCheckedCheckboxOrRadioAtIndex: () => { },
            isCheckboxCheckedAtIndex: () => false,
            // TODO(mmalerba): Determine if we need to implement these.
            getPrimaryTextAtIndex: () => '',
            notifyAction: () => { },
        };
        this._itemsArr = [];
        this._subscriptions = new Subscription();
        this._document = document;
        this._isNonInteractive = false;
        this._foundation = new MDCListFoundation(this._adapter);
    }
    _handleKeydown(event) {
        const index = this._indexForElement(event.target);
        this._foundation.handleKeydown(event, this._elementAtIndex(index) === event.target, index);
    }
    _handleClick(event) {
        this._foundation.handleClick(this._indexForElement(event.target), false);
    }
    _handleFocusin(event) {
        this._foundation.handleFocusIn(event, this._indexForElement(event.target));
    }
    _handleFocusout(event) {
        this._foundation.handleFocusOut(event, this._indexForElement(event.target));
    }
    ngAfterViewInit() {
        this._initItems();
        this._foundation.init();
        this._foundation.layout();
    }
    ngOnDestroy() {
        this._foundation.destroy();
        this._subscriptions.unsubscribe();
    }
    _initItems() {
        this._subscriptions.add(this._items.changes.pipe(startWith(null))
            .subscribe(() => this._itemsArr = this._items.toArray()));
        for (let i = 0; this._itemsArr.length; i++) {
            this._itemsArr[i]._initDefaultTabIndex(i === 0 ? 0 : -1);
        }
    }
    _itemAtIndex(index) {
        return this._itemsArr[index];
    }
    _elementAtIndex(index) {
        return this._itemAtIndex(index)._elementRef.nativeElement;
    }
    _indexForElement(element) {
        return element ?
            this._itemsArr.findIndex(i => i._elementRef.nativeElement.contains(element)) : -1;
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
    _handleFocusout: [{ type: HostListener, args: ['focusout', ['$event'],] }],
    _items: [{ type: ContentChildren, args: [MatListItemBase, { descendants: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBR0wsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sTUFBTSxFQUVOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsY0FBYyxFQUFnQixRQUFRLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RixPQUFPLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFekMsU0FBUyxXQUFXLENBQUMsRUFBVyxFQUFFLFNBQWlCLEVBQUUsRUFBVztJQUM5RCxJQUFJLEVBQUUsRUFBRTtRQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNoQztBQUNILENBQUM7QUFHRCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFnQixlQUFlO0lBWW5DLFlBQTZCLFdBQW9DLEVBQVksT0FBZSxFQUM5RCxTQUFzQixFQUFVLFNBQW1CO1FBRHBELGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDOUQsY0FBUyxHQUFULFNB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QVEsQ0FBQzs4QkFLbEMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkFLbkMsZUFBZSxTQUFDLGVBQWUsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSaXBwbGVDb25maWcsIFJpcHBsZVJlbmRlcmVyLCBSaXBwbGVUYXJnZXQsIHNldExpbmVzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TURDTGlzdEFkYXB0ZXIsIE1EQ0xpc3RGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbDogRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIG9uOiBib29sZWFuKSB7XG4gIGlmIChvbikge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RJdGVtQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgUmlwcGxlVGFyZ2V0IHtcbiAgbGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PjtcblxuICByaXBwbGVDb25maWc6IFJpcHBsZUNvbmZpZyA9IHt9O1xuXG4gIC8vIFRPRE8obW1hbGVyYmEpOiBBZGQgQElucHV0IGZvciBkaXNhYmxpbmcgcmlwcGxlLlxuICByaXBwbGVEaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIHByaXZhdGUgX3JpcHBsZVJlbmRlcmVyOiBSaXBwbGVSZW5kZXJlcjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJvdGVjdGVkIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgX2xpc3RCYXNlOiBNYXRMaXN0QmFzZSwgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgdGhpcy5faW5pdFJpcHBsZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX21vbml0b3JMaW5lcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLl9yZW1vdmVUcmlnZ2VyRXZlbnRzKCk7XG4gIH1cblxuICBfaW5pdERlZmF1bHRUYWJJbmRleCh0YWJJbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoJ3RhYkluZGV4JykpIHtcbiAgICAgIGVsLnRhYkluZGV4ID0gdGFiSW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJpcHBsZSgpIHtcbiAgICB0aGlzLnJpcHBsZURpc2FibGVkID0gdGhpcy5fbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmU7XG4gICAgaWYgKCF0aGlzLl9saXN0QmFzZS5faXNOb25JbnRlcmFjdGl2ZSkge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtbGlzdC1pdGVtLWludGVyYWN0aXZlJyk7XG4gICAgfVxuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyID1cbiAgICAgICAgbmV3IFJpcHBsZVJlbmRlcmVyKHRoaXMsIHRoaXMuX25nWm9uZSwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9wbGF0Zm9ybSk7XG4gICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIuc2V0dXBUcmlnZ2VyRXZlbnRzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byBjaGFuZ2VzIGluIGBNYXRMaW5lYCBjb250ZW50IGNoaWxkcmVuIGFuZCBhbm5vdGF0ZXMgdGhlbSBhcHByb3ByaWF0ZWx5IHdoZW4gdGhleVxuICAgKiBjaGFuZ2UuXG4gICAqL1xuICBwcml2YXRlIF9tb25pdG9yTGluZXMoKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRoaXMubGluZXMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aCh0aGlzLmxpbmVzKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChsaW5lczogUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0XG4gICAgICAgICAgICAgICAgLnRvZ2dsZSgnbWF0LW1kYy1saXN0LWl0ZW0tc2luZ2xlLWxpbmUnLCBsaW5lcy5sZW5ndGggPD0gMSk7XG4gICAgICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lOiBFbGVtZW50UmVmPEVsZW1lbnQ+LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGxpbmUubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICdtZGMtbGlzdC1pdGVtX19wcmltYXJ5LXRleHQnLCBpbmRleCA9PT0gMCAmJiBsaW5lcy5sZW5ndGggPiAxKTtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MobGluZS5uYXRpdmVFbGVtZW50LCAnbWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQnLCBpbmRleCAhPT0gMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldExpbmVzKGxpbmVzLCB0aGlzLl9lbGVtZW50UmVmLCAnbWF0LW1kYycpO1xuICAgICAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0TGlzdEJhc2Uge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUnKVxuICBfaXNOb25JbnRlcmFjdGl2ZTogYm9vbGVhbiA9IHRydWU7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdEludGVyYWN0aXZlTGlzdEJhc2UgZXh0ZW5kcyBNYXRMaXN0QmFzZVxuICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUtleWRvd24oXG4gICAgICAgIGV2ZW50LCB0aGlzLl9lbGVtZW50QXRJbmRleChpbmRleCkgPT09IGV2ZW50LnRhcmdldCwgaW5kZXgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBfaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUNsaWNrKHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLCBmYWxzZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1c2luJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUZvY3VzaW4oZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUZvY3VzSW4oZXZlbnQsIHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUZvY3Vzb3V0KGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVGb2N1c091dChldmVudCwgdGhpcy5faW5kZXhGb3JFbGVtZW50KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaXN0SXRlbUJhc2UsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9pdGVtczogUXVlcnlMaXN0PE1hdExpc3RJdGVtQmFzZT47XG5cbiAgcHJvdGVjdGVkIF9hZGFwdGVyOiBNRENMaXN0QWRhcHRlciA9IHtcbiAgICBnZXRMaXN0SXRlbUNvdW50OiAoKSA9PiB0aGlzLl9pdGVtcy5sZW5ndGgsXG4gICAgbGlzdEl0ZW1BdEluZGV4SGFzQ2xhc3M6XG4gICAgICAgIChpbmRleCwgY2xhc3NOYW1lKSA9PiB0aGlzLl9lbGVtZW50QXRJbmRleChpbmRleCkuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXg6XG4gICAgICAgIChpbmRleCwgY2xhc3NOYW1lKSA9PiB0aGlzLl9lbGVtZW50QXRJbmRleChpbmRleCkuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4OlxuICAgICAgICAoaW5kZXgsIGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICBnZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXg6IChpbmRleCwgYXR0cikgPT4gdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpLmdldEF0dHJpYnV0ZShhdHRyKSxcbiAgICBzZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXg6XG4gICAgICAgIChpbmRleCwgYXR0ciwgdmFsdWUpID0+IHRoaXMuX2VsZW1lbnRBdEluZGV4KGluZGV4KS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxuICAgIGdldEZvY3VzZWRFbGVtZW50SW5kZXg6ICgpID0+IHRoaXMuX2luZGV4Rm9yRWxlbWVudCh0aGlzLl9kb2N1bWVudD8uYWN0aXZlRWxlbWVudCksXG4gICAgaXNGb2N1c0luc2lkZUxpc3Q6ICgpID0+IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudD8uYWN0aXZlRWxlbWVudCksXG4gICAgaXNSb290Rm9jdXNlZDogKCkgPT4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudD8uYWN0aXZlRWxlbWVudCxcbiAgICBmb2N1c0l0ZW1BdEluZGV4OiBpbmRleCA9PiAgdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpLmZvY3VzKCksXG5cbiAgICAvLyBNREMgdXNlcyB0aGlzIG1ldGhvZCB0byBkaXNhYmxlIGZvY3VzYWJsZSBjaGlsZHJlbiBvZiBsaXN0IGl0ZW1zLiBIb3dldmVyLCB3ZSBiZWxpZXZlIHRoYXRcbiAgICAvLyB0aGlzIGlzIG5vdCBhbiBhY2Nlc3NpYmxlIHBhdHRlcm4gYW5kIHNob3VsZCBiZSBhdm9pZGVkLCB0aGVyZWZvcmUgd2UgaW50ZW50aW9uYWxseSBkbyBub3RcbiAgICAvLyBpbXBsZW1lbnQgdGhpcyBtZXRob2QuIEluIGFkZGl0aW9uLCBpbXBsZW1lbnRpbmcgdGhpcyB3b3VsZCByZXF1aXJlIHZpb2xhdGluZyBBbmd1bGFyXG4gICAgLy8gTWF0ZXJpYWwncyBnZW5lcmFsIHByaW5jaXBsZSBvZiBub3QgaGF2aW5nIGNvbXBvbmVudHMgbW9kaWZ5IERPTSBlbGVtZW50cyB0aGV5IGRvIG5vdCBvd24uXG4gICAgLy8gQSB1c2VyIHdobyBmZWVscyB0aGV5IHJlYWxseSBuZWVkIHRoaXMgZmVhdHVyZSBjYW4gc2ltcGx5IGxpc3RlbiB0byB0aGUgYChmb2N1cylgIGFuZFxuICAgIC8vIGAoYmx1cilgIGV2ZW50cyBvbiB0aGUgbGlzdCBpdGVtIGFuZCBlbmFibGUvZGlzYWJsZSBmb2N1cyBvbiB0aGUgY2hpbGRyZW4gdGhlbXNlbHZlcyBhc1xuICAgIC8vIGFwcHJvcHJpYXRlLlxuICAgIHNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbjogKCkgPT4ge30sXG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIG1ldGhvZHMgaGF2ZSBhIGR1bW15IGltcGxlbWVudGF0aW9uIGluIHRoZSBiYXNlIGNsYXNzIGJlY2F1c2UgdGhleSBhcmUgb25seVxuICAgIC8vIGFwcGxpY2FibGUgdG8gY2VydGFpbiB0eXBlcyBvZiBsaXN0cy4gVGhleSBzaG91bGQgYmUgaW1wbGVtZW50ZWQgZm9yIHRoZSBjb25jcmV0ZSBjbGFzc2VzXG4gICAgLy8gd2hlcmUgdGhleSBhcmUgYXBwbGljYWJsZS5cbiAgICBoYXNDaGVja2JveEF0SW5kZXg6ICgpID0+IGZhbHNlLFxuICAgIGhhc1JhZGlvQXRJbmRleDogKCkgPT4gZmFsc2UsXG4gICAgc2V0Q2hlY2tlZENoZWNrYm94T3JSYWRpb0F0SW5kZXg6ICgpID0+IHt9LFxuICAgIGlzQ2hlY2tib3hDaGVja2VkQXRJbmRleDogKCkgPT4gZmFsc2UsXG5cbiAgICAvLyBUT0RPKG1tYWxlcmJhKTogRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gaW1wbGVtZW50IHRoZXNlLlxuICAgIGdldFByaW1hcnlUZXh0QXRJbmRleDogKCkgPT4gJycsXG4gICAgbm90aWZ5QWN0aW9uOiAoKSA9PiB7fSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgX2ZvdW5kYXRpb246IE1EQ0xpc3RGb3VuZGF0aW9uO1xuXG4gIHByb3RlY3RlZCBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIHByaXZhdGUgX2l0ZW1zQXJyOiBNYXRMaXN0SXRlbUJhc2VbXSA9IFtdO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLl9pc05vbkludGVyYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENMaXN0Rm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9pbml0SXRlbXMoKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmxheW91dCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEl0ZW1zKCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgICB0aGlzLl9pdGVtcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9pdGVtc0FyciA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKSkpO1xuICAgIGZvciAobGV0IGkgPSAwOyB0aGlzLl9pdGVtc0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5faXRlbXNBcnJbaV0uX2luaXREZWZhdWx0VGFiSW5kZXgoaSA9PT0gMCA/IDAgOiAtMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXRlbUF0SW5kZXgoaW5kZXg6IG51bWJlcik6IE1hdExpc3RJdGVtQmFzZSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zQXJyW2luZGV4XTtcbiAgfVxuXG4gIHByaXZhdGUgX2VsZW1lbnRBdEluZGV4KGluZGV4OiBudW1iZXIpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1BdEluZGV4KGluZGV4KS5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5kZXhGb3JFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQgP1xuICAgICAgICB0aGlzLl9pdGVtc0Fyci5maW5kSW5kZXgoaSA9PiBpLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZWxlbWVudCkpIDogLTE7XG4gIH1cbn1cblxuIl19