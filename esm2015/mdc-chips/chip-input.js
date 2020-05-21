/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { hasModifierKey, TAB } from '@angular/cdk/keycodes';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
import { MatChipGrid } from './chip-grid';
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of a `<mat-chip-grid>`.
 */
let MatChipInput = /** @class */ (() => {
    let MatChipInput = class MatChipInput {
        constructor(_elementRef, _defaultOptions) {
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
            this._inputElement = this._elementRef.nativeElement;
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
        get empty() { return !this._inputElement.value; }
        ngOnChanges() {
            this._chipGrid.stateChanges.next();
        }
        /** Utility method to make host definition/tests more clear. */
        _keydown(event) {
            // Allow the user's focus to escape when they're tabbing forward. Note that we don't
            // want to do this when going backwards, because focus should go back to the first chip.
            if (event && event.keyCode === TAB && !hasModifierKey(event, 'shiftKey')) {
                this._chipGrid._allowFocusEscape();
            }
            this._emitChipEnd(event);
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
            this._chipGrid.stateChanges.next();
        }
        /** Checks to see if the (chipEnd) event needs to be emitted. */
        _emitChipEnd(event) {
            if (!this._inputElement.value && !!event) {
                this._chipGrid._keydown(event);
            }
            if (!event || this._isSeparatorKey(event)) {
                this.chipEnd.emit({ input: this._inputElement, value: this._inputElement.value });
                if (event) {
                    event.preventDefault();
                }
            }
        }
        _onInput() {
            // Let chip list know whenever the value changes.
            this._chipGrid.stateChanges.next();
        }
        /** Focuses the input. */
        focus() {
            this._inputElement.focus();
        }
        /** Checks whether a keycode is one of the configured separators. */
        _isSeparatorKey(event) {
            if (hasModifierKey(event)) {
                return false;
            }
            const separators = this.separatorKeyCodes;
            const keyCode = event.keyCode;
            return Array.isArray(separators) ? separators.indexOf(keyCode) > -1 : separators.has(keyCode);
        }
    };
    __decorate([
        Input('matChipInputFor'),
        __metadata("design:type", MatChipGrid),
        __metadata("design:paramtypes", [MatChipGrid])
    ], MatChipInput.prototype, "chipGrid", null);
    __decorate([
        Input('matChipInputAddOnBlur'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatChipInput.prototype, "addOnBlur", null);
    __decorate([
        Input('matChipInputSeparatorKeyCodes'),
        __metadata("design:type", Object)
    ], MatChipInput.prototype, "separatorKeyCodes", void 0);
    __decorate([
        Output('matChipInputTokenEnd'),
        __metadata("design:type", EventEmitter)
    ], MatChipInput.prototype, "chipEnd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatChipInput.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatChipInput.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MatChipInput.prototype, "disabled", null);
    MatChipInput = __decorate([
        Directive({
            selector: 'input[matChipInputFor]',
            exportAs: 'matChipInput, matChipInputFor',
            host: {
                'class': 'mat-mdc-chip-input mat-input-element',
                '(keydown)': '_keydown($event)',
                '(blur)': '_blur()',
                '(focus)': '_focus()',
                '(input)': '_onInput()',
                '[id]': 'id',
                '[attr.disabled]': 'disabled || null',
                '[attr.placeholder]': 'placeholder || null',
                '[attr.aria-invalid]': '_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null',
                '[attr.aria-required]': '_chipGrid && _chipGrid.required || null',
            }
        }),
        __param(1, Inject(MAT_CHIPS_DEFAULT_OPTIONS)),
        __metadata("design:paramtypes", [ElementRef, Object])
    ], MatChipInput);
    return MatChipInput;
})();
export { MatChipInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUMsY0FBYyxFQUFFLEdBQUcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBYXhDLGdEQUFnRDtBQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7OztHQUdHO0FBaUJIO0lBQUEsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtRQW9EdkIsWUFDWSxXQUF5QyxFQUNSLGVBQXVDO1lBRHhFLGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtZQUNSLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtZQXJEcEYsc0NBQXNDO1lBQ3RDLFlBQU8sR0FBWSxLQUFLLENBQUM7WUFrQnpCLGVBQVUsR0FBWSxLQUFLLENBQUM7WUFFNUI7Ozs7ZUFJRztZQUVILHNCQUFpQixHQUEyQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1lBRW5GLDBDQUEwQztZQUUxQyxZQUFPLEdBQW9DLElBQUksWUFBWSxFQUFxQixDQUFDO1lBRWpGLG9DQUFvQztZQUMzQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztZQUVsQywrQkFBK0I7WUFDdEIsT0FBRSxHQUFXLDJCQUEyQixZQUFZLEVBQUUsRUFBRSxD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QXdCO1lBQ2xDLFFBQVEsRUFBRSwrQkFBK0I7WUFDekMsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxzQ0FBc0M7Z0JBQy9DLFdBQVcsRUFBRSxrQkFBa0I7Z0JBQy9CLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixTQUFTLEVBQUUsVUFBVTtnQkFDckIsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGlCQUFpQixFQUFFLGtCQUFrQjtnQkFDckMsb0JBQW9CLEVBQUUscUJBQXFCO2dCQUMzQyxxQkFBcUIsRUFBRSx1RUFBdUU7Z0JBQzlGLHNCQUFzQixFQUFFLHlDQUF5QzthQUNsRTtTQUNGLENBQUM7UUF1REcsV0FBQSxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQTt5Q0FEWCxVQUFVO09BckR4QixZQUFZLENBZ0l4QjtJQUFELG1CQUFDO0tBQUE7U0FoSVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtoYXNNb2RpZmllcktleSwgVEFCfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtNQVRfQ0hJUFNfREVGQVVMVF9PUFRJT05TLCBNYXRDaGlwc0RlZmF1bHRPcHRpb25zfSBmcm9tICcuL2NoaXAtZGVmYXVsdC1vcHRpb25zJztcbmltcG9ydCB7TWF0Q2hpcEdyaWR9IGZyb20gJy4vY2hpcC1ncmlkJztcbmltcG9ydCB7TWF0Q2hpcFRleHRDb250cm9sfSBmcm9tICcuL2NoaXAtdGV4dC1jb250cm9sJztcblxuXG4vKiogUmVwcmVzZW50cyBhbiBpbnB1dCBldmVudCBvbiBhIGBtYXRDaGlwSW5wdXRgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwSW5wdXRFdmVudCB7XG4gIC8qKiBUaGUgbmF0aXZlIGA8aW5wdXQ+YCBlbGVtZW50IHRoYXQgdGhlIGV2ZW50IGlzIGJlaW5nIGZpcmVkIGZvci4gKi9cbiAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuICovXG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIEluY3JlYXNpbmcgaW50ZWdlciBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaWRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBjaGlwLXNwZWNpZmljIGJlaGF2aW9ycyB0byBhbiBpbnB1dCBlbGVtZW50IGluc2lkZSBgPG1hdC1mb3JtLWZpZWxkPmAuXG4gKiBNYXkgYmUgcGxhY2VkIGluc2lkZSBvciBvdXRzaWRlIG9mIGEgYDxtYXQtY2hpcC1ncmlkPmAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21hdENoaXBJbnB1dEZvcl0nLFxuICBleHBvcnRBczogJ21hdENoaXBJbnB1dCwgbWF0Q2hpcElucHV0Rm9yJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtaW5wdXQgbWF0LWlucHV0LWVsZW1lbnQnLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhibHVyKSc6ICdfYmx1cigpJyxcbiAgICAnKGZvY3VzKSc6ICdfZm9jdXMoKScsXG4gICAgJyhpbnB1dCknOiAnX29uSW5wdXQoKScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLnBsYWNlaG9sZGVyXSc6ICdwbGFjZWhvbGRlciB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdfY2hpcEdyaWQgJiYgX2NoaXBHcmlkLm5nQ29udHJvbCA/IF9jaGlwR3JpZC5uZ0NvbnRyb2wuaW52YWxpZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdfY2hpcEdyaWQgJiYgX2NoaXBHcmlkLnJlcXVpcmVkIHx8IG51bGwnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBJbnB1dCBpbXBsZW1lbnRzIE1hdENoaXBUZXh0Q29udHJvbCwgT25DaGFuZ2VzIHtcbiAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2wgaXMgZm9jdXNlZC4gKi9cbiAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBfY2hpcEdyaWQ6IE1hdENoaXBHcmlkO1xuXG4gIC8qKiBSZWdpc3RlciBpbnB1dCBmb3IgY2hpcCBsaXN0ICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0Rm9yJylcbiAgc2V0IGNoaXBHcmlkKHZhbHVlOiBNYXRDaGlwR3JpZCkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fY2hpcEdyaWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2NoaXBHcmlkLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBjaGlwRW5kIGV2ZW50IHdpbGwgYmUgZW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBpcyBibHVycmVkLlxuICAgKi9cbiAgQElucHV0KCdtYXRDaGlwSW5wdXRBZGRPbkJsdXInKVxuICBnZXQgYWRkT25CbHVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWRkT25CbHVyOyB9XG4gIHNldCBhZGRPbkJsdXIodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fYWRkT25CbHVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBfYWRkT25CbHVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIGtleSBjb2RlcyB0aGF0IHdpbGwgdHJpZ2dlciBhIGNoaXBFbmQgZXZlbnQuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGBbRU5URVJdYC5cbiAgICovXG4gIEBJbnB1dCgnbWF0Q2hpcElucHV0U2VwYXJhdG9yS2V5Q29kZXMnKVxuICBzZXBhcmF0b3JLZXlDb2RlczogbnVtYmVyW10gfCBTZXQ8bnVtYmVyPiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLnNlcGFyYXRvcktleUNvZGVzO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIGFkZGVkLiAqL1xuICBAT3V0cHV0KCdtYXRDaGlwSW5wdXRUb2tlbkVuZCcpXG4gIGNoaXBFbmQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwSW5wdXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBJbnB1dEV2ZW50PigpO1xuXG4gIC8qKiBUaGUgaW5wdXQncyBwbGFjZWhvbGRlciB0ZXh0LiAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIGlucHV0LiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1tZGMtY2hpcC1saXN0LWlucHV0LSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLl9jaGlwR3JpZCAmJiB0aGlzLl9jaGlwR3JpZC5kaXNhYmxlZCk7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBlbXB0eS4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuX2lucHV0RWxlbWVudC52YWx1ZTsgfVxuXG4gIC8qKiBUaGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgdG8gd2hpY2ggdGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQuICovXG4gIHByb3RlY3RlZCBfaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PixcbiAgICBASW5qZWN0KE1BVF9DSElQU19ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBNYXRDaGlwc0RlZmF1bHRPcHRpb25zKSB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIFV0aWxpdHkgbWV0aG9kIHRvIG1ha2UgaG9zdCBkZWZpbml0aW9uL3Rlc3RzIG1vcmUgY2xlYXIuICovXG4gIF9rZXlkb3duKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIEFsbG93IHRoZSB1c2VyJ3MgZm9jdXMgdG8gZXNjYXBlIHdoZW4gdGhleSdyZSB0YWJiaW5nIGZvcndhcmQuIE5vdGUgdGhhdCB3ZSBkb24ndFxuICAgIC8vIHdhbnQgdG8gZG8gdGhpcyB3aGVuIGdvaW5nIGJhY2t3YXJkcywgYmVjYXVzZSBmb2N1cyBzaG91bGQgZ28gYmFjayB0byB0aGUgZmlyc3QgY2hpcC5cbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5Q29kZSA9PT0gVEFCICYmICFoYXNNb2RpZmllcktleShldmVudCwgJ3NoaWZ0S2V5JykpIHtcbiAgICAgIHRoaXMuX2NoaXBHcmlkLl9hbGxvd0ZvY3VzRXNjYXBlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdENoaXBFbmQoZXZlbnQpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIGJsdXIgc2hvdWxkIGVtaXQgdGhlIChjaGlwRW5kKSBldmVudC4gKi9cbiAgX2JsdXIoKSB7XG4gICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XG4gICAgICB0aGlzLl9lbWl0Q2hpcEVuZCgpO1xuICAgIH1cbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAvLyBCbHVyIHRoZSBjaGlwIGxpc3QgaWYgaXQgaXMgbm90IGZvY3VzZWRcbiAgICBpZiAoIXRoaXMuX2NoaXBHcmlkLmZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2NoaXBHcmlkLl9ibHVyKCk7XG4gICAgfVxuICAgIHRoaXMuX2NoaXBHcmlkLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBfZm9jdXMoKSB7XG4gICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGlwR3JpZC5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB0byBzZWUgaWYgdGhlIChjaGlwRW5kKSBldmVudCBuZWVkcyB0byBiZSBlbWl0dGVkLiAqL1xuICBfZW1pdENoaXBFbmQoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9pbnB1dEVsZW1lbnQudmFsdWUgJiYgISFldmVudCkge1xuICAgICAgdGhpcy5fY2hpcEdyaWQuX2tleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgICBpZiAoIWV2ZW50IHx8IHRoaXMuX2lzU2VwYXJhdG9yS2V5KGV2ZW50KSkge1xuICAgICAgdGhpcy5jaGlwRW5kLmVtaXQoeyBpbnB1dDogdGhpcy5faW5wdXRFbGVtZW50LCB2YWx1ZTogdGhpcy5faW5wdXRFbGVtZW50LnZhbHVlIH0pO1xuXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25JbnB1dCgpIHtcbiAgICAvLyBMZXQgY2hpcCBsaXN0IGtub3cgd2hlbmV2ZXIgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgdGhpcy5fY2hpcEdyaWQuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBpbnB1dC4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5faW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgYSBrZXljb2RlIGlzIG9uZSBvZiB0aGUgY29uZmlndXJlZCBzZXBhcmF0b3JzLiAqL1xuICBwcml2YXRlIF9pc1NlcGFyYXRvcktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXBhcmF0b3JzID0gdGhpcy5zZXBhcmF0b3JLZXlDb2RlcztcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShzZXBhcmF0b3JzKSA/IHNlcGFyYXRvcnMuaW5kZXhPZihrZXlDb2RlKSA+IC0xIDogc2VwYXJhdG9ycy5oYXMoa2V5Q29kZSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYWRkT25CbHVyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19