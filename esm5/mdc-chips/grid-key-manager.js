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
/** The keys handled by the GridKeyManager keydown method. */
export var NAVIGATION_KEYS = [DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW];
/**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 */
var GridKeyManager = /** @class */ (function () {
    function GridKeyManager(_rows) {
        var _this = this;
        this._rows = _rows;
        this._activeRowIndex = -1;
        this._activeColumnIndex = -1;
        this._activeRow = null;
        this._activeCell = null;
        this._dir = 'ltr';
        /** Stream that emits whenever the active cell of the grid manager changes. */
        this.change = new Subject();
        // We allow for the rows to be an array because, in some cases, the consumer may
        // not have access to a QueryList of the rows they want to manage (e.g. when the
        // rows aren't being collected via `ViewChildren` or `ContentChildren`).
        if (_rows instanceof QueryList) {
            _rows.changes.subscribe(function (newRows) {
                if (_this._activeRow) {
                    var newIndex = newRows.toArray().indexOf(_this._activeRow);
                    if (newIndex > -1 && newIndex !== _this._activeRowIndex) {
                        _this._activeRowIndex = newIndex;
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
    GridKeyManager.prototype.withDirectionality = function (direction) {
        this._dir = direction;
        return this;
    };
    GridKeyManager.prototype.setActiveCell = function (cell) {
        var previousRowIndex = this._activeRowIndex;
        var previousColumnIndex = this._activeColumnIndex;
        this.updateActiveCell(cell);
        if (this._activeRowIndex !== previousRowIndex ||
            this._activeColumnIndex !== previousColumnIndex) {
            this.change.next({ row: this._activeRowIndex, column: this._activeColumnIndex });
        }
    };
    /**
     * Sets the active cell depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    GridKeyManager.prototype.onKeydown = function (event) {
        var keyCode = event.keyCode;
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
    };
    Object.defineProperty(GridKeyManager.prototype, "activeRowIndex", {
        /** Index of the currently active row. */
        get: function () {
            return this._activeRowIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridKeyManager.prototype, "activeColumnIndex", {
        /** Index of the currently active column. */
        get: function () {
            return this._activeColumnIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridKeyManager.prototype, "activeCell", {
        /** The active cell. */
        get: function () {
            return this._activeCell;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the active cell to the first cell in the grid. */
    GridKeyManager.prototype.setFirstCellActive = function () {
        this._setActiveCellByIndex(0, 0);
    };
    /** Sets the active cell to the last cell in the grid. */
    GridKeyManager.prototype.setLastCellActive = function () {
        var lastRowIndex = this._rows.length - 1;
        var lastRow = this._getRowsArray()[lastRowIndex];
        this._setActiveCellByIndex(lastRowIndex, lastRow.cells.length - 1);
    };
    /** Sets the active row to the next row in the grid. Active column is unchanged. */
    GridKeyManager.prototype.setNextRowActive = function () {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(1, 0);
    };
    /** Sets the active row to the previous row in the grid. Active column is unchanged. */
    GridKeyManager.prototype.setPreviousRowActive = function () {
        this._setActiveCellByDelta(-1, 0);
    };
    /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    GridKeyManager.prototype.setNextColumnActive = function () {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(0, 1);
    };
    /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    GridKeyManager.prototype.setPreviousColumnActive = function () {
        this._setActiveCellByDelta(0, -1);
    };
    GridKeyManager.prototype.updateActiveCell = function (cell) {
        var _this = this;
        var rowArray = this._getRowsArray();
        if (typeof cell === 'object' && typeof cell.row === 'number' &&
            typeof cell.column === 'number') {
            this._activeRowIndex = cell.row;
            this._activeColumnIndex = cell.column;
            this._activeRow = rowArray[cell.row] || null;
            this._activeCell = this._activeRow ? this._activeRow.cells[cell.column] || null : null;
        }
        else {
            rowArray.forEach(function (row, rowIndex) {
                var columnIndex = row.cells.indexOf(cell);
                if (columnIndex !== -1) {
                    _this._activeRowIndex = rowIndex;
                    _this._activeColumnIndex = columnIndex;
                    _this._activeRow = row;
                    _this._activeCell = row.cells[columnIndex];
                }
            });
        }
    };
    /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     */
    GridKeyManager.prototype._setActiveCellByDelta = function (rowDelta, columnDelta) {
        // If delta puts us past the last cell in a row, move to the first cell of the next row.
        if (this._activeRow && this._activeColumnIndex + columnDelta >= this._activeRow.cells.length) {
            this._setActiveCellByIndex(this._activeRowIndex + 1, 0);
            // If delta puts us prior to the first cell in a row, move to the last cell of the previous row.
        }
        else if (this._activeColumnIndex + columnDelta < 0) {
            var previousRowIndex = this._activeRowIndex - 1;
            var previousRow = this._getRowsArray()[previousRowIndex];
            if (previousRow) {
                this._setActiveCellByIndex(previousRowIndex, previousRow.cells.length - 1);
            }
        }
        else {
            this._setActiveCellByIndex(this._activeRowIndex + rowDelta, this._activeColumnIndex + columnDelta);
        }
    };
    /**
     * Sets the active cell to the cell at the indices specified, if they are valid.
     */
    GridKeyManager.prototype._setActiveCellByIndex = function (rowIndex, columnIndex) {
        var rows = this._getRowsArray();
        var targetRow = rows[rowIndex];
        if (!targetRow || !targetRow.cells[columnIndex]) {
            return;
        }
        this.setActiveCell({ row: rowIndex, column: columnIndex });
    };
    /** Returns the rows as an array. */
    GridKeyManager.prototype._getRowsArray = function () {
        return this._rows instanceof QueryList ? this._rows.toArray() : this._rows;
    };
    return GridKeyManager;
}());
export { GridKeyManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2dyaWQta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFDTCxRQUFRLEVBQ1IsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEdBQ1osTUFBTSx1QkFBdUIsQ0FBQztBQUcvQiw2REFBNkQ7QUFDN0QsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFPL0U7Ozs7OztHQU1HO0FBQ0g7SUFPRSx3QkFBb0IsS0FBK0Q7UUFBbkYsaUJBZUM7UUFmbUIsVUFBSyxHQUFMLEtBQUssQ0FBMEQ7UUFOM0Usb0JBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQix1QkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QixlQUFVLEdBQWdDLElBQUksQ0FBQztRQUMvQyxnQkFBVyxHQUFhLElBQUksQ0FBQztRQUM3QixTQUFJLEdBQWtCLEtBQUssQ0FBQztRQW1CcEMsOEVBQThFO1FBQzlFLFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQWpCcEQsZ0ZBQWdGO1FBQ2hGLGdGQUFnRjtRQUNoRix3RUFBd0U7UUFDeEUsSUFBSSxLQUFLLFlBQVksU0FBUyxFQUFFO1lBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBd0M7Z0JBQy9ELElBQUksS0FBSSxDQUFDLFVBQVUsRUFBRTtvQkFDbkIsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFD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TEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBVUF9BUlJPVyxcbiAgRE9XTl9BUlJPVyxcbiAgTEVGVF9BUlJPVyxcbiAgUklHSFRfQVJST1csXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cblxuLyoqIFRoZSBrZXlzIGhhbmRsZWQgYnkgdGhlIEdyaWRLZXlNYW5hZ2VyIGtleWRvd24gbWV0aG9kLiAqL1xuZXhwb3J0IGNvbnN0IE5BVklHQVRJT05fS0VZUyA9IFtET1dOX0FSUk9XLCBVUF9BUlJPVywgUklHSFRfQVJST1csIExFRlRfQVJST1ddO1xuXG4vKiogVGhpcyBpbnRlcmZhY2UgaXMgZm9yIHJvd3MgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIGEgR3JpZEtleU1hbmFnZXIuICovXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRLZXlNYW5hZ2VyUm93PFQ+IHtcbiAgY2VsbHM6IFRbXTtcbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIG1hbmFnZXMga2V5Ym9hcmQgZXZlbnRzIGZvciBncmlkcy4gSWYgeW91IHBhc3MgaXQgYSBxdWVyeSBsaXN0XG4gKiBvZiBHcmlkS2V5TWFuYWdlclJvdywgaXQgd2lsbCBzZXQgdGhlIGFjdGl2ZSBjZWxsIGNvcnJlY3RseSB3aGVuIGFycm93IGV2ZW50cyBvY2N1ci5cbiAqXG4gKiBHcmlkS2V5TWFuYWdlciBleHBlY3RzIHRoYXQgcm93cyBtYXkgY2hhbmdlIGR5bmFtaWNhbGx5LCBidXQgdGhlIGNlbGxzIGZvciBhIGdpdmVuIHJvdyBhcmVcbiAqIHN0YXRpYy4gSXQgYWxzbyBleHBlY3RzIHRoYXQgYWxsIHJvd3MgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgY2VsbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBHcmlkS2V5TWFuYWdlcjxUPiB7XG4gIHByaXZhdGUgX2FjdGl2ZVJvd0luZGV4ID0gLTE7XG4gIHByaXZhdGUgX2FjdGl2ZUNvbHVtbkluZGV4ID0gLTE7XG4gIHByaXZhdGUgX2FjdGl2ZVJvdzogR3JpZEtleU1hbmFnZXJSb3c8VD4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfYWN0aXZlQ2VsbDogVCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9kaXI6ICdsdHInIHwgJ3J0bCcgPSAnbHRyJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3dzOiBRdWVyeUxpc3Q8R3JpZEtleU1hbmFnZXJSb3c8VD4+IHwgR3JpZEtleU1hbmFnZXJSb3c8VD5bXSkge1xuICAgIC8vIFdlIGFsbG93IGZvciB0aGUgcm93cyB0byBiZSBhbiBhcnJheSBiZWNhdXNlLCBpbiBzb21lIGNhc2VzLCB0aGUgY29uc3VtZXIgbWF5XG4gICAgLy8gbm90IGhhdmUgYWNjZXNzIHRvIGEgUXVlcnlMaXN0IG9mIHRoZSByb3dzIHRoZXkgd2FudCB0byBtYW5hZ2UgKGUuZy4gd2hlbiB0aGVcbiAgICAvLyByb3dzIGFyZW4ndCBiZWluZyBjb2xsZWN0ZWQgdmlhIGBWaWV3Q2hpbGRyZW5gIG9yIGBDb250ZW50Q2hpbGRyZW5gKS5cbiAgICBpZiAoX3Jvd3MgaW5zdGFuY2VvZiBRdWVyeUxpc3QpIHtcbiAgICAgIF9yb3dzLmNoYW5nZXMuc3Vic2NyaWJlKChuZXdSb3dzOiBRdWVyeUxpc3Q8R3JpZEtleU1hbmFnZXJSb3c8VD4+KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVSb3cpIHtcbiAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IG5ld1Jvd3MudG9BcnJheSgpLmluZGV4T2YodGhpcy5fYWN0aXZlUm93KTtcblxuICAgICAgICAgIGlmIChuZXdJbmRleCA+IC0xICYmIG5ld0luZGV4ICE9PSB0aGlzLl9hY3RpdmVSb3dJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgYWN0aXZlIGNlbGwgb2YgdGhlIGdyaWQgbWFuYWdlciBjaGFuZ2VzLiAqL1xuICBjaGFuZ2UgPSBuZXcgU3ViamVjdDx7cm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyfT4oKTtcblxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgZGlyZWN0aW9uYWxpdHkgb2YgdGhlIGtleSBtYW5hZ2VyJ3MgaG9yaXpvbnRhbCBtb3ZlbWVudC5cbiAgICogQHBhcmFtIGRpcmVjdGlvbiBEaXJlY3Rpb24gd2hpY2ggaXMgY29uc2lkZXJlZCBmb3J3YXJkIG1vdmVtZW50IGFjcm9zcyBhIHJvdy5cbiAgICpcbiAgICogSWYgd2l0aERpcmVjdGlvbmFsaXR5IGlzIG5vdCBzZXQsIHRoZSBkZWZhdWx0IGlzICdsdHInLlxuICAgKi9cbiAgd2l0aERpcmVjdGlvbmFsaXR5KGRpcmVjdGlvbjogJ2x0cicgfCAncnRsJyk6IHRoaXMge1xuICAgIHRoaXMuX2RpciA9IGRpcmVjdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhY3RpdmUgY2VsbCB0byB0aGUgY2VsbCBhdCB0aGUgaW5kaWNlcyBzcGVjaWZpZWQuXG4gICAqIEBwYXJhbSBjZWxsIFRoZSByb3cgYW5kIGNvbHVtbiBjb250YWluaW5nIHRoZSBjZWxsIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICBzZXRBY3RpdmVDZWxsKGNlbGw6IHtyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXJ9KTogdm9pZDtcblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGNlbGwuXG4gICAqIEBwYXJhbSBjZWxsIFRoZSBjZWxsIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICBzZXRBY3RpdmVDZWxsKGNlbGw6IFQpOiB2b2lkO1xuXG4gIHNldEFjdGl2ZUNlbGwoY2VsbDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXNSb3dJbmRleCA9IHRoaXMuX2FjdGl2ZVJvd0luZGV4O1xuICAgIGNvbnN0IHByZXZpb3VzQ29sdW1uSW5kZXggPSB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleDtcblxuICAgIHRoaXMudXBkYXRlQWN0aXZlQ2VsbChjZWxsKTtcblxuICAgIGlmICh0aGlzLl9hY3RpdmVSb3dJbmRleCAhPT0gcHJldmlvdXNSb3dJbmRleCB8fFxuICAgICAgdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXggIT09IHByZXZpb3VzQ29sdW1uSW5kZXgpIHtcbiAgICAgIHRoaXMuY2hhbmdlLm5leHQoe3JvdzogdGhpcy5fYWN0aXZlUm93SW5kZXgsIGNvbHVtbjogdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXh9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgZGVwZW5kaW5nIG9uIHRoZSBrZXkgZXZlbnQgcGFzc2VkIGluLlxuICAgKiBAcGFyYW0gZXZlbnQgS2V5Ym9hcmQgZXZlbnQgdG8gYmUgdXNlZCBmb3IgZGV0ZXJtaW5pbmcgd2hpY2ggZWxlbWVudCBzaG91bGQgYmUgYWN0aXZlLlxuICAgKi9cbiAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgdGhpcy5zZXROZXh0Um93QWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICB0aGlzLnNldFByZXZpb3VzUm93QWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICB0aGlzLl9kaXIgPT09ICdydGwnID8gdGhpcy5zZXRQcmV2aW91c0NvbHVtbkFjdGl2ZSgpIDogdGhpcy5zZXROZXh0Q29sdW1uQWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgIHRoaXMuX2RpciA9PT0gJ3J0bCcgPyB0aGlzLnNldE5leHRDb2x1bW5BY3RpdmUoKSA6IHRoaXMuc2V0UHJldmlvdXNDb2x1bW5BY3RpdmUoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSByZXR1cm4gaGVyZSwgaW4gb3JkZXIgdG8gYXZvaWQgcHJldmVudGluZ1xuICAgICAgICAvLyB0aGUgZGVmYXVsdCBhY3Rpb24gb2Ygbm9uLW5hdmlnYXRpb25hbCBrZXlzLlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiBJbmRleCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSByb3cuICovXG4gIGdldCBhY3RpdmVSb3dJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVSb3dJbmRleDtcbiAgfVxuXG4gIC8qKiBJbmRleCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBjb2x1bW4uICovXG4gIGdldCBhY3RpdmVDb2x1bW5JbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleDtcbiAgfVxuXG4gIC8qKiBUaGUgYWN0aXZlIGNlbGwuICovXG4gIGdldCBhY3RpdmVDZWxsKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlQ2VsbDtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgY2VsbCB0byB0aGUgZmlyc3QgY2VsbCBpbiB0aGUgZ3JpZC4gKi9cbiAgc2V0Rmlyc3RDZWxsQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeUluZGV4KDAsIDApO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIHRvIHRoZSBsYXN0IGNlbGwgaW4gdGhlIGdyaWQuICovXG4gIHNldExhc3RDZWxsQWN0aXZlKCk6IHZvaWQge1xuICAgIGNvbnN0IGxhc3RSb3dJbmRleCA9IHRoaXMuX3Jvd3MubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBsYXN0Um93ID0gdGhpcy5fZ2V0Um93c0FycmF5KClbbGFzdFJvd0luZGV4XTtcbiAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleChsYXN0Um93SW5kZXgsIGxhc3RSb3cuY2VsbHMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgYWN0aXZlIHJvdyB0byB0aGUgbmV4dCByb3cgaW4gdGhlIGdyaWQuIEFjdGl2ZSBjb2x1bW4gaXMgdW5jaGFuZ2VkLiAqL1xuICBzZXROZXh0Um93QWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4IDwgMCA/IHRoaXMuc2V0Rmlyc3RDZWxsQWN0aXZlKCkgOiB0aGlzLl9zZXRBY3RpdmVDZWxsQnlEZWx0YSgxLCAwKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgcm93IHRvIHRoZSBwcmV2aW91cyByb3cgaW4gdGhlIGdyaWQuIEFjdGl2ZSBjb2x1bW4gaXMgdW5jaGFuZ2VkLiAqL1xuICBzZXRQcmV2aW91c1Jvd0FjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlEZWx0YSgtMSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNvbHVtbiB0byB0aGUgbmV4dCBjb2x1bW4gaW4gdGhlIGdyaWQuXG4gICAqIEFjdGl2ZSByb3cgaXMgdW5jaGFuZ2VkLCB1bmxlc3Mgd2UgcmVhY2ggdGhlIGVuZCBvZiBhIHJvdy5cbiAgICovXG4gIHNldE5leHRDb2x1bW5BY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPCAwID8gdGhpcy5zZXRGaXJzdENlbGxBY3RpdmUoKSA6IHRoaXMuX3NldEFjdGl2ZUNlbGxCeURlbHRhKDAsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjb2x1bW4gdG8gdGhlIHByZXZpb3VzIGNvbHVtbiBpbiB0aGUgZ3JpZC5cbiAgICogQWN0aXZlIHJvdyBpcyB1bmNoYW5nZWQsIHVubGVzcyB3ZSByZWFjaCB0aGUgZW5kIG9mIGEgcm93LlxuICAgKi9cbiAgc2V0UHJldmlvdXNDb2x1bW5BY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5RGVsdGEoMCwgLTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBzZXR0aW5nIHRoZSBhY3RpdmUgY2VsbCB3aXRob3V0IGFueSBvdGhlciBlZmZlY3RzLlxuICAgKiBAcGFyYW0gY2VsbCBSb3cgYW5kIGNvbHVtbiBvZiB0aGUgY2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgdXBkYXRlQWN0aXZlQ2VsbChjZWxsOiB7cm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyfSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFsbG93cyBzZXR0aW5nIHRoZSBhY3RpdmUgY2VsbCB3aXRob3V0IGFueSBvdGhlciBlZmZlY3RzLlxuICAgKiBAcGFyYW0gY2VsbCBDZWxsIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICB1cGRhdGVBY3RpdmVDZWxsKGNlbGw6IFQpOiB2b2lkO1xuXG4gIHVwZGF0ZUFjdGl2ZUNlbGwoY2VsbDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgcm93QXJyYXkgPSB0aGlzLl9nZXRSb3dzQXJyYXkoKTtcblxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGNlbGwucm93ID09PSAnbnVtYmVyJyAmJlxuICAgICAgdHlwZW9mIGNlbGwuY29sdW1uID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPSBjZWxsLnJvdztcbiAgICAgIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ID0gY2VsbC5jb2x1bW47XG4gICAgICB0aGlzLl9hY3RpdmVSb3cgPSByb3dBcnJheVtjZWxsLnJvd10gfHwgbnVsbDtcbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGwgPSB0aGlzLl9hY3RpdmVSb3cgPyB0aGlzLl9hY3RpdmVSb3cuY2VsbHNbY2VsbC5jb2x1bW5dIHx8IG51bGwgOiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3dBcnJheS5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gcm93LmNlbGxzLmluZGV4T2YoY2VsbCk7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLl9hY3RpdmVSb3dJbmRleCA9IHJvd0luZGV4O1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ID0gY29sdW1uSW5kZXg7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlUm93ID0gcm93O1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZUNlbGwgPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgYWN0aXZlIGNlbGwsIGdpdmVuIHRoZSByb3cgYW5kIGNvbHVtbnMgZGVsdGFzXG4gICAqIGJldHdlZW4gdGhlIGN1cnJlbnRseSBhY3RpdmUgY2VsbCBhbmQgdGhlIG5ldyBhY3RpdmUgY2VsbC5cbiAgICovXG4gIHByaXZhdGUgX3NldEFjdGl2ZUNlbGxCeURlbHRhKHJvd0RlbHRhOiAtMSB8IDAgfCAxLCBjb2x1bW5EZWx0YTogLTEgfCAwIHwgMSk6IHZvaWQge1xuICAgIC8vIElmIGRlbHRhIHB1dHMgdXMgcGFzdCB0aGUgbGFzdCBjZWxsIGluIGEgcm93LCBtb3ZlIHRvIHRoZSBmaXJzdCBjZWxsIG9mIHRoZSBuZXh0IHJvdy5cbiAgICBpZiAodGhpcy5fYWN0aXZlUm93ICYmIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ICsgY29sdW1uRGVsdGEgPj0gdGhpcy5fYWN0aXZlUm93LmNlbGxzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5SW5kZXgodGhpcy5fYWN0aXZlUm93SW5kZXggKyAxLCAwKTtcblxuICAgIC8vIElmIGRlbHRhIHB1dHMgdXMgcHJpb3IgdG8gdGhlIGZpcnN0IGNlbGwgaW4gYSByb3csIG1vdmUgdG8gdGhlIGxhc3QgY2VsbCBvZiB0aGUgcHJldmlvdXMgcm93LlxuICAgIH0gZWxzZSBpZiAodGhpcy5fYWN0aXZlQ29sdW1uSW5kZXggKyBjb2x1bW5EZWx0YSA8IDApIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzUm93SW5kZXggPSB0aGlzLl9hY3RpdmVSb3dJbmRleCAtIDE7XG4gICAgICBjb25zdCBwcmV2aW91c1JvdyA9IHRoaXMuX2dldFJvd3NBcnJheSgpW3ByZXZpb3VzUm93SW5kZXhdO1xuICAgICAgaWYgKHByZXZpb3VzUm93KSB7XG4gICAgICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeUluZGV4KHByZXZpb3VzUm93SW5kZXgsIHByZXZpb3VzUm93LmNlbGxzLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleCh0aGlzLl9hY3RpdmVSb3dJbmRleCArIHJvd0RlbHRhLFxuICAgICAgICB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCArIGNvbHVtbkRlbHRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGNlbGwgYXQgdGhlIGluZGljZXMgc3BlY2lmaWVkLCBpZiB0aGV5IGFyZSB2YWxpZC5cbiAgICovXG4gIHByaXZhdGUgX3NldEFjdGl2ZUNlbGxCeUluZGV4KHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCByb3dzID0gdGhpcy5fZ2V0Um93c0FycmF5KCk7XG5cbiAgICBjb25zdCB0YXJnZXRSb3cgPSByb3dzW3Jvd0luZGV4XTtcblxuICAgIGlmICghdGFyZ2V0Um93IHx8ICF0YXJnZXRSb3cuY2VsbHNbY29sdW1uSW5kZXhdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRBY3RpdmVDZWxsKHtyb3c6IHJvd0luZGV4LCBjb2x1bW46IGNvbHVtbkluZGV4fSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgcm93cyBhcyBhbiBhcnJheS4gKi9cbiAgcHJpdmF0ZSBfZ2V0Um93c0FycmF5KCk6IEdyaWRLZXlNYW5hZ2VyUm93PFQ+W10ge1xuICAgIHJldHVybiB0aGlzLl9yb3dzIGluc3RhbmNlb2YgUXVlcnlMaXN0ID8gdGhpcy5fcm93cy50b0FycmF5KCkgOiB0aGlzLl9yb3dzO1xuICB9XG59XG4iXX0=