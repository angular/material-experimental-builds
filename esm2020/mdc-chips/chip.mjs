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
import { MatRipple, MAT_RIPPLE_GLOBAL_OPTIONS, mixinColor, mixinDisableRipple, mixinTabIndex, } from '@angular/material-experimental/mdc-core';
import { deprecated } from '@material/chips';
import { SPACE, ENTER, hasModifierKey } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatChipAvatar, MatChipTrailingIcon, MatChipRemove, MAT_CHIP_AVATAR, MAT_CHIP_TRAILING_ICON, MAT_CHIP_REMOVE } from './chip-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/material-experimental/mdc-core";
let uid = 0;
/**
 * Directive to add MDC CSS to non-basic chips.
 * @docs-private
 */
export class MatChipCssInternalOnly {
}
MatChipCssInternalOnly.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChipCssInternalOnly, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatChipCssInternalOnly.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatChipCssInternalOnly, selector: "mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],\n    [mat-chip-row]", host: { classAttribute: "mat-mdc-chip mdc-chip" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChipCssInternalOnly, decorators: [{
            type: Directive,
            args: [{
                    selector: `mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],
    [mat-chip-row]`,
                    host: { 'class': 'mat-mdc-chip mdc-chip' }
                }]
        }] });
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
export class MatChip extends _MatChipMixinBase {
    constructor(_changeDetectorRef, elementRef, _ngZone, _dir, animationMode, _globalRippleOptions) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._globalRippleOptions = _globalRippleOptions;
        /** Whether the ripple is centered on the chip. */
        this._isRippleCentered = false;
        /** Emits when the chip is focused. */
        this._onFocus = new Subject();
        /** Emits when the chip is blurred. */
        this._onBlur = new Subject();
        this.REMOVE_ICON_HANDLED_KEYS = new Set([SPACE, ENTER]);
        /** Whether the chip has focus. */
        this._hasFocusInternal = false;
        /** Default unique id for the chip. */
        this._uniqueId = `mat-mdc-chip-${uid++}`;
        /** A unique id for the chip. If none is supplied, it will be auto-generated. */
        this.id = this._uniqueId;
        this._disabled = false;
        this._removable = true;
        this._highlighted = false;
        /** Emitted when the user interacts with the chip. */
        this.interaction = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        this.destroyed = new EventEmitter();
        /** Emitted when a chip is to be removed. */
        this.removed = new EventEmitter();
        /** The unstyled chip selector for this component. */
        this.basicChipAttrName = 'mat-basic-chip';
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
            notifyTrailingIconInteraction: () => { },
            notifyRemoval: () => this.remove(),
            notifyEditStart: () => {
                this._onEditStart();
                this._changeDetectorRef.markForCheck();
            },
            notifyEditFinish: () => {
                this._onEditFinish();
                this._changeDetectorRef.markForCheck();
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
        this._chipFoundation = new deprecated.MDCChipFoundation(this._chipAdapter);
        this._animationsDisabled = animationMode === 'NoopAnimations';
        this._isBasicChip = elementRef.nativeElement.hasAttribute(this.basicChipAttrName) ||
            elementRef.nativeElement.tagName.toLowerCase() === this.basicChipAttrName;
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    _handleTransitionEnd(event) {
        this._chipFoundation.handleTransitionEnd(event);
    }
    _hasFocus() {
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
        this._chipFoundation.destroy();
    }
    /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
    _initRemoveIcon() {
        if (this.removeIcon) {
            this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
            this.removeIcon.disabled = this.disabled;
            this.removeIcon.interaction
                .pipe(takeUntil(this.destroyed))
                .subscribe(event => {
                // The MDC chip foundation calls stopPropagation() for any trailing icon interaction
                // event, even ones it doesn't handle, so we want to avoid passing it keyboard events
                // for which we have a custom handler. Note that we assert the type of the event using
                // the `type`, because `instanceof KeyboardEvent` can throw during server-side rendering.
                const isKeyboardEvent = event.type.startsWith('key');
                if (this.disabled || (isKeyboardEvent &&
                    !this.REMOVE_ICON_HANDLED_KEYS.has(event.keyCode))) {
                    return;
                }
                this.remove();
                if (isKeyboardEvent && !hasModifierKey(event)) {
                    const keyCode = event.keyCode;
                    // Prevent default space and enter presses so we don't scroll the page or submit forms.
                    if (keyCode === SPACE || keyCode === ENTER) {
                        event.preventDefault();
                    }
                }
            });
        }
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
    /** Forwards interaction events to the MDC chip foundation. */
    _handleInteraction(event) {
        if (this.disabled) {
            return;
        }
        if (event.type === 'click') {
            this._chipFoundation.handleClick();
            return;
        }
        if (event.type === 'dblclick') {
            this._chipFoundation.handleDoubleClick();
        }
        if (event.type === 'keydown') {
            this._chipFoundation.handleKeydown(event);
            return;
        }
        if (event.type === 'focusout') {
            this._chipFoundation.handleFocusOut(event);
        }
        if (event.type === 'focusin') {
            this._chipFoundation.handleFocusIn(event);
        }
    }
    /** Whether or not the ripple should be disabled. */
    _isRippleDisabled() {
        return this.disabled || this.disableRipple || this._animationsDisabled ||
            this._isBasicChip || !!this._globalRippleOptions?.disabled;
    }
    _notifyInteraction() {
        this.interaction.emit(this.id);
    }
    _notifyNavigation() {
        // TODO: This is a new feature added by MDC. Consider exposing it to users
        // in the future.
    }
    /** Overridden by MatChipRow. */
    _onEditStart() { }
    /** Overridden by MatChipRow. */
    _onEditFinish() { }
}
MatChip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChip, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.Directionality, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatChip.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatChip, selector: "mat-basic-chip, mat-chip", inputs: { color: "color", disableRipple: "disableRipple", id: "id", disabled: "disabled", value: "value", removable: "removable", highlighted: "highlighted" }, outputs: { interaction: "interaction", destroyed: "destroyed", removed: "removed" }, host: { listeners: { "transitionend": "_handleTransitionEnd($event)" }, properties: { "class.mat-mdc-chip-disabled": "disabled", "class.mat-mdc-chip-highlighted": "highlighted", "class.mat-mdc-chip-with-avatar": "leadingIcon", "class.mat-mdc-chip-with-trailing-icon": "trailingIcon || removeIcon", "class.mat-mdc-basic-chip": "_isBasicChip", "class.mat-mdc-standard-chip": "!_isBasicChip", "class._mat-animation-noopable": "_animationsDisabled", "id": "id", "attr.disabled": "disabled || null", "attr.aria-disabled": "disabled.toString()" } }, queries: [{ propertyName: "leadingIcon", first: true, predicate: MAT_CHIP_AVATAR, descendants: true }, { propertyName: "trailingIcon", first: true, predicate: MAT_CHIP_TRAILING_ICON, descendants: true }, { propertyName: "removeIcon", first: true, predicate: MAT_CHIP_REMOVE, descendants: true }], viewQueries: [{ propertyName: "ripple", first: true, predicate: MatRipple, descendants: true }], exportAs: ["matChip"], usesInheritance: true, ngImport: i0, template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__primary-action\">\n  <div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n</div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n", styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"], directives: [{ type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChip, decorators: [{
            type: Component,
            args: [{ selector: 'mat-basic-chip, mat-chip', inputs: ['color', 'disableRipple'], exportAs: 'matChip', host: {
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
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"mdc-chip__ripple\"></span>\n\n<span matRipple class=\"mat-mdc-chip-ripple\"\n     [matRippleDisabled]=\"_isRippleDisabled()\"\n     [matRippleCentered]=\"_isRippleCentered\"\n     [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n\n<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n<div class=\"mdc-chip__primary-action\">\n  <div class=\"mdc-chip__text\"><ng-content></ng-content></div>\n</div>\n<ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>\n", styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.Directionality, decorators: [{
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
                }] }]; }, propDecorators: { _handleTransitionEnd: [{
                type: HostListener,
                args: ['transitionend', ['$event']]
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], removable: [{
                type: Input
            }], highlighted: [{
                type: Input
            }], interaction: [{
                type: Output
            }], destroyed: [{
                type: Output
            }], removed: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFHTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBS0wsU0FBUyxFQUNULHlCQUF5QixFQUN6QixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLGFBQWEsR0FFZCxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsZUFBZSxFQUNmLHNCQUFzQixFQUFFLGVB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QkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLHNCQUFzQixFQUFFLHFCQUFxQjtxQkFDOUMsaUJBQ2MsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs7MEJBb04xQyxRQUFROzswQkFDUixRQUFROzswQkFBSSxNQUFNOzJCQUFDLHFCQUFxQjs7MEJBQ3hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMseUJBQXlCOzRDQXhMakQsb0JBQW9CO3NCQURuQixZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFhaEMsRUFBRTtzQkFBVixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSztnQkFjRixLQUFLO3NCQURSLEtBQUs7Z0JBYUYsU0FBUztzQkFEWixLQUFLO2dCQVdGLFdBQVc7c0JBRGQsS0FBSztnQkFRYSxXQUFXO3NCQUE3QixNQUFNO2dCQUdZLFNBQVM7c0JBQTNCLE1BQU07Z0JBR1ksT0FBTztzQkFBekIsTUFBTTtnQkFTd0IsV0FBVztzQkFBekMsWUFBWTt1QkFBQyxlQUFlO2dCQUdTLFlBQVk7c0JBQWpELFlBQVk7dUJBQUMsc0JBQXNCO2dCQUdMLFVBQVU7c0JBQXhDLFlBQVk7dUJBQUMsZUFBZTtnQkFHUCxNQUFNO3NCQUEzQixTQUFTO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgTnVtYmVySW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkNvbG9yLFxuICBDYW5EaXNhYmxlLFxuICBDYW5EaXNhYmxlUmlwcGxlLFxuICBIYXNUYWJJbmRleCxcbiAgTWF0UmlwcGxlLFxuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIG1peGluVGFiSW5kZXgsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge2RlcHJlY2F0ZWR9IGZyb20gJ0BtYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge1NQQUNFLCBFTlRFUiwgaGFzTW9kaWZpZXJLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIE1hdENoaXBBdmF0YXIsXG4gIE1hdENoaXBUcmFpbGluZ0ljb24sXG4gIE1hdENoaXBSZW1vdmUsXG4gIE1BVF9DSElQX0FWQVRBUixcbiAgTUFUX0NISVBfVFJBSUxJTkdfSUNPTiwgTUFUX0NISVBfUkVNT1ZFXG59IGZyb20gJy4vY2hpcC1pY29ucyc7XG5cblxubGV0IHVpZCA9IDA7XG5cbi8qKiBSZXByZXNlbnRzIGFuIGV2ZW50IGZpcmVkIG9uIGFuIGluZGl2aWR1YWwgYG1hdC1jaGlwYC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2hpcEV2ZW50IHtcbiAgLyoqIFRoZSBjaGlwIHRoZSBldmVudCB3YXMgZmlyZWQgb24uICovXG4gIGNoaXA6IE1hdENoaXA7XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBNREMgQ1NTIHRvIG5vbi1iYXNpYyBjaGlwcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgbWF0LWNoaXAsIG1hdC1jaGlwLW9wdGlvbiwgbWF0LWNoaXAtcm93LCBbbWF0LWNoaXBdLCBbbWF0LWNoaXAtb3B0aW9uXSxcbiAgICBbbWF0LWNoaXAtcm93XWAsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1jaGlwIG1kYy1jaGlwJ31cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcENzc0ludGVybmFsT25seSB7IH1cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmFic3RyYWN0IGNsYXNzIE1hdENoaXBCYXNlIHtcbiAgYWJzdHJhY3QgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuY29uc3QgX01hdENoaXBNaXhpbkJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKE1hdENoaXBCYXNlKSwgJ3ByaW1hcnknKSwgLTEpO1xuXG4vKipcbiAqIE1hdGVyaWFsIGRlc2lnbiBzdHlsZWQgQ2hpcCBiYXNlIGNvbXBvbmVudC4gVXNlZCBpbnNpZGUgdGhlIE1hdENoaXBTZXQgY29tcG9uZW50LlxuICpcbiAqIEV4dGVuZGVkIGJ5IE1hdENoaXBPcHRpb24gYW5kIE1hdENoaXBSb3cgZm9yIGRpZmZlcmVudCBpbnRlcmFjdGlvbiBwYXR0ZXJucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWJhc2ljLWNoaXAsIG1hdC1jaGlwJyxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnXSxcbiAgZXhwb3J0QXM6ICdtYXRDaGlwJyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hpcHMuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtYmFzaWMtY2hpcF0nOiAnX2lzQmFzaWNDaGlwJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc3RhbmRhcmQtY2hpcF0nOiAnIV9pc0Jhc2ljQ2hpcCcsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbnNEaXNhYmxlZCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcCBleHRlbmRzIF9NYXRDaGlwTWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2FuQ29sb3IsIENhbkRpc2FibGVSaXBwbGUsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4LCBPbkRlc3Ryb3kge1xuICAvKiogV2hldGhlciB0aGUgcmlwcGxlIGlzIGNlbnRlcmVkIG9uIHRoZSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNSaXBwbGVDZW50ZXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGZvY3VzZWQuICovXG4gIHJlYWRvbmx5IF9vbkZvY3VzID0gbmV3IFN1YmplY3Q8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjaGlwIGlzIGJsdXJyZWQuICovXG4gIHJlYWRvbmx5IF9vbkJsdXIgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgcmVhZG9ubHkgUkVNT1ZFX0lDT05fSEFORExFRF9LRVlTOiBSZWFkb25seVNldDxudW1iZXI+ID0gbmV3IFNldChbU1BBQ0UsIEVOVEVSXSk7XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBjaGlwIGlzIGEgYmFzaWMgKHVuc3R5bGVkKSBjaGlwLiAqL1xuICByZWFkb25seSBfaXNCYXNpY0NoaXA6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgaGFzIGZvY3VzLiAqL1xuICBwcm90ZWN0ZWQgX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgZm9yIHRoZSBjaGlwIGFyZSBlbmFibGVkLiAqL1xuICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8vIFdlIGhhdmUgdG8gdXNlIGEgYEhvc3RMaXN0ZW5lcmAgaGVyZSBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggSXZ5IGFuZCBWaWV3RW5naW5lLlxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBiaW5kaW5ncyB3aWxsIGJlIG1lcmdlZCB3aGVuIHRoaXMgY2xhc3MgaXMgZXh0ZW5kZWQsIHdoZXJlYXMgaW5cbiAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAvLyBUT0RPKG1tYWxlcmJhKTogd2UgbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAgb25jZSBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCkge1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZlbnQpO1xuICB9XG5cbiAgX2hhc0ZvY3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNGb2N1c0ludGVybmFsO1xuICB9XG5cbiAgLyoqIERlZmF1bHQgdW5pcXVlIGlkIGZvciB0aGUgY2hpcC4gKi9cbiAgcHJpdmF0ZSBfdW5pcXVlSWQgPSBgbWF0LW1kYy1jaGlwLSR7dWlkKyt9YDtcblxuICAvKiogQSB1bmlxdWUgaWQgZm9yIHRoZSBjaGlwLiBJZiBub25lIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gdGhpcy5fdW5pcXVlSWQ7XG5cblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5yZW1vdmVJY29uLmRpc2FibGVkID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF90ZXh0RWxlbWVudCE6IEhUTUxFbGVtZW50O1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGNoaXAuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSB0aGUgbWRjLWNoaXBfX3RleHQgZWxlbWVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgIDogdGhpcy5fdGV4dEVsZW1lbnQudGV4dENvbnRlbnQhLnRyaW0oKTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkgeyB0aGlzLl92YWx1ZSA9IHZhbHVlOyB9XG4gIHByb3RlY3RlZCBfdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY2hpcCBkaXNwbGF5cyB0aGUgcmVtb3ZlIHN0eWxpbmcgYW5kIGVtaXRzIChyZW1vdmVkKSBldmVudHMuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgcmVtb3ZhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVtb3ZhYmxlOyB9XG4gIHNldCByZW1vdmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW1vdmFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ29sb3JzIHRoZSBjaGlwIGZvciBlbXBoYXNpcyBhcyBpZiBpdCB3ZXJlIHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGhpZ2hsaWdodGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlnaGxpZ2h0ZWQ7IH1cbiAgc2V0IGhpZ2hsaWdodGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlnaGxpZ2h0ZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBjaGlwLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW50ZXJhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIGRlc3Ryb3llZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSByZW1vdmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogVGhlIE1EQyBmb3VuZGF0aW9uIGNvbnRhaW5pbmcgYnVzaW5lc3MgbG9naWMgZm9yIE1EQyBjaGlwLiAqL1xuICBfY2hpcEZvdW5kYXRpb246IGRlcHJlY2F0ZWQuTURDQ2hpcEZvdW5kYXRpb247XG5cbiAgLyoqIFRoZSB1bnN0eWxlZCBjaGlwIHNlbGVjdG9yIGZvciB0aGlzIGNvbXBvbmVudC4gKi9cbiAgcHJvdGVjdGVkIGJhc2ljQ2hpcEF0dHJOYW1lID0gJ21hdC1iYXNpYy1jaGlwJztcblxuICAvKiogVGhlIGNoaXAncyBsZWFkaW5nIGljb24uICovXG4gIEBDb250ZW50Q2hpbGQoTUFUX0NISVBfQVZBVEFSKSBsZWFkaW5nSWNvbjogTWF0Q2hpcEF2YXRhcjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1BVF9DSElQX1RSQUlMSU5HX0lDT04pIHRyYWlsaW5nSWNvbjogTWF0Q2hpcFRyYWlsaW5nSWNvbjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyByZW1vdmUgaWNvbi4gKi9cbiAgQENvbnRlbnRDaGlsZChNQVRfQ0hJUF9SRU1PVkUpIHJlbW92ZUljb246IE1hdENoaXBSZW1vdmU7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWF0UmlwcGxlIGluc3RhbmNlIG9mIHRoZSBjaGlwLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAvKipcbiAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgTURDIGNoaXAgYWRhcHRlciBpbnRlcmZhY2UuXG4gICogVGhlc2UgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IHRoZSBjaGlwIGZvdW5kYXRpb24uXG4gICovXG4gIHByb3RlY3RlZCBfY2hpcEFkYXB0ZXI6IGRlcHJlY2F0ZWQuTURDQ2hpcEFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldE1kY0NsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX3NldE1kY0NsYXNzKGNsYXNzTmFtZSwgZmFsc2UpLFxuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSksXG4gICAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PlxuICAgICAgICB0aGlzLmxlYWRpbmdJY29uLnNldENsYXNzKGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgcmVtb3ZlQ2xhc3NGcm9tTGVhZGluZ0ljb246IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMubGVhZGluZ0ljb24uc2V0Q2xhc3MoY2xhc3NOYW1lLCBmYWxzZSksXG4gICAgZXZlbnRUYXJnZXRIYXNDbGFzczpcbiAgICAgICAgKHRhcmdldDogRXZlbnRUYXJnZXR8bnVsbCwgY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBjbGFzc0xpc3RgLCBiZWNhdXNlIElFIGFuZCBFZGdlIGRvbid0XG4gICAgICAgICAgLy8gc3VwcG9ydCBpdCBvbiBTVkcgZWxlbWVudHMgYW5kIEVkZ2Ugc2VlbXMgdG8gdGhyb3cgZm9yIHJpcHBsZVxuICAgICAgICAgIC8vIGVsZW1lbnRzLCBiZWNhdXNlIHRoZXkncmUgb3V0c2lkZSB0aGUgRE9NLlxuICAgICAgICAgIHJldHVybiAodGFyZ2V0ICYmICh0YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0KSA/XG4gICAgICAgICAgICAgICh0YXJnZXQgYXMgRWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOlxuICAgICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgfSxcbiAgICBub3RpZnlJbnRlcmFjdGlvbjogKCkgPT4gdGhpcy5fbm90aWZ5SW50ZXJhY3Rpb24oKSxcbiAgICBub3RpZnlTZWxlY3Rpb246XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBOby1vcC4gV2UgY2FsbCBkaXNwYXRjaFNlbGVjdGlvbkV2ZW50IG91cnNlbHZlcyBpbiBNYXRDaGlwT3B0aW9uLFxuICAgICAgICAgIC8vIGJlY2F1c2Ugd2Ugd2FudCB0byBzcGVjaWZ5IHdoZXRoZXIgc2VsZWN0aW9uIG9jY3VycmVkIHZpYSB1c2VyXG4gICAgICAgICAgLy8gaW5wdXQuXG4gICAgICAgIH0sXG4gICAgbm90aWZ5TmF2aWdhdGlvbjogKCkgPT4gdGhpcy5fbm90aWZ5TmF2aWdhdGlvbigpLFxuICAgIG5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uOiAoKSA9PiB7fSxcbiAgICBub3RpZnlSZW1vdmFsOiAoKSA9PiB0aGlzLnJlbW92ZSgpLFxuICAgIG5vdGlmeUVkaXRTdGFydDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX29uRWRpdFN0YXJ0KCk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sXG4gICAgbm90aWZ5RWRpdEZpbmlzaDpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX29uRWRpdEZpbmlzaCgpO1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LFxuICAgIGdldENvbXB1dGVkU3R5bGVWYWx1ZTpcbiAgICAgICAgcHJvcGVydHlOYW1lID0+IHtcbiAgICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHJ1biB3aGVuIGEgY2hpcCBpcyByZW1vdmVkIHNvIGl0IG1pZ2h0IGJlXG4gICAgICAgICAgLy8gaW52b2tlZCBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLiBBZGQgc29tZSBleHRyYSBjaGVja3MganVzdCBpblxuICAgICAgICAgIC8vIGNhc2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdykge1xuICAgICAgICAgICAgY29uc3QgZ2V0Q29tcHV0ZWRTdHlsZSA9XG4gICAgICAgICAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9LFxuICAgIHNldFN0eWxlUHJvcGVydHk6XG4gICAgICAgIChwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICBoYXNMZWFkaW5nSWNvbjogKCkgPT4gISF0aGlzLmxlYWRpbmdJY29uLFxuICAgIGlzVHJhaWxpbmdBY3Rpb25OYXZpZ2FibGU6XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy50cmFpbGluZ0ljb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWlsaW5nSWNvbi5pc05hdmlnYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgaXNSVEw6ICgpID0+ICEhdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcsXG4gICAgZm9jdXNQcmltYXJ5QWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gQW5ndWxhciBNYXRlcmlhbCBNREMgY2hpcHMgZnVsbHkgbWFuYWdlIGZvY3VzLiBUT0RPOiBNYW5hZ2luZyBmb2N1c1xuICAgICAgICAgIC8vIGFuZCBoYW5kbGluZyBrZXlib2FyZCBldmVudHMgd2FzIGFkZGVkIGJ5IE1EQyBhZnRlciBvdXJcbiAgICAgICAgICAvLyBpbXBsZW1lbnRhdGlvbjsgY29uc2lkZXIgY29uc29saWRhdGluZy5cbiAgICAgICAgfSxcbiAgICBmb2N1c1RyYWlsaW5nQWN0aW9uOiAoKSA9PiB7fSxcbiAgICByZW1vdmVUcmFpbGluZ0FjdGlvbkZvY3VzOiAoKSA9PiB7fSxcbiAgICBzZXRQcmltYXJ5QWN0aW9uQXR0cjpcbiAgICAgICAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIE1EQyBpcyBjdXJyZW50bHkgdXNpbmcgdGhpcyBtZXRob2QgdG8gc2V0IGFyaWEtY2hlY2tlZCBvbiBjaG9pY2VcbiAgICAgICAgICAvLyBhbmQgZmlsdGVyIGNoaXBzLCB3aGljaCBpbiB0aGUgTURDIHRlbXBsYXRlcyBoYXZlIHJvbGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgLy8gYW5kIHJvbGU9XCJyYWRpb1wiIHJlc3BlY3RpdmVseS4gV2UgaGF2ZSByb2xlPVwib3B0aW9uXCIgb24gdGhvc2UgY2hpcHNcbiAgICAgICAgICAvLyBpbnN0ZWFkLCBzbyB3ZSBkbyBub3Qgd2FudCBhcmlhLWNoZWNrZWQuIFNpbmNlIHdlIGFsc28gbWFuYWdlIHRoZVxuICAgICAgICAgIC8vIHRhYmluZGV4IG91cnNlbHZlcywgd2UgZG9uJ3QgYWxsb3cgTURDIHRvIHNldCBpdC5cbiAgICAgICAgICBpZiAobmFtZSA9PT0gJ2FyaWEtY2hlY2tlZCcgfHwgbmFtZSA9PT0gJ3RhYmluZGV4Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAvLyBUaGUgMiBmdW5jdGlvbnMgYmVsb3cgYXJlIHVzZWQgYnkgdGhlIE1EQyByaXBwbGUsIHdoaWNoIHdlIGFyZW4ndCB1c2luZyxcbiAgICAvLyBzbyB0aGV5IHdpbGwgbmV2ZXIgYmUgY2FsbGVkXG4gICAgZ2V0Um9vdEJvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIGdldENoZWNrbWFya0JvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4gbnVsbCxcbiAgICBnZXRBdHRyaWJ1dGU6IChhdHRyKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgX25nWm9uZTogTmdab25lLFxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKVxuICAgICAgICBwcml2YXRlIF9nbG9iYWxSaXBwbGVPcHRpb25zPzogUmlwcGxlR2xvYmFsT3B0aW9ucykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uID0gbmV3IGRlcHJlY2F0ZWQuTURDQ2hpcEZvdW5kYXRpb24odGhpcy5fY2hpcEFkYXB0ZXIpO1xuICAgIHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gICAgdGhpcy5faXNCYXNpY0NoaXAgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKHRoaXMuYmFzaWNDaGlwQXR0ck5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLmJhc2ljQ2hpcEF0dHJOYW1lO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2luaXRSZW1vdmVJY29uKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMuX3RleHRFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtY2hpcF9fdGV4dCcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHVwIHRoZSByZW1vdmUgaWNvbiBjaGlwIGZvdW5kYXRpb24sIGFuZCBzdWJzY3JpYmVzIHRvIHJlbW92ZSBpY29uIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZUljb24oKSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uc2V0U2hvdWxkUmVtb3ZlT25UcmFpbGluZ0ljb25DbGljayh0cnVlKTtcbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG5cbiAgICAgIHRoaXMucmVtb3ZlSWNvbi5pbnRlcmFjdGlvblxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBUaGUgTURDIGNoaXAgZm91bmRhdGlvbiBjYWxscyBzdG9wUHJvcGFnYXRpb24oKSBmb3IgYW55IHRyYWlsaW5nIGljb24gaW50ZXJhY3Rpb25cbiAgICAgICAgICAvLyBldmVudCwgZXZlbiBvbmVzIGl0IGRvZXNuJ3QgaGFuZGxlLCBzbyB3ZSB3YW50IHRvIGF2b2lkIHBhc3NpbmcgaXQga2V5Ym9hcmQgZXZlbnRzXG4gICAgICAgICAgLy8gZm9yIHdoaWNoIHdlIGhhdmUgYSBjdXN0b20gaGFuZGxlci4gTm90ZSB0aGF0IHdlIGFzc2VydCB0aGUgdHlwZSBvZiB0aGUgZXZlbnQgdXNpbmdcbiAgICAgICAgICAvLyB0aGUgYHR5cGVgLCBiZWNhdXNlIGBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnRgIGNhbiB0aHJvdyBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgICAgIGNvbnN0IGlzS2V5Ym9hcmRFdmVudCA9IGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgna2V5Jyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAoaXNLZXlib2FyZEV2ZW50ICYmXG4gICAgICAgICAgICAgICF0aGlzLlJFTU9WRV9JQ09OX0hBTkRMRURfS0VZUy5oYXMoKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGUpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG5cbiAgICAgICAgICBpZiAoaXNLZXlib2FyZEV2ZW50ICYmICFoYXNNb2RpZmllcktleShldmVudCBhcyBLZXlib2FyZEV2ZW50KSkge1xuICAgICAgICAgICAgY29uc3Qga2V5Q29kZSA9IChldmVudCBhcyBLZXlib2FyZEV2ZW50KS5rZXlDb2RlO1xuXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHQgc3BhY2UgYW5kIGVudGVyIHByZXNzZXMgc28gd2UgZG9uJ3Qgc2Nyb2xsIHRoZSBwYWdlIG9yIHN1Ym1pdCBmb3Jtcy5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBTUEFDRSB8fCBrZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIHJlbW92YWwgb2YgdGhlIGNoaXAuXG4gICAqXG4gICAqIEluZm9ybXMgYW55IGxpc3RlbmVycyBvZiB0aGUgcmVtb3ZhbCByZXF1ZXN0LiBEb2VzIG5vdCByZW1vdmUgdGhlIGNoaXAgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoe2NoaXA6IHRoaXN9KTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIE1EQyBjaGlwLiAqL1xuICBwcml2YXRlIF9zZXRNZGNDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgICAgYWN0aXZlID8gY2xhc3Nlcy5hZGQoY3NzQ2xhc3MpIDogY2xhc3Nlcy5yZW1vdmUoY3NzQ2xhc3MpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogRm9yd2FyZHMgaW50ZXJhY3Rpb24gZXZlbnRzIHRvIHRoZSBNREMgY2hpcCBmb3VuZGF0aW9uLiAqL1xuICBfaGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50IHwgRm9jdXNFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZUNsaWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYmxjbGljaycpIHtcbiAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmhhbmRsZURvdWJsZUNsaWNrKCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlS2V5ZG93bihldmVudCBhcyBLZXlib2FyZEV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2ZvY3Vzb3V0Jykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlRm9jdXNPdXQoZXZlbnQgYXMgRm9jdXNFdmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdmb2N1c2luJykge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24uaGFuZGxlRm9jdXNJbihldmVudCBhcyBGb2N1c0V2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIF9pc1JpcHBsZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZVJpcHBsZSB8fCB0aGlzLl9hbmltYXRpb25zRGlzYWJsZWQgfHxcbiAgICAgICAgICAgdGhpcy5faXNCYXNpY0NoaXAgfHwgISF0aGlzLl9nbG9iYWxSaXBwbGVPcHRpb25zPy5kaXNhYmxlZDtcbiAgfVxuXG4gIF9ub3RpZnlJbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLmludGVyYWN0aW9uLmVtaXQodGhpcy5pZCk7XG4gIH1cblxuICBfbm90aWZ5TmF2aWdhdGlvbigpIHtcbiAgICAvLyBUT0RPOiBUaGlzIGlzIGEgbmV3IGZlYXR1cmUgYWRkZWQgYnkgTURDLiBDb25zaWRlciBleHBvc2luZyBpdCB0byB1c2Vyc1xuICAgIC8vIGluIHRoZSBmdXR1cmUuXG4gIH1cblxuICAvKiogT3ZlcnJpZGRlbiBieSBNYXRDaGlwUm93LiAqL1xuICBwcm90ZWN0ZWQgX29uRWRpdFN0YXJ0KCkge31cblxuICAvKiogT3ZlcnJpZGRlbiBieSBNYXRDaGlwUm93LiAqL1xuICBwcm90ZWN0ZWQgX29uRWRpdEZpbmlzaCgpIHt9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZW1vdmFibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZ2hsaWdodGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90YWJJbmRleDogTnVtYmVySW5wdXQ7XG59XG4iLCI8c3BhbiBjbGFzcz1cIm1kYy1jaGlwX19yaXBwbGVcIj48L3NwYW4+XG5cbjxzcGFuIG1hdFJpcHBsZSBjbGFzcz1cIm1hdC1tZGMtY2hpcC1yaXBwbGVcIlxuICAgICBbbWF0UmlwcGxlRGlzYWJsZWRdPVwiX2lzUmlwcGxlRGlzYWJsZWQoKVwiXG4gICAgIFttYXRSaXBwbGVDZW50ZXJlZF09XCJfaXNSaXBwbGVDZW50ZXJlZFwiXG4gICAgIFttYXRSaXBwbGVUcmlnZ2VyXT1cIl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRcIj48L3NwYW4+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1jaGlwLWF2YXRhciwgW21hdENoaXBBdmF0YXJdXCI+PC9uZy1jb250ZW50PlxuPGRpdiBjbGFzcz1cIm1kYy1jaGlwX19wcmltYXJ5LWFjdGlvblwiPlxuICA8ZGl2IGNsYXNzPVwibWRjLWNoaXBfX3RleHRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG48L2Rpdj5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1jaGlwLXRyYWlsaW5nLWljb24sW21hdENoaXBSZW1vdmVdLFttYXRDaGlwVHJhaWxpbmdJY29uXVwiPjwvbmctY29udGVudD5cbiJdfQ==