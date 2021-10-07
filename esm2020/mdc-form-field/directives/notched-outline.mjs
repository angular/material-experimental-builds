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
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
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
    constructor(_elementRef, _platform) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        /** Width of the notch. */
        this.width = 0;
        /** Whether the notch should be opened. */
        this.open = false;
        /** Instance of the MDC notched outline. */
        this._mdcNotchedOutline = null;
    }
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
    ngOnChanges() {
        // Whenever the width, or the open state changes, sync the notched outline to be
        // based on the new values.
        this._syncNotchedOutlineState();
    }
    ngOnDestroy() {
        if (this._mdcNotchedOutline !== null) {
            this._mdcNotchedOutline.destroy();
        }
    }
    /** Synchronizes the notched outline state to be based on the `width` and `open` inputs. */
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
MatFormFieldNotchedOutline.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFormFieldNotchedOutline, deps: [{ token: i0.ElementRef }, { token: i1.Platform }], target: i0.ɵɵFactoryTarget.Component });
MatFormFieldNotchedOutline.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatFormFieldNotchedOutline, selector: "div[matFormFieldNotchedOutline]", inputs: { width: ["matFormFieldNotchedOutlineWidth", "width"], open: ["matFormFieldNotchedOutlineOpen", "open"] }, host: { properties: { "class.mdc-notched-outline--notched": "open" }, classAttribute: "mdc-notched-outline" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatFormFieldNotchedOutline, decorators: [{
            type: Component,
            args: [{ selector: 'div[matFormFieldNotchedOutline]', host: {
                        'class': 'mdc-notched-outline',
                        // Besides updating the notch state through the MDC component, we toggle this class through
                        // a host binding in order to ensure that the notched-outline renders correctly on the server.
                        '[class.mdc-notched-outline--notched]': 'open',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }]; }, propDecorators: { width: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineWidth']
            }], open: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineOpen']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9ub3RjaGVkLW91dGxpbmUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7OztBQUU1RDs7Ozs7Ozs7R0FRRztBQWFILE1BQU0sT0FBTywwQkFBMEI7SUFVckMsWUFBb0IsV0FBdUIsRUFBVSxTQUFtQjtRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFUeEUsMEJBQTBCO1FBQ2dCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFNUQsMENBQTBDO1FBQ0QsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUUvRCwyQ0FBMkM7UUFDbkMsdUJBQWtCLEdBQTJCLElBQUksQ0FBQztJQUVpQixDQUFDO0lBRTVFLGVBQWU7UUFDYixvRkFBb0Y7UUFDcEYseUZBQXlGO1FBQ3pGLG9GQUFvRjtRQUNwRixpRUFBaUU7UUFDakUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUM1Qix1RUFBdUU7WUFDdkUsc0RBQXNEO1lBQ3RELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN0RjtRQUNELDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVztRQUNULGdGQUFnRjtRQUNoRiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELDJGQUEyRjtJQUNuRix3QkFBd0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxFQUFFO1lBQ3BDLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOzsrSEFoRFUsMEJBQTBCO21IQUExQiwwQkFBMEIsOFRDMUN2Qyw0TEFLQTttR0RxQ2EsMEJBQTBCO2tCQVp0QyxTQUFTOytCQUNFLGlDQUFpQyxRQUVyQzt3QkFDSixPQUFPLEVBQUUscUJBQXFCO3dCQUM5QiwyRkFBMkY7d0JBQzNGLDhGQUE4Rjt3QkFDOUYsc0NBQXNDLEVBQUUsTUFBTTtxQkFDL0MsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7d0hBSUssS0FBSztzQkFBOUMsS0FBSzt1QkFBQyxpQ0FBaUM7Z0JBR0MsSUFBSTtzQkFBNUMsS0FBSzt1QkFBQyxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ05vdGNoZWRPdXRsaW5lfSBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lJztcblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBNREMgbm90Y2hlZC1vdXRsaW5lIGNvbXBvbmVudC4gVXNpbmdcbiAqIGEgZGlyZWN0aXZlIGFsbG93cyB1cyB0byBjb25kaXRpb25hbGx5IHJlbmRlciBhIG5vdGNoZWQtb3V0bGluZSBpbiB0aGUgdGVtcGxhdGUgd2l0aG91dFxuICogaGF2aW5nIHRvIG1hbnVhbGx5IGNyZWF0ZSBhbmQgZGVzdHJveSB0aGUgYE1EQ05vdGNoZWRPdXRsaW5lYCBjb21wb25lbnQgd2hlbmV2ZXIgdGhlXG4gKiBhcHBlYXJhbmNlIGNoYW5nZXMuXG4gKlxuICogVGhlIGNvbXBvbmVudCBzZXRzIHVwIHRoZSBIVE1MIHN0cnVjdHVyZSBhbmQgc3R5bGVzIGZvciB0aGUgbm90Y2hlZC1vdXRsaW5lLiBJdCBwcm92aWRlc1xuICogaW5wdXRzIHRvIHRvZ2dsZSB0aGUgbm90Y2ggc3RhdGUgYW5kIHdpZHRoLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25vdGNoZWQtb3V0bGluZS5odG1sJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtbm90Y2hlZC1vdXRsaW5lJyxcbiAgICAvLyBCZXNpZGVzIHVwZGF0aW5nIHRoZSBub3RjaCBzdGF0ZSB0aHJvdWdoIHRoZSBNREMgY29tcG9uZW50LCB3ZSB0b2dnbGUgdGhpcyBjbGFzcyB0aHJvdWdoXG4gICAgLy8gYSBob3N0IGJpbmRpbmcgaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIG5vdGNoZWQtb3V0bGluZSByZW5kZXJzIGNvcnJlY3RseSBvbiB0aGUgc2VydmVyLlxuICAgICdbY2xhc3MubWRjLW5vdGNoZWQtb3V0bGluZS0tbm90Y2hlZF0nOiAnb3BlbicsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqIFdpZHRoIG9mIHRoZSBub3RjaC4gKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZVdpZHRoJykgd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG5vdGNoIHNob3VsZCBiZSBvcGVuZWQuICovXG4gIEBJbnB1dCgnbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVPcGVuJykgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBJbnN0YW5jZSBvZiB0aGUgTURDIG5vdGNoZWQgb3V0bGluZS4gKi9cbiAgcHJpdmF0ZSBfbWRjTm90Y2hlZE91dGxpbmU6IE1EQ05vdGNoZWRPdXRsaW5lfG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gVGhlIG5vdGNoZWQgb3V0bGluZSBjYW5ub3QgYmUgYXR0YWNoZWQgaW4gdGhlIHNlcnZlciBwbGF0Zm9ybS4gSXQgc2NoZWR1bGVzIHRhc2tzXG4gICAgLy8gZm9yIHRoZSBuZXh0IGJyb3dzZXIgYW5pbWF0aW9uIGZyYW1lIGFuZCByZWxpZXMgb24gZWxlbWVudCBjbGllbnQgcmVjdGFuZ2xlcyB0byByZW5kZXJcbiAgICAvLyB0aGUgb3V0bGluZSBub3RjaC4gVG8gYXZvaWQgZmFpbHVyZXMgb24gdGhlIHNlcnZlciwgd2UganVzdCBkbyBub3QgaW5pdGlhbGl6ZSBpdCxcbiAgICAvLyBidXQgdGhlIGFjdHVhbCBub3RjaGVkLW91dGxpbmUgc3R5bGVzIHdpbGwgYmUgc3RpbGwgZGlzcGxheWVkLlxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIC8vIFRoZSBub3RjaCBjb21wb25lbnQgcmVsaWVzIG9uIHRoZSB2aWV3IHRvIGJlIGluaXRpYWxpemVkLiBUaGlzIG1lYW5zXG4gICAgICAvLyB0aGF0IHdlIGNhbm5vdCBleHRlbmQgZnJvbSB0aGUgXCJNRENOb3RjaGVkT3V0bGluZVwiLlxuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUgPSBNRENOb3RjaGVkT3V0bGluZS5hdHRhY2hUbyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICAvLyBJbml0aWFsIHN5bmMgaW4gY2FzZSBzdGF0ZSBoYXMgYmVlbiB1cGRhdGVkIGJlZm9yZSB2aWV3IGluaXRpYWxpemF0aW9uLlxuICAgIHRoaXMuX3N5bmNOb3RjaGVkT3V0bGluZVN0YXRlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICAvLyBXaGVuZXZlciB0aGUgd2lkdGgsIG9yIHRoZSBvcGVuIHN0YXRlIGNoYW5nZXMsIHN5bmMgdGhlIG5vdGNoZWQgb3V0bGluZSB0byBiZVxuICAgIC8vIGJhc2VkIG9uIHRoZSBuZXcgdmFsdWVzLlxuICAgIHRoaXMuX3N5bmNOb3RjaGVkT3V0bGluZVN0YXRlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fbWRjTm90Y2hlZE91dGxpbmUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX21kY05vdGNoZWRPdXRsaW5lLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogU3luY2hyb25pemVzIHRoZSBub3RjaGVkIG91dGxpbmUgc3RhdGUgdG8gYmUgYmFzZWQgb24gdGhlIGB3aWR0aGAgYW5kIGBvcGVuYCBpbnB1dHMuICovXG4gIHByaXZhdGUgX3N5bmNOb3RjaGVkT3V0bGluZVN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9tZGNOb3RjaGVkT3V0bGluZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZS5ub3RjaCh0aGlzLndpZHRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUuY2xvc2VOb3RjaCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX2xlYWRpbmdcIj48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX19ub3RjaFwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX190cmFpbGluZ1wiPjwvZGl2PlxuIl19