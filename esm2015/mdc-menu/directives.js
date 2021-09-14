/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { _MatMenuContentBase, _MatMenuTriggerBase, MAT_MENU_CONTENT } from '@angular/material/menu';
/** Directive applied to an element that should trigger a `mat-menu`. */
export class MatMenuTrigger extends _MatMenuTriggerBase {
}
MatMenuTrigger.decorators = [
    { type: Directive, args: [{
                selector: `[mat-menu-trigger-for], [matMenuTriggerFor]`,
                host: {
                    'class': 'mat-mdc-menu-trigger',
                },
                exportAs: 'matMenuTrigger'
            },] }
];
/** Menu content that will be rendered lazily once the menu is opened. */
export class MatMenuContent extends _MatMenuContentBase {
}
MatMenuContent.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[matMenuContent]',
                providers: [{ provide: MAT_MENU_CONTENT, useExisting: MatMenuContent }],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLW1lbnUvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRWxHLHdFQUF3RTtBQVF4RSxNQUFNLE9BQU8sY0FBZSxTQUFRLG1CQUFtQjs7O1lBUHRELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkNBQTZDO2dCQUN2RCxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHNCQUFzQjtpQkFDaEM7Z0JBQ0QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7QUFHRCx5RUFBeUU7QUFLekUsTUFBTSxPQUFPLGNBQWUsU0FBUSxtQkFBbUI7OztZQUp0RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBQyxDQUFDO2FBQ3RFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7X01hdE1lbnVDb250ZW50QmFzZSwgX01hdE1lbnVUcmlnZ2VyQmFzZSwgTUFUX01FTlVfQ09OVEVOVH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbi8qKiBEaXJlY3RpdmUgYXBwbGllZCB0byBhbiBlbGVtZW50IHRoYXQgc2hvdWxkIHRyaWdnZXIgYSBgbWF0LW1lbnVgLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgW21hdC1tZW51LXRyaWdnZXItZm9yXSwgW21hdE1lbnVUcmlnZ2VyRm9yXWAsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1tZW51LXRyaWdnZXInLFxuICB9LFxuICBleHBvcnRBczogJ21hdE1lbnVUcmlnZ2VyJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRNZW51VHJpZ2dlciBleHRlbmRzIF9NYXRNZW51VHJpZ2dlckJhc2Uge31cblxuLyoqIE1lbnUgY29udGVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgbGF6aWx5IG9uY2UgdGhlIG1lbnUgaXMgb3BlbmVkLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWF0TWVudUNvbnRlbnRdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9NRU5VX0NPTlRFTlQsIHVzZUV4aXN0aW5nOiBNYXRNZW51Q29udGVudH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNZW51Q29udGVudCBleHRlbmRzIF9NYXRNZW51Q29udGVudEJhc2Uge31cbiJdfQ==