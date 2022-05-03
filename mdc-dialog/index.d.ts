import { AutoFocusTarget } from '@angular/material/dialog';
import { DialogPosition } from '@angular/material/dialog';
import { DialogRole } from '@angular/material/dialog';
import { ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import * as i3 from '@angular/cdk/dialog';
import * as i4 from '@angular/cdk/overlay';
import * as i5 from '@angular/cdk/portal';
import * as i6 from '@angular/material-experimental/mdc-core';
import { InjectionToken } from '@angular/core';
import { Injector } from '@angular/core';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { Location as Location_2 } from '@angular/common';
import { MAT_DIALOG_SCROLL_STRATEGY_FACTORY } from '@angular/material/dialog';
import { matDialogAnimations } from '@angular/material/dialog';
import { _MatDialogBase } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { _MatDialogContainerBase } from '@angular/material/dialog';
import { MatDialogRef as MatDialogRef_2 } from '@angular/material/dialog';
import { MatDialogState } from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { OverlayContainer } from '@angular/cdk/overlay';
import { OverlayRef } from '@angular/cdk/overlay';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { SimpleChanges } from '@angular/core';

export { AutoFocusTarget }

export { DialogPosition }

export { DialogRole }

declare namespace i1 {
    export {
        MatDialogContainer
    }
}

declare namespace i2 {
    export {
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions
    }
}

/** Injection token that can be used to access the data that was passed in to a dialog. */
export declare const MAT_DIALOG_DATA: InjectionToken<any>;

/** Injection token that can be used to specify default dialog options. */
export declare const MAT_DIALOG_DEFAULT_OPTIONS: InjectionToken<MatDialogConfig<any>>;

/** Injection token that determines the scroll handling while the dialog is open. */
export declare const MAT_DIALOG_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;

export { MAT_DIALOG_SCROLL_STRATEGY_FACTORY }

/** @docs-private */
export declare const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
};

/** @docs-private */
export declare function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy;

/**
 * Service to open Material Design modal dialogs.
 */
export declare class MatDialog extends _MatDialogBase<MatDialogContainer> {
    constructor(overlay: Overlay, injector: Injector, 
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    location: Location_2, defaultOptions: MatDialogConfig, scrollStrategy: any, parentDialog: MatDialog, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 15.0.0
     */
    overlayContainer: OverlayContainer, 
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 14.0.0
     */
    animationMode?: 'NoopAnimations' | 'BrowserAnimations');
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialog, [null, null, { optional: true; }, { optional: true; }, null, { optional: true; skipSelf: true; }, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatDialog>;
}

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export declare class MatDialogActions {
    /**
     * Horizontal alignment of action buttons.
     */
    align?: 'start' | 'center' | 'end';
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogActions, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogActions, "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", never, { "align": "align"; }, {}, never, never, false>;
}

export { matDialogAnimations }

/**
 * Button that will close the current dialog.
 */
export declare class MatDialogClose implements OnInit, OnChanges {
    dialogRef: MatDialogRef<any>;
    private _elementRef;
    private _dialog;
    /** Screenreader label for the button. */
    ariaLabel: string;
    /** Default to "button" to prevents accidental form submits. */
    type: 'submit' | 'button' | 'reset';
    /** Dialog close input. */
    dialogResult: any;
    _matDialogClose: any;
    constructor(dialogRef: MatDialogRef<any>, _elementRef: ElementRef<HTMLElement>, _dialog: MatDialog);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _onButtonClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogClose, [{ optional: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogClose, "[mat-dialog-close], [matDialogClose]", ["matDialogClose"], { "ariaLabel": "aria-label"; "type": "type"; "dialogResult": "mat-dialog-close"; "_matDialogClose": "matDialogClose"; }, {}, never, never, false>;
}

export { MatDialogConfig }

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
    constructor(elementRef: ElementRef, focusTrapFactory: FocusTrapFactory, document: any, dialogConfig: MatDialogConfig, checker: InteractivityChecker, ngZone: NgZone, overlayRef: OverlayRef, _animationMode?: string | undefined, focusMonitor?: FocusMonitor);
    protected _contentAttached(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogContainer, [null, null, { optional: true; }, null, null, null, null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatDialogContainer, "mat-dialog-container", never, {}, {}, never, never, false>;
}

/**
 * Scrollable content container of a dialog.
 */
export declare class MatDialogContent {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogContent, "[mat-dialog-content], mat-dialog-content, [matDialogContent]", never, {}, {}, never, never, false>;
}

export declare class MatDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatDialogModule, [typeof i1.MatDialogContainer, typeof i2.MatDialogClose, typeof i2.MatDialogTitle, typeof i2.MatDialogActions, typeof i2.MatDialogContent], [typeof i3.DialogModule, typeof i4.OverlayModule, typeof i5.PortalModule, typeof i6.MatCommonModule], [typeof i1.MatDialogContainer, typeof i2.MatDialogClose, typeof i2.MatDialogTitle, typeof i2.MatDialogContent, typeof i2.MatDialogActions, typeof i6.MatCommonModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatDialogModule>;
}

/**
 * Reference to a dialog opened via the MatDialog service.
 */
export declare class MatDialogRef<T, R = any> extends MatDialogRef_2<T, R> {
}

export { MatDialogState }

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
export declare class MatDialogTitle implements OnInit {
    private _dialogRef;
    private _elementRef;
    private _dialog;
    id: string;
    constructor(_dialogRef: MatDialogRef<any>, _elementRef: ElementRef<HTMLElement>, _dialog: MatDialog);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogTitle, [{ optional: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogTitle, "[mat-dialog-title], [matDialogTitle]", ["matDialogTitle"], { "id": "id"; }, {}, never, never, false>;
}

export { }
