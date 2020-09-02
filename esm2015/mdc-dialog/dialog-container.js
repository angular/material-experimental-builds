/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor, FocusTrapFactory } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, Optional, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig, _MatDialogContainerBase } from '@angular/material/dialog';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { cssClasses, numbers } from '@material/dialog';
/**
 * Internal component that wraps user-provided dialog content in a MDC dialog.
 * @docs-private
 */
export class MatDialogContainer extends _MatDialogContainerBase {
    constructor(elementRef, focusTrapFactory, changeDetectorRef, document, config, _ngZone, _animationMode, focusMonitor) {
        super(elementRef, focusTrapFactory, changeDetectorRef, document, config, focusMonitor);
        this._ngZone = _ngZone;
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
        this._ngZone.runOutsideAngular(() => this._animationTimer = setTimeout(callback, duration));
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
                styles: [".mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{display:block;width:100%;height:100%}.mat-mdc-dialog-container{outline:0}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-actions{justify-content:start}.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container{transition:none}\n"]
            },] }
];
MatDialogContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusTrapFactory },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: MatDialogConfig },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: FocusMonitor }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWRpYWxvZy9kaWFsb2ctY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUVOLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFckQ7OztHQUdHO0FBbUJILE1BQU0sT0FBTyxrQkFBbUIsU0FBUSx1QkFBdUI7SUFlN0QsWUFDSSxVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsaUJBQW9DLEVBQ04sUUFBYSxFQUMzQyxNQUF1QixFQUNmLE9BQWUsRUFDNEIsY0FBdUIsRUFDMUUsWUFBMkI7UUFDN0IsS0FBSyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBSDdFLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDNEIsbUJBQWMsR0FBZCxjQUFjLENBQVM7UUFyQjlFLHNDQUFzQztRQUN0Qyx1QkFBa0IsR0FBWSxJQUFJLENBQUMsY0FBYyxLQUFLLGdCQUFnQixD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QUFJLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO1lBQ2pDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7OztZQTFKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsb0xBQW9DO2dCQUVwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUscUNBQXFDO29CQUM5QyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsWUFBWSxFQUFFLE1BQU07b0JBQ3BCLE1BQU0sRUFBRSxLQUFLO29CQUNiLGFBQWEsRUFBRSxjQUFjO29CQUM3Qix3QkFBd0IsRUFBRSw0Q0FBNEM7b0JBQ3RFLG1CQUFtQixFQUFFLG1CQUFtQjtvQkFDeEMseUJBQXlCLEVBQUUsaUNBQWlDO29CQUM1RCxpQ0FBaUMsRUFBRSxxQkFBcUI7aUJBQ3pEOzthQUNGOzs7WUFoQ0MsVUFBVTtZQU5VLGdCQUFnQjtZQUlwQyxpQkFBaUI7NENBc0RaLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTtZQTdDMUIsZUFBZTtZQUxyQixNQUFNO3lDQXFERCxRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjtZQTdEdkMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0ZvY3VzTW9uaXRvciwgRm9jdXNUcmFwRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ0NvbmZpZywgX01hdERpYWxvZ0NvbnRhaW5lckJhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7Y3NzQ2xhc3NlcywgbnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL2RpYWxvZyc7XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgd3JhcHMgdXNlci1wcm92aWRlZCBkaWFsb2cgY29udGVudCBpbiBhIE1EQyBkaWFsb2cuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1tZGMtZGlhbG9nLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnZGlhbG9nLWNvbnRhaW5lci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2RpYWxvZy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1kaWFsb2ctY29udGFpbmVyIG1kYy1kaWFsb2cnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ2FyaWEtbW9kYWwnOiAndHJ1ZScsXG4gICAgJ1tpZF0nOiAnX2lkJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnX2NvbmZpZy5yb2xlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdfY29uZmlnLmFyaWFMYWJlbCA/IG51bGwgOiBfYXJpYUxhYmVsbGVkQnknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdfY29uZmlnLmFyaWFMYWJlbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19jb25maWcuYXJpYURlc2NyaWJlZEJ5IHx8IG51bGwnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJyFfYW5pbWF0aW9uc0VuYWJsZWQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXREaWFsb2dDb250YWluZXIgZXh0ZW5kcyBfTWF0RGlhbG9nQ29udGFpbmVyQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQuICovXG4gIF9hbmltYXRpb25zRW5hYmxlZDogYm9vbGVhbiA9IHRoaXMuX2FuaW1hdGlvbk1vZGUgIT09ICdOb29wQW5pbWF0aW9ucyc7XG5cbiAgLyoqIEhvc3QgZWxlbWVudCBvZiB0aGUgZGlhbG9nIGNvbnRhaW5lciBjb21wb25lbnQuICovXG4gIHByaXZhdGUgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgLyoqIER1cmF0aW9uIG9mIHRoZSBkaWFsb2cgb3BlbiBhbmltYXRpb24uICovXG4gIHByaXZhdGUgX29wZW5BbmltYXRpb25EdXJhdGlvbiA9XG4gICAgICB0aGlzLl9hbmltYXRpb25zRW5hYmxlZCA/IG51bWJlcnMuRElBTE9HX0FOSU1BVElPTl9PUEVOX1RJTUVfTVMgOiAwO1xuICAvKiogRHVyYXRpb24gb2YgdGhlIGRpYWxvZyBjbG9zZSBhbmltYXRpb24uICovXG4gIHByaXZhdGUgX2Nsb3NlQW5pbWF0aW9uRHVyYXRpb24gPVxuICAgICAgdGhpcy5fYW5pbWF0aW9uc0VuYWJsZWQgPyBudW1iZXJzLkRJQUxPR19BTklNQVRJT05fQ0xPU0VfVElNRV9NUyA6IDA7XG4gIC8qKiBDdXJyZW50IHRpbWVyIGZvciBkaWFsb2cgYW5pbWF0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uVGltZXI6IG51bWJlcnxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICBmb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSxcbiAgICAgIGNvbmZpZzogTWF0RGlhbG9nQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHJpdmF0ZSBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICAgIGZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvcikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGZvY3VzVHJhcEZhY3RvcnksIGNoYW5nZURldGVjdG9yUmVmLCBkb2N1bWVudCwgY29uZmlnLCBmb2N1c01vbml0b3IpO1xuICB9XG5cbiAgX2luaXRpYWxpemVXaXRoQXR0YWNoZWRDb250ZW50KCkge1xuICAgIC8vIERlbGVnYXRlIHRvIHRoZSBvcmlnaW5hbCBkaWFsb2ctY29udGFpbmVyIGluaXRpYWxpemF0aW9uIChpLmUuIHNhdmluZyB0aGVcbiAgICAvLyBwcmV2aW91cyBlbGVtZW50LCBzZXR0aW5nIHVwIHRoZSBmb2N1cyB0cmFwIGFuZCBtb3ZpbmcgZm9jdXMgdG8gdGhlIGNvbnRhaW5lcikuXG4gICAgc3VwZXIuX2luaXRpYWxpemVXaXRoQXR0YWNoZWRDb250ZW50KCk7XG4gICAgLy8gTm90ZTogVXN1YWxseSB3ZSB3b3VsZCBiZSBhYmxlIHRvIHVzZSB0aGUgTURDIGRpYWxvZyBmb3VuZGF0aW9uIGhlcmUgdG8gaGFuZGxlXG4gICAgLy8gdGhlIGRpYWxvZyBhbmltYXRpb24gZm9yIHVzLCBidXQgdGhlcmUgYXJlIGEgZmV3IHJlYXNvbnMgd2h5IHdlIGp1c3QgbGV2ZXJhZ2VcbiAgICAvLyB0aGVpciBzdHlsZXMgYW5kIG5vdCB1c2UgdGhlIHJ1bnRpbWUgZm91bmRhdGlvbiBjb2RlOlxuICAgIC8vICAgMS4gRm91bmRhdGlvbiBkb2VzIG5vdCBhbGxvdyB1cyB0byBkaXNhYmxlIGFuaW1hdGlvbnMuXG4gICAgLy8gICAyLiBGb3VuZGF0aW9uIGNvbnRhaW5zIHVubmVjZXNzYXJ5IGZlYXR1cmVzIHdlIGRvbid0IG5lZWQgYW5kIGFyZW4ndFxuICAgIC8vICAgICAgdHJlZS1zaGFrZWFibGUuIGUuZy4gYmFja2dyb3VuZCBzY3JpbSwga2V5Ym9hcmQgZXZlbnQgaGFuZGxlcnMgZm9yIEVTQyBidXR0b24uXG4gICAgLy8gICAzLiBGb3VuZGF0aW9uIHVzZXMgdW5uZWNlc3NhcnkgdGltZXJzIGZvciBhbmltYXRpb25zIHRvIHdvcmsgYXJvdW5kIGxpbWl0YXRpb25zXG4gICAgLy8gICAgICBpbiBSZWFjdCdzIGBzZXRTdGF0ZWAgbWVjaGFuaXNtLlxuICAgIC8vICAgICAgaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvcHVsbC8zNjgyLlxuICAgIHRoaXMuX3N0YXJ0T3BlbkFuaW1hdGlvbigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvblRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fYW5pbWF0aW9uVGltZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTdGFydHMgdGhlIGRpYWxvZyBvcGVuIGFuaW1hdGlvbiBpZiBlbmFibGVkLiAqL1xuICBwcml2YXRlIF9zdGFydE9wZW5BbmltYXRpb24oKSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoe3N0YXRlOiAnb3BlbmluZycsIHRvdGFsVGltZTogdGhpcy5fb3BlbkFuaW1hdGlvbkR1cmF0aW9ufSk7XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uc0VuYWJsZWQpIHtcbiAgICAgIC8vIE9uZSB3b3VsZCBleHBlY3QgdGhhdCB0aGUgb3BlbiBjbGFzcyBpcyBhZGRlZCBvbmNlIHRoZSBhbmltYXRpb24gZmluaXNoZWQsIGJ1dCBNRENcbiAgICAgIC8vIHVzZXMgdGhlIG9wZW4gY2xhc3MgaW4gY29tYmluYXRpb24gd2l0aCB0aGUgb3BlbmluZyBjbGFzcyB0byBzdGFydCB0aGUgYW5pbWF0aW9uLlxuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzc2VzLk9QRU5JTkcpO1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgdGhpcy5fd2FpdEZvckFuaW1hdGlvblRvQ29tcGxldGUodGhpcy5fb3BlbkFuaW1hdGlvbkR1cmF0aW9uLCB0aGlzLl9maW5pc2hEaWFsb2dPcGVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgLy8gTm90ZTogV2UgY291bGQgaW1tZWRpYXRlbHkgZmluaXNoIHRoZSBkaWFsb2cgb3BlbmluZyBoZXJlIHdpdGggbm9vcCBhbmltYXRpb25zLFxuICAgICAgLy8gYnV0IHdlIGRlZmVyIHVudGlsIG5leHQgdGljayBzbyB0aGF0IGNvbnN1bWVycyBjYW4gc3Vic2NyaWJlIHRvIGBhZnRlck9wZW5lZGAuXG4gICAgICAvLyBFeGVjdXRpbmcgdGhpcyBpbW1lZGlhdGVseSB3b3VsZCBtZWFuIHRoYXQgYGFmdGVyT3BlbmVkYCBlbWl0cyBzeW5jaHJvbm91c2x5XG4gICAgICAvLyBvbiBgZGlhbG9nLm9wZW5gIGJlZm9yZSB0aGUgY29uc3VtZXIgaGFkIGEgY2hhbmdlIHRvIHN1YnNjcmliZSB0byBgYWZ0ZXJPcGVuZWRgLlxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLl9maW5pc2hEaWFsb2dPcGVuKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIGV4aXQgYW5pbWF0aW9uIG9mIHRoZSBkaWFsb2cgaWYgZW5hYmxlZC4gVGhpcyBtZXRob2QgaXNcbiAgICogY2FsbGVkIGJ5IHRoZSBkaWFsb2cgcmVmLlxuICAgKi9cbiAgX3N0YXJ0RXhpdEFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdCh7c3RhdGU6ICdjbG9zaW5nJywgdG90YWxUaW1lOiB0aGlzLl9jbG9zZUFuaW1hdGlvbkR1cmF0aW9ufSk7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzc2VzLk9QRU4pO1xuXG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvbnNFbmFibGVkKSB7XG4gICAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzZXMuQ0xPU0lORyk7XG4gICAgICB0aGlzLl93YWl0Rm9yQW5pbWF0aW9uVG9Db21wbGV0ZSh0aGlzLl9jbG9zZUFuaW1hdGlvbkR1cmF0aW9uLCB0aGlzLl9maW5pc2hEaWFsb2dDbG9zZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgc3Vic2NyaXB0aW9uIHRvIHRoZSBgT3ZlcmxheVJlZiNiYWNrZHJvcENsaWNrYCBvYnNlcnZhYmxlIGluIHRoZSBgRGlhbG9nUmVmYCBpc1xuICAgICAgLy8gc2V0IHVwIGJlZm9yZSBhbnkgdXNlciBjYW4gc3Vic2NyaWJlIHRvIHRoZSBiYWNrZHJvcCBjbGljay4gVGhlIHN1YnNjcmlwdGlvbiB0cmlnZ2Vyc1xuICAgICAgLy8gdGhlIGRpYWxvZyBjbG9zZSBhbmQgdGhpcyBtZXRob2Qgc3luY2hyb25vdXNseS4gSWYgd2UnZCBzeW5jaHJvbm91c2x5IGVtaXQgdGhlIGBDTE9TRURgXG4gICAgICAvLyBhbmltYXRpb24gc3RhdGUgZXZlbnQgaWYgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsIHRoZSBvdmVybGF5IHdvdWxkIGJlIGRpc3Bvc2VkXG4gICAgICAvLyBpbW1lZGlhdGVseSBhbmQgYWxsIG90aGVyIHN1YnNjcmlwdGlvbnMgdG8gYERpYWxvZ1JlZiNiYWNrZHJvcENsaWNrYCB3b3VsZCBiZSBzaWxlbnRseVxuICAgICAgLy8gc2tpcHBlZC4gV2Ugd29yayBhcm91bmQgdGhpcyBieSB3YWl0aW5nIHdpdGggdGhlIGRpYWxvZyBjbG9zZSB1bnRpbCB0aGUgbmV4dCB0aWNrIHdoZW5cbiAgICAgIC8vIGFsbCBzdWJzY3JpcHRpb25zIGhhdmUgYmVlbiBmaXJlZCBhcyBleHBlY3RlZC4gVGhpcyBpcyBub3QgYW4gaWRlYWwgc29sdXRpb24sIGJ1dFxuICAgICAgLy8gdGhlcmUgZG9lc24ndCBzZWVtIHRvIGJlIGFueSBvdGhlciBnb29kIHdheS4gQWx0ZXJuYXRpdmVzIHRoYXQgaGF2ZSBiZWVuIGNvbnNpZGVyZWQ6XG4gICAgICAvLyAgIDEuIERlZmVycmluZyBgRGlhbG9nUmVmLmNsb3NlYC4gVGhpcyBjb3VsZCBiZSBhIGJyZWFraW5nIGNoYW5nZSBkdWUgdG8gYSBuZXcgbWljcm90YXNrLlxuICAgICAgLy8gICAgICBBbHNvIHRoaXMgaXNzdWUgaXMgc3BlY2lmaWMgdG8gdGhlIE1EQyBpbXBsZW1lbnRhdGlvbiB3aGVyZSB0aGUgZGlhbG9nIGNvdWxkXG4gICAgICAvLyAgICAgIHRlY2huaWNhbGx5IGJlIGNsb3NlZCBzeW5jaHJvbm91c2x5LiBJbiB0aGUgbm9uLU1EQyBvbmUsIEFuZ3VsYXIgYW5pbWF0aW9ucyBhcmUgdXNlZFxuICAgICAgLy8gICAgICBhbmQgY2xvc2luZyBhbHdheXMgdGFrZXMgYXQgbGVhc3QgYSB0aWNrLlxuICAgICAgLy8gICAyLiBFbnN1cmluZyB0aGF0IHVzZXIgc3Vic2NyaXB0aW9ucyB0byBgYmFja2Ryb3BDbGlja2AsIGBrZXlkb3duRXZlbnRzYCBpbiB0aGUgZGlhbG9nXG4gICAgICAvLyAgICAgIHJlZiBhcmUgZmlyc3QuIFRoaXMgd291bGQgc29sdmUgdGhlIGlzc3VlLCBidXQgaGFzIHRoZSByaXNrIG9mIG1lbW9yeSBsZWFrcyBhbmQgYWxzb1xuICAgICAgLy8gICAgICBkb2Vzbid0IHNvbHZlIHRoZSBjYXNlIHdoZXJlIGNvbnN1bWVycyBjYWxsIGBEaWFsb2dSZWYuY2xvc2VgIGluIHRoZWlyIHN1YnNjcmlwdGlvbnMuXG4gICAgICAvLyBCYXNlZCBvbiB0aGUgZmFjdCB0aGF0IHRoaXMgaXMgc3BlY2lmaWMgdG8gdGhlIE1EQy1iYXNlZCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgZGlhbG9nXG4gICAgICAvLyBhbmltYXRpb25zLCB0aGUgZGVmZXIgaXMgYXBwbGllZCBoZXJlLlxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLl9maW5pc2hEaWFsb2dDbG9zZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcGxldGVzIHRoZSBkaWFsb2cgb3BlbiBieSBjbGVhcmluZyBwb3RlbnRpYWwgYW5pbWF0aW9uIGNsYXNzZXMsIHRyYXBwaW5nXG4gICAqIGZvY3VzIGFuZCBlbWl0dGluZyBhbiBvcGVuZWQgZXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9maW5pc2hEaWFsb2dPcGVuID1cbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2xlYXJBbmltYXRpb25DbGFzc2VzKCk7XG4gICAgICAgIHRoaXMuX3RyYXBGb2N1cygpO1xuICAgICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdCh7c3RhdGU6ICdvcGVuZWQnLCB0b3RhbFRpbWU6IHRoaXMuX29wZW5BbmltYXRpb25EdXJhdGlvbn0pO1xuICAgICAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZXMgdGhlIGRpYWxvZyBjbG9zZSBieSBjbGVhcmluZyBwb3RlbnRpYWwgYW5pbWF0aW9uIGNsYXNzZXMsIHJlc3RvcmluZ1xuICAgKiBmb2N1cyBhbmQgZW1pdHRpbmcgYSBjbG9zZWQgZXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9maW5pc2hEaWFsb2dDbG9zZSA9XG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NsZWFyQW5pbWF0aW9uQ2xhc3NlcygpO1xuICAgICAgICB0aGlzLl9yZXN0b3JlRm9jdXMoKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoXG4gICAgICAgICAgICB7c3RhdGU6ICdjbG9zZWQnLCB0b3RhbFRpbWU6IHRoaXMuX2Nsb3NlQW5pbWF0aW9uRHVyYXRpb259KTtcbiAgICAgIH1cblxuICAvKiogQ2xlYXJzIGFsbCBkaWFsb2cgYW5pbWF0aW9uIGNsYXNzZXMuICovXG4gIHByaXZhdGUgX2NsZWFyQW5pbWF0aW9uQ2xhc3NlcygpIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzZXMuT1BFTklORyk7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzc2VzLkNMT1NJTkcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2FpdEZvckFuaW1hdGlvblRvQ29tcGxldGUoZHVyYXRpb246IG51bWJlciwgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uVGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hbmltYXRpb25UaW1lcik7XG4gICAgfVxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLl9hbmltYXRpb25UaW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIGR1cmF0aW9uKSk7XG4gIH1cbn1cbiJdfQ==