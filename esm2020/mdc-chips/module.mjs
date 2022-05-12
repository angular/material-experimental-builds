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
import { ErrorStateMatcher, MatCommonModule, MatRippleModule, } from '@angular/material-experimental/mdc-core';
import { MatChip } from './chip';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
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
MatChipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.0", ngImport: i0, type: MatChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatChipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-rc.0", ngImport: i0, type: MatChipsModule, declarations: [MatChipAction, MatChip,
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
MatChipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-rc.0", ngImport: i0, type: MatChipsModule, providers: [
        ErrorStateMatcher,
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER],
            },
        },
    ], imports: [MatCommonModule, CommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.0", ngImport: i0, type: MatChipsModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixlQUFlLEdBQ2hCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0sd0JBQXdCLENBQUM7QUFDekYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUU1QyxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE9BQU87SUFDUCxhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxZQUFZO0lBQ1osY0FBYztJQUNkLGFBQWE7SUFDYixhQUFhO0lBQ2IsVUFBVTtJQUNWLFVBQVU7SUFDVixtQkFBbUI7Q0FDcEIsQ0FBQztBQWdCRixNQUFNLE9BQU8sY0FBYzs7Z0hBQWQsY0FBYztpSEFBZCxjQUFjLGlCQVhWLGFBQWEsRUFoQjVCLE9BQU87UUFDUCxhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxZQUFZO1FBQ1osY0FBYztRQUNkLGFBQWE7UUFDYixhQUFhO1FBQ2IsVUFBVTtRQUNWLFVBQVU7UUFDVixtQkFBbUIsYUFJVCxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsYUFDOUMsZUFBZSxFQWZ6QixPQUFPO1FBQ1AsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsWUFBWTtRQUNaLGNBQWM7UUFDZCxhQUFhO1FBQ2IsYUFBYTtRQUNiLFVBQVU7UUFDVixVQUFVO1FBQ1YsbUJBQW1CO2lIQWlCUixjQUFjLGFBVmQ7UUFDVCxpQkFBaUI7UUFDakI7WUFDRSxPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLFFBQVEsRUFBRTtnQkFDUixpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQzthQUNEO1NBQzVCO0tBQ0YsWUFYUyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFDOUMsZUFBZTtnR0FZZCxjQUFjO2tCQWQxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUM7b0JBQzdDLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQztvQkFDaEQsU0FBUyxFQUFFO3dCQUNULGlCQUFpQjt3QkFDakI7NEJBQ0UsT0FBTyxFQUFFLHlCQUF5Qjs0QkFDbEMsUUFBUSxFQUFFO2dDQUNSLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDOzZCQUNEO3lCQUM1QjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VOVEVSfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEVycm9yU3RhdGVNYXRjaGVyLFxuICBNYXRDb21tb25Nb2R1bGUsXG4gIE1hdFJpcHBsZU1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0Q2hpcH0gZnJvbSAnLi9jaGlwJztcbmltcG9ydCB7TUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUywgTWF0Q2hpcHNEZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9jaGlwLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQge01hdENoaXBFZGl0SW5wdXR9IGZyb20gJy4vY2hpcC1lZGl0LWlucHV0JztcbmltcG9ydCB7TWF0Q2hpcEdyaWR9IGZyb20gJy4vY2hpcC1ncmlkJztcbmltcG9ydCB7TWF0Q2hpcEF2YXRhciwgTWF0Q2hpcFJlbW92ZSwgTWF0Q2hpcFRyYWlsaW5nSWNvbn0gZnJvbSAnLi9jaGlwLWljb25zJztcbmltcG9ydCB7TWF0Q2hpcElucHV0fSBmcm9tICcuL2NoaXAtaW5wdXQnO1xuaW1wb3J0IHtNYXRDaGlwTGlzdGJveH0gZnJvbSAnLi9jaGlwLWxpc3Rib3gnO1xuaW1wb3J0IHtNYXRDaGlwUm93fSBmcm9tICcuL2NoaXAtcm93JztcbmltcG9ydCB7TWF0Q2hpcE9wdGlvbn0gZnJvbSAnLi9jaGlwLW9wdGlvbic7XG5pbXBvcnQge01hdENoaXBTZXR9IGZyb20gJy4vY2hpcC1zZXQnO1xuaW1wb3J0IHtNYXRDaGlwQWN0aW9ufSBmcm9tICcuL2NoaXAtYWN0aW9uJztcblxuY29uc3QgQ0hJUF9ERUNMQVJBVElPTlMgPSBbXG4gIE1hdENoaXAsXG4gIE1hdENoaXBBdmF0YXIsXG4gIE1hdENoaXBFZGl0SW5wdXQsXG4gIE1hdENoaXBHcmlkLFxuICBNYXRDaGlwSW5wdXQsXG4gIE1hdENoaXBMaXN0Ym94LFxuICBNYXRDaGlwT3B0aW9uLFxuICBNYXRDaGlwUmVtb3ZlLFxuICBNYXRDaGlwUm93LFxuICBNYXRDaGlwU2V0LFxuICBNYXRDaGlwVHJhaWxpbmdJY29uLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDSElQX0RFQ0xBUkFUSU9OU10sXG4gIGRlY2xhcmF0aW9uczogW01hdENoaXBBY3Rpb24sIENISVBfREVDTEFSQVRJT05TXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogTUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgIHNlcGFyYXRvcktleUNvZGVzOiBbRU5URVJdLFxuICAgICAgfSBhcyBNYXRDaGlwc0RlZmF1bHRPcHRpb25zLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBzTW9kdWxlIHt9XG4iXX0=