/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation, } from '@angular/core';
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
MatFormFieldNotchedOutline.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatFormFieldNotchedOutline, deps: [{ token: i0.ElementRef }, { token: i1.Platform }], target: i0.ɵɵFactoryTarget.Component });
MatFormFieldNotchedOutline.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "14.0.0-next.5", type: MatFormFieldNotchedOutline, selector: "div[matFormFieldNotchedOutline]", inputs: { width: ["matFormFieldNotchedOutlineWidth", "width"], open: ["matFormFieldNotchedOutlineOpen", "open"] }, host: { properties: { "class.mdc-notched-outline--notched": "open" }, classAttribute: "mdc-notched-outline" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatFormFieldNotchedOutline, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9ub3RjaGVkLW91dGxpbmUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7OztBQUU1RDs7Ozs7Ozs7R0FRRztBQWFILE1BQU0sT0FBTywwQkFBMEI7SUFVckMsWUFBb0IsV0FBdUIsRUFBVSxTQUFtQjtRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFUeEUsMEJBQTBCO1FBQ2dCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFNUQsMENBQTBDO1FBQ0QsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUUvRCwyQ0FBMkM7UUFDbkMsdUJBQWtCLEdBQTZCLElBQUksQ0FBQztJQUVlLENBQUM7SUFFNUUsZUFBZTtRQUNiLG9GQUFvRjtRQUNwRix5RkFBeUY7UUFDekYsb0ZBQW9GO1FBQ3BGLGlFQUFpRTtRQUNqRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzVCLHVFQUF1RTtZQUN2RSxzREFBc0Q7WUFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3RGO1FBQ0QsMEVBQTBFO1FBQzFFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXO1FBQ1QsZ0ZBQWdGO1FBQ2hGLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBRUQsMkZBQTJGO0lBQ25GLHdCQUF3QjtRQUM5QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7OzhIQWhEVSwwQkFBMEI7a0hBQTFCLDBCQUEwQiw4VEMxQ3ZDLDRMQUtBO2tHRHFDYSwwQkFBMEI7a0JBWnRDLFNBQVM7K0JBQ0UsaUNBQWlDLFFBRXJDO3dCQUNKLE9BQU8sRUFBRSxxQkFBcUI7d0JBQzlCLDJGQUEyRjt3QkFDM0YsOEZBQThGO3dCQUM5RixzQ0FBc0MsRUFBRSxNQUFNO3FCQUMvQyxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTt3SEFJSyxLQUFLO3NCQUE5QyxLQUFLO3VCQUFDLGlDQUFpQztnQkFHQyxJQUFJO3NCQUE1QyxLQUFLO3VCQUFDLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ05vdGNoZWRPdXRsaW5lfSBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lJztcblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBNREMgbm90Y2hlZC1vdXRsaW5lIGNvbXBvbmVudC4gVXNpbmdcbiAqIGEgZGlyZWN0aXZlIGFsbG93cyB1cyB0byBjb25kaXRpb25hbGx5IHJlbmRlciBhIG5vdGNoZWQtb3V0bGluZSBpbiB0aGUgdGVtcGxhdGUgd2l0aG91dFxuICogaGF2aW5nIHRvIG1hbnVhbGx5IGNyZWF0ZSBhbmQgZGVzdHJveSB0aGUgYE1EQ05vdGNoZWRPdXRsaW5lYCBjb21wb25lbnQgd2hlbmV2ZXIgdGhlXG4gKiBhcHBlYXJhbmNlIGNoYW5nZXMuXG4gKlxuICogVGhlIGNvbXBvbmVudCBzZXRzIHVwIHRoZSBIVE1MIHN0cnVjdHVyZSBhbmQgc3R5bGVzIGZvciB0aGUgbm90Y2hlZC1vdXRsaW5lLiBJdCBwcm92aWRlc1xuICogaW5wdXRzIHRvIHRvZ2dsZSB0aGUgbm90Y2ggc3RhdGUgYW5kIHdpZHRoLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25vdGNoZWQtb3V0bGluZS5odG1sJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtbm90Y2hlZC1vdXRsaW5lJyxcbiAgICAvLyBCZXNpZGVzIHVwZGF0aW5nIHRoZSBub3RjaCBzdGF0ZSB0aHJvdWdoIHRoZSBNREMgY29tcG9uZW50LCB3ZSB0b2dnbGUgdGhpcyBjbGFzcyB0aHJvdWdoXG4gICAgLy8gYSBob3N0IGJpbmRpbmcgaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIG5vdGNoZWQtb3V0bGluZSByZW5kZXJzIGNvcnJlY3RseSBvbiB0aGUgc2VydmVyLlxuICAgICdbY2xhc3MubWRjLW5vdGNoZWQtb3V0bGluZS0tbm90Y2hlZF0nOiAnb3BlbicsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqIFdpZHRoIG9mIHRoZSBub3RjaC4gKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZVdpZHRoJykgd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG5vdGNoIHNob3VsZCBiZSBvcGVuZWQuICovXG4gIEBJbnB1dCgnbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVPcGVuJykgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBJbnN0YW5jZSBvZiB0aGUgTURDIG5vdGNoZWQgb3V0bGluZS4gKi9cbiAgcHJpdmF0ZSBfbWRjTm90Y2hlZE91dGxpbmU6IE1EQ05vdGNoZWRPdXRsaW5lIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUaGUgbm90Y2hlZCBvdXRsaW5lIGNhbm5vdCBiZSBhdHRhY2hlZCBpbiB0aGUgc2VydmVyIHBsYXRmb3JtLiBJdCBzY2hlZHVsZXMgdGFza3NcbiAgICAvLyBmb3IgdGhlIG5leHQgYnJvd3NlciBhbmltYXRpb24gZnJhbWUgYW5kIHJlbGllcyBvbiBlbGVtZW50IGNsaWVudCByZWN0YW5nbGVzIHRvIHJlbmRlclxuICAgIC8vIHRoZSBvdXRsaW5lIG5vdGNoLiBUbyBhdm9pZCBmYWlsdXJlcyBvbiB0aGUgc2VydmVyLCB3ZSBqdXN0IGRvIG5vdCBpbml0aWFsaXplIGl0LFxuICAgIC8vIGJ1dCB0aGUgYWN0dWFsIG5vdGNoZWQtb3V0bGluZSBzdHlsZXMgd2lsbCBiZSBzdGlsbCBkaXNwbGF5ZWQuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgLy8gVGhlIG5vdGNoIGNvbXBvbmVudCByZWxpZXMgb24gdGhlIHZpZXcgdG8gYmUgaW5pdGlhbGl6ZWQuIFRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgd2UgY2Fubm90IGV4dGVuZCBmcm9tIHRoZSBcIk1EQ05vdGNoZWRPdXRsaW5lXCIuXG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZSA9IE1EQ05vdGNoZWRPdXRsaW5lLmF0dGFjaFRvKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIC8vIEluaXRpYWwgc3luYyBpbiBjYXNlIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQgYmVmb3JlIHZpZXcgaW5pdGlhbGl6YXRpb24uXG4gICAgdGhpcy5fc3luY05vdGNoZWRPdXRsaW5lU3RhdGUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIC8vIFdoZW5ldmVyIHRoZSB3aWR0aCwgb3IgdGhlIG9wZW4gc3RhdGUgY2hhbmdlcywgc3luYyB0aGUgbm90Y2hlZCBvdXRsaW5lIHRvIGJlXG4gICAgLy8gYmFzZWQgb24gdGhlIG5ldyB2YWx1ZXMuXG4gICAgdGhpcy5fc3luY05vdGNoZWRPdXRsaW5lU3RhdGUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9tZGNOb3RjaGVkT3V0bGluZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTeW5jaHJvbml6ZXMgdGhlIG5vdGNoZWQgb3V0bGluZSBzdGF0ZSB0byBiZSBiYXNlZCBvbiB0aGUgYHdpZHRoYCBhbmQgYG9wZW5gIGlucHV0cy4gKi9cbiAgcHJpdmF0ZSBfc3luY05vdGNoZWRPdXRsaW5lU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX21kY05vdGNoZWRPdXRsaW5lID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgIHRoaXMuX21kY05vdGNoZWRPdXRsaW5lLm5vdGNoKHRoaXMud2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZS5jbG9zZU5vdGNoKCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fbGVhZGluZ1wiPjwvZGl2PlxuPGRpdiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX25vdGNoXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX3RyYWlsaW5nXCI+PC9kaXY+XG4iXX0=