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
export { MatSnackBarContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNuYWNrLWJhci9zbmFjay1iYXItY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUdoQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFHVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBb0IsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRixPQUFPLEVBQXFCLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUV6Qzs7O0dBR0c7QUFDSCxNQUFNLHdCQUF3QixHQUFHLHFCQUFxQixDQUFDO0FBRXZEOzs7R0FHRztBQUNIO0lBQUEsTUFvQmEsb0JBQXFCLFNBQVEsZ0JBQWdCO1FBMEN4RCxZQUNZLFdBQW9DLEVBQ3JDLGNBQWlDO1lBQzFDLEtBQUssRUFBRSxDQUFDO1lBRkUsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1lBQ3JDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtZQTFDNUMscUVBQXFFO1lBQzVELFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUVoRCwrRUFBK0U7WUFDdEUsYUFBUSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBS2pELGtEQUFrRDtZQUNsRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1lBRVQsZ0JBQVcsR0FBdUI7Z0JBQ3hDLFFBQVEsRUFBRSxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFF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QUFrRjt3QkFDbEYscUZBQXFGO3dCQUNyRixnQkFBZ0I7d0JBQ2hCLGlCQUFpQixFQUFFLHNCQUFzQjtxQkFDMUM7O2lCQUNGOzs7Z0JBdkNDLFVBQVU7Z0JBTUosaUJBQWlCOzs7Z0NBZ0V0QixTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzsyQkFHekMsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7eUJBT25DLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDOztJQXNGcEMsMkJBQUM7S0FBQTtTQTlIWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQmFzZVBvcnRhbE91dGxldCxcbiAgQ2RrUG9ydGFsT3V0bGV0LFxuICBDb21wb25lbnRQb3J0YWwsXG4gIFRlbXBsYXRlUG9ydGFsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0U25hY2tCYXJDb25maWcsIFNuYWNrQmFyQ29udGFpbmVyfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHtNRENTbmFja2JhckFkYXB0ZXIsIE1EQ1NuYWNrYmFyRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL3NuYWNrYmFyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogVGhlIE1EQyBsYWJlbCBjbGFzcyB0aGF0IHNob3VsZCB3cmFwIHRoZSBsYWJlbCBjb250ZW50IG9mIHRoZSBzbmFjayBiYXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmNvbnN0IE1EQ19TTkFDS0JBUl9MQUJFTF9DTEFTUyA9ICdtZGMtc25hY2tiYXJfX2xhYmVsJztcblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCB3cmFwcyB1c2VyLXByb3ZpZGVkIHNuYWNrIGJhciBjb250ZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtbWRjLXNuYWNrLWJhci1jb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJ3NuYWNrLWJhci1jb250YWluZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzbmFjay1iYXItY29udGFpbmVyLmNzcyddLFxuICAvLyBJbiBJdnkgZW1iZWRkZWQgdmlld3Mgd2lsbCBiZSBjaGFuZ2UgZGV0ZWN0ZWQgZnJvbSB0aGVpciBkZWNsYXJhdGlvbiBwbGFjZSwgcmF0aGVyIHRoYW5cbiAgLy8gd2hlcmUgdGhleSB3ZXJlIHN0YW1wZWQgb3V0LiBUaGlzIG1lYW5zIHRoYXQgd2UgY2FuJ3QgaGF2ZSB0aGUgc25hY2sgYmFyIGNvbnRhaW5lciBiZSBPblB1c2gsXG4gIC8vIGJlY2F1c2UgaXQgbWlnaHQgY2F1c2Ugc25hY2sgYmFycyB0aGF0IHdlcmUgb3BlbmVkIGZyb20gYSB0ZW1wbGF0ZSBub3QgdG8gYmUgb3V0IG9mIGRhdGUuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5yb2xlXSc6ICdfcm9sZScsXG4gICAgJ2NsYXNzJzogJ21kYy1zbmFja2JhciBtYXQtbWRjLXNuYWNrLWJhci1jb250YWluZXInLFxuICAgICdbY2xhc3MubWF0LXNuYWNrLWJhci1jb250YWluZXJdJzogJ2ZhbHNlJyxcbiAgICAvLyBNYXJrIHRoaXMgZWxlbWVudCB3aXRoIGEgJ21hdC1leGl0JyBhdHRyaWJ1dGUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgc25hY2tiYXIgaGFzXG4gICAgLy8gYmVlbiBkaXNtaXNzZWQgYW5kIHdpbGwgc29vbiBiZSByZW1vdmVkIGZyb20gdGhlIERPTS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBzbmFja2JhclxuICAgIC8vIHRlc3QgaGFybmVzcy5cbiAgICAnW2F0dHIubWF0LWV4aXRdJzogYF9leGl0aW5nID8gJycgOiBudWxsYCxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhckNvbnRhaW5lciBleHRlbmRzIEJhc2VQb3J0YWxPdXRsZXRcbiAgICBpbXBsZW1lbnRzIFNuYWNrQmFyQ29udGFpbmVyLCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHNuYWNrIGJhciBoYXMgZXhpdGVkIGZyb20gdmlldy4gKi9cbiAgcmVhZG9ubHkgX29uRXhpdDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBzbmFjayBiYXIgaGFzIGZpbmlzaGVkIGVudGVyaW5nIHRoZSB2aWV3LiAqL1xuICByZWFkb25seSBfb25FbnRlcjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIEFSSUEgcm9sZSBmb3IgdGhlIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIF9yb2xlOiAnYWxlcnQnIHwgJ3N0YXR1cycgfCBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbmFjayBiYXIgaXMgY3VycmVudGx5IGV4aXRpbmcuICovXG4gIF9leGl0aW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfbWRjQWRhcHRlcjogTURDU25hY2tiYXJBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuX3NldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5fc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgYW5ub3VuY2U6ICgpID0+IHt9LFxuICAgIG5vdGlmeUNsb3NlZDogKCkgPT4ge1xuICAgICAgdGhpcy5fb25FeGl0Lm5leHQoKTtcbiAgICAgIHRoaXMuX21kY0ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIH0sXG4gICAgbm90aWZ5Q2xvc2luZzogKCkgPT4ge30sXG4gICAgbm90aWZ5T3BlbmVkOiAoKSA9PiB0aGlzLl9vbkVudGVyLm5leHQoKSxcbiAgICBub3RpZnlPcGVuaW5nOiAoKSA9PiB7fSxcbiAgfTtcblxuICBfbWRjRm91bmRhdGlvbiA9IG5ldyBNRENTbmFja2JhckZvdW5kYXRpb24odGhpcy5fbWRjQWRhcHRlcik7XG5cbiAgLyoqIFRoZSBwb3J0YWwgb3V0bGV0IGluc2lkZSBvZiB0aGlzIGNvbnRhaW5lciBpbnRvIHdoaWNoIHRoZSBzbmFjayBiYXIgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHtzdGF0aWM6IHRydWV9KSBfcG9ydGFsT3V0bGV0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgLyoqIEVsZW1lbnQgdGhhdCBhY3RzIGFzIHRoZSBNREMgc3VyZmFjZSBjb250YWluZXIgd2hpY2ggc2hvdWxkIGNvbnRhaW4gdGhlIGxhYmVsIGFuZCBhY3Rpb25zLiAqL1xuICBAVmlld0NoaWxkKCdzdXJmYWNlJywge3N0YXRpYzogdHJ1ZX0pIF9zdXJmYWNlOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBFbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBgbWRjLXNuYWNrYmFyX19sYWJlbGAgY2xhc3MgYXBwbGllZCBpZiB0aGUgYXR0YWNoZWQgY29tcG9uZW50XG4gICAqIG9yIHRlbXBsYXRlIGRvZXMgbm90IGhhdmUgaXQuIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBhcHByb3ByaWF0ZSBzdHJ1Y3R1cmUsIHR5cG9ncmFwaHksIGFuZFxuICAgKiBjb2xvciBpcyBhcHBsaWVkIHRvIHRoZSBhdHRhY2hlZCB2aWV3LlxuICAgKi9cbiAgQFZpZXdDaGlsZCgnbGFiZWwnLCB7c3RhdGljOiB0cnVlfSkgX2xhYmVsOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwdWJsaWMgc25hY2tCYXJDb25maWc6IE1hdFNuYWNrQmFyQ29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIEJhc2VkIG9uIHRoZSBBUklBIHNwZWMsIGBhbGVydGAgYW5kIGBzdGF0dXNgIHJvbGVzIGhhdmUgYW5cbiAgICAvLyBpbXBsaWNpdCBgYXNzZXJ0aXZlYCBhbmQgYHBvbGl0ZWAgcG9saXRlbmVzcyByZXNwZWN0aXZlbHkuXG4gICAgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdhc3NlcnRpdmUnICYmICFzbmFja0JhckNvbmZpZy5hbm5vdW5jZW1lbnRNZXNzYWdlKSB7XG4gICAgICB0aGlzLl9yb2xlID0gJ2FsZXJ0JztcbiAgICB9IGVsc2UgaWYgKHNuYWNrQmFyQ29uZmlnLnBvbGl0ZW5lc3MgPT09ICdvZmYnKSB7XG4gICAgICB0aGlzLl9yb2xlID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcm9sZSA9ICdzdGF0dXMnO1xuICAgIH1cblxuICAgIC8vIGBNYXRTbmFja0JhcmAgd2lsbCB1c2UgdGhlIGNvbmZpZydzIHRpbWVvdXQgdG8gZGV0ZXJtaW5lIHdoZW4gdGhlIHNuYWNrIGJhciBzaG91bGQgYmUgY2xvc2VkLlxuICAgIC8vIFNldCB0aGlzIHRvIGAtMWAgdG8gbWFyayBpdCBhcyBpbmRlZmluaXRlbHkgb3BlbiBzbyB0aGF0IE1EQyBkb2VzIG5vdCBjbG9zZSBpdHNlbGYuXG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5zZXRUaW1lb3V0TXMoLTEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgYXR0YWNoZWQgY29tcG9uZW50IG9yIHRlbXBsYXRlIHVzZXMgdGhlIE1EQyB0ZW1wbGF0ZSBzdHJ1Y3R1cmUsXG4gICAgLy8gc3BlY2lmaWNhbGx5IHRoZSBNREMgbGFiZWwuIElmIG5vdCwgdGhlIGNvbnRhaW5lciBzaG91bGQgYXBwbHkgdGhlIE1EQyBsYWJlbCBjbGFzcyB0byB0aGlzXG4gICAgLy8gY29tcG9uZW50J3MgbGFiZWwgY29udGFpbmVyLCB3aGljaCB3aWxsIGFwcGx5IE1EQydzIGxhYmVsIHN0eWxlcyB0byB0aGUgYXR0YWNoZWQgdmlldy5cbiAgICBpZiAoIXRoaXMuX2xhYmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7TURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTfWApKSB7XG4gICAgICB0aGlzLl9sYWJlbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoTURDX1NOQUNLQkFSX0xBQkVMX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1EQ19TTkFDS0JBUl9MQUJFTF9DTEFTUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1ha2VzIHN1cmUgdGhlIGV4aXQgY2FsbGJhY2tzIGhhdmUgYmVlbiBpbnZva2VkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZGVzdHJveWVkLiAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9tZGNGb3VuZGF0aW9uLmNsb3NlKCk7XG4gIH1cblxuICBlbnRlcigpIHtcbiAgICB0aGlzLl9tZGNGb3VuZGF0aW9uLm9wZW4oKTtcbiAgfVxuXG4gIGV4aXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgdGhpcy5fZXhpdGluZyA9IHRydWU7XG4gICAgdGhpcy5fbWRjRm91bmRhdGlvbi5jbG9zZSgpO1xuICAgIHJldHVybiB0aGlzLl9vbkV4aXQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc25hY2sgYmFyIGNvbnRhaW5lci4gKi9cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICB0aGlzLl9hc3NlcnROb3RBdHRhY2hlZCgpO1xuICAgIHRoaXMuX2FwcGx5U25hY2tCYXJDbGFzc2VzKCk7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcbiAgfVxuXG4gIC8qKiBBdHRhY2ggYSB0ZW1wbGF0ZSBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNuYWNrIGJhciBjb250YWluZXIuICovXG4gIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIHRoaXMuX2Fzc2VydE5vdEF0dGFjaGVkKCk7XG4gICAgdGhpcy5fYXBwbHlTbmFja0JhckNsYXNzZXMoKTtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsT3V0bGV0LmF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGFjdGl2ZSA/IGNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpIDogY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzcyk7XG4gIH1cblxuICAvKiogQXBwbGllcyB0aGUgdXNlci1jb25maWd1cmVkIENTUyBjbGFzc2VzIHRvIHRoZSBzbmFjayBiYXIuICovXG4gIHByaXZhdGUgX2FwcGx5U25hY2tCYXJDbGFzc2VzKCkge1xuICAgIGNvbnN0IHBhbmVsQ2xhc3NlcyA9IHRoaXMuc25hY2tCYXJDb25maWcucGFuZWxDbGFzcztcbiAgICBpZiAocGFuZWxDbGFzc2VzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYW5lbENsYXNzZXMpKSB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCB1c2UgYSBzcHJlYWQgaGVyZSwgYmVjYXVzZSBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzLlxuICAgICAgICBwYW5lbENsYXNzZXMuZm9yRWFjaChjc3NDbGFzcyA9PiB0aGlzLl9zZXRDbGFzcyhjc3NDbGFzcywgdHJ1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0Q2xhc3MocGFuZWxDbGFzc2VzLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQXNzZXJ0cyB0aGF0IG5vIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCB0byB0aGUgY29udGFpbmVyLiAqL1xuICBwcml2YXRlIF9hc3NlcnROb3RBdHRhY2hlZCgpIHtcbiAgICBpZiAodGhpcy5fcG9ydGFsT3V0bGV0Lmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0aW5nIHRvIGF0dGFjaCBzbmFjayBiYXIgY29udGVudCBhZnRlciBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==