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
MatChipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatChipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: MatChipsModule, declarations: [MatChipAction, MatChip,
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
MatChipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatChipsModule, providers: [
        ErrorStateMatcher,
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER],
            },
        },
    ], imports: [MatCommonModule, CommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatChipsModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixlQUFlLEdBQ2hCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0sVUFBVSxDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFNUMsTUFBTSxpQkFBaUIsR0FBRztJQUN4QixPQUFPO0lBQ1AsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxhQUFhO0lBQ2IsYUFBYTtJQUNiLFVBQVU7SUFDVixVQUFVO0lBQ1YsbUJBQW1CO0NBQ3BCLENBQUM7QUFnQkYsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkFYVixhQUFhLEVBaEI1QixPQUFPO1FBQ1AsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsWUFBWTtRQUNaLGNBQWM7UUFDZCxhQUFhO1FBQ2IsYUFBYTtRQUNiLFVBQVU7UUFDVixVQUFVO1FBQ1YsbUJBQW1CLGFBSVQsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLGFBQzlDLGVBQWUsRUFmekIsT0FBTztRQUNQLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLFlBQVk7UUFDWixjQUFjO1FBQ2QsYUFBYTtRQUNiLGFBQWE7UUFDYixVQUFVO1FBQ1YsVUFBVTtRQUNWLG1CQUFtQjs0R0FpQlIsY0FBYyxhQVZkO1FBQ1QsaUJBQWlCO1FBQ2pCO1lBQ0UsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxRQUFRLEVBQUU7Z0JBQ1IsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7YUFDRDtTQUM1QjtLQUNGLFlBWFMsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQzlDLGVBQWU7MkZBWWQsY0FBYztrQkFkMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDO29CQUM3QyxZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUM7b0JBQ2hELFNBQVMsRUFBRTt3QkFDVCxpQkFBaUI7d0JBQ2pCOzRCQUNFLE9BQU8sRUFBRSx5QkFBeUI7NEJBQ2xDLFFBQVEsRUFBRTtnQ0FDUixpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQzs2QkFDRDt5QkFDNUI7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgTWF0Q29tbW9uTW9kdWxlLFxuICBNYXRSaXBwbGVNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01hdENoaXB9IGZyb20gJy4vY2hpcCc7XG5pbXBvcnQge01BVF9DSElQU19ERUZBVUxUX09QVElPTlMsIE1hdENoaXBzRGVmYXVsdE9wdGlvbnN9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7TWF0Q2hpcEVkaXRJbnB1dH0gZnJvbSAnLi9jaGlwLWVkaXQtaW5wdXQnO1xuaW1wb3J0IHtNYXRDaGlwR3JpZH0gZnJvbSAnLi9jaGlwLWdyaWQnO1xuaW1wb3J0IHtNYXRDaGlwQXZhdGFyLCBNYXRDaGlwUmVtb3ZlLCBNYXRDaGlwVHJhaWxpbmdJY29ufSBmcm9tICcuL2NoaXAtaWNvbnMnO1xuaW1wb3J0IHtNYXRDaGlwSW5wdXR9IGZyb20gJy4vY2hpcC1pbnB1dCc7XG5pbXBvcnQge01hdENoaXBMaXN0Ym94fSBmcm9tICcuL2NoaXAtbGlzdGJveCc7XG5pbXBvcnQge01hdENoaXBSb3d9IGZyb20gJy4vY2hpcC1yb3cnO1xuaW1wb3J0IHtNYXRDaGlwT3B0aW9ufSBmcm9tICcuL2NoaXAtb3B0aW9uJztcbmltcG9ydCB7TWF0Q2hpcFNldH0gZnJvbSAnLi9jaGlwLXNldCc7XG5pbXBvcnQge01hdENoaXBBY3Rpb259IGZyb20gJy4vY2hpcC1hY3Rpb24nO1xuXG5jb25zdCBDSElQX0RFQ0xBUkFUSU9OUyA9IFtcbiAgTWF0Q2hpcCxcbiAgTWF0Q2hpcEF2YXRhcixcbiAgTWF0Q2hpcEVkaXRJbnB1dCxcbiAgTWF0Q2hpcEdyaWQsXG4gIE1hdENoaXBJbnB1dCxcbiAgTWF0Q2hpcExpc3Rib3gsXG4gIE1hdENoaXBPcHRpb24sXG4gIE1hdENoaXBSZW1vdmUsXG4gIE1hdENoaXBSb3csXG4gIE1hdENoaXBTZXQsXG4gIE1hdENoaXBUcmFpbGluZ0ljb24sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENISVBfREVDTEFSQVRJT05TXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2hpcEFjdGlvbiwgQ0hJUF9ERUNMQVJBVElPTlNdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICB7XG4gICAgICBwcm92aWRlOiBNQVRfQ0hJUFNfREVGQVVMVF9PUFRJT05TLFxuICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgc2VwYXJhdG9yS2V5Q29kZXM6IFtFTlRFUl0sXG4gICAgICB9IGFzIE1hdENoaXBzRGVmYXVsdE9wdGlvbnMsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcHNNb2R1bGUge31cbiJdfQ==