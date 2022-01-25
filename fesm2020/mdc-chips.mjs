import * as i2 from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as i0 from '@angular/core';
import { Directive, Inject, Input, InjectionToken, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Optional, Attribute, Output, ContentChild, ViewChild, ContentChildren, forwardRef, Self, NgModule } from '@angular/core';
import * as i3$1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i3 from '@angular/material-experimental/mdc-core';
import { mixinTabIndex, mixinDisabled, mixinColor, mixinDisableRipple, MAT_RIPPLE_GLOBAL_OPTIONS, MatRipple, mixinErrorState, MatCommonModule, MatRippleModule, ErrorStateMatcher } from '@angular/material-experimental/mdc-core';
import { MDCChipPrimaryActionFoundation, MDCChipActionType, MDCChipTrailingActionFoundation, MDCChipFoundation, MDCChipActionEvents, MDCChipActionInteractionTrigger, MDCChipCssClasses, MDCChipSetFoundation, MDCChipEvents } from '@material/chips';
import * as i1 from '@angular/cdk/a11y';
import { Subject, merge } from 'rxjs';
import { take, startWith, takeUntil, switchMap } from 'rxjs/operators';
import { BACKSPACE, DELETE, ENTER, TAB, hasModifierKey } from '@angular/cdk/keycodes';
import * as i2$1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import * as i1$1 from '@angular/material-experimental/mdc-form-field';
import { MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material-experimental/mdc-form-field';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Emits a custom event from an element.
 * @param element Element from which to emit the event.
 * @param _document Document that the element is placed in.
 * @param eventName Name of the event.
 * @param data Data attached to the event.
 * @param shouldBubble Whether the event should bubble.
 */
function emitCustomEvent(element, _document, eventName, data, shouldBubble) {
    let event;
    if (typeof CustomEvent === 'function') {
        event = new CustomEvent(eventName, { bubbles: shouldBubble, detail: data });
    }
    else {
        event = _document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, shouldBubble, false, data);
    }
    element.dispatchEvent(event);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const _MatChipActionMixinBase = mixinTabIndex(mixinDisabled(class {
}), -1);
/**
 * Interactive element within a chip.
 * @docs-private
 */
class MatChipAction extends _MatChipActionMixinBase {
    constructor(_elementRef, _document, _changeDetectorRef) {
        super();
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._adapter = {
            focus: () => this.focus(),
            getAttribute: (name) => this._elementRef.nativeElement.getAttribute(name),
            setAttribute: (name, value) => {
                // MDC tries to update the tabindex directly in the DOM when navigating using the keyboard
                // which overrides our own handling. If we detect such a case, assign it to the same property
                // as the Angular binding in order to maintain consistency.
                if (name === 'tabindex') {
                    this._updateTabindex(parseInt(value));
                }
                else {
                    this._elementRef.nativeElement.setAttribute(name, value);
                }
            },
            removeAttribute: (name) => {
                if (name !== 'tabindex') {
                    this._elementRef.nativeElement.removeAttribute(name);
                }
            },
            getElementID: () => this._elementRef.nativeElement.id,
            emitEvent: (eventName, data) => {
                emitCustomEvent(this._elementRef.nativeElement, this._document, eventName, data, true);
            },
        };
        /** Whether the action is interactive. */
        this.isInteractive = true;
        this._foundation = this._createFoundation(this._adapter);
        if (_elementRef.nativeElement.nodeName === 'BUTTON') {
            _elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    _handleClick(_event) {
        // Usually these events can't happen while the chip is disabled since the browser won't
        // allow them which is what MDC seems to rely on, however the event can be faked in tests.
        if (!this.disabled && this.isInteractive) {
            this._foundation.handleClick();
        }
    }
    _handleKeydown(event) {
        // Usually these events can't happen while the chip is disabled since the browser won't
        // allow them which is what MDC seems to rely on, however the event can be faked in tests.
        if (!this.disabled && this.isInteractive) {
            this._foundation.handleKeydown(event);
        }
    }
    _createFoundation(adapter) {
        return new MDCChipPrimaryActionFoundation(adapter);
    }
    ngAfterViewInit() {
        this._foundation.init();
        this._foundation.setDisabled(this.disabled);
    }
    ngOnChanges(changes) {
        if (changes['disabled']) {
            this._foundation.setDisabled(this.disabled);
        }
    }
    ngOnDestroy() {
        this._foundation.destroy();
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    _getFoundation() {
        return this._foundation;
    }
    _updateTabindex(value) {
        this.tabIndex = value;
        this._changeDetectorRef.markForCheck();
    }
}
MatChipAction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipAction, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
MatChipAction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipAction, selector: "[matChipAction]", inputs: { disabled: "disabled", tabIndex: "tabIndex", isInteractive: "isInteractive" }, host: { listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "class.mdc-evolution-chip__action--primary": "_getFoundation().actionType() === 1", "class.mdc-evolution-chip__action--presentational": "_getFoundation().actionType() === 1", "class.mdc-evolution-chip__action--trailing": "_getFoundation().actionType() === 2", "attr.tabindex": "(disabled || !isInteractive) ? null : tabIndex", "attr.disabled": "disabled ? '' : null", "attr.aria-disabled": "disabled" }, classAttribute: "mdc-evolution-chip__action mat-mdc-chip-action" }, usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipAction, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matChipAction]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': 'mdc-evolution-chip__action mat-mdc-chip-action',
                        '[class.mdc-evolution-chip__action--primary]': `_getFoundation().actionType() === ${MDCChipActionType.PRIMARY}`,
                        // Note that while our actions are interactive, we have to add the `--presentational` class,
                        // in order to avoid some super-specific `:hover` styles from MDC.
                        '[class.mdc-evolution-chip__action--presentational]': `_getFoundation().actionType() === ${MDCChipActionType.PRIMARY}`,
                        '[class.mdc-evolution-chip__action--trailing]': `_getFoundation().actionType() === ${MDCChipActionType.TRAILING}`,
                        '[attr.tabindex]': '(disabled || !isInteractive) ? null : tabIndex',
                        '[attr.disabled]': "disabled ? '' : null",
                        '[attr.aria-disabled]': 'disabled',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { isInteractive: [{
                type: Input
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection token that can be used to reference instances of `MatChipAvatar`. It serves as
 * alternative token to the actual `MatChipAvatar` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_CHIP_AVATAR = new InjectionToken('MatChipAvatar');
/**
 * Directive to add CSS classes to chip leading icon.
 * @docs-private
 */
class MatChipAvatar {
}
MatChipAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatChipAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipAvatar, selector: "mat-chip-avatar, [matChipAvatar]", host: { attributes: { "role": "img" }, classAttribute: "mat-mdc-chip-avatar mdc-evolution-chip__icon mdc-evolution-chip__icon--primary" }, providers: [{ provide: MAT_CHIP_AVATAR, useExisting: MatChipAvatar }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: {
                        'class': 'mat-mdc-chip-avatar mdc-evolution-chip__icon mdc-evolution-chip__icon--primary',
                        'role': 'img',
                    },
                    providers: [{ provide: MAT_CHIP_AVATAR, useExisting: MatChipAvatar }],
                }]
        }] });
/**
 * Injection token that can be used to reference instances of `MatChipTrailingIcon`. It serves as
 * alternative token to the actual `MatChipTrailingIcon` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_CHIP_TRAILING_ICON = new InjectionToken('MatChipTrailingIcon');
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * @docs-private
 */
class MatChipTrailingIcon extends MatChipAction {
    constructor() {
        super(...arguments);
        /**
         * MDC considers all trailing actions as a remove icon,
         * but we support non-interactive trailing icons.
         */
        this.isInteractive = false;
    }
    _createFoundation(adapter) {
        return new MDCChipTrailingActionFoundation(adapter);
    }
}
MatChipTrailingIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipTrailingIcon, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatChipTrailingIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipTrailingIcon, selector: "mat-chip-trailing-icon, [matChipTrailingIcon]", host: { attributes: { "aria-hidden": "true" }, classAttribute: "mat-mdc-chip-trailing-icon mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing" }, providers: [{ provide: MAT_CHIP_TRAILING_ICON, useExisting: MatChipTrailingIcon }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipTrailingIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: {
                        'class': 'mat-mdc-chip-trailing-icon mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing',
                        'aria-hidden': 'true',
                    },
                    providers: [{ provide: MAT_CHIP_TRAILING_ICON, useExisting: MatChipTrailingIcon }],
                }]
        }] });
/**
 * Injection token that can be used to reference instances of `MatChipRemove`. It serves as
 * alternative token to the actual `MatChipRemove` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
const MAT_CHIP_REMOVE = new InjectionToken('MatChipRemove');
/**
 * Directive to remove the parent chip when the trailing icon is clicked or
 * when the ENTER key is pressed on it.
 *
 * Recommended for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 * ```
 * <mat-chip>
 *   <mat-icon matChipRemove>cancel</mat-icon>
 * </mat-chip>
 * ```
 */
class MatChipRemove extends MatChipAction {
    _createFoundation(adapter) {
        return new MDCChipTrailingActionFoundation(adapter);
    }
    _handleClick(event) {
        // Some consumers bind `click` events directly on the chip
        // which will also pick up clicks on the remove button.
        event.stopPropagation();
        super._handleClick(event);
    }
    _handleKeydown(event) {
        event.stopPropagation();
        super._handleKeydown(event);
    }
}
MatChipRemove.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipRemove, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatChipRemove.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipRemove, selector: "[matChipRemove]", host: { attributes: { "role": "button" }, properties: { "attr.aria-hidden": "null" }, classAttribute: "mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing" }, providers: [{ provide: MAT_CHIP_REMOVE, useExisting: MatChipRemove }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipRemove, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matChipRemove]',
                    host: {
                        'class': 'mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator ' +
                            'mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing',
                        'role': 'button',
                        '[attr.aria-hidden]': 'null',
                    },
                    providers: [{ provide: MAT_CHIP_REMOVE, useExisting: MatChipRemove }],
                }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let uid = 0;
