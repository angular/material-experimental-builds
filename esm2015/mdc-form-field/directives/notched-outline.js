/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/directives/notched-outline.ts
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
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { MDCNotchedOutline } from '@material/notched-outline';
/**
 * Internal component that creates an instance of the MDC notched-outline component. Using
 * a directive allows us to conditionally render a notched-outline in the template without
 * having to manually create and destroy the `MDCNotchedOutline` component whenever the
 * appearance changes.
 *
 * The component sets up the HTML structure and styles for the notched-outline. It provides
 * inputs to toggle the notch state and width.
 */
export class MatFormFieldNotchedOutline {
    /**
     * @param {?} _elementRef
     * @param {?} _platform
     */
    constructor(_elementRef, _platform) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        /**
         * Width of the notch.
         */
        this.width = 0;
        /**
         * Whether the notch should be opened.
         */
        this.open = false;
        /**
         * Instance of the MDC notched outline.
         */
        this._mdcNotchedOutline = null;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // The notched outline cannot be attached in the server platform. It schedules tasks
        // for the next browser animation frame and relies on element client rectangles to render
        // the outline notch. To avoid failures on the server, we just do not initialize it,
        // but the actual notched-outline styles will be still displayed.
        if (this._platform.isBrowser) {
            // The notch component relies on the view to be initialized. This means
            // that we cannot extend from the "MDCNotchedOutline".
            this._mdcNotchedOutline = MDCNotchedOutline.attachTo(this._elementRef.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        // Whenever the width, or the open state changes, sync the notched outline to be
        // based on the new values.
        this._syncNotchedOutlineState();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._mdcNotchedOutline !== null) {
            this._mdcNotchedOutline.destroy();
        }
    }
    /**
     * Synchronizes the notched outline state to be based on the `width` and `open` inputs.
     * @private
     * @return {?}
     */
    _syncNotchedOutlineState() {
        if (this._mdcNotchedOutline === null) {
            return;
        }
        if (this.open) {
            this._mdcNotchedOutline.notch(this.width);
        }
        else {
            this._mdcNotchedOutline.closeNotch();
        }
    }
}
MatFormFieldNotchedOutline.decorators = [
    { type: Component, args: [{
                selector: 'div[matFormFieldNotchedOutline]',
                template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n",
                host: {
                    'class': 'mdc-notched-outline',
                    // Besides updating the notch state through the MDC component, we toggle this class through
                    // a host binding in order to ensure that the notched-outline renders correctly on the server.
                    '[class.mdc-notched-outline--notched]': 'open',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
MatFormFieldNotchedOutline.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform }
];
MatFormFieldNotchedOutline.propDecorators = {
    width: [{ type: Input, args: ['matFormFieldNotchedOutlineWidth',] }],
    open: [{ type: Input, args: ['matFormFieldNotchedOutlineOpen',] }]
};
if (false) {
    /**
     * Width of the notch.
     * @type {?}
     */
    MatFormFieldNotchedOutline.prototype.width;
    /**
     * Whether the notch should be opened.
     * @type {?}
     */
    MatFormFieldNotchedOutline.prototype.open;
    /**
     * Instance of the MDC notched outline.
     * @type {?}
     * @private
     */
    MatFormFieldNotchedOutline.prototype._mdcNotchedOutline;
    /**
     * @type {?}
     * @private
     */
    MatFormFieldNotchedOutline.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatFormFieldNotchedOutline.prototype._platform;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7QUF1QjVELE1BQU0sT0FBTywwQkFBMEI7Ozs7O0lBVXJDLFlBQW9CLFdBQXVCLEVBQVUsU0FBbUI7UUFBcEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVOzs7O1FBUjlCLFVBQUssR0FBVyxDQUFDLENBQUM7Ozs7UUFHbkIsU0FBSSxHQUFZLEtBQUssQ0FBQzs7OztRQUd2RCx1QkFBa0IsR0FBMkIsSUFBSSxDQUFDO0lBRWlCLENBQUM7Ozs7SUFFNUUsZUFBZTtRQUNiLG9GQUFvRjtRQUNwRix5RkFBeUY7UUFDekYsb0ZBQW9GO1FBQ3BGLGlFQUFpRTtRQUNqRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzVCLHVFQUF1RTtZQUN2RSxzREFBc0Q7WUFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3RGO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxnRkFBZ0Y7UUFDaEYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7OztJQUdPLHdCQUF3QjtRQUM5QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7OztZQTFERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0Msc01BQXFDO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHFCQUFxQjs7O29CQUc5QixzQ0FBc0MsRUFBRSxNQUFNO2lCQUMvQztnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7Ozs7WUE1QkMsVUFBVTtZQUxKLFFBQVE7OztvQkFvQ2IsS0FBSyxTQUFDLGlDQUFpQzttQkFHdkMsS0FBSyxTQUFDLGdDQUFnQzs7Ozs7OztJQUh2QywyQ0FBNEQ7Ozs7O0lBRzVELDBDQUErRDs7Ozs7O0lBRy9ELHdEQUEwRDs7Ozs7SUFFOUMsaURBQStCOzs7OztJQUFFLCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDTm90Y2hlZE91dGxpbmV9IGZyb20gJ0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUnO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1EQyBub3RjaGVkLW91dGxpbmUgY29tcG9uZW50LiBVc2luZ1xuICogYSBkaXJlY3RpdmUgYWxsb3dzIHVzIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIGEgbm90Y2hlZC1vdXRsaW5lIGluIHRoZSB0ZW1wbGF0ZSB3aXRob3V0XG4gKiBoYXZpbmcgdG8gbWFudWFsbHkgY3JlYXRlIGFuZCBkZXN0cm95IHRoZSBgTURDTm90Y2hlZE91dGxpbmVgIGNvbXBvbmVudCB3aGVuZXZlciB0aGVcbiAqIGFwcGVhcmFuY2UgY2hhbmdlcy5cbiAqXG4gKiBUaGUgY29tcG9uZW50IHNldHMgdXAgdGhlIEhUTUwgc3RydWN0dXJlIGFuZCBzdHlsZXMgZm9yIHRoZSBub3RjaGVkLW91dGxpbmUuIEl0IHByb3ZpZGVzXG4gKiBpbnB1dHMgdG8gdG9nZ2xlIHRoZSBub3RjaCBzdGF0ZSBhbmQgd2lkdGguXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpdlttYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZV0nLFxuICB0ZW1wbGF0ZVVybDogJy4vbm90Y2hlZC1vdXRsaW5lLmh0bWwnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1ub3RjaGVkLW91dGxpbmUnLFxuICAgIC8vIEJlc2lkZXMgdXBkYXRpbmcgdGhlIG5vdGNoIHN0YXRlIHRocm91Z2ggdGhlIE1EQyBjb21wb25lbnQsIHdlIHRvZ2dsZSB0aGlzIGNsYXNzIHRocm91Z2hcbiAgICAvLyBhIGhvc3QgYmluZGluZyBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgbm90Y2hlZC1vdXRsaW5lIHJlbmRlcnMgY29ycmVjdGx5IG9uIHRoZSBzZXJ2ZXIuXG4gICAgJ1tjbGFzcy5tZGMtbm90Y2hlZC1vdXRsaW5lLS1ub3RjaGVkXSc6ICdvcGVuJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogV2lkdGggb2YgdGhlIG5vdGNoLiAqL1xuICBASW5wdXQoJ21hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lV2lkdGgnKSB3aWR0aDogbnVtYmVyID0gMDtcblxuICAvKiogV2hldGhlciB0aGUgbm90Y2ggc2hvdWxkIGJlIG9wZW5lZC4gKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZU9wZW4nKSBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEluc3RhbmNlIG9mIHRoZSBNREMgbm90Y2hlZCBvdXRsaW5lLiAqL1xuICBwcml2YXRlIF9tZGNOb3RjaGVkT3V0bGluZTogTURDTm90Y2hlZE91dGxpbmV8bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUaGUgbm90Y2hlZCBvdXRsaW5lIGNhbm5vdCBiZSBhdHRhY2hlZCBpbiB0aGUgc2VydmVyIHBsYXRmb3JtLiBJdCBzY2hlZHVsZXMgdGFza3NcbiAgICAvLyBmb3IgdGhlIG5leHQgYnJvd3NlciBhbmltYXRpb24gZnJhbWUgYW5kIHJlbGllcyBvbiBlbGVtZW50IGNsaWVudCByZWN0YW5nbGVzIHRvIHJlbmRlclxuICAgIC8vIHRoZSBvdXRsaW5lIG5vdGNoLiBUbyBhdm9pZCBmYWlsdXJlcyBvbiB0aGUgc2VydmVyLCB3ZSBqdXN0IGRvIG5vdCBpbml0aWFsaXplIGl0LFxuICAgIC8vIGJ1dCB0aGUgYWN0dWFsIG5vdGNoZWQtb3V0bGluZSBzdHlsZXMgd2lsbCBiZSBzdGlsbCBkaXNwbGF5ZWQuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgLy8gVGhlIG5vdGNoIGNvbXBvbmVudCByZWxpZXMgb24gdGhlIHZpZXcgdG8gYmUgaW5pdGlhbGl6ZWQuIFRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgd2UgY2Fubm90IGV4dGVuZCBmcm9tIHRoZSBcIk1EQ05vdGNoZWRPdXRsaW5lXCIuXG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZSA9IE1EQ05vdGNoZWRPdXRsaW5lLmF0dGFjaFRvKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgLy8gV2hlbmV2ZXIgdGhlIHdpZHRoLCBvciB0aGUgb3BlbiBzdGF0ZSBjaGFuZ2VzLCBzeW5jIHRoZSBub3RjaGVkIG91dGxpbmUgdG8gYmVcbiAgICAvLyBiYXNlZCBvbiB0aGUgbmV3IHZhbHVlcy5cbiAgICB0aGlzLl9zeW5jTm90Y2hlZE91dGxpbmVTdGF0ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX21kY05vdGNoZWRPdXRsaW5lICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFN5bmNocm9uaXplcyB0aGUgbm90Y2hlZCBvdXRsaW5lIHN0YXRlIHRvIGJlIGJhc2VkIG9uIHRoZSBgd2lkdGhgIGFuZCBgb3BlbmAgaW5wdXRzLiAqL1xuICBwcml2YXRlIF9zeW5jTm90Y2hlZE91dGxpbmVTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fbWRjTm90Y2hlZE91dGxpbmUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUubm90Y2godGhpcy53aWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21kY05vdGNoZWRPdXRsaW5lLmNsb3NlTm90Y2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==