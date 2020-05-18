/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-button/module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatAnchor, MatButton } from './button';
import { MatFabAnchor, MatFabButton } from './fab';
import { MatIconAnchor, MatIconButton } from './icon-button';
let MatButtonModule = /** @class */ (() => {
    class MatButtonModule {
    }
    MatButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, MatRippleModule],
                    exports: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatIconButton,
                        MatFabAnchor,
                        MatFabButton,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatIconButton,
                        MatFabAnchor,
                        MatFabButton,
                    ],
                },] }
    ];
    return MatButtonModule;
})();
export { MatButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYnV0dG9uL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFM0Q7SUFBQSxNQW9CYSxlQUFlOzs7Z0JBcEIzQixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDM0MsT0FBTyxFQUFFO3dCQUNQLFNBQVM7d0JBQ1QsU0FBUzt3QkFDVCxhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDWixTQUFTO3dCQUNULFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osWUFBWTtxQkFDYjtpQkFDRjs7SUFFRCxzQkFBQztLQUFBO1NBRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRBbmNob3IsIE1hdEJ1dHRvbn0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHtNYXRGYWJBbmNob3IsIE1hdEZhYkJ1dHRvbn0gZnJvbSAnLi9mYWInO1xuaW1wb3J0IHtNYXRJY29uQW5jaG9yLCBNYXRJY29uQnV0dG9ufSBmcm9tICcuL2ljb24tYnV0dG9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdEFuY2hvcixcbiAgICBNYXRCdXR0b24sXG4gICAgTWF0SWNvbkFuY2hvcixcbiAgICBNYXRJY29uQnV0dG9uLFxuICAgIE1hdEZhYkFuY2hvcixcbiAgICBNYXRGYWJCdXR0b24sXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRBbmNob3IsXG4gICAgTWF0QnV0dG9uLFxuICAgIE1hdEljb25BbmNob3IsXG4gICAgTWF0SWNvbkJ1dHRvbixcbiAgICBNYXRGYWJBbmNob3IsXG4gICAgTWF0RmFiQnV0dG9uLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRCdXR0b25Nb2R1bGUge1xufVxuIl19