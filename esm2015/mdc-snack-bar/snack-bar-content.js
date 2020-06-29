/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
/** Directive that should be applied to the text element to be rendered in the snack bar. */
let MatSnackBarLabel = /** @class */ (() => {
    class MatSnackBarLabel {
    }
    MatSnackBarLabel.decorators = [
        { type: Directive, args: [{
                    selector: `[matSnackBarLabel]`,
                    host: {
                        'class': 'mat-mdc-snack-bar-label mdc-snackbar__label',
                    }
                },] }
    ];
    return MatSnackBarLabel;
})();
export { MatSnackBarLabel };
/** Directive that should be applied to the element containing the snack bar's action buttons. */
let MatSnackBarActions = /** @class */ (() => {
    class MatSnackBarActions {
    }
    MatSnackBarActions.decorators = [
        { type: Directive, args: [{
                    selector: `[matSnackBarActions]`,
                    host: {
                        'class': 'mat-mdc-snack-bar-actions mdc-snackbar__actions',
                    }
                },] }
    ];
    return MatSnackBarActions;
})();
export { MatSnackBarActions };
/** Directive that should be applied to each of the snack bar's action buttons. */
let MatSnackBarAction = /** @class */ (() => {
    class MatSnackBarAction {
    }
    MatSnackBarAction.decorators = [
        { type: Directive, args: [{
                    selector: `[matSnackBarAction]`,
                    host: {
                        'class': 'mat-mdc-snack-bar-action mdc-snackbar__action',
                    }
                },] }
    ];
    return MatSnackBarAction;
})();
export { MatSnackBarAction };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbmFjay1iYXIvc25hY2stYmFyLWNvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4Qyw0RkFBNEY7QUFDNUY7SUFBQSxNQU1hLGdCQUFnQjs7O2dCQU41QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSw2Q0FBNkM7cUJBQ3ZEO2lCQUNGOztJQUM4Qix1QkFBQztLQUFBO1NBQW5CLGdCQUFnQjtBQUU3QixpR0FBaUc7QUFDakc7SUFBQSxNQU1hLGtCQUFrQjs7O2dCQU45QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxpREFBaUQ7cUJBQzNEO2lCQUNGOztJQUNnQyx5QkFBQztLQUFBO1NBQXJCLGtCQUFrQjtBQUUvQixrRkFBa0Y7QUFDbEY7SUFBQSxNQU1hLGlCQUFpQjs7O2dCQU43QixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSwrQ0FBK0M7cUJBQ3pEO2lCQUNGOztJQUMrQix3QkFBQztLQUFBO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBEaXJlY3RpdmUgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgdGV4dCBlbGVtZW50IHRvIGJlIHJlbmRlcmVkIGluIHRoZSBzbmFjayBiYXIuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBbbWF0U25hY2tCYXJMYWJlbF1gLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc25hY2stYmFyLWxhYmVsIG1kYy1zbmFja2Jhcl9fbGFiZWwnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdFNuYWNrQmFyTGFiZWwge31cblxuLyoqIERpcmVjdGl2ZSB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIHNuYWNrIGJhcidzIGFjdGlvbiBidXR0b25zLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgW21hdFNuYWNrQmFyQWN0aW9uc11gLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtc25hY2stYmFyLWFjdGlvbnMgbWRjLXNuYWNrYmFyX19hY3Rpb25zJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhckFjdGlvbnMge31cblxuLyoqIERpcmVjdGl2ZSB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIGVhY2ggb2YgdGhlIHNuYWNrIGJhcidzIGFjdGlvbiBidXR0b25zLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgW21hdFNuYWNrQmFyQWN0aW9uXWAsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zbmFjay1iYXItYWN0aW9uIG1kYy1zbmFja2Jhcl9fYWN0aW9uJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbmFja0JhckFjdGlvbiB7fVxuIl19