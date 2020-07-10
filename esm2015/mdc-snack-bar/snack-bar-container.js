/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MDCSnackbarFoundation } from '@material/snackbar';
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
                styles: [".mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:8px;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-snack-bar-container{position:static}.mat-mdc-snack-bar-handset,.mat-mdc-snack-bar-container,.mat-mdc-snack-bar-label{flex:1}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zbmFjay1iYXItY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUdoQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFHVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBcUIsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRixPQUFPLEVBQXFCLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUV6Qzs7O0dBR0c7QUFDSCxNQUFNLHdCQUF3QixHQUFHLHFCQUFxQixDQUFDO0FBRXZEOzs7R0FHRztBQXFCSCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsZ0JBQWdCO0lBMEN4RCxZQUNZLFdBQW9DLEVBQ3JDLGNBQWlDO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBRkUsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3JDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQTFDNUMscUVBQXFFO1FBQzVELFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUVoRCwrRUFBK0U7UUFDdEUsYUFBUSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBS2pELGtEQUFrRDtRQUNsRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRVQsZ0JBQVcsR0FBdUI7WUFDeEMsUUFBUSxFQUFFLENBQUMsU0FBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUs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QUNyRixnQkFBZ0I7b0JBQ2hCLGlCQUFpQixFQUFFLHNCQUFzQjtpQkFDMUM7O2FBQ0Y7OztZQXZDQyxVQUFVO1lBTUosaUJBQWlCOzs7NEJBZ0V0QixTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt1QkFHekMsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7cUJBT25DLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEJhc2VQb3J0YWxPdXRsZXQsXG4gIENka1BvcnRhbE91dGxldCxcbiAgQ29tcG9uZW50UG9ydGFsLFxuICBUZW1wbGF0ZVBvcnRhbFxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFNuYWNrQmFyQ29uZmlnLCBfU25hY2tCYXJDb250YWluZXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQge01EQ1NuYWNrYmFyQWRhcHRlciwgTURDU25hY2tiYXJGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvc25hY2tiYXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGUgTURDIGxhYmVsIGNsYXNzIHRoYXQgc2hvdWxkIHdyYXAgdGhlIGxhYmVsIGNvbnRlbnQgb2YgdGhlIHNuYWNrIGJhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY29uc3QgTURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTID0gJ21kYy1zbmFja2Jhcl9fbGFiZWwnO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHVzZXItcHJvdmlkZWQgc25hY2sgYmFyIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZGMtc25hY2stYmFyLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnc25hY2stYmFyLWNvbnRhaW5lci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NuYWNrLWJhci1jb250YWluZXIuY3NzJ10sXG4gIC8vIEluIEl2eSBlbWJlZGRlZCB2aWV3cyB3aWxsIGJlIGNoYW5nZSBkZXRlY3RlZCBmcm9tIHRoZWlyIGRlY2xhcmF0aW9uIHBsYWNlLCByYXRoZXIgdGhhblxuICAvLyB3aGVyZSB0aGV5IHdlcmUgc3RhbXBlZCBvdXQuIFRoaXMgbWVhbnMgdGhhdCB3ZSBjYW4ndCBoYXZlIHRoZSBzbmFjayBiYXIgY29udGFpbmVyIGJlIE9uUHVzaCxcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBjYXVzZSBzbmFjayBiYXJzIHRoYXQgd2VyZSBvcGVuZWQgZnJvbSBhIHRlbXBsYXRlIG5vdCB0byBiZSBvdXQgb2YgZGF0ZS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhbGlkYXRlLWRlY29yYXRvcnNcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnJvbGVdJzogJ19yb2xlJyxcbiAgICAnY2xhc3MnOiAnbWRjLXNuYWNrYmFyIG1hdC1tZGMtc25hY2stYmFyLWNvbnRhaW5lcicsXG4gICAgJ1tjbGFzcy5tYXQtc25hY2stYmFyLWNvbnRhaW5lcl0nOiAnZmFsc2UnLFxuICAgIC8vIE1hcmsgdGhpcyBlbGVtZW50IHdpdGggYSAnbWF0LWV4aXQnIGF0dHJpYnV0ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBzbmFja2JhciBoYXNcbiAgICAvLyBiZWVuIGRpc21pc3NlZCBhbmQgd2lsbCBzb29uIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NLiBUaGlzIGlzIHVzZWQgYnkgdGhlIHNuYWNrYmFyXG4gICAgLy8gdGVzdCBoYXJuZXNzLlxuICAgICdbYXR0ci5tYXQtZXhpdF0nOiBgX2V4aXRpbmcgPyAnJyA6IG51bGxgLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFyQ29udGFpbmVyIGV4dGVuZHMgQmFzZVBvcnRhbE91dGxldFxuICAgIGltcGxlbWVudHMgX1NuYWNrQmFyQ29udGFpbmVyLCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgZXhpdGVkIGZyb20gdmlldy4gKi9cbiAgcmVhZG9ubHkgX29uRXhpdDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBzbmFjayBiYXIgaGFzIGZpbmlzaGVkIGVudGVyaW5nIHRoZSB2aWV3LiAqL1xuICByZWFkb25seSBfb25FbnRlcjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIEFSSUEgcm9sZSBmb3IgdGhlIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIF9yb2xlOiAnYWxlcnQnIHwgJ3N0YXR1cycgfCBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbmFjayBiYXIgaXMgY3VycmVudGx5IGV4aXRpbmcuICovXG4gIF9leGl0aW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfbWRjQWRhcHRlcjogTURDU25hY2tiYXJBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgYW5ub3VuY2U6ICgpID0+IHt9LFxuICAgIG5vdGlmeUNsb3NlZDogKCkgPT4ge1xuICAgICAgdGhpcy5fb25FeGl0Lm5leHQoKTtcbiAgICAgIHRoaXMuX21kY0ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH0sXG4gICAgbm90aWZ5Q2xvc2luZzogKCkgPT4ge30sXG4gICAgbm90aWZ5T3BlbmVkOiAoKSA9PiB0aGlzLl9vbkVudGVyLm5leHQoKSxcbiAgICBub3RpZnlPcGVuaW5nOiAoKSA9PiB7fSxcbiAgfTtcblxuICBfbWRjRm91bmRhdGlvbiA9IG5ldyBNRENTbmFja2JhckZvdW5kYXRpb24odGhpcy5fbWRjQWRhcHRlcik7XG5cbiAgLyoqIFRoZSBwb3J0YWwgb3V0bGV0IGluc2lkZSBvZiB0aGlzIGNvbnRhaW5lciBpbnRvIHdoaWNoIHRoZSBzbmFjayBiYXIgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHtzdGF0aWM6IHRydWV9KSBfcG9ydGFsT3V0bGV0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgLyoqIEVsZW1lbnQgdGhhdCBhY3RzIGFzIHRoZSBNREMgc3VyZmFjZSBjb250YWluZXIgd2hpY2ggc2hvdWxkIGNvbnRhaW4gdGhlIGxhYmVsIGFuZCBhY3Rpb25zLiAqL1xuICBAVmlld0NoaWxkKCdzdXJmYWNlJywge3N0YXRpYzogdHJ1ZX0pIF9zdXJmYWNlOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBFbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBgbWRjLXNuYWNrYmFyX19sYWJlbGAgY2xhc3MgYXBwbGllZCBpZiB0aGUgYXR0YWNoZWQgY29tcG9uZW50XG4gICAqIG9yIHRlbXBsYXRlIGRvZXMgbm90IGhhdmUgaXQuIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBhcHByb3ByaWF0ZSBzdHJ1Y3R1cmUsIHR5cG9ncmFwaHksIGFuZFxuICAgKiBjb2xvciBpcyBhcHBsaWVkIHRvIHRoZSBhdHRhY2hlZCB2aWV3LlxuICAgKi9cbiAgQFZpZXdDaGlsZCgnbGFiZWwnLCB7c3RhdGljOiB0cnVlfSkgX2xhYmVsOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwdWJsaWMgc25hY2tCYXJDb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIEJhc2VkIG9uIHRoZSBBUklBIHNwZWMsIGBhbGVydGAgYW5kIGBzdGF0dXNgIHJvbGVzIGhhdmUgYW5cbiAgICAvLyBpbXBsaWNpdCBgYXNzZXJ0aXZlYCBhbmQgYHBvbGl0ZWAgcG9saXRlbmVzcyByZXNwZWN0aXZlbHkuXG4gICAgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdhc3NlcnRpdmUnICYmICFzbmFja0JhckNvbmZpZy5hbm5vdW5jZW1lbnRNZXNzYWdlKSB7XG4gICAgICB0aGlzLl9yb2xlID0gJ2FsZXJ0JztcbiAgICB9IGVsc2UgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdvZmYnKSB7XG4gICAgICB0aGlzLl9yb2xlID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcm9sZSA9ICdzdGF0dXMnO1xuICAgIH1cblxuICAgIC8vIGBNYXRTbmFja0JhcmAgd2lsbCB1c2UgdGhlIGNvbmZpZydzIHRpbWVvdXQgdG8gZGV0ZXJtaW5lIHdoZW4gdGhlIHNuYWNrIGJhciBzaG91bGQgYmUgY2xvc2VkLlxuICAgIC8vIFNldCB0aGlzIHRvIGAtMWAgdG8gbWFyayBpdCBhcyBpbmRlZmluaXRlbHkgb3BlbiBzbyB0aGF0IE1EQyBkb2VzIG5vdCBjbG9zZSBpdHNlbGYuXG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5zZXRUaW1lb3V0TXMoLTEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgYXR0YWNoZWQgY29tcG9uZW50IG9yIHRlbXBsYXRlIHVzZXMgdGhlIE1EQyB0ZW1wbGF0ZSBzdHJ1Y3R1cmUsXG4gICAgLy8gc3BlY2lmaWNhbGx5IHRoZSBNREMgbGFiZWwuIElmIG5vdCwgdGhlIGNvbnRhaW5lciBzaG91bGQgYXBwbHkgdGhlIE1EQyBsYWJlbCBjbGFzcyB0byB0aGlzXG4gICAgLy8gY29tcG9uZW50J3MgbGFiZWwgY29udGFpbmVyLCB3aGljaCB3aWxsIGFwcGx5IE1EQydzIGxhYmVsIHN0eWxlcyB0byB0aGUgYXR0YWNoZWQgdmlldy5cbiAgICBpZiAoIXRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7TURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTfWApKSB7XG4gICAgICB0aGlzLl9sYWJlbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoTURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1EQ19TTkFDS0JBUl9MQUJFTF9DTEFTUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1ha2VzIHN1cmUgdGhlIGV4aXQgY2FsbGJhY2tzIGhhdmUgYmVlbiBpbnZva2VkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZGVzdHJveWVkLiAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9tZGNGb3VuZGF0aW9uLmNsb3NlKCk7XG4gIH1cblxuICBlbnRlcigpIHtcbiAgICB0aGlzLl9tZGNGb3VuZGF0aW9uLm9wZW4oKTtcbiAgfVxuXG4gIGV4aXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgdGhpcy5fZXhpdGluZyA9IHRydWU7XG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5jbG9zZSgpO1xuICAgIHJldHVybiB0aGlzLl9vbkV4aXQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc25hY2sgYmFyIGNvbnRhaW5lci4gKi9cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICB0aGlzLl9hc3NlcnROb3RBdHRhY2hlZCgpO1xuICAgIHRoaXMuX2FwcGx5U25hY2tCYXJDbGFzc2VzKCk7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcbiAgfVxuXG4gIC8qKiBBdHRhY2ggYSB0ZW1wbGF0ZSBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIHRoaXMuX2Fzc2VydE5vdEF0dGFjaGVkKCk7XG4gICAgdGhpcy5fYXBwbHlTbmFja0JhckNsYXNzZXMoKTtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsT3V0bGV0LmF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGFjdGl2ZSA/IGNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpIDogY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzcyk7XG4gIH1cblxuICAvKiogQXBwbGllcyB0aGUgdXNlci1jb25maWd1cmVkIENTUyBjbGFzc2VzIHRvIHRoZSBzbmFjayBiYXIuICovXG4gIHByaXZhdGUgX2FwcGx5U25hY2tCYXJDbGFzc2VzKCkge1xuICAgIGNvbnN0IHBhbmVsQ2xhc3NlcyA9IHRoaXMuc25hY2tCYXJDb25maWcucGFuZWxDbGFzcztcbiAgICBpZiAocGFuZWxDbGFzc2VzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYW5lbENsYXNzZXMpKSB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCB1c2UgYSBzcHJlYWQgaGVyZSwgYmVjYXVzZSBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzLlxuICAgICAgICBwYW5lbENsYXNzZXMuZm9yRWFjaChjc3NDbGFzcyA9PiB0aGlzLl9zZXRDbGFzcyhjc3NDbGFzcywgdHJ1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0Q2xhc3MocGFuZWxDbGFzc2VzLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQXNzZXJ0cyB0aGF0IG5vIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCB0byB0aGUgY29udGFpbmVyLiAqL1xuICBwcml2YXRlIF9hc3NlcnROb3RBdHRhY2hlZCgpIHtcbiAgICBpZiAodGhpcy5fcG9ydGFsT3V0bGV0Lmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0aW5nIHRvIGF0dGFjaCBzbmFjayBiYXIgY29udGVudCBhZnRlciBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==