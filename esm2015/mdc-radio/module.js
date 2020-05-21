/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup } from './radio';
let MatRadioModule = /** @class */ (() => {
    let MatRadioModule = class MatRadioModule {
    };
    MatRadioModule = __decorate([
        NgModule({
            imports: [MatCommonModule, CommonModule, MatRippleModule],
            exports: [MatCommonModule, MatRadioGroup, MatRadioButton],
            declarations: [MatRadioGroup, MatRadioButton],
        })
    ], MatRadioModule);
    return MatRadioModule;
})();
export { MatRadioModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtcmFkaW8vbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxjQUFjLEVBQUUsYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBT3REO0lBQUEsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztLQUMxQixDQUFBO0lBRFksY0FBYztRQUwxQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztZQUN6RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQztZQUN6RCxZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDO1NBQzlDLENBQUM7T0FDVyxjQUFjLENBQzFCO0lBQUQscUJBQUM7S0FBQTtTQURZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRSYWRpb0J1dHRvbiwgTWF0UmFkaW9Hcm91cH0gZnJvbSAnLi9yYWRpbyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENvbW1vbk1vZHVsZSwgTWF0UmFkaW9Hcm91cCwgTWF0UmFkaW9CdXR0b25dLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRSYWRpb0dyb3VwLCBNYXRSYWRpb0J1dHRvbl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvTW9kdWxlIHtcbn1cbiJdfQ==