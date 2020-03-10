/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-chips/grid-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, } from '@angular/cdk/keycodes';
/**
 * The keys handled by the GridKeyManager keydown method.
 * @type {?}
 */
export const NAVIGATION_KEYS = [DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW];
/**
 * This interface is for rows that can be passed to a GridKeyManager.
 * @record
 * @template T
 */
export function GridKeyManagerRow() { }
if (false) {
    /** @type {?} */
    GridKeyManagerRow.prototype.cells;
}
/**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 * @template T
 */
export class GridKeyManager {
    /**
     * @param {?} _rows
     */
    constructor(_rows) {
        this._rows = _rows;
        this._activeRowIndex = -1;
        this._activeColumnIndex = -1;
        this._activeRow = null;
        this._activeCell = null;
        this._dir = 'ltr';
        /**
         * Stream that emits whenever the active cell of the grid manager changes.
         */
        this.change = new Subject();
        // We allow for the rows to be an array because, in some cases, the consumer may
        // not have access to a QueryList of the rows they want to manage (e.g. when the
        // rows aren't being collected via `ViewChildren` or `ContentChildren`).
        if (_rows instanceof QueryList) {
            _rows.changes.subscribe((/**
             * @param {?} newRows
             * @return {?}
             */
            (newRows) => {
                if (this._activeRow) {
                    /** @type {?} */
                    const newIndex = newRows.toArray().indexOf(this._activeRow);
                    if (newIndex > -1 && newIndex !== this._activeRowIndex) {
                        this._activeRowIndex = newIndex;
                    }
                }
            }));
        }
    }
    /**
     * Configures the directionality of the key manager's horizontal movement.
     * @template THIS
     * @this {THIS}
     * @param {?} direction Direction which is considered forward movement across a row.
     *
     * If withDirectionality is not set, the default is 'ltr'.
     * @return {THIS}
     */
    withDirectionality(direction) {
        (/** @type {?} */ (this))._dir = direction;
        return (/** @type {?} */ (this));
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    setActiveCell(cell) {
        /** @type {?} */
        const previousRowIndex = this._activeRowIndex;
        /** @type {?} */
        const previousColumnIndex = this._activeColumnIndex;
        this.updateActiveCell(cell);
        if (this._activeRowIndex !== previousRowIndex ||
            this._activeColumnIndex !== previousColumnIndex) {
            this.change.next({ row: this._activeRowIndex, column: this._activeColumnIndex });
        }
    }
    /**
     * Sets the active cell depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    onKeydown(event) {
        /** @type {?} */
        const keyCode = event.keyCode;
        switch (keyCode) {
            case DOWN_ARROW:
                this.setNextRowActive();
                break;
            case UP_ARROW:
                this.setPreviousRowActive();
                break;
            case RIGHT_ARROW:
                this._dir === 'rtl' ? this.setPreviousColumnActive() : this.setNextColumnActive();
                break;
            case LEFT_ARROW:
                this._dir === 'rtl' ? this.setNextColumnActive() : this.setPreviousColumnActive();
                break;
            default:
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        event.preventDefault();
    }
    /**
     * Index of the currently active row.
     * @return {?}
     */
    get activeRowIndex() {
        return this._activeRowIndex;
    }
    /**
     * Index of the currently active column.
     * @return {?}
     */
    get activeColumnIndex() {
        return this._activeColumnIndex;
    }
    /**
     * The active cell.
     * @return {?}
     */
    get activeCell() {
        return this._activeCell;
    }
    /**
     * Sets the active cell to the first cell in the grid.
     * @return {?}
     */
    setFirstCellActive() {
        this._setActiveCellByIndex(0, 0);
    }
    /**
     * Sets the active cell to the last cell in the grid.
     * @return {?}
     */
    setLastCellActive() {
        /** @type {?} */
        const lastRowIndex = this._rows.length - 1;
        /** @type {?} */
        const lastRow = this._getRowsArray()[lastRowIndex];
        this._setActiveCellByIndex(lastRowIndex, lastRow.cells.length - 1);
    }
    /**
     * Sets the active row to the next row in the grid. Active column is unchanged.
     * @return {?}
     */
    setNextRowActive() {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(1, 0);
    }
    /**
     * Sets the active row to the previous row in the grid. Active column is unchanged.
     * @return {?}
     */
    setPreviousRowActive() {
        this._setActiveCellByDelta(-1, 0);
    }
    /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     * @return {?}
     */
    setNextColumnActive() {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(0, 1);
    }
    /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     * @return {?}
     */
    setPreviousColumnActive() {
        this._setActiveCellByDelta(0, -1);
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    updateActiveCell(cell) {
        /** @type {?} */
        const rowArray = this._getRowsArray();
        if (typeof cell === 'object' && typeof cell.row === 'number' &&
            typeof cell.column === 'number') {
            this._activeRowIndex = cell.row;
            this._activeColumnIndex = cell.column;
            this._activeRow = rowArray[cell.row] || null;
            this._activeCell = this._activeRow ? this._activeRow.cells[cell.column] || null : null;
        }
        else {
            rowArray.forEach((/**
             * @param {?} row
             * @param {?} rowIndex
             * @return {?}
             */
            (row, rowIndex) => {
                /** @type {?} */
                const columnIndex = row.cells.indexOf(cell);
                if (columnIndex !== -1) {
                    this._activeRowIndex = rowIndex;
                    this._activeColumnIndex = columnIndex;
                    this._activeRow = row;
                    this._activeCell = row.cells[columnIndex];
                }
            }));
        }
    }
    /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     * @private
     * @param {?} rowDelta
     * @param {?} columnDelta
     * @return {?}
     */
    _setActiveCellByDelta(rowDelta, columnDelta) {
        // If delta puts us past the last cell in a row, move to the first cell of the next row.
        if (this._activeRow && this._activeColumnIndex + columnDelta >= this._activeRow.cells.length) {
            this._setActiveCellByIndex(this._activeRowIndex + 1, 0);
            // If delta puts us prior to the first cell in a row, move to the last cell of the previous row.
        }
        else if (this._activeColumnIndex + columnDelta < 0) {
            /** @type {?} */
            const previousRowIndex = this._activeRowIndex - 1;
            /** @type {?} */
            const previousRow = this._getRowsArray()[previousRowIndex];
            if (previousRow) {
                this._setActiveCellByIndex(previousRowIndex, previousRow.cells.length - 1);
            }
        }
        else {
            this._setActiveCellByIndex(this._activeRowIndex + rowDelta, this._activeColumnIndex + columnDelta);
        }
    }
    /**
     * Sets the active cell to the cell at the indices specified, if they are valid.
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    _setActiveCellByIndex(rowIndex, columnIndex) {
        /** @type {?} */
        const rows = this._getRowsArray();
        /** @type {?} */
        const targetRow = rows[rowIndex];
        if (!targetRow || !targetRow.cells[columnIndex]) {
            return;
        }
        this.setActiveCell({ row: rowIndex, column: columnIndex });
    }
    /**
     * Returns the rows as an array.
     * @private
     * @return {?}
     */
    _getRowsArray() {
        return this._rows instanceof QueryList ? this._rows.toArray() : this._rows;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeRowIndex;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeColumnIndex;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeRow;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeCell;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._dir;
    /**
     * Stream that emits whenever the active cell of the grid manager changes.
     * @type {?}
     */
    GridKeyManager.prototype.change;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._rows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2dyaWQta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFDTCxRQUFRLEVBQ1IsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEdBQ1osTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFJL0IsTUFBTSxPQUFPLGVBQWUsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQzs7Ozs7O0FBRzlFLHVDQUVDOzs7SUFEQyxrQ0FBVzs7Ozs7Ozs7OztBQVViLE1BQU0sT0FBTyxjQUFjOzs7O0lBT3pCLFlBQW9CLEtBQStEO1FBQS9ELFVBQUssR0FBTCxLQUFLLENBQTBEO1FBTjNFLG9CQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsZUFBVSxHQUFnQyxJQUFJLENBQUM7UUFDL0MsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFDN0IsU0FBSSxHQUFrQixLQUFLLENBQUM7Ozs7UUFvQnBDLFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQWpCcEQsZ0ZBQWdGO1FBQ2hGLGdGQUFnRjtRQUNoRix3RUFBd0U7UUFDeEUsSUFBSSxLQUFLLFlBQVksU0FBUyxFQUFFO1lBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztZQUFDLENBQUMsT0FBd0MsRUFBRSxFQUFFO2dCQUNuRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7OzBCQUNiLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxF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LGVBQWUsR0FBRyxRQUFRLEVBQ3hELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7Ozs7Ozs7O0lBS08scUJBQXFCLENBQUMsUUFBZ0IsRUFBRSxXQUFtQjs7Y0FDM0QsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7O2NBRTNCLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRWhDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9DLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUdPLGFBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3RSxDQUFDO0NBQ0Y7Ozs7OztJQTlOQyx5Q0FBNkI7Ozs7O0lBQzdCLDRDQUFnQzs7Ozs7SUFDaEMsb0NBQXVEOzs7OztJQUN2RCxxQ0FBcUM7Ozs7O0lBQ3JDLDhCQUFvQzs7Ozs7SUFvQnBDLGdDQUFzRDs7Ozs7SUFsQjFDLCtCQUF1RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgVVBfQVJST1csXG4gIERPV05fQVJST1csXG4gIExFRlRfQVJST1csXG4gIFJJR0hUX0FSUk9XLFxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuXG5cbi8qKiBUaGUga2V5cyBoYW5kbGVkIGJ5IHRoZSBHcmlkS2V5TWFuYWdlciBrZXlkb3duIG1ldGhvZC4gKi9cbmV4cG9ydCBjb25zdCBOQVZJR0FUSU9OX0tFWVMgPSBbRE9XTl9BUlJPVywgVVBfQVJST1csIFJJR0hUX0FSUk9XLCBMRUZUX0FSUk9XXTtcblxuLyoqIFRoaXMgaW50ZXJmYWNlIGlzIGZvciByb3dzIHRoYXQgY2FuIGJlIHBhc3NlZCB0byBhIEdyaWRLZXlNYW5hZ2VyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkS2V5TWFuYWdlclJvdzxUPiB7XG4gIGNlbGxzOiBUW107XG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyBtYW5hZ2VzIGtleWJvYXJkIGV2ZW50cyBmb3IgZ3JpZHMuIElmIHlvdSBwYXNzIGl0IGEgcXVlcnkgbGlzdFxuICogb2YgR3JpZEtleU1hbmFnZXJSb3csIGl0IHdpbGwgc2V0IHRoZSBhY3RpdmUgY2VsbCBjb3JyZWN0bHkgd2hlbiBhcnJvdyBldmVudHMgb2NjdXIuXG4gKlxuICogR3JpZEtleU1hbmFnZXIgZXhwZWN0cyB0aGF0IHJvd3MgbWF5IGNoYW5nZSBkeW5hbWljYWxseSwgYnV0IHRoZSBjZWxscyBmb3IgYSBnaXZlbiByb3cgYXJlXG4gKiBzdGF0aWMuIEl0IGFsc28gZXhwZWN0cyB0aGF0IGFsbCByb3dzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGNlbGxzLlxuICovXG5leHBvcnQgY2xhc3MgR3JpZEtleU1hbmFnZXI8VD4ge1xuICBwcml2YXRlIF9hY3RpdmVSb3dJbmRleCA9IC0xO1xuICBwcml2YXRlIF9hY3RpdmVDb2x1bW5JbmRleCA9IC0xO1xuICBwcml2YXRlIF9hY3RpdmVSb3c6IEdyaWRLZXlNYW5hZ2VyUm93PFQ+IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2FjdGl2ZUNlbGw6IFQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfZGlyOiAnbHRyJyB8ICdydGwnID0gJ2x0cic7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm93czogUXVlcnlMaXN0PEdyaWRLZXlNYW5hZ2VyUm93PFQ+PiB8IEdyaWRLZXlNYW5hZ2VyUm93PFQ+W10pIHtcbiAgICAvLyBXZSBhbGxvdyBmb3IgdGhlIHJvd3MgdG8gYmUgYW4gYXJyYXkgYmVjYXVzZSwgaW4gc29tZSBjYXNlcywgdGhlIGNvbnN1bWVyIG1heVxuICAgIC8vIG5vdCBoYXZlIGFjY2VzcyB0byBhIFF1ZXJ5TGlzdCBvZiB0aGUgcm93cyB0aGV5IHdhbnQgdG8gbWFuYWdlIChlLmcuIHdoZW4gdGhlXG4gICAgLy8gcm93cyBhcmVuJ3QgYmVpbmcgY29sbGVjdGVkIHZpYSBgVmlld0NoaWxkcmVuYCBvciBgQ29udGVudENoaWxkcmVuYCkuXG4gICAgaWYgKF9yb3dzIGluc3RhbmNlb2YgUXVlcnlMaXN0KSB7XG4gICAgICBfcm93cy5jaGFuZ2VzLnN1YnNjcmliZSgobmV3Um93czogUXVlcnlMaXN0PEdyaWRLZXlNYW5hZ2VyUm93PFQ+PikgPT4ge1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlUm93KSB7XG4gICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBuZXdSb3dzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVJvdyk7XG5cbiAgICAgICAgICBpZiAobmV3SW5kZXggPiAtMSAmJiBuZXdJbmRleCAhPT0gdGhpcy5fYWN0aXZlUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGFjdGl2ZSBjZWxsIG9mIHRoZSBncmlkIG1hbmFnZXIgY2hhbmdlcy4gKi9cbiAgY2hhbmdlID0gbmV3IFN1YmplY3Q8e3JvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcn0+KCk7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIGRpcmVjdGlvbmFsaXR5IG9mIHRoZSBrZXkgbWFuYWdlcidzIGhvcml6b250YWwgbW92ZW1lbnQuXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gRGlyZWN0aW9uIHdoaWNoIGlzIGNvbnNpZGVyZWQgZm9yd2FyZCBtb3ZlbWVudCBhY3Jvc3MgYSByb3cuXG4gICAqXG4gICAqIElmIHdpdGhEaXJlY3Rpb25hbGl0eSBpcyBub3Qgc2V0LCB0aGUgZGVmYXVsdCBpcyAnbHRyJy5cbiAgICovXG4gIHdpdGhEaXJlY3Rpb25hbGl0eShkaXJlY3Rpb246ICdsdHInIHwgJ3J0bCcpOiB0aGlzIHtcbiAgICB0aGlzLl9kaXIgPSBkaXJlY3Rpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGNlbGwgYXQgdGhlIGluZGljZXMgc3BlY2lmaWVkLlxuICAgKiBAcGFyYW0gY2VsbCBUaGUgcm93IGFuZCBjb2x1bW4gY29udGFpbmluZyB0aGUgY2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgc2V0QWN0aXZlQ2VsbChjZWxsOiB7cm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyfSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIHRvIHRoZSBjZWxsLlxuICAgKiBAcGFyYW0gY2VsbCBUaGUgY2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgc2V0QWN0aXZlQ2VsbChjZWxsOiBUKTogdm9pZDtcblxuICBzZXRBY3RpdmVDZWxsKGNlbGw6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzUm93SW5kZXggPSB0aGlzLl9hY3RpdmVSb3dJbmRleDtcbiAgICBjb25zdCBwcmV2aW91c0NvbHVtbkluZGV4ID0gdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXg7XG5cbiAgICB0aGlzLnVwZGF0ZUFjdGl2ZUNlbGwoY2VsbCk7XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlUm93SW5kZXggIT09IHByZXZpb3VzUm93SW5kZXggfHxcbiAgICAgIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ICE9PSBwcmV2aW91c0NvbHVtbkluZGV4KSB7XG4gICAgICB0aGlzLmNoYW5nZS5uZXh0KHtyb3c6IHRoaXMuX2FjdGl2ZVJvd0luZGV4LCBjb2x1bW46IHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIGRlcGVuZGluZyBvbiB0aGUga2V5IGV2ZW50IHBhc3NlZCBpbi5cbiAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50IHRvIGJlIHVzZWQgZm9yIGRldGVybWluaW5nIHdoaWNoIGVsZW1lbnQgc2hvdWxkIGJlIGFjdGl2ZS5cbiAgICovXG4gIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIHRoaXMuc2V0TmV4dFJvd0FjdGl2ZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgdGhpcy5zZXRQcmV2aW91c1Jvd0FjdGl2ZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgdGhpcy5fZGlyID09PSAncnRsJyA/IHRoaXMuc2V0UHJldmlvdXNDb2x1bW5BY3RpdmUoKSA6IHRoaXMuc2V0TmV4dENvbHVtbkFjdGl2ZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICB0aGlzLl9kaXIgPT09ICdydGwnID8gdGhpcy5zZXROZXh0Q29sdW1uQWN0aXZlKCkgOiB0aGlzLnNldFByZXZpb3VzQ29sdW1uQWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgcmV0dXJuIGhlcmUsIGluIG9yZGVyIHRvIGF2b2lkIHByZXZlbnRpbmdcbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgYWN0aW9uIG9mIG5vbi1uYXZpZ2F0aW9uYWwga2V5cy5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKiogSW5kZXggb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgcm93LiAqL1xuICBnZXQgYWN0aXZlUm93SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlUm93SW5kZXg7XG4gIH1cblxuICAvKiogSW5kZXggb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgY29sdW1uLiAqL1xuICBnZXQgYWN0aXZlQ29sdW1uSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXg7XG4gIH1cblxuICAvKiogVGhlIGFjdGl2ZSBjZWxsLiAqL1xuICBnZXQgYWN0aXZlQ2VsbCgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUNlbGw7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGZpcnN0IGNlbGwgaW4gdGhlIGdyaWQuICovXG4gIHNldEZpcnN0Q2VsbEFjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleCgwLCAwKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgY2VsbCB0byB0aGUgbGFzdCBjZWxsIGluIHRoZSBncmlkLiAqL1xuICBzZXRMYXN0Q2VsbEFjdGl2ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBsYXN0Um93SW5kZXggPSB0aGlzLl9yb3dzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgbGFzdFJvdyA9IHRoaXMuX2dldFJvd3NBcnJheSgpW2xhc3RSb3dJbmRleF07XG4gICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5SW5kZXgobGFzdFJvd0luZGV4LCBsYXN0Um93LmNlbGxzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGFjdGl2ZSByb3cgdG8gdGhlIG5leHQgcm93IGluIHRoZSBncmlkLiBBY3RpdmUgY29sdW1uIGlzIHVuY2hhbmdlZC4gKi9cbiAgc2V0TmV4dFJvd0FjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmVSb3dJbmRleCA8IDAgPyB0aGlzLnNldEZpcnN0Q2VsbEFjdGl2ZSgpIDogdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5RGVsdGEoMSwgMCk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgYWN0aXZlIHJvdyB0byB0aGUgcHJldmlvdXMgcm93IGluIHRoZSBncmlkLiBBY3RpdmUgY29sdW1uIGlzIHVuY2hhbmdlZC4gKi9cbiAgc2V0UHJldmlvdXNSb3dBY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5RGVsdGEoLTEsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjb2x1bW4gdG8gdGhlIG5leHQgY29sdW1uIGluIHRoZSBncmlkLlxuICAgKiBBY3RpdmUgcm93IGlzIHVuY2hhbmdlZCwgdW5sZXNzIHdlIHJlYWNoIHRoZSBlbmQgb2YgYSByb3cuXG4gICAqL1xuICBzZXROZXh0Q29sdW1uQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4IDwgMCA/IHRoaXMuc2V0Rmlyc3RDZWxsQWN0aXZlKCkgOiB0aGlzLl9zZXRBY3RpdmVDZWxsQnlEZWx0YSgwLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhY3RpdmUgY29sdW1uIHRvIHRoZSBwcmV2aW91cyBjb2x1bW4gaW4gdGhlIGdyaWQuXG4gICAqIEFjdGl2ZSByb3cgaXMgdW5jaGFuZ2VkLCB1bmxlc3Mgd2UgcmVhY2ggdGhlIGVuZCBvZiBhIHJvdy5cbiAgICovXG4gIHNldFByZXZpb3VzQ29sdW1uQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeURlbHRhKDAsIC0xKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc2V0dGluZyB0aGUgYWN0aXZlIGNlbGwgd2l0aG91dCBhbnkgb3RoZXIgZWZmZWN0cy5cbiAgICogQHBhcmFtIGNlbGwgUm93IGFuZCBjb2x1bW4gb2YgdGhlIGNlbGwgdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICovXG4gIHVwZGF0ZUFjdGl2ZUNlbGwoY2VsbDoge3JvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcn0pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc2V0dGluZyB0aGUgYWN0aXZlIGNlbGwgd2l0aG91dCBhbnkgb3RoZXIgZWZmZWN0cy5cbiAgICogQHBhcmFtIGNlbGwgQ2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgdXBkYXRlQWN0aXZlQ2VsbChjZWxsOiBUKTogdm9pZDtcblxuICB1cGRhdGVBY3RpdmVDZWxsKGNlbGw6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHJvd0FycmF5ID0gdGhpcy5fZ2V0Um93c0FycmF5KCk7XG5cbiAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjZWxsLnJvdyA9PT0gJ251bWJlcicgJiZcbiAgICAgIHR5cGVvZiBjZWxsLmNvbHVtbiA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4ID0gY2VsbC5yb3c7XG4gICAgICB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCA9IGNlbGwuY29sdW1uO1xuICAgICAgdGhpcy5fYWN0aXZlUm93ID0gcm93QXJyYXlbY2VsbC5yb3ddIHx8IG51bGw7XG4gICAgICB0aGlzLl9hY3RpdmVDZWxsID0gdGhpcy5fYWN0aXZlUm93ID8gdGhpcy5fYWN0aXZlUm93LmNlbGxzW2NlbGwuY29sdW1uXSB8fCBudWxsIDogbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcm93QXJyYXkuZm9yRWFjaCgocm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHJvdy5jZWxscy5pbmRleE9mKGNlbGwpO1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPSByb3dJbmRleDtcbiAgICAgICAgICB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCA9IGNvbHVtbkluZGV4O1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZVJvdyA9IHJvdztcbiAgICAgICAgICB0aGlzLl9hY3RpdmVDZWxsID0gcm93LmNlbGxzW2NvbHVtbkluZGV4XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldHMgdGhlIGFjdGl2ZSBjZWxsLCBnaXZlbiB0aGUgcm93IGFuZCBjb2x1bW5zIGRlbHRhc1xuICAgKiBiZXR3ZWVuIHRoZSBjdXJyZW50bHkgYWN0aXZlIGNlbGwgYW5kIHRoZSBuZXcgYWN0aXZlIGNlbGwuXG4gICAqL1xuICBwcml2YXRlIF9zZXRBY3RpdmVDZWxsQnlEZWx0YShyb3dEZWx0YTogLTEgfCAwIHwgMSwgY29sdW1uRGVsdGE6IC0xIHwgMCB8IDEpOiB2b2lkIHtcbiAgICAvLyBJZiBkZWx0YSBwdXRzIHVzIHBhc3QgdGhlIGxhc3QgY2VsbCBpbiBhIHJvdywgbW92ZSB0byB0aGUgZmlyc3QgY2VsbCBvZiB0aGUgbmV4dCByb3cuXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJvdyAmJiB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCArIGNvbHVtbkRlbHRhID49IHRoaXMuX2FjdGl2ZVJvdy5jZWxscy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeUluZGV4KHRoaXMuX2FjdGl2ZVJvd0luZGV4ICsgMSwgMCk7XG5cbiAgICAvLyBJZiBkZWx0YSBwdXRzIHVzIHByaW9yIHRvIHRoZSBmaXJzdCBjZWxsIGluIGEgcm93LCBtb3ZlIHRvIHRoZSBsYXN0IGNlbGwgb2YgdGhlIHByZXZpb3VzIHJvdy5cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ICsgY29sdW1uRGVsdGEgPCAwKSB7XG4gICAgICBjb25zdCBwcmV2aW91c1Jvd0luZGV4ID0gdGhpcy5fYWN0aXZlUm93SW5kZXggLSAxO1xuICAgICAgY29uc3QgcHJldmlvdXNSb3cgPSB0aGlzLl9nZXRSb3dzQXJyYXkoKVtwcmV2aW91c1Jvd0luZGV4XTtcbiAgICAgIGlmIChwcmV2aW91c1Jvdykge1xuICAgICAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleChwcmV2aW91c1Jvd0luZGV4LCBwcmV2aW91c1Jvdy5jZWxscy5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5SW5kZXgodGhpcy5fYWN0aXZlUm93SW5kZXggKyByb3dEZWx0YSxcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXggKyBjb2x1bW5EZWx0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIHRvIHRoZSBjZWxsIGF0IHRoZSBpbmRpY2VzIHNwZWNpZmllZCwgaWYgdGhleSBhcmUgdmFsaWQuXG4gICAqL1xuICBwcml2YXRlIF9zZXRBY3RpdmVDZWxsQnlJbmRleChyb3dJbmRleDogbnVtYmVyLCBjb2x1bW5JbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgcm93cyA9IHRoaXMuX2dldFJvd3NBcnJheSgpO1xuXG4gICAgY29uc3QgdGFyZ2V0Um93ID0gcm93c1tyb3dJbmRleF07XG5cbiAgICBpZiAoIXRhcmdldFJvdyB8fCAhdGFyZ2V0Um93LmNlbGxzW2NvbHVtbkluZGV4XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QWN0aXZlQ2VsbCh7cm93OiByb3dJbmRleCwgY29sdW1uOiBjb2x1bW5JbmRleH0pO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIHJvd3MgYXMgYW4gYXJyYXkuICovXG4gIHByaXZhdGUgX2dldFJvd3NBcnJheSgpOiBHcmlkS2V5TWFuYWdlclJvdzxUPltdIHtcbiAgICByZXR1cm4gdGhpcy5fcm93cyBpbnN0YW5jZW9mIFF1ZXJ5TGlzdCA/IHRoaXMuX3Jvd3MudG9BcnJheSgpIDogdGhpcy5fcm93cztcbiAgfVxufVxuIl19