/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { QueryList } from '@angular/core';
import { MatOptgroup, MatOption } from '@angular/material-experimental/mdc-core';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import * as i0 from "@angular/core";
export declare class MatAutocomplete extends _MatAutocompleteBase {
    /** Reference to all option groups within the autocomplete. */
    optionGroups: QueryList<MatOptgroup>;
    /** Reference to all options within the autocomplete. */
    options: QueryList<MatOption>;
    protected _visibleClass: string;
    protected _hiddenClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatAutocomplete, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatAutocomplete, "mat-autocomplete", ["matAutocomplete"], { "disableRipple": "disableRipple"; }, {}, ["optionGroups", "options"], ["*"]>;
}
