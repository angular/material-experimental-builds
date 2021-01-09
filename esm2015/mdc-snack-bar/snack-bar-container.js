/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
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
    constructor(_elementRef, snackBarConfig, _platform, _ngZone) {
        super();
        this._elementRef = _elementRef;
        this.snackBarConfig = snackBarConfig;
        this._platform = _platform;
        this._ngZone = _ngZone;
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
                },
                styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--open .mdc-snackbar__label,.mdc-snackbar--open .mdc-snackbar__actions{visibility:visible}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;visibility:hidden;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box;visibility:hidden}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.cdk-high-contrast-active .mat-mdc-snack-bar-container{border:solid 1px}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1 1 auto}\n"]
            },] }
];
MatSnackBarContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: MatSnackBarConfig },
    { type: Platform },
    { type: NgZone }
];
MatSnackBarContainer.propDecorators = {
    _portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }],
    _surface: [{ type: ViewChild, args: ['surface', { static: true },] }],
    _label: [{ type: ViewChild, args: ['label', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zbmFjay1iYXItY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUdoQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFFVixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQXFCLE1BQU0sNkJBQTZCLENBQUM7QUFDbEYsT0FBTyxFQUFxQixxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXpDOzs7R0FHRztBQUNILE1BQU0sd0JBQXdCLEdBQUcscUJBQXFCLENBQUM7QUFFdkQ7OztHQUdHO0FBb0JILE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxnQkFBZ0I7SUFtRHhELFlBQ1ksV0FBb0MsRUFDckMsY0FBaUMsRUFDaEMsU0FBbUIsRUFDbkIsT0FBZTtRQUN6QixLQUFLLEVBQUUsQ0FBQztRQUpFLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNyQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDaEMsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBckQzQixvRkFBb0Y7UUFDbkUsbUJBQWMsR0FBVyxHQUFHLENBQUM7UUFLOUMsZ0ZBQWdGO1FBQ3ZFLGdCQUFXLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7UUFFcEQscUVB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QyxjQUFjLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBcE1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyxvb0JBQXVDO2dCQUV2QywwRkFBMEY7Z0JBQzFGLGdHQUFnRztnQkFDaEcsNEZBQTRGO2dCQUM1RiwrQ0FBK0M7Z0JBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2dCQUNoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSwwQ0FBMEM7b0JBQ25ELGlDQUFpQyxFQUFFLE9BQU87b0JBQzFDLGtGQUFrRjtvQkFDbEYscUZBQXFGO29CQUNyRixnQkFBZ0I7b0JBQ2hCLGlCQUFpQixFQUFFLHNCQUFzQjtpQkFDMUM7O2FBQ0Y7OztZQXhDQyxVQUFVO1lBT0osaUJBQWlCO1lBRWpCLFFBQVE7WUFQZCxNQUFNOzs7NEJBOEVMLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3VCQUd6QyxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztxQkFPbkMsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcmlhTGl2ZVBvbGl0ZW5lc3N9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIEJhc2VQb3J0YWxPdXRsZXQsXG4gIENka1BvcnRhbE91dGxldCxcbiAgQ29tcG9uZW50UG9ydGFsLFxuICBUZW1wbGF0ZVBvcnRhbFxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0U25hY2tCYXJDb25maWcsIF9TbmFja0JhckNvbnRhaW5lcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7TURDU25hY2tiYXJBZGFwdGVyLCBNRENTbmFja2JhckZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9zbmFja2Jhcic7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGUgTURDIGxhYmVsIGNsYXNzIHRoYXQgc2hvdWxkIHdyYXAgdGhlIGxhYmVsIGNvbnRlbnQgb2YgdGhlIHNuYWNrIGJhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY29uc3QgTURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTID0gJ21kYy1zbmFja2Jhcl9fbGFiZWwnO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHVzZXItcHJvdmlkZWQgc25hY2sgYmFyIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZGMtc25hY2stYmFyLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnc25hY2stYmFyLWNvbnRhaW5lci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NuYWNrLWJhci1jb250YWluZXIuY3NzJ10sXG4gIC8vIEluIEl2eSBlbWJlZGRlZCB2aWV3cyB3aWxsIGJlIGNoYW5nZSBkZXRlY3RlZCBmcm9tIHRoZWlyIGRlY2xhcmF0aW9uIHBsYWNlLCByYXRoZXIgdGhhblxuICAvLyB3aGVyZSB0aGV5IHdlcmUgc3RhbXBlZCBvdXQuIFRoaXMgbWVhbnMgdGhhdCB3ZSBjYW4ndCBoYXZlIHRoZSBzbmFjayBiYXIgY29udGFpbmVyIGJlIE9uUHVzaCxcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBjYXVzZSBzbmFjayBiYXJzIHRoYXQgd2VyZSBvcGVuZWQgZnJvbSBhIHRlbXBsYXRlIG5vdCB0byBiZSBvdXQgb2YgZGF0ZS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1zbmFja2JhciBtYXQtbWRjLXNuYWNrLWJhci1jb250YWluZXInLFxuICAgICdbY2xhc3MubWF0LXNuYWNrLWJhci1jb250YWluZXJdJzogJ2ZhbHNlJyxcbiAgICAvLyBNYXJrIHRoaXMgZWxlbWVudCB3aXRoIGEgJ21hdC1leGl0JyBhdHRyaWJ1dGUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgc25hY2tiYXIgaGFzXG4gICAgLy8gYmVlbiBkaXNtaXNzZWQgYW5kIHdpbGwgc29vbiBiZSByZW1vdmVkIGZyb20gdGhlIERPTS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBzbmFja2JhclxuICAgIC8vIHRlc3QgaGFybmVzcy5cbiAgICAnW2F0dHIubWF0LWV4aXRdJzogYF9leGl0aW5nID8gJycgOiBudWxsYCxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhckNvbnRhaW5lciBleHRlbmRzIEJhc2VQb3J0YWxPdXRsZXRcbiAgICBpbXBsZW1lbnRzIF9TbmFja0JhckNvbnRhaW5lciwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIGFubm91bmNpbmcgdGhlIHNuYWNrIGJhcidzIGNvbnRlbnQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Fubm91bmNlRGVsYXk6IG51bWJlciA9IDE1MDtcblxuICAvKiogVGhlIHRpbWVvdXQgZm9yIGFubm91bmNpbmcgdGhlIHNuYWNrIGJhcidzIGNvbnRlbnQuICovXG4gIHByaXZhdGUgX2Fubm91bmNlVGltZW91dElkOiBudW1iZXI7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBzbmFjayBiYXIgaGFzIGFubm91bmNlZCB0byBzY3JlZW4gcmVhZGVycy4gKi9cbiAgcmVhZG9ubHkgX29uQW5ub3VuY2U6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgc25hY2sgYmFyIGhhcyBleGl0ZWQgZnJvbSB2aWV3LiAqL1xuICByZWFkb25seSBfb25FeGl0OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgZmluaXNoZWQgZW50ZXJpbmcgdGhlIHZpZXcuICovXG4gIHJlYWRvbmx5IF9vbkVudGVyOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKiogYXJpYS1saXZlIHZhbHVlIGZvciB0aGUgbGl2ZSByZWdpb24uICovXG4gIF9saXZlOiBBcmlhTGl2ZVBvbGl0ZW5lc3M7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNuYWNrIGJhciBpcyBjdXJyZW50bHkgZXhpdGluZy4gKi9cbiAgX2V4aXRpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIF9tZGNBZGFwdGVyOiBNRENTbmFja2JhckFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLl9zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBhbm5vdW5jZTogKCkgPT4ge30sXG4gICAgbm90aWZ5Q2xvc2VkOiAoKSA9PiB7XG4gICAgICB0aGlzLl9vbkV4aXQubmV4dCgpO1xuICAgICAgdGhpcy5fbWRjRm91bmRhdGlvbi5kZXN0cm95KCk7XG4gICAgfSxcbiAgICBub3RpZnlDbG9zaW5nOiAoKSA9PiB7fSxcbiAgICBub3RpZnlPcGVuZWQ6ICgpID0+IHRoaXMuX29uRW50ZXIubmV4dCgpLFxuICAgIG5vdGlmeU9wZW5pbmc6ICgpID0+IHt9LFxuICB9O1xuXG4gIF9tZGNGb3VuZGF0aW9uID0gbmV3IE1EQ1NuYWNrYmFyRm91bmRhdGlvbih0aGlzLl9tZGNBZGFwdGVyKTtcblxuICAvKiogVGhlIHBvcnRhbCBvdXRsZXQgaW5zaWRlIG9mIHRoaXMgY29udGFpbmVyIGludG8gd2hpY2ggdGhlIHNuYWNrIGJhciBjb250ZW50IHdpbGwgYmUgbG9hZGVkLiAqL1xuICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogdHJ1ZX0pIF9wb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcblxuICAvKiogRWxlbWVudCB0aGF0IGFjdHMgYXMgdGhlIE1EQyBzdXJmYWNlIGNvbnRhaW5lciB3aGljaCBzaG91bGQgY29udGFpbiB0aGUgbGFiZWwgYW5kIGFjdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoJ3N1cmZhY2UnLCB7c3RhdGljOiB0cnVlfSkgX3N1cmZhY2U6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIGBtZGMtc25hY2tiYXJfX2xhYmVsYCBjbGFzcyBhcHBsaWVkIGlmIHRoZSBhdHRhY2hlZCBjb21wb25lbnRcbiAgICogb3IgdGVtcGxhdGUgZG9lcyBub3QgaGF2ZSBpdC4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGFwcHJvcHJpYXRlIHN0cnVjdHVyZSwgdHlwb2dyYXBoeSwgYW5kXG4gICAqIGNvbG9yIGlzIGFwcGxpZWQgdG8gdGhlIGF0dGFjaGVkIHZpZXcuXG4gICAqL1xuICBAVmlld0NoaWxkKCdsYWJlbCcsIHtzdGF0aWM6IHRydWV9KSBfbGFiZWw6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHB1YmxpYyBzbmFja0JhckNvbmZpZzogTWF0U25hY2tCYXJDb25maWcsXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBVc2UgYXJpYS1saXZlIHJhdGhlciB0aGFuIGEgbGl2ZSByb2xlIGxpa2UgJ2FsZXJ0JyBvciAnc3RhdHVzJ1xuICAgIC8vIGJlY2F1c2UgTlZEQSBhbmQgSkFXUyBoYXZlIHNob3cgaW5jb25zaXN0ZW50IGJlaGF2aW9yIHdpdGggbGl2ZSByb2xlcy5cbiAgICBpZiAoc25hY2tCYXJDb25maWcucG9saXRlbmVzcyA9PT0gJ2Fzc2VydGl2ZScgJiYgIXNuYWNrQmFyQ29uZmlnLmFubm91bmNlbWVudE1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuX2xpdmUgPSAnYXNzZXJ0aXZlJztcbiAgICB9IGVsc2UgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdvZmYnKSB7XG4gICAgICB0aGlzLl9saXZlID0gJ29mZic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpdmUgPSAncG9saXRlJztcbiAgICB9XG5cbiAgICAvLyBgTWF0U25hY2tCYXJgIHdpbGwgdXNlIHRoZSBjb25maWcncyB0aW1lb3V0IHRvIGRldGVybWluZSB3aGVuIHRoZSBzbmFjayBiYXIgc2hvdWxkIGJlIGNsb3NlZC5cbiAgICAvLyBTZXQgdGhpcyB0byBgLTFgIHRvIG1hcmsgaXQgYXMgaW5kZWZpbml0ZWx5IG9wZW4gc28gdGhhdCBNREMgZG9lcyBub3QgY2xvc2UgaXRzZWxmLlxuICAgIHRoaXMuX21kY0ZvdW5kYXRpb24uc2V0VGltZW91dE1zKC0xKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGF0dGFjaGVkIGNvbXBvbmVudCBvciB0ZW1wbGF0ZSB1c2VzIHRoZSBNREMgdGVtcGxhdGUgc3RydWN0dXJlLFxuICAgIC8vIHNwZWNpZmljYWxseSB0aGUgTURDIGxhYmVsLiBJZiBub3QsIHRoZSBjb250YWluZXIgc2hvdWxkIGFwcGx5IHRoZSBNREMgbGFiZWwgY2xhc3MgdG8gdGhpc1xuICAgIC8vIGNvbXBvbmVudCdzIGxhYmVsIGNvbnRhaW5lciwgd2hpY2ggd2lsbCBhcHBseSBNREMncyBsYWJlbCBzdHlsZXMgdG8gdGhlIGF0dGFjaGVkIHZpZXcuXG4gICAgaWYgKCF0aGlzLl9sYWJlbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke01EQ19TTkFDS0JBUl9MQUJFTF9DTEFTU31gKSkge1xuICAgICAgdGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKE1EQ19TTkFDS0JBUl9MQUJFTF9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShNRENfU05BQ0tCQVJfTEFCRUxfQ0xBU1MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNYWtlcyBzdXJlIHRoZSBleGl0IGNhbGxiYWNrcyBoYXZlIGJlZW4gaW52b2tlZCB3aGVuIHRoZSBlbGVtZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5jbG9zZSgpO1xuICB9XG5cbiAgZW50ZXIoKSB7XG4gICAgLy8gTURDIHVzZXMgc29tZSBicm93c2VyIEFQSXMgdGhhdCB3aWxsIHRocm93IGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fbWRjRm91bmRhdGlvbi5vcGVuKCk7XG4gICAgICB0aGlzLl9zY3JlZW5SZWFkZXJBbm5vdW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIGV4aXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgdGhpcy5fZXhpdGluZyA9IHRydWU7XG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5jbG9zZSgpO1xuXG4gICAgLy8gSWYgdGhlIHNuYWNrIGJhciBoYXNuJ3QgYmVlbiBhbm5vdW5jZWQgYnkgdGhlIHRpbWUgaXQgZXhpdHMgaXQgd291bGRuJ3QgaGF2ZSBiZWVuIG9wZW5cbiAgICAvLyBsb25nIGVub3VnaCB0byB2aXN1YWxseSByZWFkIGl0IGVpdGhlciwgc28gY2xlYXIgdGhlIHRpbWVvdXQgZm9yIGFubm91bmNpbmcuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Fubm91bmNlVGltZW91dElkKTtcblxuICAgIHJldHVybiB0aGlzLl9vbkV4aXQ7XG4gIH1cblxuICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc25hY2sgYmFyIGNvbnRhaW5lci4gKi9cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICB0aGlzLl9hc3NlcnROb3RBdHRhY2hlZCgpO1xuICAgIHRoaXMuX2FwcGx5U25hY2tCYXJDbGFzc2VzKCk7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcbiAgfVxuXG4gIC8qKiBBdHRhY2ggYSB0ZW1wbGF0ZSBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIHRoaXMuX2Fzc2VydE5vdEF0dGFjaGVkKCk7XG4gICAgdGhpcy5fYXBwbHlTbmFja0JhckNsYXNzZXMoKTtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsT3V0bGV0LmF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGFjdGl2ZSA/IGNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpIDogY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzcyk7XG4gIH1cblxuICAvKiogQXBwbGllcyB0aGUgdXNlci1jb25maWd1cmVkIENTUyBjbGFzc2VzIHRvIHRoZSBzbmFjayBiYXIuICovXG4gIHByaXZhdGUgX2FwcGx5U25hY2tCYXJDbGFzc2VzKCkge1xuICAgIGNvbnN0IHBhbmVsQ2xhc3NlcyA9IHRoaXMuc25hY2tCYXJDb25maWcucGFuZWxDbGFzcztcbiAgICBpZiAocGFuZWxDbGFzc2VzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYW5lbENsYXNzZXMpKSB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCB1c2UgYSBzcHJlYWQgaGVyZSwgYmVjYXVzZSBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzLlxuICAgICAgICBwYW5lbENsYXNzZXMuZm9yRWFjaChjc3NDbGFzcyA9PiB0aGlzLl9zZXRDbGFzcyhjc3NDbGFzcywgdHJ1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0Q2xhc3MocGFuZWxDbGFzc2VzLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQXNzZXJ0cyB0aGF0IG5vIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCB0byB0aGUgY29udGFpbmVyLiAqL1xuICBwcml2YXRlIF9hc3NlcnROb3RBdHRhY2hlZCgpIHtcbiAgICBpZiAodGhpcy5fcG9ydGFsT3V0bGV0Lmhhc0F0dGFjaGVkKCkgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0aW5nIHRvIGF0dGFjaCBzbmFjayBiYXIgY29udGVudCBhZnRlciBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGEgdGltZW91dCB0byBtb3ZlIHRoZSBzbmFjayBiYXIgY29udGVudCB0byB0aGUgbGl2ZSByZWdpb24gc28gc2NyZWVuIHJlYWRlcnMgd2lsbFxuICAgKiBhbm5vdW5jZSBpdC5cbiAgICovXG4gIHByaXZhdGUgX3NjcmVlblJlYWRlckFubm91bmNlKCkge1xuICAgIGlmICghdGhpcy5fYW5ub3VuY2VUaW1lb3V0SWQpIHtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Fubm91bmNlVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5lcnRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWhpZGRlbl0nKTtcbiAgICAgICAgICBjb25zdCBsaXZlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1saXZlXScpO1xuXG4gICAgICAgICAgaWYgKGluZXJ0RWxlbWVudCAmJiBsaXZlRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gSWYgYW4gZWxlbWVudCBpbiB0aGUgc25hY2sgYmFyIGNvbnRlbnQgaXMgZm9jdXNlZCBiZWZvcmUgYmVpbmcgbW92ZWRcbiAgICAgICAgICAgIC8vIHRyYWNrIGl0IGFuZCByZXN0b3JlIGZvY3VzIGFmdGVyIG1vdmluZyB0byB0aGUgbGl2ZSByZWdpb24uXG4gICAgICAgICAgICBsZXQgZm9jdXNlZEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgaW5lcnRFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgIGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5lcnRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgIGxpdmVFbGVtZW50LmFwcGVuZENoaWxkKGluZXJ0RWxlbWVudCk7XG4gICAgICAgICAgICBmb2N1c2VkRWxlbWVudD8uZm9jdXMoKTtcblxuICAgICAgICAgICAgdGhpcy5fb25Bbm5vdW5jZS5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLl9vbkFubm91bmNlLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLl9hbm5vdW5jZURlbGF5KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19