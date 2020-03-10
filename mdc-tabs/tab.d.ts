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
export declare class MatTab extends BaseMatTab {
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     */
    _explicitContent: TemplateRef<any>;
    /** Content for the tab label given by `<ng-template mat-tab-label>`. */
    templateLabel: MatTabLabel;
}
