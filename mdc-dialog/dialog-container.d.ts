/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor, FocusTrapFactory, InteractivityChecker } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { MatDialogConfig, _MatDialogContainerBase } from '@angular/material/dialog';
import * as i0 from "@angular/core";
/**
 * Internal component that wraps user-provided dialog content in a MDC dialog.
 * @docs-private
 */
export declare class MatDialogContainer extends _MatDialogContainerBase implements OnDestroy {
    private _animationMode?;
    /** Whether animations are enabled. */
    _animationsEnabled: boolean;
    /** Host element of the dialog container component. */
    private _hostElement;
    /** Duration of the dialog open animation. */
    private _openAnimationDuration;
    /** Duration of the dialog close animation. */
    private _closeAnimationDuration;
    /** Current timer for dialog animations. */
    private _animationTimer;
    constructor(elementRef: ElementRef, focusTrapFactory: FocusTrapFactory, changeDetectorRef: ChangeDetectorRef, document: any, config: MatDialogConfig, checker: InteractivityChecker, ngZone: NgZone, _animationMode?: string | undefined, focusMonitor?: FocusMonitor);
    _initializeWithAttachedContent(): void;
    ngOnDestroy(): void;
    /** Starts the dialog open animation if enabled. */
    private _startOpenAnimation;
    /**
     * Starts the exit animation of the dialog if enabled. This method is
     * called by the dialog ref.
     */
    _startExitAnimation(): void;
    /**
     * Completes the dialog open by clearing potential animation classes, trapping
     * focus and emitting an opened event.
     */
    private _finishDialogOpen;
    /**
     * Completes the dialog close by clearing potential animation classes, restoring
     * focus and emitting a closed event.
     */
    private _finishDialogClose;
    /** Clears all dialog animation classes. */
    private _clearAnimationClasses;
    private _waitForAnimationToComplete;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogContainer, [null, null, null, { optional: true; }, null, null, null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatDialogContainer, "mat-dialog-container", never, {}, {}, never, never, false>;
}
