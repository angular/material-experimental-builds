/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorStateMatcher, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatChip, MatChipCssInternalOnly } from './chip';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
import { MatChipGrid } from './chip-grid';
import { MatChipAvatar, MatChipRemove, MatChipTrailingIcon } from './chip-icons';
import { MatChipInput } from './chip-input';
import { MatChipListbox } from './chip-listbox';
import { MatChipRow } from './chip-row';
import { MatChipOption } from './chip-option';
import { MatChipSet } from './chip-set';
const CHIP_DECLARATIONS = [
    MatChip,
    MatChipAvatar,
    MatChipCssInternalOnly,
    MatChipGrid,
    MatChipInput,
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatChipRow,
    MatChipSet,
    MatChipTrailingIcon,
];
const ɵ0 = {
    separatorKeyCodes: [ENTER]
};
let MatChipsModule = /** @class */ (() => {
    let MatChipsModule = class MatChipsModule {
    };
    MatChipsModule = __decorate([
        NgModule({
            imports: [MatCommonModule, CommonModule, MatRippleModule],
            exports: [MatCommonModule, CHIP_DECLARATIONS],
            declarations: CHIP_DECLARATIONS,
            providers: [
                ErrorStateMatcher,
                {
                    provide: MAT_CHIPS_DEFAULT_OPTIONS,
                    useValue: ɵ0
                }
            ]
        })
    ], MatChipsModule);
    return MatChipsModule;
})();
export { MatChipsModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRixPQUFPLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBR3RDLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsT0FBTztJQUNQLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0lBQ2QsYUFBYTtJQUNiLGFBQWE7SUFDYixVQUFVO0lBQ1YsVUFBVTtJQUNWLG1CQUFtQjtDQUNwQixDQUFDO1dBVWM7SUFDUixpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNEO0FBSWpDO0lBQUEsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztLQUMxQixDQUFBO0lBRFksY0FBYztRQWQxQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztZQUN6RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUM7WUFDN0MsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCO2dCQUNqQjtvQkFDRSxPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxRQUFRLElBRW1CO2lCQUM1QjthQUNGO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0FDMUI7SUFBRCxxQkFBQztLQUFBO1NBRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VOVEVSfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RXJyb3JTdGF0ZU1hdGNoZXIsIE1hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0Q2hpcCwgTWF0Q2hpcENzc0ludGVybmFsT25seX0gZnJvbSAnLi9jaGlwJztcbmltcG9ydCB7TUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUywgTWF0Q2hpcHNEZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9jaGlwLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQge01hdENoaXBHcmlkfSBmcm9tICcuL2NoaXAtZ3JpZCc7XG5pbXBvcnQge01hdENoaXBBdmF0YXIsIE1hdENoaXBSZW1vdmUsIE1hdENoaXBUcmFpbGluZ0ljb259IGZyb20gJy4vY2hpcC1pY29ucyc7XG5pbXBvcnQge01hdENoaXBJbnB1dH0gZnJvbSAnLi9jaGlwLWlucHV0JztcbmltcG9ydCB7TWF0Q2hpcExpc3Rib3h9IGZyb20gJy4vY2hpcC1saXN0Ym94JztcbmltcG9ydCB7TWF0Q2hpcFJvd30gZnJvbSAnLi9jaGlwLXJvdyc7XG5pbXBvcnQge01hdENoaXBPcHRpb259IGZyb20gJy4vY2hpcC1vcHRpb24nO1xuaW1wb3J0IHtNYXRDaGlwU2V0fSBmcm9tICcuL2NoaXAtc2V0JztcblxuXG5jb25zdCBDSElQX0RFQ0xBUkFUSU9OUyA9IFtcbiAgTWF0Q2hpcCxcbiAgTWF0Q2hpcEF2YXRhcixcbiAgTWF0Q2hpcENzc0ludGVybmFsT25seSxcbiAgTWF0Q2hpcEdyaWQsXG4gIE1hdENoaXBJbnB1dCxcbiAgTWF0Q2hpcExpc3Rib3gsXG4gIE1hdENoaXBPcHRpb24sXG4gIE1hdENoaXBSZW1vdmUsXG4gIE1hdENoaXBSb3csXG4gIE1hdENoaXBTZXQsXG4gIE1hdENoaXBUcmFpbGluZ0ljb24sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENISVBfREVDTEFSQVRJT05TXSxcbiAgZGVjbGFyYXRpb25zOiBDSElQX0RFQ0xBUkFUSU9OUyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogTUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgIHNlcGFyYXRvcktleUNvZGVzOiBbRU5URVJdXG4gICAgICB9IGFzIE1hdENoaXBzRGVmYXVsdE9wdGlvbnNcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcHNNb2R1bGUge1xufVxuIl19