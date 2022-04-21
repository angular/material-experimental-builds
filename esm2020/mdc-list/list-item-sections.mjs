/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject, Optional } from '@angular/core';
import { LIST_OPTION } from './list-option-types';
import * as i0 from "@angular/core";
/**
 * Directive capturing the title of a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content for the title never wraps. There can only be a single title per list item.
 */
export class MatListItemTitle {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
MatListItemTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemTitle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.14", type: MatListItemTitle, selector: "[matListItemTitle]", host: { classAttribute: "mat-mdc-list-item-title mdc-list-item__primary-text" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemTitle]',
                    host: { 'class': 'mat-mdc-list-item-title mdc-list-item__primary-text' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
/**
 * Directive capturing a line in a list item. A list item usually consists of a
 * title and optional secondary or tertiary lines.
 *
 * Text content inside a line never wraps. There can be at maximum two lines per list item.
 */
export class MatListItemLine {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
MatListItemLine.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemLine, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemLine.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.14", type: MatListItemLine, selector: "[matListItemLine]", host: { classAttribute: "mat-mdc-list-item-line mdc-list-item__secondary-text" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemLine, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemLine]',
                    host: { 'class': 'mat-mdc-list-item-line mdc-list-item__secondary-text' },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
/**
 * Directive matching an optional meta section for list items.
 *
 * List items can reserve space at the end of an item to display a control,
 * button or additional text content.
 */
export class MatListItemMeta {
}
MatListItemMeta.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemMeta, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListItemMeta.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.14", type: MatListItemMeta, selector: "[matListItemMeta]", host: { classAttribute: "mat-mdc-list-item-meta mdc-list-item__end" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemMeta, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemMeta]',
                    host: { 'class': 'mat-mdc-list-item-meta mdc-list-item__end' },
                }]
        }] });
/**
 * @docs-private
 *
 * MDC uses the very intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
 * to position content such as icons or checkboxes that comes either before or after the text
 * content respectively. This directive detects the placement of the checkbox and applies the
 * correct MDC class to position the icon/avatar on the opposite side.
 */
export class _MatListItemGraphicBase {
    constructor(_listOption) {
        this._listOption = _listOption;
    }
    _isAlignedAtStart() {
        // By default, in all list items the graphic is aligned at start. In list options,
        // the graphic is only aligned at start if the checkbox is at the end.
        return !this._listOption || this._listOption?._getCheckboxPosition() === 'after';
    }
}
_MatListItemGraphicBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: _MatListItemGraphicBase, deps: [{ token: LIST_OPTION, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
_MatListItemGraphicBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.14", type: _MatListItemGraphicBase, host: { properties: { "class.mdc-list-item__start": "_isAlignedAtStart()", "class.mdc-list-item__end": "!_isAlignedAtStart()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: _MatListItemGraphicBase, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        // MDC uses intuitively named classes `.mdc-list-item__start` and `.mat-list-item__end`
                        // to position content such as icons or checkboxes that comes either before or after the text
                        // content respectively. This directive detects the placement of the checkbox and applies the
                        // correct MDC class to position the icon/avatar on the opposite side.
                        '[class.mdc-list-item__start]': '_isAlignedAtStart()',
                        '[class.mdc-list-item__end]': '!_isAlignedAtStart()',
                    },
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LIST_OPTION]
                }] }]; } });
/**
 * Directive matching an optional avatar within a list item.
 *
 * List items can reserve space at the beginning of an item to display an avatar.
 */
export class MatListItemAvatar extends _MatListItemGraphicBase {
}
MatListItemAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemAvatar, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatListItemAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.14", type: MatListItemAvatar, selector: "[matListItemAvatar]", host: { classAttribute: "mat-mdc-list-item-avatar" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemAvatar]',
                    host: { 'class': 'mat-mdc-list-item-avatar' },
                }]
        }] });
/**
 * Directive matching an optional icon within a list item.
 *
 * List items can reserve space at the beginning of an item to display an icon.
 */
