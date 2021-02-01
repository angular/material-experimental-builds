/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor, FocusTrapFactory } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig, _MatDialogContainerBase } from '@angular/material/dialog';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { cssClasses, numbers } from '@material/dialog';
/**
 * Internal component that wraps user-provided dialog content in a MDC dialog.
 * @docs-private
 */
export class MatDialogContainer extends _MatDialogContainerBase {
    constructor(elementRef, focusTrapFactory, changeDetectorRef, document, config, _animationMode, focusMonitor) {
        super(elementRef, focusTrapFactory, changeDetectorRef, document, config, focusMonitor);
        this._animationMode = _animationMode;
        /** Whether animations are enabled. */
        this._animationsEnabled = this._animationMode !== 'NoopAnimations';
        /** Host element of the dialog container component. */
        this._hostElement = this._elementRef.nativeElement;
        /** Duration of the dialog open animation. */
        this._openAnimationDuration = this._animationsEnabled ? numbers.DIALOG_ANIMATION_OPEN_TIME_MS : 0;
        /** Duration of the dialog close animation. */
        this._closeAnimationDuration = this._animationsEnabled ? numbers.DIALOG_ANIMATION_CLOSE_TIME_MS : 0;
        /** Current timer for dialog animations. */
        this._animationTimer = null;
        /**
         * Completes the dialog open by clearing potential animation classes, trapping
         * focus and emitting an opened event.
         */
        this._finishDialogOpen = () => {
            this._clearAnimationClasses();
            this._trapFocus();
            this._animationStateChanged.emit({ state: 'opened', totalTime: this._openAnimationDuration });
        };
        /**
         * Completes the dialog close by clearing potential animation classes, restoring
         * focus and emitting a closed event.
         */
        this._finishDialogClose = () => {
            this._clearAnimationClasses();
            this._restoreFocus();
            this._animationStateChanged.emit({ state: 'closed', totalTime: this._closeAnimationDuration });
        };
    }
    _initializeWithAttachedContent() {
        // Delegate to the original dialog-container initialization (i.e. saving the
        // previous element, setting up the focus trap and moving focus to the container).
        super._initializeWithAttachedContent();
        // Note: Usually we would be able to use the MDC dialog foundation here to handle
        // the dialog animation for us, but there are a few reasons why we just leverage
        // their styles and not use the runtime foundation code:
        //   1. Foundation does not allow us to disable animations.
        //   2. Foundation contains unnecessary features we don't need and aren't
        //      tree-shakeable. e.g. background scrim, keyboard event handlers for ESC button.
        //   3. Foundation uses unnecessary timers for animations to work around limitations
        //      in React's `setState` mechanism.
        //      https://github.com/material-components/material-components-web/pull/3682.
        this._startOpenAnimation();
    }
    ngOnDestroy() {
        if (this._animationTimer !== null) {
            clearTimeout(this._animationTimer);
        }
    }
    /** Starts the dialog open animation if enabled. */
    _startOpenAnimation() {
        this._animationStateChanged.emit({ state: 'opening', totalTime: this._openAnimationDuration });
        if (this._animationsEnabled) {
            // One would expect that the open class is added once the animation finished, but MDC
            // uses the open class in combination with the opening class to start the animation.
            this._hostElement.classList.add(cssClasses.OPENING);
            this._hostElement.classList.add(cssClasses.OPEN);
            this._waitForAnimationToComplete(this._openAnimationDuration, this._finishDialogOpen);
        }
        else {
            this._hostElement.classList.add(cssClasses.OPEN);
            // Note: We could immediately finish the dialog opening here with noop animations,
            // but we defer until next tick so that consumers can subscribe to `afterOpened`.
            // Executing this immediately would mean that `afterOpened` emits synchronously
            // on `dialog.open` before the consumer had a change to subscribe to `afterOpened`.
            Promise.resolve().then(() => this._finishDialogOpen());
        }
    }
    /**
     * Starts the exit animation of the dialog if enabled. This method is
     * called by the dialog ref.
     */
    _startExitAnimation() {
        this._animationStateChanged.emit({ state: 'closing', totalTime: this._closeAnimationDuration });
        this._hostElement.classList.remove(cssClasses.OPEN);
        if (this._animationsEnabled) {
            this._hostElement.classList.add(cssClasses.CLOSING);
            this._waitForAnimationToComplete(this._closeAnimationDuration, this._finishDialogClose);
        }
        else {
            // This subscription to the `OverlayRef#backdropClick` observable in the `DialogRef` is
            // set up before any user can subscribe to the backdrop click. The subscription triggers
            // the dialog close and this method synchronously. If we'd synchronously emit the `CLOSED`
            // animation state event if animations are disabled, the overlay would be disposed
            // immediately and all other subscriptions to `DialogRef#backdropClick` would be silently
            // skipped. We work around this by waiting with the dialog close until the next tick when
            // all subscriptions have been fired as expected. This is not an ideal solution, but
            // there doesn't seem to be any other good way. Alternatives that have been considered:
            //   1. Deferring `DialogRef.close`. This could be a breaking change due to a new microtask.
            //      Also this issue is specific to the MDC implementation where the dialog could
            //      technically be closed synchronously. In the non-MDC one, Angular animations are used
            //      and closing always takes at least a tick.
            //   2. Ensuring that user subscriptions to `backdropClick`, `keydownEvents` in the dialog
            //      ref are first. This would solve the issue, but has the risk of memory leaks and also
            //      doesn't solve the case where consumers call `DialogRef.close` in their subscriptions.
            // Based on the fact that this is specific to the MDC-based implementation of the dialog
            // animations, the defer is applied here.
            Promise.resolve().then(() => this._finishDialogClose());
        }
    }
    /** Clears all dialog animation classes. */
    _clearAnimationClasses() {
        this._hostElement.classList.remove(cssClasses.OPENING);
        this._hostElement.classList.remove(cssClasses.CLOSING);
    }
    _waitForAnimationToComplete(duration, callback) {
        if (this._animationTimer !== null) {
            clearTimeout(this._animationTimer);
        }
        // Note that we want this timer to run inside the NgZone, because we want
        // the related events like `afterClosed` to be inside the zone as well.
        this._animationTimer = setTimeout(callback, duration);
    }
}
MatDialogContainer.decorators = [
    { type: Component, args: [{
                selector: 'mat-mdc-dialog-container',
                template: "<div class=\"mdc-dialog__container\">\n  <div class=\"mat-mdc-dialog-surface mdc-dialog__surface\">\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'mat-mdc-dialog-container mdc-dialog',
                    'tabindex': '-1',
                    'aria-modal': 'true',
                    '[id]': '_id',
                    '[attr.role]': '_config.role',
                    '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
                    '[attr.aria-label]': '_config.ariaLabel',
                    '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
                    '[class._mat-animation-noopable]': '!_animationsEnabled',
                },
                styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}@media(max-width: 960px)and (max-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;max-width:560px}}@media(max-width: 720px)and (max-height: 1023px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 112px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:560px}}@media(max-width: 720px)and (max-height: 1023px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:100vw;width:100vw;max-height:100vh;height:100vh;border-radius:0}}@media(max-width: 600px)and (max-height: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:100vw;width:100vw;max-height:100vh;height:100vh;border-radius:0}}@media(min-width: 960px)and (min-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 400px)}}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{display:inline-flex;padding:0 16px 9px;border-bottom:1px solid transparent;justify-content:space-between;align-items:baseline}.mdc-dialog--fullscreen .mdc-dialog__title{padding:0;border-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{width:24px;height:24px;padding:0px}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{display:block;width:100%;height:100%}.mat-mdc-dialog-container{outline:0}.cdk-high-contrast-active .mat-mdc-dialog-container{outline:solid 1px}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-actions{justify-content:start}.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container{transition:none}\n"]
            },] }
];
MatDialogContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusTrapFactory },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: MatDialogConfig },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: FocusMonitor }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWRpYWxvZy9kaWFsb2ctY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBRU4sUUFBUSxFQUNSLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFFLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVyRDs7O0dBR0c7QUFtQkgsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHVCQUF1QjtJQWU3RCxZQUNJLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxpQkFBb0MsRUFDTixRQUFhLEVBQzNDLE1BQXVCLEVBQzRCLGNBQXVCLEVBQzFFLFlBQTJCO1FBQzdCLEtBQUssQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUZsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBUztRQXBCOUUsc0NBQXNDO1FBQ3RDLHVCQUFrQixHQUFZLElBQUksQ0FBQyxjQUFjLEtBQUssZ0JBQWdCLENBQUM7UUFFdkUsc0RBQXNEO1FBQzlDLGlCQUFZLEdBQWdCLElBQUksQ0FBQyxX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QUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNwQztRQUVELHlFQUF5RTtRQUN6RSx1RUFBdUU7UUFDdkUsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7OztZQTVKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsb0xBQW9DO2dCQUVwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUscUNBQXFDO29CQUM5QyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsWUFBWSxFQUFFLE1BQU07b0JBQ3BCLE1BQU0sRUFBRSxLQUFLO29CQUNiLGFBQWEsRUFBRSxjQUFjO29CQUM3Qix3QkFBd0IsRUFBRSw0Q0FBNEM7b0JBQ3RFLG1CQUFtQixFQUFFLG1CQUFtQjtvQkFDeEMseUJBQXlCLEVBQUUsaUNBQWlDO29CQUM1RCxpQ0FBaUMsRUFBRSxxQkFBcUI7aUJBQ3pEOzthQUNGOzs7WUEvQkMsVUFBVTtZQU5VLGdCQUFnQjtZQUlwQyxpQkFBaUI7NENBcURaLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTtZQTdDMUIsZUFBZTt5Q0ErQ2hCLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO1lBM0R2QyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Rm9jdXNNb25pdG9yLCBGb2N1c1RyYXBGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ0NvbmZpZywgX01hdERpYWxvZ0NvbnRhaW5lckJhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7Y3NzQ2xhc3NlcywgbnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL2RpYWxvZyc7XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgd3JhcHMgdXNlci1wcm92aWRlZCBkaWFsb2cgY29udGVudCBpbiBhIE1EQyBkaWFsb2cuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZGMtZGlhbG9nLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnZGlhbG9nLWNvbnRhaW5lci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2RpYWxvZy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1kaWFsb2ctY29udGFpbmVyIG1kYy1kaWFsb2cnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ2FyaWEtbW9kYWwnOiAndHJ1ZScsXG4gICAgJ1tpZF0nOiAnX2lkJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnX2NvbmZpZy5yb2xlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdfY29uZmlnLmFyaWFMYWJlbCA/IG51bGwgOiBfYXJpYUxhYmVsbGVkQnknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdfY29uZmlnLmFyaWFMYWJlbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19jb25maWcuYXJpYURlc2NyaWJlZEJ5IHx8IG51bGwnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJyFfYW5pbWF0aW9uc0VuYWJsZWQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXREaWFsb2dDb250YWluZXIgZXh0ZW5kcyBfTWF0RGlhbG9nQ29udGFpbmVyQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQuICovXG4gIF9hbmltYXRpb25zRW5hYmxlZDogYm9vbGVhbiA9IHRoaXMuX2FuaW1hdGlvbk1vZGUgIT09ICdOb29wQW5pbWF0aW9ucyc7XG5cbiAgLyoqIEhvc3QgZWxlbWVudCBvZiB0aGUgZGlhbG9nIGNvbnRhaW5lciBjb21wb25lbnQuICovXG4gIHByaXZhdGUgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgLyoqIER1cmF0aW9uIG9mIHRoZSBkaWFsb2cgb3BlbiBhbmltYXRpb24uICovXG4gIHByaXZhdGUgX29wZW5BbmltYXRpb25EdXJhdGlvbiA9XG4gICAgICB0aGlzLl9hbmltYXRpb25zRW5hYmxlZCA/IG51bWJlcnMuRElBTE9HX0FOSU1BVElPTl9PUEVOX1RJTUVfTVMgOiAwO1xuICAvKiogRHVyYXRpb24gb2YgdGhlIGRpYWxvZyBjbG9zZSBhbmltYXRpb24uICovXG4gIHByaXZhdGUgX2Nsb3NlQW5pbWF0aW9uRHVyYXRpb24gPVxuICAgICAgdGhpcy5fYW5pbWF0aW9uc0VuYWJsZWQgPyBudW1iZXJzLkRJQUxPR19BTklNQVRJT05fQ0xPU0VfVElNRV9NUyA6IDA7XG4gIC8qKiBDdXJyZW50IHRpbWVyIGZvciBkaWFsb2cgYW5pbWF0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uVGltZXI6IG51bWJlcnxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICBmb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICAgIGNvbmZpZzogTWF0RGlhbG9nQ29uZmlnLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHByaXZhdGUgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgICBmb2N1c01vbml0b3I/OiBGb2N1c01vbml0b3IpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBmb2N1c1RyYXBGYWN0b3J5LCBjaGFuZ2VEZXRlY3RvclJlZiwgZG9jdW1lbnQsIGNvbmZpZywgZm9jdXNNb25pdG9yKTtcbiAgfVxuXG4gIF9pbml0aWFsaXplV2l0aEF0dGFjaGVkQ29udGVudCgpIHtcbiAgICAvLyBEZWxlZ2F0ZSB0byB0aGUgb3JpZ2luYWwgZGlhbG9nLWNvbnRhaW5lciBpbml0aWFsaXphdGlvbiAoaS5lLiBzYXZpbmcgdGhlXG4gICAgLy8gcHJldmlvdXMgZWxlbWVudCwgc2V0dGluZyB1cCB0aGUgZm9jdXMgdHJhcCBhbmQgbW92aW5nIGZvY3VzIHRvIHRoZSBjb250YWluZXIpLlxuICAgIHN1cGVyLl9pbml0aWFsaXplV2l0aEF0dGFjaGVkQ29udGVudCgpO1xuICAgIC8vIE5vdGU6IFVzdWFsbHkgd2Ugd291bGQgYmUgYWJsZSB0byB1c2UgdGhlIE1EQyBkaWFsb2cgZm91bmRhdGlvbiBoZXJlIHRvIGhhbmRsZVxuICAgIC8vIHRoZSBkaWFsb2cgYW5pbWF0aW9uIGZvciB1cywgYnV0IHRoZXJlIGFyZSBhIGZldyByZWFzb25zIHdoeSB3ZSBqdXN0IGxldmVyYWdlXG4gICAgLy8gdGhlaXIgc3R5bGVzIGFuZCBub3QgdXNlIHRoZSBydW50aW1lIGZvdW5kYXRpb24gY29kZTpcbiAgICAvLyAgIDEuIEZvdW5kYXRpb24gZG9lcyBub3QgYWxsb3cgdXMgdG8gZGlzYWJsZSBhbmltYXRpb25zLlxuICAgIC8vICAgMi4gRm91bmRhdGlvbiBjb250YWlucyB1bm5lY2Vzc2FyeSBmZWF0dXJlcyB3ZSBkb24ndCBuZWVkIGFuZCBhcmVuJ3RcbiAgICAvLyAgICAgIHRyZWUtc2hha2VhYmxlLiBlLmcuIGJhY2tncm91bmQgc2NyaW0sIGtleWJvYXJkIGV2ZW50IGhhbmRsZXJzIGZvciBFU0MgYnV0dG9uLlxuICAgIC8vICAgMy4gRm91bmRhdGlvbiB1c2VzIHVubmVjZXNzYXJ5IHRpbWVycyBmb3IgYW5pbWF0aW9ucyB0byB3b3JrIGFyb3VuZCBsaW1pdGF0aW9uc1xuICAgIC8vICAgICAgaW4gUmVhY3QncyBgc2V0U3RhdGVgIG1lY2hhbmlzbS5cbiAgICAvLyAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL3B1bGwvMzY4Mi5cbiAgICB0aGlzLl9zdGFydE9wZW5BbmltYXRpb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9hbmltYXRpb25UaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICB9XG4gIH1cblxuICAvKiogU3RhcnRzIHRoZSBkaWFsb2cgb3BlbiBhbmltYXRpb24gaWYgZW5hYmxlZC4gKi9cbiAgcHJpdmF0ZSBfc3RhcnRPcGVuQW5pbWF0aW9uKCkge1xuICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KHtzdGF0ZTogJ29wZW5pbmcnLCB0b3RhbFRpbWU6IHRoaXMuX29wZW5BbmltYXRpb25EdXJhdGlvbn0pO1xuXG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvbnNFbmFibGVkKSB7XG4gICAgICAvLyBPbmUgd291bGQgZXhwZWN0IHRoYXQgdGhlIG9wZW4gY2xhc3MgaXMgYWRkZWQgb25jZSB0aGUgYW5pbWF0aW9uIGZpbmlzaGVkLCBidXQgTURDXG4gICAgICAvLyB1c2VzIHRoZSBvcGVuIGNsYXNzIGluIGNvbWJpbmF0aW9uIHdpdGggdGhlIG9wZW5pbmcgY2xhc3MgdG8gc3RhcnQgdGhlIGFuaW1hdGlvbi5cbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3Nlcy5PUEVOSU5HKTtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgICAgIHRoaXMuX3dhaXRGb3JBbmltYXRpb25Ub0NvbXBsZXRlKHRoaXMuX29wZW5BbmltYXRpb25EdXJhdGlvbiwgdGhpcy5fZmluaXNoRGlhbG9nT3Blbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3Nlcy5PUEVOKTtcbiAgICAgIC8vIE5vdGU6IFdlIGNvdWxkIGltbWVkaWF0ZWx5IGZpbmlzaCB0aGUgZGlhbG9nIG9wZW5pbmcgaGVyZSB3aXRoIG5vb3AgYW5pbWF0aW9ucyxcbiAgICAgIC8vIGJ1dCB3ZSBkZWZlciB1bnRpbCBuZXh0IHRpY2sgc28gdGhhdCBjb25zdW1lcnMgY2FuIHN1YnNjcmliZSB0byBgYWZ0ZXJPcGVuZWRgLlxuICAgICAgLy8gRXhlY3V0aW5nIHRoaXMgaW1tZWRpYXRlbHkgd291bGQgbWVhbiB0aGF0IGBhZnRlck9wZW5lZGAgZW1pdHMgc3luY2hyb25vdXNseVxuICAgICAgLy8gb24gYGRpYWxvZy5vcGVuYCBiZWZvcmUgdGhlIGNvbnN1bWVyIGhhZCBhIGNoYW5nZSB0byBzdWJzY3JpYmUgdG8gYGFmdGVyT3BlbmVkYC5cbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5fZmluaXNoRGlhbG9nT3BlbigpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHRoZSBleGl0IGFuaW1hdGlvbiBvZiB0aGUgZGlhbG9nIGlmIGVuYWJsZWQuIFRoaXMgbWV0aG9kIGlzXG4gICAqIGNhbGxlZCBieSB0aGUgZGlhbG9nIHJlZi5cbiAgICovXG4gIF9zdGFydEV4aXRBbmltYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoe3N0YXRlOiAnY2xvc2luZycsIHRvdGFsVGltZTogdGhpcy5fY2xvc2VBbmltYXRpb25EdXJhdGlvbn0pO1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3Nlcy5PUEVOKTtcblxuICAgIGlmICh0aGlzLl9hbmltYXRpb25zRW5hYmxlZCkge1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzc2VzLkNMT1NJTkcpO1xuICAgICAgdGhpcy5fd2FpdEZvckFuaW1hdGlvblRvQ29tcGxldGUodGhpcy5fY2xvc2VBbmltYXRpb25EdXJhdGlvbiwgdGhpcy5fZmluaXNoRGlhbG9nQ2xvc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGlzIHN1YnNjcmlwdGlvbiB0byB0aGUgYE92ZXJsYXlSZWYjYmFja2Ryb3BDbGlja2Agb2JzZXJ2YWJsZSBpbiB0aGUgYERpYWxvZ1JlZmAgaXNcbiAgICAgIC8vIHNldCB1cCBiZWZvcmUgYW55IHVzZXIgY2FuIHN1YnNjcmliZSB0byB0aGUgYmFja2Ryb3AgY2xpY2suIFRoZSBzdWJzY3JpcHRpb24gdHJpZ2dlcnNcbiAgICAgIC8vIHRoZSBkaWFsb2cgY2xvc2UgYW5kIHRoaXMgbWV0aG9kIHN5bmNocm9ub3VzbHkuIElmIHdlJ2Qgc3luY2hyb25vdXNseSBlbWl0IHRoZSBgQ0xPU0VEYFxuICAgICAgLy8gYW5pbWF0aW9uIHN0YXRlIGV2ZW50IGlmIGFuaW1hdGlvbnMgYXJlIGRpc2FibGVkLCB0aGUgb3ZlcmxheSB3b3VsZCBiZSBkaXNwb3NlZFxuICAgICAgLy8gaW1tZWRpYXRlbHkgYW5kIGFsbCBvdGhlciBzdWJzY3JpcHRpb25zIHRvIGBEaWFsb2dSZWYjYmFja2Ryb3BDbGlja2Agd291bGQgYmUgc2lsZW50bHlcbiAgICAgIC8vIHNraXBwZWQuIFdlIHdvcmsgYXJvdW5kIHRoaXMgYnkgd2FpdGluZyB3aXRoIHRoZSBkaWFsb2cgY2xvc2UgdW50aWwgdGhlIG5leHQgdGljayB3aGVuXG4gICAgICAvLyBhbGwgc3Vic2NyaXB0aW9ucyBoYXZlIGJlZW4gZmlyZWQgYXMgZXhwZWN0ZWQuIFRoaXMgaXMgbm90IGFuIGlkZWFsIHNvbHV0aW9uLCBidXRcbiAgICAgIC8vIHRoZXJlIGRvZXNuJ3Qgc2VlbSB0byBiZSBhbnkgb3RoZXIgZ29vZCB3YXkuIEFsdGVybmF0aXZlcyB0aGF0IGhhdmUgYmVlbiBjb25zaWRlcmVkOlxuICAgICAgLy8gICAxLiBEZWZlcnJpbmcgYERpYWxvZ1JlZi5jbG9zZWAuIFRoaXMgY291bGQgYmUgYSBicmVha2luZyBjaGFuZ2UgZHVlIHRvIGEgbmV3IG1pY3JvdGFzay5cbiAgICAgIC8vICAgICAgQWxzbyB0aGlzIGlzc3VlIGlzIHNwZWNpZmljIHRvIHRoZSBNREMgaW1wbGVtZW50YXRpb24gd2hlcmUgdGhlIGRpYWxvZyBjb3VsZFxuICAgICAgLy8gICAgICB0ZWNobmljYWxseSBiZSBjbG9zZWQgc3luY2hyb25vdXNseS4gSW4gdGhlIG5vbi1NREMgb25lLCBBbmd1bGFyIGFuaW1hdGlvbnMgYXJlIHVzZWRcbiAgICAgIC8vICAgICAgYW5kIGNsb3NpbmcgYWx3YXlzIHRha2VzIGF0IGxlYXN0IGEgdGljay5cbiAgICAgIC8vICAgMi4gRW5zdXJpbmcgdGhhdCB1c2VyIHN1YnNjcmlwdGlvbnMgdG8gYGJhY2tkcm9wQ2xpY2tgLCBga2V5ZG93bkV2ZW50c2AgaW4gdGhlIGRpYWxvZ1xuICAgICAgLy8gICAgICByZWYgYXJlIGZpcnN0LiBUaGlzIHdvdWxkIHNvbHZlIHRoZSBpc3N1ZSwgYnV0IGhhcyB0aGUgcmlzayBvZiBtZW1vcnkgbGVha3MgYW5kIGFsc29cbiAgICAgIC8vICAgICAgZG9lc24ndCBzb2x2ZSB0aGUgY2FzZSB3aGVyZSBjb25zdW1lcnMgY2FsbCBgRGlhbG9nUmVmLmNsb3NlYCBpbiB0aGVpciBzdWJzY3JpcHRpb25zLlxuICAgICAgLy8gQmFzZWQgb24gdGhlIGZhY3QgdGhhdCB0aGlzIGlzIHNwZWNpZmljIHRvIHRoZSBNREMtYmFzZWQgaW1wbGVtZW50YXRpb24gb2YgdGhlIGRpYWxvZ1xuICAgICAgLy8gYW5pbWF0aW9ucywgdGhlIGRlZmVyIGlzIGFwcGxpZWQgaGVyZS5cbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5fZmluaXNoRGlhbG9nQ2xvc2UoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgZGlhbG9nIG9wZW4gYnkgY2xlYXJpbmcgcG90ZW50aWFsIGFuaW1hdGlvbiBjbGFzc2VzLCB0cmFwcGluZ1xuICAgKiBmb2N1cyBhbmQgZW1pdHRpbmcgYW4gb3BlbmVkIGV2ZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfZmluaXNoRGlhbG9nT3BlbiA9XG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NsZWFyQW5pbWF0aW9uQ2xhc3NlcygpO1xuICAgICAgICB0aGlzLl90cmFwRm9jdXMoKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoe3N0YXRlOiAnb3BlbmVkJywgdG90YWxUaW1lOiB0aGlzLl9vcGVuQW5pbWF0aW9uRHVyYXRpb259KTtcbiAgICAgIH1cblxuICAvKipcbiAgICogQ29tcGxldGVzIHRoZSBkaWFsb2cgY2xvc2UgYnkgY2xlYXJpbmcgcG90ZW50aWFsIGFuaW1hdGlvbiBjbGFzc2VzLCByZXN0b3JpbmdcbiAgICogZm9jdXMgYW5kIGVtaXR0aW5nIGEgY2xvc2VkIGV2ZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfZmluaXNoRGlhbG9nQ2xvc2UgPVxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jbGVhckFuaW1hdGlvbkNsYXNzZXMoKTtcbiAgICAgICAgdGhpcy5fcmVzdG9yZUZvY3VzKCk7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KFxuICAgICAgICAgICAge3N0YXRlOiAnY2xvc2VkJywgdG90YWxUaW1lOiB0aGlzLl9jbG9zZUFuaW1hdGlvbkR1cmF0aW9ufSk7XG4gICAgICB9XG5cbiAgLyoqIENsZWFycyBhbGwgZGlhbG9nIGFuaW1hdGlvbiBjbGFzc2VzLiAqL1xuICBwcml2YXRlIF9jbGVhckFuaW1hdGlvbkNsYXNzZXMoKSB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzc2VzLk9QRU5JTkcpO1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3Nlcy5DTE9TSU5HKTtcbiAgfVxuXG4gIHByaXZhdGUgX3dhaXRGb3JBbmltYXRpb25Ub0NvbXBsZXRlKGR1cmF0aW9uOiBudW1iZXIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvblRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fYW5pbWF0aW9uVGltZXIpO1xuICAgIH1cblxuICAgIC8vIE5vdGUgdGhhdCB3ZSB3YW50IHRoaXMgdGltZXIgdG8gcnVuIGluc2lkZSB0aGUgTmdab25lLCBiZWNhdXNlIHdlIHdhbnRcbiAgICAvLyB0aGUgcmVsYXRlZCBldmVudHMgbGlrZSBgYWZ0ZXJDbG9zZWRgIHRvIGJlIGluc2lkZSB0aGUgem9uZSBhcyB3ZWxsLlxuICAgIHRoaXMuX2FuaW1hdGlvblRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgZHVyYXRpb24pO1xuICB9XG59XG4iXX0=