/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Inject, Input, Optional, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { _MatTabGroupBase, MAT_TAB_GROUP, MAT_TABS_CONFIG, } from '@angular/material/tabs';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatTab } from './tab';
import { MatTabHeader } from './tab-header';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/**
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
let MatTabGroup = /** @class */ (() => {
    var MatTabGroup_1;
    let MatTabGroup = MatTabGroup_1 = class MatTabGroup extends _MatTabGroupBase {
        constructor(elementRef, changeDetectorRef, defaultConfig, animationMode) {
            super(elementRef, changeDetectorRef, defaultConfig, animationMode);
            this._fitInkBarToContent = false;
            this.fitInkBarToContent = defaultConfig && defaultConfig.fitInkBarToContent != null ?
                defaultConfig.fitInkBarToContent : false;
        }
        /** Whether the ink bar should fit its width to the size of the tab label content. */
        get fitInkBarToContent() { return this._fitInkBarToContent; }
        set fitInkBarToContent(v) {
            this._fitInkBarToContent = coerceBooleanProperty(v);
            this._changeDetectorRef.markForCheck();
        }
    };
    __decorate([
        ContentChildren(MatTab, { descendants: true }),
        __metadata("design:type", QueryList)
    ], MatTabGroup.prototype, "_allTabs", void 0);
    __decorate([
        ViewChild('tabBodyWrapper'),
        __metadata("design:type", ElementRef)
    ], MatTabGroup.prototype, "_tabBodyWrapper", void 0);
    __decorate([
        ViewChild('tabHeader'),
        __metadata("design:type", MatTabHeader)
    ], MatTabGroup.prototype, "_tabHeader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatTabGroup.prototype, "fitInkBarToContent", null);
    MatTabGroup = MatTabGroup_1 = __decorate([
        Component({
            selector: 'mat-tab-group',
            exportAs: 'matTabGroup',
            template: "<mat-tab-header #tabHeader\n                [selectedIndex]=\"selectedIndex || 0\"\n                [disableRipple]=\"disableRipple\"\n                (indexFocused)=\"_focusChanged($event)\"\n                (selectFocusedIndex)=\"selectedIndex = $event\">\n\n  <div class=\"mdc-tab mat-mdc-tab mat-mdc-focus-indicator\"\n       #tabNode\n       role=\"tab\"\n       matTabLabelWrapper\n       cdkMonitorElementFocus\n       *ngFor=\"let tab of _tabs; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(tab, i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_tabs.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex == i\"\n       [attr.aria-label]=\"tab.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\"\n       [class.mdc-tab--active]=\"selectedIndex == i\"\n       [disabled]=\"tab.disabled\"\n       [fitInkBarToContent]=\"fitInkBarToContent\"\n       (click)=\"_handleClick(tab, tabHeader, i)\">\n    <span class=\"mdc-tab__ripple\"></span>\n\n    <!-- Needs to be a separate element, because we can't put\n         `overflow: hidden` on tab due to the ink bar. -->\n    <div\n      class=\"mat-mdc-tab-ripple\"\n      mat-ripple\n      [matRippleTrigger]=\"tabNode\"\n      [matRippleDisabled]=\"tab.disabled || disableRipple\"></div>\n\n    <span class=\"mdc-tab__content\">\n      <span class=\"mdc-tab__text-label\">\n        <!-- If there is a label template, use it. -->\n        <ng-template [ngIf]=\"tab.templateLabel\">\n          <ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template>\n        </ng-template>\n\n        <!-- If there is not a label template, fall back to the text label. -->\n        <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template>\n      </span>\n    </span>\n  </div>\n</mat-tab-header>\n\n<div\n  class=\"mat-mdc-tab-body-wrapper\"\n  [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n  #tabBodyWrapper>\n  <mat-tab-body role=\"tabpanel\"\n               *ngFor=\"let tab of _tabs; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.mat-mdc-tab-body-active]=\"selectedIndex == i\"\n               [content]=\"tab.content!\"\n               [position]=\"tab.position!\"\n               [origin]=\"tab.origin\"\n               [animationDuration]=\"animationDuration\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </mat-tab-body>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            inputs: ['color', 'disableRipple'],
            providers: [{
                    provide: MAT_TAB_GROUP,
                    useExisting: MatTabGroup_1
                }],
            host: {
                'class': 'mat-mdc-tab-group',
                '[class.mat-mdc-tab-group-dynamic-height]': 'dynamicHeight',
                '[class.mat-mdc-tab-group-inverted-header]': 'headerPosition === "below"',
            },
            styles: [".mdc-tab{padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab.mdc-tab{height:48px;flex-grow:0;min-width:160px}.mat-mdc-tab .mdc-tab__ripple::before{content:\"\";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12}.mat-mdc-tab-group[mat-stretch-tabs]>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-group{display:flex;flex-direction:column}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable.mat-mdc-tab-body-wrapper{transition:none;animation:none}\n"]
        }),
        __param(2, Inject(MAT_TABS_CONFIG)), __param(2, Optional()),
        __param(3, Optional()), __param(3, Inject(ANIMATION_MODULE_TYPE)),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef, Object, String])
    ], MatTabGroup);
    return MatTabGroup;
})();
export { MatTabGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy90YWItZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsR0FFaEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFlLHFCQUFxQixFQUFjLE1BQU0sdUJBQXVCLENBQUM7QUFFdkY7Ozs7R0FJRztBQW1CSDs7SUFBQSxJQUFhLFdBQVcsbUJBQXhCLE1BQWEsV0FBWSxTQUFRLGdCQUFnQjtRQWMvQyxZQUFZLFVBQXNCLEVBQ3RCLGlCQUFvQyxFQUNDLGFBQTZCLEVBQ3ZCLGFBQXNCO1lBQzNFLEtBQUssQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBTjdELHdCQUFtQixHQUFHLEtBQUssQ0FBQztZQU9sQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxJQUFJLGFBQWEsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDakYsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDL0MsQ0FBQztRQWhCRCxxRkFBcUY7UUFFckYsSUFBSSxrQkFBa0IsS0FBYyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxrQkFBa0IsQ0FBQyxDQUFVO1lBQy9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQztLQWNGLENBQUE7SUF4QitDO1FBQTdDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUM7a0NBQVcsU0FBUztpREFBUztJQUM3QztRQUE1QixTQUFTLENBQUMsZ0JBQWdCLENBQUM7a0NBQWtCLFVBQVU7d0RBQUM7SUFDakM7UUFBdkIsU0FBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBYSxZQUFZO21EQUFDO0lBSWpEO1FBREMsS0FBSyxFQUFFOzs7eURBQzhEO0lBUDNELFdBQVc7UUFsQnZCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLG1xRkFBNkI7WUFFN0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQztZQUNsQyxTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsYUFBYTtvQkFDdEIsV0FBVyxFQUFFLGFBQVc7aUJBQ3pCLENBQUM7WUFDRixJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsMENBQTBDLEVBQUUsZUFBZTtnQkFDM0QsMkNBQTJDLEVBQUUsNEJBQTRCO2FBQzFFOztTQUNGLENBQUM7UUFpQmEsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ25DLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO3lDQUg5QixVQUFVO1lBQ0gsaUJBQWlCO09BZnJDLFdBQVcsQ0F5QnZCO0lBQUQsa0JBQUM7S0FBQTtTQXpCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgX01hdFRhYkdyb3VwQmFzZSxcbiAgTUFUX1RBQl9HUk9VUCxcbiAgTUFUX1RBQlNfQ09ORklHLFxuICBNYXRUYWJzQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNYXRUYWJ9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7TWF0VGFiSGVhZGVyfSBmcm9tICcuL3RhYi1oZWFkZXInO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgTnVtYmVySW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbi8qKlxuICogTWF0ZXJpYWwgZGVzaWduIHRhYi1ncm91cCBjb21wb25lbnQuIFN1cHBvcnRzIGJhc2ljIHRhYiBwYWlycyAobGFiZWwgKyBjb250ZW50KSBhbmQgaW5jbHVkZXNcbiAqIGFuaW1hdGVkIGluay1iYXIsIGtleWJvYXJkIG5hdmlnYXRpb24sIGFuZCBzY3JlZW4gcmVhZGVyLlxuICogU2VlOiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3RhYnMuaHRtbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtdGFiLWdyb3VwJyxcbiAgZXhwb3J0QXM6ICdtYXRUYWJHcm91cCcsXG4gIHRlbXBsYXRlVXJsOiAndGFiLWdyb3VwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFiLWdyb3VwLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE1BVF9UQUJfR1JPVVAsXG4gICAgdXNlRXhpc3Rpbmc6IE1hdFRhYkdyb3VwXG4gIH1dLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtdGFiLWdyb3VwJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGFiLWdyb3VwLWR5bmFtaWMtaGVpZ2h0XSc6ICdkeW5hbWljSGVpZ2h0JyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtdGFiLWdyb3VwLWludmVydGVkLWhlYWRlcl0nOiAnaGVhZGVyUG9zaXRpb24gPT09IFwiYmVsb3dcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYkdyb3VwIGV4dGVuZHMgX01hdFRhYkdyb3VwQmFzZSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0VGFiLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfYWxsVGFiczogUXVlcnlMaXN0PE1hdFRhYj47XG4gIEBWaWV3Q2hpbGQoJ3RhYkJvZHlXcmFwcGVyJykgX3RhYkJvZHlXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd0YWJIZWFkZXInKSBfdGFiSGVhZGVyOiBNYXRUYWJIZWFkZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGluayBiYXIgc2hvdWxkIGZpdCBpdHMgd2lkdGggdG8gdGhlIHNpemUgb2YgdGhlIHRhYiBsYWJlbCBjb250ZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZml0SW5rQmFyVG9Db250ZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZml0SW5rQmFyVG9Db250ZW50OyB9XG4gIHNldCBmaXRJbmtCYXJUb0NvbnRlbnQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpdElua0JhclRvQ29udGVudCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF9maXRJbmtCYXJUb0NvbnRlbnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX1RBQlNfQ09ORklHKSBAT3B0aW9uYWwoKSBkZWZhdWx0Q29uZmlnPzogTWF0VGFic0NvbmZpZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGVmYXVsdENvbmZpZywgYW5pbWF0aW9uTW9kZSk7XG4gICAgdGhpcy5maXRJbmtCYXJUb0NvbnRlbnQgPSBkZWZhdWx0Q29uZmlnICYmIGRlZmF1bHRDb25maWcuZml0SW5rQmFyVG9Db250ZW50ICE9IG51bGwgP1xuICAgICAgICBkZWZhdWx0Q29uZmlnLmZpdElua0JhclRvQ29udGVudCA6IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpdElua0JhclRvQ29udGVudDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYW5pbWF0aW9uRHVyYXRpb246IE51bWJlcklucHV0O1xufVxuIl19