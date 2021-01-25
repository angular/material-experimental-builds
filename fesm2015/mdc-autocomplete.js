import { Component, ViewEncapsulation, ChangeDetectionStrategy, ContentChildren, forwardRef, Directive, NgModule } from '@angular/core';
import { MAT_OPTION_PARENT_COMPONENT, MAT_OPTGROUP, MatOption, MatOptionModule, MatCommonModule } from '@angular/material-experimental/mdc-core';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { _MatAutocompleteBase, _MatAutocompleteTriggerBase, _MatAutocompleteOriginBase, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
export { AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY, MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, MatAutocompleteSelectedEvent, getMatAutocompleteMissingPanelError } from '@angular/material/autocomplete';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Animation values come from
// https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/_mixins.scss
// TODO(mmalerba): Ideally find a way to import the values from MDC's code.
const panelAnimation = trigger('panelAnimation', [
    state('void, hidden', style({
        opacity: 0,
        transform: 'scale(0.8)',
    })),
    transition(':enter, hidden => visible', [
        group([
            animate('0.03s linear', style({ opacity: 1 })),
            animate('0.12s cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)' })),
        ]),
    ]),
    transition(':leave, visible => hidden', [
        animate('0.075s linear', style({ opacity: 0 })),
    ]),
]);

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatAutocomplete extends _MatAutocompleteBase {
    constructor() {
        super(...arguments);
        this._visibleClass = 'mat-mdc-autocomplete-visible';
        this._hiddenClass = 'mat-mdc-autocomplete-hidden';
    }
}
MatAutocomplete.decorators = [
    { type: Component, args: [{
                selector: 'mat-autocomplete',
                template: "<ng-template let-formFieldId=\"id\">\n  <div\n    class=\"mat-mdc-autocomplete-panel mdc-menu-surface mdc-menu-surface--open\"\n    role=\"listbox\"\n    [id]=\"id\"\n    [ngClass]=\"_classList\"\n    [attr.aria-label]=\"ariaLabel || null\"\n    [attr.aria-labelledby]=\"_getPanelAriaLabelledby(formFieldId)\"\n    [@panelAnimation]=\"isOpen ? 'visible' : 'hidden'\"\n    #panel>\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'matAutocomplete',
                inputs: ['disableRipple'],
                host: {
                    'class': 'mat-mdc-autocomplete'
                },
                providers: [
                    { provide: MAT_OPTION_PARENT_COMPONENT, useExisting: MatAutocomplete }
                ],
                animations: [panelAnimation],
                styles: [".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mdc-menu-surface.mat-mdc-autocomplete-panel{width:100%;max-height:256px;position:static;visibility:hidden;transform-origin:center top;margin:0;padding:8px 0;list-style-type:none}.mdc-menu-surface.mat-mdc-autocomplete-panel:focus{outline:none}.cdk-high-contrast-active .mdc-menu-surface.mat-mdc-autocomplete-panel{outline:solid 1px}.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) .mdc-menu-surface.mat-mdc-autocomplete-panel{border-top-left-radius:0;border-top-right-radius:0}.mat-mdc-autocomplete-panel-above .mdc-menu-surface.mat-mdc-autocomplete-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:center bottom}.mdc-menu-surface.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible{visibility:visible}.mdc-menu-surface.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden{visibility:hidden}mat-autocomplete{display:none}\n"]
            },] }
];
MatAutocomplete.propDecorators = {
    optionGroups: [{ type: ContentChildren, args: [MAT_OPTGROUP, { descendants: true },] }],
    options: [{ type: ContentChildren, args: [MatOption, { descendants: true },] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatAutocompleteTrigger),
    multi: true
};
class MatAutocompleteTrigger extends _MatAutocompleteTriggerBase {
    constructor() {
        super(...arguments);
        this._aboveClass = 'mat-mdc-autocomplete-panel-above';
    }
}
MatAutocompleteTrigger.decorators = [
    { type: Directive, args: [{
                selector: `input[matAutocomplete], textarea[matAutocomplete]`,
                host: {
                    'class': 'mat-mdc-autocomplete-trigger',
                    '[attr.autocomplete]': 'autocompleteAttribute',
                    '[attr.role]': 'autocompleteDisabled ? null : "combobox"',
                    '[attr.aria-autocomplete]': 'autocompleteDisabled ? null : "list"',
                    '[attr.aria-activedescendant]': '(panelOpen && activeOption) ? activeOption.id : null',
                    '[attr.aria-expanded]': 'autocompleteDisabled ? null : panelOpen.toString()',
                    '[attr.aria-owns]': '(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id',
                    '[attr.aria-haspopup]': '!autocompleteDisabled',
                    // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                    // a little earlier. This avoids issues where IE delays the focusing of the input.
                    '(focusin)': '_handleFocus()',
                    '(blur)': '_onTouched()',
                    '(input)': '_handleInput($event)',
                    '(keydown)': '_handleKeydown($event)',
                },
                exportAs: 'matAutocompleteTrigger',
                providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
class MatAutocompleteOrigin extends _MatAutocompleteOriginBase {
}
MatAutocompleteOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[matAutocompleteOrigin]',
                exportAs: 'matAutocompleteOrigin',
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatAutocompleteModule {
}
MatAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    MatOptionModule,
                    MatCommonModule,
                    CommonModule
                ],
                exports: [
                    CdkScrollableModule,
                    MatAutocomplete,
                    MatOptionModule,
                    MatCommonModule,
                    MatAutocompleteTrigger,
                    MatAutocompleteOrigin,
                ],
                declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
                providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
            },] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MAT_AUTOCOMPLETE_VALUE_ACCESSOR, MatAutocomplete, MatAutocompleteModule, MatAutocompleteOrigin, MatAutocompleteTrigger, panelAnimation as ɵangular_material_src_material_experimental_mdc_autocomplete_mdc_autocomplete_a };
//# sourceMappingURL=mdc-autocomplete.js.map
