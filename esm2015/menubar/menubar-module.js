/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk-experimental/menu';
import { MatMenuBar } from './menubar';
import { MatMenuBarItem } from './menubar-item';
export class MatMenuBarModule {
}
MatMenuBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CdkMenuModule],
                exports: [MatMenuBar, MatMenuBarItem],
                declarations: [MatMenuBar, MatMenuBarItem],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21lbnViYXIvbWVudWJhci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFPOUMsTUFBTSxPQUFPLGdCQUFnQjs7O1lBTDVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7Z0JBQ3JDLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7YUFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nka01lbnVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvbWVudSc7XG5pbXBvcnQge01hdE1lbnVCYXJ9IGZyb20gJy4vbWVudWJhcic7XG5pbXBvcnQge01hdE1lbnVCYXJJdGVtfSBmcm9tICcuL21lbnViYXItaXRlbSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDZGtNZW51TW9kdWxlXSxcbiAgZXhwb3J0czogW01hdE1lbnVCYXIsIE1hdE1lbnVCYXJJdGVtXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0TWVudUJhciwgTWF0TWVudUJhckl0ZW1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRNZW51QmFyTW9kdWxlIHt9XG4iXX0=