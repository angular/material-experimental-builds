/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-list/list-base.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, HostBinding, NgZone } from '@angular/core';
import { RippleRenderer, setLines } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
/**
 * @param {?} el
 * @param {?} className
 * @param {?} on
 * @return {?}
 */
function toggleClass(el, className, on) {
    if (on) {
        el.classList.add(className);
    }
    else {
        el.classList.remove(className);
    }
}
/**
 * @abstract
 */
/** @docs-private */
export class MatListBase {
    constructor() {
        // @HostBinding is used in the class as it is expected to be extended. Since @Component decorator
        // metadata is not inherited by child classes, instead the host binding data is defined in a way
        // that can be inherited.
        // tslint:disable-next-line:no-host-decorator-in-concrete
        this._isNonInteractive = false;
    }
}
MatListBase.decorators = [
    { type: Directive }
];
MatListBase.propDecorators = {
    _isNonInteractive: [{ type: HostBinding, args: ['class.mdc-list--non-interactive',] }]
};
if (false) {
    /** @type {?} */
    MatListBase.prototype._isNonInteractive;
}
/**
 * @abstract
 */
/** @docs-private */
export class MatListItemBase {
    /**
     * @param {?} _element
     * @param {?} _ngZone
     * @param {?} listBase
     * @param {?} platform
     */
    constructor(_element, _ngZone, listBase, platform) {
        this._element = _element;
        this._ngZone = _ngZone;
        this.rippleConfig = {};
        this._subscriptions = new Subscription();
        /** @type {?} */
        const el = this._element.nativeElement;
        this.rippleDisabled = listBase._isNonInteractive;
        if (!listBase._isNonInteractive) {
            el.classList.add('mat-mdc-list-item-interactive');
        }
        this._rippleRenderer =
            new RippleRenderer(this, this._ngZone, el, platform);
        this._rippleRenderer.setupTriggerEvents(el);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._monitorLines();
    }
    /**
     * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
     * change.
     * @private
     * @return {?}
     */
    _monitorLines() {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this._subscriptions.add(this.lines.changes.pipe(startWith(this.lines))
                .subscribe((/**
             * @param {?} lines
             * @return {?}
             */
            (lines) => {
                lines.forEach((/**
                 * @param {?} line
                 * @param {?} index
                 * @return {?}
                 */
                (line, index) => {
                    toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                    toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                }));
                setLines(lines, this._element, 'mat-mdc');
            })));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
        this._rippleRenderer._removeTriggerEvents();
    }
}
MatListItemBase.decorators = [
    { type: Directive }
];
/** @nocollapse */
MatListItemBase.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: MatListBase },
    { type: Platform }
];
if (false) {
    /** @type {?} */
    MatListItemBase.prototype.lines;
    /** @type {?} */
    MatListItemBase.prototype.rippleConfig;
    /** @type {?} */
    MatListItemBase.prototype.rippleDisabled;
    /**
     * @type {?}
     * @private
     */
    MatListItemBase.prototype._subscriptions;
    /**
     * @type {?}
     * @private
     */
    MatListItemBase.prototype._rippleRenderer;
    /**
     * @type {?}
     * @protected
     */
    MatListItemBase.prototype._element;
    /**
     * @type {?}
     * @protected
     */
    MatListItemBase.prototype._ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLEVBR1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGNBQWMsRUFBZ0IsUUFBUSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFFekMsU0FBUyxXQUFXLENBQUMsRUFBVyxFQUFFLFNBQWlCLEVBQUUsRUFBVztJQUM5RCxJQUFJLEVBQUUsRUFBRTtRQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNoQztBQUNILENBQUM7Ozs7QUFHRCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFnQixXQUFXO0lBRmpDOzs7OztRQVFFLHNCQUFpQixHQUFZLEtBQUssQ0FBQztJQUNyQyxDQUFDOzs7WUFUQSxTQUFTOzs7Z0NBT1AsV0FBVyxTQUFDLGlDQUFpQzs7OztJQUE5Qyx3Q0FDbUM7Ozs7O0FBSXJDLG9CQUFvQjtBQUNwQixNQUFNLE9BQWdCLGVBQWU7Ozs7Ozs7SUFZbkMsWUFBc0IsUUFBb0IsRUFBWSxPQUFlLEVBQUUsUUFBcUIsRUFDaEYsUUFBa0I7UUFEUixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVksWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVRyRSxpQkFBWSxHQUFpQixFQUFFLENBQUM7UUFLeEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztjQU1wQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDL0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNuRDtRQUNELElBQUksQ0FBQyxlQUFlO1lBQ2hCLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUFNTyxhQUFhO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pFLFNBQVM7Ozs7WUFBQyxDQUFDLEtBQXFDLEVBQUUsRUFBRTtnQkFDbkQsS0FBSyxDQUFDLE9BQU87Ozs7O2dCQUFDLENBQUMsSUFBeUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtvQkFDekQsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQzFCLDZCQUE2QixFQUFFLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDcEUsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsK0JBQStCLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixDQUFDLEVBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QyxDQUFDOzs7WUFuREYsU0FBUzs7OztZQTdCUixVQUFVO1lBRVYsTUFBTTtZQXlDMkUsV0FBVztZQS9DdEYsUUFBUTs7OztJQW9DZCxnQ0FBc0M7O0lBRXRDLHVDQUFnQzs7SUFHaEMseUNBQXdCOzs7OztJQUV4Qix5Q0FBNEM7Ozs7O0lBRTVDLDBDQUF3Qzs7Ozs7SUFFNUIsbUNBQThCOzs7OztJQUFFLGtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmlwcGxlQ29uZmlnLCBSaXBwbGVSZW5kZXJlciwgUmlwcGxlVGFyZ2V0LCBzZXRMaW5lc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbDogRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIG9uOiBib29sZWFuKSB7XG4gIGlmIChvbikge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RCYXNlIHtcbiAgLy8gQEhvc3RCaW5kaW5nIGlzIHVzZWQgaW4gdGhlIGNsYXNzIGFzIGl0IGlzIGV4cGVjdGVkIHRvIGJlIGV4dGVuZGVkLiBTaW5jZSBAQ29tcG9uZW50IGRlY29yYXRvclxuICAvLyBtZXRhZGF0YSBpcyBub3QgaW5oZXJpdGVkIGJ5IGNoaWxkIGNsYXNzZXMsIGluc3RlYWQgdGhlIGhvc3QgYmluZGluZyBkYXRhIGlzIGRlZmluZWQgaW4gYSB3YXlcbiAgLy8gdGhhdCBjYW4gYmUgaW5oZXJpdGVkLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlJylcbiAgX2lzTm9uSW50ZXJhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RJdGVtQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgUmlwcGxlVGFyZ2V0IHtcbiAgbGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PjtcblxuICByaXBwbGVDb25maWc6IFJpcHBsZUNvbmZpZyA9IHt9O1xuXG4gIC8vIFRPRE8obW1hbGVyYmEpOiBBZGQgQElucHV0IGZvciBkaXNhYmxpbmcgcmlwcGxlLlxuICByaXBwbGVEaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIHByaXZhdGUgX3JpcHBsZVJlbmRlcmVyOiBSaXBwbGVSZW5kZXJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsIGxpc3RCYXNlOiBNYXRMaXN0QmFzZSxcbiAgICAgICAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yaXBwbGVEaXNhYmxlZCA9IGxpc3RCYXNlLl9pc05vbkludGVyYWN0aXZlO1xuICAgIGlmICghbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtbGlzdC1pdGVtLWludGVyYWN0aXZlJyk7XG4gICAgfVxuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyID1cbiAgICAgICAgbmV3IFJpcHBsZVJlbmRlcmVyKHRoaXMsIHRoaXMuX25nWm9uZSwgZWwsIHBsYXRmb3JtKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXR1cFRyaWdnZXJFdmVudHMoZWwpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX21vbml0b3JMaW5lcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiBgTWF0TGluZWAgY29udGVudCBjaGlsZHJlbiBhbmQgYW5ub3RhdGVzIHRoZW0gYXBwcm9wcmlhdGVseSB3aGVuIHRoZXlcbiAgICogY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW9uaXRvckxpbmVzKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmxpbmVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogRWxlbWVudFJlZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhsaW5lLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAnbWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0JywgaW5kZXggPT09IDAgJiYgbGluZXMubGVuZ3RoID4gMSk7XG4gICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGxpbmUubmF0aXZlRWxlbWVudCwgJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JywgaW5kZXggIT09IDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaW5lcyhsaW5lcywgdGhpcy5fZWxlbWVudCwgJ21hdC1tZGMnKTtcbiAgICAgICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIuX3JlbW92ZVRyaWdnZXJFdmVudHMoKTtcbiAgfVxufVxuIl19