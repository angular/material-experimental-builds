import { ListOption } from './list-option-types';
import * as i0 from "@angular/core";
/**
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
 * to position content such as icons or checkboxes that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 * @docs-private
 */
export declare class MatListGraphicAlignmentStyler {
    _listOption: ListOption;
    constructor(_listOption: ListOption);
    _isAlignedAtStart(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListGraphicAlignmentStyler, [{ optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListGraphicAlignmentStyler, "[mat-list-avatar], [matListAvatar], [mat-list-icon], [matListIcon]", never, {}, {}, never>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListAvatarCssMatStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListAvatarCssMatStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListAvatarCssMatStyler, "[mat-list-avatar], [matListAvatar]", never, {}, {}, never>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListIconCssMatStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListIconCssMatStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListIconCssMatStyler, "[mat-list-icon], [matListIcon]", never, {}, {}, never>;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MatListSubheaderCssMatStyler {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListSubheaderCssMatStyler, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListSubheaderCssMatStyler, "[mat-subheader], [matSubheader]", never, {}, {}, never>;
}
