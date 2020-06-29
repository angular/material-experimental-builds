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
            },] }
];
MatFormFieldNotchedOutline.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform }
];
MatFormFieldNotchedOutline.propDecorators = {
    width: [{ type: Input, args: ['matFormFieldNotchedOutlineWidth',] }],
    open: [{ type: Input, args: ['matFormFieldNotchedOutlineOpen',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQ7Ozs7Ozs7O0dBUUc7QUFhSCxNQUFNLE9BQU8sMEJBQTBCO0lBVXJDLFlBQW9CLFdBQXVCLEVBQVUsU0FBbUI7UUFBcEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBVHhFLDBCQUEwQjtRQUNnQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRTVELDBDQUEwQztRQUNELFNBQUksR0FBWSxLQUFLLENBQUM7UUFFL0QsMkNBQTJDO1FBQ25DLHVCQUFrQixHQUEyQixJQUFJLENBQUM7SUFFaUIsQ0FBQztJQUU1RSxlQUFlO1FBQ2Isb0ZBQW9GO1FBQ3BGLHlGQUF5RjtRQUN6RixvRkFBb0Y7UUFDcEYsaUVBQWlFO1FBQ2pFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDNUIsdUVBQXVFO1lBQ3ZFLHNEQUFzRDtZQUN0RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEY7UUFDRCwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDVCxnRkFBZ0Y7UUFDaEYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFRCwyRkFBMkY7SUFDbkYsd0JBQXdCO1FBQzlCLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtZQUNwQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7O1lBNURGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUNBQWlDO2dCQUMzQyxzTUFBcUM7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUscUJBQXFCO29CQUM5QiwyRkFBMkY7b0JBQzNGLDhGQUE4RjtvQkFDOUYsc0NBQXNDLEVBQUUsTUFBTTtpQkFDL0M7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOzs7WUE1QkMsVUFBVTtZQUxKLFFBQVE7OztvQkFvQ2IsS0FBSyxTQUFDLGlDQUFpQzttQkFHdkMsS0FBSyxTQUFDLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TURDTm90Y2hlZE91dGxpbmV9IGZyb20gJ0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUnO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1EQyBub3RjaGVkLW91dGxpbmUgY29tcG9uZW50LiBVc2luZ1xuICogYSBkaXJlY3RpdmUgYWxsb3dzIHVzIHRvIGNvbmRpdGlvbmFsbHkgcmVuZGVyIGEgbm90Y2hlZC1vdXRsaW5lIGluIHRoZSB0ZW1wbGF0ZSB3aXRob3V0XG4gKiBoYXZpbmcgdG8gbWFudWFsbHkgY3JlYXRlIGFuZCBkZXN0cm95IHRoZSBgTURDTm90Y2hlZE91dGxpbmVgIGNvbXBvbmVudCB3aGVuZXZlciB0aGVcbiAqIGFwcGVhcmFuY2UgY2hhbmdlcy5cbiAqXG4gKiBUaGUgY29tcG9uZW50IHNldHMgdXAgdGhlIEhUTUwgc3RydWN0dXJlIGFuZCBzdHlsZXMgZm9yIHRoZSBub3RjaGVkLW91dGxpbmUuIEl0IHByb3ZpZGVzXG4gKiBpbnB1dHMgdG8gdG9nZ2xlIHRoZSBub3RjaCBzdGF0ZSBhbmQgd2lkdGguXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpdlttYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZV0nLFxuICB0ZW1wbGF0ZVVybDogJy4vbm90Y2hlZC1vdXRsaW5lLmh0bWwnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1ub3RjaGVkLW91dGxpbmUnLFxuICAgIC8vIEJlc2lkZXMgdXBkYXRpbmcgdGhlIG5vdGNoIHN0YXRlIHRocm91Z2ggdGhlIE1EQyBjb21wb25lbnQsIHdlIHRvZ2dsZSB0aGlzIGNsYXNzIHRocm91Z2hcbiAgICAvLyBhIGhvc3QgYmluZGluZyBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgbm90Y2hlZC1vdXRsaW5lIHJlbmRlcnMgY29ycmVjdGx5IG9uIHRoZSBzZXJ2ZXIuXG4gICAgJ1tjbGFzcy5tZGMtbm90Y2hlZC1vdXRsaW5lLS1ub3RjaGVkXSc6ICdvcGVuJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogV2lkdGggb2YgdGhlIG5vdGNoLiAqL1xuICBASW5wdXQoJ21hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lV2lkdGgnKSB3aWR0aDogbnVtYmVyID0gMDtcblxuICAvKiogV2hldGhlciB0aGUgbm90Y2ggc2hvdWxkIGJlIG9wZW5lZC4gKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZU9wZW4nKSBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEluc3RhbmNlIG9mIHRoZSBNREMgbm90Y2hlZCBvdXRsaW5lLiAqL1xuICBwcml2YXRlIF9tZGNOb3RjaGVkT3V0bGluZTogTURDTm90Y2hlZE91dGxpbmV8bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUaGUgbm90Y2hlZCBvdXRsaW5lIGNhbm5vdCBiZSBhdHRhY2hlZCBpbiB0aGUgc2VydmVyIHBsYXRmb3JtLiBJdCBzY2hlZHVsZXMgdGFza3NcbiAgICAvLyBmb3IgdGhlIG5leHQgYnJvd3NlciBhbmltYXRpb24gZnJhbWUgYW5kIHJlbGllcyBvbiBlbGVtZW50IGNsaWVudCByZWN0YW5nbGVzIHRvIHJlbmRlclxuICAgIC8vIHRoZSBvdXRsaW5lIG5vdGNoLiBUbyBhdm9pZCBmYWlsdXJlcyBvbiB0aGUgc2VydmVyLCB3ZSBqdXN0IGRvIG5vdCBpbml0aWFsaXplIGl0LFxuICAgIC8vIGJ1dCB0aGUgYWN0dWFsIG5vdGNoZWQtb3V0bGluZSBzdHlsZXMgd2lsbCBiZSBzdGlsbCBkaXNwbGF5ZWQuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgLy8gVGhlIG5vdGNoIGNvbXBvbmVudCByZWxpZXMgb24gdGhlIHZpZXcgdG8gYmUgaW5pdGlhbGl6ZWQuIFRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgd2UgY2Fubm90IGV4dGVuZCBmcm9tIHRoZSBcIk1EQ05vdGNoZWRPdXRsaW5lXCIuXG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZSA9IE1EQ05vdGNoZWRPdXRsaW5lLmF0dGFjaFRvKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIC8vIEluaXRpYWwgc3luYyBpbiBjYXNlIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQgYmVmb3JlIHZpZXcgaW5pdGlhbGl6YXRpb24uXG4gICAgdGhpcy5fc3luY05vdGNoZWRPdXRsaW5lU3RhdGUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIC8vIFdoZW5ldmVyIHRoZSB3aWR0aCwgb3IgdGhlIG9wZW4gc3RhdGUgY2hhbmdlcywgc3luYyB0aGUgbm90Y2hlZCBvdXRsaW5lIHRvIGJlXG4gICAgLy8gYmFzZWQgb24gdGhlIG5ldyB2YWx1ZXMuXG4gICAgdGhpcy5fc3luY05vdGNoZWRPdXRsaW5lU3RhdGUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9tZGNOb3RjaGVkT3V0bGluZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTeW5jaHJvbml6ZXMgdGhlIG5vdGNoZWQgb3V0bGluZSBzdGF0ZSB0byBiZSBiYXNlZCBvbiB0aGUgYHdpZHRoYCBhbmQgYG9wZW5gIGlucHV0cy4gKi9cbiAgcHJpdmF0ZSBfc3luY05vdGNoZWRPdXRsaW5lU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX21kY05vdGNoZWRPdXRsaW5lID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgIHRoaXMuX21kY05vdGNoZWRPdXRsaW5lLm5vdGNoKHRoaXMud2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZS5jbG9zZU5vdGNoKCk7XG4gICAgfVxuICB9XG59XG4iXX0=