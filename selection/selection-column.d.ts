/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatTable } from '@angular/material/table';
import { OnDestroy, OnInit } from '@angular/core';
import { MatSelection } from './selection';
import * as i0 from "@angular/core";
/**
 * Column that adds row selecting checkboxes and a select-all checkbox if `matSelectionMultiple` is
 * `true`.
 *
 * Must be used within a parent `MatSelection` directive.
 */
export declare class MatSelectionColumn<T> implements OnInit, OnDestroy {
    private _table;
    readonly selection: MatSelection<T>;
    /** Column name that should be used to reference this column. */
    get name(): string;
    set name(name: string);
    private _name;
    private readonly _columnDef;
    private readonly _cell;
    private readonly _headerCell;
    constructor(_table: MatTable<T>, selection: MatSelection<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _syncColumnDefName;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectionColumn<any>, [{ optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSelectionColumn<any>, "mat-selection-column", never, { "name": "name"; }, {}, never, never, false>;
}
