/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, ElementRef, Inject, Input, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MDCChipActionType, MDCChipPrimaryActionFoundation, } from '@material/chips';
import { emitCustomEvent } from './emit-event';
import { mixinDisabled, mixinTabIndex, } from '@angular/material-experimental/mdc-core';
import * as i0 from "@angular/core";
const _MatChipActionMixinBase = mixinTabIndex(mixinDisabled(class {
}), -1);
/**
 * Interactive element within a chip.
 * @docs-private
 */
export class MatChipAction extends _MatChipActionMixinBase {
    constructor(_elementRef, _document, _changeDetectorRef) {
        super();
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._adapter = {
            focus: () => this.focus(),
            getAttribute: (name) => this._elementRef.nativeElement.getAttribute(name),
            setAttribute: (name, value) => {
                // MDC tries to update the tabindex directly in the DOM when navigating using the keyboard
                // which overrides our own handling. If we detect such a case, assign it to the same property
                // as the Angular binding in order to maintain consistency.
                if (name === 'tabindex') {
                    this._updateTabindex(parseInt(value));
                }
                else {
                    this._elementRef.nativeElement.setAttribute(name, value);
                }
            },
            removeAttribute: (name) => {
                if (name !== 'tabindex') {
                    this._elementRef.nativeElement.removeAttribute(name);
                }
            },
            getElementID: () => this._elementRef.nativeElement.id,
            emitEvent: (eventName, data) => {
                emitCustomEvent(this._elementRef.nativeElement, this._document, eventName, data, true);
            },
        };
        /** Whether the action is interactive. */
        this.isInteractive = true;
        this._foundation = this._createFoundation(this._adapter);
        if (_elementRef.nativeElement.nodeName === 'BUTTON') {
            _elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    _handleClick(_event) {
        // Usually these events can't happen while the chip is disabled since the browser won't
        // allow them which is what MDC seems to rely on, however the event can be faked in tests.
        if (!this.disabled && this.isInteractive) {
            this._foundation.handleClick();
        }
    }
    _handleKeydown(event) {
        // Usually these events can't happen while the chip is disabled since the browser won't
        // allow them which is what MDC seems to rely on, however the event can be faked in tests.
        if (!this.disabled && this.isInteractive) {
            this._foundation.handleKeydown(event);
        }
    }
    _createFoundation(adapter) {
        return new MDCChipPrimaryActionFoundation(adapter);
    }
    ngAfterViewInit() {
        this._foundation.init();
        this._foundation.setDisabled(this.disabled);
    }
    ngOnChanges(changes) {
        if (changes['disabled']) {
            this._foundation.setDisabled(this.disabled);
        }
    }
    ngOnDestroy() {
        this._foundation.destroy();
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    _getFoundation() {
        return this._foundation;
    }
    _updateTabindex(value) {
        this.tabIndex = value;
        this._changeDetectorRef.markForCheck();
    }
}
MatChipAction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MatChipAction, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
MatChipAction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: MatChipAction, selector: "[matChipAction]", inputs: { disabled: "disabled", tabIndex: "tabIndex", isInteractive: "isInteractive" }, host: { listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "class.mdc-evolution-chip__action--primary": "_getFoundation().actionType() === 1", "class.mdc-evolution-chip__action--presentational": "_getFoundation().actionType() === 1", "class.mdc-evolution-chip__action--trailing": "_getFoundation().actionType() === 2", "attr.tabindex": "(disabled || !isInteractive) ? null : tabIndex", "attr.disabled": "disabled ? '' : null", "attr.aria-disabled": "disabled" }, classAttribute: "mdc-evolution-chip__action mat-mdc-chip-action" }, usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MatChipAction, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matChipAction]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': 'mdc-evolution-chip__action mat-mdc-chip-action',
                        '[class.mdc-evolution-chip__action--primary]': `_getFoundation().actionType() === ${MDCChipActionType.PRIMARY}`,
                        // Note that while our actions are interactive, we have to add the `--presentational` class,
                        // in order to avoid some super-specific `:hover` styles from MDC.
                        '[class.mdc-evolution-chip__action--presentational]': `_getFoundation().actionType() === ${MDCChipActionType.PRIMARY}`,
                        '[class.mdc-evolution-chip__action--trailing]': `_getFoundation().actionType() === ${MDCChipActionType.TRAILING}`,
                        '[attr.tabindex]': '(disabled || !isInteractive) ? null : tabIndex',
                        '[attr.disabled]': "disabled ? '' : null",
                        '[attr.aria-disabled]': 'disabled',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { isInteractive: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUdMLGlCQUFpQixFQUNqQiw4QkFBOEIsR0FDL0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFHTCxhQUFhLEVBQ2IsYUFBYSxHQUNkLE1BQU0seUNBQXlDLENBQUM7O0FBRWpELE1BQU0sdUJBQXVCLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQztDQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTNFOzs7R0FHRztBQWtCSCxNQUFNLE9BQU8sYUFDWCxTQUFRLHVCQUF1QjtJQW9EL0IsWUFDUyxXQUF1QixFQUNaLFNBQWMsRUFDeEIsa0JBQXFDO1FBRTdDLEtBQUssRUFBRSxDQUFDO1FBSkQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFFdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQWxEdkMsYUFBUSxHQUF5QjtZQUN2QyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN6QixZQUFZLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDakYsWUFBWSxFQUFFLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxF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QUFDO0lBQ3pDLENBQUM7OzBHQTVGVSxhQUFhLDRDQXVEZCxRQUFROzhGQXZEUCxhQUFhOzJGQUFiLGFBQWE7a0JBakJ6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7b0JBQ2hDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsZ0RBQWdEO3dCQUN6RCw2Q0FBNkMsRUFBRSxxQ0FBcUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO3dCQUMvRyw0RkFBNEY7d0JBQzVGLGtFQUFrRTt3QkFDbEUsb0RBQW9ELEVBQUUscUNBQXFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRTt3QkFDdEgsOENBQThDLEVBQUUscUNBQXFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTt3QkFDakgsaUJBQWlCLEVBQUUsZ0RBQWdEO3dCQUNuRSxpQkFBaUIsRUFBRSxzQkFBc0I7d0JBQ3pDLHNCQUFzQixFQUFFLFVBQVU7d0JBQ2xDLFNBQVMsRUFBRSxzQkFBc0I7d0JBQ2pDLFdBQVcsRUFBRSx3QkFBd0I7cUJBQ3RDO2lCQUNGOzswQkF3REksTUFBTTsyQkFBQyxRQUFROzRFQXhCVCxhQUFhO3NCQUFyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBNRENDaGlwQWN0aW9uQWRhcHRlcixcbiAgTURDQ2hpcEFjdGlvbkZvdW5kYXRpb24sXG4gIE1EQ0NoaXBBY3Rpb25UeXBlLFxuICBNRENDaGlwUHJpbWFyeUFjdGlvbkZvdW5kYXRpb24sXG59IGZyb20gJ0BtYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge2VtaXRDdXN0b21FdmVudH0gZnJvbSAnLi9lbWl0LWV2ZW50JztcbmltcG9ydCB7XG4gIENhbkRpc2FibGUsXG4gIEhhc1RhYkluZGV4LFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpblRhYkluZGV4LFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuXG5jb25zdCBfTWF0Q2hpcEFjdGlvbk1peGluQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChjbGFzcyB7fSksIC0xKTtcblxuLyoqXG4gKiBJbnRlcmFjdGl2ZSBlbGVtZW50IHdpdGhpbiBhIGNoaXAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRDaGlwQWN0aW9uXScsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uIG1hdC1tZGMtY2hpcC1hY3Rpb24nLFxuICAgICdbY2xhc3MubWRjLWV2b2x1dGlvbi1jaGlwX19hY3Rpb24tLXByaW1hcnldJzogYF9nZXRGb3VuZGF0aW9uKCkuYWN0aW9uVHlwZSgpID09PSAke01EQ0NoaXBBY3Rpb25UeXBlLlBSSU1BUll9YCxcbiAgICAvLyBOb3RlIHRoYXQgd2hpbGUgb3VyIGFjdGlvbnMgYXJlIGludGVyYWN0aXZlLCB3ZSBoYXZlIHRvIGFkZCB0aGUgYC0tcHJlc2VudGF0aW9uYWxgIGNsYXNzLFxuICAgIC8vIGluIG9yZGVyIHRvIGF2b2lkIHNvbWUgc3VwZXItc3BlY2lmaWMgYDpob3ZlcmAgc3R5bGVzIGZyb20gTURDLlxuICAgICdbY2xhc3MubWRjLWV2b2x1dGlvbi1jaGlwX19hY3Rpb24tLXByZXNlbnRhdGlvbmFsXSc6IGBfZ2V0Rm91bmRhdGlvbigpLmFjdGlvblR5cGUoKSA9PT0gJHtNRENDaGlwQWN0aW9uVHlwZS5QUklNQVJZfWAsXG4gICAgJ1tjbGFzcy5tZGMtZXZvbHV0aW9uLWNoaXBfX2FjdGlvbi0tdHJhaWxpbmddJzogYF9nZXRGb3VuZGF0aW9uKCkuYWN0aW9uVHlwZSgpID09PSAke01EQ0NoaXBBY3Rpb25UeXBlLlRSQUlMSU5HfWAsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICcoZGlzYWJsZWQgfHwgIWlzSW50ZXJhY3RpdmUpID8gbnVsbCA6IHRhYkluZGV4JyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogXCJkaXNhYmxlZCA/ICcnIDogbnVsbFwiLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJyhjbGljayknOiAnX2hhbmRsZUNsaWNrKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnX2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBBY3Rpb25cbiAgZXh0ZW5kcyBfTWF0Q2hpcEFjdGlvbk1peGluQmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgsIE9uQ2hhbmdlc1xue1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ0NoaXBBY3Rpb25Gb3VuZGF0aW9uO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENDaGlwQWN0aW9uQWRhcHRlciA9IHtcbiAgICBmb2N1czogKCkgPT4gdGhpcy5mb2N1cygpLFxuICAgIGdldEF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKSxcbiAgICBzZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIE1EQyB0cmllcyB0byB1cGRhdGUgdGhlIHRhYmluZGV4IGRpcmVjdGx5IGluIHRoZSBET00gd2hlbiBuYXZpZ2F0aW5nIHVzaW5nIHRoZSBrZXlib2FyZFxuICAgICAgLy8gd2hpY2ggb3ZlcnJpZGVzIG91ciBvd24gaGFuZGxpbmcuIElmIHdlIGRldGVjdCBzdWNoIGEgY2FzZSwgYXNzaWduIGl0IHRvIHRoZSBzYW1lIHByb3BlcnR5XG4gICAgICAvLyBhcyB0aGUgQW5ndWxhciBiaW5kaW5nIGluIG9yZGVyIHRvIG1haW50YWluIGNvbnNpc3RlbmN5LlxuICAgICAgaWYgKG5hbWUgPT09ICd0YWJpbmRleCcpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlVGFiaW5kZXgocGFyc2VJbnQodmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlQXR0cmlidXRlOiAobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAobmFtZSAhPT0gJ3RhYmluZGV4Jykge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0RWxlbWVudElEOiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaWQsXG4gICAgZW1pdEV2ZW50OiA8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IFQpID0+IHtcbiAgICAgIGVtaXRDdXN0b21FdmVudDxUPih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2RvY3VtZW50LCBldmVudE5hbWUsIGRhdGEsIHRydWUpO1xuICAgIH0sXG4gIH07XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGFjdGlvbiBpcyBpbnRlcmFjdGl2ZS4gKi9cbiAgQElucHV0KCkgaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgX2hhbmRsZUNsaWNrKF9ldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIFVzdWFsbHkgdGhlc2UgZXZlbnRzIGNhbid0IGhhcHBlbiB3aGlsZSB0aGUgY2hpcCBpcyBkaXNhYmxlZCBzaW5jZSB0aGUgYnJvd3NlciB3b24ndFxuICAgIC8vIGFsbG93IHRoZW0gd2hpY2ggaXMgd2hhdCBNREMgc2VlbXMgdG8gcmVseSBvbiwgaG93ZXZlciB0aGUgZXZlbnQgY2FuIGJlIGZha2VkIGluIHRlc3RzLlxuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmlzSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlQ2xpY2soKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIFVzdWFsbHkgdGhlc2UgZXZlbnRzIGNhbid0IGhhcHBlbiB3aGlsZSB0aGUgY2hpcCBpcyBkaXNhYmxlZCBzaW5jZSB0aGUgYnJvd3NlciB3b24ndFxuICAgIC8vIGFsbG93IHRoZW0gd2hpY2ggaXMgd2hhdCBNREMgc2VlbXMgdG8gcmVseSBvbiwgaG93ZXZlciB0aGUgZXZlbnQgY2FuIGJlIGZha2VkIGluIHRlc3RzLlxuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmlzSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVGb3VuZGF0aW9uKGFkYXB0ZXI6IE1EQ0NoaXBBY3Rpb25BZGFwdGVyKTogTURDQ2hpcEFjdGlvbkZvdW5kYXRpb24ge1xuICAgIHJldHVybiBuZXcgTURDQ2hpcFByaW1hcnlBY3Rpb25Gb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gdGhpcy5fY3JlYXRlRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcblxuICAgIGlmIChfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10pIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIF9nZXRGb3VuZGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3VuZGF0aW9uO1xuICB9XG5cbiAgX3VwZGF0ZVRhYmluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnRhYkluZGV4ID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==