/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Inject, NgZone, Optional, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_SCROLL_STRATEGY, _MatTooltipBase, _TooltipComponentBase, } from '@angular/material/tooltip';
import { numbers } from '@material/tooltip';
import { matTooltipAnimations } from './tooltip-animations';
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
MatTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatTooltip, deps: [{ token: i1.Overlay }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.AriaDescriber }, { token: i3.FocusMonitor }, { token: MAT_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: MAT_TOOLTIP_DEFAULT_OPTIONS, optional: true }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0-next.3", type: MatTooltip, selector: "[matTooltip]", host: { classAttribute: "mat-mdc-tooltip-trigger" }, exportAs: ["matTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatTooltip, decorators: [{
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
    constructor(changeDetectorRef, _elementRef) {
        super(changeDetectorRef);
        this._elementRef = _elementRef;
        /* Whether the tooltip text overflows to multiple lines */
        this._isMultiline = false;
    }
    _onShow() {
        this._isMultiline = this._isTooltipMultiline();
    }
    /** Whether the tooltip text has overflown to the next line */
    _isTooltipMultiline() {
        const rect = this._elementRef.nativeElement.getBoundingClientRect();
        return rect.height > numbers.MIN_HEIGHT && rect.width >= numbers.MAX_WIDTH;
    }
}
TooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: TooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0-next.3", type: TooltipComponent, selector: "mat-tooltip-component", host: { attributes: { "aria-hidden": "true" }, properties: { "style.zoom": "_visibility === \"visible\" ? 1 : null" } }, usesInheritance: true, ngImport: i0, template: "<div\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\"\n  [@state]=\"_visibility\"\n  (@state.start)=\"_animationStart()\"\n  (@state.done)=\"_animationDone($event)\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:9}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:20px;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(100% - 2 * 8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid transparent;z-index:-1}.mat-mdc-tooltip{position:static;pointer-events:none !important}\n"], directives: [{ type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [matTooltipAnimations.tooltipState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tooltip-component', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [matTooltipAnimations.tooltipState], host: {
                        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                        // won't be rendered if the animations are disabled or there is no web animations polyfill.
                        '[style.zoom]': '_visibility === "visible" ? 1 : null',
                        'aria-hidden': 'true',
                    }, template: "<div\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\"\n  [@state]=\"_visibility\"\n  (@state.start)=\"_animationStart()\"\n  (@state.done)=\"_animationDone($event)\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:9}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:20px;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(100% - 2 * 8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid transparent;z-index:-1}.mat-mdc-tooltip{position:static;pointer-events:none !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRvb2x0aXAvdG9vbHRpcC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRvb2x0aXAvdG9vbHRpcC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQW9CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xGLE9BQU8sRUFFTCwyQkFBMkIsRUFDM0IsMkJBQTJCLEVBQzNCLGVBQWUsRUFDZixxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7QUFFMUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLHVCQUF1QixDQUFDO0FBRTNEOzs7OztHQUtHO0FBUUgsTUFBTSxPQUFPLFVBQVcsU0FBUSxlQUFpQztJ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c1dBU0EsdzFGRDZHYyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQztrR0FRcEMsZ0JBQWdCO2tCQWQ1QixTQUFTOytCQUNFLHVCQUF1QixpQkFHbEIsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxjQUNuQyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxRQUN6Qzt3QkFDSiwwRkFBMEY7d0JBQzFGLDJGQUEyRjt3QkFDM0YsY0FBYyxFQUFFLHNDQUFzQzt3QkFDdEQsYUFBYSxFQUFFLE1BQU07cUJBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0FyaWFEZXNjcmliZXIsIEZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtDb25uZWN0ZWRQb3NpdGlvbiwgT3ZlcmxheSwgU2Nyb2xsRGlzcGF0Y2hlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zLFxuICBNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMsXG4gIE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSxcbiAgX01hdFRvb2x0aXBCYXNlLFxuICBfVG9vbHRpcENvbXBvbmVudEJhc2UsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQge21hdFRvb2x0aXBBbmltYXRpb25zfSBmcm9tICcuL3Rvb2x0aXAtYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogQ1NTIGNsYXNzIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgb3ZlcmxheSBwYW5lbC5cbiAqIEBkZXByZWNhdGVkXG4gKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMCByZW1vdmUgdGhpcyB2YXJpYWJsZVxuICovXG5leHBvcnQgY29uc3QgVE9PTFRJUF9QQU5FTF9DTEFTUyA9ICdtYXQtbWRjLXRvb2x0aXAtcGFuZWwnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGF0dGFjaGVzIGEgbWF0ZXJpYWwgZGVzaWduIHRvb2x0aXAgdG8gdGhlIGhvc3QgZWxlbWVudC4gQW5pbWF0ZXMgdGhlIHNob3dpbmcgYW5kXG4gKiBoaWRpbmcgb2YgYSB0b29sdGlwIHByb3ZpZGVkIHBvc2l0aW9uIChkZWZhdWx0cyB0byBiZWxvdyB0aGUgZWxlbWVudCkuXG4gKlxuICogaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vY29tcG9uZW50cy90b29sdGlwcy5odG1sXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRUb29sdGlwXScsXG4gIGV4cG9ydEFzOiAnbWF0VG9vbHRpcCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy10b29sdGlwLXRyaWdnZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUb29sdGlwIGV4dGVuZHMgX01hdFRvb2x0aXBCYXNlPFRvb2x0aXBDb21wb25lbnQ+IHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHJlYWRvbmx5IF90b29sdGlwQ29tcG9uZW50ID0gVG9vbHRpcENvbXBvbmVudDtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHJlYWRvbmx5IF9jc3NDbGFzc1ByZWZpeCA9ICdtYXQtbWRjJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgYXJpYURlc2NyaWJlcjogQXJpYURlc2NyaWJlcixcbiAgICBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBASW5qZWN0KE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3k6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0T3B0aW9uczogTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIG92ZXJsYXksXG4gICAgICBlbGVtZW50UmVmLFxuICAgICAgc2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgIHZpZXdDb250YWluZXJSZWYsXG4gICAgICBuZ1pvbmUsXG4gICAgICBwbGF0Zm9ybSxcbiAgICAgIGFyaWFEZXNjcmliZXIsXG4gICAgICBmb2N1c01vbml0b3IsXG4gICAgICBzY3JvbGxTdHJhdGVneSxcbiAgICAgIGRpcixcbiAgICAgIGRlZmF1bHRPcHRpb25zLFxuICAgICAgX2RvY3VtZW50LFxuICAgICk7XG4gICAgdGhpcy5fdmlld3BvcnRNYXJnaW4gPSBudW1iZXJzLk1JTl9WSUVXUE9SVF9UT09MVElQX1RIUkVTSE9MRDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfYWRkT2Zmc2V0KHBvc2l0aW9uOiBDb25uZWN0ZWRQb3NpdGlvbik6IENvbm5lY3RlZFBvc2l0aW9uIHtcbiAgICBjb25zdCBvZmZzZXQgPSBudW1iZXJzLlVOQk9VTkRFRF9BTkNIT1JfR0FQO1xuICAgIGNvbnN0IGlzTHRyID0gIXRoaXMuX2RpciB8fCB0aGlzLl9kaXIudmFsdWUgPT0gJ2x0cic7XG5cbiAgICBpZiAocG9zaXRpb24ub3JpZ2luWSA9PT0gJ3RvcCcpIHtcbiAgICAgIHBvc2l0aW9uLm9mZnNldFkgPSAtb2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24ub3JpZ2luWSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHBvc2l0aW9uLm9mZnNldFkgPSBvZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbi5vcmlnaW5YID09PSAnc3RhcnQnKSB7XG4gICAgICBwb3NpdGlvbi5vZmZzZXRYID0gaXNMdHIgPyAtb2Zmc2V0IDogb2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24ub3JpZ2luWCA9PT0gJ2VuZCcpIHtcbiAgICAgIHBvc2l0aW9uLm9mZnNldFggPSBpc0x0ciA/IG9mZnNldCA6IC1vZmZzZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgd3JhcHMgdGhlIHRvb2x0aXAncyBjb250ZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtdG9vbHRpcC1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJ3Rvb2x0aXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0b29sdGlwLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW21hdFRvb2x0aXBBbmltYXRpb25zLnRvb2x0aXBTdGF0ZV0sXG4gIGhvc3Q6IHtcbiAgICAvLyBGb3JjZXMgdGhlIGVsZW1lbnQgdG8gaGF2ZSBhIGxheW91dCBpbiBJRSBhbmQgRWRnZS4gVGhpcyBmaXhlcyBpc3N1ZXMgd2hlcmUgdGhlIGVsZW1lbnRcbiAgICAvLyB3b24ndCBiZSByZW5kZXJlZCBpZiB0aGUgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQgb3IgdGhlcmUgaXMgbm8gd2ViIGFuaW1hdGlvbnMgcG9seWZpbGwuXG4gICAgJ1tzdHlsZS56b29tXSc6ICdfdmlzaWJpbGl0eSA9PT0gXCJ2aXNpYmxlXCIgPyAxIDogbnVsbCcsXG4gICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwQ29tcG9uZW50IGV4dGVuZHMgX1Rvb2x0aXBDb21wb25lbnRCYXNlIHtcbiAgLyogV2hldGhlciB0aGUgdG9vbHRpcCB0ZXh0IG92ZXJmbG93cyB0byBtdWx0aXBsZSBsaW5lcyAqL1xuICBfaXNNdWx0aWxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjaGFuZ2VEZXRlY3RvclJlZik7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX29uU2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLl9pc011bHRpbGluZSA9IHRoaXMuX2lzVG9vbHRpcE11bHRpbGluZSgpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRvb2x0aXAgdGV4dCBoYXMgb3ZlcmZsb3duIHRvIHRoZSBuZXh0IGxpbmUgKi9cbiAgcHJpdmF0ZSBfaXNUb29sdGlwTXVsdGlsaW5lKCkge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHJlY3QuaGVpZ2h0ID4gbnVtYmVycy5NSU5fSEVJR0hUICYmIHJlY3Qud2lkdGggPj0gbnVtYmVycy5NQVhfV0lEVEg7XG4gIH1cbn1cbiIsIjxkaXZcbiAgY2xhc3M9XCJtZGMtdG9vbHRpcCBtZGMtdG9vbHRpcC0tc2hvd24gbWF0LW1kYy10b29sdGlwXCJcbiAgW25nQ2xhc3NdPVwidG9vbHRpcENsYXNzXCJcbiAgW2NsYXNzLm1kYy10b29sdGlwLS1tdWx0aWxpbmVdPVwiX2lzTXVsdGlsaW5lXCJcbiAgW0BzdGF0ZV09XCJfdmlzaWJpbGl0eVwiXG4gIChAc3RhdGUuc3RhcnQpPVwiX2FuaW1hdGlvblN0YXJ0KClcIlxuICAoQHN0YXRlLmRvbmUpPVwiX2FuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuICA8ZGl2IGNsYXNzPVwibWRjLXRvb2x0aXBfX3N1cmZhY2UgbWRjLXRvb2x0aXBfX3N1cmZhY2UtYW5pbWF0aW9uXCI+e3ttZXNzYWdlfX08L2Rpdj5cbjwvZGl2PlxuIl19