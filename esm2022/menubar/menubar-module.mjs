/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuBar } from './menubar';
import { MatMenuBarItem } from './menubar-item';
import * as i0 from "@angular/core";
export class MatMenuBarModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, imports: [CdkMenuModule, MatMenuBar, MatMenuBarItem], exports: [MatMenuBar, MatMenuBarItem] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, imports: [CdkMenuModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0", ngImport: i0, type: MatMenuBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkMenuModule, MatMenuBar, MatMenuBarItem],
                    exports: [MatMenuBar, MatMenuBarItem],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21lbnViYXIvbWVudWJhci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBTTlDLE1BQU0sT0FBTyxnQkFBZ0I7OEdBQWhCLGdCQUFnQjsrR0FBaEIsZ0JBQWdCLFlBSGpCLGFBQWEsRUFBRSxVQUFVLEVBQUUsY0FBYyxhQUN6QyxVQUFVLEVBQUUsY0FBYzsrR0FFekIsZ0JBQWdCLFlBSGpCLGFBQWE7OzJGQUdaLGdCQUFnQjtrQkFKNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQztvQkFDcEQsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQztpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nka01lbnVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9tZW51JztcbmltcG9ydCB7TWF0TWVudUJhcn0gZnJvbSAnLi9tZW51YmFyJztcbmltcG9ydCB7TWF0TWVudUJhckl0ZW19IGZyb20gJy4vbWVudWJhci1pdGVtJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0Nka01lbnVNb2R1bGUsIE1hdE1lbnVCYXIsIE1hdE1lbnVCYXJJdGVtXSxcbiAgZXhwb3J0czogW01hdE1lbnVCYXIsIE1hdE1lbnVCYXJJdGVtXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TWVudUJhck1vZHVsZSB7fVxuIl19