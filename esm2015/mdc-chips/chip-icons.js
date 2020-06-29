/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, ElementRef, InjectionToken } from '@angular/core';
import { mixinDisabled, mixinTabIndex, } from '@angular/material/core';
import { MDCChipTrailingActionFoundation } from '@material/chips';
import { Subject } from 'rxjs';
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
    constructor(_changeDetectorRef, _elementRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
    }
    /** Sets whether the given CSS class should be applied to the leading icon. */
    setClass(cssClass, active) {
        this._elementRef.nativeElement.classList.toggle(cssClass, active);
        this._changeDetectorRef.markForCheck();
    }
}
MatChipAvatar.decorators = [
    { type: Directive, args: [{
                selector: 'mat-chip-avatar, [matChipAvatar]',
                host: {
                    'class': 'mat-mdc-chip-avatar mdc-chip__icon mdc-chip__icon--leading',
                    'role': 'img'
                },
                providers: [{ provide: MAT_CHIP_AVATAR, useExisting: MatChipAvatar }],
            },] }
];
MatChipAvatar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
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
export class MatChipTrailingIcon {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._adapter = {
            focus: () => this._elementRef.nativeElement.focus(),
            getAttribute: (name) => this._elementRef.nativeElement.getAttribute(name),
            setAttribute: (name, value) => {
                this._elementRef.nativeElement.setAttribute(name, value);
            },
            // TODO(crisbeto): there's also a `trigger` parameter that the chip isn't
            // handling yet. Consider passing it along once MDC start using it.
            notifyInteraction: () => {
                // TODO(crisbeto): uncomment this code once we've inverted the
                // dependency on `MatChip`. this._chip._notifyInteraction();
            },
            // TODO(crisbeto): there's also a `key` parameter that the chip isn't
            // handling yet. Consider passing it along once MDC start using it.
            notifyNavigation: () => {
                // TODO(crisbeto): uncomment this code once we've inverted the
                // dependency on `MatChip`. this._chip._notifyNavigation();
            }
        };
        this._foundation = new MDCChipTrailingActionFoundation(this._adapter);
    }
    ngOnDestroy() {
        this._foundation.destroy();
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /** Sets an attribute on the icon. */
    setAttribute(name, value) {
        this._elementRef.nativeElement.setAttribute(name, value);
    }
    isNavigable() {
        return this._foundation.isNavigable();
    }
}
MatChipTrailingIcon.decorators = [
    { type: Directive, args: [{
                selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                host: {
                    'class': 'mat-mdc-chip-trailing-icon mdc-chip__icon mdc-chip__icon--trailing',
                    'tabindex': '-1',
                    'aria-hidden': 'true',
                },
                providers: [{ provide: MAT_CHIP_TRAILING_ICON, useExisting: MatChipTrailingIcon }],
            },] }
];
MatChipTrailingIcon.ctorParameters = () => [
    { type: ElementRef }
];
/**
 * Injection token that can be used to reference instances of `MatChipRemove`. It serves as
 * alternative token to the actual `MatChipRemove` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_CHIP_REMOVE = new InjectionToken('MatChipRemove');
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * @docs-private
 */
