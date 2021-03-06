/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { GridKeyManager } from './grid-key-manager';
/**
 * A version of GridKeyManager where the cells are HTMLElements, and focus()
 * is called on a cell when it becomes active.
 */
export class GridFocusKeyManager extends GridKeyManager {
    setActiveCell(cell) {
        super.setActiveCell(cell);
        if (this.activeCell) {
            this.activeCell.focus();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1mb2N1cy1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2dyaWQtZm9jdXMta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRWxEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxjQUEyQjtJQWNsRSxhQUFhLENBQUMsSUFBUztRQUNyQixLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7R3JpZEtleU1hbmFnZXJ9IGZyb20gJy4vZ3JpZC1rZXktbWFuYWdlcic7XG5cbi8qKlxuICogQSB2ZXJzaW9uIG9mIEdyaWRLZXlNYW5hZ2VyIHdoZXJlIHRoZSBjZWxscyBhcmUgSFRNTEVsZW1lbnRzLCBhbmQgZm9jdXMoKVxuICogaXMgY2FsbGVkIG9uIGEgY2VsbCB3aGVuIGl0IGJlY29tZXMgYWN0aXZlLlxuICovXG5leHBvcnQgY2xhc3MgR3JpZEZvY3VzS2V5TWFuYWdlciBleHRlbmRzIEdyaWRLZXlNYW5hZ2VyPEhUTUxFbGVtZW50PiB7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhY3RpdmUgY2VsbCB0byB0aGUgY2VsbCBhdCB0aGUgc3BlY2lmaWVkXG4gICAqIGluZGljZXMgYW5kIGZvY3VzZXMgdGhlIG5ld2x5IGFjdGl2ZSBjZWxsLlxuICAgKiBAcGFyYW0gY2VsbCBSb3cgYW5kIGNvbHVtbiBpbmRpY2VzIG9mIHRoZSBjZWxsIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAqL1xuICBzZXRBY3RpdmVDZWxsKGNlbGw6IHtyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXJ9KTogdm9pZDtcblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGNlbGwgdG8gdGhlIGNlbGwgdGhhdCBpcyBzcGVjaWZpZWQgYW5kIGZvY3VzZXMgaXQuXG4gICAqIEBwYXJhbSBjZWxsIENlbGwgdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICovXG4gIHNldEFjdGl2ZUNlbGwoY2VsbDogSFRNTEVsZW1lbnQpOiB2b2lkO1xuXG4gIHNldEFjdGl2ZUNlbGwoY2VsbDogYW55KTogdm9pZCB7XG4gICAgc3VwZXIuc2V0QWN0aXZlQ2VsbChjZWxsKTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUNlbGwpIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2VsbC5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuIl19