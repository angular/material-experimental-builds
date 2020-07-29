/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { _MatOptgroupBase } from '@angular/material/core';
/**
 * Component that is used to group instances of `mat-option`.
 */
export class MatOptgroup extends _MatOptgroupBase {
}
MatOptgroup.decorators = [
    { type: Component, args: [{
                selector: 'mat-optgroup',
                exportAs: 'matOptgroup',
                template: "<label\n  class=\"mat-mdc-optgroup-label\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__text\">{{ label }} <ng-content></ng-content></span>\n</label>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled'],
                host: {
                    'class': 'mat-mdc-optgroup',
                    'role': 'group',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-labelledby]': '_labelId',
                },
                styles: [".mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}\n"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlL29wdGlvbi9vcHRncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBR3hEOztHQUVHO0FBZ0JILE1BQU0sT0FBTyxXQUFZLFNBQVEsZ0JBQWdCOzs7WUFmaEQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsNlJBQTRCO2dCQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFFcEIsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLE1BQU0sRUFBRSxPQUFPO29CQUNmLHNCQUFzQixFQUFFLHFCQUFxQjtvQkFDN0Msd0JBQXdCLEVBQUUsVUFBVTtpQkFDckM7O2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge19NYXRPcHRncm91cEJhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgaXMgdXNlZCB0byBncm91cCBpbnN0YW5jZXMgb2YgYG1hdC1vcHRpb25gLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtb3B0Z3JvdXAnLFxuICBleHBvcnRBczogJ21hdE9wdGdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdvcHRncm91cC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBzdHlsZVVybHM6IFsnb3B0Z3JvdXAuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1vcHRncm91cCcsXG4gICAgJ3JvbGUnOiAnZ3JvdXAnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdfbGFiZWxJZCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0T3B0Z3JvdXAgZXh0ZW5kcyBfTWF0T3B0Z3JvdXBCYXNlIHtcbn1cbiJdfQ==