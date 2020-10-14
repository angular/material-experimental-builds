/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Inject, InjectionToken, Input, NgZone, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatLine } from '@angular/material-experimental/mdc-core';
import { MatListItemBase } from './list-base';
/**
 * Injection token that can be used to reference instances of an `SelectionList`. It serves
 * as alternative token to an actual implementation which would result in circular references.
 * @docs-private
 */
export const SELECTION_LIST = new InjectionToken('SelectionList');
/** Unique id for created list options. */
let uniqueId = 0;
export class MatListOption extends MatListItemBase {
    constructor(element, ngZone, platform, _selectionList, _changeDetectorRef) {
        super(element, ngZone, _selectionList, platform);
        this._selectionList = _selectionList;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * This is set to true after the first OnChanges cycle so we don't
         * clear the value of `selected` in the first cycle.
         */
        this._inputsInitialized = false;
        /** Unique id for the text. Used for describing the underlying checkbox input. */
        this._optionTextId = `mat-mdc-list-option-text-${uniqueId++}`;
        /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
        this.checkboxPosition = 'after';
        this._selected = false;
        // By default, we mark all options as unselected. The MDC list foundation will
        // automatically update the attribute based on selection. Note that we need to
        // initially set this because MDC does not set the default attributes for list
        // items but expects items to be set up properly in the static markup.
        element.nativeElement.setAttribute('aria-selected', 'false');
    }
    /** Theme color of the list option. This sets the color of the checkbox. */
    get color() { return this._color || this._selectionList.color; }
    set color(newValue) { this._color = newValue; }
    /** Value of the option */
    get value() { return this._value; }
    set value(newValue) {
        if (this.selected && newValue !== this.value && this._inputsInitialized) {
            this.selected = false;
        }
        this._value = newValue;
    }
    /** Whether the option is selected. */
    get selected() { return this._selectionList.selectedOptions.isSelected(this); }
    set selected(value) {
        const isSelected = coerceBooleanProperty(value);
        if (isSelected !== this._selected) {
            this._setSelected(isSelected);
            this._selectionList._reportValueChange();
        }
    }
    ngOnInit() {
        const list = this._selectionList;
        if (list._value && list._value.some(value => list.compareWith(value, this._value))) {
            this._setSelected(true);
        }
        const wasSelected = this._selected;
        // List options that are selected at initialization can't be reported properly to the form
        // control. This is because it takes some time until the selection-list knows about all
        // available options. Also it can happen that the ControlValueAccessor has an initial value
        // that should be used instead. Deferring the value change report to the next tick ensures
        // that the form control value is not being overwritten.
        Promise.resolve().then(() => {
            if (this._selected || wasSelected) {
                this.selected = true;
                this._changeDetectorRef.markForCheck();
            }
        });
        this._inputsInitialized = true;
    }
    ngOnDestroy() {
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(() => {
                this.selected = false;
            });
        }
    }
    /** Toggles the selection state of the option. */
    toggle() {
        this.selected = !this.selected;
    }
    /** Allows for programmatic focusing of the option. */
    focus() {
        this._hostElement.focus();
    }
    _isReversed() {
        return this.checkboxPosition === 'after';
    }
    /** Whether the list-option has a checkbox. */
    _hasCheckbox() {
        return this._selectionList.multiple;
    }
    _handleBlur() {
        this._selectionList._onTouched();
    }
    /**
     * Sets the selected state of the option.
     * @returns Whether the value has changed.
     */
    _setSelected(selected) {
        if (selected === this._selected) {
            return false;
        }
        this._selected = selected;
        if (selected) {
            this._selectionList.selectedOptions.select(this);
        }
        else {
            this._selectionList.selectedOptions.deselect(this);
        }
        this._changeDetectorRef.markForCheck();
        return true;
    }
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run.
     * Mainly used to trigger an update of the list option if the disabled state of the selection
     * list changed.
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
MatListOption.decorators = [
    { type: Component, args: [{
                selector: 'mat-list-option',
                exportAs: 'matListOption',
                host: {
                    'class': 'mat-mdc-list-item mat-mdc-list-option mdc-list-item',
                    'role': 'option',
                    // As per MDC, only list items in single selection mode should receive the `--selected`
                    // class. For multi selection, the checkbox is used as indicator.
                    '[class.mdc-list-item--selected]': 'selected && !_selectionList.multiple',
                    '[class.mat-mdc-list-item-with-avatar]': '_hasIconOrAvatar()',
                    '[class.mat-accent]': 'color !== "primary" && color !== "warn"',
                    '[class.mat-warn]': 'color === "warn"',
                    '(blur)': '_handleBlur()',
                },
                template: "<!--\n  Save icons and the pseudo checkbox so that they can be re-used in the\n  template without duplication.\n-->\n<ng-template #icons>\n  <ng-content select=\"[mat-list-avatar],[matListAvatar],[mat-list-icon],[matListIcon]\">\n  </ng-content>\n</ng-template>\n\n<ng-template #checkbox>\n  <div class=\"mdc-checkbox\" [class.mdc-checkbox--disabled]=\"disabled\">\n    <!--\n      Note: We stop propagation of the change event for the indicator checkbox so that\n      no accidental change event leaks out of the list option or selection list when\n      the checkbox is directly clicked.\n    -->\n    <input type=\"checkbox\" tabindex=\"-1\" class=\"mdc-checkbox__native-control\"\n           [checked]=\"selected\" [disabled]=\"disabled\" [attr.aria-describedby]=\"_optionTextId\"\n           (change)=\"$event.stopPropagation()\" />\n    <div class=\"mdc-checkbox__background\">\n      <svg class=\"mdc-checkbox__checkmark\"\n           viewBox=\"0 0 24 24\">\n        <path class=\"mdc-checkbox__checkmark-path\"\n              fill=\"none\"\n              d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n      </svg>\n      <div class=\"mdc-checkbox__mixedmark\"></div>\n    </div>\n  </div>\n</ng-template>\n\n<!-- Prefix -->\n<span class=\"mdc-list-item__graphic\"\n      *ngIf=\"!_isReversed() && (_hasIconOrAvatar() || _hasCheckbox())\">\n  <ng-container [ngTemplateOutlet]=\"_hasCheckbox() ? checkbox : icons\">\n  </ng-container>\n</span>\n\n<!-- Text -->\n<span class=\"mdc-list-item__text\" #text [id]=\"_optionTextId\">\n  <ng-content></ng-content>\n</span>\n\n<!-- Suffix -->\n<span class=\"mdc-list-item__meta\"\n      *ngIf=\"_isReversed() && (_hasCheckbox() || _hasIconOrAvatar())\">\n  <ng-container [ngTemplateOutlet]=\"_hasCheckbox() ? checkbox : icons\">\n  </ng-container>\n</span>\n\n<!-- Divider -->\n<ng-content select=\"mat-divider\"></ng-content>\n\n<!--\n  Strong focus indicator element. MDC uses the `::before` pseudo element for the default\n  focus/hover/selected state, so we need a separate element.\n-->\n<div class=\"mat-mdc-focus-indicator\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: MatListItemBase, useExisting: MatListOption },
                ],
                styles: [".mdc-checkbox{padding:11px;margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF01878600000000FF018786}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF01878600000000FF018786}.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}@media screen and (-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}\n"]
            },] }
];
MatListOption.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Platform },
    { type: undefined, decorators: [{ type: Inject, args: [SELECTION_LIST,] }] },
    { type: ChangeDetectorRef }
];
MatListOption.propDecorators = {
    _itemText: [{ type: ViewChild, args: ['text',] }],
    lines: [{ type: ContentChildren, args: [MatLine, { read: ElementRef, descendants: true },] }],
    checkboxPosition: [{ type: Input }],
    color: [{ type: Input }],
    value: [{ type: Input }],
    selected: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L2xpc3Qtb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTFFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBYyxlQUFlLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFekQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsZUFBZSxDQUFDLENBQUM7QUFpQmpGLDBDQUEwQztBQUMxQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUF3QmpCLE1BQU0sT0FBTyxhQUFjLFNBQVEsZUFBZTtJQWdEaEQsWUFDSSxPQUFtQixFQUNuQixNQUFjLEVBQ2QsUUFBa0IsRUFDYSxjQUE2QixFQUNwRCxrQkFBcUM7UUFDL0MsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRmhCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQ3BELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFwRGpEOzs7V0FHRztRQUNLLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQU1uQyxpRkFBaUY7UUFDakYs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QUF1RjtvQkFDdkYsaUVBQWlFO29CQUNqRSxpQ0FBaUMsRUFBRSxzQ0FBc0M7b0JBQ3pFLHVDQUF1QyxFQUFFLG9CQUFvQjtvQkFDN0Qsb0JBQW9CLEVBQUUseUNBQXlDO29CQUMvRCxrQkFBa0IsRUFBRSxrQkFBa0I7b0JBQ3RDLFFBQVEsRUFBRSxlQUFlO2lCQUMxQjtnQkFDRCxnakVBQStCO2dCQUMvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBQztpQkFDdkQ7O2FBQ0Y7OztZQTVEQyxVQUFVO1lBSVYsTUFBTTtZQVZBLFFBQVE7NENBdUhULE1BQU0sU0FBQyxjQUFjO1lBcEgxQixpQkFBaUI7Ozt3QkF1RWhCLFNBQVMsU0FBQyxNQUFNO29CQUNoQixlQUFlLFNBQUMsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDOytCQU85RCxLQUFLO29CQUdMLEtBQUs7b0JBTUwsS0FBSzt1QkFZTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1NlbGVjdGlvbk1vZGVsfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdExpbmUsIFRoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7TWF0TGlzdEJhc2UsIE1hdExpc3RJdGVtQmFzZX0gZnJvbSAnLi9saXN0LWJhc2UnO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZmVyZW5jZSBpbnN0YW5jZXMgb2YgYW4gYFNlbGVjdGlvbkxpc3RgLiBJdCBzZXJ2ZXNcbiAqIGFzIGFsdGVybmF0aXZlIHRva2VuIHRvIGFuIGFjdHVhbCBpbXBsZW1lbnRhdGlvbiB3aGljaCB3b3VsZCByZXN1bHQgaW4gY2lyY3VsYXIgcmVmZXJlbmNlcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVElPTl9MSVNUID0gbmV3IEluamVjdGlvblRva2VuPFNlbGVjdGlvbkxpc3Q+KCdTZWxlY3Rpb25MaXN0Jyk7XG5cbi8qKlxuICogSW50ZXJmYWNlIGRlc2NyaWJpbmcgdGhlIGNvbnRhaW5pbmcgbGlzdCBvZiBhbiBsaXN0IG9wdGlvbi4gVGhpcyBpcyB1c2VkIHRvIGF2b2lkXG4gKiBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYmV0d2VlbiB0aGUgbGlzdC1vcHRpb24gYW5kIHRoZSBzZWxlY3Rpb24gbGlzdC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3Rpb25MaXN0IGV4dGVuZHMgTWF0TGlzdEJhc2Uge1xuICBtdWx0aXBsZTogYm9vbGVhbjtcbiAgY29sb3I6IFRoZW1lUGFsZXR0ZTtcbiAgc2VsZWN0ZWRPcHRpb25zOiBTZWxlY3Rpb25Nb2RlbDxNYXRMaXN0T3B0aW9uPjtcbiAgY29tcGFyZVdpdGg6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuO1xuICBfdmFsdWU6IHN0cmluZ1tdfG51bGw7XG4gIF9yZXBvcnRWYWx1ZUNoYW5nZTogKCkgPT4gdm9pZDtcbiAgX29uVG91Y2hlZDogKCkgPT4gdm9pZDtcbn1cblxuLyoqIFVuaXF1ZSBpZCBmb3IgY3JlYXRlZCBsaXN0IG9wdGlvbnMuICovXG5sZXQgdW5pcXVlSWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtbGlzdC1vcHRpb24nLFxuICBleHBvcnRBczogJ21hdExpc3RPcHRpb24nLFxuICBzdHlsZVVybHM6IFsnbGlzdC1vcHRpb24uY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1saXN0LWl0ZW0gbWF0LW1kYy1saXN0LW9wdGlvbiBtZGMtbGlzdC1pdGVtJyxcbiAgICAncm9sZSc6ICdvcHRpb24nLFxuICAgIC8vIEFzIHBlciBNREMsIG9ubHkgbGlzdCBpdGVtcyBpbiBzaW5nbGUgc2VsZWN0aW9uIG1vZGUgc2hvdWxkIHJlY2VpdmUgdGhlIGAtLXNlbGVjdGVkYFxuICAgIC8vIGNsYXNzLiBGb3IgbXVsdGkgc2VsZWN0aW9uLCB0aGUgY2hlY2tib3ggaXMgdXNlZCBhcyBpbmRpY2F0b3IuXG4gICAgJ1tjbGFzcy5tZGMtbGlzdC1pdGVtLS1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQgJiYgIV9zZWxlY3Rpb25MaXN0Lm11bHRpcGxlJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtbGlzdC1pdGVtLXdpdGgtYXZhdGFyXSc6ICdfaGFzSWNvbk9yQXZhdGFyKCknLFxuICAgICdbY2xhc3MubWF0LWFjY2VudF0nOiAnY29sb3IgIT09IFwicHJpbWFyeVwiICYmIGNvbG9yICE9PSBcIndhcm5cIicsXG4gICAgJ1tjbGFzcy5tYXQtd2Fybl0nOiAnY29sb3IgPT09IFwid2FyblwiJyxcbiAgICAnKGJsdXIpJzogJ19oYW5kbGVCbHVyKCknLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogJ2xpc3Qtb3B0aW9uLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1hdExpc3RJdGVtQmFzZSwgdXNlRXhpc3Rpbmc6IE1hdExpc3RPcHRpb259LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdExpc3RPcHRpb24gZXh0ZW5kcyBNYXRMaXN0SXRlbUJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGlzIGlzIHNldCB0byB0cnVlIGFmdGVyIHRoZSBmaXJzdCBPbkNoYW5nZXMgY3ljbGUgc28gd2UgZG9uJ3RcbiAgICogY2xlYXIgdGhlIHZhbHVlIG9mIGBzZWxlY3RlZGAgaW4gdGhlIGZpcnN0IGN5Y2xlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5wdXRzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCd0ZXh0JykgX2l0ZW1UZXh0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaW5lLCB7cmVhZDogRWxlbWVudFJlZiwgZGVzY2VuZGFudHM6IHRydWV9KSBsaW5lczpcbiAgICBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj47XG5cbiAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIHRleHQuIFVzZWQgZm9yIGRlc2NyaWJpbmcgdGhlIHVuZGVybHlpbmcgY2hlY2tib3ggaW5wdXQuICovXG4gIF9vcHRpb25UZXh0SWQ6IHN0cmluZyA9IGBtYXQtbWRjLWxpc3Qtb3B0aW9uLXRleHQtJHt1bmlxdWVJZCsrfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxhYmVsIHNob3VsZCBhcHBlYXIgYmVmb3JlIG9yIGFmdGVyIHRoZSBjaGVja2JveC4gRGVmYXVsdHMgdG8gJ2FmdGVyJyAqL1xuICBASW5wdXQoKSBjaGVja2JveFBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gIC8qKiBUaGVtZSBjb2xvciBvZiB0aGUgbGlzdCBvcHRpb24uIFRoaXMgc2V0cyB0aGUgY29sb3Igb2YgdGhlIGNoZWNrYm94LiAqL1xuICBASW5wdXQoKVxuICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHsgcmV0dXJuIHRoaXMuX2NvbG9yIHx8IHRoaXMuX3NlbGVjdGlvbkxpc3QuY29sb3I7IH1cbiAgc2V0IGNvbG9yKG5ld1ZhbHVlOiBUaGVtZVBhbGV0dGUpIHsgdGhpcy5fY29sb3IgPSBuZXdWYWx1ZTsgfVxuICBwcml2YXRlIF9jb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gIC8qKiBWYWx1ZSBvZiB0aGUgb3B0aW9uICovXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiBuZXdWYWx1ZSAhPT0gdGhpcy52YWx1ZSAmJiB0aGlzLl9pbnB1dHNJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAvKiogV2hldGhlciB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zZWxlY3Rpb25MaXN0LnNlbGVjdGVkT3B0aW9ucy5pc1NlbGVjdGVkKHRoaXMpOyB9XG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgaWYgKGlzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZXRTZWxlY3RlZChpc1NlbGVjdGVkKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbkxpc3QuX3JlcG9ydFZhbHVlQ2hhbmdlKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICBASW5qZWN0KFNFTEVDVElPTl9MSVNUKSBwdWJsaWMgX3NlbGVjdGlvbkxpc3Q6IFNlbGVjdGlvbkxpc3QsXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50LCBuZ1pvbmUsIF9zZWxlY3Rpb25MaXN0LCBwbGF0Zm9ybSk7XG5cbiAgICAvLyBCeSBkZWZhdWx0LCB3ZSBtYXJrIGFsbCBvcHRpb25zIGFzIHVuc2VsZWN0ZWQuIFRoZSBNREMgbGlzdCBmb3VuZGF0aW9uIHdpbGxcbiAgICAvLyBhdXRvbWF0aWNhbGx5IHVwZGF0ZSB0aGUgYXR0cmlidXRlIGJhc2VkIG9uIHNlbGVjdGlvbi4gTm90ZSB0aGF0IHdlIG5lZWQgdG9cbiAgICAvLyBpbml0aWFsbHkgc2V0IHRoaXMgYmVjYXVzZSBNREMgZG9lcyBub3Qgc2V0IHRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIGxpc3RcbiAgICAvLyBpdGVtcyBidXQgZXhwZWN0cyBpdGVtcyB0byBiZSBzZXQgdXAgcHJvcGVybHkgaW4gdGhlIHN0YXRpYyBtYXJrdXAuXG4gICAgZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX3NlbGVjdGlvbkxpc3Q7XG5cbiAgICBpZiAobGlzdC5fdmFsdWUgJiYgbGlzdC5fdmFsdWUuc29tZSh2YWx1ZSA9PiBsaXN0LmNvbXBhcmVXaXRoKHZhbHVlLCB0aGlzLl92YWx1ZSkpKSB7XG4gICAgICB0aGlzLl9zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICB9XG5cbiAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkO1xuXG4gICAgLy8gTGlzdCBvcHRpb25zIHRoYXQgYXJlIHNlbGVjdGVkIGF0IGluaXRpYWxpemF0aW9uIGNhbid0IGJlIHJlcG9ydGVkIHByb3Blcmx5IHRvIHRoZSBmb3JtXG4gICAgLy8gY29udHJvbC4gVGhpcyBpcyBiZWNhdXNlIGl0IHRha2VzIHNvbWUgdGltZSB1bnRpbCB0aGUgc2VsZWN0aW9uLWxpc3Qga25vd3MgYWJvdXQgYWxsXG4gICAgLy8gYXZhaWxhYmxlIG9wdGlvbnMuIEFsc28gaXQgY2FuIGhhcHBlbiB0aGF0IHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBoYXMgYW4gaW5pdGlhbCB2YWx1ZVxuICAgIC8vIHRoYXQgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC4gRGVmZXJyaW5nIHRoZSB2YWx1ZSBjaGFuZ2UgcmVwb3J0IHRvIHRoZSBuZXh0IHRpY2sgZW5zdXJlc1xuICAgIC8vIHRoYXQgdGhlIGZvcm0gY29udHJvbCB2YWx1ZSBpcyBub3QgYmVpbmcgb3ZlcndyaXR0ZW4uXG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgfHwgd2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2lucHV0c0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAvLyBXZSBoYXZlIHRvIGRlbGF5IHRoaXMgdW50aWwgdGhlIG5leHQgdGljayBpbiBvcmRlclxuICAgICAgLy8gdG8gYXZvaWQgY2hhbmdlZCBhZnRlciBjaGVja2VkIGVycm9ycy5cbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgc2VsZWN0aW9uIHN0YXRlIG9mIHRoZSBvcHRpb24uICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICAvKiogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgZm9jdXNpbmcgb2YgdGhlIG9wdGlvbi4gKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIF9pc1JldmVyc2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrYm94UG9zaXRpb24gPT09ICdhZnRlcic7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGlzdC1vcHRpb24gaGFzIGEgY2hlY2tib3guICovXG4gIF9oYXNDaGVja2JveCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTGlzdC5tdWx0aXBsZTtcbiAgfVxuXG4gIF9oYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvbkxpc3QuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIHRoZSBvcHRpb24uXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgX3NldFNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKHNlbGVjdGVkID09PSB0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG5cbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbkxpc3Quc2VsZWN0ZWRPcHRpb25zLnNlbGVjdCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTGlzdC5zZWxlY3RlZE9wdGlvbnMuZGVzZWxlY3QodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogTm90aWZpZXMgQW5ndWxhciB0aGF0IHRoZSBvcHRpb24gbmVlZHMgdG8gYmUgY2hlY2tlZCBpbiB0aGUgbmV4dCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bi5cbiAgICogTWFpbmx5IHVzZWQgdG8gdHJpZ2dlciBhbiB1cGRhdGUgb2YgdGhlIGxpc3Qgb3B0aW9uIGlmIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0aW9uXG4gICAqIGxpc3QgY2hhbmdlZC5cbiAgICovXG4gIF9tYXJrRm9yQ2hlY2soKSB7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==