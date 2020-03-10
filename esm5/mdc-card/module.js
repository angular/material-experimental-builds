/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage, } from './card';
var CARD_DIRECTIVES = [
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
var MatCardModule = /** @class */ (function () {
    function MatCardModule() {
    }
    MatCardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, CommonModule],
                    exports: [CARD_DIRECTIVES, MatCommonModule],
                    declarations: CARD_DIRECTIVES,
                },] }
    ];
    return MatCardModule;
}());
export { MatCardModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY2FyZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFDTCxPQUFPLEVBQ1AsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ1osY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsZUFBZSxFQUNmLFlBQVksRUFDWixpQkFBaUIsRUFDakIsY0FBYyxHQUNmLE1BQU0sUUFBUSxDQUFDO0FBR2hCLElBQU0sZUFBZSxHQUFHO0lBQ3RCLE9BQU87SUFDUCxjQUFjO0lBQ2QsYUFBYTtJQUNiLGNBQWM7SUFDZCxhQUFhO0lBQ2IsYUFBYTtJQUNiLFlBQVk7SUFDWixjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxlQUFlO0lBQ2YsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixjQUFjO0NBQ2YsQ0FBQztBQUVGO0lBQUE7SUFNQSxDQUFDOztnQkFOQSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztvQkFDeEMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDM0MsWUFBWSxFQUFFLGVBQWU7aUJBQzlCOztJQUVELG9CQUFDO0NBQUEsQUFORCxJQU1DO1NBRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0Q2FyZCxcbiAgTWF0Q2FyZEFjdGlvbnMsXG4gIE1hdENhcmRBdmF0YXIsXG4gIE1hdENhcmRDb250ZW50LFxuICBNYXRDYXJkRm9vdGVyLFxuICBNYXRDYXJkSGVhZGVyLFxuICBNYXRDYXJkSW1hZ2UsXG4gIE1hdENhcmRMZ0ltYWdlLFxuICBNYXRDYXJkTWRJbWFnZSxcbiAgTWF0Q2FyZFNtSW1hZ2UsXG4gIE1hdENhcmRTdWJ0aXRsZSxcbiAgTWF0Q2FyZFRpdGxlLFxuICBNYXRDYXJkVGl0bGVHcm91cCxcbiAgTWF0Q2FyZFhsSW1hZ2UsXG59IGZyb20gJy4vY2FyZCc7XG5cblxuY29uc3QgQ0FSRF9ESVJFQ1RJVkVTID0gW1xuICBNYXRDYXJkLFxuICBNYXRDYXJkQWN0aW9ucyxcbiAgTWF0Q2FyZEF2YXRhcixcbiAgTWF0Q2FyZENvbnRlbnQsXG4gIE1hdENhcmRGb290ZXIsXG4gIE1hdENhcmRIZWFkZXIsXG4gIE1hdENhcmRJbWFnZSxcbiAgTWF0Q2FyZExnSW1hZ2UsXG4gIE1hdENhcmRNZEltYWdlLFxuICBNYXRDYXJkU21JbWFnZSxcbiAgTWF0Q2FyZFN1YnRpdGxlLFxuICBNYXRDYXJkVGl0bGUsXG4gIE1hdENhcmRUaXRsZUdyb3VwLFxuICBNYXRDYXJkWGxJbWFnZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW0NBUkRfRElSRUNUSVZFUywgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDQVJEX0RJUkVDVElWRVMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENhcmRNb2R1bGUge1xufVxuIl19