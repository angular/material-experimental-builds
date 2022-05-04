import { AriaLivePoliteness } from '@angular/cdk/a11y';
import { BasePortalOutlet } from '@angular/cdk/portal';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EmbeddedViewRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i4 from '@angular/cdk/overlay';
import * as i5 from '@angular/cdk/portal';
import * as i6 from '@angular/common';
import * as i7 from '@angular/material-experimental/mdc-button';
import * as i8 from '@angular/material-experimental/mdc-core';
import { Injector } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY } from '@angular/material/snack-bar';
import { matSnackBarAnimations } from '@angular/material/snack-bar';
import { _MatSnackBarBase } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MDCSnackbarFoundation } from '@material/snackbar';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { _SnackBarContainer } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextOnlySnackBar } from '@angular/material/snack-bar';

declare namespace i1 {
    export {
        SimpleSnackBar
    }
}

declare namespace i2 {
    export {
        MatSnackBarContainer
    }
}

declare namespace i3 {
    export {
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction
    }
}

export { MAT_SNACK_BAR_DATA }

export { MAT_SNACK_BAR_DEFAULT_OPTIONS }

export { MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY }

/**
 * Service to dispatch Material Design snack bar messages.
 */
export declare class MatSnackBar extends _MatSnackBarBase {
    protected simpleSnackBarComponent: typeof SimpleSnackBar;
    protected snackBarContainerComponent: typeof MatSnackBarContainer;
    protected handsetCssClass: string;
    constructor(overlay: Overlay, live: LiveAnnouncer, injector: Injector, breakpointObserver: BreakpointObserver, parentSnackBar: MatSnackBar, defaultConfig: MatSnackBarConfig);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSnackBar, [null, null, null, null, { optional: true; skipSelf: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatSnackBar>;
}

/** Directive that should be applied to each of the snack bar's action buttons. */
export declare class MatSnackBarAction {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSnackBarAction, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSnackBarAction, "[matSnackBarAction]", never, {}, {}, never, never, false>;
}

/** Directive that should be applied to the element containing the snack bar's action buttons. */
export declare class MatSnackBarActions {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSnackBarActions, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSnackBarActions, "[matSnackBarActions]", never, {}, {}, never, never, false>;
}

export { matSnackBarAnimations }

export { MatSnackBarConfig }

/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
export declare class MatSnackBarContainer extends BasePortalOutlet implements _SnackBarContainer, OnDestroy {
    private _elementRef;
    snackBarConfig: MatSnackBarConfig;
    private _platform;
    private _ngZone;
    _animationMode?: string | undefined;
    /** The number of milliseconds to wait before announcing the snack bar's content. */
    private readonly _announceDelay;
    /** The timeout for announcing the snack bar's content. */
    private _announceTimeoutId;
    /** Subject for notifying that the snack bar has announced to screen readers. */
    readonly _onAnnounce: Subject<void>;
    /** Subject for notifying that the snack bar has exited from view. */
    readonly _onExit: Subject<void>;
    /** Subject for notifying that the snack bar has finished entering the view. */
    readonly _onEnter: Subject<void>;
    /** aria-live value for the live region. */
    _live: AriaLivePoliteness;
    /** Whether the snack bar is currently exiting. */
    _exiting: boolean;
    /**
     * Role of the live region. This is only for Firefox as there is a known issue where Firefox +
     * JAWS does not read out aria-live message.
     */
    _role?: 'status' | 'alert';
    private _mdcAdapter;
    _mdcFoundation: MDCSnackbarFoundation;
    /** The portal outlet inside of this container into which the snack bar content will be loaded. */
    _portalOutlet: CdkPortalOutlet;
    /** Element that acts as the MDC surface container which should contain the label and actions. */
    _surface: ElementRef;
    /**
     * Element that will have the `mdc-snackbar__label` class applied if the attached component
     * or template does not have it. This ensures that the appropriate structure, typography, and
     * color is applied to the attached view.
     */
    _label: ElementRef;
    constructor(_elementRef: ElementRef<HTMLElement>, snackBarConfig: MatSnackBarConfig, _platform: Platform, _ngZone: NgZone, _animationMode?: string | undefined);
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    ngOnDestroy(): void;
    enter(): void;
    exit(): Observable<void>;
    /** Attach a component portal as content to this snack bar container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /** Attach a template portal as content to this snack bar container. */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    private _setClass;
    /** Applies the user-configured CSS classes to the snack bar. */
    private _applySnackBarClasses;
    /** Asserts that no content is already attached to the container. */
    private _assertNotAttached;
    /** Finishes the exit sequence of the container. */
    private _finishExit;
    /**
     * Starts a timeout to move the snack bar content to the live region so screen readers will
     * announce it.
     */
    private _screenReaderAnnounce;
    /** Applies the correct CSS class to the label based on its content. */
    private _applyLabelClass;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSnackBarContainer, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSnackBarContainer, "mat-snack-bar-container", never, {}, {}, never, never, false>;
}

export { MatSnackBarDismiss }

export { MatSnackBarHorizontalPosition }

/** Directive that should be applied to the text element to be rendered in the snack bar. */
export declare class MatSnackBarLabel {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSnackBarLabel, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSnackBarLabel, "[matSnackBarLabel]", never, {}, {}, never, never, false>;
}

export declare class MatSnackBarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSnackBarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatSnackBarModule, [typeof i1.SimpleSnackBar, typeof i2.MatSnackBarContainer, typeof i3.MatSnackBarLabel, typeof i3.MatSnackBarActions, typeof i3.MatSnackBarAction], [typeof i4.OverlayModule, typeof i5.PortalModule, typeof i6.CommonModule, typeof i7.MatButtonModule, typeof i8.MatCommonModule], [typeof i8.MatCommonModule, typeof i2.MatSnackBarContainer, typeof i3.MatSnackBarLabel, typeof i3.MatSnackBarActions, typeof i3.MatSnackBarAction]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatSnackBarModule>;
}

export { MatSnackBarRef }

export { MatSnackBarVerticalPosition }

export declare class SimpleSnackBar implements TextOnlySnackBar {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleSnackBar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SimpleSnackBar, "simple-snack-bar", ["matSnackBar"], {}, {}, never, never, false>;
}

export { TextOnlySnackBar }

export { }
