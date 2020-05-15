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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLEVBR1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGNBQWMsRUFBZ0IsUUFBUSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFFekMsU0FBUyxXQUFXLENBQUMsRUFBVyxFQUFFLFNBQWlCLEVBQUUsRUFBVztJQUM5RCxJQUFJLEVBQUUsRUFBRTtRQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNoQztBQUNILENBQUM7Ozs7QUFHRCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFnQixXQUFXO0lBRmpDOzs7OztRQVFFLHNCQUFpQixHQUFZLEtBQUssQ0FBQztJQUNyQyxDQUFDOzs7WUFUQSxTQUFTOzs7Z0NBT1AsV0FBVyxTQUFDLGlDQUFpQzs7OztJQUE5Qyx3Q0FDbUM7Ozs7O0FBSXJDLG9CQUFvQjtBQUNwQixNQUFNLE9BQWdCLGVBQWU7Ozs7Ozs7SUFXbkMsWUFBc0IsUUFBb0IsRUFBWSxPQUFlLEVBQUUsUUFBcUIsRUFDaEYsUUFBa0I7UUFEUixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVksWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVJyRSxpQkFBWSxHQUFpQixFQUFFLENBQUM7UUFJeEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztjQU1wQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDL0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNuRDtRQUNELElBQUksQ0FBQyxlQUFlO1lBQ2hCLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUFNTyxhQUFhO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pFLFNBQVM7Ozs7WUFBQyxDQUFDLEtBQXFDLEVBQUUsRUFBRTtnQkFDbkQsS0FBSyxDQUFDLE9BQU87Ozs7O2dCQUFDLENBQUMsSUFBeUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtvQkFDekQsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQzFCLDZCQUE2QixFQUFFLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDcEUsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsK0JBQStCLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixDQUFDLEVBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QyxDQUFDOzs7WUFsREYsU0FBUzs7OztZQTdCUixVQUFVO1lBRVYsTUFBTTtZQXdDMkUsV0FBVztZQTlDdEYsUUFBUTs7OztJQW9DZCxnQ0FBc0M7O0lBRXRDLHVDQUFnQzs7SUFFaEMseUNBQXdCOzs7OztJQUV4Qix5Q0FBNEM7Ozs7O0lBRTVDLDBDQUF3Qzs7Ozs7SUFFNUIsbUNBQThCOzs7OztJQUFFLGtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmlwcGxlQ29uZmlnLCBSaXBwbGVSZW5kZXJlciwgUmlwcGxlVGFyZ2V0LCBzZXRMaW5lc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbDogRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIG9uOiBib29sZWFuKSB7XG4gIGlmIChvbikge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RCYXNlIHtcbiAgLy8gQEhvc3RCaW5kaW5nIGlzIHVzZWQgaW4gdGhlIGNsYXNzIGFzIGl0IGlzIGV4cGVjdGVkIHRvIGJlIGV4dGVuZGVkLiBTaW5jZSBAQ29tcG9uZW50IGRlY29yYXRvclxuICAvLyBtZXRhZGF0YSBpcyBub3QgaW5oZXJpdGVkIGJ5IGNoaWxkIGNsYXNzZXMsIGluc3RlYWQgdGhlIGhvc3QgYmluZGluZyBkYXRhIGlzIGRlZmluZWQgaW4gYSB3YXlcbiAgLy8gdGhhdCBjYW4gYmUgaW5oZXJpdGVkLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlJylcbiAgX2lzTm9uSW50ZXJhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RJdGVtQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgUmlwcGxlVGFyZ2V0IHtcbiAgbGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PjtcblxuICByaXBwbGVDb25maWc6IFJpcHBsZUNvbmZpZyA9IHt9O1xuXG4gIHJpcHBsZURpc2FibGVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgcHJpdmF0ZSBfcmlwcGxlUmVuZGVyZXI6IFJpcHBsZVJlbmRlcmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfZWxlbWVudDogRWxlbWVudFJlZiwgcHJvdGVjdGVkIF9uZ1pvbmU6IE5nWm9uZSwgbGlzdEJhc2U6IE1hdExpc3RCYXNlLFxuICAgICAgICAgICAgICBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJpcHBsZURpc2FibGVkID0gbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmU7XG4gICAgaWYgKCFsaXN0QmFzZS5faXNOb25JbnRlcmFjdGl2ZSkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1saXN0LWl0ZW0taW50ZXJhY3RpdmUnKTtcbiAgICB9XG4gICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIgPVxuICAgICAgICBuZXcgUmlwcGxlUmVuZGVyZXIodGhpcywgdGhpcy5fbmdab25lLCBlbCwgcGxhdGZvcm0pO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLnNldHVwVHJpZ2dlckV2ZW50cyhlbCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fbW9uaXRvckxpbmVzKCk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byBjaGFuZ2VzIGluIGBNYXRMaW5lYCBjb250ZW50IGNoaWxkcmVuIGFuZCBhbm5vdGF0ZXMgdGhlbSBhcHByb3ByaWF0ZWx5IHdoZW4gdGhleVxuICAgKiBjaGFuZ2UuXG4gICAqL1xuICBwcml2YXRlIF9tb25pdG9yTGluZXMoKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRoaXMubGluZXMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aCh0aGlzLmxpbmVzKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChsaW5lczogUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+KSA9PiB7XG4gICAgICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lOiBFbGVtZW50UmVmPEVsZW1lbnQ+LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGxpbmUubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICdtZGMtbGlzdC1pdGVtX19wcmltYXJ5LXRleHQnLCBpbmRleCA9PT0gMCAmJiBsaW5lcy5sZW5ndGggPiAxKTtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MobGluZS5uYXRpdmVFbGVtZW50LCAnbWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQnLCBpbmRleCAhPT0gMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldExpbmVzKGxpbmVzLCB0aGlzLl9lbGVtZW50LCAnbWF0LW1kYycpO1xuICAgICAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5fcmVtb3ZlVHJpZ2dlckV2ZW50cygpO1xuICB9XG59XG4iXX0=