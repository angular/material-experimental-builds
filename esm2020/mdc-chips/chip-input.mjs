/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, hasModifierKey, TAB } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, } from '@angular/core';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material-experimental/mdc-form-field';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
import { MatChipGrid } from './chip-grid';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material-experimental/mdc-form-field";
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of a `<mat-chip-grid>`.
 */
export class MatChipInput {
    constructor(_elementRef, _defaultOptions, formField) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        /** Whether the control is focused. */
        this.focused = false;
        this._addOnBlur = false;
        /**
         * The list of key codes that will trigger a chipEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
        /** Emitted when a chip is to be added. */
        this.chipEnd = new EventEmitter();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Unique id for the input. */
        this.id = `mat-mdc-chip-list-input-${nextUniqueId++}`;
        this._disabled = false;
        this.inputElement = this._elementRef.nativeElement;
        if (formField) {
            this.inputElement.classList.add('mat-mdc-form-field-input-control');
        }
    }
    /** Register input for chip list */
    set chipGrid(value) {
        if (value) {
            this._chipGrid = value;
            this._chipGrid.registerInput(this);
        }
    }
    /**
     * Whether or not the chipEnd event will be emitted when the input is blurred.
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /** Whether the input is disabled. */
    get disabled() {
        return this._disabled || (this._chipGrid && this._chipGrid.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the input is empty. */
    get empty() {
        return !this.inputElement.value;
    }
    ngOnChanges() {
        this._chipGrid.stateChanges.next();
    }
    ngOnDestroy() {
        this.chipEnd.complete();
    }
    ngAfterContentInit() {
        this._focusLastChipOnBackspace = this.empty;
    }
    /** Utility method to make host definition/tests more clear. */
    _keydown(event) {
        if (event) {
            // Allow the user's focus to escape when they're tabbing forward. Note that we don't
            // want to do this when going backwards, because focus should go back to the first chip.
            if (event.keyCode === TAB && !hasModifierKey(event, 'shiftKey')) {
                this._chipGrid._allowFocusEscape();
            }
            // To prevent the user from accidentally deleting chips when pressing BACKSPACE continuously,
            // We focus the last chip on backspace only after the user has released the backspace button,
            // And the input is empty (see behaviour in _keyup)
            if (event.keyCode === BACKSPACE && this._focusLastChipOnBackspace) {
                if (this._chipGrid._chips.length) {
                    this._chipGrid._keyManager.setLastCellActive();
                }
                event.preventDefault();
                return;
            }
            else {
                this._focusLastChipOnBackspace = false;
            }
        }
        this._emitChipEnd(event);
    }
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    _keyup(event) {
        // Allow user to move focus to chips next time he presses backspace
        if (!this._focusLastChipOnBackspace && event.keyCode === BACKSPACE && this.empty) {
            this._focusLastChipOnBackspace = true;
            event.preventDefault();
        }
    }
    /** Checks to see if the blur should emit the (chipEnd) event. */
    _blur() {
        if (this.addOnBlur) {
            this._emitChipEnd();
        }
        this.focused = false;
        // Blur the chip list if it is not focused
        if (!this._chipGrid.focused) {
            this._chipGrid._blur();
        }
        this._chipGrid.stateChanges.next();
    }
    _focus() {
        this.focused = true;
        this._focusLastChipOnBackspace = this.empty;
        this._chipGrid.stateChanges.next();
    }
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    _emitChipEnd(event) {
        if (!this.inputElement.value && !!event) {
            this._chipGrid._keydown(event);
        }
        if (!event || this._isSeparatorKey(event)) {
            this.chipEnd.emit({
                input: this.inputElement,
                value: this.inputElement.value,
                chipInput: this,
            });
            event?.preventDefault();
        }
    }
    _onInput() {
        // Let chip list know whenever the value changes.
        this._chipGrid.stateChanges.next();
    }
    /** Focuses the input. */
    focus() {
        this.inputElement.focus();
    }
    /** Clears the input */
    clear() {
        this.inputElement.value = '';
        this._focusLastChipOnBackspace = true;
    }
    /** Checks whether a keycode is one of the configured separators. */
    _isSeparatorKey(event) {
        return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.keyCode);
    }
}
MatChipInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatChipInput, deps: [{ token: i0.ElementRef }, { token: MAT_CHIPS_DEFAULT_OPTIONS }, { token: MAT_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatChipInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0-next.3", type: MatChipInput, selector: "input[matChipInputFor]", inputs: { chipGrid: ["matChipInputFor", "chipGrid"], addOnBlur: ["matChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["matChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", disabled: "disabled" }, outputs: { chipEnd: "matChipInputTokenEnd" }, host: { listeners: { "keydown": "_keydown($event)", "keyup": "_keyup($event)", "blur": "_blur()", "focus": "_focus()", "input": "_onInput()" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null", "attr.aria-invalid": "_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null", "attr.aria-required": "_chipGrid && _chipGrid.required || null", "attr.required": "_chipGrid && _chipGrid.required || null" }, classAttribute: "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element" }, exportAs: ["matChipInput", "matChipInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatChipInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[matChipInputFor]',
                    exportAs: 'matChipInput, matChipInputFor',
                    host: {
                        // TODO: eventually we should remove `mat-input-element` from here since it comes from the
                        // non-MDC version of the input. It's currently being kept for backwards compatibility, because
                        // the MDC chips were landed initially with it.
                        'class': 'mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element',
                        '(keydown)': '_keydown($event)',
                        '(keyup)': '_keyup($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '[attr.aria-invalid]': '_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null',
                        '[attr.aria-required]': '_chipGrid && _chipGrid.required || null',
                        '[attr.required]': '_chipGrid && _chipGrid.required || null',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_CHIPS_DEFAULT_OPTIONS]
                }] }, { type: i1.MatFormField, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_FORM_FIELD]
                }] }]; }, propDecorators: { chipGrid: [{
                type: Input,
                args: ['matChipInputFor']
            }], addOnBlur: [{
                type: Input,
                args: ['matChipInputAddOnBlur']
            }], separatorKeyCodes: [{
                type: Input,
                args: ['matChipInputSeparatorKeyCodes']
            }], chipEnd: [{
                type: Output,
                args: ['matChipInputTokenEnd']
            }], placeholder: [{
                type: Input
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDckUsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBeUIseUJBQXlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7QUFzQnhDLGdEQUFnRDtBQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7OztHQUdHO0FBc0JILE1BQU0sT0FBTyxZQUFZO0lBa0V2QixZQUNZLFdBQXlDLEVBQ1IsZUFBdUMsRUFDOUMsU0FBd0I7UUFGbEQsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBQ1Isb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBaEVwRixzQ0FBc0M7UUFDdEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQXNCekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1Qjs7OztXQUlHO1FBRUgsc0JBQWlCLEdBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUV6QywwQ0FBMEM7UUFFakMsWUFBTyxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUUxRixvQ0FBb0M7UUFDM0IsZ0JB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QzlGLHNCQUFzQixFQUFFLHlDQUF5Qzt3QkFDakUsaUJBQWlCLEVBQUUseUNBQXlDO3FCQUM3RDtpQkFDRjs7MEJBcUVJLE1BQU07MkJBQUMseUJBQXlCOzswQkFDaEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjOzRDQTNEaEMsUUFBUTtzQkFEWCxLQUFLO3VCQUFDLGlCQUFpQjtnQkFZcEIsU0FBUztzQkFEWixLQUFLO3VCQUFDLHVCQUF1QjtnQkFlOUIsaUJBQWlCO3NCQURoQixLQUFLO3VCQUFDLCtCQUErQjtnQkFNN0IsT0FBTztzQkFEZixNQUFNO3VCQUFDLHNCQUFzQjtnQkFJckIsV0FBVztzQkFBbkIsS0FBSztnQkFHRyxFQUFFO3NCQUFWLEtBQUs7Z0JBSUYsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0JBQ0tTUEFDRSwgaGFzTW9kaWZpZXJLZXksIFRBQn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZCwgTUFUX0ZPUk1fRklFTER9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdENoaXBzRGVmYXVsdE9wdGlvbnMsIE1BVF9DSElQU19ERUZBVUxUX09QVElPTlN9IGZyb20gJy4vY2hpcC1kZWZhdWx0LW9wdGlvbnMnO1xuaW1wb3J0IHtNYXRDaGlwR3JpZH0gZnJvbSAnLi9jaGlwLWdyaWQnO1xuaW1wb3J0IHtNYXRDaGlwVGV4dENvbnRyb2x9IGZyb20gJy4vY2hpcC10ZXh0LWNvbnRyb2wnO1xuXG4vKiogUmVwcmVzZW50cyBhbiBpbnB1dCBldmVudCBvbiBhIGBtYXRDaGlwSW5wdXRgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwSW5wdXRFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDaGlwSW5wdXRFdmVudCNjaGlwSW5wdXQuaW5wdXRFbGVtZW50YCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMCBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICovXG4gIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICB2YWx1ZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGNoaXAgaW5wdXQgdGhhdCBlbWl0dGVkIHRoZSBldmVudC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjAgVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIG1hZGUgcmVxdWlyZWQuXG4gICAqL1xuICBjaGlwSW5wdXQ/OiBNYXRDaGlwSW5wdXQ7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1mb3JtLWZpZWxkPmAuXG4gKiBNYXkgYmUgcGxhY2VkIGluc2lkZSBvciBvdXRzaWRlIG9mIGEgYDxtYXQtY2hpcC1ncmlkPmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdENoaXBJbnB1dEZvcl0nLFxuICBleHBvcnRBczogJ21hdENoaXBJbnB1dCwgbWF0Q2hpcElucHV0Rm9yJyxcbiAgaG9zdDoge1xuICAgIC8vIFRPRE86IGV2ZW50dWFsbHkgd2Ugc2hvdWxkIHJlbW92ZSBgbWF0LWlucHV0LWVsZW1lbnRgIGZyb20gaGVyZSBzaW5jZSBpdCBjb21lcyBmcm9tIHRoZVxuICAgIC8vIG5vbi1NREMgdmVyc2lvbiBvZiB0aGUgaW5wdXQuIEl0J3MgY3VycmVudGx5IGJlaW5nIGtlcHQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCBiZWNhdXNlXG4gICAgLy8gdGhlIE1EQyBjaGlwcyB3ZXJlIGxhbmRlZCBpbml0aWFsbHkgd2l0aCBpdC5cbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLWlucHV0IG1hdC1tZGMtaW5wdXQtZWxlbWVudCBtZGMtdGV4dC1maWVsZF9faW5wdXQgbWF0LWlucHV0LWVsZW1lbnQnLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhrZXl1cCknOiAnX2tleXVwKCRldmVudCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gICAgJyhmb2N1cyknOiAnX2ZvY3VzKCknLFxuICAgICcoaW5wdXQpJzogJ19vbklucHV0KCknLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXIgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnX2NoaXBHcmlkICYmIF9jaGlwR3JpZC5uZ0NvbnRyb2wgPyBfY2hpcEdyaWQubmdDb250cm9sLmludmFsaWQgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAnX2NoaXBHcmlkICYmIF9jaGlwR3JpZC5yZXF1aXJlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIucmVxdWlyZWRdJzogJ19jaGlwR3JpZCAmJiBfY2hpcEdyaWQucmVxdWlyZWQgfHwgbnVsbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBJbnB1dCBpbXBsZW1lbnRzIE1hdENoaXBUZXh0Q29udHJvbCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogVXNlZCB0byBwcmV2ZW50IGZvY3VzIG1vdmluZyB0byBjaGlwcyB3aGlsZSB1c2VyIGlzIGhvbGRpbmcgYmFja3NwYWNlICovXG4gIHByaXZhdGUgX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZTogYm9vbGVhbjtcblxuICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBmb2N1c2VkLiAqL1xuICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gIF9jaGlwR3JpZDogTWF0Q2hpcEdyaWQ7XG5cbiAgLyoqIFJlZ2lzdGVyIGlucHV0IGZvciBjaGlwIGxpc3QgKi9cbiAgQElucHV0KCdtYXRDaGlwSW5wdXRGb3InKVxuICBzZXQgY2hpcEdyaWQodmFsdWU6IE1hdENoaXBHcmlkKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9jaGlwR3JpZCA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2hpcEdyaWQucmVnaXN0ZXJJbnB1dCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIGNoaXBFbmQgZXZlbnQgd2lsbCBiZSBlbWl0dGVkIHdoZW4gdGhlIGlucHV0IGlzIGJsdXJyZWQuXG4gICAqL1xuICBASW5wdXQoJ21hdENoaXBJbnB1dEFkZE9uQmx1cicpXG4gIGdldCBhZGRPbkJsdXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZE9uQmx1cjtcbiAgfVxuICBzZXQgYWRkT25CbHVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYWRkT25CbHVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfYWRkT25CbHVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGtleSBjb2RlcyB0aGF0IHdpbGwgdHJpZ2dlciBhIGNoaXBFbmQgZXZlbnQuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGBbRU5URVJdYC5cbiAgICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0U2VwYXJhdG9yS2V5Q29kZXMnKVxuICBzZXBhcmF0b3JLZXlDb2RlczogcmVhZG9ubHkgbnVtYmVyW10gfCBSZWFkb25seVNldDxudW1iZXI+ID1cbiAgICB0aGlzLl9kZWZhdWx0T3B0aW9ucy5zZXBhcmF0b3JLZXlDb2RlcztcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSBhZGRlZC4gKi9cbiAgQE91dHB1dCgnbWF0Q2hpcElucHV0VG9rZW5FbmQnKVxuICByZWFkb25seSBjaGlwRW5kOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcElucHV0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwSW5wdXRFdmVudD4oKTtcblxuICAvKiogVGhlIGlucHV0J3MgcGxhY2Vob2xkZXIgdGV4dC4gKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSBpbnB1dC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWNoaXAtbGlzdC1pbnB1dC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLl9jaGlwR3JpZCAmJiB0aGlzLl9jaGlwR3JpZC5kaXNhYmxlZCk7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGVtcHR5LiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlucHV0RWxlbWVudC52YWx1ZTtcbiAgfVxuXG4gIC8qKiBUaGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgdG8gd2hpY2ggdGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQuICovXG4gIHJlYWRvbmx5IGlucHV0RWxlbWVudCE6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM6IE1hdENoaXBzRGVmYXVsdE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfRk9STV9GSUVMRCkgZm9ybUZpZWxkPzogTWF0Rm9ybUZpZWxkLFxuICApIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgaWYgKGZvcm1GaWVsZCkge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1mb3JtLWZpZWxkLWlucHV0LWNvbnRyb2wnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jaGlwRW5kLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdGhpcy5lbXB0eTtcbiAgfVxuXG4gIC8qKiBVdGlsaXR5IG1ldGhvZCB0byBtYWtlIGhvc3QgZGVmaW5pdGlvbi90ZXN0cyBtb3JlIGNsZWFyLiAqL1xuICBfa2V5ZG93bihldmVudD86IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIC8vIEFsbG93IHRoZSB1c2VyJ3MgZm9jdXMgdG8gZXNjYXBlIHdoZW4gdGhleSdyZSB0YWJiaW5nIGZvcndhcmQuIE5vdGUgdGhhdCB3ZSBkb24ndFxuICAgICAgLy8gd2FudCB0byBkbyB0aGlzIHdoZW4gZ29pbmcgYmFja3dhcmRzLCBiZWNhdXNlIGZvY3VzIHNob3VsZCBnbyBiYWNrIHRvIHRoZSBmaXJzdCBjaGlwLlxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IFRBQiAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQsICdzaGlmdEtleScpKSB7XG4gICAgICAgIHRoaXMuX2NoaXBHcmlkLl9hbGxvd0ZvY3VzRXNjYXBlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIHByZXZlbnQgdGhlIHVzZXIgZnJvbSBhY2NpZGVudGFsbHkgZGVsZXRpbmcgY2hpcHMgd2hlbiBwcmVzc2luZyBCQUNLU1BBQ0UgY29udGludW91c2x5LFxuICAgICAgLy8gV2UgZm9jdXMgdGhlIGxhc3QgY2hpcCBvbiBiYWNrc3BhY2Ugb25seSBhZnRlciB0aGUgdXNlciBoYXMgcmVsZWFzZWQgdGhlIGJhY2tzcGFjZSBidXR0b24sXG4gICAgICAvLyBBbmQgdGhlIGlucHV0IGlzIGVtcHR5IChzZWUgYmVoYXZpb3VyIGluIF9rZXl1cClcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlwR3JpZC5fY2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5fY2hpcEdyaWQuX2tleU1hbmFnZXIuc2V0TGFzdENlbGxBY3RpdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0Q2hpcEVuZChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBldmVudHMgdG8gdGhlIGtleWJvYXJkIG1hbmFnZXIuIEF2YWlsYWJsZSBoZXJlIGZvciB0ZXN0cy5cbiAgICovXG4gIF9rZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIEFsbG93IHVzZXIgdG8gbW92ZSBmb2N1cyB0byBjaGlwcyBuZXh0IHRpbWUgaGUgcHJlc3NlcyBiYWNrc3BhY2VcbiAgICBpZiAoIXRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSAmJiBldmVudC5rZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgdGhpcy5lbXB0eSkge1xuICAgICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdHJ1ZTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIGJsdXIgc2hvdWxkIGVtaXQgdGhlIChjaGlwRW5kKSBldmVudC4gKi9cbiAgX2JsdXIoKSB7XG4gICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XG4gICAgICB0aGlzLl9lbWl0Q2hpcEVuZCgpO1xuICAgIH1cbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAvLyBCbHVyIHRoZSBjaGlwIGxpc3QgaWYgaXQgaXMgbm90IGZvY3VzZWRcbiAgICBpZiAoIXRoaXMuX2NoaXBHcmlkLmZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2NoaXBHcmlkLl9ibHVyKCk7XG4gICAgfVxuICAgIHRoaXMuX2NoaXBHcmlkLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBfZm9jdXMoKSB7XG4gICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgPSB0aGlzLmVtcHR5O1xuICAgIHRoaXMuX2NoaXBHcmlkLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgKGNoaXBFbmQpIGV2ZW50IG5lZWRzIHRvIGJlIGVtaXR0ZWQuICovXG4gIF9lbWl0Q2hpcEVuZChldmVudD86IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaW5wdXRFbGVtZW50LnZhbHVlICYmICEhZXZlbnQpIHtcbiAgICAgIHRoaXMuX2NoaXBHcmlkLl9rZXlkb3duKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoIWV2ZW50IHx8IHRoaXMuX2lzU2VwYXJhdG9yS2V5KGV2ZW50KSkge1xuICAgICAgdGhpcy5jaGlwRW5kLmVtaXQoe1xuICAgICAgICBpbnB1dDogdGhpcy5pbnB1dEVsZW1lbnQsXG4gICAgICAgIHZhbHVlOiB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSxcbiAgICAgICAgY2hpcElucHV0OiB0aGlzLFxuICAgICAgfSk7XG5cbiAgICAgIGV2ZW50Py5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIF9vbklucHV0KCkge1xuICAgIC8vIExldCBjaGlwIGxpc3Qga25vdyB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGlucHV0LiAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIENsZWFycyB0aGUgaW5wdXQgKi9cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgPSB0cnVlO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGEga2V5Y29kZSBpcyBvbmUgb2YgdGhlIGNvbmZpZ3VyZWQgc2VwYXJhdG9ycy4gKi9cbiAgcHJpdmF0ZSBfaXNTZXBhcmF0b3JLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICByZXR1cm4gIWhhc01vZGlmaWVyS2V5KGV2ZW50KSAmJiBuZXcgU2V0KHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMpLmhhcyhldmVudC5rZXlDb2RlKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hZGRPbkJsdXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=