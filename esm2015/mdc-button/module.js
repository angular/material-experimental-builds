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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtYnV0dG9uL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFzQjNELE1BQU0sT0FBTyxlQUFlOzs7WUFwQjNCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO2dCQUMzQyxPQUFPLEVBQUU7b0JBQ1AsU0FBUztvQkFDVCxTQUFTO29CQUNULGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixZQUFZO29CQUNaLFlBQVk7b0JBQ1osZUFBZTtpQkFDaEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixZQUFZO2lCQUNiO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0QW5jaG9yLCBNYXRCdXR0b259IGZyb20gJy4vYnV0dG9uJztcbmltcG9ydCB7TWF0RmFiQW5jaG9yLCBNYXRGYWJCdXR0b259IGZyb20gJy4vZmFiJztcbmltcG9ydCB7TWF0SWNvbkFuY2hvciwgTWF0SWNvbkJ1dHRvbn0gZnJvbSAnLi9pY29uLWJ1dHRvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRBbmNob3IsXG4gICAgTWF0QnV0dG9uLFxuICAgIE1hdEljb25BbmNob3IsXG4gICAgTWF0SWNvbkJ1dHRvbixcbiAgICBNYXRGYWJBbmNob3IsXG4gICAgTWF0RmFiQnV0dG9uLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0QW5jaG9yLFxuICAgIE1hdEJ1dHRvbixcbiAgICBNYXRJY29uQW5jaG9yLFxuICAgIE1hdEljb25CdXR0b24sXG4gICAgTWF0RmFiQW5jaG9yLFxuICAgIE1hdEZhYkJ1dHRvbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uTW9kdWxlIHtcbn1cbiJdfQ==