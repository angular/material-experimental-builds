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
                }
            },] }
];
MatChipAvatar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
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
                }
            },] }
];
MatChipTrailingIcon.ctorParameters = () => [
    { type: ElementRef }
];
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
                }
            },] }
];
MatChipRemove.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUtMLGFBQWEsRUFDYixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQStCLCtCQUErQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUYsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUc3Qjs7O0dBR0c7QUFRSCxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUFvQixrQkFBcUMsRUFDckMsV0FBb0M7UUFEcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7SUFBRyxDQUFDO0lBRTVELDhFQUE4RTtJQUM5RSxRQUFRLENBQUMsUUFBZ0IsRUFBRSxNQUFlO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7WUFmRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSw0REFBNEQ7b0JBQ3JFLE1BQU0sRUFBRSxLQUFLO2lCQUNkO2FBQ0Y7OztZQXZCTyxpQkFBaUI7WUFBYSxVQUFVOztBQW1DaEQ7OztHQUdHO0FBVUgsTUFBTSxPQUFPLG1CQUFtQjtJQTJCOUIsWUFDVyxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdB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cUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbkRpc2FibGUsXG4gIENhbkRpc2FibGVDdG9yLFxuICBIYXNUYWJJbmRleCxcbiAgSGFzVGFiSW5kZXhDdG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpblRhYkluZGV4LFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TURDQ2hpcFRyYWlsaW5nQWN0aW9uQWRhcHRlciwgTURDQ2hpcFRyYWlsaW5nQWN0aW9uRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzc2VzIHRvIGNoaXAgbGVhZGluZyBpY29uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hpcC1hdmF0YXIsIFttYXRDaGlwQXZhdGFyXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLWF2YXRhciBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tbGVhZGluZycsXG4gICAgJ3JvbGUnOiAnaW1nJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBBdmF0YXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgbGVhZGluZyBpY29uLiAqL1xuICBzZXRDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjc3NDbGFzcywgYWN0aXZlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gYW5kIGNvbmZpZ3VyZSBhdHRyaWJ1dGVzIGZvciBjaGlwIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXRyYWlsaW5nLWljb24sIFttYXRDaGlwVHJhaWxpbmdJY29uXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOlxuICAgICAgICAnbWF0LW1kYy1jaGlwLXRyYWlsaW5nLWljb24gbWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwVHJhaWxpbmdJY29uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZm91bmRhdGlvbjogTURDQ2hpcFRyYWlsaW5nQWN0aW9uRm91bmRhdGlvbjtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDQ2hpcFRyYWlsaW5nQWN0aW9uQWRhcHRlciA9IHtcbiAgICBmb2N1czogKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCksXG4gICAgZ2V0QXR0cmlidXRlOiAobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpLFxuICAgIHNldEF0dHJpYnV0ZTpcbiAgICAgICAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB0aGVyZSdzIGFsc28gYSBgdHJpZ2dlcmAgcGFyYW1ldGVyIHRoYXQgdGhlIGNoaXAgaXNuJ3RcbiAgICAvLyBoYW5kbGluZyB5ZXQuIENvbnNpZGVyIHBhc3NpbmcgaXQgYWxvbmcgb25jZSBNREMgc3RhcnQgdXNpbmcgaXQuXG4gICAgbm90aWZ5SW50ZXJhY3Rpb246XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBUT0RPKGNyaXNiZXRvKTogdW5jb21tZW50IHRoaXMgY29kZSBvbmNlIHdlJ3ZlIGludmVydGVkIHRoZVxuICAgICAgICAgIC8vIGRlcGVuZGVuY3kgb24gYE1hdENoaXBgLiB0aGlzLl9jaGlwLl9ub3RpZnlJbnRlcmFjdGlvbigpO1xuICAgICAgICB9LFxuXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHRoZXJlJ3MgYWxzbyBhIGBrZXlgIHBhcmFtZXRlciB0aGF0IHRoZSBjaGlwIGlzbid0XG4gICAgLy8gaGFuZGxpbmcgeWV0LiBDb25zaWRlciBwYXNzaW5nIGl0IGFsb25nIG9uY2UgTURDIHN0YXJ0IHVzaW5nIGl0LlxuICAgIG5vdGlmeU5hdmlnYXRpb246XG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBUT0RPKGNyaXNiZXRvKTogdW5jb21tZW50IHRoaXMgY29kZSBvbmNlIHdlJ3ZlIGludmVydGVkIHRoZVxuICAgICAgICAgIC8vIGRlcGVuZGVuY3kgb24gYE1hdENoaXBgLiB0aGlzLl9jaGlwLl9ub3RpZnlOYXZpZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiBjdXJyZW50bHkgdGhlIGNoaXAgbmVlZHMgYSByZWZlcmVuY2UgdG8gdGhlIHRyYWlsaW5nXG4gICAgICAvLyBpY29uIGZvciB0aGUgZGVwcmVjYXRlZCBgc2V0VHJhaWxpbmdBY3Rpb25BdHRyYCBtZXRob2QuIFVudGlsIHRoZVxuICAgICAgLy8gbWV0aG9kIGlzIHJlbW92ZWQsIHdlIGNhbid0IHVzZSB0aGUgY2hpcCBoZXJlLCBiZWNhdXNlIGl0IGNhdXNlcyBhXG4gICAgICAvLyBjaXJjdWxhciBpbXBvcnQuIHByaXZhdGUgX2NoaXA6IE1hdENoaXBcbiAgKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENDaGlwVHJhaWxpbmdBY3Rpb25Gb3VuZGF0aW9uKHRoaXMuX2FkYXB0ZXIpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBTZXRzIGFuIGF0dHJpYnV0ZSBvbiB0aGUgaWNvbi4gKi9cbiAgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgaXNOYXZpZ2FibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvdW5kYXRpb24uaXNOYXZpZ2FibGUoKTtcbiAgfVxufVxuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcFJlbW92ZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY2xhc3MgTWF0Q2hpcFJlbW92ZUJhc2UgZXh0ZW5kcyBNYXRDaGlwVHJhaWxpbmdJY29uIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICB9XG59XG5cbmNvbnN0IF9NYXRDaGlwUmVtb3ZlTWl4aW5CYXNlOlxuICBDYW5EaXNhYmxlQ3RvciAmXG4gIEhhc1RhYkluZGV4Q3RvciAmXG4gIHR5cGVvZiBNYXRDaGlwUmVtb3ZlQmFzZSA9XG4gICAgbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1hdENoaXBSZW1vdmVCYXNlKSwgMCk7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIHJlbW92ZSB0aGUgcGFyZW50IGNoaXAgd2hlbiB0aGUgdHJhaWxpbmcgaWNvbiBpcyBjbGlja2VkIG9yXG4gKiB3aGVuIHRoZSBFTlRFUiBrZXkgaXMgcHJlc3NlZCBvbiBpdC5cbiAqXG4gKiBSZWNvbW1lbmRlZCBmb3IgdXNlIHdpdGggdGhlIE1hdGVyaWFsIERlc2lnbiBcImNhbmNlbFwiIGljb25cbiAqIGF2YWlsYWJsZSBhdCBodHRwczovL21hdGVyaWFsLmlvL2ljb25zLyNpY19jYW5jZWwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIDxtYXQtY2hpcD5cbiAqICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAqIDwvbWF0LWNoaXA+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENoaXBSZW1vdmVdJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiBgbWF0LW1kYy1jaGlwLXJlbW92ZSBtYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiBtYXQtbWRjLWZvY3VzLWluZGljYXRvclxuICAgICAgICBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmdgLFxuICAgICdbdGFiSW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAncm9sZSc6ICdidXR0b24nLFxuICAgICcoY2xpY2spJzogJ2ludGVyYWN0aW9uLm5leHQoJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdpbnRlcmFjdGlvbi5uZXh0KCRldmVudCknLFxuXG4gICAgLy8gV2UgbmVlZCB0byByZW1vdmUgdGhpcyBleHBsaWNpdGx5LCBiZWNhdXNlIGl0IGdldHMgaW5oZXJpdGVkIGZyb20gTWF0Q2hpcFRyYWlsaW5nSWNvbi5cbiAgICAnW2F0dHIuYXJpYS1oaWRkZW5dJzogJ251bGwnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBSZW1vdmUgZXh0ZW5kcyBfTWF0Q2hpcFJlbW92ZU1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIGljb24uXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGludGVyYWN0aW9uOiBTdWJqZWN0PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiA9IG5ldyBTdWJqZWN0PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIGlmIChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19