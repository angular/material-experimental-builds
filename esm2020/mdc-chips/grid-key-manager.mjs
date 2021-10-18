/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, HOME, END } from '@angular/cdk/keycodes';
/** The keys handled by the GridKeyManager keydown method. */
export const NAVIGATION_KEYS = [DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW];
/**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 */
export class GridKeyManager {
    constructor(_rows) {
        this._rows = _rows;
        this._activeRowIndex = -1;
        this._activeColumnIndex = -1;
        this._activeRow = null;
        this._activeCell = null;
        this._dir = 'ltr';
        this._homeAndEnd = false;
        /** Stream that emits whenever the active cell of the grid manager changes. */
        this.change = new Subject();
        // We allow for the rows to be an array because, in some cases, the consumer may
        // not have access to a QueryList of the rows they want to manage (e.g. when the
        // rows aren't being collected via `ViewChildren` or `ContentChildren`).
        if (_rows instanceof QueryList) {
            _rows.changes.subscribe((newRows) => {
                if (this._activeRow) {
                    const newIndex = newRows.toArray().indexOf(this._activeRow);
                    if (newIndex > -1 && newIndex !== this._activeRowIndex) {
                        this._activeRowIndex = newIndex;
                    }
                }
            });
        }
    }
    /**
     * Configures the directionality of the key manager's horizontal movement.
     * @param direction Direction which is considered forward movement across a row.
     *
     * If withDirectionality is not set, the default is 'ltr'.
     */
    withDirectionality(direction) {
        this._dir = direction;
        return this;
    }
    setActiveCell(cell) {
        const previousRowIndex = this._activeRowIndex;
        const previousColumnIndex = this._activeColumnIndex;
        this.updateActiveCell(cell);
        if (this._activeRowIndex !== previousRowIndex ||
            this._activeColumnIndex !== previousColumnIndex) {
            this.change.next({ row: this._activeRowIndex, column: this._activeColumnIndex });
        }
    }
    /**
     * Configures the key manager to activate the first and last items
     * respectively when the Home or End key is pressed.
     * @param enabled Whether pressing the Home or End key activates the first/last item.
     */
    withHomeAndEnd(enabled = true) {
        this._homeAndEnd = enabled;
        return this;
    }
    /**
     * Sets the active cell depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    onKeydown(event) {
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
            case HOME:
                if (this._homeAndEnd) {
                    this.setFirstCellActive();
                    break;
                }
                else {
                    return;
                }
            case END:
                if (this._homeAndEnd) {
                    this.setLastCellActive();
                    break;
                }
                else {
                    return;
                }
            default:
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        event.preventDefault();
    }
    /** Index of the currently active row. */
    get activeRowIndex() {
        return this._activeRowIndex;
    }
    /** Index of the currently active column. */
    get activeColumnIndex() {
        return this._activeColumnIndex;
    }
    /** The active cell. */
    get activeCell() {
        return this._activeCell;
    }
    /** Sets the active cell to the first cell in the grid. */
    setFirstCellActive() {
        this._setActiveCellByIndex(0, 0);
    }
    /** Sets the active cell to the last cell in the grid. */
    setLastCellActive() {
        const lastRowIndex = this._rows.length - 1;
        const lastRow = this._getRowsArray()[lastRowIndex];
        this._setActiveCellByIndex(lastRowIndex, lastRow.cells.length - 1);
    }
    /** Sets the active row to the next row in the grid. Active column is unchanged. */
    setNextRowActive() {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(1, 0);
    }
    /** Sets the active row to the previous row in the grid. Active column is unchanged. */
    setPreviousRowActive() {
        this._setActiveCellByDelta(-1, 0);
    }
    /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    setNextColumnActive() {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(0, 1);
    }
    /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    setPreviousColumnActive() {
        this._setActiveCellByDelta(0, -1);
    }
    updateActiveCell(cell) {
        const rowArray = this._getRowsArray();
        if (typeof cell === 'object' &&
            typeof cell.row === 'number' &&
            typeof cell.column === 'number') {
            this._activeRowIndex = cell.row;
            this._activeColumnIndex = cell.column;
            this._activeRow = rowArray[cell.row] || null;
            this._activeCell = this._activeRow ? this._activeRow.cells[cell.column] || null : null;
        }
        else {
            rowArray.forEach((row, rowIndex) => {
                const columnIndex = row.cells.indexOf(cell);
                if (columnIndex !== -1) {
                    this._activeRowIndex = rowIndex;
                    this._activeColumnIndex = columnIndex;
                    this._activeRow = row;
                    this._activeCell = row.cells[columnIndex];
                }
            });
        }
    }
    /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     */
    _setActiveCellByDelta(rowDelta, columnDelta) {
        // If delta puts us past the last cell in a row, move to the first cell of the next row.
        if (this._activeRow && this._activeColumnIndex + columnDelta >= this._activeRow.cells.length) {
            this._setActiveCellByIndex(this._activeRowIndex + 1, 0);
            // If delta puts us prior to the first cell in a row, move to the last cell of the previous row.
        }
        else if (this._activeColumnIndex + columnDelta < 0) {
            const previousRowIndex = this._activeRowIndex - 1;
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
     */
    _setActiveCellByIndex(rowIndex, columnIndex) {
        const rows = this._getRowsArray();
        const targetRow = rows[rowIndex];
        if (!targetRow || !targetRow.cells[columnIndex]) {
            return;
        }
        this.setActiveCell({ row: rowIndex, column: columnIndex });
    }
    /** Returns the rows as an array. */
    _getRowsArray() {
        return this._rows instanceof QueryList ? this._rows.toArray() : this._rows;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2dyaWQta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRS9GLDZEQUE2RDtBQUM3RCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQU8vRTs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQVF6QixZQUFvQixLQUErRDtRQUEvRCxVQUFLLEdBQUwsS0FBSyxDQUEwRDtRQVAzRSxvQkFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLHVCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLGVBQVUsR0FBZ0MsSUFBSSxDQUFDO1FBQy9DLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLFNBQUksR0FBa0IsS0FBSyxDQUFDO1FBQzVCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBbUI1Qiw4RUFBOEU7UUFDOUUsV0FBTSxHQUFHLElBQUksT0FBTyxFQUFpQyxDQUFDO1FBakJwRCxnRkFBZ0Y7UUFDaEYsZ0ZBQWdGO1FBQ2hGLHdFQUF3RTtRQUN4RSxJQUFJLEtBQUssWUFBWSxTQUFTLEVBQUU7WUFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUF3QyxFQUFFLEVBQUU7Z0JBQ25FLElBQUksSUFB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QUUsV0FBVyxFQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsb0NBQW9DO0lBQzVCLGFBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7VVBfQVJST1csIERPV05fQVJST1csIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBIT01FLCBFTkR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbi8qKiBUaGUga2V5cyBoYW5kbGVkIGJ5IHRoZSBHcmlkS2V5TWFuYWdlciBrZXlkb3duIG1ldGhvZC4gKi9cbmV4cG9ydCBjb25zdCBOQVZJR0FUSU9OX0tFWVMgPSBbRE9XTl9BUlJPVywgVVBfQVJST1csIFJJR0hUX0FSUk9XLCBMRUZUX0FSUk9XXTtcblxuLyoqIFRoaXMgaW50ZXJmYWNlIGlzIGZvciByb3dzIHRoYXQgY2FuIGJlIHBhc3NlZCB0byBhIEdyaWRLZXlNYW5hZ2VyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkS2V5TWFuYWdlclJvdzxUPiB7XG4gIGNlbGxzOiBUW107XG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyBtYW5hZ2VzIGtleWJvYXJkIGV2ZW50cyBmb3IgZ3JpZHMuIElmIHlvdSBwYXNzIGl0IGEgcXVlcnkgbGlzdFxuICogb2YgR3JpZEtleU1hbmFnZXJSb3csIGl0IHdpbGwgc2V0IHRoZSBhY3RpdmUgY2VsbCBjb3JyZWN0bHkgd2hlbiBhcnJvdyBldmVudHMgb2NjdXIuXG4gKlxuICogR3JpZEtleU1hbmFnZXIgZXhwZWN0cyB0aGF0IHJvd3MgbWF5IGNoYW5nZSBkeW5hbWljYWxseSwgYnV0IHRoZSBjZWxscyBmb3IgYSBnaXZlbiByb3cgYXJlXG4gKiBzdGF0aWMuIEl0IGFsc28gZXhwZWN0cyB0aGF0IGFsbCByb3dzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGNlbGxzLlxuICovXG5leHBvcnQgY2xhc3MgR3JpZEtleU1hbmFnZXI8VD4ge1xuICBwcml2YXRlIF9hY3RpdmVSb3dJbmRleCA9IC0xO1xuICBwcml2YXRlIF9hY3RpdmVDb2x1bW5JbmRleCA9IC0xO1xuICBwcml2YXRlIF9hY3RpdmVSb3c6IEdyaWRLZXlNYW5hZ2VyUm93PFQ+IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2FjdGl2ZUNlbGw6IFQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfZGlyOiAnbHRyJyB8ICdydGwnID0gJ2x0cic7XG4gIHByaXZhdGUgX2hvbWVBbmRFbmQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3dzOiBRdWVyeUxpc3Q8R3JpZEtleU1hbmFnZXJSb3c8VD4+IHwgR3JpZEtleU1hbmFnZXJSb3c8VD5bXSkge1xuICAgIC8vIFdlIGFsbG93IGZvciB0aGUgcm93cyB0byBiZSBhbiBhcnJheSBiZWNhdXNlLCBpbiBzb21lIGNhc2VzLCB0aGUgY29uc3VtZXIgbWF5XG4gICAgLy8gbm90IGhhdmUgYWNjZXNzIHRvIGEgUXVlcnlMaXN0IG9mIHRoZSByb3dzIHRoZXkgd2FudCB0byBtYW5hZ2UgKGUuZy4gd2hlbiB0aGVcbiAgICAvLyByb3dzIGFyZW4ndCBiZWluZyBjb2xsZWN0ZWQgdmlhIGBWaWV3Q2hpbGRyZW5gIG9yIGBDb250ZW50Q2hpbGRyZW5gKS5cbiAgICBpZiAoX3Jvd3MgaW5zdGFuY2VvZiBRdWVyeUxpc3QpIHtcbiAgICAgIF9yb3dzLmNoYW5nZXMuc3Vic2NyaWJlKChuZXdSb3dzOiBRdWVyeUxpc3Q8R3JpZEtleU1hbmFnZXJSb3c8VD4+KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVSb3cpIHtcbiAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IG5ld1Jvd3MudG9BcnJheSgpLmluZGV4T2YodGhpcy5fYWN0aXZlUm93KTtcblxuICAgICAgICAgIGlmIChuZXdJbmRleCA+IC0xICYmIG5ld0luZGV4ICE9PSB0aGlzLl9hY3RpdmVSb3dJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgYWN0aXZlIGNlbGwgb2YgdGhlIGdyaWQgbWFuYWdlciBjaGFuZ2VzLiAqL1xuICBjaGFuZ2UgPSBuZXcgU3ViamVjdDx7cm93OiBudW1iZXI7IGNvbHVtbjogbnVtYmVyfT4oKTtcblxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgZGlyZWN0aW9uYWxpdHkgb2YgdGhlIGtleSBtYW5hZ2VyJ3MgaG9yaXpvbnRhbCBtb3ZlbWVudC5cbiAgICogQHBhcmFtIGRpcmVjdGlvbiBEaXJlY3Rpb24gd2hpY2ggaXMgY29uc2lkZXJlZCBmb3J3YXJkIG1vdmVtZW50IGFjcm9zcyBhIHJvdy5cbiAgICpcbiAgICogSWYgd2l0aERpcmVjdGlvbmFsaXR5IGlzIG5vdCBzZXQsIHRoZSBkZWZhdWx0IGlzICdsdHInLlxuICAgKi9cbiAgd2l0aERpcmVjdGlvbmFsaXR5KGRpcmVjdGlvbjogJ2x0cicgfCAncnRsJyk6IHRoaXMge1xuICAgIHRoaXMuX2RpciA9IGRpcmVjdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhY3RpdmUgY2VsbCB0byB0aGUgY2VsbCBhdCB0aGUgaW5kaWNlcyBzcGVjaWZpZWQuXG4gICAqIEBwYXJhbSBjZWxsIFRoZSByb3cgYW5kIGNvbHVtbiBjb250YWluaW5nIHRoZSBjZWxsIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICBzZXRBY3RpdmVDZWxsKGNlbGw6IHtyb3c6IG51bWJlcjsgY29sdW1uOiBudW1iZXJ9KTogdm9pZDtcblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGNlbGwuXG4gICAqIEBwYXJhbSBjZWxsIFRoZSBjZWxsIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICBzZXRBY3RpdmVDZWxsKGNlbGw6IFQpOiB2b2lkO1xuXG4gIHNldEFjdGl2ZUNlbGwoY2VsbDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXNSb3dJbmRleCA9IHRoaXMuX2FjdGl2ZVJvd0luZGV4O1xuICAgIGNvbnN0IHByZXZpb3VzQ29sdW1uSW5kZXggPSB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleDtcblxuICAgIHRoaXMudXBkYXRlQWN0aXZlQ2VsbChjZWxsKTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4ICE9PSBwcmV2aW91c1Jvd0luZGV4IHx8XG4gICAgICB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCAhPT0gcHJldmlvdXNDb2x1bW5JbmRleFxuICAgICkge1xuICAgICAgdGhpcy5jaGFuZ2UubmV4dCh7cm93OiB0aGlzLl9hY3RpdmVSb3dJbmRleCwgY29sdW1uOiB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBrZXkgbWFuYWdlciB0byBhY3RpdmF0ZSB0aGUgZmlyc3QgYW5kIGxhc3QgaXRlbXNcbiAgICogcmVzcGVjdGl2ZWx5IHdoZW4gdGhlIEhvbWUgb3IgRW5kIGtleSBpcyBwcmVzc2VkLlxuICAgKiBAcGFyYW0gZW5hYmxlZCBXaGV0aGVyIHByZXNzaW5nIHRoZSBIb21lIG9yIEVuZCBrZXkgYWN0aXZhdGVzIHRoZSBmaXJzdC9sYXN0IGl0ZW0uXG4gICAqL1xuICB3aXRoSG9tZUFuZEVuZChlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IHRoaXMge1xuICAgIHRoaXMuX2hvbWVBbmRFbmQgPSBlbmFibGVkO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIGRlcGVuZGluZyBvbiB0aGUga2V5IGV2ZW50IHBhc3NlZCBpbi5cbiAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50IHRvIGJlIHVzZWQgZm9yIGRldGVybWluaW5nIHdoaWNoIGVsZW1lbnQgc2hvdWxkIGJlIGFjdGl2ZS5cbiAgICovXG4gIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIHRoaXMuc2V0TmV4dFJvd0FjdGl2ZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgdGhpcy5zZXRQcmV2aW91c1Jvd0FjdGl2ZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgdGhpcy5fZGlyID09PSAncnRsJyA/IHRoaXMuc2V0UHJldmlvdXNDb2x1bW5BY3RpdmUoKSA6IHRoaXMuc2V0TmV4dENvbHVtbkFjdGl2ZSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICB0aGlzLl9kaXIgPT09ICdydGwnID8gdGhpcy5zZXROZXh0Q29sdW1uQWN0aXZlKCkgOiB0aGlzLnNldFByZXZpb3VzQ29sdW1uQWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEhPTUU6XG4gICAgICAgIGlmICh0aGlzLl9ob21lQW5kRW5kKSB7XG4gICAgICAgICAgdGhpcy5zZXRGaXJzdENlbGxBY3RpdmUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgY2FzZSBFTkQ6XG4gICAgICAgIGlmICh0aGlzLl9ob21lQW5kRW5kKSB7XG4gICAgICAgICAgdGhpcy5zZXRMYXN0Q2VsbEFjdGl2ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgcmV0dXJuIGhlcmUsIGluIG9yZGVyIHRvIGF2b2lkIHByZXZlbnRpbmdcbiAgICAgICAgLy8gdGhlIGRlZmF1bHQgYWN0aW9uIG9mIG5vbi1uYXZpZ2F0aW9uYWwga2V5cy5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKiogSW5kZXggb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgcm93LiAqL1xuICBnZXQgYWN0aXZlUm93SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlUm93SW5kZXg7XG4gIH1cblxuICAvKiogSW5kZXggb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgY29sdW1uLiAqL1xuICBnZXQgYWN0aXZlQ29sdW1uSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXg7XG4gIH1cblxuICAvKiogVGhlIGFjdGl2ZSBjZWxsLiAqL1xuICBnZXQgYWN0aXZlQ2VsbCgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUNlbGw7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGZpcnN0IGNlbGwgaW4gdGhlIGdyaWQuICovXG4gIHNldEZpcnN0Q2VsbEFjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleCgwLCAwKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgY2VsbCB0byB0aGUgbGFzdCBjZWxsIGluIHRoZSBncmlkLiAqL1xuICBzZXRMYXN0Q2VsbEFjdGl2ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBsYXN0Um93SW5kZXggPSB0aGlzLl9yb3dzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgbGFzdFJvdyA9IHRoaXMuX2dldFJvd3NBcnJheSgpW2xhc3RSb3dJbmRleF07XG4gICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5SW5kZXgobGFzdFJvd0luZGV4LCBsYXN0Um93LmNlbGxzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGFjdGl2ZSByb3cgdG8gdGhlIG5leHQgcm93IGluIHRoZSBncmlkLiBBY3RpdmUgY29sdW1uIGlzIHVuY2hhbmdlZC4gKi9cbiAgc2V0TmV4dFJvd0FjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmVSb3dJbmRleCA8IDAgPyB0aGlzLnNldEZpcnN0Q2VsbEFjdGl2ZSgpIDogdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5RGVsdGEoMSwgMCk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgYWN0aXZlIHJvdyB0byB0aGUgcHJldmlvdXMgcm93IGluIHRoZSBncmlkLiBBY3RpdmUgY29sdW1uIGlzIHVuY2hhbmdlZC4gKi9cbiAgc2V0UHJldmlvdXNSb3dBY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5RGVsdGEoLTEsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjb2x1bW4gdG8gdGhlIG5leHQgY29sdW1uIGluIHRoZSBncmlkLlxuICAgKiBBY3RpdmUgcm93IGlzIHVuY2hhbmdlZCwgdW5sZXNzIHdlIHJlYWNoIHRoZSBlbmQgb2YgYSByb3cuXG4gICAqL1xuICBzZXROZXh0Q29sdW1uQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4IDwgMCA/IHRoaXMuc2V0Rmlyc3RDZWxsQWN0aXZlKCkgOiB0aGlzLl9zZXRBY3RpdmVDZWxsQnlEZWx0YSgwLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhY3RpdmUgY29sdW1uIHRvIHRoZSBwcmV2aW91cyBjb2x1bW4gaW4gdGhlIGdyaWQuXG4gICAqIEFjdGl2ZSByb3cgaXMgdW5jaGFuZ2VkLCB1bmxlc3Mgd2UgcmVhY2ggdGhlIGVuZCBvZiBhIHJvdy5cbiAgICovXG4gIHNldFByZXZpb3VzQ29sdW1uQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeURlbHRhKDAsIC0xKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc2V0dGluZyB0aGUgYWN0aXZlIGNlbGwgd2l0aG91dCBhbnkgb3RoZXIgZWZmZWN0cy5cbiAgICogQHBhcmFtIGNlbGwgUm93IGFuZCBjb2x1bW4gb2YgdGhlIGNlbGwgdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICovXG4gIHVwZGF0ZUFjdGl2ZUNlbGwoY2VsbDoge3JvdzogbnVtYmVyOyBjb2x1bW46IG51bWJlcn0pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc2V0dGluZyB0aGUgYWN0aXZlIGNlbGwgd2l0aG91dCBhbnkgb3RoZXIgZWZmZWN0cy5cbiAgICogQHBhcmFtIGNlbGwgQ2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgdXBkYXRlQWN0aXZlQ2VsbChjZWxsOiBUKTogdm9pZDtcblxuICB1cGRhdGVBY3RpdmVDZWxsKGNlbGw6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHJvd0FycmF5ID0gdGhpcy5fZ2V0Um93c0FycmF5KCk7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBjZWxsLnJvdyA9PT0gJ251bWJlcicgJiZcbiAgICAgIHR5cGVvZiBjZWxsLmNvbHVtbiA9PT0gJ251bWJlcidcbiAgICApIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4ID0gY2VsbC5yb3c7XG4gICAgICB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCA9IGNlbGwuY29sdW1uO1xuICAgICAgdGhpcy5fYWN0aXZlUm93ID0gcm93QXJyYXlbY2VsbC5yb3ddIHx8IG51bGw7XG4gICAgICB0aGlzLl9hY3RpdmVDZWxsID0gdGhpcy5fYWN0aXZlUm93ID8gdGhpcy5fYWN0aXZlUm93LmNlbGxzW2NlbGwuY29sdW1uXSB8fCBudWxsIDogbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcm93QXJyYXkuZm9yRWFjaCgocm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHJvdy5jZWxscy5pbmRleE9mKGNlbGwpO1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPSByb3dJbmRleDtcbiAgICAgICAgICB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCA9IGNvbHVtbkluZGV4O1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZVJvdyA9IHJvdztcbiAgICAgICAgICB0aGlzLl9hY3RpdmVDZWxsID0gcm93LmNlbGxzW2NvbHVtbkluZGV4XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldHMgdGhlIGFjdGl2ZSBjZWxsLCBnaXZlbiB0aGUgcm93IGFuZCBjb2x1bW5zIGRlbHRhc1xuICAgKiBiZXR3ZWVuIHRoZSBjdXJyZW50bHkgYWN0aXZlIGNlbGwgYW5kIHRoZSBuZXcgYWN0aXZlIGNlbGwuXG4gICAqL1xuICBwcml2YXRlIF9zZXRBY3RpdmVDZWxsQnlEZWx0YShyb3dEZWx0YTogLTEgfCAwIHwgMSwgY29sdW1uRGVsdGE6IC0xIHwgMCB8IDEpOiB2b2lkIHtcbiAgICAvLyBJZiBkZWx0YSBwdXRzIHVzIHBhc3QgdGhlIGxhc3QgY2VsbCBpbiBhIHJvdywgbW92ZSB0byB0aGUgZmlyc3QgY2VsbCBvZiB0aGUgbmV4dCByb3cuXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJvdyAmJiB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCArIGNvbHVtbkRlbHRhID49IHRoaXMuX2FjdGl2ZVJvdy5jZWxscy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeUluZGV4KHRoaXMuX2FjdGl2ZVJvd0luZGV4ICsgMSwgMCk7XG5cbiAgICAgIC8vIElmIGRlbHRhIHB1dHMgdXMgcHJpb3IgdG8gdGhlIGZpcnN0IGNlbGwgaW4gYSByb3csIG1vdmUgdG8gdGhlIGxhc3QgY2VsbCBvZiB0aGUgcHJldmlvdXMgcm93LlxuICAgIH0gZWxzZSBpZiAodGhpcy5fYWN0aXZlQ29sdW1uSW5kZXggKyBjb2x1bW5EZWx0YSA8IDApIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzUm93SW5kZXggPSB0aGlzLl9hY3RpdmVSb3dJbmRleCAtIDE7XG4gICAgICBjb25zdCBwcmV2aW91c1JvdyA9IHRoaXMuX2dldFJvd3NBcnJheSgpW3ByZXZpb3VzUm93SW5kZXhdO1xuICAgICAgaWYgKHByZXZpb3VzUm93KSB7XG4gICAgICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeUluZGV4KHByZXZpb3VzUm93SW5kZXgsIHByZXZpb3VzUm93LmNlbGxzLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleChcbiAgICAgICAgdGhpcy5fYWN0aXZlUm93SW5kZXggKyByb3dEZWx0YSxcbiAgICAgICAgdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXggKyBjb2x1bW5EZWx0YSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIHRvIHRoZSBjZWxsIGF0IHRoZSBpbmRpY2VzIHNwZWNpZmllZCwgaWYgdGhleSBhcmUgdmFsaWQuXG4gICAqL1xuICBwcml2YXRlIF9zZXRBY3RpdmVDZWxsQnlJbmRleChyb3dJbmRleDogbnVtYmVyLCBjb2x1bW5JbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgcm93cyA9IHRoaXMuX2dldFJvd3NBcnJheSgpO1xuXG4gICAgY29uc3QgdGFyZ2V0Um93ID0gcm93c1tyb3dJbmRleF07XG5cbiAgICBpZiAoIXRhcmdldFJvdyB8fCAhdGFyZ2V0Um93LmNlbGxzW2NvbHVtbkluZGV4XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QWN0aXZlQ2VsbCh7cm93OiByb3dJbmRleCwgY29sdW1uOiBjb2x1bW5JbmRleH0pO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIHJvd3MgYXMgYW4gYXJyYXkuICovXG4gIHByaXZhdGUgX2dldFJvd3NBcnJheSgpOiBHcmlkS2V5TWFuYWdlclJvdzxUPltdIHtcbiAgICByZXR1cm4gdGhpcy5fcm93cyBpbnN0YW5jZW9mIFF1ZXJ5TGlzdCA/IHRoaXMuX3Jvd3MudG9BcnJheSgpIDogdGhpcy5fcm93cztcbiAgfVxufVxuIl19