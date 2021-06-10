import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, ElementRef, NgZone, Optional, ViewChild, Directive, NgModule, Injectable } from '@angular/core';
import * as i4 from '@angular/material/snack-bar';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBarConfig, MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';
export { MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS, MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar, matSnackBarAnimations } from '@angular/material/snack-bar';
import { BasePortalOutlet, CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCSnackbarFoundation } from '@material/snackbar';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import * as i1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material-experimental/mdc-button';
import { MatCommonModule } from '@angular/material-experimental/mdc-core';
import * as i2 from '@angular/cdk/a11y';
import * as i3 from '@angular/cdk/layout';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatSimpleSnackBar {
    constructor(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    /** Performs the action on the snack bar. */
    action() {
        this.snackBarRef.dismissWithAction();
    }
    /** If the action button should be shown. */
    get hasAction() {
        return !!this.data.action;
    }
}
MatSimpleSnackBar.decorators = [
    { type: Component, args: [{
                selector: 'mat-simple-snack-bar',
                template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"hasAction\">\n  <button mat-button matSnackBarAction (click)=\"action()\">\n    {{data.action}}\n  </button>\n</div>\n",
                exportAs: 'matSnackBar',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'mat-mdc-simple-snack-bar',
                },
                styles: [".mat-mdc-simple-snack-bar{display:flex}\n"]
            },] }
];
MatSimpleSnackBar.ctorParameters = () => [
    { type: MatSnackBarRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_SNACK_BAR_DATA,] }] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The MDC label class that should wrap the label content of the snack bar.
 * @docs-private
 */
