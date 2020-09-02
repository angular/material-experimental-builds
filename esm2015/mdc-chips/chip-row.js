/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatChip } from './chip';
import { MatChipEditInput } from './chip-edit-input';
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
export class MatChipRow extends MatChip {
    constructor(_document, changeDetectorRef, elementRef, ngZone, dir, animationMode) {
        super(changeDetectorRef, elementRef, ngZone, dir, animationMode);
        this._document = _document;
        this.basicChipAttrName = 'mat-basic-chip-row';
        this.editable = false;
        /** Emitted when the chip is edited. */
        this.edited = new EventEmitter();
    }
    ngAfterContentInit() {
        super.ngAfterContentInit();
        if (this.removeIcon) {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            setTimeout(() => {
                // removeIcon has tabIndex 0 for regular chips, but should only be focusable by
                // the GridFocusKeyManager for row chips.
                this.removeIcon.tabIndex = -1;
            });
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cells = this.removeIcon ?
            [this.chipContent.nativeElement, this.removeIcon._elementRef.nativeElement] :
            [this.chipContent.nativeElement];
    }
    /**
     * Allows for programmatic focusing of the chip.
     * Sends focus to the first grid cell. The row chip element itself
     * is never focused.
     */
    focus() {
        if (this.disabled) {
            return;
        }
        if (!this._hasFocusInternal) {
            this._onFocus.next({ chip: this });
        }
        this.chipContent.nativeElement.focus();
    }
    /**
     * Emits a blur event when one of the gridcells loses focus, unless focus moved
     * to the other gridcell.
     */
    _focusout(event) {
        this._hasFocusInternal = false;
        // Wait to see if focus moves to the other gridcell
        setTimeout(() => {
            if (this._hasFocus()) {
                return;
            }
            this._onBlur.next({ chip: this });
            this._handleInteraction(event);
        });
    }
    /** Records that the chip has focus when one of the gridcells is focused. */
    _focusin(event) {
        this._hasFocusInternal = true;
        this._handleInteraction(event);
    }
    /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
    _mousedown(event) {
        if (this._isEditing()) {
            return;
        }
        if (!this.disabled) {
            this.focus();
        }
        event.preventDefault();
    }
    _dblclick(event) {
        this._handleInteraction(event);
    }
    /** Handles custom key presses. */
    _keydown(event) {
        if (this.disabled) {
            return;
        }
        if (this._isEditing()) {
            this._handleInteraction(event);
            return;
        }
        switch (event.keyCode) {
            case DELETE:
            case BACKSPACE:
                // Remove the focused chip
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            default:
                this._handleInteraction(event);
        }
    }
    _isEditing() {
        return this._chipFoundation.isEditing();
    }
    _onEditStart() {
        // Defer initializing the input so it has time to be added to the DOM.
        setTimeout(() => {
            this._getEditInput().initialize(this.value);
        });
    }
    _onEditFinish() {
        // If the edit input is still focused or focus was returned to the body after it was destroyed,
        // return focus to the chip contents.
        if (this._document.activeElement === this._getEditInput().getNativeElement() ||
            this._document.activeElement === this._document.body) {
            this.chipContent.nativeElement.focus();
        }
        this.edited.emit({ chip: this, value: this._getEditInput().getValue() });
    }
    /**
     * Gets the projected chip edit input, or the default input if none is projected in. One of these
     * two values is guaranteed to be defined.
     */
    _getEditInput() {
        return this.contentEditInput || this.defaultEditInput;
    }
}
MatChipRow.decorators = [
    { type: Component, args: [{
                selector: 'mat-chip-row, mat-basic-chip-row',
                template: "<ng-container *ngIf=\"!_isEditing()\">\n  <span class=\"mdc-chip__ripple\"></span>\n\n  <span matRipple class=\"mat-mdc-chip-ripple\"\n       [matRippleAnimation]=\"_rippleAnimation\"\n       [matRippleDisabled]=\"_isRippleDisabled()\"\n       [matRippleCentered]=\"_isRippleCentered\"\n       [matRippleTrigger]=\"_elementRef.nativeElement\"></span>\n</ng-container>\n\n<div class=\"mat-mdc-chip-content\">\n  <div role=\"gridcell\">\n    <div #chipContent tabindex=\"-1\"\n         class=\"mat-mdc-chip-row-focusable-text-content mat-mdc-focus-indicator mdc-chip__primary-action\"\n         [attr.role]=\"editable ? 'button' : null\">\n      <ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content>\n      <span class=\"mdc-chip__text\"><ng-content></ng-content></span>\n      <ng-content select=\"mat-chip-trailing-icon,[matChipTrailingIcon]\"></ng-content>\n    </div>\n  </div>\n  <div role=\"gridcell\" *ngIf=\"removeIcon\" class=\"mat-mdc-chip-remove-icon\">\n    <ng-content select=\"[matChipRemove]\"></ng-content>\n  </div>\n</div>\n\n<div *ngIf=\"_isEditing()\" role=\"gridcell\" class=\"mat-mdc-chip-edit-input-container\">\n  <ng-content *ngIf=\"contentEditInput; else defaultMatChipEditInput\"\n              select=\"[matChipEditInput]\"></ng-content>\n  <ng-template #defaultMatChipEditInput>\n    <span matChipEditInput></span>\n  </ng-template>\n</div>",
                inputs: ['color', 'disableRipple', 'tabIndex'],
                host: {
                    'role': 'row',
                    'class': 'mat-mdc-chip-row',
                    '[class.mat-mdc-chip-disabled]': 'disabled',
                    '[class.mat-mdc-chip-highlighted]': 'highlighted',
                    '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                    '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                    '[class.mdc-chip--editable]': 'editable',
                    '[id]': 'id',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[tabIndex]': 'tabIndex',
                    '(mousedown)': '_mousedown($event)',
                    '(dblclick)': '_dblclick($event)',
                    '(keydown)': '_keydown($event)',
                    '(focusin)': '_focusin($event)',
                    '(focusout)': '_focusout($event)'
                },
                providers: [{ provide: MatChip, useExisting: MatChipRow }],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-input-element{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
            },] }
];
MatChipRow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatChipRow.propDecorators = {
    editable: [{ type: Input }],
    edited: [{ type: Output }],
    chipContent: [{ type: ViewChild, args: ['chipContent',] }],
    defaultEditInput: [{ type: ViewChild, args: [MatChipEditInput,] }],
    contentEditInput: [{ type: ContentChild, args: [MatChipEditInput,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXJvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sUUFBUSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBVW5EOzs7R0FHRztBQTRCSCxNQUFNLE9BQU8sVUFBVyxTQUFRLE9BQU87SUF5QnJDLFlBQ3FDLFNBQWMsRUFDakQsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQUUsTUFBYyxFQUMxQixHQUFtQixFQUNZLGFBQXNCO1FBQ2pFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUw5QixjQUFTLEdBQVQsU0FBUyxDQUFLO1FBeEJ6QyxzQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztRQUUxQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRW5DLHVDQUF1QztRQUNw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Q2IsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsK0JBQStCLEVBQUUsVUFBVTtvQkFDM0Msa0NBQWtDLEVBQUUsYUFBYTtvQkFDakQsa0NBQWtDLEVBQUUsYUFBYTtvQkFDakQseUNBQXlDLEVBQUUsNEJBQTRCO29CQUN2RSw0QkFBNEIsRUFBRSxVQUFVO29CQUN4QyxNQUFNLEVBQUUsSUFBSTtvQkFDWixpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLHNCQUFzQixFQUFFLHFCQUFxQjtvQkFDN0MsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLGFBQWEsRUFBRSxvQkFBb0I7b0JBQ25DLFlBQVksRUFBRSxtQkFBbUI7b0JBQ2pDLFdBQVcsRUFBRSxrQkFBa0I7b0JBQy9CLFdBQVcsRUFBRSxrQkFBa0I7b0JBQy9CLFlBQVksRUFBRSxtQkFBbUI7aUJBQ2xDO2dCQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDLENBQUM7Z0JBQ3hELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs0Q0EyQkksTUFBTSxTQUFDLFFBQVE7WUFsRmxCLGlCQUFpQjtZQUdqQixVQUFVO1lBSVYsTUFBTTtZQWZBLGNBQWMsdUJBNkZqQixRQUFRO3lDQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMscUJBQXFCOzs7dUJBMUIxQyxLQUFLO3FCQUdMLE1BQU07MEJBT04sU0FBUyxTQUFDLGFBQWE7K0JBR3ZCLFNBQVMsU0FBQyxnQkFBZ0I7K0JBRzFCLFlBQVksU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0JBQ0tTUEFDRSwgREVMRVRFfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01hdENoaXAsIE1hdENoaXBFdmVudH0gZnJvbSAnLi9jaGlwJztcbmltcG9ydCB7TWF0Q2hpcEVkaXRJbnB1dH0gZnJvbSAnLi9jaGlwLWVkaXQtaW5wdXQnO1xuaW1wb3J0IHtHcmlkS2V5TWFuYWdlclJvd30gZnJvbSAnLi9ncmlkLWtleS1tYW5hZ2VyJztcblxuXG4vKiogUmVwcmVzZW50cyBhbiBldmVudCBmaXJlZCBvbiBhbiBpbmRpdmlkdWFsIGBtYXQtY2hpcGAgd2hlbiBpdCBpcyBlZGl0ZWQuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdENoaXBFZGl0ZWRFdmVudCBleHRlbmRzIE1hdENoaXBFdmVudCB7XG4gIC8qKiBUaGUgZmluYWwgZWRpdCB2YWx1ZS4gKi9cbiAgdmFsdWU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBbiBleHRlbnNpb24gb2YgdGhlIE1hdENoaXAgY29tcG9uZW50IHVzZWQgd2l0aCBNYXRDaGlwR3JpZCBhbmRcbiAqIHRoZSBtYXRDaGlwSW5wdXRGb3IgZGlyZWN0aXZlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hpcC1yb3csIG1hdC1iYXNpYy1jaGlwLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnY2hpcC1yb3cuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVSaXBwbGUnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ3JvdycsXG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hpcC1yb3cnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtaGlnaGxpZ2h0ZWRdJzogJ2hpZ2hsaWdodGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLWF2YXRhcl0nOiAnbGVhZGluZ0ljb24nLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtdHJhaWxpbmctaWNvbl0nOiAndHJhaWxpbmdJY29uIHx8IHJlbW92ZUljb24nLFxuICAgICdbY2xhc3MubWRjLWNoaXAtLWVkaXRhYmxlXSc6ICdlZGl0YWJsZScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbdGFiSW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAnKG1vdXNlZG93biknOiAnX21vdXNlZG93bigkZXZlbnQpJyxcbiAgICAnKGRibGNsaWNrKSc6ICdfZGJsY2xpY2soJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdfa2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGZvY3VzaW4pJzogJ19mb2N1c2luKCRldmVudCknLFxuICAgICcoZm9jdXNvdXQpJzogJ19mb2N1c291dCgkZXZlbnQpJ1xuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWF0Q2hpcCwgdXNlRXhpc3Rpbmc6IE1hdENoaXBSb3d9XSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBSb3cgZXh0ZW5kcyBNYXRDaGlwIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCxcbiAgR3JpZEtleU1hbmFnZXJSb3c8SFRNTEVsZW1lbnQ+IHtcbiAgcHJvdGVjdGVkIGJhc2ljQ2hpcEF0dHJOYW1lID0gJ21hdC1iYXNpYy1jaGlwLXJvdyc7XG5cbiAgQElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIGVkaXRlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGVkaXRlZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFZGl0ZWRFdmVudD4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNYXRDaGlwRWRpdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBmb2N1c2FibGUgd3JhcHBlciBlbGVtZW50IGluIHRoZSBmaXJzdCBncmlkY2VsbCwgd2hpY2ggY29udGFpbnMgYWxsXG4gICAqIGNoaXAgY29udGVudCBvdGhlciB0aGFuIHRoZSByZW1vdmUgaWNvbi5cbiAgICovXG4gIEBWaWV3Q2hpbGQoJ2NoaXBDb250ZW50JykgY2hpcENvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqIFRoZSBkZWZhdWx0IGNoaXAgZWRpdCBpbnB1dCB0aGF0IGlzIHVzZWQgaWYgbm9uZSBpcyBwcm9qZWN0ZWQgaW50byB0aGlzIGNoaXAgcm93LiAqL1xuICBAVmlld0NoaWxkKE1hdENoaXBFZGl0SW5wdXQpIGRlZmF1bHRFZGl0SW5wdXQ/OiBNYXRDaGlwRWRpdElucHV0O1xuXG4gIC8qKiBUaGUgcHJvamVjdGVkIGNoaXAgZWRpdCBpbnB1dC4gKi9cbiAgQENvbnRlbnRDaGlsZChNYXRDaGlwRWRpdElucHV0KSBjb250ZW50RWRpdElucHV0PzogTWF0Q2hpcEVkaXRJbnB1dDtcblxuICAvKiogVGhlIGZvY3VzYWJsZSBncmlkIGNlbGxzIGZvciB0aGlzIHJvdy4gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBHcmlkS2V5TWFuYWdlclJvdy4gKi9cbiAgY2VsbHMhOiBIVE1MRWxlbWVudFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgX2RvY3VtZW50OiBhbnksXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihjaGFuZ2VEZXRlY3RvclJlZiwgZWxlbWVudFJlZiwgbmdab25lLCBkaXIsIGFuaW1hdGlvbk1vZGUpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuXG4gICAgaWYgKHRoaXMucmVtb3ZlSWNvbikge1xuICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgLy8gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMgZnJvbSBBbmd1bGFyLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIHJlbW92ZUljb24gaGFzIHRhYkluZGV4IDAgZm9yIHJlZ3VsYXIgY2hpcHMsIGJ1dCBzaG91bGQgb25seSBiZSBmb2N1c2FibGUgYnlcbiAgICAgICAgLy8gdGhlIEdyaWRGb2N1c0tleU1hbmFnZXIgZm9yIHJvdyBjaGlwcy5cbiAgICAgICAgdGhpcy5yZW1vdmVJY29uLnRhYkluZGV4ID0gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgdGhpcy5jZWxscyA9IHRoaXMucmVtb3ZlSWNvbiA/XG4gICAgICBbdGhpcy5jaGlwQ29udGVudC5uYXRpdmVFbGVtZW50LCB0aGlzLnJlbW92ZUljb24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudF0gOlxuICAgICAgW3RoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudF07XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgZm9jdXNpbmcgb2YgdGhlIGNoaXAuXG4gICAqIFNlbmRzIGZvY3VzIHRvIHRoZSBmaXJzdCBncmlkIGNlbGwuIFRoZSByb3cgY2hpcCBlbGVtZW50IGl0c2VsZlxuICAgKiBpcyBuZXZlciBmb2N1c2VkLlxuICAgKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2hhc0ZvY3VzSW50ZXJuYWwpIHtcbiAgICAgIHRoaXMuX29uRm9jdXMubmV4dCh7Y2hpcDogdGhpc30pO1xuICAgIH1cblxuICAgIHRoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgYmx1ciBldmVudCB3aGVuIG9uZSBvZiB0aGUgZ3JpZGNlbGxzIGxvc2VzIGZvY3VzLCB1bmxlc3MgZm9jdXMgbW92ZWRcbiAgICogdG8gdGhlIG90aGVyIGdyaWRjZWxsLlxuICAgKi9cbiAgX2ZvY3Vzb3V0KGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgdGhpcy5faGFzRm9jdXNJbnRlcm5hbCA9IGZhbHNlO1xuICAgIC8vIFdhaXQgdG8gc2VlIGlmIGZvY3VzIG1vdmVzIHRvIHRoZSBvdGhlciBncmlkY2VsbFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2hhc0ZvY3VzKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fb25CbHVyLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZWNvcmRzIHRoYXQgdGhlIGNoaXAgaGFzIGZvY3VzIHdoZW4gb25lIG9mIHRoZSBncmlkY2VsbHMgaXMgZm9jdXNlZC4gKi9cbiAgX2ZvY3VzaW4oZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICB0aGlzLl9oYXNGb2N1c0ludGVybmFsID0gdHJ1ZTtcbiAgICB0aGlzLl9oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gIH1cblxuICAvKiogU2VuZHMgZm9jdXMgdG8gdGhlIGZpcnN0IGdyaWRjZWxsIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIGluc2lkZSB0aGUgY2hpcC4gKi9cbiAgX21vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLl9pc0VkaXRpbmcoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBfZGJsY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLl9oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBjdXN0b20ga2V5IHByZXNzZXMuICovXG4gIF9rZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lzRWRpdGluZygpKSB7XG4gICAgICB0aGlzLl9oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBERUxFVEU6XG4gICAgICBjYXNlIEJBQ0tTUEFDRTpcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBmb2N1c2VkIGNoaXBcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgLy8gQWx3YXlzIHByZXZlbnQgc28gcGFnZSBuYXZpZ2F0aW9uIGRvZXMgbm90IG9jY3VyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9pc0VkaXRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBGb3VuZGF0aW9uLmlzRWRpdGluZygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkVkaXRTdGFydCgpIHtcbiAgICAvLyBEZWZlciBpbml0aWFsaXppbmcgdGhlIGlucHV0IHNvIGl0IGhhcyB0aW1lIHRvIGJlIGFkZGVkIHRvIHRoZSBET00uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9nZXRFZGl0SW5wdXQoKS5pbml0aWFsaXplKHRoaXMudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkVkaXRGaW5pc2goKSB7XG4gICAgLy8gSWYgdGhlIGVkaXQgaW5wdXQgaXMgc3RpbGwgZm9jdXNlZCBvciBmb2N1cyB3YXMgcmV0dXJuZWQgdG8gdGhlIGJvZHkgYWZ0ZXIgaXQgd2FzIGRlc3Ryb3llZCxcbiAgICAvLyByZXR1cm4gZm9jdXMgdG8gdGhlIGNoaXAgY29udGVudHMuXG4gICAgaWYgKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuX2dldEVkaXRJbnB1dCgpLmdldE5hdGl2ZUVsZW1lbnQoKSB8fFxuICAgICAgICB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudC5ib2R5KSB7XG4gICAgICB0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgdGhpcy5lZGl0ZWQuZW1pdCh7Y2hpcDogdGhpcywgdmFsdWU6IHRoaXMuX2dldEVkaXRJbnB1dCgpLmdldFZhbHVlKCl9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwcm9qZWN0ZWQgY2hpcCBlZGl0IGlucHV0LCBvciB0aGUgZGVmYXVsdCBpbnB1dCBpZiBub25lIGlzIHByb2plY3RlZCBpbi4gT25lIG9mIHRoZXNlXG4gICAqIHR3byB2YWx1ZXMgaXMgZ3VhcmFudGVlZCB0byBiZSBkZWZpbmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RWRpdElucHV0KCk6IE1hdENoaXBFZGl0SW5wdXQge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFZGl0SW5wdXQgfHwgdGhpcy5kZWZhdWx0RWRpdElucHV0ITtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9lZGl0YWJsZTogQm9vbGVhbklucHV0O1xufVxuIl19