/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCSnackbarFoundation } from '@material/snackbar';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
/**
 * The MDC label class that should wrap the label content of the snack bar.
 * @docs-private
 */
const MDC_SNACKBAR_LABEL_CLASS = 'mdc-snackbar__label';
/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
export class MatSnackBarContainer extends BasePortalOutlet {
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
                template: "<div class=\"mdc-snackbar__surface\" #surface>\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet></ng-template>\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\"></div>\n  </div>\n</div>\n",
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
                styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-container._mat-animation-noopable .mdc-snackbar__surface{transition:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zbmFjay1iYXItY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUdoQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFFVixNQUFNLEVBQ04sTUFBTSxFQUVOLFFBQVEsRUFDUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBcUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQXFCLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFekM7OztHQUdHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxxQkFBcUIsQ0FBQztBQUV2RDs7O0dBR0c7QUFxQkgsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQW1EeEQsWUFDWSxXQUFvQyxFQUNyQyxjQUFpQyxFQUNoQyxTQUFtQixFQUNuQixPQUFlLEVBQzJCLGNBQXVCO1FBQzNFLEtBQUssRUFBRSxDQUFDO1FBTEUsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3JDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNoQyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDMkIsbUJBQWMsR0FBZCxjQUFjLENB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LENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUM3QjtnQkFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUF0TUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLG9vQkFBdUM7Z0JBRXZDLDBGQUEwRjtnQkFDMUYsZ0dBQWdHO2dCQUNoRyw0RkFBNEY7Z0JBQzVGLCtDQUErQztnQkFDL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87Z0JBQ2hELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLDBDQUEwQztvQkFDbkQsaUNBQWlDLEVBQUUsT0FBTztvQkFDMUMsa0ZBQWtGO29CQUNsRixxRkFBcUY7b0JBQ3JGLGdCQUFnQjtvQkFDaEIsaUJBQWlCLEVBQUUsc0JBQXNCO29CQUN6QyxpQ0FBaUMsRUFBRSxxQ0FBcUM7aUJBQ3pFOzthQUNGOzs7WUE1Q0MsVUFBVTtZQVNKLGlCQUFpQjtZQUdqQixRQUFRO1lBVGQsTUFBTTt5Q0FrR0QsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7Ozs0QkFqQjVDLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3VCQUd6QyxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztxQkFPbkMsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcmlhTGl2ZVBvbGl0ZW5lc3N9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIEJhc2VQb3J0YWxPdXRsZXQsXG4gIENka1BvcnRhbE91dGxldCxcbiAgQ29tcG9uZW50UG9ydGFsLFxuICBUZW1wbGF0ZVBvcnRhbFxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0U25hY2tCYXJDb25maWcsIF9TbmFja0JhckNvbnRhaW5lcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtNRENTbmFja2JhckFkYXB0ZXIsIE1EQ1NuYWNrYmFyRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL3NuYWNrYmFyJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFRoZSBNREMgbGFiZWwgY2xhc3MgdGhhdCBzaG91bGQgd3JhcCB0aGUgbGFiZWwgY29udGVudCBvZiB0aGUgc25hY2sgYmFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jb25zdCBNRENfU05BQ0tCQVJfTEFCRUxfQ0xBU1MgPSAnbWRjLXNuYWNrYmFyX19sYWJlbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgd3JhcHMgdXNlci1wcm92aWRlZCBzbmFjayBiYXIgY29udGVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LW1kYy1zbmFjay1iYXItY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzbmFjay1iYXItY29udGFpbmVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc25hY2stYmFyLWNvbnRhaW5lci5jc3MnXSxcbiAgLy8gSW4gSXZ5IGVtYmVkZGVkIHZpZXdzIHdpbGwgYmUgY2hhbmdlIGRldGVjdGVkIGZyb20gdGhlaXIgZGVjbGFyYXRpb24gcGxhY2UsIHJhdGhlciB0aGFuXG4gIC8vIHdoZXJlIHRoZXkgd2VyZSBzdGFtcGVkIG91dC4gVGhpcyBtZWFucyB0aGF0IHdlIGNhbid0IGhhdmUgdGhlIHNuYWNrIGJhciBjb250YWluZXIgYmUgT25QdXNoLFxuICAvLyBiZWNhdXNlIGl0IG1pZ2h0IGNhdXNlIHNuYWNrIGJhcnMgdGhhdCB3ZXJlIG9wZW5lZCBmcm9tIGEgdGVtcGxhdGUgbm90IHRvIGJlIG91dCBvZiBkYXRlLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLXNuYWNrYmFyIG1hdC1tZGMtc25hY2stYmFyLWNvbnRhaW5lcicsXG4gICAgJ1tjbGFzcy5tYXQtc25hY2stYmFyLWNvbnRhaW5lcl0nOiAnZmFsc2UnLFxuICAgIC8vIE1hcmsgdGhpcyBlbGVtZW50IHdpdGggYSAnbWF0LWV4aXQnIGF0dHJpYnV0ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBzbmFja2JhciBoYXNcbiAgICAvLyBiZWVuIGRpc21pc3NlZCBhbmQgd2lsbCBzb29uIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NLiBUaGlzIGlzIHVzZWQgYnkgdGhlIHNuYWNrYmFyXG4gICAgLy8gdGVzdCBoYXJuZXNzLlxuICAgICdbYXR0ci5tYXQtZXhpdF0nOiBgX2V4aXRpbmcgPyAnJyA6IG51bGxgLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogYF9hbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnYCxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhckNvbnRhaW5lciBleHRlbmRzIEJhc2VQb3J0YWxPdXRsZXRcbiAgICBpbXBsZW1lbnRzIF9TbmFja0JhckNvbnRhaW5lciwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIGFubm91bmNpbmcgdGhlIHNuYWNrIGJhcidzIGNvbnRlbnQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Fubm91bmNlRGVsYXk6IG51bWJlciA9IDE1MDtcblxuICAvKiogVGhlIHRpbWVvdXQgZm9yIGFubm91bmNpbmcgdGhlIHNuYWNrIGJhcidzIGNvbnRlbnQuICovXG4gIHByaXZhdGUgX2Fubm91bmNlVGltZW91dElkOiBudW1iZXI7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBzbmFjayBiYXIgaGFzIGFubm91bmNlZCB0byBzY3JlZW4gcmVhZGVycy4gKi9cbiAgcmVhZG9ubHkgX29uQW5ub3VuY2U6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgc25hY2sgYmFyIGhhcyBleGl0ZWQgZnJvbSB2aWV3LiAqL1xuICByZWFkb25seSBfb25FeGl0OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgZmluaXNoZWQgZW50ZXJpbmcgdGhlIHZpZXcuICovXG4gIHJlYWRvbmx5IF9vbkVudGVyOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKiogYXJpYS1saXZlIHZhbHVlIGZvciB0aGUgbGl2ZSByZWdpb24uICovXG4gIF9saXZlOiBBcmlhTGl2ZVBvbGl0ZW5lc3M7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNuYWNrIGJhciBpcyBjdXJyZW50bHkgZXhpdGluZy4gKi9cbiAgX2V4aXRpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIF9tZGNBZGFwdGVyOiBNRENTbmFja2JhckFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBhbm5vdW5jZTogKCkgPT4ge30sXG4gICAgbm90aWZ5Q2xvc2VkOiAoKSA9PiB7XG4gICAgICB0aGlzLl9vbkV4aXQubmV4dCgpO1xuICAgICAgdGhpcy5fbWRjRm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfSxcbiAgICBub3RpZnlDbG9zaW5nOiAoKSA9PiB7fSxcbiAgICBub3RpZnlPcGVuZWQ6ICgpID0+IHRoaXMuX29uRW50ZXIubmV4dCgpLFxuICAgIG5vdGlmeU9wZW5pbmc6ICgpID0+IHt9LFxuICB9O1xuXG4gIF9tZGNGb3VuZGF0aW9uID0gbmV3IE1EQ1NuYWNrYmFyRm91bmRhdGlvbih0aGlzLl9tZGNBZGFwdGVyKTtcblxuICAvKiogVGhlIHBvcnRhbCBvdXRsZXQgaW5zaWRlIG9mIHRoaXMgY29udGFpbmVyIGludG8gd2hpY2ggdGhlIHNuYWNrIGJhciBjb250ZW50IHdpbGwgYmUgbG9hZGVkLiAqL1xuICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogdHJ1ZX0pIF9wb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcblxuICAvKiogRWxlbWVudCB0aGF0IGFjdHMgYXMgdGhlIE1EQyBzdXJmYWNlIGNvbnRhaW5lciB3aGljaCBzaG91bGQgY29udGFpbiB0aGUgbGFiZWwgYW5kIGFjdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoJ3N1cmZhY2UnLCB7c3RhdGljOiB0cnVlfSkgX3N1cmZhY2U6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIGBtZGMtc25hY2tiYXJfX2xhYmVsYCBjbGFzcyBhcHBsaWVkIGlmIHRoZSBhdHRhY2hlZCBjb21wb25lbnRcbiAgICogb3IgdGVtcGxhdGUgZG9lcyBub3QgaGF2ZSBpdC4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGFwcHJvcHJpYXRlIHN0cnVjdHVyZSwgdHlwb2dyYXBoeSwgYW5kXG4gICAqIGNvbG9yIGlzIGFwcGxpZWQgdG8gdGhlIGF0dGFjaGVkIHZpZXcuXG4gICAqL1xuICBAVmlld0NoaWxkKCdsYWJlbCcsIHtzdGF0aWM6IHRydWV9KSBfbGFiZWw6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHB1YmxpYyBzbmFja0JhckNvbmZpZzogTWF0U25hY2tCYXJDb25maWcsXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gVXNlIGFyaWEtbGl2ZSByYXRoZXIgdGhhbiBhIGxpdmUgcm9sZSBsaWtlICdhbGVydCcgb3IgJ3N0YXR1cydcbiAgICAvLyBiZWNhdXNlIE5WREEgYW5kIEpBV1MgaGF2ZSBzaG93IGluY29uc2lzdGVudCBiZWhhdmlvciB3aXRoIGxpdmUgcm9sZXMuXG4gICAgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdhc3NlcnRpdmUnICYmICFzbmFja0JhckNvbmZpZy5hbm5vdW5jZW1lbnRNZXNzYWdlKSB7XG4gICAgICB0aGlzLl9saXZlID0gJ2Fzc2VydGl2ZSc7XG4gICAgfSBlbHNlIGlmIChzbmFja0JhckNvbmZpZy5wb2xpdGVuZXNzID09PSAnb2ZmJykge1xuICAgICAgdGhpcy5fbGl2ZSA9ICdvZmYnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXZlID0gJ3BvbGl0ZSc7XG4gICAgfVxuXG4gICAgLy8gYE1hdFNuYWNrQmFyYCB3aWxsIHVzZSB0aGUgY29uZmlnJ3MgdGltZW91dCB0byBkZXRlcm1pbmUgd2hlbiB0aGUgc25hY2sgYmFyIHNob3VsZCBiZSBjbG9zZWQuXG4gICAgLy8gU2V0IHRoaXMgdG8gYC0xYCB0byBtYXJrIGl0IGFzIGluZGVmaW5pdGVseSBvcGVuIHNvIHRoYXQgTURDIGRvZXMgbm90IGNsb3NlIGl0c2VsZi5cbiAgICB0aGlzLl9tZGNGb3VuZGF0aW9uLnNldFRpbWVvdXRNcygtMSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBhdHRhY2hlZCBjb21wb25lbnQgb3IgdGVtcGxhdGUgdXNlcyB0aGUgTURDIHRlbXBsYXRlIHN0cnVjdHVyZSxcbiAgICAvLyBzcGVjaWZpY2FsbHkgdGhlIE1EQyBsYWJlbC4gSWYgbm90LCB0aGUgY29udGFpbmVyIHNob3VsZCBhcHBseSB0aGUgTURDIGxhYmVsIGNsYXNzIHRvIHRoaXNcbiAgICAvLyBjb21wb25lbnQncyBsYWJlbCBjb250YWluZXIsIHdoaWNoIHdpbGwgYXBwbHkgTURDJ3MgbGFiZWwgc3R5bGVzIHRvIHRoZSBhdHRhY2hlZCB2aWV3LlxuICAgIGlmICghdGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHtNRENfU05BQ0tCQVJfTEFCRUxfQ0xBU1N9YCkpIHtcbiAgICAgIHRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChNRENfU05BQ0tCQVJfTEFCRUxfQ0xBU1MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYWJlbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWFrZXMgc3VyZSB0aGUgZXhpdCBjYWxsYmFja3MgaGF2ZSBiZWVuIGludm9rZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBkZXN0cm95ZWQuICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX21kY0ZvdW5kYXRpb24uY2xvc2UoKTtcbiAgfVxuXG4gIGVudGVyKCkge1xuICAgIC8vIE1EQyB1c2VzIHNvbWUgYnJvd3NlciBBUElzIHRoYXQgd2lsbCB0aHJvdyBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX21kY0ZvdW5kYXRpb24ub3BlbigpO1xuICAgICAgdGhpcy5fc2NyZWVuUmVhZGVyQW5ub3VuY2UoKTtcbiAgICB9XG4gIH1cblxuICBleGl0KCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHRoaXMuX2V4aXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX21kY0ZvdW5kYXRpb24uY2xvc2UoKTtcblxuICAgIC8vIElmIHRoZSBzbmFjayBiYXIgaGFzbid0IGJlZW4gYW5ub3VuY2VkIGJ5IHRoZSB0aW1lIGl0IGV4aXRzIGl0IHdvdWxkbid0IGhhdmUgYmVlbiBvcGVuXG4gICAgLy8gbG9uZyBlbm91Z2ggdG8gdmlzdWFsbHkgcmVhZCBpdCBlaXRoZXIsIHNvIGNsZWFyIHRoZSB0aW1lb3V0IGZvciBhbm5vdW5jaW5nLlxuICAgIGNsZWFyVGltZW91dCh0aGlzLl9hbm5vdW5jZVRpbWVvdXRJZCk7XG5cbiAgICByZXR1cm4gdGhpcy5fb25FeGl0O1xuICB9XG5cbiAgLyoqIEF0dGFjaCBhIGNvbXBvbmVudCBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPik6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90QXR0YWNoZWQoKTtcbiAgICB0aGlzLl9hcHBseVNuYWNrQmFyQ2xhc3NlcygpO1xuICAgIHJldHVybiB0aGlzLl9wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gIH1cblxuICAvKiogQXR0YWNoIGEgdGVtcGxhdGUgcG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBzbmFjayBiYXIgY29udGFpbmVyLiAqL1xuICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPEM+KTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICB0aGlzLl9hc3NlcnROb3RBdHRhY2hlZCgpO1xuICAgIHRoaXMuX2FwcGx5U25hY2tCYXJDbGFzc2VzKCk7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBhY3RpdmUgPyBjbGFzc0xpc3QuYWRkKGNzc0NsYXNzKSA6IGNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3MpO1xuICB9XG5cbiAgLyoqIEFwcGxpZXMgdGhlIHVzZXItY29uZmlndXJlZCBDU1MgY2xhc3NlcyB0byB0aGUgc25hY2sgYmFyLiAqL1xuICBwcml2YXRlIF9hcHBseVNuYWNrQmFyQ2xhc3NlcygpIHtcbiAgICBjb25zdCBwYW5lbENsYXNzZXMgPSB0aGlzLnNuYWNrQmFyQ29uZmlnLnBhbmVsQ2xhc3M7XG4gICAgaWYgKHBhbmVsQ2xhc3Nlcykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFuZWxDbGFzc2VzKSkge1xuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgY2FuJ3QgdXNlIGEgc3ByZWFkIGhlcmUsIGJlY2F1c2UgSUUgZG9lc24ndCBzdXBwb3J0IG11bHRpcGxlIGFyZ3VtZW50cy5cbiAgICAgICAgcGFuZWxDbGFzc2VzLmZvckVhY2goY3NzQ2xhc3MgPT4gdGhpcy5fc2V0Q2xhc3MoY3NzQ2xhc3MsIHRydWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldENsYXNzKHBhbmVsQ2xhc3NlcywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEFzc2VydHMgdGhhdCBubyBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQgdG8gdGhlIGNvbnRhaW5lci4gKi9cbiAgcHJpdmF0ZSBfYXNzZXJ0Tm90QXR0YWNoZWQoKSB7XG4gICAgaWYgKHRoaXMuX3BvcnRhbE91dGxldC5oYXNBdHRhY2hlZCgpICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignQXR0ZW1wdGluZyB0byBhdHRhY2ggc25hY2sgYmFyIGNvbnRlbnQgYWZ0ZXIgY29udGVudCBpcyBhbHJlYWR5IGF0dGFjaGVkJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHRpbWVvdXQgdG8gbW92ZSB0aGUgc25hY2sgYmFyIGNvbnRlbnQgdG8gdGhlIGxpdmUgcmVnaW9uIHNvIHNjcmVlbiByZWFkZXJzIHdpbGxcbiAgICogYW5ub3VuY2UgaXQuXG4gICAqL1xuICBwcml2YXRlIF9zY3JlZW5SZWFkZXJBbm5vdW5jZSgpIHtcbiAgICBpZiAoIXRoaXMuX2Fubm91bmNlVGltZW91dElkKSB7XG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl9hbm5vdW5jZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZXJ0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1oaWRkZW5dJyk7XG4gICAgICAgICAgY29uc3QgbGl2ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtbGl2ZV0nKTtcblxuICAgICAgICAgIGlmIChpbmVydEVsZW1lbnQgJiYgbGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIElmIGFuIGVsZW1lbnQgaW4gdGhlIHNuYWNrIGJhciBjb250ZW50IGlzIGZvY3VzZWQgYmVmb3JlIGJlaW5nIG1vdmVkXG4gICAgICAgICAgICAvLyB0cmFjayBpdCBhbmQgcmVzdG9yZSBmb2N1cyBhZnRlciBtb3ZpbmcgdG8gdGhlIGxpdmUgcmVnaW9uLlxuICAgICAgICAgICAgbGV0IGZvY3VzZWRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIGluZXJ0RWxlbWVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgICBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZXJ0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICBsaXZlRWxlbWVudC5hcHBlbmRDaGlsZChpbmVydEVsZW1lbnQpO1xuICAgICAgICAgICAgZm9jdXNlZEVsZW1lbnQ/LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX29uQW5ub3VuY2UubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5fb25Bbm5vdW5jZS5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5fYW5ub3VuY2VEZWxheSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==