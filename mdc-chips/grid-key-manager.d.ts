/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
/** The keys handled by the GridKeyManager keydown method. */
export declare const NAVIGATION_KEYS: number[];
/** This interface is for rows that can be passed to a GridKeyManager. */
export interface GridKeyManagerRow<T> {
    cells: T[];
}
/**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 */
export declare class GridKeyManager<T> {
    private _rows;
    private _activeRowIndex;
    private _activeColumnIndex;
    private _activeRow;
    private _activeCell;
    private _dir;
    private _homeAndEnd;
    constructor(_rows: QueryList<GridKeyManagerRow<T>> | GridKeyManagerRow<T>[]);
    /** Stream that emits whenever the active cell of the grid manager changes. */
    change: Subject<{
        row: number;
        column: number;
    }>;
    /**
     * Configures the directionality of the key manager's horizontal movement.
     * @param direction Direction which is considered forward movement across a row.
     *
     * If withDirectionality is not set, the default is 'ltr'.
     */
    withDirectionality(direction: 'ltr' | 'rtl'): this;
    /**
     * Sets the active cell to the cell at the indices specified.
     * @param cell The row and column containing the cell to be set as active.
     */
    setActiveCell(cell: {
        row: number;
        column: number;
    }): void;
    /**
     * Sets the active cell to the cell.
     * @param cell The cell to be set as active.
     */
    setActiveCell(cell: T): void;
    /**
     * Configures the key manager to activate the first and last items
     * respectively when the Home or End key is pressed.
     * @param enabled Whether pressing the Home or End key activates the first/last item.
     */
    withHomeAndEnd(enabled?: boolean): this;
    /**
     * Sets the active cell depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    onKeydown(event: KeyboardEvent): void;
    /** Index of the currently active row. */
    get activeRowIndex(): number;
    /** Index of the currently active column. */
    get activeColumnIndex(): number;
    /** The active cell. */
    get activeCell(): T | null;
    /** Sets the active cell to the first cell in the grid. */
    setFirstCellActive(): void;
    /** Sets the active cell to the last cell in the grid. */
    setLastCellActive(): void;
    /** Sets the active row to the next row in the grid. Active column is unchanged. */
    setNextRowActive(): void;
    /** Sets the active row to the previous row in the grid. Active column is unchanged. */
    setPreviousRowActive(): void;
    /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    setNextColumnActive(): void;
    /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    setPreviousColumnActive(): void;
    /**
     * Allows setting the active cell without any other effects.
     * @param cell Row and column of the cell to be set as active.
     */
    updateActiveCell(cell: {
        row: number;
        column: number;
    }): void;
    /**
     * Allows setting the active cell without any other effects.
     * @param cell Cell to be set as active.
     */
    updateActiveCell(cell: T): void;
    /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     */
    private _setActiveCellByDelta;
    /**
     * Sets the active cell to the cell at the indices specified, if they are valid.
     */
    private _setActiveCellByIndex;
    /** Returns the rows as an array. */
    private _getRowsArray;
}
