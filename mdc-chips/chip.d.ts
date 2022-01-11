/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { CanColor, CanDisable, CanDisableRipple, HasTabIndex, MatRipple, RippleGlobalOptions } from '@angular/material-experimental/mdc-core';
import { MDCChipFoundation, MDCChipAdapter, MDCChipActionType, MDCChipActionFoundation, ActionInteractionEvent } from '@material/chips';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { MatChipAvatar, MatChipTrailingIcon, MatChipRemove } from './chip-icons';
import { MatChipAction } from './chip-action';
import * as i0 from "@angular/core";
/** Represents an event fired on an individual `mat-chip`. */
export interface MatChipEvent {
    /** The chip the event was fired on. */
    chip: MatChip;
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
declare const _MatChipMixinBase: import("@angular/material-experimental/mdc-core")._Constructor<HasTabIndex> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<HasTabIndex> & import("@angular/material-experimental/mdc-core")._Constructor<CanColor> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<CanColor> & import("@angular/material-experimental/mdc-core")._Constructor<CanDisableRipple> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<CanDisableRipple> & typeof MatChipBase;
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
export declare class MatChip extends _MatChipMixinBase implements AfterViewInit, CanColor, CanDisableRipple, CanDisable, HasTabIndex, OnDestroy {
    _changeDetectorRef: ChangeDetectorRef;
    protected _ngZone: NgZone;
    private _focusMonitor;
    private _dir;
    private _globalRippleOptions?;
    protected _document: Document;
    /** Whether the ripple is centered on the chip. */
    readonly _isRippleCentered = false;
    /** Emits when the chip is focused. */
    readonly _onFocus: Subject<MatChipEvent>;
    /** Emits when the chip is blurred. */
    readonly _onBlur: Subject<MatChipEvent>;
    /** Whether this chip is a basic (unstyled) chip. */
    readonly _isBasicChip: boolean;
    /** Role for the root of the chip. */
    role: string | null;
    /** Whether the chip has focus. */
    protected _hasFocusInternal: boolean;
    /** Whether moving focus into the chip is pending. */
    private _pendingFocus;
    /** Whether animations for the chip are enabled. */
    _animationsDisabled: boolean;
    _hasFocus(): boolean;
    /** A unique id for the chip. If none is supplied, it will be auto-generated. */
    id: string;
    /** ARIA label for the content of the chip. */
    ariaLabel: string | null;
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    protected _disabled: boolean;
    private _textElement;
    /**
     * The value of the chip. Defaults to the content inside
     * the `mat-mdc-chip-action-label` element.
     */
    get value(): any;
    set value(value: any);
    protected _value: any;
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     */
    get removable(): boolean;
    set removable(value: BooleanInput);
    protected _removable: boolean;
    /**
     * Colors the chip for emphasis as if it were selected.
     */
    get highlighted(): boolean;
    set highlighted(value: BooleanInput);
    protected _highlighted: boolean;
    /** Emitted when a chip is to be removed. */
    readonly removed: EventEmitter<MatChipEvent>;
    /** Emitted when the chip is destroyed. */
    readonly destroyed: EventEmitter<MatChipEvent>;
    /** The MDC foundation containing business logic for MDC chip. */
    _chipFoundation: MDCChipFoundation;
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
    /** Action receiving the primary set of user interactions. */
    primaryAction: MatChipAction;
    /**
     * Implementation of the MDC chip adapter interface.
     * These methods are called by the chip foundation.
     */
    protected _chipAdapter: MDCChipAdapter;
    constructor(_changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _focusMonitor: FocusMonitor, _document: any, _dir: Directionality, animationMode?: string, _globalRippleOptions?: RippleGlobalOptions | undefined, tabIndex?: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    remove(): void;
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    private _setMdcClass;
    /** Whether or not the ripple should be disabled. */
    _isRippleDisabled(): boolean;
    _getAction(type: MDCChipActionType): MDCChipActionFoundation | undefined;
    _getFoundation(): MDCChipFoundation;
    _hasTrailingIcon(): boolean;
    /** Allows for programmatic focusing of the chip. */
    focus(): void;
    /** Overridden by MatChipOption. */
    protected _onChipInteraction(event: ActionInteractionEvent): void;
    private _handleActionInteraction;
    private _handleActionNavigation;
    private _handleTransitionend;
    private _handleAnimationend;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChip, [null, null, null, null, null, { optional: true; }, { optional: true; }, { optional: true; }, { attribute: "tabindex"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChip, "mat-basic-chip, mat-chip", ["matChip"], { "color": "color"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; "role": "role"; "id": "id"; "ariaLabel": "aria-label"; "disabled": "disabled"; "value": "value"; "removable": "removable"; "highlighted": "highlighted"; }, { "removed": "removed"; "destroyed": "destroyed"; }, ["leadingIcon", "trailingIcon", "removeIcon"], ["mat-chip-avatar, [matChipAvatar]", "*", "mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"]>;
}
export {};
