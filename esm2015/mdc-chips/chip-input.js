/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, hasModifierKey, TAB } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material-experimental/mdc-form-field';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
import { MatChipGrid } from './chip-grid';
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
            this.inputElement.classList.add('mat-mdc-form-field-control');
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
    get addOnBlur() { return this._addOnBlur; }
    set addOnBlur(value) { this._addOnBlur = coerceBooleanProperty(value); }
    /** Whether the input is disabled. */
    get disabled() { return this._disabled || (this._chipGrid && this._chipGrid.disabled); }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /** Whether the input is empty. */
    get empty() { return !this.inputElement.value; }
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
            event === null || event === void 0 ? void 0 : event.preventDefault();
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
MatChipInput.decorators = [
    { type: Directive, args: [{
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
                }
            },] }
];
MatChipInput.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_CHIPS_DEFAULT_OPTIONS,] }] },
    { type: MatFormField, decorators: [{ type: Optional }, { type: Inject, args: [MAT_FORM_FIELD,] }] }
];
MatChipInput.propDecorators = {
    chipGrid: [{ type: Input, args: ['matChipInputFor',] }],
    addOnBlur: [{ type: Input, args: ['matChipInputAddOnBlur',] }],
    separatorKeyCodes: [{ type: Input, args: ['matChipInputSeparatorKeyCodes',] }],
    chipEnd: [{ type: Output, args: ['matChipInputTokenEnd',] }],
    placeholder: [{ type: Input }],
    id: [{ type: Input }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDckUsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBeUIseUJBQXlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBc0J4QyxnREFBZ0Q7QUFDaEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7R0FHRztBQXNCSCxNQUFNLE9BQU8sWUFBWTtJQXdEdkIsWUFDWSxXQUF5QyxFQUNSLGVBQXVDLEVBQzlDLFNBQXdCO1FBRmxELGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQUNSLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQXREcEYsc0NBQXNDO1FBQ3RDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFrQnpCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUI7Ozs7V0FJRztRQUVILHNCQUFpQixHQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFFM0MsMENBQTBDO1FBRWpDLFlBQU8sR0FBb0MsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFFMUYsb0NBQW9DO1FBQzNCLGdCQUFX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QXlDO2lCQUM3RDthQUNGOzs7WUE1REMsVUFBVTs0Q0F1SFAsTUFBTSxTQUFDLHlCQUF5QjtZQTlHN0IsWUFBWSx1QkErR2YsUUFBUSxZQUFJLE1BQU0sU0FBQyxjQUFjOzs7dUJBbERuQyxLQUFLLFNBQUMsaUJBQWlCO3dCQVd2QixLQUFLLFNBQUMsdUJBQXVCO2dDQVU3QixLQUFLLFNBQUMsK0JBQStCO3NCQUtyQyxNQUFNLFNBQUMsc0JBQXNCOzBCQUk3QixLQUFLO2lCQUdMLEtBQUs7dUJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtCQUNLU1BBQ0UsIGhhc01vZGlmaWVyS2V5LCBUQUJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZCwgTUFUX0ZPUk1fRklFTER9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdENoaXBzRGVmYXVsdE9wdGlvbnMsIE1BVF9DSElQU19ERUZBVUxUX09QVElPTlN9IGZyb20gJy4vY2hpcC1kZWZhdWx0LW9wdGlvbnMnO1xuaW1wb3J0IHtNYXRDaGlwR3JpZH0gZnJvbSAnLi9jaGlwLWdyaWQnO1xuaW1wb3J0IHtNYXRDaGlwVGV4dENvbnRyb2x9IGZyb20gJy4vY2hpcC10ZXh0LWNvbnRyb2wnO1xuXG4vKiogUmVwcmVzZW50cyBhbiBpbnB1dCBldmVudCBvbiBhIGBtYXRDaGlwSW5wdXRgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwSW5wdXRFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRDaGlwSW5wdXRFdmVudCNjaGlwSW5wdXQuaW5wdXRFbGVtZW50YCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMCBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICovXG4gIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xuICB2YWx1ZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGNoaXAgaW5wdXQgdGhhdCBlbWl0dGVkIHRoZSBldmVudC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjAgVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIG1hZGUgcmVxdWlyZWQuXG4gICAqL1xuICBjaGlwSW5wdXQ/OiBNYXRDaGlwSW5wdXQ7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1mb3JtLWZpZWxkPmAuXG4gKiBNYXkgYmUgcGxhY2VkIGluc2lkZSBvciBvdXRzaWRlIG9mIGEgYDxtYXQtY2hpcC1ncmlkPmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdENoaXBJbnB1dEZvcl0nLFxuICBleHBvcnRBczogJ21hdENoaXBJbnB1dCwgbWF0Q2hpcElucHV0Rm9yJyxcbiAgaG9zdDoge1xuICAgIC8vIFRPRE86IGV2ZW50dWFsbHkgd2Ugc2hvdWxkIHJlbW92ZSBgbWF0LWlucHV0LWVsZW1lbnRgIGZyb20gaGVyZSBzaW5jZSBpdCBjb21lcyBmcm9tIHRoZVxuICAgIC8vIG5vbi1NREMgdmVyc2lvbiBvZiB0aGUgaW5wdXQuIEl0J3MgY3VycmVudGx5IGJlaW5nIGtlcHQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCBiZWNhdXNlXG4gICAgLy8gdGhlIE1EQyBjaGlwcyB3ZXJlIGxhbmRlZCBpbml0aWFsbHkgd2l0aCBpdC5cbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLWlucHV0IG1hdC1tZGMtaW5wdXQtZWxlbWVudCBtZGMtdGV4dC1maWVsZF9faW5wdXQgbWF0LWlucHV0LWVsZW1lbnQnLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhrZXl1cCknOiAnX2tleXVwKCRldmVudCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gICAgJyhmb2N1cyknOiAnX2ZvY3VzKCknLFxuICAgICcoaW5wdXQpJzogJ19vbklucHV0KCknLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXIgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnX2NoaXBHcmlkICYmIF9jaGlwR3JpZC5uZ0NvbnRyb2wgPyBfY2hpcEdyaWQubmdDb250cm9sLmludmFsaWQgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAnX2NoaXBHcmlkICYmIF9jaGlwR3JpZC5yZXF1aXJlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIucmVxdWlyZWRdJzogJ19jaGlwR3JpZCAmJiBfY2hpcEdyaWQucmVxdWlyZWQgfHwgbnVsbCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcElucHV0IGltcGxlbWVudHMgTWF0Q2hpcFRleHRDb250cm9sLCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBVc2VkIHRvIHByZXZlbnQgZm9jdXMgbW92aW5nIHRvIGNoaXBzIHdoaWxlIHVzZXIgaXMgaG9sZGluZyBiYWNrc3BhY2UgKi9cbiAgcHJpdmF0ZSBfZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGZvY3VzZWQuICovXG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NoaXBHcmlkOiBNYXRDaGlwR3JpZDtcblxuICAvKiogUmVnaXN0ZXIgaW5wdXQgZm9yIGNoaXAgbGlzdCAqL1xuICBASW5wdXQoJ21hdENoaXBJbnB1dEZvcicpXG4gIHNldCBjaGlwR3JpZCh2YWx1ZTogTWF0Q2hpcEdyaWQpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2NoaXBHcmlkID0gdmFsdWU7XG4gICAgICB0aGlzLl9jaGlwR3JpZC5yZWdpc3RlcklucHV0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcEVuZCBldmVudCB3aWxsIGJlIGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZC5cbiAgICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0QWRkT25CbHVyJylcbiAgZ2V0IGFkZE9uQmx1cigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2FkZE9uQmx1cjsgfVxuICBzZXQgYWRkT25CbHVyKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2FkZE9uQmx1ciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgX2FkZE9uQmx1cjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBrZXkgY29kZXMgdGhhdCB3aWxsIHRyaWdnZXIgYSBjaGlwRW5kIGV2ZW50LlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBgW0VOVEVSXWAuXG4gICAqL1xuICBASW5wdXQoJ21hdENoaXBJbnB1dFNlcGFyYXRvcktleUNvZGVzJylcbiAgc2VwYXJhdG9yS2V5Q29kZXM6IHJlYWRvbmx5IG51bWJlcltdIHwgUmVhZG9ubHlTZXQ8bnVtYmVyPiA9XG4gICAgICB0aGlzLl9kZWZhdWx0T3B0aW9ucy5zZXBhcmF0b3JLZXlDb2RlcztcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSBhZGRlZC4gKi9cbiAgQE91dHB1dCgnbWF0Q2hpcElucHV0VG9rZW5FbmQnKVxuICByZWFkb25seSBjaGlwRW5kOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcElucHV0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwSW5wdXRFdmVudD4oKTtcblxuICAvKiogVGhlIGlucHV0J3MgcGxhY2Vob2xkZXIgdGV4dC4gKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSBpbnB1dC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWNoaXAtbGlzdC1pbnB1dC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fY2hpcEdyaWQgJiYgdGhpcy5fY2hpcEdyaWQuZGlzYWJsZWQpOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZW1wdHkuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmlucHV0RWxlbWVudC52YWx1ZTsgfVxuXG4gIC8qKiBUaGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgdG8gd2hpY2ggdGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQuICovXG4gIHJlYWRvbmx5IGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sXG4gICAgQEluamVjdChNQVRfQ0hJUFNfREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIF9kZWZhdWx0T3B0aW9uczogTWF0Q2hpcHNEZWZhdWx0T3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9GT1JNX0ZJRUxEKSBmb3JtRmllbGQ/OiBNYXRGb3JtRmllbGQpIHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgIGlmIChmb3JtRmllbGQpIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1mb3JtLWZpZWxkLWNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5fY2hpcEdyaWQuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2hpcEVuZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IHRoaXMuZW1wdHk7XG4gIH1cblxuICAvKiogVXRpbGl0eSBtZXRob2QgdG8gbWFrZSBob3N0IGRlZmluaXRpb24vdGVzdHMgbW9yZSBjbGVhci4gKi9cbiAgX2tleWRvd24oZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICAvLyBBbGxvdyB0aGUgdXNlcidzIGZvY3VzIHRvIGVzY2FwZSB3aGVuIHRoZXkncmUgdGFiYmluZyBmb3J3YXJkLiBOb3RlIHRoYXQgd2UgZG9uJ3RcbiAgICAgIC8vIHdhbnQgdG8gZG8gdGhpcyB3aGVuIGdvaW5nIGJhY2t3YXJkcywgYmVjYXVzZSBmb2N1cyBzaG91bGQgZ28gYmFjayB0byB0aGUgZmlyc3QgY2hpcC5cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBUQUIgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50LCAnc2hpZnRLZXknKSkge1xuICAgICAgICB0aGlzLl9jaGlwR3JpZC5fYWxsb3dGb2N1c0VzY2FwZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUbyBwcmV2ZW50IHRoZSB1c2VyIGZyb20gYWNjaWRlbnRhbGx5IGRlbGV0aW5nIGNoaXBzIHdoZW4gcHJlc3NpbmcgQkFDS1NQQUNFIGNvbnRpbnVvdXNseSxcbiAgICAgIC8vIFdlIGZvY3VzIHRoZSBsYXN0IGNoaXAgb24gYmFja3NwYWNlIG9ubHkgYWZ0ZXIgdGhlIHVzZXIgaGFzIHJlbGVhc2VkIHRoZSBiYWNrc3BhY2UgYnV0dG9uLFxuICAgICAgLy8gQW5kIHRoZSBpbnB1dCBpcyBlbXB0eSAoc2VlIGJlaGF2aW91ciBpbiBfa2V5dXApXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gQkFDS1NQQUNFICYmIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSkge1xuICAgICAgICBpZiAodGhpcy5fY2hpcEdyaWQuX2NoaXBzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX2NoaXBHcmlkLl9rZXlNYW5hZ2VyLnNldExhc3RDZWxsQWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdENoaXBFbmQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgZXZlbnRzIHRvIHRoZSBrZXlib2FyZCBtYW5hZ2VyLiBBdmFpbGFibGUgaGVyZSBmb3IgdGVzdHMuXG4gICAqL1xuICBfa2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBBbGxvdyB1c2VyIHRvIG1vdmUgZm9jdXMgdG8gY2hpcHMgbmV4dCB0aW1lIGhlIHByZXNzZXMgYmFja3NwYWNlXG4gICAgaWYgKCF0aGlzLl9mb2N1c0xhc3RDaGlwT25CYWNrc3BhY2UgJiYgZXZlbnQua2V5Q29kZSA9PT0gQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcbiAgICAgIHRoaXMuX2ZvY3VzTGFzdENoaXBPbkJhY2tzcGFjZSA9IHRydWU7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBibHVyIHNob3VsZCBlbWl0IHRoZSAoY2hpcEVuZCkgZXZlbnQuICovXG4gIF9ibHVyKCkge1xuICAgIGlmICh0aGlzLmFkZE9uQmx1cikge1xuICAgICAgdGhpcy5fZW1pdENoaXBFbmQoKTtcbiAgICB9XG4gICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgLy8gQmx1ciB0aGUgY2hpcCBsaXN0IGlmIGl0IGlzIG5vdCBmb2N1c2VkXG4gICAgaWYgKCF0aGlzLl9jaGlwR3JpZC5mb2N1c2VkKSB7XG4gICAgICB0aGlzLl9jaGlwR3JpZC5fYmx1cigpO1xuICAgIH1cbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgX2ZvY3VzKCkge1xuICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdGhpcy5lbXB0eTtcbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIChjaGlwRW5kKSBldmVudCBuZWVkcyB0byBiZSBlbWl0dGVkLiAqL1xuICBfZW1pdENoaXBFbmQoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlucHV0RWxlbWVudC52YWx1ZSAmJiAhIWV2ZW50KSB7XG4gICAgICB0aGlzLl9jaGlwR3JpZC5fa2V5ZG93bihldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKCFldmVudCB8fCB0aGlzLl9pc1NlcGFyYXRvcktleShldmVudCkpIHtcbiAgICAgIHRoaXMuY2hpcEVuZC5lbWl0KHtcbiAgICAgICAgaW5wdXQ6IHRoaXMuaW5wdXRFbGVtZW50LFxuICAgICAgICB2YWx1ZTogdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUsXG4gICAgICAgIGNoaXBJbnB1dDogdGhpcyxcbiAgICAgIH0pO1xuXG4gICAgICBldmVudD8ucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBfb25JbnB1dCgpIHtcbiAgICAvLyBMZXQgY2hpcCBsaXN0IGtub3cgd2hlbmV2ZXIgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgdGhpcy5fY2hpcEdyaWQuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBDbGVhcnMgdGhlIGlucHV0ICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgdGhpcy5fZm9jdXNMYXN0Q2hpcE9uQmFja3NwYWNlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhIGtleWNvZGUgaXMgb25lIG9mIHRoZSBjb25maWd1cmVkIHNlcGFyYXRvcnMuICovXG4gIHByaXZhdGUgX2lzU2VwYXJhdG9yS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgcmV0dXJuICFoYXNNb2RpZmllcktleShldmVudCkgJiYgbmV3IFNldCh0aGlzLnNlcGFyYXRvcktleUNvZGVzKS5oYXMoZXZlbnQua2V5Q29kZSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYWRkT25CbHVyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19