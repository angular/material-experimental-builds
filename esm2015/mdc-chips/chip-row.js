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
import { MAT_RIPPLE_GLOBAL_OPTIONS, } from '@angular/material-experimental/mdc-core';
import { MatChip } from './chip';
import { MatChipEditInput } from './chip-edit-input';
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
export class MatChipRow extends MatChip {
    constructor(_document, changeDetectorRef, elementRef, ngZone, dir, animationMode, globalRippleOptions) {
        super(changeDetectorRef, elementRef, ngZone, dir, animationMode, globalRippleOptions);
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
        if (this._focusoutTimeout) {
            clearTimeout(this._focusoutTimeout);
        }
        // Wait to see if focus moves to the other gridcell
        this._focusoutTimeout = setTimeout(() => {
            this._hasFocusInternal = false;
            this._onBlur.next({ chip: this });
            this._handleInteraction(event);
        });
    }
    /** Records that the chip has focus when one of the gridcells is focused. */
    _focusin(event) {
        if (this._focusoutTimeout) {
            clearTimeout(this._focusoutTimeout);
            this._focusoutTimeout = null;
        }
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
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
            },] }
];
MatChipRow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] }
];
MatChipRow.propDecorators = {
    editable: [{ type: Input }],
    edited: [{ type: Output }],
    chipContent: [{ type: ViewChild, args: ['chipContent',] }],
    defaultEditInput: [{ type: ViewChild, args: [MatChipEditInput,] }],
    contentEditInput: [{ type: ContentChild, args: [MatChipEditInput,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXJvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wseUJBQXlCLEdBRTFCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQVVuRDs7O0dBR0c7QUE0QkgsTUFBTSxPQUFPLFVBQVcsU0FBUSxPQUFPO0lBK0JyQyxZQUNxQyxTQUFjLEVBQ2pELGlCQUFvQyxFQUNwQyxVQUFzQixFQUFFLE1BQWMsRUFDMUIsR0FBbUIsRUFDWSxhQUFzQixFQUU3RCxtQkFBeUM7UUFDN0MsS0FBSyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBUG5ELGNBQVMsR0FBVCxTQUFTLENBQUs7UUE5QnpDLHNCQUFpQixHQUFHLG9CQUFvQixDQUFDO1FBRTFDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFbkMsdUNBQXVDO1FBQ3BCLFdBQU0sR0FDckIsSUFBSSxZQUFZLEVBQXNCLENBQUM7SUFnQzNDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLDREQUE0RDtZQUM1RCx5REFBeUQ7WUFDekQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCwrRUFBK0U7Z0JBQy9FLHlDQUF5QztnQkFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM3RSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTLENBQUMsS0FBaUI7UUFDekIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLFFBQVEsQ0FBQyxLQUFpQjtRQUN4QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUM5QjtRQUVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsVUFBVSxDQUFDLEtBQWlCO1FBQzFCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3JCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBaUI7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsUUFBUSxDQUFDLEtBQW9CO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsT0FBTztTQUNSO1FBQ0QsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3JCLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxTQUFTO2dCQUNaLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLG1EQUFtRDtnQkFDbkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVTLFlBQVk7UUFDcEIsc0VBQXNFO1FBQ3RFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxhQUFhO1FBQ3JCLCtGQUErRjtRQUMvRixxQ0FBcUM7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGFBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFpQixDQUFDO0lBQ3pELENBQUM7OztZQXpNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsbTNDQUE0QjtnQkFFNUIsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7Z0JBQzlDLElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsa0JBQWtCO29CQUMzQiwrQkFBK0IsRUFBRSxVQUFVO29CQUMzQyxrQ0FBa0MsRUFBRSxhQUFhO29CQUNqRCxrQ0FBa0MsRUFBRSxhQUFhO29CQUNqRCx5Q0FBeUMsRUFBRSw0QkFBNEI7b0JBQ3ZFLDRCQUE0QixFQUFFLFVBQVU7b0JBQ3hDLE1BQU0sRUFBRSxJQUFJO29CQUNaLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsc0JBQXNCLEVBQUUscUJBQXFCO29CQUM3QyxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsYUFBYSxFQUFFLG9CQUFvQjtvQkFDbkMsWUFBWSxFQUFFLG1CQUFtQjtvQkFDakMsV0FBVyxFQUFFLGtCQUFrQjtvQkFDL0IsV0FBVyxFQUFFLGtCQUFrQjtvQkFDL0IsWUFBWSxFQUFFLG1CQUFtQjtpQkFDbEM7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsQ0FBQztnQkFDeEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OzRDQWlDSSxNQUFNLFNBQUMsUUFBUTtZQTVGbEIsaUJBQWlCO1lBR2pCLFVBQVU7WUFJVixNQUFNO1lBZkEsY0FBYyx1QkF1R2pCLFFBQVE7eUNBQ1IsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7NENBQ3hDLFFBQVEsWUFBSSxNQUFNLFNBQUMseUJBQXlCOzs7dUJBakM5QyxLQUFLO3FCQUdMLE1BQU07MEJBT04sU0FBUyxTQUFDLGFBQWE7K0JBR3ZCLFNBQVMsU0FBQyxnQkFBZ0I7K0JBRzFCLFlBQVksU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0JBQ0tTUEFDRSwgREVMRVRFfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBSaXBwbGVHbG9iYWxPcHRpb25zLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXRDaGlwLCBNYXRDaGlwRXZlbnR9IGZyb20gJy4vY2hpcCc7XG5pbXBvcnQge01hdENoaXBFZGl0SW5wdXR9IGZyb20gJy4vY2hpcC1lZGl0LWlucHV0JztcbmltcG9ydCB7R3JpZEtleU1hbmFnZXJSb3d9IGZyb20gJy4vZ3JpZC1rZXktbWFuYWdlcic7XG5cblxuLyoqIFJlcHJlc2VudHMgYW4gZXZlbnQgZmlyZWQgb24gYW4gaW5kaXZpZHVhbCBgbWF0LWNoaXBgIHdoZW4gaXQgaXMgZWRpdGVkLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwRWRpdGVkRXZlbnQgZXh0ZW5kcyBNYXRDaGlwRXZlbnQge1xuICAvKiogVGhlIGZpbmFsIGVkaXQgdmFsdWUuICovXG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gZXh0ZW5zaW9uIG9mIHRoZSBNYXRDaGlwIGNvbXBvbmVudCB1c2VkIHdpdGggTWF0Q2hpcEdyaWQgYW5kXG4gKiB0aGUgbWF0Q2hpcElucHV0Rm9yIGRpcmVjdGl2ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtcm93LCBtYXQtYmFzaWMtY2hpcC1yb3cnLFxuICB0ZW1wbGF0ZVVybDogJ2NoaXAtcm93Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hpcHMuY3NzJ10sXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJywgJ3RhYkluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdyb3cnLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtcm93JyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm1kYy1jaGlwLS1lZGl0YWJsZV0nOiAnZWRpdGFibGUnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW3RhYkluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJyhtb3VzZWRvd24pJzogJ19tb3VzZWRvd24oJGV2ZW50KScsXG4gICAgJyhkYmxjbGljayknOiAnX2RibGNsaWNrKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhmb2N1c2luKSc6ICdfZm9jdXNpbigkZXZlbnQpJyxcbiAgICAnKGZvY3Vzb3V0KSc6ICdfZm9jdXNvdXQoJGV2ZW50KSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdENoaXAsIHVzZUV4aXN0aW5nOiBNYXRDaGlwUm93fV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwUm93IGV4dGVuZHMgTWF0Q2hpcCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsXG4gIEdyaWRLZXlNYW5hZ2VyUm93PEhUTUxFbGVtZW50PiB7XG4gIHByb3RlY3RlZCBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcC1yb3cnO1xuXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBpcyBlZGl0ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBlZGl0ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRWRpdGVkRXZlbnQ+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEVkaXRlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9jdXNhYmxlIHdyYXBwZXIgZWxlbWVudCBpbiB0aGUgZmlyc3QgZ3JpZGNlbGwsIHdoaWNoIGNvbnRhaW5zIGFsbFxuICAgKiBjaGlwIGNvbnRlbnQgb3RoZXIgdGhhbiB0aGUgcmVtb3ZlIGljb24uXG4gICAqL1xuICBAVmlld0NoaWxkKCdjaGlwQ29udGVudCcpIGNoaXBDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIC8qKiBUaGUgZGVmYXVsdCBjaGlwIGVkaXQgaW5wdXQgdGhhdCBpcyB1c2VkIGlmIG5vbmUgaXMgcHJvamVjdGVkIGludG8gdGhpcyBjaGlwIHJvdy4gKi9cbiAgQFZpZXdDaGlsZChNYXRDaGlwRWRpdElucHV0KSBkZWZhdWx0RWRpdElucHV0PzogTWF0Q2hpcEVkaXRJbnB1dDtcblxuICAvKiogVGhlIHByb2plY3RlZCBjaGlwIGVkaXQgaW5wdXQuICovXG4gIEBDb250ZW50Q2hpbGQoTWF0Q2hpcEVkaXRJbnB1dCkgY29udGVudEVkaXRJbnB1dD86IE1hdENoaXBFZGl0SW5wdXQ7XG5cbiAgLyoqIFRoZSBmb2N1c2FibGUgZ3JpZCBjZWxscyBmb3IgdGhpcyByb3cuIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgR3JpZEtleU1hbmFnZXJSb3cuICovXG4gIGNlbGxzITogSFRNTEVsZW1lbnRbXTtcblxuICAvKipcbiAgICogVGltZW91dCB1c2VkIHRvIGdpdmUgc29tZSB0aW1lIGJldHdlZW4gYGZvY3VzaW5gIGFuZCBgZm9jdXNvdXRgXG4gICAqIGluIG9yZGVyIHRvIGRldGVybWluZSB3aGV0aGVyIGZvY3VzIGhhcyBsZWZ0IHRoZSBjaGlwLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9jdXNvdXRUaW1lb3V0OiBudW1iZXIgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgX2RvY3VtZW50OiBhbnksXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKVxuICAgICAgICBnbG9iYWxSaXBwbGVPcHRpb25zPzogUmlwcGxlR2xvYmFsT3B0aW9ucykge1xuICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmLCBlbGVtZW50UmVmLCBuZ1pvbmUsIGRpciwgYW5pbWF0aW9uTW9kZSwgZ2xvYmFsUmlwcGxlT3B0aW9ucyk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlckNvbnRlbnRJbml0KCk7XG5cbiAgICBpZiAodGhpcy5yZW1vdmVJY29uKSB7XG4gICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gcmVtb3ZlSWNvbiBoYXMgdGFiSW5kZXggMCBmb3IgcmVndWxhciBjaGlwcywgYnV0IHNob3VsZCBvbmx5IGJlIGZvY3VzYWJsZSBieVxuICAgICAgICAvLyB0aGUgR3JpZEZvY3VzS2V5TWFuYWdlciBmb3Igcm93IGNoaXBzLlxuICAgICAgICB0aGlzLnJlbW92ZUljb24udGFiSW5kZXggPSAtMTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5yZW1vdmVJY29uID9cbiAgICAgIFt0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMucmVtb3ZlSWNvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XSA6XG4gICAgICBbdGhpcy5jaGlwQ29udGVudC5uYXRpdmVFbGVtZW50XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHByb2dyYW1tYXRpYyBmb2N1c2luZyBvZiB0aGUgY2hpcC5cbiAgICogU2VuZHMgZm9jdXMgdG8gdGhlIGZpcnN0IGdyaWQgY2VsbC4gVGhlIHJvdyBjaGlwIGVsZW1lbnQgaXRzZWxmXG4gICAqIGlzIG5ldmVyIGZvY3VzZWQuXG4gICAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5faGFzRm9jdXNJbnRlcm5hbCkge1xuICAgICAgdGhpcy5fb25Gb2N1cy5uZXh0KHtjaGlwOiB0aGlzfSk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlwQ29udGVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYSBibHVyIGV2ZW50IHdoZW4gb25lIG9mIHRoZSBncmlkY2VsbHMgbG9zZXMgZm9jdXMsIHVubGVzcyBmb2N1cyBtb3ZlZFxuICAgKiB0byB0aGUgb3RoZXIgZ3JpZGNlbGwuXG4gICAqL1xuICBfZm9jdXNvdXQoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICBpZiAodGhpcy5fZm9jdXNvdXRUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZm9jdXNvdXRUaW1lb3V0KTtcbiAgICB9XG5cbiAgICAvLyBXYWl0IHRvIHNlZSBpZiBmb2N1cyBtb3ZlcyB0byB0aGUgb3RoZXIgZ3JpZGNlbGxcbiAgICB0aGlzLl9mb2N1c291dFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcbiAgICAgIHRoaXMuX29uQmx1ci5uZXh0KHtjaGlwOiB0aGlzfSk7XG4gICAgICB0aGlzLl9oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogUmVjb3JkcyB0aGF0IHRoZSBjaGlwIGhhcyBmb2N1cyB3aGVuIG9uZSBvZiB0aGUgZ3JpZGNlbGxzIGlzIGZvY3VzZWQuICovXG4gIF9mb2N1c2luKGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2ZvY3Vzb3V0VGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2ZvY3Vzb3V0VGltZW91dCk7XG4gICAgICB0aGlzLl9mb2N1c291dFRpbWVvdXQgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWwgPSB0cnVlO1xuICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBTZW5kcyBmb2N1cyB0byB0aGUgZmlyc3QgZ3JpZGNlbGwgd2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgaW5zaWRlIHRoZSBjaGlwLiAqL1xuICBfbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzRWRpdGluZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIF9kYmxjbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGN1c3RvbSBrZXkgcHJlc3Nlcy4gKi9cbiAgX2tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5faXNFZGl0aW5nKCkpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIERFTEVURTpcbiAgICAgIGNhc2UgQkFDS1NQQUNFOlxuICAgICAgICAvLyBSZW1vdmUgdGhlIGZvY3VzZWQgY2hpcFxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAvLyBBbHdheXMgcHJldmVudCBzbyBwYWdlIG5hdmlnYXRpb24gZG9lcyBub3Qgb2NjdXJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLl9oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgX2lzRWRpdGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcEZvdW5kYXRpb24uaXNFZGl0aW5nKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uRWRpdFN0YXJ0KCkge1xuICAgIC8vIERlZmVyIGluaXRpYWxpemluZyB0aGUgaW5wdXQgc28gaXQgaGFzIHRpbWUgdG8gYmUgYWRkZWQgdG8gdGhlIERPTS5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2dldEVkaXRJbnB1dCgpLmluaXRpYWxpemUodGhpcy52YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uRWRpdEZpbmlzaCgpIHtcbiAgICAvLyBJZiB0aGUgZWRpdCBpbnB1dCBpcyBzdGlsbCBmb2N1c2VkIG9yIGZvY3VzIHdhcyByZXR1cm5lZCB0byB0aGUgYm9keSBhZnRlciBpdCB3YXMgZGVzdHJveWVkLFxuICAgIC8vIHJldHVybiBmb2N1cyB0byB0aGUgY2hpcCBjb250ZW50cy5cbiAgICBpZiAodGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5fZ2V0RWRpdElucHV0KCkuZ2V0TmF0aXZlRWxlbWVudCgpIHx8XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuX2RvY3VtZW50LmJvZHkpIHtcbiAgICAgIHRoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICB0aGlzLmVkaXRlZC5lbWl0KHtjaGlwOiB0aGlzLCB2YWx1ZTogdGhpcy5fZ2V0RWRpdElucHV0KCkuZ2V0VmFsdWUoKX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHByb2plY3RlZCBjaGlwIGVkaXQgaW5wdXQsIG9yIHRoZSBkZWZhdWx0IGlucHV0IGlmIG5vbmUgaXMgcHJvamVjdGVkIGluLiBPbmUgb2YgdGhlc2VcbiAgICogdHdvIHZhbHVlcyBpcyBndWFyYW50ZWVkIHRvIGJlIGRlZmluZWQuXG4gICAqL1xuICBwcml2YXRlIF9nZXRFZGl0SW5wdXQoKTogTWF0Q2hpcEVkaXRJbnB1dCB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudEVkaXRJbnB1dCB8fCB0aGlzLmRlZmF1bHRFZGl0SW5wdXQhO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2VkaXRhYmxlOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=