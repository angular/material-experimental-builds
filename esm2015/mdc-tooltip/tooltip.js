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
MatTooltip.decorators = [
    { type: Directive, args: [{
                selector: '[matTooltip]',
                exportAs: 'matTooltip',
                host: {
                    'class': 'mat-mdc-tooltip-trigger'
                }
            },] }
];
MatTooltip.ctorParameters = () => [
    { type: Overlay },
    { type: ElementRef },
    { type: ScrollDispatcher },
    { type: ViewContainerRef },
    { type: NgZone },
    { type: Platform },
    { type: AriaDescriber },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_TOOLTIP_SCROLL_STRATEGY,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_TOOLTIP_DEFAULT_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
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
TooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-tooltip-component',
                template: "<div\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\"\n  [@state]=\"_visibility\"\n  (@state.start)=\"_animationStart()\"\n  (@state.done)=\"_animationDone($event)\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [matTooltipAnimations.tooltipState],
                host: {
                    // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                    // won't be rendered if the animations are disabled or there is no web animations polyfill.
                    '[style.zoom]': '_visibility === "visible" ? 1 : null',
                    'aria-hidden': 'true',
                },
                styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:9}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:normal;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:28px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{display:block;margin-top:0;line-height:normal;max-width:calc(100% - 2 * 8px);margin:0 8px 16px 8px;text-align:left}.mdc-tooltip__surface .mdc-tooltip__content::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid transparent;z-index:-1}.mat-mdc-tooltip{position:static;pointer-events:none !important}\n"]
            },] }
];
TooltipComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRvb2x0aXAvdG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBRUwsMkJBQTJCLEVBQzNCLDJCQUEyQixFQUMzQixlQUFlLEVBQ2YscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTFEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyx1QkFBdUIsQ0FBQztBQUUzRDs7Ozs7R0FLRztBQVFILE1BQU0sT0FBTyxVQUFXLFNBQVEsZUFBaUM7SUFJL0QsWUFDRSxPQUFnQixFQUNoQixVQUFtQyxFQUNuQyxnQkFBa0MsRUFDbEMsZ0JBQWtDLEVBQ2xDLE1BQWMsRUFDZCxRQUFrQixF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Q3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUM7Z0JBQy9DLElBQUksRUFBRTtvQkFDSiwwRkFBMEY7b0JBQzFGLDJGQUEyRjtvQkFDM0YsY0FBYyxFQUFFLHNDQUFzQztvQkFDdEQsYUFBYSxFQUFFLE1BQU07aUJBQ3RCOzthQUNGOzs7WUF2R0MsaUJBQWlCO1lBR2pCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7QXJpYURlc2NyaWJlciwgRm9jdXNNb25pdG9yfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Nvbm5lY3RlZFBvc2l0aW9uLCBPdmVybGF5LCBTY3JvbGxEaXNwYXRjaGVyfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsXG4gIE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OUyxcbiAgTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICBfTWF0VG9vbHRpcEJhc2UsXG4gIF9Ub29sdGlwQ29tcG9uZW50QmFzZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7bWF0VG9vbHRpcEFuaW1hdGlvbnN9IGZyb20gJy4vdG9vbHRpcC1hbmltYXRpb25zJztcblxuLyoqXG4gKiBDU1MgY2xhc3MgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBvdmVybGF5IHBhbmVsLlxuICogQGRlcHJlY2F0ZWRcbiAqIEBicmVha2luZy1jaGFuZ2UgMTMuMC4wIHJlbW92ZSB0aGlzIHZhcmlhYmxlXG4gKi9cbmV4cG9ydCBjb25zdCBUT09MVElQX1BBTkVMX0NMQVNTID0gJ21hdC1tZGMtdG9vbHRpcC1wYW5lbCc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYXR0YWNoZXMgYSBtYXRlcmlhbCBkZXNpZ24gdG9vbHRpcCB0byB0aGUgaG9zdCBlbGVtZW50LiBBbmltYXRlcyB0aGUgc2hvd2luZyBhbmRcbiAqIGhpZGluZyBvZiBhIHRvb2x0aXAgcHJvdmlkZWQgcG9zaXRpb24gKGRlZmF1bHRzIHRvIGJlbG93IHRoZSBlbGVtZW50KS5cbiAqXG4gKiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3Rvb2x0aXBzLmh0bWxcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRvb2x0aXBdJyxcbiAgZXhwb3J0QXM6ICdtYXRUb29sdGlwJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXRvb2x0aXAtdHJpZ2dlcidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRUb29sdGlwIGV4dGVuZHMgX01hdFRvb2x0aXBCYXNlPFRvb2x0aXBDb21wb25lbnQ+IHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHJlYWRvbmx5IF90b29sdGlwQ29tcG9uZW50ID0gVG9vbHRpcENvbXBvbmVudDtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHJlYWRvbmx5IF9jc3NDbGFzc1ByZWZpeCA9ICdtYXQtbWRjJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgYXJpYURlc2NyaWJlcjogQXJpYURlc2NyaWJlcixcbiAgICBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBASW5qZWN0KE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3k6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0T3B0aW9uczogTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55KSB7XG5cbiAgICBzdXBlcihvdmVybGF5LCBlbGVtZW50UmVmLCBzY3JvbGxEaXNwYXRjaGVyLCB2aWV3Q29udGFpbmVyUmVmLCBuZ1pvbmUsIHBsYXRmb3JtLCBhcmlhRGVzY3JpYmVyLFxuICAgICAgZm9jdXNNb25pdG9yLCBzY3JvbGxTdHJhdGVneSwgZGlyLCBkZWZhdWx0T3B0aW9ucywgX2RvY3VtZW50KTtcbiAgICB0aGlzLl92aWV3cG9ydE1hcmdpbiA9IG51bWJlcnMuTUlOX1ZJRVdQT1JUX1RPT0xUSVBfVEhSRVNIT0xEO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9hZGRPZmZzZXQocG9zaXRpb246IENvbm5lY3RlZFBvc2l0aW9uKTogQ29ubmVjdGVkUG9zaXRpb24ge1xuICAgIGNvbnN0IG9mZnNldCA9IG51bWJlcnMuVU5CT1VOREVEX0FOQ0hPUl9HQVA7XG4gICAgY29uc3QgaXNMdHIgPSAhdGhpcy5fZGlyIHx8IHRoaXMuX2Rpci52YWx1ZSA9PSAnbHRyJztcblxuICAgIGlmIChwb3NpdGlvbi5vcmlnaW5ZID09PSAndG9wJykge1xuICAgICAgcG9zaXRpb24ub2Zmc2V0WSA9IC1vZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbi5vcmlnaW5ZID09PSAnYm90dG9tJykge1xuICAgICAgcG9zaXRpb24ub2Zmc2V0WSA9IG9mZnNldDtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uLm9yaWdpblggPT09ICdzdGFydCcpIHtcbiAgICAgIHBvc2l0aW9uLm9mZnNldFggPSBpc0x0ciA/IC1vZmZzZXQgOiBvZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbi5vcmlnaW5YID09PSAnZW5kJykge1xuICAgICAgcG9zaXRpb24ub2Zmc2V0WCA9IGlzTHRyID8gb2Zmc2V0IDogLW9mZnNldDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCB3cmFwcyB0aGUgdG9vbHRpcCdzIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10b29sdGlwLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAndG9vbHRpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Rvb2x0aXAuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbbWF0VG9vbHRpcEFuaW1hdGlvbnMudG9vbHRpcFN0YXRlXSxcbiAgaG9zdDoge1xuICAgIC8vIEZvcmNlcyB0aGUgZWxlbWVudCB0byBoYXZlIGEgbGF5b3V0IGluIElFIGFuZCBFZGdlLiBUaGlzIGZpeGVzIGlzc3VlcyB3aGVyZSB0aGUgZWxlbWVudFxuICAgIC8vIHdvbid0IGJlIHJlbmRlcmVkIGlmIHRoZSBhbmltYXRpb25zIGFyZSBkaXNhYmxlZCBvciB0aGVyZSBpcyBubyB3ZWIgYW5pbWF0aW9ucyBwb2x5ZmlsbC5cbiAgICAnW3N0eWxlLnpvb21dJzogJ192aXNpYmlsaXR5ID09PSBcInZpc2libGVcIiA/IDEgOiBudWxsJyxcbiAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbXBvbmVudCBleHRlbmRzIF9Ub29sdGlwQ29tcG9uZW50QmFzZSB7XG4gIC8qIFdoZXRoZXIgdGhlIHRvb2x0aXAgdGV4dCBvdmVyZmxvd3MgdG8gbXVsdGlwbGUgbGluZXMgKi9cbiAgX2lzTXVsdGlsaW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9vblNob3coKTogdm9pZCB7XG4gICAgdGhpcy5faXNNdWx0aWxpbmUgPSB0aGlzLl9pc1Rvb2x0aXBNdWx0aWxpbmUoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0b29sdGlwIHRleHQgaGFzIG92ZXJmbG93biB0byB0aGUgbmV4dCBsaW5lICovXG4gIHByaXZhdGUgX2lzVG9vbHRpcE11bHRpbGluZSgpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiByZWN0LmhlaWdodCA+IG51bWJlcnMuTUlOX0hFSUdIVCAmJiByZWN0LndpZHRoID49IG51bWJlcnMuTUFYX1dJRFRIO1xuICB9XG59XG4iXX0=