/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Directive } from '@angular/core';
import { MatChipAction } from './chip-action';
import { MAT_CHIP_AVATAR, MAT_CHIP_REMOVE, MAT_CHIP_TRAILING_ICON } from './tokens';
import * as i0 from "@angular/core";
/**
 * Directive to add CSS classes to chip leading icon.
 * @docs-private
 */
export class MatChipAvatar {
}
MatChipAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatChipAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatChipAvatar, selector: "mat-chip-avatar, [matChipAvatar]", host: { attributes: { "role": "img" }, classAttribute: "mat-mdc-chip-avatar mdc-evolution-chip__icon mdc-evolution-chip__icon--primary" }, providers: [{ provide: MAT_CHIP_AVATAR, useExisting: MatChipAvatar }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: {
                        'class': 'mat-mdc-chip-avatar mdc-evolution-chip__icon mdc-evolution-chip__icon--primary',
                        'role': 'img',
                    },
                    providers: [{ provide: MAT_CHIP_AVATAR, useExisting: MatChipAvatar }],
                }]
        }] });
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * @docs-private
 */
export class MatChipTrailingIcon extends MatChipAction {
    constructor() {
        super(...arguments);
        /**
         * MDC considers all trailing actions as a remove icon,
         * but we support non-interactive trailing icons.
         */
        this.isInteractive = false;
        this._isPrimary = false;
    }
}
MatChipTrailingIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipTrailingIcon, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatChipTrailingIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatChipTrailingIcon, selector: "mat-chip-trailing-icon, [matChipTrailingIcon]", host: { attributes: { "aria-hidden": "true" }, classAttribute: "mat-mdc-chip-trailing-icon mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing" }, providers: [{ provide: MAT_CHIP_TRAILING_ICON, useExisting: MatChipTrailingIcon }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipTrailingIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: {
                        'class': 'mat-mdc-chip-trailing-icon mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing',
                        'aria-hidden': 'true',
                    },
                    providers: [{ provide: MAT_CHIP_TRAILING_ICON, useExisting: MatChipTrailingIcon }],
                }]
        }] });
/**
 * Directive to remove the parent chip when the trailing icon is clicked or
 * when the ENTER key is pressed on it.
 *
 * Recommended for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 * ```
 * <mat-chip>
 *   <mat-icon matChipRemove>cancel</mat-icon>
 * </mat-chip>
 * ```
 */
