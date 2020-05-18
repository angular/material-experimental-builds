/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-tabs/tab-nav-bar/tab-nav-bar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, forwardRef, QueryList, ViewChild, ViewEncapsulation, Optional, Inject, Attribute, NgZone, ChangeDetectorRef, Input, } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { _MatTabNavBase, _MatTabLinkBase, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { MatInkBar, MatInkBarFoundation } from '../ink-bar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
let MatTabNav = /** @class */ (() => {
    /**
     * Navigation component matching the styles of the tab group header.
     * Provides anchored navigation with animated ink bar.
     */
    class MatTabNav extends _MatTabNavBase {
        /**
         * @param {?} elementRef
         * @param {?} dir
         * @param {?} ngZone
         * @param {?} changeDetectorRef
         * @param {?} viewportRuler
         * @param {?=} platform
         * @param {?=} animationMode
         * @param {?=} defaultConfig
         */
        constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, 
        /**
         * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
         */
        platform, animationMode, defaultConfig) {
            super(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode);
            this._fitInkBarToContent = new BehaviorSubject(false);
            this.disablePagination = defaultConfig && defaultConfig.disablePagination != null ?
                defaultConfig.disablePagination : false;
            this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ?
                defaultConfig.fitInkBarToContent : false;
        }
        /**
         * Whether the ink bar should fit its width to the size of the tab label content.
         * @return {?}
         */
        get fitInkBarToContent() { return this._fitInkBarToContent.value; }
        /**
         * @param {?} v
         * @return {?}
         */
        set fitInkBarToContent(v) {
            this._fitInkBarToContent.next(coerceBooleanProperty(v));
            this._changeDetectorRef.markForCheck();
        }
        /**
         * @return {?}
         */
        ngAfterContentInit() {
            this._inkBar = new MatInkBar(this._items);
            super.ngAfterContentInit();
        }
    }
    MatTabNav.decorators = [
        { type: Component, args: [{
                    selector: '[mat-tab-nav-bar]',
                    exportAs: 'matTabNavBar, matTabNav',
                    inputs: ['color'],
                    template: "<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n\n<div class=\"mat-mdc-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\">\n  <div class=\"mat-mdc-tab-list\" #tabList (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-mdc-tab-links\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n\n<!-- TODO: this also had `mat-elevation-z4`. Figure out what we should do with it. -->\n<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-mdc-tab-header-pagination-chevron\"></div>\n</div>\n",
                    host: {
                        'class': 'mat-mdc-tab-nav-bar mat-mdc-tab-header',
                        '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                        '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                        '[class.mat-primary]': 'color !== "warn" && color !== "accent"',
                        '[class.mat-accent]': 'color === "accent"',
                        '[class.mat-warn]': 'color === "warn"',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-mdc-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;opacity:.4;pointer-events:none}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable .mdc-tab-indicator__content{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}\n"]
                }] }
    ];
    /** @nocollapse */
    MatTabNav.ctorParameters = () => [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ViewportRuler },
        { type: Platform, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_TABS_CONFIG,] }] }
    ];
    MatTabNav.propDecorators = {
        fitInkBarToContent: [{ type: Input }],
        _items: [{ type: ContentChildren, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => MatTabLink)), { descendants: true },] }],
        _tabListContainer: [{ type: ViewChild, args: ['tabListContainer', { static: true },] }],
        _tabList: [{ type: ViewChild, args: ['tabList', { static: true },] }],
        _nextPaginator: [{ type: ViewChild, args: ['nextPaginator',] }],
        _previousPaginator: [{ type: ViewChild, args: ['previousPaginator',] }]
    };
    return MatTabNav;
})();
export { MatTabNav };
if (false) {
    /** @type {?} */
    MatTabNav.ngAcceptInputType_fitInkBarToContent;
    /** @type {?} */
    MatTabNav.ngAcceptInputType_disableRipple;
    /** @type {?} */
    MatTabNav.prototype._fitInkBarToContent;
    /** @type {?} */
    MatTabNav.prototype._items;
    /** @type {?} */
    MatTabNav.prototype._tabListContainer;
    /** @type {?} */
    MatTabNav.prototype._tabList;
    /** @type {?} */
    MatTabNav.prototype._nextPaginator;
    /** @type {?} */
    MatTabNav.prototype._previousPaginator;
    /** @type {?} */
    MatTabNav.prototype._inkBar;
}
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
let MatTabLink = /** @class */ (() => {
    /**
     * Link inside of a `mat-tab-nav-bar`.
     */
    class MatTabLink extends _MatTabLinkBase {
        /**
         * @param {?} tabNavBar
         * @param {?} elementRef
         * @param {?} globalRippleOptions
         * @param {?} tabIndex
         * @param {?} focusMonitor
         * @param {?} _document
         * @param {?=} animationMode
         */
        constructor(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, _document, animationMode) {
            super(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode);
            this._document = _document;
            this._foundation = new MatInkBarFoundation(this.elementRef.nativeElement, this._document);
            this._destroyed = new Subject();
            tabNavBar._fitInkBarToContent.pipe(takeUntil(this._destroyed)).subscribe((/**
             * @param {?} fitInkBarToContent
             * @return {?}
             */
            fitInkBarToContent => {
                this._foundation.setFitToContent(fitInkBarToContent);
            }));
        }
        /**
         * @return {?}
         */
        ngOnInit() {
            this._foundation.init();
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this._destroyed.next();
            this._destroyed.complete();
            super.ngOnDestroy();
            this._foundation.destroy();
        }
    }
    MatTabLink.decorators = [
        { type: Component, args: [{
                    selector: '[mat-tab-link], [matTabLink]',
                    exportAs: 'matTabLink',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "<span class=\"mdc-tab__ripple\"></span>\n\n<div\n  class=\"mat-mdc-tab-ripple\"\n  mat-ripple\n  [matRippleTrigger]=\"elementRef.nativeElement\"\n  [matRippleDisabled]=\"rippleDisabled\"></div>\n\n<span class=\"mdc-tab__content\">\n  <span class=\"mdc-tab__text-label\">\n    <ng-content></ng-content>\n  </span>\n</span>\n\n",
                    host: {
                        'class': 'mdc-tab mat-mdc-tab-link mat-mdc-focus-indicator',
                        '[attr.aria-current]': 'active ? "page" : null',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.tabIndex]': 'tabIndex',
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[class.mdc-tab--active]': 'active',
                    },
                    styles: [".mdc-tab{padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-link.mdc-tab{height:48px;flex-grow:0;min-width:160px}.mat-mdc-tab-link .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12}.mat-mdc-tab-link.mat-mdc-tab-disabled{pointer-events:none;opacity:.4}.mat-mdc-tab-header[mat-stretch-tabs] .mat-mdc-tab-link{flex-grow:1}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}\n"]
                }] }
    ];
    /** @nocollapse */
    MatTabLink.ctorParameters = () => [
        { type: MatTabNav },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: FocusMonitor },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    return MatTabLink;
})();
export { MatTabLink };
if (false) {
    /** @type {?} */
    MatTabLink.prototype._foundation;
    /**
     * @type {?}
     * @private
     */
    MatTabLink.prototype._destroyed;
    /**
     * @type {?}
     * @private
     */
    MatTabLink.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1uYXYtYmFyL3RhYi1uYXYtYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUdULE1BQU0sRUFDTixpQkFBaUIsRUFBVSxLQUFLLEdBQ2pDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyx5QkFBeUIsRUFBc0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUNMLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZUFBZSxFQUVoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsU0FBUyxFQUFpQixtQkFBbUIsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN6RSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMs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QUM7UUFDN0IsQ0FBQzs7O2dCQTdDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDO29CQUNqRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGlWQUE0QjtvQkFFNUIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxrREFBa0Q7d0JBQzNELHFCQUFxQixFQUFFLHdCQUF3Qjt3QkFDL0Msc0JBQXNCLEVBQUUsVUFBVTt3QkFDbEMsaUJBQWlCLEVBQUUsVUFBVTt3QkFDN0IsOEJBQThCLEVBQUUsVUFBVTt3QkFDMUMseUJBQXlCLEVBQUUsUUFBUTtxQkFDcEM7O2lCQUNGOzs7O2dCQU9jLFNBQVM7Z0JBNUh0QixVQUFVO2dEQThIUCxRQUFRLFlBQUksTUFBTSxTQUFDLHlCQUF5Qjs2Q0FDNUMsU0FBUyxTQUFDLFVBQVU7Z0JBaEhqQixZQUFZO2dEQWlIZixNQUFNLFNBQUMsUUFBUTs2Q0FDZixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7SUFrQjdDLGlCQUFDO0tBQUE7U0E3QlksVUFBVTs7O0lBQ3JCLGlDQUFxRjs7Ozs7SUFFckYsZ0NBQWtEOzs7OztJQU9oRCwrQkFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxuICBBdHRyaWJ1dGUsXG4gIE9uRGVzdHJveSxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgTmdab25lLFxuICBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0LCBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7TUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUywgUmlwcGxlR2xvYmFsT3B0aW9uc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgX01hdFRhYk5hdkJhc2UsXG4gIF9NYXRUYWJMaW5rQmFzZSxcbiAgTUFUX1RBQlNfQ09ORklHLFxuICBNYXRUYWJzQ29uZmlnXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Vmlld3BvcnRSdWxlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtNYXRJbmtCYXIsIE1hdElua0Jhckl0ZW0sIE1hdElua0JhckZvdW5kYXRpb259IGZyb20gJy4uL2luay1iYXInO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqXG4gKiBOYXZpZ2F0aW9uIGNvbXBvbmVudCBtYXRjaGluZyB0aGUgc3R5bGVzIG9mIHRoZSB0YWIgZ3JvdXAgaGVhZGVyLlxuICogUHJvdmlkZXMgYW5jaG9yZWQgbmF2aWdhdGlvbiB3aXRoIGFuaW1hdGVkIGluayBiYXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1ttYXQtdGFiLW5hdi1iYXJdJyxcbiAgZXhwb3J0QXM6ICdtYXRUYWJOYXZCYXIsIG1hdFRhYk5hdicsXG4gIGlucHV0czogWydjb2xvciddLFxuICB0ZW1wbGF0ZVVybDogJ3RhYi1uYXYtYmFyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFiLW5hdi1iYXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy10YWItbmF2LWJhciBtYXQtbWRjLXRhYi1oZWFkZXInLFxuICAgICdbY2xhc3MubWF0LW1kYy10YWItaGVhZGVyLXBhZ2luYXRpb24tY29udHJvbHMtZW5hYmxlZF0nOiAnX3Nob3dQYWdpbmF0aW9uQ29udHJvbHMnLFxuICAgICdbY2xhc3MubWF0LW1kYy10YWItaGVhZGVyLXJ0bF0nOiBcIl9nZXRMYXlvdXREaXJlY3Rpb24oKSA9PSAncnRsJ1wiLFxuICAgICdbY2xhc3MubWF0LXByaW1hcnldJzogJ2NvbG9yICE9PSBcIndhcm5cIiAmJiBjb2xvciAhPT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PT0gXCJhY2NlbnRcIicsXG4gICAgJ1tjbGFzcy5tYXQtd2Fybl0nOiAnY29sb3IgPT09IFwid2FyblwiJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXScgOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJOYXYgZXh0ZW5kcyBfTWF0VGFiTmF2QmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKiogV2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgZml0IGl0cyB3aWR0aCB0byB0aGUgc2l6ZSBvZiB0aGUgdGFiIGxhYmVsIGNvbnRlbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXRJbmtCYXJUb0NvbnRlbnQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9maXRJbmtCYXJUb0NvbnRlbnQudmFsdWU7IH1cbiAgc2V0IGZpdElua0JhclRvQ29udGVudCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZml0SW5rQmFyVG9Db250ZW50Lm5leHQoY29lcmNlQm9vbGVhblByb3BlcnR5KHYpKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBfZml0SW5rQmFyVG9Db250ZW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE1hdFRhYkxpbmspLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfaXRlbXM6IFF1ZXJ5TGlzdDxNYXRUYWJMaW5rPjtcbiAgQFZpZXdDaGlsZCgndGFiTGlzdENvbnRhaW5lcicsIHtzdGF0aWM6IHRydWV9KSBfdGFiTGlzdENvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndGFiTGlzdCcsIHtzdGF0aWM6IHRydWV9KSBfdGFiTGlzdDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbmV4dFBhZ2luYXRvcicpIF9uZXh0UGFnaW5hdG9yOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgncHJldmlvdXNQYWdpbmF0b3InKSBfcHJldmlvdXNQYWdpbmF0b3I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfaW5rQmFyOiBNYXRJbmtCYXI7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIEBkZXByZWNhdGVkIEBicmVha2luZy1jaGFuZ2UgOS4wLjAgYHBsYXRmb3JtYCBwYXJhbWV0ZXIgdG8gYmVjb21lIHJlcXVpcmVkLlxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcGxhdGZvcm0/OiBQbGF0Zm9ybSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1RBQlNfQ09ORklHKSBkZWZhdWx0Q29uZmlnPzogTWF0VGFic0NvbmZpZykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGRpciwgbmdab25lLCBjaGFuZ2VEZXRlY3RvclJlZiwgdmlld3BvcnRSdWxlciwgcGxhdGZvcm0sIGFuaW1hdGlvbk1vZGUpO1xuICAgIHRoaXMuZGlzYWJsZVBhZ2luYXRpb24gPSBkZWZhdWx0Q29uZmlnICYmIGRlZmF1bHRDb25maWcuZGlzYWJsZVBhZ2luYXRpb24gIT0gbnVsbCA/XG4gICAgICAgIGRlZmF1bHRDb25maWcuZGlzYWJsZVBhZ2luYXRpb24gOiBmYWxzZTtcbiAgICB0aGlzLmZpdElua0JhclRvQ29udGVudCA9IGRlZmF1bHRDb25maWcgJiYgZGVmYXVsdENvbmZpZy5maXRJbmtCYXJUb0NvbnRlbnQgIT0gbnVsbCA/XG4gICAgICAgIGRlZmF1bHRDb25maWcuZml0SW5rQmFyVG9Db250ZW50IDogZmFsc2U7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5faW5rQmFyID0gbmV3IE1hdElua0Jhcih0aGlzLl9pdGVtcyk7XG4gICAgc3VwZXIubmdBZnRlckNvbnRlbnRJbml0KCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZml0SW5rQmFyVG9Db250ZW50OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKlxuICogTGluayBpbnNpZGUgb2YgYSBgbWF0LXRhYi1uYXYtYmFyYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW21hdC10YWItbGlua10sIFttYXRUYWJMaW5rXScsXG4gIGV4cG9ydEFzOiAnbWF0VGFiTGluaycsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ3RhYkluZGV4J10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZVVybDogJ3RhYi1saW5rLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFiLWxpbmsuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLXRhYiBtYXQtbWRjLXRhYi1saW5rIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAnW2F0dHIuYXJpYS1jdXJyZW50XSc6ICdhY3RpdmUgPyBcInBhZ2VcIiA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLnRhYkluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXRhYi1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWRjLXRhYi0tYWN0aXZlXSc6ICdhY3RpdmUnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYkxpbmsgZXh0ZW5kcyBfTWF0VGFiTGlua0Jhc2UgaW1wbGVtZW50cyBNYXRJbmtCYXJJdGVtLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIF9mb3VuZGF0aW9uID0gbmV3IE1hdElua0JhckZvdW5kYXRpb24odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2RvY3VtZW50KTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRhYk5hdkJhcjogTWF0VGFiTmF2LFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKSBnbG9iYWxSaXBwbGVPcHRpb25zOiBSaXBwbGVHbG9iYWxPcHRpb25zfG51bGwsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLCBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIodGFiTmF2QmFyLCBlbGVtZW50UmVmLCBnbG9iYWxSaXBwbGVPcHRpb25zLCB0YWJJbmRleCwgZm9jdXNNb25pdG9yLCBhbmltYXRpb25Nb2RlKTtcblxuICAgIHRhYk5hdkJhci5fZml0SW5rQmFyVG9Db250ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZShmaXRJbmtCYXJUb0NvbnRlbnQgPT4ge1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5zZXRGaXRUb0NvbnRlbnQoZml0SW5rQmFyVG9Db250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG59XG4iXX0=