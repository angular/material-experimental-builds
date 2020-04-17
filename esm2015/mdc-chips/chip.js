/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-chips/chip.ts
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, NgZone, Optional, Output, ViewEncapsulation, ViewChild, } from '@angular/core';
import { MatRipple, mixinColor, mixinDisableRipple, mixinTabIndex, } from '@angular/material/core';
import { MDCChipFoundation } from '@material/chips';
import { numbers } from '@material/ripple';
import { SPACE, ENTER, hasModifierKey } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatChipAvatar, MatChipTrailingIcon, MatChipRemove } from './chip-icons';
/** @type {?} */
let uid = 0;
/**
 * Represents an event fired on an individual `mat-chip`.
 * @record
 */
export function MatChipEvent() { }
if (false) {
    /**
     * The chip the event was fired on.
     * @type {?}
     */
    MatChipEvent.prototype.chip;
}
/**
 * Configuration for the ripple animation.
 * @type {?}
 */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * Directive to add MDC CSS to non-basic chips.
 * \@docs-private
 */
export class MatChipCssInternalOnly {
}
MatChipCssInternalOnly.decorators = [
    { type: Directive, args: [{
                selector: `mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],
    [mat-chip-row]`,
                host: { 'class': 'mat-mdc-chip mdc-chip' }
            },] }
];
/**
 * Boilerplate for applying mixins to MatChip.
 * \@docs-private
 */
class MatChipBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatChipBase.prototype.disabled;
    /** @type {?} */
    MatChipBase.prototype._elementRef;
}
/** @type {?} */
const _MatChipMixinBase = mixinTabIndex(mixinColor(mixinDisableRipple(MatChipBase), 'primary'), -1);
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
export class MatChip extends _MatChipMixinBase {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _dir
     * @param {?=} animationMode
     */
    constructor(_changeDetectorRef, _elementRef, _ngZone, _dir, 
    // @breaking-change 8.0.0 `animationMode` parameter to become required.
    animationMode) {
        super(_elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        /**
         * The ripple animation configuration to use for the chip.
         */
        this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
        /**
         * Whether the ripple is centered on the chip.
         */
        this._isRippleCentered = false;
        /**
         * Emits when the chip is focused.
         */
        this._onFocus = new Subject();
        /**
         * Emits when the chip is blurred.
         */
        this._onBlur = new Subject();
        this.HANDLED_KEYS = [];
        /**
         * Whether the chip has focus.
         */
        this._hasFocusInternal = false;
        /**
         * Default unique id for the chip.
         */
        this._uniqueId = `mat-mdc-chip-${uid++}`;
        /**
         * A unique id for the chip. If none is supplied, it will be auto-generated.
         */
        this.id = this._uniqueId;
        this._disabled = false;
        this._removable = true;
        this._highlighted = false;
        /**
         * Emitted when the user interacts with the remove icon.
         */
        this.removeIconInteraction = new EventEmitter();
        /**
         * Emitted when the user interacts with the chip.
         */
        this.interaction = new EventEmitter();
        /**
         * Emitted when the chip is destroyed.
         */
        this.destroyed = new EventEmitter();
        /**
         * Emitted when a chip is to be removed.
         */
        this.removed = new EventEmitter();
        /**
         * The unstyled chip selector for this component.
         */
        this.basicChipAttrName = 'mat-basic-chip';
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip adapter interface.
         * These methods are called by the chip foundation.
         */
        this._chipAdapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._setMdcClass(className, true)),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._setMdcClass(className, false)),
            hasClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._elementRef.nativeElement.classList.contains(className)),
            addClassToLeadingIcon: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this.leadingIcon.setClass(className, true)),
            removeClassFromLeadingIcon: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this.leadingIcon.setClass(className, false)),
            eventTargetHasClass: (/**
             * @param {?} target
             * @param {?} className
             * @return {?}
             */
            (target, className) => {
                // We need to null check the `classList`, because IE and Edge don't support it on SVG elements
                // and Edge seems to throw for ripple elements, because they're outside the DOM.
                return (target && ((/** @type {?} */ (target))).classList) ?
                    ((/** @type {?} */ (target))).classList.contains(className) : false;
            }),
            notifyInteraction: (/**
             * @return {?}
             */
            () => this.interaction.emit(this.id)),
            notifySelection: (/**
             * @return {?}
             */
            () => {
                // No-op. We call dispatchSelectionEvent ourselves in MatChipOption, because we want to
                // specify whether selection occurred via user input.
            }),
            notifyNavigation: (/**
             * @return {?}
             */
            () => {
                // TODO: This is a new feature added by MDC; consider exposing this event to users in the
                // future.
            }),
            notifyTrailingIconInteraction: (/**
             * @return {?}
             */
            () => this.removeIconInteraction.emit(this.id)),
            notifyRemoval: (/**
             * @return {?}
             */
            () => {
                this.removed.emit({ chip: this });
                // When MDC removes a chip it just transitions it to `width: 0px` which means that it's still
                // in the DOM and it's still focusable. Make it `display: none` so users can't tab into it.
                this._elementRef.nativeElement.style.display = 'none';
            }),
            getComputedStyleValue: (/**
             * @param {?} propertyName
             * @return {?}
             */
            propertyName => {
                // This function is run when a chip is removed so it might be
                // invoked during server-side rendering. Add some extra checks just in case.
                if (typeof window !== 'undefined' && window) {
                    /** @type {?} */
                    const getComputedStyle = window.getComputedStyle(this._elementRef.nativeElement);
                    return getComputedStyle.getPropertyValue(propertyName);
                }
                return '';
            }),
            setStyleProperty: (/**
             * @param {?} propertyName
             * @param {?} value
             * @return {?}
             */
            (propertyName, value) => {
                this._elementRef.nativeElement.style.setProperty(propertyName, value);
            }),
            hasLeadingIcon: (/**
             * @return {?}
             */
            () => !!this.leadingIcon),
            hasTrailingAction: (/**
             * @return {?}
             */
            () => !!this.trailingIcon),
            isRTL: (/**
             * @return {?}
             */
            () => !!this._dir && this._dir.value === 'rtl'),
            focusPrimaryAction: (/**
             * @return {?}
             */
            () => {
                // Angular Material MDC chips fully manage focus. TODO: Managing focus and handling keyboard
                // events was added by MDC after our implementation; consider consolidating.
            }),
            focusTrailingAction: (/**
             * @return {?}
             */
            () => { }),
            setTrailingActionAttr: (/**
             * @param {?} attr
             * @param {?} value
             * @return {?}
             */
            (attr, value) => this.trailingIcon && this.trailingIcon.setAttribute(attr, value)),
            setPrimaryActionAttr: (/**
             * @param {?} name
             * @param {?} value
             * @return {?}
             */
            (name, value) => {
                // MDC is currently using this method to set aria-checked on choice and filter chips,
                // which in the MDC templates have role="checkbox" and role="radio" respectively.
                // We have role="option" on those chips instead, so we do not want aria-checked.
                // Since we also manage the tabindex ourselves, we don't allow MDC to set it.
                if (name === 'aria-checked' || name === 'tabindex') {
                    return;
                }
                this._elementRef.nativeElement.setAttribute(name, value);
            }),
            // The 2 functions below are used by the MDC ripple, which we aren't using,
            // so they will never be called
            getRootBoundingClientRect: (/**
             * @return {?}
             */
            () => this._elementRef.nativeElement.getBoundingClientRect()),
            getCheckmarkBoundingClientRect: (/**
             * @return {?}
             */
            () => null),
            getAttribute: (/**
             * @param {?} attr
             * @return {?}
             */
            (attr) => this._elementRef.nativeElement.getAttribute(attr)),
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
    /**
     * @param {?} event
     * @return {?}
     */
    _handleTransitionEnd(event) {
        this._chipFoundation.handleTransitionEnd(event);
    }
    /**
     * @return {?}
     */
    get _hasFocus() {
        return this._hasFocusInternal;
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this.removeIcon) {
            this.removeIcon.disabled = value;
        }
    }
    /**
     * The value of the chip. Defaults to the content inside the mdc-chip__text element.
     * @return {?}
     */
    get value() {
        return this._value !== undefined
            ? this._value
            : (/** @type {?} */ (this._textElement.textContent)).trim();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this._value = value; }
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     * @return {?}
     */
    get removable() { return this._removable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    /**
     * Colors the chip for emphasis as if it were selected.
     * @return {?}
     */
    get highlighted() { return this._highlighted; }
    /**
     * @param {?} value
     * @return {?}
     */
    set highlighted(value) {
        this._highlighted = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._initRemoveIcon();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._chipFoundation.init();
        this._textElement = this._elementRef.nativeElement.querySelector('.mdc-chip__text');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.emit({ chip: this });
        this._destroyed.next();
        this._destroyed.complete();
        this._chipFoundation.destroy();
    }
    /**
     * Sets up the remove icon chip foundation, and subscribes to remove icon events.
     * @return {?}
     */
    _initRemoveIcon() {
        if (this.removeIcon) {
            this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
            this._listenToRemoveIconInteraction();
            this.removeIcon.disabled = this.disabled;
        }
    }
    /**
     * Handles interaction with the remove icon.
     * @return {?}
     */
    _listenToRemoveIconInteraction() {
        this.removeIcon.interaction
            .pipe(takeUntil(this._destroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            // The MDC chip foundation calls stopPropagation() for any trailing icon interaction
            // event, even ones it doesn't handle, so we want to avoid passing it keyboard events
            // for which we have a custom handler. Note that we assert the type of the event using
            // the `type`, because `instanceof KeyboardEvent` can throw during server-side rendering.
            /** @type {?} */
            const isKeyboardEvent = event.type.startsWith('key');
            if (this.disabled || (isKeyboardEvent &&
                this.HANDLED_KEYS.indexOf(((/** @type {?} */ (event))).keyCode) !== -1)) {
                return;
            }
            this._chipFoundation.handleTrailingIconInteraction(event);
            if (isKeyboardEvent && !hasModifierKey((/** @type {?} */ (event)))) {
                /** @type {?} */
                const keyCode = ((/** @type {?} */ (event))).keyCode;
                // Prevent default space and enter presses so we don't scroll the page or submit forms.
                if (keyCode === SPACE || keyCode === ENTER) {
                    event.preventDefault();
                }
            }
        }));
    }
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     * @return {?}
     */
    remove() {
        if (this.removable) {
            this._chipFoundation.beginExit();
        }
    }
    /**
     * Sets whether the given CSS class should be applied to the MDC chip.
     * @private
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    _setMdcClass(cssClass, active) {
        /** @type {?} */
        const classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Forwards interaction events to the MDC chip foundation.
     * @param {?} event
     * @return {?}
     */
    _handleInteraction(event) {
        if (!this.disabled) {
            this._chipFoundation.handleInteraction(event);
        }
    }
    /**
     * Whether or not the ripple should be disabled.
     * @return {?}
     */
    _isRippleDisabled() {
        return this.disabled || this.disableRipple || this._isBasicChip;
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
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
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
if (false) {
    /** @type {?} */
    MatChip.ngAcceptInputType_disabled;
    /** @type {?} */
    MatChip.ngAcceptInputType_removable;
    /** @type {?} */
    MatChip.ngAcceptInputType_highlighted;
    /** @type {?} */
    MatChip.ngAcceptInputType_disableRipple;
    /**
     * The ripple animation configuration to use for the chip.
     * @type {?}
     */
    MatChip.prototype._rippleAnimation;
    /**
     * Whether the ripple is centered on the chip.
     * @type {?}
     */
    MatChip.prototype._isRippleCentered;
    /**
     * Emits when the chip is focused.
     * @type {?}
     */
    MatChip.prototype._onFocus;
    /**
     * Emits when the chip is blurred.
     * @type {?}
     */
    MatChip.prototype._onBlur;
    /** @type {?} */
    MatChip.prototype.HANDLED_KEYS;
    /**
     * Whether this chip is a basic (unstyled) chip.
     * @type {?}
     */
    MatChip.prototype._isBasicChip;
    /**
     * Whether the chip has focus.
     * @type {?}
     * @protected
     */
    MatChip.prototype._hasFocusInternal;
    /**
     * Whether animations for the chip are enabled.
     * @type {?}
     */
    MatChip.prototype._animationsDisabled;
    /**
     * Default unique id for the chip.
     * @type {?}
     * @private
     */
    MatChip.prototype._uniqueId;
    /**
     * A unique id for the chip. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    MatChip.prototype.id;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    MatChip.prototype._textElement;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._value;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._removable;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._highlighted;
    /**
     * Emitted when the user interacts with the remove icon.
     * @type {?}
     */
    MatChip.prototype.removeIconInteraction;
    /**
     * Emitted when the user interacts with the chip.
     * @type {?}
     */
    MatChip.prototype.interaction;
    /**
     * Emitted when the chip is destroyed.
     * @type {?}
     */
    MatChip.prototype.destroyed;
    /**
     * Emitted when a chip is to be removed.
     * @type {?}
     */
    MatChip.prototype.removed;
    /**
     * The MDC foundation containing business logic for MDC chip.
     * @type {?}
     */
    MatChip.prototype._chipFoundation;
    /**
     * The unstyled chip selector for this component.
     * @type {?}
     * @protected
     */
    MatChip.prototype.basicChipAttrName;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @protected
     */
    MatChip.prototype._destroyed;
    /**
     * The chip's leading icon.
     * @type {?}
     */
    MatChip.prototype.leadingIcon;
    /**
     * The chip's trailing icon.
     * @type {?}
     */
    MatChip.prototype.trailingIcon;
    /**
     * The chip's trailing remove icon.
     * @type {?}
     */
    MatChip.prototype.removeIcon;
    /**
     * Reference to the MatRipple instance of the chip.
     * @type {?}
     */
    MatChip.prototype.ripple;
    /**
     * Implementation of the MDC chip adapter interface.
     * These methods are called by the chip foundation.
     * @type {?}
     * @protected
     */
    MatChip.prototype._chipAdapter;
    /** @type {?} */
    MatChip.prototype._changeDetectorRef;
    /** @type {?} */
    MatChip.prototype._elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatChip.prototype._dir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBT0wsU0FBUyxFQUNULFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsYUFBYSxHQUVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7SUFHM0UsR0FBRyxHQUFHLENBQUM7Ozs7O0FBR1gsa0NBR0M7Ozs7OztJQURDLDRCQUFjOzs7Ozs7TUFJVix1QkFBdUIsR0FBMEI7SUFDckQsYUFBYSxFQUFFLE9BQU8sQ0FBQyx1QkFBdUI7SUFDOUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7Q0FDekM7Ozs7O0FBV0QsTUFBTSxPQUFPLHNCQUFzQjs7O1lBTGxDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUU7bUJBQ087Z0JBQ2pCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBQzthQUN6Qzs7Ozs7O0FBT0QsTUFBTSxXQUFXOzs7O0lBRWYsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQy9DOzs7SUFGQywrQkFBbUI7O0lBQ1Asa0NBQThCOzs7TUFHdEMsaUJBQWlCLEdBS25CLGFBQWEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7OztBQTRCN0UsTUFBTSxPQUFPLE9BQVEsU0FBUSxpQkFBaUI7Ozs7Ozs7O0lBaU03QyxZQUNVLGtCQUFxQyxFQUNuQyxXQUF1QixFQUN0QixPQUFlLEVBQ0wsSUFBb0I7SUFDeEMsdUVBQXVFO0lBQzVCLGFBQXNCO1FBQ2pFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQU5aLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNMLFNBQUksR0FBSixJQUFJLENBQWdCOzs7O1FBbE1qQyxxQkFBZ0IsR0FBMEIsdUJBQXVCLENBQUM7Ozs7UUFHbEUsc0JBQWlCLEdBQUcsS0FBSyxDQUFDOzs7O1FBRzFCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQzs7OztRQUd2QyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQWdCLENBQUM7UUFFdEMsaUJBQVksR0FBYSxFQUFFLENBQUM7Ozs7UUFNM0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDOzs7O1FBb0I1QixjQUFTLEdBQUcsZ0JBQWdCLEdBQUcsRUFBRSxFQUFFLENBQUM7Ozs7UUFHbkMsT0FBRSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUM7UUFXM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQXNCM0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQVUzQixpQkFBWSxHQUFZLEtBQUssQ0FBQzs7OztRQUc5QiwwQkFBcUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBR25ELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7OztRQUdoQyxjQUFTLEdBQStCLElBQUksWUFBWSxFQUFnQixDQUFDOzs7O1FBR3pFLFlBQU8sR0FBK0IsSUFBSSxZQUFZLEVBQWdCLENBQUM7Ozs7UUFNaEYsc0JBQWlCLEdBQUcsZ0JBQWdCLENBQUM7Ozs7UUFHckMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7Ozs7O1FBa0JqQyxpQkFBWSxHQUFtQjtZQUN2QyxRQUFROzs7O1lBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQzNELFdBQVc7Ozs7WUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDL0QsUUFBUTs7OztZQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3JGLHFCQUFxQjs7OztZQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDaEYsMEJBQTBCOzs7O1lBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN0RixtQkFBbUI7Ozs7O1lBQUUsQ0FBQyxNQUEwQixFQUFFLFNBQWlCLEVBQUUsRUFBRTtnQkFDckUsOEZBQThGO2dCQUM5RixnRkFBZ0Y7Z0JBQ2hGLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLENBQUMsbUJBQUEsTUFBTSxFQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEUsQ0FBQyxDQUFBO1lBQ0QsaUJBQWlCOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDdkQsZUFBZTs7O1lBQUUsR0FBRyxFQUFFO2dCQUNwQix1RkFBdUY7Z0JBQ3ZGLHFEQUFxRDtZQUN2RCxDQUFDLENBQUE7WUFDRCxnQkFBZ0I7OztZQUFFLEdBQUcsRUFBRTtnQkFDckIseUZBQXlGO2dCQUN6RixVQUFVO1lBQ1osQ0FBQyxDQUFBO1lBQ0QsNkJBQTZCOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUM3RSxhQUFhOzs7WUFBRSxHQUFHLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBRWxDLDZGQUE2RjtnQkFDN0YsMkZBQTJGO2dCQUMzRixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN4RCxDQUFDLENBQUE7WUFDRCxxQkFBcUI7Ozs7WUFBRSxZQUFZLENBQUMsRUFBRTtnQkFDcEMsNkRBQTZEO2dCQUM3RCw0RUFBNEU7Z0JBQzVFLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sRUFBRTs7MEJBQ3JDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztvQkFDaEYsT0FBTyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDeEQ7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUE7WUFDRCxnQkFBZ0I7Ozs7O1lBQUUsQ0FBQyxZQUFvQixFQUFFLEtBQWEsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUE7WUFDRCxjQUFjOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUN4QyxpQkFBaUI7OztZQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFBO1lBQzVDLEtBQUs7OztZQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQTtZQUNyRCxrQkFBa0I7OztZQUFFLEdBQUcsRUFBRTtnQkFDdkIsNEZBQTRGO2dCQUM1Riw0RUFBNEU7WUFDOUUsQ0FBQyxDQUFBO1lBQ0QsbUJBQW1COzs7WUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUE7WUFDN0IscUJBQXFCOzs7OztZQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ25DLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3BFLG9CQUFvQjs7Ozs7WUFBRSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsRUFBRTtnQkFDcEQscUZBQXFGO2dCQUNyRixpRkFBaUY7Z0JBQ2pGLGdGQUFnRjtnQkFDaEYsNkVBQTZFO2dCQUM3RSxJQUFJLElBQUksS0FBSyxjQUFjLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtvQkFDbEQsT0FBTztpQkFDUjtnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQTs7O1lBR0QseUJBQXlCOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1lBQ3ZGLDhCQUE4Qjs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBO1lBQzFDLFlBQVk7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzNFLENBQUM7UUFVQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLEtBQUssZ0JBQWdCLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDOUQsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2pHLENBQUM7Ozs7Ozs7Ozs7SUE5S0Qsb0JBQW9CLENBQUMsS0FBc0I7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQzs7OztJQVNELElBQ0ksUUFBUSxLQUFjLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ2xELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7Ozs7SUFNRCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztZQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDYixDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O0lBTTlDLElBQ0ksU0FBUyxLQUFjLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3BELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQU1ELElBQ0ksV0FBVyxLQUFjLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3hELElBQUksV0FBVyxDQUFDLEtBQWM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7O0lBMEhELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdEYsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBR0QsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDMUM7SUFDSCxDQUFDOzs7OztJQUdELDhCQUE4QjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVc7YUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFOzs7Ozs7a0JBS1gsZUFBZSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUVwRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxlQUFlO2dCQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLG1CQUFBLEtBQUssRUFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZFLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxlQUFlLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUQsSUFBSSxlQUFlLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQUEsS0FBSyxFQUFpQixDQUFDLEVBQUU7O3NCQUN4RCxPQUFPLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLEVBQWlCLENBQUMsQ0FBQyxPQUFPO2dCQUVoRCx1RkFBdUY7Z0JBQ3ZGLElBQUksT0FBTyxLQUFLLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO29CQUMxQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQ3hCO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNULENBQUM7Ozs7Ozs7SUFPRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7Ozs7OztJQUdPLFlBQVksQ0FBQyxRQUFnQixFQUFFLE1BQWU7O2NBQzVDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTO1FBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBR0Qsa0JBQWtCLENBQUMsS0FBaUM7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7Ozs7O0lBR0QsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNsRSxDQUFDOzs7WUF0VEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUM7Z0JBQ2xDLFFBQVEsRUFBRSxTQUFTO2dCQUNuQix1bEJBQXdCO2dCQUV4QixJQUFJLEVBQUU7b0JBQ0osK0JBQStCLEVBQUUsVUFBVTtvQkFDM0Msa0NBQWtDLEVBQUUsYUFBYTtvQkFDakQsa0NBQWtDLEVBQUUsYUFBYTtvQkFDakQseUNBQXlDLEVBQUUsNEJBQTRCO29CQUN2RSw0QkFBNEIsRUFBRSxjQUFjO29CQUM1QywrQkFBK0IsRUFBRSxlQUFlO29CQUNoRCxpQ0FBaUMsRUFBRSxxQkFBcUI7b0JBQ3hELE1BQU0sRUFBRSxJQUFJO29CQUNaLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsc0JBQXNCLEVBQUUscUJBQXFCO2lCQUM5QztnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBdEdDLGlCQUFpQjtZQUdqQixVQUFVO1lBS1YsTUFBTTtZQWhCQSxjQUFjLHVCQW9UakIsUUFBUTt5Q0FFUixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O21DQXpLMUMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFheEMsS0FBSzt1QkFHTCxLQUFLO29CQWFMLEtBQUs7d0JBWUwsS0FBSzswQkFVTCxLQUFLO29DQVFMLE1BQU07MEJBR04sTUFBTTt3QkFHTixNQUFNO3NCQUdOLE1BQU07MEJBWU4sWUFBWSxTQUFDLGFBQWE7MkJBRzFCLFlBQVksU0FBQyxtQkFBbUI7eUJBR2hDLFlBQVksU0FBQyxhQUFhO3FCQUcxQixTQUFTLFNBQUMsU0FBUzs7OztJQTRLcEIsbUNBQWdEOztJQUNoRCxvQ0FBaUQ7O0lBQ2pELHNDQUFtRDs7SUFDbkQsd0NBQXFEOzs7OztJQW5TckQsbUNBQTJFOzs7OztJQUczRSxvQ0FBbUM7Ozs7O0lBR25DLDJCQUFnRDs7Ozs7SUFHaEQsMEJBQStDOztJQUUvQywrQkFBcUM7Ozs7O0lBR3JDLCtCQUErQjs7Ozs7O0lBRy9CLG9DQUFvQzs7Ozs7SUFHcEMsc0NBQTZCOzs7Ozs7SUFpQjdCLDRCQUE0Qzs7Ozs7SUFHNUMscUJBQXFDOzs7OztJQVdyQyw0QkFBcUM7Ozs7O0lBRXJDLCtCQUFtQzs7Ozs7SUFVbkMseUJBQXNCOzs7OztJQVV0Qiw2QkFBcUM7Ozs7O0lBVXJDLCtCQUF3Qzs7Ozs7SUFHeEMsd0NBQTZEOzs7OztJQUc3RCw4QkFBbUQ7Ozs7O0lBR25ELDRCQUE0Rjs7Ozs7SUFHNUYsMEJBQTBGOzs7OztJQUcxRixrQ0FBbUM7Ozs7OztJQUduQyxvQ0FBK0M7Ozs7OztJQUcvQyw2QkFBMkM7Ozs7O0lBRzNDLDhCQUF3RDs7Ozs7SUFHeEQsK0JBQXFFOzs7OztJQUdyRSw2QkFBdUQ7Ozs7O0lBR3ZELHlCQUF3Qzs7Ozs7OztJQU14QywrQkFrRUM7O0lBR0MscUNBQTRDOztJQUM1Qyw4QkFBZ0M7Ozs7O0lBQ2hDLDBCQUF5Qjs7Ozs7SUFDekIsdUJBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkNvbG9yLFxuICBDYW5Db2xvckN0b3IsXG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yLFxuICBIYXNUYWJJbmRleCxcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBNYXRSaXBwbGUsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZVJpcHBsZSxcbiAgbWl4aW5UYWJJbmRleCxcbiAgUmlwcGxlQW5pbWF0aW9uQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TURDQ2hpcEFkYXB0ZXIsIE1EQ0NoaXBGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcbmltcG9ydCB7U1BBQ0UsIEVOVEVSLCBoYXNNb2RpZmllcktleX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRDaGlwQXZhdGFyLCBNYXRDaGlwVHJhaWxpbmdJY29uLCBNYXRDaGlwUmVtb3ZlfSBmcm9tICcuL2NoaXAtaWNvbnMnO1xuXG5cbmxldCB1aWQgPSAwO1xuXG4vKiogUmVwcmVzZW50cyBhbiBldmVudCBmaXJlZCBvbiBhbiBpbmRpdmlkdWFsIGBtYXQtY2hpcGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdENoaXBFdmVudCB7XG4gIC8qKiBUaGUgY2hpcCB0aGUgZXZlbnQgd2FzIGZpcmVkIG9uLiAqL1xuICBjaGlwOiBNYXRDaGlwO1xufVxuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TXG59O1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgTURDIENTUyB0byBub24tYmFzaWMgY2hpcHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG1hdC1jaGlwLCBtYXQtY2hpcC1vcHRpb24sIG1hdC1jaGlwLXJvdywgW21hdC1jaGlwXSwgW21hdC1jaGlwLW9wdGlvbl0sXG4gICAgW21hdC1jaGlwLXJvd11gLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2hpcCBtZGMtY2hpcCd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBDc3NJbnRlcm5hbE9ubHkgeyB9XG5cbi8qKlxuICogQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGlwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jbGFzcyBNYXRDaGlwQmFzZSB7XG4gIGRpc2FibGVkITogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG5jb25zdCBfTWF0Q2hpcE1peGluQmFzZTpcbiAgQ2FuQ29sb3JDdG9yICZcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJlxuICBIYXNUYWJJbmRleEN0b3IgJlxuICB0eXBlb2YgTWF0Q2hpcEJhc2UgPVxuICAgIG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihtaXhpbkRpc2FibGVSaXBwbGUoTWF0Q2hpcEJhc2UpLCAncHJpbWFyeScpLCAtMSk7XG5cbi8qKlxuICogTWF0ZXJpYWwgZGVzaWduIHN0eWxlZCBDaGlwIGJhc2UgY29tcG9uZW50LiBVc2VkIGluc2lkZSB0aGUgTWF0Q2hpcFNldCBjb21wb25lbnQuXG4gKlxuICogRXh0ZW5kZWQgYnkgTWF0Q2hpcE9wdGlvbiBhbmQgTWF0Q2hpcFJvdyBmb3IgZGlmZmVyZW50IGludGVyYWN0aW9uIHBhdHRlcm5zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtYmFzaWMtY2hpcCwgbWF0LWNoaXAnLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZSddLFxuICBleHBvcnRBczogJ21hdENoaXAnLFxuICB0ZW1wbGF0ZVVybDogJ2NoaXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtaGlnaGxpZ2h0ZWRdJzogJ2hpZ2hsaWdodGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLWF2YXRhcl0nOiAnbGVhZGluZ0ljb24nLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICdbY2xhc3MubWF0LW1kYy1iYXNpYy1jaGlwXSc6ICdfaXNCYXNpY0NoaXAnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zdGFuZGFyZC1jaGlwXSc6ICchX2lzQmFzaWNDaGlwJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uc0Rpc2FibGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwIGV4dGVuZHMgX01hdENoaXBNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSwgSGFzVGFiSW5kZXgsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgcmlwcGxlIGFuaW1hdGlvbiBjb25maWd1cmF0aW9uIHRvIHVzZSBmb3IgdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgaXMgY2VudGVyZWQgb24gdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9pc1JpcHBsZUNlbnRlcmVkID0gZmFsc2U7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgZm9jdXNlZC4gKi9cbiAgcmVhZG9ubHkgX29uRm9jdXMgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgYmx1cnJlZC4gKi9cbiAgcmVhZG9ubHkgX29uQmx1ciA9IG5ldyBTdWJqZWN0PE1hdENoaXBFdmVudD4oKTtcblxuICByZWFkb25seSBIQU5ETEVEX0tFWVM6IG51bWJlcltdID0gW107XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBjaGlwIGlzIGEgYmFzaWMgKHVuc3R5bGVkKSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNCYXNpY0NoaXA6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaGFzIGZvY3VzLiAqL1xuICBwcm90ZWN0ZWQgX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgZm9yIHRoZSBjaGlwIGFyZSBlbmFibGVkLiAqL1xuICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8vIFdlIGhhdmUgdG8gdXNlIGEgYEhvc3RMaXN0ZW5lcmAgaGVyZSBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggSXZ5IGFuZCBWaWV3RW5naW5lLlxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBiaW5kaW5ncyB3aWxsIGJlIG1lcmdlZCB3aGVuIHRoaXMgY2xhc3MgaXMgZXh0ZW5kZWQsIHdoZXJlYXMgaW5cbiAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAvLyBUT0RPKG1tYWxlcmJhKTogd2UgbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAgb25jZSBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkge1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQpO1xuICB9XG5cbiAgZ2V0IF9oYXNGb2N1cygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRm9jdXNJbnRlcm5hbDtcbiAgfVxuXG4gIC8qKiBEZWZhdWx0IHVuaXF1ZSBpZCBmb3IgdGhlIGNoaXAuICovXG4gIHByaXZhdGUgX3VuaXF1ZUlkID0gYG1hdC1tZGMtY2hpcC0ke3VpZCsrfWA7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgY2hpcC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdGV4dEVsZW1lbnQhOiBIVE1MRWxlbWVudDtcblxuICAvKiogVGhlIHZhbHVlIG9mIHRoZSBjaGlwLiBEZWZhdWx0cyB0byB0aGUgY29udGVudCBpbnNpZGUgdGhlIG1kYy1jaGlwX190ZXh0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuX3ZhbHVlXG4gICAgICA6IHRoaXMuX3RleHRFbGVtZW50LnRleHRDb250ZW50IS50cmltKCk7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHsgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgfVxuICBwcm90ZWN0ZWQgX3ZhbHVlOiBhbnk7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNoaXAgZGlzcGxheXMgdGhlIHJlbW92ZSBzdHlsaW5nIGFuZCBlbWl0cyAocmVtb3ZlZCkgZXZlbnRzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlbW92YWJsZTsgfVxuICBzZXQgcmVtb3ZhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENvbG9ycyB0aGUgY2hpcCBmb3IgZW1waGFzaXMgYXMgaWYgaXQgd2VyZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWdobGlnaHRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodGVkOyB9XG4gIHNldCBoaWdobGlnaHRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZ2hsaWdodGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2hpZ2hsaWdodGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgcmVtb3ZlIGljb24uICovXG4gIEBPdXRwdXQoKSByZW1vdmVJY29uSW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBjaGlwLiAqL1xuICBAT3V0cHV0KCkgaW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIGRlc3Ryb3llZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSByZW1vdmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogVGhlIE1EQyBmb3VuZGF0aW9uIGNvbnRhaW5pbmcgYnVzaW5lc3MgbG9naWMgZm9yIE1EQyBjaGlwLiAqL1xuICBfY2hpcEZvdW5kYXRpb246IE1EQ0NoaXBGb3VuZGF0aW9uO1xuXG4gIC8qKiBUaGUgdW5zdHlsZWQgY2hpcCBzZWxlY3RvciBmb3IgdGhpcyBjb21wb25lbnQuICovXG4gIHByb3RlY3RlZCBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcCc7XG5cbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcm90ZWN0ZWQgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFRoZSBjaGlwJ3MgbGVhZGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBBdmF0YXIpIGxlYWRpbmdJY29uOiBNYXRDaGlwQXZhdGFyO1xuXG4gIC8qKiBUaGUgY2hpcCdzIHRyYWlsaW5nIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTWF0Q2hpcFRyYWlsaW5nSWNvbikgdHJhaWxpbmdJY29uOiBNYXRDaGlwVHJhaWxpbmdJY29uO1xuXG4gIC8qKiBUaGUgY2hpcCdzIHRyYWlsaW5nIHJlbW92ZSBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBSZW1vdmUpIHJlbW92ZUljb246IE1hdENoaXBSZW1vdmU7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBjaGlwLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAvKipcbiAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgTURDIGNoaXAgYWRhcHRlciBpbnRlcmZhY2UuXG4gICogVGhlc2UgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IHRoZSBjaGlwIGZvdW5kYXRpb24uXG4gICovXG4gIHByb3RlY3RlZCBfY2hpcEFkYXB0ZXI6IE1EQ0NoaXBBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIGFkZENsYXNzVG9MZWFkaW5nSWNvbjogKGNsYXNzTmFtZSkgPT4gdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PiB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCwgY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGNsYXNzTGlzdGAsIGJlY2F1c2UgSUUgYW5kIEVkZ2UgZG9uJ3Qgc3VwcG9ydCBpdCBvbiBTVkcgZWxlbWVudHNcbiAgICAgIC8vIGFuZCBFZGdlIHNlZW1zIHRvIHRocm93IGZvciByaXBwbGUgZWxlbWVudHMsIGJlY2F1c2UgdGhleSdyZSBvdXRzaWRlIHRoZSBET00uXG4gICAgICByZXR1cm4gKHRhcmdldCAmJiAodGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdCkgP1xuICAgICAgICAgICh0YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOiBmYWxzZTtcbiAgICB9LFxuICAgIG5vdGlmeUludGVyYWN0aW9uOiAoKSA9PiB0aGlzLmludGVyYWN0aW9uLmVtaXQodGhpcy5pZCksXG4gICAgbm90aWZ5U2VsZWN0aW9uOiAoKSA9PiB7XG4gICAgICAvLyBOby1vcC4gV2UgY2FsbCBkaXNwYXRjaFNlbGVjdGlvbkV2ZW50IG91cnNlbHZlcyBpbiBNYXRDaGlwT3B0aW9uLCBiZWNhdXNlIHdlIHdhbnQgdG9cbiAgICAgIC8vIHNwZWNpZnkgd2hldGhlciBzZWxlY3Rpb24gb2NjdXJyZWQgdmlhIHVzZXIgaW5wdXQuXG4gICAgfSxcbiAgICBub3RpZnlOYXZpZ2F0aW9uOiAoKSA9PiB7XG4gICAgICAvLyBUT0RPOiBUaGlzIGlzIGEgbmV3IGZlYXR1cmUgYWRkZWQgYnkgTURDOyBjb25zaWRlciBleHBvc2luZyB0aGlzIGV2ZW50IHRvIHVzZXJzIGluIHRoZVxuICAgICAgLy8gZnV0dXJlLlxuICAgIH0sXG4gICAgbm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb246ICgpID0+IHRoaXMucmVtb3ZlSWNvbkludGVyYWN0aW9uLmVtaXQodGhpcy5pZCksXG4gICAgbm90aWZ5UmVtb3ZhbDogKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoeyBjaGlwOiB0aGlzIH0pO1xuXG4gICAgICAvLyBXaGVuIE1EQyByZW1vdmVzIGEgY2hpcCBpdCBqdXN0IHRyYW5zaXRpb25zIGl0IHRvIGB3aWR0aDogMHB4YCB3aGljaCBtZWFucyB0aGF0IGl0J3Mgc3RpbGxcbiAgICAgIC8vIGluIHRoZSBET00gYW5kIGl0J3Mgc3RpbGwgZm9jdXNhYmxlLiBNYWtlIGl0IGBkaXNwbGF5OiBub25lYCBzbyB1c2VycyBjYW4ndCB0YWIgaW50byBpdC5cbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0sXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlOiBwcm9wZXJ0eU5hbWUgPT4ge1xuICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBydW4gd2hlbiBhIGNoaXAgaXMgcmVtb3ZlZCBzbyBpdCBtaWdodCBiZVxuICAgICAgLy8gaW52b2tlZCBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLiBBZGQgc29tZSBleHRyYSBjaGVja3MganVzdCBpbiBjYXNlLlxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdykge1xuICAgICAgICBjb25zdCBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH0sXG4gICAgc2V0U3R5bGVQcm9wZXJ0eTogKHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBoYXNMZWFkaW5nSWNvbjogKCkgPT4gISF0aGlzLmxlYWRpbmdJY29uLFxuICAgIGhhc1RyYWlsaW5nQWN0aW9uOiAoKSA9PiAhIXRoaXMudHJhaWxpbmdJY29uLFxuICAgIGlzUlRMOiAoKSA9PiAhIXRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnLFxuICAgIGZvY3VzUHJpbWFyeUFjdGlvbjogKCkgPT4ge1xuICAgICAgLy8gQW5ndWxhciBNYXRlcmlhbCBNREMgY2hpcHMgZnVsbHkgbWFuYWdlIGZvY3VzLiBUT0RPOiBNYW5hZ2luZyBmb2N1cyBhbmQgaGFuZGxpbmcga2V5Ym9hcmRcbiAgICAgIC8vIGV2ZW50cyB3YXMgYWRkZWQgYnkgTURDIGFmdGVyIG91ciBpbXBsZW1lbnRhdGlvbjsgY29uc2lkZXIgY29uc29saWRhdGluZy5cbiAgICB9LFxuICAgIGZvY3VzVHJhaWxpbmdBY3Rpb246ICgpID0+IHt9LFxuICAgIHNldFRyYWlsaW5nQWN0aW9uQXR0cjogKGF0dHIsIHZhbHVlKSA9PlxuICAgICAgICB0aGlzLnRyYWlsaW5nSWNvbiAmJiB0aGlzLnRyYWlsaW5nSWNvbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxuICAgIHNldFByaW1hcnlBY3Rpb25BdHRyOiAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAvLyBNREMgaXMgY3VycmVudGx5IHVzaW5nIHRoaXMgbWV0aG9kIHRvIHNldCBhcmlhLWNoZWNrZWQgb24gY2hvaWNlIGFuZCBmaWx0ZXIgY2hpcHMsXG4gICAgICAvLyB3aGljaCBpbiB0aGUgTURDIHRlbXBsYXRlcyBoYXZlIHJvbGU9XCJjaGVja2JveFwiIGFuZCByb2xlPVwicmFkaW9cIiByZXNwZWN0aXZlbHkuXG4gICAgICAvLyBXZSBoYXZlIHJvbGU9XCJvcHRpb25cIiBvbiB0aG9zZSBjaGlwcyBpbnN0ZWFkLCBzbyB3ZSBkbyBub3Qgd2FudCBhcmlhLWNoZWNrZWQuXG4gICAgICAvLyBTaW5jZSB3ZSBhbHNvIG1hbmFnZSB0aGUgdGFiaW5kZXggb3Vyc2VsdmVzLCB3ZSBkb24ndCBhbGxvdyBNREMgdG8gc2V0IGl0LlxuICAgICAgaWYgKG5hbWUgPT09ICdhcmlhLWNoZWNrZWQnIHx8IG5hbWUgPT09ICd0YWJpbmRleCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfSxcbiAgICAvLyBUaGUgMiBmdW5jdGlvbnMgYmVsb3cgYXJlIHVzZWQgYnkgdGhlIE1EQyByaXBwbGUsIHdoaWNoIHdlIGFyZW4ndCB1c2luZyxcbiAgICAvLyBzbyB0aGV5IHdpbGwgbmV2ZXIgYmUgY2FsbGVkXG4gICAgZ2V0Um9vdEJvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGdldENoZWNrbWFya0JvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4gbnVsbCxcbiAgICBnZXRBdHRyaWJ1dGU6IChhdHRyKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpLFxuIH07XG5cbiBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgX25nWm9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBgYW5pbWF0aW9uTW9kZWAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbiA9IG5ldyBNRENDaGlwRm91bmRhdGlvbih0aGlzLl9jaGlwQWRhcHRlcik7XG4gICAgdGhpcy5fYW5pbWF0aW9uc0Rpc2FibGVkID0gYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcbiAgICB0aGlzLl9pc0Jhc2ljQ2hpcCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKHRoaXMuYmFzaWNDaGlwQXR0ck5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5iYXNpY0NoaXBBdHRyTmFtZTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9pbml0UmVtb3ZlSWNvbigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLl90ZXh0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWNoaXBfX3RleHQnKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkLmVtaXQoe2NoaXA6IHRoaXN9KTtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHVwIHRoZSByZW1vdmUgaWNvbiBjaGlwIGZvdW5kYXRpb24sIGFuZCBzdWJzY3JpYmVzIHRvIHJlbW92ZSBpY29uIGV2ZW50cy4gKi9cbiAgX2luaXRSZW1vdmVJY29uKCkge1xuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLnNldFNob3VsZFJlbW92ZU9uVHJhaWxpbmdJY29uQ2xpY2sodHJ1ZSk7XG4gICAgICB0aGlzLl9saXN0ZW5Ub1JlbW92ZUljb25JbnRlcmFjdGlvbigpO1xuICAgICAgdGhpcy5yZW1vdmVJY29uLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBpbnRlcmFjdGlvbiB3aXRoIHRoZSByZW1vdmUgaWNvbi4gKi9cbiAgX2xpc3RlblRvUmVtb3ZlSWNvbkludGVyYWN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlSWNvbi5pbnRlcmFjdGlvblxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgLy8gVGhlIE1EQyBjaGlwIGZvdW5kYXRpb24gY2FsbHMgc3RvcFByb3BhZ2F0aW9uKCkgZm9yIGFueSB0cmFpbGluZyBpY29uIGludGVyYWN0aW9uXG4gICAgICAgICAgLy8gZXZlbnQsIGV2ZW4gb25lcyBpdCBkb2Vzbid0IGhhbmRsZSwgc28gd2Ugd2FudCB0byBhdm9pZCBwYXNzaW5nIGl0IGtleWJvYXJkIGV2ZW50c1xuICAgICAgICAgIC8vIGZvciB3aGljaCB3ZSBoYXZlIGEgY3VzdG9tIGhhbmRsZXIuIE5vdGUgdGhhdCB3ZSBhc3NlcnQgdGhlIHR5cGUgb2YgdGhlIGV2ZW50IHVzaW5nXG4gICAgICAgICAgLy8gdGhlIGB0eXBlYCwgYmVjYXVzZSBgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50YCBjYW4gdGhyb3cgZHVyaW5nIHNlcnZlci1zaWRlIHJlbmRlcmluZy5cbiAgICAgICAgICBjb25zdCBpc0tleWJvYXJkRXZlbnQgPSBldmVudC50eXBlLnN0YXJ0c1dpdGgoJ2tleScpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgKGlzS2V5Ym9hcmRFdmVudCAmJlxuICAgICAgICAgICAgICB0aGlzLkhBTkRMRURfS0VZUy5pbmRleE9mKChldmVudCBhcyBLZXlib2FyZEV2ZW50KS5rZXlDb2RlKSAhPT0gLTEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlVHJhaWxpbmdJY29uSW50ZXJhY3Rpb24oZXZlbnQpO1xuXG4gICAgICAgICAgaWYgKGlzS2V5Ym9hcmRFdmVudCAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleUNvZGUgPSAoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkua2V5Q29kZTtcblxuICAgICAgICAgICAgLy8gUHJldmVudCBkZWZhdWx0IHNwYWNlIGFuZCBlbnRlciBwcmVzc2VzIHNvIHdlIGRvbid0IHNjcm9sbCB0aGUgcGFnZSBvciBzdWJtaXQgZm9ybXMuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gU1BBQ0UgfHwga2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIHJlbW92YWwgb2YgdGhlIGNoaXAuXG4gICAqXG4gICAqIEluZm9ybXMgYW55IGxpc3RlbmVycyBvZiB0aGUgcmVtb3ZhbCByZXF1ZXN0LiBEb2VzIG5vdCByZW1vdmUgdGhlIGNoaXAgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uYmVnaW5FeGl0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgd2hldGhlciB0aGUgZ2l2ZW4gQ1NTIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBNREMgY2hpcC4gKi9cbiAgcHJpdmF0ZSBfc2V0TWRjQ2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICAgIGFjdGl2ZSA/IGNsYXNzZXMuYWRkKGNzc0NsYXNzKSA6IGNsYXNzZXMucmVtb3ZlKGNzc0NsYXNzKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEZvcndhcmRzIGludGVyYWN0aW9uIGV2ZW50cyB0byB0aGUgTURDIGNoaXAgZm91bmRhdGlvbi4gKi9cbiAgX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2lzQmFzaWNDaGlwO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZW1vdmFibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZ2hsaWdodGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=