/**
 * Boilerplate for applying mixins to MatChip.
 * @docs-private
 */
class MatChipBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatChipMixinBase = mixinTabIndex(mixinColor(mixinDisableRipple(MatChipBase), 'primary'), -1);
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
class MatChip extends _MatChipMixinBase {
    constructor(_changeDetectorRef, elementRef, _ngZone, _focusMonitor, _document, _dir, animationMode, _globalRippleOptions, tabIndex) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._focusMonitor = _focusMonitor;
        this._dir = _dir;
        this._globalRippleOptions = _globalRippleOptions;
        /** Whether the ripple is centered on the chip. */
        this._isRippleCentered = false;
        /** Emits when the chip is focused. */
        this._onFocus = new Subject();
        /** Emits when the chip is blurred. */
        this._onBlur = new Subject();
        /** Role for the root of the chip. */
        this.role = null;
        /** Whether the chip has focus. */
        this._hasFocusInternal = false;
        /** A unique id for the chip. If none is supplied, it will be auto-generated. */
        this.id = `mat-mdc-chip-${uid++}`;
        /** ARIA label for the content of the chip. */
        this.ariaLabel = null;
        this._disabled = false;
        this._removable = true;
        this._highlighted = false;
        /** Emitted when a chip is to be removed. */
        this.removed = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        this.destroyed = new EventEmitter();
        /** The unstyled chip selector for this component. */
        this.basicChipAttrName = 'mat-basic-chip';
        /**
         * Implementation of the MDC chip adapter interface.
         * These methods are called by the chip foundation.
         */
        this._chipAdapter = {
            addClass: className => this._setMdcClass(className, true),
            removeClass: className => this._setMdcClass(className, false),
            hasClass: className => this._elementRef.nativeElement.classList.contains(className),
            emitEvent: (eventName, data) => {
                emitCustomEvent(this._elementRef.nativeElement, this._document, eventName, data, true);
            },
            setStyleProperty: (propertyName, value) => {
                this._elementRef.nativeElement.style.setProperty(propertyName, value);
            },
            isRTL: () => this._dir?.value === 'rtl',
            getAttribute: attributeName => this._elementRef.nativeElement.getAttribute(attributeName),
            getElementID: () => this._elementRef.nativeElement.id,
            getOffsetWidth: () => this._elementRef.nativeElement.offsetWidth,
            getActions: () => {
                const result = [];
                if (this._getAction(MDCChipActionType.PRIMARY)) {
                    result.push(MDCChipActionType.PRIMARY);
                }
                if (this._getAction(MDCChipActionType.TRAILING)) {
                    result.push(MDCChipActionType.TRAILING);
                }
                return result;
            },
            isActionSelectable: (action) => {
                return this._getAction(action)?.isSelectable() || false;
            },
            isActionSelected: (action) => {
                return this._getAction(action)?.isSelected() || false;
            },
            isActionDisabled: (action) => {
                return this._getAction(action)?.isDisabled() || false;
            },
            isActionFocusable: (action) => {
                return this._getAction(action)?.isFocusable() || false;
            },
            setActionSelected: (action, isSelected) => {
                this._getAction(action)?.setSelected(isSelected);
            },
            setActionDisabled: (action, isDisabled) => {
                this._getAction(action)?.setDisabled(isDisabled);
            },
            setActionFocus: (action, behavior) => {
                this._getAction(action)?.setFocus(behavior);
            },
        };
        this._handleActionInteraction = (event) => {
            this._onChipInteraction(event);
        };
        this._handleActionNavigation = (event) => {
            this._chipFoundation.handleActionNavigation(event);
        };
        this._handleTransitionend = (event) => {
            if (event.target === this._elementRef.nativeElement) {
                this._ngZone.run(() => this._chipFoundation.handleTransitionEnd());
            }
        };
        this._handleAnimationend = (event) => {
            if (event.target === this._elementRef.nativeElement) {
                this._ngZone.run(() => this._chipFoundation.handleAnimationEnd(event));
            }
        };
        const element = elementRef.nativeElement;
        this._document = _document;
        this._chipFoundation = new MDCChipFoundation(this._chipAdapter);
        this._animationsDisabled = animationMode === 'NoopAnimations';
        this._isBasicChip =
            element.hasAttribute(this.basicChipAttrName) ||
                element.tagName.toLowerCase() === this.basicChipAttrName;
        element.addEventListener(MDCChipActionEvents.INTERACTION, this._handleActionInteraction);
        element.addEventListener(MDCChipActionEvents.NAVIGATION, this._handleActionNavigation);
        _focusMonitor.monitor(elementRef, true);
        _ngZone.runOutsideAngular(() => {
            element.addEventListener('transitionend', this._handleTransitionend);
            element.addEventListener('animationend', this._handleAnimationend);
        });
        if (tabIndex != null) {
            this.tabIndex = parseInt(tabIndex) ?? this.defaultTabIndex;
        }
    }
    _hasFocus() {
        return this._hasFocusInternal;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this.removeIcon) {
            this.removeIcon.disabled = this._disabled;
        }
        this._chipFoundation.setDisabled(this._disabled);
    }
    /**
     * The value of the chip. Defaults to the content inside
     * the `mat-mdc-chip-action-label` element.
     */
    get value() {
        return this._value !== undefined ? this._value : this._textElement.textContent.trim();
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     */
    get removable() {
        return this._removable;
    }
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    /**
     * Colors the chip for emphasis as if it were selected.
     */
    get highlighted() {
        return this._highlighted;
    }
    set highlighted(value) {
        this._highlighted = coerceBooleanProperty(value);
    }
    ngAfterViewInit() {
        this._chipFoundation.init();
        this._chipFoundation.setDisabled(this.disabled);
        this._textElement = this._elementRef.nativeElement.querySelector('.mat-mdc-chip-action-label');
        if (this._pendingFocus) {
            this._pendingFocus = false;
            this.focus();
        }
    }
    ngOnDestroy() {
        const element = this._elementRef.nativeElement;
        element.removeEventListener(MDCChipActionEvents.INTERACTION, this._handleActionInteraction);
        element.removeEventListener(MDCChipActionEvents.NAVIGATION, this._handleActionNavigation);
        element.removeEventListener('transitionend', this._handleTransitionend);
        element.removeEventListener('animationend', this._handleAnimationend);
        this._chipFoundation.destroy();
        this._focusMonitor.stopMonitoring(this._elementRef);
        this.destroyed.emit({ chip: this });
    }
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    remove() {
        if (this.removable) {
            this.removed.emit({ chip: this });
        }
    }
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    _setMdcClass(cssClass, active) {
        const classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    }
    /** Whether or not the ripple should be disabled. */
    _isRippleDisabled() {
        return (this.disabled ||
            this.disableRipple ||
            this._animationsDisabled ||
            this._isBasicChip ||
            !!this._globalRippleOptions?.disabled);
    }
    _getAction(type) {
        switch (type) {
            case MDCChipActionType.PRIMARY:
                return this.primaryAction?._getFoundation();
            case MDCChipActionType.TRAILING:
                return (this.removeIcon || this.trailingIcon)?._getFoundation();
        }
        return undefined;
    }
    _getFoundation() {
        return this._chipFoundation;
    }
    _hasTrailingIcon() {
        return !!(this.trailingIcon || this.removeIcon);
    }
    /** Allows for programmatic focusing of the chip. */
    focus() {
        if (this.disabled) {
            return;
        }
        // If `focus` is called before `ngAfterViewInit`, we won't have access to the primary action.
        // This can happen if the consumer tries to focus a chip immediately after it is added.
        // Queue the method to be called again on init.
        if (!this.primaryAction) {
            this._pendingFocus = true;
            return;
        }
        if (!this._hasFocus()) {
            this._onFocus.next({ chip: this });
            this._hasFocusInternal = true;
        }
        this.primaryAction.focus();
    }
    /** Overridden by MatChipOption. */
    _onChipInteraction(event) {
        const removeElement = this.removeIcon?._elementRef.nativeElement;
        const trigger = event.detail.trigger;
        // MDC's removal process requires an `animationend` event followed by a `transitionend`
        // event coming from the chip, which in turn will call `remove`. While we can stub
        // out these events in our own tests, they can be difficult to fake for consumers that are
        // testing our components or are wrapping them. We skip the entire sequence and trigger the
        // removal directly in order to make the component easier to deal with.
        if (removeElement &&
            (trigger === MDCChipActionInteractionTrigger.CLICK ||
                trigger === MDCChipActionInteractionTrigger.ENTER_KEY ||
                trigger === MDCChipActionInteractionTrigger.SPACEBAR_KEY) &&
            (event.target === removeElement || removeElement.contains(event.target))) {
            this.remove();
        }
        else {
            this._chipFoundation.handleActionInteraction(event);
        }
    }
}
MatChip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChip, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.FocusMonitor }, { token: DOCUMENT }, { token: i2.Directionality, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
MatChip.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChip, selector: "mat-basic-chip, mat-chip", inputs: { color: "color", disableRipple: "disableRipple", tabIndex: "tabIndex", role: "role", id: "id", ariaLabel: ["aria-label", "ariaLabel"], disabled: "disabled", value: "value", removable: "removable", highlighted: "highlighted" }, outputs: { removed: "removed", destroyed: "destroyed" }, host: { properties: { "class.mdc-evolution-chip": "!_isBasicChip", "class.mdc-evolution-chip--disabled": "disabled", "class.mdc-evolution-chip--with-trailing-action": "_hasTrailingIcon()", "class.mdc-evolution-chip--with-primary-graphic": "leadingIcon", "class.mdc-evolution-chip--with-primary-icon": "leadingIcon", "class.mdc-evolution-chip--with-avatar": "leadingIcon", "class.mat-mdc-chip-with-avatar": "leadingIcon", "class.mat-mdc-chip-highlighted": "highlighted", "class.mat-mdc-chip-disabled": "disabled", "class.mat-mdc-basic-chip": "_isBasicChip", "class.mat-mdc-standard-chip": "!_isBasicChip", "class.mat-mdc-chip-with-trailing-icon": "_hasTrailingIcon()", "class._mat-animation-noopable": "_animationsDisabled", "id": "id", "attr.role": "role", "attr.tabindex": "role ? tabIndex : null", "attr.aria-label": "ariaLabel" }, classAttribute: "mat-mdc-chip" }, queries: [{ propertyName: "leadingIcon", first: true, predicate: MAT_CHIP_AVATAR, descendants: true }, { propertyName: "trailingIcon", first: true, predicate: MAT_CHIP_TRAILING_ICON, descendants: true }, { propertyName: "removeIcon", first: true, predicate: MAT_CHIP_REMOVE, descendants: true }], viewQueries: [{ propertyName: "ripple", first: true, predicate: MatRipple, descendants: true }, { propertyName: "primaryAction", first: true, predicate: MatChipAction, descendants: true }], exportAs: ["matChip"], usesInheritance: true, ngImport: i0, template: "<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n<span class=\"mat-mdc-chip-focus-overlay\"></span>\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\">\n  <div matChipAction [isInteractive]=\"false\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"leadingIcon\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\">\n      <ng-content></ng-content>\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </div>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n", styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip{height:32px;border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__ripple{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary:before{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-evolution-chip .mdc-evolution-chip__action--primary,.mdc-evolution-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:20px}.mdc-evolution-chip .mdc-evolution-chip__graphic{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mdc-evolution-chip .mdc-evolution-chip__focus-ring{display:none}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + -4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{border-radius:16px 16px 16px 16px;height:32px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:14px 14px 14px 14px}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:28px}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:28px;width:28px;font-size:28px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:18px;width:18px;font-size:18px}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip.cdk-focused{outline:dotted 2px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:#000 !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1}.mat-mdc-chip{position:relative}.mat-mdc-chip-action-label{text-align:left}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}\n"], directives: [{ type: i3.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { type: MatChipAction, selector: "[matChipAction]", inputs: ["disabled", "tabIndex", "isInteractive"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChip, decorators: [{
            type: Component,
            args: [{ selector: 'mat-basic-chip, mat-chip', inputs: ['color', 'disableRipple', 'tabIndex'], exportAs: 'matChip', host: {
                        'class': 'mat-mdc-chip',
                        '[class.mdc-evolution-chip]': '!_isBasicChip',
                        '[class.mdc-evolution-chip--disabled]': 'disabled',
                        '[class.mdc-evolution-chip--with-trailing-action]': '_hasTrailingIcon()',
                        '[class.mdc-evolution-chip--with-primary-graphic]': 'leadingIcon',
                        '[class.mdc-evolution-chip--with-primary-icon]': 'leadingIcon',
                        '[class.mdc-evolution-chip--with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-basic-chip]': '_isBasicChip',
                        '[class.mat-mdc-standard-chip]': '!_isBasicChip',
                        '[class.mat-mdc-chip-with-trailing-icon]': '_hasTrailingIcon()',
                        '[class._mat-animation-noopable]': '_animationsDisabled',
                        '[id]': 'id',
                        '[attr.role]': 'role',
                        '[attr.tabindex]': 'role ? tabIndex : null',
                        '[attr.aria-label]': 'ariaLabel',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n<span class=\"mat-mdc-chip-focus-overlay\"></span>\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\">\n  <div matChipAction [isInteractive]=\"false\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"leadingIcon\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\">\n      <ng-content></ng-content>\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </div>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n", styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip{height:32px;border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__ripple{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary:before{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-evolution-chip .mdc-evolution-chip__action--primary,.mdc-evolution-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:20px}.mdc-evolution-chip .mdc-evolution-chip__graphic{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mdc-evolution-chip .mdc-evolution-chip__focus-ring{display:none}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + -4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{border-radius:16px 16px 16px 16px;height:32px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:14px 14px 14px 14px}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:28px}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:28px;width:28px;font-size:28px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:18px;width:18px;font-size:18px}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip.cdk-focused{outline:dotted 2px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:#000 !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1}.mat-mdc-chip{position:relative}.mat-mdc-chip-action-label{text-align:left}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_RIPPLE_GLOBAL_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }]; }, propDecorators: { role: [{
                type: Input
            }], id: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], removable: [{
                type: Input
            }], highlighted: [{
                type: Input
            }], removed: [{
                type: Output
            }], destroyed: [{
                type: Output
            }], leadingIcon: [{
                type: ContentChild,
                args: [MAT_CHIP_AVATAR]
            }], trailingIcon: [{
                type: ContentChild,
                args: [MAT_CHIP_TRAILING_ICON]
            }], removeIcon: [{
                type: ContentChild,
                args: [MAT_CHIP_REMOVE]
            }], ripple: [{
                type: ViewChild,
                args: [MatRipple]
            }], primaryAction: [{
                type: ViewChild,
                args: [MatChipAction]
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Event object emitted by MatChipOption when selected or deselected. */
class MatChipSelectionChange {
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
class MatChipOption extends MatChip {
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
        return (this._pendingSelectedState ?? this._chipFoundation.isActionSelected(MDCChipActionType.PRIMARY));
    }
    set selected(value) {
        if (this.selectable) {
            const coercedValue = coerceBooleanProperty(value);
            if (this._isInitialized) {
                this._setSelectedState(coercedValue, false);
            }
            else {
                this._pendingSelectedState = coercedValue;
            }
        }
    }
    /** The ARIA selected applied to the chip. */
    get ariaSelected() {
        // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
        // it adds noise to NVDA users where "not selected" will be read out for each chip.
        return this.selectable && (this._chipListMultiple || this.selected)
            ? this.selected.toString()
            : null;
    }
    ngOnInit() {
        this.role = 'presentation';
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this._isInitialized = true;
        if (this._pendingSelectedState != null) {
            // Note that we want to clear the pending state before calling `_setSelectedState`, because
            // we want it to read the actual selected state instead falling back to the pending one.
            const selectedState = this._pendingSelectedState;
            this._pendingSelectedState = undefined;
            this._setSelectedState(selectedState, false);
        }
    }
    /** Selects the chip. */
    select() {
        if (this.selectable) {
            this._setSelectedState(true, false);
        }
    }
    /** Deselects the chip. */
    deselect() {
        if (this.selectable) {
            this._setSelectedState(false, false);
        }
    }
    /** Selects this chip and emits userInputSelection event */
    selectViaInteraction() {
        if (this.selectable) {
            this._setSelectedState(true, true);
        }
    }
    /** Toggles the current selected state of this chip. */
    toggleSelected(isUserInput = false) {
        if (this.selectable) {
            this._setSelectedState(!this.selected, isUserInput);
        }
        return this.selected;
    }
    /** Resets the state of the chip when it loses focus. */
    _blur() {
        // When animations are enabled, Angular may end up removing the chip from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
        // that moves focus not the next item. To work around the issue, we defer marking the chip
        // as not focused until the next time the zone stabilizes.
        this._ngZone.onStable.pipe(take(1)).subscribe(() => {
            this._ngZone.run(() => {
                this._hasFocusInternal = false;
                this._onBlur.next({ chip: this });
            });
        });
    }
    _onChipInteraction(event) {
        const { trigger, source } = event.detail;
        // Non-selection interactions should work the same as other chips.
        if (source !== MDCChipActionType.PRIMARY ||
            (trigger !== MDCChipActionInteractionTrigger.CLICK &&
                trigger !== MDCChipActionInteractionTrigger.ENTER_KEY &&
                trigger !== MDCChipActionInteractionTrigger.SPACEBAR_KEY)) {
            super._onChipInteraction(event);
        }
        else if (this.selectable && !this.disabled) {
            // Otherwise only let the event through if the chip is enabled and selectable.
            this._chipFoundation.handleActionInteraction(event);
            this.selectionChange.emit({
                source: this,
                isUserInput: true,
                selected: this.selected,
            });
        }
    }
    _hasLeadingGraphic() {
        // The checkmark graphic is built in for multi-select chip lists.
        return this.leadingIcon || (this._chipListMultiple && this.selectable);
    }
    _setSelectedState(isSelected, isUserInput) {
        if (isSelected !== this.selected) {
            this._chipFoundation.setActionSelected(MDCChipActionType.PRIMARY, isSelected);
            this.selectionChange.emit({
                source: this,
                isUserInput,
                selected: this.selected,
            });
        }
        // MDC won't assign the selected class until the animation finishes, but that may not
        // happen if animations are disabled. If we detect such a case, assign the class manually.
        if (this._animationsDisabled) {
            this._elementRef.nativeElement.classList.toggle(MDCChipCssClasses.SELECTED, isSelected);
        }
    }
}
MatChipOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipOption, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatChipOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipOption, selector: "mat-basic-chip-option, mat-chip-option", inputs: { color: "color", disableRipple: "disableRipple", tabIndex: "tabIndex", selectable: "selectable", selected: "selected" }, outputs: { selectionChange: "selectionChange" }, host: { properties: { "class.mat-mdc-chip-selected": "selected", "class.mat-mdc-chip-multiple": "_chipListMultiple", "class.mat-mdc-chip-disabled": "disabled", "class.mat-mdc-chip-with-avatar": "leadingIcon", "class.mdc-evolution-chip--selectable": "selectable", "class.mdc-evolution-chip--disabled": "disabled", "class.mdc-evolution-chip--with-trailing-action": "_hasTrailingIcon()", "class.mdc-evolution-chip--with-primary-graphic": "_hasLeadingGraphic()", "class.mdc-evolution-chip--with-primary-icon": "leadingIcon", "class.mdc-evolution-chip--with-avatar": "leadingIcon", "class.mat-mdc-chip-highlighted": "highlighted", "class.mat-mdc-chip-with-trailing-icon": "_hasTrailingIcon()", "attr.tabindex": "null", "attr.aria-label": "null", "attr.role": "role", "id": "id" }, classAttribute: "mat-mdc-chip mat-mdc-chip-option mdc-evolution-chip mdc-evolution-chip--filter" }, providers: [{ provide: MatChip, useExisting: MatChipOption }], usesInheritance: true, ngImport: i0, template: "<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n<span class=\"mat-mdc-chip-focus-overlay\"></span>\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\">\n  <button\n    matChipAction\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    [attr.aria-selected]=\"ariaSelected\"\n    [attr.aria-label]=\"ariaLabel\"\n    role=\"option\"\n    (blur)=\"_blur()\"\n    (focus)=\"focus()\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"_hasLeadingGraphic()\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n      <span class=\"mdc-evolution-chip__checkmark\">\n        <svg class=\"mdc-evolution-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n          <path class=\"mdc-evolution-chip__checkmark-path\"\n                fill=\"none\" stroke=\"currentColor\" d=\"M1.73,12.91 8.1,19.28 22.79,4.59\" />\n        </svg>\n      </span>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\">\n      <ng-content></ng-content>\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </button>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n", styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip{height:32px;border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__ripple{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary:before{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-evolution-chip .mdc-evolution-chip__action--primary,.mdc-evolution-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:20px}.mdc-evolution-chip .mdc-evolution-chip__graphic{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mdc-evolution-chip .mdc-evolution-chip__focus-ring{display:none}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + -4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{border-radius:16px 16px 16px 16px;height:32px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:14px 14px 14px 14px}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:28px}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:28px;width:28px;font-size:28px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:18px;width:18px;font-size:18px}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip.cdk-focused{outline:dotted 2px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:#000 !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1}.mat-mdc-chip{position:relative}.mat-mdc-chip-action-label{text-align:left}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}\n"], directives: [{ type: i3.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { type: MatChipAction, selector: "[matChipAction]", inputs: ["disabled", "tabIndex", "isInteractive"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipOption, decorators: [{
            type: Component,
            args: [{ selector: 'mat-basic-chip-option, mat-chip-option', inputs: ['color', 'disableRipple', 'tabIndex'], host: {
                        'class': 'mat-mdc-chip mat-mdc-chip-option mdc-evolution-chip mdc-evolution-chip--filter',
                        '[class.mat-mdc-chip-selected]': 'selected',
                        '[class.mat-mdc-chip-multiple]': '_chipListMultiple',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mdc-evolution-chip--selectable]': 'selectable',
                        '[class.mdc-evolution-chip--disabled]': 'disabled',
                        '[class.mdc-evolution-chip--with-trailing-action]': '_hasTrailingIcon()',
                        '[class.mdc-evolution-chip--with-primary-graphic]': '_hasLeadingGraphic()',
                        '[class.mdc-evolution-chip--with-primary-icon]': 'leadingIcon',
                        '[class.mdc-evolution-chip--with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-trailing-icon]': '_hasTrailingIcon()',
                        '[attr.tabindex]': 'null',
                        '[attr.aria-label]': 'null',
                        '[attr.role]': 'role',
                        '[id]': 'id',
                    }, providers: [{ provide: MatChip, useExisting: MatChipOption }], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n<span class=\"mat-mdc-chip-focus-overlay\"></span>\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\">\n  <button\n    matChipAction\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    [attr.aria-selected]=\"ariaSelected\"\n    [attr.aria-label]=\"ariaLabel\"\n    role=\"option\"\n    (blur)=\"_blur()\"\n    (focus)=\"focus()\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"_hasLeadingGraphic()\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n      <span class=\"mdc-evolution-chip__checkmark\">\n        <svg class=\"mdc-evolution-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n          <path class=\"mdc-evolution-chip__checkmark-path\"\n                fill=\"none\" stroke=\"currentColor\" d=\"M1.73,12.91 8.1,19.28 22.79,4.59\" />\n        </svg>\n      </span>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\">\n      <ng-content></ng-content>\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </button>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n", styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip{height:32px;border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__ripple{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary:before{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-evolution-chip .mdc-evolution-chip__action--primary,.mdc-evolution-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:20px}.mdc-evolution-chip .mdc-evolution-chip__graphic{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mdc-evolution-chip .mdc-evolution-chip__focus-ring{display:none}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + -4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{border-radius:16px 16px 16px 16px;height:32px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:14px 14px 14px 14px}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:28px}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:28px;width:28px;font-size:28px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:18px;width:18px;font-size:18px}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip.cdk-focused{outline:dotted 2px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:#000 !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1}.mat-mdc-chip{position:relative}.mat-mdc-chip-action-label{text-align:left}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}\n"] }]
        }], propDecorators: { selectable: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A directive that makes a span editable and exposes functions to modify and retrieve the
 * element's contents.
 */
class MatChipEditInput {
    constructor(_elementRef, _document) {
        this._elementRef = _elementRef;
        this._document = _document;
    }
    initialize(initialValue) {
        this.getNativeElement().focus();
        this.setValue(initialValue);
    }
    getNativeElement() {
        return this._elementRef.nativeElement;
    }
    setValue(value) {
        this.getNativeElement().innerText = value;
        this._moveCursorToEndOfInput();
    }
    getValue() {
        return this.getNativeElement().textContent || '';
    }
    _moveCursorToEndOfInput() {
        const range = this._document.createRange();
        range.selectNodeContents(this.getNativeElement());
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
MatChipEditInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipEditInput, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MatChipEditInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipEditInput, selector: "span[matChipEditInput]", host: { attributes: { "role": "textbox", "tabindex": "-1", "contenteditable": "true" }, classAttribute: "mat-chip-edit-input" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipEditInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'span[matChipEditInput]',
                    host: {
                        'class': 'mat-chip-edit-input',
                        'role': 'textbox',
                        'tabindex': '-1',
                        'contenteditable': 'true',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
class MatChipRow extends MatChip {
    constructor(changeDetectorRef, elementRef, ngZone, focusMonitor, _document, dir, animationMode, globalRippleOptions, tabIndex) {
        super(changeDetectorRef, elementRef, ngZone, focusMonitor, _document, dir, animationMode, globalRippleOptions, tabIndex);
        this.basicChipAttrName = 'mat-basic-chip-row';
        this.editable = false;
        /** Emitted when the chip is edited. */
        this.edited = new EventEmitter();
        this._isEditing = false;
        this.role = 'row';
    }
    _hasTrailingIcon() {
        // The trailing icon is hidden while editing.
        return !this._isEditing && super._hasTrailingIcon();
    }
    /**
     * Emits a blur event when one of the gridcells loses focus, unless focus moved
     * to the other gridcell.
     */
    _focusout() {
        if (this._focusoutTimeout) {
            clearTimeout(this._focusoutTimeout);
        }
        // Wait to see if focus moves to the other gridcell
        this._focusoutTimeout = window.setTimeout(() => {
            if (this._isEditing) {
                this._onEditFinish();
            }
            this._hasFocusInternal = false;
            this._onBlur.next({ chip: this });
        });
    }
    /** Records that the chip has focus when one of the gridcells is focused. */
    _focusin() {
        if (this._focusoutTimeout) {
            clearTimeout(this._focusoutTimeout);
            this._focusoutTimeout = null;
        }
        this._hasFocusInternal = true;
    }
    /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
    _mousedown(event) {
        if (!this._isEditing) {
            if (!this.disabled) {
                this.focus();
            }
            event.preventDefault();
        }
    }
    /** Handles custom key presses. */
    _keydown(event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case ENTER:
                if (this._isEditing) {
                    event.preventDefault();
                    // Wrap in a timeout so the timing is consistent as when it is emitted in `focusout`.
                    setTimeout(() => this._onEditFinish());
                }
                else if (this.editable) {
                    this._startEditing();
                }
                break;
            case DELETE:
            case BACKSPACE:
                if (!this._isEditing) {
                    // Remove the focused chip
                    this.remove();
                    // Always prevent so page navigation does not occur
                    event.preventDefault();
                }
                break;
        }
    }
    _doubleclick() {
        if (!this.disabled && this.editable) {
            this._startEditing();
        }
    }
    _startEditing() {
        // The value depends on the DOM so we need to extract it before we flip the flag.
        const value = this.value;
        // Make the primary action non-interactive so that it doesn't
        // navigate when the user presses the arrow keys while editing.
        this.primaryAction.isInteractive = false;
        this._isEditing = true;
        // Defer initializing the input so it has time to be added to the DOM.
        setTimeout(() => this._getEditInput().initialize(value));
    }
    _onEditFinish() {
        // If the edit input is still focused or focus was returned to the body after it was destroyed,
        // return focus to the chip contents.
        if (this._document.activeElement === this._getEditInput().getNativeElement() ||
            this._document.activeElement === this._document.body) {
            this.primaryAction.focus();
        }
        this.edited.emit({ chip: this, value: this._getEditInput().getValue() });
        this.primaryAction.isInteractive = true;
        this._isEditing = false;
    }
    /**
     * Gets the projected chip edit input, or the default input if none is projected in. One of these
     * two values is guaranteed to be defined.
     */
    _getEditInput() {
        return this.contentEditInput || this.defaultEditInput;
    }
}
MatChipRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipRow, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.FocusMonitor }, { token: DOCUMENT }, { token: i2.Directionality, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
MatChipRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipRow, selector: "mat-chip-row, mat-basic-chip-row", inputs: { color: "color", disableRipple: "disableRipple", tabIndex: "tabIndex", editable: "editable" }, outputs: { edited: "edited" }, host: { listeners: { "mousedown": "_mousedown($event)", "keydown": "_keydown($event)", "dblclick": "_doubleclick()", "focusin": "_focusin($event)", "focusout": "_focusout($event)" }, properties: { "class.mat-mdc-chip-with-avatar": "leadingIcon", "class.mat-mdc-chip-disabled": "disabled", "class.mat-mdc-chip-editing": "_isEditing", "class.mat-mdc-chip-editable": "editable", "class.mdc-evolution-chip--disabled": "disabled", "class.mdc-evolution-chip--with-trailing-action": "_hasTrailingIcon()", "class.mdc-evolution-chip--with-primary-graphic": "leadingIcon", "class.mdc-evolution-chip--with-primary-icon": "leadingIcon", "class.mdc-evolution-chip--with-avatar": "leadingIcon", "class.mat-mdc-chip-highlighted": "highlighted", "class.mat-mdc-chip-with-trailing-icon": "_hasTrailingIcon()", "id": "id", "attr.tabindex": "null", "attr.aria-label": "null", "attr.role": "role" }, classAttribute: "mat-mdc-chip mat-mdc-chip-row mdc-evolution-chip" }, providers: [{ provide: MatChip, useExisting: MatChipRow }], queries: [{ propertyName: "contentEditInput", first: true, predicate: MatChipEditInput, descendants: true }], viewQueries: [{ propertyName: "defaultEditInput", first: true, predicate: MatChipEditInput, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!_isEditing\">\n  <span matRipple class=\"mat-mdc-chip-ripple\"\n       [matRippleDisabled]=\"_isRippleDisabled()\"\n       [matRippleCentered]=\"_isRippleCentered\"\n       [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n  <span class=\"mat-mdc-chip-focus-overlay\"></span>\n</ng-container>\n\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\" role=\"gridcell\">\n  <button\n    matChipAction\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    [attr.aria-label]=\"ariaLabel\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"leadingIcon\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\" [ngSwitch]=\"_isEditing\">\n      <ng-container *ngSwitchCase=\"false\"><ng-content></ng-content></ng-container>\n\n      <ng-container *ngSwitchCase=\"true\">\n        <ng-content *ngIf=\"contentEditInput; else defaultMatChipEditInput\"\n                    select=\"[matChipEditInput]\"></ng-content>\n        <ng-template #defaultMatChipEditInput><span matChipEditInput></span></ng-template>\n      </ng-container>\n\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </button>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n", styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip{height:32px;border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__ripple{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary:before{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-evolution-chip .mdc-evolution-chip__action--primary,.mdc-evolution-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:20px}.mdc-evolution-chip .mdc-evolution-chip__graphic{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mdc-evolution-chip .mdc-evolution-chip__focus-ring{display:none}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + -4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{border-radius:16px 16px 16px 16px;height:32px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:14px 14px 14px 14px}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:28px}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:28px;width:28px;font-size:28px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:18px;width:18px;font-size:18px}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip.cdk-focused{outline:dotted 2px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:#000 !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1}.mat-mdc-chip{position:relative}.mat-mdc-chip-action-label{text-align:left}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}\n"], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { type: MatChipAction, selector: "[matChipAction]", inputs: ["disabled", "tabIndex", "isInteractive"] }, { type: i3$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: MatChipEditInput, selector: "span[matChipEditInput]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipRow, decorators: [{
            type: Component,
            args: [{ selector: 'mat-chip-row, mat-basic-chip-row', inputs: ['color', 'disableRipple', 'tabIndex'], host: {
                        'class': 'mat-mdc-chip mat-mdc-chip-row mdc-evolution-chip',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-editing]': '_isEditing',
                        '[class.mat-mdc-chip-editable]': 'editable',
                        '[class.mdc-evolution-chip--disabled]': 'disabled',
                        '[class.mdc-evolution-chip--with-trailing-action]': '_hasTrailingIcon()',
                        '[class.mdc-evolution-chip--with-primary-graphic]': 'leadingIcon',
                        '[class.mdc-evolution-chip--with-primary-icon]': 'leadingIcon',
                        '[class.mdc-evolution-chip--with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-trailing-icon]': '_hasTrailingIcon()',
                        '[id]': 'id',
                        '[attr.tabindex]': 'null',
                        '[attr.aria-label]': 'null',
                        '[attr.role]': 'role',
                        '(mousedown)': '_mousedown($event)',
                        '(keydown)': '_keydown($event)',
                        '(dblclick)': '_doubleclick()',
                        '(focusin)': '_focusin($event)',
                        '(focusout)': '_focusout($event)',
                    }, providers: [{ provide: MatChip, useExisting: MatChipRow }], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"!_isEditing\">\n  <span matRipple class=\"mat-mdc-chip-ripple\"\n       [matRippleDisabled]=\"_isRippleDisabled()\"\n       [matRippleCentered]=\"_isRippleCentered\"\n       [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n  <span class=\"mat-mdc-chip-focus-overlay\"></span>\n</ng-container>\n\n\n<span class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--primary\" role=\"gridcell\">\n  <button\n    matChipAction\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    [attr.aria-label]=\"ariaLabel\">\n    <span class=\"mdc-evolution-chip__graphic mat-mdc-chip-graphic\" *ngIf=\"leadingIcon\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n    </span>\n    <span class=\"mdc-evolution-chip__text-label mat-mdc-chip-action-label\" [ngSwitch]=\"_isEditing\">\n      <ng-container *ngSwitchCase=\"false\"><ng-content></ng-content></ng-container>\n\n      <ng-container *ngSwitchCase=\"true\">\n        <ng-content *ngIf=\"contentEditInput; else defaultMatChipEditInput\"\n                    select=\"[matChipEditInput]\"></ng-content>\n        <ng-template #defaultMatChipEditInput><span matChipEditInput></span></ng-template>\n      </ng-container>\n\n      <span class=\"mat-mdc-chip-primary-focus-indicator mat-mdc-focus-indicator\"></span>\n    </span>\n  </button>\n</span>\n\n<span\n  class=\"mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing\"\n  *ngIf=\"_hasTrailingIcon()\">\n  <ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n</span>\n", styles: [".mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}.mdc-evolution-chip__action--primary{overflow-x:hidden}.mdc-evolution-chip__action--trailing{position:relative;overflow:visible}.mdc-evolution-chip__action--primary:before{box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1}.mdc-evolution-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-evolution-chip__action-touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-evolution-chip__text-label{white-space:nowrap;user-select:none;text-overflow:ellipsis;overflow:hidden}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mdc-evolution-chip__checkmark-background{opacity:0}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__graphic{transition:width 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark{transition:opacity 50ms 0ms linear,transform 100ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--deselecting .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selecting-with-primary-icon .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__icon--primary{transition:opacity 150ms 75ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark{transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-50%, -50%)}.mdc-evolution-chip--deselecting-with-primary-icon .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@keyframes mdc-evolution-chip-enter{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-evolution-chip--enter{animation:mdc-evolution-chip-enter 100ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-evolution-chip-exit{from{opacity:1}to{opacity:0}}.mdc-evolution-chip--exit{animation:mdc-evolution-chip-exit 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip--hidden{opacity:0;pointer-events:none;transition:width 150ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-evolution-chip{height:32px;border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__ripple{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary:before{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{border-radius:16px}.mdc-evolution-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-evolution-chip .mdc-evolution-chip__action--primary,.mdc-evolution-chip .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:12px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:6px;padding-right:6px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:20px}.mdc-evolution-chip .mdc-evolution-chip__graphic{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--primary{height:20px;width:20px;font-size:20px}.mdc-evolution-chip .mdc-evolution-chip__checkmark{height:20px;width:20px}.mdc-evolution-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mdc-evolution-chip .mdc-evolution-chip__focus-ring{display:none}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + 4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{z-index:1;display:block;pointer-events:none;border:2px solid transparent;border-radius:6px;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(\n      100% + 4px\n    );width:calc(\n      100% + -4px\n    )}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring{border-color:CanvasText}}.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{content:\"\";border:2px solid transparent;border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational).mdc-ripple-upgraded--background-focused .mdc-evolution-chip__focus-ring::after,.mdc-evolution-chip .mdc-evolution-chip__action--trailing:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus .mdc-evolution-chip__focus-ring::after{border-color:CanvasText}}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic[dir=rtl]{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--trailing[dir=rtl]{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing{left:8px;right:initial}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__ripple--trailing[dir=rtl]{left:initial;right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary,.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary[dir=rtl]{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__graphic{height:24px;width:24px;font-size:24px}.mdc-evolution-chip--with-avatar .mdc-evolution-chip__icon--primary{height:24px;width:24px;font-size:24px}.mat-mdc-standard-chip{border-radius:16px 16px 16px 16px;height:32px}.mat-mdc-standard-chip .mdc-evolution-chip__ripple{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-radius:16px 16px 16px 16px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:14px 14px 14px 14px}.mat-mdc-standard-chip.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--with-primary-icon){--mdc-chip-graphic-selected-width:28px}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{height:28px;width:28px;font-size:28px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary:before{border-width:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--selected) .mdc-evolution-chip__action--primary:before{border-width:1px}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{height:18px;width:18px;font-size:18px}.cdk-high-contrast-active .mat-mdc-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-standard-chip.cdk-focused{outline:dotted 2px}.cdk-high-contrast-active .mat-mdc-standard-chip .mdc-evolution-chip__checkmark-path{stroke:#000 !important}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:.4}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary{width:100%}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{opacity:.04}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{opacity:.12}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1}.mat-mdc-chip{position:relative}.mat-mdc-chip-action-label{text-align:left}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit;box-sizing:content-box}.mat-mdc-chip-remove{opacity:.54}.mat-mdc-chip-remove:focus{opacity:1}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}.cdk-high-contrast-active .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_RIPPLE_GLOBAL_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }]; }, propDecorators: { editable: [{
                type: Input
            }], edited: [{
                type: Output
            }], defaultEditInput: [{
                type: ViewChild,
                args: [MatChipEditInput]
            }], contentEditInput: [{
                type: ContentChild,
                args: [MatChipEditInput]
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Boilerplate for applying mixins to MatChipSet.
 * @docs-private
 */
class MatChipSetBase {
    constructor(_elementRef) { }
}
const _MatChipSetMixinBase = mixinTabIndex(MatChipSetBase);
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
class MatChipSet extends _MatChipSetMixinBase {
    constructor(_liveAnnouncer, _document, _elementRef, _changeDetectorRef) {
        super(_elementRef);
        this._liveAnnouncer = _liveAnnouncer;
        this._document = _document;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        this._lastDestroyedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip-set adapter interface.
         * These methods are called by the chip set foundation.
         */
        this._chipSetAdapter = {
            announceMessage: message => this._liveAnnouncer.announce(message),
            emitEvent: (eventName, eventDetail) => {
                emitCustomEvent(this._elementRef.nativeElement, this._document, eventName, eventDetail, true);
            },
            getAttribute: name => this._elementRef.nativeElement.getAttribute(name),
            getChipActionsAtIndex: index => this._chipFoundation(index)?.getActions() || [],
            getChipCount: () => this._chips.length,
            getChipIdAtIndex: index => this._chipFoundation(index)?.getElementID() || '',
            getChipIndexById: id => {
                return this._chips.toArray().findIndex(chip => chip._getFoundation().getElementID() === id);
            },
            isChipFocusableAtIndex: (index, actionType) => {
                return this._chipFoundation(index)?.isActionFocusable(actionType) || false;
            },
            isChipSelectableAtIndex: (index, actionType) => {
                return this._chipFoundation(index)?.isActionSelectable(actionType) || false;
            },
            isChipSelectedAtIndex: (index, actionType) => {
                return this._chipFoundation(index)?.isActionSelected(actionType) || false;
            },
            removeChipAtIndex: index => this._chips.toArray()[index]?.remove(),
            setChipFocusAtIndex: (index, action, behavior) => {
                this._chipFoundation(index)?.setActionFocus(action, behavior);
            },
            setChipSelectedAtIndex: (index, actionType, isSelected) => {
                // Setting the trailing action as deselected ends up deselecting the entire chip.
                // This is working as expected, but it's not something we want so we only apply the
                // selected state to the primary chip.
                if (actionType === MDCChipActionType.PRIMARY) {
                    this._chipFoundation(index)?.setActionSelected(actionType, isSelected);
                }
            },
            startChipAnimationAtIndex: (index, animation) => {
                this._chipFoundation(index)?.startAnimation(animation);
            },
        };
        /**
         * Map from class to whether the class is enabled.
         * Enabled classes are set on the MDC chip-set div.
         */
        this._mdcClasses = {};
        this._disabled = false;
        this._role = null;
        this._handleChipAnimation = (event) => {
            this._chipSetFoundation.handleChipAnimation(event);
        };
        this._handleChipInteraction = (event) => {
            this._chipSetFoundation.handleChipInteraction(event);
        };
        this._handleChipNavigation = (event) => {
            this._chipSetFoundation.handleChipNavigation(event);
        };
        const element = _elementRef.nativeElement;
        this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
        element.addEventListener(MDCChipEvents.ANIMATION, this._handleChipAnimation);
        element.addEventListener(MDCChipEvents.INTERACTION, this._handleChipInteraction);
        element.addEventListener(MDCChipEvents.NAVIGATION, this._handleChipNavigation);
    }
    /** Combined stream of all of the child chips' remove events. */
    get chipDestroyedChanges() {
        return this._getChipStream(chip => chip.destroyed);
    }
    /** Whether the chip set is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /** Whether the chip list contains chips or not. */
    get empty() {
        return this._chips.length === 0;
    }
    /** The ARIA role applied to the chip set. */
    get role() {
        if (this._role) {
            return this._role;
        }
        else {
            return this.empty ? null : 'presentation';
        }
    }
    set role(value) {
        this._role = value;
    }
    /** Whether any of the chips inside of this chip-set has focus. */
    get focused() {
        return this._hasFocusedChip();
    }
    ngAfterViewInit() {
        this._chipSetFoundation.init();
    }
    ngAfterContentInit() {
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(() => {
                    this._syncChipsState();
                });
            }
        });
        this.chipDestroyedChanges.pipe(takeUntil(this._destroyed)).subscribe((event) => {
            const chip = event.chip;
            const chipIndex = this._chips.toArray().indexOf(event.chip);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (this._isValidIndex(chipIndex) && chip._hasFocus()) {
                this._lastDestroyedChipIndex = chipIndex;
            }
        });
    }
    ngOnDestroy() {
        const element = this._elementRef.nativeElement;
        element.removeEventListener(MDCChipEvents.ANIMATION, this._handleChipAnimation);
        element.removeEventListener(MDCChipEvents.INTERACTION, this._handleChipInteraction);
        element.removeEventListener(MDCChipEvents.NAVIGATION, this._handleChipNavigation);
        this._destroyed.next();
        this._destroyed.complete();
        this._chipSetFoundation.destroy();
    }
    /** Checks whether any of the chips is focused. */
    _hasFocusedChip() {
        return this._chips && this._chips.some(chip => chip._hasFocus());
    }
    /** Syncs the chip-set's state with the individual chips. */
    _syncChipsState() {
        if (this._chips) {
            this._chips.forEach(chip => {
                chip.disabled = this._disabled;
                chip._changeDetectorRef.markForCheck();
            });
        }
    }
    /** Dummy method for subclasses to override. Base chip set cannot be focused. */
    focus() { }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this._chips.length;
    }
    /** Checks whether an event comes from inside a chip element. */
    _originatesFromChip(event) {
        return this._checkForClassInHierarchy(event, 'mdc-evolution-chip');
    }
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    _allowFocusEscape() {
        const previousTabIndex = this.tabIndex;
        if (this.tabIndex !== -1) {
            this.tabIndex = -1;
            setTimeout(() => {
                this.tabIndex = previousTabIndex;
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    /**
     * Gets a stream of events from all the chips within the set.
     * The stream will automatically incorporate any newly-added chips.
     */
    _getChipStream(mappingFunction) {
        return this._chips.changes.pipe(startWith(null), switchMap(() => merge(...this._chips.map(mappingFunction))));
    }
    _checkForClassInHierarchy(event, className) {
        let currentElement = event.target;
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            // Null check the classList, because IE and Edge don't support it on all elements.
            if (currentElement.classList && currentElement.classList.contains(className)) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    _chipFoundation(index) {
        return this._chips.toArray()[index]?._getFoundation();
    }
}
MatChipSet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipSet, deps: [{ token: i1.LiveAnnouncer }, { token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MatChipSet.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipSet, selector: "mat-chip-set", inputs: { disabled: "disabled", role: "role" }, host: { properties: { "attr.role": "role", "attr.aria-describedby": "_ariaDescribedby || null" }, classAttribute: "mat-mdc-chip-set mdc-evolution-chip-set" }, queries: [{ propertyName: "_chips", predicate: MatChip, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, isInline: true, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipSet, decorators: [{
            type: Component,
            args: [{ selector: 'mat-chip-set', template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, host: {
                        'class': 'mat-mdc-chip-set mdc-evolution-chip-set',
                        '[attr.role]': 'role',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.LiveAnnouncer }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], role: [{
                type: Input
            }], _chips: [{
                type: ContentChildren,
                args: [MatChip, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Change event object that is emitted when the chip listbox value has changed. */
class MatChipListboxChange {
    constructor(
    /** Chip listbox that emitted the event. */
    source, 
    /** Value of the chip listbox when the event was emitted. */
    value) {
        this.source = source;
        this.value = value;
    }
}
/**
 * Provider Expression that allows mat-chip-listbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatChipListbox),
    multi: true,
};
/**
 * An extension of the MatChipSet component that supports chip selection.
 * Used with MatChipOption chips.
 */
class MatChipListbox extends MatChipSet {
    constructor() {
        super(...arguments);
        /**
         * Function when touched. Set as part of ControlValueAccessor implementation.
         * @docs-private
         */
        this._onTouched = () => { };
        /**
         * Function when changed. Set as part of ControlValueAccessor implementation.
         * @docs-private
         */
        this._onChange = () => { };
        this._multiple = false;
        /** Orientation of the chip list. */
        this.ariaOrientation = 'horizontal';
        this._selectable = true;
        this._compareWith = (o1, o2) => o1 === o2;
        this._required = false;
        /** Event emitted when the selected chip listbox value has been changed by the user. */
        this.change = new EventEmitter();
    }
    /** The ARIA role applied to the chip listbox. */
    // TODO: MDC uses `grid` here
    get role() {
        return this.empty ? null : 'listbox';
    }
    /** Whether the user should be allowed to select multiple chips. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
        this._syncListboxProperties();
    }
    /** The array of selected chips inside the chip listbox. */
    get selected() {
        const selectedChips = this._chips.toArray().filter(chip => chip.selected);
        return this.multiple ? selectedChips : selectedChips[0];
    }
    /**
     * Whether or not this chip listbox is selectable.
     *
     * When a chip listbox is not selectable, the selected states for all
     * the chips inside the chip listbox are always ignored.
     */
    get selectable() {
        return this._selectable;
    }
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
        this._syncListboxProperties();
    }
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        this._compareWith = fn;
        this._initializeSelection();
    }
    /** Whether this chip listbox is required. */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /** Combined stream of all of the child chips' selection change events. */
    get chipSelectionChanges() {
        return this._getChipStream(chip => chip.selectionChange);
    }
    /** Combined stream of all of the child chips' focus events. */
    get chipFocusChanges() {
        return this._getChipStream(chip => chip._onFocus);
    }
    /** Combined stream of all of the child chips' blur events. */
    get chipBlurChanges() {
        return this._getChipStream(chip => chip._onBlur);
    }
    /** The value of the listbox, which is the combined value of the selected chips. */
    get value() {
        return this._value;
    }
    set value(value) {
        this.writeValue(value);
        this._value = value;
    }
    ngAfterContentInit() {
        super.ngAfterContentInit();
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            // Update listbox selectable/multiple properties on chips
            this._syncListboxProperties();
            // Reset chips selected/deselected status
            this._initializeSelection();
            // Check to see if we have a destroyed chip and need to refocus
            this._updateFocusForDestroyedChips();
        });
        this.chipBlurChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._blur());
        this.chipSelectionChanges.pipe(takeUntil(this._destroyed)).subscribe(event => {
            if (event.isUserInput) {
                this._propagateChanges();
            }
        });
    }
    /**
     * Focuses the first selected chip in this chip listbox, or the first non-disabled chip when there
     * are no selected chips.
     */
    focus() {
        if (this.disabled) {
            return;
        }
        const firstSelectedChip = this._getFirstSelectedChip();
        if (firstSelectedChip) {
            firstSelectedChip.focus();
        }
        else if (this._chips.length > 0) {
            // MDC sets the tabindex directly on the DOM node when the user is navigating which means
            // that we may end up with a `0` value from a previous interaction. We reset it manually
            // here to ensure that the state is correct.
            this._chips.forEach(chip => chip.primaryAction._updateTabindex(-1));
            this._chips.first.primaryAction.focus();
        }
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    writeValue(value) {
        if (this._chips) {
            this._setSelectionByValue(value, false);
        }
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /** Selects all chips with value. */
    _setSelectionByValue(value, isUserInput = true) {
        this._clearSelection();
        if (Array.isArray(value)) {
            value.forEach(currentValue => this._selectValue(currentValue, isUserInput));
        }
        else {
            this._selectValue(value, isUserInput);
        }
    }
    /** When blurred, marks the field as touched when focus moved outside the chip listbox. */
    _blur() {
        if (!this.disabled) {
            // Wait to see if focus moves to an individual chip.
            setTimeout(() => {
                if (!this.focused) {
                    this._propagateChanges();
                    this._markAsTouched();
                }
            });
        }
    }
    _keydown(event) {
        if (event.keyCode === TAB) {
            super._allowFocusEscape();
        }
    }
    /** Marks the field as touched */
    _markAsTouched() {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
    }
    /** Emits change event to set the model value. */
    _propagateChanges() {
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(chip => chip.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : undefined;
        }
        this._value = valueToEmit;
        this.change.emit(new MatChipListboxChange(this, valueToEmit));
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Initializes the chip listbox selection state to reflect any chips that were preselected.
     */
    _initializeSelection() {
        setTimeout(() => {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            this._chips.forEach((chip, index) => {
                if (chip.selected) {
                    this._chipSetFoundation.setChipSelected(index, MDCChipActionType.PRIMARY, true);
                }
            });
        });
    }
    /**
     * Deselects every chip in the listbox.
     * @param skip Chip that should not be deselected.
     */
    _clearSelection(skip) {
        this._chips.forEach(chip => {
            if (chip !== skip) {
                chip.deselect();
            }
        });
    }
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    _selectValue(value, isUserInput = true) {
        const correspondingChip = this._chips.find(chip => {
            return chip.value != null && this._compareWith(chip.value, value);
        });
        if (correspondingChip) {
            isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
        }
        return correspondingChip;
    }
    /** Syncs the chip-listbox selection state with the individual chips. */
    _syncListboxProperties() {
        if (this._chips) {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(() => {
                this._chips.forEach(chip => {
                    chip._chipListMultiple = this.multiple;
                    chip.chipListSelectable = this._selectable;
                    chip._changeDetectorRef.markForCheck();
                });
            });
        }
    }
    /** Returns the first selected chip in this listbox, or undefined if no chips are selected. */
    _getFirstSelectedChip() {
        if (Array.isArray(this.selected)) {
            return this.selected.length ? this.selected[0] : undefined;
        }
        else {
            return this.selected;
        }
    }
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    _updateFocusForDestroyedChips() {
        // Move focus to the closest chip. If no other chips remain, focus the chip-listbox itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this._chips.length) {
                const newChipIndex = Math.min(this._lastDestroyedChipIndex, this._chips.length - 1);
                this._chips.toArray()[newChipIndex].focus();
            }
            else {
                this.focus();
            }
        }
        this._lastDestroyedChipIndex = null;
    }
}
MatChipListbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipListbox, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatChipListbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipListbox, selector: "mat-chip-listbox", inputs: { tabIndex: "tabIndex", multiple: "multiple", ariaOrientation: ["aria-orientation", "ariaOrientation"], selectable: "selectable", compareWith: "compareWith", required: "required", value: "value" }, outputs: { change: "change" }, host: { listeners: { "focus": "focus()", "blur": "_blur()", "keydown": "_keydown($event)" }, properties: { "attr.role": "role", "tabIndex": "empty ? -1 : tabIndex", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-required": "role ? required : null", "attr.aria-disabled": "disabled.toString()", "attr.aria-multiselectable": "multiple", "attr.aria-orientation": "ariaOrientation", "class.mat-mdc-chip-list-disabled": "disabled", "class.mat-mdc-chip-list-required": "required" }, classAttribute: "mdc-evolution-chip-set mat-mdc-chip-listbox" }, providers: [MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR], queries: [{ propertyName: "_chips", predicate: MatChipOption, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, isInline: true, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipListbox, decorators: [{
            type: Component,
            args: [{ selector: 'mat-chip-listbox', template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, inputs: ['tabIndex'], host: {
                        'class': 'mdc-evolution-chip-set mat-mdc-chip-listbox',
                        '[attr.role]': 'role',
                        '[tabIndex]': 'empty ? -1 : tabIndex',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': 'role ? required : null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.aria-orientation]': 'ariaOrientation',
                        '[class.mat-mdc-chip-list-disabled]': 'disabled',
                        '[class.mat-mdc-chip-list-required]': 'required',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                    }, providers: [MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"] }]
        }], propDecorators: { multiple: [{
                type: Input
            }], ariaOrientation: [{
                type: Input,
                args: ['aria-orientation']
            }], selectable: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], required: [{
                type: Input
            }], value: [{
                type: Input
            }], change: [{
                type: Output
            }], _chips: [{
                type: ContentChildren,
                args: [MatChipOption, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Change event object that is emitted when the chip grid value has changed. */
class MatChipGridChange {
    constructor(
    /** Chip grid that emitted the event. */
    source, 
    /** Value of the chip grid when the event was emitted. */
    value) {
        this.source = source;
        this.value = value;
    }
}
/**
 * Boilerplate for applying mixins to MatChipGrid.
 * @docs-private
 */
class MatChipGridBase extends MatChipSet {
    constructor(liveAnnouncer, document, elementRef, changeDetectorRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        super(liveAnnouncer, document, elementRef, changeDetectorRef);
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const _MatChipGridMixinBase = mixinErrorState(MatChipGridBase);
/**
 * An extension of the MatChipSet component used with MatChipRow chips and
 * the matChipInputFor directive.
 */
class MatChipGrid extends _MatChipGridMixinBase {
    constructor(liveAnnouncer, document, elementRef, changeDetectorRef, parentForm, parentFormGroup, defaultErrorStateMatcher, ngControl) {
        super(liveAnnouncer, document, elementRef, changeDetectorRef, defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        this.controlType = 'mat-chip-grid';
        /**
         * Function when touched. Set as part of ControlValueAccessor implementation.
         * @docs-private
         */
        this._onTouched = () => { };
        /**
         * Function when changed. Set as part of ControlValueAccessor implementation.
         * @docs-private
         */
        this._onChange = () => { };
        this._value = [];
        /** Emits when the chip grid value has been changed by the user. */
        this.change = new EventEmitter();
        /**
         * Emits whenever the raw value of the chip-grid changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get id() {
        return this._chipInput.id;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get empty() {
        return ((!this._chipInput || this._chipInput.empty) && (!this._chips || this._chips.length === 0));
    }
    /** The ARIA role applied to the chip grid. */
    get role() {
        return this.empty ? null : 'grid';
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get placeholder() {
        return this._chipInput ? this._chipInput.placeholder : this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /** Whether any chips or the matChipInput inside of this chip-grid has focus. */
    get focused() {
        return this._chipInput.focused || this._hasFocusedChip();
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get required() {
        return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /** Combined stream of all of the child chips' blur events. */
    get chipBlurChanges() {
        return this._getChipStream(chip => chip._onBlur);
    }
    /** Combined stream of all of the child chips' focus events. */
    get chipFocusChanges() {
        return this._getChipStream(chip => chip._onFocus);
    }
    ngAfterContentInit() {
        super.ngAfterContentInit();
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            // Check to see if we have a destroyed chip and need to refocus
            this._updateFocusForDestroyedChips();
            this.stateChanges.next();
        });
        this.chipBlurChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._blur();
            this.stateChanges.next();
        });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (!this._chipInput && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('mat-chip-grid must be used in combination with matChipInputFor.');
        }
    }
    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.stateChanges.complete();
    }
    /** Associates an HTML input element with this chip grid. */
    registerInput(inputElement) {
        this._chipInput = inputElement;
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    onContainerClick(event) {
        if (!this.disabled && !this._originatesFromChip(event)) {
            this.focus();
        }
    }
    /**
     * Focuses the first chip in this chip grid, or the associated input when there
     * are no eligible chips.
     */
    focus() {
        if (this.disabled || this._chipInput.focused) {
            return;
        }
        if (this._chips.length > 0) {
            // MDC sets the tabindex directly on the DOM node when the user is navigating which means
            // that we may end up with a `0` value from a previous interaction. We reset it manually
            // here to ensure that the state is correct.
            this._chips.forEach(chip => chip.primaryAction._updateTabindex(-1));
            this._chips.first.focus();
        }
        else {
            // Delay until the next tick, because this can cause a "changed after checked"
            // error if the input does something on focus (e.g. opens an autocomplete).
            Promise.resolve().then(() => this._chipInput.focus());
        }
        this.stateChanges.next();
    }
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    writeValue(value) {
        // The user is responsible for creating the child chips, so we just store the value.
        this._value = value;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }
    /** When blurred, mark the field as touched when focus moved outside the chip grid. */
    _blur() {
        if (this.disabled) {
            return;
        }
        // Check whether the focus moved to chip input.
        // If the focus is not moved to chip input, mark the field as touched. If the focus moved
        // to chip input, do nothing.
        // Timeout is needed to wait for the focus() event trigger on chip input.
        setTimeout(() => {
            if (!this.focused) {
                this._propagateChanges();
                this._markAsTouched();
            }
        });
    }
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    _allowFocusEscape() {
        if (!this._chipInput.focused) {
            super._allowFocusEscape();
        }
    }
    /** Handles custom keyboard events. */
    _keydown(event) {
        if (event.keyCode === TAB && event.target.id !== this._chipInput.id) {
            this._allowFocusEscape();
        }
        this.stateChanges.next();
    }
    _focusLastChip() {
        if (this._chips.length) {
            this._chips.last.primaryAction.focus();
        }
    }
    /** Emits change event to set the model value. */
    _propagateChanges() {
        const valueToEmit = this._chips.length ? this._chips.toArray().map(chip => chip.value) : [];
        this._value = valueToEmit;
        this.change.emit(new MatChipGridChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    }
    /** Mark the field as touched */
    _markAsTouched() {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }
    /**
     * If the amount of chips changed, we need to focus the next closest chip.
     */
    _updateFocusForDestroyedChips() {
        // Move focus to the closest chip. If no other chips remain, focus the chip-grid itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this._chips.length) {
                const newChipIndex = Math.min(this._lastDestroyedChipIndex, this._chips.length - 1);
                this._chips.toArray()[newChipIndex].focus();
            }
            else {
                this.focus();
            }
        }
        this._lastDestroyedChipIndex = null;
    }
}
MatChipGrid.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipGrid, deps: [{ token: i1.LiveAnnouncer }, { token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2$1.NgForm, optional: true }, { token: i2$1.FormGroupDirective, optional: true }, { token: i3.ErrorStateMatcher }, { token: i2$1.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
MatChipGrid.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipGrid, selector: "mat-chip-grid", inputs: { tabIndex: "tabIndex", disabled: "disabled", placeholder: "placeholder", required: "required", value: "value", errorStateMatcher: "errorStateMatcher" }, outputs: { change: "change", valueChange: "valueChange" }, host: { listeners: { "focus": "focus()", "blur": "_blur()", "keydown": "_keydown($event)" }, properties: { "attr.role": "role", "tabIndex": "_chips && _chips.length === 0 ? -1 : tabIndex", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "class.mat-mdc-chip-list-disabled": "disabled", "class.mat-mdc-chip-list-invalid": "errorState", "class.mat-mdc-chip-list-required": "required" }, classAttribute: "mat-mdc-chip-set mat-mdc-chip-grid mdc-evolution-chip-set" }, providers: [{ provide: MatFormFieldControl, useExisting: MatChipGrid }], queries: [{ propertyName: "_chips", predicate: MatChipRow, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, isInline: true, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipGrid, decorators: [{
            type: Component,
            args: [{ selector: 'mat-chip-grid', template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, inputs: ['tabIndex'], host: {
                        'class': 'mat-mdc-chip-set mat-mdc-chip-grid mdc-evolution-chip-set',
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
                    }, providers: [{ provide: MatFormFieldControl, useExisting: MatChipGrid }], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.LiveAnnouncer }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2$1.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2$1.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i3.ErrorStateMatcher }, { type: i2$1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { disabled: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], value: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], change: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], _chips: [{
                type: ContentChildren,
                args: [MatChipRow, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token to be used to override the default options for the chips module. */
const MAT_CHIPS_DEFAULT_OPTIONS = new InjectionToken('mat-chips-default-options');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of a `<mat-chip-grid>`.
 */
class MatChipInput {
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
MatChipInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipInput, deps: [{ token: i0.ElementRef }, { token: MAT_CHIPS_DEFAULT_OPTIONS }, { token: MAT_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatChipInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0-rc.1", type: MatChipInput, selector: "input[matChipInputFor]", inputs: { chipGrid: ["matChipInputFor", "chipGrid"], addOnBlur: ["matChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["matChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", id: "id", disabled: "disabled" }, outputs: { chipEnd: "matChipInputTokenEnd" }, host: { listeners: { "keydown": "_keydown($event)", "keyup": "_keyup($event)", "blur": "_blur()", "focus": "_focus()", "input": "_onInput()" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null", "attr.aria-invalid": "_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null", "attr.aria-required": "_chipGrid && _chipGrid.required || null", "attr.required": "_chipGrid && _chipGrid.required || null" }, classAttribute: "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element" }, exportAs: ["matChipInput", "matChipInputFor"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipInput, decorators: [{
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
                }] }, { type: i1$1.MatFormField, decorators: [{
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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const CHIP_DECLARATIONS = [
    MatChip,
    MatChipAvatar,
    MatChipEditInput,
    MatChipGrid,
    MatChipInput,
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatChipRow,
    MatChipSet,
    MatChipTrailingIcon,
];
class MatChipsModule {
}
MatChipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatChipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipsModule, declarations: [MatChipAction, MatChip,
        MatChipAvatar,
        MatChipEditInput,
        MatChipGrid,
        MatChipInput,
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatChipRow,
        MatChipSet,
        MatChipTrailingIcon], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatCommonModule, MatChip,
        MatChipAvatar,
        MatChipEditInput,
        MatChipGrid,
        MatChipInput,
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatChipRow,
        MatChipSet,
        MatChipTrailingIcon] });
MatChipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipsModule, providers: [
        ErrorStateMatcher,
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER],
            },
        },
    ], imports: [[MatCommonModule, CommonModule, MatRippleModule], MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0-rc.1", ngImport: i0, type: MatChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatCommonModule, CHIP_DECLARATIONS],
                    declarations: [MatChipAction, CHIP_DECLARATIONS],
                    providers: [
                        ErrorStateMatcher,
                        {
                            provide: MAT_CHIPS_DEFAULT_OPTIONS,
                            useValue: {
                                separatorKeyCodes: [ENTER],
                            },
                        },
                    ],
                }]
        }] });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

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

export { MAT_CHIPS_DEFAULT_OPTIONS, MAT_CHIP_AVATAR, MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR, MAT_CHIP_REMOVE, MAT_CHIP_TRAILING_ICON, MatChip, MatChipAvatar, MatChipEditInput, MatChipGrid, MatChipGridChange, MatChipInput, MatChipListbox, MatChipListboxChange, MatChipOption, MatChipRemove, MatChipRow, MatChipSelectionChange, MatChipSet, MatChipTrailingIcon, MatChipsModule };
//# sourceMappingURL=mdc-chips.mjs.map
