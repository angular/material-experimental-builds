import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Directive, ChangeDetectorRef, ElementRef, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, NgZone, Optional, Inject, HostListener, Input, Output, ContentChild, ViewChild, QueryList, ContentChildren, forwardRef, Self, InjectionToken, NgModule } from '@angular/core';
import { mixinTabIndex, mixinDisabled, mixinColor, mixinDisableRipple, MatRipple, mixinErrorState, ErrorStateMatcher, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MDCChipTrailingActionFoundation, MDCChipFoundation, chipCssClasses, MDCChipSetFoundation } from '@material/chips';
import { numbers } from '@material/ripple';
import { hasModifierKey, SPACE, ENTER, DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW, BACKSPACE, DELETE, HOME, END, TAB } from '@angular/cdk/keycodes';
import { Subject, merge } from 'rxjs';
import { takeUntil, take, startWith } from 'rxjs/operators';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { NG_VALUE_ACCESSOR, NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive to add CSS classes to chip leading icon.
 * @docs-private
 */
let MatChipAvatar = /** @class */ (() => {
    class MatChipAvatar {
        constructor(_changeDetectorRef, _elementRef) {
            this._changeDetectorRef = _changeDetectorRef;
            this._elementRef = _elementRef;
        }
        /** Sets whether the given CSS class should be applied to the leading icon. */
        setClass(cssClass, active) {
            this._elementRef.nativeElement.classList.toggle(cssClass, active);
            this._changeDetectorRef.markForCheck();
        }
    }
    MatChipAvatar.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: {
                        'class': 'mat-mdc-chip-avatar mdc-chip__icon mdc-chip__icon--leading',
                        'role': 'img'
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipAvatar.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return MatChipAvatar;
})();
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * @docs-private
 */
let MatChipTrailingIcon = /** @class */ (() => {
    class MatChipTrailingIcon {
        constructor(_elementRef) {
            this._elementRef = _elementRef;
            this._adapter = {
                focus: () => this._elementRef.nativeElement.focus(),
                getAttribute: (name) => this._elementRef.nativeElement.getAttribute(name),
                setAttribute: (name, value) => {
                    this._elementRef.nativeElement.setAttribute(name, value);
                },
                // TODO(crisbeto): there's also a `trigger` parameter that the chip isn't
                // handling yet. Consider passing it along once MDC start using it.
                notifyInteraction: () => {
                    // TODO(crisbeto): uncomment this code once we've inverted the
                    // dependency on `MatChip`. this._chip._notifyInteraction();
                },
                // TODO(crisbeto): there's also a `key` parameter that the chip isn't
                // handling yet. Consider passing it along once MDC start using it.
                notifyNavigation: () => {
                    // TODO(crisbeto): uncomment this code once we've inverted the
                    // dependency on `MatChip`. this._chip._notifyNavigation();
                }
            };
            this._foundation = new MDCChipTrailingActionFoundation(this._adapter);
        }
        ngOnDestroy() {
            this._foundation.destroy();
        }
        focus() {
            this._elementRef.nativeElement.focus();
        }
        /** Sets an attribute on the icon. */
        setAttribute(name, value) {
            this._elementRef.nativeElement.setAttribute(name, value);
        }
        isNavigable() {
            return this._foundation.isNavigable();
        }
    }
    MatChipTrailingIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: {
                        'class': 'mat-mdc-chip-trailing-icon mdc-chip__icon mdc-chip__icon--trailing',
                        'tabindex': '-1',
                        'aria-hidden': 'true',
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipTrailingIcon.ctorParameters = () => [
        { type: ElementRef }
    ];
    return MatChipTrailingIcon;
})();
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * @docs-private
 */
class MatChipRemoveBase extends MatChipTrailingIcon {
    constructor(elementRef) {
        super(elementRef);
    }
}
const _MatChipRemoveMixinBase = mixinTabIndex(mixinDisabled(MatChipRemoveBase), 0);
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
let MatChipRemove = /** @class */ (() => {
    class MatChipRemove extends _MatChipRemoveMixinBase {
        constructor(elementRef) {
            super(elementRef);
            /**
             * Emits when the user interacts with the icon.
             * @docs-private
             */
            this.interaction = new Subject();
            if (elementRef.nativeElement.nodeName === 'BUTTON') {
                elementRef.nativeElement.setAttribute('type', 'button');
            }
        }
    }
    MatChipRemove.decorators = [
        { type: Directive, args: [{
                    selector: '[matChipRemove]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': `mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator
        mdc-chip__icon mdc-chip__icon--trailing`,
                        '[tabIndex]': 'tabIndex',
                        'role': 'button',
                        '(click)': 'interaction.next($event)',
                        '(keydown)': 'interaction.next($event)',
                        // We need to remove this explicitly, because it gets inherited from MatChipTrailingIcon.
                        '[attr.aria-hidden]': 'null',
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipRemove.ctorParameters = () => [
        { type: ElementRef }
    ];
    return MatChipRemove;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let uid = 0;
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * Directive to add MDC CSS to non-basic chips.
 * @docs-private
 */
let MatChipCssInternalOnly = /** @class */ (() => {
    class MatChipCssInternalOnly {
    }
    MatChipCssInternalOnly.decorators = [
        { type: Directive, args: [{
                    selector: `mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],
    [mat-chip-row]`,
                    host: { 'class': 'mat-mdc-chip mdc-chip' }
                },] }
    ];
    return MatChipCssInternalOnly;
})();
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
let MatChip = /** @class */ (() => {
    class MatChip extends _MatChipMixinBase {
        constructor(_changeDetectorRef, _elementRef, _ngZone, _dir, 
        // @breaking-change 8.0.0 `animationMode` parameter to become required.
        animationMode) {
            super(_elementRef);
            this._changeDetectorRef = _changeDetectorRef;
            this._elementRef = _elementRef;
            this._ngZone = _ngZone;
            this._dir = _dir;
            /** The ripple animation configuration to use for the chip. */
            this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
            /** Whether the ripple is centered on the chip. */
            this._isRippleCentered = false;
            /** Emits when the chip is focused. */
            this._onFocus = new Subject();
            /** Emits when the chip is blurred. */
            this._onBlur = new Subject();
            this.HANDLED_KEYS = [];
            /** Whether the chip has focus. */
            this._hasFocusInternal = false;
            /** Default unique id for the chip. */
            this._uniqueId = `mat-mdc-chip-${uid++}`;
            /** A unique id for the chip. If none is supplied, it will be auto-generated. */
            this.id = this._uniqueId;
            this._disabled = false;
            this._removable = true;
            this._highlighted = false;
            /** Emitted when the user interacts with the remove icon. */
            this.removeIconInteraction = new EventEmitter();
            /** Emitted when the user interacts with the chip. */
            this.interaction = new EventEmitter();
            /** Emitted when the chip is destroyed. */
            this.destroyed = new EventEmitter();
            /** Emitted when a chip is to be removed. */
            this.removed = new EventEmitter();
            /** The unstyled chip selector for this component. */
            this.basicChipAttrName = 'mat-basic-chip';
            /** Subject that emits when the component has been destroyed. */
            this._destroyed = new Subject();
            /**
             * Implementation of the MDC chip adapter interface.
             * These methods are called by the chip foundation.
             */
            this._chipAdapter = {
                addClass: (className) => this._setMdcClass(className, true),
                removeClass: (className) => this._setMdcClass(className, false),
                hasClass: (className) => this._elementRef.nativeElement.classList.contains(className),
                addClassToLeadingIcon: (className) => this.leadingIcon.setClass(className, true),
                removeClassFromLeadingIcon: (className) => this.leadingIcon.setClass(className, false),
                eventTargetHasClass: (target, className) => {
                    // We need to null check the `classList`, because IE and Edge don't
                    // support it on SVG elements and Edge seems to throw for ripple
                    // elements, because they're outside the DOM.
                    return (target && target.classList) ?
                        target.classList.contains(className) :
                        false;
                },
                notifyInteraction: () => this._notifyInteraction(),
                notifySelection: () => {
                    // No-op. We call dispatchSelectionEvent ourselves in MatChipOption,
                    // because we want to specify whether selection occurred via user
                    // input.
                },
                notifyNavigation: () => this._notifyNavigation(),
                notifyTrailingIconInteraction: () => this.removeIconInteraction.emit(this.id),
                notifyRemoval: () => {
                    this.removed.emit({ chip: this });
                    // When MDC removes a chip it just transitions it to `width: 0px`
                    // which means that it's still in the DOM and it's still focusable.
                    // Make it `display: none` so users can't tab into it.
                    this._elementRef.nativeElement.style.display = 'none';
                },
                getComputedStyleValue: propertyName => {
                    // This function is run when a chip is removed so it might be
                    // invoked during server-side rendering. Add some extra checks just in
                    // case.
                    if (typeof window !== 'undefined' && window) {
                        const getComputedStyle = window.getComputedStyle(this._elementRef.nativeElement);
                        return getComputedStyle.getPropertyValue(propertyName);
                    }
                    return '';
                },
                setStyleProperty: (propertyName, value) => {
                    this._elementRef.nativeElement.style.setProperty(propertyName, value);
                },
                hasLeadingIcon: () => !!this.leadingIcon,
                isTrailingActionNavigable: () => {
                    if (this.trailingIcon) {
                        return this.trailingIcon.isNavigable();
                    }
                    return false;
                },
                isRTL: () => !!this._dir && this._dir.value === 'rtl',
                focusPrimaryAction: () => {
                    // Angular Material MDC chips fully manage focus. TODO: Managing focus
                    // and handling keyboard events was added by MDC after our
                    // implementation; consider consolidating.
                },
                focusTrailingAction: () => { },
                removeTrailingActionFocus: () => { },
                setPrimaryActionAttr: (name, value) => {
                    // MDC is currently using this method to set aria-checked on choice
                    // and filter chips, which in the MDC templates have role="checkbox"
                    // and role="radio" respectively. We have role="option" on those chips
                    // instead, so we do not want aria-checked. Since we also manage the
                    // tabindex ourselves, we don't allow MDC to set it.
                    if (name === 'aria-checked' || name === 'tabindex') {
                        return;
                    }
                    this._elementRef.nativeElement.setAttribute(name, value);
                },
                // The 2 functions below are used by the MDC ripple, which we aren't using,
                // so they will never be called
                getRootBoundingClientRect: () => this._elementRef.nativeElement.getBoundingClientRect(),
                getCheckmarkBoundingClientRect: () => null,
                getAttribute: (attr) => this._elementRef.nativeElement.getAttribute(attr),
            };
            this._chipFoundation = new MDCChipFoundation(this._chipAdapter);
            this._animationsDisabled = animationMode === 'NoopAnimations';
            this._isBasicChip = _elementRef.nativeElement.hasAttribute(this.basicChipAttrName) ||
                _elementRef.nativeElement.tagName.toLowerCase() === this.basicChipAttrName;
        }
        // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
        // In Ivy the `host` bindings will be merged when this class is extended, whereas in
        // ViewEngine they're overwritten.
        // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
        // tslint:disable-next-line:no-host-decorator-in-concrete
        _handleTransitionEnd(event) {
            this._chipFoundation.handleTransitionEnd(event);
        }
        get _hasFocus() {
            return this._hasFocusInternal;
        }
        get disabled() { return this._disabled; }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
            if (this.removeIcon) {
                this.removeIcon.disabled = value;
            }
        }
        /** The value of the chip. Defaults to the content inside the mdc-chip__text element. */
        get value() {
            return this._value !== undefined
                ? this._value
                : this._textElement.textContent.trim();
        }
        set value(value) { this._value = value; }
        /**
         * Determines whether or not the chip displays the remove styling and emits (removed) events.
         */
        get removable() { return this._removable; }
        set removable(value) {
            this._removable = coerceBooleanProperty(value);
        }
        /**
         * Colors the chip for emphasis as if it were selected.
         */
        get highlighted() { return this._highlighted; }
        set highlighted(value) {
            this._highlighted = coerceBooleanProperty(value);
        }
        ngAfterContentInit() {
            this._initRemoveIcon();
        }
        ngAfterViewInit() {
            this._chipFoundation.init();
            this._textElement = this._elementRef.nativeElement.querySelector('.mdc-chip__text');
        }
        ngOnDestroy() {
            this.destroyed.emit({ chip: this });
            this._destroyed.next();
            this._destroyed.complete();
            this._chipFoundation.destroy();
        }
        /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
        _initRemoveIcon() {
            if (this.removeIcon) {
                this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
                this._listenToRemoveIconInteraction();
                this.removeIcon.disabled = this.disabled;
            }
        }
        /** Handles interaction with the remove icon. */
        _listenToRemoveIconInteraction() {
            this.removeIcon.interaction
                .pipe(takeUntil(this._destroyed))
                .subscribe(event => {
                // The MDC chip foundation calls stopPropagation() for any trailing icon interaction
                // event, even ones it doesn't handle, so we want to avoid passing it keyboard events
                // for which we have a custom handler. Note that we assert the type of the event using
                // the `type`, because `instanceof KeyboardEvent` can throw during server-side rendering.
                const isKeyboardEvent = event.type.startsWith('key');
                if (this.disabled || (isKeyboardEvent &&
                    this.HANDLED_KEYS.indexOf(event.keyCode) !== -1)) {
                    return;
                }
                this._chipFoundation.handleTrailingActionInteraction();
                if (isKeyboardEvent && !hasModifierKey(event)) {
                    const keyCode = event.keyCode;
                    // Prevent default space and enter presses so we don't scroll the page or submit forms.
                    if (keyCode === SPACE || keyCode === ENTER) {
                        event.preventDefault();
                    }
                }
            });
        }
        /**
         * Allows for programmatic removal of the chip.
         *
         * Informs any listeners of the removal request. Does not remove the chip from the DOM.
         */
        remove() {
            if (this.removable) {
                this._chipFoundation.beginExit();
            }
        }
        /** Sets whether the given CSS class should be applied to the MDC chip. */
        _setMdcClass(cssClass, active) {
            const classes = this._elementRef.nativeElement.classList;
            active ? classes.add(cssClass) : classes.remove(cssClass);
            this._changeDetectorRef.markForCheck();
        }
        /** Forwards interaction events to the MDC chip foundation. */
        _handleInteraction(event) {
            if (this.disabled) {
                return;
            }
            if (event.type === 'click') {
                this._chipFoundation.handleClick();
                return;
            }
            if (event.type === 'keydown') {
                this._chipFoundation.handleKeydown(event);
                return;
            }
        }
        /** Whether or not the ripple should be disabled. */
        _isRippleDisabled() {
            return this.disabled || this.disableRipple || this._animationsDisabled || this._isBasicChip;
        }
        _notifyInteraction() {
            this.interaction.emit(this.id);
        }
        _notifyNavigation() {
            // TODO: This is a new feature added by MDC. Consider exposing it to users
            // in the future.
        }
    }
    MatChip.decorators = [
        { type: Component, args: [{
                    selector: 'mat-basic-chip, mat-chip',
                    inputs: ['color', 'disableRipple'],
                    exportAs: 'matChip',
                    template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__primary-action\">\n  <div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n</div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n",
                    host: {
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mat-mdc-basic-chip]': '_isBasicChip',
                        '[class.mat-mdc-standard-chip]': '!_isBasicChip',
                        '[class._mat-animation-noopable]': '_animationsDisabled',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    /** @nocollapse */
    MatChip.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ];
    MatChip.propDecorators = {
        _handleTransitionEnd: [{ type: HostListener, args: ['transitionend', ['$event'],] }],
        id: [{ type: Input }],
        disabled: [{ type: Input }],
        value: [{ type: Input }],
        removable: [{ type: Input }],
        highlighted: [{ type: Input }],
        removeIconInteraction: [{ type: Output }],
        interaction: [{ type: Output }],
        destroyed: [{ type: Output }],
        removed: [{ type: Output }],
        leadingIcon: [{ type: ContentChild, args: [MatChipAvatar,] }],
        trailingIcon: [{ type: ContentChild, args: [MatChipTrailingIcon,] }],
        removeIcon: [{ type: ContentChild, args: [MatChipRemove,] }],
        ripple: [{ type: ViewChild, args: [MatRipple,] }]
    };
    return MatChip;
})();

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
let MatChipOption = /** @class */ (() => {
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
                this.leadingIcon.setClass(chipCssClasses.HIDDEN_LEADING_ICON, true);
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
            if (!this._hasFocus) {
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
                .asObservable()
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
    MatChipOption.decorators = [
        { type: Component, args: [{
                    selector: 'mat-basic-chip-option, mat-chip-option',
                    template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__checkmark\" *ngIf=\"_chipListMultiple\">\n  <svg class=\"mdc-chip__checkmark-svg\" viewBox=\"-2 -3 30 30\" focusable=\"false\">\n    <path class=\"mdc-chip__checkmark-path\" fill=\"none\" stroke=\"black\"\n          d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n  </svg>\n</div>\n<div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n",
                    inputs: ['color', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'option',
                        'class': 'mat-mdc-focus-indicator',
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
                    },
                    providers: [{ provide: MatChip, useExisting: MatChipOption }],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    MatChipOption.propDecorators = {
        selectable: [{ type: Input }],
        selected: [{ type: Input }],
        selectionChange: [{ type: Output }]
    };
    return MatChipOption;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** The keys handled by the GridKeyManager keydown method. */
const NAVIGATION_KEYS = [DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW];
/**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 */
class GridKeyManager {
    constructor(_rows) {
        this._rows = _rows;
        this._activeRowIndex = -1;
        this._activeColumnIndex = -1;
        this._activeRow = null;
        this._activeCell = null;
        this._dir = 'ltr';
        /** Stream that emits whenever the active cell of the grid manager changes. */
        this.change = new Subject();
        // We allow for the rows to be an array because, in some cases, the consumer may
        // not have access to a QueryList of the rows they want to manage (e.g. when the
        // rows aren't being collected via `ViewChildren` or `ContentChildren`).
        if (_rows instanceof QueryList) {
            _rows.changes.subscribe((newRows) => {
                if (this._activeRow) {
                    const newIndex = newRows.toArray().indexOf(this._activeRow);
                    if (newIndex > -1 && newIndex !== this._activeRowIndex) {
                        this._activeRowIndex = newIndex;
                    }
                }
            });
        }
    }
    /**
     * Configures the directionality of the key manager's horizontal movement.
     * @param direction Direction which is considered forward movement across a row.
     *
     * If withDirectionality is not set, the default is 'ltr'.
     */
    withDirectionality(direction) {
        this._dir = direction;
        return this;
    }
    setActiveCell(cell) {
        const previousRowIndex = this._activeRowIndex;
        const previousColumnIndex = this._activeColumnIndex;
        this.updateActiveCell(cell);
        if (this._activeRowIndex !== previousRowIndex ||
            this._activeColumnIndex !== previousColumnIndex) {
            this.change.next({ row: this._activeRowIndex, column: this._activeColumnIndex });
        }
    }
    /**
     * Sets the active cell depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    onKeydown(event) {
        const keyCode = event.keyCode;
        switch (keyCode) {
            case DOWN_ARROW:
                this.setNextRowActive();
                break;
            case UP_ARROW:
                this.setPreviousRowActive();
                break;
            case RIGHT_ARROW:
                this._dir === 'rtl' ? this.setPreviousColumnActive() : this.setNextColumnActive();
                break;
            case LEFT_ARROW:
                this._dir === 'rtl' ? this.setNextColumnActive() : this.setPreviousColumnActive();
                break;
            default:
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        event.preventDefault();
    }
    /** Index of the currently active row. */
    get activeRowIndex() {
        return this._activeRowIndex;
    }
    /** Index of the currently active column. */
    get activeColumnIndex() {
        return this._activeColumnIndex;
    }
    /** The active cell. */
    get activeCell() {
        return this._activeCell;
    }
    /** Sets the active cell to the first cell in the grid. */
    setFirstCellActive() {
        this._setActiveCellByIndex(0, 0);
    }
    /** Sets the active cell to the last cell in the grid. */
    setLastCellActive() {
        const lastRowIndex = this._rows.length - 1;
        const lastRow = this._getRowsArray()[lastRowIndex];
        this._setActiveCellByIndex(lastRowIndex, lastRow.cells.length - 1);
    }
    /** Sets the active row to the next row in the grid. Active column is unchanged. */
    setNextRowActive() {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(1, 0);
    }
    /** Sets the active row to the previous row in the grid. Active column is unchanged. */
    setPreviousRowActive() {
        this._setActiveCellByDelta(-1, 0);
    }
    /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    setNextColumnActive() {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(0, 1);
    }
    /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    setPreviousColumnActive() {
        this._setActiveCellByDelta(0, -1);
    }
    updateActiveCell(cell) {
        const rowArray = this._getRowsArray();
        if (typeof cell === 'object' && typeof cell.row === 'number' &&
            typeof cell.column === 'number') {
            this._activeRowIndex = cell.row;
            this._activeColumnIndex = cell.column;
            this._activeRow = rowArray[cell.row] || null;
            this._activeCell = this._activeRow ? this._activeRow.cells[cell.column] || null : null;
        }
        else {
            rowArray.forEach((row, rowIndex) => {
                const columnIndex = row.cells.indexOf(cell);
                if (columnIndex !== -1) {
                    this._activeRowIndex = rowIndex;
                    this._activeColumnIndex = columnIndex;
                    this._activeRow = row;
                    this._activeCell = row.cells[columnIndex];
                }
            });
        }
    }
    /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     */
    _setActiveCellByDelta(rowDelta, columnDelta) {
        // If delta puts us past the last cell in a row, move to the first cell of the next row.
        if (this._activeRow && this._activeColumnIndex + columnDelta >= this._activeRow.cells.length) {
            this._setActiveCellByIndex(this._activeRowIndex + 1, 0);
            // If delta puts us prior to the first cell in a row, move to the last cell of the previous row.
        }
        else if (this._activeColumnIndex + columnDelta < 0) {
            const previousRowIndex = this._activeRowIndex - 1;
            const previousRow = this._getRowsArray()[previousRowIndex];
            if (previousRow) {
                this._setActiveCellByIndex(previousRowIndex, previousRow.cells.length - 1);
            }
        }
        else {
            this._setActiveCellByIndex(this._activeRowIndex + rowDelta, this._activeColumnIndex + columnDelta);
        }
    }
    /**
     * Sets the active cell to the cell at the indices specified, if they are valid.
     */
    _setActiveCellByIndex(rowIndex, columnIndex) {
        const rows = this._getRowsArray();
        const targetRow = rows[rowIndex];
        if (!targetRow || !targetRow.cells[columnIndex]) {
            return;
        }
        this.setActiveCell({ row: rowIndex, column: columnIndex });
    }
    /** Returns the rows as an array. */
    _getRowsArray() {
        return this._rows instanceof QueryList ? this._rows.toArray() : this._rows;
    }
}

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
let MatChipRow = /** @class */ (() => {
    class MatChipRow extends MatChip {
        constructor() {
            super(...arguments);
            this.basicChipAttrName = 'mat-basic-chip-row';
            /** Key codes for which this component has a custom handler. */
            this.HANDLED_KEYS = NAVIGATION_KEYS.concat([BACKSPACE, DELETE]);
        }
        ngAfterContentInit() {
            super.ngAfterContentInit();
            if (this.removeIcon) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                setTimeout(() => {
                    // removeIcon has tabIndex 0 for regular chips, but should only be focusable by
                    // the GridFocusKeyManager for row chips.
                    this.removeIcon.tabIndex = -1;
                });
            }
        }
        ngAfterViewInit() {
            super.ngAfterViewInit();
            this.cells = this.removeIcon ?
                [this.chipContent.nativeElement, this.removeIcon._elementRef.nativeElement] :
                [this.chipContent.nativeElement];
        }
        /**
         * Allows for programmatic focusing of the chip.
         * Sends focus to the first grid cell. The row chip element itself
         * is never focused.
         */
        focus() {
            if (this.disabled) {
                return;
            }
            if (!this._hasFocusInternal) {
                this._onFocus.next({ chip: this });
            }
            this.chipContent.nativeElement.focus();
        }
        /**
         * Emits a blur event when one of the gridcells loses focus, unless focus moved
         * to the other gridcell.
         */
        _focusout() {
            this._hasFocusInternal = false;
            // Wait to see if focus moves to the other gridcell
            setTimeout(() => {
                if (this._hasFocus) {
                    return;
                }
                this._onBlur.next({ chip: this });
            });
        }
        /** Records that the chip has focus when one of the gridcells is focused. */
        _focusin() {
            this._hasFocusInternal = true;
        }
        /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
        _mousedown(event) {
            if (!this.disabled) {
                this.focus();
            }
            event.preventDefault();
        }
        /** Handles custom key presses. */
        _keydown(event) {
            if (this.disabled) {
                return;
            }
            switch (event.keyCode) {
                case DELETE:
                case BACKSPACE:
                    // Remove the focused chip
                    this.remove();
                    // Always prevent so page navigation does not occur
                    event.preventDefault();
                    break;
                default:
                    this._handleInteraction(event);
            }
        }
    }
    MatChipRow.decorators = [
        { type: Component, args: [{
                    selector: 'mat-chip-row, mat-basic-chip-row',
                    template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleAnimation]=\"_rippleAnimation\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<div role=\"gridcell\">\n  <div #chipContent tabindex=\"-1\"\n       class=\"mat-chip-row-focusable-text-content mat-mdc-focus-indicator\">\n  \t <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n  \t <span class=\"mdc-chip__text\"><ng-content></ng-content></span>\n  \t <ng-content select=\"mat-chip-trailing-icon,[matChipTrailingIcon]\"></ng-content>\n  </div>\n</div>\n<div role=\"gridcell\" *ngIf=\"removeIcon\">\n  <ng-content select=\"[matChipRemove]\"></ng-content>\n</div>\n",
                    inputs: ['color', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'row',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[tabIndex]': 'tabIndex',
                        '(mousedown)': '_mousedown($event)',
                        '(keydown)': '_keydown($event)',
                        '(focusin)': '_focusin()',
                        '(focusout)': '_focusout()'
                    },
                    providers: [{ provide: MatChip, useExisting: MatChipRow }],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    MatChipRow.propDecorators = {
        chipContent: [{ type: ViewChild, args: ['chipContent',] }]
    };
    return MatChipRow;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let uid$1 = 0;
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
let MatChipSet = /** @class */ (() => {
    class MatChipSet extends _MatChipSetMixinBase {
        constructor(_elementRef, _changeDetectorRef, _dir) {
            super(_elementRef);
            this._elementRef = _elementRef;
            this._changeDetectorRef = _changeDetectorRef;
            this._dir = _dir;
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
                hasClass: (className) => this._hasMdcClass(className),
                // No-op. We keep track of chips via ContentChildren, which will be updated when a chip is
                // removed.
                removeChipAtIndex: () => { },
                // No-op for base chip set. MatChipListbox overrides the adapter to provide this method.
                selectChipAtIndex: () => { },
                getIndexOfChipById: (id) => this._chips.toArray().findIndex(chip => chip.id === id),
                focusChipPrimaryActionAtIndex: () => { },
                focusChipTrailingActionAtIndex: () => { },
                removeFocusFromChipAtIndex: () => { },
                isRTL: () => !!this._dir && this._dir.value === 'rtl',
                getChipListCount: () => this._chips.length,
                // TODO(mmalerba): Implement using LiveAnnouncer.
                announceMessage: () => { },
            };
            /** Uid of the chip set */
            this._uid = `mat-mdc-chip-set-${uid$1++}`;
            /**
             * Map from class to whether the class is enabled.
             * Enabled classes are set on the MDC chip-set div.
             */
            this._mdcClasses = {};
            this._disabled = false;
            this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
        }
        /** Whether the chip set is disabled. */
        get disabled() { return this._disabled; }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
            this._syncChipsState();
        }
        /** Whether the chip list contains chips or not. */
        get empty() { return this._chips.length === 0; }
        /** The ARIA role applied to the chip set. */
        get role() { return this.empty ? null : 'presentation'; }
        /** Whether any of the chips inside of this chip-set has focus. */
        get focused() { return this._hasFocusedChip(); }
        /** Combined stream of all of the child chips' remove events. */
        get chipRemoveChanges() {
            return merge(...this._chips.map(chip => chip.removed));
        }
        /** Combined stream of all of the child chips' remove events. */
        get chipDestroyedChanges() {
            return merge(...this._chips.map(chip => chip.destroyed));
        }
        /** Combined stream of all of the child chips' interaction events. */
        get chipInteractionChanges() {
            return merge(...this._chips.map(chip => chip.interaction));
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
                this._resetChips();
            });
        }
        ngOnDestroy() {
            this._dropSubscriptions();
            this._destroyed.next();
            this._destroyed.complete();
            this._chipSetFoundation.destroy();
        }
        /** Checks whether any of the chips is focused. */
        _hasFocusedChip() {
            return this._chips.some(chip => chip._hasFocus);
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
        /** Sets whether the given CSS class should be applied to the MDC chip. */
        _setMdcClass(cssClass, active) {
            const classes = this._elementRef.nativeElement.classList;
            active ? classes.add(cssClass) : classes.remove(cssClass);
            this._changeDetectorRef.markForCheck();
        }
        /** Adapter method that returns true if the chip set has the given MDC class. */
        _hasMdcClass(className) {
            return this._elementRef.nativeElement.classList.contains(className);
        }
        /** Updates subscriptions to chip events. */
        _resetChips() {
            this._dropSubscriptions();
            this._subscribeToChipEvents();
        }
        /** Subscribes to events on the child chips. */
        _subscribeToChipEvents() {
            this._listenToChipsRemove();
            this._listenToChipsDestroyed();
            this._listenToChipsInteraction();
        }
        /** Subscribes to chip removal events. */
        _listenToChipsRemove() {
            this._chipRemoveSubscription = this.chipRemoveChanges.subscribe((event) => {
                this._chipSetFoundation.handleChipRemoval({
                    chipId: event.chip.id,
                    // TODO(mmalerba): Add removal message.
                    removedAnnouncement: null,
                });
            });
        }
        /** Subscribes to chip destroyed events. */
        _listenToChipsDestroyed() {
            this._chipDestroyedSubscription = this.chipDestroyedChanges.subscribe((event) => {
                const chip = event.chip;
                const chipIndex = this._chips.toArray().indexOf(event.chip);
                // In case the chip that will be removed is currently focused, we temporarily store
                // the index in order to be able to determine an appropriate sibling chip that will
                // receive focus.
                if (this._isValidIndex(chipIndex) && chip._hasFocus) {
                    this._lastDestroyedChipIndex = chipIndex;
                }
            });
        }
        /** Subscribes to chip interaction events. */
        _listenToChipsInteraction() {
            this._chipInteractionSubscription = this.chipInteractionChanges.subscribe((id) => {
                this._chipSetFoundation.handleChipInteraction({ chipId: id });
            });
        }
        /** Unsubscribes from all chip events. */
        _dropSubscriptions() {
            if (this._chipRemoveSubscription) {
                this._chipRemoveSubscription.unsubscribe();
                this._chipRemoveSubscription = null;
            }
            if (this._chipInteractionSubscription) {
                this._chipInteractionSubscription.unsubscribe();
                this._chipInteractionSubscription = null;
            }
            if (this._chipDestroyedSubscription) {
                this._chipDestroyedSubscription.unsubscribe();
                this._chipDestroyedSubscription = null;
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
            let currentElement = event.target;
            while (currentElement && currentElement !== this._elementRef.nativeElement) {
                // Null check the classList, because IE and Edge don't support it on all elements.
                if (currentElement.classList && currentElement.classList.contains('mdc-chip')) {
                    return true;
                }
                currentElement = currentElement.parentElement;
            }
            return false;
        }
    }
    MatChipSet.decorators = [
        { type: Component, args: [{
                    selector: 'mat-chip-set',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-mdc-chip-set mdc-chip-set',
                        '[attr.role]': 'role',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[id]': '_uid',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    /** @nocollapse */
    MatChipSet.ctorParameters = () => [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] }
    ];
    MatChipSet.propDecorators = {
        disabled: [{ type: Input }],
        _chips: [{ type: ContentChildren, args: [MatChip, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return MatChipSet;
})();

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
    multi: true
};
/**
 * An extension of the MatChipSet component that supports chip selection.
 * Used with MatChipOption chips.
 */
let MatChipListbox = /** @class */ (() => {
    class MatChipListbox extends MatChipSet {
        constructor(_elementRef, _changeDetectorRef, _dir) {
            super(_elementRef, _changeDetectorRef, _dir);
            this._elementRef = _elementRef;
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
            this._chipSetAdapter.selectChipAtIndex = (index, selected) => {
                this._setSelected(index, selected);
            };
            // Reinitialize the foundation with our overridden adapter
            this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
            this._updateMdcSelectionClasses();
        }
        /** The ARIA role applied to the chip listbox. */
        get role() { return this.empty ? null : 'listbox'; }
        /** Whether the user should be allowed to select multiple chips. */
        get multiple() { return this._multiple; }
        set multiple(value) {
            this._multiple = coerceBooleanProperty(value);
            this._updateMdcSelectionClasses();
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
        get selectable() { return this._selectable; }
        set selectable(value) {
            this._selectable = coerceBooleanProperty(value);
            this._updateMdcSelectionClasses();
            this._syncListboxProperties();
        }
        /**
         * A function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get compareWith() { return this._compareWith; }
        set compareWith(fn) {
            this._compareWith = fn;
            this._initializeSelection();
        }
        /** Whether this chip listbox is required. */
        get required() { return this._required; }
        set required(value) {
            this._required = coerceBooleanProperty(value);
        }
        /** Combined stream of all of the child chips' selection change events. */
        get chipSelectionChanges() {
            return merge(...this._chips.map(chip => chip.selectionChange));
        }
        /** Combined stream of all of the child chips' focus events. */
        get chipFocusChanges() {
            return merge(...this._chips.map(chip => chip._onFocus));
        }
        /** Combined stream of all of the child chips' blur events. */
        get chipBlurChanges() {
            return merge(...this._chips.map(chip => chip._onBlur));
        }
        /** The value of the listbox, which is the combined value of the selected chips. */
        get value() { return this._value; }
        set value(value) {
            this.writeValue(value);
            this._value = value;
        }
        ngAfterContentInit() {
            super.ngAfterContentInit();
            this._initKeyManager();
            this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
                // Update listbox selectable/multiple properties on chips
                this._syncListboxProperties();
                // Reset chips selected/deselected status
                this._initializeSelection();
                // Check to see if we have a destroyed chip and need to refocus
                this._updateFocusForDestroyedChips();
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
                const firstSelectedChipIndex = this._chips.toArray().indexOf(firstSelectedChip);
                this._keyManager.setActiveItem(firstSelectedChipIndex);
            }
            else if (this._chips.length > 0) {
                this._keyManager.setFirstItemActive();
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
                const correspondingChip = this._selectValue(value, isUserInput);
                // Shift focus to the active item. Note that we shouldn't do this in multiple
                // mode, because we don't know what chip the user interacted with last.
                if (correspondingChip) {
                    if (isUserInput) {
                        this._keyManager.setActiveItem(correspondingChip);
                    }
                }
            }
        }
        /** Selects or deselects a chip by id. */
        _setSelected(index, selected) {
            const chip = this._chips.toArray()[index];
            if (chip && chip.selected != selected) {
                chip.toggleSelected(true);
            }
        }
        /** When blurred, marks the field as touched when focus moved outside the chip listbox. */
        _blur() {
            if (this.disabled) {
                return;
            }
            if (!this.focused) {
                this._keyManager.setActiveItem(-1);
            }
            // Wait to see if focus moves to an indivdual chip.
            setTimeout(() => {
                if (!this.focused) {
                    this._propagateChanges();
                    this._markAsTouched();
                }
            });
        }
        /**
         * Removes the `tabindex` from the chip listbox and resets it back afterwards, allowing the
         * user to tab out of it. This prevents the listbox from capturing focus and redirecting
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
         * Handles custom keyboard shortcuts, and passes other keyboard events to the keyboard manager.
         */
        _keydown(event) {
            if (this._originatesFromChip(event)) {
                if (event.keyCode === HOME) {
                    this._keyManager.setFirstItemActive();
                    event.preventDefault();
                }
                else if (event.keyCode === END) {
                    this._keyManager.setLastItemActive();
                    event.preventDefault();
                }
                else {
                    this._keyManager.onKeydown(event);
                }
            }
        }
        /** Marks the field as touched */
        _markAsTouched() {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
        }
        /** Emits change event to set the model value. */
        _propagateChanges(fallbackValue) {
            let valueToEmit = null;
            if (Array.isArray(this.selected)) {
                valueToEmit = this.selected.map(chip => chip.value);
            }
            else {
                valueToEmit = this.selected ? this.selected.value : fallbackValue;
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
                this._chips.forEach(chip => {
                    if (chip.selected) {
                        this._chipSetFoundation.select(chip.id);
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
        /** Sets the mdc classes for single vs multi selection. */
        _updateMdcSelectionClasses() {
            this._setMdcClass('mdc-chip-set--filter', this.selectable && this.multiple);
            this._setMdcClass('mdc-chip-set--choice', this.selectable && !this.multiple);
        }
        /** Initializes the key manager to manage focus. */
        _initKeyManager() {
            this._keyManager = new FocusKeyManager(this._chips)
                .withWrap()
                .withVerticalOrientation()
                .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');
            if (this._dir) {
                this._dir.change
                    .pipe(takeUntil(this._destroyed))
                    .subscribe(dir => this._keyManager.withHorizontalOrientation(dir));
            }
            this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._allowFocusEscape();
            });
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
        /** Unsubscribes from all chip events. */
        _dropSubscriptions() {
            super._dropSubscriptions();
            if (this._chipSelectionSubscription) {
                this._chipSelectionSubscription.unsubscribe();
                this._chipSelectionSubscription = null;
            }
            if (this._chipBlurSubscription) {
                this._chipBlurSubscription.unsubscribe();
                this._chipBlurSubscription = null;
            }
            if (this._chipFocusSubscription) {
                this._chipFocusSubscription.unsubscribe();
                this._chipFocusSubscription = null;
            }
        }
        /** Subscribes to events on the child chips. */
        _subscribeToChipEvents() {
            super._subscribeToChipEvents();
            this._listenToChipsSelection();
            this._listenToChipsFocus();
            this._listenToChipsBlur();
        }
        /** Subscribes to chip focus events. */
        _listenToChipsFocus() {
            this._chipFocusSubscription = this.chipFocusChanges.subscribe((event) => {
                let chipIndex = this._chips.toArray().indexOf(event.chip);
                if (this._isValidIndex(chipIndex)) {
                    this._keyManager.updateActiveItem(chipIndex);
                }
            });
        }
        /** Subscribes to chip blur events. */
        _listenToChipsBlur() {
            this._chipBlurSubscription = this.chipBlurChanges.subscribe(() => {
                this._blur();
            });
        }
        /** Subscribes to selection changes in the option chips. */
        _listenToChipsSelection() {
            this._chipSelectionSubscription = this.chipSelectionChanges.subscribe((chipSelectionChange) => {
                this._chipSetFoundation.handleChipSelection({
                    chipId: chipSelectionChange.source.id,
                    selected: chipSelectionChange.selected,
                    shouldIgnore: false
                });
                if (chipSelectionChange.isUserInput) {
                    this._propagateChanges();
                }
            });
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
                    this._keyManager.setActiveItem(newChipIndex);
                }
                else {
                    this.focus();
                }
            }
            this._lastDestroyedChipIndex = null;
        }
    }
    MatChipListbox.decorators = [
        { type: Component, args: [{
                    selector: 'mat-chip-listbox',
                    template: '<ng-content></ng-content>',
                    inputs: ['tabIndex'],
                    host: {
                        'class': 'mat-mdc-chip-set mat-mdc-chip-listbox mdc-chip-set',
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
                        '[id]': '_uid',
                    },
                    providers: [MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    /** @nocollapse */
    MatChipListbox.ctorParameters = () => [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] }
    ];
    MatChipListbox.propDecorators = {
        multiple: [{ type: Input }],
        ariaOrientation: [{ type: Input, args: ['aria-orientation',] }],
        selectable: [{ type: Input }],
        compareWith: [{ type: Input }],
        required: [{ type: Input }],
        value: [{ type: Input }],
        change: [{ type: Output }],
        _chips: [{ type: ContentChildren, args: [MatChipOption, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return MatChipListbox;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A version of GridKeyManager where the cells are HTMLElements, and focus()
 * is called on a cell when it becomes active.
 */
class GridFocusKeyManager extends GridKeyManager {
    setActiveCell(cell) {
        super.setActiveCell(cell);
        if (this.activeCell) {
            this.activeCell.focus();
        }
    }
}

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
    constructor(_elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        super(_elementRef, _changeDetectorRef, _dir);
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
let MatChipGrid = /** @class */ (() => {
    class MatChipGrid extends _MatChipGridMixinBase {
        constructor(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, 
        /** @docs-private */
        ngControl) {
            super(_elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
            this.ngControl = ngControl;
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
            this._required = false;
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
        get disabled() { return this.ngControl ? !!this.ngControl.disabled : this._disabled; }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
            this._syncChipsState();
        }
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get id() { return this._chipInput.id; }
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get empty() { return this._chipInput.empty && this._chips.length === 0; }
        /** The ARIA role applied to the chip grid. */
        get role() { return this.empty ? null : 'grid'; }
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
        get focused() { return this._chipInput.focused || this._hasFocusedChip(); }
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get required() { return this._required; }
        set required(value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        }
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get shouldLabelFloat() { return !this.empty || this.focused; }
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get value() { return this._value; }
        set value(value) {
            this._value = value;
        }
        /** Combined stream of all of the child chips' blur events. */
        get chipBlurChanges() {
            return merge(...this._chips.map(chip => chip._onBlur));
        }
        /** Combined stream of all of the child chips' focus events. */
        get chipFocusChanges() {
            return merge(...this._chips.map(chip => chip._onFocus));
        }
        ngAfterContentInit() {
            super.ngAfterContentInit();
            this._initKeyManager();
            this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
                // Check to see if we have a destroyed chip and need to refocus
                this._updateFocusForDestroyedChips();
                this.stateChanges.next();
            });
        }
        ngAfterViewInit() {
            super.ngAfterViewInit();
            if (!this._chipInput) {
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
            this._setMdcClass('mdc-chip-set--input', true);
        }
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        onContainerClick(event) {
            if (!this._originatesFromChip(event) && !this.disabled) {
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
                this._keyManager.setFirstCellActive();
            }
            else {
                this._focusInput();
            }
            this.stateChanges.next();
        }
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        setDescribedByIds(ids) { this._ariaDescribedby = ids.join(' '); }
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
                    this._keyManager.setActiveCell({ row: -1, column: -1 });
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
            if (this._chipInput.focused) {
                return;
            }
            const previousTabIndex = this.tabIndex;
            if (this.tabIndex !== -1) {
                this.tabIndex = -1;
                setTimeout(() => {
                    this.tabIndex = previousTabIndex;
                    this._changeDetectorRef.markForCheck();
                });
            }
        }
        /** Handles custom keyboard events. */
        _keydown(event) {
            const target = event.target;
            const keyCode = event.keyCode;
            const manager = this._keyManager;
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
        }
        /** Unsubscribes from all chip events. */
        _dropSubscriptions() {
            super._dropSubscriptions();
            if (this._chipBlurSubscription) {
                this._chipBlurSubscription.unsubscribe();
                this._chipBlurSubscription = null;
            }
            if (this._chipFocusSubscription) {
                this._chipFocusSubscription.unsubscribe();
                this._chipFocusSubscription = null;
            }
        }
        /** Subscribes to events on the child chips. */
        _subscribeToChipEvents() {
            super._subscribeToChipEvents();
            this._listenToChipsFocus();
            this._listenToChipsBlur();
        }
        /** Initializes the key manager to manage focus. */
        _initKeyManager() {
            this._keyManager = new GridFocusKeyManager(this._chips)
                .withDirectionality(this._dir ? this._dir.value : 'ltr');
            if (this._dir) {
                this._dir.change
                    .pipe(takeUntil(this._destroyed))
                    .subscribe(dir => this._keyManager.withDirectionality(dir));
            }
        }
        /** Subscribes to chip focus events. */
        _listenToChipsFocus() {
            this._chipFocusSubscription = this.chipFocusChanges.subscribe((event) => {
                let chipIndex = this._chips.toArray().indexOf(event.chip);
                if (this._isValidIndex(chipIndex)) {
                    this._keyManager.updateActiveCell({ row: chipIndex, column: 0 });
                }
            });
        }
        /** Subscribes to chip blur events. */
        _listenToChipsBlur() {
            this._chipBlurSubscription = this.chipBlurChanges.subscribe(() => {
                this._blur();
                this.stateChanges.next();
            });
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
        }
        /** Focus input element. */
        _focusInput() {
            this._chipInput.focus();
        }
        /** Returns true if element is an input with no value. */
        _isEmptyInput(element) {
            if (element && element.id === this._chipInput.id) {
                return this._chipInput.empty;
            }
            return false;
        }
    }
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
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    /** @nocollapse */
    MatChipGrid.ctorParameters = () => [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ErrorStateMatcher },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ];
    MatChipGrid.propDecorators = {
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }, { type: Input }],
        required: [{ type: Input }],
        value: [{ type: Input }],
        errorStateMatcher: [{ type: Input }],
        change: [{ type: Output }],
        valueChange: [{ type: Output }],
        _chips: [{ type: ContentChildren, args: [MatChipRow, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return MatChipGrid;
})();

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
let MatChipInput = /** @class */ (() => {
    class MatChipInput {
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
    }
    MatChipInput.decorators = [
        { type: Directive, args: [{
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
                },] }
    ];
    /** @nocollapse */
    MatChipInput.ctorParameters = () => [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_CHIPS_DEFAULT_OPTIONS,] }] }
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
    return MatChipInput;
})();

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
    MatChipCssInternalOnly,
    MatChipGrid,
    MatChipInput,
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatChipRow,
    MatChipSet,
    MatChipTrailingIcon,
];
const ɵ0 = {
    separatorKeyCodes: [ENTER]
};
let MatChipsModule = /** @class */ (() => {
    class MatChipsModule {
    }
    MatChipsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatCommonModule, CHIP_DECLARATIONS],
                    declarations: CHIP_DECLARATIONS,
                    providers: [
                        ErrorStateMatcher,
                        {
                            provide: MAT_CHIPS_DEFAULT_OPTIONS,
                            useValue: ɵ0
                        }
                    ]
                },] }
    ];
    return MatChipsModule;
})();

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

export { MAT_CHIPS_DEFAULT_OPTIONS, MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR, MatChip, MatChipAvatar, MatChipCssInternalOnly, MatChipGrid, MatChipGridChange, MatChipInput, MatChipListbox, MatChipListboxChange, MatChipOption, MatChipRemove, MatChipRow, MatChipSelectionChange, MatChipSet, MatChipTrailingIcon, MatChipsModule, ɵ0 };
//# sourceMappingURL=mdc-chips.js.map
