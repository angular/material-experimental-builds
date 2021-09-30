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
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1yb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXJvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wseUJBQXlCLEdBRTFCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQVVuRDs7O0dBR0c7QUE0QkgsTUFBTSxPQUFPLFVBQVcsU0FBUSxPQUFPO0lBK0JyQyxZQUNxQyxTQUFjLEVBQ2pELGlCQUFvQyxFQUNwQyxVQUFzQixFQUFFLE1BQWMsRUFDMUIsR0FBbUIsRUFDWSxhQUFzQixFQUU3RCxtQkFBeUM7UUFDN0MsS0FBSyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBUG5ELGNBQVMsR0FBVCxTQUFTLENBQUs7UUE5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QXlCOzs7dUJBakM5QyxLQUFLO3FCQUdMLE1BQU07MEJBT04sU0FBUyxTQUFDLGFBQWE7K0JBR3ZCLFNBQVMsU0FBQyxnQkFBZ0I7K0JBRzFCLFlBQVksU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0JBQ0tTUEFDRSwgREVMRVRFfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBSaXBwbGVHbG9iYWxPcHRpb25zLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtNYXRDaGlwLCBNYXRDaGlwRXZlbnR9IGZyb20gJy4vY2hpcCc7XG5pbXBvcnQge01hdENoaXBFZGl0SW5wdXR9IGZyb20gJy4vY2hpcC1lZGl0LWlucHV0JztcbmltcG9ydCB7R3JpZEtleU1hbmFnZXJSb3d9IGZyb20gJy4vZ3JpZC1rZXktbWFuYWdlcic7XG5cblxuLyoqIFJlcHJlc2VudHMgYW4gZXZlbnQgZmlyZWQgb24gYW4gaW5kaXZpZHVhbCBgbWF0LWNoaXBgIHdoZW4gaXQgaXMgZWRpdGVkLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRDaGlwRWRpdGVkRXZlbnQgZXh0ZW5kcyBNYXRDaGlwRXZlbnQge1xuICAvKiogVGhlIGZpbmFsIGVkaXQgdmFsdWUuICovXG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gZXh0ZW5zaW9uIG9mIHRoZSBNYXRDaGlwIGNvbXBvbmVudCB1c2VkIHdpdGggTWF0Q2hpcEdyaWQgYW5kXG4gKiB0aGUgbWF0Q2hpcElucHV0Rm9yIGRpcmVjdGl2ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtcm93LCBtYXQtYmFzaWMtY2hpcC1yb3cnLFxuICB0ZW1wbGF0ZVVybDogJ2NoaXAtcm93Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hpcHMuY3NzJ10sXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJywgJ3RhYkluZGV4J10sXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdyb3cnLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtcm93JyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1jaGlwLWhpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWNoaXAtd2l0aC1hdmF0YXJdJzogJ2xlYWRpbmdJY29uJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtY2hpcC13aXRoLXRyYWlsaW5nLWljb25dJzogJ3RyYWlsaW5nSWNvbiB8fCByZW1vdmVJY29uJyxcbiAgICAnW2NsYXNzLm1kYy1jaGlwLS1lZGl0YWJsZV0nOiAnZWRpdGFibGUnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW3RhYkluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJyhtb3VzZWRvd24pJzogJ19tb3VzZWRvd24oJGV2ZW50KScsXG4gICAgJyhkYmxjbGljayknOiAnX2RibGNsaWNrKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gICAgJyhmb2N1c2luKSc6ICdfZm9jdXNpbigkZXZlbnQpJyxcbiAgICAnKGZvY3Vzb3V0KSc6ICdfZm9jdXNvdXQoJGV2ZW50KSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1hdENoaXAsIHVzZUV4aXN0aW5nOiBNYXRDaGlwUm93fV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwUm93IGV4dGVuZHMgTWF0Q2hpcCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsXG4gIEdyaWRLZXlNYW5hZ2VyUm93PEhUTUxFbGVtZW50PiB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcC1yb3cnO1xuXG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgY2hpcCBpcyBlZGl0ZWQuICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBlZGl0ZWQ6IEV2ZW50RW1pdHRlcjxNYXRDaGlwRWRpdGVkRXZlbnQ+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcEVkaXRlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9jdXNhYmxlIHdyYXBwZXIgZWxlbWVudCBpbiB0aGUgZmlyc3QgZ3JpZGNlbGwsIHdoaWNoIGNvbnRhaW5zIGFsbFxuICAgKiBjaGlwIGNvbnRlbnQgb3RoZXIgdGhhbiB0aGUgcmVtb3ZlIGljb24uXG4gICAqL1xuICBAVmlld0NoaWxkKCdjaGlwQ29udGVudCcpIGNoaXBDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIC8qKiBUaGUgZGVmYXVsdCBjaGlwIGVkaXQgaW5wdXQgdGhhdCBpcyB1c2VkIGlmIG5vbmUgaXMgcHJvamVjdGVkIGludG8gdGhpcyBjaGlwIHJvdy4gKi9cbiAgQFZpZXdDaGlsZChNYXRDaGlwRWRpdElucHV0KSBkZWZhdWx0RWRpdElucHV0PzogTWF0Q2hpcEVkaXRJbnB1dDtcblxuICAvKiogVGhlIHByb2plY3RlZCBjaGlwIGVkaXQgaW5wdXQuICovXG4gIEBDb250ZW50Q2hpbGQoTWF0Q2hpcEVkaXRJbnB1dCkgY29udGVudEVkaXRJbnB1dD86IE1hdENoaXBFZGl0SW5wdXQ7XG5cbiAgLyoqIFRoZSBmb2N1c2FibGUgZ3JpZCBjZWxscyBmb3IgdGhpcyByb3cuIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgR3JpZEtleU1hbmFnZXJSb3cuICovXG4gIGNlbGxzITogSFRNTEVsZW1lbnRbXTtcblxuICAvKipcbiAgICogVGltZW91dCB1c2VkIHRvIGdpdmUgc29tZSB0aW1lIGJldHdlZW4gYGZvY3VzaW5gIGFuZCBgZm9jdXNvdXRgXG4gICAqIGluIG9yZGVyIHRvIGRldGVybWluZSB3aGV0aGVyIGZvY3VzIGhhcyBsZWZ0IHRoZSBjaGlwLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9jdXNvdXRUaW1lb3V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSByZWFkb25seSBfZG9jdW1lbnQ6IGFueSxcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgbmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMpXG4gICAgICAgIGdsb2JhbFJpcHBsZU9wdGlvbnM/OiBSaXBwbGVHbG9iYWxPcHRpb25zKSB7XG4gICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3JSZWYsIGVsZW1lbnRSZWYsIG5nWm9uZSwgZGlyLCBhbmltYXRpb25Nb2RlLCBnbG9iYWxSaXBwbGVPcHRpb25zKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyQ29udGVudEluaXQoKTtcblxuICAgIGlmICh0aGlzLnJlbW92ZUljb24pIHtcbiAgICAgIC8vIERlZmVyIHNldHRpbmcgdGhlIHZhbHVlIGluIG9yZGVyIHRvIGF2b2lkIHRoZSBcIkV4cHJlc3Npb25cbiAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmVJY29uIGhhcyB0YWJJbmRleCAwIGZvciByZWd1bGFyIGNoaXBzLCBidXQgc2hvdWxkIG9ubHkgYmUgZm9jdXNhYmxlIGJ5XG4gICAgICAgIC8vIHRoZSBHcmlkRm9jdXNLZXlNYW5hZ2VyIGZvciByb3cgY2hpcHMuXG4gICAgICAgIHRoaXMucmVtb3ZlSWNvbi50YWJJbmRleCA9IC0xO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGUgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLnJlbW92ZUljb24gP1xuICAgICAgW3RoaXMuY2hpcENvbnRlbnQubmF0aXZlRWxlbWVudCwgdGhpcy5yZW1vdmVJY29uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRdIDpcbiAgICAgIFt0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBjaGlwLlxuICAgKiBTZW5kcyBmb2N1cyB0byB0aGUgZmlyc3QgZ3JpZCBjZWxsLiBUaGUgcm93IGNoaXAgZWxlbWVudCBpdHNlbGZcbiAgICogaXMgbmV2ZXIgZm9jdXNlZC5cbiAgICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9oYXNGb2N1c0ludGVybmFsKSB7XG4gICAgICB0aGlzLl9vbkZvY3VzLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaXBDb250ZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGJsdXIgZXZlbnQgd2hlbiBvbmUgb2YgdGhlIGdyaWRjZWxscyBsb3NlcyBmb2N1cywgdW5sZXNzIGZvY3VzIG1vdmVkXG4gICAqIHRvIHRoZSBvdGhlciBncmlkY2VsbC5cbiAgICovXG4gIF9mb2N1c291dChldmVudDogRm9jdXNFdmVudCkge1xuICAgIGlmICh0aGlzLl9mb2N1c291dFRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9mb2N1c291dFRpbWVvdXQpO1xuICAgIH1cblxuICAgIC8vIFdhaXQgdG8gc2VlIGlmIGZvY3VzIG1vdmVzIHRvIHRoZSBvdGhlciBncmlkY2VsbFxuICAgIHRoaXMuX2ZvY3Vzb3V0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5faGFzRm9jdXNJbnRlcm5hbCA9IGZhbHNlO1xuICAgICAgdGhpcy5fb25CbHVyLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZWNvcmRzIHRoYXQgdGhlIGNoaXAgaGFzIGZvY3VzIHdoZW4gb25lIG9mIHRoZSBncmlkY2VsbHMgaXMgZm9jdXNlZC4gKi9cbiAgX2ZvY3VzaW4oZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICBpZiAodGhpcy5fZm9jdXNvdXRUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZm9jdXNvdXRUaW1lb3V0KTtcbiAgICAgIHRoaXMuX2ZvY3Vzb3V0VGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5faGFzRm9jdXNJbnRlcm5hbCA9IHRydWU7XG4gICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICB9XG5cbiAgLyoqIFNlbmRzIGZvY3VzIHRvIHRoZSBmaXJzdCBncmlkY2VsbCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBpbnNpZGUgdGhlIGNoaXAuICovXG4gIF9tb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNFZGl0aW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgX2RibGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgY3VzdG9tIGtleSBwcmVzc2VzLiAqL1xuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9pc0VkaXRpbmcoKSkge1xuICAgICAgdGhpcy5faGFuZGxlSW50ZXJhY3Rpb24oZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZm9jdXNlZCBjaGlwXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNvIHBhZ2UgbmF2aWdhdGlvbiBkb2VzIG5vdCBvY2N1clxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2hhbmRsZUludGVyYWN0aW9uKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBfaXNFZGl0aW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlwRm91bmRhdGlvbi5pc0VkaXRpbmcoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfb25FZGl0U3RhcnQoKSB7XG4gICAgLy8gRGVmZXIgaW5pdGlhbGl6aW5nIHRoZSBpbnB1dCBzbyBpdCBoYXMgdGltZSB0byBiZSBhZGRlZCB0byB0aGUgRE9NLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ2V0RWRpdElucHV0KCkuaW5pdGlhbGl6ZSh0aGlzLnZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfb25FZGl0RmluaXNoKCkge1xuICAgIC8vIElmIHRoZSBlZGl0IGlucHV0IGlzIHN0aWxsIGZvY3VzZWQgb3IgZm9jdXMgd2FzIHJldHVybmVkIHRvIHRoZSBib2R5IGFmdGVyIGl0IHdhcyBkZXN0cm95ZWQsXG4gICAgLy8gcmV0dXJuIGZvY3VzIHRvIHRoZSBjaGlwIGNvbnRlbnRzLlxuICAgIGlmICh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLl9nZXRFZGl0SW5wdXQoKS5nZXROYXRpdmVFbGVtZW50KCkgfHxcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5fZG9jdW1lbnQuYm9keSkge1xuICAgICAgdGhpcy5jaGlwQ29udGVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIHRoaXMuZWRpdGVkLmVtaXQoe2NoaXA6IHRoaXMsIHZhbHVlOiB0aGlzLl9nZXRFZGl0SW5wdXQoKS5nZXRWYWx1ZSgpfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcHJvamVjdGVkIGNoaXAgZWRpdCBpbnB1dCwgb3IgdGhlIGRlZmF1bHQgaW5wdXQgaWYgbm9uZSBpcyBwcm9qZWN0ZWQgaW4uIE9uZSBvZiB0aGVzZVxuICAgKiB0d28gdmFsdWVzIGlzIGd1YXJhbnRlZWQgdG8gYmUgZGVmaW5lZC5cbiAgICovXG4gIHByaXZhdGUgX2dldEVkaXRJbnB1dCgpOiBNYXRDaGlwRWRpdElucHV0IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50RWRpdElucHV0IHx8IHRoaXMuZGVmYXVsdEVkaXRJbnB1dCE7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZWRpdGFibGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==