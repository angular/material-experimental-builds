/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OverlayRef } from '@angular/cdk/overlay';
import { MatDialogRef as NonMdcDialogRef } from '@angular/material/dialog';
import { MatDialogContainer } from './dialog-container';
/**
 * Reference to a dialog opened via the MatDialog service.
 */
export declare class MatDialogRef<T, R = any> extends NonMdcDialogRef<T, R> {
    constructor(overlayRef: OverlayRef, containerInstance: MatDialogContainer, id?: string);
}
