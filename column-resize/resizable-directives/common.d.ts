/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
import { Resizable } from '@angular/cdk-experimental/column-resize';
import { MatColumnResizeOverlayHandle } from '../overlay-handle';
export declare abstract class AbstractMatResizable extends Resizable<MatColumnResizeOverlayHandle> {
    minWidthPxInternal: number;
    protected getInlineHandleCssClassName(): string;
    protected getOverlayHandleComponentType(): Type<MatColumnResizeOverlayHandle>;
}
export declare const RESIZABLE_HOST_BINDINGS: {
    class: string;
};
export declare const RESIZABLE_INPUTS: string[];
