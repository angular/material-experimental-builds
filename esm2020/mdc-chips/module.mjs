/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorStateMatcher, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatChip } from './chip';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './tokens';
import { MatChipEditInput } from './chip-edit-input';
import { MatChipGrid } from './chip-grid';
import { MatChipAvatar, MatChipRemove, MatChipTrailingIcon } from './chip-icons';
import { MatChipInput } from './chip-input';
import { MatChipListbox } from './chip-listbox';
import { MatChipRow } from './chip-row';
import { MatChipOption } from './chip-option';
import { MatChipSet } from './chip-set';
import { MatChipAction } from './chip-action';
import * as i0 from "@angular/core";
const CHIP_DECLARATIONS = [
    MatChip,
    MatChipAvatar,
    MatChipEditInput,
    MatChipGrid,
    MatChipInput,
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatChipRow,
    MatChipSet,
    MatChipTrailingIcon,
];
export class MatChipsModule {
}
MatChipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatChipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.1", ngImport: i0, type: MatChipsModule, declarations: [MatChipAction, MatChip,
        MatChipAvatar,
        MatChipEditInput,
        MatChipGrid,
        MatChipInput,
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatChipRow,
        MatChipSet,
        MatChipTrailingIcon], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatCommonModule, MatChip,
        MatChipAvatar,
        MatChipEditInput,
        MatChipGrid,
        MatChipInput,
        MatChipListbox,
        MatChipOption,
        MatChipRemove,
        MatChipRow,
        MatChipSet,
        MatChipTrailingIcon] });
MatChipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatChipsModule, providers: [
        ErrorStateMatcher,
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER],
            },
        },
    ], imports: [MatCommonModule, CommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatCommonModule, CHIP_DECLARATIONS],
                    declarations: [MatChipAction, CHIP_DECLARATIONS],
                    providers: [
                        ErrorStateMatcher,
                        {
                            provide: MAT_CHIPS_DEFAULT_OPTIONS,
                            useValue: {
                                separatorKeyCodes: [ENTER],
                            },
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDL0IsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLFVBQVUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRTVDLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsT0FBTztJQUNQLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0lBQ2QsYUFBYTtJQUNiLGFBQWE7SUFDYixVQUFVO0lBQ1YsVUFBVTtJQUNWLG1CQUFtQjtDQUNwQixDQUFDO0FBZ0JGLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBWFYsYUFBYSxFQWhCNUIsT0FBTztRQUNQLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLFlBQVk7UUFDWixjQUFjO1FBQ2QsYUFBYTtRQUNiLGFBQWE7UUFDYixVQUFVO1FBQ1YsVUFBVTtRQUNWLG1CQUFtQixhQUlULGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxhQUM5QyxlQUFlLEVBZnpCLE9BQU87UUFDUCxhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxZQUFZO1FBQ1osY0FBYztRQUNkLGFBQWE7UUFDYixhQUFhO1FBQ2IsVUFBVTtRQUNWLFVBQVU7UUFDVixtQkFBbUI7NEdBaUJSLGNBQWMsYUFWZDtRQUNULGlCQUFpQjtRQUNqQjtZQUNFLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsUUFBUSxFQUFFO2dCQUNSLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDO2FBQ0Q7U0FDNUI7S0FDRixZQVhTLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUM5QyxlQUFlOzJGQVlkLGNBQWM7a0JBZDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQztvQkFDN0MsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDO29CQUNoRCxTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQjs0QkFDRSxPQUFPLEVBQUUseUJBQXlCOzRCQUNsQyxRQUFRLEVBQUU7Z0NBQ1IsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkJBQ0Q7eUJBQzVCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RU5URVJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFcnJvclN0YXRlTWF0Y2hlciwgTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRDaGlwfSBmcm9tICcuL2NoaXAnO1xuaW1wb3J0IHtNQVRfQ0hJUFNfREVGQVVMVF9PUFRJT05TLCBNYXRDaGlwc0RlZmF1bHRPcHRpb25zfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQge01hdENoaXBFZGl0SW5wdXR9IGZyb20gJy4vY2hpcC1lZGl0LWlucHV0JztcbmltcG9ydCB7TWF0Q2hpcEdyaWR9IGZyb20gJy4vY2hpcC1ncmlkJztcbmltcG9ydCB7TWF0Q2hpcEF2YXRhciwgTWF0Q2hpcFJlbW92ZSwgTWF0Q2hpcFRyYWlsaW5nSWNvbn0gZnJvbSAnLi9jaGlwLWljb25zJztcbmltcG9ydCB7TWF0Q2hpcElucHV0fSBmcm9tICcuL2NoaXAtaW5wdXQnO1xuaW1wb3J0IHtNYXRDaGlwTGlzdGJveH0gZnJvbSAnLi9jaGlwLWxpc3Rib3gnO1xuaW1wb3J0IHtNYXRDaGlwUm93fSBmcm9tICcuL2NoaXAtcm93JztcbmltcG9ydCB7TWF0Q2hpcE9wdGlvbn0gZnJvbSAnLi9jaGlwLW9wdGlvbic7XG5pbXBvcnQge01hdENoaXBTZXR9IGZyb20gJy4vY2hpcC1zZXQnO1xuaW1wb3J0IHtNYXRDaGlwQWN0aW9ufSBmcm9tICcuL2NoaXAtYWN0aW9uJztcblxuY29uc3QgQ0hJUF9ERUNMQVJBVElPTlMgPSBbXG4gIE1hdENoaXAsXG4gIE1hdENoaXBBdmF0YXIsXG4gIE1hdENoaXBFZGl0SW5wdXQsXG4gIE1hdENoaXBHcmlkLFxuICBNYXRDaGlwSW5wdXQsXG4gIE1hdENoaXBMaXN0Ym94LFxuICBNYXRDaGlwT3B0aW9uLFxuICBNYXRDaGlwUmVtb3ZlLFxuICBNYXRDaGlwUm93LFxuICBNYXRDaGlwU2V0LFxuICBNYXRDaGlwVHJhaWxpbmdJY29uLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDSElQX0RFQ0xBUkFUSU9OU10sXG4gIGRlY2xhcmF0aW9uczogW01hdENoaXBBY3Rpb24sIENISVBfREVDTEFSQVRJT05TXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogTUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgIHNlcGFyYXRvcktleUNvZGVzOiBbRU5URVJdLFxuICAgICAgfSBhcyBNYXRDaGlwc0RlZmF1bHRPcHRpb25zLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBzTW9kdWxlIHt9XG4iXX0=