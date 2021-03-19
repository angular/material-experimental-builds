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
class MatProgressSpinnerBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatProgressSpinnerMixinBase = mixinColor(MatProgressSpinnerBase, 'primary');
/**
 * Base reference size of the spinner.
 */
const BASE_SIZE = 100;
/**
 * Base reference stroke width of the spinner.
 */
const BASE_STROKE_WIDTH = 10;
export class MatProgressSpinner extends _MatProgressSpinnerMixinBase {
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
            setAttribute: (name, value) => this._elementRef.nativeElement.setAttribute(name, value),
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
                styles: ["@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:transparent}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}.mat-mdc-progress-spinner{overflow:hidden}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXByb2dyZXNzLXNwaW5uZXIvcHJvZ3Jlc3Mtc3Bpbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsNkJBQTZCLEVBQzlCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUF5QixVQUFVLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQ0wsb0NBQW9DLEVBRXJDLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFjLE1BQU0sdUJBQXVCLENBQUM7QUFFeEUscURBQXFEO0FBQ3JELE1BQU0sc0JBQXNCO0lBQzFCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQzFDLENBQUM7Q0FDRjtBQUVELE1BQU0sNEJBQTRCLEdBQ2hDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUtoRDs7R0FFRztBQUNILE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUV0Qjs7R0FFRztBQUNILE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBc0I3QixNQUFNLE9BQU8sa0JBQW1CLFNBQVEsNEJBQTRCO0lBNEJsRSxZQUFtQixXQUFvQyxFQUNBLGFBQXFCLEVBRTlELFFBQTJDO1FBQ3ZELEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUpGLGdCQUFXLEdBQVgs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LE1BQU07aUJBQ3RCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIscTlEQUFvQztnQkFFcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBN0RDLFVBQVU7eUNBMkZHLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzRDQUN4QyxNQUFNLFNBQUMsb0NBQW9DOzs7aUNBcEJ2RCxTQUFTLFNBQUMsb0JBQW9CO21CQStDOUIsS0FBSztvQkFXTCxLQUFLO3VCQWFMLEtBQUs7MEJBYUwsS0FBSzs7QUFrRVI7Ozs7O0dBS0c7QUFDSCx5Q0FBeUM7QUFDekMsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNRENDaXJjdWxhclByb2dyZXNzQWRhcHRlcixcbiAgTURDQ2lyY3VsYXJQcm9ncmVzc0ZvdW5kYXRpb25cbn0gZnJvbSAnQG1hdGVyaWFsL2NpcmN1bGFyLXByb2dyZXNzJztcbmltcG9ydCB7Q2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TLFxuICBNYXRQcm9ncmVzc1NwaW5uZXJEZWZhdWx0T3B0aW9uc1xufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyJztcbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFByb2dyZXNzQmFyLlxuY2xhc3MgTWF0UHJvZ3Jlc3NTcGlubmVyQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICB9XG59XG5cbmNvbnN0IF9NYXRQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNYXRQcm9ncmVzc1NwaW5uZXJCYXNlID1cbiAgbWl4aW5Db2xvcihNYXRQcm9ncmVzc1NwaW5uZXJCYXNlLCAncHJpbWFyeScpO1xuXG4vKiogUG9zc2libGUgbW9kZSBmb3IgYSBwcm9ncmVzcyBzcGlubmVyLiAqL1xuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbi8qKlxuICogQmFzZSByZWZlcmVuY2Ugc2l6ZSBvZiB0aGUgc3Bpbm5lci5cbiAqL1xuY29uc3QgQkFTRV9TSVpFID0gMTAwO1xuXG4vKipcbiAqIEJhc2UgcmVmZXJlbmNlIHN0cm9rZSB3aWR0aCBvZiB0aGUgc3Bpbm5lci5cbiAqL1xuY29uc3QgQkFTRV9TVFJPS0VfV0lEVEggPSAxMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXByb2dyZXNzLXNwaW5uZXIsIG1hdC1zcGlubmVyJyxcbiAgZXhwb3J0QXM6ICdtYXRQcm9ncmVzc1NwaW5uZXInLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAncHJvZ3Jlc3NiYXInLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLXByb2dyZXNzLXNwaW5uZXIgbWRjLWNpcmN1bGFyLXByb2dyZXNzJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6IGBfbm9vcEFuaW1hdGlvbnNgLFxuICAgICdbc3R5bGUud2lkdGgucHhdJzogJ2RpYW1ldGVyJyxcbiAgICAnW3N0eWxlLmhlaWdodC5weF0nOiAnZGlhbWV0ZXInLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWluXSc6ICcwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnMTAwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnbW9kZSA9PT0gXCJkZXRlcm1pbmF0ZVwiID8gdmFsdWUgOiBudWxsJyxcbiAgICAnW2F0dHIubW9kZV0nOiAnbW9kZScsXG4gIH0sXG4gIGlucHV0czogWydjb2xvciddLFxuICB0ZW1wbGF0ZVVybDogJ3Byb2dyZXNzLXNwaW5uZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9ncmVzcy1zcGlubmVyLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UHJvZ3Jlc3NTcGlubmVyIGV4dGVuZHMgX01hdFByb2dyZXNzU3Bpbm5lck1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSwgQ2FuQ29sb3Ige1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBfbWF0LWFuaW1hdGlvbi1ub29wYWJsZSBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCwgZGlzYWJsaW5nIGFuaW1hdGlvbnMuICAqL1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgLyoqIEltcGxlbWVudHMgYWxsIG9mIHRoZSBsb2dpYyBvZiB0aGUgTURDIGNpcmN1bGFyIHByb2dyZXNzLiAqL1xuICBfZm91bmRhdGlvbjogTURDQ2lyY3VsYXJQcm9ncmVzc0ZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSBlbGVtZW50IG9mIHRoZSBkZXRlcm1pbmF0ZSBzcGlubmVyLiAqL1xuICBAVmlld0NoaWxkKCdkZXRlcm1pbmF0ZVNwaW5uZXInKSBfZGV0ZXJtaW5hdGVDaXJjbGU6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBBZGFwdGVyIHVzZWQgYnkgTURDIHRvIGludGVyYWN0IHdpdGggdGhlIERPTS4gKi9cbiAgLy8gVE9ETzogc3dpdGNoIHRvIGNsYXNzIHdoZW4gTURDIHJlbW92ZXMgb2JqZWN0IHNwcmVhZCBpbiBmb3VuZGF0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL3B1bGwvNjI1NlxuICBwcml2YXRlIF9hZGFwdGVyOiBNRENDaXJjdWxhclByb2dyZXNzQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgIHJlbW92ZUF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSxcbiAgICBzZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSxcbiAgICBnZXREZXRlcm1pbmF0ZUNpcmNsZUF0dHJpYnV0ZTogKGF0dHJpYnV0ZU5hbWU6IHN0cmluZykgPT5cbiAgICAgIHRoaXMuX2RldGVybWluYXRlQ2lyY2xlLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpLFxuICAgIHNldERldGVybWluYXRlQ2lyY2xlQXR0cmlidXRlOiAoYXR0cmlidXRlTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PlxuICAgICAgdGhpcy5fZGV0ZXJtaW5hdGVDaXJjbGUubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgdmFsdWUpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlOiBzdHJpbmcsXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgICAgICAgIGRlZmF1bHRzPzogTWF0UHJvZ3Jlc3NTcGlubmVyRGVmYXVsdE9wdGlvbnMpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgdGhpcy5fbm9vcEFuaW1hdGlvbnMgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnICYmXG4gICAgICAoISFkZWZhdWx0cyAmJiAhZGVmYXVsdHMuX2ZvcmNlQW5pbWF0aW9ucyk7XG5cbiAgICBpZiAoZGVmYXVsdHMpIHtcbiAgICAgIGlmIChkZWZhdWx0cy5kaWFtZXRlcikge1xuICAgICAgICB0aGlzLmRpYW1ldGVyID0gZGVmYXVsdHMuZGlhbWV0ZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWZhdWx0cy5zdHJva2VXaWR0aCkge1xuICAgICAgICB0aGlzLnN0cm9rZVdpZHRoID0gZGVmYXVsdHMuc3Ryb2tlV2lkdGg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbW9kZTogUHJvZ3Jlc3NTcGlubmVyTW9kZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PVxuICAnbWF0LXNwaW5uZXInID8gJ2luZGV0ZXJtaW5hdGUnIDogJ2RldGVybWluYXRlJztcblxuICAvKipcbiAgICogTW9kZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBJbnB1dCBtdXN0IGJlIG9uZSBvZiB0aGVzZSB2YWx1ZXM6IGRldGVybWluYXRlLCBpbmRldGVybWluYXRlLCBidWZmZXIsIHF1ZXJ5LCBkZWZhdWx0cyB0b1xuICAgKiAnZGV0ZXJtaW5hdGUnLlxuICAgKiBNaXJyb3JlZCB0byBtb2RlIGF0dHJpYnV0ZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCk6IFByb2dyZXNzU3Bpbm5lck1vZGUgeyByZXR1cm4gdGhpcy5fbW9kZTsgfVxuXG4gIHNldCBtb2RlKHZhbHVlOiBQcm9ncmVzc1NwaW5uZXJNb2RlKSB7XG4gICAgdGhpcy5fbW9kZSA9IHZhbHVlO1xuICAgIHRoaXMuX3N5bmNGb3VuZGF0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZSA9IDA7XG5cbiAgLyoqIFZhbHVlIG9mIHRoZSBwcm9ncmVzcyBiYXIuIERlZmF1bHRzIHRvIHplcm8uIE1pcnJvcmVkIHRvIGFyaWEtdmFsdWVub3cuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1vZGUgPT09ICdkZXRlcm1pbmF0ZScgPyB0aGlzLl92YWx1ZSA6IDA7XG4gIH1cblxuICBzZXQgdmFsdWUodjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIGNvZXJjZU51bWJlclByb3BlcnR5KHYpKSk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RpYW1ldGVyID0gQkFTRV9TSVpFO1xuXG4gIC8qKiBUaGUgZGlhbWV0ZXIgb2YgdGhlIHByb2dyZXNzIHNwaW5uZXIgKHdpbGwgc2V0IHdpZHRoIGFuZCBoZWlnaHQgb2Ygc3ZnKS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpYW1ldGVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RpYW1ldGVyO1xuICB9XG5cbiAgc2V0IGRpYW1ldGVyKHNpemU6IG51bWJlcikge1xuICAgIHRoaXMuX2RpYW1ldGVyID0gY29lcmNlTnVtYmVyUHJvcGVydHkoc2l6ZSk7XG4gICAgdGhpcy5fc3luY0ZvdW5kYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0cm9rZVdpZHRoOiBudW1iZXI7XG5cbiAgLyoqIFN0cm9rZSB3aWR0aCBvZiB0aGUgcHJvZ3Jlc3Mgc3Bpbm5lci4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHN0cm9rZVdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cm9rZVdpZHRoID8/IHRoaXMuZGlhbWV0ZXIgLyAxMDtcbiAgfVxuXG4gIHNldCBzdHJva2VXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3Ryb2tlV2lkdGggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIHJhZGl1cyBvZiB0aGUgc3Bpbm5lciwgYWRqdXN0ZWQgZm9yIHN0cm9rZSB3aWR0aC4gKi9cbiAgX2NpcmNsZVJhZGl1cygpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5kaWFtZXRlciAtIEJBU0VfU1RST0tFX1dJRFRIKSAvIDI7XG4gIH1cblxuICAvKiogVGhlIHZpZXcgYm94IG9mIHRoZSBzcGlubmVyJ3Mgc3ZnIGVsZW1lbnQuICovXG4gIF92aWV3Qm94KCkge1xuICAgIGNvbnN0IHZpZXdCb3ggPSB0aGlzLl9jaXJjbGVSYWRpdXMoKSAqIDIgKyB0aGlzLnN0cm9rZVdpZHRoO1xuICAgIHJldHVybiBgMCAwICR7dmlld0JveH0gJHt2aWV3Qm94fWA7XG4gIH1cblxuICAvKiogVGhlIHN0cm9rZSBjaXJjdW1mZXJlbmNlIG9mIHRoZSBzdmcgY2lyY2xlLiAqL1xuICBfc3Ryb2tlQ2lyY3VtZmVyZW5jZSgpOiBudW1iZXIge1xuICAgIHJldHVybiAyICogTWF0aC5QSSAqIHRoaXMuX2NpcmNsZVJhZGl1cygpO1xuICB9XG5cbiAgLyoqIFRoZSBkYXNoIG9mZnNldCBvZiB0aGUgc3ZnIGNpcmNsZS4gKi9cbiAgX3N0cm9rZURhc2hPZmZzZXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RldGVybWluYXRlJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3N0cm9rZUNpcmN1bWZlcmVuY2UoKSAqICgxMDAgLSB0aGlzLl92YWx1ZSkgLyAxMDA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIFN0cm9rZSB3aWR0aCBvZiB0aGUgY2lyY2xlIGluIHBlcmNlbnQuICovXG4gIF9jaXJjbGVTdHJva2VXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJva2VXaWR0aCAvIHRoaXMuZGlhbWV0ZXIgKiAxMDA7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENDaXJjdWxhclByb2dyZXNzRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLl9zeW5jRm91bmRhdGlvbigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2ZvdW5kYXRpb24pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgc3RhdGUgb2YgdGhlIHByb2dyZXNzIHNwaW5uZXIgd2l0aCB0aGUgTURDIGZvdW5kYXRpb24uICovXG4gIHByaXZhdGUgX3N5bmNGb3VuZGF0aW9uKCkge1xuICAgIGNvbnN0IGZvdW5kYXRpb24gPSB0aGlzLl9mb3VuZGF0aW9uO1xuXG4gICAgaWYgKGZvdW5kYXRpb24pIHtcbiAgICAgIGNvbnN0IG1vZGUgPSB0aGlzLm1vZGU7XG4gICAgICBmb3VuZGF0aW9uLnNldFByb2dyZXNzKHRoaXMudmFsdWUgLyAxMDApO1xuICAgICAgZm91bmRhdGlvbi5zZXREZXRlcm1pbmF0ZShtb2RlID09PSAnZGV0ZXJtaW5hdGUnKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlhbWV0ZXI6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3Ryb2tlV2lkdGg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmFsdWU6IE51bWJlcklucHV0O1xufVxuXG4vKipcbiAqIGA8bWF0LXNwaW5uZXI+YCBjb21wb25lbnQuXG4gKlxuICogVGhpcyBpcyBhIGNvbXBvbmVudCBkZWZpbml0aW9uIHRvIGJlIHVzZWQgYXMgYSBjb252ZW5pZW5jZSByZWZlcmVuY2UgdG8gY3JlYXRlIGFuXG4gKiBpbmRldGVybWluYXRlIGA8bWF0LXByb2dyZXNzLXNwaW5uZXI+YCBpbnN0YW5jZS5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbmV4cG9ydCBjb25zdCBNYXRTcGlubmVyID0gTWF0UHJvZ3Jlc3NTcGlubmVyO1xuIl19