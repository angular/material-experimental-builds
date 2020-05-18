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
let MatFormFieldNotchedOutline = /** @class */ (() => {
    /**
     * Internal component that creates an instance of the MDC notched-outline component. Using
     * a directive allows us to conditionally render a notched-outline in the template without
     * having to manually create and destroy the `MDCNotchedOutline` component whenever the
     * appearance changes.
     *
     * The component sets up the HTML structure and styles for the notched-outline. It provides
     * inputs to toggle the notch state and width.
     */
    class MatFormFieldNotchedOutline {
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
            // Initial sync in case state has been updated before view initialization.
            this._syncNotchedOutlineState();
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
    return MatFormFieldNotchedOutline;
})();
export { MatFormFieldNotchedOutline };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7QUFXNUQ7Ozs7Ozs7Ozs7SUFBQSxNQVlhLDBCQUEwQjs7Ozs7UUFVckMsWUFBb0IsV0FBdUIsRUFBVSxTQUFtQjtZQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7Ozs7WUFSOUIsVUFBSyxHQUFXLENBQUMsQ0FBQzs7OztZQUduQixTQUFJLEdBQVksS0FBSyxDQUFDOzs7O1lBR3ZELHVCQUFrQixHQUEyQixJQUFJLENBQUM7UUFFaUIsQ0FBQzs7OztRQUU1RSxlQUFlO1lBQ2Isb0ZBQW9GO1lBQ3BGLHlGQUF5RjtZQUN6RixvRkFBb0Y7WUFDcEYsaUVBQWlFO1lBQ2pFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7Z0JBQzVCLHVFQUF1RTtnQkFDdkUsc0RBQXNEO2dCQUN0RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDdEY7WUFDRCwwRUFBMEU7WUFDMUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDbEMsQ0FBQzs7OztRQUVELFdBQVc7WUFDVCxnRkFBZ0Y7WUFDaEYsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2xDLENBQUM7Ozs7UUFFRCxXQUFXO1lBQ1QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbkM7UUFDSCxDQUFDOzs7Ozs7UUFHTyx3QkFBd0I7WUFDOUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxPQUFPO2FBQ1I7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQzs7O2dCQTVERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0Msc01BQXFDO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLHFCQUFxQjs7O3dCQUc5QixzQ0FBc0MsRUFBRSxNQUFNO3FCQUMvQztvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzs7O2dCQTVCQyxVQUFVO2dCQUxKLFFBQVE7Ozt3QkFvQ2IsS0FBSyxTQUFDLGlDQUFpQzt1QkFHdkMsS0FBSyxTQUFDLGdDQUFnQzs7SUE0Q3pDLGlDQUFDO0tBQUE7U0FqRFksMEJBQTBCOzs7Ozs7SUFFckMsMkNBQTREOzs7OztJQUc1RCwwQ0FBK0Q7Ozs7OztJQUcvRCx3REFBMEQ7Ozs7O0lBRTlDLGlEQUErQjs7Ozs7SUFBRSwrQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ05vdGNoZWRPdXRsaW5lfSBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lJztcblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBNREMgbm90Y2hlZC1vdXRsaW5lIGNvbXBvbmVudC4gVXNpbmdcbiAqIGEgZGlyZWN0aXZlIGFsbG93cyB1cyB0byBjb25kaXRpb25hbGx5IHJlbmRlciBhIG5vdGNoZWQtb3V0bGluZSBpbiB0aGUgdGVtcGxhdGUgd2l0aG91dFxuICogaGF2aW5nIHRvIG1hbnVhbGx5IGNyZWF0ZSBhbmQgZGVzdHJveSB0aGUgYE1EQ05vdGNoZWRPdXRsaW5lYCBjb21wb25lbnQgd2hlbmV2ZXIgdGhlXG4gKiBhcHBlYXJhbmNlIGNoYW5nZXMuXG4gKlxuICogVGhlIGNvbXBvbmVudCBzZXRzIHVwIHRoZSBIVE1MIHN0cnVjdHVyZSBhbmQgc3R5bGVzIGZvciB0aGUgbm90Y2hlZC1vdXRsaW5lLiBJdCBwcm92aWRlc1xuICogaW5wdXRzIHRvIHRvZ2dsZSB0aGUgbm90Y2ggc3RhdGUgYW5kIHdpZHRoLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25vdGNoZWQtb3V0bGluZS5odG1sJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtbm90Y2hlZC1vdXRsaW5lJyxcbiAgICAvLyBCZXNpZGVzIHVwZGF0aW5nIHRoZSBub3RjaCBzdGF0ZSB0aHJvdWdoIHRoZSBNREMgY29tcG9uZW50LCB3ZSB0b2dnbGUgdGhpcyBjbGFzcyB0aHJvdWdoXG4gICAgLy8gYSBob3N0IGJpbmRpbmcgaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIG5vdGNoZWQtb3V0bGluZSByZW5kZXJzIGNvcnJlY3RseSBvbiB0aGUgc2VydmVyLlxuICAgICdbY2xhc3MubWRjLW5vdGNoZWQtb3V0bGluZS0tbm90Y2hlZF0nOiAnb3BlbicsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqIFdpZHRoIG9mIHRoZSBub3RjaC4gKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZVdpZHRoJykgd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG5vdGNoIHNob3VsZCBiZSBvcGVuZWQuICovXG4gIEBJbnB1dCgnbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVPcGVuJykgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBJbnN0YW5jZSBvZiB0aGUgTURDIG5vdGNoZWQgb3V0bGluZS4gKi9cbiAgcHJpdmF0ZSBfbWRjTm90Y2hlZE91dGxpbmU6IE1EQ05vdGNoZWRPdXRsaW5lfG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gVGhlIG5vdGNoZWQgb3V0bGluZSBjYW5ub3QgYmUgYXR0YWNoZWQgaW4gdGhlIHNlcnZlciBwbGF0Zm9ybS4gSXQgc2NoZWR1bGVzIHRhc2tzXG4gICAgLy8gZm9yIHRoZSBuZXh0IGJyb3dzZXIgYW5pbWF0aW9uIGZyYW1lIGFuZCByZWxpZXMgb24gZWxlbWVudCBjbGllbnQgcmVjdGFuZ2xlcyB0byByZW5kZXJcbiAgICAvLyB0aGUgb3V0bGluZSBub3RjaC4gVG8gYXZvaWQgZmFpbHVyZXMgb24gdGhlIHNlcnZlciwgd2UganVzdCBkbyBub3QgaW5pdGlhbGl6ZSBpdCxcbiAgICAvLyBidXQgdGhlIGFjdHVhbCBub3RjaGVkLW91dGxpbmUgc3R5bGVzIHdpbGwgYmUgc3RpbGwgZGlzcGxheWVkLlxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIC8vIFRoZSBub3RjaCBjb21wb25lbnQgcmVsaWVzIG9uIHRoZSB2aWV3IHRvIGJlIGluaXRpYWxpemVkLiBUaGlzIG1lYW5zXG4gICAgICAvLyB0aGF0IHdlIGNhbm5vdCBleHRlbmQgZnJvbSB0aGUgXCJNRENOb3RjaGVkT3V0bGluZVwiLlxuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUgPSBNRENOb3RjaGVkT3V0bGluZS5hdHRhY2hUbyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICAvLyBJbml0aWFsIHN5bmMgaW4gY2FzZSBzdGF0ZSBoYXMgYmVlbiB1cGRhdGVkIGJlZm9yZSB2aWV3IGluaXRpYWxpemF0aW9uLlxuICAgIHRoaXMuX3N5bmNOb3RjaGVkT3V0bGluZVN0YXRlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICAvLyBXaGVuZXZlciB0aGUgd2lkdGgsIG9yIHRoZSBvcGVuIHN0YXRlIGNoYW5nZXMsIHN5bmMgdGhlIG5vdGNoZWQgb3V0bGluZSB0byBiZVxuICAgIC8vIGJhc2VkIG9uIHRoZSBuZXcgdmFsdWVzLlxuICAgIHRoaXMuX3N5bmNOb3RjaGVkT3V0bGluZVN0YXRlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fbWRjTm90Y2hlZE91dGxpbmUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX21kY05vdGNoZWRPdXRsaW5lLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogU3luY2hyb25pemVzIHRoZSBub3RjaGVkIG91dGxpbmUgc3RhdGUgdG8gYmUgYmFzZWQgb24gdGhlIGB3aWR0aGAgYW5kIGBvcGVuYCBpbnB1dHMuICovXG4gIHByaXZhdGUgX3N5bmNOb3RjaGVkT3V0bGluZVN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9tZGNOb3RjaGVkT3V0bGluZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZS5ub3RjaCh0aGlzLndpZHRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUuY2xvc2VOb3RjaCgpO1xuICAgIH1cbiAgfVxufVxuIl19