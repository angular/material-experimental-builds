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
        this._subscriptions.add(this._items.changes.pipe(startWith(null)).subscribe(() => {
            this._itemsArr = this._items.toArray();
        }));
        for (let i = 0; i < this._itemsArr.length; i++) {
            this._itemsArr[i]._initDefaultTabIndex(i === 0 ? 0 : -1);
        }
    }
    _elementAtIndex(index) {
        return this._itemsArr[index]._elementRef.nativeElement;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBR0wsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sTUFBTSxFQUVOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsY0FBYyxFQUFnQixRQUFRLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RixPQUFPLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFekMsU0FBUyxXQUFXLENBQUMsRUFBVyxFQUFFLFNBQWlCLEVBQUUsRUFBVztJQUM5RCxJQUFJLEVBQUUsRUFBRTtRQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNoQztBQUNILENBQUM7QUFHRCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFnQixlQUFlO0lBWW5DLFlBQTZCLFdBQW9DLEVBQVksT0FBZSxFQUM5RCxTQUFzQixFQUFVLFNBQW1CO1FBRHBELGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDOUQsY0FBUyxHQUFULFNB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S25DLGVBQWUsU0FBQyxlQUFlLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmlwcGxlQ29uZmlnLCBSaXBwbGVSZW5kZXJlciwgUmlwcGxlVGFyZ2V0LCBzZXRMaW5lc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01EQ0xpc3RBZGFwdGVyLCBNRENMaXN0Rm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWw6IEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBvbjogYm9vbGVhbikge1xuICBpZiAob24pIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0SXRlbUJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIFJpcHBsZVRhcmdldCB7XG4gIGxpbmVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj47XG5cbiAgcmlwcGxlQ29uZmlnOiBSaXBwbGVDb25maWcgPSB7fTtcblxuICAvLyBUT0RPKG1tYWxlcmJhKTogQWRkIEBJbnB1dCBmb3IgZGlzYWJsaW5nIHJpcHBsZS5cbiAgcmlwcGxlRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBwcml2YXRlIF9yaXBwbGVSZW5kZXJlcjogUmlwcGxlUmVuZGVyZXI7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlIF9saXN0QmFzZTogTWF0TGlzdEJhc2UsIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgIHRoaXMuX2luaXRSaXBwbGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9tb25pdG9yTGluZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5fcmVtb3ZlVHJpZ2dlckV2ZW50cygpO1xuICB9XG5cbiAgX2luaXREZWZhdWx0VGFiSW5kZXgodGFiSW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IGVsID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmICghZWwuaGFzQXR0cmlidXRlKCd0YWJJbmRleCcpKSB7XG4gICAgICBlbC50YWJJbmRleCA9IHRhYkluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSaXBwbGUoKSB7XG4gICAgdGhpcy5yaXBwbGVEaXNhYmxlZCA9IHRoaXMuX2xpc3RCYXNlLl9pc05vbkludGVyYWN0aXZlO1xuICAgIGlmICghdGhpcy5fbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLWxpc3QtaXRlbS1pbnRlcmFjdGl2ZScpO1xuICAgIH1cbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlciA9XG4gICAgICAgIG5ldyBSaXBwbGVSZW5kZXJlcih0aGlzLCB0aGlzLl9uZ1pvbmUsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fcGxhdGZvcm0pO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLnNldHVwVHJpZ2dlckV2ZW50cyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiBgTWF0TGluZWAgY29udGVudCBjaGlsZHJlbiBhbmQgYW5ub3RhdGVzIHRoZW0gYXBwcm9wcmlhdGVseSB3aGVuIHRoZXlcbiAgICogY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW9uaXRvckxpbmVzKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmxpbmVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdFxuICAgICAgICAgICAgICAgIC50b2dnbGUoJ21hdC1tZGMtbGlzdC1pdGVtLXNpbmdsZS1saW5lJywgbGluZXMubGVuZ3RoIDw9IDEpO1xuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogRWxlbWVudFJlZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhsaW5lLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAnbWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0JywgaW5kZXggPT09IDAgJiYgbGluZXMubGVuZ3RoID4gMSk7XG4gICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGxpbmUubmF0aXZlRWxlbWVudCwgJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JywgaW5kZXggIT09IDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaW5lcyhsaW5lcywgdGhpcy5fZWxlbWVudFJlZiwgJ21hdC1tZGMnKTtcbiAgICAgICAgICB9KSk7XG4gICAgfSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RCYXNlIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlJylcbiAgX2lzTm9uSW50ZXJhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRJbnRlcmFjdGl2ZUxpc3RCYXNlIGV4dGVuZHMgTWF0TGlzdEJhc2VcbiAgICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXhGb3JFbGVtZW50KGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVLZXlkb3duKFxuICAgICAgICBldmVudCwgdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpID09PSBldmVudC50YXJnZXQsIGluZGV4KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVDbGljayh0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSwgZmFsc2UpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNpbicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVGb2N1c2luKGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5oYW5kbGVGb2N1c0luKGV2ZW50LCB0aGlzLl9pbmRleEZvckVsZW1lbnQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVGb2N1c291dChldmVudDogRm9jdXNFdmVudCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlRm9jdXNPdXQoZXZlbnQsIHRoaXMuX2luZGV4Rm9yRWxlbWVudChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0TGlzdEl0ZW1CYXNlLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfaXRlbXM6IFF1ZXJ5TGlzdDxNYXRMaXN0SXRlbUJhc2U+O1xuXG4gIHByb3RlY3RlZCBfYWRhcHRlcjogTURDTGlzdEFkYXB0ZXIgPSB7XG4gICAgZ2V0TGlzdEl0ZW1Db3VudDogKCkgPT4gdGhpcy5faXRlbXMubGVuZ3RoLFxuICAgIGxpc3RJdGVtQXRJbmRleEhhc0NsYXNzOlxuICAgICAgICAoaW5kZXgsIGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIGFkZENsYXNzRm9yRWxlbWVudEluZGV4OlxuICAgICAgICAoaW5kZXgsIGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudEF0SW5kZXgoaW5kZXgpLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzc0ZvckVsZW1lbnRJbmRleDpcbiAgICAgICAgKGluZGV4LCBjbGFzc05hbWUpID0+IHRoaXMuX2VsZW1lbnRBdEluZGV4KGluZGV4KS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgZ2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiAoaW5kZXgsIGF0dHIpID0+IHRoaXMuX2VsZW1lbnRBdEluZGV4KGluZGV4KS5nZXRBdHRyaWJ1dGUoYXR0ciksXG4gICAgc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OlxuICAgICAgICAoaW5kZXgsIGF0dHIsIHZhbHVlKSA9PiB0aGlzLl9lbGVtZW50QXRJbmRleChpbmRleCkuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKSxcbiAgICBnZXRGb2N1c2VkRWxlbWVudEluZGV4OiAoKSA9PiB0aGlzLl9pbmRleEZvckVsZW1lbnQodGhpcy5fZG9jdW1lbnQ/LmFjdGl2ZUVsZW1lbnQpLFxuICAgIGlzRm9jdXNJbnNpZGVMaXN0OiAoKSA9PiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGhpcy5fZG9jdW1lbnQ/LmFjdGl2ZUVsZW1lbnQpLFxuICAgIGlzUm9vdEZvY3VzZWQ6ICgpID0+IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gdGhpcy5fZG9jdW1lbnQ/LmFjdGl2ZUVsZW1lbnQsXG4gICAgZm9jdXNJdGVtQXRJbmRleDogaW5kZXggPT4gIHRoaXMuX2VsZW1lbnRBdEluZGV4KGluZGV4KS5mb2N1cygpLFxuXG4gICAgLy8gTURDIHVzZXMgdGhpcyBtZXRob2QgdG8gZGlzYWJsZSBmb2N1c2FibGUgY2hpbGRyZW4gb2YgbGlzdCBpdGVtcy4gSG93ZXZlciwgd2UgYmVsaWV2ZSB0aGF0XG4gICAgLy8gdGhpcyBpcyBub3QgYW4gYWNjZXNzaWJsZSBwYXR0ZXJuIGFuZCBzaG91bGQgYmUgYXZvaWRlZCwgdGhlcmVmb3JlIHdlIGludGVudGlvbmFsbHkgZG8gbm90XG4gICAgLy8gaW1wbGVtZW50IHRoaXMgbWV0aG9kLiBJbiBhZGRpdGlvbiwgaW1wbGVtZW50aW5nIHRoaXMgd291bGQgcmVxdWlyZSB2aW9sYXRpbmcgQW5ndWxhclxuICAgIC8vIE1hdGVyaWFsJ3MgZ2VuZXJhbCBwcmluY2lwbGUgb2Ygbm90IGhhdmluZyBjb21wb25lbnRzIG1vZGlmeSBET00gZWxlbWVudHMgdGhleSBkbyBub3Qgb3duLlxuICAgIC8vIEEgdXNlciB3aG8gZmVlbHMgdGhleSByZWFsbHkgbmVlZCB0aGlzIGZlYXR1cmUgY2FuIHNpbXBseSBsaXN0ZW4gdG8gdGhlIGAoZm9jdXMpYCBhbmRcbiAgICAvLyBgKGJsdXIpYCBldmVudHMgb24gdGhlIGxpc3QgaXRlbSBhbmQgZW5hYmxlL2Rpc2FibGUgZm9jdXMgb24gdGhlIGNoaWxkcmVuIHRoZW1zZWx2ZXMgYXNcbiAgICAvLyBhcHByb3ByaWF0ZS5cbiAgICBzZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW46ICgpID0+IHt9LFxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBtZXRob2RzIGhhdmUgYSBkdW1teSBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgYmFzZSBjbGFzcyBiZWNhdXNlIHRoZXkgYXJlIG9ubHlcbiAgICAvLyBhcHBsaWNhYmxlIHRvIGNlcnRhaW4gdHlwZXMgb2YgbGlzdHMuIFRoZXkgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciB0aGUgY29uY3JldGUgY2xhc3Nlc1xuICAgIC8vIHdoZXJlIHRoZXkgYXJlIGFwcGxpY2FibGUuXG4gICAgaGFzQ2hlY2tib3hBdEluZGV4OiAoKSA9PiBmYWxzZSxcbiAgICBoYXNSYWRpb0F0SW5kZXg6ICgpID0+IGZhbHNlLFxuICAgIHNldENoZWNrZWRDaGVja2JveE9yUmFkaW9BdEluZGV4OiAoKSA9PiB7fSxcbiAgICBpc0NoZWNrYm94Q2hlY2tlZEF0SW5kZXg6ICgpID0+IGZhbHNlLFxuXG4gICAgLy8gVE9ETyhtbWFsZXJiYSk6IERldGVybWluZSBpZiB3ZSBuZWVkIHRvIGltcGxlbWVudCB0aGVzZS5cbiAgICBnZXRQcmltYXJ5VGV4dEF0SW5kZXg6ICgpID0+ICcnLFxuICAgIG5vdGlmeUFjdGlvbjogKCkgPT4ge30sXG4gIH07XG5cbiAgcHJvdGVjdGVkIF9mb3VuZGF0aW9uOiBNRENMaXN0Rm91bmRhdGlvbjtcblxuICBwcm90ZWN0ZWQgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICBwcml2YXRlIF9pdGVtc0FycjogTWF0TGlzdEl0ZW1CYXNlW10gPSBbXTtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy5faXNOb25JbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDTGlzdEZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faW5pdEl0ZW1zKCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5sYXlvdXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRJdGVtcygpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9pdGVtcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5faXRlbXNBcnIgPSB0aGlzLl9pdGVtcy50b0FycmF5KCk7XG4gICAgfSkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9pdGVtc0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5faXRlbXNBcnJbaV0uX2luaXREZWZhdWx0VGFiSW5kZXgoaSA9PT0gMCA/IDAgOiAtMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZWxlbWVudEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXNBcnJbaW5kZXhdLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9pbmRleEZvckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcbiAgICByZXR1cm4gZWxlbWVudCA/XG4gICAgICAgIHRoaXMuX2l0ZW1zQXJyLmZpbmRJbmRleChpID0+IGkuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhlbGVtZW50KSkgOiAtMTtcbiAgfVxufVxuXG4iXX0=