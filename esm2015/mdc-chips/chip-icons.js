/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-chips/chip-icons.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * \@docs-private
 */
let MatChipAvatar = /** @class */ (() => {
    /**
     * Directive to add CSS classes to chip leading icon.
     * \@docs-private
     */
    class MatChipAvatar {
        /**
         * @param {?} _changeDetectorRef
         * @param {?} _elementRef
         */
        constructor(_changeDetectorRef, _elementRef) {
            this._changeDetectorRef = _changeDetectorRef;
            this._elementRef = _elementRef;
        }
        /**
         * Sets whether the given CSS class should be applied to the leading icon.
         * @param {?} cssClass
         * @param {?} active
         * @return {?}
         */
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatChipAvatar.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatChipAvatar.prototype._elementRef;
}
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * \@docs-private
 */
let MatChipTrailingIcon = /** @class */ (() => {
    /**
     * Directive to add CSS classes to and configure attributes for chip trailing icon.
     * \@docs-private
     */
    class MatChipTrailingIcon {
        /**
         * @param {?} _elementRef
         */
        constructor(_elementRef) {
            this._elementRef = _elementRef;
            this._adapter = {
                focus: (/**
                 * @return {?}
                 */
                () => this._elementRef.nativeElement.focus()),
                getAttribute: (/**
                 * @param {?} name
                 * @return {?}
                 */
                (name) => this._elementRef.nativeElement.getAttribute(name)),
                setAttribute: (/**
                 * @param {?} name
                 * @param {?} value
                 * @return {?}
                 */
                (name, value) => {
                    this._elementRef.nativeElement.setAttribute(name, value);
                }),
                // TODO(crisbeto): there's also a `trigger` parameter that the chip isn't
                // handling yet. Consider passing it along once MDC start using it.
                notifyInteraction: (/**
                 * @return {?}
                 */
                () => {
                    // TODO(crisbeto): uncomment this code once we've inverted the
                    // dependency on `MatChip`. this._chip._notifyInteraction();
                }),
                // TODO(crisbeto): there's also a `key` parameter that the chip isn't
                // handling yet. Consider passing it along once MDC start using it.
                notifyNavigation: (/**
                 * @return {?}
                 */
                () => {
                    // TODO(crisbeto): uncomment this code once we've inverted the
                    // dependency on `MatChip`. this._chip._notifyNavigation();
                })
            };
            this._foundation = new MDCChipTrailingActionFoundation(this._adapter);
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this._foundation.destroy();
        }
        /**
         * @return {?}
         */
        focus() {
            this._elementRef.nativeElement.focus();
        }
        /**
         * Sets an attribute on the icon.
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        setAttribute(name, value) {
            this._elementRef.nativeElement.setAttribute(name, value);
        }
        /**
         * @return {?}
         */
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatChipTrailingIcon.prototype._foundation;
    /**
     * @type {?}
     * @private
     */
    MatChipTrailingIcon.prototype._adapter;
    /** @type {?} */
    MatChipTrailingIcon.prototype._elementRef;
}
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * \@docs-private
 */
class MatChipRemoveBase extends MatChipTrailingIcon {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
    }
}
/** @type {?} */
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
    class MatChipRemove extends _MatChipRemoveMixinBase {
        /**
         * @param {?} elementRef
         */
        constructor(elementRef) {
            super(elementRef);
            /**
             * Emits when the user interacts with the icon.
             * \@docs-private
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
if (false) {
    /** @type {?} */
    MatChipRemove.ngAcceptInputType_disabled;
    /**
     * Emits when the user interacts with the icon.
     * \@docs-private
     * @type {?}
     */
    MatChipRemove.prototype.interaction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUtMLGFBQWEsRUFDYixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQStCLCtCQUErQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUYsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFPN0I7Ozs7O0lBQUEsTUFPYSxhQUFhOzs7OztRQUN4QixZQUFvQixrQkFBcUMsRUFDckMsV0FBb0M7WUFEcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtZQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFBRyxDQUFDOzs7Ozs7O1FBRzVELFFBQVEsQ0FBQyxRQUFnQixFQUFFLE1BQWU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztnQkFmRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSw0REFBNEQ7d0JBQ3JFLE1BQU0sRUFBRSxLQUFLO3FCQUNkO2lCQUNGOzs7O2dCQXZCTyxpQkFBaUI7Z0JBQWEsVUFBVTs7SUFpQ2hELG9CQUFDO0tBQUE7U0FUWSxhQUFhOzs7Ozs7SUFDWiwyQ0FBNkM7Ozs7O0lBQzdDLG9DQUE0Qzs7Ozs7O0FBYTFEOzs7OztJ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QUFFLFVBQVU7d0JBQ3hCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixTQUFTLEVBQUUsMEJBQTBCO3dCQUNyQyxXQUFXLEVBQUUsMEJBQTBCOzt3QkFHdkMsb0JBQW9CLEVBQUUsTUFBTTtxQkFDN0I7aUJBQ0Y7Ozs7Z0JBcEpxQyxVQUFVOztJQXFLaEQsb0JBQUM7S0FBQTtTQWhCWSxhQUFhOzs7SUFleEIseUNBQWdEOzs7Ozs7SUFWaEQsb0NBQTZGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIEhhc1RhYkluZGV4LFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluVGFiSW5kZXgsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNRENDaGlwVHJhaWxpbmdBY3Rpb25BZGFwdGVyLCBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gY2hpcCBsZWFkaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLWF2YXRhciwgW21hdENoaXBBdmF0YXJdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtYXZhdGFyIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS1sZWFkaW5nJyxcbiAgICAncm9sZSc6ICdpbWcnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEF2YXRhciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgLyoqIFNldHMgd2hldGhlciB0aGUgZ2l2ZW4gQ1NTIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBsZWFkaW5nIGljb24uICovXG4gIHNldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNzc0NsYXNzLCBhY3RpdmUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBhbmQgY29uZmlndXJlIGF0dHJpYnV0ZXMgZm9yIGNoaXAgdHJhaWxpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtdHJhaWxpbmctaWNvbiwgW21hdENoaXBUcmFpbGluZ0ljb25dJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6XG4gICAgICAgICdtYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmcnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBUcmFpbGluZ0ljb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9uO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENDaGlwVHJhaWxpbmdBY3Rpb25BZGFwdGVyID0ge1xuICAgIGZvY3VzOiAoKSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSxcbiAgICBnZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOlxuICAgICAgICAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHRoZXJlJ3MgYWxzbyBhIGB0cmlnZ2VyYCBwYXJhbWV0ZXIgdGhhdCB0aGUgY2hpcCBpc24ndFxuICAgIC8vIGhhbmRsaW5nIHlldC4gQ29uc2lkZXIgcGFzc2luZyBpdCBhbG9uZyBvbmNlIE1EQyBzdGFydCB1c2luZyBpdC5cbiAgICBub3RpZnlJbnRlcmFjdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeUludGVyYWN0aW9uKCk7XG4gICAgICAgIH0sXG5cbiAgICAvLyBUT0RPKGNyaXNiZXRvKTogdGhlcmUncyBhbHNvIGEgYGtleWAgcGFyYW1ldGVyIHRoYXQgdGhlIGNoaXAgaXNuJ3RcbiAgICAvLyBoYW5kbGluZyB5ZXQuIENvbnNpZGVyIHBhc3NpbmcgaXQgYWxvbmcgb25jZSBNREMgc3RhcnQgdXNpbmcgaXQuXG4gICAgbm90aWZ5TmF2aWdhdGlvbjpcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB1bmNvbW1lbnQgdGhpcyBjb2RlIG9uY2Ugd2UndmUgaW52ZXJ0ZWQgdGhlXG4gICAgICAgICAgLy8gZGVwZW5kZW5jeSBvbiBgTWF0Q2hpcGAuIHRoaXMuX2NoaXAuX25vdGlmeU5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgLy8gVE9ETyhjcmlzYmV0byk6IGN1cnJlbnRseSB0aGUgY2hpcCBuZWVkcyBhIHJlZmVyZW5jZSB0byB0aGUgdHJhaWxpbmdcbiAgICAgIC8vIGljb24gZm9yIHRoZSBkZXByZWNhdGVkIGBzZXRUcmFpbGluZ0FjdGlvbkF0dHJgIG1ldGhvZC4gVW50aWwgdGhlXG4gICAgICAvLyBtZXRob2QgaXMgcmVtb3ZlZCwgd2UgY2FuJ3QgdXNlIHRoZSBjaGlwIGhlcmUsIGJlY2F1c2UgaXQgY2F1c2VzIGFcbiAgICAgIC8vIGNpcmN1bGFyIGltcG9ydC4gcHJpdmF0ZSBfY2hpcDogTWF0Q2hpcFxuICApIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBUcmFpbGluZ0FjdGlvbkZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIFNldHMgYW4gYXR0cmlidXRlIG9uIHRoZSBpY29uLiAqL1xuICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBpc05hdmlnYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5pc05hdmlnYWJsZSgpO1xuICB9XG59XG5cbi8qKlxuICogQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGlwUmVtb3ZlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jbGFzcyBNYXRDaGlwUmVtb3ZlQmFzZSBleHRlbmRzIE1hdENoaXBUcmFpbGluZ0ljb24ge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG4gIH1cbn1cblxuY29uc3QgX01hdENoaXBSZW1vdmVNaXhpbkJhc2U6XG4gIENhbkRpc2FibGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgdHlwZW9mIE1hdENoaXBSZW1vdmVCYXNlID1cbiAgICBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWF0Q2hpcFJlbW92ZUJhc2UpLCAwKTtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gcmVtb3ZlIHRoZSBwYXJlbnQgY2hpcCB3aGVuIHRoZSB0cmFpbGluZyBpY29uIGlzIGNsaWNrZWQgb3JcbiAqIHdoZW4gdGhlIEVOVEVSIGtleSBpcyBwcmVzc2VkIG9uIGl0LlxuICpcbiAqIFJlY29tbWVuZGVkIGZvciB1c2Ugd2l0aCB0aGUgTWF0ZXJpYWwgRGVzaWduIFwiY2FuY2VsXCIgaWNvblxuICogYXZhaWxhYmxlIGF0IGh0dHBzOi8vbWF0ZXJpYWwuaW8vaWNvbnMvI2ljX2NhbmNlbC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogPG1hdC1jaGlwPlxuICogICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICogPC9tYXQtY2hpcD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcFJlbW92ZV0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6IGBtYXQtbWRjLWNoaXAtcmVtb3ZlIG1hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yXG4gICAgICAgIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS10cmFpbGluZ2AsXG4gICAgJ1t0YWJJbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICdyb2xlJzogJ2J1dHRvbicsXG4gICAgJyhjbGljayknOiAnaW50ZXJhY3Rpb24ubmV4dCgkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ2ludGVyYWN0aW9uLm5leHQoJGV2ZW50KScsXG5cbiAgICAvLyBXZSBuZWVkIHRvIHJlbW92ZSB0aGlzIGV4cGxpY2l0bHksIGJlY2F1c2UgaXQgZ2V0cyBpbmhlcml0ZWQgZnJvbSBNYXRDaGlwVHJhaWxpbmdJY29uLlxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnbnVsbCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJlbW92ZSBleHRlbmRzIF9NYXRDaGlwUmVtb3ZlTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgge1xuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgaWNvbi5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgaW50ZXJhY3Rpb246IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgaWYgKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=