/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { Resizable } from '@angular/cdk-experimental/column-resize';
import { MatColumnResizeOverlayHandle } from '../overlay-handle';
var AbstractMatResizable = /** @class */ (function (_super) {
    __extends(AbstractMatResizable, _super);
    function AbstractMatResizable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minWidthPxInternal = 32;
        return _this;
    }
    AbstractMatResizable.prototype.getInlineHandleCssClassName = function () {
        return 'mat-resizable-handle';
    };
    AbstractMatResizable.prototype.getOverlayHandleComponentType = function () {
        return MatColumnResizeOverlayHandle;
    };
    return AbstractMatResizable;
}(Resizable));
export { AbstractMatResizable };
export var RESIZABLE_HOST_BINDINGS = {
    'class': 'mat-resizable',
};
export var RESIZABLE_INPUTS = [
    'minWidthPx: matResizableMinWidthPx',
    'maxWidthPx: matResizableMaxWidthPx',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL3Jlc2l6YWJsZS1kaXJlY3RpdmVzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBR0gsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRS9EO0lBQW1ELHdDQUF1QztJQUExRjtRQUFBLHFFQVVDO1FBVEMsd0JBQWtCLEdBQUcsRUFBRSxDQUFDOztJQVMxQixDQUFDO0lBUFcsMERBQTJCLEdBQXJDO1FBQ0UsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDO0lBRVMsNERBQTZCLEdBQXZDO1FBQ0UsT0FBTyw0QkFBNEIsQ0FBQztJQUN0QyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBbUQsU0FBUyxHQVUzRDs7QUFFRCxNQUFNLENBQUMsSUFBTSx1QkFBdUIsR0FBRztJQUNyQyxPQUFPLEVBQUUsZUFBZTtDQUN6QixDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUc7SUFDOUIsb0NBQW9DO0lBQ3BDLG9DQUFvQztDQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Jlc2l6YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplJztcbmltcG9ydCB7TWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZX0gZnJvbSAnLi4vb3ZlcmxheS1oYW5kbGUnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RNYXRSZXNpemFibGUgZXh0ZW5kcyBSZXNpemFibGU8TWF0Q29sdW1uUmVzaXplT3ZlcmxheUhhbmRsZT4ge1xuICBtaW5XaWR0aFB4SW50ZXJuYWwgPSAzMjtcblxuICBwcm90ZWN0ZWQgZ2V0SW5saW5lSGFuZGxlQ3NzQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdtYXQtcmVzaXphYmxlLWhhbmRsZSc7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0T3ZlcmxheUhhbmRsZUNvbXBvbmVudFR5cGUoKTogVHlwZTxNYXRDb2x1bW5SZXNpemVPdmVybGF5SGFuZGxlPiB7XG4gICAgcmV0dXJuIE1hdENvbHVtblJlc2l6ZU92ZXJsYXlIYW5kbGU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFU0laQUJMRV9IT1NUX0JJTkRJTkdTID0ge1xuICAnY2xhc3MnOiAnbWF0LXJlc2l6YWJsZScsXG59O1xuXG5leHBvcnQgY29uc3QgUkVTSVpBQkxFX0lOUFVUUyA9IFtcbiAgJ21pbldpZHRoUHg6IG1hdFJlc2l6YWJsZU1pbldpZHRoUHgnLFxuICAnbWF4V2lkdGhQeDogbWF0UmVzaXphYmxlTWF4V2lkdGhQeCcsXG5dO1xuIl19