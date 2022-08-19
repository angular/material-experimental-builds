/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { MatMenu } from './menu';
export { MatMenuItem } from './menu-item';
export { MatMenuTrigger, MatMenuContent } from './directives';
export * from './module';
export { fadeInItems, MAT_MENU_DEFAULT_OPTIONS, MAT_MENU_PANEL, MAT_MENU_SCROLL_STRATEGY, matMenuAnimations, transformMenu, MAT_MENU_CONTENT, } from '@angular/material/menu';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLW1lbnUvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDNUQsY0FBYyxVQUFVLENBQUM7QUFFekIsT0FBTyxFQUNMLFdBQVcsRUFDWCx3QkFBd0IsRUFDeEIsY0FBYyxFQUNkLHdCQUF3QixFQUN4QixpQkFBaUIsRUFLakIsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixNQUFNLHdCQUF3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCB7TWF0TWVudX0gZnJvbSAnLi9tZW51JztcbmV4cG9ydCB7TWF0TWVudUl0ZW19IGZyb20gJy4vbWVudS1pdGVtJztcbmV4cG9ydCB7TWF0TWVudVRyaWdnZXIsIE1hdE1lbnVDb250ZW50fSBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGUnO1xuXG5leHBvcnQge1xuICBmYWRlSW5JdGVtcyxcbiAgTUFUX01FTlVfREVGQVVMVF9PUFRJT05TLFxuICBNQVRfTUVOVV9QQU5FTCxcbiAgTUFUX01FTlVfU0NST0xMX1NUUkFURUdZLFxuICBtYXRNZW51QW5pbWF0aW9ucyxcbiAgTWF0TWVudURlZmF1bHRPcHRpb25zLFxuICBNYXRNZW51UGFuZWwsXG4gIE1lbnVQb3NpdGlvblgsXG4gIE1lbnVQb3NpdGlvblksXG4gIHRyYW5zZm9ybU1lbnUsXG4gIE1BVF9NRU5VX0NPTlRFTlQsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuIl19