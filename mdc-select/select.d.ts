/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, OnInit, QueryList } from '@angular/core';
import { _MatSelectBase } from '@angular/material/select';
import { MatOptgroup, MatOption } from '@angular/material-experimental/mdc-core';
import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
/** Change event object that is emitted when the select value has changed. */
export declare class MatSelectChange {
    /** Reference to the select that emitted the change event. */
    source: MatSelect;
    /** Current value of the select that emitted the event. */
    value: any;
    constructor(
    /** Reference to the select that emitted the change event. */
    source: MatSelect, 
    /** Current value of the select that emitted the event. */
    value: any);
}
/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
export declare class MatSelectTrigger {
}
export declare class MatSelect extends _MatSelectBase<MatSelectChange> implements OnInit, AfterViewInit {
    options: QueryList<MatOption>;
    optionGroups: QueryList<MatOptgroup>;
    customTrigger: MatSelectTrigger;
    _positions: ConnectedPosition[];
    /** Ideal origin for the overlay panel. */
    _preferredOverlayOrigin: CdkOverlayOrigin | undefined;
    /** Width of the overlay panel. */
    _overlayWidth: number;
    get shouldLabelFloat(): boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    open(): void;
    close(): void;
    /** Scrolls the active option into view. */
    protected _scrollOptionIntoView(index: number): void;
    protected _positioningSettled(): void;
    protected _getChangeEvent(value: any): MatSelectChange;
    /** Gets how wide the overlay panel should be. */
    private _getOverlayWidth;
}
