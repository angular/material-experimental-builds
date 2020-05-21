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
import { MatCommonModule } from '@angular/material/core';
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage, } from './card';
const CARD_DIRECTIVES = [
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardImage,
    MatCardLgImage,
    MatCardMdImage,
    MatCardSmImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardXlImage
];
let MatCardModule = /** @class */ (() => {
    let MatCardModule = class MatCardModule {
    };
    MatCardModule = __decorate([
        NgModule({
            imports: [MatCommonModule, CommonModule],
            exports: [CARD_DIRECTIVES, MatCommonModule],
            declarations: CARD_DIRECTIVES,
        })
    ], MatCardModule);
    return MatCardModule;
})();
export { MatCardModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2FyZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsT0FBTyxFQUNQLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixhQUFhLEVBQ2IsWUFBWSxFQUNaLGNBQWMsRUFDZCxjQUFjLEVBQ2QsY0FBYyxFQUNkLGVBQWUsRUFDZixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGNBQWMsR0FDZixNQUFNLFFBQVEsQ0FBQztBQUdoQixNQUFNLGVBQWUsR0FBRztJQUN0QixPQUFPO0lBQ1AsY0FBYztJQUNkLGFBQWE7SUFDYixjQUFjO0lBQ2QsYUFBYTtJQUNiLGFBQWE7SUFDYixZQUFZO0lBQ1osY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsZUFBZTtJQUNmLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsY0FBYztDQUNmLENBQUM7QUFPRjtJQUFBLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7S0FDekIsQ0FBQTtJQURZLGFBQWE7UUFMekIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztZQUN4QyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO1lBQzNDLFlBQVksRUFBRSxlQUFlO1NBQzlCLENBQUM7T0FDVyxhQUFhLENBQ3pCO0lBQUQsb0JBQUM7S0FBQTtTQURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIE1hdENhcmQsXG4gIE1hdENhcmRBY3Rpb25zLFxuICBNYXRDYXJkQXZhdGFyLFxuICBNYXRDYXJkQ29udGVudCxcbiAgTWF0Q2FyZEZvb3RlcixcbiAgTWF0Q2FyZEhlYWRlcixcbiAgTWF0Q2FyZEltYWdlLFxuICBNYXRDYXJkTGdJbWFnZSxcbiAgTWF0Q2FyZE1kSW1hZ2UsXG4gIE1hdENhcmRTbUltYWdlLFxuICBNYXRDYXJkU3VidGl0bGUsXG4gIE1hdENhcmRUaXRsZSxcbiAgTWF0Q2FyZFRpdGxlR3JvdXAsXG4gIE1hdENhcmRYbEltYWdlLFxufSBmcm9tICcuL2NhcmQnO1xuXG5cbmNvbnN0IENBUkRfRElSRUNUSVZFUyA9IFtcbiAgTWF0Q2FyZCxcbiAgTWF0Q2FyZEFjdGlvbnMsXG4gIE1hdENhcmRBdmF0YXIsXG4gIE1hdENhcmRDb250ZW50LFxuICBNYXRDYXJkRm9vdGVyLFxuICBNYXRDYXJkSGVhZGVyLFxuICBNYXRDYXJkSW1hZ2UsXG4gIE1hdENhcmRMZ0ltYWdlLFxuICBNYXRDYXJkTWRJbWFnZSxcbiAgTWF0Q2FyZFNtSW1hZ2UsXG4gIE1hdENhcmRTdWJ0aXRsZSxcbiAgTWF0Q2FyZFRpdGxlLFxuICBNYXRDYXJkVGl0bGVHcm91cCxcbiAgTWF0Q2FyZFhsSW1hZ2Vcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtDQVJEX0RJUkVDVElWRVMsIE1hdENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogQ0FSRF9ESVJFQ1RJVkVTLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJkTW9kdWxlIHtcbn1cbiJdfQ==