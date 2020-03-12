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
import { getMatFormFieldDuplicatedHintError, getMatFormFieldMissingControlError, MatFormField as NonMdcFormField, matFormFieldAnimations, MatFormFieldControl, } from '@angular/material/form-field';
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
export class MatFormField {
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
        this._hintLabelId = `mat-hint-${nextUniqueId++}`;
        // Unique id for the internal form field label.
        this._labelId = `mat-form-field-label-${nextUniqueId++}`;
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
                    { provide: NonMdcFormField, useExisting: MatFormField }
                ],
                styles: [".mdc-text-field{height:56px;border-radius:4px 4px 0 0;display:inline-flex;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{left:16px;right:initial;top:50%;transform:translateY(-50%);pointer-events:none}[dir=rtl] .mdc-text-field .mdc-floating-label,.mdc-text-field .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--textarea .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--textarea .mdc-floating-label,.mdc-text-field--textarea .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above{left:40px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above[dir=rtl]{left:initial;right:40px}.mdc-text-field__input{padding:20px 16px 7px;align-self:flex-end;box-sizing:border-box;width:100%;height:100%;border:none;border-radius:0;background:none;appearance:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input:-webkit-autofill{z-index:auto !important}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input{padding-top:0;padding-bottom:1px}.mdc-text-field__input:-webkit-autofill+.mdc-floating-label{transform:translateY(-50%) scale(0.75);cursor:auto}.mdc-text-field--outlined{overflow:visible}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__input{padding-top:12px;padding-bottom:14px;display:flex;border:none !important;background-color:transparent;z-index:1}.mdc-text-field--outlined .mdc-text-field__icon{z-index:2}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--outlined.mdc-text-field--dense{height:48px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) scale(1)}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) scale(0.8)}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 7px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{top:14px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__icon{top:12px}.mdc-text-field--with-leading-icon .mdc-text-field__icon--leading{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon .mdc-text-field__input{padding-left:48px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-text-field__input,.mdc-text-field--with-leading-icon .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:48px}.mdc-text-field--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-floating-label,.mdc-text-field--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon--leading{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) translateX(-21px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-134%) translateX(21px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) translateX(-21px) scale(0.8)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-120%) translateX(21px) scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{left:32px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:32px}.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing,.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-trailing-icon .mdc-text-field__input{padding-left:16px;padding-right:48px}[dir=rtl] .mdc-text-field--with-trailing-icon .mdc-text-field__input,.mdc-text-field--with-trailing-icon .mdc-text-field__input[dir=rtl]{padding-left:48px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--leading{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__input{padding-right:48px;padding-left:48px}.mdc-text-field--dense .mdc-text-field__icon{bottom:16px;transform:scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon--leading{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:12px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:44px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:44px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label{left:44px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:44px}.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:16px;padding-right:44px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:44px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--leading{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--leading,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--leading[dir=rtl]{left:initial;right:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon--trailing[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input{padding-right:44px;padding-left:44px}.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-70%) scale(0.8)}.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 0}.mdc-text-field__input:required~.mdc-floating-label::after,.mdc-text-field__input:required~.mdc-notched-outline .mdc-floating-label::after{margin-left:1px;content:\"*\"}.mdc-text-field--textarea{display:inline-flex;width:auto;height:auto;overflow:visible;transition:none}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--textarea .mdc-floating-label--float-above{transform:translateY(-144%) scale(1)}.mdc-text-field--textarea .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-130%) scale(0.75)}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea .mdc-text-field-character-counter{left:initial;right:16px;position:absolute;bottom:13px}[dir=rtl] .mdc-text-field--textarea .mdc-text-field-character-counter,.mdc-text-field--textarea .mdc-text-field-character-counter[dir=rtl]{left:16px;right:initial}.mdc-text-field--textarea .mdc-text-field__input{align-self:auto;box-sizing:border-box;height:auto;margin:8px 1px 1px 0;padding:0 16px 16px}.mdc-text-field--textarea .mdc-text-field-character-counter+.mdc-text-field__input{margin-bottom:28px;padding-bottom:0}.mdc-text-field--textarea .mdc-floating-label{top:17px;width:auto;pointer-events:none}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--fullwidth{width:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea){display:block}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__input{padding:0 0 1px}.mdc-text-field--fullwidth.mdc-text-field--textarea .mdc-text-field__input{resize:vertical}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field--dense+.mdc-text-field-helper-line{margin-bottom:4px}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}.mdc-floating-label{position:absolute;left:0;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline{display:flex;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / .75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:\"\"}.mdc-line-ripple::before{border-bottom-width:1px;z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mat-mdc-form-field>.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-textarea-input{resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field .mdc-floating-label::after{display:none}.mat-mdc-input-element{font:inherit;border:none}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-input-element.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-input-element{padding:0}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix{padding-top:24px;padding-bottom:12px}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-infix,.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix{padding-top:20px;padding-bottom:16px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex{padding:0 16px}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mdc-floating-label{left:0;right:0}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75) !important}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-text-field-wrapper .mdc-floating-label{top:28px}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;overflow:hidden}.mat-mdc-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0}.mat-mdc-form-field{display:inline-flex;flex-direction:column}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;min-height:56px;box-sizing:border-box}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--fullwidth .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--fullwidth .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-dense 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-dense 250ms 1}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-70%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-70%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense{0%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl{0%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-textarea{0%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-130%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFJTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUVOLFFBQVEsRUFDUixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBRUwsd0JBQXdCLEVBRXpCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNMLGtDQUFrQyxFQUNsQyxrQ0FBa0MsRUFDbEMsWUFBWSxJQUFJLGVBQWUsRUFDL0Isc0JBQXNCLEVBQ3RCLG1CQUFtQixHQUNwQixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFFTCxzQkFBc0IsRUFDdEIsT0FBTyxJQUFJLG1CQUFtQixFQUMvQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFZOUMsZ0RBR0M7OztJQUZDLGdEQUFvQzs7SUFDcEMsd0RBQTZCOzs7Ozs7O0FBTy9CLE1BQU0sT0FBTyw4QkFBOEIsR0FDekMsSUFBSSxjQUFjLENBQTZCLGdDQUFnQyxDQUFDOztJQUU5RSxZQUFZLEdBQUcsQ0FBQzs7Ozs7TUFHZCxrQkFBa0IsR0FBMkIsTUFBTTs7Ozs7TUFHbkQsbUJBQW1CLEdBQW1CLE1BQU07Ozs7Ozs7TUFPNUMsdUNBQXVDLEdBQUcsa0JBQWtCOzs7O0FBbUNsRSxNQUFNLE9BQU8sWUFBWTs7Ozs7Ozs7Ozs7SUErSnZCLFlBQW9CLFdBQXVCLEVBQ3ZCLGtCQUFxQyxFQUNyQyxPQUFlLEVBQ2YsSUFBb0IsRUFDcEIsU0FBbUIsRUFFbkIsU0FBc0MsRUFDUSxhQUE0QixFQUNoQyxjQUF1QjtRQVJqRSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBRW5CLGNBQVMsR0FBVCxTQUFTLENBQTZCO1FBQ1Esa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQVM7Ozs7UUF0SjVFLHVCQUFrQixHQUFZLEtBQUssQ0FBQzs7OztRQUdwQyxVQUFLLEdBQWlCLFNBQVMsQ0FBQztRQWlDakMsZ0JBQVcsR0FBMkIsa0JBQWtCLENBQUM7UUFTekQsZUFBVSxHQUFHLEVBQUUsQ0FBQzs7UUFHeEIsaUJBQVksR0FBVyxZQUFZLFlBQVksRUFBRSxFQUFFLENBQUM7O1FBR3BELGFBQVEsR0FBRyx3QkFBd0IsWUFBWSxFQUFFLEVBQUUsQ0FBQzs7OztRQUdwRCw2QkFBd0IsR0FBVyxFQUFFLENBQUM7UUFXOUIsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDakMsZUFBVSxHQUFpQixJQUFJLENBQUM7UUFHaEMsMkNBQXNDLEdBQUcsS0FBSyxDQUFDO1FBQy9DLGFBQVEsR0FBd0I7WUFDdEMsUUFBUTs7OztZQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM3RSxXQUFXOzs7O1lBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ25GLFFBQVE7Ozs7WUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFbEYsUUFBUTs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7WUFDeEMsU0FBUzs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUE7WUFDdEMsVUFBVTs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7Ozs7WUFPcEMsVUFBVTs7O1lBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBOzs7O1lBS3BCLFVBQVU7OztZQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTs7Ozs7Ozs7O1lBVXBCLGFBQWE7OztZQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN0QixZQUFZOzs7WUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7WUFDdEIsWUFBWTs7O1lBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBO1lBRXRCLGtCQUFrQjs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ3pFLG9CQUFvQjs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFBOzs7Ozs7OztZQVM3RSwrQkFBK0I7OztZQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTtZQUN6QyxpQ0FBaUM7OztZQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTs7Ozs7WUFNM0MsY0FBYzs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBOzs7O1lBSzFCLDRCQUE0Qjs7O1lBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFBOzs7OztZQU10QyxxQ0FBcUM7OztZQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTtZQUMvQyxtQ0FBbUM7OztZQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQTs7Ozs7WUFNN0MsMENBQTBDOzs7WUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7WUFDcEQsd0NBQXdDOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQTtTQUM1RCxDQUFDO1FBV0EsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDeEM7YUFBTSxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsa0JBQWtCLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNoQztJQUNILENBQUM7Ozs7O0lBdEpELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7ZUFDcEUsbUJBQW1CLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUFxQjtRQUNsQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLGtGQUFrRjtZQUNsRixxRkFBcUY7WUFDckYsdUZBQXVGO1lBQ3ZGLDJFQUEyRTtZQUMzRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDOzs7OztJQUlELElBQ0ksVUFBVSxLQUE2QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNyRSxJQUFJLFVBQVUsQ0FBQyxLQUE2Qjs7Y0FDcEMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDO1FBQ2hHLDBGQUEwRjtRQUMxRix1RkFBdUY7UUFDdkYsdUZBQXVGO1FBQ3ZGLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDbkUsSUFBSSxDQUFDLHNDQUFzQyxHQUFHLElBQUksQ0FBQztTQUNwRDtJQUNILENBQUM7Ozs7O0lBSUQsSUFDSSxTQUFTLEtBQWEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDbkQsSUFBSSxTQUFTLENBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFnQkQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMseUJBQXlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xFLENBQUM7Ozs7O0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBK0YvRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3RCwwRkFBMEY7UUFDMUYsNEZBQTRGO1FBQzVGLHlGQUF5RjtRQUN6RiwyRkFBMkY7UUFDM0YsNEZBQTRGO1FBQzVGLHFEQUFxRDtRQUNyRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFO1lBQ3JELEdBQUc7OztZQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1NBQ3BDLENBQUMsQ0FBQztRQUVILGdGQUFnRjtRQUNoRix1RkFBdUY7UUFDdkYsbUZBQW1GO1FBQ25GLHFFQUFxRTtRQUNyRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87OztRQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUEsQ0FBQztRQUUzRCw0RUFBNEU7UUFDNUUsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLGlGQUFpRjtRQUNqRixnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsMEVBQTBFO1FBQzFFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUM7UUFDeEMsdUZBQXVGO1FBQ3ZGLHdGQUF3RjtRQUN4RixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsMENBQTBDLEVBQUUsQ0FBQztJQUNwRCxDQUFDOzs7O0lBRUQscUJBQXFCO1FBQ25CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQU1ELHlCQUF5QjtRQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUdELG9CQUFvQjtRQUNsQixrRkFBa0Y7UUFDbEYsd0ZBQXdGO1FBQ3hGLHdGQUF3RjtRQUN4RixzRkFBc0Y7UUFDdEYsMkZBQTJGO1FBQzNGLDJGQUEyRjtRQUMzRix3RUFBd0U7UUFDeEUscUZBQXFGO1FBQ3JGLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7Ozs7SUFHTyxrQkFBa0I7O2NBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUTtRQUU3QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDMUMsMkJBQTJCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsd0ZBQXdGO1FBQ3hGLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDLEVBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7WUFDdkQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZO2lCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDaEMsU0FBUzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxFQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDOzs7Ozs7SUFHTywwQkFBMEI7UUFDaEMsbUZBQW1GO1FBQ25GLG1GQUFtRjtRQUNuRix5Q0FBeUM7UUFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQzlELFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsRUFBQyxDQUFDO0lBQzdELENBQUM7Ozs7Ozs7O0lBT08sb0JBQW9CO1FBQzFCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDLEVBQUMsQ0FBQztRQUVILGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUMsRUFBQyxDQUFDO1FBRUgsaUVBQWlFO1FBQ2pFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFHTyx1QkFBdUI7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsTUFBTSxrQ0FBa0MsRUFBRSxDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDdkIsdUZBQXVGO1FBQ3ZGLG9GQUFvRjtRQUNwRix1RkFBdUY7UUFDdkYsNEZBQTRGO1FBQzVGLDRGQUE0RjtRQUM1RixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ2xDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2xGLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7Ozs7Ozs7OztJQVVPLDBDQUEwQztRQUNoRCx1RUFBdUU7UUFDdkUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPO2FBQ3pCLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxJQUFJLEVBQUMsQ0FBQztRQUV2RSxpRkFBaUY7UUFDakYseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ25GLElBQUksSUFBSSxDQUFDLHNDQUFzQyxFQUFFO29CQUMvQyxJQUFJLENBQUMsc0NBQXNDLEdBQUcsS0FBSyxDQUFDO29CQUNwRCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztpQkFDbEM7WUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxHQUFHLElBQUksRUFBQyxDQUFDO0lBQ3pFLENBQUM7Ozs7O0lBR0Qsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDO0lBQ3ZDLENBQUM7Ozs7Ozs7Ozs7SUFVRCx1QkFBdUI7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDL0YsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDckUsQ0FBQzs7Ozs7O0lBR0QsY0FBYyxDQUFDLElBQXFCOztjQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEUsT0FBTyxTQUFTLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBR0QscUJBQXFCO1FBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFHRCx5QkFBeUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDL0MsT0FBTztTQUNSO1FBQ0QseUZBQXlGO1FBQ3pGLDJGQUEyRjtRQUMzRiw4RkFBOEY7UUFDOUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxDQUFDO0lBQzdGLENBQUM7Ozs7OztJQUdPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7OztJQVFPLGNBQWM7UUFDcEIsSUFBSSxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFOztnQkFDakMsU0FBa0I7O2dCQUNsQixPQUFnQjtZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLElBQWEsRUFBRSxFQUFFO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO29CQUMxQixJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUMvQixNQUFNLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNuRDtvQkFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjtxQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO29CQUMvQixJQUFJLE9BQU8sRUFBRTt3QkFDWCxNQUFNLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNqRDtvQkFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUNoQjtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7Ozs7O0lBTU8sbUJBQW1CO1FBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs7Z0JBQ2IsR0FBRyxHQUFhLEVBQUU7WUFFdEIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsS0FBSyxNQUFNLEVBQUU7O3NCQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7Ozs7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJOztzQkFDMUQsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJOzs7O29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFFOUQsSUFBSSxTQUFTLEVBQUU7b0JBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzdCO2dCQUVELElBQUksT0FBTyxFQUFFO29CQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN0QjthQUNGO2lCQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRzs7OztnQkFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsQ0FBQzthQUNsRDtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7SUFXTyx5QkFBeUI7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUM1RSxPQUFPO1NBQ1I7O2NBQ0ssYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTztRQUNqRCwyRUFBMkU7UUFDM0UsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25DLE9BQU87U0FDUjtRQUNELDZFQUE2RTtRQUM3RSxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxJQUFJLENBQUM7WUFDbkQsT0FBTztTQUNSOztjQUNLLGVBQWUsR0FBRyxtQkFBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFlOzs7O2NBR3BFLHFCQUFxQixHQUN6QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUs7UUFFdEYsb0ZBQW9GO1FBQ3BGLHFGQUFxRjtRQUNyRixhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDekIsR0FBRyx1Q0FBdUMsZUFBZSxxQkFBcUIsS0FBSyxDQUFDO0lBQzFGLENBQUM7Ozs7OztJQUdPLGdCQUFnQjs7Y0FDaEIsT0FBTyxHQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWE7UUFDM0QsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFOztrQkFDakIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDdEMsNkVBQTZFO1lBQzdFLHFFQUFxRTtZQUNyRSxPQUFPLFFBQVEsSUFBSSxRQUFRLEtBQUssT0FBTyxDQUFDO1NBQ3pDO1FBQ0Qsb0ZBQW9GO1FBQ3BGLDRGQUE0RjtRQUM1RixPQUFPLG1CQUFBLFFBQVEsQ0FBQyxlQUFlLEVBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7O1lBdGlCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLHNySUFBZ0M7Z0JBRWhDLFVBQVUsRUFBRSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDO2dCQUN2RCxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLG9CQUFvQjtvQkFDN0IsK0NBQStDLEVBQUUsc0JBQXNCO29CQUN2RSxnQ0FBZ0MsRUFBRSxxQkFBcUI7b0JBQ3ZELGlDQUFpQyxFQUFFLG1CQUFtQjtvQkFDdEQsbUNBQW1DLEVBQUUscUJBQXFCO29CQUMxRCxzQ0FBc0MsRUFBRSxxQ0FBcUM7b0JBQzdFLHFCQUFxQixFQUFFLGtCQUFrQjtvQkFDekMsb0JBQW9CLEVBQUUsbUJBQW1CO29CQUN6QyxrQkFBa0IsRUFBRSxpQkFBaUI7b0JBQ3JDLHNCQUFzQixFQUFFLDZCQUE2QjtvQkFDckQsb0JBQW9CLEVBQUUsMkJBQTJCO29CQUNqRCxxQkFBcUIsRUFBRSw0QkFBNEI7b0JBQ25ELGtCQUFrQixFQUFFLHlCQUF5QjtvQkFDN0Msa0JBQWtCLEVBQUUseUJBQXlCO29CQUM3QyxvQkFBb0IsRUFBRSwyQkFBMkI7b0JBQ2pELG9CQUFvQixFQUFFLDJCQUEyQjtpQkFDbEQ7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUU7b0JBQ1QseUVBQXlFO29CQUN6RSxzRUFBc0U7b0JBQ3RFLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFDO2lCQUN0RDs7YUFDRjs7OztZQS9HQyxVQUFVO1lBSlYsaUJBQWlCO1lBU2pCLE1BQU07WUFoQkEsY0FBYztZQUNkLFFBQVE7NENBOFJELFFBQVEsWUFBSSxNQUFNLFNBQUMsOEJBQThCOzRDQUVqRCxRQUFRLFlBQUksTUFBTSxTQUFDLHdCQUF3Qjt5Q0FDM0MsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7Ozt5QkFyS3BELFNBQVMsU0FBQyxXQUFXOytCQUNyQixTQUFTLFNBQUMsaUJBQWlCOzZCQUMzQixTQUFTLFNBQUMseUJBQXlCOzhCQUNuQyxTQUFTLFNBQUMsMEJBQTBCOzBCQUNwQyxTQUFTLFNBQUMsc0JBQXNCO21DQUVoQyxZQUFZLFNBQUMsUUFBUTtnQ0FDckIsWUFBWSxTQUFDLFFBQVEsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0NBQ3JDLFlBQVksU0FBQyxtQkFBbUI7OEJBQ2hDLGVBQWUsU0FBQyxTQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDOzhCQUM5QyxlQUFlLFNBQUMsU0FBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzs2QkFDOUMsZUFBZSxTQUFDLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7NEJBQzdDLGVBQWUsU0FBQyxPQUFPLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDO2lDQUc1QyxLQUFLO29CQUdMLEtBQUs7eUJBR0wsS0FBSzt5QkFrQkwsS0FBSzt3QkFlTCxLQUFLOzs7O0lBdEROLGtDQUE0RDs7SUFDNUQsd0NBQXdFOztJQUN4RSxzQ0FBMEY7O0lBQzFGLHVDQUE2Rjs7SUFDN0YsbUNBQWlGOztJQUVqRiw0Q0FBaUU7O0lBQ2pFLHlDQUE4RTs7SUFDOUUseUNBQStFOztJQUMvRSx1Q0FBdUY7O0lBQ3ZGLHVDQUF1Rjs7SUFDdkYsc0NBQW9GOztJQUNwRixxQ0FBaUY7Ozs7O0lBR2pGLDBDQUE2Qzs7Ozs7SUFHN0MsNkJBQXlDOzs7OztJQWtCekMsbUNBQW9DOzs7OztJQWVwQyxtQ0FBaUU7Ozs7O0lBU2pFLGtDQUF3Qjs7SUFHeEIsb0NBQW9EOztJQUdwRCxnQ0FBb0Q7Ozs7O0lBR3BELGdEQUFzQzs7Ozs7SUFHdEMsMENBQTJCOzs7OztJQVEzQixrQ0FBeUM7Ozs7O0lBQ3pDLGtDQUF3Qzs7Ozs7SUFDeEMsaURBQTREOzs7OztJQUM1RCxtQ0FBNEM7Ozs7O0lBQzVDLDhEQUF1RDs7Ozs7SUFDdkQsZ0NBc0VFOzs7OztJQUVVLG1DQUErQjs7Ozs7SUFDL0IsMENBQTZDOzs7OztJQUM3QywrQkFBdUI7Ozs7O0lBQ3ZCLDRCQUE0Qjs7Ozs7SUFDNUIsaUNBQTJCOzs7OztJQUMzQixpQ0FDOEM7Ozs7O0lBQzlDLHFDQUFrRjs7SUFDbEYsc0NBQXlFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgaXNEZXZNb2RlLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBMYWJlbE9wdGlvbnMsXG4gIE1BVF9MQUJFTF9HTE9CQUxfT1BUSU9OUyxcbiAgVGhlbWVQYWxldHRlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgZ2V0TWF0Rm9ybUZpZWxkRHVwbGljYXRlZEhpbnRFcnJvcixcbiAgZ2V0TWF0Rm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcixcbiAgTWF0Rm9ybUZpZWxkIGFzIE5vbk1kY0Zvcm1GaWVsZCxcbiAgbWF0Rm9ybUZpZWxkQW5pbWF0aW9ucyxcbiAgTWF0Rm9ybUZpZWxkQ29udHJvbCxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIE1EQ1RleHRGaWVsZEFkYXB0ZXIsXG4gIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24sXG4gIG51bWJlcnMgYXMgbWRjVGV4dEZpZWxkTnVtYmVyc1xufSBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkJztcbmltcG9ydCB7bWVyZ2UsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0RXJyb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9lcnJvcic7XG5pbXBvcnQge01hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9mbG9hdGluZy1sYWJlbCc7XG5pbXBvcnQge01hdEhpbnR9IGZyb20gJy4vZGlyZWN0aXZlcy9oaW50JztcbmltcG9ydCB7TWF0TGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9sYWJlbCc7XG5pbXBvcnQge01hdEZvcm1GaWVsZExpbmVSaXBwbGV9IGZyb20gJy4vZGlyZWN0aXZlcy9saW5lLXJpcHBsZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lfSBmcm9tICcuL2RpcmVjdGl2ZXMvbm90Y2hlZC1vdXRsaW5lJztcbmltcG9ydCB7TWF0UHJlZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvcHJlZml4JztcbmltcG9ydCB7TWF0U3VmZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvc3VmZml4JztcblxuLyoqIFR5cGUgZm9yIHRoZSBhdmFpbGFibGUgZmxvYXRMYWJlbCB2YWx1ZXMuICovXG5leHBvcnQgdHlwZSBGbG9hdExhYmVsVHlwZSA9ICdhbHdheXMnIHwgJ2F1dG8nO1xuXG4vKiogUG9zc2libGUgYXBwZWFyYW5jZSBzdHlsZXMgZm9yIHRoZSBmb3JtIGZpZWxkLiAqL1xuZXhwb3J0IHR5cGUgTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZSA9ICdmaWxsJyB8ICdvdXRsaW5lJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBmb3JtIGZpZWxkIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWRcbiAqIHVzaW5nIHRoZSBgTUFUX0ZPUk1fRklFTERfREVGQVVMVF9PUFRJT05TYCBpbmplY3Rpb24gdG9rZW4uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Rm9ybUZpZWxkRGVmYXVsdE9wdGlvbnMge1xuICBhcHBlYXJhbmNlPzogTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZTtcbiAgaGlkZVJlcXVpcmVkTWFya2VyPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlXG4gKiBkZWZhdWx0IG9wdGlvbnMgZm9yIGFsbCBmb3JtIGZpZWxkIHdpdGhpbiBhbiBhcHAuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfRk9STV9GSUVMRF9ERUZBVUxUX09QVElPTlMgPVxuICBuZXcgSW5qZWN0aW9uVG9rZW48TWF0Rm9ybUZpZWxkRGVmYXVsdE9wdGlvbnM+KCdNQVRfRk9STV9GSUVMRF9ERUZBVUxUX09QVElPTlMnKTtcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBEZWZhdWx0IGFwcGVhcmFuY2UgdXNlZCBieSB0aGUgZm9ybS1maWVsZC4gKi9cbmNvbnN0IERFRkFVTFRfQVBQRUFSQU5DRTogTWF0Rm9ybUZpZWxkQXBwZWFyYW5jZSA9ICdmaWxsJztcblxuLyoqIERlZmF1bHQgYXBwZWFyYW5jZSB1c2VkIGJ5IHRoZSBmb3JtLWZpZWxkLiAqL1xuY29uc3QgREVGQVVMVF9GTE9BVF9MQUJFTDogRmxvYXRMYWJlbFR5cGUgPSAnYXV0byc7XG5cbi8qKlxuICogRGVmYXVsdCB0cmFuc2Zvcm0gZm9yIGRvY2tlZCBmbG9hdGluZyBsYWJlbHMgaW4gYSBNREMgdGV4dC1maWVsZC4gVGhpcyB2YWx1ZSBoYXMgYmVlblxuICogZXh0cmFjdGVkIGZyb20gdGhlIE1EQyB0ZXh0LWZpZWxkIHN0eWxlcyBiZWNhdXNlIHdlIHByb2dyYW1tYXRpY2FsbHkgbW9kaWZ5IHRoZSBkb2NrZWRcbiAqIGxhYmVsIHRyYW5zZm9ybSwgYnV0IGRvIG5vdCB3YW50IHRvIGFjY2lkZW50YWxseSBkaXNjYXJkIHRoZSBkZWZhdWx0IGxhYmVsIHRyYW5zZm9ybS5cbiAqL1xuY29uc3QgRkxPQVRJTkdfTEFCRUxfREVGQVVMVF9ET0NLRURfVFJBTlNGT1JNID0gYHRyYW5zbGF0ZVkoLTUwJSlgO1xuXG4vKiogQ29udGFpbmVyIGZvciBmb3JtIGNvbnRyb2xzIHRoYXQgYXBwbGllcyBNYXRlcmlhbCBEZXNpZ24gc3R5bGluZyBhbmQgYmVoYXZpb3IuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtZm9ybS1maWVsZCcsXG4gIGV4cG9ydEFzOiAnbWF0Rm9ybUZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zvcm0tZmllbGQuY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFttYXRGb3JtRmllbGRBbmltYXRpb25zLnRyYW5zaXRpb25NZXNzYWdlc10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtZm9ybS1maWVsZC1sYWJlbC1hbHdheXMtZmxvYXRdJzogJ19zaG91bGRBbHdheXNGbG9hdCgpJyxcbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWludmFsaWRdJzogJ19jb250cm9sLmVycm9yU3RhdGUnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtZGlzYWJsZWRdJzogJ19jb250cm9sLmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsZWRdJzogJ19jb250cm9sLmF1dG9maWxsZWQnLFxuICAgICdbY2xhc3MubWF0LWZvcm0tZmllbGQtbm8tYW5pbWF0aW9uc10nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gICAgJ1tjbGFzcy5tYXQtZm9jdXNlZF0nOiAnX2NvbnRyb2wuZm9jdXNlZCcsXG4gICAgJ1tjbGFzcy5tYXQtYWNjZW50XSc6ICdjb2xvciA9PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5uZy11bnRvdWNoZWRdJzogJ19zaG91bGRGb3J3YXJkKFwidW50b3VjaGVkXCIpJyxcbiAgICAnW2NsYXNzLm5nLXRvdWNoZWRdJzogJ19zaG91bGRGb3J3YXJkKFwidG91Y2hlZFwiKScsXG4gICAgJ1tjbGFzcy5uZy1wcmlzdGluZV0nOiAnX3Nob3VsZEZvcndhcmQoXCJwcmlzdGluZVwiKScsXG4gICAgJ1tjbGFzcy5uZy1kaXJ0eV0nOiAnX3Nob3VsZEZvcndhcmQoXCJkaXJ0eVwiKScsXG4gICAgJ1tjbGFzcy5uZy12YWxpZF0nOiAnX3Nob3VsZEZvcndhcmQoXCJ2YWxpZFwiKScsXG4gICAgJ1tjbGFzcy5uZy1pbnZhbGlkXSc6ICdfc2hvdWxkRm9yd2FyZChcImludmFsaWRcIiknLFxuICAgICdbY2xhc3MubmctcGVuZGluZ10nOiAnX3Nob3VsZEZvcndhcmQoXCJwZW5kaW5nXCIpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIC8vIFRlbXBvcmFyeSB3b3JrYXJvdW5kIHRoYXQgYWxsb3dzIHVzIHRvIHRlc3QgdGhlIE1EQyBmb3JtLWZpZWxkIGFnYWluc3RcbiAgICAvLyBjb21wb25lbnRzIHdoaWNoIGluamVjdCB0aGUgbm9uLW1kYyBmb3JtLWZpZWxkIChlLmcuIGF1dG9jb21wbGV0ZSkuXG4gICAge3Byb3ZpZGU6IE5vbk1kY0Zvcm1GaWVsZCwgdXNlRXhpc3Rpbmc6IE1hdEZvcm1GaWVsZH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3RleHRGaWVsZCcpIF90ZXh0RmllbGQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdwcmVmaXhDb250YWluZXInKSBfcHJlZml4Q29udGFpbmVyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZChNYXRGb3JtRmllbGRGbG9hdGluZ0xhYmVsKSBfZmxvYXRpbmdMYWJlbDogTWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbHx1bmRlZmluZWQ7XG4gIEBWaWV3Q2hpbGQoTWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmUpIF9ub3RjaGVkT3V0bGluZTogTWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmV8dW5kZWZpbmVkO1xuICBAVmlld0NoaWxkKE1hdEZvcm1GaWVsZExpbmVSaXBwbGUpIF9saW5lUmlwcGxlOiBNYXRGb3JtRmllbGRMaW5lUmlwcGxlfHVuZGVmaW5lZDtcblxuICBAQ29udGVudENoaWxkKE1hdExhYmVsKSBfbGFiZWxDaGlsZE5vblN0YXRpYzogTWF0TGFiZWx8dW5kZWZpbmVkO1xuICBAQ29udGVudENoaWxkKE1hdExhYmVsLCB7c3RhdGljOiB0cnVlfSkgX2xhYmVsQ2hpbGRTdGF0aWM6IE1hdExhYmVsfHVuZGVmaW5lZDtcbiAgQENvbnRlbnRDaGlsZChNYXRGb3JtRmllbGRDb250cm9sKSBfZm9ybUZpZWxkQ29udHJvbDogTWF0Rm9ybUZpZWxkQ29udHJvbDxhbnk+O1xuICBAQ29udGVudENoaWxkcmVuKE1hdFByZWZpeCwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgX3ByZWZpeENoaWxkcmVuOiBRdWVyeUxpc3Q8TWF0UHJlZml4PjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRTdWZmaXgsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9zdWZmaXhDaGlsZHJlbjogUXVlcnlMaXN0PE1hdFN1ZmZpeD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0RXJyb3IsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9lcnJvckNoaWxkcmVuOiBRdWVyeUxpc3Q8TWF0RXJyb3I+O1xuICBAQ29udGVudENoaWxkcmVuKE1hdEhpbnQsIHtkZXNjZW5kYW50czogdHJ1ZX0pIF9oaW50Q2hpbGRyZW46IFF1ZXJ5TGlzdDxNYXRIaW50PjtcblxuICAvKiogV2hldGhlciB0aGUgcmVxdWlyZWQgbWFya2VyIHNob3VsZCBiZSBoaWRkZW4uICovXG4gIEBJbnB1dCgpIGhpZGVSZXF1aXJlZE1hcmtlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgY29sb3IgcGFsZXR0ZSBmb3IgdGhlIGZvcm0tZmllbGQuICovXG4gIEBJbnB1dCgpIGNvbG9yOiBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeSc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhbHdheXMgZmxvYXQgb3IgZmxvYXQgYXMgdGhlIHVzZXIgdHlwZXMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBmbG9hdExhYmVsKCk6IEZsb2F0TGFiZWxUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fZmxvYXRMYWJlbCB8fCAodGhpcy5fbGFiZWxPcHRpb25zICYmIHRoaXMuX2xhYmVsT3B0aW9ucy5mbG9hdClcbiAgICAgICAgfHwgREVGQVVMVF9GTE9BVF9MQUJFTDtcbiAgfVxuICBzZXQgZmxvYXRMYWJlbCh2YWx1ZTogRmxvYXRMYWJlbFR5cGUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2Zsb2F0TGFiZWwpIHtcbiAgICAgIHRoaXMuX2Zsb2F0TGFiZWwgPSB2YWx1ZTtcbiAgICAgIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gQ3VzdG9tIGZvcm0tZmllbGQgY29udHJvbHMgb3IgZGlyZWN0aXZlcyBtaWdodCBzZXRcbiAgICAgIC8vIHRoZSBcImZsb2F0TGFiZWxcIiBpbnB1dCBhbmQgZXhwZWN0IHRoZSBmb3JtLWZpZWxkIHZpZXcgdG8gYmUgdXBkYXRlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgLy8gZS5nLiBhdXRvY29tcGxldGUgdHJpZ2dlci4gSWRlYWxseSB3ZSdkIGdldCByaWQgb2YgdGhpcyBhbmQgdGhlIGNvbnN1bWVycyB3b3VsZCBqdXN0XG4gICAgICAvLyBlbWl0IHRoZSBcInN0YXRlQ2hhbmdlc1wiIG9ic2VydmFibGUuIFRPRE8oZGV2dmVyc2lvbik6IGNvbnNpZGVyIHJlbW92aW5nLlxuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2Zsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlO1xuXG4gIC8qKiBUaGUgZm9ybS1maWVsZCBhcHBlYXJhbmNlIHN0eWxlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgYXBwZWFyYW5jZSgpOiBNYXRGb3JtRmllbGRBcHBlYXJhbmNlIHsgcmV0dXJuIHRoaXMuX2FwcGVhcmFuY2U7IH1cbiAgc2V0IGFwcGVhcmFuY2UodmFsdWU6IE1hdEZvcm1GaWVsZEFwcGVhcmFuY2UpIHtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuX2FwcGVhcmFuY2U7XG4gICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlIHx8ICh0aGlzLl9kZWZhdWx0cyAmJiB0aGlzLl9kZWZhdWx0cy5hcHBlYXJhbmNlKSB8fCBERUZBVUxUX0FQUEVBUkFOQ0U7XG4gICAgLy8gSWYgdGhlIGFwcGVhcmFuY2UgaGFzIGJlZW4gc3dpdGNoZWQgdG8gYG91dGxpbmVgLCB0aGUgbGFiZWwgb2Zmc2V0IG5lZWRzIHRvIGJlIHVwZGF0ZWQuXG4gICAgLy8gVGhlIHVwZGF0ZSBjYW4gaGFwcGVuIG9uY2UgdGhlIHZpZXcgaGFzIGJlZW4gcmUtY2hlY2tlZCwgYnV0IG5vdCBpbW1lZGlhdGVseSBiZWNhdXNlXG4gICAgLy8gdGhlIHZpZXcgaGFzIG5vdCBiZWVuIHVwZGF0ZWQgYW5kIHRoZSBub3RjaGVkLW91dGxpbmUgZmxvYXRpbmcgbGFiZWwgaXMgbm90IHByZXNlbnQuXG4gICAgaWYgKHRoaXMuX2FwcGVhcmFuY2UgPT09ICdvdXRsaW5lJyAmJiB0aGlzLl9hcHBlYXJhbmNlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpcy5fbmVlZHNPdXRsaW5lTGFiZWxPZmZzZXRVcGRhdGVPblN0YWJsZSA9IHRydWU7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2FwcGVhcmFuY2U6IE1hdEZvcm1GaWVsZEFwcGVhcmFuY2UgPSBERUZBVUxUX0FQUEVBUkFOQ0U7XG5cbiAgLyoqIFRleHQgZm9yIHRoZSBmb3JtIGZpZWxkIGhpbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaW50TGFiZWwoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2hpbnRMYWJlbDsgfVxuICBzZXQgaGludExhYmVsKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9oaW50TGFiZWwgPSB2YWx1ZTtcbiAgICB0aGlzLl9wcm9jZXNzSGludHMoKTtcbiAgfVxuICBwcml2YXRlIF9oaW50TGFiZWwgPSAnJztcblxuICAvLyBVbmlxdWUgaWQgZm9yIHRoZSBoaW50IGxhYmVsLlxuICBfaGludExhYmVsSWQ6IHN0cmluZyA9IGBtYXQtaGludC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgLy8gVW5pcXVlIGlkIGZvciB0aGUgaW50ZXJuYWwgZm9ybSBmaWVsZCBsYWJlbC5cbiAgX2xhYmVsSWQgPSBgbWF0LWZvcm0tZmllbGQtbGFiZWwtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBTdGF0ZSBvZiB0aGUgbWF0LWhpbnQgYW5kIG1hdC1lcnJvciBhbmltYXRpb25zLiAqL1xuICBfc3Vic2NyaXB0QW5pbWF0aW9uU3RhdGU6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBXaWR0aCBvZiB0aGUgb3V0bGluZSBub3RjaC4gKi9cbiAgX291dGxpbmVOb3RjaFdpZHRoOiBudW1iZXI7XG5cbiAgLyoqIEdldHMgdGhlIGN1cnJlbnQgZm9ybSBmaWVsZCBjb250cm9sICovXG4gIGdldCBfY29udHJvbCgpOiBNYXRGb3JtRmllbGRDb250cm9sPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9leHBsaWNpdEZvcm1GaWVsZENvbnRyb2wgfHwgdGhpcy5fZm9ybUZpZWxkQ29udHJvbDtcbiAgfVxuICBzZXQgX2NvbnRyb2wodmFsdWUpIHsgdGhpcy5fZXhwbGljaXRGb3JtRmllbGRDb250cm9sID0gdmFsdWU7IH1cblxuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9pc0ZvY3VzZWQ6IGJvb2xlYW58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2V4cGxpY2l0Rm9ybUZpZWxkQ29udHJvbDogTWF0Rm9ybUZpZWxkQ29udHJvbDxhbnk+O1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENUZXh0RmllbGRGb3VuZGF0aW9uO1xuICBwcml2YXRlIF9uZWVkc091dGxpbmVMYWJlbE9mZnNldFVwZGF0ZU9uU3RhYmxlID0gZmFsc2U7XG4gIHByaXZhdGUgX2FkYXB0ZXI6IE1EQ1RleHRGaWVsZEFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLl90ZXh0RmllbGQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLl90ZXh0RmllbGQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLl90ZXh0RmllbGQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcblxuICAgIGhhc0xhYmVsOiAoKSA9PiB0aGlzLl9oYXNGbG9hdGluZ0xhYmVsKCksXG4gICAgaXNGb2N1c2VkOiAoKSA9PiB0aGlzLl9jb250cm9sLmZvY3VzZWQsXG4gICAgaGFzT3V0bGluZTogKCkgPT4gdGhpcy5faGFzT3V0bGluZSgpLFxuXG4gICAgLy8gTURDIHRleHQtZmllbGQgd2lsbCBjYWxsIHRoaXMgbWV0aG9kIG9uIGZvY3VzLCBibHVyIGFuZCB2YWx1ZSBjaGFuZ2UuIEl0IGV4cGVjdHMgdXNcbiAgICAvLyB0byB1cGRhdGUgdGhlIGZsb2F0aW5nIGxhYmVsIHN0YXRlIGFjY29yZGluZ2x5LiBUaG91Z2ggd2UgbWFrZSB0aGlzIGEgbm9vcCBiZWNhdXNlIHdlXG4gICAgLy8gd2FudCB0byByZWFjdCB0byBmbG9hdGluZyBsYWJlbCBzdGF0ZSBjaGFuZ2VzIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbi4gUmVseWluZyBvbiB0aGlzXG4gICAgLy8gYWRhcHRlciBtZXRob2Qgd291bGQgbWVhbiB0aGF0IHRoZSBsYWJlbCB3b3VsZCBub3QgdXBkYXRlIGlmIHRoZSBjdXN0b20gZm9ybS1maWVsZCBjb250cm9sXG4gICAgLy8gc2V0cyBcInNob3VsZExhYmVsRmxvYXRcIiB0byB0cnVlLCBvciBpZiB0aGUgXCJmbG9hdExhYmVsXCIgaW5wdXQgYmluZGluZyBjaGFuZ2VzIHRvIFwiYWx3YXlzXCIuXG4gICAgZmxvYXRMYWJlbDogKCkgPT4ge30sXG5cbiAgICAvLyBMYWJlbCBzaGFraW5nIGlzIG5vdCBzdXBwb3J0ZWQgeWV0LiBJdCB3aWxsIHJlcXVpcmUgYSBuZXcgQVBJIGZvciBmb3JtIGZpZWxkXG4gICAgLy8gY29udHJvbHMgdG8gdHJpZ2dlciB0aGUgc2hha2luZy4gVGhpcyBjYW4gYmUgYSBmZWF0dXJlIGluIHRoZSBmdXR1cmUuXG4gICAgLy8gVE9ETyhkZXZ2ZXJzaW9uKTogZXhwbG9yZSBvcHRpb25zIG9uIGhvdyB0byBpbnRlZ3JhdGUgbGFiZWwgc2hha2luZy5cbiAgICBzaGFrZUxhYmVsOiAoKSA9PiB7fSxcblxuICAgIC8vIE1EQyBieSBkZWZhdWx0IHVwZGF0ZXMgdGhlIG5vdGNoZWQtb3V0bGluZSB3aGVuZXZlciB0aGUgdGV4dC1maWVsZCByZWNlaXZlcyBmb2N1cywgb3JcbiAgICAvLyBpcyBiZWluZyBibHVycmVkLiBJdCBhbHNvIGNvbXB1dGVzIHRoZSBsYWJlbCB3aWR0aCBldmVyeSB0aW1lIHRoZSBub3RjaCBpcyBvcGVuZWQgb3JcbiAgICAvLyBjbG9zZWQuIFRoaXMgd29ya3MgZmluZSBpbiB0aGUgc3RhbmRhcmQgTURDIHRleHQtZmllbGQsIGJ1dCBub3QgaW4gQW5ndWxhciB3aGVyZSB0aGVcbiAgICAvLyBmbG9hdGluZyBsYWJlbCBjb3VsZCBjaGFuZ2UgdGhyb3VnaCBpbnRlcnBvbGF0aW9uLiBXZSB3YW50IHRvIGJlIGFibGUgdG8gdXBkYXRlIHRoZVxuICAgIC8vIG5vdGNoZWQgb3V0bGluZSB3aGVuZXZlciB0aGUgbGFiZWwgY29udGVudCBjaGFuZ2VzLiBBZGRpdGlvbmFsbHksIHJlbHlpbmcgb24gZm9jdXMgb3JcbiAgICAvLyBibHVyIHRvIG9wZW4gYW5kIGNsb3NlIHRoZSBub3RjaCBkb2VzIG5vdCB3b3JrIGZvciB1cyBzaW5jZSBhYnN0cmFjdCBmb3JtLWZpZWxkIGNvbnRyb2xzXG4gICAgLy8gaGF2ZSB0aGUgYWJpbGl0eSB0byBjb250cm9sIHRoZSBmbG9hdGluZyBsYWJlbCBzdGF0ZSAoaS5lLiBgc2hvdWxkTGFiZWxGbG9hdGApLCBhbmQgd2VcbiAgICAvLyB3YW50IHRvIHVwZGF0ZSB0aGUgbm90Y2ggd2hlbmV2ZXIgdGhlIGBfc2hvdWxkTGFiZWxGbG9hdCgpYCB2YWx1ZSBjaGFuZ2VzLlxuICAgIGdldExhYmVsV2lkdGg6ICgpID0+IDAsXG4gICAgbm90Y2hPdXRsaW5lOiAoKSA9PiB7fSxcbiAgICBjbG9zZU91dGxpbmU6ICgpID0+IHt9LFxuXG4gICAgYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiB0aGlzLl9saW5lUmlwcGxlICYmIHRoaXMuX2xpbmVSaXBwbGUuYWN0aXZhdGUoKSxcbiAgICBkZWFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4gdGhpcy5fbGluZVJpcHBsZSAmJiB0aGlzLl9saW5lUmlwcGxlLmRlYWN0aXZhdGUoKSxcblxuICAgIC8vIFRoZSBmb3VuZGF0aW9uIHRyaWVzIHRvIHJlZ2lzdGVyIGV2ZW50cyBvbiB0aGUgaW5wdXQuIFRoaXMgaXMgbm90IG1hdGNoaW5nXG4gICAgLy8gb3VyIGNvbmNlcHQgb2YgYWJzdHJhY3QgZm9ybSBmaWVsZCBjb250cm9scy4gV2UgaGFuZGxlIGVhY2ggZXZlbnQgbWFudWFsbHlcbiAgICAvLyBpbiBcInN0YXRlQ2hhbmdlc1wiIGJhc2VkIG9uIHRoZSBmb3JtLWZpZWxkIGNvbnRyb2wgc3RhdGUuIFRoZSBmb2xsb3dpbmcgZXZlbnRzXG4gICAgLy8gbmVlZCB0byBiZSBoYW5kbGVkOiBmb2N1cywgYmx1ci4gV2UgZG8gbm90IGhhbmRsZSB0aGUgXCJpbnB1dFwiIGV2ZW50IHNpbmNlXG4gICAgLy8gdGhhdCBvbmUgaXMgb25seSBuZWVkZWQgZm9yIHRoZSB0ZXh0LWZpZWxkIGNoYXJhY3RlciBjb3VudCwgd2hpY2ggd2UgZG9cbiAgICAvLyBub3QgaW1wbGVtZW50IGFzIHBhcnQgb2YgdGhlIGZvcm0tZmllbGQsIGJ1dCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgbWFudWFsbHlcbiAgICAvLyBieSBjb25zdW1lcnMgdXNpbmcgdGVtcGxhdGUgYmluZGluZ3MuXG4gICAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcblxuICAgIC8vIFdlIGRvIG5vdCBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBuYXRpdmUgaW5wdXQgc2luY2Ugd2Ugd29yayB3aXRoIGFic3RyYWN0IGZvcm0gZmllbGRcbiAgICAvLyBjb250cm9scy4gTURDIG5lZWRzIGEgcmVmZXJlbmNlIHRvIHRoZSBuYXRpdmUgaW5wdXQgb3B0aW9uYWxseSB0byBoYW5kbGUgY2hhcmFjdGVyXG4gICAgLy8gY291bnRpbmcgYW5kIHZhbHVlIHVwZGF0aW5nLiBUaGVzZSBhcmUgYm90aCB0aGluZ3Mgd2UgZG8gbm90IGhhbmRsZSBmcm9tIHdpdGhpbiB0aGVcbiAgICAvLyBmb3JtLWZpZWxkLCBzbyB3ZSBjYW4ganVzdCByZXR1cm4gbnVsbC5cbiAgICBnZXROYXRpdmVJbnB1dDogKCkgPT4gbnVsbCxcblxuICAgIC8vIFRoaXMgbWV0aG9kIHdpbGwgbmV2ZXIgYmUgY2FsbGVkIHNpbmNlIHdlIGRvIG5vdCBoYXZlIHRoZSBhYmlsaXR5IHRvIGFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICAvLyB0byB0aGUgbmF0aXZlIGlucHV0LiBUaGlzIGlzIGJlY2F1c2UgdGhlIGZvcm0gY29udHJvbCBpcyBub3QgbmVjZXNzYXJpbHkgYW4gaW5wdXQsIGFuZFxuICAgIC8vIHRoZSBmb3JtIGZpZWxkIGRlYWxzIHdpdGggYWJzdHJhY3QgZm9ybSBjb250cm9scyBvZiBhbnkgdHlwZS5cbiAgICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luOiAoKSA9PiB7fSxcblxuICAgIC8vIFRoZSBmb3VuZGF0aW9uIHRyaWVzIHRvIHJlZ2lzdGVyIGNsaWNrIGFuZCBrZXlib2FyZCBldmVudHMgb24gdGhlIGZvcm0tZmllbGQgdG8gZmlndXJlIG91dFxuICAgIC8vIGlmIHRoZSBpbnB1dCB2YWx1ZSBjaGFuZ2VzIHRocm91Z2ggdXNlciBpbnRlcmFjdGlvbi4gQmFzZWQgb24gdGhhdCwgdGhlIGZvdW5kYXRpb24gdHJpZXNcbiAgICAvLyB0byBmb2N1cyB0aGUgaW5wdXQuIFNpbmNlIHdlIGRvIG5vdCBoYW5kbGUgdGhlIGlucHV0IHZhbHVlIGFzIHBhcnQgb2YgdGhlIGZvcm0tZmllbGQsIG5vclxuICAgIC8vIGl0J3MgZ3VhcmFudGVlZCB0byBiZSBhbiBpbnB1dCAoc2VlIGFkYXB0ZXIgbWV0aG9kcyBhYm92ZSksIHRoaXMgaXMgYSBub29wLlxuICAgIGRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgIHJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcblxuICAgIC8vIFRoZSBmb3VuZGF0aW9uIHRyaWVzIHRvIHNldHVwIGEgXCJNdXRhdGlvbk9ic2VydmVyXCIgaW4gb3JkZXIgdG8gd2F0Y2ggZm9yIGF0dHJpYnV0ZXNcbiAgICAvLyBsaWtlIFwibWF4bGVuZ3RoXCIgb3IgXCJwYXR0ZXJuXCIgdG8gY2hhbmdlLiBUaGUgZm91bmRhdGlvbiB3aWxsIHVwZGF0ZSB0aGUgdmFsaWRpdHkgc3RhdGVcbiAgICAvLyBiYXNlZCBvbiB0aGF0LiBXZSBkbyBub3QgbmVlZCB0aGlzIGxvZ2ljIHNpbmNlIHdlIGhhbmRsZSB0aGUgdmFsaWRpdHkgdGhyb3VnaCB0aGVcbiAgICAvLyBhYnN0cmFjdCBmb3JtIGNvbnRyb2wgaW5zdGFuY2UuXG4gICAgZGVyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICByZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiAoKSA9PiBudWxsIGFzIGFueSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX0ZPUk1fRklFTERfREVGQVVMVF9PUFRJT05TKVxuICAgICAgICAgICAgICBwcml2YXRlIF9kZWZhdWx0cz86IE1hdEZvcm1GaWVsZERlZmF1bHRPcHRpb25zLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9MQUJFTF9HTE9CQUxfT1BUSU9OUykgcHJpdmF0ZSBfbGFiZWxPcHRpb25zPzogTGFiZWxPcHRpb25zLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgaWYgKF9kZWZhdWx0cyAmJiBfZGVmYXVsdHMuYXBwZWFyYW5jZSkge1xuICAgICAgdGhpcy5hcHBlYXJhbmNlID0gX2RlZmF1bHRzLmFwcGVhcmFuY2U7XG4gICAgfSBlbHNlIGlmIChfZGVmYXVsdHMgJiYgX2RlZmF1bHRzLmhpZGVSZXF1aXJlZE1hcmtlcikge1xuICAgICAgdGhpcy5oaWRlUmVxdWlyZWRNYXJrZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG5cbiAgICAvLyBNREMgdXNlcyB0aGUgXCJzaG91bGRGbG9hdFwiIGdldHRlciB0byBrbm93IHdoZXRoZXIgdGhlIGxhYmVsIGlzIGN1cnJlbnRseSBmbG9hdGluZy4gVGhpc1xuICAgIC8vIGRvZXMgbm90IG1hdGNoIG91ciBpbXBsZW1lbnRhdGlvbiBvZiB3aGVuIHRoZSBsYWJlbCBmbG9hdHMgYmVjYXVzZSB3ZSBzdXBwb3J0IG1vcmUgY2FzZXMuXG4gICAgLy8gRm9yIGV4YW1wbGUsIGNvbnN1bWVycyBjYW4gc2V0IFwiQElucHV0IGZsb2F0TGFiZWxcIiB0byBhbHdheXMsIG9yIHRoZSBjdXN0b20gZm9ybS1maWVsZFxuICAgIC8vIGNvbnRyb2wgY2FuIHNldCBcIk1hdEZvcm1GaWVsZENvbnRyb2wjc2hvdWxkTGFiZWxGbG9hdFwiIHRvIHRydWUuIFRvIGVuc3VyZSB0aGF0IE1EQyBrbm93c1xuICAgIC8vIHdoZW4gdGhlIGxhYmVsIGlzIGZsb2F0aW5nLCB3ZSBvdmVyd3JpdGUgdGhlIHByb3BlcnR5IHRvIGJlIGJhc2VkIG9uIHRoZSBtZXRob2Qgd2UgdXNlIHRvXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBmbG9hdGluZyBsYWJlbC5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5fZm91bmRhdGlvbiwgJ3Nob3VsZEZsb2F0Jywge1xuICAgICAgZ2V0OiAoKSA9PiB0aGlzLl9zaG91bGRMYWJlbEZsb2F0KCksXG4gICAgfSk7XG5cbiAgICAvLyBCeSBkZWZhdWx0LCB0aGUgZm91bmRhdGlvbiBkZXRlcm1pbmVzIHRoZSB2YWxpZGl0eSBvZiB0aGUgdGV4dC1maWVsZCBmcm9tIHRoZVxuICAgIC8vIHNwZWNpZmllZCBuYXRpdmUgaW5wdXQuIFNpbmNlIHdlIGRvbid0IHBhc3MgYSBuYXRpdmUgaW5wdXQgdG8gdGhlIGZvdW5kYXRpb24gYmVjYXVzZVxuICAgIC8vIGFic3RyYWN0IGZvcm0gY29udHJvbHMgYXJlIG5vdCBuZWNlc3NhcmlseSBjb25zaXN0aW5nIG9mIGFuIGlucHV0LCB3ZSBoYW5kbGUgdGhlXG4gICAgLy8gdGV4dC1maWVsZCB2YWxpZGl0eSB0aHJvdWdoIHRoZSBhYnN0cmFjdCBmb3JtLWZpZWxkIGNvbnRyb2wgc3RhdGUuXG4gICAgdGhpcy5fZm91bmRhdGlvbi5pc1ZhbGlkID0gKCkgPT4gIXRoaXMuX2NvbnRyb2wuZXJyb3JTdGF0ZTtcblxuICAgIC8vIEluaXRpYWwgZm9jdXMgc3RhdGUgc3luYy4gVGhpcyBoYXBwZW5zIHJhcmVseSwgYnV0IHdlIHdhbnQgdG8gYWNjb3VudCBmb3JcbiAgICAvLyBpdCBpbiBjYXNlIHRoZSBmb3JtLWZpZWxkIGNvbnRyb2wgaGFzIFwiZm9jdXNlZFwiIHNldCB0byB0cnVlIG9uIGluaXQuXG4gICAgdGhpcy5fdXBkYXRlRm9jdXNTdGF0ZSgpO1xuICAgIC8vIEluaXRpYWwgbm90Y2ggd2lkdGggdXBkYXRlLiBUaGlzIGlzIG5lZWRlZCBpbiBjYXNlIHRoZSB0ZXh0LWZpZWxkIGxhYmVsIGZsb2F0c1xuICAgIC8vIG9uIGluaXRpYWxpemF0aW9uLCBhbmQgcmVuZGVycyBpbnNpZGUgb2YgdGhlIG5vdGNoZWQgb3V0bGluZS5cbiAgICB0aGlzLl9yZWZyZXNoT3V0bGluZU5vdGNoV2lkdGgoKTtcbiAgICAvLyBFbmFibGUgYW5pbWF0aW9ucyBub3cuIFRoaXMgZW5zdXJlcyB3ZSBkb24ndCBhbmltYXRlIG9uIGluaXRpYWwgcmVuZGVyLlxuICAgIHRoaXMuX3N1YnNjcmlwdEFuaW1hdGlvblN0YXRlID0gJ2VudGVyJztcbiAgICAvLyBCZWNhdXNlIHRoZSBhYm92ZSBjaGFuZ2VzIGEgdmFsdWUgdXNlZCBpbiB0aGUgdGVtcGxhdGUgYWZ0ZXIgaXQgd2FzIGNoZWNrZWQsIHdlIG5lZWRcbiAgICAvLyB0byB0cmlnZ2VyIENEIG9yIHRoZSBjaGFuZ2UgbWlnaHQgbm90IGJlIHJlZmxlY3RlZCBpZiB0aGVyZSBpcyBubyBvdGhlciBDRCBzY2hlZHVsZWQuXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2Fzc2VydEZvcm1GaWVsZENvbnRyb2woKTtcbiAgICB0aGlzLl9pbml0aWFsaXplQ29udHJvbCgpO1xuICAgIHRoaXMuX2luaXRpYWxpemVTdWJzY3JpcHQoKTtcbiAgICB0aGlzLl9pbml0aWFsaXplUHJlZml4QW5kU3VmZml4KCk7XG4gICAgdGhpcy5faW5pdGlhbGl6ZU91dGxpbmVMYWJlbE9mZnNldFN1YnNjcmlwdGlvbnMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLl9hc3NlcnRGb3JtRmllbGRDb250cm9sKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gRWxlbWVudFJlZiBmb3IgdGhlIGVsZW1lbnQgdGhhdCBhIG92ZXJsYXkgYXR0YWNoZWQgdG8gdGhlIGZvcm0tZmllbGRcbiAgICogc2hvdWxkIGJlIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8uXG4gICAqL1xuICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl90ZXh0RmllbGQgfHwgdGhpcy5fZWxlbWVudFJlZjtcbiAgfVxuXG4gIC8qKiBBbmltYXRlcyB0aGUgcGxhY2Vob2xkZXIgdXAgYW5kIGxvY2tzIGl0IGluIHBvc2l0aW9uLiAqL1xuICBfYW5pbWF0ZUFuZExvY2tMYWJlbCgpOiB2b2lkIHtcbiAgICAvLyBUaGlzIGlzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBvbmx5LiBDb25zdW1lcnMgb2YgdGhlIGZvcm0tZmllbGQgbWlnaHQgdXNlXG4gICAgLy8gdGhpcyBtZXRob2QuIGUuZy4gdGhlIGF1dG9jb21wbGV0ZSB0cmlnZ2VyLiBUaGlzIG1ldGhvZCBoYXMgYmVlbiBhZGRlZCB0byB0aGUgbm9uLU1EQ1xuICAgIC8vIGZvcm0tZmllbGQgYmVjYXVzZSBzZXR0aW5nIFwiZmxvYXRMYWJlbFwiIHRvIFwiYWx3YXlzXCIgY2F1c2VkIHRoZSBsYWJlbCB0byBmbG9hdCB3aXRob3V0XG4gICAgLy8gYW5pbWF0aW9uLiBUaGlzIGlzIGRpZmZlcmVudCBpbiBNREMgd2hlcmUgdGhlIGxhYmVsIGFsd2F5cyBhbmltYXRlcywgc28gdGhpcyBtZXRob2RcbiAgICAvLyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LiBUaGVyZSBkb2Vzbid0IHNlZW0gYW55IGJlbmVmaXQgaW4gYWRkaW5nIGxvZ2ljIHRvIGFsbG93IGNoYW5naW5nXG4gICAgLy8gdGhlIGZsb2F0aW5nIGxhYmVsIHN0YXRlIHdpdGhvdXQgYW5pbWF0aW9ucy4gVGhlIG5vbi1NREMgaW1wbGVtZW50YXRpb24gd2FzIGluY29uc2lzdGVudFxuICAgIC8vIGJlY2F1c2UgaXQgYWx3YXlzIGFuaW1hdGVzIGlmIFwiZmxvYXRMYWJlbFwiIGlzIHNldCBhd2F5IGZyb20gXCJhbHdheXNcIi5cbiAgICAvLyBUT0RPKGRldnZlcnNpb24pOiBjb25zaWRlciByZW1vdmluZyB0aGlzIG1ldGhvZCB3aGVuIHJlbGVhc2luZyB0aGUgTURDIGZvcm0tZmllbGQuXG4gICAgaWYgKHRoaXMuX2hhc0Zsb2F0aW5nTGFiZWwoKSkge1xuICAgICAgdGhpcy5mbG9hdExhYmVsID0gJ2Fsd2F5cyc7XG4gICAgfVxuICB9XG5cbiAgLyoqIEluaXRpYWxpemVzIHRoZSByZWdpc3RlcmVkIGZvcm0tZmllbGQgY29udHJvbC4gKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZUNvbnRyb2woKSB7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuX2NvbnRyb2w7XG5cbiAgICBpZiAoY29udHJvbC5jb250cm9sVHlwZSkge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgIGBtYXQtbWRjLWZvcm0tZmllbGQtdHlwZS0ke2NvbnRyb2wuY29udHJvbFR5cGV9YCk7XG4gICAgfVxuXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGNoaWxkIGNvbnRyb2wgc3RhdGUgaW4gb3JkZXIgdG8gdXBkYXRlIHRoZSBmb3JtIGZpZWxkIFVJLlxuICAgIGNvbnRyb2wuc3RhdGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVGb2N1c1N0YXRlKCk7XG4gICAgICB0aGlzLl9zeW5jRGVzY3JpYmVkQnlJZHMoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgLy8gUnVuIGNoYW5nZSBkZXRlY3Rpb24gaWYgdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgaWYgKGNvbnRyb2wubmdDb250cm9sICYmIGNvbnRyb2wubmdDb250cm9sLnZhbHVlQ2hhbmdlcykge1xuICAgICAgY29udHJvbC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhlIHByZWZpeCBhbmQgc3VmZml4IGNvbnRhaW5lcnMuICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVQcmVmaXhBbmRTdWZmaXgoKSB7XG4gICAgLy8gTWFyayB0aGUgZm9ybS1maWVsZCBhcyBkaXJ0eSB3aGVuZXZlciB0aGUgcHJlZml4IG9yIHN1ZmZpeCBjaGlsZHJlbiBjaGFuZ2UuIFRoaXNcbiAgICAvLyBpcyBuZWNlc3NhcnkgYmVjYXVzZSB3ZSBjb25kaXRpb25hbGx5IGRpc3BsYXkgdGhlIHByZWZpeC9zdWZmaXggY29udGFpbmVycyBiYXNlZFxuICAgIC8vIG9uIHdoZXRoZXIgdGhlcmUgaXMgcHJvamVjdGVkIGNvbnRlbnQuXG4gICAgbWVyZ2UodGhpcy5fcHJlZml4Q2hpbGRyZW4uY2hhbmdlcywgdGhpcy5fc3VmZml4Q2hpbGRyZW4uY2hhbmdlcylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBzdWJzY3JpcHQgYnkgdmFsaWRhdGluZyBoaW50cyBhbmQgc3luY2hyb25pemluZyBcImFyaWEtZGVzY3JpYmVkYnlcIiBpZHNcbiAgICogd2l0aCB0aGUgY3VzdG9tIGZvcm0tZmllbGQgY29udHJvbC4gQWxzbyBzdWJzY3JpYmVzIHRvIGhpbnQgYW5kIGVycm9yIGNoYW5nZXMgaW4gb3JkZXJcbiAgICogdG8gYmUgYWJsZSB0byB2YWxpZGF0ZSBhbmQgc3luY2hyb25pemUgaWRzIG9uIGNoYW5nZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVTdWJzY3JpcHQoKSB7XG4gICAgLy8gUmUtdmFsaWRhdGUgd2hlbiB0aGUgbnVtYmVyIG9mIGhpbnRzIGNoYW5nZXMuXG4gICAgdGhpcy5faGludENoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NIaW50cygpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIGFyaWEtZGVzY3JpYmVkIGJ5IHdoZW4gdGhlIG51bWJlciBvZiBlcnJvcnMgY2hhbmdlcy5cbiAgICB0aGlzLl9lcnJvckNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3N5bmNEZXNjcmliZWRCeUlkcygpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsIG1hdC1oaW50IHZhbGlkYXRpb24gYW5kIHN1YnNjcmlwdCBkZXNjcmliZWRCeUlkcyBzeW5jLlxuICAgIHRoaXMuX3ZhbGlkYXRlSGludHMoKTtcbiAgICB0aGlzLl9zeW5jRGVzY3JpYmVkQnlJZHMoKTtcbiAgfVxuXG4gIC8qKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGZvcm0gZmllbGQncyBjb250cm9sIGlzIG1pc3NpbmcuICovXG4gIHByaXZhdGUgX2Fzc2VydEZvcm1GaWVsZENvbnRyb2woKSB7XG4gICAgaWYgKCF0aGlzLl9jb250cm9sKSB7XG4gICAgICB0aHJvdyBnZXRNYXRGb3JtRmllbGRNaXNzaW5nQ29udHJvbEVycm9yKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRm9jdXNTdGF0ZSgpIHtcbiAgICAvLyBVc3VhbGx5IHRoZSBNREMgZm91bmRhdGlvbiB3b3VsZCBjYWxsIFwiYWN0aXZhdGVGb2N1c1wiIGFuZCBcImRlYWN0aXZhdGVGb2N1c1wiIHdoZW5ldmVyXG4gICAgLy8gY2VydGFpbiBET00gZXZlbnRzIGFyZSBlbWl0dGVkLiBUaGlzIGlzIG5vdCBwb3NzaWJsZSBpbiBvdXIgaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gICAgLy8gZm9ybS1maWVsZCBiZWNhdXNlIHdlIHN1cHBvcnQgYWJzdHJhY3QgZm9ybSBmaWVsZCBjb250cm9scyB3aGljaCBhcmUgbm90IG5lY2Vzc2FyaWx5XG4gICAgLy8gb2YgdHlwZSBpbnB1dCwgbm9yIGRvIHdlIGhhdmUgYSByZWZlcmVuY2UgdG8gYSBuYXRpdmUgZm9ybS1maWVsZCBjb250cm9sIGVsZW1lbnQuIEluc3RlYWRcbiAgICAvLyB3ZSBoYW5kbGUgdGhlIGZvY3VzIGJ5IGNoZWNraW5nIGlmIHRoZSBhYnN0cmFjdCBmb3JtLWZpZWxkIGNvbnRyb2wgZm9jdXNlZCBzdGF0ZSBjaGFuZ2VzLlxuICAgIGlmICh0aGlzLl9jb250cm9sLmZvY3VzZWQgJiYgIXRoaXMuX2lzRm9jdXNlZCkge1xuICAgICAgdGhpcy5faXNGb2N1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uYWN0aXZhdGVGb2N1cygpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2NvbnRyb2wuZm9jdXNlZCAmJiAodGhpcy5faXNGb2N1c2VkIHx8IHRoaXMuX2lzRm9jdXNlZCA9PT0gbnVsbCkpIHtcbiAgICAgIHRoaXMuX2lzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fZm91bmRhdGlvbi5kZWFjdGl2YXRlRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsb2F0aW5nIGxhYmVsIGluIHRoZSBkb2NrZWQgc3RhdGUgbmVlZHMgdG8gYWNjb3VudCBmb3IgcHJlZml4ZXMuIFRoZSBob3Jpem9udGFsIG9mZnNldFxuICAgKiBpcyBjYWxjdWxhdGVkIHdoZW5ldmVyIHRoZSBhcHBlYXJhbmNlIGNoYW5nZXMgdG8gYG91dGxpbmVgLCB0aGUgcHJlZml4ZXMgY2hhbmdlLCBvciB3aGVuIHRoZVxuICAgKiBmb3JtLWZpZWxkIGlzIGFkZGVkIHRvIHRoZSBET00uIFRoaXMgbWV0aG9kIHNldHMgdXAgYWxsIHN1YnNjcmlwdGlvbnMgd2hpY2ggYXJlIG5lZWRlZCB0b1xuICAgKiB0cmlnZ2VyIHRoZSBsYWJlbCBvZmZzZXQgdXBkYXRlLiBJbiBnZW5lcmFsLCB3ZSB3YW50IHRvIGF2b2lkIHBlcmZvcm1pbmcgbWVhc3VyZW1lbnRzIG9mdGVuLFxuICAgKiBzbyB3ZSByZWx5IG9uIHRoZSBgTmdab25lYCBhcyBpbmRpY2F0b3Igd2hlbiB0aGUgb2Zmc2V0IHNob3VsZCBiZSByZWNhbGN1bGF0ZWQsIGluc3RlYWQgb2ZcbiAgICogY2hlY2tpbmcgZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVPdXRsaW5lTGFiZWxPZmZzZXRTdWJzY3JpcHRpb25zKCkge1xuICAgIC8vIFdoZW5ldmVyIHRoZSBwcmVmaXggY2hhbmdlcywgc2NoZWR1bGUgYW4gdXBkYXRlIG9mIHRoZSBsYWJlbCBvZmZzZXQuXG4gICAgdGhpcy5fcHJlZml4Q2hpbGRyZW4uY2hhbmdlc1xuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZWVkc091dGxpbmVMYWJlbE9mZnNldFVwZGF0ZU9uU3RhYmxlID0gdHJ1ZSk7XG5cbiAgICAvLyBOb3RlIHRoYXQgd2UgaGF2ZSB0byBydW4gb3V0c2lkZSBvZiB0aGUgYE5nWm9uZWAgZXhwbGljaXRseSwgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAvLyB0aHJvd2luZyB1c2VycyBpbnRvIGFuIGluZmluaXRlIGxvb3AgaWYgYHpvbmUtcGF0Y2gtcnhqc2AgaXMgaW5jbHVkZWQuXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fbmVlZHNPdXRsaW5lTGFiZWxPZmZzZXRVcGRhdGVPblN0YWJsZSkge1xuICAgICAgICAgIHRoaXMuX25lZWRzT3V0bGluZUxhYmVsT2Zmc2V0VXBkYXRlT25TdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl91cGRhdGVPdXRsaW5lTGFiZWxPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kaXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25lZWRzT3V0bGluZUxhYmVsT2Zmc2V0VXBkYXRlT25TdGFibGUgPSB0cnVlKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBmbG9hdGluZyBsYWJlbCBzaG91bGQgYWx3YXlzIGZsb2F0IG9yIG5vdC4gKi9cbiAgX3Nob3VsZEFsd2F5c0Zsb2F0KCkge1xuICAgIHJldHVybiB0aGlzLmZsb2F0TGFiZWwgPT09ICdhbHdheXMnO1xuICB9XG5cbiAgX2hhc091dGxpbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gJ291dGxpbmUnO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBkaXNwbGF5IGluIHRoZSBpbmZpeC4gTGFiZWxzIGluIHRoZSBvdXRsaW5lIGFwcGVhcmFuY2UgYXJlXG4gICAqIGRpc3BsYXllZCBhcyBwYXJ0IG9mIHRoZSBub3RjaGVkLW91dGxpbmUgYW5kIGFyZSBob3Jpem9udGFsbHkgb2Zmc2V0IHRvIGFjY291bnQgZm9yXG4gICAqIGZvcm0tZmllbGQgcHJlZml4IGNvbnRlbnQuIFRoaXMgd29uJ3Qgd29yayBpbiBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcgc2luY2Ugd2UgY2Fubm90XG4gICAqIG1lYXN1cmUgdGhlIHdpZHRoIG9mIHRoZSBwcmVmaXggY29udGFpbmVyLiBUbyBtYWtlIHRoZSBkb2NrZWQgbGFiZWwgYXBwZWFyIGFzIGlmIHRoZVxuICAgKiByaWdodCBvZmZzZXQgaGFzIGJlZW4gY2FsY3VsYXRlZCwgd2UgZm9yY2libHkgcmVuZGVyIHRoZSBsYWJlbCBpbnNpZGUgdGhlIGluZml4LiBTaW5jZVxuICAgKiB0aGUgbGFiZWwgaXMgcGFydCBvZiB0aGUgaW5maXgsIHRoZSBsYWJlbCBjYW5ub3Qgb3ZlcmZsb3cgdGhlIHByZWZpeCBjb250ZW50LlxuICAgKi9cbiAgX2ZvcmNlRGlzcGxheUluZml4TGFiZWwoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgdGhpcy5fcHJlZml4Q2hpbGRyZW4ubGVuZ3RoICYmICF0aGlzLl9zaG91bGRMYWJlbEZsb2F0KCk7XG4gIH1cblxuICBfaGFzRmxvYXRpbmdMYWJlbCgpIHtcbiAgICByZXR1cm4gISF0aGlzLl9sYWJlbENoaWxkTm9uU3RhdGljIHx8ICEhdGhpcy5fbGFiZWxDaGlsZFN0YXRpYztcbiAgfVxuXG4gIF9zaG91bGRMYWJlbEZsb2F0KCkge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sLnNob3VsZExhYmVsRmxvYXQgfHwgdGhpcy5fc2hvdWxkQWx3YXlzRmxvYXQoKTtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBjbGFzcyBmcm9tIHRoZSBOZ0NvbnRyb2wgc2hvdWxkIGJlIGZvcndhcmRlZCB0byB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICBfc2hvdWxkRm9yd2FyZChwcm9wOiBrZXlvZiBOZ0NvbnRyb2wpOiBib29sZWFuIHtcbiAgICBjb25zdCBuZ0NvbnRyb2wgPSB0aGlzLl9jb250cm9sID8gdGhpcy5fY29udHJvbC5uZ0NvbnRyb2wgOiBudWxsO1xuICAgIHJldHVybiBuZ0NvbnRyb2wgJiYgbmdDb250cm9sW3Byb3BdO1xuICB9XG5cbiAgLyoqIERldGVybWluZXMgd2hldGhlciB0byBkaXNwbGF5IGhpbnRzIG9yIGVycm9ycy4gKi9cbiAgX2dldERpc3BsYXllZE1lc3NhZ2VzKCk6ICdlcnJvcicgfCAnaGludCcge1xuICAgIHJldHVybiAodGhpcy5fZXJyb3JDaGlsZHJlbiAmJiB0aGlzLl9lcnJvckNoaWxkcmVuLmxlbmd0aCA+IDAgJiZcbiAgICAgIHRoaXMuX2NvbnRyb2wuZXJyb3JTdGF0ZSkgPyAnZXJyb3InIDogJ2hpbnQnO1xuICB9XG5cbiAgLyoqIFJlZnJlc2hlcyB0aGUgd2lkdGggb2YgdGhlIG91dGxpbmUtbm90Y2gsIGlmIHByZXNlbnQuICovXG4gIF9yZWZyZXNoT3V0bGluZU5vdGNoV2lkdGgoKSB7XG4gICAgaWYgKCF0aGlzLl9oYXNPdXRsaW5lKCkgfHwgIXRoaXMuX2Zsb2F0aW5nTGFiZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVGhlIG91dGxpbmUgbm90Y2ggc2hvdWxkIGJlIGJhc2VkIG9uIHRoZSBsYWJlbCB3aWR0aCwgYnV0IG5lZWRzIHRvIHJlc3BlY3QgdGhlIHNjYWxpbmdcbiAgICAvLyBhcHBsaWVkIHRvIHRoZSBsYWJlbCBpZiBpdCBhY3RpdmVseSBmbG9hdHMuIFNpbmNlIHRoZSBsYWJlbCBhbHdheXMgZmxvYXRzIHdoZW4gdGhlIG5vdGNoXG4gICAgLy8gaXMgb3BlbiwgdGhlIE1EQyB0ZXh0LWZpZWxkIGZsb2F0aW5nIGxhYmVsIHNjYWxpbmcgaXMgcmVzcGVjdGVkIGluIG5vdGNoIHdpZHRoIGNhbGN1bGF0aW9uLlxuICAgIHRoaXMuX291dGxpbmVOb3RjaFdpZHRoID0gdGhpcy5fZmxvYXRpbmdMYWJlbC5nZXRXaWR0aCgpICogbWRjVGV4dEZpZWxkTnVtYmVycy5MQUJFTF9TQ0FMRTtcbiAgfVxuXG4gIC8qKiBEb2VzIGFueSBleHRyYSBwcm9jZXNzaW5nIHRoYXQgaXMgcmVxdWlyZWQgd2hlbiBoYW5kbGluZyB0aGUgaGludHMuICovXG4gIHByaXZhdGUgX3Byb2Nlc3NIaW50cygpIHtcbiAgICB0aGlzLl92YWxpZGF0ZUhpbnRzKCk7XG4gICAgdGhpcy5fc3luY0Rlc2NyaWJlZEJ5SWRzKCk7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlIHRoYXQgdGhlcmUgaXMgYSBtYXhpbXVtIG9mIG9uZSBvZiBlYWNoIFwibWF0LWhpbnRcIiBhbGlnbm1lbnQgc3BlY2lmaWVkLiBUaGUgaGludFxuICAgKiBsYWJlbCBzcGVjaWZpZWQgc2V0IHRocm91Z2ggdGhlIGlucHV0IGlzIGJlaW5nIGNvbnNpZGVyZWQgYXMgXCJzdGFydFwiIGFsaWduZWQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgbm9vcCBpZiBBbmd1bGFyIHJ1bnMgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdGVIaW50cygpIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgdGhpcy5faGludENoaWxkcmVuKSB7XG4gICAgICBsZXQgc3RhcnRIaW50OiBNYXRIaW50O1xuICAgICAgbGV0IGVuZEhpbnQ6IE1hdEhpbnQ7XG4gICAgICB0aGlzLl9oaW50Q2hpbGRyZW4uZm9yRWFjaCgoaGludDogTWF0SGludCkgPT4ge1xuICAgICAgICBpZiAoaGludC5hbGlnbiA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgIGlmIChzdGFydEhpbnQgfHwgdGhpcy5oaW50TGFiZWwpIHtcbiAgICAgICAgICAgIHRocm93IGdldE1hdEZvcm1GaWVsZER1cGxpY2F0ZWRIaW50RXJyb3IoJ3N0YXJ0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXJ0SGludCA9IGhpbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaGludC5hbGlnbiA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICBpZiAoZW5kSGludCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0TWF0Rm9ybUZpZWxkRHVwbGljYXRlZEhpbnRFcnJvcignZW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVuZEhpbnQgPSBoaW50O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGlzdCBvZiBlbGVtZW50IElEcyB0aGF0IGRlc2NyaWJlIHRoZSBjaGlsZCBjb250cm9sLiBUaGlzIGFsbG93cyB0aGUgY29udHJvbCB0byB1cGRhdGVcbiAgICogaXRzIGBhcmlhLWRlc2NyaWJlZGJ5YCBhdHRyaWJ1dGUgYWNjb3JkaW5nbHkuXG4gICAqL1xuICBwcml2YXRlIF9zeW5jRGVzY3JpYmVkQnlJZHMoKSB7XG4gICAgaWYgKHRoaXMuX2NvbnRyb2wpIHtcbiAgICAgIGxldCBpZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgIGlmICh0aGlzLl9nZXREaXNwbGF5ZWRNZXNzYWdlcygpID09PSAnaGludCcpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRIaW50ID0gdGhpcy5faGludENoaWxkcmVuID9cbiAgICAgICAgICB0aGlzLl9oaW50Q2hpbGRyZW4uZmluZChoaW50ID0+IGhpbnQuYWxpZ24gPT09ICdzdGFydCcpIDogbnVsbDtcbiAgICAgICAgY29uc3QgZW5kSGludCA9IHRoaXMuX2hpbnRDaGlsZHJlbiA/XG4gICAgICAgICAgdGhpcy5faGludENoaWxkcmVuLmZpbmQoaGludCA9PiBoaW50LmFsaWduID09PSAnZW5kJykgOiBudWxsO1xuXG4gICAgICAgIGlmIChzdGFydEhpbnQpIHtcbiAgICAgICAgICBpZHMucHVzaChzdGFydEhpbnQuaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hpbnRMYWJlbCkge1xuICAgICAgICAgIGlkcy5wdXNoKHRoaXMuX2hpbnRMYWJlbElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRIaW50KSB7XG4gICAgICAgICAgaWRzLnB1c2goZW5kSGludC5pZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZXJyb3JDaGlsZHJlbikge1xuICAgICAgICBpZHMgPSB0aGlzLl9lcnJvckNoaWxkcmVuLm1hcChlcnJvciA9PiBlcnJvci5pZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NvbnRyb2wuc2V0RGVzY3JpYmVkQnlJZHMoaWRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgaG9yaXpvbnRhbCBvZmZzZXQgb2YgdGhlIGxhYmVsIGluIHRoZSBvdXRsaW5lIGFwcGVhcmFuY2UuIEluIHRoZSBvdXRsaW5lXG4gICAqIGFwcGVhcmFuY2UsIHRoZSBub3RjaGVkLW91dGxpbmUgYW5kIGxhYmVsIGFyZSBub3QgcmVsYXRpdmUgdG8gdGhlIGluZml4IGNvbnRhaW5lciBiZWNhdXNlXG4gICAqIHRoZSBvdXRsaW5lIGludGVuZHMgdG8gc3Vycm91bmQgcHJlZml4ZXMsIHN1ZmZpeGVzIGFuZCB0aGUgaW5maXguIFRoaXMgbWVhbnMgdGhhdCB0aGVcbiAgICogZmxvYXRpbmcgbGFiZWwgYnkgZGVmYXVsdCBvdmVybGFwcyBwcmVmaXhlcyBpbiB0aGUgZG9ja2VkIHN0YXRlLiBUbyBhdm9pZCB0aGlzLCB3ZSBuZWVkIHRvXG4gICAqIGhvcml6b250YWxseSBvZmZzZXQgdGhlIGxhYmVsIGJ5IHRoZSB3aWR0aCBvZiB0aGUgcHJlZml4IGNvbnRhaW5lci4gVGhlIE1EQyB0ZXh0LWZpZWxkIGRvZXNcbiAgICogbm90IG5lZWQgdG8gZG8gdGhpcyBiZWNhdXNlIHRoZXkgdXNlIGEgZml4ZWQgd2lkdGggZm9yIHByZWZpeGVzLiBIZW5jZSwgdGhleSBjYW4gc2ltcGx5XG4gICAqIGluY29ycG9yYXRlIHRoZSBob3Jpem9udGFsIG9mZnNldCBpbnRvIHRoZWlyIGRlZmF1bHQgdGV4dC1maWVsZCBzdHlsZXMuXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVPdXRsaW5lTGFiZWxPZmZzZXQoKSB7XG4gICAgaWYgKCF0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIgfHwgIXRoaXMuX2hhc091dGxpbmUoKSB8fCAhdGhpcy5fZmxvYXRpbmdMYWJlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmbG9hdGluZ0xhYmVsID0gdGhpcy5fZmxvYXRpbmdMYWJlbC5lbGVtZW50O1xuICAgIC8vIElmIG5vIHByZWZpeCBpcyBkaXNwbGF5ZWQsIHJlc2V0IHRoZSBvdXRsaW5lIGxhYmVsIG9mZnNldCBmcm9tIHBvdGVudGlhbFxuICAgIC8vIHByZXZpb3VzIGxhYmVsIG9mZnNldCB1cGRhdGVzLlxuICAgIGlmICghdGhpcy5fcHJlZml4Q29udGFpbmVyKSB7XG4gICAgICBmbG9hdGluZ0xhYmVsLnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgZm9ybS1maWVsZCBpcyBub3QgYXR0YWNoZWQgdG8gdGhlIERPTSB5ZXQgKGUuZy4gaW4gYSB0YWIpLCB3ZSBkZWZlclxuICAgIC8vIHRoZSBsYWJlbCBvZmZzZXQgdXBkYXRlIHVudGlsIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgaWYgKCF0aGlzLl9pc0F0dGFjaGVkVG9Eb20oKSkge1xuICAgICAgdGhpcy5fbmVlZHNPdXRsaW5lTGFiZWxPZmZzZXRVcGRhdGVPblN0YWJsZSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHByZWZpeENvbnRhaW5lciA9IHRoaXMuX3ByZWZpeENvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIC8vIElmIHRoZSBkaXJlY3Rpb25hbGl0eSBpcyBSVEwsIHRoZSB4LWF4aXMgdHJhbnNmb3JtIG5lZWRzIHRvIGJlIGludmVydGVkLiBUaGlzXG4gICAgLy8gaXMgYmVjYXVzZSBgdHJhbnNmb3JtWGAgZG9lcyBub3QgY2hhbmdlIGJhc2VkIG9uIHRoZSBwYWdlIGRpcmVjdGlvbmFsaXR5LlxuICAgIGNvbnN0IGxhYmVsSG9yaXpvbnRhbE9mZnNldCA9XG4gICAgICAodGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA/IC0xIDogMSkgKiBwcmVmaXhDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHRyYW5zZm9ybSB0aGUgZmxvYXRpbmcgbGFiZWwgdG8gYWNjb3VudCBmb3IgdGhlIHByZWZpeCBjb250YWluZXIuIE5vdGVcbiAgICAvLyB0aGF0IHdlIGRvIG5vdCB3YW50IHRvIG92ZXJ3cml0ZSB0aGUgZGVmYXVsdCB0cmFuc2Zvcm0gZm9yIGRvY2tlZCBmbG9hdGluZyBsYWJlbHMuXG4gICAgZmxvYXRpbmdMYWJlbC5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICBgJHtGTE9BVElOR19MQUJFTF9ERUZBVUxUX0RPQ0tFRF9UUkFOU0ZPUk19IHRyYW5zbGF0ZVgoJHtsYWJlbEhvcml6b250YWxPZmZzZXR9cHgpYDtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgZm9ybSBmaWVsZCBpcyBhdHRhY2hlZCB0byB0aGUgRE9NLiAqL1xuICBwcml2YXRlIF9pc0F0dGFjaGVkVG9Eb20oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGVsZW1lbnQuZ2V0Um9vdE5vZGUpIHtcbiAgICAgIGNvbnN0IHJvb3ROb2RlID0gZWxlbWVudC5nZXRSb290Tm9kZSgpO1xuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaXMgaW5zaWRlIHRoZSBET00gdGhlIHJvb3Qgbm9kZSB3aWxsIGJlIGVpdGhlciB0aGUgZG9jdW1lbnRcbiAgICAgIC8vIG9yIHRoZSBjbG9zZXN0IHNoYWRvdyByb290LCBvdGhlcndpc2UgaXQnbGwgYmUgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICAgICAgcmV0dXJuIHJvb3ROb2RlICYmIHJvb3ROb2RlICE9PSBlbGVtZW50O1xuICAgIH1cbiAgICAvLyBPdGhlcndpc2UgZmFsbCBiYWNrIHRvIGNoZWNraW5nIGlmIGl0J3MgaW4gdGhlIGRvY3VtZW50LiBUaGlzIGRvZXNuJ3QgYWNjb3VudCBmb3JcbiAgICAvLyBzaGFkb3cgRE9NLCBob3dldmVyIGJyb3dzZXIgdGhhdCBzdXBwb3J0IHNoYWRvdyBET00gc2hvdWxkIHN1cHBvcnQgYGdldFJvb3ROb2RlYCBhcyB3ZWxsLlxuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQhLmNvbnRhaW5zKGVsZW1lbnQpO1xuICB9XG59XG4iXX0=