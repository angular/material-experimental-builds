/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
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
    let MatFormFieldNotchedOutline = class MatFormFieldNotchedOutline {
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
    };
    __decorate([
        Input('matFormFieldNotchedOutlineWidth'),
        __metadata("design:type", Number)
    ], MatFormFieldNotchedOutline.prototype, "width", void 0);
    __decorate([
        Input('matFormFieldNotchedOutlineOpen'),
        __metadata("design:type", Boolean)
    ], MatFormFieldNotchedOutline.prototype, "open", void 0);
    MatFormFieldNotchedOutline = __decorate([
        Component({
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
        }),
        __metadata("design:paramtypes", [ElementRef, Platform])
    ], MatFormFieldNotchedOutline);
    return MatFormFieldNotchedOutline;
})();
export { MatFormFieldNotchedOutline };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTVEOzs7Ozs7OztHQVFHO0FBYUg7SUFBQSxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtRQVVyQyxZQUFvQixXQUF1QixFQUFVLFNBQW1CO1lBQXBELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1lBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVTtZQVR4RSwwQkFBMEI7WUFDZ0IsVUFBSyxHQUFXLENBQUMsQ0FBQztZQUU1RCwwQ0FBMEM7WUFDRCxTQUFJLEdBQVksS0FBSyxDQUFDO1lBRS9ELDJDQUEyQztZQUNuQyx1QkFBa0IsR0FBMkIsSUFBSSxDQUFDO1FBRWlCLENBQUM7UUFFNUUsZUFBZTtZQUNiLG9GQUFvRjtZQUNwRix5RkFBeUY7WUFDekYsb0ZBQW9GO1lBQ3BGLGlFQUFpRTtZQUNqRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUM1Qix1RUFBdUU7Z0JBQ3ZFLHNEQUFzRDtnQkFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsMEVBQTBFO1lBQzFFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFFRCxXQUFXO1lBQ1QsZ0ZBQWdGO1lBQ2hGLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNsQyxDQUFDO1FBRUQsV0FBVztZQUNULElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtnQkFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ25DO1FBQ0gsQ0FBQztRQUVELDJGQUEyRjtRQUNuRix3QkFBd0I7WUFDOUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxPQUFPO2FBQ1I7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQztLQUNGLENBQUE7SUEvQzJDO1FBQXpDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQzs7NkRBQW1CO0lBR25CO1FBQXhDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQzs7NERBQXVCO0lBTHBELDBCQUEwQjtRQVp0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUNBQWlDO1lBQzNDLHNNQUFxQztZQUNyQyxJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLHFCQUFxQjtnQkFDOUIsMkZBQTJGO2dCQUMzRiw4RkFBOEY7Z0JBQzlGLHNDQUFzQyxFQUFFLE1BQU07YUFDL0M7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtTQUN0QyxDQUFDO3lDQVdpQyxVQUFVLEVBQXFCLFFBQVE7T0FWN0QsMEJBQTBCLENBaUR0QztJQUFELGlDQUFDO0tBQUE7U0FqRFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNRENOb3RjaGVkT3V0bGluZX0gZnJvbSAnQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTURDIG5vdGNoZWQtb3V0bGluZSBjb21wb25lbnQuIFVzaW5nXG4gKiBhIGRpcmVjdGl2ZSBhbGxvd3MgdXMgdG8gY29uZGl0aW9uYWxseSByZW5kZXIgYSBub3RjaGVkLW91dGxpbmUgaW4gdGhlIHRlbXBsYXRlIHdpdGhvdXRcbiAqIGhhdmluZyB0byBtYW51YWxseSBjcmVhdGUgYW5kIGRlc3Ryb3kgdGhlIGBNRENOb3RjaGVkT3V0bGluZWAgY29tcG9uZW50IHdoZW5ldmVyIHRoZVxuICogYXBwZWFyYW5jZSBjaGFuZ2VzLlxuICpcbiAqIFRoZSBjb21wb25lbnQgc2V0cyB1cCB0aGUgSFRNTCBzdHJ1Y3R1cmUgYW5kIHN0eWxlcyBmb3IgdGhlIG5vdGNoZWQtb3V0bGluZS4gSXQgcHJvdmlkZXNcbiAqIGlucHV0cyB0byB0b2dnbGUgdGhlIG5vdGNoIHN0YXRlIGFuZCB3aWR0aC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W21hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RjaGVkLW91dGxpbmUuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLW5vdGNoZWQtb3V0bGluZScsXG4gICAgLy8gQmVzaWRlcyB1cGRhdGluZyB0aGUgbm90Y2ggc3RhdGUgdGhyb3VnaCB0aGUgTURDIGNvbXBvbmVudCwgd2UgdG9nZ2xlIHRoaXMgY2xhc3MgdGhyb3VnaFxuICAgIC8vIGEgaG9zdCBiaW5kaW5nIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBub3RjaGVkLW91dGxpbmUgcmVuZGVycyBjb3JyZWN0bHkgb24gdGhlIHNlcnZlci5cbiAgICAnW2NsYXNzLm1kYy1ub3RjaGVkLW91dGxpbmUtLW5vdGNoZWRdJzogJ29wZW4nLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBXaWR0aCBvZiB0aGUgbm90Y2guICovXG4gIEBJbnB1dCgnbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVXaWR0aCcpIHdpZHRoOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBub3RjaCBzaG91bGQgYmUgb3BlbmVkLiAqL1xuICBASW5wdXQoJ21hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lT3BlbicpIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogSW5zdGFuY2Ugb2YgdGhlIE1EQyBub3RjaGVkIG91dGxpbmUuICovXG4gIHByaXZhdGUgX21kY05vdGNoZWRPdXRsaW5lOiBNRENOb3RjaGVkT3V0bGluZXxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0pIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIFRoZSBub3RjaGVkIG91dGxpbmUgY2Fubm90IGJlIGF0dGFjaGVkIGluIHRoZSBzZXJ2ZXIgcGxhdGZvcm0uIEl0IHNjaGVkdWxlcyB0YXNrc1xuICAgIC8vIGZvciB0aGUgbmV4dCBicm93c2VyIGFuaW1hdGlvbiBmcmFtZSBhbmQgcmVsaWVzIG9uIGVsZW1lbnQgY2xpZW50IHJlY3RhbmdsZXMgdG8gcmVuZGVyXG4gICAgLy8gdGhlIG91dGxpbmUgbm90Y2guIFRvIGF2b2lkIGZhaWx1cmVzIG9uIHRoZSBzZXJ2ZXIsIHdlIGp1c3QgZG8gbm90IGluaXRpYWxpemUgaXQsXG4gICAgLy8gYnV0IHRoZSBhY3R1YWwgbm90Y2hlZC1vdXRsaW5lIHN0eWxlcyB3aWxsIGJlIHN0aWxsIGRpc3BsYXllZC5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICAvLyBUaGUgbm90Y2ggY29tcG9uZW50IHJlbGllcyBvbiB0aGUgdmlldyB0byBiZSBpbml0aWFsaXplZC4gVGhpcyBtZWFuc1xuICAgICAgLy8gdGhhdCB3ZSBjYW5ub3QgZXh0ZW5kIGZyb20gdGhlIFwiTURDTm90Y2hlZE91dGxpbmVcIi5cbiAgICAgIHRoaXMuX21kY05vdGNoZWRPdXRsaW5lID0gTURDTm90Y2hlZE91dGxpbmUuYXR0YWNoVG8odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgLy8gSW5pdGlhbCBzeW5jIGluIGNhc2Ugc3RhdGUgaGFzIGJlZW4gdXBkYXRlZCBiZWZvcmUgdmlldyBpbml0aWFsaXphdGlvbi5cbiAgICB0aGlzLl9zeW5jTm90Y2hlZE91dGxpbmVTdGF0ZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgLy8gV2hlbmV2ZXIgdGhlIHdpZHRoLCBvciB0aGUgb3BlbiBzdGF0ZSBjaGFuZ2VzLCBzeW5jIHRoZSBub3RjaGVkIG91dGxpbmUgdG8gYmVcbiAgICAvLyBiYXNlZCBvbiB0aGUgbmV3IHZhbHVlcy5cbiAgICB0aGlzLl9zeW5jTm90Y2hlZE91dGxpbmVTdGF0ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX21kY05vdGNoZWRPdXRsaW5lICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9tZGNOb3RjaGVkT3V0bGluZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFN5bmNocm9uaXplcyB0aGUgbm90Y2hlZCBvdXRsaW5lIHN0YXRlIHRvIGJlIGJhc2VkIG9uIHRoZSBgd2lkdGhgIGFuZCBgb3BlbmAgaW5wdXRzLiAqL1xuICBwcml2YXRlIF9zeW5jTm90Y2hlZE91dGxpbmVTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fbWRjTm90Y2hlZE91dGxpbmUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgdGhpcy5fbWRjTm90Y2hlZE91dGxpbmUubm90Y2godGhpcy53aWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21kY05vdGNoZWRPdXRsaW5lLmNsb3NlTm90Y2goKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==