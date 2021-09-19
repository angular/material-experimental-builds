/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor, FocusTrapFactory, InteractivityChecker } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Optional, ViewEncapsulation, NgZone } from '@angular/core';
import { MatDialogConfig, _MatDialogContainerBase } from '@angular/material/dialog';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { cssClasses, numbers } from '@material/dialog';
/**
 * Internal component that wraps user-provided dialog content in a MDC dialog.
 * @docs-private
 */
export class MatDialogContainer extends _MatDialogContainerBase {
    constructor(elementRef, focusTrapFactory, changeDetectorRef, document, config, checker, ngZone, _animationMode, focusMonitor) {
        super(elementRef, focusTrapFactory, changeDetectorRef, document, config, checker, ngZone, focusMonitor);
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
                selector: 'mat-dialog-container',
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
                styles: [".mdc-dialog .mdc-dialog__close.mdc-ripple-upgraded--background-focused .mdc-icon-button__ripple::before,.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):focus .mdc-icon-button__ripple::before{transition-duration:75ms}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded) .mdc-icon-button__ripple::after{transition:opacity 150ms linear}.mdc-dialog .mdc-dialog__close:not(.mdc-ripple-upgraded):active .mdc-icon-button__ripple::after{transition-duration:75ms}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}@media(max-width: 960px)and (max-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;max-width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 1023px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 112px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:560px}}@media(max-width: 720px)and (max-height: 1023px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (max-height: 1023px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px)and (max-height: 1023px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100%;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(max-width: 600px)and (max-height: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px)and (min-height: 1440px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid transparent;border-radius:inherit;content:\"\";pointer-events:none}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid transparent;display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid transparent}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1;z-index:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{display:block;width:100%;height:100%}.mat-mdc-dialog-container{outline:0}.cdk-high-contrast-active .mat-mdc-dialog-container{outline:solid 1px}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-actions{justify-content:start}.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container{transition:none}\n"]
            },] }
];
MatDialogContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusTrapFactory },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: MatDialogConfig },
    { type: InteractivityChecker },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: FocusMonitor }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWRpYWxvZy9kaWFsb2ctY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBRU4sUUFBUSxFQUNSLGlCQUFpQixFQUNqQixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFckQ7OztHQUdHO0FBbUJILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSx1QkFBdUI7SUFlN0QsWUFDSSxVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsaUJBQW9DLEVBQ04sUUFBYSxFQUMzQyxNQUF1QixFQUN2QixPQUE2QixFQUM3QixNQUFjLEVBQ3FDLGNBQXVCLEVBQzFFLFlBQTJCO1FBRTdCLEtBQUssQ0FDSCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixRQUFRLEVBQ1IsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sWUFBWSxDQUNiLENBQUM7UUFabUQsbUJBQWMsR0FBZCxjQUFjLENBQVM7UUF0QjlFLHNDQUFzQztRQUN0Qyx1QkFBa0IsR0FBWSxJQUFJLENB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Z0IsRUFBRSxRQUFvQjtRQUN4RSxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ2pDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDcEM7UUFFRCx5RUFBeUU7UUFDekUsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7WUF4S0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLG9MQUFvQztnQkFFcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHFDQUFxQztvQkFDOUMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFlBQVksRUFBRSxNQUFNO29CQUNwQixNQUFNLEVBQUUsS0FBSztvQkFDYixhQUFhLEVBQUUsY0FBYztvQkFDN0Isd0JBQXdCLEVBQUUsNENBQTRDO29CQUN0RSxtQkFBbUIsRUFBRSxtQkFBbUI7b0JBQ3hDLHlCQUF5QixFQUFFLGlDQUFpQztvQkFDNUQsaUNBQWlDLEVBQUUscUJBQXFCO2lCQUN6RDs7YUFDRjs7O1lBaENDLFVBQVU7WUFOVSxnQkFBZ0I7WUFJcEMsaUJBQWlCOzRDQXNEWixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7WUE3QzFCLGVBQWU7WUFiaUIsb0JBQW9CO1lBVzFELE1BQU07eUNBbURELFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCO1lBOUR2QyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Rm9jdXNNb25pdG9yLCBGb2N1c1RyYXBGYWN0b3J5LCBJbnRlcmFjdGl2aXR5Q2hlY2tlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ0NvbmZpZywgX01hdERpYWxvZ0NvbnRhaW5lckJhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7Y3NzQ2xhc3NlcywgbnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL2RpYWxvZyc7XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgd3JhcHMgdXNlci1wcm92aWRlZCBkaWFsb2cgY29udGVudCBpbiBhIE1EQyBkaWFsb2cuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1kaWFsb2ctY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICdkaWFsb2ctY29udGFpbmVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGlhbG9nLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWRpYWxvZy1jb250YWluZXIgbWRjLWRpYWxvZycsXG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAnYXJpYS1tb2RhbCc6ICd0cnVlJyxcbiAgICAnW2lkXSc6ICdfaWQnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdfY29uZmlnLnJvbGUnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ19jb25maWcuYXJpYUxhYmVsID8gbnVsbCA6IF9hcmlhTGFiZWxsZWRCeScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ19jb25maWcuYXJpYUxhYmVsJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2NvbmZpZy5hcmlhRGVzY3JpYmVkQnkgfHwgbnVsbCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnIV9hbmltYXRpb25zRW5hYmxlZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERpYWxvZ0NvbnRhaW5lciBleHRlbmRzIF9NYXREaWFsb2dDb250YWluZXJCYXNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIFdoZXRoZXIgYW5pbWF0aW9ucyBhcmUgZW5hYmxlZC4gKi9cbiAgX2FuaW1hdGlvbnNFbmFibGVkOiBib29sZWFuID0gdGhpcy5fYW5pbWF0aW9uTW9kZSAhPT0gJ05vb3BBbmltYXRpb25zJztcblxuICAvKiogSG9zdCBlbGVtZW50IG9mIHRoZSBkaWFsb2cgY29udGFpbmVyIGNvbXBvbmVudC4gKi9cbiAgcHJpdmF0ZSBfaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAvKiogRHVyYXRpb24gb2YgdGhlIGRpYWxvZyBvcGVuIGFuaW1hdGlvbi4gKi9cbiAgcHJpdmF0ZSBfb3BlbkFuaW1hdGlvbkR1cmF0aW9uID1cbiAgICAgIHRoaXMuX2FuaW1hdGlvbnNFbmFibGVkID8gbnVtYmVycy5ESUFMT0dfQU5JTUFUSU9OX09QRU5fVElNRV9NUyA6IDA7XG4gIC8qKiBEdXJhdGlvbiBvZiB0aGUgZGlhbG9nIGNsb3NlIGFuaW1hdGlvbi4gKi9cbiAgcHJpdmF0ZSBfY2xvc2VBbmltYXRpb25EdXJhdGlvbiA9XG4gICAgICB0aGlzLl9hbmltYXRpb25zRW5hYmxlZCA/IG51bWJlcnMuRElBTE9HX0FOSU1BVElPTl9DTE9TRV9USU1FX01TIDogMDtcbiAgLyoqIEN1cnJlbnQgdGltZXIgZm9yIGRpYWxvZyBhbmltYXRpb25zLiAqL1xuICBwcml2YXRlIF9hbmltYXRpb25UaW1lcjogbnVtYmVyfG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIGZvY3VzVHJhcEZhY3Rvcnk6IEZvY3VzVHJhcEZhY3RvcnksXG4gICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICAgICAgY29uZmlnOiBNYXREaWFsb2dDb25maWcsXG4gICAgICBjaGVja2VyOiBJbnRlcmFjdGl2aXR5Q2hlY2tlcixcbiAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHByaXZhdGUgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgICBmb2N1c01vbml0b3I/OiBGb2N1c01vbml0b3JcbiAgICAgICkge1xuICAgIHN1cGVyKFxuICAgICAgZWxlbWVudFJlZixcbiAgICAgIGZvY3VzVHJhcEZhY3RvcnksXG4gICAgICBjaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIGRvY3VtZW50LFxuICAgICAgY29uZmlnLFxuICAgICAgY2hlY2tlcixcbiAgICAgIG5nWm9uZSxcbiAgICAgIGZvY3VzTW9uaXRvclxuICAgICk7XG4gIH1cblxuICBvdmVycmlkZSBfaW5pdGlhbGl6ZVdpdGhBdHRhY2hlZENvbnRlbnQoKSB7XG4gICAgLy8gRGVsZWdhdGUgdG8gdGhlIG9yaWdpbmFsIGRpYWxvZy1jb250YWluZXIgaW5pdGlhbGl6YXRpb24gKGkuZS4gc2F2aW5nIHRoZVxuICAgIC8vIHByZXZpb3VzIGVsZW1lbnQsIHNldHRpbmcgdXAgdGhlIGZvY3VzIHRyYXAgYW5kIG1vdmluZyBmb2N1cyB0byB0aGUgY29udGFpbmVyKS5cbiAgICBzdXBlci5faW5pdGlhbGl6ZVdpdGhBdHRhY2hlZENvbnRlbnQoKTtcbiAgICAvLyBOb3RlOiBVc3VhbGx5IHdlIHdvdWxkIGJlIGFibGUgdG8gdXNlIHRoZSBNREMgZGlhbG9nIGZvdW5kYXRpb24gaGVyZSB0byBoYW5kbGVcbiAgICAvLyB0aGUgZGlhbG9nIGFuaW1hdGlvbiBmb3IgdXMsIGJ1dCB0aGVyZSBhcmUgYSBmZXcgcmVhc29ucyB3aHkgd2UganVzdCBsZXZlcmFnZVxuICAgIC8vIHRoZWlyIHN0eWxlcyBhbmQgbm90IHVzZSB0aGUgcnVudGltZSBmb3VuZGF0aW9uIGNvZGU6XG4gICAgLy8gICAxLiBGb3VuZGF0aW9uIGRvZXMgbm90IGFsbG93IHVzIHRvIGRpc2FibGUgYW5pbWF0aW9ucy5cbiAgICAvLyAgIDIuIEZvdW5kYXRpb24gY29udGFpbnMgdW5uZWNlc3NhcnkgZmVhdHVyZXMgd2UgZG9uJ3QgbmVlZCBhbmQgYXJlbid0XG4gICAgLy8gICAgICB0cmVlLXNoYWtlYWJsZS4gZS5nLiBiYWNrZ3JvdW5kIHNjcmltLCBrZXlib2FyZCBldmVudCBoYW5kbGVycyBmb3IgRVNDIGJ1dHRvbi5cbiAgICAvLyAgIDMuIEZvdW5kYXRpb24gdXNlcyB1bm5lY2Vzc2FyeSB0aW1lcnMgZm9yIGFuaW1hdGlvbnMgdG8gd29yayBhcm91bmQgbGltaXRhdGlvbnNcbiAgICAvLyAgICAgIGluIFJlYWN0J3MgYHNldFN0YXRlYCBtZWNoYW5pc20uXG4gICAgLy8gICAgICBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9wdWxsLzM2ODIuXG4gICAgdGhpcy5fc3RhcnRPcGVuQW5pbWF0aW9uKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uVGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hbmltYXRpb25UaW1lcik7XG4gICAgfVxuICB9XG5cbiAgLyoqIFN0YXJ0cyB0aGUgZGlhbG9nIG9wZW4gYW5pbWF0aW9uIGlmIGVuYWJsZWQuICovXG4gIHByaXZhdGUgX3N0YXJ0T3BlbkFuaW1hdGlvbigpIHtcbiAgICB0aGlzLl9hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdCh7c3RhdGU6ICdvcGVuaW5nJywgdG90YWxUaW1lOiB0aGlzLl9vcGVuQW5pbWF0aW9uRHVyYXRpb259KTtcblxuICAgIGlmICh0aGlzLl9hbmltYXRpb25zRW5hYmxlZCkge1xuICAgICAgLy8gT25lIHdvdWxkIGV4cGVjdCB0aGF0IHRoZSBvcGVuIGNsYXNzIGlzIGFkZGVkIG9uY2UgdGhlIGFuaW1hdGlvbiBmaW5pc2hlZCwgYnV0IE1EQ1xuICAgICAgLy8gdXNlcyB0aGUgb3BlbiBjbGFzcyBpbiBjb21iaW5hdGlvbiB3aXRoIHRoZSBvcGVuaW5nIGNsYXNzIHRvIHN0YXJ0IHRoZSBhbmltYXRpb24uXG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzZXMuT1BFTklORyk7XG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzZXMuT1BFTik7XG4gICAgICB0aGlzLl93YWl0Rm9yQW5pbWF0aW9uVG9Db21wbGV0ZSh0aGlzLl9vcGVuQW5pbWF0aW9uRHVyYXRpb24sIHRoaXMuX2ZpbmlzaERpYWxvZ09wZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzZXMuT1BFTik7XG4gICAgICAvLyBOb3RlOiBXZSBjb3VsZCBpbW1lZGlhdGVseSBmaW5pc2ggdGhlIGRpYWxvZyBvcGVuaW5nIGhlcmUgd2l0aCBub29wIGFuaW1hdGlvbnMsXG4gICAgICAvLyBidXQgd2UgZGVmZXIgdW50aWwgbmV4dCB0aWNrIHNvIHRoYXQgY29uc3VtZXJzIGNhbiBzdWJzY3JpYmUgdG8gYGFmdGVyT3BlbmVkYC5cbiAgICAgIC8vIEV4ZWN1dGluZyB0aGlzIGltbWVkaWF0ZWx5IHdvdWxkIG1lYW4gdGhhdCBgYWZ0ZXJPcGVuZWRgIGVtaXRzIHN5bmNocm9ub3VzbHlcbiAgICAgIC8vIG9uIGBkaWFsb2cub3BlbmAgYmVmb3JlIHRoZSBjb25zdW1lciBoYWQgYSBjaGFuZ2UgdG8gc3Vic2NyaWJlIHRvIGBhZnRlck9wZW5lZGAuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuX2ZpbmlzaERpYWxvZ09wZW4oKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgZXhpdCBhbmltYXRpb24gb2YgdGhlIGRpYWxvZyBpZiBlbmFibGVkLiBUaGlzIG1ldGhvZCBpc1xuICAgKiBjYWxsZWQgYnkgdGhlIGRpYWxvZyByZWYuXG4gICAqL1xuICBfc3RhcnRFeGl0QW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KHtzdGF0ZTogJ2Nsb3NpbmcnLCB0b3RhbFRpbWU6IHRoaXMuX2Nsb3NlQW5pbWF0aW9uRHVyYXRpb259KTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzZXMuT1BFTik7XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3Nlcy5DTE9TSU5HKTtcbiAgICAgIHRoaXMuX3dhaXRGb3JBbmltYXRpb25Ub0NvbXBsZXRlKHRoaXMuX2Nsb3NlQW5pbWF0aW9uRHVyYXRpb24sIHRoaXMuX2ZpbmlzaERpYWxvZ0Nsb3NlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhpcyBzdWJzY3JpcHRpb24gdG8gdGhlIGBPdmVybGF5UmVmI2JhY2tkcm9wQ2xpY2tgIG9ic2VydmFibGUgaW4gdGhlIGBEaWFsb2dSZWZgIGlzXG4gICAgICAvLyBzZXQgdXAgYmVmb3JlIGFueSB1c2VyIGNhbiBzdWJzY3JpYmUgdG8gdGhlIGJhY2tkcm9wIGNsaWNrLiBUaGUgc3Vic2NyaXB0aW9uIHRyaWdnZXJzXG4gICAgICAvLyB0aGUgZGlhbG9nIGNsb3NlIGFuZCB0aGlzIG1ldGhvZCBzeW5jaHJvbm91c2x5LiBJZiB3ZSdkIHN5bmNocm9ub3VzbHkgZW1pdCB0aGUgYENMT1NFRGBcbiAgICAgIC8vIGFuaW1hdGlvbiBzdGF0ZSBldmVudCBpZiBhbmltYXRpb25zIGFyZSBkaXNhYmxlZCwgdGhlIG92ZXJsYXkgd291bGQgYmUgZGlzcG9zZWRcbiAgICAgIC8vIGltbWVkaWF0ZWx5IGFuZCBhbGwgb3RoZXIgc3Vic2NyaXB0aW9ucyB0byBgRGlhbG9nUmVmI2JhY2tkcm9wQ2xpY2tgIHdvdWxkIGJlIHNpbGVudGx5XG4gICAgICAvLyBza2lwcGVkLiBXZSB3b3JrIGFyb3VuZCB0aGlzIGJ5IHdhaXRpbmcgd2l0aCB0aGUgZGlhbG9nIGNsb3NlIHVudGlsIHRoZSBuZXh0IHRpY2sgd2hlblxuICAgICAgLy8gYWxsIHN1YnNjcmlwdGlvbnMgaGF2ZSBiZWVuIGZpcmVkIGFzIGV4cGVjdGVkLiBUaGlzIGlzIG5vdCBhbiBpZGVhbCBzb2x1dGlvbiwgYnV0XG4gICAgICAvLyB0aGVyZSBkb2Vzbid0IHNlZW0gdG8gYmUgYW55IG90aGVyIGdvb2Qgd2F5LiBBbHRlcm5hdGl2ZXMgdGhhdCBoYXZlIGJlZW4gY29uc2lkZXJlZDpcbiAgICAgIC8vICAgMS4gRGVmZXJyaW5nIGBEaWFsb2dSZWYuY2xvc2VgLiBUaGlzIGNvdWxkIGJlIGEgYnJlYWtpbmcgY2hhbmdlIGR1ZSB0byBhIG5ldyBtaWNyb3Rhc2suXG4gICAgICAvLyAgICAgIEFsc28gdGhpcyBpc3N1ZSBpcyBzcGVjaWZpYyB0byB0aGUgTURDIGltcGxlbWVudGF0aW9uIHdoZXJlIHRoZSBkaWFsb2cgY291bGRcbiAgICAgIC8vICAgICAgdGVjaG5pY2FsbHkgYmUgY2xvc2VkIHN5bmNocm9ub3VzbHkuIEluIHRoZSBub24tTURDIG9uZSwgQW5ndWxhciBhbmltYXRpb25zIGFyZSB1c2VkXG4gICAgICAvLyAgICAgIGFuZCBjbG9zaW5nIGFsd2F5cyB0YWtlcyBhdCBsZWFzdCBhIHRpY2suXG4gICAgICAvLyAgIDIuIEVuc3VyaW5nIHRoYXQgdXNlciBzdWJzY3JpcHRpb25zIHRvIGBiYWNrZHJvcENsaWNrYCwgYGtleWRvd25FdmVudHNgIGluIHRoZSBkaWFsb2dcbiAgICAgIC8vICAgICAgcmVmIGFyZSBmaXJzdC4gVGhpcyB3b3VsZCBzb2x2ZSB0aGUgaXNzdWUsIGJ1dCBoYXMgdGhlIHJpc2sgb2YgbWVtb3J5IGxlYWtzIGFuZCBhbHNvXG4gICAgICAvLyAgICAgIGRvZXNuJ3Qgc29sdmUgdGhlIGNhc2Ugd2hlcmUgY29uc3VtZXJzIGNhbGwgYERpYWxvZ1JlZi5jbG9zZWAgaW4gdGhlaXIgc3Vic2NyaXB0aW9ucy5cbiAgICAgIC8vIEJhc2VkIG9uIHRoZSBmYWN0IHRoYXQgdGhpcyBpcyBzcGVjaWZpYyB0byB0aGUgTURDLWJhc2VkIGltcGxlbWVudGF0aW9uIG9mIHRoZSBkaWFsb2dcbiAgICAgIC8vIGFuaW1hdGlvbnMsIHRoZSBkZWZlciBpcyBhcHBsaWVkIGhlcmUuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuX2ZpbmlzaERpYWxvZ0Nsb3NlKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZXMgdGhlIGRpYWxvZyBvcGVuIGJ5IGNsZWFyaW5nIHBvdGVudGlhbCBhbmltYXRpb24gY2xhc3NlcywgdHJhcHBpbmdcbiAgICogZm9jdXMgYW5kIGVtaXR0aW5nIGFuIG9wZW5lZCBldmVudC5cbiAgICovXG4gIHByaXZhdGUgX2ZpbmlzaERpYWxvZ09wZW4gPVxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jbGVhckFuaW1hdGlvbkNsYXNzZXMoKTtcbiAgICAgICAgdGhpcy5fdHJhcEZvY3VzKCk7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KHtzdGF0ZTogJ29wZW5lZCcsIHRvdGFsVGltZTogdGhpcy5fb3BlbkFuaW1hdGlvbkR1cmF0aW9ufSk7XG4gICAgICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgZGlhbG9nIGNsb3NlIGJ5IGNsZWFyaW5nIHBvdGVudGlhbCBhbmltYXRpb24gY2xhc3NlcywgcmVzdG9yaW5nXG4gICAqIGZvY3VzIGFuZCBlbWl0dGluZyBhIGNsb3NlZCBldmVudC5cbiAgICovXG4gIHByaXZhdGUgX2ZpbmlzaERpYWxvZ0Nsb3NlID1cbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2xlYXJBbmltYXRpb25DbGFzc2VzKCk7XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVGb2N1cygpO1xuICAgICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChcbiAgICAgICAgICAgIHtzdGF0ZTogJ2Nsb3NlZCcsIHRvdGFsVGltZTogdGhpcy5fY2xvc2VBbmltYXRpb25EdXJhdGlvbn0pO1xuICAgICAgfVxuXG4gIC8qKiBDbGVhcnMgYWxsIGRpYWxvZyBhbmltYXRpb24gY2xhc3Nlcy4gKi9cbiAgcHJpdmF0ZSBfY2xlYXJBbmltYXRpb25DbGFzc2VzKCkge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3Nlcy5PUEVOSU5HKTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzZXMuQ0xPU0lORyk7XG4gIH1cblxuICBwcml2YXRlIF93YWl0Rm9yQW5pbWF0aW9uVG9Db21wbGV0ZShkdXJhdGlvbjogbnVtYmVyLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLl9hbmltYXRpb25UaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVyKTtcbiAgICB9XG5cbiAgICAvLyBOb3RlIHRoYXQgd2Ugd2FudCB0aGlzIHRpbWVyIHRvIHJ1biBpbnNpZGUgdGhlIE5nWm9uZSwgYmVjYXVzZSB3ZSB3YW50XG4gICAgLy8gdGhlIHJlbGF0ZWQgZXZlbnRzIGxpa2UgYGFmdGVyQ2xvc2VkYCB0byBiZSBpbnNpZGUgdGhlIHpvbmUgYXMgd2VsbC5cbiAgICB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIGR1cmF0aW9uKTtcbiAgfVxufVxuIl19