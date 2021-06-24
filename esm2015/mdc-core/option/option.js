/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Optional, Inject, } from '@angular/core';
import { _MatOptionBase, MAT_OPTION_PARENT_COMPONENT, MAT_OPTGROUP, } from '@angular/material/core';
import { MatOptgroup } from './optgroup';
/**
 * Single option inside of a `<mat-select>` element.
 */
export class MatOption extends _MatOptionBase {
    constructor(element, changeDetectorRef, parent, group) {
        super(element, changeDetectorRef, parent, group);
    }
}
MatOption.decorators = [
    { type: Component, args: [{
                selector: 'mat-option',
                exportAs: 'matOption',
                host: {
                    'role': 'option',
                    '[attr.tabindex]': '_getTabIndex()',
                    '[class.mdc-list-item--selected]': 'selected',
                    '[class.mat-mdc-option-multiple]': 'multiple',
                    '[class.mat-mdc-option-active]': 'active',
                    '[class.mdc-list-item--disabled]': 'disabled',
                    '[id]': 'id',
                    '[attr.aria-selected]': '_getAriaSelected()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '(click)': '_selectViaInteraction()',
                    '(keydown)': '_handleKeydown($event)',
                    'class': 'mat-mdc-option mat-mdc-focus-indicator',
                },
                template: "<mat-pseudo-checkbox *ngIf=\"multiple\" class=\"mat-mdc-option-pseudo-checkbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></mat-pseudo-checkbox>\n\n<span class=\"mdc-list-item__primary-text\"><ng-content></ng-content></span>\n\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class=\"cdk-visually-hidden\" *ngIf=\"group && group._inert\">({{ group.label }})</span>\n\n<div class=\"mat-mdc-option-ripple\" mat-ripple\n     [matRippleTrigger]=\"_getHostElement()\"\n     [matRippleDisabled]=\"disabled || disableRipple\">\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-mdc-option{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;min-height:48px}.mat-mdc-option:focus{outline:none}[dir=rtl] .mat-mdc-option,.mat-mdc-option[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-option::after{display:inline-block;min-height:inherit;content:\"\"}.mat-mdc-option.mdc-list-item--disabled{opacity:.38;cursor:default}.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple){padding-left:32px}[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple){padding-left:16px;padding-right:32px}.mat-mdc-option .mat-pseudo-checkbox{margin-right:16px}[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox{margin-right:0;margin-left:16px}.mat-mdc-option .mat-mdc-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.cdk-high-contrast-active .mat-mdc-option-active::before{content:\"\";position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;border:solid 1px currentColor}\n"]
            },] }
];
MatOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_OPTION_PARENT_COMPONENT,] }] },
    { type: MatOptgroup, decorators: [{ type: Optional }, { type: Inject, args: [MAT_OPTGROUP,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZS9vcHRpb24vb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGNBQWMsRUFDZCwyQkFBMkIsRUFFM0IsWUFBWSxHQUNiLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUV2Qzs7R0FFRztBQXVCSCxNQUFNLE9BQU8sU0FBVSxTQUFRLGNBQWM7SUFDM0MsWUFDRSxPQUFnQyxFQUNoQyxpQkFBb0MsRUFDYSxNQUFnQyxFQUMvQyxLQUFrQjtRQUNwRCxLQUFLLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7WUE3QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsV0FBVztnQkFDckIsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxRQUFRO29CQUNoQixpQkFBaUIsRUFBRSxnQkFBZ0I7b0JBQ25DLGlDQUFpQyxFQUFFLFVBQVU7b0JBQzdDLGlDQUFpQyxFQUFFLFVBQVU7b0JBQzdDLCtCQUErQixFQUFFLFFBQVE7b0JBQ3pDLGlDQUFpQyxFQUFFLFVBQVU7b0JBQzdDLE1BQU0sRUFBRSxJQUFJO29CQUNaLHNCQUFzQixFQUFFLG9CQUFvQjtvQkFDNUMsc0JBQXNCLEVBQUUscUJBQXFCO29CQUM3QyxTQUFTLEVBQUUseUJBQXlCO29CQUNwQyxXQUFXLEVBQUUsd0JBQXdCO29CQUNyQyxPQUFPLEVBQUUsd0NBQXdDO2lCQUNsRDtnQkFFRCxtbUJBQTBCO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFyQ0MsVUFBVTtZQUNWLGlCQUFpQjs0Q0F5Q2QsUUFBUSxZQUFJLE1BQU0sU0FBQywyQkFBMkI7WUEvQjNDLFdBQVcsdUJBZ0NkLFFBQVEsWUFBSSxNQUFNLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgX01hdE9wdGlvbkJhc2UsXG4gIE1BVF9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCxcbiAgTWF0T3B0aW9uUGFyZW50Q29tcG9uZW50LFxuICBNQVRfT1BUR1JPVVAsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRPcHRncm91cH0gZnJvbSAnLi9vcHRncm91cCc7XG5cbi8qKlxuICogU2luZ2xlIG9wdGlvbiBpbnNpZGUgb2YgYSBgPG1hdC1zZWxlY3Q+YCBlbGVtZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtb3B0aW9uJyxcbiAgZXhwb3J0QXM6ICdtYXRPcHRpb24nLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnb3B0aW9uJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ19nZXRUYWJJbmRleCgpJyxcbiAgICAnW2NsYXNzLm1kYy1saXN0LWl0ZW0tLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLW9wdGlvbi1tdWx0aXBsZV0nOiAnbXVsdGlwbGUnLFxuICAgICdbY2xhc3MubWF0LW1kYy1vcHRpb24tYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ19nZXRBcmlhU2VsZWN0ZWQoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICcoY2xpY2spJzogJ19zZWxlY3RWaWFJbnRlcmFjdGlvbigpJyxcbiAgICAnKGtleWRvd24pJzogJ19oYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLW9wdGlvbiBtYXQtbWRjLWZvY3VzLWluZGljYXRvcicsXG4gIH0sXG4gIHN0eWxlVXJsczogWydvcHRpb24uY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnb3B0aW9uLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0T3B0aW9uIGV4dGVuZHMgX01hdE9wdGlvbkJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQpIHBhcmVudDogTWF0T3B0aW9uUGFyZW50Q29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX09QVEdST1VQKSBncm91cDogTWF0T3B0Z3JvdXApIHtcbiAgICBzdXBlcihlbGVtZW50LCBjaGFuZ2VEZXRlY3RvclJlZiwgcGFyZW50LCBncm91cCk7XG4gIH1cbn1cbiJdfQ==