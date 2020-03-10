/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { PortalModule } from '@angular/cdk/portal';
import { ObserversModule } from '@angular/cdk/observers';
import { A11yModule } from '@angular/cdk/a11y';
import { MatTabBody, MatTabBodyPortal } from './tab-body';
import { MatTabContent } from './tab-content';
import { MatTabLabel } from './tab-label';
import { MatTabLabelWrapper } from './tab-label-wrapper';
import { MatTab } from './tab';
import { MatTabHeader } from './tab-header';
import { MatTabGroup } from './tab-group';
import { MatTabNav, MatTabLink } from './tab-nav-bar/tab-nav-bar';
var MatTabsModule = /** @class */ (function () {
    function MatTabsModule() {
    }
    MatTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatCommonModule,
                        PortalModule,
                        MatRippleModule,
                        ObserversModule,
                        A11yModule,
                    ],
                    exports: [
                        MatCommonModule,
                        MatTabContent,
                        MatTabLabel,
                        MatTab,
                        MatTabGroup,
                        MatTabNav,
                        MatTabLink,
                    ],
                    declarations: [
                        MatTabContent,
                        MatTabLabel,
                        MatTab,
                        MatTabGroup,
                        MatTabNav,
                        MatTabLink,
                        // Private directives, should not be exported.
                        MatTabBody,
                        MatTabBodyPortal,
                        MatTabLabelWrapper,
                        MatTabHeader
                    ]
                },] }
    ];
    return MatTabsModule;
}());
export { MatTabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWhFO0lBQUE7SUFrQ0EsQ0FBQzs7Z0JBbENBLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixlQUFlO3dCQUNmLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixXQUFXO3dCQUNYLE1BQU07d0JBQ04sV0FBVzt3QkFDWCxTQUFTO3dCQUNULFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxNQUFNO3dCQUNOLFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxVQUFVO3dCQUVWLDhDQUE4Qzt3QkFDOUMsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsWUFBWTtxQkFDYjtpQkFDRjs7SUFFRCxvQkFBQztDQUFBLEFBbENELElBa0NDO1NBRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge09ic2VydmVyc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQge0ExMXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7TWF0VGFiQm9keSwgTWF0VGFiQm9keVBvcnRhbH0gZnJvbSAnLi90YWItYm9keSc7XG5pbXBvcnQge01hdFRhYkNvbnRlbnR9IGZyb20gJy4vdGFiLWNvbnRlbnQnO1xuaW1wb3J0IHtNYXRUYWJMYWJlbH0gZnJvbSAnLi90YWItbGFiZWwnO1xuaW1wb3J0IHtNYXRUYWJMYWJlbFdyYXBwZXJ9IGZyb20gJy4vdGFiLWxhYmVsLXdyYXBwZXInO1xuaW1wb3J0IHtNYXRUYWJ9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7TWF0VGFiSGVhZGVyfSBmcm9tICcuL3RhYi1oZWFkZXInO1xuaW1wb3J0IHtNYXRUYWJHcm91cH0gZnJvbSAnLi90YWItZ3JvdXAnO1xuaW1wb3J0IHtNYXRUYWJOYXYsIE1hdFRhYkxpbmt9IGZyb20gJy4vdGFiLW5hdi1iYXIvdGFiLW5hdi1iYXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBQb3J0YWxNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE9ic2VydmVyc01vZHVsZSxcbiAgICBBMTF5TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdFRhYkNvbnRlbnQsXG4gICAgTWF0VGFiTGFiZWwsXG4gICAgTWF0VGFiLFxuICAgIE1hdFRhYkdyb3VwLFxuICAgIE1hdFRhYk5hdixcbiAgICBNYXRUYWJMaW5rLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRUYWJDb250ZW50LFxuICAgIE1hdFRhYkxhYmVsLFxuICAgIE1hdFRhYixcbiAgICBNYXRUYWJHcm91cCxcbiAgICBNYXRUYWJOYXYsXG4gICAgTWF0VGFiTGluayxcblxuICAgIC8vIFByaXZhdGUgZGlyZWN0aXZlcywgc2hvdWxkIG5vdCBiZSBleHBvcnRlZC5cbiAgICBNYXRUYWJCb2R5LFxuICAgIE1hdFRhYkJvZHlQb3J0YWwsXG4gICAgTWF0VGFiTGFiZWxXcmFwcGVyLFxuICAgIE1hdFRhYkhlYWRlclxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYnNNb2R1bGUge1xufVxuIl19