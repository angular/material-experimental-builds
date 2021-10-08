/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, InjectionToken } from '@angular/core';
import { MatPaginatorIntl, _MatPaginatorBase } from '@angular/material/paginator';
import { MatFormFieldAppearance } from '@angular/material-experimental/mdc-form-field';
import * as i0 from "@angular/core";
/** Object that can be used to configure the default options for the paginator module. */
export interface MatPaginatorDefaultOptions {
    /** Number of items to display on a page. By default set to 50. */
    pageSize?: number;
    /** The set of provided page size options to display to the user. */
    pageSizeOptions?: number[];
    /** Whether to hide the page size selection UI from the user. */
    hidePageSize?: boolean;
    /** Whether to show the first/last buttons UI to the user. */
    showFirstLastButtons?: boolean;
    /** The default form-field appearance to apply to the page size options selector. */
    formFieldAppearance?: MatFormFieldAppearance;
}
/** Injection token that can be used to provide the default options for the paginator module. */
export declare const MAT_PAGINATOR_DEFAULT_OPTIONS: InjectionToken<MatPaginatorDefaultOptions>;
/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
export declare class MatPaginator extends _MatPaginatorBase<MatPaginatorDefaultOptions> {
    /** If set, styles the "page size" form field with the designated style. */
    _formFieldAppearance?: MatFormFieldAppearance;
    /** ID for the DOM node containing the pagiators's items per page label. */
    readonly _pageSizeLabelId: string;
    constructor(intl: MatPaginatorIntl, changeDetectorRef: ChangeDetectorRef, defaults?: MatPaginatorDefaultOptions);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPaginator, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatPaginator, "mat-paginator", ["matPaginator"], { "disabled": "disabled"; }, {}, never, never>;
}