const MDC_SNACKBAR_LABEL_CLASS = 'mdc-snackbar__label';
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
class MatSnackBarContainer extends BasePortalOutlet {
    constructor(_elementRef, snackBarConfig, _platform, _ngZone, _animationMode) {
        super();
        this._elementRef = _elementRef;
        this.snackBarConfig = snackBarConfig;
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._animationMode = _animationMode;
        /** The number of milliseconds to wait before announcing the snack bar's content. */
        this._announceDelay = 150;
        /** Subject for notifying that the snack bar has announced to screen readers. */
        this._onAnnounce = new Subject();
        /** Subject for notifying that the snack bar has exited from view. */
        this._onExit = new Subject();
        /** Subject for notifying that the snack bar has finished entering the view. */
        this._onEnter = new Subject();
        /** Whether the snack bar is currently exiting. */
        this._exiting = false;
        this._mdcAdapter = {
            addClass: (className) => this._setClass(className, true),
            removeClass: (className) => this._setClass(className, false),
            announce: () => { },
            notifyClosed: () => {
                this._onExit.next();
                this._mdcFoundation.destroy();
            },
            notifyClosing: () => { },
            notifyOpened: () => this._onEnter.next(),
            notifyOpening: () => { },
        };
        this._mdcFoundation = new MDCSnackbarFoundation(this._mdcAdapter);
        // Use aria-live rather than a live role like 'alert' or 'status'
        // because NVDA and JAWS have show inconsistent behavior with live roles.
        if (snackBarConfig.politeness === 'assertive' && !snackBarConfig.announcementMessage) {
            this._live = 'assertive';
        }
        else if (snackBarConfig.politeness === 'off') {
            this._live = 'off';
        }
        else {
            this._live = 'polite';
        }
        // Only set role for Firefox. Set role based on aria-live because setting role="alert" implies
        // aria-live="assertive" which may cause issues if aria-live is set to "polite" above.
        if (this._platform.FIREFOX) {
            if (this._live === 'polite') {
                this._role = 'status';
            }
            if (this._live === 'assertive') {
                this._role = 'alert';
            }
        }
        // `MatSnackBar` will use the config's timeout to determine when the snack bar should be closed.
        // Set this to `-1` to mark it as indefinitely open so that MDC does not close itself.
        this._mdcFoundation.setTimeoutMs(-1);
    }
    ngAfterViewChecked() {
        // Check to see if the attached component or template uses the MDC template structure,
        // specifically the MDC label. If not, the container should apply the MDC label class to this
        // component's label container, which will apply MDC's label styles to the attached view.
        if (!this._label.nativeElement.querySelector(`.${MDC_SNACKBAR_LABEL_CLASS}`)) {
            this._label.nativeElement.classList.add(MDC_SNACKBAR_LABEL_CLASS);
        }
        else {
            this._label.nativeElement.classList.remove(MDC_SNACKBAR_LABEL_CLASS);
        }
    }
    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    ngOnDestroy() {
        this._mdcFoundation.close();
    }
    enter() {
        // MDC uses some browser APIs that will throw during server-side rendering.
        if (this._platform.isBrowser) {
            this._mdcFoundation.open();
            this._screenReaderAnnounce();
        }
    }
    exit() {
        this._exiting = true;
        this._mdcFoundation.close();
        // If the snack bar hasn't been announced by the time it exits it wouldn't have been open
        // long enough to visually read it either, so clear the timeout for announcing.
        clearTimeout(this._announceTimeoutId);
        return this._onExit;
    }
    /** Attach a component portal as content to this snack bar container. */
    attachComponentPortal(portal) {
        this._assertNotAttached();
        this._applySnackBarClasses();
        return this._portalOutlet.attachComponentPortal(portal);
    }
    /** Attach a template portal as content to this snack bar container. */
    attachTemplatePortal(portal) {
        this._assertNotAttached();
        this._applySnackBarClasses();
        return this._portalOutlet.attachTemplatePortal(portal);
    }
    _setClass(cssClass, active) {
        const classList = this._elementRef.nativeElement.classList;
        active ? classList.add(cssClass) : classList.remove(cssClass);
    }
    /** Applies the user-configured CSS classes to the snack bar. */
    _applySnackBarClasses() {
        const panelClasses = this.snackBarConfig.panelClass;
        if (panelClasses) {
            if (Array.isArray(panelClasses)) {
                // Note that we can't use a spread here, because IE doesn't support multiple arguments.
                panelClasses.forEach(cssClass => this._setClass(cssClass, true));
            }
            else {
                this._setClass(panelClasses, true);
            }
        }
    }
    /** Asserts that no content is already attached to the container. */
    _assertNotAttached() {
        if (this._portalOutlet.hasAttached() && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('Attempting to attach snack bar content after content is already attached');
        }
    }
    /**
     * Starts a timeout to move the snack bar content to the live region so screen readers will
     * announce it.
     */
    _screenReaderAnnounce() {
        if (!this._announceTimeoutId) {
            this._ngZone.runOutsideAngular(() => {
                this._announceTimeoutId = setTimeout(() => {
                    const inertElement = this._elementRef.nativeElement.querySelector('[aria-hidden]');
                    const liveElement = this._elementRef.nativeElement.querySelector('[aria-live]');
                    if (inertElement && liveElement) {
                        // If an element in the snack bar content is focused before being moved
                        // track it and restore focus after moving to the live region.
                        let focusedElement = null;
                        if (document.activeElement instanceof HTMLElement &&
                            inertElement.contains(document.activeElement)) {
                            focusedElement = document.activeElement;
                        }
                        inertElement.removeAttribute('aria-hidden');
                        liveElement.appendChild(inertElement);
                        focusedElement === null || focusedElement === void 0 ? void 0 : focusedElement.focus();
                        this._onAnnounce.next();
                        this._onAnnounce.complete();
                    }
                }, this._announceDelay);
            });
        }
    }
}
MatSnackBarContainer.decorators = [
    { type: Component, args: [{
                selector: 'mat-mdc-snack-bar-container',
                template: "<div class=\"mdc-snackbar__surface\" #surface>\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\" [attr.role]=\"_role\"></div>\n  </div>\n</div>\n",
                // In Ivy embedded views will be change detected from their declaration place, rather than
                // where they were stamped out. This means that we can't have the snack bar container be OnPush,
                // because it might cause snack bars that were opened from a template not to be out of date.
                // tslint:disable-next-line:validate-decorators
                changeDetection: ChangeDetectionStrategy.Default,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'mdc-snackbar mat-mdc-snack-bar-container',
                    '[class.mat-snack-bar-container]': 'false',
                    // Mark this element with a 'mat-exit' attribute to indicate that the snackbar has
                    // been dismissed and will soon be removed from the DOM. This is used by the snackbar
                    // test harness.
                    '[attr.mat-exit]': `_exiting ? '' : null`,
                    '[class._mat-animation-noopable]': `_animationMode === 'NoopAnimations'`,
                },
                styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused .mdc-icon-button__ripple::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus .mdc-icon-button__ripple::before{transition-duration:75ms}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded) .mdc-icon-button__ripple::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active .mdc-icon-button__ripple::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:6px;font-size:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-container._mat-animation-noopable .mdc-snackbar__surface{transition:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}\n"]
            },] }
];
MatSnackBarContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: MatSnackBarConfig },
    { type: Platform },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatSnackBarContainer.propDecorators = {
    _portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }],
    _surface: [{ type: ViewChild, args: ['surface', { static: true },] }],
    _label: [{ type: ViewChild, args: ['label', { static: true },] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Directive that should be applied to the text element to be rendered in the snack bar. */
class MatSnackBarLabel {
}
MatSnackBarLabel.decorators = [
    { type: Directive, args: [{
                selector: `[matSnackBarLabel]`,
                host: {
                    'class': 'mat-mdc-snack-bar-label mdc-snackbar__label',
                }
            },] }
];
/** Directive that should be applied to the element containing the snack bar's action buttons. */
class MatSnackBarActions {
}
MatSnackBarActions.decorators = [
    { type: Directive, args: [{
                selector: `[matSnackBarActions]`,
                host: {
                    'class': 'mat-mdc-snack-bar-actions mdc-snackbar__actions',
                }
            },] }
];
/** Directive that should be applied to each of the snack bar's action buttons. */
class MatSnackBarAction {
}
MatSnackBarAction.decorators = [
    { type: Directive, args: [{
                selector: `[matSnackBarAction]`,
                host: {
                    'class': 'mat-mdc-snack-bar-action mdc-snackbar__action',
                }
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatSnackBarModule {
}
MatSnackBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    PortalModule,
                    CommonModule,
                    MatButtonModule,
                    MatCommonModule,
                ],
                exports: [
                    MatCommonModule,
                    MatSnackBarContainer,
                    MatSnackBarLabel,
                    MatSnackBarActions,
                    MatSnackBarAction,
                ],
                declarations: [
                    MatSimpleSnackBar,
                    MatSnackBarContainer,
                    MatSnackBarLabel,
                    MatSnackBarActions,
                    MatSnackBarAction,
                ],
                entryComponents: [
                    MatSimpleSnackBar,
                    MatSnackBarContainer,
                ],
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Service to dispatch Material Design snack bar messages.
 */
class MatSnackBar extends MatSnackBar$1 {
    constructor() {
        super(...arguments);
        this.simpleSnackBarComponent = MatSimpleSnackBar;
        this.snackBarContainerComponent = MatSnackBarContainer;
        this.handsetCssClass = 'mat-mdc-snack-bar-handset';
    }
}
MatSnackBar.ɵprov = i0.ɵɵdefineInjectable({ factory: function MatSnackBar_Factory() { return new MatSnackBar(i0.ɵɵinject(i1.Overlay), i0.ɵɵinject(i2.LiveAnnouncer), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i3.BreakpointObserver), i0.ɵɵinject(i4.MatSnackBar, 12), i0.ɵɵinject(i4.MAT_SNACK_BAR_DEFAULT_OPTIONS)); }, token: MatSnackBar, providedIn: MatSnackBarModule });
MatSnackBar.decorators = [
    { type: Injectable, args: [{ providedIn: MatSnackBarModule },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatSimpleSnackBar, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarContainer, MatSnackBarLabel, MatSnackBarModule };
//# sourceMappingURL=mdc-snack-bar.js.map
