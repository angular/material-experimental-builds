/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { _MatAutocompleteTriggerBase } from '@angular/material/autocomplete';
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export declare const MAT_AUTOCOMPLETE_VALUE_ACCESSOR: any;
export declare class MatAutocompleteTrigger extends _MatAutocompleteTriggerBase {
    protected _aboveClass: string;
    protected _scrollToOption(index: number): void;
}
