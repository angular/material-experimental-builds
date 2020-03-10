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
import { ChangeDetectorRef, Directive, ElementRef, } from '@angular/core';
import { mixinDisabled, mixinTabIndex, } from '@angular/material/core';
import { Subject } from 'rxjs';
/**
 * Directive to add CSS classes to chip leading icon.
 * \@docs-private
 */
export class MatChipAvatar {
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
export class MatChipTrailingIcon {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
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
if (false) {
    /** @type {?} */
    MatChipTrailingIcon.prototype._elementRef;
}
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * \@docs-private
 */
class MatChipRemoveBase extends MatChipTrailingIcon {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        super(_elementRef);
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
export class MatChipRemove extends _MatChipRemoveMixinBase {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFLTCxhQUFhLEVBQ2IsYUFBYSxHQUNkLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFjN0IsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBQ3hCLFlBQW9CLGtCQUFxQyxFQUNyQyxXQUFvQztRQURwQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtJQUFHLENBQUM7Ozs7Ozs7SUFHNUQsUUFBUSxDQUFDLFFBQWdCLEVBQUUsTUFBZTtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBZkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsNERBQTREO29CQUNyRSxNQUFNLEVBQUUsS0FBSztpQkFDZDthQUNGOzs7O1lBekJDLGlCQUFpQjtZQUVqQixVQUFVOzs7Ozs7O0lBeUJFLDJDQUE2Qzs7Ozs7SUFDN0Msb0NBQTRDOzs7Ozs7QUFxQjFELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFDOUIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDOzs7O0lBRTlDLEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7O0lBR0QsWUFBWSxDQUFDLElBQVksRUFBRSxLQUFhO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7O1lBbEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0NBQStDO2dCQUN6RCxJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLG9FQUFvRTtvQkFDN0UsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGFBQWEsRUFBRSxNQUFNO2lCQUN0QjthQUNGOzs7O1lBOUNDLFVBQVU7Ozs7SUFnREUsMENBQThCOzs7Ozs7QUFnQjVDLE1BQU0saUJBQWtCLFNBQVEsbUJBQW1COzs7O0lBQ2pELFlBQVksV0FBdUI7UUFDakMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjs7TUFFSyx1QkFBdUIsR0FJekIsYUFBYSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQWdDdEQsTUFBTSxPQUFPLGFBQWMsU0FBUSx1QkFBdUI7Ozs7SUFPeEQsWUFBWSxVQUFzQjtRQUNoQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7O1FBSHBCLGdCQUFXLEdBQXdDLElBQUksT0FBTyxFQUE4QixDQUFDO1FBSzNGLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2xELFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztnQkFDaEMsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRTtnREFDbUM7b0JBQzVDLFlBQVksRUFBRSxVQUFVO29CQUN4QixNQUFNLEVBQUUsUUFBUTtvQkFDaEIsU0FBUyxFQUFFLDBCQUEwQjtvQkFDckMsV0FBVyxFQUFFLDBCQUEwQjs7b0JBR3ZDLG9CQUFvQixFQUFFLE1BQU07aUJBQzdCO2FBQ0Y7Ozs7WUF6R0MsVUFBVTs7OztJQXlIVix5Q0FBZ0Q7Ozs7OztJQVZoRCxvQ0FBNkYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGUsXG4gIENhbkRpc2FibGVDdG9yLFxuICBIYXNUYWJJbmRleCxcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpblRhYkluZGV4LFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzc2VzIHRvIGNoaXAgbGVhZGluZyBpY29uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hpcC1hdmF0YXIsIFttYXRDaGlwQXZhdGFyXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLWF2YXRhciBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tbGVhZGluZycsXG4gICAgJ3JvbGUnOiAnaW1nJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBBdmF0YXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgbGVhZGluZyBpY29uLiAqL1xuICBzZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjc3NDbGFzcywgYWN0aXZlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gYW5kIGNvbmZpZ3VyZSBhdHRyaWJ1dGVzIGZvciBjaGlwIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXRyYWlsaW5nLWljb24sIFttYXRDaGlwVHJhaWxpbmdJY29uXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24gbWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwVHJhaWxpbmdJY29uIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIFNldHMgYW4gYXR0cmlidXRlIG9uIHRoZSBpY29uLiAqL1xuICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXBSZW1vdmUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmNsYXNzIE1hdENoaXBSZW1vdmVCYXNlIGV4dGVuZHMgTWF0Q2hpcFRyYWlsaW5nSWNvbiB7XG4gIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICB9XG59XG5cbmNvbnN0IF9NYXRDaGlwUmVtb3ZlTWl4aW5CYXNlOlxuICBDYW5EaXNhYmxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIHR5cGVvZiBNYXRDaGlwUmVtb3ZlQmFzZSA9XG4gICAgbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1hdENoaXBSZW1vdmVCYXNlKSwgMCk7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIHJlbW92ZSB0aGUgcGFyZW50IGNoaXAgd2hlbiB0aGUgdHJhaWxpbmcgaWNvbiBpcyBjbGlja2VkIG9yXG4gKiB3aGVuIHRoZSBFTlRFUiBrZXkgaXMgcHJlc3NlZCBvbiBpdC5cbiAqXG4gKiBSZWNvbW1lbmRlZCBmb3IgdXNlIHdpdGggdGhlIE1hdGVyaWFsIERlc2lnbiBcImNhbmNlbFwiIGljb25cbiAqIGF2YWlsYWJsZSBhdCBodHRwczovL21hdGVyaWFsLmlvL2ljb25zLyNpY19jYW5jZWwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIDxtYXQtY2hpcD5cbiAqICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAqIDwvbWF0LWNoaXA+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENoaXBSZW1vdmVdJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiBgbWF0LW1kYy1jaGlwLXJlbW92ZSBtYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiBtYXQtbWRjLWZvY3VzLWluZGljYXRvclxuICAgICAgICBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmdgLFxuICAgICdbdGFiSW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAncm9sZSc6ICdidXR0b24nLFxuICAgICcoY2xpY2spJzogJ2ludGVyYWN0aW9uLm5leHQoJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdpbnRlcmFjdGlvbi5uZXh0KCRldmVudCknLFxuXG4gICAgLy8gV2UgbmVlZCB0byByZW1vdmUgdGhpcyBleHBsaWNpdGx5LCBiZWNhdXNlIGl0IGdldHMgaW5oZXJpdGVkIGZyb20gTWF0Q2hpcFRyYWlsaW5nSWNvbi5cbiAgICAnW2F0dHIuYXJpYS1oaWRkZW5dJzogJ251bGwnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBSZW1vdmUgZXh0ZW5kcyBfTWF0Q2hpcFJlbW92ZU1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIGljb24uXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGludGVyYWN0aW9uOiBTdWJqZWN0PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiA9IG5ldyBTdWJqZWN0PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIGlmIChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19