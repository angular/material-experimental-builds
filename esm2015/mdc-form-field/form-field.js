/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-form-field/form-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, Inject, InjectionToken, Input, isDevMode, NgZone, Optional, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { getMatFormFieldDuplicatedHintError, getMatFormFieldMissingControlError, MAT_FORM_FIELD, matFormFieldAnimations, MatFormFieldControl, } from '@angular/material/form-field';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCTextFieldFoundation, numbers as mdcTextFieldNumbers } from '@material/textfield';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatError } from './directives/error';
import { MatFormFieldFloatingLabel } from './directives/floating-label';
import { MatHint } from './directives/hint';
import { MatLabel } from './directives/label';
import { MatFormFieldLineRipple } from './directives/line-ripple';
import { MatFormFieldNotchedOutline } from './directives/notched-outline';
import { MatPrefix } from './directives/prefix';
import { MatSuffix } from './directives/suffix';
/**
 * Represents the default options for the form field that can be configured
 * using the `MAT_FORM_FIELD_DEFAULT_OPTIONS` injection token.
 * @record
 */
export function MatFormFieldDefaultOptions() { }
if (false) {
    /** @type {?|undefined} */
    MatFormFieldDefaultOptions.prototype.appearance;
    /** @type {?|undefined} */
    MatFormFieldDefaultOptions.prototype.hideRequiredMarker;
}
/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 * @type {?}
 */
export const MAT_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken('MAT_FORM_FIELD_DEFAULT_OPTIONS');
/** @type {?} */
let nextUniqueId = 0;
/**
 * Default appearance used by the form-field.
 * @type {?}
 */
const DEFAULT_APPEARANCE = 'fill';
/**
 * Default appearance used by the form-field.
 * @type {?}
 */
const DEFAULT_FLOAT_LABEL = 'auto';
/**
 * Default transform for docked floating labels in a MDC text-field. This value has been
 * extracted from the MDC text-field styles because we programmatically modify the docked
 * label transform, but do not want to accidentally discard the default label transform.
 * @type {?}
 */
const FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM = `translateY(-50%)`;
/**
 * Container for form controls that applies Material Design styling and behavior.
 */
