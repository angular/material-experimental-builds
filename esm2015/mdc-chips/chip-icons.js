/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, ElementRef, InjectionToken } from '@angular/core';
import { mixinDisabled, mixinTabIndex, } from '@angular/material-experimental/mdc-core';
import { deprecated } from '@material/chips';
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
        this._foundation = new deprecated.MDCChipTrailingActionFoundation(this._adapter);
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
    /** Emits a MouseEvent when the user clicks on the remove icon. */
    _handleClick(event) {
        this.interaction.next(event);
        event.stopPropagation();
    }
    focus() {
        this._elementRef.nativeElement.focus();
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
                    '(click)': '_handleClick($event)',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFLTCxhQUFhLEVBQ2IsYUFBYSxHQUNkLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0I7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsZUFBZSxDQUFDLENBQUM7QUFFbEY7OztHQUdHO0FBU0gsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBb0Isa0JBQXFDLEVBQ3JDLFdBQW9DO1FBRHBDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO0lBQUcsQ0FBQztJQUU1RCw4RUFBOEU7SUFDOUUsUUFBUSxDQUFDLFFBQWdCLEVBQUUsTUFBZTtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBaEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLDREQUE0RDtvQkFDckUsTUFBTSxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFLENBQUMs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M0YsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDbEQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELGtFQUFrRTtJQUNsRSxZQUFZLENBQUMsS0FBaUI7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUNoQyxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFO2dEQUNtQztvQkFDNUMsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLE1BQU0sRUFBRSxRQUFRO29CQUNoQixTQUFTLEVBQUUsc0JBQXNCO29CQUNqQyxXQUFXLEVBQUUsMEJBQTBCO29CQUV2Qyx5RkFBeUY7b0JBQ3pGLG9CQUFvQixFQUFFLE1BQU07aUJBQzdCO2dCQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDLENBQUM7YUFDcEU7OztZQTVLcUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGlvblRva2VuLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIEhhc1RhYkluZGV4LFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluVGFiSW5kZXgsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge2RlcHJlY2F0ZWR9IGZyb20gJ0BtYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZmVyZW5jZSBpbnN0YW5jZXMgb2YgYE1hdENoaXBBdmF0YXJgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdENoaXBBdmF0YXJgIGNsYXNzIHdoaWNoIGNvdWxkIGNhdXNlIHVubmVjZXNzYXJ5XG4gKiByZXRlbnRpb24gb2YgdGhlIGNsYXNzIGFuZCBpdHMgZGlyZWN0aXZlIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY29uc3QgTUFUX0NISVBfQVZBVEFSID0gbmV3IEluamVjdGlvblRva2VuPE1hdENoaXBBdmF0YXI+KCdNYXRDaGlwQXZhdGFyJyk7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBjaGlwIGxlYWRpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtYXZhdGFyLCBbbWF0Q2hpcEF2YXRhcl0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hpcC1hdmF0YXIgbWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLWxlYWRpbmcnLFxuICAgICdyb2xlJzogJ2ltZydcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9DSElQX0FWQVRBUiwgdXNlRXhpc3Rpbmc6IE1hdENoaXBBdmF0YXJ9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEF2YXRhciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgLyoqIFNldHMgd2hldGhlciB0aGUgZ2l2ZW4gQ1NTIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBsZWFkaW5nIGljb24uICovXG4gIHNldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNzc0NsYXNzLCBhY3RpdmUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIGluc3RhbmNlcyBvZiBgTWF0Q2hpcFRyYWlsaW5nSWNvbmAuIEl0IHNlcnZlcyBhc1xuICogYWx0ZXJuYXRpdmUgdG9rZW4gdG8gdGhlIGFjdHVhbCBgTWF0Q2hpcFRyYWlsaW5nSWNvbmAgY2xhc3Mgd2hpY2ggY291bGQgY2F1c2UgdW5uZWNlc3NhcnlcbiAqIHJldGVudGlvbiBvZiB0aGUgY2xhc3MgYW5kIGl0cyBkaXJlY3RpdmUgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfQ0hJUF9UUkFJTElOR19JQ09OID1cbiAgbmV3IEluamVjdGlvblRva2VuPE1hdENoaXBUcmFpbGluZ0ljb24+KCdNYXRDaGlwVHJhaWxpbmdJY29uJyk7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBhbmQgY29uZmlndXJlIGF0dHJpYnV0ZXMgZm9yIGNoaXAgdHJhaWxpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtdHJhaWxpbmctaWNvbiwgW21hdENoaXBUcmFpbGluZ0ljb25dJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6XG4gICAgICAgICdtYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmcnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX0NISVBfVFJBSUxJTkdfSUNPTiwgdXNlRXhpc3Rpbmc6IE1hdENoaXBUcmFpbGluZ0ljb259XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFRyYWlsaW5nSWNvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IGRlcHJlY2F0ZWQuTURDQ2hpcFRyYWlsaW5nQWN0aW9uRm91bmRhdGlvbjtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogZGVwcmVjYXRlZC5NRENDaGlwVHJhaWxpbmdBY3Rpb25BZGFwdGVyID0ge1xuICAgIGZvY3VzOiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSxcbiAgICBnZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOlxuICAgICAgICAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHRoZXJlJ3MgYWxzbyBhIGB0cmlnZ2VyYCBwYXJhbWV0ZXIgdGhhdCB0aGUgY2hpcCBpc24ndFxuICAgIC8vIGhhbmRsaW5nIHlldC4gQ29uc2lkZXIgcGFzc2luZyBpdCBhbG9uZyBvbmNlIE1EQyBzdGFydCB1c2luZyBpdC5cbiAgICBub3RpZnlJbnRlcmFjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeUludGVyYWN0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAvLyBUT0RPKGNyaXNiZXRvKTogdGhlcmUncyBhbHNvIGEgYGtleWAgcGFyYW1ldGVyIHRoYXQgdGhlIGNoaXAgaXNuJ3RcbiAgICAvLyBoYW5kbGluZyB5ZXQuIENvbnNpZGVyIHBhc3NpbmcgaXQgYWxvbmcgb25jZSBNREMgc3RhcnQgdXNpbmcgaXQuXG4gICAgbm90aWZ5TmF2aWdhdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeU5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgLy8gVE9ETyhjcmlzYmV0byk6IGN1cnJlbnRseSB0aGUgY2hpcCBuZWVkcyBhIHJlZmVyZW5jZSB0byB0aGUgdHJhaWxpbmdcbiAgICAgIC8vIGljb24gZm9yIHRoZSBkZXByZWNhdGVkIGBzZXRUcmFpbGluZ0FjdGlvbkF0dHJgIG1ldGhvZC4gVW50aWwgdGhlXG4gICAgICAvLyBtZXRob2QgaXMgcmVtb3ZlZCwgd2UgY2FuJ3QgdXNlIHRoZSBjaGlwIGhlcmUsIGJlY2F1c2UgaXQgY2F1c2VzIGFcbiAgICAgIC8vIGNpcmN1bGFyIGltcG9ydC4gcHJpdmF0ZSBfY2hpcDogTWF0Q2hpcFxuICApIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IGRlcHJlY2F0ZWQuTURDQ2hpcFRyYWlsaW5nQWN0aW9uRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogU2V0cyBhbiBhdHRyaWJ1dGUgb24gdGhlIGljb24uICovXG4gIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIGlzTmF2aWdhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3VuZGF0aW9uLmlzTmF2aWdhYmxlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGBNYXRDaGlwUmVtb3ZlYC4gSXQgc2VydmVzIGFzXG4gKiBhbHRlcm5hdGl2ZSB0b2tlbiB0byB0aGUgYWN0dWFsIGBNYXRDaGlwUmVtb3ZlYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGRpcmVjdGl2ZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9DSElQX1JFTU9WRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRDaGlwUmVtb3ZlPignTWF0Q2hpcFJlbW92ZScpO1xuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcFJlbW92ZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY2xhc3MgTWF0Q2hpcFJlbW92ZUJhc2UgZXh0ZW5kcyBNYXRDaGlwVHJhaWxpbmdJY29uIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICB9XG59XG5cbmNvbnN0IF9NYXRDaGlwUmVtb3ZlTWl4aW5CYXNlOlxuICBDYW5EaXNhYmxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIHR5cGVvZiBNYXRDaGlwUmVtb3ZlQmFzZSA9XG4gICAgbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1hdENoaXBSZW1vdmVCYXNlKSwgMCk7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIHJlbW92ZSB0aGUgcGFyZW50IGNoaXAgd2hlbiB0aGUgdHJhaWxpbmcgaWNvbiBpcyBjbGlja2VkIG9yXG4gKiB3aGVuIHRoZSBFTlRFUiBrZXkgaXMgcHJlc3NlZCBvbiBpdC5cbiAqXG4gKiBSZWNvbW1lbmRlZCBmb3IgdXNlIHdpdGggdGhlIE1hdGVyaWFsIERlc2lnbiBcImNhbmNlbFwiIGljb25cbiAqIGF2YWlsYWJsZSBhdCBodHRwczovL21hdGVyaWFsLmlvL2ljb25zLyNpY19jYW5jZWwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIDxtYXQtY2hpcD5cbiAqICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAqIDwvbWF0LWNoaXA+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENoaXBSZW1vdmVdJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiBgbWF0LW1kYy1jaGlwLXJlbW92ZSBtYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiBtYXQtbWRjLWZvY3VzLWluZGljYXRvclxuICAgICAgICBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmdgLFxuICAgICdbdGFiSW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAncm9sZSc6ICdidXR0b24nLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ2ludGVyYWN0aW9uLm5leHQoJGV2ZW50KScsXG5cbiAgICAvLyBXZSBuZWVkIHRvIHJlbW92ZSB0aGlzIGV4cGxpY2l0bHksIGJlY2F1c2UgaXQgZ2V0cyBpbmhlcml0ZWQgZnJvbSBNYXRDaGlwVHJhaWxpbmdJY29uLlxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnbnVsbCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfQ0hJUF9SRU1PVkUsIHVzZUV4aXN0aW5nOiBNYXRDaGlwUmVtb3ZlfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBSZW1vdmUgZXh0ZW5kcyBfTWF0Q2hpcFJlbW92ZU1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIGljb24uXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGludGVyYWN0aW9uOiBTdWJqZWN0PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiA9IG5ldyBTdWJqZWN0PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIGlmIChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0cyBhIE1vdXNlRXZlbnQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHJlbW92ZSBpY29uLiAqL1xuICBfaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmludGVyYWN0aW9uLm5leHQoZXZlbnQpO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdGFiSW5kZXg6IE51bWJlcklucHV0O1xufVxuIl19