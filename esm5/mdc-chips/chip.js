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
        _this.HANDLED_KEYS = [];
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
                _this.HANDLED_KEYS.indexOf(event.keyCode) !== -1)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBR0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQU9MLFNBQVMsRUFDVCxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGFBQWEsR0FFZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFHL0UsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFD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aUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXRHQyxpQkFBaUI7Z0JBR2pCLFVBQVU7Z0JBS1YsTUFBTTtnQkFoQkEsY0FBYyx1QkF5VWYsUUFBUTs2Q0FFUixRQUFRLFlBQUksTUFBTSxTQUFDLHFCQUFxQjs7O3VDQTlMNUMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkFheEMsS0FBSzsyQkFHTCxLQUFLO3dCQWFMLEtBQUs7NEJBWUwsS0FBSzs4QkFVTCxLQUFLO3dDQVFMLE1BQU07OEJBR04sTUFBTTs0QkFHTixNQUFNOzBCQUdOLE1BQU07OEJBWU4sWUFBWSxTQUFDLGFBQWE7K0JBRzFCLFlBQVksU0FBQyxtQkFBbUI7NkJBR2hDLFlBQVksU0FBQyxhQUFhO3lCQUcxQixTQUFTLFNBQUMsU0FBUzs7SUF3TnRCLGNBQUM7Q0FBQSxBQXBXRCxDQXFCNkIsaUJBQWlCLEdBK1U3QztTQS9VWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkNvbG9yLFxuICBDYW5Db2xvckN0b3IsXG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yLFxuICBIYXNUYWJJbmRleCxcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBNYXRSaXBwbGUsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZVJpcHBsZSxcbiAgbWl4aW5UYWJJbmRleCxcbiAgUmlwcGxlQW5pbWF0aW9uQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TURDQ2hpcEFkYXB0ZXIsIE1EQ0NoaXBGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtudW1iZXJzfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlJztcbmltcG9ydCB7U1BBQ0UsIEVOVEVSLCBoYXNNb2RpZmllcktleX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRDaGlwQXZhdGFyLCBNYXRDaGlwVHJhaWxpbmdJY29uLCBNYXRDaGlwUmVtb3ZlfSBmcm9tICcuL2NoaXAtaWNvbnMnO1xuXG5cbmxldCB1aWQgPSAwO1xuXG4vKiogUmVwcmVzZW50cyBhbiBldmVudCBmaXJlZCBvbiBhbiBpbmRpdmlkdWFsIGBtYXQtY2hpcGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdENoaXBFdmVudCB7XG4gIC8qKiBUaGUgY2hpcCB0aGUgZXZlbnQgd2FzIGZpcmVkIG9uLiAqL1xuICBjaGlwOiBNYXRDaGlwO1xufVxuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgdGhlIHJpcHBsZSBhbmltYXRpb24uICovXG5jb25zdCBSSVBQTEVfQU5JTUFUSU9OX0NPTkZJRzogUmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TXG59O1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgTURDIENTUyB0byBub24tYmFzaWMgY2hpcHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG1hdC1jaGlwLCBtYXQtY2hpcC1vcHRpb24sIG1hdC1jaGlwLXJvdywgW21hdC1jaGlwXSwgW21hdC1jaGlwLW9wdGlvbl0sXG4gICAgW21hdC1jaGlwLXJvd11gLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtY2hpcCBtZGMtY2hpcCd9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBDc3NJbnRlcm5hbE9ubHkgeyB9XG5cbi8qKlxuICogQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGlwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jbGFzcyBNYXRDaGlwQmFzZSB7XG4gIGRpc2FibGVkITogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG5jb25zdCBfTWF0Q2hpcE1peGluQmFzZTpcbiAgQ2FuQ29sb3JDdG9yICZcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJlxuICBIYXNUYWJJbmRleEN0b3IgJlxuICB0eXBlb2YgTWF0Q2hpcEJhc2UgPVxuICAgIG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihtaXhpbkRpc2FibGVSaXBwbGUoTWF0Q2hpcEJhc2UpLCAncHJpbWFyeScpLCAtMSk7XG5cbi8qKlxuICogTWF0ZXJpYWwgZGVzaWduIHN0eWxlZCBDaGlwIGJhc2UgY29tcG9uZW50LiBVc2VkIGluc2lkZSB0aGUgTWF0Q2hpcFNldCBjb21wb25lbnQuXG4gKlxuICogRXh0ZW5kZWQgYnkgTWF0Q2hpcE9wdGlvbiBhbmQgTWF0Q2hpcFJvdyBmb3IgZGlmZmVyZW50IGludGVyYWN0aW9uIHBhdHRlcm5zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtYmFzaWMtY2hpcCwgbWF0LWNoaXAnLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZSddLFxuICBleHBvcnRBczogJ21hdENoaXAnLFxuICB0ZW1wbGF0ZVVybDogJ2NoaXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtaGlnaGxpZ2h0ZWRdJzogJ2hpZ2hsaWdodGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLWF2YXRhcl0nOiAnbGVhZGluZ0ljb24nLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICdbY2xhc3MubWF0LW1kYy1iYXNpYy1jaGlwXSc6ICdfaXNCYXNpY0NoaXAnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zdGFuZGFyZC1jaGlwXSc6ICchX2lzQmFzaWNDaGlwJyxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uc0Rpc2FibGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwIGV4dGVuZHMgX01hdENoaXBNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSwgSGFzVGFiSW5kZXgsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgcmlwcGxlIGFuaW1hdGlvbiBjb25maWd1cmF0aW9uIHRvIHVzZSBmb3IgdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9yaXBwbGVBbmltYXRpb246IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgaXMgY2VudGVyZWQgb24gdGhlIGNoaXAuICovXG4gIHJlYWRvbmx5IF9pc1JpcHBsZUNlbnRlcmVkID0gZmFsc2U7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgZm9jdXNlZC4gKi9cbiAgcmVhZG9ubHkgX29uRm9jdXMgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgYmx1cnJlZC4gKi9cbiAgcmVhZG9ubHkgX29uQmx1ciA9IG5ldyBTdWJqZWN0PE1hdENoaXBFdmVudD4oKTtcblxuICByZWFkb25seSBIQU5ETEVEX0tFWVM6IG51bWJlcltdID0gW107XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBjaGlwIGlzIGEgYmFzaWMgKHVuc3R5bGVkKSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNCYXNpY0NoaXA6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaGFzIGZvY3VzLiAqL1xuICBwcm90ZWN0ZWQgX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgZm9yIHRoZSBjaGlwIGFyZSBlbmFibGVkLiAqL1xuICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8vIFdlIGhhdmUgdG8gdXNlIGEgYEhvc3RMaXN0ZW5lcmAgaGVyZSBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggSXZ5IGFuZCBWaWV3RW5naW5lLlxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBiaW5kaW5ncyB3aWxsIGJlIG1lcmdlZCB3aGVuIHRoaXMgY2xhc3MgaXMgZXh0ZW5kZWQsIHdoZXJlYXMgaW5cbiAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAvLyBUT0RPKG1tYWxlcmJhKTogd2UgbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAgb25jZSBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkge1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQpO1xuICB9XG5cbiAgZ2V0IF9oYXNGb2N1cygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRm9jdXNJbnRlcm5hbDtcbiAgfVxuXG4gIC8qKiBEZWZhdWx0IHVuaXF1ZSBpZCBmb3IgdGhlIGNoaXAuICovXG4gIHByaXZhdGUgX3VuaXF1ZUlkID0gYG1hdC1tZGMtY2hpcC0ke3VpZCsrfWA7XG5cbiAgLyoqIEEgdW5pcXVlIGlkIGZvciB0aGUgY2hpcC4gSWYgbm9uZSBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3VuaXF1ZUlkO1xuXG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdGV4dEVsZW1lbnQhOiBIVE1MRWxlbWVudDtcblxuICAvKiogVGhlIHZhbHVlIG9mIHRoZSBjaGlwLiBEZWZhdWx0cyB0byB0aGUgY29udGVudCBpbnNpZGUgdGhlIG1kYy1jaGlwX190ZXh0IGVsZW1lbnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHRoaXMuX3ZhbHVlXG4gICAgICA6IHRoaXMuX3RleHRFbGVtZW50LnRleHRDb250ZW50IS50cmltKCk7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHsgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgfVxuICBwcm90ZWN0ZWQgX3ZhbHVlOiBhbnk7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNoaXAgZGlzcGxheXMgdGhlIHJlbW92ZSBzdHlsaW5nIGFuZCBlbWl0cyAocmVtb3ZlZCkgZXZlbnRzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlbW92YWJsZTsgfVxuICBzZXQgcmVtb3ZhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENvbG9ycyB0aGUgY2hpcCBmb3IgZW1waGFzaXMgYXMgaWYgaXQgd2VyZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBoaWdobGlnaHRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodGVkOyB9XG4gIHNldCBoaWdobGlnaHRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZ2hsaWdodGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2hpZ2hsaWdodGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgcmVtb3ZlIGljb24uICovXG4gIEBPdXRwdXQoKSByZW1vdmVJY29uSW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBjaGlwLiAqL1xuICBAT3V0cHV0KCkgaW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIGRlc3Ryb3llZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSByZW1vdmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogVGhlIE1EQyBmb3VuZGF0aW9uIGNvbnRhaW5pbmcgYnVzaW5lc3MgbG9naWMgZm9yIE1EQyBjaGlwLiAqL1xuICBfY2hpcEZvdW5kYXRpb246IE1EQ0NoaXBGb3VuZGF0aW9uO1xuXG4gIC8qKiBUaGUgdW5zdHlsZWQgY2hpcCBzZWxlY3RvciBmb3IgdGhpcyBjb21wb25lbnQuICovXG4gIHByb3RlY3RlZCBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcCc7XG5cbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcm90ZWN0ZWQgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFRoZSBjaGlwJ3MgbGVhZGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBBdmF0YXIpIGxlYWRpbmdJY29uOiBNYXRDaGlwQXZhdGFyO1xuXG4gIC8qKiBUaGUgY2hpcCdzIHRyYWlsaW5nIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTWF0Q2hpcFRyYWlsaW5nSWNvbikgdHJhaWxpbmdJY29uOiBNYXRDaGlwVHJhaWxpbmdJY29uO1xuXG4gIC8qKiBUaGUgY2hpcCdzIHRyYWlsaW5nIHJlbW92ZSBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBSZW1vdmUpIHJlbW92ZUljb246IE1hdENoaXBSZW1vdmU7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBjaGlwLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAvKipcbiAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgTURDIGNoaXAgYWRhcHRlciBpbnRlcmZhY2UuXG4gICogVGhlc2UgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IHRoZSBjaGlwIGZvdW5kYXRpb24uXG4gICovXG4gIHByb3RlY3RlZCBfY2hpcEFkYXB0ZXI6IE1EQ0NoaXBBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9zZXRNZGNDbGFzcyhjbGFzc05hbWUsIGZhbHNlKSxcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgIGFkZENsYXNzVG9MZWFkaW5nSWNvbjogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy5sZWFkaW5nSWNvbi5zZXRDbGFzcyhjbGFzc05hbWUsIHRydWUpLFxuICAgIHJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PlxuICAgICAgICB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6XG4gICAgICAgICh0YXJnZXQ6IEV2ZW50VGFyZ2V0fG51bGwsIGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBudWxsIGNoZWNrIHRoZSBgY2xhc3NMaXN0YCwgYmVjYXVzZSBJRSBhbmQgRWRnZSBkb24ndFxuICAgICAgICAgIC8vIHN1cHBvcnQgaXQgb24gU1ZHIGVsZW1lbnRzIGFuZCBFZGdlIHNlZW1zIHRvIHRocm93IGZvciByaXBwbGVcbiAgICAgICAgICAvLyBlbGVtZW50cywgYmVjYXVzZSB0aGV5J3JlIG91dHNpZGUgdGhlIERPTS5cbiAgICAgICAgICByZXR1cm4gKHRhcmdldCAmJiAodGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdCkgP1xuICAgICAgICAgICAgICAodGFyZ2V0IGFzIEVsZW1lbnQpLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpIDpcbiAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgIH0sXG4gICAgbm90aWZ5SW50ZXJhY3Rpb246ICgpID0+IHRoaXMuX25vdGlmeUludGVyYWN0aW9uKCksXG4gICAgbm90aWZ5U2VsZWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gTm8tb3AuIFdlIGNhbGwgZGlzcGF0Y2hTZWxlY3Rpb25FdmVudCBvdXJzZWx2ZXMgaW4gTWF0Q2hpcE9wdGlvbixcbiAgICAgICAgICAvLyBiZWNhdXNlIHdlIHdhbnQgdG8gc3BlY2lmeSB3aGV0aGVyIHNlbGVjdGlvbiBvY2N1cnJlZCB2aWEgdXNlclxuICAgICAgICAgIC8vIGlucHV0LlxuICAgICAgICB9LFxuICAgIG5vdGlmeU5hdmlnYXRpb246ICgpID0+IHRoaXMuX25vdGlmeU5hdmlnYXRpb24oKSxcbiAgICBub3RpZnlUcmFpbGluZ0ljb25JbnRlcmFjdGlvbjogKCkgPT5cbiAgICAgICAgdGhpcy5yZW1vdmVJY29uSW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKSxcbiAgICBub3RpZnlSZW1vdmFsOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoe2NoaXA6IHRoaXN9KTtcblxuICAgICAgICAgIC8vIFdoZW4gTURDIHJlbW92ZXMgYSBjaGlwIGl0IGp1c3QgdHJhbnNpdGlvbnMgaXQgdG8gYHdpZHRoOiAwcHhgXG4gICAgICAgICAgLy8gd2hpY2ggbWVhbnMgdGhhdCBpdCdzIHN0aWxsIGluIHRoZSBET00gYW5kIGl0J3Mgc3RpbGwgZm9jdXNhYmxlLlxuICAgICAgICAgIC8vIE1ha2UgaXQgYGRpc3BsYXk6IG5vbmVgIHNvIHVzZXJzIGNhbid0IHRhYiBpbnRvIGl0LlxuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9LFxuICAgIGdldENvbXB1dGVkU3R5bGVWYWx1ZTpcbiAgICAgICAgcHJvcGVydHlOYW1lID0+IHtcbiAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHJ1biB3aGVuIGEgY2hpcCBpcyByZW1vdmVkIHNvIGl0IG1pZ2h0IGJlXG4gICAgICAgICAgLy8gaW52b2tlZCBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLiBBZGQgc29tZSBleHRyYSBjaGVja3MganVzdCBpblxuICAgICAgICAgIC8vIGNhc2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdykge1xuICAgICAgICAgICAgY29uc3QgZ2V0Q29tcHV0ZWRTdHlsZSA9XG4gICAgICAgICAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9LFxuICAgIHNldFN0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBoYXNMZWFkaW5nSWNvbjogKCkgPT4gISF0aGlzLmxlYWRpbmdJY29uLFxuICAgIGlzVHJhaWxpbmdBY3Rpb25OYXZpZ2FibGU6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy50cmFpbGluZ0ljb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWlsaW5nSWNvbi5pc05hdmlnYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgaXNSVEw6ICgpID0+ICEhdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcsXG4gICAgZm9jdXNQcmltYXJ5QWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gQW5ndWxhciBNYXRlcmlhbCBNREMgY2hpcHMgZnVsbHkgbWFuYWdlIGZvY3VzLiBUT0RPOiBNYW5hZ2luZyBmb2N1c1xuICAgICAgICAgIC8vIGFuZCBoYW5kbGluZyBrZXlib2FyZCBldmVudHMgd2FzIGFkZGVkIGJ5IE1EQyBhZnRlciBvdXJcbiAgICAgICAgICAvLyBpbXBsZW1lbnRhdGlvbjsgY29uc2lkZXIgY29uc29saWRhdGluZy5cbiAgICAgICAgfSxcbiAgICBmb2N1c1RyYWlsaW5nQWN0aW9uOiAoKSA9PiB7fSxcbiAgICByZW1vdmVUcmFpbGluZ0FjdGlvbkZvY3VzOiAoKSA9PiB7fSxcbiAgICBzZXRQcmltYXJ5QWN0aW9uQXR0cjpcbiAgICAgICAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIE1EQyBpcyBjdXJyZW50bHkgdXNpbmcgdGhpcyBtZXRob2QgdG8gc2V0IGFyaWEtY2hlY2tlZCBvbiBjaG9pY2VcbiAgICAgICAgICAvLyBhbmQgZmlsdGVyIGNoaXBzLCB3aGljaCBpbiB0aGUgTURDIHRlbXBsYXRlcyBoYXZlIHJvbGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgLy8gYW5kIHJvbGU9XCJyYWRpb1wiIHJlc3BlY3RpdmVseS4gV2UgaGF2ZSByb2xlPVwib3B0aW9uXCIgb24gdGhvc2UgY2hpcHNcbiAgICAgICAgICAvLyBpbnN0ZWFkLCBzbyB3ZSBkbyBub3Qgd2FudCBhcmlhLWNoZWNrZWQuIFNpbmNlIHdlIGFsc28gbWFuYWdlIHRoZVxuICAgICAgICAgIC8vIHRhYmluZGV4IG91cnNlbHZlcywgd2UgZG9uJ3QgYWxsb3cgTURDIHRvIHNldCBpdC5cbiAgICAgICAgICBpZiAobmFtZSA9PT0gJ2FyaWEtY2hlY2tlZCcgfHwgbmFtZSA9PT0gJ3RhYmluZGV4Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAvLyBUaGUgMiBmdW5jdGlvbnMgYmVsb3cgYXJlIHVzZWQgYnkgdGhlIE1EQyByaXBwbGUsIHdoaWNoIHdlIGFyZW4ndCB1c2luZyxcbiAgICAvLyBzbyB0aGV5IHdpbGwgbmV2ZXIgYmUgY2FsbGVkXG4gICAgZ2V0Um9vdEJvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGdldENoZWNrbWFya0JvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4gbnVsbCxcbiAgICBnZXRBdHRyaWJ1dGU6IChhdHRyKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICByZWFkb25seSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIGBhbmltYXRpb25Nb2RlYCBwYXJhbWV0ZXIgdG8gYmVjb21lIHJlcXVpcmVkLlxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcEZvdW5kYXRpb24odGhpcy5fY2hpcEFkYXB0ZXIpO1xuICAgIHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgdGhpcy5faXNCYXNpY0NoaXAgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSh0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuYmFzaWNDaGlwQXR0ck5hbWU7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5faW5pdFJlbW92ZUljb24oKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5pbml0KCk7XG4gICAgdGhpcy5fdGV4dEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1jaGlwX190ZXh0Jyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5lbWl0KHtjaGlwOiB0aGlzfSk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICAvKiogU2V0cyB1cCB0aGUgcmVtb3ZlIGljb24gY2hpcCBmb3VuZGF0aW9uLCBhbmQgc3Vic2NyaWJlcyB0byByZW1vdmUgaWNvbiBldmVudHMuICovXG4gIF9pbml0UmVtb3ZlSWNvbigpIHtcbiAgICBpZiAodGhpcy5yZW1vdmVJY29uKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5zZXRTaG91bGRSZW1vdmVPblRyYWlsaW5nSWNvbkNsaWNrKHRydWUpO1xuICAgICAgdGhpcy5fbGlzdGVuVG9SZW1vdmVJY29uSW50ZXJhY3Rpb24oKTtcbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgcmVtb3ZlIGljb24uICovXG4gIF9saXN0ZW5Ub1JlbW92ZUljb25JbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUljb24uaW50ZXJhY3Rpb25cbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgIC8vIFRoZSBNREMgY2hpcCBmb3VuZGF0aW9uIGNhbGxzIHN0b3BQcm9wYWdhdGlvbigpIGZvciBhbnkgdHJhaWxpbmcgaWNvbiBpbnRlcmFjdGlvblxuICAgICAgICAgIC8vIGV2ZW50LCBldmVuIG9uZXMgaXQgZG9lc24ndCBoYW5kbGUsIHNvIHdlIHdhbnQgdG8gYXZvaWQgcGFzc2luZyBpdCBrZXlib2FyZCBldmVudHNcbiAgICAgICAgICAvLyBmb3Igd2hpY2ggd2UgaGF2ZSBhIGN1c3RvbSBoYW5kbGVyLiBOb3RlIHRoYXQgd2UgYXNzZXJ0IHRoZSB0eXBlIG9mIHRoZSBldmVudCB1c2luZ1xuICAgICAgICAgIC8vIHRoZSBgdHlwZWAsIGJlY2F1c2UgYGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudGAgY2FuIHRocm93IGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgICAgICAgY29uc3QgaXNLZXlib2FyZEV2ZW50ID0gZXZlbnQudHlwZS5zdGFydHNXaXRoKCdrZXknKTtcblxuICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IChpc0tleWJvYXJkRXZlbnQgJiZcbiAgICAgICAgICAgICAgdGhpcy5IQU5ETEVEX0tFWVMuaW5kZXhPZigoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkua2V5Q29kZSkgIT09IC0xKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYWlsaW5nQWN0aW9uSW50ZXJhY3Rpb24oKTtcblxuICAgICAgICAgIGlmIChpc0tleWJvYXJkRXZlbnQgJiYgIWhhc01vZGlmaWVyS2V5KGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlID0gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGU7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBzcGFjZSBhbmQgZW50ZXIgcHJlc3NlcyBzbyB3ZSBkb24ndCBzY3JvbGwgdGhlIHBhZ2Ugb3Igc3VibWl0IGZvcm1zLlxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyByZW1vdmFsIG9mIHRoZSBjaGlwLlxuICAgKlxuICAgKiBJbmZvcm1zIGFueSBsaXN0ZW5lcnMgb2YgdGhlIHJlbW92YWwgcmVxdWVzdC4gRG9lcyBub3QgcmVtb3ZlIHRoZSBjaGlwIGZyb20gdGhlIERPTS5cbiAgICovXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZW1vdmFibGUpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmJlZ2luRXhpdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgTURDIGNoaXAuICovXG4gIHByaXZhdGUgX3NldE1kY0NsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgICBhY3RpdmUgPyBjbGFzc2VzLmFkZChjc3NDbGFzcykgOiBjbGFzc2VzLnJlbW92ZShjc3NDbGFzcyk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBGb3J3YXJkcyBpbnRlcmFjdGlvbiBldmVudHMgdG8gdGhlIE1EQyBjaGlwIGZvdW5kYXRpb24uICovXG4gIF9oYW5kbGVJbnRlcmFjdGlvbihldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICB0aGlzLl9jaGlwRm91bmRhdGlvbi5oYW5kbGVDbGljaygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZUtleWRvd24oZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBfaXNSaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5fYW5pbWF0aW9uc0Rpc2FibGVkIHx8IHRoaXMuX2lzQmFzaWNDaGlwO1xuICB9XG5cbiAgX25vdGlmeUludGVyYWN0aW9uKCkge1xuICAgIHRoaXMuaW50ZXJhY3Rpb24uZW1pdCh0aGlzLmlkKTtcbiAgfVxuXG4gIF9ub3RpZnlOYXZpZ2F0aW9uKCkge1xuICAgIC8vIFRPRE86IFRoaXMgaXMgYSBuZXcgZmVhdHVyZSBhZGRlZCBieSBNREMuIENvbnNpZGVyIGV4cG9zaW5nIGl0IHRvIHVzZXJzXG4gICAgLy8gaW4gdGhlIGZ1dHVyZS5cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVtb3ZhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWdobGlnaHRlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuIl19