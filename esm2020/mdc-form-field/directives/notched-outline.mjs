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
        /** Width of the label (original scale) */
        this.labelWidth = 0;
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
            const NOTCH_ELEMENT_BORDER = 1;
            return this.labelWidth > 0
                ? `calc(${this.labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${NOTCH_ELEMENT_PADDING + NOTCH_ELEMENT_BORDER}px)`
                : '0px';
        }
        return null;
    }
}
MatFormFieldNotchedOutline.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatFormFieldNotchedOutline, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
MatFormFieldNotchedOutline.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatFormFieldNotchedOutline, selector: "div[matFormFieldNotchedOutline]", inputs: { labelWidth: ["matFormFieldNotchedOutlineLabelWidth", "labelWidth"], open: ["matFormFieldNotchedOutlineOpen", "open"] }, host: { properties: { "class.mdc-notched-outline--notched": "open" }, classAttribute: "mdc-notched-outline" }, ngImport: i0, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\" [style.width]=\"_getNotchWidth()\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatFormFieldNotchedOutline, decorators: [{
            type: Component,
            args: [{ selector: 'div[matFormFieldNotchedOutline]', host: {
                        'class': 'mdc-notched-outline',
                        // Besides updating the notch state through the MDC component, we toggle this class through
                        // a host binding in order to ensure that the notched-outline renders correctly on the server.
                        '[class.mdc-notched-outline--notched]': 'open',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\" [style.width]=\"_getNotchWidth()\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { labelWidth: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineLabelWidth']
            }], open: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineOpen']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZGlyZWN0aXZlcy9ub3RjaGVkLW91dGxpbmUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7O0FBRXZCOzs7OztHQUtHO0FBYUgsTUFBTSxPQUFPLDBCQUEwQjtJQU9yQyxZQUFvQixXQUFvQyxFQUFVLE9BQWU7UUFBN0QsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQU5qRiwwQ0FBMEM7UUFDSyxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXRFLDBDQUEwQztRQUNELFNBQUksR0FBWSxLQUFLLENBQUM7SUFFcUIsQ0FBQztJQUVyRixlQUFlO1FBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFjLHFCQUFxQixDQUFDLENBQUM7UUFDL0YsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFFOUUsSUFBSSxPQUFPLHFCQUFxQixLQUFLLFVBQVUsRUFBRTtnQkFDL0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO29CQUNsQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDL0U7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDO2dCQUN4QixDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsVUFBVSwrREFDckIscUJBQXFCLEdBQUcsb0JBQzFCLEtBQUs7Z0JBQ1AsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNYO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs0SEFyQ1UsMEJBQTBCO2dIQUExQiwwQkFBMEIsd1RDcEN2QywrTkFLQTtnR0QrQmEsMEJBQTBCO2tCQVp0QyxTQUFTOytCQUNFLGlDQUFpQyxRQUVyQzt3QkFDSixPQUFPLEVBQUUscUJBQXFCO3dCQUM5QiwyRkFBMkY7d0JBQzNGLDhGQUE4Rjt3QkFDOUYsc0NBQXNDLEVBQUUsTUFBTTtxQkFDL0MsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7c0hBSVUsVUFBVTtzQkFBeEQsS0FBSzt1QkFBQyxzQ0FBc0M7Z0JBR0osSUFBSTtzQkFBNUMsS0FBSzt1QkFBQyxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIE1EQyBub3RjaGVkLW91dGxpbmUgY29tcG9uZW50LlxuICpcbiAqIFRoZSBjb21wb25lbnQgc2V0cyB1cCB0aGUgSFRNTCBzdHJ1Y3R1cmUgYW5kIHN0eWxlcyBmb3IgdGhlIG5vdGNoZWQtb3V0bGluZS4gSXQgcHJvdmlkZXNcbiAqIGlucHV0cyB0byB0b2dnbGUgdGhlIG5vdGNoIHN0YXRlIGFuZCB3aWR0aC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W21hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RjaGVkLW91dGxpbmUuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLW5vdGNoZWQtb3V0bGluZScsXG4gICAgLy8gQmVzaWRlcyB1cGRhdGluZyB0aGUgbm90Y2ggc3RhdGUgdGhyb3VnaCB0aGUgTURDIGNvbXBvbmVudCwgd2UgdG9nZ2xlIHRoaXMgY2xhc3MgdGhyb3VnaFxuICAgIC8vIGEgaG9zdCBiaW5kaW5nIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBub3RjaGVkLW91dGxpbmUgcmVuZGVycyBjb3JyZWN0bHkgb24gdGhlIHNlcnZlci5cbiAgICAnW2NsYXNzLm1kYy1ub3RjaGVkLW91dGxpbmUtLW5vdGNoZWRdJzogJ29wZW4nLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgLyoqIFdpZHRoIG9mIHRoZSBsYWJlbCAob3JpZ2luYWwgc2NhbGUpICovXG4gIEBJbnB1dCgnbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVMYWJlbFdpZHRoJykgbGFiZWxXaWR0aDogbnVtYmVyID0gMDtcblxuICAvKiogV2hldGhlciB0aGUgbm90Y2ggc2hvdWxkIGJlIG9wZW5lZC4gKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZU9wZW4nKSBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLm1kYy1mbG9hdGluZy1sYWJlbCcpO1xuICAgIGlmIChsYWJlbCkge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21kYy1ub3RjaGVkLW91dGxpbmUtLXVwZ3JhZGVkJyk7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxhYmVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwcyc7XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IChsYWJlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnJykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21kYy1ub3RjaGVkLW91dGxpbmUtLW5vLWxhYmVsJyk7XG4gICAgfVxuICB9XG5cbiAgX2dldE5vdGNoV2lkdGgoKSB7XG4gICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgY29uc3QgTk9UQ0hfRUxFTUVOVF9QQURESU5HID0gODtcbiAgICAgIGNvbnN0IE5PVENIX0VMRU1FTlRfQk9SREVSID0gMTtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVsV2lkdGggPiAwXG4gICAgICAgID8gYGNhbGMoJHt0aGlzLmxhYmVsV2lkdGh9cHggKiB2YXIoLS1tYXQtbWRjLWZvcm0tZmllbGQtZmxvYXRpbmctbGFiZWwtc2NhbGUsIDAuNzUpICsgJHtcbiAgICAgICAgICAgIE5PVENIX0VMRU1FTlRfUEFERElORyArIE5PVENIX0VMRU1FTlRfQk9SREVSXG4gICAgICAgICAgfXB4KWBcbiAgICAgICAgOiAnMHB4JztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX2xlYWRpbmdcIj48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX19ub3RjaFwiIFtzdHlsZS53aWR0aF09XCJfZ2V0Tm90Y2hXaWR0aCgpXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX3RyYWlsaW5nXCI+PC9kaXY+XG4iXX0=