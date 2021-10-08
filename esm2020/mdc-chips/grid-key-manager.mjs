/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, HOME, END, } from '@angular/cdk/keycodes';
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
        if (typeof cell === 'object' && typeof cell.row === 'number' &&
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2dyaWQta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFDTCxRQUFRLEVBQ1IsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsSUFBSSxFQUNKLEdBQUcsR0FDSixNQUFNLHVCQUF1QixDQUFDO0FBRy9CLDZEQUE2RDtBQUM3RCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQU8vRTs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQVF6QixZQUFvQixLQUErRDtRQUEvRCxVQUFLLEdBQUwsS0FBSyxDQUEwRDtRQVAzRSxvQkFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLHVCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLGVBQVUsR0FBZ0MsSUFBSSxDQUFDO1FBQy9DLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLFNBQUksR0FBa0IsS0FBSyxDQUFDO1FBQzVCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBbUI1Qiw4RUFBOEU7UUFDOUUsV0FBTSxHQUFHLElBQUksT0FBTyxFQUFpQyxDQUFDO1FBakJwRCxnRkFBZ0Y7UUFDaEYsZ0ZBQWdGO1FBQ2hGLHdFQUF3RTtRQUN4RSxJQUFJLEtBQUssWUFBWSxTQUFTLEVBQUU7WUFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUF3QyxFQUFFLEVBQUU7Z0JBQ25FLElBQUksSUFB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LFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELG9DQUFvQztJQUM1QixhQUFhO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0UsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBVUF9BUlJPVyxcbiAgRE9XTl9BUlJPVyxcbiAgTEVGVF9BUlJPVyxcbiAgUklHSFRfQVJST1csXG4gIEhPTUUsXG4gIEVORCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuXG4vKiogVGhlIGtleXMgaGFuZGxlZCBieSB0aGUgR3JpZEtleU1hbmFnZXIga2V5ZG93biBtZXRob2QuICovXG5leHBvcnQgY29uc3QgTkFWSUdBVElPTl9LRVlTID0gW0RPV05fQVJST1csIFVQX0FSUk9XLCBSSUdIVF9BUlJPVywgTEVGVF9BUlJPV107XG5cbi8qKiBUaGlzIGludGVyZmFjZSBpcyBmb3Igcm93cyB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gYSBHcmlkS2V5TWFuYWdlci4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZEtleU1hbmFnZXJSb3c8VD4ge1xuICBjZWxsczogVFtdO1xufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgbWFuYWdlcyBrZXlib2FyZCBldmVudHMgZm9yIGdyaWRzLiBJZiB5b3UgcGFzcyBpdCBhIHF1ZXJ5IGxpc3RcbiAqIG9mIEdyaWRLZXlNYW5hZ2VyUm93LCBpdCB3aWxsIHNldCB0aGUgYWN0aXZlIGNlbGwgY29ycmVjdGx5IHdoZW4gYXJyb3cgZXZlbnRzIG9jY3VyLlxuICpcbiAqIEdyaWRLZXlNYW5hZ2VyIGV4cGVjdHMgdGhhdCByb3dzIG1heSBjaGFuZ2UgZHluYW1pY2FsbHksIGJ1dCB0aGUgY2VsbHMgZm9yIGEgZ2l2ZW4gcm93IGFyZVxuICogc3RhdGljLiBJdCBhbHNvIGV4cGVjdHMgdGhhdCBhbGwgcm93cyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBjZWxscy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdyaWRLZXlNYW5hZ2VyPFQ+IHtcbiAgcHJpdmF0ZSBfYWN0aXZlUm93SW5kZXggPSAtMTtcbiAgcHJpdmF0ZSBfYWN0aXZlQ29sdW1uSW5kZXggPSAtMTtcbiAgcHJpdmF0ZSBfYWN0aXZlUm93OiBHcmlkS2V5TWFuYWdlclJvdzxUPiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9hY3RpdmVDZWxsOiBUIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2RpcjogJ2x0cicgfCAncnRsJyA9ICdsdHInO1xuICBwcml2YXRlIF9ob21lQW5kRW5kID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm93czogUXVlcnlMaXN0PEdyaWRLZXlNYW5hZ2VyUm93PFQ+PiB8IEdyaWRLZXlNYW5hZ2VyUm93PFQ+W10pIHtcbiAgICAvLyBXZSBhbGxvdyBmb3IgdGhlIHJvd3MgdG8gYmUgYW4gYXJyYXkgYmVjYXVzZSwgaW4gc29tZSBjYXNlcywgdGhlIGNvbnN1bWVyIG1heVxuICAgIC8vIG5vdCBoYXZlIGFjY2VzcyB0byBhIFF1ZXJ5TGlzdCBvZiB0aGUgcm93cyB0aGV5IHdhbnQgdG8gbWFuYWdlIChlLmcuIHdoZW4gdGhlXG4gICAgLy8gcm93cyBhcmVuJ3QgYmVpbmcgY29sbGVjdGVkIHZpYSBgVmlld0NoaWxkcmVuYCBvciBgQ29udGVudENoaWxkcmVuYCkuXG4gICAgaWYgKF9yb3dzIGluc3RhbmNlb2YgUXVlcnlMaXN0KSB7XG4gICAgICBfcm93cy5jaGFuZ2VzLnN1YnNjcmliZSgobmV3Um93czogUXVlcnlMaXN0PEdyaWRLZXlNYW5hZ2VyUm93PFQ+PikgPT4ge1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlUm93KSB7XG4gICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBuZXdSb3dzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVJvdyk7XG5cbiAgICAgICAgICBpZiAobmV3SW5kZXggPiAtMSAmJiBuZXdJbmRleCAhPT0gdGhpcy5fYWN0aXZlUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGFjdGl2ZSBjZWxsIG9mIHRoZSBncmlkIG1hbmFnZXIgY2hhbmdlcy4gKi9cbiAgY2hhbmdlID0gbmV3IFN1YmplY3Q8e3JvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcn0+KCk7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIGRpcmVjdGlvbmFsaXR5IG9mIHRoZSBrZXkgbWFuYWdlcidzIGhvcml6b250YWwgbW92ZW1lbnQuXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gRGlyZWN0aW9uIHdoaWNoIGlzIGNvbnNpZGVyZWQgZm9yd2FyZCBtb3ZlbWVudCBhY3Jvc3MgYSByb3cuXG4gICAqXG4gICAqIElmIHdpdGhEaXJlY3Rpb25hbGl0eSBpcyBub3Qgc2V0LCB0aGUgZGVmYXVsdCBpcyAnbHRyJy5cbiAgICovXG4gIHdpdGhEaXJlY3Rpb25hbGl0eShkaXJlY3Rpb246ICdsdHInIHwgJ3J0bCcpOiB0aGlzIHtcbiAgICB0aGlzLl9kaXIgPSBkaXJlY3Rpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGNlbGwgYXQgdGhlIGluZGljZXMgc3BlY2lmaWVkLlxuICAgKiBAcGFyYW0gY2VsbCBUaGUgcm93IGFuZCBjb2x1bW4gY29udGFpbmluZyB0aGUgY2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgc2V0QWN0aXZlQ2VsbChjZWxsOiB7cm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyfSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIHRvIHRoZSBjZWxsLlxuICAgKiBAcGFyYW0gY2VsbCBUaGUgY2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgc2V0QWN0aXZlQ2VsbChjZWxsOiBUKTogdm9pZDtcblxuICBzZXRBY3RpdmVDZWxsKGNlbGw6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzUm93SW5kZXggPSB0aGlzLl9hY3RpdmVSb3dJbmRleDtcbiAgICBjb25zdCBwcmV2aW91c0NvbHVtbkluZGV4ID0gdGhpcy5fYWN0aXZlQ29sdW1uSW5kZXg7XG5cbiAgICB0aGlzLnVwZGF0ZUFjdGl2ZUNlbGwoY2VsbCk7XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlUm93SW5kZXggIT09IHByZXZpb3VzUm93SW5kZXggfHxcbiAgICAgIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ICE9PSBwcmV2aW91c0NvbHVtbkluZGV4KSB7XG4gICAgICB0aGlzLmNoYW5nZS5uZXh0KHtyb3c6IHRoaXMuX2FjdGl2ZVJvd0luZGV4LCBjb2x1bW46IHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIGtleSBtYW5hZ2VyIHRvIGFjdGl2YXRlIHRoZSBmaXJzdCBhbmQgbGFzdCBpdGVtc1xuICAgKiByZXNwZWN0aXZlbHkgd2hlbiB0aGUgSG9tZSBvciBFbmQga2V5IGlzIHByZXNzZWQuXG4gICAqIEBwYXJhbSBlbmFibGVkIFdoZXRoZXIgcHJlc3NpbmcgdGhlIEhvbWUgb3IgRW5kIGtleSBhY3RpdmF0ZXMgdGhlIGZpcnN0L2xhc3QgaXRlbS5cbiAgICovXG4gIHdpdGhIb21lQW5kRW5kKGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlKTogdGhpcyB7XG4gICAgdGhpcy5faG9tZUFuZEVuZCA9IGVuYWJsZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgZGVwZW5kaW5nIG9uIHRoZSBrZXkgZXZlbnQgcGFzc2VkIGluLlxuICAgKiBAcGFyYW0gZXZlbnQgS2V5Ym9hcmQgZXZlbnQgdG8gYmUgdXNlZCBmb3IgZGV0ZXJtaW5pbmcgd2hpY2ggZWxlbWVudCBzaG91bGQgYmUgYWN0aXZlLlxuICAgKi9cbiAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgdGhpcy5zZXROZXh0Um93QWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICB0aGlzLnNldFByZXZpb3VzUm93QWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICB0aGlzLl9kaXIgPT09ICdydGwnID8gdGhpcy5zZXRQcmV2aW91c0NvbHVtbkFjdGl2ZSgpIDogdGhpcy5zZXROZXh0Q29sdW1uQWN0aXZlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgIHRoaXMuX2RpciA9PT0gJ3J0bCcgPyB0aGlzLnNldE5leHRDb2x1bW5BY3RpdmUoKSA6IHRoaXMuc2V0UHJldmlvdXNDb2x1bW5BY3RpdmUoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgaWYgKHRoaXMuX2hvbWVBbmRFbmQpIHtcbiAgICAgICAgICB0aGlzLnNldEZpcnN0Q2VsbEFjdGl2ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIEVORDpcbiAgICAgICAgaWYgKHRoaXMuX2hvbWVBbmRFbmQpIHtcbiAgICAgICAgICB0aGlzLnNldExhc3RDZWxsQWN0aXZlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSByZXR1cm4gaGVyZSwgaW4gb3JkZXIgdG8gYXZvaWQgcHJldmVudGluZ1xuICAgICAgICAvLyB0aGUgZGVmYXVsdCBhY3Rpb24gb2Ygbm9uLW5hdmlnYXRpb25hbCBrZXlzLlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiBJbmRleCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSByb3cuICovXG4gIGdldCBhY3RpdmVSb3dJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVSb3dJbmRleDtcbiAgfVxuXG4gIC8qKiBJbmRleCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBjb2x1bW4uICovXG4gIGdldCBhY3RpdmVDb2x1bW5JbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleDtcbiAgfVxuXG4gIC8qKiBUaGUgYWN0aXZlIGNlbGwuICovXG4gIGdldCBhY3RpdmVDZWxsKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlQ2VsbDtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgY2VsbCB0byB0aGUgZmlyc3QgY2VsbCBpbiB0aGUgZ3JpZC4gKi9cbiAgc2V0Rmlyc3RDZWxsQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeUluZGV4KDAsIDApO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIGFjdGl2ZSBjZWxsIHRvIHRoZSBsYXN0IGNlbGwgaW4gdGhlIGdyaWQuICovXG4gIHNldExhc3RDZWxsQWN0aXZlKCk6IHZvaWQge1xuICAgIGNvbnN0IGxhc3RSb3dJbmRleCA9IHRoaXMuX3Jvd3MubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBsYXN0Um93ID0gdGhpcy5fZ2V0Um93c0FycmF5KClbbGFzdFJvd0luZGV4XTtcbiAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleChsYXN0Um93SW5kZXgsIGxhc3RSb3cuY2VsbHMubGVuZ3RoIC0gMSk7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgYWN0aXZlIHJvdyB0byB0aGUgbmV4dCByb3cgaW4gdGhlIGdyaWQuIEFjdGl2ZSBjb2x1bW4gaXMgdW5jaGFuZ2VkLiAqL1xuICBzZXROZXh0Um93QWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZVJvd0luZGV4IDwgMCA/IHRoaXMuc2V0Rmlyc3RDZWxsQWN0aXZlKCkgOiB0aGlzLl9zZXRBY3RpdmVDZWxsQnlEZWx0YSgxLCAwKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgcm93IHRvIHRoZSBwcmV2aW91cyByb3cgaW4gdGhlIGdyaWQuIEFjdGl2ZSBjb2x1bW4gaXMgdW5jaGFuZ2VkLiAqL1xuICBzZXRQcmV2aW91c1Jvd0FjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlEZWx0YSgtMSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNvbHVtbiB0byB0aGUgbmV4dCBjb2x1bW4gaW4gdGhlIGdyaWQuXG4gICAqIEFjdGl2ZSByb3cgaXMgdW5jaGFuZ2VkLCB1bmxlc3Mgd2UgcmVhY2ggdGhlIGVuZCBvZiBhIHJvdy5cbiAgICovXG4gIHNldE5leHRDb2x1bW5BY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPCAwID8gdGhpcy5zZXRGaXJzdENlbGxBY3RpdmUoKSA6IHRoaXMuX3NldEFjdGl2ZUNlbGxCeURlbHRhKDAsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBjb2x1bW4gdG8gdGhlIHByZXZpb3VzIGNvbHVtbiBpbiB0aGUgZ3JpZC5cbiAgICogQWN0aXZlIHJvdyBpcyB1bmNoYW5nZWQsIHVubGVzcyB3ZSByZWFjaCB0aGUgZW5kIG9mIGEgcm93LlxuICAgKi9cbiAgc2V0UHJldmlvdXNDb2x1bW5BY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5RGVsdGEoMCwgLTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBzZXR0aW5nIHRoZSBhY3RpdmUgY2VsbCB3aXRob3V0IGFueSBvdGhlciBlZmZlY3RzLlxuICAgKiBAcGFyYW0gY2VsbCBSb3cgYW5kIGNvbHVtbiBvZiB0aGUgY2VsbCB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgKi9cbiAgdXBkYXRlQWN0aXZlQ2VsbChjZWxsOiB7cm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyfSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFsbG93cyBzZXR0aW5nIHRoZSBhY3RpdmUgY2VsbCB3aXRob3V0IGFueSBvdGhlciBlZmZlY3RzLlxuICAgKiBAcGFyYW0gY2VsbCBDZWxsIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICB1cGRhdGVBY3RpdmVDZWxsKGNlbGw6IFQpOiB2b2lkO1xuXG4gIHVwZGF0ZUFjdGl2ZUNlbGwoY2VsbDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgcm93QXJyYXkgPSB0aGlzLl9nZXRSb3dzQXJyYXkoKTtcblxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGNlbGwucm93ID09PSAnbnVtYmVyJyAmJlxuICAgICAgdHlwZW9mIGNlbGwuY29sdW1uID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fYWN0aXZlUm93SW5kZXggPSBjZWxsLnJvdztcbiAgICAgIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ID0gY2VsbC5jb2x1bW47XG4gICAgICB0aGlzLl9hY3RpdmVSb3cgPSByb3dBcnJheVtjZWxsLnJvd10gfHwgbnVsbDtcbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGwgPSB0aGlzLl9hY3RpdmVSb3cgPyB0aGlzLl9hY3RpdmVSb3cuY2VsbHNbY2VsbC5jb2x1bW5dIHx8IG51bGwgOiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3dBcnJheS5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gcm93LmNlbGxzLmluZGV4T2YoY2VsbCk7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLl9hY3RpdmVSb3dJbmRleCA9IHJvd0luZGV4O1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ID0gY29sdW1uSW5kZXg7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlUm93ID0gcm93O1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZUNlbGwgPSByb3cuY2VsbHNbY29sdW1uSW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgYWN0aXZlIGNlbGwsIGdpdmVuIHRoZSByb3cgYW5kIGNvbHVtbnMgZGVsdGFzXG4gICAqIGJldHdlZW4gdGhlIGN1cnJlbnRseSBhY3RpdmUgY2VsbCBhbmQgdGhlIG5ldyBhY3RpdmUgY2VsbC5cbiAgICovXG4gIHByaXZhdGUgX3NldEFjdGl2ZUNlbGxCeURlbHRhKHJvd0RlbHRhOiAtMSB8IDAgfCAxLCBjb2x1bW5EZWx0YTogLTEgfCAwIHwgMSk6IHZvaWQge1xuICAgIC8vIElmIGRlbHRhIHB1dHMgdXMgcGFzdCB0aGUgbGFzdCBjZWxsIGluIGEgcm93LCBtb3ZlIHRvIHRoZSBmaXJzdCBjZWxsIG9mIHRoZSBuZXh0IHJvdy5cbiAgICBpZiAodGhpcy5fYWN0aXZlUm93ICYmIHRoaXMuX2FjdGl2ZUNvbHVtbkluZGV4ICsgY29sdW1uRGVsdGEgPj0gdGhpcy5fYWN0aXZlUm93LmNlbGxzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc2V0QWN0aXZlQ2VsbEJ5SW5kZXgodGhpcy5fYWN0aXZlUm93SW5kZXggKyAxLCAwKTtcblxuICAgIC8vIElmIGRlbHRhIHB1dHMgdXMgcHJpb3IgdG8gdGhlIGZpcnN0IGNlbGwgaW4gYSByb3csIG1vdmUgdG8gdGhlIGxhc3QgY2VsbCBvZiB0aGUgcHJldmlvdXMgcm93LlxuICAgIH0gZWxzZSBpZiAodGhpcy5fYWN0aXZlQ29sdW1uSW5kZXggKyBjb2x1bW5EZWx0YSA8IDApIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzUm93SW5kZXggPSB0aGlzLl9hY3RpdmVSb3dJbmRleCAtIDE7XG4gICAgICBjb25zdCBwcmV2aW91c1JvdyA9IHRoaXMuX2dldFJvd3NBcnJheSgpW3ByZXZpb3VzUm93SW5kZXhdO1xuICAgICAgaWYgKHByZXZpb3VzUm93KSB7XG4gICAgICAgIHRoaXMuX3NldEFjdGl2ZUNlbGxCeUluZGV4KHByZXZpb3VzUm93SW5kZXgsIHByZXZpb3VzUm93LmNlbGxzLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVDZWxsQnlJbmRleCh0aGlzLl9hY3RpdmVSb3dJbmRleCArIHJvd0RlbHRhLFxuICAgICAgICB0aGlzLl9hY3RpdmVDb2x1bW5JbmRleCArIGNvbHVtbkRlbHRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGNlbGwgYXQgdGhlIGluZGljZXMgc3BlY2lmaWVkLCBpZiB0aGV5IGFyZSB2YWxpZC5cbiAgICovXG4gIHByaXZhdGUgX3NldEFjdGl2ZUNlbGxCeUluZGV4KHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCByb3dzID0gdGhpcy5fZ2V0Um93c0FycmF5KCk7XG5cbiAgICBjb25zdCB0YXJnZXRSb3cgPSByb3dzW3Jvd0luZGV4XTtcblxuICAgIGlmICghdGFyZ2V0Um93IHx8ICF0YXJnZXRSb3cuY2VsbHNbY29sdW1uSW5kZXhdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRBY3RpdmVDZWxsKHtyb3c6IHJvd0luZGV4LCBjb2x1bW46IGNvbHVtbkluZGV4fSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgcm93cyBhcyBhbiBhcnJheS4gKi9cbiAgcHJpdmF0ZSBfZ2V0Um93c0FycmF5KCk6IEdyaWRLZXlNYW5hZ2VyUm93PFQ+W10ge1xuICAgIHJldHVybiB0aGlzLl9yb3dzIGluc3RhbmNlb2YgUXVlcnlMaXN0ID8gdGhpcy5fcm93cy50b0FycmF5KCkgOiB0aGlzLl9yb3dzO1xuICB9XG59XG4iXX0=