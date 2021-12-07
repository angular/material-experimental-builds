/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, ContentChild, } from '@angular/core';
import { MatTab as BaseMatTab, MAT_TAB } from '@angular/material/tabs';
import { MatTabContent } from './tab-content';
import { MatTabLabel } from './tab-label';
import * as i0 from "@angular/core";
export class MatTab extends BaseMatTab {
    /** Content for the tab label given by `<ng-template mat-tab-label>`. */
    get templateLabel() {
        return this._templateLabel;
    }
    set templateLabel(value) {
        this._setTemplateLabelInput(value);
    }
}
MatTab.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatTab, deps: null, target: i0.ɵɵFactoryTarget.Component });
MatTab.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0-next.3", type: MatTab, selector: "mat-tab", inputs: { disabled: "disabled" }, providers: [{ provide: MAT_TAB, useExisting: MatTab }], queries: [{ propertyName: "_explicitContent", first: true, predicate: MatTabContent, descendants: true, read: TemplateRef, static: true }, { propertyName: "templateLabel", first: true, predicate: MatTabLabel, descendants: true }], exportAs: ["matTab"], usesInheritance: true, ngImport: i0, template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0-next.3", ngImport: i0, type: MatTab, decorators: [{
            type: Component,
            args: [{ selector: 'mat-tab', inputs: ['disabled'], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, exportAs: 'matTab', providers: [{ provide: MAT_TAB, useExisting: MatTab }], template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n" }]
        }], propDecorators: { _explicitContent: [{
                type: ContentChild,
                args: [MatTabContent, { read: TemplateRef, static: true }]
            }], templateLabel: [{
                type: ContentChild,
                args: [MatTabLabel]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy90YWIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxNQUFNLElBQUksVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFleEMsTUFBTSxPQUFPLE1BQU8sU0FBUSxVQUFVO0lBT3BDLHdFQUF3RTtJQUN4RSxJQUNhLGFBQWE7UUFDeEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFhLGFBQWEsQ0FBQyxLQUFrQjtRQUMzQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7MEdBZFUsTUFBTTs4RkFBTixNQUFNLG9FQUZOLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUMsQ0FBQyx3RUFNdEMsYUFBYSwyQkFBUyxXQUFXLDJFQUlqQyxXQUFXLDZGQ3hDM0IsK1FBSUE7a0dENEJhLE1BQU07a0JBYmxCLFNBQVM7K0JBQ0UsU0FBUyxVQU1YLENBQUMsVUFBVSxDQUFDLG1CQUNILHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksWUFDM0IsUUFBUSxhQUNQLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsUUFBUSxFQUFDLENBQUM7OEJBTzNDLGdCQUFnQjtzQkFEeEIsWUFBWTt1QkFBQyxhQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBS2pELGFBQWE7c0JBRHpCLFlBQVk7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVGVtcGxhdGVSZWYsXG4gIENvbnRlbnRDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFRhYiBhcyBCYXNlTWF0VGFiLCBNQVRfVEFCfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7TWF0VGFiQ29udGVudH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQge01hdFRhYkxhYmVsfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC10YWInLFxuXG4gIC8vIE5vdGUgdGhhdCB1c3VhbGx5IHdlJ2QgZ28gdGhyb3VnaCBhIGJpdCBtb3JlIHRyb3VibGUgYW5kIHNldCB1cCBhbm90aGVyIGNsYXNzIHNvIHRoYXRcbiAgLy8gdGhlIGlubGluZWQgdGVtcGxhdGUgb2YgYE1hdFRhYmAgaXNuJ3QgZHVwbGljYXRlZCwgaG93ZXZlciB0aGUgdGVtcGxhdGUgaXMgc21hbGwgZW5vdWdoXG4gIC8vIHRoYXQgY3JlYXRpbmcgdGhlIGV4dHJhIGNsYXNzIHdpbGwgZ2VuZXJhdGUgbW9yZSBjb2RlIHRoYW4ganVzdCBkdXBsaWNhdGluZyB0aGUgdGVtcGxhdGUuXG4gIHRlbXBsYXRlVXJsOiAndGFiLmh0bWwnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWF0VGFiJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9UQUIsIHVzZUV4aXN0aW5nOiBNYXRUYWJ9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiIGV4dGVuZHMgQmFzZU1hdFRhYiB7XG4gIC8qKlxuICAgKiBUZW1wbGF0ZSBwcm92aWRlZCBpbiB0aGUgdGFiIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHVzZWQgaWYgcHJlc2VudCwgdXNlZCB0byBlbmFibGUgbGF6eS1sb2FkaW5nXG4gICAqL1xuICBAQ29udGVudENoaWxkKE1hdFRhYkNvbnRlbnQsIHtyZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlfSlcbiAgb3ZlcnJpZGUgX2V4cGxpY2l0Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKiogQ29udGVudCBmb3IgdGhlIHRhYiBsYWJlbCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+YC4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRUYWJMYWJlbClcbiAgb3ZlcnJpZGUgZ2V0IHRlbXBsYXRlTGFiZWwoKTogTWF0VGFiTGFiZWwge1xuICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZUxhYmVsO1xuICB9XG4gIG92ZXJyaWRlIHNldCB0ZW1wbGF0ZUxhYmVsKHZhbHVlOiBNYXRUYWJMYWJlbCkge1xuICAgIHRoaXMuX3NldFRlbXBsYXRlTGFiZWxJbnB1dCh2YWx1ZSk7XG4gIH1cbn1cbiIsIjwhLS0gQ3JlYXRlIGEgdGVtcGxhdGUgZm9yIHRoZSBjb250ZW50IG9mIHRoZSA8bWF0LXRhYj4gc28gdGhhdCB3ZSBjYW4gZ3JhYiBhIHJlZmVyZW5jZSB0byB0aGlzXG4gICAgVGVtcGxhdGVSZWYgYW5kIHVzZSBpdCBpbiBhIFBvcnRhbCB0byByZW5kZXIgdGhlIHRhYiBjb250ZW50IGluIHRoZSBhcHByb3ByaWF0ZSBwbGFjZSBpbiB0aGVcbiAgICB0YWItZ3JvdXAuIC0tPlxuPG5nLXRlbXBsYXRlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLXRlbXBsYXRlPlxuIl19