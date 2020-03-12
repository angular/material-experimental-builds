import { getMatFormFieldMissingControlError, getMatFormFieldDuplicatedHintError, matFormFieldAnimations, MatFormField as MatFormField$1, MatFormFieldControl } from '@angular/material/form-field';
export { MatFormFieldControl, getMatFormFieldDuplicatedHintError, getMatFormFieldMissingControlError } from '@angular/material/form-field';
import { Directive, Input, ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, InjectionToken, isDevMode, ChangeDetectorRef, NgZone, Optional, Inject, ViewChild, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { MAT_LABEL_GLOBAL_OPTIONS, MatCommonModule } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCTextFieldFoundation, numbers } from '@material/textfield';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { __extends } from 'tslib';
import { MDCFloatingLabel } from '@material/floating-label';
import { MDCLineRipple } from '@material/line-ripple';
import { MDCNotchedOutline } from '@material/notched-outline';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** The floating label for a `mat-form-field`. */
var MatLabel = /** @class */ (function () {
    function MatLabel() {
    }
    MatLabel.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-label',
                },] }
    ];
    return MatLabel;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var nextUniqueId = 0;
/** Single error message to be shown underneath the form-field. */
var MatError = /** @class */ (function () {
    function MatError() {
        this.id = "mat-error-" + nextUniqueId++;
    }
    MatError.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-error',
                    host: {
                        'class': 'mat-mdc-form-field-error',
                        'role': 'alert',
                        '[id]': 'id',
                    }
                },] }
    ];
    MatError.propDecorators = {
        id: [{ type: Input }]
    };
    return MatError;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var nextUniqueId$1 = 0;
/** Hint text to be shown underneath the form field control. */
var MatHint = /** @class */ (function () {
    function MatHint() {
        /** Whether to align the hint label at the start or end of the line. */
        this.align = 'start';
        /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
        this.id = "mat-hint-" + nextUniqueId$1++;
    }
    MatHint.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-hint',
                    host: {
                        'class': 'mat-mdc-form-field-hint',
                        '[class.mat-form-field-hint-end]': 'align == "end"',
                        '[id]': 'id',
                        // Remove align attribute to prevent it from interfering with layout.
                        '[attr.align]': 'null',
                    }
                },] }
    ];
    MatHint.propDecorators = {
        align: [{ type: Input }],
        id: [{ type: Input }]
    };
    return MatHint;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Prefix to be placed in front of the form field. */
var MatPrefix = /** @class */ (function () {
    function MatPrefix() {
    }
    MatPrefix.decorators = [
        { type: Directive, args: [{
                    selector: '[matPrefix]',
                },] }
    ];
    return MatPrefix;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Suffix to be placed at the end of the form field. */
var MatSuffix = /** @class */ (function () {
    function MatSuffix() {
    }
    MatSuffix.decorators = [
        { type: Directive, args: [{
                    selector: '[matSuffix]',
                },] }
    ];
    return MatSuffix;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Internal directive that creates an instance of the MDC floating label
 * component. Using a directive allows us to conditionally render a floating label
 * in the template without having to manually instantiate the `MDCFloatingLabel` component.
 *
 * The component is responsible for setting up the floating label styles, and for providing
 * an @Input that can be used by the form-field to toggle floating state of the label.
 */
var MatFormFieldFloatingLabel = /** @class */ (function (_super) {
    __extends(MatFormFieldFloatingLabel, _super);
    function MatFormFieldFloatingLabel(_elementRef) {
        var _this = _super.call(this, _elementRef.nativeElement) || this;
        _this._elementRef = _elementRef;
        _this._floating = false;
        return _this;
    }
    Object.defineProperty(MatFormFieldFloatingLabel.prototype, "floating", {
        get: function () { return this._floating; },
        set: function (shouldFloat) {
            if (shouldFloat !== this._floating) {
                this._floating = shouldFloat;
                this.float(shouldFloat);
            }
        },
        enumerable: true,
        configurable: true
    });
    MatFormFieldFloatingLabel.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    Object.defineProperty(MatFormFieldFloatingLabel.prototype, "element", {
        /** Gets the HTML element for the floating label. */
        get: function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    MatFormFieldFloatingLabel.decorators = [
        { type: Directive, args: [{
                    selector: 'label[matFormFieldFloatingLabel]',
                    host: {
                        'class': 'mdc-floating-label',
                    },
                },] }
    ];
    /** @nocollapse */
    MatFormFieldFloatingLabel.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MatFormFieldFloatingLabel.propDecorators = {
        floating: [{ type: Input }]
    };
    return MatFormFieldFloatingLabel;
}(MDCFloatingLabel));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Internal directive that creates an instance of the MDC line-ripple component. Using a
 * directive allows us to conditionally render a line-ripple in the template without having
 * to manually create and destroy the `MDCLineRipple` component whenever the condition changes.
 *
 * The directive sets up the styles for the line-ripple and provides an API for activating
 * and deactivating the line-ripple.
 */
var MatFormFieldLineRipple = /** @class */ (function (_super) {
    __extends(MatFormFieldLineRipple, _super);
    function MatFormFieldLineRipple(elementRef) {
        return _super.call(this, elementRef.nativeElement) || this;
    }
    MatFormFieldLineRipple.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    MatFormFieldLineRipple.decorators = [
        { type: Directive, args: [{
                    selector: 'div[matFormFieldLineRipple]',
                    host: {
                        'class': 'mdc-line-ripple',
                    },
                },] }
    ];
    /** @nocollapse */
    MatFormFieldLineRipple.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return MatFormFieldLineRipple;
}(MDCLineRipple));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Internal component that creates an instance of the MDC notched-outline component. Using
 * a directive allows us to conditionally render a notched-outline in the template without
 * having to manually create and destroy the `MDCNotchedOutline` component whenever the
 * appearance changes.
 *
 * The component sets up the HTML structure and styles for the notched-outline. It provides
 * inputs to toggle the notch state and width.
 */
var MatFormFieldNotchedOutline = /** @class */ (function () {
    function MatFormFieldNotchedOutline(_elementRef, _platform) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        /** Width of the notch. */
        this.width = 0;
        /** Whether the notch should be opened. */
        this.open = false;
        /** Instance of the MDC notched outline. */
        this._mdcNotchedOutline = null;
    }
    MatFormFieldNotchedOutline.prototype.ngAfterViewInit = function () {
        // The notched outline cannot be attached in the server platform. It schedules tasks
        // for the next browser animation frame and relies on element client rectangles to render
        // the outline notch. To avoid failures on the server, we just do not initialize it,
        // but the actual notched-outline styles will be still displayed.
        if (this._platform.isBrowser) {
            // The notch component relies on the view to be initialized. This means
            // that we cannot extend from the "MDCNotchedOutline".
            this._mdcNotchedOutline = MDCNotchedOutline.attachTo(this._elementRef.nativeElement);
        }
        // Initial sync in case state has been updated before view initialization.
        this._syncNotchedOutlineState();
    };
    MatFormFieldNotchedOutline.prototype.ngOnChanges = function () {
        // Whenever the width, or the open state changes, sync the notched outline to be
        // based on the new values.
        this._syncNotchedOutlineState();
    };
    MatFormFieldNotchedOutline.prototype.ngOnDestroy = function () {
        if (this._mdcNotchedOutline !== null) {
            this._mdcNotchedOutline.destroy();
        }
    };
    /** Synchronizes the notched outline state to be based on the `width` and `open` inputs. */
    MatFormFieldNotchedOutline.prototype._syncNotchedOutlineState = function () {
        if (this._mdcNotchedOutline === null) {
            return;
        }
        if (this.open) {
            this._mdcNotchedOutline.notch(this.width);
        }
        else {
            this._mdcNotchedOutline.closeNotch();
        }
    };
    MatFormFieldNotchedOutline.decorators = [
        { type: Component, args: [{
                    selector: 'div[matFormFieldNotchedOutline]',
                    template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n",
                    host: {
                        'class': 'mdc-notched-outline',
                        // Besides updating the notch state through the MDC component, we toggle this class through
                        // a host binding in order to ensure that the notched-outline renders correctly on the server.
                        '[class.mdc-notched-outline--notched]': 'open',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    MatFormFieldNotchedOutline.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Platform }
    ]; };
    MatFormFieldNotchedOutline.propDecorators = {
        width: [{ type: Input, args: ['matFormFieldNotchedOutlineWidth',] }],
        open: [{ type: Input, args: ['matFormFieldNotchedOutlineOpen',] }]
    };
    return MatFormFieldNotchedOutline;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
var MAT_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken('MAT_FORM_FIELD_DEFAULT_OPTIONS');
var nextUniqueId$2 = 0;
/** Default appearance used by the form-field. */
var DEFAULT_APPEARANCE = 'fill';
/** Default appearance used by the form-field. */
var DEFAULT_FLOAT_LABEL = 'auto';
/**
 * Default transform for docked floating labels in a MDC text-field. This value has been
 * extracted from the MDC text-field styles because we programmatically modify the docked
 * label transform, but do not want to accidentally discard the default label transform.
 */
var FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM = "translateY(-50%)";
/** Container for form controls that applies Material Design styling and behavior. */
var MatFormField = /** @class */ (function () {
    function MatFormField(_elementRef, _changeDetectorRef, _ngZone, _dir, _platform, _defaults, _labelOptions, _animationMode) {
        var _this = this;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._platform = _platform;
        this._defaults = _defaults;
        this._labelOptions = _labelOptions;
        this._animationMode = _animationMode;
        /** Whether the required marker should be hidden. */
        this.hideRequiredMarker = false;
        /** The color palette for the form-field. */
        this.color = 'primary';
        this._appearance = DEFAULT_APPEARANCE;
        this._hintLabel = '';
        // Unique id for the hint label.
        this._hintLabelId = "mat-hint-" + nextUniqueId$2++;
        // Unique id for the internal form field label.
        this._labelId = "mat-form-field-label-" + nextUniqueId$2++;
        /** State of the mat-hint and mat-error animations. */
        this._subscriptAnimationState = '';
        this._destroyed = new Subject();
        this._isFocused = null;
        this._needsOutlineLabelOffsetUpdateOnStable = false;
        this._adapter = {
            addClass: function (className) { return _this._textField.nativeElement.classList.add(className); },
            removeClass: function (className) { return _this._textField.nativeElement.classList.remove(className); },
            hasClass: function (className) { return _this._textField.nativeElement.classList.contains(className); },
            hasLabel: function () { return _this._hasFloatingLabel(); },
            isFocused: function () { return _this._control.focused; },
            hasOutline: function () { return _this._hasOutline(); },
            // MDC text-field will call this method on focus, blur and value change. It expects us
            // to update the floating label state accordingly. Though we make this a noop because we
            // want to react to floating label state changes through change detection. Relying on this
            // adapter method would mean that the label would not update if the custom form-field control
            // sets "shouldLabelFloat" to true, or if the "floatLabel" input binding changes to "always".
            floatLabel: function () { },
            // Label shaking is not supported yet. It will require a new API for form field
            // controls to trigger the shaking. This can be a feature in the future.
            // TODO(devversion): explore options on how to integrate label shaking.
            shakeLabel: function () { },
            // MDC by default updates the notched-outline whenever the text-field receives focus, or
            // is being blurred. It also computes the label width every time the notch is opened or
            // closed. This works fine in the standard MDC text-field, but not in Angular where the
            // floating label could change through interpolation. We want to be able to update the
            // notched outline whenever the label content changes. Additionally, relying on focus or
            // blur to open and close the notch does not work for us since abstract form-field controls
            // have the ability to control the floating label state (i.e. `shouldLabelFloat`), and we
            // want to update the notch whenever the `_shouldLabelFloat()` value changes.
            getLabelWidth: function () { return 0; },
            notchOutline: function () { },
            closeOutline: function () { },
            activateLineRipple: function () { return _this._lineRipple && _this._lineRipple.activate(); },
            deactivateLineRipple: function () { return _this._lineRipple && _this._lineRipple.deactivate(); },
            // The foundation tries to register events on the input. This is not matching
            // our concept of abstract form field controls. We handle each event manually
            // in "stateChanges" based on the form-field control state. The following events
            // need to be handled: focus, blur. We do not handle the "input" event since
            // that one is only needed for the text-field character count, which we do
            // not implement as part of the form-field, but should be implemented manually
            // by consumers using template bindings.
            registerInputInteractionHandler: function () { },
            deregisterInputInteractionHandler: function () { },
            // We do not have a reference to the native input since we work with abstract form field
            // controls. MDC needs a reference to the native input optionally to handle character
            // counting and value updating. These are both things we do not handle from within the
            // form-field, so we can just return null.
            getNativeInput: function () { return null; },
            // This method will never be called since we do not have the ability to add event listeners
            // to the native input. This is because the form control is not necessarily an input, and
            // the form field deals with abstract form controls of any type.
            setLineRippleTransformOrigin: function () { },
            // The foundation tries to register click and keyboard events on the form-field to figure out
            // if the input value changes through user interaction. Based on that, the foundation tries
            // to focus the input. Since we do not handle the input value as part of the form-field, nor
            // it's guaranteed to be an input (see adapter methods above), this is a noop.
            deregisterTextFieldInteractionHandler: function () { },
            registerTextFieldInteractionHandler: function () { },
            // The foundation tries to setup a "MutationObserver" in order to watch for attributes
            // like "maxlength" or "pattern" to change. The foundation will update the validity state
            // based on that. We do not need this logic since we handle the validity through the
            // abstract form control instance.
            deregisterValidationAttributeChangeHandler: function () { },
            registerValidationAttributeChangeHandler: function () { return null; },
        };
        if (_defaults && _defaults.appearance) {
            this.appearance = _defaults.appearance;
        }
        else if (_defaults && _defaults.hideRequiredMarker) {
            this.hideRequiredMarker = true;
        }
    }
    Object.defineProperty(MatFormField.prototype, "floatLabel", {
        /** Whether the label should always float or float as the user types. */
        get: function () {
            return this._floatLabel || (this._labelOptions && this._labelOptions.float)
                || DEFAULT_FLOAT_LABEL;
        },
        set: function (value) {
            if (value !== this._floatLabel) {
                this._floatLabel = value;
                // For backwards compatibility. Custom form-field controls or directives might set
                // the "floatLabel" input and expect the form-field view to be updated automatically.
                // e.g. autocomplete trigger. Ideally we'd get rid of this and the consumers would just
                // emit the "stateChanges" observable. TODO(devversion): consider removing.
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatFormField.prototype, "appearance", {
        /** The form-field appearance style. */
        get: function () { return this._appearance; },
        set: function (value) {
            var oldValue = this._appearance;
            this._appearance = value || (this._defaults && this._defaults.appearance) || DEFAULT_APPEARANCE;
            // If the appearance has been switched to `outline`, the label offset needs to be updated.
            // The update can happen once the view has been re-checked, but not immediately because
            // the view has not been updated and the notched-outline floating label is not present.
            if (this._appearance === 'outline' && this._appearance !== oldValue) {
                this._needsOutlineLabelOffsetUpdateOnStable = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatFormField.prototype, "hintLabel", {
        /** Text for the form field hint. */
        get: function () { return this._hintLabel; },
        set: function (value) {
            this._hintLabel = value;
            this._processHints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatFormField.prototype, "_control", {
        /** Gets the current form field control */
        get: function () {
            return this._explicitFormFieldControl || this._formFieldControl;
        },
        set: function (value) { this._explicitFormFieldControl = value; },
        enumerable: true,
        configurable: true
    });
    MatFormField.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._foundation = new MDCTextFieldFoundation(this._adapter);
        // MDC uses the "shouldFloat" getter to know whether the label is currently floating. This
        // does not match our implementation of when the label floats because we support more cases.
        // For example, consumers can set "@Input floatLabel" to always, or the custom form-field
        // control can set "MatFormFieldControl#shouldLabelFloat" to true. To ensure that MDC knows
        // when the label is floating, we overwrite the property to be based on the method we use to
        // determine the current state of the floating label.
        Object.defineProperty(this._foundation, 'shouldFloat', {
            get: function () { return _this._shouldLabelFloat(); },
        });
        // By default, the foundation determines the validity of the text-field from the
        // specified native input. Since we don't pass a native input to the foundation because
        // abstract form controls are not necessarily consisting of an input, we handle the
        // text-field validity through the abstract form-field control state.
        this._foundation.isValid = function () { return !_this._control.errorState; };
        // Initial focus state sync. This happens rarely, but we want to account for
        // it in case the form-field control has "focused" set to true on init.
        this._updateFocusState();
        // Initial notch width update. This is needed in case the text-field label floats
        // on initialization, and renders inside of the notched outline.
        this._refreshOutlineNotchWidth();
        // Enable animations now. This ensures we don't animate on initial render.
        this._subscriptAnimationState = 'enter';
        // Because the above changes a value used in the template after it was checked, we need
        // to trigger CD or the change might not be reflected if there is no other CD scheduled.
        this._changeDetectorRef.detectChanges();
    };
    MatFormField.prototype.ngAfterContentInit = function () {
        this._assertFormFieldControl();
        this._initializeControl();
        this._initializeSubscript();
        this._initializePrefixAndSuffix();
        this._initializeOutlineLabelOffsetSubscriptions();
    };
    MatFormField.prototype.ngAfterContentChecked = function () {
        this._assertFormFieldControl();
    };
    MatFormField.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field
     * should be positioned relative to.
     */
    MatFormField.prototype.getConnectedOverlayOrigin = function () {
        return this._textField || this._elementRef;
    };
    /** Animates the placeholder up and locks it in position. */
    MatFormField.prototype._animateAndLockLabel = function () {
        // This is for backwards compatibility only. Consumers of the form-field might use
        // this method. e.g. the autocomplete trigger. This method has been added to the non-MDC
        // form-field because setting "floatLabel" to "always" caused the label to float without
        // animation. This is different in MDC where the label always animates, so this method
        // is no longer necessary. There doesn't seem any benefit in adding logic to allow changing
        // the floating label state without animations. The non-MDC implementation was inconsistent
        // because it always animates if "floatLabel" is set away from "always".
        // TODO(devversion): consider removing this method when releasing the MDC form-field.
        if (this._hasFloatingLabel()) {
            this.floatLabel = 'always';
        }
    };
    /** Initializes the registered form-field control. */
    MatFormField.prototype._initializeControl = function () {
        var _this = this;
        var control = this._control;
        if (control.controlType) {
            this._elementRef.nativeElement.classList.add("mat-mdc-form-field-type-" + control.controlType);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        control.stateChanges.subscribe(function () {
            _this._updateFocusState();
            _this._syncDescribedByIds();
            _this._changeDetectorRef.markForCheck();
        });
        // Run change detection if the value changes.
        if (control.ngControl && control.ngControl.valueChanges) {
            control.ngControl.valueChanges
                .pipe(takeUntil(this._destroyed))
                .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
        }
    };
    /** Initializes the prefix and suffix containers. */
    MatFormField.prototype._initializePrefixAndSuffix = function () {
        var _this = this;
        // Mark the form-field as dirty whenever the prefix or suffix children change. This
        // is necessary because we conditionally display the prefix/suffix containers based
        // on whether there is projected content.
        merge(this._prefixChildren.changes, this._suffixChildren.changes)
            .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
    };
    /**
     * Initializes the subscript by validating hints and synchronizing "aria-describedby" ids
     * with the custom form-field control. Also subscribes to hint and error changes in order
     * to be able to validate and synchronize ids on change.
     */
    MatFormField.prototype._initializeSubscript = function () {
        var _this = this;
        // Re-validate when the number of hints changes.
        this._hintChildren.changes.subscribe(function () {
            _this._processHints();
            _this._changeDetectorRef.markForCheck();
        });
        // Update the aria-described by when the number of errors changes.
        this._errorChildren.changes.subscribe(function () {
            _this._syncDescribedByIds();
            _this._changeDetectorRef.markForCheck();
        });
        // Initial mat-hint validation and subscript describedByIds sync.
        this._validateHints();
        this._syncDescribedByIds();
    };
    /** Throws an error if the form field's control is missing. */
    MatFormField.prototype._assertFormFieldControl = function () {
        if (!this._control) {
            throw getMatFormFieldMissingControlError();
        }
    };
    MatFormField.prototype._updateFocusState = function () {
        // Usually the MDC foundation would call "activateFocus" and "deactivateFocus" whenever
        // certain DOM events are emitted. This is not possible in our implementation of the
        // form-field because we support abstract form field controls which are not necessarily
        // of type input, nor do we have a reference to a native form-field control element. Instead
        // we handle the focus by checking if the abstract form-field control focused state changes.
        if (this._control.focused && !this._isFocused) {
            this._isFocused = true;
            this._foundation.activateFocus();
        }
        else if (!this._control.focused && (this._isFocused || this._isFocused === null)) {
            this._isFocused = false;
            this._foundation.deactivateFocus();
        }
    };
    /**
     * The floating label in the docked state needs to account for prefixes. The horizontal offset
     * is calculated whenever the appearance changes to `outline`, the prefixes change, or when the
     * form-field is added to the DOM. This method sets up all subscriptions which are needed to
     * trigger the label offset update. In general, we want to avoid performing measurements often,
     * so we rely on the `NgZone` as indicator when the offset should be recalculated, instead of
     * checking every change detection cycle.
     */
    MatFormField.prototype._initializeOutlineLabelOffsetSubscriptions = function () {
        var _this = this;
        // Whenever the prefix changes, schedule an update of the label offset.
        this._prefixChildren.changes
            .subscribe(function () { return _this._needsOutlineLabelOffsetUpdateOnStable = true; });
        // Note that we have to run outside of the `NgZone` explicitly, in order to avoid
        // throwing users into an infinite loop if `zone-patch-rxjs` is included.
        this._ngZone.runOutsideAngular(function () {
            _this._ngZone.onStable.asObservable().pipe(takeUntil(_this._destroyed)).subscribe(function () {
                if (_this._needsOutlineLabelOffsetUpdateOnStable) {
                    _this._needsOutlineLabelOffsetUpdateOnStable = false;
                    _this._updateOutlineLabelOffset();
                }
            });
        });
        this._dir.change.pipe(takeUntil(this._destroyed))
            .subscribe(function () { return _this._needsOutlineLabelOffsetUpdateOnStable = true; });
    };
    /** Whether the floating label should always float or not. */
    MatFormField.prototype._shouldAlwaysFloat = function () {
        return this.floatLabel === 'always';
    };
    MatFormField.prototype._hasOutline = function () {
        return this.appearance === 'outline';
    };
    /**
     * Whether the label should display in the infix. Labels in the outline appearance are
     * displayed as part of the notched-outline and are horizontally offset to account for
     * form-field prefix content. This won't work in server side rendering since we cannot
     * measure the width of the prefix container. To make the docked label appear as if the
     * right offset has been calculated, we forcibly render the label inside the infix. Since
     * the label is part of the infix, the label cannot overflow the prefix content.
     */
    MatFormField.prototype._forceDisplayInfixLabel = function () {
        return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat();
    };
    MatFormField.prototype._hasFloatingLabel = function () {
        return !!this._labelChildNonStatic || !!this._labelChildStatic;
    };
    MatFormField.prototype._shouldLabelFloat = function () {
        return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
    };
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    MatFormField.prototype._shouldForward = function (prop) {
        var ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    };
    /** Determines whether to display hints or errors. */
    MatFormField.prototype._getDisplayedMessages = function () {
        return (this._errorChildren && this._errorChildren.length > 0 &&
            this._control.errorState) ? 'error' : 'hint';
    };
    /** Refreshes the width of the outline-notch, if present. */
    MatFormField.prototype._refreshOutlineNotchWidth = function () {
        if (!this._hasOutline() || !this._floatingLabel) {
            return;
        }
        // The outline notch should be based on the label width, but needs to respect the scaling
        // applied to the label if it actively floats. Since the label always floats when the notch
        // is open, the MDC text-field floating label scaling is respected in notch width calculation.
        this._outlineNotchWidth = this._floatingLabel.getWidth() * numbers.LABEL_SCALE;
    };
    /** Does any extra processing that is required when handling the hints. */
    MatFormField.prototype._processHints = function () {
        this._validateHints();
        this._syncDescribedByIds();
    };
    /**
     * Ensure that there is a maximum of one of each "mat-hint" alignment specified. The hint
     * label specified set through the input is being considered as "start" aligned.
     *
     * This method is a noop if Angular runs in production mode.
     */
    MatFormField.prototype._validateHints = function () {
        var _this = this;
        if (isDevMode() && this._hintChildren) {
            var startHint_1;
            var endHint_1;
            this._hintChildren.forEach(function (hint) {
                if (hint.align === 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw getMatFormFieldDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align === 'end') {
                    if (endHint_1) {
                        throw getMatFormFieldDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    /**
     * Sets the list of element IDs that describe the child control. This allows the control to update
     * its `aria-describedby` attribute accordingly.
     */
    MatFormField.prototype._syncDescribedByIds = function () {
        if (this._control) {
            var ids = [];
            if (this._getDisplayedMessages() === 'hint') {
                var startHint = this._hintChildren ?
                    this._hintChildren.find(function (hint) { return hint.align === 'start'; }) : null;
                var endHint = this._hintChildren ?
                    this._hintChildren.find(function (hint) { return hint.align === 'end'; }) : null;
                if (startHint) {
                    ids.push(startHint.id);
                }
                else if (this._hintLabel) {
                    ids.push(this._hintLabelId);
                }
                if (endHint) {
                    ids.push(endHint.id);
                }
            }
            else if (this._errorChildren) {
                ids = this._errorChildren.map(function (error) { return error.id; });
            }
            this._control.setDescribedByIds(ids);
        }
    };
    /**
     * Updates the horizontal offset of the label in the outline appearance. In the outline
     * appearance, the notched-outline and label are not relative to the infix container because
     * the outline intends to surround prefixes, suffixes and the infix. This means that the
     * floating label by default overlaps prefixes in the docked state. To avoid this, we need to
     * horizontally offset the label by the width of the prefix container. The MDC text-field does
     * not need to do this because they use a fixed width for prefixes. Hence, they can simply
     * incorporate the horizontal offset into their default text-field styles.
     */
    MatFormField.prototype._updateOutlineLabelOffset = function () {
        if (!this._platform.isBrowser || !this._hasOutline() || !this._floatingLabel) {
            return;
        }
        var floatingLabel = this._floatingLabel.element;
        // If no prefix is displayed, reset the outline label offset from potential
        // previous label offset updates.
        if (!this._prefixContainer) {
            floatingLabel.style.transform = '';
            return;
        }
        // If the form-field is not attached to the DOM yet (e.g. in a tab), we defer
        // the label offset update until the zone stabilizes.
        if (!this._isAttachedToDom()) {
            this._needsOutlineLabelOffsetUpdateOnStable = true;
            return;
        }
        var prefixContainer = this._prefixContainer.nativeElement;
        // If the directionality is RTL, the x-axis transform needs to be inverted. This
        // is because `transformX` does not change based on the page directionality.
        var labelHorizontalOffset = (this._dir.value === 'rtl' ? -1 : 1) * prefixContainer.getBoundingClientRect().width;
        // Update the transform the floating label to account for the prefix container. Note
        // that we do not want to overwrite the default transform for docked floating labels.
        floatingLabel.style.transform =
            FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM + " translateX(" + labelHorizontalOffset + "px)";
    };
    /** Checks whether the form field is attached to the DOM. */
    MatFormField.prototype._isAttachedToDom = function () {
        var element = this._elementRef.nativeElement;
        if (element.getRootNode) {
            var rootNode = element.getRootNode();
            // If the element is inside the DOM the root node will be either the document
            // or the closest shadow root, otherwise it'll be the element itself.
            return rootNode && rootNode !== element;
        }
        // Otherwise fall back to checking if it's in the document. This doesn't account for
        // shadow DOM, however browser that support shadow DOM should support `getRootNode` as well.
        return document.documentElement.contains(element);
    };
    MatFormField.decorators = [
        { type: Component, args: [{
                    selector: 'mat-form-field',
                    exportAs: 'matFormField',
                    template: "<ng-template #labelTemplate>\n  <!--\n    MDC recommends that the text-field is a `<label>` element. This rather complicates the\n    setup because it would require every form-field control to explicitly set `aria-labelledby`.\n    This is because the `<label>` itself contains more than the actual label (e.g. prefix, suffix\n    or other projected content), and screen readers could potentially read out undesired content.\n    Excluding elements from being printed out requires them to be marked with `aria-hidden`, or\n    the form control is set to a scoped element for the label (using `aria-labelledby`). Both of\n    these options seem to complicate the setup because we know exactly what content is rendered\n    as part of the label, and we don't want to spend resources on walking through projected content\n    to set `aria-hidden`. Nor do we want to set `aria-labelledby` on every form control if we could\n    simply link the label to the control using the label `for` attribute.\n\n    *Note*: We add aria-owns as a workaround for an issue in JAWS & NVDA where the label isn't\n    read if it comes before the control in the DOM.\n  -->\n  <label matFormFieldFloatingLabel [floating]=\"_shouldLabelFloat()\"\n         *ngIf=\"_hasFloatingLabel()\"\n         (cdkObserveContent)=\"_refreshOutlineNotchWidth()\"\n         [cdkObserveContentDisabled]=\"!_hasOutline()\"\n         [id]=\"_labelId\"\n         [attr.for]=\"_control.id\"\n         [attr.aria-owns]=\"_control.id\">\n    <ng-content select=\"mat-label\"></ng-content>\n\n    <!-- Manually handle the required asterisk. This is necessary because MDC can only\n         display the asterisk if the label is directly preceded by the input. This cannot\n         be guaranteed here since the form control is not necessarily an input, or is wrapped.\n      -->\n    <span class=\"mat-mdc-form-field-required-marker\" aria-hidden=\"true\"\n          *ngIf=\"!hideRequiredMarker && _control.required && !_control.disabled\">&#32;*</span>\n  </label>\n</ng-template>\n\n<div class=\"mat-mdc-text-field-wrapper mdc-text-field\" #textField\n     [class.mdc-text-field--outlined]=\"_hasOutline()\"\n     [class.mdc-text-field--no-label]=\"!_hasFloatingLabel()\"\n     [class.mdc-text-field--disabled]=\"_control.disabled\"\n     [class.mdc-text-field--invalid]=\"_control.errorState\"\n     (click)=\"_control.onContainerClick && _control.onContainerClick($event)\">\n  <div class=\"mat-mdc-form-field-focus-overlay\" *ngIf=\"!_hasOutline()\"></div>\n  <div class=\"mat-mdc-form-field-flex\">\n    <div *ngIf=\"_hasOutline()\" matFormFieldNotchedOutline\n         [matFormFieldNotchedOutlineOpen]=\"_shouldLabelFloat()\"\n         [matFormFieldNotchedOutlineWidth]=\"_outlineNotchWidth\">\n      <ng-template [ngIf]=\"!_forceDisplayInfixLabel()\">\n        <ng-template [ngTemplateOutlet]=\"labelTemplate\"></ng-template>\n      </ng-template>\n    </div>\n\n    <div class=\"mat-mdc-form-field-prefix\" *ngIf=\"_prefixChildren.length\" #prefixContainer>\n      <ng-content select=\"[matPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mat-mdc-form-field-infix\">\n      <ng-template [ngIf]=\"!_hasOutline() || _forceDisplayInfixLabel()\">\n        <ng-template [ngTemplateOutlet]=\"labelTemplate\"></ng-template>\n      </ng-template>\n\n      <ng-content></ng-content>\n    </div>\n\n    <div class=\"mat-mdc-form-field-suffix\" *ngIf=\"_suffixChildren.length\">\n      <ng-content select=\"[matSuffix]\"></ng-content>\n    </div>\n  </div>\n\n  <div matFormFieldLineRipple *ngIf=\"!_hasOutline()\"></div>\n</div>\n\n<div class=\"mat-mdc-form-field-subscript-wrapper\"\n     [ngSwitch]=\"_getDisplayedMessages()\">\n  <div *ngSwitchCase=\"'error'\" [@transitionMessages]=\"_subscriptAnimationState\">\n    <ng-content select=\"mat-error\"></ng-content>\n  </div>\n\n  <div class=\"mat-mdc-form-field-hint-wrapper\" *ngSwitchCase=\"'hint'\"\n       [@transitionMessages]=\"_subscriptAnimationState\">\n    <mat-hint *ngIf=\"hintLabel\" [id]=\"_hintLabelId\">{{hintLabel}}</mat-hint>\n    <ng-content select=\"mat-hint:not([align='end'])\"></ng-content>\n    <div class=\"mat-mdc-form-field-hint-spacer\"></div>\n    <ng-content select=\"mat-hint[align='end']\"></ng-content>\n  </div>\n</div>\n",
                    animations: [matFormFieldAnimations.transitionMessages],
                    host: {
                        'class': 'mat-mdc-form-field',
                        '[class.mat-mdc-form-field-label-always-float]': '_shouldAlwaysFloat()',
                        '[class.mat-form-field-invalid]': '_control.errorState',
                        '[class.mat-form-field-disabled]': '_control.disabled',
                        '[class.mat-form-field-autofilled]': '_control.autofilled',
                        '[class.mat-form-field-no-animations]': '_animationMode === "NoopAnimations"',
                        '[class.mat-focused]': '_control.focused',
                        '[class.mat-accent]': 'color == "accent"',
                        '[class.mat-warn]': 'color == "warn"',
                        '[class.ng-untouched]': '_shouldForward("untouched")',
                        '[class.ng-touched]': '_shouldForward("touched")',
                        '[class.ng-pristine]': '_shouldForward("pristine")',
                        '[class.ng-dirty]': '_shouldForward("dirty")',
                        '[class.ng-valid]': '_shouldForward("valid")',
                        '[class.ng-invalid]': '_shouldForward("invalid")',
                        '[class.ng-pending]': '_shouldForward("pending")',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        // Temporary workaround that allows us to test the MDC form-field against
                        // components which inject the non-mdc form-field (e.g. autocomplete).
                        { provide: MatFormField$1, useExisting: MatFormField }
                    ],
                    styles: [".mdc-text-field{height:56px;display:inline-flex;align-items:baseline;border-radius:4px 4px 0 0;display:inline-flex;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-text-field.mdc-text-field--outlined,.mdc-text-field.mdc-text-field--fullwidth,.mdc-text-field.mdc-text-field--textarea,.mdc-text-field.mdc-text-field--no-label{align-items:center}.mdc-text-field.mdc-text-field--outlined::before,.mdc-text-field.mdc-text-field--fullwidth::before,.mdc-text-field.mdc-text-field--textarea::before,.mdc-text-field.mdc-text-field--no-label::before{display:none}.mdc-text-field .mdc-floating-label{left:16px;right:initial;top:50%;transform:translateY(-50%);pointer-events:none}[dir=rtl] .mdc-text-field .mdc-floating-label,.mdc-text-field .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--textarea .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--textarea .mdc-floating-label,.mdc-text-field--textarea .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above{left:40px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above[dir=rtl]{left:initial;right:40px}.mdc-text-field__input{width:100%;height:28px;border:none;border-radius:0;background:none;appearance:none;padding:0}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input:-webkit-autofill{z-index:auto !important}.mdc-text-field__input:-webkit-autofill+.mdc-floating-label{transform:translateY(-50%) scale(0.75);cursor:auto}.mdc-text-field--outlined{overflow:visible}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent;z-index:1}.mdc-text-field--outlined .mdc-text-field__icon{z-index:2}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--outlined.mdc-text-field--dense{height:48px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) scale(1)}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) scale(0.8)}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 7px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{top:14px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__icon{top:12px}.mdc-text-field--with-leading-icon{padding-left:48px;padding-right:16px}.mdc-text-field--with-leading-icon .mdc-text-field__icon--leading{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:48px}.mdc-text-field--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-floating-label,.mdc-text-field--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon--leading{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) translateX(-21px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-134%) translateX(21px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) translateX(-21px) scale(0.8)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-120%) translateX(21px) scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{left:32px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:32px}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:48px}.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing,.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:48px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-right:48px;padding-left:48px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--leading{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}.mdc-text-field--dense .mdc-text-field__icon{bottom:16px;transform:scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--dense{padding-left:44px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon--leading{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense,.mdc-text-field--with-leading-icon.mdc-text-field--dense[dir=rtl]{padding-left:16px;padding-right:44px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label{left:44px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:44px}.mdc-text-field--with-trailing-icon.mdc-text-field--dense{padding-left:16px;padding-right:44px}.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense,.mdc-text-field--with-trailing-icon.mdc-text-field--dense[dir=rtl]{padding-left:44px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense{padding-right:44px;padding-left:44px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--leading{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-70%) scale(0.8)}.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 0}.mdc-text-field__input:required~.mdc-floating-label::after,.mdc-text-field__input:required~.mdc-notched-outline .mdc-floating-label::after{margin-left:1px;content:\"*\"}.mdc-text-field--textarea{display:inline-flex;width:auto;height:auto;padding:0;overflow:visible;transition:none}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--textarea .mdc-floating-label--float-above{transform:translateY(-144%) scale(1)}.mdc-text-field--textarea .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-130%) scale(0.75)}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea .mdc-text-field-character-counter{left:initial;right:16px;position:absolute;bottom:13px}[dir=rtl] .mdc-text-field--textarea .mdc-text-field-character-counter,.mdc-text-field--textarea .mdc-text-field-character-counter[dir=rtl]{left:16px;right:initial}.mdc-text-field--textarea .mdc-text-field__input{align-self:stretch;box-sizing:border-box;height:auto;margin-top:8px;margin-bottom:1px;margin-left:0;margin-right:1px;padding:0 16px 16px}[dir=rtl] .mdc-text-field--textarea .mdc-text-field__input,.mdc-text-field--textarea .mdc-text-field__input[dir=rtl]{margin-left:1px;margin-right:0}.mdc-text-field--textarea .mdc-text-field-character-counter+.mdc-text-field__input{margin-bottom:28px;padding-bottom:0}.mdc-text-field--textarea .mdc-floating-label{top:17px;width:auto;pointer-events:none}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--fullwidth{padding:0;width:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea){display:flex}.mdc-text-field--fullwidth.mdc-text-field--textarea .mdc-text-field__input{resize:vertical}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field--dense+.mdc-text-field-helper-line{margin-bottom:4px}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}.mdc-floating-label{position:absolute;left:0;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / .75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:\"\"}.mdc-line-ripple::before{border-bottom-width:1px;z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mat-mdc-textarea-input{resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field .mdc-floating-label::after{display:none}.mat-mdc-input-element{font:inherit;border:none}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-input-element.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-input-element{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix{padding-top:24px;padding-bottom:12px}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-infix,.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:20px;padding-bottom:16px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mdc-floating-label{left:0;right:0}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75) !important}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-text-field-wrapper .mdc-floating-label{top:28px}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;overflow:hidden}.mat-mdc-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0}.mat-mdc-form-field{display:inline-flex;flex-direction:column}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;min-height:56px;box-sizing:border-box}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--fullwidth .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--fullwidth .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-dense 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-dense 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-70%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-70%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense{0%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl{0%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-textarea{0%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-130%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}\n"]
                }] }
    ];
    /** @nocollapse */
    MatFormField.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Directionality },
        { type: Platform },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_FORM_FIELD_DEFAULT_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_LABEL_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatFormField.propDecorators = {
        _textField: [{ type: ViewChild, args: ['textField',] }],
        _prefixContainer: [{ type: ViewChild, args: ['prefixContainer',] }],
        _floatingLabel: [{ type: ViewChild, args: [MatFormFieldFloatingLabel,] }],
        _notchedOutline: [{ type: ViewChild, args: [MatFormFieldNotchedOutline,] }],
        _lineRipple: [{ type: ViewChild, args: [MatFormFieldLineRipple,] }],
        _labelChildNonStatic: [{ type: ContentChild, args: [MatLabel,] }],
        _labelChildStatic: [{ type: ContentChild, args: [MatLabel, { static: true },] }],
        _formFieldControl: [{ type: ContentChild, args: [MatFormFieldControl,] }],
        _prefixChildren: [{ type: ContentChildren, args: [MatPrefix, { descendants: true },] }],
        _suffixChildren: [{ type: ContentChildren, args: [MatSuffix, { descendants: true },] }],
        _errorChildren: [{ type: ContentChildren, args: [MatError, { descendants: true },] }],
        _hintChildren: [{ type: ContentChildren, args: [MatHint, { descendants: true },] }],
        hideRequiredMarker: [{ type: Input }],
        color: [{ type: Input }],
        floatLabel: [{ type: Input }],
        appearance: [{ type: Input }],
        hintLabel: [{ type: Input }]
    };
    return MatFormField;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatFormFieldModule = /** @class */ (function () {
    function MatFormFieldModule() {
    }
    MatFormFieldModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MatCommonModule,
                        CommonModule,
                        ObserversModule
                    ],
                    exports: [
                        MatFormField,
                        MatLabel,
                        MatHint,
                        MatError,
                        MatPrefix,
                        MatSuffix,
                        MatCommonModule
                    ],
                    declarations: [
                        MatFormField,
                        MatLabel,
                        MatError,
                        MatHint,
                        MatPrefix,
                        MatSuffix,
                        MatFormFieldFloatingLabel,
                        MatFormFieldNotchedOutline,
                        MatFormFieldLineRipple
                    ],
                },] }
    ];
    return MatFormFieldModule;
}());

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel, MatPrefix, MatSuffix, MatFormFieldFloatingLabel as ɵangular_material_src_material_experimental_mdc_form_field_mdc_form_field_a, MatFormFieldNotchedOutline as ɵangular_material_src_material_experimental_mdc_form_field_mdc_form_field_b, MatFormFieldLineRipple as ɵangular_material_src_material_experimental_mdc_form_field_mdc_form_field_c };
//# sourceMappingURL=mdc-form-field.js.map
