/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Inject, Input, Optional, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { _MatTabGroupBase, MAT_TAB_GROUP, MAT_TABS_CONFIG, } from '@angular/material/tabs';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatTab } from './tab';
import { MatTabHeader } from './tab-header';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "./tab-header";
import * as i2 from "./tab-body";
import * as i3 from "@angular/common";
import * as i4 from "./tab-label-wrapper";
import * as i5 from "@angular/cdk/a11y";
import * as i6 from "@angular/material-experimental/mdc-core";
import * as i7 from "@angular/cdk/portal";
/**
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
export class MatTabGroup extends _MatTabGroupBase {
    constructor(elementRef, changeDetectorRef, defaultConfig, animationMode) {
        super(elementRef, changeDetectorRef, defaultConfig, animationMode);
        this._fitInkBarToContent = false;
        this.fitInkBarToContent =
            defaultConfig && defaultConfig.fitInkBarToContent != null
                ? defaultConfig.fitInkBarToContent
                : false;
    }
    /** Whether the ink bar should fit its width to the size of the tab label content. */
    get fitInkBarToContent() {
        return this._fitInkBarToContent;
    }
    set fitInkBarToContent(v) {
        this._fitInkBarToContent = coerceBooleanProperty(v);
        this._changeDetectorRef.markForCheck();
    }
}
MatTabGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatTabGroup, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: MAT_TABS_CONFIG, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatTabGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: MatTabGroup, selector: "mat-tab-group", inputs: { color: "color", disableRipple: "disableRipple", fitInkBarToContent: "fitInkBarToContent" }, host: { properties: { "class.mat-mdc-tab-group-dynamic-height": "dynamicHeight", "class.mat-mdc-tab-group-inverted-header": "headerPosition === \"below\"" }, classAttribute: "mat-mdc-tab-group" }, providers: [
        {
            provide: MAT_TAB_GROUP,
            useExisting: MatTabGroup,
        },
    ], queries: [{ propertyName: "_allTabs", predicate: MatTab, descendants: true }], viewQueries: [{ propertyName: "_tabBodyWrapper", first: true, predicate: ["tabBodyWrapper"], descendants: true }, { propertyName: "_tabHeader", first: true, predicate: ["tabHeader"], descendants: true }], exportAs: ["matTabGroup"], usesInheritance: true, ngImport: i0, template: "<mat-tab-header #tabHeader\n                [selectedIndex]=\"selectedIndex || 0\"\n                [disableRipple]=\"disableRipple\"\n                (indexFocused)=\"_focusChanged($event)\"\n                (selectFocusedIndex)=\"selectedIndex = $event\">\n\n  <div class=\"mdc-tab mat-mdc-tab mat-mdc-focus-indicator\"\n       #tabNode\n       role=\"tab\"\n       matTabLabelWrapper\n       cdkMonitorElementFocus\n       *ngFor=\"let tab of _tabs; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(tab, i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_tabs.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex == i\"\n       [attr.aria-label]=\"tab.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n       [class.mdc-tab--active]=\"selectedIndex == i\"\n       [disabled]=\"tab.disabled\"\n       [fitInkBarToContent]=\"fitInkBarToContent\"\n       (click)=\"_handleClick(tab, tabHeader, i)\"\n       (cdkFocusChange)=\"_tabFocusChanged($event, i)\">\n    <span class=\"mdc-tab__ripple\"></span>\n\n    <!-- Needs to be a separate element, because we can't put\n         `overflow: hidden` on tab due to the ink bar. -->\n    <div\n      class=\"mat-mdc-tab-ripple\"\n      mat-ripple\n      [matRippleTrigger]=\"tabNode\"\n      [matRippleDisabled]=\"tab.disabled || disableRipple\"></div>\n\n    <span class=\"mdc-tab__content\">\n      <span class=\"mdc-tab__text-label\">\n        <!-- If there is a label template, use it. -->\n        <ng-template [ngIf]=\"tab.templateLabel\">\n          <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n        </ng-template>\n\n        <!-- If there is not a label template, fall back to the text label. -->\n        <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template>\n      </span>\n    </span>\n  </div>\n</mat-tab-header>\n\n<div\n  class=\"mat-mdc-tab-body-wrapper\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n  #tabBodyWrapper>\n  <mat-tab-body role=\"tabpanel\"\n               *ngFor=\"let tab of _tabs; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.tabindex]=\"(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.mat-mdc-tab-body-active]=\"selectedIndex === i\"\n               [content]=\"tab.content!\"\n               [position]=\"tab.position!\"\n               [origin]=\"tab.origin\"\n               [animationDuration]=\"animationDuration\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </mat-tab-body>\n</div>\n", styles: [".mdc-tab{position:relative}.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:8px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + -12px\n    );width:calc(\n      100% + -8px\n    );margin-top:-2px;z-index:2}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring{border-color:CanvasText}}.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:10px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring::after{border-color:CanvasText}}.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:8px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + -8px\n    );width:calc(\n      100% + -8px\n    );z-index:2}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring{border-color:CanvasText}}.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:10px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring::after{border-color:CanvasText}}.mdc-tab__content{position:relative}.mdc-tab__icon{width:24px;height:24px;font-size:24px}.mdc-tab{background:none}.mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab.mdc-tab{height:48px;flex-grow:0}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.cdk-high-contrast-active .mat-mdc-tab.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-tab.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.cdk-high-contrast-active :host .mat-mdc-tab.cdk-program-focused,.cdk-high-contrast-active :host .mat-mdc-tab.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.mat-mdc-tab .mat-ripple-element{opacity:.12}.mat-mdc-tab-group[mat-stretch-tabs]>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable.mat-mdc-tab-body-wrapper{transition:none;animation:none}\n"], components: [{ type: i1.MatTabHeader, selector: "mat-tab-header", inputs: ["selectedIndex"], outputs: ["selectFocusedIndex", "indexFocused"] }, { type: i2.MatTabBody, selector: "mat-tab-body" }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: ["disabled", "fitInkBarToContent"] }, { type: i5.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { type: i6.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatTabGroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tab-group', exportAs: 'matTabGroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['color', 'disableRipple'], providers: [
                        {
                            provide: MAT_TAB_GROUP,
                            useExisting: MatTabGroup,
                        },
                    ], host: {
                        'class': 'mat-mdc-tab-group',
                        '[class.mat-mdc-tab-group-dynamic-height]': 'dynamicHeight',
                        '[class.mat-mdc-tab-group-inverted-header]': 'headerPosition === "below"',
                    }, template: "<mat-tab-header #tabHeader\n                [selectedIndex]=\"selectedIndex || 0\"\n                [disableRipple]=\"disableRipple\"\n                (indexFocused)=\"_focusChanged($event)\"\n                (selectFocusedIndex)=\"selectedIndex = $event\">\n\n  <div class=\"mdc-tab mat-mdc-tab mat-mdc-focus-indicator\"\n       #tabNode\n       role=\"tab\"\n       matTabLabelWrapper\n       cdkMonitorElementFocus\n       *ngFor=\"let tab of _tabs; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(tab, i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_tabs.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex == i\"\n       [attr.aria-label]=\"tab.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n       [class.mdc-tab--active]=\"selectedIndex == i\"\n       [disabled]=\"tab.disabled\"\n       [fitInkBarToContent]=\"fitInkBarToContent\"\n       (click)=\"_handleClick(tab, tabHeader, i)\"\n       (cdkFocusChange)=\"_tabFocusChanged($event, i)\">\n    <span class=\"mdc-tab__ripple\"></span>\n\n    <!-- Needs to be a separate element, because we can't put\n         `overflow: hidden` on tab due to the ink bar. -->\n    <div\n      class=\"mat-mdc-tab-ripple\"\n      mat-ripple\n      [matRippleTrigger]=\"tabNode\"\n      [matRippleDisabled]=\"tab.disabled || disableRipple\"></div>\n\n    <span class=\"mdc-tab__content\">\n      <span class=\"mdc-tab__text-label\">\n        <!-- If there is a label template, use it. -->\n        <ng-template [ngIf]=\"tab.templateLabel\">\n          <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n        </ng-template>\n\n        <!-- If there is not a label template, fall back to the text label. -->\n        <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template>\n      </span>\n    </span>\n  </div>\n</mat-tab-header>\n\n<div\n  class=\"mat-mdc-tab-body-wrapper\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n  #tabBodyWrapper>\n  <mat-tab-body role=\"tabpanel\"\n               *ngFor=\"let tab of _tabs; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.tabindex]=\"(contentTabIndex != null && selectedIndex === i) ? contentTabIndex : null\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.mat-mdc-tab-body-active]=\"selectedIndex === i\"\n               [content]=\"tab.content!\"\n               [position]=\"tab.position!\"\n               [origin]=\"tab.origin\"\n               [animationDuration]=\"animationDuration\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </mat-tab-body>\n</div>\n", styles: [".mdc-tab{position:relative}.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:8px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + -12px\n    );width:calc(\n      100% + -8px\n    );margin-top:-2px;z-index:2}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring{border-color:CanvasText}}.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:10px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused.mdc-tab--active .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus.mdc-tab--active .mdc-tab__focus-ring::after{border-color:CanvasText}}.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring{pointer-events:none;border:2px solid transparent;border-radius:8px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + -8px\n    );width:calc(\n      100% + -8px\n    );z-index:2}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring{border-color:CanvasText}}.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:10px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__focus-ring::after,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__focus-ring::after{border-color:CanvasText}}.mdc-tab__content{position:relative}.mdc-tab__icon{width:24px;height:24px;font-size:24px}.mdc-tab{background:none}.mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab.mdc-tab{height:48px;flex-grow:0}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.cdk-high-contrast-active .mat-mdc-tab.cdk-program-focused,.cdk-high-contrast-active .mat-mdc-tab.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.cdk-high-contrast-active :host .mat-mdc-tab.cdk-program-focused,.cdk-high-contrast-active :host .mat-mdc-tab.cdk-keyboard-focused{outline:dotted 2px;outline-offset:-2px}.mat-mdc-tab .mat-ripple-element{opacity:.12}.mat-mdc-tab-group[mat-stretch-tabs]>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-group{display:flex;flex-direction:column;max-width:100%}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable.mat-mdc-tab-body-wrapper{transition:none;animation:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_TABS_CONFIG]
                }, {
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { _allTabs: [{
                type: ContentChildren,
                args: [MatTab, { descendants: true }]
            }], _tabBodyWrapper: [{
                type: ViewChild,
                args: ['tabBodyWrapper']
            }], _tabHeader: [{
                type: ViewChild,
                args: ['tabHeader']
            }], fitInkBarToContent: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy90YWItZ3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1ncm91cC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsR0FFaEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7OztBQUUxRTs7OztHQUlHO0FBcUJILE1BQU0sT0FBTyxXQUFZLFNBQVEsZ0JBQWdCO0lBZ0IvQyxZQUNFLFVBQXNCLEVBQ3RCLGlCQUFvQyxFQUNDLGFBQTZCLEVBQ3ZCLGFBQXNCO1FBRWpFLEtBQUssQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBUjdELHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQVNsQyxJQUFJLENBQUMsa0JBQWtCO1lBQ3JCLGFBQWEsSUFBSSxhQUFhLENBQUMsa0JBQWtCLElBQUksSUFBSTtnQkFDdkQsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0I7Z0JBQ2xDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBdEJELHFGQUFxRjtJQUNyRixJQUNJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxDQUFVO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7d0dBYlUsV0FBVyw2RUFtQlosZUFBZSw2QkFDSCxxQkFBcUI7NEZBcEJoQyxXQUFXLG1WQVpYO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixXQUFXLEVBQUUsV0FBVztTQUN6QjtLQUNGLG1EQVFnQixNQUFNLCtTQzFEekIsaTBGQW1FQTsyRkRWYSxXQUFXO2tCQXBCdkIsU0FBUzsrQkFDRSxlQUFlLFlBQ2YsYUFBYSxpQkFHUixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLFVBQ3ZDLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxhQUN2Qjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxhQUFhO3lCQUN6QjtxQkFDRixRQUNLO3dCQUNKLE9BQU8sRUFBRSxtQkFBbUI7d0JBQzVCLDBDQUEwQyxFQUFFLGVBQWU7d0JBQzNELDJDQUEyQyxFQUFFLDRCQUE0QjtxQkFDMUU7OzBCQXFCRSxNQUFNOzJCQUFDLGVBQWU7OzBCQUFHLFFBQVE7OzBCQUNqQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLHFCQUFxQjs0Q0FuQkcsUUFBUTtzQkFBckQsZUFBZTt1QkFBQyxNQUFNLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDO2dCQUNmLGVBQWU7c0JBQTNDLFNBQVM7dUJBQUMsZ0JBQWdCO2dCQUNILFVBQVU7c0JBQWpDLFNBQVM7dUJBQUMsV0FBVztnQkFJbEIsa0JBQWtCO3NCQURyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgX01hdFRhYkdyb3VwQmFzZSxcbiAgTUFUX1RBQl9HUk9VUCxcbiAgTUFUX1RBQlNfQ09ORklHLFxuICBNYXRUYWJzQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNYXRUYWJ9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7TWF0VGFiSGVhZGVyfSBmcm9tICcuL3RhYi1oZWFkZXInO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuLyoqXG4gKiBNYXRlcmlhbCBkZXNpZ24gdGFiLWdyb3VwIGNvbXBvbmVudC4gU3VwcG9ydHMgYmFzaWMgdGFiIHBhaXJzIChsYWJlbCArIGNvbnRlbnQpIGFuZCBpbmNsdWRlc1xuICogYW5pbWF0ZWQgaW5rLWJhciwga2V5Ym9hcmQgbmF2aWdhdGlvbiwgYW5kIHNjcmVlbiByZWFkZXIuXG4gKiBTZWU6IGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2NvbXBvbmVudHMvdGFicy5odG1sXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10YWItZ3JvdXAnLFxuICBleHBvcnRBczogJ21hdFRhYkdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICd0YWItZ3JvdXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWItZ3JvdXAuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZSddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBNQVRfVEFCX0dST1VQLFxuICAgICAgdXNlRXhpc3Rpbmc6IE1hdFRhYkdyb3VwLFxuICAgIH0sXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy10YWItZ3JvdXAnLFxuICAgICdbY2xhc3MubWF0LW1kYy10YWItZ3JvdXAtZHluYW1pYy1oZWlnaHRdJzogJ2R5bmFtaWNIZWlnaHQnLFxuICAgICdbY2xhc3MubWF0LW1kYy10YWItZ3JvdXAtaW52ZXJ0ZWQtaGVhZGVyXSc6ICdoZWFkZXJQb3NpdGlvbiA9PT0gXCJiZWxvd1wiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiR3JvdXAgZXh0ZW5kcyBfTWF0VGFiR3JvdXBCYXNlIHtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRUYWIsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9hbGxUYWJzOiBRdWVyeUxpc3Q8TWF0VGFiPjtcbiAgQFZpZXdDaGlsZCgndGFiQm9keVdyYXBwZXInKSBfdGFiQm9keVdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYkhlYWRlcicpIF90YWJIZWFkZXI6IE1hdFRhYkhlYWRlcjtcblxuICAvKiogV2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgZml0IGl0cyB3aWR0aCB0byB0aGUgc2l6ZSBvZiB0aGUgdGFiIGxhYmVsIGNvbnRlbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXRJbmtCYXJUb0NvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpdElua0JhclRvQ29udGVudDtcbiAgfVxuICBzZXQgZml0SW5rQmFyVG9Db250ZW50KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXRJbmtCYXJUb0NvbnRlbnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbiAgcHJpdmF0ZSBfZml0SW5rQmFyVG9Db250ZW50ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChNQVRfVEFCU19DT05GSUcpIEBPcHRpb25hbCgpIGRlZmF1bHRDb25maWc/OiBNYXRUYWJzQ29uZmlnLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGVmYXVsdENvbmZpZywgYW5pbWF0aW9uTW9kZSk7XG4gICAgdGhpcy5maXRJbmtCYXJUb0NvbnRlbnQgPVxuICAgICAgZGVmYXVsdENvbmZpZyAmJiBkZWZhdWx0Q29uZmlnLmZpdElua0JhclRvQ29udGVudCAhPSBudWxsXG4gICAgICAgID8gZGVmYXVsdENvbmZpZy5maXRJbmtCYXJUb0NvbnRlbnRcbiAgICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXRJbmtCYXJUb0NvbnRlbnQ6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxtYXQtdGFiLWhlYWRlciAjdGFiSGVhZGVyXG4gICAgICAgICAgICAgICAgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRJbmRleCB8fCAwXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZVJpcHBsZV09XCJkaXNhYmxlUmlwcGxlXCJcbiAgICAgICAgICAgICAgICAoaW5kZXhGb2N1c2VkKT1cIl9mb2N1c0NoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHNlbGVjdEZvY3VzZWRJbmRleCk9XCJzZWxlY3RlZEluZGV4ID0gJGV2ZW50XCI+XG5cbiAgPGRpdiBjbGFzcz1cIm1kYy10YWIgbWF0LW1kYy10YWIgbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3JcIlxuICAgICAgICN0YWJOb2RlXG4gICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgbWF0VGFiTGFiZWxXcmFwcGVyXG4gICAgICAgY2RrTW9uaXRvckVsZW1lbnRGb2N1c1xuICAgICAgICpuZ0Zvcj1cImxldCB0YWIgb2YgX3RhYnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgIFtpZF09XCJfZ2V0VGFiTGFiZWxJZChpKVwiXG4gICAgICAgW2F0dHIudGFiSW5kZXhdPVwiX2dldFRhYkluZGV4KHRhYiwgaSlcIlxuICAgICAgIFthdHRyLmFyaWEtcG9zaW5zZXRdPVwiaSArIDFcIlxuICAgICAgIFthdHRyLmFyaWEtc2V0c2l6ZV09XCJfdGFicy5sZW5ndGhcIlxuICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiX2dldFRhYkNvbnRlbnRJZChpKVwiXG4gICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzZWxlY3RlZEluZGV4ID09IGlcIlxuICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwidGFiLmFyaWFMYWJlbCB8fCBudWxsXCJcbiAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiKCF0YWIuYXJpYUxhYmVsICYmIHRhYi5hcmlhTGFiZWxsZWRieSkgPyB0YWIuYXJpYUxhYmVsbGVkYnkgOiBudWxsXCJcbiAgICAgICBbY2xhc3MubWRjLXRhYi0tYWN0aXZlXT1cInNlbGVjdGVkSW5kZXggPT0gaVwiXG4gICAgICAgW2Rpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiXG4gICAgICAgW2ZpdElua0JhclRvQ29udGVudF09XCJmaXRJbmtCYXJUb0NvbnRlbnRcIlxuICAgICAgIChjbGljayk9XCJfaGFuZGxlQ2xpY2sodGFiLCB0YWJIZWFkZXIsIGkpXCJcbiAgICAgICAoY2RrRm9jdXNDaGFuZ2UpPVwiX3RhYkZvY3VzQ2hhbmdlZCgkZXZlbnQsIGkpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJtZGMtdGFiX19yaXBwbGVcIj48L3NwYW4+XG5cbiAgICA8IS0tIE5lZWRzIHRvIGJlIGEgc2VwYXJhdGUgZWxlbWVudCwgYmVjYXVzZSB3ZSBjYW4ndCBwdXRcbiAgICAgICAgIGBvdmVyZmxvdzogaGlkZGVuYCBvbiB0YWIgZHVlIHRvIHRoZSBpbmsgYmFyLiAtLT5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cIm1hdC1tZGMtdGFiLXJpcHBsZVwiXG4gICAgICBtYXQtcmlwcGxlXG4gICAgICBbbWF0UmlwcGxlVHJpZ2dlcl09XCJ0YWJOb2RlXCJcbiAgICAgIFttYXRSaXBwbGVEaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWQgfHwgZGlzYWJsZVJpcHBsZVwiPjwvZGl2PlxuXG4gICAgPHNwYW4gY2xhc3M9XCJtZGMtdGFiX19jb250ZW50XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1kYy10YWJfX3RleHQtbGFiZWxcIj5cbiAgICAgICAgPCEtLSBJZiB0aGVyZSBpcyBhIGxhYmVsIHRlbXBsYXRlLCB1c2UgaXQuIC0tPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwidGFiLnRlbXBsYXRlTGFiZWxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJ0YWIudGVtcGxhdGVMYWJlbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgPCEtLSBJZiB0aGVyZSBpcyBub3QgYSBsYWJlbCB0ZW1wbGF0ZSwgZmFsbCBiYWNrIHRvIHRoZSB0ZXh0IGxhYmVsLiAtLT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiF0YWIudGVtcGxhdGVMYWJlbFwiPnt7dGFiLnRleHRMYWJlbH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC9tYXQtdGFiLWhlYWRlcj5cblxuPGRpdlxuICBjbGFzcz1cIm1hdC1tZGMtdGFiLWJvZHktd3JhcHBlclwiXG4gIFtjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV09XCJfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJ1wiXG4gICN0YWJCb2R5V3JhcHBlcj5cbiAgPG1hdC10YWItYm9keSByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRhYiBvZiBfdGFiczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICBbaWRdPVwiX2dldFRhYkNvbnRlbnRJZChpKVwiXG4gICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIoY29udGVudFRhYkluZGV4ICE9IG51bGwgJiYgc2VsZWN0ZWRJbmRleCA9PT0gaSkgPyBjb250ZW50VGFiSW5kZXggOiBudWxsXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJfZ2V0VGFiTGFiZWxJZChpKVwiXG4gICAgICAgICAgICAgICBbY2xhc3MubWF0LW1kYy10YWItYm9keS1hY3RpdmVdPVwic2VsZWN0ZWRJbmRleCA9PT0gaVwiXG4gICAgICAgICAgICAgICBbY29udGVudF09XCJ0YWIuY29udGVudCFcIlxuICAgICAgICAgICAgICAgW3Bvc2l0aW9uXT1cInRhYi5wb3NpdGlvbiFcIlxuICAgICAgICAgICAgICAgW29yaWdpbl09XCJ0YWIub3JpZ2luXCJcbiAgICAgICAgICAgICAgIFthbmltYXRpb25EdXJhdGlvbl09XCJhbmltYXRpb25EdXJhdGlvblwiXG4gICAgICAgICAgICAgICAoX29uQ2VudGVyZWQpPVwiX3JlbW92ZVRhYkJvZHlXcmFwcGVySGVpZ2h0KClcIlxuICAgICAgICAgICAgICAgKF9vbkNlbnRlcmluZyk9XCJfc2V0VGFiQm9keVdyYXBwZXJIZWlnaHQoJGV2ZW50KVwiPlxuICA8L21hdC10YWItYm9keT5cbjwvZGl2PlxuIl19