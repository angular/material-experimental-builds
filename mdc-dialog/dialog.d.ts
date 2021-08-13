/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Overlay, OverlayContainer, ScrollStrategy } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { InjectionToken, Injector } from '@angular/core';
import { _MatDialogBase, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogContainer } from './dialog-container';
/** Injection token that can be used to access the data that was passed in to a dialog. */
export declare const MAT_DIALOG_DATA: InjectionToken<any>;
/** Injection token that can be used to specify default dialog options. */
export declare const MAT_DIALOG_DEFAULT_OPTIONS: InjectionToken<MatDialogConfig<any>>;
/** Injection token that determines the scroll handling while the dialog is open. */
export declare const MAT_DIALOG_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy;
/** @docs-private */
export declare const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
};
/**
 * Service to open Material Design modal dialogs.
 */
export declare class MatDialog extends _MatDialogBase<MatDialogContainer> {
    constructor(overlay: Overlay, injector: Injector, 
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    location: Location, defaultOptions: MatDialogConfig, scrollStrategy: any, parentDialog: MatDialog, overlayContainer: OverlayContainer, animationMode?: 'NoopAnimations' | 'BrowserAnimations');
}
