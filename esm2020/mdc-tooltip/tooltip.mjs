/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Inject, NgZone, Optional, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_SCROLL_STRATEGY, _MatTooltipBase, _TooltipComponentBase, } from '@angular/material/tooltip';
import { numbers } from '@material/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/platform";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/common";
/**
 * CSS class that will be attached to the overlay panel.
 * @deprecated
 * @breaking-change 13.0.0 remove this variable
 */
export const TOOLTIP_PANEL_CLASS = 'mat-mdc-tooltip-panel';
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
export class MatTooltip extends _MatTooltipBase {
    constructor(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document) {
        super(overlay, elementRef, scrollDispatcher, viewContainerRef, ngZone, platform, ariaDescriber, focusMonitor, scrollStrategy, dir, defaultOptions, _document);
        this._tooltipComponent = TooltipComponent;
        this._cssClassPrefix = 'mat-mdc';
        this._viewportMargin = numbers.MIN_VIEWPORT_TOOLTIP_THRESHOLD;
    }
    _addOffset(position) {
        const offset = numbers.UNBOUNDED_ANCHOR_GAP;
        const isLtr = !this._dir || this._dir.value == 'ltr';
        if (position.originY === 'top') {
            position.offsetY = -offset;
        }
        else if (position.originY === 'bottom') {
            position.offsetY = offset;
        }
        else if (position.originX === 'start') {
            position.offsetX = isLtr ? -offset : offset;
        }
        else if (position.originX === 'end') {
            position.offsetX = isLtr ? offset : -offset;
        }
        return position;
    }
}
MatTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatTooltip, deps: [{ token: i1.Overlay }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.AriaDescriber }, { token: i3.FocusMonitor }, { token: MAT_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: MAT_TOOLTIP_DEFAULT_OPTIONS, optional: true }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.14", type: MatTooltip, selector: "[matTooltip]", host: { classAttribute: "mat-mdc-tooltip-trigger" }, exportAs: ["matTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatTooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTooltip]',
                    exportAs: 'matTooltip',
                    host: {
                        'class': 'mat-mdc-tooltip-trigger',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.AriaDescriber }, { type: i3.FocusMonitor }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_TOOLTIP_DEFAULT_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export class TooltipComponent extends _TooltipComponentBase {
    constructor(changeDetectorRef, _elementRef, animationMode) {
        super(changeDetectorRef, animationMode);
        this._elementRef = _elementRef;
        /* Whether the tooltip text overflows to multiple lines */
        this._isMultiline = false;
        this._showAnimation = 'mat-mdc-tooltip-show';
        this._hideAnimation = 'mat-mdc-tooltip-hide';
    }
    _onShow() {
        this._isMultiline = this._isTooltipMultiline();
        this._markForCheck();
    }
    /** Whether the tooltip text has overflown to the next line */
    _isTooltipMultiline() {
        const rect = this._elementRef.nativeElement.getBoundingClientRect();
        return rect.height > numbers.MIN_HEIGHT && rect.width >= numbers.MAX_WIDTH;
    }
}
TooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: TooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
TooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "14.0.0-next.14", type: TooltipComponent, selector: "mat-tooltip-component", host: { attributes: { "aria-hidden": "true" }, listeners: { "mouseleave": "_handleMouseLeave($event)" }, properties: { "style.zoom": "isVisible() ? 1 : null" } }, viewQueries: [{ propertyName: "_tooltip", first: true, predicate: ["tooltip"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div\n  #tooltip\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  (animationend)=\"_handleAnimationEnd($event)\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:9}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:20px;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(100% - 2 * 8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:\"\";top:-8px;right:-8px;bottom:-8px;left:-8px;z-index:-1;position:absolute}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tooltip-component', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                        // won't be rendered if the animations are disabled or there is no web animations polyfill.
                        '[style.zoom]': 'isVisible() ? 1 : null',
                        '(mouseleave)': '_handleMouseLeave($event)',
                        'aria-hidden': 'true',
                    }, template: "<div\n  #tooltip\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  (animationend)=\"_handleAnimationEnd($event)\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:9}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}@media screen and (forced-colors: active){.mdc-tooltip__surface::before{border-color:CanvasText}}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:20px;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(100% - 2 * 8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid rgba(0,0,0,0);z-index:-1}@media screen and (forced-colors: active){.mdc-tooltip__caret-surface-bottom{outline-color:CanvasText}}.mat-mdc-tooltip{position:relative;transform:scale(0)}.mat-mdc-tooltip::before{content:\"\";top:-8px;right:-8px;bottom:-8px;left:-8px;z-index:-1;position:absolute}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { _tooltip: [{
                type: ViewChild,
                args: ['tooltip', {
                        // Use a static query here since we interact directly with
                        // the DOM which can happen before `ngAfterViewInit`.
                        static: true,
                    }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRvb2x0aXAvdG9vbHRpcC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRvb2x0aXAvdG9vbHRpcC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBRUwsMkJBQTJCLEVBQzNCLDJCQUEyQixFQUMzQixlQUFlLEVBQ2YscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7O0FBRTFDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyx1QkFBdUIsQ0FBQztBQUUzRDs7Ozs7R0FLRztBQVFILE1BQU0sT0FBTyxVQUFXLFNB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QUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUM3RSxDQUFDOztxSEEvQlUsZ0JBQWdCLDZFQWlCTCxxQkFBcUI7eUdBakJoQyxnQkFBZ0IsMFdDL0g3QixvVEFRQTttR0R1SGEsZ0JBQWdCO2tCQWQ1QixTQUFTOytCQUNFLHVCQUF1QixpQkFHbEIsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDSiwwRkFBMEY7d0JBQzFGLDJGQUEyRjt3QkFDM0YsY0FBYyxFQUFFLHdCQUF3Qjt3QkFDeEMsY0FBYyxFQUFFLDJCQUEyQjt3QkFDM0MsYUFBYSxFQUFFLE1BQU07cUJBQ3RCOzswQkFtQkUsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxxQkFBcUI7NENBUDNDLFFBQVE7c0JBTFAsU0FBUzt1QkFBQyxTQUFTLEVBQUU7d0JBQ3BCLDBEQUEwRDt3QkFDMUQscURBQXFEO3dCQUNyRCxNQUFNLEVBQUUsSUFBSTtxQkFDYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7QXJpYURlc2NyaWJlciwgRm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Nvbm5lY3RlZFBvc2l0aW9uLCBPdmVybGF5LCBTY3JvbGxEaXNwYXRjaGVyfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsXG4gIE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OUyxcbiAgTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICBfTWF0VG9vbHRpcEJhc2UsXG4gIF9Ub29sdGlwQ29tcG9uZW50QmFzZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC90b29sdGlwJztcblxuLyoqXG4gKiBDU1MgY2xhc3MgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBvdmVybGF5IHBhbmVsLlxuICogQGRlcHJlY2F0ZWRcbiAqIEBicmVha2luZy1jaGFuZ2UgMTMuMC4wIHJlbW92ZSB0aGlzIHZhcmlhYmxlXG4gKi9cbmV4cG9ydCBjb25zdCBUT09MVElQX1BBTkVMX0NMQVNTID0gJ21hdC1tZGMtdG9vbHRpcC1wYW5lbCc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYXR0YWNoZXMgYSBtYXRlcmlhbCBkZXNpZ24gdG9vbHRpcCB0byB0aGUgaG9zdCBlbGVtZW50LiBBbmltYXRlcyB0aGUgc2hvd2luZyBhbmRcbiAqIGhpZGluZyBvZiBhIHRvb2x0aXAgcHJvdmlkZWQgcG9zaXRpb24gKGRlZmF1bHRzIHRvIGJlbG93IHRoZSBlbGVtZW50KS5cbiAqXG4gKiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3Rvb2x0aXBzLmh0bWxcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRvb2x0aXBdJyxcbiAgZXhwb3J0QXM6ICdtYXRUb29sdGlwJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRvb2x0aXAtdHJpZ2dlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRvb2x0aXAgZXh0ZW5kcyBfTWF0VG9vbHRpcEJhc2U8VG9vbHRpcENvbXBvbmVudD4ge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgcmVhZG9ubHkgX3Rvb2x0aXBDb21wb25lbnQgPSBUb29sdGlwQ29tcG9uZW50O1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgcmVhZG9ubHkgX2Nzc0NsYXNzUHJlZml4ID0gJ21hdC1tZGMnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBhcmlhRGVzY3JpYmVyOiBBcmlhRGVzY3JpYmVyLFxuICAgIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIEBJbmplY3QoTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxuICAgIEBPcHRpb25hbCgpIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMpIGRlZmF1bHRPcHRpb25zOiBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgb3ZlcmxheSxcbiAgICAgIGVsZW1lbnRSZWYsXG4gICAgICBzY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgdmlld0NvbnRhaW5lclJlZixcbiAgICAgIG5nWm9uZSxcbiAgICAgIHBsYXRmb3JtLFxuICAgICAgYXJpYURlc2NyaWJlcixcbiAgICAgIGZvY3VzTW9uaXRvcixcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgZGlyLFxuICAgICAgZGVmYXVsdE9wdGlvbnMsXG4gICAgICBfZG9jdW1lbnQsXG4gICAgKTtcbiAgICB0aGlzLl92aWV3cG9ydE1hcmdpbiA9IG51bWJlcnMuTUlOX1ZJRVdQT1JUX1RPT0xUSVBfVEhSRVNIT0xEO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9hZGRPZmZzZXQocG9zaXRpb246IENvbm5lY3RlZFBvc2l0aW9uKTogQ29ubmVjdGVkUG9zaXRpb24ge1xuICAgIGNvbnN0IG9mZnNldCA9IG51bWJlcnMuVU5CT1VOREVEX0FOQ0hPUl9HQVA7XG4gICAgY29uc3QgaXNMdHIgPSAhdGhpcy5fZGlyIHx8IHRoaXMuX2Rpci52YWx1ZSA9PSAnbHRyJztcblxuICAgIGlmIChwb3NpdGlvbi5vcmlnaW5ZID09PSAndG9wJykge1xuICAgICAgcG9zaXRpb24ub2Zmc2V0WSA9IC1vZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbi5vcmlnaW5ZID09PSAnYm90dG9tJykge1xuICAgICAgcG9zaXRpb24ub2Zmc2V0WSA9IG9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uLm9yaWdpblggPT09ICdzdGFydCcpIHtcbiAgICAgIHBvc2l0aW9uLm9mZnNldFggPSBpc0x0ciA/IC1vZmZzZXQgOiBvZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbi5vcmlnaW5YID09PSAnZW5kJykge1xuICAgICAgcG9zaXRpb24ub2Zmc2V0WCA9IGlzTHRyID8gb2Zmc2V0IDogLW9mZnNldDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCB3cmFwcyB0aGUgdG9vbHRpcCdzIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10b29sdGlwLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAndG9vbHRpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Rvb2x0aXAuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgLy8gRm9yY2VzIHRoZSBlbGVtZW50IHRvIGhhdmUgYSBsYXlvdXQgaW4gSUUgYW5kIEVkZ2UuIFRoaXMgZml4ZXMgaXNzdWVzIHdoZXJlIHRoZSBlbGVtZW50XG4gICAgLy8gd29uJ3QgYmUgcmVuZGVyZWQgaWYgdGhlIGFuaW1hdGlvbnMgYXJlIGRpc2FibGVkIG9yIHRoZXJlIGlzIG5vIHdlYiBhbmltYXRpb25zIHBvbHlmaWxsLlxuICAgICdbc3R5bGUuem9vbV0nOiAnaXNWaXNpYmxlKCkgPyAxIDogbnVsbCcsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdfaGFuZGxlTW91c2VMZWF2ZSgkZXZlbnQpJyxcbiAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb21wb25lbnQgZXh0ZW5kcyBfVG9vbHRpcENvbXBvbmVudEJhc2Uge1xuICAvKiBXaGV0aGVyIHRoZSB0b29sdGlwIHRleHQgb3ZlcmZsb3dzIHRvIG11bHRpcGxlIGxpbmVzICovXG4gIF9pc011bHRpbGluZSA9IGZhbHNlO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGludGVybmFsIHRvb2x0aXAgZWxlbWVudC4gKi9cbiAgQFZpZXdDaGlsZCgndG9vbHRpcCcsIHtcbiAgICAvLyBVc2UgYSBzdGF0aWMgcXVlcnkgaGVyZSBzaW5jZSB3ZSBpbnRlcmFjdCBkaXJlY3RseSB3aXRoXG4gICAgLy8gdGhlIERPTSB3aGljaCBjYW4gaGFwcGVuIGJlZm9yZSBgbmdBZnRlclZpZXdJbml0YC5cbiAgICBzdGF0aWM6IHRydWUsXG4gIH0pXG4gIF90b29sdGlwOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgX3Nob3dBbmltYXRpb24gPSAnbWF0LW1kYy10b29sdGlwLXNob3cnO1xuICBfaGlkZUFuaW1hdGlvbiA9ICdtYXQtbWRjLXRvb2x0aXAtaGlkZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihjaGFuZ2VEZXRlY3RvclJlZiwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX29uU2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLl9pc011bHRpbGluZSA9IHRoaXMuX2lzVG9vbHRpcE11bHRpbGluZSgpO1xuICAgIHRoaXMuX21hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRvb2x0aXAgdGV4dCBoYXMgb3ZlcmZsb3duIHRvIHRoZSBuZXh0IGxpbmUgKi9cbiAgcHJpdmF0ZSBfaXNUb29sdGlwTXVsdGlsaW5lKCkge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHJlY3QuaGVpZ2h0ID4gbnVtYmVycy5NSU5fSEVJR0hUICYmIHJlY3Qud2lkdGggPj0gbnVtYmVycy5NQVhfV0lEVEg7XG4gIH1cbn1cbiIsIjxkaXZcbiAgI3Rvb2x0aXBcbiAgY2xhc3M9XCJtZGMtdG9vbHRpcCBtZGMtdG9vbHRpcC0tc2hvd24gbWF0LW1kYy10b29sdGlwXCJcbiAgW25nQ2xhc3NdPVwidG9vbHRpcENsYXNzXCJcbiAgKGFuaW1hdGlvbmVuZCk9XCJfaGFuZGxlQW5pbWF0aW9uRW5kKCRldmVudClcIlxuICBbY2xhc3MubWRjLXRvb2x0aXAtLW11bHRpbGluZV09XCJfaXNNdWx0aWxpbmVcIj5cbiAgPGRpdiBjbGFzcz1cIm1kYy10b29sdGlwX19zdXJmYWNlIG1kYy10b29sdGlwX19zdXJmYWNlLWFuaW1hdGlvblwiPnt7bWVzc2FnZX19PC9kaXY+XG48L2Rpdj5cbiJdfQ==