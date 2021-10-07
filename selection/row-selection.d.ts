import { CdkRowSelection } from '@angular/cdk-experimental/selection';
import * as i0 from "@angular/core";
/**
 * Applies `mat-selected` class and `aria-selected` to an element.
 *
 * Must be used within a parent `MatSelection` directive.
 * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
 * directive.
 */
export declare class MatRowSelection<T> extends CdkRowSelection<T> {
    /** The value that is associated with the row */
    value: T;
    /** The index of the value in the list. Required when used with `trackBy` */
    get index(): number | undefined;
    set index(index: number | undefined);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRowSelection<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRowSelection<any>, "[matRowSelection]", never, { "value": "matRowSelectionValue"; "index": "matRowSelectionIndex"; }, {}, never>;
}
