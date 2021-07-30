/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, QueryList, ViewEncapsulation, } from '@angular/core';
import { MAT_SELECT_TRIGGER, _MatSelectBase } from '@angular/material/select';
import { MatOption, MAT_OPTGROUP, MAT_OPTION_PARENT_COMPONENT, _countGroupLabelsBeforeOption, _getOptionScrollPosition, } from '@angular/material-experimental/mdc-core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MatFormFieldControl } from '@angular/material/form-field';
import { takeUntil } from 'rxjs/operators';
import { matSelectAnimations } from './select-animations';
/** Change event object that is emitted when the select value has changed. */
export class MatSelectChange {
    constructor(
    /** Reference to the select that emitted the change event. */
    source, 
    /** Current value of the select that emitted the event. */
    value) {
        this.source = source;
        this.value = value;
    }
}
/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
export class MatSelectTrigger {
}
MatSelectTrigger.decorators = [
    { type: Directive, args: [{
                selector: 'mat-select-trigger',
                providers: [{ provide: MAT_SELECT_TRIGGER, useExisting: MatSelectTrigger }],
            },] }
];
export class MatSelect extends _MatSelectBase {
    constructor() {
        super(...arguments);
        this._positions = [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
                panelClass: 'mat-mdc-select-panel-above'
            },
        ];
    }
    get shouldLabelFloat() {
        // Since the panel doesn't overlap the trigger, we
        // want the label to only float when there's a value.
        return this.panelOpen || !this.empty || (this.focused && !!this.placeholder);
    }
    ngOnInit() {
        super.ngOnInit();
        this._viewportRuler.change().pipe(takeUntil(this._destroy)).subscribe(() => {
            if (this.panelOpen) {
                this._overlayWidth = this._getOverlayWidth();
                this._changeDetectorRef.detectChanges();
            }
        });
    }
    ngAfterViewInit() {
        // Note that it's important that we read this in `ngAfterViewInit`, because
        // reading it earlier will cause the form field to return a different element.
        if (this._parentFormField) {
            this._preferredOverlayOrigin = this._parentFormField.getConnectedOverlayOrigin();
        }
    }
    open() {
        this._overlayWidth = this._getOverlayWidth();
        super.open();
        // Required for the MDC form field to pick up when the overlay has been opened.
        this.stateChanges.next();
    }
    close() {
        super.close();
        // Required for the MDC form field to pick up when the overlay has been closed.
        this.stateChanges.next();
    }
    /** Scrolls the active option into view. */
    _scrollOptionIntoView(index) {
        const option = this.options.toArray()[index];
        if (option) {
            const panel = this.panel.nativeElement;
            const labelCount = _countGroupLabelsBeforeOption(index, this.options, this.optionGroups);
            const element = option._getHostElement();
            if (index === 0 && labelCount === 1) {
                // If we've got one group label before the option and we're at the top option,
                // scroll the list to the top. This is better UX than scrolling the list to the
                // top of the option, because it allows the user to read the top group's label.
                panel.scrollTop = 0;
            }
            else {
                panel.scrollTop = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, panel.scrollTop, panel.offsetHeight);
            }
        }
    }
    _positioningSettled() {
        this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
    }
    _getChangeEvent(value) {
        return new MatSelectChange(this, value);
    }
    /** Gets how wide the overlay panel should be. */
    _getOverlayWidth() {
        const refToMeasure = this._preferredOverlayOrigin instanceof CdkOverlayOrigin ?
            this._preferredOverlayOrigin.elementRef :
            this._preferredOverlayOrigin || this._elementRef;
        return refToMeasure.nativeElement.getBoundingClientRect().width;
    }
}
MatSelect.decorators = [
    { type: Component, args: [{
                selector: 'mat-select',
                exportAs: 'matSelect',
                template: "<!--\n Note that the select trigger element specifies `aria-owns` pointing to the listbox overlay.\n While aria-owns is not required for the ARIA 1.2 `role=\"combobox\"` interaction pattern,\n it fixes an issue with VoiceOver when the select appears inside of an `aria-model=\"true\"`\n element (e.g. a dialog). Without this `aria-owns`, the `aria-modal` on a dialog prevents\n VoiceOver from \"seeing\" the select's listbox overlay for aria-activedescendant.\n Using `aria-owns` re-parents the select overlay so that it works again.\n See https://github.com/angular/components/issues/20694\n-->\n<div cdk-overlay-origin\n     [attr.aria-owns]=\"panelOpen ? id + '-panel' : null\"\n     class=\"mat-mdc-select-trigger\"\n     (click)=\"toggle()\"\n     #fallbackOverlayOrigin=\"cdkOverlayOrigin\"\n     #trigger>\n  <div class=\"mat-mdc-select-value\" [ngSwitch]=\"empty\" [attr.id]=\"_valueId\">\n    <span class=\"mat-mdc-select-placeholder mat-mdc-select-min-line\" *ngSwitchCase=\"true\">{{placeholder}}</span>\n    <span class=\"mat-mdc-select-value-text\" *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\">\n      <span class=\"mat-mdc-select-min-line\" *ngSwitchDefault>{{triggerValue}}</span>\n      <ng-content select=\"mat-select-trigger\" *ngSwitchCase=\"true\"></ng-content>\n    </span>\n  </div>\n\n  <div class=\"mat-mdc-select-arrow-wrapper\">\n    <div class=\"mat-mdc-select-arrow\">\n      <!-- Use an inline SVG, because it works better than a CSS triangle in high contrast mode. -->\n      <svg viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" focusable=\"false\">\n        <path d=\"M7 10l5 5 5-5z\"/>\n      </svg>\n    </div>\n  </div>\n</div>\n\n<ng-template\n  cdk-connected-overlay\n  cdkConnectedOverlayLockPosition\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  [cdkConnectedOverlayPanelClass]=\"_overlayPanelClass\"\n  [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\"\n  [cdkConnectedOverlayOrigin]=\"_preferredOverlayOrigin || fallbackOverlayOrigin\"\n  [cdkConnectedOverlayOpen]=\"panelOpen\"\n  [cdkConnectedOverlayPositions]=\"_positions\"\n  [cdkConnectedOverlayWidth]=\"_overlayWidth\"\n  (backdropClick)=\"close()\"\n  (attach)=\"_onAttached()\"\n  (detach)=\"close()\">\n  <div\n    #panel\n    role=\"listbox\"\n    tabindex=\"-1\"\n    class=\"mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open {{ _getPanelTheme() }}\"\n    [attr.id]=\"id + '-panel'\"\n    [attr.aria-multiselectable]=\"multiple\"\n    [attr.aria-label]=\"ariaLabel || null\"\n    [attr.aria-labelledby]=\"_getPanelAriaLabelledby()\"\n    [ngClass]=\"panelClass\"\n    [@transformPanel]=\"'showing'\"\n    (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\"\n    (keydown)=\"_handleKeydown($event)\">\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n",
                inputs: ['disabled', 'disableRipple', 'tabIndex'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'role': 'combobox',
                    'aria-autocomplete': 'none',
                    'aria-haspopup': 'listbox',
                    'class': 'mat-mdc-select',
                    '[attr.id]': 'id',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.aria-controls]': 'panelOpen ? id + "-panel" : null',
                    '[attr.aria-expanded]': 'panelOpen',
                    '[attr.aria-label]': 'ariaLabel || null',
                    '[attr.aria-required]': 'required.toString()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-invalid]': 'errorState',
                    '[attr.aria-describedby]': '_ariaDescribedby || null',
                    '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
                    '[class.mat-mdc-select-disabled]': 'disabled',
                    '[class.mat-mdc-select-invalid]': 'errorState',
                    '[class.mat-mdc-select-required]': 'required',
                    '[class.mat-mdc-select-empty]': 'empty',
                    '[class.mat-mdc-select-multiple]': 'multiple',
                    '(keydown)': '_handleKeydown($event)',
                    '(focus)': '_onFocus()',
                    '(blur)': '_onBlur()',
                },
                animations: [matSelectAnimations.transformPanel],
                providers: [
                    { provide: MatFormFieldControl, useExisting: MatSelect },
                    { provide: MAT_OPTION_PARENT_COMPONENT, useExisting: MatSelect }
                ],
                styles: [".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mat-mdc-select{display:inline-block;width:100%;outline:none}.mat-mdc-select-trigger{display:inline-table;cursor:pointer;position:relative;box-sizing:border-box}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{display:table-cell;max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{display:table-cell;vertical-align:middle}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:translateY(-40%)}.mat-mdc-select-arrow{width:10px;height:5px;position:relative}.mat-mdc-select-arrow svg{fill:currentColor;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.cdk-high-contrast-active .mat-mdc-select-arrow svg{fill:CanvasText}.mdc-menu-surface.mat-mdc-select-panel{width:100%;max-height:256px;position:static;outline:0;margin:0;padding:8px 0;list-style-type:none}.mdc-menu-surface.mat-mdc-select-panel:focus{outline:none}.cdk-high-contrast-active .mdc-menu-surface.mat-mdc-select-panel{outline:solid 1px}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) .mdc-menu-surface.mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above .mdc-menu-surface.mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:transparent;-webkit-text-fill-color:transparent;transition:none;display:block}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label{max-width:calc(100% - 18px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 24px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch{max-width:calc(100% - 24px)}.mat-mdc-select-min-line:empty::before{content:\" \";white-space:pre;width:1px;display:inline-block;opacity:0}\n"]
            },] }
];
MatSelect.propDecorators = {
    options: [{ type: ContentChildren, args: [MatOption, { descendants: true },] }],
    optionGroups: [{ type: ContentChildren, args: [MAT_OPTGROUP, { descendants: true },] }],
    customTrigger: [{ type: ContentChild, args: [MAT_SELECT_TRIGGER,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2VsZWN0L3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFHVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWiwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQzdCLHdCQUF3QixHQUN6QixNQUFNLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsNkVBQTZFO0FBQzdFLE1BQU0sT0FBTyxlQUFlO0lBQzFCO0lBQ0UsNkRBQTZEO0lBQ3RELE1BQWlCO0lBQ3hCLDBEQUEwRDtJQUNuRCxLQUFVO1FBRlYsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUVqQixVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQUksQ0FBQztDQUN6QjtBQUVEOztHQUVHO0FBS0gsTUFBTSxPQUFPLGdCQUFnQjs7O1lBSjVCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsQ0FB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LHFCQUFxQjtvQkFDN0MscUJBQXFCLEVBQUUsWUFBWTtvQkFDbkMseUJBQXlCLEVBQUUsMEJBQTBCO29CQUNyRCw4QkFBOEIsRUFBRSw0QkFBNEI7b0JBQzVELGlDQUFpQyxFQUFFLFVBQVU7b0JBQzdDLGdDQUFnQyxFQUFFLFlBQVk7b0JBQzlDLGlDQUFpQyxFQUFFLFVBQVU7b0JBQzdDLDhCQUE4QixFQUFFLE9BQU87b0JBQ3ZDLGlDQUFpQyxFQUFFLFVBQVU7b0JBQzdDLFdBQVcsRUFBRSx3QkFBd0I7b0JBQ3JDLFNBQVMsRUFBRSxZQUFZO29CQUN2QixRQUFRLEVBQUUsV0FBVztpQkFDdEI7Z0JBQ0QsVUFBVSxFQUFFLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDO2dCQUNoRCxTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBQztvQkFDdEQsRUFBQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBQztpQkFDL0Q7O2FBQ0Y7OztzQkFFRSxlQUFlLFNBQUMsU0FBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzsyQkFDOUMsZUFBZSxTQUFDLFlBQVksRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7NEJBQ2pELFlBQVksU0FBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TUFUX1NFTEVDVF9UUklHR0VSLCBfTWF0U2VsZWN0QmFzZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7XG4gIE1hdE9wdGdyb3VwLFxuICBNYXRPcHRpb24sXG4gIE1BVF9PUFRHUk9VUCxcbiAgTUFUX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULFxuICBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbixcbiAgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtDZGtPdmVybGF5T3JpZ2luLCBDb25uZWN0ZWRQb3NpdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRDb250cm9sfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge21hdFNlbGVjdEFuaW1hdGlvbnN9IGZyb20gJy4vc2VsZWN0LWFuaW1hdGlvbnMnO1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdENoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlbGVjdCB0aGF0IGVtaXR0ZWQgdGhlIGNoYW5nZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBNYXRTZWxlY3QsXG4gICAgLyoqIEN1cnJlbnQgdmFsdWUgb2YgdGhlIHNlbGVjdCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LiAqL1xuICAgIHB1YmxpYyB2YWx1ZTogYW55KSB7IH1cbn1cblxuLyoqXG4gKiBBbGxvd3MgdGhlIHVzZXIgdG8gY3VzdG9taXplIHRoZSB0cmlnZ2VyIHRoYXQgaXMgZGlzcGxheWVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYSB2YWx1ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LXNlbGVjdC10cmlnZ2VyJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9TRUxFQ1RfVFJJR0dFUiwgdXNlRXhpc3Rpbmc6IE1hdFNlbGVjdFRyaWdnZXJ9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0VHJpZ2dlciB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2VsZWN0JyxcbiAgZXhwb3J0QXM6ICdtYXRTZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NlbGVjdC5jc3MnXSxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2Rpc2FibGVSaXBwbGUnLCAndGFiSW5kZXgnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXG4gICAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogJ25vbmUnLFxuICAgICdhcmlhLWhhc3BvcHVwJzogJ2xpc3Rib3gnLFxuICAgICdjbGFzcyc6ICdtYXQtbWRjLXNlbGVjdCcsXG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ3BhbmVsT3BlbiA/IGlkICsgXCItcGFuZWxcIiA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdwYW5lbE9wZW4nLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdhcmlhTGFiZWwgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XSc6ICdfZ2V0QXJpYUFjdGl2ZURlc2NlbmRhbnQoKScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXNlbGVjdC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zZWxlY3QtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXNlbGVjdC1yZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zZWxlY3QtZW1wdHldJzogJ2VtcHR5JyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc2VsZWN0LW11bHRpcGxlXSc6ICdtdWx0aXBsZScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGZvY3VzKSc6ICdfb25Gb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFttYXRTZWxlY3RBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3R9LFxuICAgIHtwcm92aWRlOiBNQVRfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3R9XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdCBleHRlbmRzIF9NYXRTZWxlY3RCYXNlPE1hdFNlbGVjdENoYW5nZT4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAQ29udGVudENoaWxkcmVuKE1hdE9wdGlvbiwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgb3B0aW9uczogUXVlcnlMaXN0PE1hdE9wdGlvbj47XG4gIEBDb250ZW50Q2hpbGRyZW4oTUFUX09QVEdST1VQLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxNYXRPcHRncm91cD47XG4gIEBDb250ZW50Q2hpbGQoTUFUX1NFTEVDVF9UUklHR0VSKSBjdXN0b21UcmlnZ2VyOiBNYXRTZWxlY3RUcmlnZ2VyO1xuXG4gIF9wb3NpdGlvbnM6IENvbm5lY3RlZFBvc2l0aW9uW10gPSBbXG4gICAge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgIHBhbmVsQ2xhc3M6ICdtYXQtbWRjLXNlbGVjdC1wYW5lbC1hYm92ZSdcbiAgICB9LFxuICBdO1xuXG4gIC8qKiBJZGVhbCBvcmlnaW4gZm9yIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBfcHJlZmVycmVkT3ZlcmxheU9yaWdpbjogQ2RrT3ZlcmxheU9yaWdpbiB8IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFdpZHRoIG9mIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBfb3ZlcmxheVdpZHRoOiBudW1iZXI7XG5cbiAgb3ZlcnJpZGUgZ2V0IHNob3VsZExhYmVsRmxvYXQoKTogYm9vbGVhbiB7XG4gICAgLy8gU2luY2UgdGhlIHBhbmVsIGRvZXNuJ3Qgb3ZlcmxhcCB0aGUgdHJpZ2dlciwgd2VcbiAgICAvLyB3YW50IHRoZSBsYWJlbCB0byBvbmx5IGZsb2F0IHdoZW4gdGhlcmUncyBhIHZhbHVlLlxuICAgIHJldHVybiB0aGlzLnBhbmVsT3BlbiB8fCAhdGhpcy5lbXB0eSB8fCAodGhpcy5mb2N1c2VkICYmICEhdGhpcy5wbGFjZWhvbGRlcik7XG4gIH1cblxuICBvdmVycmlkZSBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMuX3ZpZXdwb3J0UnVsZXIuY2hhbmdlKCkucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxheVdpZHRoID0gdGhpcy5fZ2V0T3ZlcmxheVdpZHRoKCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBOb3RlIHRoYXQgaXQncyBpbXBvcnRhbnQgdGhhdCB3ZSByZWFkIHRoaXMgaW4gYG5nQWZ0ZXJWaWV3SW5pdGAsIGJlY2F1c2VcbiAgICAvLyByZWFkaW5nIGl0IGVhcmxpZXIgd2lsbCBjYXVzZSB0aGUgZm9ybSBmaWVsZCB0byByZXR1cm4gYSBkaWZmZXJlbnQgZWxlbWVudC5cbiAgICBpZiAodGhpcy5fcGFyZW50Rm9ybUZpZWxkKSB7XG4gICAgICB0aGlzLl9wcmVmZXJyZWRPdmVybGF5T3JpZ2luID0gdGhpcy5fcGFyZW50Rm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBvcGVuKCkge1xuICAgIHRoaXMuX292ZXJsYXlXaWR0aCA9IHRoaXMuX2dldE92ZXJsYXlXaWR0aCgpO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgICAvLyBSZXF1aXJlZCBmb3IgdGhlIE1EQyBmb3JtIGZpZWxkIHRvIHBpY2sgdXAgd2hlbiB0aGUgb3ZlcmxheSBoYXMgYmVlbiBvcGVuZWQuXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICAvLyBSZXF1aXJlZCBmb3IgdGhlIE1EQyBmb3JtIGZpZWxkIHRvIHBpY2sgdXAgd2hlbiB0aGUgb3ZlcmxheSBoYXMgYmVlbiBjbG9zZWQuXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICBwcm90ZWN0ZWQgX3Njcm9sbE9wdGlvbkludG9WaWV3KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2luZGV4XTtcblxuICAgIGlmIChvcHRpb24pIHtcbiAgICAgIGNvbnN0IHBhbmVsOiBIVE1MRWxlbWVudCA9IHRoaXMucGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGxhYmVsQ291bnQgPSBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihpbmRleCwgdGhpcy5vcHRpb25zLCB0aGlzLm9wdGlvbkdyb3Vwcyk7XG4gICAgICBjb25zdCBlbGVtZW50ID0gb3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpO1xuXG4gICAgICBpZiAoaW5kZXggPT09IDAgJiYgbGFiZWxDb3VudCA9PT0gMSkge1xuICAgICAgICAvLyBJZiB3ZSd2ZSBnb3Qgb25lIGdyb3VwIGxhYmVsIGJlZm9yZSB0aGUgb3B0aW9uIGFuZCB3ZSdyZSBhdCB0aGUgdG9wIG9wdGlvbixcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSBsaXN0IHRvIHRoZSB0b3AuIFRoaXMgaXMgYmV0dGVyIFVYIHRoYW4gc2Nyb2xsaW5nIHRoZSBsaXN0IHRvIHRoZVxuICAgICAgICAvLyB0b3Agb2YgdGhlIG9wdGlvbiwgYmVjYXVzZSBpdCBhbGxvd3MgdGhlIHVzZXIgdG8gcmVhZCB0aGUgdG9wIGdyb3VwJ3MgbGFiZWwuXG4gICAgICAgIHBhbmVsLnNjcm9sbFRvcCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYW5lbC5zY3JvbGxUb3AgPSBfZ2V0T3B0aW9uU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgZWxlbWVudC5vZmZzZXRUb3AsXG4gICAgICAgICAgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgcGFuZWwuc2Nyb2xsVG9wLFxuICAgICAgICAgIHBhbmVsLm9mZnNldEhlaWdodFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcG9zaXRpb25pbmdTZXR0bGVkKCkge1xuICAgIHRoaXMuX3Njcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDApO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRDaGFuZ2VFdmVudCh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBNYXRTZWxlY3RDaGFuZ2UodGhpcywgdmFsdWUpO1xuICB9XG5cbiAgLyoqIEdldHMgaG93IHdpZGUgdGhlIG92ZXJsYXkgcGFuZWwgc2hvdWxkIGJlLiAqL1xuICBwcml2YXRlIF9nZXRPdmVybGF5V2lkdGgoKSB7XG4gICAgY29uc3QgcmVmVG9NZWFzdXJlID0gdGhpcy5fcHJlZmVycmVkT3ZlcmxheU9yaWdpbiBpbnN0YW5jZW9mIENka092ZXJsYXlPcmlnaW4gP1xuICAgICAgICB0aGlzLl9wcmVmZXJyZWRPdmVybGF5T3JpZ2luLmVsZW1lbnRSZWYgOlxuICAgICAgICB0aGlzLl9wcmVmZXJyZWRPdmVybGF5T3JpZ2luIHx8IHRoaXMuX2VsZW1lbnRSZWY7XG4gICAgcmV0dXJuIHJlZlRvTWVhc3VyZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG59XG4iXX0=