export class MatListItemIcon extends _MatListItemGraphicBase {
}
MatListItemIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemIcon, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatListItemIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.14", type: MatListItemIcon, selector: "[matListItemIcon]", host: { classAttribute: "mat-mdc-list-item-icon" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.14", ngImport: i0, type: MatListItemIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matListItemIcon]',
                    host: { 'class': 'mat-mdc-list-item-icon' },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLXNlY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWl0ZW0tc2VjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsV0FBVyxFQUFhLE1BQU0scUJBQXFCLENBQUM7O0FBRTVEOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFtQixXQUFvQztRQUFwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7SUFBRyxDQUFDOztxSEFEaEQsZ0JBQWdCO3lHQUFoQixnQkFBZ0I7bUdBQWhCLGdCQUFnQjtrQkFKNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUscURBQXFELEVBQUM7aUJBQ3ZFOztBQUtEOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBbUIsV0FBb0M7UUFBcEMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO0lBQUcsQ0FBQzs7b0hBRGhELGVBQWU7d0dBQWYsZUFBZTttR0FBZixlQUFlO2tCQUozQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxzREFBc0QsRUFBQztpQkFDeEU7O0FBS0Q7Ozs7O0dBS0c7QUFLSCxNQUFNLE9BQU8sZUFBZTs7b0hBQWYsZUFBZTt3R0FBZixlQUFlO21HQUFmLGVBQWU7a0JBSjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLDJDQUEyQyxFQUFDO2lCQUM3RDs7QUFHRDs7Ozs7OztHQU9HO0FBV0gsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUFvRCxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFFL0UsaUJBQWlCO1FBQ2Ysa0ZBQWtGO1FBQ2xGLHNFQUFzRTtRQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLEtBQUssT0FBTyxDQUFDO0lBQ25GLENBQUM7OzRIQVBVLHVCQUF1QixrQkFDRixXQUFXO2dIQURoQyx1QkFBdUI7bUdBQXZCLHVCQUF1QjtrQkFWbkMsU0FBUzttQkFBQztvQkFDVCxJQUFJLEVBQUU7d0JBQ0osdUZBQXVGO3dCQUN2Riw2RkFBNkY7d0JBQzdGLDZGQUE2Rjt3QkFDN0Ysc0VBQXNFO3dCQUN0RSw4QkFBOEIsRUFBRSxxQkFBcUI7d0JBQ3JELDRCQUE0QixFQUFFLHNCQUFzQjtxQkFDckQ7aUJBQ0Y7OzBCQUVjLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsV0FBVzs7QUFTN0M7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxpQkFBa0IsU0FBUSx1QkFBdUI7O3NIQUFqRCxpQkFBaUI7MEdBQWpCLGlCQUFpQjttR0FBakIsaUJBQWlCO2tCQUo3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBQztpQkFDNUM7O0FBR0Q7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxlQUFnQixTQUFRLHVCQUF1Qjs7b0hBQS9DLGVBQWU7d0dBQWYsZUFBZTttR0FBZixlQUFlO2tCQUozQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMSVNUX09QVElPTiwgTGlzdE9wdGlvbn0gZnJvbSAnLi9saXN0LW9wdGlvbi10eXBlcyc7XG5cbi8qKlxuICogRGlyZWN0aXZlIGNhcHR1cmluZyB0aGUgdGl0bGUgb2YgYSBsaXN0IGl0ZW0uIEEgbGlzdCBpdGVtIHVzdWFsbHkgY29uc2lzdHMgb2YgYVxuICogdGl0bGUgYW5kIG9wdGlvbmFsIHNlY29uZGFyeSBvciB0ZXJ0aWFyeSBsaW5lcy5cbiAqXG4gKiBUZXh0IGNvbnRlbnQgZm9yIHRoZSB0aXRsZSBuZXZlciB3cmFwcy4gVGhlcmUgY2FuIG9ubHkgYmUgYSBzaW5nbGUgdGl0bGUgcGVyIGxpc3QgaXRlbS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdExpc3RJdGVtVGl0bGVdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWxpc3QtaXRlbS10aXRsZSBtZGMtbGlzdC1pdGVtX19wcmltYXJ5LXRleHQnfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGlzdEl0ZW1UaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIGNhcHR1cmluZyBhIGxpbmUgaW4gYSBsaXN0IGl0ZW0uIEEgbGlzdCBpdGVtIHVzdWFsbHkgY29uc2lzdHMgb2YgYVxuICogdGl0bGUgYW5kIG9wdGlvbmFsIHNlY29uZGFyeSBvciB0ZXJ0aWFyeSBsaW5lcy5cbiAqXG4gKiBUZXh0IGNvbnRlbnQgaW5zaWRlIGEgbGluZSBuZXZlciB3cmFwcy4gVGhlcmUgY2FuIGJlIGF0IG1heGltdW0gdHdvIGxpbmVzIHBlciBsaXN0IGl0ZW0uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRMaXN0SXRlbUxpbmVdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdtYXQtbWRjLWxpc3QtaXRlbS1saW5lIG1kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0J30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJdGVtTGluZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIG1hdGNoaW5nIGFuIG9wdGlvbmFsIG1ldGEgc2VjdGlvbiBmb3IgbGlzdCBpdGVtcy5cbiAqXG4gKiBMaXN0IGl0ZW1zIGNhbiByZXNlcnZlIHNwYWNlIGF0IHRoZSBlbmQgb2YgYW4gaXRlbSB0byBkaXNwbGF5IGEgY29udHJvbCxcbiAqIGJ1dHRvbiBvciBhZGRpdGlvbmFsIHRleHQgY29udGVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdExpc3RJdGVtTWV0YV0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pdGVtLW1ldGEgbWRjLWxpc3QtaXRlbV9fZW5kJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJdGVtTWV0YSB7fVxuXG4vKipcbiAqIEBkb2NzLXByaXZhdGVcbiAqXG4gKiBNREMgdXNlcyB0aGUgdmVyeSBpbnR1aXRpdmVseSBuYW1lZCBjbGFzc2VzIGAubWRjLWxpc3QtaXRlbV9fc3RhcnRgIGFuZCBgLm1hdC1saXN0LWl0ZW1fX2VuZGBcbiAqIHRvIHBvc2l0aW9uIGNvbnRlbnQgc3VjaCBhcyBpY29ucyBvciBjaGVja2JveGVzIHRoYXQgY29tZXMgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgdGV4dFxuICogY29udGVudCByZXNwZWN0aXZlbHkuIFRoaXMgZGlyZWN0aXZlIGRldGVjdHMgdGhlIHBsYWNlbWVudCBvZiB0aGUgY2hlY2tib3ggYW5kIGFwcGxpZXMgdGhlXG4gKiBjb3JyZWN0IE1EQyBjbGFzcyB0byBwb3NpdGlvbiB0aGUgaWNvbi9hdmF0YXIgb24gdGhlIG9wcG9zaXRlIHNpZGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBob3N0OiB7XG4gICAgLy8gTURDIHVzZXMgaW50dWl0aXZlbHkgbmFtZWQgY2xhc3NlcyBgLm1kYy1saXN0LWl0ZW1fX3N0YXJ0YCBhbmQgYC5tYXQtbGlzdC1pdGVtX19lbmRgXG4gICAgLy8gdG8gcG9zaXRpb24gY29udGVudCBzdWNoIGFzIGljb25zIG9yIGNoZWNrYm94ZXMgdGhhdCBjb21lcyBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSB0ZXh0XG4gICAgLy8gY29udGVudCByZXNwZWN0aXZlbHkuIFRoaXMgZGlyZWN0aXZlIGRldGVjdHMgdGhlIHBsYWNlbWVudCBvZiB0aGUgY2hlY2tib3ggYW5kIGFwcGxpZXMgdGhlXG4gICAgLy8gY29ycmVjdCBNREMgY2xhc3MgdG8gcG9zaXRpb24gdGhlIGljb24vYXZhdGFyIG9uIHRoZSBvcHBvc2l0ZSBzaWRlLlxuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbV9fc3RhcnRdJzogJ19pc0FsaWduZWRBdFN0YXJ0KCknLFxuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbV9fZW5kXSc6ICchX2lzQWxpZ25lZEF0U3RhcnQoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIF9NYXRMaXN0SXRlbUdyYXBoaWNCYXNlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChMSVNUX09QVElPTikgcHVibGljIF9saXN0T3B0aW9uOiBMaXN0T3B0aW9uKSB7fVxuXG4gIF9pc0FsaWduZWRBdFN0YXJ0KCkge1xuICAgIC8vIEJ5IGRlZmF1bHQsIGluIGFsbCBsaXN0IGl0ZW1zIHRoZSBncmFwaGljIGlzIGFsaWduZWQgYXQgc3RhcnQuIEluIGxpc3Qgb3B0aW9ucyxcbiAgICAvLyB0aGUgZ3JhcGhpYyBpcyBvbmx5IGFsaWduZWQgYXQgc3RhcnQgaWYgdGhlIGNoZWNrYm94IGlzIGF0IHRoZSBlbmQuXG4gICAgcmV0dXJuICF0aGlzLl9saXN0T3B0aW9uIHx8IHRoaXMuX2xpc3RPcHRpb24/Ll9nZXRDaGVja2JveFBvc2l0aW9uKCkgPT09ICdhZnRlcic7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgbWF0Y2hpbmcgYW4gb3B0aW9uYWwgYXZhdGFyIHdpdGhpbiBhIGxpc3QgaXRlbS5cbiAqXG4gKiBMaXN0IGl0ZW1zIGNhbiByZXNlcnZlIHNwYWNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW4gaXRlbSB0byBkaXNwbGF5IGFuIGF2YXRhci5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdExpc3RJdGVtQXZhdGFyXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWl0ZW0tYXZhdGFyJ30sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RJdGVtQXZhdGFyIGV4dGVuZHMgX01hdExpc3RJdGVtR3JhcGhpY0Jhc2Uge31cblxuLyoqXG4gKiBEaXJlY3RpdmUgbWF0Y2hpbmcgYW4gb3B0aW9uYWwgaWNvbiB3aXRoaW4gYSBsaXN0IGl0ZW0uXG4gKlxuICogTGlzdCBpdGVtcyBjYW4gcmVzZXJ2ZSBzcGFjZSBhdCB0aGUgYmVnaW5uaW5nIG9mIGFuIGl0ZW0gdG8gZGlzcGxheSBhbiBpY29uLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0TGlzdEl0ZW1JY29uXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWl0ZW0taWNvbid9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0SXRlbUljb24gZXh0ZW5kcyBfTWF0TGlzdEl0ZW1HcmFwaGljQmFzZSB7fVxuIl19