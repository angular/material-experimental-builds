/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material-experimental/mdc-core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER, MatMenu } from './menu';
import { MatMenuItem } from './menu-item';
import { MatMenuContent, MatMenuTrigger } from './directives';
import * as i0 from "@angular/core";
export class MatMenuModule {
}
MatMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatMenuModule, declarations: [MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger], imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule], exports: [CdkScrollableModule,
        MatMenu,
        MatCommonModule,
        MatMenuItem,
        MatMenuContent,
        MatMenuTrigger] });
MatMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatMenuModule, providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule, CdkScrollableModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.1", ngImport: i0, type: MatMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule],
                    exports: [
                        CdkScrollableModule,
                        MatMenu,
                        MatCommonModule,
                        MatMenuItem,
                        MatMenuContent,
                        MatMenuTrigger,
                    ],
                    declarations: [MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger],
                    providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbWVudS9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUN6RixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLHlDQUF5QyxFQUFFLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMxRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQWU1RCxNQUFNLE9BQU8sYUFBYTs7K0dBQWIsYUFBYTtnSEFBYixhQUFhLGlCQUhULE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGNBQWMsYUFUekQsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxhQUVyRSxtQkFBbUI7UUFDbkIsT0FBTztRQUNQLGVBQWU7UUFDZixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWM7Z0hBS0wsYUFBYSxhQUZiLENBQUMseUNBQXlDLENBQUMsWUFWNUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUVyRSxtQkFBbUI7UUFFbkIsZUFBZTtnR0FRTixhQUFhO2tCQWJ6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQztvQkFDeEUsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsT0FBTzt3QkFDUCxlQUFlO3dCQUNmLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxjQUFjO3FCQUNmO29CQUNELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztvQkFDcEUsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7aUJBQ3ZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0Nka1Njcm9sbGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiwgTWF0TWVudX0gZnJvbSAnLi9tZW51JztcbmltcG9ydCB7TWF0TWVudUl0ZW19IGZyb20gJy4vbWVudS1pdGVtJztcbmltcG9ydCB7TWF0TWVudUNvbnRlbnQsIE1hdE1lbnVUcmlnZ2VyfSBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGUsIE1hdENvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBDZGtTY3JvbGxhYmxlTW9kdWxlLFxuICAgIE1hdE1lbnUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdE1lbnVJdGVtLFxuICAgIE1hdE1lbnVDb250ZW50LFxuICAgIE1hdE1lbnVUcmlnZ2VyLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRNZW51LCBNYXRNZW51SXRlbSwgTWF0TWVudUNvbnRlbnQsIE1hdE1lbnVUcmlnZ2VyXSxcbiAgcHJvdmlkZXJzOiBbTUFUX01FTlVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNZW51TW9kdWxlIHt9XG4iXX0=