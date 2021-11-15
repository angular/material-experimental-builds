import * as i0 from '@angular/core';
import { Directive, Inject, Optional, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i5 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { _MatTooltipBase, MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_DEFAULT_OPTIONS, _TooltipComponentBase, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
export { MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY, MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, SCROLL_THROTTLE_MS, getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
import { numbers } from '@material/tooltip';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i2 from '@angular/cdk/platform';
import * as i3 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import * as i4 from '@angular/cdk/bidi';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatCommonModule } from '@angular/material-experimental/mdc-core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Animations used by MatTooltip.
 * @docs-private
 */
const matTooltipAnimations = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: trigger('state', [
        // TODO(crisbeto): these values are based on MDC's CSS.
        // We should be able to use their styles directly once we land #19432.
        state('initial, void, hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
        state('visible', style({ transform: 'scale(1)' })),
        transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
        transition('* => hidden', animate('75ms cubic-bezier(0.4, 0, 1, 1)')),
    ]),
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * CSS class that will be attached to the overlay panel.
 * @deprecated
 * @breaking-change 13.0.0 remove this variable
 */
const TOOLTIP_PANEL_CLASS = 'mat-mdc-tooltip-panel';
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
class MatTooltip extends _MatTooltipBase {
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
MatTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatTooltip, deps: [{ token: i1.Overlay }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.AriaDescriber }, { token: i3.FocusMonitor }, { token: MAT_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: MAT_TOOLTIP_DEFAULT_OPTIONS, optional: true }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.1", type: MatTooltip, selector: "[matTooltip]", host: { classAttribute: "mat-mdc-tooltip-trigger" }, exportAs: ["matTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatTooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTooltip]',
                    exportAs: 'matTooltip',
                    host: {
                        'class': 'mat-mdc-tooltip-trigger',
                    },
                }]
        }], ctorParameters: function () {
        return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.AriaDescriber }, { type: i3.FocusMonitor }, { type: undefined, decorators: [{
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
                    }] }];
    } });
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
class TooltipComponent extends _TooltipComponentBase {
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
TooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: TooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.1", type: TooltipComponent, selector: "mat-tooltip-component", host: { attributes: { "aria-hidden": "true" }, properties: { "style.zoom": "_visibility === \"visible\" ? 1 : null" } }, usesInheritance: true, ngImport: i0, template: "<div\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\"\n  [@state]=\"_visibility\"\n  (@state.start)=\"_animationStart()\"\n  (@state.done)=\"_animationDone($event)\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:9}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:20px;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(100% - 2 * 8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid transparent;z-index:-1}.mat-mdc-tooltip{position:static;pointer-events:none !important}\n"], directives: [{ type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [matTooltipAnimations.tooltipState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tooltip-component', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [matTooltipAnimations.tooltipState], host: {
                        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                        // won't be rendered if the animations are disabled or there is no web animations polyfill.
                        '[style.zoom]': '_visibility === "visible" ? 1 : null',
                        'aria-hidden': 'true',
                    }, template: "<div\n  class=\"mdc-tooltip mdc-tooltip--shown mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\"\n  [@state]=\"_visibility\"\n  (@state.start)=\"_animationStart()\"\n  (@state.done)=\"_animationDone($event)\">\n  <div class=\"mdc-tooltip__surface mdc-tooltip__surface-animation\">{{message}}</div>\n</div>\n", styles: [".mdc-tooltip__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-tooltip__surface{word-break:break-all;word-break:var(--mdc-tooltip-word-break, normal);overflow-wrap:anywhere}.mdc-tooltip{z-index:9}.mdc-tooltip{position:fixed;display:none}.mdc-tooltip-wrapper--rich{position:relative}.mdc-tooltip--shown,.mdc-tooltip--showing,.mdc-tooltip--hide{display:inline-flex}.mdc-tooltip--shown.mdc-tooltip--rich,.mdc-tooltip--showing.mdc-tooltip--rich,.mdc-tooltip--hide.mdc-tooltip--rich{display:inline-block;left:-320px;position:absolute}.mdc-tooltip__surface{line-height:16px;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center}.mdc-tooltip__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}.mdc-tooltip--rich .mdc-tooltip__surface{align-items:flex-start;border-radius:4px;display:flex;flex-direction:column;line-height:20px;min-height:24px;min-width:40px;max-width:320px;position:relative}.mdc-tooltip--rich .mdc-tooltip__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip--multiline .mdc-tooltip__surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mdc-tooltip__surface,.mdc-tooltip--multiline .mdc-tooltip__surface[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__title{display:block;margin-top:0;line-height:20px;margin:0 8px}.mdc-tooltip__surface .mdc-tooltip__title::before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-tooltip__surface .mdc-tooltip__content{max-width:calc(100% - 2 * 8px);margin:8px;text-align:left}[dir=rtl] .mdc-tooltip__surface .mdc-tooltip__content,.mdc-tooltip__surface .mdc-tooltip__content[dir=rtl]{text-align:right}.mdc-tooltip__surface .mdc-tooltip__content-link{text-decoration:none}.mdc-tooltip--rich-actions{z-index:1}.mdc-tooltip__surface-animation{opacity:0;transform:scale(0.8);will-change:transform,opacity}.mdc-tooltip--shown .mdc-tooltip__surface-animation{transform:scale(1);opacity:1}.mdc-tooltip--hide .mdc-tooltip__surface-animation{transform:scale(1)}.mdc-tooltip__caret-surface-top,.mdc-tooltip__caret-surface-bottom{position:absolute;height:24px;width:24px;transform:rotate(35deg) skewY(20deg) scaleX(0.9396926208)}.mdc-tooltip__caret-surface-top .mdc-elevation-overlay,.mdc-tooltip__caret-surface-bottom .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-tooltip__caret-surface-bottom{outline:1px solid transparent;z-index:-1}.mat-mdc-tooltip{position:static;pointer-events:none !important}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatTooltipModule {
}
MatTooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatTooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatTooltipModule, declarations: [MatTooltip, TooltipComponent], imports: [A11yModule, CommonModule, OverlayModule, MatCommonModule], exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule] });
MatTooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatTooltipModule, providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[A11yModule, CommonModule, OverlayModule, MatCommonModule], MatCommonModule, CdkScrollableModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.1", ngImport: i0, type: MatTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [A11yModule, CommonModule, OverlayModule, MatCommonModule],
                    exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule],
                    declarations: [MatTooltip, TooltipComponent],
                    providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatTooltip, MatTooltipModule, TOOLTIP_PANEL_CLASS, TooltipComponent, matTooltipAnimations };
//# sourceMappingURL=mdc-tooltip.mjs.map
