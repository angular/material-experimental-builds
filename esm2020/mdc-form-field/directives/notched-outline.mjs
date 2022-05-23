/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Internal component that creates an instance of the MDC notched-outline component.
 *
 * The component sets up the HTML structure and styles for the notched-outline. It provides
 * inputs to toggle the notch state and width.
 */
export class MatFormFieldNotchedOutline {
    constructor(_elementRef, _ngZone) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /** Width of the notch. */
        this.width = 0;
        /** Whether the notch should be opened. */
        this.open = false;
    }
    ngAfterViewInit() {
        const label = this._elementRef.nativeElement.querySelector('.mdc-floating-label');
        if (label) {
            this._elementRef.nativeElement.classList.add('mdc-notched-outline--upgraded');
            if (typeof requestAnimationFrame === 'function') {
                label.style.transitionDuration = '0s';
                this._ngZone.runOutsideAngular(() => {
                    requestAnimationFrame(() => (label.style.transitionDuration = ''));
                });
            }
        }
        else {
            this._elementRef.nativeElement.classList.add('mdc-notched-outline--no-label');
        }
    }
    _getNotchWidth() {
        if (this.open) {
            const NOTCH_ELEMENT_PADDING = 8;
            return `${this.width > 0 ? this.width + NOTCH_ELEMENT_PADDING : 0}px`;
        }
        return null;
    }
}
MatFormFieldNotchedOutline.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatFormFieldNotchedOutline, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
MatFormFieldNotchedOutline.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0-rc.1", type: MatFormFieldNotchedOutline, selector: "div[matFormFieldNotchedOutline]", inputs: { width: ["matFormFieldNotchedOutlineWidth", "width"], open: ["matFormFieldNotchedOutlineOpen", "open"] }, host: { properties: { "class.mdc-notched-outline--notched": "open" }, classAttribute: "mdc-notched-outline" }, ngImport: i0, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\" [style.width]=\"_getNotchWidth()\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatFormFieldNotchedOutline, decorators: [{
            type: Component,
            args: [{ selector: 'div[matFormFieldNotchedOutline]', host: {
                        'class': 'mdc-notched-outline',
                        // Besides updating the notch state through the MDC component, we toggle this class through
                        // a host binding in order to ensure that the notched-outline renders correctly on the server.
                        '[class.mdc-notched-outline--notched]': 'open',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\" [style.width]=\"_getNotchWidth()\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { width: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineWidth']
            }], open: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineOpen']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9ub3RjaGVkLW91dGxpbmUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7O0FBRXZCOzs7OztHQUtHO0FBYUgsTUFBTSxPQUFPLDBCQUEwQjtJQU9yQyxZQUFvQixXQUFvQyxFQUFVLE9BQWU7UUFBN0QsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQU5qRiwwQkFBMEI7UUFDZ0IsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUU1RCwwQ0FBMEM7UUFDRCxTQUFJLEdBQVksS0FBSyxDQUFDO0lBRXFCLENBQUM7SUFFckYsZUFBZTtRQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBYyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9GLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBRTlFLElBQUksT0FBTyxxQkFBcUIsS0FBSyxVQUFVLEVBQUU7Z0JBQy9DLEtBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtvQkFDbEMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQy9FO0lBQ0gsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixNQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQztZQUNoQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3ZFO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs0SEFoQ1UsMEJBQTBCO2dIQUExQiwwQkFBMEIseVNDcEN2QywrTkFLQTtnR0QrQmEsMEJBQTBCO2tCQVp0QyxTQUFTOytCQUNFLGlDQUFpQyxRQUVyQzt3QkFDSixPQUFPLEVBQUUscUJBQXFCO3dCQUM5QiwyRkFBMkY7d0JBQzNGLDhGQUE4Rjt3QkFDOUYsc0NBQXNDLEVBQUUsTUFBTTtxQkFDL0MsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7c0hBSUssS0FBSztzQkFBOUMsS0FBSzt1QkFBQyxpQ0FBaUM7Z0JBR0MsSUFBSTtzQkFBNUMsS0FBSzt1QkFBQyxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1EQyBub3RjaGVkLW91dGxpbmUgY29tcG9uZW50LlxuICpcbiAqIFRoZSBjb21wb25lbnQgc2V0cyB1cCB0aGUgSFRNTCBzdHJ1Y3R1cmUgYW5kIHN0eWxlcyBmb3IgdGhlIG5vdGNoZWQtb3V0bGluZS4gSXQgcHJvdmlkZXNcbiAqIGlucHV0cyB0byB0b2dnbGUgdGhlIG5vdGNoIHN0YXRlIGFuZCB3aWR0aC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W21hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RjaGVkLW91dGxpbmUuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLW5vdGNoZWQtb3V0bGluZScsXG4gICAgLy8gQmVzaWRlcyB1cGRhdGluZyB0aGUgbm90Y2ggc3RhdGUgdGhyb3VnaCB0aGUgTURDIGNvbXBvbmVudCwgd2UgdG9nZ2xlIHRoaXMgY2xhc3MgdGhyb3VnaFxuICAgIC8vIGEgaG9zdCBiaW5kaW5nIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBub3RjaGVkLW91dGxpbmUgcmVuZGVycyBjb3JyZWN0bHkgb24gdGhlIHNlcnZlci5cbiAgICAnW2NsYXNzLm1kYy1ub3RjaGVkLW91dGxpbmUtLW5vdGNoZWRdJzogJ29wZW4nLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgLyoqIFdpZHRoIG9mIHRoZSBub3RjaC4gKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZVdpZHRoJykgd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG5vdGNoIHNob3VsZCBiZSBvcGVuZWQuICovXG4gIEBJbnB1dCgnbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVPcGVuJykgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5tZGMtZmxvYXRpbmctbGFiZWwnKTtcbiAgICBpZiAobGFiZWwpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZGMtbm90Y2hlZC1vdXRsaW5lLS11cGdyYWRlZCcpO1xuXG4gICAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsYWJlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMHMnO1xuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiAobGFiZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJycpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZGMtbm90Y2hlZC1vdXRsaW5lLS1uby1sYWJlbCcpO1xuICAgIH1cbiAgfVxuXG4gIF9nZXROb3RjaFdpZHRoKCkge1xuICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgIGNvbnN0IE5PVENIX0VMRU1FTlRfUEFERElORyA9IDg7XG4gICAgICByZXR1cm4gYCR7dGhpcy53aWR0aCA+IDAgPyB0aGlzLndpZHRoICsgTk9UQ0hfRUxFTUVOVF9QQURESU5HIDogMH1weGA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX19sZWFkaW5nXCI+PC9kaXY+XG48ZGl2IGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fbm90Y2hcIiBbc3R5bGUud2lkdGhdPVwiX2dldE5vdGNoV2lkdGgoKVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX190cmFpbGluZ1wiPjwvZGl2PlxuIl19