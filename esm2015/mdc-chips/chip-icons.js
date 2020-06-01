/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, ElementRef } from '@angular/core';
import { mixinDisabled, mixinTabIndex, } from '@angular/material/core';
import { MDCChipTrailingActionFoundation } from '@material/chips';
import { Subject } from 'rxjs';
/**
 * Directive to add CSS classes to chip leading icon.
 * @docs-private
 */
let MatChipAvatar = /** @class */ (() => {
    class MatChipAvatar {
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
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipAvatar.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return MatChipAvatar;
})();
export { MatChipAvatar };
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * @docs-private
 */
let MatChipTrailingIcon = /** @class */ (() => {
    class MatChipTrailingIcon {
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
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipTrailingIcon.ctorParameters = () => [
        { type: ElementRef }
    ];
    return MatChipTrailingIcon;
})();
export { MatChipTrailingIcon };
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
let MatChipRemove = /** @class */ (() => {
    class MatChipRemove extends _MatChipRemoveMixinBase {
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
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipRemove.ctorParameters = () => [
        { type: ElementRef }
    ];
    return MatChipRemove;
})();
export { MatChipRemove };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUtMLGFBQWEsRUFDYixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQStCLCtCQUErQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUYsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUc3Qjs7O0dBR0c7QUFDSDtJQUFBLE1BT2EsYUFBYTtRQUN4QixZQUFvQixrQkFBcUMsRUFDckMsV0FBb0M7WUFEcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtZQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFBRyxDQUFDO1FBRTVELDhFQUE4RTtRQUM5RSxRQUFRLENBQUMsUUFBZ0IsRUFBRSxNQUFlO1lBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7Z0JBZkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsNERBQTREO3dCQUNyRSxNQUFNLEVBQUUsS0FBSztxQkFDZDtpQkFDRjs7OztnQkF2Qk8saUJBQWlCO2dCQUFhLFVBQVU7O0lBaUNoRCxvQkFBQztLQUFBO1NBVFksYUFBYTtBQVcxQjs7O0dBR0c7QUFDSDtJQUFBLE1BU2EsbUJBQW1CO1FBMkI5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d0JBQ3JDLFdBQVcsRUFBRSwwQkFBMEI7d0JBRXZDLHlGQUF5Rjt3QkFDekYsb0JBQW9CLEVBQUUsTUFBTTtxQkFDN0I7aUJBQ0Y7Ozs7Z0JBcEpxQyxVQUFVOztJQXFLaEQsb0JBQUM7S0FBQTtTQWhCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIEhhc1RhYkluZGV4LFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluVGFiSW5kZXgsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNRENDaGlwVHJhaWxpbmdBY3Rpb25BZGFwdGVyLCBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gY2hpcCBsZWFkaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLWF2YXRhciwgW21hdENoaXBBdmF0YXJdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtYXZhdGFyIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS1sZWFkaW5nJyxcbiAgICAncm9sZSc6ICdpbWcnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEF2YXRhciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgLyoqIFNldHMgd2hldGhlciB0aGUgZ2l2ZW4gQ1NTIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBsZWFkaW5nIGljb24uICovXG4gIHNldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNzc0NsYXNzLCBhY3RpdmUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBhbmQgY29uZmlndXJlIGF0dHJpYnV0ZXMgZm9yIGNoaXAgdHJhaWxpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtdHJhaWxpbmctaWNvbiwgW21hdENoaXBUcmFpbGluZ0ljb25dJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6XG4gICAgICAgICdtYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmcnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBUcmFpbGluZ0ljb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9uO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENDaGlwVHJhaWxpbmdBY3Rpb25BZGFwdGVyID0ge1xuICAgIGZvY3VzOiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSxcbiAgICBnZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOlxuICAgICAgICAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHRoZXJlJ3MgYWxzbyBhIGB0cmlnZ2VyYCBwYXJhbWV0ZXIgdGhhdCB0aGUgY2hpcCBpc24ndFxuICAgIC8vIGhhbmRsaW5nIHlldC4gQ29uc2lkZXIgcGFzc2luZyBpdCBhbG9uZyBvbmNlIE1EQyBzdGFydCB1c2luZyBpdC5cbiAgICBub3RpZnlJbnRlcmFjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeUludGVyYWN0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAvLyBUT0RPKGNyaXNiZXRvKTogdGhlcmUncyBhbHNvIGEgYGtleWAgcGFyYW1ldGVyIHRoYXQgdGhlIGNoaXAgaXNuJ3RcbiAgICAvLyBoYW5kbGluZyB5ZXQuIENvbnNpZGVyIHBhc3NpbmcgaXQgYWxvbmcgb25jZSBNREMgc3RhcnQgdXNpbmcgaXQuXG4gICAgbm90aWZ5TmF2aWdhdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeU5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgLy8gVE9ETyhjcmlzYmV0byk6IGN1cnJlbnRseSB0aGUgY2hpcCBuZWVkcyBhIHJlZmVyZW5jZSB0byB0aGUgdHJhaWxpbmdcbiAgICAgIC8vIGljb24gZm9yIHRoZSBkZXByZWNhdGVkIGBzZXRUcmFpbGluZ0FjdGlvbkF0dHJgIG1ldGhvZC4gVW50aWwgdGhlXG4gICAgICAvLyBtZXRob2QgaXMgcmVtb3ZlZCwgd2UgY2FuJ3QgdXNlIHRoZSBjaGlwIGhlcmUsIGJlY2F1c2UgaXQgY2F1c2VzIGFcbiAgICAgIC8vIGNpcmN1bGFyIGltcG9ydC4gcHJpdmF0ZSBfY2hpcDogTWF0Q2hpcFxuICApIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBUcmFpbGluZ0FjdGlvbkZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIFNldHMgYW4gYXR0cmlidXRlIG9uIHRoZSBpY29uLiAqL1xuICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBpc05hdmlnYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5pc05hdmlnYWJsZSgpO1xuICB9XG59XG5cbi8qKlxuICogQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGlwUmVtb3ZlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jbGFzcyBNYXRDaGlwUmVtb3ZlQmFzZSBleHRlbmRzIE1hdENoaXBUcmFpbGluZ0ljb24ge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG4gIH1cbn1cblxuY29uc3QgX01hdENoaXBSZW1vdmVNaXhpbkJhc2U6XG4gIENhbkRpc2FibGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgdHlwZW9mIE1hdENoaXBSZW1vdmVCYXNlID1cbiAgICBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWF0Q2hpcFJlbW92ZUJhc2UpLCAwKTtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gcmVtb3ZlIHRoZSBwYXJlbnQgY2hpcCB3aGVuIHRoZSB0cmFpbGluZyBpY29uIGlzIGNsaWNrZWQgb3JcbiAqIHdoZW4gdGhlIEVOVEVSIGtleSBpcyBwcmVzc2VkIG9uIGl0LlxuICpcbiAqIFJlY29tbWVuZGVkIGZvciB1c2Ugd2l0aCB0aGUgTWF0ZXJpYWwgRGVzaWduIFwiY2FuY2VsXCIgaWNvblxuICogYXZhaWxhYmxlIGF0IGh0dHBzOi8vbWF0ZXJpYWwuaW8vaWNvbnMvI2ljX2NhbmNlbC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogPG1hdC1jaGlwPlxuICogICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICogPC9tYXQtY2hpcD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcFJlbW92ZV0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6IGBtYXQtbWRjLWNoaXAtcmVtb3ZlIG1hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yXG4gICAgICAgIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS10cmFpbGluZ2AsXG4gICAgJ1t0YWJJbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICdyb2xlJzogJ2J1dHRvbicsXG4gICAgJyhjbGljayknOiAnaW50ZXJhY3Rpb24ubmV4dCgkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ2ludGVyYWN0aW9uLm5leHQoJGV2ZW50KScsXG5cbiAgICAvLyBXZSBuZWVkIHRvIHJlbW92ZSB0aGlzIGV4cGxpY2l0bHksIGJlY2F1c2UgaXQgZ2V0cyBpbmhlcml0ZWQgZnJvbSBNYXRDaGlwVHJhaWxpbmdJY29uLlxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnbnVsbCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJlbW92ZSBleHRlbmRzIF9NYXRDaGlwUmVtb3ZlTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgge1xuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgaWNvbi5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgaW50ZXJhY3Rpb246IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgaWYgKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=