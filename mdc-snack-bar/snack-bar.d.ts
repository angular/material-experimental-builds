import { MatSnackBar as BaseMatSnackBar } from '@angular/material/snack-bar';
import { MatSimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
import * as i0 from "@angular/core";
/**
 * Service to dispatch Material Design snack bar messages.
 */
export declare class MatSnackBar extends BaseMatSnackBar {
    protected simpleSnackBarComponent: typeof MatSimpleSnackBar;
    protected snackBarContainerComponent: typeof MatSnackBarContainer;
    protected handsetCssClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSnackBar, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatSnackBar>;
}
