/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, ElementRef, Inject, Input, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MDCChipActionType, MDCChipPrimaryActionFoundation, } from '@material/chips';
import { emitCustomEvent } from './emit-event';
import { mixinDisabled, mixinTabIndex, } from '@angular/material-experimental/mdc-core';
import * as i0 from "@angular/core";
const _MatChipActionMixinBase = mixinTabIndex(mixinDisabled(class {
}), -1);
/**
 * Interactive element within a chip.
 * @docs-private
 */
export class MatChipAction extends _MatChipActionMixinBase {
    constructor(_elementRef, _document, _changeDetectorRef) {
        super();
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._adapter = {
            focus: () => this.focus(),
            getAttribute: (name) => this._elementRef.nativeElement.getAttribute(name),
            setAttribute: (name, value) => {
                // MDC tries to update the tabindex directly in the DOM when navigating using the keyboard
                // which overrides our own handling. If we detect such a case, assign it to the same property
                // as the Angular binding in order to maintain consistency.
                if (name === 'tabindex') {
                    this._updateTabindex(parseInt(value));
                }
                else {
                    this._elementRef.nativeElement.setAttribute(name, value);
                }
            },
            removeAttribute: (name) => {
                if (name !== 'tabindex') {
                    this._elementRef.nativeElement.removeAttribute(name);
                }
            },
            getElementID: () => this._elementRef.nativeElement.id,
            emitEvent: (eventName, data) => {
                emitCustomEvent(this._elementRef.nativeElement, this._document, eventName, data, true);
            },
        };
        /** Whether the action is interactive. */
        this.isInteractive = true;
        this._foundation = this._createFoundation(this._adapter);
        if (_elementRef.nativeElement.nodeName === 'BUTTON') {
            _elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    _handleClick(event) {
        // Usually these events can't happen while the chip is disabled since the browser won't
        // allow them which is what MDC seems to rely on, however the event can be faked in tests.
        if (!this.disabled && this.isInteractive) {
            this._foundation.handleClick();
            event.preventDefault();
        }
    }
    _handleKeydown(event) {
        // Usually these events can't happen while the chip is disabled since the browser won't
        // allow them which is what MDC seems to rely on, however the event can be faked in tests.
        if (!this.disabled && this.isInteractive) {
            this._foundation.handleKeydown(event);
        }
    }
    _createFoundation(adapter) {
        return new MDCChipPrimaryActionFoundation(adapter);
    }
    ngAfterViewInit() {
        this._foundation.init();
        this._foundation.setDisabled(this.disabled);
    }
    ngOnChanges(changes) {
        if (changes['disabled']) {
            this._foundation.setDisabled(this.disabled);
        }
    }
    ngOnDestroy() {
        this._foundation.destroy();
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    _getFoundation() {
        return this._foundation;
    }
    _updateTabindex(value) {
        this.tabIndex = value;
        this._changeDetectorRef.markForCheck();
    }
}
MatChipAction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatChipAction, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
MatChipAction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "14.0.0-next.15", type: MatChipAction, selector: "[matChipAction]", inputs: { disabled: "disabled", tabIndex: "tabIndex", isInteractive: "isInteractive" }, host: { listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "class.mdc-evolution-chip__action--primary": "_getFoundation().actionType() === 1", "class.mdc-evolution-chip__action--presentational": "_getFoundation().actionType() === 1", "class.mdc-evolution-chip__action--trailing": "_getFoundation().actionType() === 2", "attr.tabindex": "(disabled || !isInteractive) ? null : tabIndex", "attr.disabled": "disabled ? '' : null", "attr.aria-disabled": "disabled" }, classAttribute: "mdc-evolution-chip__action mat-mdc-chip-action" }, usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15", ngImport: i0, type: MatChipAction, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matChipAction]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': 'mdc-evolution-chip__action mat-mdc-chip-action',
                        '[class.mdc-evolution-chip__action--primary]': `_getFoundation().actionType() === ${MDCChipActionType.PRIMARY}`,
                        // Note that while our actions are interactive, we have to add the `--presentational` class,
                        // in order to avoid some super-specific `:hover` styles from MDC.
                        '[class.mdc-evolution-chip__action--presentational]': `_getFoundation().actionType() === ${MDCChipActionType.PRIMARY}`,
                        '[class.mdc-evolution-chip__action--trailing]': `_getFoundation().actionType() === ${MDCChipActionType.TRAILING}`,
                        '[attr.tabindex]': '(disabled || !isInteractive) ? null : tabIndex',
                        '[attr.disabled]': "disabled ? '' : null",
                        '[attr.aria-disabled]': 'disabled',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { isInteractive: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUdMLGlCQUFpQixFQUNqQiw4QkFBOEIsR0FDL0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFHTCxhQUFhLEVBQ2IsYUFBYSxHQUNkLE1BQU0seUNBQXlDLENBQUM7O0FBRWpELE1BQU0sdUJBQXVCLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQztDQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTNFOzs7R0FHRztBQWtCSCxNQUFNLE9BQU8sYUFDWCxTQUFRLHVCQUF1QjtJQXFEL0IsWUFDUyxXQUF1QixFQUNaLFNBQWMsRUFDeEIsa0JBQXFDO1FBRTdDLEtBQUssRUFBRSxDQUFDO1FBSkQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFFdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQW5EdkMsYUFBUSxHQUF5QjtZQUN2QyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN6QixZQUFZLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDakYsWUFBWSxFQUFFLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxF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QUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDOztrSEE3RlUsYUFBYSw0Q0F3RGQsUUFBUTtzR0F4RFAsYUFBYTttR0FBYixhQUFhO2tCQWpCekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGdEQUFnRDt3QkFDekQsNkNBQTZDLEVBQUUscUNBQXFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRTt3QkFDL0csNEZBQTRGO3dCQUM1RixrRUFBa0U7d0JBQ2xFLG9EQUFvRCxFQUFFLHFDQUFxQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7d0JBQ3RILDhDQUE4QyxFQUFFLHFDQUFxQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7d0JBQ2pILGlCQUFpQixFQUFFLGdEQUFnRDt3QkFDbkUsaUJBQWlCLEVBQUUsc0JBQXNCO3dCQUN6QyxzQkFBc0IsRUFBRSxVQUFVO3dCQUNsQyxTQUFTLEVBQUUsc0JBQXNCO3dCQUNqQyxXQUFXLEVBQUUsd0JBQXdCO3FCQUN0QztpQkFDRjs7MEJBeURJLE1BQU07MkJBQUMsUUFBUTs0RUF6QlQsYUFBYTtzQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgTURDQ2hpcEFjdGlvbkFkYXB0ZXIsXG4gIE1EQ0NoaXBBY3Rpb25Gb3VuZGF0aW9uLFxuICBNRENDaGlwQWN0aW9uVHlwZSxcbiAgTURDQ2hpcFByaW1hcnlBY3Rpb25Gb3VuZGF0aW9uLFxufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtlbWl0Q3VzdG9tRXZlbnR9IGZyb20gJy4vZW1pdC1ldmVudCc7XG5pbXBvcnQge1xuICBDYW5EaXNhYmxlLFxuICBIYXNUYWJJbmRleCxcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5UYWJJbmRleCxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcblxuY29uc3QgX01hdENoaXBBY3Rpb25NaXhpbkJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoY2xhc3Mge30pLCAtMSk7XG5cbi8qKlxuICogSW50ZXJhY3RpdmUgZWxlbWVudCB3aXRoaW4gYSBjaGlwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcEFjdGlvbl0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtZXZvbHV0aW9uLWNoaXBfX2FjdGlvbiBtYXQtbWRjLWNoaXAtYWN0aW9uJyxcbiAgICAnW2NsYXNzLm1kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uLS1wcmltYXJ5XSc6IGBfZ2V0Rm91bmRhdGlvbigpLmFjdGlvblR5cGUoKSA9PT0gJHtNRENDaGlwQWN0aW9uVHlwZS5QUklNQVJZfWAsXG4gICAgLy8gTm90ZSB0aGF0IHdoaWxlIG91ciBhY3Rpb25zIGFyZSBpbnRlcmFjdGl2ZSwgd2UgaGF2ZSB0byBhZGQgdGhlIGAtLXByZXNlbnRhdGlvbmFsYCBjbGFzcyxcbiAgICAvLyBpbiBvcmRlciB0byBhdm9pZCBzb21lIHN1cGVyLXNwZWNpZmljIGA6aG92ZXJgIHN0eWxlcyBmcm9tIE1EQy5cbiAgICAnW2NsYXNzLm1kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uLS1wcmVzZW50YXRpb25hbF0nOiBgX2dldEZvdW5kYXRpb24oKS5hY3Rpb25UeXBlKCkgPT09ICR7TURDQ2hpcEFjdGlvblR5cGUuUFJJTUFSWX1gLFxuICAgICdbY2xhc3MubWRjLWV2b2x1dGlvbi1jaGlwX19hY3Rpb24tLXRyYWlsaW5nXSc6IGBfZ2V0Rm91bmRhdGlvbigpLmFjdGlvblR5cGUoKSA9PT0gJHtNRENDaGlwQWN0aW9uVHlwZS5UUkFJTElOR31gLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnKGRpc2FibGVkIHx8ICFpc0ludGVyYWN0aXZlKSA/IG51bGwgOiB0YWJJbmRleCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6IFwiZGlzYWJsZWQgPyAnJyA6IG51bGxcIixcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19oYW5kbGVLZXlkb3duKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwQWN0aW9uXG4gIGV4dGVuZHMgX01hdENoaXBBY3Rpb25NaXhpbkJhc2VcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIEhhc1RhYkluZGV4LCBPbkNoYW5nZXNcbntcbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENDaGlwQWN0aW9uRm91bmRhdGlvbjtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDQ2hpcEFjdGlvbkFkYXB0ZXIgPSB7XG4gICAgZm9jdXM6ICgpID0+IHRoaXMuZm9jdXMoKSxcbiAgICBnZXRBdHRyaWJ1dGU6IChuYW1lOiBzdHJpbmcpID0+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSksXG4gICAgc2V0QXR0cmlidXRlOiAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAvLyBNREMgdHJpZXMgdG8gdXBkYXRlIHRoZSB0YWJpbmRleCBkaXJlY3RseSBpbiB0aGUgRE9NIHdoZW4gbmF2aWdhdGluZyB1c2luZyB0aGUga2V5Ym9hcmRcbiAgICAgIC8vIHdoaWNoIG92ZXJyaWRlcyBvdXIgb3duIGhhbmRsaW5nLiBJZiB3ZSBkZXRlY3Qgc3VjaCBhIGNhc2UsIGFzc2lnbiBpdCB0byB0aGUgc2FtZSBwcm9wZXJ0eVxuICAgICAgLy8gYXMgdGhlIEFuZ3VsYXIgYmluZGluZyBpbiBvcmRlciB0byBtYWludGFpbiBjb25zaXN0ZW5jeS5cbiAgICAgIGlmIChuYW1lID09PSAndGFiaW5kZXgnKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVRhYmluZGV4KHBhcnNlSW50KHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUF0dHJpYnV0ZTogKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKG5hbWUgIT09ICd0YWJpbmRleCcpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEVsZW1lbnRJRDogKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlkLFxuICAgIGVtaXRFdmVudDogPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBUKSA9PiB7XG4gICAgICBlbWl0Q3VzdG9tRXZlbnQ8VD4odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9kb2N1bWVudCwgZXZlbnROYW1lLCBkYXRhLCB0cnVlKTtcbiAgICB9LFxuICB9O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBhY3Rpb24gaXMgaW50ZXJhY3RpdmUuICovXG4gIEBJbnB1dCgpIGlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gIF9oYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIFVzdWFsbHkgdGhlc2UgZXZlbnRzIGNhbid0IGhhcHBlbiB3aGlsZSB0aGUgY2hpcCBpcyBkaXNhYmxlZCBzaW5jZSB0aGUgYnJvd3NlciB3b24ndFxuICAgIC8vIGFsbG93IHRoZW0gd2hpY2ggaXMgd2hhdCBNREMgc2VlbXMgdG8gcmVseSBvbiwgaG93ZXZlciB0aGUgZXZlbnQgY2FuIGJlIGZha2VkIGluIHRlc3RzLlxuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmlzSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2ZvdW5kYXRpb24uaGFuZGxlQ2xpY2soKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBVc3VhbGx5IHRoZXNlIGV2ZW50cyBjYW4ndCBoYXBwZW4gd2hpbGUgdGhlIGNoaXAgaXMgZGlzYWJsZWQgc2luY2UgdGhlIGJyb3dzZXIgd29uJ3RcbiAgICAvLyBhbGxvdyB0aGVtIHdoaWNoIGlzIHdoYXQgTURDIHNlZW1zIHRvIHJlbHkgb24sIGhvd2V2ZXIgdGhlIGV2ZW50IGNhbiBiZSBmYWtlZCBpbiB0ZXN0cy5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5pc0ludGVyYWN0aXZlKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLmhhbmRsZUtleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlRm91bmRhdGlvbihhZGFwdGVyOiBNRENDaGlwQWN0aW9uQWRhcHRlcik6IE1EQ0NoaXBBY3Rpb25Gb3VuZGF0aW9uIHtcbiAgICByZXR1cm4gbmV3IE1EQ0NoaXBQcmltYXJ5QWN0aW9uRm91bmRhdGlvbihhZGFwdGVyKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IHRoaXMuX2NyZWF0ZUZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG5cbiAgICBpZiAoX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddKSB7XG4gICAgICB0aGlzLl9mb3VuZGF0aW9uLnNldERpc2FibGVkKHRoaXMuZGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBfZ2V0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZm91bmRhdGlvbjtcbiAgfVxuXG4gIF91cGRhdGVUYWJpbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy50YWJJbmRleCA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=