/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { MDCCircularProgressFoundation } from '@material/circular-progress';
import { mixinColor } from '@angular/material-experimental/mdc-core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material/progress-spinner';
import { coerceNumberProperty } from '@angular/cdk/coercion';
// Boilerplate for applying mixins to MatProgressBar.
const _MatProgressSpinnerBase = mixinColor(class {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}, 'primary');
/**
 * Base reference size of the spinner.
 */
const BASE_SIZE = 100;
/**
 * Base reference stroke width of the spinner.
 */
const BASE_STROKE_WIDTH = 10;
export class MatProgressSpinner extends _MatProgressSpinnerBase {
    constructor(_elementRef, animationMode, defaults) {
        super(_elementRef);
        this._elementRef = _elementRef;
        /** Adapter used by MDC to interact with the DOM. */
        // TODO: switch to class when MDC removes object spread in foundation
        // https://github.com/material-components/material-components-web/pull/6256
        this._adapter = {
            addClass: (className) => this._elementRef.nativeElement.classList.add(className),
            hasClass: (className) => this._elementRef.nativeElement.classList.contains(className),
            removeClass: (className) => this._elementRef.nativeElement.classList.remove(className),
            removeAttribute: (name) => this._elementRef.nativeElement.removeAttribute(name),
            setAttribute: (name, value) => {
                if (name !== 'aria-valuenow') {
                    // MDC deals with values between 0 and 1 but Angular Material deals with values between
                    // 0 and 100 so the aria-valuenow should be set through the attr binding in the host
                    // instead of by the MDC adapter
                    this._elementRef.nativeElement.setAttribute(name, value);
                }
            },
            getDeterminateCircleAttribute: (attributeName) => this._determinateCircle.nativeElement.getAttribute(attributeName),
            setDeterminateCircleAttribute: (attributeName, value) => this._determinateCircle.nativeElement.setAttribute(attributeName, value),
        };
        this._mode = this._elementRef.nativeElement.nodeName.toLowerCase() ===
            'mat-spinner' ? 'indeterminate' : 'determinate';
        this._value = 0;
        this._diameter = BASE_SIZE;
        this._noopAnimations = animationMode === 'NoopAnimations' &&
            (!!defaults && !defaults._forceAnimations);
        if (defaults) {
            if (defaults.diameter) {
                this.diameter = defaults.diameter;
            }
            if (defaults.strokeWidth) {
                this.strokeWidth = defaults.strokeWidth;
            }
        }
    }
    /**
     * Mode of the progress bar.
     *
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
     * 'determinate'.
     * Mirrored to mode attribute.
     */
    get mode() { return this._mode; }
    set mode(value) {
        this._mode = value;
        this._syncFoundation();
    }
    /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
    get value() {
        return this.mode === 'determinate' ? this._value : 0;
    }
    set value(v) {
        this._value = Math.max(0, Math.min(100, coerceNumberProperty(v)));
        this._syncFoundation();
    }
    /** The diameter of the progress spinner (will set width and height of svg). */
    get diameter() {
        return this._diameter;
    }
    set diameter(size) {
        this._diameter = coerceNumberProperty(size);
        this._syncFoundation();
    }
    /** Stroke width of the progress spinner. */
    get strokeWidth() {
        var _a;
        return (_a = this._strokeWidth) !== null && _a !== void 0 ? _a : this.diameter / 10;
    }
    set strokeWidth(value) {
        this._strokeWidth = coerceNumberProperty(value);
    }
    /** The radius of the spinner, adjusted for stroke width. */
    _circleRadius() {
        return (this.diameter - BASE_STROKE_WIDTH) / 2;
    }
    /** The view box of the spinner's svg element. */
    _viewBox() {
        const viewBox = this._circleRadius() * 2 + this.strokeWidth;
        return `0 0 ${viewBox} ${viewBox}`;
    }
    /** The stroke circumference of the svg circle. */
    _strokeCircumference() {
        return 2 * Math.PI * this._circleRadius();
    }
    /** The dash offset of the svg circle. */
    _strokeDashOffset() {
        if (this.mode === 'determinate') {
            return this._strokeCircumference() * (100 - this._value) / 100;
        }
        return null;
    }
    /** Stroke width of the circle in percent. */
    _circleStrokeWidth() {
        return this.strokeWidth / this.diameter * 100;
    }
    ngAfterViewInit() {
        this._foundation = new MDCCircularProgressFoundation(this._adapter);
        this._foundation.init();
        this._syncFoundation();
    }
    ngOnDestroy() {
        if (this._foundation) {
            this._foundation.destroy();
        }
    }
    /** Syncs the state of the progress spinner with the MDC foundation. */
    _syncFoundation() {
        const foundation = this._foundation;
        if (foundation) {
            const mode = this.mode;
            foundation.setProgress(this.value / 100);
            foundation.setDeterminate(mode === 'determinate');
        }
    }
}
MatProgressSpinner.decorators = [
    { type: Component, args: [{
                selector: 'mat-progress-spinner, mat-spinner',
                exportAs: 'matProgressSpinner',
                host: {
                    'role': 'progressbar',
                    'class': 'mat-mdc-progress-spinner mdc-circular-progress',
                    // set tab index to -1 so screen readers will read the aria-label
                    // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
                    'tabindex': '-1',
                    '[class._mat-animation-noopable]': `_noopAnimations`,
                    '[style.width.px]': 'diameter',
                    '[style.height.px]': 'diameter',
                    '[attr.aria-valuemin]': '0',
                    '[attr.aria-valuemax]': '100',
                    '[attr.aria-valuenow]': 'mode === "determinate" ? value : null',
                    '[attr.mode]': 'mode',
                },
                inputs: ['color'],
                template: "<ng-template #circle>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__indeterminate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeCircumference() / 2\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class=\"mdc-circular-progress__determinate-container\" aria-hidden=\"true\" #determinateSpinner>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__determinate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeDashOffset()\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            class=\"mdc-circular-progress__determinate-circle\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class=\"mdc-circular-progress__indeterminate-container\" aria-hidden=\"true\">\n  <div class=\"mdc-circular-progress__spinner-layer\">\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__gap-patch\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;line-height:0;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:transparent}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}.mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}\n"]
            },] }
];
MatProgressSpinner.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,] }] }
];
MatProgressSpinner.propDecorators = {
    _determinateCircle: [{ type: ViewChild, args: ['determinateSpinner',] }],
    mode: [{ type: Input }],
    value: [{ type: Input }],
    diameter: [{ type: Input }],
    strokeWidth: [{ type: Input }]
};
/**
 * `<mat-spinner>` component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate `<mat-progress-spinner>` instance.
 */
