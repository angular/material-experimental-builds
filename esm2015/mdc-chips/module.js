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
import { MatChip, MatChipCssInternalOnly } from './chip';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
import { MatChipEditInput } from './chip-edit-input';
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
const ɵ0 = {
    separatorKeyCodes: [ENTER]
};
export class MatChipsModule {
}
MatChipsModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixlQUFlLEdBQ2hCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUN2RCxPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0sd0JBQXdCLENBQUM7QUFDekYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUd0QyxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE9BQU87SUFDUCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxhQUFhO0lBQ2IsYUFBYTtJQUNiLFVBQVU7SUFDVixVQUFVO0lBQ1YsbUJBQW1CO0NBQ3BCLENBQUM7V0FVYztJQUNSLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDO0NBQ0Q7QUFJakMsTUFBTSxPQUFPLGNBQWM7OztZQWQxQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7Z0JBQ3pELE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQztnQkFDN0MsWUFBWSxFQUFFLGlCQUFpQjtnQkFDL0IsU0FBUyxFQUFFO29CQUNULGlCQUFpQjtvQkFDakI7d0JBQ0UsT0FBTyxFQUFFLHlCQUF5Qjt3QkFDbEMsUUFBUSxJQUVtQjtxQkFDNUI7aUJBQ0Y7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VOVEVSfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEVycm9yU3RhdGVNYXRjaGVyLFxuICBNYXRDb21tb25Nb2R1bGUsXG4gIE1hdFJpcHBsZU1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0Q2hpcCwgTWF0Q2hpcENzc0ludGVybmFsT25seX0gZnJvbSAnLi9jaGlwJztcbmltcG9ydCB7TUFUX0NISVBTX0RFRkFVTFRfT1BUSU9OUywgTWF0Q2hpcHNEZWZhdWx0T3B0aW9uc30gZnJvbSAnLi9jaGlwLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQge01hdENoaXBFZGl0SW5wdXR9IGZyb20gJy4vY2hpcC1lZGl0LWlucHV0JztcbmltcG9ydCB7TWF0Q2hpcEdyaWR9IGZyb20gJy4vY2hpcC1ncmlkJztcbmltcG9ydCB7TWF0Q2hpcEF2YXRhciwgTWF0Q2hpcFJlbW92ZSwgTWF0Q2hpcFRyYWlsaW5nSWNvbn0gZnJvbSAnLi9jaGlwLWljb25zJztcbmltcG9ydCB7TWF0Q2hpcElucHV0fSBmcm9tICcuL2NoaXAtaW5wdXQnO1xuaW1wb3J0IHtNYXRDaGlwTGlzdGJveH0gZnJvbSAnLi9jaGlwLWxpc3Rib3gnO1xuaW1wb3J0IHtNYXRDaGlwUm93fSBmcm9tICcuL2NoaXAtcm93JztcbmltcG9ydCB7TWF0Q2hpcE9wdGlvbn0gZnJvbSAnLi9jaGlwLW9wdGlvbic7XG5pbXBvcnQge01hdENoaXBTZXR9IGZyb20gJy4vY2hpcC1zZXQnO1xuXG5cbmNvbnN0IENISVBfREVDTEFSQVRJT05TID0gW1xuICBNYXRDaGlwLFxuICBNYXRDaGlwQXZhdGFyLFxuICBNYXRDaGlwQ3NzSW50ZXJuYWxPbmx5LFxuICBNYXRDaGlwRWRpdElucHV0LFxuICBNYXRDaGlwR3JpZCxcbiAgTWF0Q2hpcElucHV0LFxuICBNYXRDaGlwTGlzdGJveCxcbiAgTWF0Q2hpcE9wdGlvbixcbiAgTWF0Q2hpcFJlbW92ZSxcbiAgTWF0Q2hpcFJvdyxcbiAgTWF0Q2hpcFNldCxcbiAgTWF0Q2hpcFRyYWlsaW5nSWNvbixcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ0hJUF9ERUNMQVJBVElPTlNdLFxuICBkZWNsYXJhdGlvbnM6IENISVBfREVDTEFSQVRJT05TLFxuICBwcm92aWRlcnM6IFtcbiAgICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgICB7XG4gICAgICBwcm92aWRlOiBNQVRfQ0hJUFNfREVGQVVMVF9PUFRJT05TLFxuICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgc2VwYXJhdG9yS2V5Q29kZXM6IFtFTlRFUl1cbiAgICAgIH0gYXMgTWF0Q2hpcHNEZWZhdWx0T3B0aW9uc1xuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwc01vZHVsZSB7XG59XG4iXX0=