/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatSnackBar as BaseMatSnackBar } from '@angular/material/snack-bar';
import { MatSimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
/**
 * Service to dispatch Material Design snack bar messages.
 */
export declare class MatSnackBar extends BaseMatSnackBar {
    protected simpleSnackBarComponent: typeof MatSimpleSnackBar;
    protected snackBarContainerComponent: typeof MatSnackBarContainer;
    protected handsetCssClass: string;
}
