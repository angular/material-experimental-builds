import { ChangeDetectorRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '@angular/material-experimental/mdc-button';
import * as i4 from '@angular/material/select';
import * as i5 from '@angular/material/tooltip';
import { InjectionToken } from '@angular/core';
import { MAT_PAGINATOR_INTL_PROVIDER } from '@angular/material/paginator';
import { MAT_PAGINATOR_INTL_PROVIDER_FACTORY } from '@angular/material/paginator';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { _MatPaginatorBase } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorSelectConfig } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

declare namespace i1 {
    export {
        MatPaginatorDefaultOptions,
        MAT_PAGINATOR_DEFAULT_OPTIONS,
        MatPaginator
    }
}

/** Injection token that can be used to provide the default options for the paginator module. */
export declare const MAT_PAGINATOR_DEFAULT_OPTIONS: InjectionToken<MatPaginatorDefaultOptions>;

export { MAT_PAGINATOR_INTL_PROVIDER }

export { MAT_PAGINATOR_INTL_PROVIDER_FACTORY }

/**
 * Component to provide navigation between paged information. Displays the size of the current
 * page, user-selectable options to change that size, what items are being shown, and
 * navigational button to go to the previous or next page.
 */
export declare class MatPaginator extends _MatPaginatorBase<MatPaginatorDefaultOptions> {
    /** If set, styles the "page size" form field with the designated style. */
    _formFieldAppearance?: MatFormFieldAppearance;
    /** ID for the DOM node containing the paginator's items per page label. */
    readonly _pageSizeLabelId: string;
    constructor(intl: MatPaginatorIntl, changeDetectorRef: ChangeDetectorRef, defaults?: MatPaginatorDefaultOptions);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPaginator, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatPaginator, "mat-paginator", ["matPaginator"], { "disabled": "disabled"; }, {}, never, never, false>;
}

/** Object that can be used to configure the default options for the paginator module. */
export declare interface MatPaginatorDefaultOptions {
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

export { MatPaginatorIntl }

export declare class MatPaginatorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPaginatorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatPaginatorModule, [typeof i1.MatPaginator], [typeof i2.CommonModule, typeof i3.MatButtonModule, typeof i4.MatSelectModule, typeof i5.MatTooltipModule], [typeof i1.MatPaginator]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatPaginatorModule>;
}

export { MatPaginatorSelectConfig }

export { PageEvent }

export { }
