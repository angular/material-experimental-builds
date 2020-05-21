/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, ContentChild, } from '@angular/core';
import { MatTab as BaseMatTab } from '@angular/material/tabs';
import { MatTabContent } from './tab-content';
import { MatTabLabel } from './tab-label';
let MatTab = /** @class */ (() => {
    let MatTab = class MatTab extends BaseMatTab {
    };
    __decorate([
        ContentChild(MatTabContent, { read: TemplateRef, static: true }),
        __metadata("design:type", TemplateRef)
    ], MatTab.prototype, "_explicitContent", void 0);
    __decorate([
        ContentChild(MatTabLabel),
        __metadata("design:type", MatTabLabel)
    ], MatTab.prototype, "templateLabel", void 0);
    MatTab = __decorate([
        Component({
            selector: 'mat-tab',
            // Note that usually we'd go through a bit more trouble and set up another class so that
            // the inlined template of `MatTab` isn't duplicated, however the template is small enough
            // that creating the extra class will generate more code than just duplicating the template.
            template: "<!-- Create a template for the content of the <mat-tab> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the tab content in the appropriate place in the\n    tab-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n",
            inputs: ['disabled'],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            exportAs: 'matTab'
        })
    ], MatTab);
    return MatTab;
})();
export { MatTab };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdGFicy90YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxNQUFNLElBQUksVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBY3hDO0lBQUEsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTyxTQUFRLFVBQVU7S0FTckMsQ0FBQTtJQUpDO1FBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO2tDQUM3QyxXQUFXO29EQUFNO0lBR1I7UUFBMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQztrQ0FBZ0IsV0FBVztpREFBQztJQVIzQyxNQUFNO1FBWmxCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBRW5CLHdGQUF3RjtZQUN4RiwwRkFBMEY7WUFDMUYsNEZBQTRGO1lBQzVGLHlSQUF1QjtZQUN2QixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDcEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQztPQUNXLE1BQU0sQ0FTbEI7SUFBRCxhQUFDO0tBQUE7U0FUWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBUZW1wbGF0ZVJlZixcbiAgQ29udGVudENoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0VGFiIGFzIEJhc2VNYXRUYWJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtNYXRUYWJDb250ZW50fSBmcm9tICcuL3RhYi1jb250ZW50JztcbmltcG9ydCB7TWF0VGFiTGFiZWx9IGZyb20gJy4vdGFiLWxhYmVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXRhYicsXG5cbiAgLy8gTm90ZSB0aGF0IHVzdWFsbHkgd2UnZCBnbyB0aHJvdWdoIGEgYml0IG1vcmUgdHJvdWJsZSBhbmQgc2V0IHVwIGFub3RoZXIgY2xhc3Mgc28gdGhhdFxuICAvLyB0aGUgaW5saW5lZCB0ZW1wbGF0ZSBvZiBgTWF0VGFiYCBpc24ndCBkdXBsaWNhdGVkLCBob3dldmVyIHRoZSB0ZW1wbGF0ZSBpcyBzbWFsbCBlbm91Z2hcbiAgLy8gdGhhdCBjcmVhdGluZyB0aGUgZXh0cmEgY2xhc3Mgd2lsbCBnZW5lcmF0ZSBtb3JlIGNvZGUgdGhhbiBqdXN0IGR1cGxpY2F0aW5nIHRoZSB0ZW1wbGF0ZS5cbiAgdGVtcGxhdGVVcmw6ICd0YWIuaHRtbCcsXG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtYXRUYWInLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUYWIgZXh0ZW5kcyBCYXNlTWF0VGFiIHtcbiAgLyoqXG4gICAqIFRlbXBsYXRlIHByb3ZpZGVkIGluIHRoZSB0YWIgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoTWF0VGFiQ29udGVudCwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KVxuICBfZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBDb250ZW50IGZvciB0aGUgdGFiIGxhYmVsIGdpdmVuIGJ5IGA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5gLiAqL1xuICBAQ29udGVudENoaWxkKE1hdFRhYkxhYmVsKSB0ZW1wbGF0ZUxhYmVsOiBNYXRUYWJMYWJlbDtcbn1cbiJdfQ==