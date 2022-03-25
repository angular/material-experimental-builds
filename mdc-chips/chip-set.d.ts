/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { HasTabIndex } from '@angular/material-experimental/mdc-core';
import { MDCChipSetFoundation, MDCChipSetAdapter } from '@material/chips';
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
    private _liveAnnouncer;
    private _document;
    protected _elementRef: ElementRef<HTMLElement>;
    protected _changeDetectorRef: ChangeDetectorRef;
    /**
     * When a chip is destroyed, we store the index of the destroyed chip until the chips
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate chip that should receive focus until the array of chips updated completely.
     */
    protected _lastDestroyedChipIndex: number | null;
    /** The MDC foundation containing business logic for MDC chip-set. */
    protected _chipSetFoundation: MDCChipSetFoundation;
    /** Subject that emits when the component has been destroyed. */
    protected _destroyed: Subject<void>;
    /** Role to use if it hasn't been overwritten by the user. */
    protected _defaultRole: string;
    /** Combined stream of all of the child chips' remove events. */
    get chipDestroyedChanges(): Observable<MatChipEvent>;
    /**
     * Implementation of the MDC chip-set adapter interface.
     * These methods are called by the chip set foundation.
     */
    protected _chipSetAdapter: MDCChipSetAdapter;
    /**
     * Map from class to whether the class is enabled.
     * Enabled classes are set on the MDC chip-set div.
     */
    _mdcClasses: {
        [key: string]: boolean;
    };
    /** Whether the chip set is disabled. */
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    protected _disabled: boolean;
    /** Whether the chip list contains chips or not. */
    get empty(): boolean;
    /** The ARIA role applied to the chip set. */
    get role(): string | null;
    set role(value: string | null);
    private _explicitRole;
    /** Whether any of the chips inside of this chip-set has focus. */
    get focused(): boolean;
    /** The chips that are part of this chip set. */
    _chips: QueryList<MatChip>;
    constructor(_liveAnnouncer: LiveAnnouncer, _document: any, _elementRef: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Checks whether any of the chips is focused. */
    protected _hasFocusedChip(): boolean;
    /** Syncs the chip-set's state with the individual chips. */
    protected _syncChipsState(): void;
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
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    protected _allowFocusEscape(): void;
    /**
     * Gets a stream of events from all the chips within the set.
     * The stream will automatically incorporate any newly-added chips.
     */
    protected _getChipStream<T, C extends MatChip = MatChip>(mappingFunction: (chip: C) => Observable<T>): Observable<T>;
    protected _checkForClassInHierarchy(event: Event, className: string): boolean;
    private _chipFoundation;
    private _handleChipAnimation;
    private _handleChipInteraction;
    private _handleChipNavigation;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatChipSet, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatChipSet, "mat-chip-set", never, { "disabled": "disabled"; "role": "role"; }, {}, ["_chips"], ["*"]>;
}
export {};