let MatFormField = /** @class */ (() => {
    /**
     * Container for form controls that applies Material Design styling and behavior.
     */
    class MatFormField {
        /**
         * @param {?} _elementRef
         * @param {?} _changeDetectorRef
         * @param {?} _ngZone
         * @param {?} _dir
         * @param {?} _platform
         * @param {?=} _defaults
         * @param {?=} _labelOptions
         * @param {?=} _animationMode
         */
        constructor(_elementRef, _changeDetectorRef, _ngZone, _dir, _platform, _defaults, _labelOptions, _animationMode) {
            this._elementRef = _elementRef;
            this._changeDetectorRef = _changeDetectorRef;
            this._ngZone = _ngZone;
            this._dir = _dir;
            this._platform = _platform;
            this._defaults = _defaults;
            this._labelOptions = _labelOptions;
            this._animationMode = _animationMode;
            /**
             * Whether the required marker should be hidden.
             */
            this.hideRequiredMarker = false;
            /**
             * The color palette for the form-field.
             */
            this.color = 'primary';
            this._appearance = DEFAULT_APPEARANCE;
            this._hintLabel = '';
            // Unique id for the hint label.
            this._hintLabelId = `mat-mdc-hint-${nextUniqueId++}`;
            // Unique id for the internal form field label.
            this._labelId = `mat-mdc-form-field-label-${nextUniqueId++}`;
            /**
             * State of the mat-hint and mat-error animations.
             */
            this._subscriptAnimationState = '';
            this._destroyed = new Subject();
            this._isFocused = null;
            this._needsOutlineLabelOffsetUpdateOnStable = false;
            this._adapter = {
                addClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                className => this._textField.nativeElement.classList.add(className)),
                removeClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                className => this._textField.nativeElement.classList.remove(className)),
                hasClass: (/**
                 * @param {?} className
                 * @return {?}
                 */
                className => this._textField.nativeElement.classList.contains(className)),
                hasLabel: (/**
                 * @return {?}
                 */
                () => this._hasFloatingLabel()),
                isFocused: (/**
                 * @return {?}
                 */
                () => this._control.focused),
                hasOutline: (/**
                 * @return {?}
                 */
                () => this._hasOutline()),
                // MDC text-field will call this method on focus, blur and value change. It expects us
                // to update the floating label state accordingly. Though we make this a noop because we
                // want to react to floating label state changes through change detection. Relying on this
                // adapter method would mean that the label would not update if the custom form-field control
                // sets "shouldLabelFloat" to true, or if the "floatLabel" input binding changes to "always".
                floatLabel: (/**
                 * @return {?}
                 */
                () => { }),
                // Label shaking is not supported yet. It will require a new API for form field
                // controls to trigger the shaking. This can be a feature in the future.
                // TODO(devversion): explore options on how to integrate label shaking.
                shakeLabel: (/**
                 * @return {?}
                 */
                () => { }),
                // MDC by default updates the notched-outline whenever the text-field receives focus, or
                // is being blurred. It also computes the label width every time the notch is opened or
                // closed. This works fine in the standard MDC text-field, but not in Angular where the
                // floating label could change through interpolation. We want to be able to update the
                // notched outline whenever the label content changes. Additionally, relying on focus or
                // blur to open and close the notch does not work for us since abstract form-field controls
                // have the ability to control the floating label state (i.e. `shouldLabelFloat`), and we
                // want to update the notch whenever the `_shouldLabelFloat()` value changes.
                getLabelWidth: (/**
                 * @return {?}
                 */
                () => 0),
                // TODO: MDC now supports setting the required asterisk marker directly on
                // the label component. This adapter method may be implemented and
                // mat-mdc-form-field-required-marker removed.
                setLabelRequired: (/**
                 * @return {?}
                 */
                () => { }),
                notchOutline: (/**
                 * @return {?}
                 */
                () => { }),
                closeOutline: (/**
                 * @return {?}
                 */
                () => { }),
                activateLineRipple: (/**
                 * @return {?}
                 */
                () => this._lineRipple && this._lineRipple.activate()),
                deactivateLineRipple: (/**
                 * @return {?}
                 */
                () => this._lineRipple && this._lineRipple.deactivate()),
                // The foundation tries to register events on the input. This is not matching
                // our concept of abstract form field controls. We handle each event manually
                // in "stateChanges" based on the form-field control state. The following events
                // need to be handled: focus, blur. We do not handle the "input" event since
                // that one is only needed for the text-field character count, which we do
                // not implement as part of the form-field, but should be implemented manually
                // by consumers using template bindings.
                registerInputInteractionHandler: (/**
                 * @return {?}
                 */
                () => { }),
                deregisterInputInteractionHandler: (/**
                 * @return {?}
                 */
                () => { }),
                // We do not have a reference to the native input since we work with abstract form field
                // controls. MDC needs a reference to the native input optionally to handle character
                // counting and value updating. These are both things we do not handle from within the
                // form-field, so we can just return null.
                getNativeInput: (/**
                 * @return {?}
                 */
                () => null),
                // This method will never be called since we do not have the ability to add event listeners
                // to the native input. This is because the form control is not necessarily an input, and
                // the form field deals with abstract form controls of any type.
                setLineRippleTransformOrigin: (/**
                 * @return {?}
                 */
                () => { }),
                // The foundation tries to register click and keyboard events on the form-field to figure out
                // if the input value changes through user interaction. Based on that, the foundation tries
                // to focus the input. Since we do not handle the input value as part of the form-field, nor
                // it's guaranteed to be an input (see adapter methods above), this is a noop.
                deregisterTextFieldInteractionHandler: (/**
                 * @return {?}
                 */
                () => { }),
                registerTextFieldInteractionHandler: (/**
                 * @return {?}
                 */
                () => { }),
                // The foundation tries to setup a "MutationObserver" in order to watch for attributes
                // like "maxlength" or "pattern" to change. The foundation will update the validity state
                // based on that. We do not need this logic since we handle the validity through the
                // abstract form control instance.
                deregisterValidationAttributeChangeHandler: (/**
                 * @return {?}
                 */
                () => { }),
                registerValidationAttributeChangeHandler: (/**
                 * @return {?}
                 */
                () => (/** @type {?} */ (null))),
            };
            if (_defaults && _defaults.appearance) {
                this.appearance = _defaults.appearance;
            }
            else if (_defaults && _defaults.hideRequiredMarker) {
                this.hideRequiredMarker = true;
            }
        }
        /**
         * Whether the label should always float or float as the user types.
         * @return {?}
         */
        get floatLabel() {
            return this._floatLabel || (this._labelOptions && this._labelOptions.float)
                || DEFAULT_FLOAT_LABEL;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set floatLabel(value) {
            if (value !== this._floatLabel) {
                this._floatLabel = value;
                // For backwards compatibility. Custom form-field controls or directives might set
                // the "floatLabel" input and expect the form-field view to be updated automatically.
                // e.g. autocomplete trigger. Ideally we'd get rid of this and the consumers would just
                // emit the "stateChanges" observable. TODO(devversion): consider removing.
                this._changeDetectorRef.markForCheck();
            }
        }
        /**
         * The form-field appearance style.
         * @return {?}
         */
        get appearance() { return this._appearance; }
        /**
         * @param {?} value
         * @return {?}
         */
        set appearance(value) {
            /** @type {?} */
            const oldValue = this._appearance;
            this._appearance = value || (this._defaults && this._defaults.appearance) || DEFAULT_APPEARANCE;
            // If the appearance has been switched to `outline`, the label offset needs to be updated.
            // The update can happen once the view has been re-checked, but not immediately because
            // the view has not been updated and the notched-outline floating label is not present.
            if (this._appearance === 'outline' && this._appearance !== oldValue) {
                this._needsOutlineLabelOffsetUpdateOnStable = true;
            }
        }
        /**
         * Text for the form field hint.
         * @return {?}
         */
        get hintLabel() { return this._hintLabel; }
        /**
         * @param {?} value
         * @return {?}
         */
        set hintLabel(value) {
            this._hintLabel = value;
            this._processHints();
        }
        /**
         * Gets the current form field control
         * @return {?}
         */
        get _control() {
            return this._explicitFormFieldControl || this._formFieldControl;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set _control(value) { this._explicitFormFieldControl = value; }
        /**
         * @return {?}
         */
        ngAfterViewInit() {
            this._foundation = new MDCTextFieldFoundation(this._adapter);
            // MDC uses the "shouldFloat" getter to know whether the label is currently floating. This
            // does not match our implementation of when the label floats because we support more cases.
            // For example, consumers can set "@Input floatLabel" to always, or the custom form-field
            // control can set "MatFormFieldControl#shouldLabelFloat" to true. To ensure that MDC knows
            // when the label is floating, we overwrite the property to be based on the method we use to
            // determine the current state of the floating label.
            Object.defineProperty(this._foundation, 'shouldFloat', {
                get: (/**
                 * @return {?}
                 */
                () => this._shouldLabelFloat()),
            });
            // By default, the foundation determines the validity of the text-field from the
            // specified native input. Since we don't pass a native input to the foundation because
            // abstract form controls are not necessarily consisting of an input, we handle the
            // text-field validity through the abstract form-field control state.
            this._foundation.isValid = (/**
             * @return {?}
             */
            () => !this._control.errorState);
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
        }
        /**
         * @return {?}
         */
        ngAfterContentInit() {
            this._assertFormFieldControl();
            this._initializeControl();
            this._initializeSubscript();
            this._initializePrefixAndSuffix();
            this._initializeOutlineLabelOffsetSubscriptions();
        }
        /**
         * @return {?}
         */
        ngAfterContentChecked() {
            this._assertFormFieldControl();
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this._destroyed.next();
            this._destroyed.complete();
        }
        /**
         * Gets an ElementRef for the element that a overlay attached to the form-field
         * should be positioned relative to.
         * @return {?}
         */
        getConnectedOverlayOrigin() {
            return this._textField || this._elementRef;
        }
        /**
         * Animates the placeholder up and locks it in position.
         * @return {?}
         */
        _animateAndLockLabel() {
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
        }
        /**
         * Initializes the registered form-field control.
         * @private
         * @return {?}
         */
        _initializeControl() {
            /** @type {?} */
            const control = this._control;
            if (control.controlType) {
                this._elementRef.nativeElement.classList.add(`mat-mdc-form-field-type-${control.controlType}`);
            }
            // Subscribe to changes in the child control state in order to update the form field UI.
            control.stateChanges.subscribe((/**
             * @return {?}
             */
            () => {
                this._updateFocusState();
                this._syncDescribedByIds();
                this._changeDetectorRef.markForCheck();
            }));
            // Run change detection if the value changes.
            if (control.ngControl && control.ngControl.valueChanges) {
                control.ngControl.valueChanges
                    .pipe(takeUntil(this._destroyed))
                    .subscribe((/**
                 * @return {?}
                 */
                () => this._changeDetectorRef.markForCheck()));
            }
        }
        /**
         * Initializes the prefix and suffix containers.
         * @private
         * @return {?}
         */
        _initializePrefixAndSuffix() {
            // Mark the form-field as dirty whenever the prefix or suffix children change. This
            // is necessary because we conditionally display the prefix/suffix containers based
            // on whether there is projected content.
            merge(this._prefixChildren.changes, this._suffixChildren.changes)
                .subscribe((/**
             * @return {?}
             */
            () => this._changeDetectorRef.markForCheck()));
        }
        /**
         * Initializes the subscript by validating hints and synchronizing "aria-describedby" ids
         * with the custom form-field control. Also subscribes to hint and error changes in order
         * to be able to validate and synchronize ids on change.
         * @private
         * @return {?}
         */
        _initializeSubscript() {
            // Re-validate when the number of hints changes.
            this._hintChildren.changes.subscribe((/**
             * @return {?}
             */
            () => {
                this._processHints();
                this._changeDetectorRef.markForCheck();
            }));
            // Update the aria-described by when the number of errors changes.
            this._errorChildren.changes.subscribe((/**
             * @return {?}
             */
            () => {
                this._syncDescribedByIds();
                this._changeDetectorRef.markForCheck();
            }));
            // Initial mat-hint validation and subscript describedByIds sync.
            this._validateHints();
            this._syncDescribedByIds();
        }
        /**
         * Throws an error if the form field's control is missing.
         * @private
         * @return {?}
         */
        _assertFormFieldControl() {
            if (!this._control) {
                throw getMatFormFieldMissingControlError();
            }
        }
        /**
         * @private
         * @return {?}
         */
        _updateFocusState() {
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
        }
        /**
         * The floating label in the docked state needs to account for prefixes. The horizontal offset
         * is calculated whenever the appearance changes to `outline`, the prefixes change, or when the
         * form-field is added to the DOM. This method sets up all subscriptions which are needed to
         * trigger the label offset update. In general, we want to avoid performing measurements often,
         * so we rely on the `NgZone` as indicator when the offset should be recalculated, instead of
         * checking every change detection cycle.
         * @private
         * @return {?}
         */
        _initializeOutlineLabelOffsetSubscriptions() {
            // Whenever the prefix changes, schedule an update of the label offset.
            this._prefixChildren.changes
                .subscribe((/**
             * @return {?}
             */
            () => this._needsOutlineLabelOffsetUpdateOnStable = true));
            // Note that we have to run outside of the `NgZone` explicitly, in order to avoid
            // throwing users into an infinite loop if `zone-patch-rxjs` is included.
            this._ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this._ngZone.onStable.asObservable().pipe(takeUntil(this._destroyed)).subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (this._needsOutlineLabelOffsetUpdateOnStable) {
                        this._needsOutlineLabelOffsetUpdateOnStable = false;
                        this._updateOutlineLabelOffset();
                    }
                }));
            }));
            this._dir.change.pipe(takeUntil(this._destroyed))
                .subscribe((/**
             * @return {?}
             */
            () => this._needsOutlineLabelOffsetUpdateOnStable = true));
        }
        /**
         * Whether the floating label should always float or not.
         * @return {?}
         */
        _shouldAlwaysFloat() {
            return this.floatLabel === 'always';
        }
        /**
         * @return {?}
         */
        _hasOutline() {
            return this.appearance === 'outline';
        }
        /**
         * Whether the label should display in the infix. Labels in the outline appearance are
         * displayed as part of the notched-outline and are horizontally offset to account for
         * form-field prefix content. This won't work in server side rendering since we cannot
         * measure the width of the prefix container. To make the docked label appear as if the
         * right offset has been calculated, we forcibly render the label inside the infix. Since
         * the label is part of the infix, the label cannot overflow the prefix content.
         * @return {?}
         */
        _forceDisplayInfixLabel() {
            return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat();
        }
        /**
         * @return {?}
         */
        _hasFloatingLabel() {
            return !!this._labelChildNonStatic || !!this._labelChildStatic;
        }
        /**
         * @return {?}
         */
        _shouldLabelFloat() {
            return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
        }
        /**
         * Determines whether a class from the NgControl should be forwarded to the host element.
         * @param {?} prop
         * @return {?}
         */
        _shouldForward(prop) {
            /** @type {?} */
            const ngControl = this._control ? this._control.ngControl : null;
            return ngControl && ngControl[prop];
        }
        /**
         * Determines whether to display hints or errors.
         * @return {?}
         */
        _getDisplayedMessages() {
            return (this._errorChildren && this._errorChildren.length > 0 &&
                this._control.errorState) ? 'error' : 'hint';
        }
        /**
         * Refreshes the width of the outline-notch, if present.
         * @return {?}
         */
        _refreshOutlineNotchWidth() {
            if (!this._hasOutline() || !this._floatingLabel) {
                return;
            }
            // The outline notch should be based on the label width, but needs to respect the scaling
            // applied to the label if it actively floats. Since the label always floats when the notch
            // is open, the MDC text-field floating label scaling is respected in notch width calculation.
            this._outlineNotchWidth = this._floatingLabel.getWidth() * mdcTextFieldNumbers.LABEL_SCALE;
        }
        /**
         * Does any extra processing that is required when handling the hints.
         * @private
         * @return {?}
         */
        _processHints() {
            this._validateHints();
            this._syncDescribedByIds();
        }
        /**
         * Ensure that there is a maximum of one of each "mat-hint" alignment specified. The hint
         * label specified set through the input is being considered as "start" aligned.
         *
         * This method is a noop if Angular runs in production mode.
         * @private
         * @return {?}
         */
        _validateHints() {
            if (isDevMode() && this._hintChildren) {
                /** @type {?} */
                let startHint;
                /** @type {?} */
                let endHint;
                this._hintChildren.forEach((/**
                 * @param {?} hint
                 * @return {?}
                 */
                (hint) => {
                    if (hint.align === 'start') {
                        if (startHint || this.hintLabel) {
                            throw getMatFormFieldDuplicatedHintError('start');
                        }
                        startHint = hint;
                    }
                    else if (hint.align === 'end') {
                        if (endHint) {
                            throw getMatFormFieldDuplicatedHintError('end');
                        }
                        endHint = hint;
                    }
                }));
            }
        }
        /**
         * Sets the list of element IDs that describe the child control. This allows the control to update
         * its `aria-describedby` attribute accordingly.
         * @private
         * @return {?}
         */
        _syncDescribedByIds() {
            if (this._control) {
                /** @type {?} */
                let ids = [];
                if (this._getDisplayedMessages() === 'hint') {
                    /** @type {?} */
                    const startHint = this._hintChildren ?
                        this._hintChildren.find((/**
                         * @param {?} hint
                         * @return {?}
                         */
                        hint => hint.align === 'start')) : null;
                    /** @type {?} */
                    const endHint = this._hintChildren ?
                        this._hintChildren.find((/**
                         * @param {?} hint
                         * @return {?}
                         */
                        hint => hint.align === 'end')) : null;
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
                    ids = this._errorChildren.map((/**
                     * @param {?} error
                     * @return {?}
                     */
                    error => error.id));
                }
                this._control.setDescribedByIds(ids);
            }
        }
        /**
         * Updates the horizontal offset of the label in the outline appearance. In the outline
         * appearance, the notched-outline and label are not relative to the infix container because
         * the outline intends to surround prefixes, suffixes and the infix. This means that the
         * floating label by default overlaps prefixes in the docked state. To avoid this, we need to
         * horizontally offset the label by the width of the prefix container. The MDC text-field does
         * not need to do this because they use a fixed width for prefixes. Hence, they can simply
         * incorporate the horizontal offset into their default text-field styles.
         * @private
         * @return {?}
         */
        _updateOutlineLabelOffset() {
            if (!this._platform.isBrowser || !this._hasOutline() || !this._floatingLabel) {
                return;
            }
            /** @type {?} */
            const floatingLabel = this._floatingLabel.element;
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
            /** @type {?} */
            const prefixContainer = (/** @type {?} */ (this._prefixContainer.nativeElement));
            // If the directionality is RTL, the x-axis transform needs to be inverted. This
            // is because `transformX` does not change based on the page directionality.
            /** @type {?} */
            const labelHorizontalOffset = (this._dir.value === 'rtl' ? -1 : 1) * prefixContainer.getBoundingClientRect().width;
            // Update the transform the floating label to account for the prefix container. Note
            // that we do not want to overwrite the default transform for docked floating labels.
            floatingLabel.style.transform =
                `${FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM} translateX(${labelHorizontalOffset}px)`;
        }
        /**
         * Checks whether the form field is attached to the DOM.
         * @private
         * @return {?}
         */
        _isAttachedToDom() {
            /** @type {?} */
            const element = this._elementRef.nativeElement;
            if (element.getRootNode) {
                /** @type {?} */
                const rootNode = element.getRootNode();
                // If the element is inside the DOM the root node will be either the document
                // or the closest shadow root, otherwise it'll be the element itself.
                return rootNode && rootNode !== element;
            }
            // Otherwise fall back to checking if it's in the document. This doesn't account for
            // shadow DOM, however browser that support shadow DOM should support `getRootNode` as well.
            return (/** @type {?} */ (document.documentElement)).contains(element);
        }
    }
    MatFormField.decorators = [
        { type: Component, args: [{
                    selector: 'mat-form-field',
                    exportAs: 'matFormField',
                    template: "<ng-template #labelTemplate>\n  <!--\n    MDC recommends that the text-field is a `<label>` element. This rather complicates the\n    setup because it would require every form-field control to explicitly set `aria-labelledby`.\n    This is because the `<label>` itself contains more than the actual label (e.g. prefix, suffix\n    or other projected content), and screen readers could potentially read out undesired content.\n    Excluding elements from being printed out requires them to be marked with `aria-hidden`, or\n    the form control is set to a scoped element for the label (using `aria-labelledby`). Both of\n    these options seem to complicate the setup because we know exactly what content is rendered\n    as part of the label, and we don't want to spend resources on walking through projected content\n    to set `aria-hidden`. Nor do we want to set `aria-labelledby` on every form control if we could\n    simply link the label to the control using the label `for` attribute.\n\n    *Note*: We add aria-owns as a workaround for an issue in JAWS & NVDA where the label isn't\n    read if it comes before the control in the DOM.\n  -->\n  <label matFormFieldFloatingLabel [floating]=\"_shouldLabelFloat()\"\n         *ngIf=\"_hasFloatingLabel()\"\n         (cdkObserveContent)=\"_refreshOutlineNotchWidth()\"\n         [cdkObserveContentDisabled]=\"!_hasOutline()\"\n         [id]=\"_labelId\"\n         [attr.for]=\"_control.id\"\n         [attr.aria-owns]=\"_control.id\">\n    <ng-content select=\"mat-label\"></ng-content>\n\n    <!-- Manually handle the required asterisk. This is necessary because MDC can only\n         display the asterisk if the label is directly preceded by the input. This cannot\n         be guaranteed here since the form control is not necessarily an input, or is wrapped.\n      -->\n    <span class=\"mat-mdc-form-field-required-marker\" aria-hidden=\"true\"\n          *ngIf=\"!hideRequiredMarker && _control.required && !_control.disabled\">&#32;*</span>\n  </label>\n</ng-template>\n\n<div class=\"mat-mdc-text-field-wrapper mdc-text-field\" #textField\n     [class.mdc-text-field--filled]=\"!_hasOutline()\"\n     [class.mdc-text-field--outlined]=\"_hasOutline()\"\n     [class.mdc-text-field--no-label]=\"!_hasFloatingLabel()\"\n     [class.mdc-text-field--disabled]=\"_control.disabled\"\n     [class.mdc-text-field--invalid]=\"_control.errorState\"\n     (click)=\"_control.onContainerClick && _control.onContainerClick($event)\">\n  <div class=\"mat-mdc-form-field-focus-overlay\" *ngIf=\"!_hasOutline()\"></div>\n  <div class=\"mat-mdc-form-field-flex\">\n    <div *ngIf=\"_hasOutline()\" matFormFieldNotchedOutline\n         [matFormFieldNotchedOutlineOpen]=\"_shouldLabelFloat()\"\n         [matFormFieldNotchedOutlineWidth]=\"_outlineNotchWidth\">\n      <ng-template [ngIf]=\"!_forceDisplayInfixLabel()\">\n        <ng-template [ngTemplateOutlet]=\"labelTemplate\"></ng-template>\n      </ng-template>\n    </div>\n\n    <div class=\"mat-mdc-form-field-prefix\" *ngIf=\"_prefixChildren.length\" #prefixContainer>\n      <ng-content select=\"[matPrefix]\"></ng-content>\n    </div>\n\n    <div class=\"mat-mdc-form-field-infix\">\n      <ng-template [ngIf]=\"!_hasOutline() || _forceDisplayInfixLabel()\">\n        <ng-template [ngTemplateOutlet]=\"labelTemplate\"></ng-template>\n      </ng-template>\n\n      <ng-content></ng-content>\n    </div>\n\n    <div class=\"mat-mdc-form-field-suffix\" *ngIf=\"_suffixChildren.length\">\n      <ng-content select=\"[matSuffix]\"></ng-content>\n    </div>\n  </div>\n\n  <div matFormFieldLineRipple *ngIf=\"!_hasOutline()\"></div>\n</div>\n\n<div class=\"mat-mdc-form-field-subscript-wrapper\"\n     [ngSwitch]=\"_getDisplayedMessages()\">\n  <div *ngSwitchCase=\"'error'\" [@transitionMessages]=\"_subscriptAnimationState\">\n    <ng-content select=\"mat-error\"></ng-content>\n  </div>\n\n  <div class=\"mat-mdc-form-field-hint-wrapper\" *ngSwitchCase=\"'hint'\"\n       [@transitionMessages]=\"_subscriptAnimationState\">\n    <mat-hint *ngIf=\"hintLabel\" [id]=\"_hintLabelId\">{{hintLabel}}</mat-hint>\n    <ng-content select=\"mat-hint:not([align='end'])\"></ng-content>\n    <div class=\"mat-mdc-form-field-hint-spacer\"></div>\n    <ng-content select=\"mat-hint[align='end']\"></ng-content>\n  </div>\n</div>\n",
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
                        { provide: MAT_FORM_FIELD, useExisting: MatFormField },
                    ],
                    styles: [".mdc-text-field{border-radius:4px 4px 0 0;padding:0 16px;display:inline-flex;align-items:baseline;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field.mdc-text-field--with-leading-icon,.mdc-text-field.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field.mdc-text-field--with-trailing-icon,.mdc-text-field.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}[dir=rtl] .mdc-text-field.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon,.mdc-text-field.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input:-webkit-autofill{z-index:auto !important}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field__input:-webkit-autofill+.mdc-floating-label{transform:translateY(-50%) scale(0.75);cursor:auto}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--textarea{flex-direction:column;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:18px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:\"\";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fit-available;overflow:hidden;resize:both}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--fullwidth{padding:0;width:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea){display:flex}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__input{height:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-floating-label{display:none}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea)::before{display:none}.mdc-text-field--fullwidth.mdc-text-field--textarea .mdc-text-field__resizer{resize:vertical}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:\"*\"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / .75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:\"\"}.mdc-line-ripple::before{border-bottom-width:1px;z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mat-mdc-textarea-input{resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field .mdc-floating-label::after{display:none}.mat-mdc-input-element{font:inherit;border:none}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-input-element.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-input-element{height:auto}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mdc-floating-label{left:0;right:0}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;overflow:hidden}.mat-mdc-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0}select.mat-mdc-input-element{-moz-appearance:none;-webkit-appearance:none;background-color:transparent;display:inline-flex;box-sizing:border-box}select.mat-mdc-input-element::-ms-expand{display:none}select.mat-mdc-input-element:not(:disabled){cursor:pointer}select.mat-mdc-input-element::-ms-value{color:inherit;background:none}.mat-focused .cdk-high-contrast-active select.mat-mdc-input-element::-ms-value{color:inherit}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:\"\";width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;pointer-events:none}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select .mat-mdc-input-element{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-input-element{padding-right:0;padding-left:15px}.mat-mdc-form-field{display:inline-flex;flex-direction:column}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--fullwidth .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--fullwidth .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}\n"]
                }] }
    ];
    /** @nocollapse */
    MatFormField.ctorParameters = () => [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Directionality },
        { type: Platform },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_FORM_FIELD_DEFAULT_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_LABEL_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
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
})();
export { MatFormField };
if (false) {
    /** @type {?} */
    MatFormField.prototype._textField;
    /** @type {?} */
    MatFormField.prototype._prefixContainer;
    /** @type {?} */
    MatFormField.prototype._floatingLabel;
    /** @type {?} */
    MatFormField.prototype._notchedOutline;
    /** @type {?} */
    MatFormField.prototype._lineRipple;
    /** @type {?} */
    MatFormField.prototype._labelChildNonStatic;
    /** @type {?} */
    MatFormField.prototype._labelChildStatic;
    /** @type {?} */
    MatFormField.prototype._formFieldControl;
    /** @type {?} */
    MatFormField.prototype._prefixChildren;
    /** @type {?} */
    MatFormField.prototype._suffixChildren;
    /** @type {?} */
    MatFormField.prototype._errorChildren;
    /** @type {?} */
    MatFormField.prototype._hintChildren;
    /**
     * Whether the required marker should be hidden.
     * @type {?}
     */
    MatFormField.prototype.hideRequiredMarker;
    /**
     * The color palette for the form-field.
     * @type {?}
     */
    MatFormField.prototype.color;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._floatLabel;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._appearance;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._hintLabel;
    /** @type {?} */
    MatFormField.prototype._hintLabelId;
    /** @type {?} */
    MatFormField.prototype._labelId;
    /**
     * State of the mat-hint and mat-error animations.
     * @type {?}
     */
    MatFormField.prototype._subscriptAnimationState;
    /**
     * Width of the outline notch.
     * @type {?}
     */
    MatFormField.prototype._outlineNotchWidth;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._destroyed;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._isFocused;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._explicitFormFieldControl;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._foundation;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._needsOutlineLabelOffsetUpdateOnStable;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._platform;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._defaults;
    /**
     * @type {?}
     * @private
     */
    MatFormField.prototype._labelOptions;
    /** @type {?} */
    MatFormField.prototype._animationMode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFJTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUVOLFFBQVEsRUFDUixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBRUwsd0JBQXdCLEVBRXpCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNMLGtDQUFrQyxFQUNsQyxrQ0FBa0MsRUFDbEMsY0FBYyxFQUNkLHNCQUFzQixFQUN0QixtQkFBbUIsR0FDcEIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBRUwsc0JBQXNCLEVBQ3RCLE9BQU8sSUFBSSxtQkFBbUIsRUFDL0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBWTlDLGdEQUdDOzs7SUFGQyxnREFBb0M7O0lBQ3BDLHdEQUE2Qjs7Ozs7OztBQU8vQixNQUFNLE9BQU8sOEJBQThCLEdBQ3pDLElBQUksY0FBYyxDQUE2QixnQ0FBZ0MsQ0FBQzs7SUFFOUUsWUFBWSxHQUFHLENBQUM7Ozs7O01BR2Qsa0JBQWtCLEdBQTJCLE1BQU07Ozs7O01BR25ELG1CQUFtQixHQUFtQixNQUFNOzs7Ozs7O01BTzVDLHVDQUF1QyxHQUFHLGtCQUFrQjs7OztBQUdsRTs7OztJQUFBLE1BOEJhLFlBQVk7Ozs7Ozs7Ozs7O1FBb0t2QixZQUFvQixXQUF1QixFQUN2QixrQkFBcUMsRUFDckMsT0FBZSxFQUNmLElBQW9CLEVBQ3BCLFNBQW1CLEVBRW5CLFNBQXNDLEVBQ1EsYUFBNEIsRUFDaEMsY0FBdUI7WUFSakUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7WUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtZQUNyQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQ2YsU0FBSSxHQUFKLElBQUksQ0FBZ0I7WUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtZQUVuQixjQUFTLEdBQVQsU0FBUyxDQUE2QjtZQUNRLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1lBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFTOzs7O1lBM0o1RSx1QkFBa0IsR0FBWSxLQUFLLENBQUM7Ozs7WUFHcEMsVUFBSyxHQUFpQixTQUFTLENBQUM7WUFpQ2pDLGdCQUFXLEdBQTJCLGtCQUFrQixDQUFDO1lBU3pELGVBQVUsR0FBRyxFQUFFLENBQUM7O1lBR3hCLGlCQUFZLEdBQUcsZ0JBQWdCLFlBQVksRUFBRSxFQUFFLENBQUM7O1lBR2hELGFBQVEsR0FBRyw0QkFBNEIsWUFBWSxFQUFFLEVBQUUsQ0FBQzs7OztZQUd4RCw2QkFBd0IsR0FBRyxFQUFFLENBQUM7WUFXdEIsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7WUFDakMsZUFBVSxHQUFpQixJQUFJLENBQUM7WUFHaEMsMkNBQXNDLEdBQUcsS0FBSyxDQUFDO1lBQy9DLGFBQVEsR0FBd0I7Z0JBQ3RDLFFBQVE7Ozs7Z0JBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUM3RSxXQUFXOzs7O2dCQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDbkYsUUFBUTs7OztnQkFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBRWxGLFFBQVE7OztnQkFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtnQkFDeEMsU0FBUzs7O2dCQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFBO2dCQUN0QyxVQUFVOzs7Z0JBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7Ozs7Z0JBT3BDLFVBQVU7OztnQkFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7Ozs7Z0JBS3BCLFVBQVU7OztnQkFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7Ozs7Ozs7OztnQkFVcEIsYUFBYTs7O2dCQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTs7OztnQkFLdEIsZ0JBQWdCOzs7Z0JBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBO2dCQUMxQixZQUFZOzs7Z0JBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBO2dCQUN0QixZQUFZOzs7Z0JBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBO2dCQUV0QixrQkFBa0I7OztnQkFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUE7Z0JBQ3pFLG9CQUFvQjs7O2dCQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQTs7Ozs7Ozs7Z0JBUzdFLCtCQUErQjs7O2dCQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTtnQkFDekMsaUNBQWlDOzs7Z0JBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBOzs7OztnQkFNM0MsY0FBYzs7O2dCQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7OztnQkFLMUIsNEJBQTRCOzs7Z0JBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBOzs7OztnQkFNdEMscUNBQXFDOzs7Z0JBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBO2dCQUMvQyxtQ0FBbUM7OztnQkFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7Ozs7O2dCQU03QywwQ0FBMEM7OztnQkFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7Z0JBQ3BELHdDQUF3Qzs7O2dCQUFFLEdBQUcsRUFBRSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFBO2FBQzVELENBQUM7WUFXQSxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7YUFDeEM7aUJBQU0sSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLGtCQUFrQixFQUFFO2dCQUNwRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQzs7Ozs7UUEzSkQsSUFDSSxVQUFVO1lBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQzttQkFDcEUsbUJBQW1CLENBQUM7UUFDN0IsQ0FBQzs7Ozs7UUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUFxQjtZQUNsQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsa0ZBQWtGO2dCQUNsRixxRkFBcUY7Z0JBQ3JGLHVGQUF1RjtnQkFDdkYsMkVBQTJFO2dCQUMzRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDeEM7UUFDSCxDQUFDOzs7OztRQUlELElBQ0ksVUFBVSxLQUE2QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7OztRQUNyRSxJQUFJLFVBQVUsQ0FBQyxLQUE2Qjs7a0JBQ3BDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxrQkFBa0IsQ0FBQztZQUNoRywwRkFBMEY7WUFDMUYsdUZBQXVGO1lBQ3ZGLHVGQUF1RjtZQUN2RixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO2dCQUNuRSxJQUFJLENBQUMsc0NBQXNDLEdBQUcsSUFBSSxDQUFDO2FBQ3BEO1FBQ0gsQ0FBQzs7Ozs7UUFJRCxJQUNJLFNBQVMsS0FBYSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7OztRQUNuRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7OztRQWdCRCxJQUFJLFFBQVE7WUFDVixPQUFPLElBQUksQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEUsQ0FBQzs7Ozs7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7UUFvRy9ELGVBQWU7WUFDYixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTdELDBGQUEwRjtZQUMxRiw0RkFBNEY7WUFDNUYseUZBQXlGO1lBQ3pGLDJGQUEyRjtZQUMzRiw0RkFBNEY7WUFDNUYscURBQXFEO1lBQ3JELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUU7Z0JBQ3JELEdBQUc7OztnQkFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTthQUNwQyxDQUFDLENBQUM7WUFFSCxnRkFBZ0Y7WUFDaEYsdUZBQXVGO1lBQ3ZGLG1GQUFtRjtZQUNuRixxRUFBcUU7WUFDckUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPOzs7WUFBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFBLENBQUM7WUFFM0QsNEVBQTRFO1lBQzVFLHVFQUF1RTtZQUN2RSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixpRkFBaUY7WUFDakYsZ0VBQWdFO1lBQ2hFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ2pDLDBFQUEwRTtZQUMxRSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDO1lBQ3hDLHVGQUF1RjtZQUN2Rix3RkFBd0Y7WUFDeEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFDLENBQUM7Ozs7UUFFRCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLDBDQUEwQyxFQUFFLENBQUM7UUFDcEQsQ0FBQzs7OztRQUVELHFCQUFxQjtZQUNuQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNqQyxDQUFDOzs7O1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7Ozs7UUFNRCx5QkFBeUI7WUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDN0MsQ0FBQzs7Ozs7UUFHRCxvQkFBb0I7WUFDbEIsa0ZBQWtGO1lBQ2xGLHdGQUF3RjtZQUN4Rix3RkFBd0Y7WUFDeEYsc0ZBQXNGO1lBQ3RGLDJGQUEyRjtZQUMzRiwyRkFBMkY7WUFDM0Ysd0VBQXdFO1lBQ3hFLHFGQUFxRjtZQUNyRixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQzthQUM1QjtRQUNILENBQUM7Ozs7OztRQUdPLGtCQUFrQjs7a0JBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUTtZQUU3QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQzFDLDJCQUEyQixPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUNyRDtZQUVELHdGQUF3RjtZQUN4RixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVM7OztZQUFDLEdBQUcsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsQ0FBQyxFQUFDLENBQUM7WUFFSCw2Q0FBNkM7WUFDN0MsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO2dCQUN2RCxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVk7cUJBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNoQyxTQUFTOzs7Z0JBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxFQUFDLENBQUM7YUFDNUQ7UUFDSCxDQUFDOzs7Ozs7UUFHTywwQkFBMEI7WUFDaEMsbUZBQW1GO1lBQ25GLG1GQUFtRjtZQUNuRix5Q0FBeUM7WUFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO2lCQUM5RCxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQztRQUM3RCxDQUFDOzs7Ozs7OztRQU9PLG9CQUFvQjtZQUMxQixnREFBZ0Q7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUzs7O1lBQUMsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6QyxDQUFDLEVBQUMsQ0FBQztZQUVILGtFQUFrRTtZQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsQ0FBQyxFQUFDLENBQUM7WUFFSCxpRUFBaUU7WUFDakUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7Ozs7OztRQUdPLHVCQUF1QjtZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsTUFBTSxrQ0FBa0MsRUFBRSxDQUFDO2FBQzVDO1FBQ0gsQ0FBQzs7Ozs7UUFFTyxpQkFBaUI7WUFDdkIsdUZBQXVGO1lBQ3ZGLG9GQUFvRjtZQUNwRix1RkFBdUY7WUFDdkYsNEZBQTRGO1lBQzVGLDRGQUE0RjtZQUM1RixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDbEM7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNsRixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUNwQztRQUNILENBQUM7Ozs7Ozs7Ozs7O1FBVU8sMENBQTBDO1lBQ2hELHVFQUF1RTtZQUN2RSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU87aUJBQ3pCLFNBQVM7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxJQUFJLEVBQUMsQ0FBQztZQUV2RSxpRkFBaUY7WUFDakYseUVBQXlFO1lBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUzs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDbkYsSUFBSSxJQUFJLENBQUMsc0NBQXNDLEVBQUU7d0JBQy9DLElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxLQUFLLENBQUM7d0JBQ3BELElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO3FCQUNsQztnQkFDSCxDQUFDLEVBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlDLFNBQVM7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxJQUFJLEVBQUMsQ0FBQztRQUN6RSxDQUFDOzs7OztRQUdELGtCQUFrQjtZQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDO1FBQ3RDLENBQUM7Ozs7UUFFRCxXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQztRQUN2QyxDQUFDOzs7Ozs7Ozs7O1FBVUQsdUJBQXVCO1lBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQy9GLENBQUM7Ozs7UUFFRCxpQkFBaUI7WUFDZixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNqRSxDQUFDOzs7O1FBRUQsaUJBQWlCO1lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3JFLENBQUM7Ozs7OztRQUdELGNBQWMsQ0FBQyxJQUFxQjs7a0JBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNoRSxPQUFPLFNBQVMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7Ozs7UUFHRCxxQkFBcUI7WUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDakQsQ0FBQzs7Ozs7UUFHRCx5QkFBeUI7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQy9DLE9BQU87YUFDUjtZQUNELHlGQUF5RjtZQUN6RiwyRkFBMkY7WUFDM0YsOEZBQThGO1lBQzlGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxHQUFHLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztRQUM3RixDQUFDOzs7Ozs7UUFHTyxhQUFhO1lBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7Ozs7Ozs7UUFRTyxjQUFjO1lBQ3BCLElBQUksU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTs7b0JBQ2pDLFNBQWtCOztvQkFDbEIsT0FBZ0I7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztnQkFBQyxDQUFDLElBQWEsRUFBRSxFQUFFO29CQUMzQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO3dCQUMxQixJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFOzRCQUMvQixNQUFNLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNuRDt3QkFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDO3FCQUNsQjt5QkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO3dCQUMvQixJQUFJLE9BQU8sRUFBRTs0QkFDWCxNQUFNLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUNqRDt3QkFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDO3FCQUNoQjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQzs7Ozs7OztRQU1PLG1CQUFtQjtZQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7O29CQUNiLEdBQUcsR0FBYSxFQUFFO2dCQUV0QixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLE1BQU0sRUFBRTs7MEJBQ3JDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSTs7Ozt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7OzBCQUMxRCxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7Ozs7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUU5RCxJQUFJLFNBQVMsRUFBRTt3QkFDYixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDeEI7eUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDN0I7b0JBRUQsSUFBSSxPQUFPLEVBQUU7d0JBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3RCO2lCQUNGO3FCQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRzs7OztvQkFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsQ0FBQztpQkFDbEQ7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7Ozs7Ozs7Ozs7OztRQVdPLHlCQUF5QjtZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUM1RSxPQUFPO2FBQ1I7O2tCQUNLLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU87WUFDakQsMkVBQTJFO1lBQzNFLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMxQixhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ25DLE9BQU87YUFDUjtZQUNELDZFQUE2RTtZQUM3RSxxREFBcUQ7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsc0NBQXNDLEdBQUcsSUFBSSxDQUFDO2dCQUNuRCxPQUFPO2FBQ1I7O2tCQUNLLGVBQWUsR0FBRyxtQkFBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFlOzs7O2tCQUdwRSxxQkFBcUIsR0FDekIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLO1lBRXRGLG9GQUFvRjtZQUNwRixxRkFBcUY7WUFDckYsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTO2dCQUN6QixHQUFHLHVDQUF1QyxlQUFlLHFCQUFxQixLQUFLLENBQUM7UUFDMUYsQ0FBQzs7Ozs7O1FBR08sZ0JBQWdCOztrQkFDaEIsT0FBTyxHQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWE7WUFDM0QsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFOztzQkFDakIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RDLDZFQUE2RTtnQkFDN0UscUVBQXFFO2dCQUNyRSxPQUFPLFFBQVEsSUFBSSxRQUFRLEtBQUssT0FBTyxDQUFDO2FBQ3pDO1lBQ0Qsb0ZBQW9GO1lBQ3BGLDRGQUE0RjtZQUM1RixPQUFPLG1CQUFBLFFBQVEsQ0FBQyxlQUFlLEVBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O2dCQXppQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4Qiw4dUlBQWdDO29CQUVoQyxVQUFVLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDdkQsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxvQkFBb0I7d0JBQzdCLCtDQUErQyxFQUFFLHNCQUFzQjt3QkFDdkUsZ0NBQWdDLEVBQUUscUJBQXFCO3dCQUN2RCxpQ0FBaUMsRUFBRSxtQkFBbUI7d0JBQ3RELG1DQUFtQyxFQUFFLHFCQUFxQjt3QkFDMUQsc0NBQXNDLEVBQUUscUNBQXFDO3dCQUM3RSxxQkFBcUIsRUFBRSxrQkFBa0I7d0JBQ3pDLG9CQUFvQixFQUFFLG1CQUFtQjt3QkFDekMsa0JBQWtCLEVBQUUsaUJBQWlCO3dCQUNyQyxzQkFBc0IsRUFBRSw2QkFBNkI7d0JBQ3JELG9CQUFvQixFQUFFLDJCQUEyQjt3QkFDakQscUJBQXFCLEVBQUUsNEJBQTRCO3dCQUNuRCxrQkFBa0IsRUFBRSx5QkFBeUI7d0JBQzdDLGtCQUFrQixFQUFFLHlCQUF5Qjt3QkFDN0Msb0JBQW9CLEVBQUUsMkJBQTJCO3dCQUNqRCxvQkFBb0IsRUFBRSwyQkFBMkI7cUJBQ2xEO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFDO3FCQUNyRDs7aUJBQ0Y7Ozs7Z0JBN0dDLFVBQVU7Z0JBSlYsaUJBQWlCO2dCQVNqQixNQUFNO2dCQWhCQSxjQUFjO2dCQUNkLFFBQVE7Z0RBaVNELFFBQVEsWUFBSSxNQUFNLFNBQUMsOEJBQThCO2dEQUVqRCxRQUFRLFlBQUksTUFBTSxTQUFDLHdCQUF3Qjs2Q0FDM0MsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7Ozs2QkExS3BELFNBQVMsU0FBQyxXQUFXO21DQUNyQixTQUFTLFNBQUMsaUJBQWlCO2lDQUMzQixTQUFTLFNBQUMseUJBQXlCO2tDQUNuQyxTQUFTLFNBQUMsMEJBQTBCOzhCQUNwQyxTQUFTLFNBQUMsc0JBQXNCO3VDQUVoQyxZQUFZLFNBQUMsUUFBUTtvQ0FDckIsWUFBWSxTQUFDLFFBQVEsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7b0NBQ3JDLFlBQVksU0FBQyxtQkFBbUI7a0NBQ2hDLGVBQWUsU0FBQyxTQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDO2tDQUM5QyxlQUFlLFNBQUMsU0FBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQztpQ0FDOUMsZUFBZSxTQUFDLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7Z0NBQzdDLGVBQWUsU0FBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDO3FDQUc1QyxLQUFLO3dCQUdMLEtBQUs7NkJBR0wsS0FBSzs2QkFrQkwsS0FBSzs0QkFlTCxLQUFLOztJQW9kUixtQkFBQztLQUFBO1NBNWdCWSxZQUFZOzs7SUFFdkIsa0NBQTREOztJQUM1RCx3Q0FBd0U7O0lBQ3hFLHNDQUEwRjs7SUFDMUYsdUNBQTZGOztJQUM3RixtQ0FBaUY7O0lBRWpGLDRDQUFpRTs7SUFDakUseUNBQThFOztJQUM5RSx5Q0FBK0U7O0lBQy9FLHVDQUF1Rjs7SUFDdkYsdUNBQXVGOztJQUN2RixzQ0FBb0Y7O0lBQ3BGLHFDQUFpRjs7Ozs7SUFHakYsMENBQTZDOzs7OztJQUc3Qyw2QkFBeUM7Ozs7O0lBa0J6QyxtQ0FBb0M7Ozs7O0lBZXBDLG1DQUFpRTs7Ozs7SUFTakUsa0NBQXdCOztJQUd4QixvQ0FBZ0Q7O0lBR2hELGdDQUF3RDs7Ozs7SUFHeEQsZ0RBQThCOzs7OztJQUc5QiwwQ0FBMkI7Ozs7O0lBUTNCLGtDQUF5Qzs7Ozs7SUFDekMsa0NBQXdDOzs7OztJQUN4QyxpREFBNEQ7Ozs7O0lBQzVELG1DQUE0Qzs7Ozs7SUFDNUMsOERBQXVEOzs7OztJQUN2RCxnQ0EyRUU7Ozs7O0lBRVUsbUNBQStCOzs7OztJQUMvQiwwQ0FBNkM7Ozs7O0lBQzdDLCtCQUF1Qjs7Ozs7SUFDdkIsNEJBQTRCOzs7OztJQUM1QixpQ0FBMkI7Ozs7O0lBQzNCLGlDQUM4Qzs7Ozs7SUFDOUMscUNBQWtGOztJQUNsRixzQ0FBeUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBpc0Rldk1vZGUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIExhYmVsT3B0aW9ucyxcbiAgTUFUX0xBQkVMX0dMT0JBTF9PUFRJT05TLFxuICBUaGVtZVBhbGV0dGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBnZXRNYXRGb3JtRmllbGREdXBsaWNhdGVkSGludEVycm9yLFxuICBnZXRNYXRGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yLFxuICBNQVRfRk9STV9GSUVMRCxcbiAgbWF0Rm9ybUZpZWxkQW5pbWF0aW9ucyxcbiAgTWF0Rm9ybUZpZWxkQ29udHJvbCxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIE1EQ1RleHRGaWVsZEFkYXB0ZXIsXG4gIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24sXG4gIG51bWJlcnMgYXMgbWRjVGV4dEZpZWxkTnVtYmVyc1xufSBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkJztcbmltcG9ydCB7bWVyZ2UsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0RXJyb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9lcnJvcic7XG5pbXBvcnQge01hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9mbG9hdGluZy1sYWJlbCc7XG5pbXBvcnQge01hdEhpbnR9IGZyb20gJy4vZGlyZWN0aXZlcy9oaW50JztcbmltcG9ydCB7TWF0TGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9sYWJlbCc7XG5pbXBvcnQge01hdEZvcm1GaWVsZExpbmVSaXBwbGV9IGZyb20gJy4vZGlyZWN0aXZlcy9saW5lLXJpcHBsZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lfSBmcm9tICcuL2RpcmVjdGl2ZXMvbm90Y2hlZC1vdXRsaW5lJztcbmltcG9ydCB7TWF0UHJlZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvcHJlZml4JztcbmltcG9ydCB7TWF0U3VmZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvc3VmZml4JztcblxuLyoqIFR5cGUgZm9yIHRoZSBhdmFpbGFibGUgZmxvYXRMYWJlbCB2YWx1ZXMuICovXG5leHBvcnQgdHlwZSBGbG9hdExhYmVsVHlwZSA9ICdhbHdheXMnIHwgJ2F1dG8nO1xuXG4vKiogUG9zc2libGUgYXBwZWFyYW5jZSBzdHlsZXMgZm9yIHRoZSBmb3JtIGZpZWxkLiAqL1xuZXhwb3J0IHR5cGUgTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZSA9ICdmaWxsJyB8ICdvdXRsaW5lJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBmb3JtIGZpZWxkIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWRcbiAqIHVzaW5nIHRoZSBgTUFUX0ZPUk1fRklFTERfREVGQVVMVF9PUFRJT05TYCBpbmplY3Rpb24gdG9rZW4uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Rm9ybUZpZWxkRGVmYXVsdE9wdGlvbnMge1xuICBhcHBlYXJhbmNlPzogTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZTtcbiAgaGlkZVJlcXVpcmVkTWFya2VyPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlXG4gKiBkZWZhdWx0IG9wdGlvbnMgZm9yIGFsbCBmb3JtIGZpZWxkIHdpdGhpbiBhbiBhcHAuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfRk9STV9GSUVMRF9ERUZBVUxUX09QVElPTlMgPVxuICBuZXcgSW5qZWN0aW9uVG9rZW48TWF0Rm9ybUZpZWxkRGVmYXVsdE9wdGlvbnM+KCdNQVRfRk9STV9GSUVMRF9ERUZBVUxUX09QVElPTlMnKTtcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBEZWZhdWx0IGFwcGVhcmFuY2UgdXNlZCBieSB0aGUgZm9ybS1maWVsZC4gKi9cbmNvbnN0IERFRkFVTFRfQVBQRUFSQU5DRTogTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZSA9ICdmaWxsJztcblxuLyoqIERlZmF1bHQgYXBwZWFyYW5jZSB1c2VkIGJ5IHRoZSBmb3JtLWZpZWxkLiAqL1xuY29uc3QgREVGQVVMVF9GTE9BVF9MQUJFTDogRmxvYXRMYWJlbFR5cGUgPSAnYXV0byc7XG5cbi8qKlxuICogRGVmYXVsdCB0cmFuc2Zvcm0gZm9yIGRvY2tlZCBmbG9hdGluZyBsYWJlbHMgaW4gYSBNREMgdGV4dC1maWVsZC4gVGhpcyB2YWx1ZSBoYXMgYmVlblxuICogZXh0cmFjdGVkIGZyb20gdGhlIE1EQyB0ZXh0LWZpZWxkIHN0eWxlcyBiZWNhdXNlIHdlIHByb2dyYW1tYXRpY2FsbHkgbW9kaWZ5IHRoZSBkb2NrZWRcbiAqIGxhYmVsIHRyYW5zZm9ybSwgYnV0IGRvIG5vdCB3YW50IHRvIGFjY2lkZW50YWxseSBkaXNjYXJkIHRoZSBkZWZhdWx0IGxhYmVsIHRyYW5zZm9ybS5cbiAqL1xuY29uc3QgRkxPQVRJTkdfTEFCRUxfREVGQVVMVF9ET0NLRURfVFJBTlNGT1JNID0gYHRyYW5zbGF0ZVkoLTUwJSlgO1xuXG4vKiogQ29udGFpbmVyIGZvciBmb3JtIGNvbnRyb2xzIHRoYXQgYXBwbGllcyBNYXRlcmlhbCBEZXNpZ24gc3R5bGluZyBhbmQgYmVoYXZpb3IuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtZm9ybS1maWVsZCcsXG4gIGV4cG9ydEFzOiAnbWF0Rm9ybUZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zvcm0tZmllbGQuY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFttYXRGb3JtRmllbGRBbmltYXRpb25zLnRyYW5zaXRpb25NZXNzYWdlc10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtZm9ybS1maWVsZC1sYWJlbC1hbHdheXMtZmxvYXRdJzogJ19zaG91bGRBbHdheXNGbG9hdCgpJyxcbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWludmFsaWRdJzogJ19jb250cm9sLmVycm9yU3RhdGUnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtZGlzYWJsZWRdJzogJ19jb250cm9sLmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsZWRdJzogJ19jb250cm9sLmF1dG9maWxsZWQnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtbm8tYW5pbWF0aW9uc10nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJ1tjbGFzcy5tYXQtZm9jdXNlZF0nOiAnX2NvbnRyb2wuZm9jdXNlZCcsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5uZy11bnRvdWNoZWRdJzogJ19zaG91bGRGb3J3YXJkKFwidW50b3VjaGVkXCIpJyxcbiAgICAnW2NsYXNzLm5nLXRvdWNoZWRdJzogJ19zaG91bGRGb3J3YXJkKFwidG91Y2hlZFwiKScsXG4gICAgJ1tjbGFzcy5uZy1wcmlzdGluZV0nOiAnX3Nob3VsZEZvcndhcmQoXCJwcmlzdGluZVwiKScsXG4gICAgJ1tjbGFzcy5uZy1kaXJ0eV0nOiAnX3Nob3VsZEZvcndhcmQoXCJkaXJ0eVwiKScsXG4gICAgJ1tjbGFzcy5uZy12YWxpZF0nOiAnX3Nob3VsZEZvcndhcmQoXCJ2YWxpZFwiKScsXG4gICAgJ1tjbGFzcy5uZy1pbnZhbGlkXSc6ICdfc2hvdWxkRm9yd2FyZChcImludmFsaWRcIiknLFxuICAgICdbY2xhc3MubmctcGVuZGluZ10nOiAnX3Nob3VsZEZvcndhcmQoXCJwZW5kaW5nXCIpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNQVRfRk9STV9GSUVMRCwgdXNlRXhpc3Rpbmc6IE1hdEZvcm1GaWVsZH0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Rm9ybUZpZWxkIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQge1xuICBAVmlld0NoaWxkKCd0ZXh0RmllbGQnKSBfdGV4dEZpZWxkOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgncHJlZml4Q29udGFpbmVyJykgX3ByZWZpeENvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoTWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbCkgX2Zsb2F0aW5nTGFiZWw6IE1hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWx8dW5kZWZpbmVkO1xuICBAVmlld0NoaWxkKE1hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lKSBfbm90Y2hlZE91dGxpbmU6IE1hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lfHVuZGVmaW5lZDtcbiAgQFZpZXdDaGlsZChNYXRGb3JtRmllbGRMaW5lUmlwcGxlKSBfbGluZVJpcHBsZTogTWF0Rm9ybUZpZWxkTGluZVJpcHBsZXx1bmRlZmluZWQ7XG5cbiAgQENvbnRlbnRDaGlsZChNYXRMYWJlbCkgX2xhYmVsQ2hpbGROb25TdGF0aWM6IE1hdExhYmVsfHVuZGVmaW5lZDtcbiAgQENvbnRlbnRDaGlsZChNYXRMYWJlbCwge3N0YXRpYzogdHJ1ZX0pIF9sYWJlbENoaWxkU3RhdGljOiBNYXRMYWJlbHx1bmRlZmluZWQ7XG4gIEBDb250ZW50Q2hpbGQoTWF0Rm9ybUZpZWxkQ29udHJvbCkgX2Zvcm1GaWVsZENvbnRyb2w6IE1hdEZvcm1GaWVsZENvbnRyb2w8YW55PjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRQcmVmaXgsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9wcmVmaXhDaGlsZHJlbjogUXVlcnlMaXN0PE1hdFByZWZpeD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0U3VmZml4LCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfc3VmZml4Q2hpbGRyZW46IFF1ZXJ5TGlzdDxNYXRTdWZmaXg+O1xuICBAQ29udGVudENoaWxkcmVuKE1hdEVycm9yLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfZXJyb3JDaGlsZHJlbjogUXVlcnlMaXN0PE1hdEVycm9yPjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRIaW50LCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfaGludENoaWxkcmVuOiBRdWVyeUxpc3Q8TWF0SGludD47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHJlcXVpcmVkIG1hcmtlciBzaG91bGQgYmUgaGlkZGVuLiAqL1xuICBASW5wdXQoKSBoaWRlUmVxdWlyZWRNYXJrZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIGNvbG9yIHBhbGV0dGUgZm9yIHRoZSBmb3JtLWZpZWxkLiAqL1xuICBASW5wdXQoKSBjb2xvcjogVGhlbWVQYWxldHRlID0gJ3ByaW1hcnknO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYWx3YXlzIGZsb2F0IG9yIGZsb2F0IGFzIHRoZSB1c2VyIHR5cGVzLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZmxvYXRMYWJlbCgpOiBGbG9hdExhYmVsVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zsb2F0TGFiZWwgfHwgKHRoaXMuX2xhYmVsT3B0aW9ucyAmJiB0aGlzLl9sYWJlbE9wdGlvbnMuZmxvYXQpXG4gICAgICAgIHx8IERFRkFVTFRfRkxPQVRfTEFCRUw7XG4gIH1cbiAgc2V0IGZsb2F0TGFiZWwodmFsdWU6IEZsb2F0TGFiZWxUeXBlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9mbG9hdExhYmVsKSB7XG4gICAgICB0aGlzLl9mbG9hdExhYmVsID0gdmFsdWU7XG4gICAgICAvLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIEN1c3RvbSBmb3JtLWZpZWxkIGNvbnRyb2xzIG9yIGRpcmVjdGl2ZXMgbWlnaHQgc2V0XG4gICAgICAvLyB0aGUgXCJmbG9hdExhYmVsXCIgaW5wdXQgYW5kIGV4cGVjdCB0aGUgZm9ybS1maWVsZCB2aWV3IHRvIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseS5cbiAgICAgIC8vIGUuZy4gYXV0b2NvbXBsZXRlIHRyaWdnZXIuIElkZWFsbHkgd2UnZCBnZXQgcmlkIG9mIHRoaXMgYW5kIHRoZSBjb25zdW1lcnMgd291bGQganVzdFxuICAgICAgLy8gZW1pdCB0aGUgXCJzdGF0ZUNoYW5nZXNcIiBvYnNlcnZhYmxlLiBUT0RPKGRldnZlcnNpb24pOiBjb25zaWRlciByZW1vdmluZy5cbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9mbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZTtcblxuICAvKiogVGhlIGZvcm0tZmllbGQgYXBwZWFyYW5jZSBzdHlsZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGFwcGVhcmFuY2UoKTogTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZSB7IHJldHVybiB0aGlzLl9hcHBlYXJhbmNlOyB9XG4gIHNldCBhcHBlYXJhbmNlKHZhbHVlOiBNYXRGb3JtRmllbGRBcHBlYXJhbmNlKSB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl9hcHBlYXJhbmNlO1xuICAgIHRoaXMuX2FwcGVhcmFuY2UgPSB2YWx1ZSB8fCAodGhpcy5fZGVmYXVsdHMgJiYgdGhpcy5fZGVmYXVsdHMuYXBwZWFyYW5jZSkgfHwgREVGQVVMVF9BUFBFQVJBTkNFO1xuICAgIC8vIElmIHRoZSBhcHBlYXJhbmNlIGhhcyBiZWVuIHN3aXRjaGVkIHRvIGBvdXRsaW5lYCwgdGhlIGxhYmVsIG9mZnNldCBuZWVkcyB0byBiZSB1cGRhdGVkLlxuICAgIC8vIFRoZSB1cGRhdGUgY2FuIGhhcHBlbiBvbmNlIHRoZSB2aWV3IGhhcyBiZWVuIHJlLWNoZWNrZWQsIGJ1dCBub3QgaW1tZWRpYXRlbHkgYmVjYXVzZVxuICAgIC8vIHRoZSB2aWV3IGhhcyBub3QgYmVlbiB1cGRhdGVkIGFuZCB0aGUgbm90Y2hlZC1vdXRsaW5lIGZsb2F0aW5nIGxhYmVsIGlzIG5vdCBwcmVzZW50LlxuICAgIGlmICh0aGlzLl9hcHBlYXJhbmNlID09PSAnb3V0bGluZScgJiYgdGhpcy5fYXBwZWFyYW5jZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuX25lZWRzT3V0bGluZUxhYmVsT2Zmc2V0VXBkYXRlT25TdGFibGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9hcHBlYXJhbmNlOiBNYXRGb3JtRmllbGRBcHBlYXJhbmNlID0gREVGQVVMVF9BUFBFQVJBTkNFO1xuXG4gIC8qKiBUZXh0IGZvciB0aGUgZm9ybSBmaWVsZCBoaW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgaGludExhYmVsKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9oaW50TGFiZWw7IH1cbiAgc2V0IGhpbnRMYWJlbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faGludExhYmVsID0gdmFsdWU7XG4gICAgdGhpcy5fcHJvY2Vzc0hpbnRzKCk7XG4gIH1cbiAgcHJpdmF0ZSBfaGludExhYmVsID0gJyc7XG5cbiAgLy8gVW5pcXVlIGlkIGZvciB0aGUgaGludCBsYWJlbC5cbiAgX2hpbnRMYWJlbElkID0gYG1hdC1tZGMtaGludC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgLy8gVW5pcXVlIGlkIGZvciB0aGUgaW50ZXJuYWwgZm9ybSBmaWVsZCBsYWJlbC5cbiAgX2xhYmVsSWQgPSBgbWF0LW1kYy1mb3JtLWZpZWxkLWxhYmVsLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICAvKiogU3RhdGUgb2YgdGhlIG1hdC1oaW50IGFuZCBtYXQtZXJyb3IgYW5pbWF0aW9ucy4gKi9cbiAgX3N1YnNjcmlwdEFuaW1hdGlvblN0YXRlID0gJyc7XG5cbiAgLyoqIFdpZHRoIG9mIHRoZSBvdXRsaW5lIG5vdGNoLiAqL1xuICBfb3V0bGluZU5vdGNoV2lkdGg6IG51bWJlcjtcblxuICAvKiogR2V0cyB0aGUgY3VycmVudCBmb3JtIGZpZWxkIGNvbnRyb2wgKi9cbiAgZ2V0IF9jb250cm9sKCk6IE1hdEZvcm1GaWVsZENvbnRyb2w8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGxpY2l0Rm9ybUZpZWxkQ29udHJvbCB8fCB0aGlzLl9mb3JtRmllbGRDb250cm9sO1xuICB9XG4gIHNldCBfY29udHJvbCh2YWx1ZSkgeyB0aGlzLl9leHBsaWNpdEZvcm1GaWVsZENvbnRyb2wgPSB2YWx1ZTsgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2lzRm9jdXNlZDogYm9vbGVhbnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfZXhwbGljaXRGb3JtRmllbGRDb250cm9sOiBNYXRGb3JtRmllbGRDb250cm9sPGFueT47XG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ1RleHRGaWVsZEZvdW5kYXRpb247XG4gIHByaXZhdGUgX25lZWRzT3V0bGluZUxhYmVsT2Zmc2V0VXBkYXRlT25TdGFibGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDVGV4dEZpZWxkQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX3RleHRGaWVsZC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX3RleHRGaWVsZC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX3RleHRGaWVsZC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuXG4gICAgaGFzTGFiZWw6ICgpID0+IHRoaXMuX2hhc0Zsb2F0aW5nTGFiZWwoKSxcbiAgICBpc0ZvY3VzZWQ6ICgpID0+IHRoaXMuX2NvbnRyb2wuZm9jdXNlZCxcbiAgICBoYXNPdXRsaW5lOiAoKSA9PiB0aGlzLl9oYXNPdXRsaW5lKCksXG5cbiAgICAvLyBNREMgdGV4dC1maWVsZCB3aWxsIGNhbGwgdGhpcyBtZXRob2Qgb24gZm9jdXMsIGJsdXIgYW5kIHZhbHVlIGNoYW5nZS4gSXQgZXhwZWN0cyB1c1xuICAgIC8vIHRvIHVwZGF0ZSB0aGUgZmxvYXRpbmcgbGFiZWwgc3RhdGUgYWNjb3JkaW5nbHkuIFRob3VnaCB3ZSBtYWtlIHRoaXMgYSBub29wIGJlY2F1c2Ugd2VcbiAgICAvLyB3YW50IHRvIHJlYWN0IHRvIGZsb2F0aW5nIGxhYmVsIHN0YXRlIGNoYW5nZXMgdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uLiBSZWx5aW5nIG9uIHRoaXNcbiAgICAvLyBhZGFwdGVyIG1ldGhvZCB3b3VsZCBtZWFuIHRoYXQgdGhlIGxhYmVsIHdvdWxkIG5vdCB1cGRhdGUgaWYgdGhlIGN1c3RvbSBmb3JtLWZpZWxkIGNvbnRyb2xcbiAgICAvLyBzZXRzIFwic2hvdWxkTGFiZWxGbG9hdFwiIHRvIHRydWUsIG9yIGlmIHRoZSBcImZsb2F0TGFiZWxcIiBpbnB1dCBiaW5kaW5nIGNoYW5nZXMgdG8gXCJhbHdheXNcIi5cbiAgICBmbG9hdExhYmVsOiAoKSA9PiB7fSxcblxuICAgIC8vIExhYmVsIHNoYWtpbmcgaXMgbm90IHN1cHBvcnRlZCB5ZXQuIEl0IHdpbGwgcmVxdWlyZSBhIG5ldyBBUEkgZm9yIGZvcm0gZmllbGRcbiAgICAvLyBjb250cm9scyB0byB0cmlnZ2VyIHRoZSBzaGFraW5nLiBUaGlzIGNhbiBiZSBhIGZlYXR1cmUgaW4gdGhlIGZ1dHVyZS5cbiAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBleHBsb3JlIG9wdGlvbnMgb24gaG93IHRvIGludGVncmF0ZSBsYWJlbCBzaGFraW5nLlxuICAgIHNoYWtlTGFiZWw6ICgpID0+IHt9LFxuXG4gICAgLy8gTURDIGJ5IGRlZmF1bHQgdXBkYXRlcyB0aGUgbm90Y2hlZC1vdXRsaW5lIHdoZW5ldmVyIHRoZSB0ZXh0LWZpZWxkIHJlY2VpdmVzIGZvY3VzLCBvclxuICAgIC8vIGlzIGJlaW5nIGJsdXJyZWQuIEl0IGFsc28gY29tcHV0ZXMgdGhlIGxhYmVsIHdpZHRoIGV2ZXJ5IHRpbWUgdGhlIG5vdGNoIGlzIG9wZW5lZCBvclxuICAgIC8vIGNsb3NlZC4gVGhpcyB3b3JrcyBmaW5lIGluIHRoZSBzdGFuZGFyZCBNREMgdGV4dC1maWVsZCwgYnV0IG5vdCBpbiBBbmd1bGFyIHdoZXJlIHRoZVxuICAgIC8vIGZsb2F0aW5nIGxhYmVsIGNvdWxkIGNoYW5nZSB0aHJvdWdoIGludGVycG9sYXRpb24uIFdlIHdhbnQgdG8gYmUgYWJsZSB0byB1cGRhdGUgdGhlXG4gICAgLy8gbm90Y2hlZCBvdXRsaW5lIHdoZW5ldmVyIHRoZSBsYWJlbCBjb250ZW50IGNoYW5nZXMuIEFkZGl0aW9uYWxseSwgcmVseWluZyBvbiBmb2N1cyBvclxuICAgIC8vIGJsdXIgdG8gb3BlbiBhbmQgY2xvc2UgdGhlIG5vdGNoIGRvZXMgbm90IHdvcmsgZm9yIHVzIHNpbmNlIGFic3RyYWN0IGZvcm0tZmllbGQgY29udHJvbHNcbiAgICAvLyBoYXZlIHRoZSBhYmlsaXR5IHRvIGNvbnRyb2wgdGhlIGZsb2F0aW5nIGxhYmVsIHN0YXRlIChpLmUuIGBzaG91bGRMYWJlbEZsb2F0YCksIGFuZCB3ZVxuICAgIC8vIHdhbnQgdG8gdXBkYXRlIHRoZSBub3RjaCB3aGVuZXZlciB0aGUgYF9zaG91bGRMYWJlbEZsb2F0KClgIHZhbHVlIGNoYW5nZXMuXG4gICAgZ2V0TGFiZWxXaWR0aDogKCkgPT4gMCxcblxuICAgIC8vIFRPRE86IE1EQyBub3cgc3VwcG9ydHMgc2V0dGluZyB0aGUgcmVxdWlyZWQgYXN0ZXJpc2sgbWFya2VyIGRpcmVjdGx5IG9uXG4gICAgLy8gdGhlIGxhYmVsIGNvbXBvbmVudC4gVGhpcyBhZGFwdGVyIG1ldGhvZCBtYXkgYmUgaW1wbGVtZW50ZWQgYW5kXG4gICAgLy8gbWF0LW1kYy1mb3JtLWZpZWxkLXJlcXVpcmVkLW1hcmtlciByZW1vdmVkLlxuICAgIHNldExhYmVsUmVxdWlyZWQ6ICgpID0+IHt9LFxuICAgIG5vdGNoT3V0bGluZTogKCkgPT4ge30sXG4gICAgY2xvc2VPdXRsaW5lOiAoKSA9PiB7fSxcblxuICAgIGFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4gdGhpcy5fbGluZVJpcHBsZSAmJiB0aGlzLl9saW5lUmlwcGxlLmFjdGl2YXRlKCksXG4gICAgZGVhY3RpdmF0ZUxpbmVSaXBwbGU6ICgpID0+IHRoaXMuX2xpbmVSaXBwbGUgJiYgdGhpcy5fbGluZVJpcHBsZS5kZWFjdGl2YXRlKCksXG5cbiAgICAvLyBUaGUgZm91bmRhdGlvbiB0cmllcyB0byByZWdpc3RlciBldmVudHMgb24gdGhlIGlucHV0LiBUaGlzIGlzIG5vdCBtYXRjaGluZ1xuICAgIC8vIG91ciBjb25jZXB0IG9mIGFic3RyYWN0IGZvcm0gZmllbGQgY29udHJvbHMuIFdlIGhhbmRsZSBlYWNoIGV2ZW50IG1hbnVhbGx5XG4gICAgLy8gaW4gXCJzdGF0ZUNoYW5nZXNcIiBiYXNlZCBvbiB0aGUgZm9ybS1maWVsZCBjb250cm9sIHN0YXRlLiBUaGUgZm9sbG93aW5nIGV2ZW50c1xuICAgIC8vIG5lZWQgdG8gYmUgaGFuZGxlZDogZm9jdXMsIGJsdXIuIFdlIGRvIG5vdCBoYW5kbGUgdGhlIFwiaW5wdXRcIiBldmVudCBzaW5jZVxuICAgIC8vIHRoYXQgb25lIGlzIG9ubHkgbmVlZGVkIGZvciB0aGUgdGV4dC1maWVsZCBjaGFyYWN0ZXIgY291bnQsIHdoaWNoIHdlIGRvXG4gICAgLy8gbm90IGltcGxlbWVudCBhcyBwYXJ0IG9mIHRoZSBmb3JtLWZpZWxkLCBidXQgc2hvdWxkIGJlIGltcGxlbWVudGVkIG1hbnVhbGx5XG4gICAgLy8gYnkgY29uc3VtZXJzIHVzaW5nIHRlbXBsYXRlIGJpbmRpbmdzLlxuICAgIHJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG5cbiAgICAvLyBXZSBkbyBub3QgaGF2ZSBhIHJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIGlucHV0IHNpbmNlIHdlIHdvcmsgd2l0aCBhYnN0cmFjdCBmb3JtIGZpZWxkXG4gICAgLy8gY29udHJvbHMuIE1EQyBuZWVkcyBhIHJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIGlucHV0IG9wdGlvbmFsbHkgdG8gaGFuZGxlIGNoYXJhY3RlclxuICAgIC8vIGNvdW50aW5nIGFuZCB2YWx1ZSB1cGRhdGluZy4gVGhlc2UgYXJlIGJvdGggdGhpbmdzIHdlIGRvIG5vdCBoYW5kbGUgZnJvbSB3aXRoaW4gdGhlXG4gICAgLy8gZm9ybS1maWVsZCwgc28gd2UgY2FuIGp1c3QgcmV0dXJuIG51bGwuXG4gICAgZ2V0TmF0aXZlSW5wdXQ6ICgpID0+IG51bGwsXG5cbiAgICAvLyBUaGlzIG1ldGhvZCB3aWxsIG5ldmVyIGJlIGNhbGxlZCBzaW5jZSB3ZSBkbyBub3QgaGF2ZSB0aGUgYWJpbGl0eSB0byBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAgLy8gdG8gdGhlIG5hdGl2ZSBpbnB1dC4gVGhpcyBpcyBiZWNhdXNlIHRoZSBmb3JtIGNvbnRyb2wgaXMgbm90IG5lY2Vzc2FyaWx5IGFuIGlucHV0LCBhbmRcbiAgICAvLyB0aGUgZm9ybSBmaWVsZCBkZWFscyB3aXRoIGFic3RyYWN0IGZvcm0gY29udHJvbHMgb2YgYW55IHR5cGUuXG4gICAgc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbjogKCkgPT4ge30sXG5cbiAgICAvLyBUaGUgZm91bmRhdGlvbiB0cmllcyB0byByZWdpc3RlciBjbGljayBhbmQga2V5Ym9hcmQgZXZlbnRzIG9uIHRoZSBmb3JtLWZpZWxkIHRvIGZpZ3VyZSBvdXRcbiAgICAvLyBpZiB0aGUgaW5wdXQgdmFsdWUgY2hhbmdlcyB0aHJvdWdoIHVzZXIgaW50ZXJhY3Rpb24uIEJhc2VkIG9uIHRoYXQsIHRoZSBmb3VuZGF0aW9uIHRyaWVzXG4gICAgLy8gdG8gZm9jdXMgdGhlIGlucHV0LiBTaW5jZSB3ZSBkbyBub3QgaGFuZGxlIHRoZSBpbnB1dCB2YWx1ZSBhcyBwYXJ0IG9mIHRoZSBmb3JtLWZpZWxkLCBub3JcbiAgICAvLyBpdCdzIGd1YXJhbnRlZWQgdG8gYmUgYW4gaW5wdXQgKHNlZSBhZGFwdGVyIG1ldGhvZHMgYWJvdmUpLCB0aGlzIGlzIGEgbm9vcC5cbiAgICBkZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICByZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG5cbiAgICAvLyBUaGUgZm91bmRhdGlvbiB0cmllcyB0byBzZXR1cCBhIFwiTXV0YXRpb25PYnNlcnZlclwiIGluIG9yZGVyIHRvIHdhdGNoIGZvciBhdHRyaWJ1dGVzXG4gICAgLy8gbGlrZSBcIm1heGxlbmd0aFwiIG9yIFwicGF0dGVyblwiIHRvIGNoYW5nZS4gVGhlIGZvdW5kYXRpb24gd2lsbCB1cGRhdGUgdGhlIHZhbGlkaXR5IHN0YXRlXG4gICAgLy8gYmFzZWQgb24gdGhhdC4gV2UgZG8gbm90IG5lZWQgdGhpcyBsb2dpYyBzaW5jZSB3ZSBoYW5kbGUgdGhlIHZhbGlkaXR5IHRocm91Z2ggdGhlXG4gICAgLy8gYWJzdHJhY3QgZm9ybSBjb250cm9sIGluc3RhbmNlLlxuICAgIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogKCkgPT4ge30sXG4gICAgcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogKCkgPT4gbnVsbCBhcyBhbnksXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9GT1JNX0ZJRUxEX0RFRkFVTFRfT1BUSU9OUylcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGVmYXVsdHM/OiBNYXRGb3JtRmllbGREZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfTEFCRUxfR0xPQkFMX09QVElPTlMpIHByaXZhdGUgX2xhYmVsT3B0aW9ucz86IExhYmVsT3B0aW9ucyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIGlmIChfZGVmYXVsdHMgJiYgX2RlZmF1bHRzLmFwcGVhcmFuY2UpIHtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZSA9IF9kZWZhdWx0cy5hcHBlYXJhbmNlO1xuICAgIH0gZWxzZSBpZiAoX2RlZmF1bHRzICYmIF9kZWZhdWx0cy5oaWRlUmVxdWlyZWRNYXJrZXIpIHtcbiAgICAgIHRoaXMuaGlkZVJlcXVpcmVkTWFya2VyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENUZXh0RmllbGRGb3VuZGF0aW9uKHRoaXMuX2FkYXB0ZXIpO1xuXG4gICAgLy8gTURDIHVzZXMgdGhlIFwic2hvdWxkRmxvYXRcIiBnZXR0ZXIgdG8ga25vdyB3aGV0aGVyIHRoZSBsYWJlbCBpcyBjdXJyZW50bHkgZmxvYXRpbmcuIFRoaXNcbiAgICAvLyBkb2VzIG5vdCBtYXRjaCBvdXIgaW1wbGVtZW50YXRpb24gb2Ygd2hlbiB0aGUgbGFiZWwgZmxvYXRzIGJlY2F1c2Ugd2Ugc3VwcG9ydCBtb3JlIGNhc2VzLlxuICAgIC8vIEZvciBleGFtcGxlLCBjb25zdW1lcnMgY2FuIHNldCBcIkBJbnB1dCBmbG9hdExhYmVsXCIgdG8gYWx3YXlzLCBvciB0aGUgY3VzdG9tIGZvcm0tZmllbGRcbiAgICAvLyBjb250cm9sIGNhbiBzZXQgXCJNYXRGb3JtRmllbGRDb250cm9sI3Nob3VsZExhYmVsRmxvYXRcIiB0byB0cnVlLiBUbyBlbnN1cmUgdGhhdCBNREMga25vd3NcbiAgICAvLyB3aGVuIHRoZSBsYWJlbCBpcyBmbG9hdGluZywgd2Ugb3ZlcndyaXRlIHRoZSBwcm9wZXJ0eSB0byBiZSBiYXNlZCBvbiB0aGUgbWV0aG9kIHdlIHVzZSB0b1xuICAgIC8vIGRldGVybWluZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgZmxvYXRpbmcgbGFiZWwuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuX2ZvdW5kYXRpb24sICdzaG91bGRGbG9hdCcsIHtcbiAgICAgIGdldDogKCkgPT4gdGhpcy5fc2hvdWxkTGFiZWxGbG9hdCgpLFxuICAgIH0pO1xuXG4gICAgLy8gQnkgZGVmYXVsdCwgdGhlIGZvdW5kYXRpb24gZGV0ZXJtaW5lcyB0aGUgdmFsaWRpdHkgb2YgdGhlIHRleHQtZmllbGQgZnJvbSB0aGVcbiAgICAvLyBzcGVjaWZpZWQgbmF0aXZlIGlucHV0LiBTaW5jZSB3ZSBkb24ndCBwYXNzIGEgbmF0aXZlIGlucHV0IHRvIHRoZSBmb3VuZGF0aW9uIGJlY2F1c2VcbiAgICAvLyBhYnN0cmFjdCBmb3JtIGNvbnRyb2xzIGFyZSBub3QgbmVjZXNzYXJpbHkgY29uc2lzdGluZyBvZiBhbiBpbnB1dCwgd2UgaGFuZGxlIHRoZVxuICAgIC8vIHRleHQtZmllbGQgdmFsaWRpdHkgdGhyb3VnaCB0aGUgYWJzdHJhY3QgZm9ybS1maWVsZCBjb250cm9sIHN0YXRlLlxuICAgIHRoaXMuX2ZvdW5kYXRpb24uaXNWYWxpZCA9ICgpID0+ICF0aGlzLl9jb250cm9sLmVycm9yU3RhdGU7XG5cbiAgICAvLyBJbml0aWFsIGZvY3VzIHN0YXRlIHN5bmMuIFRoaXMgaGFwcGVucyByYXJlbHksIGJ1dCB3ZSB3YW50IHRvIGFjY291bnQgZm9yXG4gICAgLy8gaXQgaW4gY2FzZSB0aGUgZm9ybS1maWVsZCBjb250cm9sIGhhcyBcImZvY3VzZWRcIiBzZXQgdG8gdHJ1ZSBvbiBpbml0LlxuICAgIHRoaXMuX3VwZGF0ZUZvY3VzU3RhdGUoKTtcbiAgICAvLyBJbml0aWFsIG5vdGNoIHdpZHRoIHVwZGF0ZS4gVGhpcyBpcyBuZWVkZWQgaW4gY2FzZSB0aGUgdGV4dC1maWVsZCBsYWJlbCBmbG9hdHNcbiAgICAvLyBvbiBpbml0aWFsaXphdGlvbiwgYW5kIHJlbmRlcnMgaW5zaWRlIG9mIHRoZSBub3RjaGVkIG91dGxpbmUuXG4gICAgdGhpcy5fcmVmcmVzaE91dGxpbmVOb3RjaFdpZHRoKCk7XG4gICAgLy8gRW5hYmxlIGFuaW1hdGlvbnMgbm93LiBUaGlzIGVuc3VyZXMgd2UgZG9uJ3QgYW5pbWF0ZSBvbiBpbml0aWFsIHJlbmRlci5cbiAgICB0aGlzLl9zdWJzY3JpcHRBbmltYXRpb25TdGF0ZSA9ICdlbnRlcic7XG4gICAgLy8gQmVjYXVzZSB0aGUgYWJvdmUgY2hhbmdlcyBhIHZhbHVlIHVzZWQgaW4gdGhlIHRlbXBsYXRlIGFmdGVyIGl0IHdhcyBjaGVja2VkLCB3ZSBuZWVkXG4gICAgLy8gdG8gdHJpZ2dlciBDRCBvciB0aGUgY2hhbmdlIG1pZ2h0IG5vdCBiZSByZWZsZWN0ZWQgaWYgdGhlcmUgaXMgbm8gb3RoZXIgQ0Qgc2NoZWR1bGVkLlxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9hc3NlcnRGb3JtRmllbGRDb250cm9sKCk7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUNvbnRyb2woKTtcbiAgICB0aGlzLl9pbml0aWFsaXplU3Vic2NyaXB0KCk7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVByZWZpeEFuZFN1ZmZpeCgpO1xuICAgIHRoaXMuX2luaXRpYWxpemVPdXRsaW5lTGFiZWxPZmZzZXRTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fYXNzZXJ0Rm9ybUZpZWxkQ29udHJvbCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIEVsZW1lbnRSZWYgZm9yIHRoZSBlbGVtZW50IHRoYXQgYSBvdmVybGF5IGF0dGFjaGVkIHRvIHRoZSBmb3JtLWZpZWxkXG4gICAqIHNob3VsZCBiZSBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvLlxuICAgKi9cbiAgZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dEZpZWxkIHx8IHRoaXMuX2VsZW1lbnRSZWY7XG4gIH1cblxuICAvKiogQW5pbWF0ZXMgdGhlIHBsYWNlaG9sZGVyIHVwIGFuZCBsb2NrcyBpdCBpbiBwb3NpdGlvbi4gKi9cbiAgX2FuaW1hdGVBbmRMb2NrTGFiZWwoKTogdm9pZCB7XG4gICAgLy8gVGhpcyBpcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgb25seS4gQ29uc3VtZXJzIG9mIHRoZSBmb3JtLWZpZWxkIG1pZ2h0IHVzZVxuICAgIC8vIHRoaXMgbWV0aG9kLiBlLmcuIHRoZSBhdXRvY29tcGxldGUgdHJpZ2dlci4gVGhpcyBtZXRob2QgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIG5vbi1NRENcbiAgICAvLyBmb3JtLWZpZWxkIGJlY2F1c2Ugc2V0dGluZyBcImZsb2F0TGFiZWxcIiB0byBcImFsd2F5c1wiIGNhdXNlZCB0aGUgbGFiZWwgdG8gZmxvYXQgd2l0aG91dFxuICAgIC8vIGFuaW1hdGlvbi4gVGhpcyBpcyBkaWZmZXJlbnQgaW4gTURDIHdoZXJlIHRoZSBsYWJlbCBhbHdheXMgYW5pbWF0ZXMsIHNvIHRoaXMgbWV0aG9kXG4gICAgLy8gaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeS4gVGhlcmUgZG9lc24ndCBzZWVtIGFueSBiZW5lZml0IGluIGFkZGluZyBsb2dpYyB0byBhbGxvdyBjaGFuZ2luZ1xuICAgIC8vIHRoZSBmbG9hdGluZyBsYWJlbCBzdGF0ZSB3aXRob3V0IGFuaW1hdGlvbnMuIFRoZSBub24tTURDIGltcGxlbWVudGF0aW9uIHdhcyBpbmNvbnNpc3RlbnRcbiAgICAvLyBiZWNhdXNlIGl0IGFsd2F5cyBhbmltYXRlcyBpZiBcImZsb2F0TGFiZWxcIiBpcyBzZXQgYXdheSBmcm9tIFwiYWx3YXlzXCIuXG4gICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogY29uc2lkZXIgcmVtb3ZpbmcgdGhpcyBtZXRob2Qgd2hlbiByZWxlYXNpbmcgdGhlIE1EQyBmb3JtLWZpZWxkLlxuICAgIGlmICh0aGlzLl9oYXNGbG9hdGluZ0xhYmVsKCkpIHtcbiAgICAgIHRoaXMuZmxvYXRMYWJlbCA9ICdhbHdheXMnO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyB0aGUgcmVnaXN0ZXJlZCBmb3JtLWZpZWxkIGNvbnRyb2wuICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVDb250cm9sKCkge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLl9jb250cm9sO1xuXG4gICAgaWYgKGNvbnRyb2wuY29udHJvbFR5cGUpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBgbWF0LW1kYy1mb3JtLWZpZWxkLXR5cGUtJHtjb250cm9sLmNvbnRyb2xUeXBlfWApO1xuICAgIH1cblxuICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBjaGlsZCBjb250cm9sIHN0YXRlIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgZm9ybSBmaWVsZCBVSS5cbiAgICBjb250cm9sLnN0YXRlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fdXBkYXRlRm9jdXNTdGF0ZSgpO1xuICAgICAgdGhpcy5fc3luY0Rlc2NyaWJlZEJ5SWRzKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcblxuICAgIC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGlmIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgIGlmIChjb250cm9sLm5nQ29udHJvbCAmJiBjb250cm9sLm5nQ29udHJvbC52YWx1ZUNoYW5nZXMpIHtcbiAgICAgIGNvbnRyb2wubmdDb250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEluaXRpYWxpemVzIHRoZSBwcmVmaXggYW5kIHN1ZmZpeCBjb250YWluZXJzLiAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplUHJlZml4QW5kU3VmZml4KCkge1xuICAgIC8vIE1hcmsgdGhlIGZvcm0tZmllbGQgYXMgZGlydHkgd2hlbmV2ZXIgdGhlIHByZWZpeCBvciBzdWZmaXggY2hpbGRyZW4gY2hhbmdlLiBUaGlzXG4gICAgLy8gaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgY29uZGl0aW9uYWxseSBkaXNwbGF5IHRoZSBwcmVmaXgvc3VmZml4IGNvbnRhaW5lcnMgYmFzZWRcbiAgICAvLyBvbiB3aGV0aGVyIHRoZXJlIGlzIHByb2plY3RlZCBjb250ZW50LlxuICAgIG1lcmdlKHRoaXMuX3ByZWZpeENoaWxkcmVuLmNoYW5nZXMsIHRoaXMuX3N1ZmZpeENoaWxkcmVuLmNoYW5nZXMpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3Vic2NyaXB0IGJ5IHZhbGlkYXRpbmcgaGludHMgYW5kIHN5bmNocm9uaXppbmcgXCJhcmlhLWRlc2NyaWJlZGJ5XCIgaWRzXG4gICAqIHdpdGggdGhlIGN1c3RvbSBmb3JtLWZpZWxkIGNvbnRyb2wuIEFsc28gc3Vic2NyaWJlcyB0byBoaW50IGFuZCBlcnJvciBjaGFuZ2VzIGluIG9yZGVyXG4gICAqIHRvIGJlIGFibGUgdG8gdmFsaWRhdGUgYW5kIHN5bmNocm9uaXplIGlkcyBvbiBjaGFuZ2UuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplU3Vic2NyaXB0KCkge1xuICAgIC8vIFJlLXZhbGlkYXRlIHdoZW4gdGhlIG51bWJlciBvZiBoaW50cyBjaGFuZ2VzLlxuICAgIHRoaXMuX2hpbnRDaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9wcm9jZXNzSGludHMoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBhcmlhLWRlc2NyaWJlZCBieSB3aGVuIHRoZSBudW1iZXIgb2YgZXJyb3JzIGNoYW5nZXMuXG4gICAgdGhpcy5fZXJyb3JDaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9zeW5jRGVzY3JpYmVkQnlJZHMoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbCBtYXQtaGludCB2YWxpZGF0aW9uIGFuZCBzdWJzY3JpcHQgZGVzY3JpYmVkQnlJZHMgc3luYy5cbiAgICB0aGlzLl92YWxpZGF0ZUhpbnRzKCk7XG4gICAgdGhpcy5fc3luY0Rlc2NyaWJlZEJ5SWRzKCk7XG4gIH1cblxuICAvKiogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBmb3JtIGZpZWxkJ3MgY29udHJvbCBpcyBtaXNzaW5nLiAqL1xuICBwcml2YXRlIF9hc3NlcnRGb3JtRmllbGRDb250cm9sKCkge1xuICAgIGlmICghdGhpcy5fY29udHJvbCkge1xuICAgICAgdGhyb3cgZ2V0TWF0Rm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZvY3VzU3RhdGUoKSB7XG4gICAgLy8gVXN1YWxseSB0aGUgTURDIGZvdW5kYXRpb24gd291bGQgY2FsbCBcImFjdGl2YXRlRm9jdXNcIiBhbmQgXCJkZWFjdGl2YXRlRm9jdXNcIiB3aGVuZXZlclxuICAgIC8vIGNlcnRhaW4gRE9NIGV2ZW50cyBhcmUgZW1pdHRlZC4gVGhpcyBpcyBub3QgcG9zc2libGUgaW4gb3VyIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuICAgIC8vIGZvcm0tZmllbGQgYmVjYXVzZSB3ZSBzdXBwb3J0IGFic3RyYWN0IGZvcm0gZmllbGQgY29udHJvbHMgd2hpY2ggYXJlIG5vdCBuZWNlc3NhcmlseVxuICAgIC8vIG9mIHR5cGUgaW5wdXQsIG5vciBkbyB3ZSBoYXZlIGEgcmVmZXJlbmNlIHRvIGEgbmF0aXZlIGZvcm0tZmllbGQgY29udHJvbCBlbGVtZW50LiBJbnN0ZWFkXG4gICAgLy8gd2UgaGFuZGxlIHRoZSBmb2N1cyBieSBjaGVja2luZyBpZiB0aGUgYWJzdHJhY3QgZm9ybS1maWVsZCBjb250cm9sIGZvY3VzZWQgc3RhdGUgY2hhbmdlcy5cbiAgICBpZiAodGhpcy5fY29udHJvbC5mb2N1c2VkICYmICF0aGlzLl9pc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2lzRm9jdXNlZCA9IHRydWU7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmFjdGl2YXRlRm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9jb250cm9sLmZvY3VzZWQgJiYgKHRoaXMuX2lzRm9jdXNlZCB8fCB0aGlzLl9pc0ZvY3VzZWQgPT09IG51bGwpKSB7XG4gICAgICB0aGlzLl9pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVhY3RpdmF0ZUZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmbG9hdGluZyBsYWJlbCBpbiB0aGUgZG9ja2VkIHN0YXRlIG5lZWRzIHRvIGFjY291bnQgZm9yIHByZWZpeGVzLiBUaGUgaG9yaXpvbnRhbCBvZmZzZXRcbiAgICogaXMgY2FsY3VsYXRlZCB3aGVuZXZlciB0aGUgYXBwZWFyYW5jZSBjaGFuZ2VzIHRvIGBvdXRsaW5lYCwgdGhlIHByZWZpeGVzIGNoYW5nZSwgb3Igd2hlbiB0aGVcbiAgICogZm9ybS1maWVsZCBpcyBhZGRlZCB0byB0aGUgRE9NLiBUaGlzIG1ldGhvZCBzZXRzIHVwIGFsbCBzdWJzY3JpcHRpb25zIHdoaWNoIGFyZSBuZWVkZWQgdG9cbiAgICogdHJpZ2dlciB0aGUgbGFiZWwgb2Zmc2V0IHVwZGF0ZS4gSW4gZ2VuZXJhbCwgd2Ugd2FudCB0byBhdm9pZCBwZXJmb3JtaW5nIG1lYXN1cmVtZW50cyBvZnRlbixcbiAgICogc28gd2UgcmVseSBvbiB0aGUgYE5nWm9uZWAgYXMgaW5kaWNhdG9yIHdoZW4gdGhlIG9mZnNldCBzaG91bGQgYmUgcmVjYWxjdWxhdGVkLCBpbnN0ZWFkIG9mXG4gICAqIGNoZWNraW5nIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplT3V0bGluZUxhYmVsT2Zmc2V0U3Vic2NyaXB0aW9ucygpIHtcbiAgICAvLyBXaGVuZXZlciB0aGUgcHJlZml4IGNoYW5nZXMsIHNjaGVkdWxlIGFuIHVwZGF0ZSBvZiB0aGUgbGFiZWwgb2Zmc2V0LlxuICAgIHRoaXMuX3ByZWZpeENoaWxkcmVuLmNoYW5nZXNcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmVlZHNPdXRsaW5lTGFiZWxPZmZzZXRVcGRhdGVPblN0YWJsZSA9IHRydWUpO1xuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGhhdmUgdG8gcnVuIG91dHNpZGUgb2YgdGhlIGBOZ1pvbmVgIGV4cGxpY2l0bHksIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgLy8gdGhyb3dpbmcgdXNlcnMgaW50byBhbiBpbmZpbml0ZSBsb29wIGlmIGB6b25lLXBhdGNoLXJ4anNgIGlzIGluY2x1ZGVkLlxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX25lZWRzT3V0bGluZUxhYmVsT2Zmc2V0VXBkYXRlT25TdGFibGUpIHtcbiAgICAgICAgICB0aGlzLl9uZWVkc091dGxpbmVMYWJlbE9mZnNldFVwZGF0ZU9uU3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlT3V0bGluZUxhYmVsT2Zmc2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZGlyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZWVkc091dGxpbmVMYWJlbE9mZnNldFVwZGF0ZU9uU3RhYmxlID0gdHJ1ZSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZmxvYXRpbmcgbGFiZWwgc2hvdWxkIGFsd2F5cyBmbG9hdCBvciBub3QuICovXG4gIF9zaG91bGRBbHdheXNGbG9hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5mbG9hdExhYmVsID09PSAnYWx3YXlzJztcbiAgfVxuXG4gIF9oYXNPdXRsaW5lKCkge1xuICAgIHJldHVybiB0aGlzLmFwcGVhcmFuY2UgPT09ICdvdXRsaW5lJztcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgZGlzcGxheSBpbiB0aGUgaW5maXguIExhYmVscyBpbiB0aGUgb3V0bGluZSBhcHBlYXJhbmNlIGFyZVxuICAgKiBkaXNwbGF5ZWQgYXMgcGFydCBvZiB0aGUgbm90Y2hlZC1vdXRsaW5lIGFuZCBhcmUgaG9yaXpvbnRhbGx5IG9mZnNldCB0byBhY2NvdW50IGZvclxuICAgKiBmb3JtLWZpZWxkIHByZWZpeCBjb250ZW50LiBUaGlzIHdvbid0IHdvcmsgaW4gc2VydmVyIHNpZGUgcmVuZGVyaW5nIHNpbmNlIHdlIGNhbm5vdFxuICAgKiBtZWFzdXJlIHRoZSB3aWR0aCBvZiB0aGUgcHJlZml4IGNvbnRhaW5lci4gVG8gbWFrZSB0aGUgZG9ja2VkIGxhYmVsIGFwcGVhciBhcyBpZiB0aGVcbiAgICogcmlnaHQgb2Zmc2V0IGhhcyBiZWVuIGNhbGN1bGF0ZWQsIHdlIGZvcmNpYmx5IHJlbmRlciB0aGUgbGFiZWwgaW5zaWRlIHRoZSBpbmZpeC4gU2luY2VcbiAgICogdGhlIGxhYmVsIGlzIHBhcnQgb2YgdGhlIGluZml4LCB0aGUgbGFiZWwgY2Fubm90IG92ZXJmbG93IHRoZSBwcmVmaXggY29udGVudC5cbiAgICovXG4gIF9mb3JjZURpc3BsYXlJbmZpeExhYmVsKCkge1xuICAgIHJldHVybiAhdGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyICYmIHRoaXMuX3ByZWZpeENoaWxkcmVuLmxlbmd0aCAmJiAhdGhpcy5fc2hvdWxkTGFiZWxGbG9hdCgpO1xuICB9XG5cbiAgX2hhc0Zsb2F0aW5nTGFiZWwoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5fbGFiZWxDaGlsZE5vblN0YXRpYyB8fCAhIXRoaXMuX2xhYmVsQ2hpbGRTdGF0aWM7XG4gIH1cblxuICBfc2hvdWxkTGFiZWxGbG9hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbC5zaG91bGRMYWJlbEZsb2F0IHx8IHRoaXMuX3Nob3VsZEFsd2F5c0Zsb2F0KCk7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgY2xhc3MgZnJvbSB0aGUgTmdDb250cm9sIHNob3VsZCBiZSBmb3J3YXJkZWQgdG8gdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgX3Nob3VsZEZvcndhcmQocHJvcDoga2V5b2YgTmdDb250cm9sKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmdDb250cm9sID0gdGhpcy5fY29udHJvbCA/IHRoaXMuX2NvbnRyb2wubmdDb250cm9sIDogbnVsbDtcbiAgICByZXR1cm4gbmdDb250cm9sICYmIG5nQ29udHJvbFtwcm9wXTtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gZGlzcGxheSBoaW50cyBvciBlcnJvcnMuICovXG4gIF9nZXREaXNwbGF5ZWRNZXNzYWdlcygpOiAnZXJyb3InIHwgJ2hpbnQnIHtcbiAgICByZXR1cm4gKHRoaXMuX2Vycm9yQ2hpbGRyZW4gJiYgdGhpcy5fZXJyb3JDaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICB0aGlzLl9jb250cm9sLmVycm9yU3RhdGUpID8gJ2Vycm9yJyA6ICdoaW50JztcbiAgfVxuXG4gIC8qKiBSZWZyZXNoZXMgdGhlIHdpZHRoIG9mIHRoZSBvdXRsaW5lLW5vdGNoLCBpZiBwcmVzZW50LiAqL1xuICBfcmVmcmVzaE91dGxpbmVOb3RjaFdpZHRoKCkge1xuICAgIGlmICghdGhpcy5faGFzT3V0bGluZSgpIHx8ICF0aGlzLl9mbG9hdGluZ0xhYmVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFRoZSBvdXRsaW5lIG5vdGNoIHNob3VsZCBiZSBiYXNlZCBvbiB0aGUgbGFiZWwgd2lkdGgsIGJ1dCBuZWVkcyB0byByZXNwZWN0IHRoZSBzY2FsaW5nXG4gICAgLy8gYXBwbGllZCB0byB0aGUgbGFiZWwgaWYgaXQgYWN0aXZlbHkgZmxvYXRzLiBTaW5jZSB0aGUgbGFiZWwgYWx3YXlzIGZsb2F0cyB3aGVuIHRoZSBub3RjaFxuICAgIC8vIGlzIG9wZW4sIHRoZSBNREMgdGV4dC1maWVsZCBmbG9hdGluZyBsYWJlbCBzY2FsaW5nIGlzIHJlc3BlY3RlZCBpbiBub3RjaCB3aWR0aCBjYWxjdWxhdGlvbi5cbiAgICB0aGlzLl9vdXRsaW5lTm90Y2hXaWR0aCA9IHRoaXMuX2Zsb2F0aW5nTGFiZWwuZ2V0V2lkdGgoKSAqIG1kY1RleHRGaWVsZE51bWJlcnMuTEFCRUxfU0NBTEU7XG4gIH1cblxuICAvKiogRG9lcyBhbnkgZXh0cmEgcHJvY2Vzc2luZyB0aGF0IGlzIHJlcXVpcmVkIHdoZW4gaGFuZGxpbmcgdGhlIGhpbnRzLiAqL1xuICBwcml2YXRlIF9wcm9jZXNzSGludHMoKSB7XG4gICAgdGhpcy5fdmFsaWRhdGVIaW50cygpO1xuICAgIHRoaXMuX3N5bmNEZXNjcmliZWRCeUlkcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSB0aGF0IHRoZXJlIGlzIGEgbWF4aW11bSBvZiBvbmUgb2YgZWFjaCBcIm1hdC1oaW50XCIgYWxpZ25tZW50IHNwZWNpZmllZC4gVGhlIGhpbnRcbiAgICogbGFiZWwgc3BlY2lmaWVkIHNldCB0aHJvdWdoIHRoZSBpbnB1dCBpcyBiZWluZyBjb25zaWRlcmVkIGFzIFwic3RhcnRcIiBhbGlnbmVkLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIG5vb3AgaWYgQW5ndWxhciBydW5zIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICovXG4gIHByaXZhdGUgX3ZhbGlkYXRlSGludHMoKSB7XG4gICAgaWYgKGlzRGV2TW9kZSgpICYmIHRoaXMuX2hpbnRDaGlsZHJlbikge1xuICAgICAgbGV0IHN0YXJ0SGludDogTWF0SGludDtcbiAgICAgIGxldCBlbmRIaW50OiBNYXRIaW50O1xuICAgICAgdGhpcy5faGludENoaWxkcmVuLmZvckVhY2goKGhpbnQ6IE1hdEhpbnQpID0+IHtcbiAgICAgICAgaWYgKGhpbnQuYWxpZ24gPT09ICdzdGFydCcpIHtcbiAgICAgICAgICBpZiAoc3RhcnRIaW50IHx8IHRoaXMuaGludExhYmVsKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNYXRGb3JtRmllbGREdXBsaWNhdGVkSGludEVycm9yKCdzdGFydCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGFydEhpbnQgPSBoaW50O1xuICAgICAgICB9IGVsc2UgaWYgKGhpbnQuYWxpZ24gPT09ICdlbmQnKSB7XG4gICAgICAgICAgaWYgKGVuZEhpbnQpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1hdEZvcm1GaWVsZER1cGxpY2F0ZWRIaW50RXJyb3IoJ2VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbmRIaW50ID0gaGludDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpc3Qgb2YgZWxlbWVudCBJRHMgdGhhdCBkZXNjcmliZSB0aGUgY2hpbGQgY29udHJvbC4gVGhpcyBhbGxvd3MgdGhlIGNvbnRyb2wgdG8gdXBkYXRlXG4gICAqIGl0cyBgYXJpYS1kZXNjcmliZWRieWAgYXR0cmlidXRlIGFjY29yZGluZ2x5LlxuICAgKi9cbiAgcHJpdmF0ZSBfc3luY0Rlc2NyaWJlZEJ5SWRzKCkge1xuICAgIGlmICh0aGlzLl9jb250cm9sKSB7XG4gICAgICBsZXQgaWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5fZ2V0RGlzcGxheWVkTWVzc2FnZXMoKSA9PT0gJ2hpbnQnKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0SGludCA9IHRoaXMuX2hpbnRDaGlsZHJlbiA/XG4gICAgICAgICAgdGhpcy5faGludENoaWxkcmVuLmZpbmQoaGludCA9PiBoaW50LmFsaWduID09PSAnc3RhcnQnKSA6IG51bGw7XG4gICAgICAgIGNvbnN0IGVuZEhpbnQgPSB0aGlzLl9oaW50Q2hpbGRyZW4gP1xuICAgICAgICAgIHRoaXMuX2hpbnRDaGlsZHJlbi5maW5kKGhpbnQgPT4gaGludC5hbGlnbiA9PT0gJ2VuZCcpIDogbnVsbDtcblxuICAgICAgICBpZiAoc3RhcnRIaW50KSB7XG4gICAgICAgICAgaWRzLnB1c2goc3RhcnRIaW50LmlkKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9oaW50TGFiZWwpIHtcbiAgICAgICAgICBpZHMucHVzaCh0aGlzLl9oaW50TGFiZWxJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kSGludCkge1xuICAgICAgICAgIGlkcy5wdXNoKGVuZEhpbnQuaWQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2Vycm9yQ2hpbGRyZW4pIHtcbiAgICAgICAgaWRzID0gdGhpcy5fZXJyb3JDaGlsZHJlbi5tYXAoZXJyb3IgPT4gZXJyb3IuaWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jb250cm9sLnNldERlc2NyaWJlZEJ5SWRzKGlkcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGhvcml6b250YWwgb2Zmc2V0IG9mIHRoZSBsYWJlbCBpbiB0aGUgb3V0bGluZSBhcHBlYXJhbmNlLiBJbiB0aGUgb3V0bGluZVxuICAgKiBhcHBlYXJhbmNlLCB0aGUgbm90Y2hlZC1vdXRsaW5lIGFuZCBsYWJlbCBhcmUgbm90IHJlbGF0aXZlIHRvIHRoZSBpbmZpeCBjb250YWluZXIgYmVjYXVzZVxuICAgKiB0aGUgb3V0bGluZSBpbnRlbmRzIHRvIHN1cnJvdW5kIHByZWZpeGVzLCBzdWZmaXhlcyBhbmQgdGhlIGluZml4LiBUaGlzIG1lYW5zIHRoYXQgdGhlXG4gICAqIGZsb2F0aW5nIGxhYmVsIGJ5IGRlZmF1bHQgb3ZlcmxhcHMgcHJlZml4ZXMgaW4gdGhlIGRvY2tlZCBzdGF0ZS4gVG8gYXZvaWQgdGhpcywgd2UgbmVlZCB0b1xuICAgKiBob3Jpem9udGFsbHkgb2Zmc2V0IHRoZSBsYWJlbCBieSB0aGUgd2lkdGggb2YgdGhlIHByZWZpeCBjb250YWluZXIuIFRoZSBNREMgdGV4dC1maWVsZCBkb2VzXG4gICAqIG5vdCBuZWVkIHRvIGRvIHRoaXMgYmVjYXVzZSB0aGV5IHVzZSBhIGZpeGVkIHdpZHRoIGZvciBwcmVmaXhlcy4gSGVuY2UsIHRoZXkgY2FuIHNpbXBseVxuICAgKiBpbmNvcnBvcmF0ZSB0aGUgaG9yaXpvbnRhbCBvZmZzZXQgaW50byB0aGVpciBkZWZhdWx0IHRleHQtZmllbGQgc3R5bGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlT3V0bGluZUxhYmVsT2Zmc2V0KCkge1xuICAgIGlmICghdGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyIHx8ICF0aGlzLl9oYXNPdXRsaW5lKCkgfHwgIXRoaXMuX2Zsb2F0aW5nTGFiZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmxvYXRpbmdMYWJlbCA9IHRoaXMuX2Zsb2F0aW5nTGFiZWwuZWxlbWVudDtcbiAgICAvLyBJZiBubyBwcmVmaXggaXMgZGlzcGxheWVkLCByZXNldCB0aGUgb3V0bGluZSBsYWJlbCBvZmZzZXQgZnJvbSBwb3RlbnRpYWxcbiAgICAvLyBwcmV2aW91cyBsYWJlbCBvZmZzZXQgdXBkYXRlcy5cbiAgICBpZiAoIXRoaXMuX3ByZWZpeENvbnRhaW5lcikge1xuICAgICAgZmxvYXRpbmdMYWJlbC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGZvcm0tZmllbGQgaXMgbm90IGF0dGFjaGVkIHRvIHRoZSBET00geWV0IChlLmcuIGluIGEgdGFiKSwgd2UgZGVmZXJcbiAgICAvLyB0aGUgbGFiZWwgb2Zmc2V0IHVwZGF0ZSB1bnRpbCB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgIGlmICghdGhpcy5faXNBdHRhY2hlZFRvRG9tKCkpIHtcbiAgICAgIHRoaXMuX25lZWRzT3V0bGluZUxhYmVsT2Zmc2V0VXBkYXRlT25TdGFibGUgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwcmVmaXhDb250YWluZXIgPSB0aGlzLl9wcmVmaXhDb250YWluZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBJZiB0aGUgZGlyZWN0aW9uYWxpdHkgaXMgUlRMLCB0aGUgeC1heGlzIHRyYW5zZm9ybSBuZWVkcyB0byBiZSBpbnZlcnRlZC4gVGhpc1xuICAgIC8vIGlzIGJlY2F1c2UgYHRyYW5zZm9ybVhgIGRvZXMgbm90IGNoYW5nZSBiYXNlZCBvbiB0aGUgcGFnZSBkaXJlY3Rpb25hbGl0eS5cbiAgICBjb25zdCBsYWJlbEhvcml6b250YWxPZmZzZXQgPVxuICAgICAgKHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcgPyAtMSA6IDEpICogcHJlZml4Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB0cmFuc2Zvcm0gdGhlIGZsb2F0aW5nIGxhYmVsIHRvIGFjY291bnQgZm9yIHRoZSBwcmVmaXggY29udGFpbmVyLiBOb3RlXG4gICAgLy8gdGhhdCB3ZSBkbyBub3Qgd2FudCB0byBvdmVyd3JpdGUgdGhlIGRlZmF1bHQgdHJhbnNmb3JtIGZvciBkb2NrZWQgZmxvYXRpbmcgbGFiZWxzLlxuICAgIGZsb2F0aW5nTGFiZWwuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgYCR7RkxPQVRJTkdfTEFCRUxfREVGQVVMVF9ET0NLRURfVFJBTlNGT1JNfSB0cmFuc2xhdGVYKCR7bGFiZWxIb3Jpem9udGFsT2Zmc2V0fXB4KWA7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGZvcm0gZmllbGQgaXMgYXR0YWNoZWQgdG8gdGhlIERPTS4gKi9cbiAgcHJpdmF0ZSBfaXNBdHRhY2hlZFRvRG9tKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChlbGVtZW50LmdldFJvb3ROb2RlKSB7XG4gICAgICBjb25zdCByb290Tm9kZSA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKTtcbiAgICAgIC8vIElmIHRoZSBlbGVtZW50IGlzIGluc2lkZSB0aGUgRE9NIHRoZSByb290IG5vZGUgd2lsbCBiZSBlaXRoZXIgdGhlIGRvY3VtZW50XG4gICAgICAvLyBvciB0aGUgY2xvc2VzdCBzaGFkb3cgcm9vdCwgb3RoZXJ3aXNlIGl0J2xsIGJlIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAgICAgIHJldHVybiByb290Tm9kZSAmJiByb290Tm9kZSAhPT0gZWxlbWVudDtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlIGZhbGwgYmFjayB0byBjaGVja2luZyBpZiBpdCdzIGluIHRoZSBkb2N1bWVudC4gVGhpcyBkb2Vzbid0IGFjY291bnQgZm9yXG4gICAgLy8gc2hhZG93IERPTSwgaG93ZXZlciBicm93c2VyIHRoYXQgc3VwcG9ydCBzaGFkb3cgRE9NIHNob3VsZCBzdXBwb3J0IGBnZXRSb290Tm9kZWAgYXMgd2VsbC5cbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IS5jb250YWlucyhlbGVtZW50KTtcbiAgfVxufVxuIl19