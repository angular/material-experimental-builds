/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentType } from '@angular/cdk/overlay';
import { _MatTestDialogOpenerBase } from '@angular/material/dialog/testing';
import { MatDialog, MatDialogContainer, MatDialogConfig } from '@angular/material-experimental/mdc-dialog';
/** Test component that immediately opens a dialog when bootstrapped. */
export declare class MatTestDialogOpener<T = unknown, R = unknown> extends _MatTestDialogOpenerBase<MatDialogContainer, T, R> {
    constructor(dialog: MatDialog);
    /** Static method that prepares this class to open the provided component. */
    static withComponent<T = unknown, R = unknown>(component: ComponentType<T>, config?: MatDialogConfig): ComponentType<MatTestDialogOpener<T, R>>;
}
export declare class MatTestDialogOpenerModule {
}