export class MatChipRemove extends MatChipAction {
    constructor() {
        super(...arguments);
        this._isPrimary = false;
    }
    _handleClick(event) {
        if (!this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            this._parentChip.remove();
        }
    }
    _handleKeydown(event) {
        if ((event.keyCode === ENTER || event.keyCode === SPACE) && !this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            this._parentChip.remove();
        }
    }
}
MatChipRemove.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipRemove, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatChipRemove.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatChipRemove, selector: "[matChipRemove]", host: { attributes: { "role": "button" }, properties: { "attr.aria-hidden": "null" }, classAttribute: "mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing" }, providers: [{ provide: MAT_CHIP_REMOVE, useExisting: MatChipRemove }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatChipRemove, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matChipRemove]',
                    host: {
                        'class': 'mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator ' +
                            'mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing',
                        'role': 'button',
                        '[attr.aria-hidden]': 'null',
                    },
                    providers: [{ provide: MAT_CHIP_REMOVE, useExisting: MatChipRemove }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBRWxGOzs7R0FHRztBQVNILE1BQU0sT0FBTyxhQUFhOzsrR0FBYixhQUFhO21HQUFiLGFBQWEsc01BRmIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBQyxDQUFDO2dHQUV4RCxhQUFhO2tCQVJ6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsZ0ZBQWdGO3dCQUN6RixNQUFNLEVBQUUsS0FBSztxQkFDZDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxlQUFlLEVBQUMsQ0FBQztpQkFDcEU7O0FBR0Q7OztHQUdHO0FBVUgsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFUdEQ7O1FBVUU7OztXQUdHO1FBQ00sa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEIsZUFBVSxHQUFHLEtBQUssQ0FBQztLQUM3Qjs7cUhBUlksbUJBQW1CO3lHQUFuQixtQkFBbUIsbU9BRm5CLENBQUMsRUFBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFDLENBQUM7Z0dBRXJFLG1CQUFtQjtrQkFUL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUNMLHdGQUF3Rjt3QkFDMUYsYUFBYSxFQUFFLE1BQU07cUJBQ3RCO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFdBQVcscUJBQXFCLEVBQUMsQ0FBQztpQkFDakY7O0FBV0Q7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFhSCxNQUFNLE9BQU8sYUFBYyxTQUFRLGFBQWE7SUFYaEQ7O1FBWVcsZUFBVSxHQUFHLEtBQUssQ0FBQztLQWlCN0I7SUFmVSxZQUFZLENBQUMsS0FBaUI7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVRLGNBQWMsQ0FBQyxLQUFvQjtRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDMUUsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7K0dBakJVLGFBQWE7bUdBQWIsYUFBYSx3UkFGYixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDLENBQUM7Z0dBRXhELGFBQWE7a0JBWHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFDTCx5RUFBeUU7NEJBQ3pFLDZEQUE2RDt3QkFDL0QsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLG9CQUFvQixFQUFFLE1BQU07cUJBQzdCO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLGVBQWUsRUFBQyxDQUFDO2lCQUNwRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VOVEVSLCBTUEFDRX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q2hpcEFjdGlvbn0gZnJvbSAnLi9jaGlwLWFjdGlvbic7XG5pbXBvcnQge01BVF9DSElQX0FWQVRBUiwgTUFUX0NISVBfUkVNT1ZFLCBNQVRfQ0hJUF9UUkFJTElOR19JQ09OfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBjaGlwIGxlYWRpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtYXZhdGFyLCBbbWF0Q2hpcEF2YXRhcl0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hpcC1hdmF0YXIgbWRjLWV2b2x1dGlvbi1jaGlwX19pY29uIG1kYy1ldm9sdXRpb24tY2hpcF9faWNvbi0tcHJpbWFyeScsXG4gICAgJ3JvbGUnOiAnaW1nJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9DSElQX0FWQVRBUiwgdXNlRXhpc3Rpbmc6IE1hdENoaXBBdmF0YXJ9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEF2YXRhciB7fVxuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gYW5kIGNvbmZpZ3VyZSBhdHRyaWJ1dGVzIGZvciBjaGlwIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXRyYWlsaW5nLWljb24sIFttYXRDaGlwVHJhaWxpbmdJY29uXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOlxuICAgICAgJ21hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uIG1kYy1ldm9sdXRpb24tY2hpcF9faWNvbiBtZGMtZXZvbHV0aW9uLWNoaXBfX2ljb24tLXRyYWlsaW5nJyxcbiAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfQ0hJUF9UUkFJTElOR19JQ09OLCB1c2VFeGlzdGluZzogTWF0Q2hpcFRyYWlsaW5nSWNvbn1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwVHJhaWxpbmdJY29uIGV4dGVuZHMgTWF0Q2hpcEFjdGlvbiB7XG4gIC8qKlxuICAgKiBNREMgY29uc2lkZXJzIGFsbCB0cmFpbGluZyBhY3Rpb25zIGFzIGEgcmVtb3ZlIGljb24sXG4gICAqIGJ1dCB3ZSBzdXBwb3J0IG5vbi1pbnRlcmFjdGl2ZSB0cmFpbGluZyBpY29ucy5cbiAgICovXG4gIG92ZXJyaWRlIGlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcblxuICBvdmVycmlkZSBfaXNQcmltYXJ5ID0gZmFsc2U7XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIHJlbW92ZSB0aGUgcGFyZW50IGNoaXAgd2hlbiB0aGUgdHJhaWxpbmcgaWNvbiBpcyBjbGlja2VkIG9yXG4gKiB3aGVuIHRoZSBFTlRFUiBrZXkgaXMgcHJlc3NlZCBvbiBpdC5cbiAqXG4gKiBSZWNvbW1lbmRlZCBmb3IgdXNlIHdpdGggdGhlIE1hdGVyaWFsIERlc2lnbiBcImNhbmNlbFwiIGljb25cbiAqIGF2YWlsYWJsZSBhdCBodHRwczovL21hdGVyaWFsLmlvL2ljb25zLyNpY19jYW5jZWwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIDxtYXQtY2hpcD5cbiAqICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAqIDwvbWF0LWNoaXA+XG4gKiBgYGBcbiAqL1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcFJlbW92ZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzpcbiAgICAgICdtYXQtbWRjLWNoaXAtcmVtb3ZlIG1hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yICcgK1xuICAgICAgJ21kYy1ldm9sdXRpb24tY2hpcF9faWNvbiBtZGMtZXZvbHV0aW9uLWNoaXBfX2ljb24tLXRyYWlsaW5nJyxcbiAgICAncm9sZSc6ICdidXR0b24nLFxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnbnVsbCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfQ0hJUF9SRU1PVkUsIHVzZUV4aXN0aW5nOiBNYXRDaGlwUmVtb3ZlfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBSZW1vdmUgZXh0ZW5kcyBNYXRDaGlwQWN0aW9uIHtcbiAgb3ZlcnJpZGUgX2lzUHJpbWFyeSA9IGZhbHNlO1xuXG4gIG92ZXJyaWRlIF9oYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5fcGFyZW50Q2hpcC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICgoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIgfHwgZXZlbnQua2V5Q29kZSA9PT0gU1BBQ0UpICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9wYXJlbnRDaGlwLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19