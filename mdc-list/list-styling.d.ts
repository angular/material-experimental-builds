/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListOption } from './list-option-types';
/**
 * MDC uses the very intuitively named classes `.mdc-deprecated-list-item__graphic` and
 * `.mat-list-item__meta` to position content such as icons or checkboxes that comes either before
 * or after the text content respectively. This directive detects the placement of the checkbox and
 * applies the correct MDC class to position the icon/avatar on the opposite side.
 * @docs-private
 */
export declare class MatListGraphicAlignmentStyler {
    _listOption: ListOption;
    constructor(_listOption: ListOption);
    _isAlignedAtStart(): boolean;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListAvatarCssMatStyler {
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListIconCssMatStyler {
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListSubheaderCssMatStyler {
}
