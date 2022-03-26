/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, InjectionToken } from '@angular/core';
import { MDCChipTrailingActionFoundation } from '@material/chips';
import { MatChipAction } from './chip-action';
import * as i0 from "@angular/core";
/**
 * Injection token that can be used to reference instances of `MatChipAvatar`. It serves as
 * alternative token to the actual `MatChipAvatar` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_CHIP_AVATAR = new InjectionToken('MatChipAvatar');
/**
 * Directive to add CSS classes to chip leading icon.
 * @docs-private
 */
export class MatChipAvatar {
}
MatChipAvatar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatChipAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatChipAvatar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.9", type: MatChipAvatar, selector: "mat-chip-avatar, [matChipAvatar]", host: { attributes: { "role": "img" }, classAttribute: "mat-mdc-chip-avatar mdc-evolution-chip__icon mdc-evolution-chip__icon--primary" }, providers: [{ provide: MAT_CHIP_AVATAR, useExisting: MatChipAvatar }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatChipAvatar, decorators: [{
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
 * Injection token that can be used to reference instances of `MatChipTrailingIcon`. It serves as
 * alternative token to the actual `MatChipTrailingIcon` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_CHIP_TRAILING_ICON = new InjectionToken('MatChipTrailingIcon');
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
    }
    _createFoundation(adapter) {
        return new MDCChipTrailingActionFoundation(adapter);
    }
}
MatChipTrailingIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatChipTrailingIcon, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatChipTrailingIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.9", type: MatChipTrailingIcon, selector: "mat-chip-trailing-icon, [matChipTrailingIcon]", host: { attributes: { "aria-hidden": "true" }, classAttribute: "mat-mdc-chip-trailing-icon mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing" }, providers: [{ provide: MAT_CHIP_TRAILING_ICON, useExisting: MatChipTrailingIcon }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatChipTrailingIcon, decorators: [{
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
 * Injection token that can be used to reference instances of `MatChipRemove`. It serves as
 * alternative token to the actual `MatChipRemove` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_CHIP_REMOVE = new InjectionToken('MatChipRemove');
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
    _createFoundation(adapter) {
        return new MDCChipTrailingActionFoundation(adapter);
    }
    _handleClick(event) {
        // Some consumers bind `click` events directly on the chip
        // which will also pick up clicks on the remove button.
        event.stopPropagation();
        super._handleClick(event);
    }
    _handleKeydown(event) {
        event.stopPropagation();
        super._handleKeydown(event);
    }
}
MatChipRemove.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatChipRemove, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatChipRemove.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.9", type: MatChipRemove, selector: "[matChipRemove]", host: { attributes: { "role": "button" }, properties: { "attr.aria-hidden": "null" }, classAttribute: "mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing" }, providers: [{ provide: MAT_CHIP_REMOVE, useExisting: MatChipRemove }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.9", ngImport: i0, type: MatChipRemove, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUF1QiwrQkFBK0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRTVDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQWdCLGVBQWUsQ0FBQyxDQUFDO0FBRWxGOzs7R0FHRztBQVNILE1BQU0sT0FBTyxhQUFhOztpSEFBYixhQUFhO3FHQUFiLGFBQWEsc01BRmIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBQyxDQUFDO2tHQUV4RCxhQUFhO2tCQVJ6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsZ0ZBQWdGO3dCQUN6RixNQUFNLEVBQUUsS0FBSztxQkFDZDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxlQUFlLEVBQUMsQ0FBQztpQkFDcEU7O0FBR0Q7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLElBQUksY0FBYyxDQUN0RCxxQkFBcUIsQ0FDdEIsQ0FBQztBQUVGOzs7R0FHRztBQVVILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxhQUFhO0lBVHREOztRQVVFOzs7V0FHRztRQUNNLGtCQUFhLEdBQUcsS0FBSyxDQUFDO0tBS2hDO0lBSG9CLGlCQUFpQixDQUFDLE9BQTZCO1FBQ2hFLE9BQU8sSUFBSSwrQkFBK0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDOzt1SEFUVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixtT0FGbkIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQztrR0FFckUsbUJBQW1CO2tCQVQvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwrQ0FBK0M7b0JBQ3pELElBQUksRUFBRTt3QkFDSixPQUFPLEVBQ0wsd0ZBQXdGO3dCQUMxRixhQUFhLEVBQUUsTUFBTTtxQkFDdEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxxQkFBcUIsRUFBQyxDQUFDO2lCQUNqRjs7QUFhRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUFnQixlQUFlLENBQUMsQ0FBQztBQUVsRjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQWFILE1BQU0sT0FBTyxhQUFjLFNBQVEsYUFBYTtJQUMzQixpQkFBaUIsQ0FBQyxPQUE2QjtRQUNoRSxPQUFPLElBQUksK0JBQStCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVRLFlBQVksQ0FBQyxLQUFpQjtRQUNyQywwREFBMEQ7UUFDMUQsdURBQXVEO1FBQ3ZELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFUSxjQUFjLENBQUMsS0FBb0I7UUFDMUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7aUhBZlUsYUFBYTtxR0FBYixhQUFhLHdSQUZiLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUMsQ0FBQztrR0FFeEQsYUFBYTtrQkFYekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUNMLHlFQUF5RTs0QkFDekUsNkRBQTZEO3dCQUMvRCxNQUFNLEVBQUUsUUFBUTt3QkFDaEIsb0JBQW9CLEVBQUUsTUFBTTtxQkFDN0I7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsZUFBZSxFQUFDLENBQUM7aUJBQ3BFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01EQ0NoaXBBY3Rpb25BZGFwdGVyLCBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtNYXRDaGlwQWN0aW9ufSBmcm9tICcuL2NoaXAtYWN0aW9uJztcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGBNYXRDaGlwQXZhdGFyYC4gSXQgc2VydmVzIGFzXG4gKiBhbHRlcm5hdGl2ZSB0b2tlbiB0byB0aGUgYWN0dWFsIGBNYXRDaGlwQXZhdGFyYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGRpcmVjdGl2ZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9DSElQX0FWQVRBUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRDaGlwQXZhdGFyPignTWF0Q2hpcEF2YXRhcicpO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gY2hpcCBsZWFkaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLWF2YXRhciwgW21hdENoaXBBdmF0YXJdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtYXZhdGFyIG1kYy1ldm9sdXRpb24tY2hpcF9faWNvbiBtZGMtZXZvbHV0aW9uLWNoaXBfX2ljb24tLXByaW1hcnknLFxuICAgICdyb2xlJzogJ2ltZycsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfQ0hJUF9BVkFUQVIsIHVzZUV4aXN0aW5nOiBNYXRDaGlwQXZhdGFyfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBBdmF0YXIge31cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGBNYXRDaGlwVHJhaWxpbmdJY29uYC4gSXQgc2VydmVzIGFzXG4gKiBhbHRlcm5hdGl2ZSB0b2tlbiB0byB0aGUgYWN0dWFsIGBNYXRDaGlwVHJhaWxpbmdJY29uYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGRpcmVjdGl2ZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9DSElQX1RSQUlMSU5HX0lDT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0Q2hpcFRyYWlsaW5nSWNvbj4oXG4gICdNYXRDaGlwVHJhaWxpbmdJY29uJyxcbik7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBhbmQgY29uZmlndXJlIGF0dHJpYnV0ZXMgZm9yIGNoaXAgdHJhaWxpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtdHJhaWxpbmctaWNvbiwgW21hdENoaXBUcmFpbGluZ0ljb25dJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6XG4gICAgICAnbWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24gbWRjLWV2b2x1dGlvbi1jaGlwX19pY29uIG1kYy1ldm9sdXRpb24tY2hpcF9faWNvbi0tdHJhaWxpbmcnLFxuICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9DSElQX1RSQUlMSU5HX0lDT04sIHVzZUV4aXN0aW5nOiBNYXRDaGlwVHJhaWxpbmdJY29ufV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBUcmFpbGluZ0ljb24gZXh0ZW5kcyBNYXRDaGlwQWN0aW9uIHtcbiAgLyoqXG4gICAqIE1EQyBjb25zaWRlcnMgYWxsIHRyYWlsaW5nIGFjdGlvbnMgYXMgYSByZW1vdmUgaWNvbixcbiAgICogYnV0IHdlIHN1cHBvcnQgbm9uLWludGVyYWN0aXZlIHRyYWlsaW5nIGljb25zLlxuICAgKi9cbiAgb3ZlcnJpZGUgaXNJbnRlcmFjdGl2ZSA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfY3JlYXRlRm91bmRhdGlvbihhZGFwdGVyOiBNRENDaGlwQWN0aW9uQWRhcHRlcikge1xuICAgIHJldHVybiBuZXcgTURDQ2hpcFRyYWlsaW5nQWN0aW9uRm91bmRhdGlvbihhZGFwdGVyKTtcbiAgfVxufVxuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZmVyZW5jZSBpbnN0YW5jZXMgb2YgYE1hdENoaXBSZW1vdmVgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdENoaXBSZW1vdmVgIGNsYXNzIHdoaWNoIGNvdWxkIGNhdXNlIHVubmVjZXNzYXJ5XG4gKiByZXRlbnRpb24gb2YgdGhlIGNsYXNzIGFuZCBpdHMgZGlyZWN0aXZlIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY29uc3QgTUFUX0NISVBfUkVNT1ZFID0gbmV3IEluamVjdGlvblRva2VuPE1hdENoaXBSZW1vdmU+KCdNYXRDaGlwUmVtb3ZlJyk7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIHJlbW92ZSB0aGUgcGFyZW50IGNoaXAgd2hlbiB0aGUgdHJhaWxpbmcgaWNvbiBpcyBjbGlja2VkIG9yXG4gKiB3aGVuIHRoZSBFTlRFUiBrZXkgaXMgcHJlc3NlZCBvbiBpdC5cbiAqXG4gKiBSZWNvbW1lbmRlZCBmb3IgdXNlIHdpdGggdGhlIE1hdGVyaWFsIERlc2lnbiBcImNhbmNlbFwiIGljb25cbiAqIGF2YWlsYWJsZSBhdCBodHRwczovL21hdGVyaWFsLmlvL2ljb25zLyNpY19jYW5jZWwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIDxtYXQtY2hpcD5cbiAqICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAqIDwvbWF0LWNoaXA+XG4gKiBgYGBcbiAqL1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcFJlbW92ZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzpcbiAgICAgICdtYXQtbWRjLWNoaXAtcmVtb3ZlIG1hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yICcgK1xuICAgICAgJ21kYy1ldm9sdXRpb24tY2hpcF9faWNvbiBtZGMtZXZvbHV0aW9uLWNoaXBfX2ljb24tLXRyYWlsaW5nJyxcbiAgICAncm9sZSc6ICdidXR0b24nLFxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnbnVsbCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfQ0hJUF9SRU1PVkUsIHVzZUV4aXN0aW5nOiBNYXRDaGlwUmVtb3ZlfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBSZW1vdmUgZXh0ZW5kcyBNYXRDaGlwQWN0aW9uIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9jcmVhdGVGb3VuZGF0aW9uKGFkYXB0ZXI6IE1EQ0NoaXBBY3Rpb25BZGFwdGVyKSB7XG4gICAgcmV0dXJuIG5ldyBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICB9XG5cbiAgb3ZlcnJpZGUgX2hhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgLy8gU29tZSBjb25zdW1lcnMgYmluZCBgY2xpY2tgIGV2ZW50cyBkaXJlY3RseSBvbiB0aGUgY2hpcFxuICAgIC8vIHdoaWNoIHdpbGwgYWxzbyBwaWNrIHVwIGNsaWNrcyBvbiB0aGUgcmVtb3ZlIGJ1dHRvbi5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzdXBlci5faGFuZGxlQ2xpY2soZXZlbnQpO1xuICB9XG5cbiAgb3ZlcnJpZGUgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzdXBlci5faGFuZGxlS2V5ZG93bihldmVudCk7XG4gIH1cbn1cbiJdfQ==