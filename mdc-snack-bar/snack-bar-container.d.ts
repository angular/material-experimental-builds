/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { AfterViewChecked, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy } from '@angular/core';
import { MatSnackBarConfig, SnackBarContainer } from '@angular/material/snack-bar';
import { MDCSnackbarFoundation } from '@material/snackbar';
import { Observable, Subject } from 'rxjs';
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
export declare class MatSnackBarContainer extends BasePortalOutlet implements SnackBarContainer, AfterViewChecked, OnDestroy {
    private _elementRef;
    snackBarConfig: MatSnackBarConfig;
    /** Subject for notifying that the snack bar has exited from view. */
    readonly _onExit: Subject<void>;
    /** Subject for notifying that the snack bar has finished entering the view. */
    readonly _onEnter: Subject<void>;
    /** ARIA role for the snack bar container. */
    _role: 'alert' | 'status' | null;
    /** Whether the snack bar is currently exiting. */
    _exiting: boolean;
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
    constructor(_elementRef: ElementRef<HTMLElement>, snackBarConfig: MatSnackBarConfig);
    ngAfterViewChecked(): void;
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
}
