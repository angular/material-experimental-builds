/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
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
let MatTabsModule = /** @class */ (() => {
    let MatTabsModule = class MatTabsModule {
    };
    MatTabsModule = __decorate([
        NgModule({
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
        })
    ], MatTabsModule);
    return MatTabsModule;
})();
export { MatTabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUM3QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQW1DaEU7SUFBQSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0tBQ3pCLENBQUE7SUFEWSxhQUFhO1FBakN6QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixlQUFlO2dCQUNmLFlBQVk7Z0JBQ1osZUFBZTtnQkFDZixlQUFlO2dCQUNmLFVBQVU7YUFDWDtZQUNELE9BQU8sRUFBRTtnQkFDUCxlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxNQUFNO2dCQUNOLFdBQVc7Z0JBQ1gsU0FBUztnQkFDVCxVQUFVO2FBQ1g7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osYUFBYTtnQkFDYixXQUFXO2dCQUNYLE1BQU07Z0JBQ04sV0FBVztnQkFDWCxTQUFTO2dCQUNULFVBQVU7Z0JBRVYsOENBQThDO2dCQUM5QyxVQUFVO2dCQUNWLGdCQUFnQjtnQkFDaEIsa0JBQWtCO2dCQUNsQixZQUFZO2FBQ2I7U0FDRixDQUFDO09BQ1csYUFBYSxDQUN6QjtJQUFELG9CQUFDO0tBQUE7U0FEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7UG9ydGFsTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7T2JzZXJ2ZXJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7QTExeU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtNYXRUYWJCb2R5LCBNYXRUYWJCb2R5UG9ydGFsfSBmcm9tICcuL3RhYi1ib2R5JztcbmltcG9ydCB7TWF0VGFiQ29udGVudH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQge01hdFRhYkxhYmVsfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5pbXBvcnQge01hdFRhYkxhYmVsV3JhcHBlcn0gZnJvbSAnLi90YWItbGFiZWwtd3JhcHBlcic7XG5pbXBvcnQge01hdFRhYn0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHtNYXRUYWJIZWFkZXJ9IGZyb20gJy4vdGFiLWhlYWRlcic7XG5pbXBvcnQge01hdFRhYkdyb3VwfSBmcm9tICcuL3RhYi1ncm91cCc7XG5pbXBvcnQge01hdFRhYk5hdiwgTWF0VGFiTGlua30gZnJvbSAnLi90YWItbmF2LWJhci90YWItbmF2LWJhcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIFBvcnRhbE1vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgT2JzZXJ2ZXJzTW9kdWxlLFxuICAgIEExMXlNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgTWF0VGFiQ29udGVudCxcbiAgICBNYXRUYWJMYWJlbCxcbiAgICBNYXRUYWIsXG4gICAgTWF0VGFiR3JvdXAsXG4gICAgTWF0VGFiTmF2LFxuICAgIE1hdFRhYkxpbmssXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdFRhYkNvbnRlbnQsXG4gICAgTWF0VGFiTGFiZWwsXG4gICAgTWF0VGFiLFxuICAgIE1hdFRhYkdyb3VwLFxuICAgIE1hdFRhYk5hdixcbiAgICBNYXRUYWJMaW5rLFxuXG4gICAgLy8gUHJpdmF0ZSBkaXJlY3RpdmVzLCBzaG91bGQgbm90IGJlIGV4cG9ydGVkLlxuICAgIE1hdFRhYkJvZHksXG4gICAgTWF0VGFiQm9keVBvcnRhbCxcbiAgICBNYXRUYWJMYWJlbFdyYXBwZXIsXG4gICAgTWF0VGFiSGVhZGVyXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFic01vZHVsZSB7XG59XG4iXX0=