/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
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
var uid = 0;
/** Configuration for the ripple animation. */
var RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/**
 * Directive to add MDC CSS to non-basic chips.
 * @docs-private
 */
var MatChipCssInternalOnly = /** @class */ (function () {
    function MatChipCssInternalOnly() {
    }
    MatChipCssInternalOnly.decorators = [
        { type: Directive, args: [{
                    selector: "mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],\n    [mat-chip-row]",
                    host: { 'class': 'mat-mdc-chip mdc-chip' }
                },] }
    ];
    return MatChipCssInternalOnly;
}());
export { MatChipCssInternalOnly };
/**
 * Boilerplate for applying mixins to MatChip.
 * @docs-private
 */
var MatChipBase = /** @class */ (function () {
    function MatChipBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatChipBase;
}());
var _MatChipMixinBase = mixinTabIndex(mixinColor(mixinDisableRipple(MatChipBase), 'primary'), -1);
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
var MatChip = /** @class */ (function (_super) {
    __extends(MatChip, _super);
    function MatChip(_changeDetectorRef, _elementRef, _ngZone, _dir, 
    // @breaking-change 8.0.0 `animationMode` parameter to become required.
    animationMode) {
        var _this = _super.call(this, _elementRef) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._elementRef = _elementRef;
        _this._ngZone = _ngZone;
        _this._dir = _dir;
        /** The ripple animation configuration to use for the chip. */
        _this._rippleAnimation = RIPPLE_ANIMATION_CONFIG;
        /** Whether the ripple is centered on the chip. */
        _this._isRippleCentered = false;
        /** Emits when the chip is focused. */
        _this._onFocus = new Subject();
        /** Emits when the chip is blurred. */
        _this._onBlur = new Subject();
        _this.HANDLED_KEYS = new Set([SPACE, ENTER]);
        /** Whether the chip has focus. */
        _this._hasFocusInternal = false;
        /** Default unique id for the chip. */
        _this._uniqueId = "mat-mdc-chip-" + uid++;
        /** A unique id for the chip. If none is supplied, it will be auto-generated. */
        _this.id = _this._uniqueId;
        _this._disabled = false;
        _this._removable = true;
        _this._highlighted = false;
        /** Emitted when the user interacts with the remove icon. */
        _this.removeIconInteraction = new EventEmitter();
        /** Emitted when the user interacts with the chip. */
        _this.interaction = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        _this.destroyed = new EventEmitter();
        /** Emitted when a chip is to be removed. */
        _this.removed = new EventEmitter();
        /** The unstyled chip selector for this component. */
        _this.basicChipAttrName = 'mat-basic-chip';
        /** Subject that emits when the component has been destroyed. */
        _this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip adapter interface.
         * These methods are called by the chip foundation.
         */
        _this._chipAdapter = {
            addClass: function (className) { return _this._setMdcClass(className, true); },
            removeClass: function (className) { return _this._setMdcClass(className, false); },
            hasClass: function (className) {
                return _this._elementRef.nativeElement.classList.contains(className);
            },
            addClassToLeadingIcon: function (className) {
                return _this.leadingIcon.setClass(className, true);
            },
            removeClassFromLeadingIcon: function (className) {
                return _this.leadingIcon.setClass(className, false);
            },
            eventTargetHasClass: function (target, className) {
                // We need to null check the `classList`, because IE and Edge don't
                // support it on SVG elements and Edge seems to throw for ripple
                // elements, because they're outside the DOM.
                return (target && target.classList) ?
                    target.classList.contains(className) :
                    false;
            },
            notifyInteraction: function () { return _this._notifyInteraction(); },
            notifySelection: function () {
                // No-op. We call dispatchSelectionEvent ourselves in MatChipOption,
                // because we want to specify whether selection occurred via user
                // input.
            },
            notifyNavigation: function () { return _this._notifyNavigation(); },
            notifyTrailingIconInteraction: function () {
                return _this.removeIconInteraction.emit(_this.id);
            },
            notifyRemoval: function () {
                _this.removed.emit({ chip: _this });
                // When MDC removes a chip it just transitions it to `width: 0px`
                // which means that it's still in the DOM and it's still focusable.
                // Make it `display: none` so users can't tab into it.
                _this._elementRef.nativeElement.style.display = 'none';
            },
            getComputedStyleValue: function (propertyName) {
                // This function is run when a chip is removed so it might be
                // invoked during server-side rendering. Add some extra checks just in
                // case.
                if (typeof window !== 'undefined' && window) {
                    var getComputedStyle_1 = window.getComputedStyle(_this._elementRef.nativeElement);
                    return getComputedStyle_1.getPropertyValue(propertyName);
                }
                return '';
            },
            setStyleProperty: function (propertyName, value) {
                _this._elementRef.nativeElement.style.setProperty(propertyName, value);
            },
            hasLeadingIcon: function () { return !!_this.leadingIcon; },
            isTrailingActionNavigable: function () {
                if (_this.trailingIcon) {
                    return _this.trailingIcon.isNavigable();
                }
                return false;
            },
            isRTL: function () { return !!_this._dir && _this._dir.value === 'rtl'; },
            focusPrimaryAction: function () {
                // Angular Material MDC chips fully manage focus. TODO: Managing focus
                // and handling keyboard events was added by MDC after our
                // implementation; consider consolidating.
            },
            focusTrailingAction: function () { },
            removeTrailingActionFocus: function () { },
            setPrimaryActionAttr: function (name, value) {
                // MDC is currently using this method to set aria-checked on choice
                // and filter chips, which in the MDC templates have role="checkbox"
                // and role="radio" respectively. We have role="option" on those chips
                // instead, so we do not want aria-checked. Since we also manage the
                // tabindex ourselves, we don't allow MDC to set it.
                if (name === 'aria-checked' || name === 'tabindex') {
                    return;
                }
                _this._elementRef.nativeElement.setAttribute(name, value);
            },
            // The 2 functions below are used by the MDC ripple, which we aren't using,
            // so they will never be called
            getRootBoundingClientRect: function () {
                return _this._elementRef.nativeElement.getBoundingClientRect();
            },
            getCheckmarkBoundingClientRect: function () { return null; },
            getAttribute: function (attr) { return _this._elementRef.nativeElement.getAttribute(attr); },
        };
        _this._chipFoundation = new MDCChipFoundation(_this._chipAdapter);
        _this._animationsDisabled = animationMode === 'NoopAnimations';
        _this._isBasicChip = _elementRef.nativeElement.hasAttribute(_this.basicChipAttrName) ||
            _elementRef.nativeElement.tagName.toLowerCase() === _this.basicChipAttrName;
        return _this;
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    MatChip.prototype._handleTransitionEnd = function (event) {
        this._chipFoundation.handleTransitionEnd(event);
    };
    Object.defineProperty(MatChip.prototype, "_hasFocus", {
        get: function () {
            return this._hasFocusInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            if (this.removeIcon) {
                this.removeIcon.disabled = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "value", {
        /** The value of the chip. Defaults to the content inside the mdc-chip__text element. */
        get: function () {
            return this._value !== undefined
                ? this._value
                : this._textElement.textContent.trim();
        },
        set: function (value) { this._value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "removable", {
        /**
         * Determines whether or not the chip displays the remove styling and emits (removed) events.
         */
        get: function () { return this._removable; },
        set: function (value) {
            this._removable = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "highlighted", {
        /**
         * Colors the chip for emphasis as if it were selected.
         */
        get: function () { return this._highlighted; },
        set: function (value) {
            this._highlighted = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MatChip.prototype.ngAfterContentInit = function () {
        this._initRemoveIcon();
    };
    MatChip.prototype.ngAfterViewInit = function () {
        this._chipFoundation.init();
        this._textElement = this._elementRef.nativeElement.querySelector('.mdc-chip__text');
    };
    MatChip.prototype.ngOnDestroy = function () {
        this.destroyed.emit({ chip: this });
        this._destroyed.next();
        this._destroyed.complete();
        this._chipFoundation.destroy();
    };
    /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
    MatChip.prototype._initRemoveIcon = function () {
        if (this.removeIcon) {
            this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
            this._listenToRemoveIconInteraction();
            this.removeIcon.disabled = this.disabled;
        }
    };
    /** Handles interaction with the remove icon. */
    MatChip.prototype._listenToRemoveIconInteraction = function () {
        var _this = this;
        this.removeIcon.interaction
            .pipe(takeUntil(this._destroyed))
            .subscribe(function (event) {
            // The MDC chip foundation calls stopPropagation() for any trailing icon interaction
            // event, even ones it doesn't handle, so we want to avoid passing it keyboard events
            // for which we have a custom handler. Note that we assert the type of the event using
            // the `type`, because `instanceof KeyboardEvent` can throw during server-side rendering.
            var isKeyboardEvent = event.type.startsWith('key');
            if (_this.disabled || (isKeyboardEvent &&
                !_this.HANDLED_KEYS.has(event.keyCode))) {
                return;
            }
            _this._chipFoundation.handleTrailingActionInteraction();
            if (isKeyboardEvent && !hasModifierKey(event)) {
                var keyCode = event.keyCode;
                // Prevent default space and enter presses so we don't scroll the page or submit forms.
                if (keyCode === SPACE || keyCode === ENTER) {
                    event.preventDefault();
                }
            }
        });
    };
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    MatChip.prototype.remove = function () {
        if (this.removable) {
            this._chipFoundation.beginExit();
        }
    };
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    MatChip.prototype._setMdcClass = function (cssClass, active) {
        var classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    };
    /** Forwards interaction events to the MDC chip foundation. */
    MatChip.prototype._handleInteraction = function (event) {
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
    };
    /** Whether or not the ripple should be disabled. */
    MatChip.prototype._isRippleDisabled = function () {
        return this.disabled || this.disableRipple || this._animationsDisabled || this._isBasicChip;
    };
    MatChip.prototype._notifyInteraction = function () {
        this.interaction.emit(this.id);
    };
    MatChip.prototype._notifyNavigation = function () {
        // TODO: This is a new feature added by MDC. Consider exposing it to users
        // in the future.
    };
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
    MatChip.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
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
}(_MatChipMixinBase));
export { MatChip };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBR0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQU9MLFNBQVMsRUFDVCxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGFBQWEsR0FFZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFHL0UsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFD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QXFCO3FCQUM5QztvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkF0R0MsaUJBQWlCO2dCQUdqQixVQUFVO2dCQUtWLE1BQU07Z0JBaEJBLGNBQWMsdUJBeVVmLFFBQVE7NkNBRVIsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7Ozt1Q0E5TDVDLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7cUJBYXhDLEtBQUs7MkJBR0wsS0FBSzt3QkFhTCxLQUFLOzRCQVlMLEtBQUs7OEJBVUwsS0FBSzt3Q0FRTCxNQUFNOzhCQUdOLE1BQU07NEJBR04sTUFBTTswQkFHTixNQUFNOzhCQVlOLFlBQVksU0FBQyxhQUFhOytCQUcxQixZQUFZLFNBQUMsbUJBQW1COzZCQUdoQyxZQUFZLFNBQUMsYUFBYTt5QkFHMUIsU0FBUyxTQUFDLFNBQVM7O0lBd050QixjQUFDO0NBQUEsQUFwV0QsQ0FxQjZCLGlCQUFpQixHQStVN0M7U0EvVVksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYW5Db2xvcixcbiAgQ2FuQ29sb3JDdG9yLFxuICBDYW5EaXNhYmxlUmlwcGxlLFxuICBDYW5EaXNhYmxlUmlwcGxlQ3RvcixcbiAgSGFzVGFiSW5kZXgsXG4gIEhhc1RhYkluZGV4Q3RvcixcbiAgTWF0UmlwcGxlLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIG1peGluVGFiSW5kZXgsXG4gIFJpcHBsZUFuaW1hdGlvbkNvbmZpZyxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01EQ0NoaXBBZGFwdGVyLCBNRENDaGlwRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5pbXBvcnQge1NQQUNFLCBFTlRFUiwgaGFzTW9kaWZpZXJLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0Q2hpcEF2YXRhciwgTWF0Q2hpcFRyYWlsaW5nSWNvbiwgTWF0Q2hpcFJlbW92ZX0gZnJvbSAnLi9jaGlwLWljb25zJztcblxuXG5sZXQgdWlkID0gMDtcblxuLyoqIFJlcHJlc2VudHMgYW4gZXZlbnQgZmlyZWQgb24gYW4gaW5kaXZpZHVhbCBgbWF0LWNoaXBgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwRXZlbnQge1xuICAvKiogVGhlIGNoaXAgdGhlIGV2ZW50IHdhcyBmaXJlZCBvbi4gKi9cbiAgY2hpcDogTWF0Q2hpcDtcbn1cblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIE1EQyBDU1MgdG8gbm9uLWJhc2ljIGNoaXBzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBtYXQtY2hpcCwgbWF0LWNoaXAtb3B0aW9uLCBtYXQtY2hpcC1yb3csIFttYXQtY2hpcF0sIFttYXQtY2hpcC1vcHRpb25dLFxuICAgIFttYXQtY2hpcC1yb3ddYCxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWNoaXAgbWRjLWNoaXAnfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwQ3NzSW50ZXJuYWxPbmx5IHsgfVxuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY2xhc3MgTWF0Q2hpcEJhc2Uge1xuICBkaXNhYmxlZCE6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuY29uc3QgX01hdENoaXBNaXhpbkJhc2U6XG4gIENhbkNvbG9yQ3RvciAmXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgdHlwZW9mIE1hdENoaXBCYXNlID1cbiAgICBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKE1hdENoaXBCYXNlKSwgJ3ByaW1hcnknKSwgLTEpO1xuXG4vKipcbiAqIE1hdGVyaWFsIGRlc2lnbiBzdHlsZWQgQ2hpcCBiYXNlIGNvbXBvbmVudC4gVXNlZCBpbnNpZGUgdGhlIE1hdENoaXBTZXQgY29tcG9uZW50LlxuICpcbiAqIEV4dGVuZGVkIGJ5IE1hdENoaXBPcHRpb24gYW5kIE1hdENoaXBSb3cgZm9yIGRpZmZlcmVudCBpbnRlcmFjdGlvbiBwYXR0ZXJucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWJhc2ljLWNoaXAsIG1hdC1jaGlwJyxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgZXhwb3J0QXM6ICdtYXRDaGlwJyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hpcHMuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtYmFzaWMtY2hpcF0nOiAnX2lzQmFzaWNDaGlwJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc3RhbmRhcmQtY2hpcF0nOiAnIV9pc0Jhc2ljQ2hpcCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbnNEaXNhYmxlZCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcCBleHRlbmRzIF9NYXRDaGlwTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2FuQ29sb3IsIENhbkRpc2FibGVSaXBwbGUsIEhhc1RhYkluZGV4LCBPbkRlc3Ryb3kge1xuICAvKiogVGhlIHJpcHBsZSBhbmltYXRpb24gY29uZmlndXJhdGlvbiB0byB1c2UgZm9yIHRoZSBjaGlwLiAqL1xuICByZWFkb25seSBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPSBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRztcblxuICAvKiogV2hldGhlciB0aGUgcmlwcGxlIGlzIGNlbnRlcmVkIG9uIHRoZSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNSaXBwbGVDZW50ZXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGZvY3VzZWQuICovXG4gIHJlYWRvbmx5IF9vbkZvY3VzID0gbmV3IFN1YmplY3Q8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGJsdXJyZWQuICovXG4gIHJlYWRvbmx5IF9vbkJsdXIgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgcmVhZG9ubHkgSEFORExFRF9LRVlTOiBTZXQ8bnVtYmVyPiA9IG5ldyBTZXQoW1NQQUNFLCBFTlRFUl0pO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgY2hpcCBpcyBhIGJhc2ljICh1bnN0eWxlZCkgY2hpcC4gKi9cbiAgcmVhZG9ubHkgX2lzQmFzaWNDaGlwOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGhhcyBmb2N1cy4gKi9cbiAgcHJvdGVjdGVkIF9oYXNGb2N1c0ludGVybmFsID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciBhbmltYXRpb25zIGZvciB0aGUgY2hpcCBhcmUgZW5hYmxlZC4gKi9cbiAgX2FuaW1hdGlvbnNEaXNhYmxlZDogYm9vbGVhbjtcblxuICAvLyBXZSBoYXZlIHRvIHVzZSBhIGBIb3N0TGlzdGVuZXJgIGhlcmUgaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIEl2eSBhbmQgVmlld0VuZ2luZS5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gIC8vIFZpZXdFbmdpbmUgdGhleSdyZSBvdmVyd3JpdHRlbi5cbiAgLy8gVE9ETyhtbWFsZXJiYSk6IHdlIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgIG9uY2UgSXZ5IGlzIHR1cm5lZCBvbiBieSBkZWZhdWx0LlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVUcmFuc2l0aW9uRW5kKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpIHtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2ZW50KTtcbiAgfVxuXG4gIGdldCBfaGFzRm9jdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWw7XG4gIH1cblxuICAvKiogRGVmYXVsdCB1bmlxdWUgaWQgZm9yIHRoZSBjaGlwLiAqL1xuICBwcml2YXRlIF91bmlxdWVJZCA9IGBtYXQtbWRjLWNoaXAtJHt1aWQrK31gO1xuXG4gIC8qKiBBIHVuaXF1ZSBpZCBmb3IgdGhlIGNoaXAuIElmIG5vbmUgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgYXV0by1nZW5lcmF0ZWQuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl91bmlxdWVJZDtcblxuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5yZW1vdmVJY29uKSB7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3RleHRFbGVtZW50ITogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgY2hpcC4gRGVmYXVsdHMgdG8gdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBtZGMtY2hpcF9fdGV4dCBlbGVtZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLl92YWx1ZVxuICAgICAgOiB0aGlzLl90ZXh0RWxlbWVudC50ZXh0Q29udGVudCEudHJpbSgpO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7IHRoaXMuX3ZhbHVlID0gdmFsdWU7IH1cbiAgcHJvdGVjdGVkIF92YWx1ZTogYW55O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlwIGRpc3BsYXlzIHRoZSByZW1vdmUgc3R5bGluZyBhbmQgZW1pdHMgKHJlbW92ZWQpIGV2ZW50cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZW1vdmFibGU7IH1cbiAgc2V0IHJlbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlbW92YWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9yZW1vdmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBDb2xvcnMgdGhlIGNoaXAgZm9yIGVtcGhhc2lzIGFzIGlmIGl0IHdlcmUgc2VsZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaGlnaGxpZ2h0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWdobGlnaHRlZDsgfVxuICBzZXQgaGlnaGxpZ2h0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWdobGlnaHRlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9oaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBAT3V0cHV0KCkgcmVtb3ZlSWNvbkludGVyYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgY2hpcC4gKi9cbiAgQE91dHB1dCgpIGludGVyYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBpcyBkZXN0cm95ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiBhIGNoaXAgaXMgdG8gYmUgcmVtb3ZlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlbW92ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIFRoZSBNREMgZm91bmRhdGlvbiBjb250YWluaW5nIGJ1c2luZXNzIGxvZ2ljIGZvciBNREMgY2hpcC4gKi9cbiAgX2NoaXBGb3VuZGF0aW9uOiBNRENDaGlwRm91bmRhdGlvbjtcblxuICAvKiogVGhlIHVuc3R5bGVkIGNoaXAgc2VsZWN0b3IgZm9yIHRoaXMgY29tcG9uZW50LiAqL1xuICBwcm90ZWN0ZWQgYmFzaWNDaGlwQXR0ck5hbWUgPSAnbWF0LWJhc2ljLWNoaXAnO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJvdGVjdGVkIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBUaGUgY2hpcCdzIGxlYWRpbmcgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRDaGlwQXZhdGFyKSBsZWFkaW5nSWNvbjogTWF0Q2hpcEF2YXRhcjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBUcmFpbGluZ0ljb24pIHRyYWlsaW5nSWNvbjogTWF0Q2hpcFRyYWlsaW5nSWNvbjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyByZW1vdmUgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRDaGlwUmVtb3ZlKSByZW1vdmVJY29uOiBNYXRDaGlwUmVtb3ZlO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1hdFJpcHBsZSBpbnN0YW5jZSBvZiB0aGUgY2hpcC4gKi9cbiAgQFZpZXdDaGlsZChNYXRSaXBwbGUpIHJpcHBsZTogTWF0UmlwcGxlO1xuXG4gLyoqXG4gICogSW1wbGVtZW50YXRpb24gb2YgdGhlIE1EQyBjaGlwIGFkYXB0ZXIgaW50ZXJmYWNlLlxuICAqIFRoZXNlIG1ldGhvZHMgYXJlIGNhbGxlZCBieSB0aGUgY2hpcCBmb3VuZGF0aW9uLlxuICAqL1xuICBwcm90ZWN0ZWQgX2NoaXBBZGFwdGVyOiBNRENDaGlwQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0TWRjQ2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5fc2V0TWRjQ2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICBhZGRDbGFzc1RvTGVhZGluZ0ljb246IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMubGVhZGluZ0ljb24uc2V0Q2xhc3MoY2xhc3NOYW1lLCB0cnVlKSxcbiAgICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbjogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBldmVudFRhcmdldEhhc0NsYXNzOlxuICAgICAgICAodGFyZ2V0OiBFdmVudFRhcmdldHxudWxsLCBjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGNsYXNzTGlzdGAsIGJlY2F1c2UgSUUgYW5kIEVkZ2UgZG9uJ3RcbiAgICAgICAgICAvLyBzdXBwb3J0IGl0IG9uIFNWRyBlbGVtZW50cyBhbmQgRWRnZSBzZWVtcyB0byB0aHJvdyBmb3IgcmlwcGxlXG4gICAgICAgICAgLy8gZWxlbWVudHMsIGJlY2F1c2UgdGhleSdyZSBvdXRzaWRlIHRoZSBET00uXG4gICAgICAgICAgcmV0dXJuICh0YXJnZXQgJiYgKHRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QpID9cbiAgICAgICAgICAgICAgKHRhcmdldCBhcyBFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6XG4gICAgICAgICAgICAgIGZhbHNlO1xuICAgICAgICB9LFxuICAgIG5vdGlmeUludGVyYWN0aW9uOiAoKSA9PiB0aGlzLl9ub3RpZnlJbnRlcmFjdGlvbigpLFxuICAgIG5vdGlmeVNlbGVjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIE5vLW9wLiBXZSBjYWxsIGRpc3BhdGNoU2VsZWN0aW9uRXZlbnQgb3Vyc2VsdmVzIGluIE1hdENoaXBPcHRpb24sXG4gICAgICAgICAgLy8gYmVjYXVzZSB3ZSB3YW50IHRvIHNwZWNpZnkgd2hldGhlciBzZWxlY3Rpb24gb2NjdXJyZWQgdmlhIHVzZXJcbiAgICAgICAgICAvLyBpbnB1dC5cbiAgICAgICAgfSxcbiAgICBub3RpZnlOYXZpZ2F0aW9uOiAoKSA9PiB0aGlzLl9ub3RpZnlOYXZpZ2F0aW9uKCksXG4gICAgbm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb246ICgpID0+XG4gICAgICAgIHRoaXMucmVtb3ZlSWNvbkludGVyYWN0aW9uLmVtaXQodGhpcy5pZCksXG4gICAgbm90aWZ5UmVtb3ZhbDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlZC5lbWl0KHtjaGlwOiB0aGlzfSk7XG5cbiAgICAgICAgICAvLyBXaGVuIE1EQyByZW1vdmVzIGEgY2hpcCBpdCBqdXN0IHRyYW5zaXRpb25zIGl0IHRvIGB3aWR0aDogMHB4YFxuICAgICAgICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgaXQncyBzdGlsbCBpbiB0aGUgRE9NIGFuZCBpdCdzIHN0aWxsIGZvY3VzYWJsZS5cbiAgICAgICAgICAvLyBNYWtlIGl0IGBkaXNwbGF5OiBub25lYCBzbyB1c2VycyBjYW4ndCB0YWIgaW50byBpdC5cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSxcbiAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6XG4gICAgICAgIHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBydW4gd2hlbiBhIGNoaXAgaXMgcmVtb3ZlZCBzbyBpdCBtaWdodCBiZVxuICAgICAgICAgIC8vIGludm9rZWQgZHVyaW5nIHNlcnZlci1zaWRlIHJlbmRlcmluZy4gQWRkIHNvbWUgZXh0cmEgY2hlY2tzIGp1c3QgaW5cbiAgICAgICAgICAvLyBjYXNlLlxuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cpIHtcbiAgICAgICAgICAgIGNvbnN0IGdldENvbXB1dGVkU3R5bGUgPVxuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSxcbiAgICBzZXRTdHlsZVByb3BlcnR5OlxuICAgICAgICAocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgaGFzTGVhZGluZ0ljb246ICgpID0+ICEhdGhpcy5sZWFkaW5nSWNvbixcbiAgICBpc1RyYWlsaW5nQWN0aW9uTmF2aWdhYmxlOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudHJhaWxpbmdJY29uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFpbGluZ0ljb24uaXNOYXZpZ2FibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgIGlzUlRMOiAoKSA9PiAhIXRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnLFxuICAgIGZvY3VzUHJpbWFyeUFjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIEFuZ3VsYXIgTWF0ZXJpYWwgTURDIGNoaXBzIGZ1bGx5IG1hbmFnZSBmb2N1cy4gVE9ETzogTWFuYWdpbmcgZm9jdXNcbiAgICAgICAgICAvLyBhbmQgaGFuZGxpbmcga2V5Ym9hcmQgZXZlbnRzIHdhcyBhZGRlZCBieSBNREMgYWZ0ZXIgb3VyXG4gICAgICAgICAgLy8gaW1wbGVtZW50YXRpb247IGNvbnNpZGVyIGNvbnNvbGlkYXRpbmcuXG4gICAgICAgIH0sXG4gICAgZm9jdXNUcmFpbGluZ0FjdGlvbjogKCkgPT4ge30sXG4gICAgcmVtb3ZlVHJhaWxpbmdBY3Rpb25Gb2N1czogKCkgPT4ge30sXG4gICAgc2V0UHJpbWFyeUFjdGlvbkF0dHI6XG4gICAgICAgIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAvLyBNREMgaXMgY3VycmVudGx5IHVzaW5nIHRoaXMgbWV0aG9kIHRvIHNldCBhcmlhLWNoZWNrZWQgb24gY2hvaWNlXG4gICAgICAgICAgLy8gYW5kIGZpbHRlciBjaGlwcywgd2hpY2ggaW4gdGhlIE1EQyB0ZW1wbGF0ZXMgaGF2ZSByb2xlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIC8vIGFuZCByb2xlPVwicmFkaW9cIiByZXNwZWN0aXZlbHkuIFdlIGhhdmUgcm9sZT1cIm9wdGlvblwiIG9uIHRob3NlIGNoaXBzXG4gICAgICAgICAgLy8gaW5zdGVhZCwgc28gd2UgZG8gbm90IHdhbnQgYXJpYS1jaGVja2VkLiBTaW5jZSB3ZSBhbHNvIG1hbmFnZSB0aGVcbiAgICAgICAgICAvLyB0YWJpbmRleCBvdXJzZWx2ZXMsIHdlIGRvbid0IGFsbG93IE1EQyB0byBzZXQgaXQuXG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdhcmlhLWNoZWNrZWQnIHx8IG5hbWUgPT09ICd0YWJpbmRleCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgLy8gVGhlIDIgZnVuY3Rpb25zIGJlbG93IGFyZSB1c2VkIGJ5IHRoZSBNREMgcmlwcGxlLCB3aGljaCB3ZSBhcmVuJ3QgdXNpbmcsXG4gICAgLy8gc28gdGhleSB3aWxsIG5ldmVyIGJlIGNhbGxlZFxuICAgIGdldFJvb3RCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICBnZXRDaGVja21hcmtCb3VuZGluZ0NsaWVudFJlY3Q6ICgpID0+IG51bGwsXG4gICAgZ2V0QXR0cmlidXRlOiAoYXR0cikgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBgYW5pbWF0aW9uTW9kZWAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBGb3VuZGF0aW9uKHRoaXMuX2NoaXBBZGFwdGVyKTtcbiAgICB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgPSBhbmltYXRpb25Nb2RlID09PSAnTm9vcEFuaW1hdGlvbnMnO1xuICAgIHRoaXMuX2lzQmFzaWNDaGlwID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUodGhpcy5iYXNpY0NoaXBBdHRyTmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2luaXRSZW1vdmVJY29uKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX3RleHRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtY2hpcF9fdGV4dCcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgdGhlIHJlbW92ZSBpY29uIGNoaXAgZm91bmRhdGlvbiwgYW5kIHN1YnNjcmliZXMgdG8gcmVtb3ZlIGljb24gZXZlbnRzLiAqL1xuICBfaW5pdFJlbW92ZUljb24oKSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uc2V0U2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGljayh0cnVlKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvUmVtb3ZlSWNvbkludGVyYWN0aW9uKCk7XG4gICAgICB0aGlzLnJlbW92ZUljb24uZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGludGVyYWN0aW9uIHdpdGggdGhlIHJlbW92ZSBpY29uLiAqL1xuICBfbGlzdGVuVG9SZW1vdmVJY29uSW50ZXJhY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVJY29uLmludGVyYWN0aW9uXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBUaGUgTURDIGNoaXAgZm91bmRhdGlvbiBjYWxscyBzdG9wUHJvcGFnYXRpb24oKSBmb3IgYW55IHRyYWlsaW5nIGljb24gaW50ZXJhY3Rpb25cbiAgICAgICAgICAvLyBldmVudCwgZXZlbiBvbmVzIGl0IGRvZXNuJ3QgaGFuZGxlLCBzbyB3ZSB3YW50IHRvIGF2b2lkIHBhc3NpbmcgaXQga2V5Ym9hcmQgZXZlbnRzXG4gICAgICAgICAgLy8gZm9yIHdoaWNoIHdlIGhhdmUgYSBjdXN0b20gaGFuZGxlci4gTm90ZSB0aGF0IHdlIGFzc2VydCB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgdXNpbmdcbiAgICAgICAgICAvLyB0aGUgYHR5cGVgLCBiZWNhdXNlIGBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnRgIGNhbiB0aHJvdyBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgICAgIGNvbnN0IGlzS2V5Ym9hcmRFdmVudCA9IGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgna2V5Jyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAoaXNLZXlib2FyZEV2ZW50ICYmXG4gICAgICAgICAgICAgICF0aGlzLkhBTkRMRURfS0VZUy5oYXMoKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGUpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYWlsaW5nQWN0aW9uSW50ZXJhY3Rpb24oKTtcblxuICAgICAgICAgIGlmIChpc0tleWJvYXJkRXZlbnQgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlID0gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGU7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBzcGFjZSBhbmQgZW50ZXIgcHJlc3NlcyBzbyB3ZSBkb24ndCBzY3JvbGwgdGhlIHBhZ2Ugb3Igc3VibWl0IGZvcm1zLlxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSBjaGlwLlxuICAgKlxuICAgKiBJbmZvcm1zIGFueSBsaXN0ZW5lcnMgb2YgdGhlIHJlbW92YWwgcmVxdWVzdC4gRG9lcyBub3QgcmVtb3ZlIHRoZSBjaGlwIGZyb20gdGhlIERPTS5cbiAgICovXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZW1vdmFibGUpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmJlZ2luRXhpdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgTURDIGNoaXAuICovXG4gIHByaXZhdGUgX3NldE1kY0NsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgICBhY3RpdmUgPyBjbGFzc2VzLmFkZChjc3NDbGFzcykgOiBjbGFzc2VzLnJlbW92ZShjc3NDbGFzcyk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBGb3J3YXJkcyBpbnRlcmFjdGlvbiBldmVudHMgdG8gdGhlIE1EQyBjaGlwIGZvdW5kYXRpb24uICovXG4gIF9oYW5kbGVJbnRlcmFjdGlvbihldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVDbGljaygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZUtleWRvd24oZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBfaXNSaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5fYW5pbWF0aW9uc0Rpc2FibGVkIHx8IHRoaXMuX2lzQmFzaWNDaGlwO1xuICB9XG5cbiAgX25vdGlmeUludGVyYWN0aW9uKCkge1xuICAgIHRoaXMuaW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKTtcbiAgfVxuXG4gIF9ub3RpZnlOYXZpZ2F0aW9uKCkge1xuICAgIC8vIFRPRE86IFRoaXMgaXMgYSBuZXcgZmVhdHVyZSBhZGRlZCBieSBNREMuIENvbnNpZGVyIGV4cG9zaW5nIGl0IHRvIHVzZXJzXG4gICAgLy8gaW4gdGhlIGZ1dHVyZS5cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVtb3ZhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWdobGlnaHRlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuIl19