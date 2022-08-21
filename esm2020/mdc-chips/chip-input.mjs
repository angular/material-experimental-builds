/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, hasModifierKey } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, } from '@angular/core';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material-experimental/mdc-form-field';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './tokens';
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
            // To prevent the user from accidentally deleting chips when pressing BACKSPACE continuously,
            // We focus the last chip on backspace only after the user has released the backspace button,
            // And the input is empty (see behaviour in _keyup)
            if (event.keyCode === BACKSPACE && this._focusLastChipOnBackspace) {
                this._chipGrid._focusLastChip();
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
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /** Checks whether a keycode is one of the configured separators. */
    _isSeparatorKey(event) {
        return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.keyCode);
    }
}
MatChipInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipInput, deps: [{ token: i0.ElementRef }, { token: MAT_CHIPS_DEFAULT_OPTIONS }, { token: MAT_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatChipInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatChipInput, selector: "input[matChipInputFor]", inputs: { chipGrid: ["matChipInputFor", "chipGrid"], addOnBlur: ["matChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["matChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", disabled: "disabled" }, outputs: { chipEnd: "matChipInputTokenEnd" }, host: { listeners: { "keydown": "_keydown($event)", "keyup": "_keyup($event)", "blur": "_blur()", "focus": "_focus()", "input": "_onInput()" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null", "attr.aria-invalid": "_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-required": "_chipGrid && _chipGrid.required || null", "attr.required": "_chipGrid && _chipGrid.required || null" }, classAttribute: "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element" }, exportAs: ["matChipInput", "matChipInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipInput, decorators: [{
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
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsY0FBYyxFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFDM0YsT0FBTyxFQUF5Qix5QkFBeUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7QUFtQnhDLGdEQUFnRDtBQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7OztHQUdHO0FBdUJILE1BQU0sT0FBTyxZQUFZO0lBcUV2QixZQUNZLFdBQXlDLEVBQ1IsZUFBdUMsRUFDOUMsU0FBd0I7UUFGbEQsZ0JBQVcsR0FBWCxXQUFXLENBQThCO1FBQ1Isb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBaEVwRixzQ0FBc0M7UUFDdEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQXNCekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1Qjs7OztXQUlHO1FBRUgsc0JBQWlCLEdBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztRQUV6QywwQ0FBMEM7UUFFakMsWUFBTyxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUUxRixvQ0FBb0M7UUFDM0IsZ0JBQVcsR0FBVyxFQUFF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Z0JBTTdCLE9BQU87c0JBRGYsTUFBTTt1QkFBQyxzQkFBc0I7Z0JBSXJCLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csRUFBRTtzQkFBVixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtCQUNLU1BBQ0UsIGhhc01vZGlmaWVyS2V5fSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkLCBNQVRfRk9STV9GSUVMRH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0Q2hpcHNEZWZhdWx0T3B0aW9ucywgTUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OU30gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHtNYXRDaGlwR3JpZH0gZnJvbSAnLi9jaGlwLWdyaWQnO1xuaW1wb3J0IHtNYXRDaGlwVGV4dENvbnRyb2x9IGZyb20gJy4vY2hpcC10ZXh0LWNvbnRyb2wnO1xuXG4vKiogUmVwcmVzZW50cyBhbiBpbnB1dCBldmVudCBvbiBhIGBtYXRDaGlwSW5wdXRgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwSW5wdXRFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDaGlwSW5wdXRFdmVudCNjaGlwSW5wdXQuaW5wdXRFbGVtZW50YCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMCBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICovXG4gIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICB2YWx1ZTogc3RyaW5nO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGNoaXAgaW5wdXQgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgY2hpcElucHV0OiBNYXRDaGlwSW5wdXQ7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1mb3JtLWZpZWxkPmAuXG4gKiBNYXkgYmUgcGxhY2VkIGluc2lkZSBvciBvdXRzaWRlIG9mIGEgYDxtYXQtY2hpcC1ncmlkPmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdENoaXBJbnB1dEZvcl0nLFxuICBleHBvcnRBczogJ21hdENoaXBJbnB1dCwgbWF0Q2hpcElucHV0Rm9yJyxcbiAgaG9zdDoge1xuICAgIC8vIFRPRE86IGV2ZW50dWFsbHkgd2Ugc2hvdWxkIHJlbW92ZSBgbWF0LWlucHV0LWVsZW1lbnRgIGZyb20gaGVyZSBzaW5jZSBpdCBjb21lcyBmcm9tIHRoZVxuICAgIC8vIG5vbi1NREMgdmVyc2lvbiBvZiB0aGUgaW5wdXQuIEl0J3MgY3VycmVudGx5IGJlaW5nIGtlcHQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCBiZWNhdXNlXG4gICAgLy8gdGhlIE1EQyBjaGlwcyB3ZXJlIGxhbmRlZCBpbml0aWFsbHkgd2l0aCBpdC5cbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLWlucHV0IG1hdC1tZGMtaW5wdXQtZWxlbWVudCBtZGMtdGV4dC1maWVsZF9faW5wdXQgbWF0LWlucHV0LWVsZW1lbnQnLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhrZXl1cCknOiAnX2tleXVwKCRldmVudCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gICAgJyhmb2N1cyknOiAnX2ZvY3VzKCknLFxuICAgICcoaW5wdXQpJzogJ19vbklucHV0KCknLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXIgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnX2NoaXBHcmlkICYmIF9jaGlwR3JpZC5uZ0NvbnRyb2wgPyBfY2hpcEdyaWQubmdDb250cm9sLmludmFsaWQgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAnX2NoaXBHcmlkICYmIF9jaGlwR3JpZC5yZXF1aXJlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIucmVxdWlyZWRdJzogJ19jaGlwR3JpZCAmJiBfY2hpcEdyaWQucmVxdWlyZWQgfHwgbnVsbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBJbnB1dCBpbXBsZW1lbnRzIE1hdENoaXBUZXh0Q29udHJvbCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogVXNlZCB0byBwcmV2ZW50IGZvY3VzIG1vdmluZyB0byBjaGlwcyB3aGlsZSB1c2VyIGlzIGhvbGRpbmcgYmFja3NwYWNlICovXG4gIHByaXZhdGUgX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZTogYm9vbGVhbjtcblxuICAvKiogVmFsdWUgZm9yIGFyaWFEZXNjcmliZWRieSBwcm9wZXJ0eSAqL1xuICBfYXJpYURlc2NyaWJlZGJ5Pzogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGZvY3VzZWQuICovXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NoaXBHcmlkOiBNYXRDaGlwR3JpZDtcblxuICAvKiogUmVnaXN0ZXIgaW5wdXQgZm9yIGNoaXAgbGlzdCAqL1xuICBASW5wdXQoJ21hdENoaXBJbnB1dEZvcicpXG4gIHNldCBjaGlwR3JpZCh2YWx1ZTogTWF0Q2hpcEdyaWQpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2NoaXBHcmlkID0gdmFsdWU7XG4gICAgICB0aGlzLl9jaGlwR3JpZC5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcEVuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0QWRkT25CbHVyJylcbiAgZ2V0IGFkZE9uQmx1cigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkT25CbHVyO1xuICB9XG4gIHNldCBhZGRPbkJsdXIodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2FkZE9uQmx1ciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX2FkZE9uQmx1cjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBrZXkgY29kZXMgdGhhdCB3aWxsIHRyaWdnZXIgYSBjaGlwRW5kIGV2ZW50LlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBgW0VOVEVSXWAuXG4gICAqL1xuICBASW5wdXQoJ21hdENoaXBJbnB1dFNlcGFyYXRvcktleUNvZGVzJylcbiAgc2VwYXJhdG9yS2V5Q29kZXM6IHJlYWRvbmx5IG51bWJlcltdIHwgUmVhZG9ubHlTZXQ8bnVtYmVyPiA9XG4gICAgdGhpcy5fZGVmYXVsdE9wdGlvbnMuc2VwYXJhdG9yS2V5Q29kZXM7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhIGNoaXAgaXMgdG8gYmUgYWRkZWQuICovXG4gIEBPdXRwdXQoJ21hdENoaXBJbnB1dFRva2VuRW5kJylcbiAgcmVhZG9ubHkgY2hpcEVuZDogRXZlbnRFbWl0dGVyPE1hdENoaXBJbnB1dEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcElucHV0RXZlbnQ+KCk7XG5cbiAgLyoqIFRoZSBpbnB1dCdzIHBsYWNlaG9sZGVyIHRleHQuICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICAvKiogVW5pcXVlIGlkIGZvciB0aGUgaW5wdXQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWF0LW1kYy1jaGlwLWxpc3QtaW5wdXQtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fY2hpcEdyaWQgJiYgdGhpcy5fY2hpcEdyaWQuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGVtcHR5LiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlucHV0RWxlbWVudC52YWx1ZTtcbiAgfVxuXG4gIC8qKiBUaGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgdG8gd2hpY2ggdGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQuICovXG4gIHJlYWRvbmx5IGlucHV0RWxlbWVudCE6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM6IE1hdENoaXBzRGVmYXVsdE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfRk9STV9GSUVMRCkgZm9ybUZpZWxkPzogTWF0Rm9ybUZpZWxkLFxuICApIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgaWYgKGZvcm1GaWVsZCkge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1mb3JtLWZpZWxkLWlucHV0LWNvbnRyb2wnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jaGlwRW5kLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdGhpcy5lbXB0eTtcbiAgfVxuXG4gIC8qKiBVdGlsaXR5IG1ldGhvZCB0byBtYWtlIGhvc3QgZGVmaW5pdGlvbi90ZXN0cyBtb3JlIGNsZWFyLiAqL1xuICBfa2V5ZG93bihldmVudD86IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIC8vIFRvIHByZXZlbnQgdGhlIHVzZXIgZnJvbSBhY2NpZGVudGFsbHkgZGVsZXRpbmcgY2hpcHMgd2hlbiBwcmVzc2luZyBCQUNLU1BBQ0UgY29udGludW91c2x5LFxuICAgICAgLy8gV2UgZm9jdXMgdGhlIGxhc3QgY2hpcCBvbiBiYWNrc3BhY2Ugb25seSBhZnRlciB0aGUgdXNlciBoYXMgcmVsZWFzZWQgdGhlIGJhY2tzcGFjZSBidXR0b24sXG4gICAgICAvLyBBbmQgdGhlIGlucHV0IGlzIGVtcHR5IChzZWUgYmVoYXZpb3VyIGluIF9rZXl1cClcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlKSB7XG4gICAgICAgIHRoaXMuX2NoaXBHcmlkLl9mb2N1c0xhc3RDaGlwKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VtaXRDaGlwRW5kKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGV2ZW50cyB0byB0aGUga2V5Ym9hcmQgbWFuYWdlci4gQXZhaWxhYmxlIGhlcmUgZm9yIHRlc3RzLlxuICAgKi9cbiAgX2tleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gQWxsb3cgdXNlciB0byBtb3ZlIGZvY3VzIHRvIGNoaXBzIG5leHQgdGltZSBoZSBwcmVzc2VzIGJhY2tzcGFjZVxuICAgIGlmICghdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlICYmIGV2ZW50LmtleUNvZGUgPT09IEJBQ0tTUEFDRSAmJiB0aGlzLmVtcHR5KSB7XG4gICAgICB0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgPSB0cnVlO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgYmx1ciBzaG91bGQgZW1pdCB0aGUgKGNoaXBFbmQpIGV2ZW50LiAqL1xuICBfYmx1cigpIHtcbiAgICBpZiAodGhpcy5hZGRPbkJsdXIpIHtcbiAgICAgIHRoaXMuX2VtaXRDaGlwRW5kKCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIC8vIEJsdXIgdGhlIGNoaXAgbGlzdCBpZiBpdCBpcyBub3QgZm9jdXNlZFxuICAgIGlmICghdGhpcy5fY2hpcEdyaWQuZm9jdXNlZCkge1xuICAgICAgdGhpcy5fY2hpcEdyaWQuX2JsdXIoKTtcbiAgICB9XG4gICAgdGhpcy5fY2hpcEdyaWQuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIF9mb2N1cygpIHtcbiAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IHRoaXMuZW1wdHk7XG4gICAgdGhpcy5fY2hpcEdyaWQuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSAoY2hpcEVuZCkgZXZlbnQgbmVlZHMgdG8gYmUgZW1pdHRlZC4gKi9cbiAgX2VtaXRDaGlwRW5kKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICghZXZlbnQgfHwgdGhpcy5faXNTZXBhcmF0b3JLZXkoZXZlbnQpKSB7XG4gICAgICB0aGlzLmNoaXBFbmQuZW1pdCh7XG4gICAgICAgIGlucHV0OiB0aGlzLmlucHV0RWxlbWVudCxcbiAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlLFxuICAgICAgICBjaGlwSW5wdXQ6IHRoaXMsXG4gICAgICB9KTtcblxuICAgICAgZXZlbnQ/LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgX29uSW5wdXQoKSB7XG4gICAgLy8gTGV0IGNoaXAgbGlzdCBrbm93IHdoZW5ldmVyIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgIHRoaXMuX2NoaXBHcmlkLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogQ2xlYXJzIHRoZSBpbnB1dCAqL1xuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IHRydWU7XG4gIH1cblxuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gaWRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhIGtleWNvZGUgaXMgb25lIG9mIHRoZSBjb25maWd1cmVkIHNlcGFyYXRvcnMuICovXG4gIHByaXZhdGUgX2lzU2VwYXJhdG9yS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgcmV0dXJuICFoYXNNb2RpZmllcktleShldmVudCkgJiYgbmV3IFNldCh0aGlzLnNlcGFyYXRvcktleUNvZGVzKS5oYXMoZXZlbnQua2V5Q29kZSk7XG4gIH1cbn1cbiJdfQ==