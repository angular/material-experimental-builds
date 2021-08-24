/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { CanColor, CanDisable, CanDisableRipple, HasTabIndex, MatRipple, RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { deprecated } from '@material/chips';
import { Subject } from 'rxjs';
import { MatChipAvatar, MatChipTrailingIcon, MatChipRemove } from './chip-icons';
/** Represents an event fired on an individual `mat-chip`. */
export interface MatChipEvent {
    /** The chip the event was fired on. */
    chip: MatChip;
}
/**
 * Directive to add MDC CSS to non-basic chips.
 * @docs-private
 */
export declare class MatChipCssInternalOnly {
}
/**
 * Boilerplate for applying mixins to MatChip.
 * @docs-private
 */
declare abstract class MatChipBase {
    _elementRef: ElementRef;
    abstract disabled: boolean;
    constructor(_elementRef: ElementRef);
}
declare const _MatChipMixinBase: import("@angular/material/core/common-behaviors/constructor").Constructor<HasTabIndex> & import("@angular/material/core/common-behaviors/constructor").AbstractConstructor<HasTabIndex> & import("@angular/material/core/common-behaviors/constructor").Constructor<CanColor> & import("@angular/material/core/common-behaviors/constructor").AbstractConstructor<CanColor> & import("@angular/material/core/common-behaviors/constructor").Constructor<CanDisableRipple> & import("@angular/material/core/common-behaviors/constructor").AbstractConstructor<CanDisableRipple> & typeof MatChipBase;
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
export declare class MatChip extends _MatChipMixinBase implements AfterContentInit, AfterViewInit, CanColor, CanDisableRipple, CanDisable, HasTabIndex, OnDestroy {
    _changeDetectorRef: ChangeDetectorRef;
    protected _ngZone: NgZone;
    private _dir;
    private _globalRippleOptions?;
    /** Whether the ripple is centered on the chip. */
    readonly _isRippleCentered = false;
    /** Emits when the chip is focused. */
    readonly _onFocus: Subject<MatChipEvent>;
    /** Emits when the chip is blurred. */
    readonly _onBlur: Subject<MatChipEvent>;
    readonly REMOVE_ICON_HANDLED_KEYS: ReadonlySet<number>;
    /** Whether this chip is a basic (unstyled) chip. */
    readonly _isBasicChip: boolean;
    /** Whether the chip has focus. */
    protected _hasFocusInternal: boolean;
    /** Whether animations for the chip are enabled. */
    _animationsDisabled: boolean;
    _handleTransitionEnd(event: TransitionEvent): void;
    _hasFocus(): boolean;
    /** Default unique id for the chip. */
    private _uniqueId;
    /** A unique id for the chip. If none is supplied, it will be auto-generated. */
    id: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    protected _disabled: boolean;
    private _textElement;
    /** The value of the chip. Defaults to the content inside the mdc-chip__text element. */
    get value(): any;
    set value(value: any);
    protected _value: any;
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     */
    get removable(): boolean;
    set removable(value: boolean);
    protected _removable: boolean;
    /**
     * Colors the chip for emphasis as if it were selected.
     */
    get highlighted(): boolean;
    set highlighted(value: boolean);
    protected _highlighted: boolean;
    /** Emitted when the user interacts with the chip. */
    readonly interaction: EventEmitter<string>;
    /** Emitted when the chip is destroyed. */
    readonly destroyed: EventEmitter<MatChipEvent>;
    /** Emitted when a chip is to be removed. */
    readonly removed: EventEmitter<MatChipEvent>;
    /** The MDC foundation containing business logic for MDC chip. */
    _chipFoundation: deprecated.MDCChipFoundation;
    /** The unstyled chip selector for this component. */
    protected basicChipAttrName: string;
    /** The chip's leading icon. */
    leadingIcon: MatChipAvatar;
    /** The chip's trailing icon. */
    trailingIcon: MatChipTrailingIcon;
    /** The chip's trailing remove icon. */
    removeIcon: MatChipRemove;
    /** Reference to the MatRipple instance of the chip. */
    ripple: MatRipple;
    /**
     * Implementation of the MDC chip adapter interface.
     * These methods are called by the chip foundation.
     */
    protected _chipAdapter: deprecated.MDCChipAdapter;
    constructor(_changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, _ngZone: NgZone, _dir: Directionality, animationMode?: string, _globalRippleOptions?: RippleGlobalOptions | undefined);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
    private _initRemoveIcon;
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    remove(): void;
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    private _setMdcClass;
    /** Forwards interaction events to the MDC chip foundation. */
    _handleInteraction(event: MouseEvent | KeyboardEvent | FocusEvent): void;
    /** Whether or not the ripple should be disabled. */
    _isRippleDisabled(): boolean;
    _notifyInteraction(): void;
    _notifyNavigation(): void;
    /** Overridden by MatChipRow. */
    protected _onEditStart(): void;
    /** Overridden by MatChipRow. */
    protected _onEditFinish(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_removable: BooleanInput;
    static ngAcceptInputType_highlighted: BooleanInput;
    static ngAcceptInputType_disableRipple: BooleanInput;
    static ngAcceptInputType_tabIndex: NumberInput;
}
export {};
