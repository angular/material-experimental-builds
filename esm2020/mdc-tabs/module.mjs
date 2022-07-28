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
import { MatTabNav, MatTabNavPanel, MatTabLink } from './tab-nav-bar/tab-nav-bar';
import * as i0 from "@angular/core";
export class MatTabsModule {
}
MatTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.1", ngImport: i0, type: MatTabsModule, declarations: [MatTabContent,
        MatTabLabel,
        MatTab,
        MatTabGroup,
        MatTabNav,
        MatTabNavPanel,
        MatTabLink,
        // Private directives, should not be exported.
        MatTabBody,
        MatTabBodyPortal,
        MatTabLabelWrapper,
        MatTabHeader], imports: [CommonModule,
        MatCommonModule,
        PortalModule,
        MatRippleModule,
        ObserversModule,
        A11yModule], exports: [MatCommonModule,
        MatTabContent,
        MatTabLabel,
        MatTab,
        MatTabGroup,
        MatTabNav,
        MatTabNavPanel,
        MatTabLink] });
MatTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatTabsModule, imports: [CommonModule,
        MatCommonModule,
        PortalModule,
        MatRippleModule,
        ObserversModule,
        A11yModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatTabsModule, decorators: [{
            type: NgModule,
            args: [{
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
                        MatTabNavPanel,
                        MatTabLink,
                    ],
                    declarations: [
                        MatTabContent,
                        MatTabLabel,
                        MatTab,
                        MatTabGroup,
                        MatTabNav,
                        MatTabNavPanel,
                        MatTabLink,
                        // Private directives, should not be exported.
                        MatTabBody,
                        MatTabBodyPortal,
                        MatTabLabelWrapper,
                        MatTabHeader,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFxQ2hGLE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBZnRCLGFBQWE7UUFDYixXQUFXO1FBQ1gsTUFBTTtRQUNOLFdBQVc7UUFDWCxTQUFTO1FBQ1QsY0FBYztRQUNkLFVBQVU7UUFFViw4Q0FBOEM7UUFDOUMsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsWUFBWSxhQTlCWixZQUFZO1FBQ1osZUFBZTtRQUNmLFlBQVk7UUFDWixlQUFlO1FBQ2YsZUFBZTtRQUNmLFVBQVUsYUFHVixlQUFlO1FBQ2YsYUFBYTtRQUNiLFdBQVc7UUFDWCxNQUFNO1FBQ04sV0FBVztRQUNYLFNBQVM7UUFDVCxjQUFjO1FBQ2QsVUFBVTsyR0FrQkQsYUFBYSxZQWpDdEIsWUFBWTtRQUNaLGVBQWU7UUFDZixZQUFZO1FBQ1osZUFBZTtRQUNmLGVBQWU7UUFDZixVQUFVLEVBR1YsZUFBZTsyRkF5Qk4sYUFBYTtrQkFuQ3pCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixVQUFVO3FCQUNYO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxNQUFNO3dCQUNOLFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxjQUFjO3dCQUNkLFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxNQUFNO3dCQUNOLFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxjQUFjO3dCQUNkLFVBQVU7d0JBRVYsOENBQThDO3dCQUM5QyxVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixZQUFZO3FCQUNiO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7UG9ydGFsTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7T2JzZXJ2ZXJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7QTExeU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtNYXRUYWJCb2R5LCBNYXRUYWJCb2R5UG9ydGFsfSBmcm9tICcuL3RhYi1ib2R5JztcbmltcG9ydCB7TWF0VGFiQ29udGVudH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQge01hdFRhYkxhYmVsfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5pbXBvcnQge01hdFRhYkxhYmVsV3JhcHBlcn0gZnJvbSAnLi90YWItbGFiZWwtd3JhcHBlcic7XG5pbXBvcnQge01hdFRhYn0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHtNYXRUYWJIZWFkZXJ9IGZyb20gJy4vdGFiLWhlYWRlcic7XG5pbXBvcnQge01hdFRhYkdyb3VwfSBmcm9tICcuL3RhYi1ncm91cCc7XG5pbXBvcnQge01hdFRhYk5hdiwgTWF0VGFiTmF2UGFuZWwsIE1hdFRhYkxpbmt9IGZyb20gJy4vdGFiLW5hdi1iYXIvdGFiLW5hdi1iYXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBQb3J0YWxNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE9ic2VydmVyc01vZHVsZSxcbiAgICBBMTF5TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdFRhYkNvbnRlbnQsXG4gICAgTWF0VGFiTGFiZWwsXG4gICAgTWF0VGFiLFxuICAgIE1hdFRhYkdyb3VwLFxuICAgIE1hdFRhYk5hdixcbiAgICBNYXRUYWJOYXZQYW5lbCxcbiAgICBNYXRUYWJMaW5rLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRUYWJDb250ZW50LFxuICAgIE1hdFRhYkxhYmVsLFxuICAgIE1hdFRhYixcbiAgICBNYXRUYWJHcm91cCxcbiAgICBNYXRUYWJOYXYsXG4gICAgTWF0VGFiTmF2UGFuZWwsXG4gICAgTWF0VGFiTGluayxcblxuICAgIC8vIFByaXZhdGUgZGlyZWN0aXZlcywgc2hvdWxkIG5vdCBiZSBleHBvcnRlZC5cbiAgICBNYXRUYWJCb2R5LFxuICAgIE1hdFRhYkJvZHlQb3J0YWwsXG4gICAgTWF0VGFiTGFiZWxXcmFwcGVyLFxuICAgIE1hdFRhYkhlYWRlcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFic01vZHVsZSB7fVxuIl19