/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material-experimental/mdc-core';
import { MatAnchor, MatButton } from './button';
import { MatFabAnchor, MatFabButton, MatMiniFabAnchor, MatMiniFabButton } from './fab';
import { MatIconAnchor, MatIconButton } from './icon-button';
export class MatButtonModule {
}
MatButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatCommonModule, MatRippleModule],
                exports: [
                    MatAnchor,
                    MatButton,
                    MatIconAnchor,
                    MatIconButton,
                    MatMiniFabAnchor,
                    MatMiniFabButton,
                    MatFabAnchor,
                    MatFabButton,
                    MatCommonModule,
                ],
                declarations: [
                    MatAnchor,
                    MatButton,
                    MatIconAnchor,
                    MatMiniFabAnchor,
                    MatMiniFabButton,
                    MatIconButton,
                    MatFabAnchor,
                    MatFabButton,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYnV0dG9uL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDekYsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDckYsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUEwQjNELE1BQU0sT0FBTyxlQUFlOzs7WUF4QjNCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO2dCQUMzQyxPQUFPLEVBQUU7b0JBQ1AsU0FBUztvQkFDVCxTQUFTO29CQUNULGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsWUFBWTtvQkFDWixZQUFZO29CQUNaLGVBQWU7aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDWixTQUFTO29CQUNULFNBQVM7b0JBQ1QsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixZQUFZO29CQUNaLFlBQVk7aUJBQ2I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01hdEFuY2hvciwgTWF0QnV0dG9ufSBmcm9tICcuL2J1dHRvbic7XG5pbXBvcnQge01hdEZhYkFuY2hvciwgTWF0RmFiQnV0dG9uLCBNYXRNaW5pRmFiQW5jaG9yLCBNYXRNaW5pRmFiQnV0dG9ufSBmcm9tICcuL2ZhYic7XG5pbXBvcnQge01hdEljb25BbmNob3IsIE1hdEljb25CdXR0b259IGZyb20gJy4vaWNvbi1idXR0b24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0QW5jaG9yLFxuICAgIE1hdEJ1dHRvbixcbiAgICBNYXRJY29uQW5jaG9yLFxuICAgIE1hdEljb25CdXR0b24sXG4gICAgTWF0TWluaUZhYkFuY2hvcixcbiAgICBNYXRNaW5pRmFiQnV0dG9uLFxuICAgIE1hdEZhYkFuY2hvcixcbiAgICBNYXRGYWJCdXR0b24sXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRBbmNob3IsXG4gICAgTWF0QnV0dG9uLFxuICAgIE1hdEljb25BbmNob3IsXG4gICAgTWF0TWluaUZhYkFuY2hvcixcbiAgICBNYXRNaW5pRmFiQnV0dG9uLFxuICAgIE1hdEljb25CdXR0b24sXG4gICAgTWF0RmFiQW5jaG9yLFxuICAgIE1hdEZhYkJ1dHRvbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uTW9kdWxlIHtcbn1cbiJdfQ==