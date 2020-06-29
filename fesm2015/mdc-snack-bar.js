import { Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, ElementRef, ViewChild, Directive, NgModule, ɵɵdefineInjectable, ɵɵinject, INJECTOR, Injectable } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBarConfig, MatSnackBar as MatSnackBar$1, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
export { MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { BasePortalOutlet, CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';
import { MDCSnackbarFoundation } from '@material/snackbar';
import { Subject } from 'rxjs';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatSimpleSnackBar = /** @class */ (() => {
    class MatSimpleSnackBar {
        constructor(snackBarRef, data) {
            this.snackBarRef = snackBarRef;
            this.data = data;
        }
    }
    MatSimpleSnackBar.decorators = [
        { type: Component, args: [{
                    selector: 'mat-simple-snack-bar',
                    template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n<div matSnackBarActions *ngIf=\"data.action\">\n  <button mat-button matSnackBarAction (click)=\"snackBarRef.dismissWithAction()\">\n    {{data.action}}\n  </button>\n</div>\n",
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
    return MatSimpleSnackBar;
})();

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
let MatSnackBarContainer = /** @class */ (() => {
    class MatSnackBarContainer extends BasePortalOutlet {
        constructor(_elementRef, snackBarConfig) {
            super();
            this._elementRef = _elementRef;
            this.snackBarConfig = snackBarConfig;
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
            // Based on the ARIA spec, `alert` and `status` roles have an
            // implicit `assertive` and `polite` politeness respectively.
            if (snackBarConfig.politeness === 'assertive' && !snackBarConfig.announcementMessage) {
                this._role = 'alert';
            }
            else if (snackBarConfig.politeness === 'off') {
                this._role = null;
            }
            else {
                this._role = 'status';
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
            this._mdcFoundation.open();
        }
        exit() {
            this._exiting = true;
            this._mdcFoundation.close();
            return this._onExit.asObservable();
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
            if (this._portalOutlet.hasAttached()) {
                throw Error('Attempting to attach snack bar content after content is already attached');
            }
        }
    }
    MatSnackBarContainer.decorators = [
        { type: Component, args: [{
                    selector: 'mat-mdc-snack-bar-container',
                    template: "<div class=\"mdc-snackbar__surface\" #surface>\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n",
                    // In Ivy embedded views will be change detected from their declaration place, rather than
                    // where they were stamped out. This means that we can't have the snack bar container be OnPush,
                    // because it might cause snack bars that were opened from a template not to be out of date.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.role]': '_role',
                        'class': 'mdc-snackbar mat-mdc-snack-bar-container',
                        '[class.mat-snack-bar-container]': 'false',
                        // Mark this element with a 'mat-exit' attribute to indicate that the snackbar has
                        // been dismissed and will soon be removed from the DOM. This is used by the snackbar
                        // test harness.
                        '[attr.mat-exit]': `_exiting ? '' : null`,
                    },
                    styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:0;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:0;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1}\n"]
                },] }
    ];
    MatSnackBarContainer.ctorParameters = () => [
        { type: ElementRef },
        { type: MatSnackBarConfig }
    ];
    MatSnackBarContainer.propDecorators = {
        _portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }],
        _surface: [{ type: ViewChild, args: ['surface', { static: true },] }],
        _label: [{ type: ViewChild, args: ['label', { static: true },] }]
    };
    return MatSnackBarContainer;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Directive that should be applied to the text element to be rendered in the snack bar. */
let MatSnackBarLabel = /** @class */ (() => {
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
    return MatSnackBarLabel;
})();
/** Directive that should be applied to the element containing the snack bar's action buttons. */
let MatSnackBarActions = /** @class */ (() => {
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
    return MatSnackBarActions;
})();
/** Directive that should be applied to each of the snack bar's action buttons. */
let MatSnackBarAction = /** @class */ (() => {
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
    return MatSnackBarAction;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MatSnackBarModule = /** @class */ (() => {
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
    return MatSnackBarModule;
})();

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
let MatSnackBar = /** @class */ (() => {
    class MatSnackBar extends MatSnackBar$1 {
        constructor() {
            super(...arguments);
            this.simpleSnackBarComponent = MatSimpleSnackBar;
            this.snackBarContainerComponent = MatSnackBarContainer;
            this.handsetCssClass = 'mat-mdc-snack-bar-handset';
        }
    }
    MatSnackBar.ɵprov = ɵɵdefineInjectable({ factory: function MatSnackBar_Factory() { return new MatSnackBar(ɵɵinject(Overlay), ɵɵinject(LiveAnnouncer), ɵɵinject(INJECTOR), ɵɵinject(BreakpointObserver), ɵɵinject(MatSnackBar$1, 12), ɵɵinject(MAT_SNACK_BAR_DEFAULT_OPTIONS)); }, token: MatSnackBar, providedIn: MatSnackBarModule });
    MatSnackBar.decorators = [
        { type: Injectable, args: [{ providedIn: MatSnackBarModule },] }
    ];
    return MatSnackBar;
})();

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
