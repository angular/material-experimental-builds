/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatChip } from './chip';
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
let MatChipRow = /** @class */ (() => {
    class MatChipRow extends MatChip {
        constructor() {
            super(...arguments);
            this.basicChipAttrName = 'mat-basic-chip-row';
        }
        ngAfterContentInit() {
            super.ngAfterContentInit();
            if (this.removeIcon) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                setTimeout(() => {
                    // removeIcon has tabIndex 0 for regular chips, but should only be focusable by
                    // the GridFocusKeyManager for row chips.
                    this.removeIcon.tabIndex = -1;
                });
            }
        }
        ngAfterViewInit() {
            super.ngAfterViewInit();
            this.cells = this.removeIcon ?
                [this.chipContent.nativeElement, this.removeIcon._elementRef.nativeElement] :
                [this.chipContent.nativeElement];
        }
        /**
         * Allows for programmatic focusing of the chip.
         * Sends focus to the first grid cell. The row chip element itself
         * is never focused.
         */
        focus() {
            if (this.disabled) {
                return;
            }
            if (!this._hasFocusInternal) {
                this._onFocus.next({ chip: this });
            }
            this.chipContent.nativeElement.focus();
        }
        /**
         * Emits a blur event when one of the gridcells loses focus, unless focus moved
         * to the other gridcell.
         */
        _focusout() {
            this._hasFocusInternal = false;
            // Wait to see if focus moves to the other gridcell
            setTimeout(() => {
                if (this._hasFocus) {
                    return;
                }
                this._onBlur.next({ chip: this });
            });
        }
        /** Records that the chip has focus when one of the gridcells is focused. */
        _focusin() {
            this._hasFocusInternal = true;
        }
        /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
        _mousedown(event) {
            if (!this.disabled) {
                this.focus();
            }
            event.preventDefault();
        }
        /** Handles custom key presses. */
        _keydown(event) {
            if (this.disabled) {
                return;
            }
            switch (event.keyCode) {
                case DELETE:
                case BACKSPACE:
                    // Remove the focused chip
                    this.remove();
                    // Always prevent so page navigation does not occur
                    event.preventDefault();
                    break;
                default:
                    this._handleInteraction(event);
            }
        }
    }
    MatChipRow.decorators = [
        { type: Component, args: [{
                    selector: 'mat-chip-row, mat-basic-chip-row',
                    template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<div role=\"gridcell\">\n  <div #chipContent tabindex=\"-1\"\n       class=\"mat-chip-row-focusable-text-content mat-mdc-focus-indicator\">\n  \t <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n  \t <span class=\"mdc-chip__text\"><ng-content></ng-content></span>\n  \t <ng-content select=\"mat-chip-trailing-icon,[matChipTrailingIcon]\"></ng-content>\n  </div>\n</div>\n<div role=\"gridcell\" *ngIf=\"removeIcon\">\n  <ng-content select=\"[matChipRemove]\"></ng-content>\n</div>\n",
                    inputs: ['color', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'row',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[tabIndex]': 'tabIndex',
                        '(mousedown)': '_mousedown($event)',
                        '(keydown)': '_keydown($event)',
                        '(focusin)': '_focusin()',
                        '(focusout)': '_focusout()'
                    },
                    providers: [{ provide: MatChip, useExisting: MatChipRow }],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                },] }
    ];
    MatChipRow.propDecorators = {
        chipContent: [{ type: ViewChild, args: ['chipContent',] }]
    };
    return MatChipRow;
})();
export { MatChipRow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXJvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFJL0I7OztHQUdHO0FBQ0g7SUFBQSxNQXdCYSxVQUFXLFNBQVEsT0FBTztRQXhCdkM7O1lBMEJZLHNCQUFpQixHQUFHLG9CQUFvQixDQUFDO1FBK0ZyRCxDQUFDO1FBcEZDLGtCQUFrQjtZQUNoQixLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUUzQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLDREQUE0RDtnQkFDNUQseURBQXlEO2dCQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLCtFQUErRTtvQkFDL0UseUNBQXlDO29CQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUFFRCxlQUFlO1lBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILEtBQUs7WUFDSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7YUFDbEM7WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsU0FBUztZQUNQLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsbURBQW1EO1lBQ25ELFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQixPQUFPO2lCQUNSO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsNEVBQTRFO1FBQzVFLFFBQVE7WUFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7UUFFRCx1RkFBdUY7UUFDdkYsVUFBVSxDQUFDLEtBQWlCO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtZQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQsa0NBQWtDO1FBQ2xDLFFBQVEsQ0FBQyxLQUFvQjtZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjtZQUNELFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxTQUFTO29CQUNaLDBCQUEwQjtvQkFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLG1EQUFtRDtvQkFDbkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixNQUFNO2dCQUNSO29CQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztRQUNILENBQUM7OztnQkF4SEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLGl6QkFBNEI7b0JBRTVCLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDO29CQUM5QyxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLEtBQUs7d0JBQ2IsK0JBQStCLEVBQUUsVUFBVTt3QkFDM0Msa0NBQWtDLEVBQUUsYUFBYTt3QkFDakQsa0NBQWtDLEVBQUUsYUFBYTt3QkFDakQseUNBQXlDLEVBQUUsNEJBQTRCO3dCQUN2RSxNQUFNLEVBQUUsSUFBSTt3QkFDWixpQkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0MsWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLGFBQWEsRUFBRSxvQkFBb0I7d0JBQ25DLFdBQVcsRUFBRSxrQkFBa0I7d0JBQy9CLFdBQVcsRUFBRSxZQUFZO3dCQUN6QixZQUFZLEVBQUUsYUFBYTtxQkFDNUI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsQ0FBQztvQkFDeEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs4QkFTRSxTQUFTLFNBQUMsYUFBYTs7SUF5RjFCLGlCQUFDO0tBQUE7U0FqR1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0JBQ0tTUEFDRSwgREVMRVRFfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q2hpcH0gZnJvbSAnLi9jaGlwJztcbmltcG9ydCB7R3JpZEtleU1hbmFnZXJSb3d9IGZyb20gJy4vZ3JpZC1rZXktbWFuYWdlcic7XG5cblxuLyoqXG4gKiBBbiBleHRlbnNpb24gb2YgdGhlIE1hdENoaXAgY29tcG9uZW50IHVzZWQgd2l0aCBNYXRDaGlwR3JpZCBhbmRcbiAqIHRoZSBtYXRDaGlwSW5wdXRGb3IgZGlyZWN0aXZlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hpcC1yb3csIG1hdC1iYXNpYy1jaGlwLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnY2hpcC1yb3cuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ3JvdycsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtYXZhdGFyXSc6ICdsZWFkaW5nSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbdGFiSW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAnKG1vdXNlZG93biknOiAnX21vdXNlZG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19rZXlkb3duKCRldmVudCknLFxuICAgICcoZm9jdXNpbiknOiAnX2ZvY3VzaW4oKScsXG4gICAgJyhmb2N1c291dCknOiAnX2ZvY3Vzb3V0KCknXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNYXRDaGlwLCB1c2VFeGlzdGluZzogTWF0Q2hpcFJvd31dLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJvdyBleHRlbmRzIE1hdENoaXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBHcmlkS2V5TWFuYWdlclJvdzxIVE1MRWxlbWVudD4ge1xuICBwcm90ZWN0ZWQgYmFzaWNDaGlwQXR0ck5hbWUgPSAnbWF0LWJhc2ljLWNoaXAtcm93JztcblxuICAvKipcbiAgICogVGhlIGZvY3VzYWJsZSB3cmFwcGVyIGVsZW1lbnQgaW4gdGhlIGZpcnN0IGdyaWRjZWxsLCB3aGljaCBjb250YWlucyBhbGxcbiAgICogY2hpcCBjb250ZW50IG90aGVyIHRoYW4gdGhlIHJlbW92ZSBpY29uLlxuICAgKi9cbiAgQFZpZXdDaGlsZCgnY2hpcENvbnRlbnQnKSBjaGlwQ29udGVudDogRWxlbWVudFJlZjtcblxuICAvKiogVGhlIGZvY3VzYWJsZSBncmlkIGNlbGxzIGZvciB0aGlzIHJvdy4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBHcmlkS2V5TWFuYWdlclJvdy4gKi9cbiAgY2VsbHMhOiBIVE1MRWxlbWVudFtdO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyQ29udGVudEluaXQoKTtcblxuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmVJY29uIGhhcyB0YWJJbmRleCAwIGZvciByZWd1bGFyIGNoaXBzLCBidXQgc2hvdWxkIG9ubHkgYmUgZm9jdXNhYmxlIGJ5XG4gICAgICAgIC8vIHRoZSBHcmlkRm9jdXNLZXlNYW5hZ2VyIGZvciByb3cgY2hpcHMuXG4gICAgICAgIHRoaXMucmVtb3ZlSWNvbi50YWJJbmRleCA9IC0xO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLnJlbW92ZUljb24gP1xuICAgICAgW3RoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudCwgdGhpcy5yZW1vdmVJY29uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRdIDpcbiAgICAgIFt0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBjaGlwLlxuICAgKiBTZW5kcyBmb2N1cyB0byB0aGUgZmlyc3QgZ3JpZCBjZWxsLiBUaGUgcm93IGNoaXAgZWxlbWVudCBpdHNlbGZcbiAgICogaXMgbmV2ZXIgZm9jdXNlZC5cbiAgICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9oYXNGb2N1c0ludGVybmFsKSB7XG4gICAgICB0aGlzLl9vbkZvY3VzLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGJsdXIgZXZlbnQgd2hlbiBvbmUgb2YgdGhlIGdyaWRjZWxscyBsb3NlcyBmb2N1cywgdW5sZXNzIGZvY3VzIG1vdmVkXG4gICAqIHRvIHRoZSBvdGhlciBncmlkY2VsbC5cbiAgICovXG4gIF9mb2N1c291dCgpIHtcbiAgICB0aGlzLl9oYXNGb2N1c0ludGVybmFsID0gZmFsc2U7XG4gICAgLy8gV2FpdCB0byBzZWUgaWYgZm9jdXMgbW92ZXMgdG8gdGhlIG90aGVyIGdyaWRjZWxsXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faGFzRm9jdXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fb25CbHVyLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZWNvcmRzIHRoYXQgdGhlIGNoaXAgaGFzIGZvY3VzIHdoZW4gb25lIG9mIHRoZSBncmlkY2VsbHMgaXMgZm9jdXNlZC4gKi9cbiAgX2ZvY3VzaW4oKSB7XG4gICAgdGhpcy5faGFzRm9jdXNJbnRlcm5hbCA9IHRydWU7XG4gIH1cblxuICAvKiogU2VuZHMgZm9jdXMgdG8gdGhlIGZpcnN0IGdyaWRjZWxsIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIGluc2lkZSB0aGUgY2hpcC4gKi9cbiAgX21vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBjdXN0b20ga2V5IHByZXNzZXMuICovXG4gIF9rZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIERFTEVURTpcbiAgICAgIGNhc2UgQkFDS1NQQUNFOlxuICAgICAgICAvLyBSZW1vdmUgdGhlIGZvY3VzZWQgY2hpcFxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzbyBwYWdlIG5hdmlnYXRpb24gZG9lcyBub3Qgb2NjdXJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLl9oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=