class MatChipRemoveBase extends MatChipTrailingIcon {
    constructor(elementRef) {
        super(elementRef);
    }
}
const _MatChipRemoveMixinBase = mixinTabIndex(mixinDisabled(MatChipRemoveBase), 0);
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
export class MatChipRemove extends _MatChipRemoveMixinBase {
    constructor(elementRef) {
        super(elementRef);
        /**
         * Emits when the user interacts with the icon.
         * @docs-private
         */
        this.interaction = new Subject();
        if (elementRef.nativeElement.nodeName === 'BUTTON') {
            elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
}
MatChipRemove.decorators = [
    { type: Directive, args: [{
                selector: '[matChipRemove]',
                inputs: ['disabled', 'tabIndex'],
                host: {
                    'class': `mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator
        mdc-chip__icon mdc-chip__icon--trailing`,
                    '[tabIndex]': 'tabIndex',
                    'role': 'button',
                    '(click)': 'interaction.next($event)',
                    '(keydown)': 'interaction.next($event)',
                    // We need to remove this explicitly, because it gets inherited from MatChipTrailingIcon.
                    '[attr.aria-hidden]': 'null',
                },
                providers: [{ provide: MAT_CHIP_REMOVE, useExisting: MatChipRemove }],
            },] }
];
MatChipRemove.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFLTCxhQUFhLEVBQ2IsYUFBYSxHQUNkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUErQiwrQkFBK0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHN0I7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsZUFBZSxDQUFDLENBQUM7QUFFbEY7OztHQUdHO0FBU0gsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBb0Isa0JBQXFDLEVBQ3JDLFdBQW9DO1FBRHBDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO0lBQUcsQ0FBQztJQUU1RCw4RUFBOEU7SUFDOUUsUUFBUSxDQUFDLFFBQWdCLEVBQUUsTUFBZTtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLDREQUE0RDtvQkFDckUsTUFBTSxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFLENB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LFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNsRCxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDOzs7WUE3QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7Z0JBQ2hDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUU7Z0RBQ21DO29CQUM1QyxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLFNBQVMsRUFBRSwwQkFBMEI7b0JBQ3JDLFdBQVcsRUFBRSwwQkFBMEI7b0JBRXZDLHlGQUF5RjtvQkFDekYsb0JBQW9CLEVBQUUsTUFBTTtpQkFDN0I7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUMsQ0FBQzthQUNwRTs7O1lBN0txQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3Rpb25Ub2tlbiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGUsXG4gIENhbkRpc2FibGVDdG9yLFxuICBIYXNUYWJJbmRleCxcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpblRhYkluZGV4LFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TURDQ2hpcFRyYWlsaW5nQWN0aW9uQWRhcHRlciwgTURDQ2hpcFRyYWlsaW5nQWN0aW9uRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGBNYXRDaGlwQXZhdGFyYC4gSXQgc2VydmVzIGFzXG4gKiBhbHRlcm5hdGl2ZSB0b2tlbiB0byB0aGUgYWN0dWFsIGBNYXRDaGlwQXZhdGFyYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGRpcmVjdGl2ZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9DSElQX0FWQVRBUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRDaGlwQXZhdGFyPignTWF0Q2hpcEF2YXRhcicpO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gY2hpcCBsZWFkaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLWF2YXRhciwgW21hdENoaXBBdmF0YXJdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtYXZhdGFyIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS1sZWFkaW5nJyxcbiAgICAncm9sZSc6ICdpbWcnXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfQ0hJUF9BVkFUQVIsIHVzZUV4aXN0aW5nOiBNYXRDaGlwQXZhdGFyfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBBdmF0YXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgbGVhZGluZyBpY29uLiAqL1xuICBzZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjc3NDbGFzcywgYWN0aXZlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZmVyZW5jZSBpbnN0YW5jZXMgb2YgYE1hdENoaXBUcmFpbGluZ0ljb25gLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdENoaXBUcmFpbGluZ0ljb25gIGNsYXNzIHdoaWNoIGNvdWxkIGNhdXNlIHVubmVjZXNzYXJ5XG4gKiByZXRlbnRpb24gb2YgdGhlIGNsYXNzIGFuZCBpdHMgZGlyZWN0aXZlIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY29uc3QgTUFUX0NISVBfVFJBSUxJTkdfSUNPTiA9XG4gIG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRDaGlwVHJhaWxpbmdJY29uPignTWF0Q2hpcFRyYWlsaW5nSWNvbicpO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gYW5kIGNvbmZpZ3VyZSBhdHRyaWJ1dGVzIGZvciBjaGlwIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXRyYWlsaW5nLWljb24sIFttYXRDaGlwVHJhaWxpbmdJY29uXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOlxuICAgICAgICAnbWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24gbWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9DSElQX1RSQUlMSU5HX0lDT04sIHVzZUV4aXN0aW5nOiBNYXRDaGlwVHJhaWxpbmdJY29ufV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBUcmFpbGluZ0ljb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9uO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENDaGlwVHJhaWxpbmdBY3Rpb25BZGFwdGVyID0ge1xuICAgIGZvY3VzOiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSxcbiAgICBnZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOlxuICAgICAgICAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHRoZXJlJ3MgYWxzbyBhIGB0cmlnZ2VyYCBwYXJhbWV0ZXIgdGhhdCB0aGUgY2hpcCBpc24ndFxuICAgIC8vIGhhbmRsaW5nIHlldC4gQ29uc2lkZXIgcGFzc2luZyBpdCBhbG9uZyBvbmNlIE1EQyBzdGFydCB1c2luZyBpdC5cbiAgICBub3RpZnlJbnRlcmFjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeUludGVyYWN0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAvLyBUT0RPKGNyaXNiZXRvKTogdGhlcmUncyBhbHNvIGEgYGtleWAgcGFyYW1ldGVyIHRoYXQgdGhlIGNoaXAgaXNuJ3RcbiAgICAvLyBoYW5kbGluZyB5ZXQuIENvbnNpZGVyIHBhc3NpbmcgaXQgYWxvbmcgb25jZSBNREMgc3RhcnQgdXNpbmcgaXQuXG4gICAgbm90aWZ5TmF2aWdhdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeU5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgLy8gVE9ETyhjcmlzYmV0byk6IGN1cnJlbnRseSB0aGUgY2hpcCBuZWVkcyBhIHJlZmVyZW5jZSB0byB0aGUgdHJhaWxpbmdcbiAgICAgIC8vIGljb24gZm9yIHRoZSBkZXByZWNhdGVkIGBzZXRUcmFpbGluZ0FjdGlvbkF0dHJgIG1ldGhvZC4gVW50aWwgdGhlXG4gICAgICAvLyBtZXRob2QgaXMgcmVtb3ZlZCwgd2UgY2FuJ3QgdXNlIHRoZSBjaGlwIGhlcmUsIGJlY2F1c2UgaXQgY2F1c2VzIGFcbiAgICAgIC8vIGNpcmN1bGFyIGltcG9ydC4gcHJpdmF0ZSBfY2hpcDogTWF0Q2hpcFxuICApIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBUcmFpbGluZ0FjdGlvbkZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIFNldHMgYW4gYXR0cmlidXRlIG9uIHRoZSBpY29uLiAqL1xuICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBpc05hdmlnYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5pc05hdmlnYWJsZSgpO1xuICB9XG59XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIGluc3RhbmNlcyBvZiBgTWF0Q2hpcFJlbW92ZWAuIEl0IHNlcnZlcyBhc1xuICogYWx0ZXJuYXRpdmUgdG9rZW4gdG8gdGhlIGFjdHVhbCBgTWF0Q2hpcFJlbW92ZWAgY2xhc3Mgd2hpY2ggY291bGQgY2F1c2UgdW5uZWNlc3NhcnlcbiAqIHJldGVudGlvbiBvZiB0aGUgY2xhc3MgYW5kIGl0cyBkaXJlY3RpdmUgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfQ0hJUF9SRU1PVkUgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0Q2hpcFJlbW92ZT4oJ01hdENoaXBSZW1vdmUnKTtcblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXBSZW1vdmUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmNsYXNzIE1hdENoaXBSZW1vdmVCYXNlIGV4dGVuZHMgTWF0Q2hpcFRyYWlsaW5nSWNvbiB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgfVxufVxuXG5jb25zdCBfTWF0Q2hpcFJlbW92ZU1peGluQmFzZTpcbiAgQ2FuRGlzYWJsZUN0b3IgJlxuICBIYXNUYWJJbmRleEN0b3IgJlxuICB0eXBlb2YgTWF0Q2hpcFJlbW92ZUJhc2UgPVxuICAgIG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNYXRDaGlwUmVtb3ZlQmFzZSksIDApO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byByZW1vdmUgdGhlIHBhcmVudCBjaGlwIHdoZW4gdGhlIHRyYWlsaW5nIGljb24gaXMgY2xpY2tlZCBvclxuICogd2hlbiB0aGUgRU5URVIga2V5IGlzIHByZXNzZWQgb24gaXQuXG4gKlxuICogUmVjb21tZW5kZWQgZm9yIHVzZSB3aXRoIHRoZSBNYXRlcmlhbCBEZXNpZ24gXCJjYW5jZWxcIiBpY29uXG4gKiBhdmFpbGFibGUgYXQgaHR0cHM6Ly9tYXRlcmlhbC5pby9pY29ucy8jaWNfY2FuY2VsLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiA8bWF0LWNoaXA+XG4gKiAgIDxtYXQtaWNvbiBtYXRDaGlwUmVtb3ZlPmNhbmNlbDwvbWF0LWljb24+XG4gKiA8L21hdC1jaGlwPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRDaGlwUmVtb3ZlXScsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogYG1hdC1tZGMtY2hpcC1yZW1vdmUgbWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24gbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3JcbiAgICAgICAgbWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nYCxcbiAgICAnW3RhYkluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJ3JvbGUnOiAnYnV0dG9uJyxcbiAgICAnKGNsaWNrKSc6ICdpbnRlcmFjdGlvbi5uZXh0KCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnaW50ZXJhY3Rpb24ubmV4dCgkZXZlbnQpJyxcblxuICAgIC8vIFdlIG5lZWQgdG8gcmVtb3ZlIHRoaXMgZXhwbGljaXRseSwgYmVjYXVzZSBpdCBnZXRzIGluaGVyaXRlZCBmcm9tIE1hdENoaXBUcmFpbGluZ0ljb24uXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICdudWxsJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9DSElQX1JFTU9WRSwgdXNlRXhpc3Rpbmc6IE1hdENoaXBSZW1vdmV9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJlbW92ZSBleHRlbmRzIF9NYXRDaGlwUmVtb3ZlTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgge1xuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgaWNvbi5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgaW50ZXJhY3Rpb246IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgaWYgKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=