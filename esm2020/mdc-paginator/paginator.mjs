/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, InjectionToken, Optional, ViewEncapsulation, } from '@angular/core';
import { MatPaginatorIntl, _MatPaginatorBase } from '@angular/material/paginator';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/paginator";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material-experimental/mdc-button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material-experimental/mdc-select";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/material/tooltip";
/** Injection token that can be used to provide the default options for the paginator module. */
export const MAT_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken('MAT_PAGINATOR_DEFAULT_OPTIONS');
let nextUniqueId = 0;
/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
export class MatPaginator extends _MatPaginatorBase {
    constructor(intl, changeDetectorRef, defaults) {
        super(intl, changeDetectorRef, defaults);
        /** ID for the DOM node containing the paginator's items per page label. */
        this._pageSizeLabelId = `mat-paginator-page-size-label-${nextUniqueId++}`;
        this._formFieldAppearance = defaults?.formFieldAppearance || 'outline';
    }
}
MatPaginator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatPaginator, deps: [{ token: i1.MatPaginatorIntl }, { token: i0.ChangeDetectorRef }, { token: MAT_PAGINATOR_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatPaginator.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.1", type: MatPaginator, selector: "mat-paginator", inputs: { disabled: "disabled" }, host: { attributes: { "role": "group" }, classAttribute: "mat-mdc-paginator" }, exportAs: ["matPaginator"], usesInheritance: true, ngImport: i0, template: "<div class=\"mat-mdc-paginator-outer-container\">\n  <div class=\"mat-mdc-paginator-container\">\n    <div class=\"mat-mdc-paginator-page-size\" *ngIf=\"!hidePageSize\">\n      <div class=\"mat-mdc-paginator-page-size-label\" id=\"{{_pageSizeLabelId}}\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field\n        *ngIf=\"_displayedPageSizeOptions.length > 1\"\n        [appearance]=\"_formFieldAppearance!\"\n        [color]=\"color\"\n        class=\"mat-mdc-paginator-page-size-select\">\n        <mat-select\n          [value]=\"pageSize\"\n          [disabled]=\"disabled\"\n          [aria-labelledby]=\"_pageSizeLabelId\"\n          [panelClass]=\"selectConfig.panelClass || ''\"\n          [disableOptionCentering]=\"selectConfig.disableOptionCentering\"\n          (selectionChange)=\"_changePageSize($event.value)\">\n          <mat-option *ngFor=\"let pageSizeOption of _displayedPageSizeOptions\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <div\n        class=\"mat-mdc-paginator-page-size-value\"\n        *ngIf=\"_displayedPageSizeOptions.length <= 1\">{{pageSize}}</div>\n    </div>\n\n    <div class=\"mat-mdc-paginator-range-actions\">\n      <div class=\"mat-mdc-paginator-range-label\" aria-live=\"polite\">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-first\"\n              (click)=\"firstPage()\"\n              [attr.aria-label]=\"_intl.firstPageLabel\"\n              [matTooltip]=\"_intl.firstPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-previous\"\n              (click)=\"previousPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-next\"\n              (click)=\"nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-last\"\n              (click)=\"lastPage()\"\n              [attr.aria-label]=\"_intl.lastPageLabel\"\n              [matTooltip]=\"_intl.lastPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".mat-mdc-paginator{display:block}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "component", type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i7.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatPaginator, decorators: [{
            type: Component,
            args: [{ selector: 'mat-paginator', exportAs: 'matPaginator', inputs: ['disabled'], host: {
                        'class': 'mat-mdc-paginator',
                        'role': 'group',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mat-mdc-paginator-outer-container\">\n  <div class=\"mat-mdc-paginator-container\">\n    <div class=\"mat-mdc-paginator-page-size\" *ngIf=\"!hidePageSize\">\n      <div class=\"mat-mdc-paginator-page-size-label\" id=\"{{_pageSizeLabelId}}\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field\n        *ngIf=\"_displayedPageSizeOptions.length > 1\"\n        [appearance]=\"_formFieldAppearance!\"\n        [color]=\"color\"\n        class=\"mat-mdc-paginator-page-size-select\">\n        <mat-select\n          [value]=\"pageSize\"\n          [disabled]=\"disabled\"\n          [aria-labelledby]=\"_pageSizeLabelId\"\n          [panelClass]=\"selectConfig.panelClass || ''\"\n          [disableOptionCentering]=\"selectConfig.disableOptionCentering\"\n          (selectionChange)=\"_changePageSize($event.value)\">\n          <mat-option *ngFor=\"let pageSizeOption of _displayedPageSizeOptions\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <div\n        class=\"mat-mdc-paginator-page-size-value\"\n        *ngIf=\"_displayedPageSizeOptions.length <= 1\">{{pageSize}}</div>\n    </div>\n\n    <div class=\"mat-mdc-paginator-range-actions\">\n      <div class=\"mat-mdc-paginator-range-label\" aria-live=\"polite\">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-first\"\n              (click)=\"firstPage()\"\n              [attr.aria-label]=\"_intl.firstPageLabel\"\n              [matTooltip]=\"_intl.firstPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-previous\"\n              (click)=\"previousPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipDisabled]=\"_previousButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_previousButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-next\"\n              (click)=\"nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n      <button mat-icon-button type=\"button\"\n              class=\"mat-mdc-paginator-navigation-last\"\n              (click)=\"lastPage()\"\n              [attr.aria-label]=\"_intl.lastPageLabel\"\n              [matTooltip]=\"_intl.lastPageLabel\"\n              [matTooltipDisabled]=\"_nextButtonsDisabled()\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"_nextButtonsDisabled()\"\n              *ngIf=\"showFirstLastButtons\">\n        <svg class=\"mat-mdc-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".mat-mdc-paginator{display:block}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatPaginatorIntl }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_PAGINATOR_DEFAULT_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcGFnaW5hdG9yL3BhZ2luYXRvci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXBhZ2luYXRvci9wYWdpbmF0b3IuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBQ1IsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7Ozs7QUF5QmhGLGdHQUFnRztBQUNoRyxNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBRyxJQUFJLGNBQWMsQ0FDN0QsK0JBQStCLENBQ2hDLENBQUM7QUFFRixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7R0FJRztBQWNILE1BQU0sT0FBTyxZQUFhLFNBQVEsaUJBQTZDO0lBTzdFLFlBQ0UsSUFBc0IsRUFDdEIsaUJBQW9DLEVBQ2UsUUFBcUM7UUFFeEYsS0FBSyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQVIzQywyRUFBMkU7UUFDbEUscUJBQWdCLEdBQUcsaUNBQWlDLFlBQVksRUFBRSxFQUFFLENBQUM7UUFRNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsRUFBRSxtQkFBbUIsSUFBSSxTQUFTLENBQUM7SUFDekUsQ0FBQzs7eUdBZFUsWUFBWSxtRkFVRCw2QkFBNkI7NkZBVnhDLFlBQVksME5DbkV6QixrK0hBd0ZBOzJGRHJCYSxZQUFZO2tCQWJ4QixTQUFTOytCQUNFLGVBQWUsWUFDZixjQUFjLFVBR2hCLENBQUMsVUFBVSxDQUFDLFFBQ2Q7d0JBQ0osT0FBTyxFQUFFLG1CQUFtQjt3QkFDNUIsTUFBTSxFQUFFLE9BQU87cUJBQ2hCLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzswQkFZbEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFBhZ2luYXRvckludGwsIF9NYXRQYWdpbmF0b3JCYXNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRBcHBlYXJhbmNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcblxuLy8gTm90ZSB0aGF0IHdoaWxlIGBNYXRQYWdpbmF0b3JEZWZhdWx0T3B0aW9uc2AgYW5kIGBNQVRfUEFHSU5BVE9SX0RFRkFVTFRfT1BUSU9OU2AgYXJlIGlkZW50aWNhbFxuLy8gYmV0d2VlbiB0aGUgTURDIGFuZCBub24tTURDIHZlcnNpb25zLCB3ZSBoYXZlIHRvIGR1cGxpY2F0ZSB0aGVtLCBiZWNhdXNlIHRoZSB0eXBlIG9mXG4vLyBgZm9ybUZpZWxkQXBwZWFyYW5jZWAgaXMgbmFycm93ZXIgaW4gdGhlIE1EQyB2ZXJzaW9uLlxuXG4vKiogT2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBwYWdpbmF0b3IgbW9kdWxlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRQYWdpbmF0b3JEZWZhdWx0T3B0aW9ucyB7XG4gIC8qKiBOdW1iZXIgb2YgaXRlbXMgdG8gZGlzcGxheSBvbiBhIHBhZ2UuIEJ5IGRlZmF1bHQgc2V0IHRvIDUwLiAqL1xuICBwYWdlU2l6ZT86IG51bWJlcjtcblxuICAvKiogVGhlIHNldCBvZiBwcm92aWRlZCBwYWdlIHNpemUgb3B0aW9ucyB0byBkaXNwbGF5IHRvIHRoZSB1c2VyLiAqL1xuICBwYWdlU2l6ZU9wdGlvbnM/OiBudW1iZXJbXTtcblxuICAvKiogV2hldGhlciB0byBoaWRlIHRoZSBwYWdlIHNpemUgc2VsZWN0aW9uIFVJIGZyb20gdGhlIHVzZXIuICovXG4gIGhpZGVQYWdlU2l6ZT86IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyB0aGUgZmlyc3QvbGFzdCBidXR0b25zIFVJIHRvIHRoZSB1c2VyLiAqL1xuICBzaG93Rmlyc3RMYXN0QnV0dG9ucz86IGJvb2xlYW47XG5cbiAgLyoqIFRoZSBkZWZhdWx0IGZvcm0tZmllbGQgYXBwZWFyYW5jZSB0byBhcHBseSB0byB0aGUgcGFnZSBzaXplIG9wdGlvbnMgc2VsZWN0b3IuICovXG4gIGZvcm1GaWVsZEFwcGVhcmFuY2U/OiBNYXRGb3JtRmllbGRBcHBlYXJhbmNlO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciB0aGUgcGFnaW5hdG9yIG1vZHVsZS4gKi9cbmV4cG9ydCBjb25zdCBNQVRfUEFHSU5BVE9SX0RFRkFVTFRfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRQYWdpbmF0b3JEZWZhdWx0T3B0aW9ucz4oXG4gICdNQVRfUEFHSU5BVE9SX0RFRkFVTFRfT1BUSU9OUycsXG4pO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdG8gcHJvdmlkZSBuYXZpZ2F0aW9uIGJldHdlZW4gcGFnZWQgaW5mb3JtYXRpb24uIERpc3BsYXlzIHRoZSBzaXplIG9mIHRoZSBjdXJyZW50XG4gKiBwYWdlLCB1c2VyLXNlbGVjdGFibGUgb3B0aW9ucyB0byBjaGFuZ2UgdGhhdCBzaXplLCB3aGF0IGl0ZW1zIGFyZSBiZWluZyBzaG93biwgYW5kXG4gKiBuYXZpZ2F0aW9uYWwgYnV0dG9uIHRvIGdvIHRvIHRoZSBwcmV2aW91cyBvciBuZXh0IHBhZ2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1wYWdpbmF0b3InLFxuICBleHBvcnRBczogJ21hdFBhZ2luYXRvcicsXG4gIHRlbXBsYXRlVXJsOiAncGFnaW5hdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnaW5hdG9yLmNzcyddLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLXBhZ2luYXRvcicsXG4gICAgJ3JvbGUnOiAnZ3JvdXAnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UGFnaW5hdG9yIGV4dGVuZHMgX01hdFBhZ2luYXRvckJhc2U8TWF0UGFnaW5hdG9yRGVmYXVsdE9wdGlvbnM+IHtcbiAgLyoqIElmIHNldCwgc3R5bGVzIHRoZSBcInBhZ2Ugc2l6ZVwiIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVzaWduYXRlZCBzdHlsZS4gKi9cbiAgX2Zvcm1GaWVsZEFwcGVhcmFuY2U/OiBNYXRGb3JtRmllbGRBcHBlYXJhbmNlO1xuXG4gIC8qKiBJRCBmb3IgdGhlIERPTSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhZ2luYXRvcidzIGl0ZW1zIHBlciBwYWdlIGxhYmVsLiAqL1xuICByZWFkb25seSBfcGFnZVNpemVMYWJlbElkID0gYG1hdC1wYWdpbmF0b3ItcGFnZS1zaXplLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpbnRsOiBNYXRQYWdpbmF0b3JJbnRsLFxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9QQUdJTkFUT1JfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0cz86IE1hdFBhZ2luYXRvckRlZmF1bHRPcHRpb25zLFxuICApIHtcbiAgICBzdXBlcihpbnRsLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGVmYXVsdHMpO1xuICAgIHRoaXMuX2Zvcm1GaWVsZEFwcGVhcmFuY2UgPSBkZWZhdWx0cz8uZm9ybUZpZWxkQXBwZWFyYW5jZSB8fCAnb3V0bGluZSc7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1vdXRlci1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLWNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemVcIiAqbmdJZj1cIiFoaWRlUGFnZVNpemVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemUtbGFiZWxcIiBpZD1cInt7X3BhZ2VTaXplTGFiZWxJZH19XCI+XG4gICAgICAgIHt7X2ludGwuaXRlbXNQZXJQYWdlTGFiZWx9fVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxtYXQtZm9ybS1maWVsZFxuICAgICAgICAqbmdJZj1cIl9kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMubGVuZ3RoID4gMVwiXG4gICAgICAgIFthcHBlYXJhbmNlXT1cIl9mb3JtRmllbGRBcHBlYXJhbmNlIVwiXG4gICAgICAgIFtjb2xvcl09XCJjb2xvclwiXG4gICAgICAgIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItcGFnZS1zaXplLXNlbGVjdFwiPlxuICAgICAgICA8bWF0LXNlbGVjdFxuICAgICAgICAgIFt2YWx1ZV09XCJwYWdlU2l6ZVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICBbYXJpYS1sYWJlbGxlZGJ5XT1cIl9wYWdlU2l6ZUxhYmVsSWRcIlxuICAgICAgICAgIFtwYW5lbENsYXNzXT1cInNlbGVjdENvbmZpZy5wYW5lbENsYXNzIHx8ICcnXCJcbiAgICAgICAgICBbZGlzYWJsZU9wdGlvbkNlbnRlcmluZ109XCJzZWxlY3RDb25maWcuZGlzYWJsZU9wdGlvbkNlbnRlcmluZ1wiXG4gICAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJfY2hhbmdlUGFnZVNpemUoJGV2ZW50LnZhbHVlKVwiPlxuICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBwYWdlU2l6ZU9wdGlvbiBvZiBfZGlzcGxheWVkUGFnZVNpemVPcHRpb25zXCIgW3ZhbHVlXT1cInBhZ2VTaXplT3B0aW9uXCI+XG4gICAgICAgICAgICB7e3BhZ2VTaXplT3B0aW9ufX1cbiAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1wYWdlLXNpemUtdmFsdWVcIlxuICAgICAgICAqbmdJZj1cIl9kaXNwbGF5ZWRQYWdlU2l6ZU9wdGlvbnMubGVuZ3RoIDw9IDFcIj57e3BhZ2VTaXplfX08L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYXQtbWRjLXBhZ2luYXRvci1yYW5nZS1hY3Rpb25zXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItcmFuZ2UtbGFiZWxcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAge3tfaW50bC5nZXRSYW5nZUxhYmVsKHBhZ2VJbmRleCwgcGFnZVNpemUsIGxlbmd0aCl9fVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLW5hdmlnYXRpb24tZmlyc3RcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiZmlyc3RQYWdlKClcIlxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIl9pbnRsLmZpcnN0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiX2ludGwuZmlyc3RQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcERpc2FibGVkXT1cIl9wcmV2aW91c0J1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9wcmV2aW91c0J1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJzaG93Rmlyc3RMYXN0QnV0dG9uc1wiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItaWNvblwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmb2N1c2FibGU9XCJmYWxzZVwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTguNDEgMTYuNTlMMTMuODIgMTJsNC41OS00LjU5TDE3IDZsLTYgNiA2IDZ6TTYgNmgydjEySDZ6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItbmF2aWdhdGlvbi1wcmV2aW91c1wiXG4gICAgICAgICAgICAgIChjbGljayk9XCJwcmV2aW91c1BhZ2UoKVwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJfaW50bC5wcmV2aW91c1BhZ2VMYWJlbFwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiX3ByZXZpb3VzQnV0dG9uc0Rpc2FibGVkKClcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcFBvc2l0aW9uXT1cIidhYm92ZSdcIlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiX3ByZXZpb3VzQnV0dG9uc0Rpc2FibGVkKClcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLWljb25cIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZm9jdXNhYmxlPVwiZmFsc2VcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJ6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItbmF2aWdhdGlvbi1uZXh0XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm5leHRQYWdlKClcIlxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIl9pbnRsLm5leHRQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJfaW50bC5uZXh0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJfbmV4dEJ1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9uZXh0QnV0dG9uc0Rpc2FibGVkKClcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLWljb25cIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZm9jdXNhYmxlPVwiZmFsc2VcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTEwIDZMOC41OSA3LjQxIDEzLjE3IDEybC00LjU4IDQuNTlMMTAgMThsNi02elwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1tZGMtcGFnaW5hdG9yLW5hdmlnYXRpb24tbGFzdFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJsYXN0UGFnZSgpXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJfaW50bC5sYXN0UGFnZUxhYmVsXCJcbiAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiX2ludGwubGFzdFBhZ2VMYWJlbFwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiX25leHRCdXR0b25zRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwUG9zaXRpb25dPVwiJ2Fib3ZlJ1wiXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJfbmV4dEJ1dHRvbnNEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJzaG93Rmlyc3RMYXN0QnV0dG9uc1wiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwibWF0LW1kYy1wYWdpbmF0b3ItaWNvblwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmb2N1c2FibGU9XCJmYWxzZVwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNS41OSA3LjQxTDEwLjE4IDEybC00LjU5IDQuNTlMNyAxOGw2LTYtNi02ek0xNiA2aDJ2MTJoLTJ6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19