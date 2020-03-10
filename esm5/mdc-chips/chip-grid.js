/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends, __read, __spread } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, TAB, HOME, END } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Self, ViewEncapsulation } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState, } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChipRow } from './chip-row';
import { MatChipSet } from './chip-set';
import { GridFocusKeyManager } from './grid-focus-key-manager';
/** Change event object that is emitted when the chip grid value has changed. */
var MatChipGridChange = /** @class */ (function () {
    function MatChipGridChange(
    /** Chip grid that emitted the event. */
    source, 
    /** Value of the chip grid when the event was emitted. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatChipGridChange;
}());
export { MatChipGridChange };
/**
 * Boilerplate for applying mixins to MatChipGrid.
 * @docs-private
 */
var MatChipGridBase = /** @class */ (function (_super) {
    __extends(MatChipGridBase, _super);
    function MatChipGridBase(_elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        var _this = _super.call(this, _elementRef, _changeDetectorRef, _dir) || this;
        _this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        _this._parentForm = _parentForm;
        _this._parentFormGroup = _parentFormGroup;
        _this.ngControl = ngControl;
        return _this;
    }
    return MatChipGridBase;
}(MatChipSet));
var _MatChipGridMixinBase = mixinErrorState(MatChipGridBase);
/**
 * An extension of the MatChipSet component used with MatChipRow chips and
 * the matChipInputFor directive.
 */
var MatChipGrid = /** @class */ (function (_super) {
    __extends(MatChipGrid, _super);
    function MatChipGrid(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, 
    /** @docs-private */
    ngControl) {
        var _this = _super.call(this, _elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        _this.controlType = 'mat-chip-grid';
        /**
         * Function when touched. Set as part of ControlValueAccessor implementation.
         * @docs-private
         */
        _this._onTouched = function () { };
        /**
         * Function when changed. Set as part of ControlValueAccessor implementation.
         * @docs-private
         */
        _this._onChange = function () { };
        _this._required = false;
        /** Emits when the chip grid value has been changed by the user. */
        _this.change = new EventEmitter();
        /**
         * Emits whenever the raw value of the chip-grid changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        _this.valueChange = new EventEmitter();
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        return _this;
    }
    Object.defineProperty(MatChipGrid.prototype, "disabled", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this.ngControl ? !!this.ngControl.disabled : this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            this._syncChipsState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "id", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this._chipInput.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "empty", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this._chipInput.empty && this._chips.length === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "role", {
        /** The ARIA role applied to the chip grid. */
        get: function () { return this.empty ? null : 'grid'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "placeholder", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._chipInput ? this._chipInput.placeholder : this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "focused", {
        /** Whether any chips or the matChipInput inside of this chip-grid has focus. */
        get: function () { return this._chipInput.focused || this._hasFocusedChip(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "required", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this._required; },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return !this.empty || this.focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "value", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: function () { return this._value; },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "chipBlurChanges", {
        /** Combined stream of all of the child chips' blur events. */
        get: function () {
            return merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip._onBlur; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "chipFocusChanges", {
        /** Combined stream of all of the child chips' focus events. */
        get: function () {
            return merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip._onFocus; })));
        },
        enumerable: true,
        configurable: true
    });
    MatChipGrid.prototype.ngAfterContentInit = function () {
        var _this = this;
        _super.prototype.ngAfterContentInit.call(this);
        this._initKeyManager();
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(function () {
            // Check to see if we have a destroyed chip and need to refocus
            _this._updateFocusForDestroyedChips();
            _this.stateChanges.next();
        });
    };
    MatChipGrid.prototype.ngAfterViewInit = function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (!this._chipInput) {
            throw Error('mat-chip-grid must be used in combination with matChipInputFor.');
        }
    };
    MatChipGrid.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    };
    MatChipGrid.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.stateChanges.complete();
    };
    /** Associates an HTML input element with this chip grid. */
    MatChipGrid.prototype.registerInput = function (inputElement) {
        this._chipInput = inputElement;
        this._setMdcClass('mdc-chip-set--input', true);
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    MatChipGrid.prototype.onContainerClick = function (event) {
        if (!this._originatesFromChip(event) && !this.disabled) {
            this.focus();
        }
    };
    /**
     * Focuses the first chip in this chip grid, or the associated input when there
     * are no eligible chips.
     */
    MatChipGrid.prototype.focus = function () {
        if (this.disabled || this._chipInput.focused) {
            return;
        }
        if (this._chips.length > 0) {
            this._keyManager.setFirstCellActive();
        }
        else {
            this._focusInput();
        }
        this.stateChanges.next();
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    MatChipGrid.prototype.setDescribedByIds = function (ids) { this._ariaDescribedby = ids.join(' '); };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    MatChipGrid.prototype.writeValue = function (value) {
        // The user is responsible for creating the child chips, so we just store the value.
        this._value = value;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    MatChipGrid.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    MatChipGrid.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    MatChipGrid.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    };
    /** When blurred, mark the field as touched when focus moved outside the chip grid. */
    MatChipGrid.prototype._blur = function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        // Check whether the focus moved to chip input.
        // If the focus is not moved to chip input, mark the field as touched. If the focus moved
        // to chip input, do nothing.
        // Timeout is needed to wait for the focus() event trigger on chip input.
        setTimeout(function () {
            if (!_this.focused) {
                _this._keyManager.setActiveCell({ row: -1, column: -1 });
                _this._propagateChanges();
                _this._markAsTouched();
            }
        });
    };
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    MatChipGrid.prototype._allowFocusEscape = function () {
        var _this = this;
        if (this._chipInput.focused) {
            return;
        }
        var previousTabIndex = this.tabIndex;
        if (this.tabIndex !== -1) {
            this.tabIndex = -1;
            setTimeout(function () {
                _this.tabIndex = previousTabIndex;
                _this._changeDetectorRef.markForCheck();
            });
        }
    };
    /** Handles custom keyboard events. */
    MatChipGrid.prototype._keydown = function (event) {
        var target = event.target;
        var keyCode = event.keyCode;
        var manager = this._keyManager;
        // If they are on an empty input and hit backspace, focus the last chip
        if (keyCode === BACKSPACE && this._isEmptyInput(target)) {
            if (this._chips.length) {
                manager.setLastCellActive();
            }
            event.preventDefault();
        }
        else if (keyCode === TAB && target.id !== this._chipInput.id) {
            this._allowFocusEscape();
        }
        else if (this._originatesFromChip(event)) {
            if (keyCode === HOME) {
                manager.setFirstCellActive();
                event.preventDefault();
            }
            else if (keyCode === END) {
                manager.setLastCellActive();
                event.preventDefault();
            }
            else {
                manager.onKeydown(event);
            }
        }
        this.stateChanges.next();
    };
    /** Unsubscribes from all chip events. */
    MatChipGrid.prototype._dropSubscriptions = function () {
        _super.prototype._dropSubscriptions.call(this);
        if (this._chipBlurSubscription) {
            this._chipBlurSubscription.unsubscribe();
            this._chipBlurSubscription = null;
        }
        if (this._chipFocusSubscription) {
            this._chipFocusSubscription.unsubscribe();
            this._chipFocusSubscription = null;
        }
    };
    /** Subscribes to events on the child chips. */
    MatChipGrid.prototype._subscribeToChipEvents = function () {
        _super.prototype._subscribeToChipEvents.call(this);
        this._listenToChipsFocus();
        this._listenToChipsBlur();
    };
    /** Initializes the key manager to manage focus. */
    MatChipGrid.prototype._initKeyManager = function () {
        var _this = this;
        this._keyManager = new GridFocusKeyManager(this._chips)
            .withDirectionality(this._dir ? this._dir.value : 'ltr');
        if (this._dir) {
            this._dir.change
                .pipe(takeUntil(this._destroyed))
                .subscribe(function (dir) { return _this._keyManager.withDirectionality(dir); });
        }
    };
    /** Subscribes to chip focus events. */
    MatChipGrid.prototype._listenToChipsFocus = function () {
        var _this = this;
        this._chipFocusSubscription = this.chipFocusChanges.subscribe(function (event) {
            var chipIndex = _this._chips.toArray().indexOf(event.chip);
            if (_this._isValidIndex(chipIndex)) {
                _this._keyManager.updateActiveCell({ row: chipIndex, column: 0 });
            }
        });
    };
    /** Subscribes to chip blur events. */
    MatChipGrid.prototype._listenToChipsBlur = function () {
        var _this = this;
        this._chipBlurSubscription = this.chipBlurChanges.subscribe(function () {
            _this._blur();
            _this.stateChanges.next();
        });
    };
    /** Emits change event to set the model value. */
    MatChipGrid.prototype._propagateChanges = function (fallbackValue) {
        var valueToEmit = this._chips.length ? this._chips.toArray().map(function (chip) { return chip.value; }) : fallbackValue;
        this._value = valueToEmit;
        this.change.emit(new MatChipGridChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    };
    /** Mark the field as touched */
    MatChipGrid.prototype._markAsTouched = function () {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    /**
     * If the amount of chips changed, we need to focus the next closest chip.
     */
    MatChipGrid.prototype._updateFocusForDestroyedChips = function () {
        // Move focus to the closest chip. If no other chips remain, focus the chip-grid itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this._chips.length) {
                var newChipIndex = Math.min(this._lastDestroyedChipIndex, this._chips.length - 1);
                this._keyManager.setActiveCell({
                    row: newChipIndex,
                    column: this._keyManager.activeColumnIndex
                });
            }
            else {
                this.focus();
            }
        }
        this._lastDestroyedChipIndex = null;
    };
    /** Focus input element. */
    MatChipGrid.prototype._focusInput = function () {
        this._chipInput.focus();
    };
    /** Returns true if element is an input with no value. */
    MatChipGrid.prototype._isEmptyInput = function (element) {
        if (element && element.id === this._chipInput.id) {
            return this._chipInput.empty;
        }
        return false;
    };
    MatChipGrid.decorators = [
        { type: Component, args: [{
                    selector: 'mat-chip-grid',
                    template: '<ng-content></ng-content>',
                    inputs: ['tabIndex'],
                    host: {
                        'class': 'mat-mdc-chip-set mat-mdc-chip-grid mdc-chip-set',
                        '[attr.role]': 'role',
                        '[tabIndex]': '_chips && _chips.length === 0 ? -1 : tabIndex',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[class.mat-mdc-chip-list-disabled]': 'disabled',
                        '[class.mat-mdc-chip-list-invalid]': 'errorState',
                        '[class.mat-mdc-chip-list-required]': 'required',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    },
                    providers: [{ provide: MatFormFieldControl, useExisting: MatChipGrid }],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    /** @nocollapse */
    MatChipGrid.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ErrorStateMatcher },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    MatChipGrid.propDecorators = {
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }, { type: Input }],
        required: [{ type: Input }],
        value: [{ type: Input }],
        change: [{ type: Output }],
        valueChange: [{ type: Output }],
        _chips: [{ type: ContentChildren, args: [MatChipRow, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return MatChipGrid;
}(_MatChipGridMixinBase));
export { MatChipGrid };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1ncmlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvY2hpcC1ncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBRWYsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsSUFBSSxFQUNKLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRixPQUFPLEVBR0wsaUJBQWlCLEVBQ2pCLGVBQWUsR0FDaEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUVqRSxPQUFPLEVBQUMsS0FBSyxFQUEyQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXBELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUc3RCxn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QixpQkFBaUI7Z0JBSitCLFNBQVMsdUJBc041QyxRQUFRLFlBQUksSUFBSTs7OzJCQXhHNUIsS0FBSzs4QkEwQkwsS0FBSyxZQUNMLEtBQUs7MkJBaUJMLEtBQUs7d0JBa0JMLEtBQUs7eUJBa0JMLE1BQU07OEJBUU4sTUFBTTt5QkFFTixlQUFlLFNBQUMsVUFBVSxFQUFFO3dCQUMzQix1RUFBdUU7d0JBQ3ZFLDhDQUE4Qzt3QkFDOUMsV0FBVyxFQUFFLElBQUk7cUJBQ2xCOztJQTRTSCxrQkFBQztDQUFBLEFBdmNELENBeUJpQyxxQkFBcUIsR0E4YXJEO1NBOWFZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QkFDS1NQQUNFLCBUQUIsIEhPTUUsIEVORH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTZWxmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdDb250cm9sLCBOZ0Zvcm19IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIENhblVwZGF0ZUVycm9yU3RhdGUsXG4gIENhblVwZGF0ZUVycm9yU3RhdGVDdG9yLFxuICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgbWl4aW5FcnJvclN0YXRlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdENoaXBUZXh0Q29udHJvbH0gZnJvbSAnLi9jaGlwLXRleHQtY29udHJvbCc7XG5pbXBvcnQge21lcmdlLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGgsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRDaGlwRXZlbnR9IGZyb20gJy4vY2hpcCc7XG5pbXBvcnQge01hdENoaXBSb3d9IGZyb20gJy4vY2hpcC1yb3cnO1xuaW1wb3J0IHtNYXRDaGlwU2V0fSBmcm9tICcuL2NoaXAtc2V0JztcbmltcG9ydCB7R3JpZEZvY3VzS2V5TWFuYWdlcn0gZnJvbSAnLi9ncmlkLWZvY3VzLWtleS1tYW5hZ2VyJztcblxuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBncmlkIHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE1hdENoaXBHcmlkQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgLyoqIENoaXAgZ3JpZCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyBzb3VyY2U6IE1hdENoaXBHcmlkLFxuICAgIC8qKiBWYWx1ZSBvZiB0aGUgY2hpcCBncmlkIHdoZW4gdGhlIGV2ZW50IHdhcyBlbWl0dGVkLiAqL1xuICAgIHB1YmxpYyB2YWx1ZTogYW55KSB7IH1cbn1cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXBHcmlkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jbGFzcyBNYXRDaGlwR3JpZEJhc2UgZXh0ZW5kcyBNYXRDaGlwU2V0IHtcbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBwdWJsaWMgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICAgICAgICBwdWJsaWMgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICAgICAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgICAgICAgICAgICBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZiwgX2NoYW5nZURldGVjdG9yUmVmLCBfZGlyKTtcbiAgfVxufVxuY29uc3QgX01hdENoaXBHcmlkTWl4aW5CYXNlOiBDYW5VcGRhdGVFcnJvclN0YXRlQ3RvciAmIHR5cGVvZiBNYXRDaGlwR3JpZEJhc2UgPVxuICAgIG1peGluRXJyb3JTdGF0ZShNYXRDaGlwR3JpZEJhc2UpO1xuXG4vKipcbiAqIEFuIGV4dGVuc2lvbiBvZiB0aGUgTWF0Q2hpcFNldCBjb21wb25lbnQgdXNlZCB3aXRoIE1hdENoaXBSb3cgY2hpcHMgYW5kXG4gKiB0aGUgbWF0Q2hpcElucHV0Rm9yIGRpcmVjdGl2ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtZ3JpZCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaW5wdXRzOiBbJ3RhYkluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLXNldCBtYXQtbWRjLWNoaXAtZ3JpZCBtZGMtY2hpcC1zZXQnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAnW3RhYkluZGV4XSc6ICdfY2hpcHMgJiYgX2NoaXBzLmxlbmd0aCA9PT0gMCA/IC0xIDogdGFiSW5kZXgnLFxuICAgIC8vIFRPRE86IHJlcGxhY2UgdGhpcyBiaW5kaW5nIHdpdGggdXNlIG9mIEFyaWFEZXNjcmliZXJcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtbGlzdC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWxpc3QtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtbGlzdC1yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcbiAgICAnW2lkXSc6ICdfdWlkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNYXRDaGlwR3JpZH1dLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEdyaWQgZXh0ZW5kcyBfTWF0Q2hpcEdyaWRNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBDYW5VcGRhdGVFcnJvclN0YXRlLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgRG9DaGVjaywgTWF0Rm9ybUZpZWxkQ29udHJvbDxhbnk+LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByZWFkb25seSBjb250cm9sVHlwZTogc3RyaW5nID0gJ21hdC1jaGlwLWdyaWQnO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gYmx1ciBjaGFuZ2VzIGluIHRoZSBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfY2hpcEJsdXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBmb2N1cyBjaGFuZ2VzIGluIHRoZSBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfY2hpcEZvY3VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIC8qKiBUaGUgY2hpcCBpbnB1dCB0byBhZGQgbW9yZSBjaGlwcyAqL1xuICBwcm90ZWN0ZWQgX2NoaXBJbnB1dDogTWF0Q2hpcFRleHRDb250cm9sO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aGVuIHRvdWNoZWQuIFNldCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudGF0aW9uLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdoZW4gY2hhbmdlZC4gU2V0IGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50YXRpb24uXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogVGhlIEdyaWRGb2N1c0tleU1hbmFnZXIgd2hpY2ggaGFuZGxlcyBmb2N1cy4gKi9cbiAgX2tleU1hbmFnZXI6IEdyaWRGb2N1c0tleU1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgTWF0Rm9ybUZpZWxkQ29udHJvbC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5uZ0NvbnRyb2wgPyAhIXRoaXMubmdDb250cm9sLmRpc2FibGVkIDogdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3N5bmNDaGlwc1N0YXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2NoaXBJbnB1dC5pZDsgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NoaXBJbnB1dC5lbXB0eSAmJiB0aGlzLl9jaGlwcy5sZW5ndGggPT09IDA7IH1cblxuICAgIC8qKiBUaGUgQVJJQSByb2xlIGFwcGxpZWQgdG8gdGhlIGNoaXAgZ3JpZC4gKi9cbiAgZ2V0IHJvbGUoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLmVtcHR5ID8gbnVsbCA6ICdncmlkJzsgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIEBJbnB1dCgpXG4gIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jaGlwSW5wdXQgPyB0aGlzLl9jaGlwSW5wdXQucGxhY2Vob2xkZXIgOiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgfVxuICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByb3RlY3RlZCBfcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAvKiogV2hldGhlciBhbnkgY2hpcHMgb3IgdGhlIG1hdENoaXBJbnB1dCBpbnNpZGUgb2YgdGhpcyBjaGlwLWdyaWQgaGFzIGZvY3VzLiAqL1xuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NoaXBJbnB1dC5mb2N1c2VkIHx8IHRoaXMuX2hhc0ZvY3VzZWRDaGlwKCk7IH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZXF1aXJlZDsgfVxuICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgc2hvdWxkTGFiZWxGbG9hdCgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmVtcHR5IHx8IHRoaXMuZm9jdXNlZDsgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG4gIHByb3RlY3RlZCBfdmFsdWU6IGFueTtcblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIGJsdXIgZXZlbnRzLiAqL1xuICBnZXQgY2hpcEJsdXJDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWF0Q2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuX2NoaXBzLm1hcChjaGlwID0+IGNoaXAuX29uQmx1cikpO1xuICB9XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyBmb2N1cyBldmVudHMuICovXG4gIGdldCBjaGlwRm9jdXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWF0Q2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuX2NoaXBzLm1hcChjaGlwID0+IGNoaXAuX29uRm9jdXMpKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGdyaWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdENoaXBHcmlkQ2hhbmdlPiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBHcmlkQ2hhbmdlPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuZXZlciB0aGUgcmF3IHZhbHVlIG9mIHRoZSBjaGlwLWdyaWQgY2hhbmdlcy4gVGhpcyBpcyBoZXJlIHByaW1hcmlseVxuICAgKiB0byBmYWNpbGl0YXRlIHRoZSB0d28td2F5IGJpbmRpbmcgZm9yIHRoZSBgdmFsdWVgIGlucHV0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRDaGlwUm93LCB7XG4gICAgLy8gV2UgbmVlZCB0byB1c2UgYGRlc2NlbmRhbnRzOiB0cnVlYCwgYmVjYXVzZSBJdnkgd2lsbCBubyBsb25nZXIgbWF0Y2hcbiAgICAvLyBpbmRpcmVjdCBkZXNjZW5kYW50cyBpZiBpdCdzIGxlZnQgYXMgZmFsc2UuXG4gICAgZGVzY2VuZGFudHM6IHRydWVcbiAgfSlcbiAgX2NoaXBzOiBRdWVyeUxpc3Q8TWF0Q2hpcFJvdz47XG5cbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBfcGFyZW50Rm9ybTogTmdGb3JtLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICAgICAgICAgICAgIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICAgICAgICAgICAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmLCBfY2hhbmdlRGV0ZWN0b3JSZWYsIF9kaXIsIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXIsIF9wYXJlbnRGb3JtLFxuICAgICAgICBfcGFyZW50Rm9ybUdyb3VwLCBuZ0NvbnRyb2wpO1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKCk7XG5cbiAgICB0aGlzLl9jaGlwcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgZGVzdHJveWVkIGNoaXAgYW5kIG5lZWQgdG8gcmVmb2N1c1xuICAgICAgdGhpcy5fdXBkYXRlRm9jdXNGb3JEZXN0cm95ZWRDaGlwcygpO1xuXG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgaWYgKCF0aGlzLl9jaGlwSW5wdXQpIHtcbiAgICAgIHRocm93IEVycm9yKCdtYXQtY2hpcC1ncmlkIG11c3QgYmUgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIG1hdENoaXBJbnB1dEZvci4nKTtcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoaXMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSwgYmVjYXVzZSB0aGVyZSBhcmUgc29tZVxuICAgICAgLy8gZXJyb3IgdHJpZ2dlcnMgdGhhdCB3ZSBjYW4ndCBzdWJzY3JpYmUgdG8gKGUuZy4gcGFyZW50IGZvcm0gc3VibWlzc2lvbnMpLiBUaGlzIG1lYW5zXG4gICAgICAvLyB0aGF0IHdoYXRldmVyIGxvZ2ljIGlzIGluIGhlcmUgaGFzIHRvIGJlIHN1cGVyIGxlYW4gb3Igd2UgcmlzayBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICAgIHRoaXMudXBkYXRlRXJyb3JTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBBc3NvY2lhdGVzIGFuIEhUTUwgaW5wdXQgZWxlbWVudCB3aXRoIHRoaXMgY2hpcCBncmlkLiAqL1xuICByZWdpc3RlcklucHV0KGlucHV0RWxlbWVudDogTWF0Q2hpcFRleHRDb250cm9sKTogdm9pZCB7XG4gICAgdGhpcy5fY2hpcElucHV0ID0gaW5wdXRFbGVtZW50O1xuICAgIHRoaXMuX3NldE1kY0NsYXNzKCdtZGMtY2hpcC1zZXQtLWlucHV0JywgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBNYXRGb3JtRmllbGRDb250cm9sLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9vcmlnaW5hdGVzRnJvbUNoaXAoZXZlbnQpICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIGZpcnN0IGNoaXAgaW4gdGhpcyBjaGlwIGdyaWQsIG9yIHRoZSBhc3NvY2lhdGVkIGlucHV0IHdoZW4gdGhlcmVcbiAgICogYXJlIG5vIGVsaWdpYmxlIGNoaXBzLlxuICAgKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5fY2hpcElucHV0LmZvY3VzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdENlbGxBY3RpdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZm9jdXNJbnB1dCgpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIE1hdEZvcm1GaWVsZENvbnRyb2wuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHNldERlc2NyaWJlZEJ5SWRzKGlkczogc3RyaW5nW10pIHsgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gaWRzLmpvaW4oJyAnKTsgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAvLyBUaGUgdXNlciBpcyByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGNoaWxkIGNoaXBzLCBzbyB3ZSBqdXN0IHN0b3JlIHRoZSB2YWx1ZS5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIC8qKiBXaGVuIGJsdXJyZWQsIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQgd2hlbiBmb2N1cyBtb3ZlZCBvdXRzaWRlIHRoZSBjaGlwIGdyaWQuICovXG4gIF9ibHVyKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZm9jdXMgbW92ZWQgdG8gY2hpcCBpbnB1dC5cbiAgICAvLyBJZiB0aGUgZm9jdXMgaXMgbm90IG1vdmVkIHRvIGNoaXAgaW5wdXQsIG1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQuIElmIHRoZSBmb2N1cyBtb3ZlZFxuICAgIC8vIHRvIGNoaXAgaW5wdXQsIGRvIG5vdGhpbmcuXG4gICAgLy8gVGltZW91dCBpcyBuZWVkZWQgdG8gd2FpdCBmb3IgdGhlIGZvY3VzKCkgZXZlbnQgdHJpZ2dlciBvbiBjaGlwIGlucHV0LlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVDZWxsKHtyb3c6IC0xLCBjb2x1bW46IC0xfSk7XG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICAgICAgdGhpcy5fbWFya0FzVG91Y2hlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGB0YWJpbmRleGAgZnJvbSB0aGUgY2hpcCBncmlkIGFuZCByZXNldHMgaXQgYmFjayBhZnRlcndhcmRzLCBhbGxvd2luZyB0aGVcbiAgICogdXNlciB0byB0YWIgb3V0IG9mIGl0LiBUaGlzIHByZXZlbnRzIHRoZSBncmlkIGZyb20gY2FwdHVyaW5nIGZvY3VzIGFuZCByZWRpcmVjdGluZ1xuICAgKiBpdCBiYWNrIHRvIHRoZSBmaXJzdCBjaGlwLCBjcmVhdGluZyBhIGZvY3VzIHRyYXAsIGlmIGl0IHVzZXIgdHJpZXMgdG8gdGFiIGF3YXkuXG4gICAqL1xuICBfYWxsb3dGb2N1c0VzY2FwZSgpIHtcbiAgICBpZiAodGhpcy5fY2hpcElucHV0LmZvY3VzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c1RhYkluZGV4ID0gdGhpcy50YWJJbmRleDtcblxuICAgIGlmICh0aGlzLnRhYkluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy50YWJJbmRleCA9IC0xO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IHByZXZpb3VzVGFiSW5kZXg7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgY3VzdG9tIGtleWJvYXJkIGV2ZW50cy4gKi9cbiAgX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG5cbiAgICAvLyBJZiB0aGV5IGFyZSBvbiBhbiBlbXB0eSBpbnB1dCBhbmQgaGl0IGJhY2tzcGFjZSwgZm9jdXMgdGhlIGxhc3QgY2hpcFxuICAgIGlmIChrZXlDb2RlID09PSBCQUNLU1BBQ0UgJiYgdGhpcy5faXNFbXB0eUlucHV0KHRhcmdldCkpIHtcbiAgICAgIGlmICh0aGlzLl9jaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgbWFuYWdlci5zZXRMYXN0Q2VsbEFjdGl2ZSgpO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFRBQiAmJiB0YXJnZXQuaWQgIT09IHRoaXMuX2NoaXBJbnB1dCEuaWQgKSB7XG4gICAgICB0aGlzLl9hbGxvd0ZvY3VzRXNjYXBlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcmlnaW5hdGVzRnJvbUNoaXAoZXZlbnQpKSB7XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gSE9NRSkge1xuICAgICAgICBtYW5hZ2VyLnNldEZpcnN0Q2VsbEFjdGl2ZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBFTkQpIHtcbiAgICAgICAgbWFuYWdlci5zZXRMYXN0Q2VsbEFjdGl2ZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogVW5zdWJzY3JpYmVzIGZyb20gYWxsIGNoaXAgZXZlbnRzLiAqL1xuICBwcm90ZWN0ZWQgX2Ryb3BTdWJzY3JpcHRpb25zKCkge1xuICAgIHN1cGVyLl9kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgIGlmICh0aGlzLl9jaGlwQmx1clN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY2hpcEJsdXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBCbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpcEZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwRm9jdXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBGb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gZXZlbnRzIG9uIHRoZSBjaGlsZCBjaGlwcy4gKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVUb0NoaXBFdmVudHMoKSB7XG4gICAgc3VwZXIuX3N1YnNjcmliZVRvQ2hpcEV2ZW50cygpO1xuICAgIHRoaXMuX2xpc3RlblRvQ2hpcHNGb2N1cygpO1xuICAgIHRoaXMuX2xpc3RlblRvQ2hpcHNCbHVyKCk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhlIGtleSBtYW5hZ2VyIHRvIG1hbmFnZSBmb2N1cy4gKi9cbiAgcHJpdmF0ZSBfaW5pdEtleU1hbmFnZXIoKSB7XG4gICAgdGhpcy5fa2V5TWFuYWdlciA9IG5ldyBHcmlkRm9jdXNLZXlNYW5hZ2VyKHRoaXMuX2NoaXBzKVxuICAgICAgLndpdGhEaXJlY3Rpb25hbGl0eSh0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJyk7XG5cbiAgICBpZiAodGhpcy5fZGlyKSB7XG4gICAgICB0aGlzLl9kaXIuY2hhbmdlXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGRpciA9PiB0aGlzLl9rZXlNYW5hZ2VyLndpdGhEaXJlY3Rpb25hbGl0eShkaXIpKTtcbiAgICB9XG4gIH1cblxuICAgLyoqIFN1YnNjcmliZXMgdG8gY2hpcCBmb2N1cyBldmVudHMuICovXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNGb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGlwRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBGb2N1c0NoYW5nZXMuc3Vic2NyaWJlKChldmVudDogTWF0Q2hpcEV2ZW50KSA9PiB7XG4gICAgICBsZXQgY2hpcEluZGV4OiBudW1iZXIgPSB0aGlzLl9jaGlwcy50b0FycmF5KCkuaW5kZXhPZihldmVudC5jaGlwIGFzIE1hdENoaXBSb3cpO1xuXG4gICAgICBpZiAodGhpcy5faXNWYWxpZEluZGV4KGNoaXBJbmRleCkpIHtcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci51cGRhdGVBY3RpdmVDZWxsKHtyb3c6IGNoaXBJbmRleCwgY29sdW1uOiAwfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU3Vic2NyaWJlcyB0byBjaGlwIGJsdXIgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9saXN0ZW5Ub0NoaXBzQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGlwQmx1clN1YnNjcmlwdGlvbiA9IHRoaXMuY2hpcEJsdXJDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9ibHVyKCk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuIC8qKiBFbWl0cyBjaGFuZ2UgZXZlbnQgdG8gc2V0IHRoZSBtb2RlbCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfcHJvcGFnYXRlQ2hhbmdlcyhmYWxsYmFja1ZhbHVlPzogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVUb0VtaXQgPSB0aGlzLl9jaGlwcy5sZW5ndGggPyB0aGlzLl9jaGlwcy50b0FycmF5KCkubWFwKFxuICAgICAgY2hpcCA9PiBjaGlwLnZhbHVlKSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVRvRW1pdDtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBNYXRDaGlwR3JpZENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZVRvRW1pdCk7XG4gICAgdGhpcy5fb25DaGFuZ2UodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIE1hcmsgdGhlIGZpZWxkIGFzIHRvdWNoZWQgKi9cbiAgcHJpdmF0ZSBfbWFya0FzVG91Y2hlZCgpIHtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGFtb3VudCBvZiBjaGlwcyBjaGFuZ2VkLCB3ZSBuZWVkIHRvIGZvY3VzIHRoZSBuZXh0IGNsb3Nlc3QgY2hpcC5cbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZUZvY3VzRm9yRGVzdHJveWVkQ2hpcHMoKSB7XG4gICAgLy8gTW92ZSBmb2N1cyB0byB0aGUgY2xvc2VzdCBjaGlwLiBJZiBubyBvdGhlciBjaGlwcyByZW1haW4sIGZvY3VzIHRoZSBjaGlwLWdyaWQgaXRzZWxmLlxuICAgIGlmICh0aGlzLl9sYXN0RGVzdHJveWVkQ2hpcEluZGV4ICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9jaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbmV3Q2hpcEluZGV4ID0gTWF0aC5taW4odGhpcy5fbGFzdERlc3Ryb3llZENoaXBJbmRleCwgdGhpcy5fY2hpcHMubGVuZ3RoIC0gMSk7XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlQ2VsbCh7XG4gICAgICAgICAgcm93OiBuZXdDaGlwSW5kZXgsXG4gICAgICAgICAgY29sdW1uOiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUNvbHVtbkluZGV4XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2xhc3REZXN0cm95ZWRDaGlwSW5kZXggPSBudWxsO1xuICB9XG5cbiAgLyoqIEZvY3VzIGlucHV0IGVsZW1lbnQuICovXG4gIHByaXZhdGUgX2ZvY3VzSW5wdXQoKSB7XG4gICAgdGhpcy5fY2hpcElucHV0LmZvY3VzKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIGVsZW1lbnQgaXMgYW4gaW5wdXQgd2l0aCBubyB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfaXNFbXB0eUlucHV0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5pZCA9PT0gdGhpcy5fY2hpcElucHV0IS5pZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoaXBJbnB1dC5lbXB0eTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlcXVpcmVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=