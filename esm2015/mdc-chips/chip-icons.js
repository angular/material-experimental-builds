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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUtMLGFBQWEsRUFDYixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQStCLCtCQUErQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUYsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFjN0IsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBQ3hCLFlBQW9CLGtCQUFxQyxFQUNyQyxXQUFvQztRQURwQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtJQUFHLENBQUM7Ozs7Ozs7SUFHNUQsUUFBUSxDQUFDLFFBQWdCLEVBQUUsTUFBZTtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7O1lBZkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsNERBQTREO29CQUNyRSxNQUFNLEVBQUUsS0FBSztpQkFDZDthQUNGOzs7O1lBdkJPLGlCQUFpQjtZQUFhLFVBQVU7Ozs7Ozs7SUF5QmxDLDJDQUE2Qzs7Ozs7SUFDN0Msb0NBQTRDOzs7Ozs7QUFzQjFELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUEyQjlCLFlBQ1csV0FBdUI7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QUFNO2lCQUM3QjthQUNGOzs7O1lBcEpxQyxVQUFVOzs7O0lBb0s5Qyx5Q0FBZ0Q7Ozs7OztJQVZoRCxvQ0FBNkYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlLFxuICBDYW5EaXNhYmxlQ3RvcixcbiAgSGFzVGFiSW5kZXgsXG4gIEhhc1RhYkluZGV4Q3RvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5UYWJJbmRleCxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01EQ0NoaXBUcmFpbGluZ0FjdGlvbkFkYXB0ZXIsIE1EQ0NoaXBUcmFpbGluZ0FjdGlvbkZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBjaGlwIGxlYWRpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtYXZhdGFyLCBbbWF0Q2hpcEF2YXRhcl0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hpcC1hdmF0YXIgbWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLWxlYWRpbmcnLFxuICAgICdyb2xlJzogJ2ltZydcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwQXZhdGFyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIGxlYWRpbmcgaWNvbi4gKi9cbiAgc2V0Q2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY3NzQ2xhc3MsIGFjdGl2ZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzc2VzIHRvIGFuZCBjb25maWd1cmUgYXR0cmlidXRlcyBmb3IgY2hpcCB0cmFpbGluZyBpY29uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hpcC10cmFpbGluZy1pY29uLCBbbWF0Q2hpcFRyYWlsaW5nSWNvbl0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzpcbiAgICAgICAgJ21hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS10cmFpbGluZycsXG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFRyYWlsaW5nSWNvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ0NoaXBUcmFpbGluZ0FjdGlvbkZvdW5kYXRpb247XG4gIHByaXZhdGUgX2FkYXB0ZXI6IE1EQ0NoaXBUcmFpbGluZ0FjdGlvbkFkYXB0ZXIgPSB7XG4gICAgZm9jdXM6ICgpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpLFxuICAgIGdldEF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT5cbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKSxcbiAgICBzZXRBdHRyaWJ1dGU6XG4gICAgICAgIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAvLyBUT0RPKGNyaXNiZXRvKTogdGhlcmUncyBhbHNvIGEgYHRyaWdnZXJgIHBhcmFtZXRlciB0aGF0IHRoZSBjaGlwIGlzbid0XG4gICAgLy8gaGFuZGxpbmcgeWV0LiBDb25zaWRlciBwYXNzaW5nIGl0IGFsb25nIG9uY2UgTURDIHN0YXJ0IHVzaW5nIGl0LlxuICAgIG5vdGlmeUludGVyYWN0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gVE9ETyhjcmlzYmV0byk6IHVuY29tbWVudCB0aGlzIGNvZGUgb25jZSB3ZSd2ZSBpbnZlcnRlZCB0aGVcbiAgICAgICAgICAvLyBkZXBlbmRlbmN5IG9uIGBNYXRDaGlwYC4gdGhpcy5fY2hpcC5fbm90aWZ5SW50ZXJhY3Rpb24oKTtcbiAgICAgICAgfSxcblxuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB0aGVyZSdzIGFsc28gYSBga2V5YCBwYXJhbWV0ZXIgdGhhdCB0aGUgY2hpcCBpc24ndFxuICAgIC8vIGhhbmRsaW5nIHlldC4gQ29uc2lkZXIgcGFzc2luZyBpdCBhbG9uZyBvbmNlIE1EQyBzdGFydCB1c2luZyBpdC5cbiAgICBub3RpZnlOYXZpZ2F0aW9uOlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gVE9ETyhjcmlzYmV0byk6IHVuY29tbWVudCB0aGlzIGNvZGUgb25jZSB3ZSd2ZSBpbnZlcnRlZCB0aGVcbiAgICAgICAgICAvLyBkZXBlbmRlbmN5IG9uIGBNYXRDaGlwYC4gdGhpcy5fY2hpcC5fbm90aWZ5TmF2aWdhdGlvbigpO1xuICAgICAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAvLyBUT0RPKGNyaXNiZXRvKTogY3VycmVudGx5IHRoZSBjaGlwIG5lZWRzIGEgcmVmZXJlbmNlIHRvIHRoZSB0cmFpbGluZ1xuICAgICAgLy8gaWNvbiBmb3IgdGhlIGRlcHJlY2F0ZWQgYHNldFRyYWlsaW5nQWN0aW9uQXR0cmAgbWV0aG9kLiBVbnRpbCB0aGVcbiAgICAgIC8vIG1ldGhvZCBpcyByZW1vdmVkLCB3ZSBjYW4ndCB1c2UgdGhlIGNoaXAgaGVyZSwgYmVjYXVzZSBpdCBjYXVzZXMgYVxuICAgICAgLy8gY2lyY3VsYXIgaW1wb3J0LiBwcml2YXRlIF9jaGlwOiBNYXRDaGlwXG4gICkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcFRyYWlsaW5nQWN0aW9uRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogU2V0cyBhbiBhdHRyaWJ1dGUgb24gdGhlIGljb24uICovXG4gIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIGlzTmF2aWdhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3VuZGF0aW9uLmlzTmF2aWdhYmxlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXBSZW1vdmUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmNsYXNzIE1hdENoaXBSZW1vdmVCYXNlIGV4dGVuZHMgTWF0Q2hpcFRyYWlsaW5nSWNvbiB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgfVxufVxuXG5jb25zdCBfTWF0Q2hpcFJlbW92ZU1peGluQmFzZTpcbiAgQ2FuRGlzYWJsZUN0b3IgJlxuICBIYXNUYWJJbmRleEN0b3IgJlxuICB0eXBlb2YgTWF0Q2hpcFJlbW92ZUJhc2UgPVxuICAgIG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNYXRDaGlwUmVtb3ZlQmFzZSksIDApO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byByZW1vdmUgdGhlIHBhcmVudCBjaGlwIHdoZW4gdGhlIHRyYWlsaW5nIGljb24gaXMgY2xpY2tlZCBvclxuICogd2hlbiB0aGUgRU5URVIga2V5IGlzIHByZXNzZWQgb24gaXQuXG4gKlxuICogUmVjb21tZW5kZWQgZm9yIHVzZSB3aXRoIHRoZSBNYXRlcmlhbCBEZXNpZ24gXCJjYW5jZWxcIiBpY29uXG4gKiBhdmFpbGFibGUgYXQgaHR0cHM6Ly9tYXRlcmlhbC5pby9pY29ucy8jaWNfY2FuY2VsLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiA8bWF0LWNoaXA+XG4gKiAgIDxtYXQtaWNvbiBtYXRDaGlwUmVtb3ZlPmNhbmNlbDwvbWF0LWljb24+XG4gKiA8L21hdC1jaGlwPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRDaGlwUmVtb3ZlXScsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogYG1hdC1tZGMtY2hpcC1yZW1vdmUgbWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24gbWF0LW1kYy1mb2N1cy1pbmRpY2F0b3JcbiAgICAgICAgbWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nYCxcbiAgICAnW3RhYkluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJ3JvbGUnOiAnYnV0dG9uJyxcbiAgICAnKGNsaWNrKSc6ICdpbnRlcmFjdGlvbi5uZXh0KCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnaW50ZXJhY3Rpb24ubmV4dCgkZXZlbnQpJyxcblxuICAgIC8vIFdlIG5lZWQgdG8gcmVtb3ZlIHRoaXMgZXhwbGljaXRseSwgYmVjYXVzZSBpdCBnZXRzIGluaGVyaXRlZCBmcm9tIE1hdENoaXBUcmFpbGluZ0ljb24uXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICdudWxsJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwUmVtb3ZlIGV4dGVuZHMgX01hdENoaXBSZW1vdmVNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBIYXNUYWJJbmRleCB7XG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBpY29uLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBpbnRlcmFjdGlvbjogU3ViamVjdDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gPSBuZXcgU3ViamVjdDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICBpZiAoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==