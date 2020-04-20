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
import { MatChip, MatChipCssInternalOnly } from './chip';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
import { MatChipGrid } from './chip-grid';
import { MatChipAvatar, MatChipRemove, MatChipTrailingIcon } from './chip-icons';
import { MatChipInput } from './chip-input';
import { MatChipListbox } from './chip-listbox';
import { MatChipRow } from './chip-row';
import { MatChipOption } from './chip-option';
import { MatChipSet } from './chip-set';
var CHIP_DECLARATIONS = [
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
var ɵ0 = {
    separatorKeyCodes: [ENTER]
};
var MatChipsModule = /** @class */ (function () {
    function MatChipsModule() {
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
    return MatChipsModule;
}());
export { MatChipsModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2hpcHMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNGLE9BQU8sRUFBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHdCQUF3QixDQUFDO0FBQ3pGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFHdEMsSUFBTSxpQkFBaUIsR0FBRztJQUN4QixPQUFPO0lBQ1AsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxhQUFhO0lBQ2IsYUFBYTtJQUNiLFVBQVU7SUFDVixVQUFVO0lBQ1YsbUJBQW1CO0NBQ3BCLENBQUM7U0FVYztJQUNSLGlCQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDO0NBQ0Q7QUFWakM7SUFBQTtJQWVBLENBQUM7O2dCQWZBLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDO29CQUM3QyxZQUFZLEVBQUUsaUJBQWlCO29CQUMvQixTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQjs0QkFDRSxPQUFPLEVBQUUseUJBQXlCOzRCQUNsQyxRQUFRLElBRW1CO3lCQUM1QjtxQkFDRjtpQkFDRjs7SUFFRCxxQkFBQztDQUFBLEFBZkQsSUFlQztTQURZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vycm9yU3RhdGVNYXRjaGVyLCBNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdENoaXAsIE1hdENoaXBDc3NJbnRlcm5hbE9ubHl9IGZyb20gJy4vY2hpcCc7XG5pbXBvcnQge01BVF9DSElQU19ERUZBVUxUX09QVElPTlMsIE1hdENoaXBzRGVmYXVsdE9wdGlvbnN9IGZyb20gJy4vY2hpcC1kZWZhdWx0LW9wdGlvbnMnO1xuaW1wb3J0IHtNYXRDaGlwR3JpZH0gZnJvbSAnLi9jaGlwLWdyaWQnO1xuaW1wb3J0IHtNYXRDaGlwQXZhdGFyLCBNYXRDaGlwUmVtb3ZlLCBNYXRDaGlwVHJhaWxpbmdJY29ufSBmcm9tICcuL2NoaXAtaWNvbnMnO1xuaW1wb3J0IHtNYXRDaGlwSW5wdXR9IGZyb20gJy4vY2hpcC1pbnB1dCc7XG5pbXBvcnQge01hdENoaXBMaXN0Ym94fSBmcm9tICcuL2NoaXAtbGlzdGJveCc7XG5pbXBvcnQge01hdENoaXBSb3d9IGZyb20gJy4vY2hpcC1yb3cnO1xuaW1wb3J0IHtNYXRDaGlwT3B0aW9ufSBmcm9tICcuL2NoaXAtb3B0aW9uJztcbmltcG9ydCB7TWF0Q2hpcFNldH0gZnJvbSAnLi9jaGlwLXNldCc7XG5cblxuY29uc3QgQ0hJUF9ERUNMQVJBVElPTlMgPSBbXG4gIE1hdENoaXAsXG4gIE1hdENoaXBBdmF0YXIsXG4gIE1hdENoaXBDc3NJbnRlcm5hbE9ubHksXG4gIE1hdENoaXBHcmlkLFxuICBNYXRDaGlwSW5wdXQsXG4gIE1hdENoaXBMaXN0Ym94LFxuICBNYXRDaGlwT3B0aW9uLFxuICBNYXRDaGlwUmVtb3ZlLFxuICBNYXRDaGlwUm93LFxuICBNYXRDaGlwU2V0LFxuICBNYXRDaGlwVHJhaWxpbmdJY29uLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDSElQX0RFQ0xBUkFUSU9OU10sXG4gIGRlY2xhcmF0aW9uczogQ0hJUF9ERUNMQVJBVElPTlMsXG4gIHByb3ZpZGVyczogW1xuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1BVF9DSElQU19ERUZBVUxUX09QVElPTlMsXG4gICAgICB1c2VWYWx1ZToge1xuICAgICAgICBzZXBhcmF0b3JLZXlDb2RlczogW0VOVEVSXVxuICAgICAgfSBhcyBNYXRDaGlwc0RlZmF1bHRPcHRpb25zXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBzTW9kdWxlIHtcbn1cbiJdfQ==