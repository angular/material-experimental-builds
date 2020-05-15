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
                // We need to null check the `classList`, because IE and Edge don't
                // support it on SVG elements and Edge seems to throw for ripple
                // elements, because they're outside the DOM.
                return (target && ((/** @type {?} */ (target))).classList) ?
                    ((/** @type {?} */ (target))).classList.contains(className) :
                    false;
            }),
            notifyInteraction: (/**
             * @return {?}
             */
            () => this._notifyInteraction()),
            notifySelection: (/**
             * @return {?}
             */
            () => {
                // No-op. We call dispatchSelectionEvent ourselves in MatChipOption,
                // because we want to specify whether selection occurred via user
                // input.
            }),
            notifyNavigation: (/**
             * @return {?}
             */
            () => this._notifyNavigation()),
            notifyTrailingIconInteraction: (/**
             * @return {?}
             */
            () => this.removeIconInteraction.emit(this.id)),
            notifyRemoval: (/**
             * @return {?}
             */
            () => {
                this.removed.emit({ chip: this });
                // When MDC removes a chip it just transitions it to `width: 0px`
                // which means that it's still in the DOM and it's still focusable.
                // Make it `display: none` so users can't tab into it.
                this._elementRef.nativeElement.style.display = 'none';
            }),
            getComputedStyleValue: (/**
             * @param {?} propertyName
             * @return {?}
             */
            propertyName => {
                // This function is run when a chip is removed so it might be
                // invoked during server-side rendering. Add some extra checks just in
                // case.
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
            isTrailingActionNavigable: (/**
             * @return {?}
             */
            () => {
                if (this.trailingIcon) {
                    return this.trailingIcon.isNavigable();
                }
                return false;
            }),
            isRTL: (/**
             * @return {?}
             */
            () => !!this._dir && this._dir.value === 'rtl'),
            focusPrimaryAction: (/**
             * @return {?}
             */
            () => {
                // Angular Material MDC chips fully manage focus. TODO: Managing focus
                // and handling keyboard events was added by MDC after our
                // implementation; consider consolidating.
            }),
            focusTrailingAction: (/**
             * @return {?}
             */
            () => { }),
            removeTrailingActionFocus: (/**
             * @return {?}
             */
            () => { }),
            setPrimaryActionAttr: (/**
             * @param {?} name
             * @param {?} value
             * @return {?}
             */
            (name, value) => {
                // MDC is currently using this method to set aria-checked on choice
                // and filter chips, which in the MDC templates have role="checkbox"
                // and role="radio" respectively. We have role="option" on those chips
                // instead, so we do not want aria-checked. Since we also manage the
                // tabindex ourselves, we don't allow MDC to set it.
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
            this._chipFoundation.handleTrailingActionInteraction();
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
        if (this.disabled) {
            return;
        }
        if (event.type === 'click') {
            this._chipFoundation.handleClick();
            return;
        }
        if (event.type === 'keydown') {
            this._chipFoundation.handleKeydown((/** @type {?} */ (event)));
            return;
        }
    }
    /**
     * Whether or not the ripple should be disabled.
     * @return {?}
     */
    _isRippleDisabled() {
        return this.disabled || this.disableRipple || this._animationsDisabled || this._isBasicChip;
    }
    /**
     * @return {?}
     */
    _notifyInteraction() {
        this.interaction.emit(this.id);
    }
    /**
     * @return {?}
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBT0wsU0FBUyxFQUNULFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsYUFBYSxHQUVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7SUFHM0UsR0FBRyxHQUFHLENBQUM7Ozs7O0FBR1gsa0NBR0M7Ozs7OztJQURD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YUwsS0FBSzt3QkFZTCxLQUFLOzBCQVVMLEtBQUs7b0NBUUwsTUFBTTswQkFHTixNQUFNO3dCQUdOLE1BQU07c0JBR04sTUFBTTswQkFZTixZQUFZLFNBQUMsYUFBYTsyQkFHMUIsWUFBWSxTQUFDLG1CQUFtQjt5QkFHaEMsWUFBWSxTQUFDLGFBQWE7cUJBRzFCLFNBQVMsU0FBQyxTQUFTOzs7O0lBb05wQixtQ0FBZ0Q7O0lBQ2hELG9DQUFpRDs7SUFDakQsc0NBQW1EOztJQUNuRCx3Q0FBcUQ7Ozs7O0lBM1VyRCxtQ0FBMkU7Ozs7O0lBRzNFLG9DQUFtQzs7Ozs7SUFHbkMsMkJBQWdEOzs7OztJQUdoRCwwQkFBK0M7O0lBRS9DLCtCQUFxQzs7Ozs7SUFHckMsK0JBQStCOzs7Ozs7SUFHL0Isb0NBQW9DOzs7OztJQUdwQyxzQ0FBNkI7Ozs7OztJQWlCN0IsNEJBQTRDOzs7OztJQUc1QyxxQkFBcUM7Ozs7O0lBV3JDLDRCQUFxQzs7Ozs7SUFFckMsK0JBQW1DOzs7OztJQVVuQyx5QkFBc0I7Ozs7O0lBVXRCLDZCQUFxQzs7Ozs7SUFVckMsK0JBQXdDOzs7OztJQUd4Qyx3Q0FBNkQ7Ozs7O0lBRzdELDhCQUFtRDs7Ozs7SUFHbkQsNEJBQTRGOzs7OztJQUc1RiwwQkFBMEY7Ozs7O0lBRzFGLGtDQUFtQzs7Ozs7O0lBR25DLG9DQUErQzs7Ozs7O0lBRy9DLDZCQUEyQzs7Ozs7SUFHM0MsOEJBQXdEOzs7OztJQUd4RCwrQkFBcUU7Ozs7O0lBR3JFLDZCQUF1RDs7Ozs7SUFHdkQseUJBQXdDOzs7Ozs7O0lBTXhDLCtCQXdGRTs7SUFHRSxxQ0FBNEM7O0lBQzVDLDhCQUFnQzs7Ozs7SUFBRSwwQkFBeUI7Ozs7O0lBQzNELHVCQUF3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYW5Db2xvcixcbiAgQ2FuQ29sb3JDdG9yLFxuICBDYW5EaXNhYmxlUmlwcGxlLFxuICBDYW5EaXNhYmxlUmlwcGxlQ3RvcixcbiAgSGFzVGFiSW5kZXgsXG4gIEhhc1RhYkluZGV4Q3RvcixcbiAgTWF0UmlwcGxlLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIG1peGluVGFiSW5kZXgsXG4gIFJpcHBsZUFuaW1hdGlvbkNvbmZpZyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01EQ0NoaXBBZGFwdGVyLCBNRENDaGlwRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5pbXBvcnQge1NQQUNFLCBFTlRFUiwgaGFzTW9kaWZpZXJLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0Q2hpcEF2YXRhciwgTWF0Q2hpcFRyYWlsaW5nSWNvbiwgTWF0Q2hpcFJlbW92ZX0gZnJvbSAnLi9jaGlwLWljb25zJztcblxuXG5sZXQgdWlkID0gMDtcblxuLyoqIFJlcHJlc2VudHMgYW4gZXZlbnQgZmlyZWQgb24gYW4gaW5kaXZpZHVhbCBgbWF0LWNoaXBgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwRXZlbnQge1xuICAvKiogVGhlIGNoaXAgdGhlIGV2ZW50IHdhcyBmaXJlZCBvbi4gKi9cbiAgY2hpcDogTWF0Q2hpcDtcbn1cblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIE1EQyBDU1MgdG8gbm9uLWJhc2ljIGNoaXBzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBtYXQtY2hpcCwgbWF0LWNoaXAtb3B0aW9uLCBtYXQtY2hpcC1yb3csIFttYXQtY2hpcF0sIFttYXQtY2hpcC1vcHRpb25dLFxuICAgIFttYXQtY2hpcC1yb3ddYCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNoaXAgbWRjLWNoaXAnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwQ3NzSW50ZXJuYWxPbmx5IHsgfVxuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY2xhc3MgTWF0Q2hpcEJhc2Uge1xuICBkaXNhYmxlZCE6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuY29uc3QgX01hdENoaXBNaXhpbkJhc2U6XG4gIENhbkNvbG9yQ3RvciAmXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgdHlwZW9mIE1hdENoaXBCYXNlID1cbiAgICBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKE1hdENoaXBCYXNlKSwgJ3ByaW1hcnknKSwgLTEpO1xuXG4vKipcbiAqIE1hdGVyaWFsIGRlc2lnbiBzdHlsZWQgQ2hpcCBiYXNlIGNvbXBvbmVudC4gVXNlZCBpbnNpZGUgdGhlIE1hdENoaXBTZXQgY29tcG9uZW50LlxuICpcbiAqIEV4dGVuZGVkIGJ5IE1hdENoaXBPcHRpb24gYW5kIE1hdENoaXBSb3cgZm9yIGRpZmZlcmVudCBpbnRlcmFjdGlvbiBwYXR0ZXJucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWJhc2ljLWNoaXAsIG1hdC1jaGlwJyxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgZXhwb3J0QXM6ICdtYXRDaGlwJyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hpcHMuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtYmFzaWMtY2hpcF0nOiAnX2lzQmFzaWNDaGlwJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc3RhbmRhcmQtY2hpcF0nOiAnIV9pc0Jhc2ljQ2hpcCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbnNEaXNhYmxlZCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcCBleHRlbmRzIF9NYXRDaGlwTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2FuQ29sb3IsIENhbkRpc2FibGVSaXBwbGUsIEhhc1RhYkluZGV4LCBPbkRlc3Ryb3kge1xuICAvKiogVGhlIHJpcHBsZSBhbmltYXRpb24gY29uZmlndXJhdGlvbiB0byB1c2UgZm9yIHRoZSBjaGlwLiAqL1xuICByZWFkb25seSBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICAvKiogV2hldGhlciB0aGUgcmlwcGxlIGlzIGNlbnRlcmVkIG9uIHRoZSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNSaXBwbGVDZW50ZXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGZvY3VzZWQuICovXG4gIHJlYWRvbmx5IF9vbkZvY3VzID0gbmV3IFN1YmplY3Q8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGJsdXJyZWQuICovXG4gIHJlYWRvbmx5IF9vbkJsdXIgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgcmVhZG9ubHkgSEFORExFRF9LRVlTOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgY2hpcCBpcyBhIGJhc2ljICh1bnN0eWxlZCkgY2hpcC4gKi9cbiAgcmVhZG9ubHkgX2lzQmFzaWNDaGlwOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGhhcyBmb2N1cy4gKi9cbiAgcHJvdGVjdGVkIF9oYXNGb2N1c0ludGVybmFsID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciBhbmltYXRpb25zIGZvciB0aGUgY2hpcCBhcmUgZW5hYmxlZC4gKi9cbiAgX2FuaW1hdGlvbnNEaXNhYmxlZDogYm9vbGVhbjtcblxuICAvLyBXZSBoYXZlIHRvIHVzZSBhIGBIb3N0TGlzdGVuZXJgIGhlcmUgaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIEl2eSBhbmQgVmlld0VuZ2luZS5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gIC8vIFZpZXdFbmdpbmUgdGhleSdyZSBvdmVyd3JpdHRlbi5cbiAgLy8gVE9ETyhtbWFsZXJiYSk6IHdlIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgIG9uY2UgSXZ5IGlzIHR1cm5lZCBvbiBieSBkZWZhdWx0LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVUcmFuc2l0aW9uRW5kKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpIHtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2ZW50KTtcbiAgfVxuXG4gIGdldCBfaGFzRm9jdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWw7XG4gIH1cblxuICAvKiogRGVmYXVsdCB1bmlxdWUgaWQgZm9yIHRoZSBjaGlwLiAqL1xuICBwcml2YXRlIF91bmlxdWVJZCA9IGBtYXQtbWRjLWNoaXAtJHt1aWQrK31gO1xuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGNoaXAuIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5yZW1vdmVJY29uKSB7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3RleHRFbGVtZW50ITogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgY2hpcC4gRGVmYXVsdHMgdG8gdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBtZGMtY2hpcF9fdGV4dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLl92YWx1ZVxuICAgICAgOiB0aGlzLl90ZXh0RWxlbWVudC50ZXh0Q29udGVudCEudHJpbSgpO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7IHRoaXMuX3ZhbHVlID0gdmFsdWU7IH1cbiAgcHJvdGVjdGVkIF92YWx1ZTogYW55O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlwIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZW1vdmFibGU7IH1cbiAgc2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlbW92YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9yZW1vdmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBDb2xvcnMgdGhlIGNoaXAgZm9yIGVtcGhhc2lzIGFzIGlmIGl0IHdlcmUgc2VsZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaGlnaGxpZ2h0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWdobGlnaHRlZDsgfVxuICBzZXQgaGlnaGxpZ2h0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWdobGlnaHRlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9oaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBAT3V0cHV0KCkgcmVtb3ZlSWNvbkludGVyYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgY2hpcC4gKi9cbiAgQE91dHB1dCgpIGludGVyYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBpcyBkZXN0cm95ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhIGNoaXAgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIFRoZSBNREMgZm91bmRhdGlvbiBjb250YWluaW5nIGJ1c2luZXNzIGxvZ2ljIGZvciBNREMgY2hpcC4gKi9cbiAgX2NoaXBGb3VuZGF0aW9uOiBNRENDaGlwRm91bmRhdGlvbjtcblxuICAvKiogVGhlIHVuc3R5bGVkIGNoaXAgc2VsZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50LiAqL1xuICBwcm90ZWN0ZWQgYmFzaWNDaGlwQXR0ck5hbWUgPSAnbWF0LWJhc2ljLWNoaXAnO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJvdGVjdGVkIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBUaGUgY2hpcCdzIGxlYWRpbmcgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRDaGlwQXZhdGFyKSBsZWFkaW5nSWNvbjogTWF0Q2hpcEF2YXRhcjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBUcmFpbGluZ0ljb24pIHRyYWlsaW5nSWNvbjogTWF0Q2hpcFRyYWlsaW5nSWNvbjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyByZW1vdmUgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRDaGlwUmVtb3ZlKSByZW1vdmVJY29uOiBNYXRDaGlwUmVtb3ZlO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1hdFJpcHBsZSBpbnN0YW5jZSBvZiB0aGUgY2hpcC4gKi9cbiAgQFZpZXdDaGlsZChNYXRSaXBwbGUpIHJpcHBsZTogTWF0UmlwcGxlO1xuXG4gLyoqXG4gICogSW1wbGVtZW50YXRpb24gb2YgdGhlIE1EQyBjaGlwIGFkYXB0ZXIgaW50ZXJmYWNlLlxuICAqIFRoZXNlIG1ldGhvZHMgYXJlIGNhbGxlZCBieSB0aGUgY2hpcCBmb3VuZGF0aW9uLlxuICAqL1xuICBwcm90ZWN0ZWQgX2NoaXBBZGFwdGVyOiBNRENDaGlwQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0TWRjQ2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0TWRjQ2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICBhZGRDbGFzc1RvTGVhZGluZ0ljb246IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMubGVhZGluZ0ljb24uc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbjogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBldmVudFRhcmdldEhhc0NsYXNzOlxuICAgICAgICAodGFyZ2V0OiBFdmVudFRhcmdldHxudWxsLCBjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGNsYXNzTGlzdGAsIGJlY2F1c2UgSUUgYW5kIEVkZ2UgZG9uJ3RcbiAgICAgICAgICAvLyBzdXBwb3J0IGl0IG9uIFNWRyBlbGVtZW50cyBhbmQgRWRnZSBzZWVtcyB0byB0aHJvdyBmb3IgcmlwcGxlXG4gICAgICAgICAgLy8gZWxlbWVudHMsIGJlY2F1c2UgdGhleSdyZSBvdXRzaWRlIHRoZSBET00uXG4gICAgICAgICAgcmV0dXJuICh0YXJnZXQgJiYgKHRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QpID9cbiAgICAgICAgICAgICAgKHRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6XG4gICAgICAgICAgICAgIGZhbHNlO1xuICAgICAgICB9LFxuICAgIG5vdGlmeUludGVyYWN0aW9uOiAoKSA9PiB0aGlzLl9ub3RpZnlJbnRlcmFjdGlvbigpLFxuICAgIG5vdGlmeVNlbGVjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIE5vLW9wLiBXZSBjYWxsIGRpc3BhdGNoU2VsZWN0aW9uRXZlbnQgb3Vyc2VsdmVzIGluIE1hdENoaXBPcHRpb24sXG4gICAgICAgICAgLy8gYmVjYXVzZSB3ZSB3YW50IHRvIHNwZWNpZnkgd2hldGhlciBzZWxlY3Rpb24gb2NjdXJyZWQgdmlhIHVzZXJcbiAgICAgICAgICAvLyBpbnB1dC5cbiAgICAgICAgfSxcbiAgICBub3RpZnlOYXZpZ2F0aW9uOiAoKSA9PiB0aGlzLl9ub3RpZnlOYXZpZ2F0aW9uKCksXG4gICAgbm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMucmVtb3ZlSWNvbkludGVyYWN0aW9uLmVtaXQodGhpcy5pZCksXG4gICAgbm90aWZ5UmVtb3ZhbDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZC5lbWl0KHtjaGlwOiB0aGlzfSk7XG5cbiAgICAgICAgICAvLyBXaGVuIE1EQyByZW1vdmVzIGEgY2hpcCBpdCBqdXN0IHRyYW5zaXRpb25zIGl0IHRvIGB3aWR0aDogMHB4YFxuICAgICAgICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgaXQncyBzdGlsbCBpbiB0aGUgRE9NIGFuZCBpdCdzIHN0aWxsIGZvY3VzYWJsZS5cbiAgICAgICAgICAvLyBNYWtlIGl0IGBkaXNwbGF5OiBub25lYCBzbyB1c2VycyBjYW4ndCB0YWIgaW50byBpdC5cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSxcbiAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6XG4gICAgICAgIHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBydW4gd2hlbiBhIGNoaXAgaXMgcmVtb3ZlZCBzbyBpdCBtaWdodCBiZVxuICAgICAgICAgIC8vIGludm9rZWQgZHVyaW5nIHNlcnZlci1zaWRlIHJlbmRlcmluZy4gQWRkIHNvbWUgZXh0cmEgY2hlY2tzIGp1c3QgaW5cbiAgICAgICAgICAvLyBjYXNlLlxuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IGdldENvbXB1dGVkU3R5bGUgPVxuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSxcbiAgICBzZXRTdHlsZVByb3BlcnR5OlxuICAgICAgICAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgaGFzTGVhZGluZ0ljb246ICgpID0+ICEhdGhpcy5sZWFkaW5nSWNvbixcbiAgICBpc1RyYWlsaW5nQWN0aW9uTmF2aWdhYmxlOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudHJhaWxpbmdJY29uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFpbGluZ0ljb24uaXNOYXZpZ2FibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgIGlzUlRMOiAoKSA9PiAhIXRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnLFxuICAgIGZvY3VzUHJpbWFyeUFjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIEFuZ3VsYXIgTWF0ZXJpYWwgTURDIGNoaXBzIGZ1bGx5IG1hbmFnZSBmb2N1cy4gVE9ETzogTWFuYWdpbmcgZm9jdXNcbiAgICAgICAgICAvLyBhbmQgaGFuZGxpbmcga2V5Ym9hcmQgZXZlbnRzIHdhcyBhZGRlZCBieSBNREMgYWZ0ZXIgb3VyXG4gICAgICAgICAgLy8gaW1wbGVtZW50YXRpb247IGNvbnNpZGVyIGNvbnNvbGlkYXRpbmcuXG4gICAgICAgIH0sXG4gICAgZm9jdXNUcmFpbGluZ0FjdGlvbjogKCkgPT4ge30sXG4gICAgcmVtb3ZlVHJhaWxpbmdBY3Rpb25Gb2N1czogKCkgPT4ge30sXG4gICAgc2V0UHJpbWFyeUFjdGlvbkF0dHI6XG4gICAgICAgIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAvLyBNREMgaXMgY3VycmVudGx5IHVzaW5nIHRoaXMgbWV0aG9kIHRvIHNldCBhcmlhLWNoZWNrZWQgb24gY2hvaWNlXG4gICAgICAgICAgLy8gYW5kIGZpbHRlciBjaGlwcywgd2hpY2ggaW4gdGhlIE1EQyB0ZW1wbGF0ZXMgaGF2ZSByb2xlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIC8vIGFuZCByb2xlPVwicmFkaW9cIiByZXNwZWN0aXZlbHkuIFdlIGhhdmUgcm9sZT1cIm9wdGlvblwiIG9uIHRob3NlIGNoaXBzXG4gICAgICAgICAgLy8gaW5zdGVhZCwgc28gd2UgZG8gbm90IHdhbnQgYXJpYS1jaGVja2VkLiBTaW5jZSB3ZSBhbHNvIG1hbmFnZSB0aGVcbiAgICAgICAgICAvLyB0YWJpbmRleCBvdXJzZWx2ZXMsIHdlIGRvbid0IGFsbG93IE1EQyB0byBzZXQgaXQuXG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdhcmlhLWNoZWNrZWQnIHx8IG5hbWUgPT09ICd0YWJpbmRleCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgLy8gVGhlIDIgZnVuY3Rpb25zIGJlbG93IGFyZSB1c2VkIGJ5IHRoZSBNREMgcmlwcGxlLCB3aGljaCB3ZSBhcmVuJ3QgdXNpbmcsXG4gICAgLy8gc28gdGhleSB3aWxsIG5ldmVyIGJlIGNhbGxlZFxuICAgIGdldFJvb3RCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICBnZXRDaGVja21hcmtCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+IG51bGwsXG4gICAgZ2V0QXR0cmlidXRlOiAoYXR0cikgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBgYW5pbWF0aW9uTW9kZWAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBGb3VuZGF0aW9uKHRoaXMuX2NoaXBBZGFwdGVyKTtcbiAgICB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIHRoaXMuX2lzQmFzaWNDaGlwID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUodGhpcy5iYXNpY0NoaXBBdHRyTmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2luaXRSZW1vdmVJY29uKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX3RleHRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtY2hpcF9fdGV4dCcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgdGhlIHJlbW92ZSBpY29uIGNoaXAgZm91bmRhdGlvbiwgYW5kIHN1YnNjcmliZXMgdG8gcmVtb3ZlIGljb24gZXZlbnRzLiAqL1xuICBfaW5pdFJlbW92ZUljb24oKSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uc2V0U2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGljayh0cnVlKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvUmVtb3ZlSWNvbkludGVyYWN0aW9uKCk7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGludGVyYWN0aW9uIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBfbGlzdGVuVG9SZW1vdmVJY29uSW50ZXJhY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVJY29uLmludGVyYWN0aW9uXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBUaGUgTURDIGNoaXAgZm91bmRhdGlvbiBjYWxscyBzdG9wUHJvcGFnYXRpb24oKSBmb3IgYW55IHRyYWlsaW5nIGljb24gaW50ZXJhY3Rpb25cbiAgICAgICAgICAvLyBldmVudCwgZXZlbiBvbmVzIGl0IGRvZXNuJ3QgaGFuZGxlLCBzbyB3ZSB3YW50IHRvIGF2b2lkIHBhc3NpbmcgaXQga2V5Ym9hcmQgZXZlbnRzXG4gICAgICAgICAgLy8gZm9yIHdoaWNoIHdlIGhhdmUgYSBjdXN0b20gaGFuZGxlci4gTm90ZSB0aGF0IHdlIGFzc2VydCB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgdXNpbmdcbiAgICAgICAgICAvLyB0aGUgYHR5cGVgLCBiZWNhdXNlIGBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnRgIGNhbiB0aHJvdyBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgICAgIGNvbnN0IGlzS2V5Ym9hcmRFdmVudCA9IGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgna2V5Jyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAoaXNLZXlib2FyZEV2ZW50ICYmXG4gICAgICAgICAgICAgIHRoaXMuSEFORExFRF9LRVlTLmluZGV4T2YoKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGUpICE9PSAtMSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVUcmFpbGluZ0FjdGlvbkludGVyYWN0aW9uKCk7XG5cbiAgICAgICAgICBpZiAoaXNLZXlib2FyZEV2ZW50ICYmICFoYXNNb2RpZmllcktleShldmVudCBhcyBLZXlib2FyZEV2ZW50KSkge1xuICAgICAgICAgICAgY29uc3Qga2V5Q29kZSA9IChldmVudCBhcyBLZXlib2FyZEV2ZW50KS5rZXlDb2RlO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHQgc3BhY2UgYW5kIGVudGVyIHByZXNzZXMgc28gd2UgZG9uJ3Qgc2Nyb2xsIHRoZSBwYWdlIG9yIHN1Ym1pdCBmb3Jtcy5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBTUEFDRSB8fCBrZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgcmVtb3ZhbCBvZiB0aGUgY2hpcC5cbiAgICpcbiAgICogSW5mb3JtcyBhbnkgbGlzdGVuZXJzIG9mIHRoZSByZW1vdmFsIHJlcXVlc3QuIERvZXMgbm90IHJlbW92ZSB0aGUgY2hpcCBmcm9tIHRoZSBET00uXG4gICAqL1xuICByZW1vdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVtb3ZhYmxlKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5iZWdpbkV4aXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIE1EQyBjaGlwLiAqL1xuICBwcml2YXRlIF9zZXRNZGNDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgICAgYWN0aXZlID8gY2xhc3Nlcy5hZGQoY3NzQ2xhc3MpIDogY2xhc3Nlcy5yZW1vdmUoY3NzQ2xhc3MpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9yd2FyZHMgaW50ZXJhY3Rpb24gZXZlbnRzIHRvIHRoZSBNREMgY2hpcCBmb3VuZGF0aW9uLiAqL1xuICBfaGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlQ2xpY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVLZXlkb3duKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCB8fCB0aGlzLl9pc0Jhc2ljQ2hpcDtcbiAgfVxuXG4gIF9ub3RpZnlJbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLmludGVyYWN0aW9uLmVtaXQodGhpcy5pZCk7XG4gIH1cblxuICBfbm90aWZ5TmF2aWdhdGlvbigpIHtcbiAgICAvLyBUT0RPOiBUaGlzIGlzIGEgbmV3IGZlYXR1cmUgYWRkZWQgYnkgTURDLiBDb25zaWRlciBleHBvc2luZyBpdCB0byB1c2Vyc1xuICAgIC8vIGluIHRoZSBmdXR1cmUuXG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlbW92YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlnaGxpZ2h0ZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==