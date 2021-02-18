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
                styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:\"\"}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-container._mat-animation-noopable .mdc-snackbar__surface{transition:none}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}.mat-mdc-snack-bar-handset .mdc-snackbar__surface{width:100%}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zbmFjay1iYXItY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUdoQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFFVixNQUFNLEVBQ04sTUFBTSxFQUVOLFFBQVEsRUFDUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBcUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQXFCLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFekM7OztHQUdHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxxQkFBcUIsQ0FBQztBQUV2RDs7O0dBR0c7QUFxQkgsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQXlEeEQsWUFDWSxXQUFvQyxFQUNyQyxjQUFpQyxFQUNoQyxTQUFtQixFQUNuQixPQUFlLEVBQzJCLGNBQXVCO1FBQzNFLEtBQUssRUFBRSxDQUFDO1FBTEUsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3JDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNoQyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDMkIsbUJBQWMsR0FBZCxjQUFjLENB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QVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7cUJBT25DLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXJpYUxpdmVQb2xpdGVuZXNzfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBCYXNlUG9ydGFsT3V0bGV0LFxuICBDZGtQb3J0YWxPdXRsZXQsXG4gIENvbXBvbmVudFBvcnRhbCxcbiAgVGVtcGxhdGVQb3J0YWxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFNuYWNrQmFyQ29uZmlnLCBfU25hY2tCYXJDb250YWluZXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7TURDU25hY2tiYXJBZGFwdGVyLCBNRENTbmFja2JhckZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9zbmFja2Jhcic7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGUgTURDIGxhYmVsIGNsYXNzIHRoYXQgc2hvdWxkIHdyYXAgdGhlIGxhYmVsIGNvbnRlbnQgb2YgdGhlIHNuYWNrIGJhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY29uc3QgTURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTID0gJ21kYy1zbmFja2Jhcl9fbGFiZWwnO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHVzZXItcHJvdmlkZWQgc25hY2sgYmFyIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZGMtc25hY2stYmFyLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnc25hY2stYmFyLWNvbnRhaW5lci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NuYWNrLWJhci1jb250YWluZXIuY3NzJ10sXG4gIC8vIEluIEl2eSBlbWJlZGRlZCB2aWV3cyB3aWxsIGJlIGNoYW5nZSBkZXRlY3RlZCBmcm9tIHRoZWlyIGRlY2xhcmF0aW9uIHBsYWNlLCByYXRoZXIgdGhhblxuICAvLyB3aGVyZSB0aGV5IHdlcmUgc3RhbXBlZCBvdXQuIFRoaXMgbWVhbnMgdGhhdCB3ZSBjYW4ndCBoYXZlIHRoZSBzbmFjayBiYXIgY29udGFpbmVyIGJlIE9uUHVzaCxcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBjYXVzZSBzbmFjayBiYXJzIHRoYXQgd2VyZSBvcGVuZWQgZnJvbSBhIHRlbXBsYXRlIG5vdCB0byBiZSBvdXQgb2YgZGF0ZS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1zbmFja2JhciBtYXQtbWRjLXNuYWNrLWJhci1jb250YWluZXInLFxuICAgICdbY2xhc3MubWF0LXNuYWNrLWJhci1jb250YWluZXJdJzogJ2ZhbHNlJyxcbiAgICAvLyBNYXJrIHRoaXMgZWxlbWVudCB3aXRoIGEgJ21hdC1leGl0JyBhdHRyaWJ1dGUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgc25hY2tiYXIgaGFzXG4gICAgLy8gYmVlbiBkaXNtaXNzZWQgYW5kIHdpbGwgc29vbiBiZSByZW1vdmVkIGZyb20gdGhlIERPTS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBzbmFja2JhclxuICAgIC8vIHRlc3QgaGFybmVzcy5cbiAgICAnW2F0dHIubWF0LWV4aXRdJzogYF9leGl0aW5nID8gJycgOiBudWxsYCxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6IGBfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJ2AsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0U25hY2tCYXJDb250YWluZXIgZXh0ZW5kcyBCYXNlUG9ydGFsT3V0bGV0XG4gICAgaW1wbGVtZW50cyBfU25hY2tCYXJDb250YWluZXIsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBhbm5vdW5jaW5nIHRoZSBzbmFjayBiYXIncyBjb250ZW50LiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9hbm5vdW5jZURlbGF5OiBudW1iZXIgPSAxNTA7XG5cbiAgLyoqIFRoZSB0aW1lb3V0IGZvciBhbm5vdW5jaW5nIHRoZSBzbmFjayBiYXIncyBjb250ZW50LiAqL1xuICBwcml2YXRlIF9hbm5vdW5jZVRpbWVvdXRJZDogbnVtYmVyO1xuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgc25hY2sgYmFyIGhhcyBhbm5vdW5jZWQgdG8gc2NyZWVuIHJlYWRlcnMuICovXG4gIHJlYWRvbmx5IF9vbkFubm91bmNlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgZXhpdGVkIGZyb20gdmlldy4gKi9cbiAgcmVhZG9ubHkgX29uRXhpdDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBzbmFjayBiYXIgaGFzIGZpbmlzaGVkIGVudGVyaW5nIHRoZSB2aWV3LiAqL1xuICByZWFkb25seSBfb25FbnRlcjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIGFyaWEtbGl2ZSB2YWx1ZSBmb3IgdGhlIGxpdmUgcmVnaW9uLiAqL1xuICBfbGl2ZTogQXJpYUxpdmVQb2xpdGVuZXNzO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbmFjayBiYXIgaXMgY3VycmVudGx5IGV4aXRpbmcuICovXG4gIF9leGl0aW5nID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFJvbGUgb2YgdGhlIGxpdmUgcmVnaW9uLiBUaGlzIGlzIG9ubHkgZm9yIEZpcmVmb3ggYXMgdGhlcmUgaXMgYSBrbm93biBpc3N1ZSB3aGVyZSBGaXJlZm94ICtcbiAgICogSkFXUyBkb2VzIG5vdCByZWFkIG91dCBhcmlhLWxpdmUgbWVzc2FnZS5cbiAgICovXG4gIF9yb2xlPzogJ3N0YXR1cycgfCAnYWxlcnQnO1xuXG4gIHByaXZhdGUgX21kY0FkYXB0ZXI6IE1EQ1NuYWNrYmFyQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGFubm91bmNlOiAoKSA9PiB7fSxcbiAgICBub3RpZnlDbG9zZWQ6ICgpID0+IHtcbiAgICAgIHRoaXMuX29uRXhpdC5uZXh0KCk7XG4gICAgICB0aGlzLl9tZGNGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIG5vdGlmeUNsb3Npbmc6ICgpID0+IHt9LFxuICAgIG5vdGlmeU9wZW5lZDogKCkgPT4gdGhpcy5fb25FbnRlci5uZXh0KCksXG4gICAgbm90aWZ5T3BlbmluZzogKCkgPT4ge30sXG4gIH07XG5cbiAgX21kY0ZvdW5kYXRpb24gPSBuZXcgTURDU25hY2tiYXJGb3VuZGF0aW9uKHRoaXMuX21kY0FkYXB0ZXIpO1xuXG4gIC8qKiBUaGUgcG9ydGFsIG91dGxldCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgc25hY2sgYmFyIGNvbnRlbnQgd2lsbCBiZSBsb2FkZWQuICovXG4gIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7c3RhdGljOiB0cnVlfSkgX3BvcnRhbE91dGxldDogQ2RrUG9ydGFsT3V0bGV0O1xuXG4gIC8qKiBFbGVtZW50IHRoYXQgYWN0cyBhcyB0aGUgTURDIHN1cmZhY2UgY29udGFpbmVyIHdoaWNoIHNob3VsZCBjb250YWluIHRoZSBsYWJlbCBhbmQgYWN0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZCgnc3VyZmFjZScsIHtzdGF0aWM6IHRydWV9KSBfc3VyZmFjZTogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogRWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgYG1kYy1zbmFja2Jhcl9fbGFiZWxgIGNsYXNzIGFwcGxpZWQgaWYgdGhlIGF0dGFjaGVkIGNvbXBvbmVudFxuICAgKiBvciB0ZW1wbGF0ZSBkb2VzIG5vdCBoYXZlIGl0LiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgYXBwcm9wcmlhdGUgc3RydWN0dXJlLCB0eXBvZ3JhcGh5LCBhbmRcbiAgICogY29sb3IgaXMgYXBwbGllZCB0byB0aGUgYXR0YWNoZWQgdmlldy5cbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2xhYmVsJywge3N0YXRpYzogdHJ1ZX0pIF9sYWJlbDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgcHVibGljIHNuYWNrQmFyQ29uZmlnOiBNYXRTbmFja0JhckNvbmZpZyxcbiAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBVc2UgYXJpYS1saXZlIHJhdGhlciB0aGFuIGEgbGl2ZSByb2xlIGxpa2UgJ2FsZXJ0JyBvciAnc3RhdHVzJ1xuICAgIC8vIGJlY2F1c2UgTlZEQSBhbmQgSkFXUyBoYXZlIHNob3cgaW5jb25zaXN0ZW50IGJlaGF2aW9yIHdpdGggbGl2ZSByb2xlcy5cbiAgICBpZiAoc25hY2tCYXJDb25maWcucG9saXRlbmVzcyA9PT0gJ2Fzc2VydGl2ZScgJiYgIXNuYWNrQmFyQ29uZmlnLmFubm91bmNlbWVudE1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuX2xpdmUgPSAnYXNzZXJ0aXZlJztcbiAgICB9IGVsc2UgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdvZmYnKSB7XG4gICAgICB0aGlzLl9saXZlID0gJ29mZic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpdmUgPSAncG9saXRlJztcbiAgICB9XG5cbiAgICAvLyBPbmx5IHNldCByb2xlIGZvciBGaXJlZm94LiBTZXQgcm9sZSBiYXNlZCBvbiBhcmlhLWxpdmUgYmVjYXVzZSBzZXR0aW5nIHJvbGU9XCJhbGVydFwiIGltcGxpZXNcbiAgICAvLyBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIiB3aGljaCBtYXkgY2F1c2UgaXNzdWVzIGlmIGFyaWEtbGl2ZSBpcyBzZXQgdG8gXCJwb2xpdGVcIiBhYm92ZS5cbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uRklSRUZPWCkge1xuICAgICAgaWYgKHRoaXMuX2xpdmUgPT09ICdwb2xpdGUnKSB7XG4gICAgICAgIHRoaXMuX3JvbGUgPSAnc3RhdHVzJztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9saXZlID09PSAnYXNzZXJ0aXZlJykge1xuICAgICAgICB0aGlzLl9yb2xlID0gJ2FsZXJ0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBgTWF0U25hY2tCYXJgIHdpbGwgdXNlIHRoZSBjb25maWcncyB0aW1lb3V0IHRvIGRldGVybWluZSB3aGVuIHRoZSBzbmFjayBiYXIgc2hvdWxkIGJlIGNsb3NlZC5cbiAgICAvLyBTZXQgdGhpcyB0byBgLTFgIHRvIG1hcmsgaXQgYXMgaW5kZWZpbml0ZWx5IG9wZW4gc28gdGhhdCBNREMgZG9lcyBub3QgY2xvc2UgaXRzZWxmLlxuICAgIHRoaXMuX21kY0ZvdW5kYXRpb24uc2V0VGltZW91dE1zKC0xKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGF0dGFjaGVkIGNvbXBvbmVudCBvciB0ZW1wbGF0ZSB1c2VzIHRoZSBNREMgdGVtcGxhdGUgc3RydWN0dXJlLFxuICAgIC8vIHNwZWNpZmljYWxseSB0aGUgTURDIGxhYmVsLiBJZiBub3QsIHRoZSBjb250YWluZXIgc2hvdWxkIGFwcGx5IHRoZSBNREMgbGFiZWwgY2xhc3MgdG8gdGhpc1xuICAgIC8vIGNvbXBvbmVudCdzIGxhYmVsIGNvbnRhaW5lciwgd2hpY2ggd2lsbCBhcHBseSBNREMncyBsYWJlbCBzdHlsZXMgdG8gdGhlIGF0dGFjaGVkIHZpZXcuXG4gICAgaWYgKCF0aGlzLl9sYWJlbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke01EQ19TTkFDS0JBUl9MQUJFTF9DTEFTU31gKSkge1xuICAgICAgdGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKE1EQ19TTkFDS0JBUl9MQUJFTF9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShNRENfU05BQ0tCQVJfTEFCRUxfQ0xBU1MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNYWtlcyBzdXJlIHRoZSBleGl0IGNhbGxiYWNrcyBoYXZlIGJlZW4gaW52b2tlZCB3aGVuIHRoZSBlbGVtZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5jbG9zZSgpO1xuICB9XG5cbiAgZW50ZXIoKSB7XG4gICAgLy8gTURDIHVzZXMgc29tZSBicm93c2VyIEFQSXMgdGhhdCB3aWxsIHRocm93IGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fbWRjRm91bmRhdGlvbi5vcGVuKCk7XG4gICAgICB0aGlzLl9zY3JlZW5SZWFkZXJBbm5vdW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIGV4aXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgdGhpcy5fZXhpdGluZyA9IHRydWU7XG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5jbG9zZSgpO1xuXG4gICAgLy8gSWYgdGhlIHNuYWNrIGJhciBoYXNuJ3QgYmVlbiBhbm5vdW5jZWQgYnkgdGhlIHRpbWUgaXQgZXhpdHMgaXQgd291bGRuJ3QgaGF2ZSBiZWVuIG9wZW5cbiAgICAvLyBsb25nIGVub3VnaCB0byB2aXN1YWxseSByZWFkIGl0IGVpdGhlciwgc28gY2xlYXIgdGhlIHRpbWVvdXQgZm9yIGFubm91bmNpbmcuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Fubm91bmNlVGltZW91dElkKTtcblxuICAgIHJldHVybiB0aGlzLl9vbkV4aXQ7XG4gIH1cblxuICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc25hY2sgYmFyIGNvbnRhaW5lci4gKi9cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICB0aGlzLl9hc3NlcnROb3RBdHRhY2hlZCgpO1xuICAgIHRoaXMuX2FwcGx5U25hY2tCYXJDbGFzc2VzKCk7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcbiAgfVxuXG4gIC8qKiBBdHRhY2ggYSB0ZW1wbGF0ZSBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIHRoaXMuX2Fzc2VydE5vdEF0dGFjaGVkKCk7XG4gICAgdGhpcy5fYXBwbHlTbmFja0JhckNsYXNzZXMoKTtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsT3V0bGV0LmF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGFjdGl2ZSA/IGNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpIDogY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzcyk7XG4gIH1cblxuICAvKiogQXBwbGllcyB0aGUgdXNlci1jb25maWd1cmVkIENTUyBjbGFzc2VzIHRvIHRoZSBzbmFjayBiYXIuICovXG4gIHByaXZhdGUgX2FwcGx5U25hY2tCYXJDbGFzc2VzKCkge1xuICAgIGNvbnN0IHBhbmVsQ2xhc3NlcyA9IHRoaXMuc25hY2tCYXJDb25maWcucGFuZWxDbGFzcztcbiAgICBpZiAocGFuZWxDbGFzc2VzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYW5lbENsYXNzZXMpKSB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCB1c2UgYSBzcHJlYWQgaGVyZSwgYmVjYXVzZSBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzLlxuICAgICAgICBwYW5lbENsYXNzZXMuZm9yRWFjaChjc3NDbGFzcyA9PiB0aGlzLl9zZXRDbGFzcyhjc3NDbGFzcywgdHJ1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0Q2xhc3MocGFuZWxDbGFzc2VzLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQXNzZXJ0cyB0aGF0IG5vIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCB0byB0aGUgY29udGFpbmVyLiAqL1xuICBwcml2YXRlIF9hc3NlcnROb3RBdHRhY2hlZCgpIHtcbiAgICBpZiAodGhpcy5fcG9ydGFsT3V0bGV0Lmhhc0F0dGFjaGVkKCkgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0aW5nIHRvIGF0dGFjaCBzbmFjayBiYXIgY29udGVudCBhZnRlciBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGEgdGltZW91dCB0byBtb3ZlIHRoZSBzbmFjayBiYXIgY29udGVudCB0byB0aGUgbGl2ZSByZWdpb24gc28gc2NyZWVuIHJlYWRlcnMgd2lsbFxuICAgKiBhbm5vdW5jZSBpdC5cbiAgICovXG4gIHByaXZhdGUgX3NjcmVlblJlYWRlckFubm91bmNlKCkge1xuICAgIGlmICghdGhpcy5fYW5ub3VuY2VUaW1lb3V0SWQpIHtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Fubm91bmNlVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5lcnRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWhpZGRlbl0nKTtcbiAgICAgICAgICBjb25zdCBsaXZlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1saXZlXScpO1xuXG4gICAgICAgICAgaWYgKGluZXJ0RWxlbWVudCAmJiBsaXZlRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gSWYgYW4gZWxlbWVudCBpbiB0aGUgc25hY2sgYmFyIGNvbnRlbnQgaXMgZm9jdXNlZCBiZWZvcmUgYmVpbmcgbW92ZWRcbiAgICAgICAgICAgIC8vIHRyYWNrIGl0IGFuZCByZXN0b3JlIGZvY3VzIGFmdGVyIG1vdmluZyB0byB0aGUgbGl2ZSByZWdpb24uXG4gICAgICAgICAgICBsZXQgZm9jdXNlZEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgaW5lcnRFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgIGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5lcnRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgIGxpdmVFbGVtZW50LmFwcGVuZENoaWxkKGluZXJ0RWxlbWVudCk7XG4gICAgICAgICAgICBmb2N1c2VkRWxlbWVudD8uZm9jdXMoKTtcblxuICAgICAgICAgICAgdGhpcy5fb25Bbm5vdW5jZS5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLl9vbkFubm91bmNlLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLl9hbm5vdW5jZURlbGF5KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19