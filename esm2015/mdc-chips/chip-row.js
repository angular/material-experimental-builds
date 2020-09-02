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
    constructor(_document, changeDetectorRef, elementRef, ngZone, dir, 
    // @breaking-change 8.0.0 `animationMode` parameter to become required.
    animationMode) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXJvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sUUFBUSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBVW5EOzs7R0FHRztBQTRCSCxNQUFNLE9BQU8sVUFBVyxTQUFRLE9BQU87SUF5QnJDLFlBQ3FDLFNBQWMsRUFDakQsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQUUsTUFBYyxFQUMxQixHQUFtQjtJQUMvQix1RUFBdUU7SUFDNUIsYUFBc0I7UUFDakUsS0FBSyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBTjlCLGNBQVMsR0FBVCxTQUFTLENBQUs7UUF4QnpDLHNCQUFpQixHQUFHLG9CQUFvQixDQUFDO1FBRTFDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFbkMsdUNBQXVDO1FBQ3BCLFdBQU0sR0FDckIsSUFBSSxZQUFZLEVBQXNCLENBQUM7SUF5QjNDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLDREQUE0RDtZQUM1RCx5REFBeUQ7WUFDekQsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCwrRUFBK0U7Z0JBQy9FLHlDQUF5QztnQkFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM3RSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTLENBQUMsS0FBaUI7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixtREFBbUQ7UUFDbkQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNwQixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsUUFBUSxDQUFDLEtBQWlCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsVUFBVSxDQUFDLEtBQWlCO1FBQzFCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3JCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBaUI7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsUUFBUSxDQUFDLEtBQW9CO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsT0FBTztTQUNSO1FBQ0QsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3JCLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxTQUFTO2dCQUNaLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLG1EQUFtRDtnQkFDbkQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVTLFlBQVk7UUFDcEIsc0VBQXNFO1FBQ3RFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxhQUFhO1FBQ3JCLCtGQUErRjtRQUMvRixxQ0FBcUM7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGFBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFpQixDQUFDO0lBQ3pELENBQUM7OztZQTVMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsbTNDQUE0QjtnQkFFNUIsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7Z0JBQzlDLElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsa0JBQWtCO29CQUMzQiwrQkFBK0IsRUFBRSxVQUFVO29CQUMzQyxrQ0FBa0MsRUFBRSxhQUFhO29CQUNqRCxrQ0FBa0MsRUFBRSxhQUFhO29CQUNqRCx5Q0FBeUMsRUFBRSw0QkFBNEI7b0JBQ3ZFLDRCQUE0QixFQUFFLFVBQVU7b0JBQ3hDLE1BQU0sRUFBRSxJQUFJO29CQUNaLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsc0JBQXNCLEVBQUUscUJBQXFCO29CQUM3QyxZQUFZLEVBQUUsVUFBVTtvQkFDeEIsYUFBYSxFQUFFLG9CQUFvQjtvQkFDbkMsWUFBWSxFQUFFLG1CQUFtQjtvQkFDakMsV0FBVyxFQUFFLGtCQUFrQjtvQkFDL0IsV0FBVyxFQUFFLGtCQUFrQjtvQkFDL0IsWUFBWSxFQUFFLG1CQUFtQjtpQkFDbEM7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsQ0FBQztnQkFDeEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OzRDQTJCSSxNQUFNLFNBQUMsUUFBUTtZQWxGbEIsaUJBQWlCO1lBR2pCLFVBQVU7WUFJVixNQUFNO1lBZkEsY0FBYyx1QkE2RmpCLFFBQVE7eUNBRVIsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7Ozt1QkEzQjFDLEtBQUs7cUJBR0wsTUFBTTswQkFPTixTQUFTLFNBQUMsYUFBYTsrQkFHdkIsU0FBUyxTQUFDLGdCQUFnQjsrQkFHMUIsWUFBWSxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QkFDS1NQQUNFLCBERUxFVEV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0Q2hpcCwgTWF0Q2hpcEV2ZW50fSBmcm9tICcuL2NoaXAnO1xuaW1wb3J0IHtNYXRDaGlwRWRpdElucHV0fSBmcm9tICcuL2NoaXAtZWRpdC1pbnB1dCc7XG5pbXBvcnQge0dyaWRLZXlNYW5hZ2VyUm93fSBmcm9tICcuL2dyaWQta2V5LW1hbmFnZXInO1xuXG5cbi8qKiBSZXByZXNlbnRzIGFuIGV2ZW50IGZpcmVkIG9uIGFuIGluZGl2aWR1YWwgYG1hdC1jaGlwYCB3aGVuIGl0IGlzIGVkaXRlZC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Q2hpcEVkaXRlZEV2ZW50IGV4dGVuZHMgTWF0Q2hpcEV2ZW50IHtcbiAgLyoqIFRoZSBmaW5hbCBlZGl0IHZhbHVlLiAqL1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIGV4dGVuc2lvbiBvZiB0aGUgTWF0Q2hpcCBjb21wb25lbnQgdXNlZCB3aXRoIE1hdENoaXBHcmlkIGFuZFxuICogdGhlIG1hdENoaXBJbnB1dEZvciBkaXJlY3RpdmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXJvdywgbWF0LWJhc2ljLWNoaXAtcm93JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwLXJvdy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLmNzcyddLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZVJpcHBsZScsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAncm93JyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLXJvdycsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLXdpdGgtYXZhdGFyXSc6ICdsZWFkaW5nSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5tZGMtY2hpcC0tZWRpdGFibGVdJzogJ2VkaXRhYmxlJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1t0YWJJbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICcobW91c2Vkb3duKSc6ICdfbW91c2Vkb3duKCRldmVudCknLFxuICAgICcoZGJsY2xpY2spJzogJ19kYmxjbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19rZXlkb3duKCRldmVudCknLFxuICAgICcoZm9jdXNpbiknOiAnX2ZvY3VzaW4oJGV2ZW50KScsXG4gICAgJyhmb2N1c291dCknOiAnX2ZvY3Vzb3V0KCRldmVudCknXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNYXRDaGlwLCB1c2VFeGlzdGluZzogTWF0Q2hpcFJvd31dLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJvdyBleHRlbmRzIE1hdENoaXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBHcmlkS2V5TWFuYWdlclJvdzxIVE1MRWxlbWVudD4ge1xuICBwcm90ZWN0ZWQgYmFzaWNDaGlwQXR0ck5hbWUgPSAnbWF0LWJhc2ljLWNoaXAtcm93JztcblxuICBASW5wdXQoKSBlZGl0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIGNoaXAgaXMgZWRpdGVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZWRpdGVkOiBFdmVudEVtaXR0ZXI8TWF0Q2hpcEVkaXRlZEV2ZW50PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFZGl0ZWRFdmVudD4oKTtcblxuICAvKipcbiAgICogVGhlIGZvY3VzYWJsZSB3cmFwcGVyIGVsZW1lbnQgaW4gdGhlIGZpcnN0IGdyaWRjZWxsLCB3aGljaCBjb250YWlucyBhbGxcbiAgICogY2hpcCBjb250ZW50IG90aGVyIHRoYW4gdGhlIHJlbW92ZSBpY29uLlxuICAgKi9cbiAgQFZpZXdDaGlsZCgnY2hpcENvbnRlbnQnKSBjaGlwQ29udGVudDogRWxlbWVudFJlZjtcblxuICAvKiogVGhlIGRlZmF1bHQgY2hpcCBlZGl0IGlucHV0IHRoYXQgaXMgdXNlZCBpZiBub25lIGlzIHByb2plY3RlZCBpbnRvIHRoaXMgY2hpcCByb3cuICovXG4gIEBWaWV3Q2hpbGQoTWF0Q2hpcEVkaXRJbnB1dCkgZGVmYXVsdEVkaXRJbnB1dD86IE1hdENoaXBFZGl0SW5wdXQ7XG5cbiAgLyoqIFRoZSBwcm9qZWN0ZWQgY2hpcCBlZGl0IGlucHV0LiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBFZGl0SW5wdXQpIGNvbnRlbnRFZGl0SW5wdXQ/OiBNYXRDaGlwRWRpdElucHV0O1xuXG4gIC8qKiBUaGUgZm9jdXNhYmxlIGdyaWQgY2VsbHMgZm9yIHRoaXMgcm93LiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIEdyaWRLZXlNYW5hZ2VyUm93LiAqL1xuICBjZWxscyE6IEhUTUxFbGVtZW50W107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSByZWFkb25seSBfZG9jdW1lbnQ6IGFueSxcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgbmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIGBhbmltYXRpb25Nb2RlYCBwYXJhbWV0ZXIgdG8gYmVjb21lIHJlcXVpcmVkLlxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3JSZWYsIGVsZW1lbnRSZWYsIG5nWm9uZSwgZGlyLCBhbmltYXRpb25Nb2RlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyQ29udGVudEluaXQoKTtcblxuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmVJY29uIGhhcyB0YWJJbmRleCAwIGZvciByZWd1bGFyIGNoaXBzLCBidXQgc2hvdWxkIG9ubHkgYmUgZm9jdXNhYmxlIGJ5XG4gICAgICAgIC8vIHRoZSBHcmlkRm9jdXNLZXlNYW5hZ2VyIGZvciByb3cgY2hpcHMuXG4gICAgICAgIHRoaXMucmVtb3ZlSWNvbi50YWJJbmRleCA9IC0xO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLnJlbW92ZUljb24gP1xuICAgICAgW3RoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudCwgdGhpcy5yZW1vdmVJY29uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRdIDpcbiAgICAgIFt0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBjaGlwLlxuICAgKiBTZW5kcyBmb2N1cyB0byB0aGUgZmlyc3QgZ3JpZCBjZWxsLiBUaGUgcm93IGNoaXAgZWxlbWVudCBpdHNlbGZcbiAgICogaXMgbmV2ZXIgZm9jdXNlZC5cbiAgICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9oYXNGb2N1c0ludGVybmFsKSB7XG4gICAgICB0aGlzLl9vbkZvY3VzLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGJsdXIgZXZlbnQgd2hlbiBvbmUgb2YgdGhlIGdyaWRjZWxscyBsb3NlcyBmb2N1cywgdW5sZXNzIGZvY3VzIG1vdmVkXG4gICAqIHRvIHRoZSBvdGhlciBncmlkY2VsbC5cbiAgICovXG4gIF9mb2N1c291dChldmVudDogRm9jdXNFdmVudCkge1xuICAgIHRoaXMuX2hhc0ZvY3VzSW50ZXJuYWwgPSBmYWxzZTtcbiAgICAvLyBXYWl0IHRvIHNlZSBpZiBmb2N1cyBtb3ZlcyB0byB0aGUgb3RoZXIgZ3JpZGNlbGxcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYXNGb2N1cygpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX29uQmx1ci5uZXh0KHtjaGlwOiB0aGlzfSk7XG4gICAgICB0aGlzLl9oYW5kbGVJbnRlcmFjdGlvbihldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogUmVjb3JkcyB0aGF0IHRoZSBjaGlwIGhhcyBmb2N1cyB3aGVuIG9uZSBvZiB0aGUgZ3JpZGNlbGxzIGlzIGZvY3VzZWQuICovXG4gIF9mb2N1c2luKGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgdGhpcy5faGFzRm9jdXNJbnRlcm5hbCA9IHRydWU7XG4gICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICB9XG5cbiAgLyoqIFNlbmRzIGZvY3VzIHRvIHRoZSBmaXJzdCBncmlkY2VsbCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBpbnNpZGUgdGhlIGNoaXAuICovXG4gIF9tb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNFZGl0aW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgX2RibGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgY3VzdG9tIGtleSBwcmVzc2VzLiAqL1xuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9pc0VkaXRpbmcoKSkge1xuICAgICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZm9jdXNlZCBjaGlwXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNvIHBhZ2UgbmF2aWdhdGlvbiBkb2VzIG5vdCBvY2N1clxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBfaXNFZGl0aW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlwRm91bmRhdGlvbi5pc0VkaXRpbmcoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25FZGl0U3RhcnQoKSB7XG4gICAgLy8gRGVmZXIgaW5pdGlhbGl6aW5nIHRoZSBpbnB1dCBzbyBpdCBoYXMgdGltZSB0byBiZSBhZGRlZCB0byB0aGUgRE9NLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ2V0RWRpdElucHV0KCkuaW5pdGlhbGl6ZSh0aGlzLnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25FZGl0RmluaXNoKCkge1xuICAgIC8vIElmIHRoZSBlZGl0IGlucHV0IGlzIHN0aWxsIGZvY3VzZWQgb3IgZm9jdXMgd2FzIHJldHVybmVkIHRvIHRoZSBib2R5IGFmdGVyIGl0IHdhcyBkZXN0cm95ZWQsXG4gICAgLy8gcmV0dXJuIGZvY3VzIHRvIHRoZSBjaGlwIGNvbnRlbnRzLlxuICAgIGlmICh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLl9nZXRFZGl0SW5wdXQoKS5nZXROYXRpdmVFbGVtZW50KCkgfHxcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5fZG9jdW1lbnQuYm9keSkge1xuICAgICAgdGhpcy5jaGlwQ29udGVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIHRoaXMuZWRpdGVkLmVtaXQoe2NoaXA6IHRoaXMsIHZhbHVlOiB0aGlzLl9nZXRFZGl0SW5wdXQoKS5nZXRWYWx1ZSgpfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcHJvamVjdGVkIGNoaXAgZWRpdCBpbnB1dCwgb3IgdGhlIGRlZmF1bHQgaW5wdXQgaWYgbm9uZSBpcyBwcm9qZWN0ZWQgaW4uIE9uZSBvZiB0aGVzZVxuICAgKiB0d28gdmFsdWVzIGlzIGd1YXJhbnRlZWQgdG8gYmUgZGVmaW5lZC5cbiAgICovXG4gIHByaXZhdGUgX2dldEVkaXRJbnB1dCgpOiBNYXRDaGlwRWRpdElucHV0IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50RWRpdElucHV0IHx8IHRoaXMuZGVmYXVsdEVkaXRJbnB1dCE7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZWRpdGFibGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==