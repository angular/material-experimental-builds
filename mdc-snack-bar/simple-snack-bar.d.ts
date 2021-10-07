import { TextOnlySnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
export declare class MatSimpleSnackBar implements TextOnlySnackBar {
    snackBarRef: MatSnackBarRef<SimpleSnackBar>;
    data: {
        message: string;
        action: string;
    };
    constructor(snackBarRef: MatSnackBarRef<SimpleSnackBar>, data: {
        message: string;
        action: string;
    });
    /** Performs the action on the snack bar. */
    action(): void;
    /** If the action button should be shown. */
    get hasAction(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSimpleSnackBar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSimpleSnackBar, "mat-simple-snack-bar", ["matSnackBar"], {}, {}, never, never>;
}
