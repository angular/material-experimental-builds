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
import { MatLine } from '@angular/material/core';
import { MatListAvatarCssMatStyler, MatListIconCssMatStyler } from './list';
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
    /** Whether the list-option has icons or avatars. */
    _hasIconOrAvatar() {
        return this._avatars.length || this._icons.length;
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
    _avatars: [{ type: ContentChildren, args: [MatListAvatarCssMatStyler, { descendants: false },] }],
    _icons: [{ type: ContentChildren, args: [MatListIconCssMatStyler, { descendants: false },] }],
    checkboxPosition: [{ type: Input }],
    color: [{ type: Input }],
    value: [{ type: Input }],
    selected: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1saXN0L2xpc3Qtb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTFFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyx5QkFBeUIsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMxRSxPQUFPLEVBQWMsZUFBZSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXpEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQWdCLGVBQWUsQ0FBQyxDQUFDO0FBaUJqRiwwQ0FBMEM7QUFDMUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBd0JqQixNQUFNLE9BQU8sYUFBYyxTQUFRLGVBQWU7SUFtRGhELFlBQ0ksT0FBbUIsRUFDbkIsTUFBYyxFQUNkLFFBQWtCLEVBQ2EsY0FBNkIsRUFDcEQsa0JBQXFDO1FBQy9DLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUZoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNwRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBdkRq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LFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7OztZQWpMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGVBQWU7Z0JBRXpCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUscURBQXFEO29CQUM5RCxNQUFNLEVBQUUsUUFBUTtvQkFDaEIsdUZBQXVGO29CQUN2RixpRUFBaUU7b0JBQ2pFLGlDQUFpQyxFQUFFLHNDQUFzQztvQkFDekUsdUNBQXVDLEVBQUUsb0JBQW9CO29CQUM3RCxvQkFBb0IsRUFBRSx5Q0FBeUM7b0JBQy9ELGtCQUFrQixFQUFFLGtCQUFrQjtvQkFDdEMsUUFBUSxFQUFFLGVBQWU7aUJBQzFCO2dCQUNELGdqRUFBK0I7Z0JBQy9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDO2lCQUN2RDs7YUFDRjs7O1lBN0RDLFVBQVU7WUFJVixNQUFNO1lBVkEsUUFBUTs0Q0EySFQsTUFBTSxTQUFDLGNBQWM7WUF4SDFCLGlCQUFpQjs7O3dCQXdFaEIsU0FBUyxTQUFDLE1BQU07b0JBQ2hCLGVBQWUsU0FBQyxPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUM7dUJBRzlELGVBQWUsU0FBQyx5QkFBeUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUM7cUJBQy9ELGVBQWUsU0FBQyx1QkFBdUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUM7K0JBTTdELEtBQUs7b0JBR0wsS0FBSztvQkFNTCxLQUFLO3VCQVlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U2VsZWN0aW9uTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TGluZSwgVGhlbWVQYWxldHRlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0TGlzdEF2YXRhckNzc01hdFN0eWxlciwgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXJ9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQge01hdExpc3RCYXNlLCBNYXRMaXN0SXRlbUJhc2V9IGZyb20gJy4vbGlzdC1iYXNlJztcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGFuIGBTZWxlY3Rpb25MaXN0YC4gSXQgc2VydmVzXG4gKiBhcyBhbHRlcm5hdGl2ZSB0b2tlbiB0byBhbiBhY3R1YWwgaW1wbGVtZW50YXRpb24gd2hpY2ggd291bGQgcmVzdWx0IGluIGNpcmN1bGFyIHJlZmVyZW5jZXMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RJT05fTElTVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTZWxlY3Rpb25MaXN0PignU2VsZWN0aW9uTGlzdCcpO1xuXG4vKipcbiAqIEludGVyZmFjZSBkZXNjcmliaW5nIHRoZSBjb250YWluaW5nIGxpc3Qgb2YgYW4gbGlzdCBvcHRpb24uIFRoaXMgaXMgdXNlZCB0byBhdm9pZFxuICogY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGJldHdlZW4gdGhlIGxpc3Qtb3B0aW9uIGFuZCB0aGUgc2VsZWN0aW9uIGxpc3QuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0aW9uTGlzdCBleHRlbmRzIE1hdExpc3RCYXNlIHtcbiAgbXVsdGlwbGU6IGJvb2xlYW47XG4gIGNvbG9yOiBUaGVtZVBhbGV0dGU7XG4gIHNlbGVjdGVkT3B0aW9uczogU2VsZWN0aW9uTW9kZWw8TWF0TGlzdE9wdGlvbj47XG4gIGNvbXBhcmVXaXRoOiAobzE6IGFueSwgbzI6IGFueSkgPT4gYm9vbGVhbjtcbiAgX3ZhbHVlOiBzdHJpbmdbXXxudWxsO1xuICBfcmVwb3J0VmFsdWVDaGFuZ2U6ICgpID0+IHZvaWQ7XG4gIF9vblRvdWNoZWQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKiBVbmlxdWUgaWQgZm9yIGNyZWF0ZWQgbGlzdCBvcHRpb25zLiAqL1xubGV0IHVuaXF1ZUlkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWxpc3Qtb3B0aW9uJyxcbiAgZXhwb3J0QXM6ICdtYXRMaXN0T3B0aW9uJyxcbiAgc3R5bGVVcmxzOiBbJ2xpc3Qtb3B0aW9uLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtbGlzdC1pdGVtIG1hdC1tZGMtbGlzdC1vcHRpb24gbWRjLWxpc3QtaXRlbScsXG4gICAgJ3JvbGUnOiAnb3B0aW9uJyxcbiAgICAvLyBBcyBwZXIgTURDLCBvbmx5IGxpc3QgaXRlbXMgaW4gc2luZ2xlIHNlbGVjdGlvbiBtb2RlIHNob3VsZCByZWNlaXZlIHRoZSBgLS1zZWxlY3RlZGBcbiAgICAvLyBjbGFzcy4gRm9yIG11bHRpIHNlbGVjdGlvbiwgdGhlIGNoZWNrYm94IGlzIHVzZWQgYXMgaW5kaWNhdG9yLlxuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWRdJzogJ3NlbGVjdGVkICYmICFfc2VsZWN0aW9uTGlzdC5tdWx0aXBsZScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWxpc3QtaXRlbS13aXRoLWF2YXRhcl0nOiAnX2hhc0ljb25PckF2YXRhcigpJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yICE9PSBcInByaW1hcnlcIiAmJiBjb2xvciAhPT0gXCJ3YXJuXCInLFxuICAgICdbY2xhc3MubWF0LXdhcm5dJzogJ2NvbG9yID09PSBcIndhcm5cIicsXG4gICAgJyhibHVyKSc6ICdfaGFuZGxlQmx1cigpJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6ICdsaXN0LW9wdGlvbi5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNYXRMaXN0SXRlbUJhc2UsIHVzZUV4aXN0aW5nOiBNYXRMaXN0T3B0aW9ufSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRMaXN0T3B0aW9uIGV4dGVuZHMgTWF0TGlzdEl0ZW1CYXNlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhpcyBpcyBzZXQgdG8gdHJ1ZSBhZnRlciB0aGUgZmlyc3QgT25DaGFuZ2VzIGN5Y2xlIHNvIHdlIGRvbid0XG4gICAqIGNsZWFyIHRoZSB2YWx1ZSBvZiBgc2VsZWN0ZWRgIGluIHRoZSBmaXJzdCBjeWNsZS5cbiAgICovXG4gIHByaXZhdGUgX2lucHV0c0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgndGV4dCcpIF9pdGVtVGV4dDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0TGluZSwge3JlYWQ6IEVsZW1lbnRSZWYsIGRlc2NlbmRhbnRzOiB0cnVlfSkgbGluZXM6XG4gICAgUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0TGlzdEF2YXRhckNzc01hdFN0eWxlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIF9hdmF0YXJzOiBRdWVyeUxpc3Q8bmV2ZXI+O1xuICBAQ29udGVudENoaWxkcmVuKE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgX2ljb25zOiBRdWVyeUxpc3Q8bmV2ZXI+O1xuXG4gIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSB0ZXh0LiBVc2VkIGZvciBkZXNjcmliaW5nIHRoZSB1bmRlcmx5aW5nIGNoZWNrYm94IGlucHV0LiAqL1xuICBfb3B0aW9uVGV4dElkOiBzdHJpbmcgPSBgbWF0LW1kYy1saXN0LW9wdGlvbi10ZXh0LSR7dW5pcXVlSWQrK31gO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYWJlbCBzaG91bGQgYXBwZWFyIGJlZm9yZSBvciBhZnRlciB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvICdhZnRlcicgKi9cbiAgQElucHV0KCkgY2hlY2tib3hQb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2FmdGVyJztcblxuICAvKiogVGhlbWUgY29sb3Igb2YgdGhlIGxpc3Qgb3B0aW9uLiBUaGlzIHNldHMgdGhlIGNvbG9yIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7IHJldHVybiB0aGlzLl9jb2xvciB8fCB0aGlzLl9zZWxlY3Rpb25MaXN0LmNvbG9yOyB9XG4gIHNldCBjb2xvcihuZXdWYWx1ZTogVGhlbWVQYWxldHRlKSB7IHRoaXMuX2NvbG9yID0gbmV3VmFsdWU7IH1cbiAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICAvKiogVmFsdWUgb2YgdGhlIG9wdGlvbiAqL1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgbmV3VmFsdWUgIT09IHRoaXMudmFsdWUgJiYgdGhpcy5faW5wdXRzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTGlzdC5zZWxlY3RlZE9wdGlvbnMuaXNTZWxlY3RlZCh0aGlzKTsgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgIGlmIChpc1NlbGVjdGVkICE9PSB0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25MaXN0Ll9yZXBvcnRWYWx1ZUNoYW5nZSgpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgQEluamVjdChTRUxFQ1RJT05fTElTVCkgcHVibGljIF9zZWxlY3Rpb25MaXN0OiBTZWxlY3Rpb25MaXN0LFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgbmdab25lLCBfc2VsZWN0aW9uTGlzdCwgcGxhdGZvcm0pO1xuXG4gICAgLy8gQnkgZGVmYXVsdCwgd2UgbWFyayBhbGwgb3B0aW9ucyBhcyB1bnNlbGVjdGVkLiBUaGUgTURDIGxpc3QgZm91bmRhdGlvbiB3aWxsXG4gICAgLy8gYXV0b21hdGljYWxseSB1cGRhdGUgdGhlIGF0dHJpYnV0ZSBiYXNlZCBvbiBzZWxlY3Rpb24uIE5vdGUgdGhhdCB3ZSBuZWVkIHRvXG4gICAgLy8gaW5pdGlhbGx5IHNldCB0aGlzIGJlY2F1c2UgTURDIGRvZXMgbm90IHNldCB0aGUgZGVmYXVsdCBhdHRyaWJ1dGVzIGZvciBsaXN0XG4gICAgLy8gaXRlbXMgYnV0IGV4cGVjdHMgaXRlbXMgdG8gYmUgc2V0IHVwIHByb3Blcmx5IGluIHRoZSBzdGF0aWMgbWFya3VwLlxuICAgIGVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9zZWxlY3Rpb25MaXN0O1xuXG4gICAgaWYgKGxpc3QuX3ZhbHVlICYmIGxpc3QuX3ZhbHVlLnNvbWUodmFsdWUgPT4gbGlzdC5jb21wYXJlV2l0aCh2YWx1ZSwgdGhpcy5fdmFsdWUpKSkge1xuICAgICAgdGhpcy5fc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgd2FzU2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZDtcblxuICAgIC8vIExpc3Qgb3B0aW9ucyB0aGF0IGFyZSBzZWxlY3RlZCBhdCBpbml0aWFsaXphdGlvbiBjYW4ndCBiZSByZXBvcnRlZCBwcm9wZXJseSB0byB0aGUgZm9ybVxuICAgIC8vIGNvbnRyb2wuIFRoaXMgaXMgYmVjYXVzZSBpdCB0YWtlcyBzb21lIHRpbWUgdW50aWwgdGhlIHNlbGVjdGlvbi1saXN0IGtub3dzIGFib3V0IGFsbFxuICAgIC8vIGF2YWlsYWJsZSBvcHRpb25zLiBBbHNvIGl0IGNhbiBoYXBwZW4gdGhhdCB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaGFzIGFuIGluaXRpYWwgdmFsdWVcbiAgICAvLyB0aGF0IHNob3VsZCBiZSB1c2VkIGluc3RlYWQuIERlZmVycmluZyB0aGUgdmFsdWUgY2hhbmdlIHJlcG9ydCB0byB0aGUgbmV4dCB0aWNrIGVuc3VyZXNcbiAgICAvLyB0aGF0IHRoZSBmb3JtIGNvbnRyb2wgdmFsdWUgaXMgbm90IGJlaW5nIG92ZXJ3cml0dGVuLlxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkIHx8IHdhc1NlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9pbnB1dHNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgLy8gV2UgaGF2ZSB0byBkZWxheSB0aGlzIHVudGlsIHRoZSBuZXh0IHRpY2sgaW4gb3JkZXJcbiAgICAgIC8vIHRvIGF2b2lkIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvcnMuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgb3B0aW9uLiAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBvcHRpb24uICovXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBfaXNSZXZlcnNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja2JveFBvc2l0aW9uID09PSAnYWZ0ZXInO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxpc3Qtb3B0aW9uIGhhcyBhIGNoZWNrYm94LiAqL1xuICBfaGFzQ2hlY2tib3goKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbkxpc3QubXVsdGlwbGU7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGlzdC1vcHRpb24gaGFzIGljb25zIG9yIGF2YXRhcnMuICovXG4gIF9oYXNJY29uT3JBdmF0YXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F2YXRhcnMubGVuZ3RoIHx8IHRoaXMuX2ljb25zLmxlbmd0aDtcbiAgfVxuXG4gIF9oYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvbkxpc3QuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIHRoZSBvcHRpb24uXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgX3NldFNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKHNlbGVjdGVkID09PSB0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG5cbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbkxpc3Quc2VsZWN0ZWRPcHRpb25zLnNlbGVjdCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTGlzdC5zZWxlY3RlZE9wdGlvbnMuZGVzZWxlY3QodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogTm90aWZpZXMgQW5ndWxhciB0aGF0IHRoZSBvcHRpb24gbmVlZHMgdG8gYmUgY2hlY2tlZCBpbiB0aGUgbmV4dCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bi5cbiAgICogTWFpbmx5IHVzZWQgdG8gdHJpZ2dlciBhbiB1cGRhdGUgb2YgdGhlIGxpc3Qgb3B0aW9uIGlmIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0aW9uXG4gICAqIGxpc3QgY2hhbmdlZC5cbiAgICovXG4gIF9tYXJrRm9yQ2hlY2soKSB7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==