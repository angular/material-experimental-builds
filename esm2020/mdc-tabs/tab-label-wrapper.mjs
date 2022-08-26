/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { MatTabLabelWrapper as BaseMatTabLabelWrapper } from '@angular/material/tabs';
import { mixinInkBarItem } from './ink-bar';
import * as i0 from "@angular/core";
const _MatTabLabelWrapperBase = mixinInkBarItem(BaseMatTabLabelWrapper);
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
export class MatTabLabelWrapper extends _MatTabLabelWrapperBase {
}
MatTabLabelWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatTabLabelWrapper, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatTabLabelWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0", type: MatTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: { disabled: "disabled", fitInkBarToContent: "fitInkBarToContent" }, host: { properties: { "class.mat-mdc-tab-disabled": "disabled", "attr.aria-disabled": "!!disabled" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatTabLabelWrapper, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled', 'fitInkBarToContent'],
                    host: {
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGtCQUFrQixJQUFJLHNCQUFzQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEYsT0FBTyxFQUFnQixlQUFlLEVBQUMsTUFBTSxXQUFXLENBQUM7O0FBRXpELE1BQU0sdUJBQXVCLEdBQUcsZUFBZSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFeEU7OztHQUdHO0FBU0gsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHVCQUF1Qjs7K0dBQWxELGtCQUFrQjttR0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBUjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDO29CQUMxQyxJQUFJLEVBQUU7d0JBQ0osOEJBQThCLEVBQUUsVUFBVTt3QkFDMUMsc0JBQXNCLEVBQUUsWUFBWTtxQkFDckM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRUYWJMYWJlbFdyYXBwZXIgYXMgQmFzZU1hdFRhYkxhYmVsV3JhcHBlcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge01hdElua0Jhckl0ZW0sIG1peGluSW5rQmFySXRlbX0gZnJvbSAnLi9pbmstYmFyJztcblxuY29uc3QgX01hdFRhYkxhYmVsV3JhcHBlckJhc2UgPSBtaXhpbklua0Jhckl0ZW0oQmFzZU1hdFRhYkxhYmVsV3JhcHBlcik7XG5cbi8qKlxuICogVXNlZCBpbiB0aGUgYG1hdC10YWItZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSB0YWIgbGFiZWxzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0VGFiTGFiZWxXcmFwcGVyXScsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdmaXRJbmtCYXJUb0NvbnRlbnQnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy10YWItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnISFkaXNhYmxlZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYkxhYmVsV3JhcHBlciBleHRlbmRzIF9NYXRUYWJMYWJlbFdyYXBwZXJCYXNlIGltcGxlbWVudHMgTWF0SW5rQmFySXRlbSB7fVxuIl19