// tslint:disable-next-line:variable-name
export const MatSpinner = MatProgressSpinner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXByb2dyZXNzLXNwaW5uZXIvcHJvZ3Jlc3Mtc3Bpbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsNkJBQTZCLEVBQzlCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFXLFVBQVUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFDTCxvQ0FBb0MsRUFFckMsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1QyxPQUFPLEVBQUMsb0JBQW9CLEVBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RSxxREFBcUQ7QUFDckQsTUFBTSx1QkFBdUIsR0FBRyxVQUFVLENBQUM7SUFDekMsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFDMUMsQ0FBQztDQUNGLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFLZDs7R0FFRztBQUNILE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUV0Qjs7R0FFRztBQUNILE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBeUI3QixNQUFNLE9BQU8sa0JBQW1CLFNBQVEsdUJBQXVCO0lBa0M3RCxZQUFtQixXQUFvQyxFQUNBLGFBQXFCLEVBRTlELFFBQTJDO1FBQ3ZELEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUpGLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQXRCdkQsb0RBQW9EO1FB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VUFBVTtvQkFDOUIsbUJBQW1CLEVBQUUsVUFBVTtvQkFDL0Isc0JBQXNCLEVBQUUsR0FBRztvQkFDM0Isc0JBQXNCLEVBQUUsS0FBSztvQkFDN0Isc0JBQXNCLEVBQUUsdUNBQXVDO29CQUMvRCxhQUFhLEVBQUUsTUFBTTtpQkFDdEI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixxOURBQW9DO2dCQUVwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUE3REMsVUFBVTt5Q0FpR0csUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7NENBQ3hDLE1BQU0sU0FBQyxvQ0FBb0M7OztpQ0ExQnZELFNBQVMsU0FBQyxvQkFBb0I7bUJBcUQ5QixLQUFLO29CQVdMLEtBQUs7dUJBYUwsS0FBSzswQkFhTCxLQUFLOztBQWtFUjs7Ozs7R0FLRztBQUNILHlDQUF5QztBQUN6QyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1EQ0NpcmN1bGFyUHJvZ3Jlc3NBZGFwdGVyLFxuICBNRENDaXJjdWxhclByb2dyZXNzRm91bmRhdGlvblxufSBmcm9tICdAbWF0ZXJpYWwvY2lyY3VsYXItcHJvZ3Jlc3MnO1xuaW1wb3J0IHtDYW5Db2xvciwgbWl4aW5Db2xvcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TLFxuICBNYXRQcm9ncmVzc1NwaW5uZXJEZWZhdWx0T3B0aW9uc1xufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyJztcbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFByb2dyZXNzQmFyLlxuY29uc3QgX01hdFByb2dyZXNzU3Bpbm5lckJhc2UgPSBtaXhpbkNvbG9yKGNsYXNzIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cbn0sICdwcmltYXJ5Jyk7XG5cbi8qKiBQb3NzaWJsZSBtb2RlIGZvciBhIHByb2dyZXNzIHNwaW5uZXIuICovXG5leHBvcnQgdHlwZSBQcm9ncmVzc1NwaW5uZXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxuLyoqXG4gKiBCYXNlIHJlZmVyZW5jZSBzaXplIG9mIHRoZSBzcGlubmVyLlxuICovXG5jb25zdCBCQVNFX1NJWkUgPSAxMDA7XG5cbi8qKlxuICogQmFzZSByZWZlcmVuY2Ugc3Ryb2tlIHdpZHRoIG9mIHRoZSBzcGlubmVyLlxuICovXG5jb25zdCBCQVNFX1NUUk9LRV9XSURUSCA9IDEwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciwgbWF0LXNwaW5uZXInLFxuICBleHBvcnRBczogJ21hdFByb2dyZXNzU3Bpbm5lcicsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdwcm9ncmVzc2JhcicsXG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtcHJvZ3Jlc3Mtc3Bpbm5lciBtZGMtY2lyY3VsYXItcHJvZ3Jlc3MnLFxuICAgIC8vIHNldCB0YWIgaW5kZXggdG8gLTEgc28gc2NyZWVuIHJlYWRlcnMgd2lsbCByZWFkIHRoZSBhcmlhLWxhYmVsXG4gICAgLy8gTm90ZTogdGhlcmUgaXMgYSBrbm93biBpc3N1ZSB3aXRoIEpBV1MgdGhhdCBkb2VzIG5vdCByZWFkIHByb2dyZXNzYmFyIGFyaWEgbGFiZWxzIG9uIEZpcmVGb3hcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogYF9ub29wQW5pbWF0aW9uc2AsXG4gICAgJ1tzdHlsZS53aWR0aC5weF0nOiAnZGlhbWV0ZXInLFxuICAgICdbc3R5bGUuaGVpZ2h0LnB4XSc6ICdkaWFtZXRlcicsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVtaW5dJzogJzAnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICcxMDAnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICdtb2RlID09PSBcImRldGVybWluYXRlXCIgPyB2YWx1ZSA6IG51bGwnLFxuICAgICdbYXR0ci5tb2RlXSc6ICdtb2RlJyxcbiAgfSxcbiAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gIHRlbXBsYXRlVXJsOiAncHJvZ3Jlc3Mtc3Bpbm5lci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Byb2dyZXNzLXNwaW5uZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQcm9ncmVzc1NwaW5uZXIgZXh0ZW5kcyBfTWF0UHJvZ3Jlc3NTcGlubmVyQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSwgQ2FuQ29sb3Ige1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBfbWF0LWFuaW1hdGlvbi1ub29wYWJsZSBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCwgZGlzYWJsaW5nIGFuaW1hdGlvbnMuICAqL1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgLyoqIEltcGxlbWVudHMgYWxsIG9mIHRoZSBsb2dpYyBvZiB0aGUgTURDIGNpcmN1bGFyIHByb2dyZXNzLiAqL1xuICBfZm91bmRhdGlvbjogTURDQ2lyY3VsYXJQcm9ncmVzc0ZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSBlbGVtZW50IG9mIHRoZSBkZXRlcm1pbmF0ZSBzcGlubmVyLiAqL1xuICBAVmlld0NoaWxkKCdkZXRlcm1pbmF0ZVNwaW5uZXInKSBfZGV0ZXJtaW5hdGVDaXJjbGU6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBBZGFwdGVyIHVzZWQgYnkgTURDIHRvIGludGVyYWN0IHdpdGggdGhlIERPTS4gKi9cbiAgLy8gVE9ETzogc3dpdGNoIHRvIGNsYXNzIHdoZW4gTURDIHJlbW92ZXMgb2JqZWN0IHNwcmVhZCBpbiBmb3VuZGF0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL3B1bGwvNjI1NlxuICBwcml2YXRlIF9hZGFwdGVyOiBNRENDaXJjdWxhclByb2dyZXNzQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgIHJlbW92ZUF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSxcbiAgICBzZXRBdHRyaWJ1dGU6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgaWYgKG5hbWUgIT09ICdhcmlhLXZhbHVlbm93Jykge1xuICAgICAgICAvLyBNREMgZGVhbHMgd2l0aCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGJ1dCBBbmd1bGFyIE1hdGVyaWFsIGRlYWxzIHdpdGggdmFsdWVzIGJldHdlZW5cbiAgICAgICAgLy8gMCBhbmQgMTAwIHNvIHRoZSBhcmlhLXZhbHVlbm93IHNob3VsZCBiZSBzZXQgdGhyb3VnaCB0aGUgYXR0ciBiaW5kaW5nIGluIHRoZSBob3N0XG4gICAgICAgIC8vIGluc3RlYWQgb2YgYnkgdGhlIE1EQyBhZGFwdGVyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0RGV0ZXJtaW5hdGVDaXJjbGVBdHRyaWJ1dGU6IChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpID0+XG4gICAgICB0aGlzLl9kZXRlcm1pbmF0ZUNpcmNsZS5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSxcbiAgICBzZXREZXRlcm1pbmF0ZUNpcmNsZUF0dHJpYnV0ZTogKGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT5cbiAgICAgIHRoaXMuX2RldGVybWluYXRlQ2lyY2xlLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHZhbHVlKSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZTogc3RyaW5nLFxuICAgICAgICAgICAgICBASW5qZWN0KE1BVF9QUk9HUkVTU19TUElOTkVSX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICAgICAgICBkZWZhdWx0cz86IE1hdFByb2dyZXNzU3Bpbm5lckRlZmF1bHRPcHRpb25zKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX25vb3BBbmltYXRpb25zID0gYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJyAmJlxuICAgICAgKCEhZGVmYXVsdHMgJiYgIWRlZmF1bHRzLl9mb3JjZUFuaW1hdGlvbnMpO1xuXG4gICAgaWYgKGRlZmF1bHRzKSB7XG4gICAgICBpZiAoZGVmYXVsdHMuZGlhbWV0ZXIpIHtcbiAgICAgICAgdGhpcy5kaWFtZXRlciA9IGRlZmF1bHRzLmRpYW1ldGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVmYXVsdHMuc3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgdGhpcy5zdHJva2VXaWR0aCA9IGRlZmF1bHRzLnN0cm9rZVdpZHRoO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX21vZGU6IFByb2dyZXNzU3Bpbm5lck1vZGUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT1cbiAgJ21hdC1zcGlubmVyJyA/ICdpbmRldGVybWluYXRlJyA6ICdkZXRlcm1pbmF0ZSc7XG5cbiAgLyoqXG4gICAqIE1vZGUgb2YgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogSW5wdXQgbXVzdCBiZSBvbmUgb2YgdGhlc2UgdmFsdWVzOiBkZXRlcm1pbmF0ZSwgaW5kZXRlcm1pbmF0ZSwgYnVmZmVyLCBxdWVyeSwgZGVmYXVsdHMgdG9cbiAgICogJ2RldGVybWluYXRlJy5cbiAgICogTWlycm9yZWQgdG8gbW9kZSBhdHRyaWJ1dGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgbW9kZSgpOiBQcm9ncmVzc1NwaW5uZXJNb2RlIHsgcmV0dXJuIHRoaXMuX21vZGU7IH1cblxuICBzZXQgbW9kZSh2YWx1ZTogUHJvZ3Jlc3NTcGlubmVyTW9kZSkge1xuICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWUgPSAwO1xuXG4gIC8qKiBWYWx1ZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLiBEZWZhdWx0cyB0byB6ZXJvLiBNaXJyb3JlZCB0byBhcmlhLXZhbHVlbm93LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlID09PSAnZGV0ZXJtaW5hdGUnID8gdGhpcy5fdmFsdWUgOiAwO1xuICB9XG5cbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2KSkpO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9kaWFtZXRlciA9IEJBU0VfU0laRTtcblxuICAvKiogVGhlIGRpYW1ldGVyIG9mIHRoZSBwcm9ncmVzcyBzcGlubmVyICh3aWxsIHNldCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHN2ZykuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaWFtZXRlcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kaWFtZXRlcjtcbiAgfVxuXG4gIHNldCBkaWFtZXRlcihzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLl9kaWFtZXRlciA9IGNvZXJjZU51bWJlclByb3BlcnR5KHNpemUpO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdHJva2VXaWR0aDogbnVtYmVyO1xuXG4gIC8qKiBTdHJva2Ugd2lkdGggb2YgdGhlIHByb2dyZXNzIHNwaW5uZXIuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdHJva2VXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdHJva2VXaWR0aCA/PyB0aGlzLmRpYW1ldGVyIC8gMTA7XG4gIH1cblxuICBzZXQgc3Ryb2tlV2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3N0cm9rZVdpZHRoID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqIFRoZSByYWRpdXMgb2YgdGhlIHNwaW5uZXIsIGFkanVzdGVkIGZvciBzdHJva2Ugd2lkdGguICovXG4gIF9jaXJjbGVSYWRpdXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuZGlhbWV0ZXIgLSBCQVNFX1NUUk9LRV9XSURUSCkgLyAyO1xuICB9XG5cbiAgLyoqIFRoZSB2aWV3IGJveCBvZiB0aGUgc3Bpbm5lcidzIHN2ZyBlbGVtZW50LiAqL1xuICBfdmlld0JveCgpIHtcbiAgICBjb25zdCB2aWV3Qm94ID0gdGhpcy5fY2lyY2xlUmFkaXVzKCkgKiAyICsgdGhpcy5zdHJva2VXaWR0aDtcbiAgICByZXR1cm4gYDAgMCAke3ZpZXdCb3h9ICR7dmlld0JveH1gO1xuICB9XG5cbiAgLyoqIFRoZSBzdHJva2UgY2lyY3VtZmVyZW5jZSBvZiB0aGUgc3ZnIGNpcmNsZS4gKi9cbiAgX3N0cm9rZUNpcmN1bWZlcmVuY2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gMiAqIE1hdGguUEkgKiB0aGlzLl9jaXJjbGVSYWRpdXMoKTtcbiAgfVxuXG4gIC8qKiBUaGUgZGFzaCBvZmZzZXQgb2YgdGhlIHN2ZyBjaXJjbGUuICovXG4gIF9zdHJva2VEYXNoT2Zmc2V0KCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdkZXRlcm1pbmF0ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlKCkgKiAoMTAwIC0gdGhpcy5fdmFsdWUpIC8gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBTdHJva2Ugd2lkdGggb2YgdGhlIGNpcmNsZSBpbiBwZXJjZW50LiAqL1xuICBfY2lyY2xlU3Ryb2tlV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Ryb2tlV2lkdGggLyB0aGlzLmRpYW1ldGVyICogMTAwO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDQ2lyY3VsYXJQcm9ncmVzc0ZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9mb3VuZGF0aW9uKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKiogU3luY3MgdGhlIHN0YXRlIG9mIHRoZSBwcm9ncmVzcyBzcGlubmVyIHdpdGggdGhlIE1EQyBmb3VuZGF0aW9uLiAqL1xuICBwcml2YXRlIF9zeW5jRm91bmRhdGlvbigpIHtcbiAgICBjb25zdCBmb3VuZGF0aW9uID0gdGhpcy5fZm91bmRhdGlvbjtcblxuICAgIGlmIChmb3VuZGF0aW9uKSB7XG4gICAgICBjb25zdCBtb2RlID0gdGhpcy5tb2RlO1xuICAgICAgZm91bmRhdGlvbi5zZXRQcm9ncmVzcyh0aGlzLnZhbHVlIC8gMTAwKTtcbiAgICAgIGZvdW5kYXRpb24uc2V0RGV0ZXJtaW5hdGUobW9kZSA9PT0gJ2RldGVybWluYXRlJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2RpYW1ldGVyOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0cm9rZVdpZHRoOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZhbHVlOiBOdW1iZXJJbnB1dDtcbn1cblxuLyoqXG4gKiBgPG1hdC1zcGlubmVyPmAgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgaXMgYSBjb21wb25lbnQgZGVmaW5pdGlvbiB0byBiZSB1c2VkIGFzIGEgY29udmVuaWVuY2UgcmVmZXJlbmNlIHRvIGNyZWF0ZSBhblxuICogaW5kZXRlcm1pbmF0ZSBgPG1hdC1wcm9ncmVzcy1zcGlubmVyPmAgaW5zdGFuY2UuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG5leHBvcnQgY29uc3QgTWF0U3Bpbm5lciA9IE1hdFByb2dyZXNzU3Bpbm5lcjtcbiJdfQ==