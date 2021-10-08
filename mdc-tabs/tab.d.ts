/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TemplateRef } from '@angular/core';
import { MatTab as BaseMatTab } from '@angular/material/tabs';
import { MatTabLabel } from './tab-label';
import * as i0 from "@angular/core";
export declare class MatTab extends BaseMatTab {
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     */
    _explicitContent: TemplateRef<any>;
    /** Content for the tab label given by `<ng-template mat-tab-label>`. */
    get templateLabel(): MatTabLabel;
    set templateLabel(value: MatTabLabel);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTab, "mat-tab", ["matTab"], { "disabled": "disabled"; }, {}, ["_explicitContent", "templateLabel"], ["*"]>;
}
