/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { mixinTabIndex } from '@angular/material-experimental/mdc-core';
import { MAT_CHIP } from './tokens';
import * as i0 from "@angular/core";
class _MatChipActionBase {
}
const _MatChipActionMixinBase = mixinTabIndex(_MatChipActionBase, -1);
/**
 * Section within a chip.
 * @docs-private
 */
export class MatChipAction extends _MatChipActionMixinBase {
    constructor(_elementRef, _parentChip) {
        super();
        this._elementRef = _elementRef;
        this._parentChip = _parentChip;
        /** Whether the action is interactive. */
        this.isInteractive = true;
        /** Whether this is the primary action in the chip. */
        this._isPrimary = true;
        this._disabled = false;
        if (_elementRef.nativeElement.nodeName === 'BUTTON') {
            _elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    /** Whether the action is disabled. */
    get disabled() {
        return this._disabled || this._parentChip.disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    _handleClick(event) {
        if (!this.disabled && this.isInteractive && this._isPrimary) {
            event.preventDefault();
            this._parentChip._handlePrimaryActionInteraction();
        }
    }
    _handleKeydown(event) {
        if ((event.keyCode === ENTER || event.keyCode === SPACE) &&
            !this.disabled &&
            this.isInteractive &&
            this._isPrimary) {
            event.preventDefault();
            this._parentChip._handlePrimaryActionInteraction();
        }
    }
}
MatChipAction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatChipAction, deps: [{ token: i0.ElementRef }, { token: MAT_CHIP }], target: i0.ɵɵFactoryTarget.Directive });
MatChipAction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0", type: MatChipAction, selector: "[matChipAction]", inputs: { disabled: "disabled", tabIndex: "tabIndex", isInteractive: "isInteractive" }, host: { listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "class.mdc-evolution-chip__action--primary": "_isPrimary", "class.mdc-evolution-chip__action--presentational": "_isPrimary", "class.mdc-evolution-chip__action--trailing": "!_isPrimary", "attr.tabindex": "(disabled || !isInteractive) ? null : tabIndex", "attr.disabled": "disabled ? '' : null", "attr.aria-disabled": "disabled" }, classAttribute: "mdc-evolution-chip__action mat-mdc-chip-action" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: MatChipAction, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matChipAction]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': 'mdc-evolution-chip__action mat-mdc-chip-action',
                        '[class.mdc-evolution-chip__action--primary]': '_isPrimary',
                        // Note that while our actions are interactive, we have to add the `--presentational` class,
                        // in order to avoid some super-specific `:hover` styles from MDC.
                        '[class.mdc-evolution-chip__action--presentational]': '_isPrimary',
                        '[class.mdc-evolution-chip__action--trailing]': '!_isPrimary',
                        '[attr.tabindex]': '(disabled || !isInteractive) ? null : tabIndex',
                        '[attr.disabled]': "disabled ? '' : null",
                        '[attr.aria-disabled]': 'disabled',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_CHIP]
                }] }]; }, propDecorators: { isInteractive: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFjLGFBQWEsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBRWxDLE1BQWUsa0JBQWtCO0NBRWhDO0FBRUQsTUFBTSx1QkFBdUIsR0FBRyxhQUFhLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV0RTs7O0dBR0c7QUFrQkgsTUFBTSxPQUFPLGFBQWMsU0FBUSx1QkFBdUI7SUFpQnhELFlBQ1MsV0FBb0MsRUFFakMsV0FJVDtRQUVELEtBQUssRUFBRSxDQUFDO1FBUkQsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBRWpDLGdCQUFXLEdBQVgsV0FBVyxDQUlwQjtRQXZCSCx5Q0FBeUM7UUFDaEMsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFOUIsc0RBQXNEO1FBQ3RELGVBQVUsR0FBRyxJQUFJLENBQUM7UUFVVixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBYXhCLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ25ELFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUF4QkQsc0NBQXNDO0lBQ3RDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBbUJELEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWlCO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMzRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFvQjtRQUNqQyxJQUNFLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNkLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQ2Y7WUFDQSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQzs7MEdBdERVLGFBQWEsNENBbUJkLFFBQVE7OEZBbkJQLGFBQWE7MkZBQWIsYUFBYTtrQkFqQnpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDaEMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxnREFBZ0Q7d0JBQ3pELDZDQUE2QyxFQUFFLFlBQVk7d0JBQzNELDRGQUE0Rjt3QkFDNUYsa0VBQWtFO3dCQUNsRSxvREFBb0QsRUFBRSxZQUFZO3dCQUNsRSw4Q0FBOEMsRUFBRSxhQUFhO3dCQUM3RCxpQkFBaUIsRUFBRSxnREFBZ0Q7d0JBQ25FLGlCQUFpQixFQUFFLHNCQUFzQjt3QkFDekMsc0JBQXNCLEVBQUUsVUFBVTt3QkFDbEMsU0FBUyxFQUFFLHNCQUFzQjt3QkFDakMsV0FBVyxFQUFFLHdCQUF3QjtxQkFDdEM7aUJBQ0Y7OzBCQW9CSSxNQUFNOzJCQUFDLFFBQVE7NENBakJULGFBQWE7c0JBQXJCLEtBQUs7Z0JBT0YsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0VOVEVSLCBTUEFDRX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SGFzVGFiSW5kZXgsIG1peGluVGFiSW5kZXh9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge01BVF9DSElQfSBmcm9tICcuL3Rva2Vucyc7XG5cbmFic3RyYWN0IGNsYXNzIF9NYXRDaGlwQWN0aW9uQmFzZSB7XG4gIGFic3RyYWN0IGRpc2FibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBfTWF0Q2hpcEFjdGlvbk1peGluQmFzZSA9IG1peGluVGFiSW5kZXgoX01hdENoaXBBY3Rpb25CYXNlLCAtMSk7XG5cbi8qKlxuICogU2VjdGlvbiB3aXRoaW4gYSBjaGlwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcEFjdGlvbl0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtZXZvbHV0aW9uLWNoaXBfX2FjdGlvbiBtYXQtbWRjLWNoaXAtYWN0aW9uJyxcbiAgICAnW2NsYXNzLm1kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uLS1wcmltYXJ5XSc6ICdfaXNQcmltYXJ5JyxcbiAgICAvLyBOb3RlIHRoYXQgd2hpbGUgb3VyIGFjdGlvbnMgYXJlIGludGVyYWN0aXZlLCB3ZSBoYXZlIHRvIGFkZCB0aGUgYC0tcHJlc2VudGF0aW9uYWxgIGNsYXNzLFxuICAgIC8vIGluIG9yZGVyIHRvIGF2b2lkIHNvbWUgc3VwZXItc3BlY2lmaWMgYDpob3ZlcmAgc3R5bGVzIGZyb20gTURDLlxuICAgICdbY2xhc3MubWRjLWV2b2x1dGlvbi1jaGlwX19hY3Rpb24tLXByZXNlbnRhdGlvbmFsXSc6ICdfaXNQcmltYXJ5JyxcbiAgICAnW2NsYXNzLm1kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uLS10cmFpbGluZ10nOiAnIV9pc1ByaW1hcnknLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnKGRpc2FibGVkIHx8ICFpc0ludGVyYWN0aXZlKSA/IG51bGwgOiB0YWJJbmRleCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6IFwiZGlzYWJsZWQgPyAnJyA6IG51bGxcIixcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19oYW5kbGVLZXlkb3duKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwQWN0aW9uIGV4dGVuZHMgX01hdENoaXBBY3Rpb25NaXhpbkJhc2UgaW1wbGVtZW50cyBIYXNUYWJJbmRleCB7XG4gIC8qKiBXaGV0aGVyIHRoZSBhY3Rpb24gaXMgaW50ZXJhY3RpdmUuICovXG4gIEBJbnB1dCgpIGlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgaXMgdGhlIHByaW1hcnkgYWN0aW9uIGluIHRoZSBjaGlwLiAqL1xuICBfaXNQcmltYXJ5ID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGUgYWN0aW9uIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8IHRoaXMuX3BhcmVudENoaXAuZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0NISVApXG4gICAgcHJvdGVjdGVkIF9wYXJlbnRDaGlwOiB7XG4gICAgICBfaGFuZGxlUHJpbWFyeUFjdGlvbkludGVyYWN0aW9uKCk6IHZvaWQ7XG4gICAgICByZW1vdmUoKTogdm9pZDtcbiAgICAgIGRpc2FibGVkOiBib29sZWFuO1xuICAgIH0sXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgX2hhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmIHRoaXMuaXNJbnRlcmFjdGl2ZSAmJiB0aGlzLl9pc1ByaW1hcnkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9wYXJlbnRDaGlwLl9oYW5kbGVQcmltYXJ5QWN0aW9uSW50ZXJhY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChcbiAgICAgIChldmVudC5rZXlDb2RlID09PSBFTlRFUiB8fCBldmVudC5rZXlDb2RlID09PSBTUEFDRSkgJiZcbiAgICAgICF0aGlzLmRpc2FibGVkICYmXG4gICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgJiZcbiAgICAgIHRoaXMuX2lzUHJpbWFyeVxuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX3BhcmVudENoaXAuX2hhbmRsZVByaW1hcnlBY3Rpb25JbnRlcmFjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIl19