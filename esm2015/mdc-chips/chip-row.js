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
import { NAVIGATION_KEYS } from './grid-key-manager';
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
let MatChipRow = /** @class */ (() => {
    class MatChipRow extends MatChip {
        constructor() {
            super(...arguments);
            this.basicChipAttrName = 'mat-basic-chip-row';
            /** Key codes for which this component has a custom handler. */
            this.HANDLED_KEYS = NAVIGATION_KEYS.concat([BACKSPACE, DELETE]);
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
                }] }
    ];
    MatChipRow.propDecorators = {
        chipContent: [{ type: ViewChild, args: ['chipContent',] }]
    };
    return MatChipRow;
})();
export { MatChipRow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXJvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDL0IsT0FBTyxFQUFvQixlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUd0RTs7O0dBR0c7QUFDSDtJQUFBLE1Bd0JhLFVBQVcsU0FBUSxPQUFPO1FBeEJ2Qzs7WUEwQlksc0JBQWlCLEdBQUcsb0JBQW9CLENBQUM7WUFXbkQsK0RBQStEO1lBQy9ELGlCQUFZLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBc0Y3RCxDQUFDO1FBcEZDLGtCQUFrQjtZQUNoQixLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUUzQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLDREQUE0RDtnQkFDNUQseURBQXlEO2dCQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLCtFQUErRTtvQkFDL0UseUNBQXlDO29CQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUFFRCxlQUFlO1lBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUs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SUE0RjFCLGlCQUFDO0tBQUE7U0FwR1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0JBQ0tTUEFDRSwgREVMRVRFfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q2hpcH0gZnJvbSAnLi9jaGlwJztcbmltcG9ydCB7R3JpZEtleU1hbmFnZXJSb3csIE5BVklHQVRJT05fS0VZU30gZnJvbSAnLi9ncmlkLWtleS1tYW5hZ2VyJztcblxuXG4vKipcbiAqIEFuIGV4dGVuc2lvbiBvZiB0aGUgTWF0Q2hpcCBjb21wb25lbnQgdXNlZCB3aXRoIE1hdENoaXBHcmlkIGFuZFxuICogdGhlIG1hdENoaXBJbnB1dEZvciBkaXJlY3RpdmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXJvdywgbWF0LWJhc2ljLWNoaXAtcm93JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwLXJvdy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLmNzcyddLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZScsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAncm93JyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1t0YWJJbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICcobW91c2Vkb3duKSc6ICdfbW91c2Vkb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhmb2N1c2luKSc6ICdfZm9jdXNpbigpJyxcbiAgICAnKGZvY3Vzb3V0KSc6ICdfZm9jdXNvdXQoKSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdENoaXAsIHVzZUV4aXN0aW5nOiBNYXRDaGlwUm93fV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwUm93IGV4dGVuZHMgTWF0Q2hpcCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsXG4gIEdyaWRLZXlNYW5hZ2VyUm93PEhUTUxFbGVtZW50PiB7XG4gIHByb3RlY3RlZCBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcC1yb3cnO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9jdXNhYmxlIHdyYXBwZXIgZWxlbWVudCBpbiB0aGUgZmlyc3QgZ3JpZGNlbGwsIHdoaWNoIGNvbnRhaW5zIGFsbFxuICAgKiBjaGlwIGNvbnRlbnQgb3RoZXIgdGhhbiB0aGUgcmVtb3ZlIGljb24uXG4gICAqL1xuICBAVmlld0NoaWxkKCdjaGlwQ29udGVudCcpIGNoaXBDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIC8qKiBUaGUgZm9jdXNhYmxlIGdyaWQgY2VsbHMgZm9yIHRoaXMgcm93LiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIEdyaWRLZXlNYW5hZ2VyUm93LiAqL1xuICBjZWxscyE6IEhUTUxFbGVtZW50W107XG5cbiAgLyoqIEtleSBjb2RlcyBmb3Igd2hpY2ggdGhpcyBjb21wb25lbnQgaGFzIGEgY3VzdG9tIGhhbmRsZXIuICovXG4gIEhBTkRMRURfS0VZUyA9IE5BVklHQVRJT05fS0VZUy5jb25jYXQoW0JBQ0tTUEFDRSwgREVMRVRFXSk7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuXG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgLy8gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMgZnJvbSBBbmd1bGFyLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIHJlbW92ZUljb24gaGFzIHRhYkluZGV4IDAgZm9yIHJlZ3VsYXIgY2hpcHMsIGJ1dCBzaG91bGQgb25seSBiZSBmb2N1c2FibGUgYnlcbiAgICAgICAgLy8gdGhlIEdyaWRGb2N1c0tleU1hbmFnZXIgZm9yIHJvdyBjaGlwcy5cbiAgICAgICAgdGhpcy5yZW1vdmVJY29uLnRhYkluZGV4ID0gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgdGhpcy5jZWxscyA9IHRoaXMucmVtb3ZlSWNvbiA/XG4gICAgICBbdGhpcy5jaGlwQ29udGVudC5uYXRpdmVFbGVtZW50LCB0aGlzLnJlbW92ZUljb24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudF0gOlxuICAgICAgW3RoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudF07XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgZm9jdXNpbmcgb2YgdGhlIGNoaXAuXG4gICAqIFNlbmRzIGZvY3VzIHRvIHRoZSBmaXJzdCBncmlkIGNlbGwuIFRoZSByb3cgY2hpcCBlbGVtZW50IGl0c2VsZlxuICAgKiBpcyBuZXZlciBmb2N1c2VkLlxuICAgKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2hhc0ZvY3VzSW50ZXJuYWwpIHtcbiAgICAgIHRoaXMuX29uRm9jdXMubmV4dCh7Y2hpcDogdGhpc30pO1xuICAgIH1cblxuICAgIHRoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgYmx1ciBldmVudCB3aGVuIG9uZSBvZiB0aGUgZ3JpZGNlbGxzIGxvc2VzIGZvY3VzLCB1bmxlc3MgZm9jdXMgbW92ZWRcbiAgICogdG8gdGhlIG90aGVyIGdyaWRjZWxsLlxuICAgKi9cbiAgX2ZvY3Vzb3V0KCkge1xuICAgIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcbiAgICAvLyBXYWl0IHRvIHNlZSBpZiBmb2N1cyBtb3ZlcyB0byB0aGUgb3RoZXIgZ3JpZGNlbGxcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYXNGb2N1cykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9vbkJsdXIubmV4dCh7Y2hpcDogdGhpc30pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFJlY29yZHMgdGhhdCB0aGUgY2hpcCBoYXMgZm9jdXMgd2hlbiBvbmUgb2YgdGhlIGdyaWRjZWxscyBpcyBmb2N1c2VkLiAqL1xuICBfZm9jdXNpbigpIHtcbiAgICB0aGlzLl9oYXNGb2N1c0ludGVybmFsID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBTZW5kcyBmb2N1cyB0byB0aGUgZmlyc3QgZ3JpZGNlbGwgd2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgaW5zaWRlIHRoZSBjaGlwLiAqL1xuICBfbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGN1c3RvbSBrZXkgcHJlc3Nlcy4gKi9cbiAgX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZm9jdXNlZCBjaGlwXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNvIHBhZ2UgbmF2aWdhdGlvbiBkb2VzIG5vdCBvY2N1clxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==