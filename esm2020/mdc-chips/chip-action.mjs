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
import { mixinTabIndex } from '@angular/material/core';
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
MatChipAction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatChipAction, deps: [{ token: i0.ElementRef }, { token: MAT_CHIP }], target: i0.ɵɵFactoryTarget.Directive });
MatChipAction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatChipAction, selector: "[matChipAction]", inputs: { disabled: "disabled", tabIndex: "tabIndex", isInteractive: "isInteractive" }, host: { listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "class.mdc-evolution-chip__action--primary": "_isPrimary", "class.mdc-evolution-chip__action--presentational": "_isPrimary", "class.mdc-evolution-chip__action--trailing": "!_isPrimary", "attr.tabindex": "(disabled || !isInteractive) ? null : tabIndex", "attr.disabled": "disabled ? '' : null", "attr.aria-disabled": "disabled" }, classAttribute: "mdc-evolution-chip__action mat-mdc-chip-action" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatChipAction, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFjLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBRWxDLE1BQWUsa0JBQWtCO0NBRWhDO0FBRUQsTUFBTSx1QkFBdUIsR0FBRyxhQUFhLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV0RTs7O0dBR0c7QUFrQkgsTUFBTSxPQUFPLGFBQWMsU0FBUSx1QkFBdUI7SUFpQnhELFlBQ1MsV0FBb0MsRUFFakMsV0FJVDtRQUVELEtBQUssRUFBRSxDQUFDO1FBUkQsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBRWpDLGdCQUFXLEdBQVgsV0FBVyxDQUlwQjtRQXZCSCx5Q0FBeUM7UUFDaEMsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFOUIsc0RBQXNEO1FBQ3RELGVBQVUsR0FBRyxJQUFJLENBQUM7UUFVVixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBYXhCLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ25ELFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUF4QkQsc0NBQXNDO0lBQ3RDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBbUJELEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWlCO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMzRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFvQjtRQUNqQyxJQUNFLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNkLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQ2Y7WUFDQSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQzs7MEdBdERVLGFBQWEsNENBbUJkLFFBQVE7OEZBbkJQLGFBQWE7MkZBQWIsYUFBYTtrQkFqQnpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDaEMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxnREFBZ0Q7d0JBQ3pELDZDQUE2QyxFQUFFLFlBQVk7d0JBQzNELDRGQUE0Rjt3QkFDNUYsa0VBQWtFO3dCQUNsRSxvREFBb0QsRUFBRSxZQUFZO3dCQUNsRSw4Q0FBOEMsRUFBRSxhQUFhO3dCQUM3RCxpQkFBaUIsRUFBRSxnREFBZ0Q7d0JBQ25FLGlCQUFpQixFQUFFLHNCQUFzQjt3QkFDekMsc0JBQXNCLEVBQUUsVUFBVTt3QkFDbEMsU0FBUyxFQUFFLHNCQUFzQjt3QkFDakMsV0FBVyxFQUFFLHdCQUF3QjtxQkFDdEM7aUJBQ0Y7OzBCQW9CSSxNQUFNOzJCQUFDLFFBQVE7NENBakJULGFBQWE7c0JBQXJCLEtBQUs7Z0JBT0YsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0VOVEVSLCBTUEFDRX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SGFzVGFiSW5kZXgsIG1peGluVGFiSW5kZXh9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNQVRfQ0hJUH0gZnJvbSAnLi90b2tlbnMnO1xuXG5hYnN0cmFjdCBjbGFzcyBfTWF0Q2hpcEFjdGlvbkJhc2Uge1xuICBhYnN0cmFjdCBkaXNhYmxlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgX01hdENoaXBBY3Rpb25NaXhpbkJhc2UgPSBtaXhpblRhYkluZGV4KF9NYXRDaGlwQWN0aW9uQmFzZSwgLTEpO1xuXG4vKipcbiAqIFNlY3Rpb24gd2l0aGluIGEgY2hpcC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdENoaXBBY3Rpb25dJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWRjLWV2b2x1dGlvbi1jaGlwX19hY3Rpb24gbWF0LW1kYy1jaGlwLWFjdGlvbicsXG4gICAgJ1tjbGFzcy5tZGMtZXZvbHV0aW9uLWNoaXBfX2FjdGlvbi0tcHJpbWFyeV0nOiAnX2lzUHJpbWFyeScsXG4gICAgLy8gTm90ZSB0aGF0IHdoaWxlIG91ciBhY3Rpb25zIGFyZSBpbnRlcmFjdGl2ZSwgd2UgaGF2ZSB0byBhZGQgdGhlIGAtLXByZXNlbnRhdGlvbmFsYCBjbGFzcyxcbiAgICAvLyBpbiBvcmRlciB0byBhdm9pZCBzb21lIHN1cGVyLXNwZWNpZmljIGA6aG92ZXJgIHN0eWxlcyBmcm9tIE1EQy5cbiAgICAnW2NsYXNzLm1kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uLS1wcmVzZW50YXRpb25hbF0nOiAnX2lzUHJpbWFyeScsXG4gICAgJ1tjbGFzcy5tZGMtZXZvbHV0aW9uLWNoaXBfX2FjdGlvbi0tdHJhaWxpbmddJzogJyFfaXNQcmltYXJ5JyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJyhkaXNhYmxlZCB8fCAhaXNJbnRlcmFjdGl2ZSkgPyBudWxsIDogdGFiSW5kZXgnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiBcImRpc2FibGVkID8gJycgOiBudWxsXCIsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEFjdGlvbiBleHRlbmRzIF9NYXRDaGlwQWN0aW9uTWl4aW5CYXNlIGltcGxlbWVudHMgSGFzVGFiSW5kZXgge1xuICAvKiogV2hldGhlciB0aGUgYWN0aW9uIGlzIGludGVyYWN0aXZlLiAqL1xuICBASW5wdXQoKSBpc0ludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGlzIGlzIHRoZSBwcmltYXJ5IGFjdGlvbiBpbiB0aGUgY2hpcC4gKi9cbiAgX2lzUHJpbWFyeSA9IHRydWU7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGFjdGlvbiBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCB0aGlzLl9wYXJlbnRDaGlwLmRpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBASW5qZWN0KE1BVF9DSElQKVxuICAgIHByb3RlY3RlZCBfcGFyZW50Q2hpcDoge1xuICAgICAgX2hhbmRsZVByaW1hcnlBY3Rpb25JbnRlcmFjdGlvbigpOiB2b2lkO1xuICAgICAgcmVtb3ZlKCk6IHZvaWQ7XG4gICAgICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICB9LFxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgICBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICB9XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIF9oYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmlzSW50ZXJhY3RpdmUgJiYgdGhpcy5faXNQcmltYXJ5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5fcGFyZW50Q2hpcC5faGFuZGxlUHJpbWFyeUFjdGlvbkludGVyYWN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoXG4gICAgICAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIgfHwgZXZlbnQua2V5Q29kZSA9PT0gU1BBQ0UpICYmXG4gICAgICAhdGhpcy5kaXNhYmxlZCAmJlxuICAgICAgdGhpcy5pc0ludGVyYWN0aXZlICYmXG4gICAgICB0aGlzLl9pc1ByaW1hcnlcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9wYXJlbnRDaGlwLl9oYW5kbGVQcmltYXJ5QWN0aW9uSW50ZXJhY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==