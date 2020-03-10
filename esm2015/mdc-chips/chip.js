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
     * The value of the chip. Defaults to the content inside `<mat-chip>` tags.
     * @return {?}
     */
    get value() {
        return this._value !== undefined
            ? this._value
            : this._elementRef.nativeElement.textContent;
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
     * Whether this chip is a basic (unstyled) chip.
     * @return {?}
     */
    _isBasicChip() {
        /** @type {?} */
        const element = (/** @type {?} */ (this._elementRef.nativeElement));
        return element.hasAttribute(this.basicChipAttrName) ||
            element.tagName.toLowerCase() === this.basicChipAttrName;
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
        return this.disabled || this.disableRipple || this._isBasicChip();
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
                    '[class.mat-mdc-basic-chip]': '_isBasicChip()',
                    '[class.mat-mdc-standard-chip]': '!_isBasicChip()',
                    '[class._mat-animation-noopable]': '_animationsDisabled',
                    '[id]': 'id',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.aria-disabled]': 'disabled.toString()',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBT0wsU0FBUyxFQUNULFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsYUFBYSxHQUVkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7SUFHM0UsR0FBRyxHQUFHLENBQUM7Ozs7O0FBR1gsa0NBR0M7Ozs7OztJQURD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Ozs7O0lBVXRCLDZCQUFxQzs7Ozs7SUFVckMsK0JBQXdDOzs7OztJQUd4Qyx3Q0FBNkQ7Ozs7O0lBRzdELDhCQUFtRDs7Ozs7SUFHbkQsNEJBQTRGOzs7OztJQUc1RiwwQkFBMEY7Ozs7O0lBRzFGLGtDQUFtQzs7Ozs7O0lBR25DLG9DQUErQzs7Ozs7O0lBRy9DLDZCQUEyQzs7Ozs7SUFHM0MsOEJBQXdEOzs7OztJQUd4RCwrQkFBcUU7Ozs7O0lBR3JFLDZCQUF1RDs7Ozs7SUFHdkQseUJBQXdDOzs7Ozs7O0lBTXhDLCtCQWtFQzs7SUFHQyxxQ0FBNEM7O0lBQzVDLDhCQUFnQzs7Ozs7SUFDaEMsMEJBQXlCOzs7OztJQUN6Qix1QkFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QU5JTUFUSU9OX01PRFVMRV9UWVBFfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIEhhc1RhYkluZGV4LFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIE1hdFJpcHBsZSxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBtaXhpblRhYkluZGV4LFxuICBSaXBwbGVBbmltYXRpb25Db25maWcsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNRENDaGlwQWRhcHRlciwgTURDQ2hpcEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge251bWJlcnN9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUnO1xuaW1wb3J0IHtTUEFDRSwgRU5URVIsIGhhc01vZGlmaWVyS2V5fSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdENoaXBBdmF0YXIsIE1hdENoaXBUcmFpbGluZ0ljb24sIE1hdENoaXBSZW1vdmV9IGZyb20gJy4vY2hpcC1pY29ucyc7XG5cblxubGV0IHVpZCA9IDA7XG5cbi8qKiBSZXByZXNlbnRzIGFuIGV2ZW50IGZpcmVkIG9uIGFuIGluZGl2aWR1YWwgYG1hdC1jaGlwYC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2hpcEV2ZW50IHtcbiAgLyoqIFRoZSBjaGlwIHRoZSBldmVudCB3YXMgZmlyZWQgb24uICovXG4gIGNoaXA6IE1hdENoaXA7XG59XG5cbi8qKiBDb25maWd1cmF0aW9uIGZvciB0aGUgcmlwcGxlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IFJJUFBMRV9BTklNQVRJT05fQ09ORklHOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSB7XG4gIGVudGVyRHVyYXRpb246IG51bWJlcnMuREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMsXG4gIGV4aXREdXJhdGlvbjogbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVNcbn07XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBNREMgQ1NTIHRvIG5vbi1iYXNpYyBjaGlwcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgbWF0LWNoaXAsIG1hdC1jaGlwLW9wdGlvbiwgbWF0LWNoaXAtcm93LCBbbWF0LWNoaXBdLCBbbWF0LWNoaXAtb3B0aW9uXSxcbiAgICBbbWF0LWNoaXAtcm93XWAsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jaGlwIG1kYy1jaGlwJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcENzc0ludGVybmFsT25seSB7IH1cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmNsYXNzIE1hdENoaXBCYXNlIHtcbiAgZGlzYWJsZWQhOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbmNvbnN0IF9NYXRDaGlwTWl4aW5CYXNlOlxuICBDYW5Db2xvckN0b3IgJlxuICBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIHR5cGVvZiBNYXRDaGlwQmFzZSA9XG4gICAgbWl4aW5UYWJJbmRleChtaXhpbkNvbG9yKG1peGluRGlzYWJsZVJpcHBsZShNYXRDaGlwQmFzZSksICdwcmltYXJ5JyksIC0xKTtcblxuLyoqXG4gKiBNYXRlcmlhbCBkZXNpZ24gc3R5bGVkIENoaXAgYmFzZSBjb21wb25lbnQuIFVzZWQgaW5zaWRlIHRoZSBNYXRDaGlwU2V0IGNvbXBvbmVudC5cbiAqXG4gKiBFeHRlbmRlZCBieSBNYXRDaGlwT3B0aW9uIGFuZCBNYXRDaGlwUm93IGZvciBkaWZmZXJlbnQgaW50ZXJhY3Rpb24gcGF0dGVybnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1iYXNpYy1jaGlwLCBtYXQtY2hpcCcsXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJ10sXG4gIGV4cG9ydEFzOiAnbWF0Q2hpcCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtYXZhdGFyXSc6ICdsZWFkaW5nSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWJhc2ljLWNoaXBdJzogJ19pc0Jhc2ljQ2hpcCgpJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc3RhbmRhcmQtY2hpcF0nOiAnIV9pc0Jhc2ljQ2hpcCgpJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uc0Rpc2FibGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwIGV4dGVuZHMgX01hdENoaXBNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSwgSGFzVGFiSW5kZXgsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgcmlwcGxlIGFuaW1hdGlvbiBjb25maWd1cmF0aW9uIHRvIHVzZSBmb3IgdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgaXMgY2VudGVyZWQgb24gdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9pc1JpcHBsZUNlbnRlcmVkID0gZmFsc2U7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgZm9jdXNlZC4gKi9cbiAgcmVhZG9ubHkgX29uRm9jdXMgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgYmx1cnJlZC4gKi9cbiAgcmVhZG9ubHkgX29uQmx1ciA9IG5ldyBTdWJqZWN0PE1hdENoaXBFdmVudD4oKTtcblxuICByZWFkb25seSBIQU5ETEVEX0tFWVM6IG51bWJlcltdID0gW107XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaGFzIGZvY3VzLiAqL1xuICBwcm90ZWN0ZWQgX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgZm9yIHRoZSBjaGlwIGFyZSBlbmFibGVkLiAqL1xuICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8vIFdlIGhhdmUgdG8gdXNlIGEgYEhvc3RMaXN0ZW5lcmAgaGVyZSBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggSXZ5IGFuZCBWaWV3RW5naW5lLlxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBiaW5kaW5ncyB3aWxsIGJlIG1lcmdlZCB3aGVuIHRoaXMgY2xhc3MgaXMgZXh0ZW5kZWQsIHdoZXJlYXMgaW5cbiAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAvLyBUT0RPKG1tYWxlcmJhKTogd2UgbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAgb25jZSBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkge1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQpO1xuICB9XG5cbiAgZ2V0IF9oYXNGb2N1cygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRm9jdXNJbnRlcm5hbDtcbiAgfVxuXG4gIC8qKiBEZWZhdWx0IHVuaXF1ZSBpZCBmb3IgdGhlIGNoaXAuICovXG4gIHByaXZhdGUgX3VuaXF1ZUlkID0gYG1hdC1tZGMtY2hpcC0ke3VpZCsrfWA7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgY2hpcC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAvKiogVGhlIHZhbHVlIG9mIHRoZSBjaGlwLiBEZWZhdWx0cyB0byB0aGUgY29udGVudCBpbnNpZGUgYDxtYXQtY2hpcD5gIHRhZ3MuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuX3ZhbHVlXG4gICAgICA6IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkgeyB0aGlzLl92YWx1ZSA9IHZhbHVlOyB9XG4gIHByb3RlY3RlZCBfdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY2hpcCBkaXNwbGF5cyB0aGUgcmVtb3ZlIHN0eWxpbmcgYW5kIGVtaXRzIChyZW1vdmVkKSBldmVudHMuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVtb3ZhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVtb3ZhYmxlOyB9XG4gIHNldCByZW1vdmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ29sb3JzIHRoZSBjaGlwIGZvciBlbXBoYXNpcyBhcyBpZiBpdCB3ZXJlIHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGhpZ2hsaWdodGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlnaGxpZ2h0ZWQ7IH1cbiAgc2V0IGhpZ2hsaWdodGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlnaGxpZ2h0ZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSByZW1vdmUgaWNvbi4gKi9cbiAgQE91dHB1dCgpIHJlbW92ZUljb25JbnRlcmFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIGNoaXAuICovXG4gIEBPdXRwdXQoKSBpbnRlcmFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIGNoaXAgaXMgZGVzdHJveWVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZGVzdHJveWVkOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gYSBjaGlwIGlzIHRvIGJlIHJlbW92ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSByZW1vdmVkOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBUaGUgTURDIGZvdW5kYXRpb24gY29udGFpbmluZyBidXNpbmVzcyBsb2dpYyBmb3IgTURDIGNoaXAuICovXG4gIF9jaGlwRm91bmRhdGlvbjogTURDQ2hpcEZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSB1bnN0eWxlZCBjaGlwIHNlbGVjdG9yIGZvciB0aGlzIGNvbXBvbmVudC4gKi9cbiAgcHJvdGVjdGVkIGJhc2ljQ2hpcEF0dHJOYW1lID0gJ21hdC1iYXNpYy1jaGlwJztcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByb3RlY3RlZCBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogVGhlIGNoaXAncyBsZWFkaW5nIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTWF0Q2hpcEF2YXRhcikgbGVhZGluZ0ljb246IE1hdENoaXBBdmF0YXI7XG5cbiAgLyoqIFRoZSBjaGlwJ3MgdHJhaWxpbmcgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRDaGlwVHJhaWxpbmdJY29uKSB0cmFpbGluZ0ljb246IE1hdENoaXBUcmFpbGluZ0ljb247XG5cbiAgLyoqIFRoZSBjaGlwJ3MgdHJhaWxpbmcgcmVtb3ZlIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTWF0Q2hpcFJlbW92ZSkgcmVtb3ZlSWNvbjogTWF0Q2hpcFJlbW92ZTtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBNYXRSaXBwbGUgaW5zdGFuY2Ugb2YgdGhlIGNoaXAuICovXG4gIEBWaWV3Q2hpbGQoTWF0UmlwcGxlKSByaXBwbGU6IE1hdFJpcHBsZTtcblxuIC8qKlxuICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBNREMgY2hpcCBhZGFwdGVyIGludGVyZmFjZS5cbiAgKiBUaGVzZSBtZXRob2RzIGFyZSBjYWxsZWQgYnkgdGhlIGNoaXAgZm91bmRhdGlvbi5cbiAgKi9cbiAgcHJvdGVjdGVkIF9jaGlwQWRhcHRlcjogTURDQ2hpcEFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldE1kY0NsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldE1kY0NsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PiB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3NGcm9tTGVhZGluZ0ljb246IChjbGFzc05hbWUpID0+IHRoaXMubGVhZGluZ0ljb24uc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsLCBjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgLy8gV2UgbmVlZCB0byBudWxsIGNoZWNrIHRoZSBgY2xhc3NMaXN0YCwgYmVjYXVzZSBJRSBhbmQgRWRnZSBkb24ndCBzdXBwb3J0IGl0IG9uIFNWRyBlbGVtZW50c1xuICAgICAgLy8gYW5kIEVkZ2Ugc2VlbXMgdG8gdGhyb3cgZm9yIHJpcHBsZSBlbGVtZW50cywgYmVjYXVzZSB0aGV5J3JlIG91dHNpZGUgdGhlIERPTS5cbiAgICAgIHJldHVybiAodGFyZ2V0ICYmICh0YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0KSA/XG4gICAgICAgICAgKHRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6IGZhbHNlO1xuICAgIH0sXG4gICAgbm90aWZ5SW50ZXJhY3Rpb246ICgpID0+IHRoaXMuaW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKSxcbiAgICBub3RpZnlTZWxlY3Rpb246ICgpID0+IHtcbiAgICAgIC8vIE5vLW9wLiBXZSBjYWxsIGRpc3BhdGNoU2VsZWN0aW9uRXZlbnQgb3Vyc2VsdmVzIGluIE1hdENoaXBPcHRpb24sIGJlY2F1c2Ugd2Ugd2FudCB0b1xuICAgICAgLy8gc3BlY2lmeSB3aGV0aGVyIHNlbGVjdGlvbiBvY2N1cnJlZCB2aWEgdXNlciBpbnB1dC5cbiAgICB9LFxuICAgIG5vdGlmeU5hdmlnYXRpb246ICgpID0+IHtcbiAgICAgIC8vIFRPRE86IFRoaXMgaXMgYSBuZXcgZmVhdHVyZSBhZGRlZCBieSBNREM7IGNvbnNpZGVyIGV4cG9zaW5nIHRoaXMgZXZlbnQgdG8gdXNlcnMgaW4gdGhlXG4gICAgICAvLyBmdXR1cmUuXG4gICAgfSxcbiAgICBub3RpZnlUcmFpbGluZ0ljb25JbnRlcmFjdGlvbjogKCkgPT4gdGhpcy5yZW1vdmVJY29uSW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKSxcbiAgICBub3RpZnlSZW1vdmFsOiAoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZWQuZW1pdCh7IGNoaXA6IHRoaXMgfSk7XG5cbiAgICAgIC8vIFdoZW4gTURDIHJlbW92ZXMgYSBjaGlwIGl0IGp1c3QgdHJhbnNpdGlvbnMgaXQgdG8gYHdpZHRoOiAwcHhgIHdoaWNoIG1lYW5zIHRoYXQgaXQncyBzdGlsbFxuICAgICAgLy8gaW4gdGhlIERPTSBhbmQgaXQncyBzdGlsbCBmb2N1c2FibGUuIE1ha2UgaXQgYGRpc3BsYXk6IG5vbmVgIHNvIHVzZXJzIGNhbid0IHRhYiBpbnRvIGl0LlxuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSxcbiAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6IHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHJ1biB3aGVuIGEgY2hpcCBpcyByZW1vdmVkIHNvIGl0IG1pZ2h0IGJlXG4gICAgICAvLyBpbnZva2VkIGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuIEFkZCBzb21lIGV4dHJhIGNoZWNrcyBqdXN0IGluIGNhc2UuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93KSB7XG4gICAgICAgIGNvbnN0IGdldENvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSxcbiAgICBzZXRTdHlsZVByb3BlcnR5OiAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICB9LFxuICAgIGhhc0xlYWRpbmdJY29uOiAoKSA9PiAhIXRoaXMubGVhZGluZ0ljb24sXG4gICAgaGFzVHJhaWxpbmdBY3Rpb246ICgpID0+ICEhdGhpcy50cmFpbGluZ0ljb24sXG4gICAgaXNSVEw6ICgpID0+ICEhdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcsXG4gICAgZm9jdXNQcmltYXJ5QWN0aW9uOiAoKSA9PiB7XG4gICAgICAvLyBBbmd1bGFyIE1hdGVyaWFsIE1EQyBjaGlwcyBmdWxseSBtYW5hZ2UgZm9jdXMuIFRPRE86IE1hbmFnaW5nIGZvY3VzIGFuZCBoYW5kbGluZyBrZXlib2FyZFxuICAgICAgLy8gZXZlbnRzIHdhcyBhZGRlZCBieSBNREMgYWZ0ZXIgb3VyIGltcGxlbWVudGF0aW9uOyBjb25zaWRlciBjb25zb2xpZGF0aW5nLlxuICAgIH0sXG4gICAgZm9jdXNUcmFpbGluZ0FjdGlvbjogKCkgPT4ge30sXG4gICAgc2V0VHJhaWxpbmdBY3Rpb25BdHRyOiAoYXR0ciwgdmFsdWUpID0+XG4gICAgICAgIHRoaXMudHJhaWxpbmdJY29uICYmIHRoaXMudHJhaWxpbmdJY29uLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSksXG4gICAgc2V0UHJpbWFyeUFjdGlvbkF0dHI6IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIE1EQyBpcyBjdXJyZW50bHkgdXNpbmcgdGhpcyBtZXRob2QgdG8gc2V0IGFyaWEtY2hlY2tlZCBvbiBjaG9pY2UgYW5kIGZpbHRlciBjaGlwcyxcbiAgICAgIC8vIHdoaWNoIGluIHRoZSBNREMgdGVtcGxhdGVzIGhhdmUgcm9sZT1cImNoZWNrYm94XCIgYW5kIHJvbGU9XCJyYWRpb1wiIHJlc3BlY3RpdmVseS5cbiAgICAgIC8vIFdlIGhhdmUgcm9sZT1cIm9wdGlvblwiIG9uIHRob3NlIGNoaXBzIGluc3RlYWQsIHNvIHdlIGRvIG5vdCB3YW50IGFyaWEtY2hlY2tlZC5cbiAgICAgIC8vIFNpbmNlIHdlIGFsc28gbWFuYWdlIHRoZSB0YWJpbmRleCBvdXJzZWx2ZXMsIHdlIGRvbid0IGFsbG93IE1EQyB0byBzZXQgaXQuXG4gICAgICBpZiAobmFtZSA9PT0gJ2FyaWEtY2hlY2tlZCcgfHwgbmFtZSA9PT0gJ3RhYmluZGV4Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9LFxuICAgIC8vIFRoZSAyIGZ1bmN0aW9ucyBiZWxvdyBhcmUgdXNlZCBieSB0aGUgTURDIHJpcHBsZSwgd2hpY2ggd2UgYXJlbid0IHVzaW5nLFxuICAgIC8vIHNvIHRoZXkgd2lsbCBuZXZlciBiZSBjYWxsZWRcbiAgICBnZXRSb290Qm91bmRpbmdDbGllbnRSZWN0OiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgZ2V0Q2hlY2ttYXJrQm91bmRpbmdDbGllbnRSZWN0OiAoKSA9PiBudWxsLFxuICAgIGdldEF0dHJpYnV0ZTogKGF0dHIpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0ciksXG4gfTtcblxuIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIGBhbmltYXRpb25Nb2RlYCBwYXJhbWV0ZXIgdG8gYmVjb21lIHJlcXVpcmVkLlxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBGb3VuZGF0aW9uKHRoaXMuX2NoaXBBZGFwdGVyKTtcbiAgICB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2luaXRSZW1vdmVJY29uKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgdGhlIHJlbW92ZSBpY29uIGNoaXAgZm91bmRhdGlvbiwgYW5kIHN1YnNjcmliZXMgdG8gcmVtb3ZlIGljb24gZXZlbnRzLiAqL1xuICBfaW5pdFJlbW92ZUljb24oKSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uc2V0U2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGljayh0cnVlKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvUmVtb3ZlSWNvbkludGVyYWN0aW9uKCk7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGludGVyYWN0aW9uIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBfbGlzdGVuVG9SZW1vdmVJY29uSW50ZXJhY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVJY29uLmludGVyYWN0aW9uXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBUaGUgTURDIGNoaXAgZm91bmRhdGlvbiBjYWxscyBzdG9wUHJvcGFnYXRpb24oKSBmb3IgYW55IHRyYWlsaW5nIGljb24gaW50ZXJhY3Rpb25cbiAgICAgICAgICAvLyBldmVudCwgZXZlbiBvbmVzIGl0IGRvZXNuJ3QgaGFuZGxlLCBzbyB3ZSB3YW50IHRvIGF2b2lkIHBhc3NpbmcgaXQga2V5Ym9hcmQgZXZlbnRzXG4gICAgICAgICAgLy8gZm9yIHdoaWNoIHdlIGhhdmUgYSBjdXN0b20gaGFuZGxlci4gTm90ZSB0aGF0IHdlIGFzc2VydCB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgdXNpbmdcbiAgICAgICAgICAvLyB0aGUgYHR5cGVgLCBiZWNhdXNlIGBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnRgIGNhbiB0aHJvdyBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgICAgIGNvbnN0IGlzS2V5Ym9hcmRFdmVudCA9IGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgna2V5Jyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAoaXNLZXlib2FyZEV2ZW50ICYmXG4gICAgICAgICAgICAgIHRoaXMuSEFORExFRF9LRVlTLmluZGV4T2YoKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGUpICE9PSAtMSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVUcmFpbGluZ0ljb25JbnRlcmFjdGlvbihldmVudCk7XG5cbiAgICAgICAgICBpZiAoaXNLZXlib2FyZEV2ZW50ICYmICFoYXNNb2RpZmllcktleShldmVudCBhcyBLZXlib2FyZEV2ZW50KSkge1xuICAgICAgICAgICAgY29uc3Qga2V5Q29kZSA9IChldmVudCBhcyBLZXlib2FyZEV2ZW50KS5rZXlDb2RlO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHQgc3BhY2UgYW5kIGVudGVyIHByZXNzZXMgc28gd2UgZG9uJ3Qgc2Nyb2xsIHRoZSBwYWdlIG9yIHN1Ym1pdCBmb3Jtcy5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBTUEFDRSB8fCBrZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgcmVtb3ZhbCBvZiB0aGUgY2hpcC5cbiAgICpcbiAgICogSW5mb3JtcyBhbnkgbGlzdGVuZXJzIG9mIHRoZSByZW1vdmFsIHJlcXVlc3QuIERvZXMgbm90IHJlbW92ZSB0aGUgY2hpcCBmcm9tIHRoZSBET00uXG4gICAqL1xuICByZW1vdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVtb3ZhYmxlKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5iZWdpbkV4aXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIGNoaXAgaXMgYSBiYXNpYyAodW5zdHlsZWQpIGNoaXAuICovXG4gIF9pc0Jhc2ljQ2hpcCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZSh0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lKSB8fFxuICAgICAgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYmFzaWNDaGlwQXR0ck5hbWU7XG4gIH1cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIE1EQyBjaGlwLiAqL1xuICBwcml2YXRlIF9zZXRNZGNDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgICAgYWN0aXZlID8gY2xhc3Nlcy5hZGQoY3NzQ2xhc3MpIDogY2xhc3Nlcy5yZW1vdmUoY3NzQ2xhc3MpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9yd2FyZHMgaW50ZXJhY3Rpb24gZXZlbnRzIHRvIHRoZSBNREMgY2hpcCBmb3VuZGF0aW9uLiAqL1xuICBfaGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBfaXNSaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5faXNCYXNpY0NoaXAoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVtb3ZhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWdobGlnaHRlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuIl19