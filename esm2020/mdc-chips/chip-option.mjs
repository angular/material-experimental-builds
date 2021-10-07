/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { deprecated } from '@material/chips';
import { take } from 'rxjs/operators';
import { MatChip } from './chip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material-experimental/mdc-core";
import * as i2 from "@angular/common";
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
export class MatChipOption extends MatChip {
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
            this.leadingIcon.setClass(deprecated.chipCssClasses.HIDDEN_LEADING_ICON, true);
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
        if (!this._hasFocus()) {
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
}
MatChipOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChipOption, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatChipOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatChipOption, selector: "mat-basic-chip-option, mat-chip-option", inputs: { color: "color", disableRipple: "disableRipple", tabIndex: "tabIndex", selectable: "selectable", selected: "selected" }, outputs: { selectionChange: "selectionChange" }, host: { attributes: { "role": "option" }, listeners: { "click": "_click($event)", "keydown": "_keydown($event)", "focus": "focus()", "blur": "_blur()" }, properties: { "class.mat-mdc-chip-disabled": "disabled", "class.mat-mdc-chip-highlighted": "highlighted", "class.mat-mdc-chip-with-avatar": "leadingIcon", "class.mat-mdc-chip-with-trailing-icon": "trailingIcon || removeIcon", "class.mat-mdc-chip-selected": "selected", "id": "id", "tabIndex": "tabIndex", "attr.disabled": "disabled || null", "attr.aria-disabled": "disabled.toString()", "attr.aria-selected": "ariaSelected" }, classAttribute: "mat-mdc-focus-indicator mat-mdc-chip-option" }, providers: [{ provide: MatChip, useExisting: MatChipOption }], usesInheritance: true, ngImport: i0, template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__checkmark\" *ngIf=\"_chipListMultiple\">\n  <svg class=\"mdc-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n    <path class=\"mdc-chip__checkmark-path\" fill=\"none\" stroke=\"black\"\n          d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n  </svg>\n</div>\n<div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n", styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"], directives: [{ type: i1.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChipOption, decorators: [{
            type: Component,
            args: [{ selector: 'mat-basic-chip-option, mat-chip-option', inputs: ['color', 'disableRipple', 'tabIndex'], host: {
                        'role': 'option',
                        'class': 'mat-mdc-focus-indicator mat-mdc-chip-option',
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
                    }, providers: [{ provide: MatChip, useExisting: MatChipOption }], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__checkmark\" *ngIf=\"_chipListMultiple\">\n  <svg class=\"mdc-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n    <path class=\"mdc-chip__checkmark-path\" fill=\"none\" stroke=\"black\"\n          d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n  </svg>\n</div>\n<div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n", styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"] }]
        }], propDecorators: { selectable: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLW9wdGlvbi50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtb3B0aW9uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUFHL0IseUVBQXlFO0FBQ3pFLE1BQU0sT0FBTyxzQkFBc0I7SUFDakM7SUFDRSxvREFBb0Q7SUFDN0MsTUFBcUI7SUFDNUIsMkRBQTJEO0lBQ3BELFFBQWlCO0lBQ3hCLHVFQUF1RTtJQUNoRSxjQUFjLEtBQUs7UUFKbkIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUVyQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBRWpCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUksQ0FBQztDQUNsQztBQUVEOzs7R0FHRztBQTRCSCxNQUFNLE9BQU8sYUFBYyxTQUFRLE9BQU87SUEzQjFDOztRQTZCRSwyQ0FBMkM7UUFDM0MsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBRW5DLHdEQUF3RDtRQUN4RCxzQkFBaUIsR0FBWSxL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LGFBQWE7d0JBQ2pELGtDQUFrQyxFQUFFLGFBQWE7d0JBQ2pELHlDQUF5QyxFQUFFLDRCQUE0Qjt3QkFDdkUsK0JBQStCLEVBQUUsVUFBVTt3QkFDM0MsTUFBTSxFQUFFLElBQUk7d0JBQ1osWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLGlCQUFpQixFQUFFLGtCQUFrQjt3QkFDckMsc0JBQXNCLEVBQUUscUJBQXFCO3dCQUM3QyxzQkFBc0IsRUFBRSxjQUFjO3dCQUN0QyxTQUFTLEVBQUUsZ0JBQWdCO3dCQUMzQixXQUFXLEVBQUUsa0JBQWtCO3dCQUMvQixTQUFTLEVBQUUsU0FBUzt3QkFDcEIsUUFBUSxFQUFFLFNBQVM7cUJBQ3BCLGFBQ1UsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxlQUFlLEVBQUMsQ0FBQyxpQkFDNUMsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4QkFrQjNDLFVBQVU7c0JBRGIsS0FBSztnQkFXRixRQUFRO3NCQURYLEtBQUs7Z0JBMkJhLGVBQWU7c0JBQWpDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U1BBQ0V9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBBZnRlckNvbnRlbnRJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtkZXByZWNhdGVkfSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdENoaXB9IGZyb20gJy4vY2hpcCc7XG5cblxuLyoqIEV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1hdENoaXBPcHRpb24gd2hlbiBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBTZWxlY3Rpb25DaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjaGlwIHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTWF0Q2hpcE9wdGlvbixcbiAgICAvKiogV2hldGhlciB0aGUgY2hpcCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50IGlzIHNlbGVjdGVkLiAqL1xuICAgIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbixcbiAgICAvKiogV2hldGhlciB0aGUgc2VsZWN0aW9uIGNoYW5nZSB3YXMgYSByZXN1bHQgb2YgYSB1c2VyIGludGVyYWN0aW9uLiAqL1xuICAgIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7IH1cbn1cblxuLyoqXG4gKiBBbiBleHRlbnNpb24gb2YgdGhlIE1hdENoaXAgY29tcG9uZW50IHRoYXQgc3VwcG9ydHMgY2hpcCBzZWxlY3Rpb24uXG4gKiBVc2VkIHdpdGggTWF0Q2hpcExpc3Rib3guXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1iYXNpYy1jaGlwLW9wdGlvbiwgbWF0LWNoaXAtb3B0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwLW9wdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLmNzcyddLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZScsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnb3B0aW9uJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3IgbWF0LW1kYy1jaGlwLW9wdGlvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtYXZhdGFyXSc6ICdsZWFkaW5nSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1t0YWJJbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdhcmlhU2VsZWN0ZWQnLFxuICAgICcoY2xpY2spJzogJ19jbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19rZXlkb3duKCRldmVudCknLFxuICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNYXRDaGlwLCB1c2VFeGlzdGluZzogTWF0Q2hpcE9wdGlvbn1dLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcE9wdGlvbiBleHRlbmRzIE1hdENoaXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBsaXN0IGlzIHNlbGVjdGFibGUuICovXG4gIGNoaXBMaXN0U2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgbGlzdCBpcyBpbiBtdWx0aS1zZWxlY3Rpb24gbW9kZS4gKi9cbiAgX2NoaXBMaXN0TXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIGNoaXAgaXMgc2VsZWN0YWJsZS5cbiAgICpcbiAgICogV2hlbiBhIGNoaXAgaXMgbm90IHNlbGVjdGFibGUsIGNoYW5nZXMgdG8gaXRzIHNlbGVjdGVkIHN0YXRlIGFyZSBhbHdheXNcbiAgICogaWdub3JlZC4gQnkgZGVmYXVsdCBhbiBvcHRpb24gY2hpcCBpcyBzZWxlY3RhYmxlLCBhbmQgaXQgYmVjb21lc1xuICAgKiBub24tc2VsZWN0YWJsZSBpZiBpdHMgcGFyZW50IGNoaXAgbGlzdCBpcyBub3Qgc2VsZWN0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlICYmIHRoaXMuY2hpcExpc3RTZWxlY3RhYmxlO1xuICB9XG4gIHNldCBzZWxlY3RhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9zZWxlY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBpcyBzZWxlY3RlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGlwRm91bmRhdGlvbi5pc1NlbGVjdGVkKCk7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29lcmNlZFZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAoY29lcmNlZFZhbHVlICE9IHRoaXMuX2NoaXBGb3VuZGF0aW9uLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uc2V0U2VsZWN0ZWQoY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKSk7XG4gICAgICB0aGlzLl9kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgQVJJQSBzZWxlY3RlZCBhcHBsaWVkIHRvIHRoZSBjaGlwLiAqL1xuICBnZXQgYXJpYVNlbGVjdGVkKCk6IHN0cmluZyB8IG51bGwge1xuICAgIC8vIFJlbW92ZSB0aGUgYGFyaWEtc2VsZWN0ZWRgIHdoZW4gdGhlIGNoaXAgaXMgZGVzZWxlY3RlZCBpbiBzaW5nbGUtc2VsZWN0aW9uIG1vZGUsIGJlY2F1c2VcbiAgICAvLyBpdCBhZGRzIG5vaXNlIHRvIE5WREEgdXNlcnMgd2hlcmUgXCJub3Qgc2VsZWN0ZWRcIiB3aWxsIGJlIHJlYWQgb3V0IGZvciBlYWNoIGNoaXAuXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0YWJsZSAmJiAodGhpcy5fY2hpcExpc3RNdWx0aXBsZSB8fCB0aGlzLnNlbGVjdGVkKSA/XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQudG9TdHJpbmcoKSA6IG51bGw7XG4gIH1cblxuICAvKiogVGhlIHVuc3R5bGVkIGNoaXAgc2VsZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50LiAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYmFzaWNDaGlwQXR0ck5hbWUgPSAnbWF0LWJhc2ljLWNoaXAtb3B0aW9uJztcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXRDaGlwU2VsZWN0aW9uQ2hhbmdlPiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBTZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgb3ZlcnJpZGUgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5sZWFkaW5nSWNvbikge1xuICAgICAgdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhkZXByZWNhdGVkLmNoaXBDc3NDbGFzc2VzLkhJRERFTl9MRUFESU5HX0lDT04sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBjaGlwLiAqL1xuICBzZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERlc2VsZWN0cyB0aGUgY2hpcC4gKi9cbiAgZGVzZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNlbGVjdHMgdGhpcyBjaGlwIGFuZCBlbWl0cyB1c2VySW5wdXRTZWxlY3Rpb24gZXZlbnQgKi9cbiAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBjdXJyZW50IHNlbGVjdGVkIHN0YXRlIG9mIHRoaXMgY2hpcC4gKi9cbiAgdG9nZ2xlU2VsZWN0ZWQoaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTZWxlY3RlZCghdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQpO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgLyoqIEVtaXRzIGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudC4gKi9cbiAgcHJpdmF0ZSBfZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQgPSBmYWxzZSkge1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgaXNVc2VySW5wdXQsXG4gICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBjaGlwLiAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5faGFzRm9jdXMoKSkge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLl9vbkZvY3VzLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICB9XG4gICAgdGhpcy5faGFzRm9jdXNJbnRlcm5hbCA9IHRydWU7XG4gIH1cblxuICAvKiogUmVzZXRzIHRoZSBzdGF0ZSBvZiB0aGUgY2hpcCB3aGVuIGl0IGxvc2VzIGZvY3VzLiAqL1xuICBfYmx1cigpOiB2b2lkIHtcbiAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgY2hpcCBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgY2hpcCBsaXN0XG4gICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBjaGlwXG4gICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9oYXNGb2N1c0ludGVybmFsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fb25CbHVyLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLyoqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG9uIHRoZSBjaGlwLiAqL1xuICBfY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgY3VzdG9tIGtleSBwcmVzc2VzLiAqL1xuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdGVkKHRydWUpO1xuXG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNwYWNlIGZyb20gc2Nyb2xsaW5nIHRoZSBwYWdlIHNpbmNlIHRoZSBsaXN0IGhhcyBmb2N1c1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxzcGFuIGNsYXNzPVwibWRjLWNoaXBfX3JpcHBsZVwiPjwvc3Bhbj5cblxuPHNwYW4gbWF0UmlwcGxlIGNsYXNzPVwibWF0LW1kYy1jaGlwLXJpcHBsZVwiXG4gICAgIFttYXRSaXBwbGVEaXNhYmxlZF09XCJfaXNSaXBwbGVEaXNhYmxlZCgpXCJcbiAgICAgW21hdFJpcHBsZUNlbnRlcmVkXT1cIl9pc1JpcHBsZUNlbnRlcmVkXCJcbiAgICAgW21hdFJpcHBsZVRyaWdnZXJdPVwiX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFwiPjwvc3Bhbj5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWF0LWNoaXAtYXZhdGFyLCBbbWF0Q2hpcEF2YXRhcl1cIj48L25nLWNvbnRlbnQ+XG48ZGl2IGNsYXNzPVwibWRjLWNoaXBfX2NoZWNrbWFya1wiICpuZ0lmPVwiX2NoaXBMaXN0TXVsdGlwbGVcIj5cbiAgPHN2ZyBjbGFzcz1cIm1kYy1jaGlwX19jaGVja21hcmstc3ZnXCIgdmlld0JveD1cIi0yIC0zIDMwIDMwXCIgZm9jdXNhYmxlPVwiZmFsc2VcIj5cbiAgICA8cGF0aCBjbGFzcz1cIm1kYy1jaGlwX19jaGVja21hcmstcGF0aFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiYmxhY2tcIlxuICAgICAgICAgIGQ9XCJNMS43MywxMi45MSA4LjEsMTkuMjggMjIuNzksNC41OVwiLz5cbiAgPC9zdmc+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtZGMtY2hpcF9fdGV4dFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1jaGlwLXRyYWlsaW5nLWljb24sW21hdENoaXBSZW1vdmVdLFttYXRDaGlwVHJhaWxpbmdJY29uXVwiPjwvbmctY29udGVudD5cbiJdfQ==