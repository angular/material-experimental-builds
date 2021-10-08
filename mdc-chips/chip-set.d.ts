/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { HasTabIndex } from '@angular/material-experimental/mdc-core';
import { deprecated } from '@material/chips';
import { Observable, Subject } from 'rxjs';
import { MatChip, MatChipEvent } from './chip';
import * as i0 from "@angular/core";
/**
 * Boilerplate for applying mixins to MatChipSet.
 * @docs-private
 */
declare abstract class MatChipSetBase {
    abstract disabled: boolean;
    constructor(_elementRef: ElementRef);
}
declare const _MatChipSetMixinBase: import("@angular/material-experimental/mdc-core")._Constructor<HasTabIndex> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<HasTabIndex> & typeof MatChipSetBase;
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
export declare class MatChipSet extends _MatChipSetMixinBase implements AfterContentInit, AfterViewInit, HasTabIndex, OnDestroy {
    protected _elementRef: ElementRef;
    protected _changeDetectorRef: ChangeDetectorRef;
    protected _dir: Directionality;
    /** Subscription to remove changes in chips. */
    private _chipRemoveSubscription;
    /** Subscription to destroyed events in chips. */
    private _chipDestroyedSubscription;
    /** Subscription to chip interactions. */
    private _chipInteractionSubscription;
    /**
     * When a chip is destroyed, we store the index of the destroyed chip until the chips
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate chip that should receive focus until the array of chips updated completely.
     */
    protected _lastDestroyedChipIndex: number | null;
    /** The MDC foundation containing business logic for MDC chip-set. */
    protected _chipSetFoundation: deprecated.MDCChipSetFoundation;
    /** Subject that emits when the component has been destroyed. */
    protected _destroyed: Subject<void>;
    /**
     * Implementation of the MDC chip-set adapter interface.
     * These methods are called by the chip set foundation.
     */
    protected _chipSetAdapter: deprecated.MDCChipSetAdapter;
    /** The aria-describedby attribute on the chip list for improved a11y. */
    _ariaDescribedby: string;
    /** Uid of the chip set */
    _uid: string;
    /**
     * Map from class to whether the class is enabled.
     * Enabled classes are set on the MDC chip-set div.
     */
    _mdcClasses: {
        [key: string]: boolean;
    };
    /** Whether the chip set is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    protected _disabled: boolean;
    /** Whether the chip list contains chips or not. */
    get empty(): boolean;
    /** The ARIA role applied to the chip set. */
    get role(): string | null;
    set role(value: string | null);
    private _role;
    /** Whether any of the chips inside of this chip-set has focus. */
    get focused(): boolean;
    /** Combined stream of all of the child chips' remove events. */
    get chipRemoveChanges(): Observable<MatChipEvent>;
    /** Combined stream of all of the child chips' remove events. */
    get chipDestroyedChanges(): Observable<MatChipEvent>;
    /** Combined stream of all of the child chips' interaction events. */
    get chipInteractionChanges(): Observable<string>;
    /** The chips that are part of this chip set. */
    _chips: QueryList<MatChip>;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef, _dir: Directionality);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Checks whether any of the chips is focused. */
    protected _hasFocusedChip(): boolean;
    /** Syncs the chip-set's state with the individual chips. */
    protected _syncChipsState(): void;
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    protected _setMdcClass(cssClass: string, active: boolean): void;
    /** Adapter method that returns true if the chip set has the given MDC class. */
    protected _hasMdcClass(className: string): any;
    /** Updates subscriptions to chip events. */
    private _resetChips;
    /** Subscribes to events on the child chips. */
    protected _subscribeToChipEvents(): void;
    /** Subscribes to chip removal events. */
    private _listenToChipsRemove;
    /** Subscribes to chip destroyed events. */
    private _listenToChipsDestroyed;
    /** Subscribes to chip interaction events. */
    private _listenToChipsInteraction;
    /** Unsubscribes from all chip events. */
    protected _dropSubscriptions(): void;
    /** Dummy method for subclasses to override. Base chip set cannot be focused. */
    focus(): void;
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    protected _isValidIndex(index: number): boolean;
    /** Checks whether an event comes from inside a chip element. */
    protected _originatesFromChip(event: Event): boolean;
    /**
     * Checks whether an event comes from inside a chip element in the editing
     * state.
     */
    protected _originatesFromEditingChip(event: Event): boolean;
    private _checkForClassInHierarchy;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_tabIndex: NumberInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipSet, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChipSet, "mat-chip-set", never, { "disabled": "disabled"; "role": "role"; }, {}, ["_chips"], ["*"]>;
}
export {};
