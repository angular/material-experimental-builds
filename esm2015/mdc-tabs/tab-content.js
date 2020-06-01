/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { MatTabContent as BaseMatTabContent } from '@angular/material/tabs';
/** Decorates the `ng-template` tags and reads out the template from it. */
let MatTabContent = /** @class */ (() => {
    class MatTabContent extends BaseMatTabContent {
    }
    MatTabContent.decorators = [
        { type: Directive, args: [{ selector: '[matTabContent]' },] }
    ];
    return MatTabContent;
})();
export { MatTabContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGFBQWEsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTFFLDJFQUEyRTtBQUMzRTtJQUFBLE1BQ2EsYUFBYyxTQUFRLGlCQUFpQjs7O2dCQURuRCxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUM7O0lBRXhDLG9CQUFDO0tBQUE7U0FEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0VGFiQ29udGVudCBhcyBCYXNlTWF0VGFiQ29udGVudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5cbi8qKiBEZWNvcmF0ZXMgdGhlIGBuZy10ZW1wbGF0ZWAgdGFncyBhbmQgcmVhZHMgb3V0IHRoZSB0ZW1wbGF0ZSBmcm9tIGl0LiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbWF0VGFiQ29udGVudF0nfSlcbmV4cG9ydCBjbGFzcyBNYXRUYWJDb250ZW50IGV4dGVuZHMgQmFzZU1hdFRhYkNvbnRlbnQge1xufVxuIl19