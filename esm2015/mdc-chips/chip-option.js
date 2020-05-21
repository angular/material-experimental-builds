/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { chipCssClasses } from '@material/chips';
import { take } from 'rxjs/operators';
import { MatChip } from './chip';
/** Event object emitted by MatChipOption when selected or deselected. */
export class MatChipSelectionChange {
    constructor(
    /** Reference to the chip that emitted the event. */
    source, 
    /** Whether the chip that emitted the event is selected. */
    selected, 
    /** Whether the selection change was a result of a user interaction. */
    isUserInput = false) {
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
}
/**
 * An extension of the MatChip component that supports chip selection.
 * Used with MatChipListbox.
 */
let MatChipOption = /** @class */ (() => {
    var MatChipOption_1;
    let MatChipOption = MatChipOption_1 = class MatChipOption extends MatChip {
        constructor() {
            super(...arguments);
            /** Whether the chip list is selectable. */
            this.chipListSelectable = true;
            /** Whether the chip list is in multi-selection mode. */
            this._chipListMultiple = false;
            this._selectable = true;
            /** The unstyled chip selector for this component. */
            this.basicChipAttrName = 'mat-basic-chip-option';
            /** Emitted when the chip is selected or deselected. */
            this.selectionChange = new EventEmitter();
        }
        /**
         * Whether or not the chip is selectable.
         *
         * When a chip is not selectable, changes to its selected state are always
         * ignored. By default an option chip is selectable, and it becomes
         * non-selectable if its parent chip list is not selectable.
         */
        get selectable() {
            return this._selectable && this.chipListSelectable;
        }
        set selectable(value) {
            this._selectable = coerceBooleanProperty(value);
        }
        /** Whether the chip is selected. */
        get selected() {
            return this._chipFoundation.isSelected();
        }
        set selected(value) {
            if (!this.selectable) {
                return;
            }
            const coercedValue = coerceBooleanProperty(value);
            if (coercedValue != this._chipFoundation.isSelected()) {
                this._chipFoundation.setSelected(coerceBooleanProperty(value));
                this._dispatchSelectionChange();
            }
        }
        /** The ARIA selected applied to the chip. */
        get ariaSelected() {
            // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
            // it adds noise to NVDA users where "not selected" will be read out for each chip.
            return this.selectable && (this._chipListMultiple || this.selected) ?
                this.selected.toString() : null;
        }
        ngAfterContentInit() {
            super.ngAfterContentInit();
            if (this.selected && this.leadingIcon) {
                this.leadingIcon.setClass(chipCssClasses.HIDDEN_LEADING_ICON, true);
            }
        }
        /** Selects the chip. */
        select() {
            if (!this.selectable) {
                return;
            }
            else if (!this.selected) {
                this._chipFoundation.setSelected(true);
                this._dispatchSelectionChange();
            }
        }
        /** Deselects the chip. */
        deselect() {
            if (!this.selectable) {
                return;
            }
            else if (this.selected) {
                this._chipFoundation.setSelected(false);
                this._dispatchSelectionChange();
            }
        }
        /** Selects this chip and emits userInputSelection event */
        selectViaInteraction() {
            if (!this.selectable) {
                return;
            }
            else if (!this.selected) {
                this._chipFoundation.setSelected(true);
                this._dispatchSelectionChange(true);
            }
        }
        /** Toggles the current selected state of this chip. */
        toggleSelected(isUserInput = false) {
            if (!this.selectable) {
                return this.selected;
            }
            this._chipFoundation.setSelected(!this.selected);
            this._dispatchSelectionChange(isUserInput);
            return this.selected;
        }
        /** Emits a selection change event. */
        _dispatchSelectionChange(isUserInput = false) {
            this.selectionChange.emit({
                source: this,
                isUserInput,
                selected: this.selected
            });
        }
        /** Allows for programmatic focusing of the chip. */
        focus() {
            if (this.disabled) {
                return;
            }
            if (!this._hasFocus) {
                this._elementRef.nativeElement.focus();
                this._onFocus.next({ chip: this });
            }
            this._hasFocusInternal = true;
        }
        /** Resets the state of the chip when it loses focus. */
        _blur() {
            // When animations are enabled, Angular may end up removing the chip from the DOM a little
            // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
            // that moves focus not the next item. To work around the issue, we defer marking the chip
            // as not focused until the next time the zone stabilizes.
            this._ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                this._ngZone.run(() => {
                    this._hasFocusInternal = false;
                    this._onBlur.next({ chip: this });
                });
            });
        }
        /** Handles click events on the chip. */
        _click(event) {
            if (this.disabled) {
                event.preventDefault();
            }
            else {
                this._handleInteraction(event);
                event.stopPropagation();
            }
        }
        /** Handles custom key presses. */
        _keydown(event) {
            if (this.disabled) {
                return;
            }
            switch (event.keyCode) {
                case SPACE:
                    this.toggleSelected(true);
                    // Always prevent space from scrolling the page since the list has focus
                    event.preventDefault();
                    break;
                default:
                    this._handleInteraction(event);
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatChipOption.prototype, "selectable", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatChipOption.prototype, "selected", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MatChipOption.prototype, "selectionChange", void 0);
    MatChipOption = MatChipOption_1 = __decorate([
        Component({
            selector: 'mat-basic-chip-option, mat-chip-option',
            template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__checkmark\" *ngIf=\"_chipListMultiple\">\n  <svg class=\"mdc-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n    <path class=\"mdc-chip__checkmark-path\" fill=\"none\" stroke=\"black\"\n          d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n  </svg>\n</div>\n<div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n",
            inputs: ['color', 'disableRipple', 'tabIndex'],
            host: {
                'role': 'option',
                'class': 'mat-mdc-focus-indicator',
                '[class.mat-mdc-chip-disabled]': 'disabled',
                '[class.mat-mdc-chip-highlighted]': 'highlighted',
                '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                '[class.mat-mdc-chip-selected]': 'selected',
                '[id]': 'id',
                '[tabIndex]': 'tabIndex',
                '[attr.disabled]': 'disabled || null',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-selected]': 'ariaSelected',
                '(click)': '_click($event)',
                '(keydown)': '_keydown($event)',
                '(focus)': 'focus()',
                '(blur)': '_blur()',
            },
            providers: [{ provide: MatChip, useExisting: MatChipOption_1 }],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
        })
    ], MatChipOption);
    return MatChipOption;
})();
export { MatChipOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFHL0IseUVBQXlFO0FBQ3pFLE1BQU0sT0FBTyxzQkFBc0I7SUFDakM7SUFDRSxvREFBb0Q7SUFDN0MsTUFBcUI7SUFDNUIsMkRBQTJEO0lBQ3BELFFBQWlCO0lBQ3hCLHVFQUF1RTtJQUNoRSxjQUFjLEtBQUs7UUFKbkIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUVyQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBRWpCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUksQ0FBQztDQUNsQztBQUVEOzs7R0FHRztBQTRCSDs7SUFBQSxJQUFhLGFBQWEscUJBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQU87UUFBMUM7O1lBRUUsMkNBQTJDO1lBQzNDLHVCQUFrQixHQUFZLElBQUksQ0FBQztZQUVuQyx3REFBd0Q7WUFDeEQsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1lBZ0J6QixnQkFBVyxHQUFZLElBQUksQ0FBQztZQTBCdEMscURBQXFEO1lBQzNDLHNC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QUErQixFQUFFLFVBQVU7Z0JBQzNDLGtDQUFrQyxFQUFFLGFBQWE7Z0JBQ2pELGtDQUFrQyxFQUFFLGFBQWE7Z0JBQ2pELHlDQUF5QyxFQUFFLDRCQUE0QjtnQkFDdkUsK0JBQStCLEVBQUUsVUFBVTtnQkFDM0MsTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLGlCQUFpQixFQUFFLGtCQUFrQjtnQkFDckMsc0JBQXNCLEVBQUUscUJBQXFCO2dCQUM3QyxzQkFBc0IsRUFBRSxjQUFjO2dCQUN0QyxTQUFTLEVBQUUsZ0JBQWdCO2dCQUMzQixXQUFXLEVBQUUsa0JBQWtCO2dCQUMvQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsUUFBUSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWEsRUFBQyxDQUFDO1lBQzNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csYUFBYSxDQThLekI7SUFBRCxvQkFBQztLQUFBO1NBOUtZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U1BBQ0V9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBBZnRlckNvbnRlbnRJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtjaGlwQ3NzQ2xhc3Nlc30gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7dGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRDaGlwfSBmcm9tICcuL2NoaXAnO1xuXG5cbi8qKiBFdmVudCBvYmplY3QgZW1pdHRlZCBieSBNYXRDaGlwT3B0aW9uIHdoZW4gc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRDaGlwU2VsZWN0aW9uQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY2hpcCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE1hdENoaXBPcHRpb24sXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgdGhhdCBlbWl0dGVkIHRoZSBldmVudCBpcyBzZWxlY3RlZC4gKi9cbiAgICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW4sXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdGlvbiBjaGFuZ2Ugd2FzIGEgcmVzdWx0IG9mIGEgdXNlciBpbnRlcmFjdGlvbi4gKi9cbiAgICBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkgeyB9XG59XG5cbi8qKlxuICogQW4gZXh0ZW5zaW9uIG9mIHRoZSBNYXRDaGlwIGNvbXBvbmVudCB0aGF0IHN1cHBvcnRzIGNoaXAgc2VsZWN0aW9uLlxuICogVXNlZCB3aXRoIE1hdENoaXBMaXN0Ym94LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtYmFzaWMtY2hpcC1vcHRpb24sIG1hdC1jaGlwLW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnY2hpcC1vcHRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ29wdGlvbicsXG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW3RhYkluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ2FyaWFTZWxlY3RlZCcsXG4gICAgJyhjbGljayknOiAnX2NsaWNrKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdENoaXAsIHVzZUV4aXN0aW5nOiBNYXRDaGlwT3B0aW9ufV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwT3B0aW9uIGV4dGVuZHMgTWF0Q2hpcCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgaXMgc2VsZWN0YWJsZS4gKi9cbiAgY2hpcExpc3RTZWxlY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBsaXN0IGlzIGluIG11bHRpLXNlbGVjdGlvbiBtb2RlLiAqL1xuICBfY2hpcExpc3RNdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcCBpcyBzZWxlY3RhYmxlLlxuICAgKlxuICAgKiBXaGVuIGEgY2hpcCBpcyBub3Qgc2VsZWN0YWJsZSwgY2hhbmdlcyB0byBpdHMgc2VsZWN0ZWQgc3RhdGUgYXJlIGFsd2F5c1xuICAgKiBpZ25vcmVkLiBCeSBkZWZhdWx0IGFuIG9wdGlvbiBjaGlwIGlzIHNlbGVjdGFibGUsIGFuZCBpdCBiZWNvbWVzXG4gICAqIG5vbi1zZWxlY3RhYmxlIGlmIGl0cyBwYXJlbnQgY2hpcCBsaXN0IGlzIG5vdCBzZWxlY3RhYmxlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGFibGUgJiYgdGhpcy5jaGlwTGlzdFNlbGVjdGFibGU7XG4gIH1cbiAgc2V0IHNlbGVjdGFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3RhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3NlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGlzIHNlbGVjdGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmlzU2VsZWN0ZWQoKTtcbiAgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmIChjb2VyY2VkVmFsdWUgIT0gdGhpcy5fY2hpcEZvdW5kYXRpb24uaXNTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZChjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBBUklBIHNlbGVjdGVkIGFwcGxpZWQgdG8gdGhlIGNoaXAuICovXG4gIGdldCBhcmlhU2VsZWN0ZWQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgLy8gUmVtb3ZlIHRoZSBgYXJpYS1zZWxlY3RlZGAgd2hlbiB0aGUgY2hpcCBpcyBkZXNlbGVjdGVkIGluIHNpbmdsZS1zZWxlY3Rpb24gbW9kZSwgYmVjYXVzZVxuICAgIC8vIGl0IGFkZHMgbm9pc2UgdG8gTlZEQSB1c2VycyB3aGVyZSBcIm5vdCBzZWxlY3RlZFwiIHdpbGwgYmUgcmVhZCBvdXQgZm9yIGVhY2ggY2hpcC5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RhYmxlICYmICh0aGlzLl9jaGlwTGlzdE11bHRpcGxlIHx8IHRoaXMuc2VsZWN0ZWQpID9cbiAgICAgICAgdGhpcy5zZWxlY3RlZC50b1N0cmluZygpIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBUaGUgdW5zdHlsZWQgY2hpcCBzZWxlY3RvciBmb3IgdGhpcyBjb21wb25lbnQuICovXG4gIHByb3RlY3RlZCBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcC1vcHRpb24nO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIGNoaXAgaXMgc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdENoaXBTZWxlY3Rpb25DaGFuZ2U+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcFNlbGVjdGlvbkNoYW5nZT4oKTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlckNvbnRlbnRJbml0KCk7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiB0aGlzLmxlYWRpbmdJY29uKSB7XG4gICAgICB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNoaXBDc3NDbGFzc2VzLkhJRERFTl9MRUFESU5HX0lDT04sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBjaGlwLiAqL1xuICBzZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERlc2VsZWN0cyB0aGUgY2hpcC4gKi9cbiAgZGVzZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNlbGVjdHMgdGhpcyBjaGlwIGFuZCBlbWl0cyB1c2VySW5wdXRTZWxlY3Rpb24gZXZlbnQgKi9cbiAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBjdXJyZW50IHNlbGVjdGVkIHN0YXRlIG9mIHRoaXMgY2hpcC4gKi9cbiAgdG9nZ2xlU2VsZWN0ZWQoaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZCghdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQpO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgLyoqIEVtaXRzIGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudC4gKi9cbiAgcHJpdmF0ZSBfZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQgPSBmYWxzZSkge1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgaXNVc2VySW5wdXQsXG4gICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBjaGlwLiAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5faGFzRm9jdXMpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5fb25Gb2N1cy5uZXh0KHtjaGlwOiB0aGlzfSk7XG4gICAgfVxuICAgIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWwgPSB0cnVlO1xuICB9XG5cbiAgLyoqIFJlc2V0cyB0aGUgc3RhdGUgb2YgdGhlIGNoaXAgd2hlbiBpdCBsb3NlcyBmb2N1cy4gKi9cbiAgX2JsdXIoKTogdm9pZCB7XG4gICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIGNoaXAgZnJvbSB0aGUgRE9NIGEgbGl0dGxlXG4gICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIGNoaXAgbGlzdFxuICAgIC8vIHRoYXQgbW92ZXMgZm9jdXMgbm90IHRoZSBuZXh0IGl0ZW0uIFRvIHdvcmsgYXJvdW5kIHRoZSBpc3N1ZSwgd2UgZGVmZXIgbWFya2luZyB0aGUgY2hpcFxuICAgIC8vIGFzIG5vdCBmb2N1c2VkIHVudGlsIHRoZSBuZXh0IHRpbWUgdGhlIHpvbmUgc3RhYmlsaXplcy5cbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGVcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9oYXNGb2N1c0ludGVybmFsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fb25CbHVyLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLyoqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG9uIHRoZSBjaGlwLiAqL1xuICBfY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgY3VzdG9tIGtleSBwcmVzc2VzLiAqL1xuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdGVkKHRydWUpO1xuXG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNwYWNlIGZyb20gc2Nyb2xsaW5nIHRoZSBwYWdlIHNpbmNlIHRoZSBsaXN0IGhhcyBmb2N1c1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==