/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, QueryList, ViewEncapsulation, } from '@angular/core';
import { MAT_SELECT_TRIGGER, _MatSelectBase } from '@angular/material/select';
import { MatOption, MAT_OPTGROUP, MAT_OPTION_PARENT_COMPONENT, _getOptionScrollPosition, } from '@angular/material-experimental/mdc-core';
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
        return this.panelOpen || !this.empty;
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
            // TODO(crisbeto): currently the MDC select is based on the standard one which uses the
            // connected overlay directive for its panel. In order to keep the logic as similar as
            // possible, we have to use the directive here which only accepts a `CdkOverlayOrigin` as
            // its origin. For now we fake an origin directive by constructing an object that looks
            // like it, although eventually we should switch to creating the OverlayRef here directly.
            this._preferredOverlayOrigin = {
                elementRef: this._parentFormField.getConnectedOverlayOrigin()
            };
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
            const element = option._getHostElement();
            panel.scrollTop = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, panel.scrollTop, panel.offsetHeight);
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
        var _a;
        const refToMeasure = (((_a = this._preferredOverlayOrigin) === null || _a === void 0 ? void 0 : _a.elementRef) || this._elementRef);
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
                styles: [".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mat-mdc-select{display:inline-block;width:100%;outline:none}.mat-mdc-select-trigger{display:inline-table;cursor:pointer;position:relative;box-sizing:border-box}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{display:table-cell;max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{display:table-cell;vertical-align:middle}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:translateY(-40%)}.mat-mdc-select-arrow{margin:0 4px;width:10px;height:5px;position:relative}.mat-mdc-select-arrow svg{fill:currentColor;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.mdc-menu-surface.mat-mdc-select-panel{width:100%;max-height:256px;position:static;outline:0;margin:0;padding:8px 0;list-style-type:none}.mdc-menu-surface.mat-mdc-select-panel:focus{outline:none}.cdk-high-contrast-active .mdc-menu-surface.mat-mdc-select-panel{outline:solid 1px}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) .mdc-menu-surface.mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above .mdc-menu-surface.mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:transparent;-webkit-text-fill-color:transparent;transition:none;display:block}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label{max-width:calc(100% - 18px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 24px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch{max-width:calc(100% - 24px)}.mat-mdc-select-min-line:empty::before{content:\" \";white-space:pre;width:1px}\n"]
            },] }
];
MatSelect.propDecorators = {
    options: [{ type: ContentChildren, args: [MatOption, { descendants: true },] }],
    optionGroups: [{ type: ContentChildren, args: [MAT_OPTGROUP, { descendants: true },] }],
    customTrigger: [{ type: ContentChild, args: [MAT_SELECT_TRIGGER,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtc2VsZWN0L3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWiwyQkFBMkIsRUFDM0Isd0JBQXdCLEdBQ3pCLE1BQU0seUNBQXlDLENBQUM7QUFFakQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXhELDZFQUE2RTtBQUM3RSxNQUFNLE9BQU8sZUFBZTtJQUMxQjtJQUNFLDZEQUE2RDtJQUN0RCxNQUFpQjtJQUN4QiwwREFBMEQ7SUFDbkQsS0FBVTtRQUZWLFdBQU0sR0FBTixNQUFNLENBQVc7UUFFakIsVUFBSyxHQUFMLEtBQUssQ0FBSztJQUFJLENBQUM7Q0FDekI7QUFFRDs7R0FFRztBQUtILE1BQU0sT0FBTyxnQkFBZ0I7OztZQUo1QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLENBQUM7YUFDMUU7O0FBeUNELE1BQU0sT0FBTyxTQUFVLFNBQVEsY0FBK0I7SUF0QzlEOztRQTJDRSxlQUFVLEdBQXdCO1lBQ2hDO2dCQUNFLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsVUFBVSxFQUFFLDRCQUE0QjthQUN6QztTQUNGLENBQUM7SUFrRkosQ0FBQztJQTFFQyxJQUFJLGdCQUFnQjtRQUNsQixrREFBa0Q7UUFDbEQscURBQXFEO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVE7UUFDTixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDekM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ2IsMkVBQTJFO1FBQzNFLDhFQUE4RTtRQUM5RSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6Qix1RkFBdUY7WUFDdkYsc0ZBQXNGO1lBQ3RGLHlGQUF5RjtZQUN6Rix1RkFBdUY7WUFDdkYsMEZBQTBGO1lBQzFGLElBQUksQ0FBQyx1QkFBdUIsR0FBRztnQkFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRTthQUM5RCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDN0MsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsK0VBQStFO1FBQy9FLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUs7UUFDSCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCwrRUFBK0U7UUFDL0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsMkNBQTJDO0lBQ2pDLHFCQUFxQixDQUFDLEtBQWE7UUFDM0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sS0FBSyxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUNwRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFekMsS0FBSyxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsQ0FDeEMsT0FBTyxDQUFDLFNBQVMsRUFDakIsT0FBTyxDQUFDLFlBQVksRUFDcEIsS0FBSyxDQUFDLFNBQVMsRUFDZixLQUFLLENBQUMsWUFBWSxDQUNuQixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRVMsbUJBQW1CO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRVMsZUFBZSxDQUFDLEtBQVU7UUFDbEMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELGlEQUFpRDtJQUN6QyxnQkFBZ0I7O1FBQ3RCLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBQSxJQUFJLENBQUMsdUJBQXVCLDBDQUFFLFVBQVUsS0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEYsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2xFLENBQUM7OztZQTFJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQiwwMEZBQTBCO2dCQUUxQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQztnQkFDakQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLG1CQUFtQixFQUFFLE1BQU07b0JBQzNCLGVBQWUsRUFBRSxTQUFTO29CQUMxQixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixXQUFXLEVBQUUsSUFBSTtvQkFDakIsaUJBQWlCLEVBQUUsVUFBVTtvQkFDN0Isc0JBQXNCLEVBQUUsa0NBQWtDO29CQUMxRCxzQkFBc0IsRUFBRSxXQUFXO29CQUNuQyxtQkFBbUIsRUFBRSxtQkFBbUI7b0JBQ3hDLHNCQUFzQixFQUFFLHFCQUFxQjtvQkFDN0Msc0JBQXNCLEVBQUUscUJBQXFCO29CQUM3QyxxQkFBcUIsRUFBRSxZQUFZO29CQUNuQyx5QkFBeUIsRUFBRSwwQkFBMEI7b0JBQ3JELDhCQUE4QixFQUFFLDRCQUE0QjtvQkFDNUQsaUNBQWlDLEVBQUUsVUFBVTtvQkFDN0MsZ0NBQWdDLEVBQUUsWUFBWTtvQkFDOUMsaUNBQWlDLEVBQUUsVUFBVTtvQkFDN0MsOEJBQThCLEVBQUUsT0FBTztvQkFDdkMsaUNBQWlDLEVBQUUsVUFBVTtvQkFDN0MsV0FBVyxFQUFFLHdCQUF3QjtvQkFDckMsU0FBUyxFQUFFLFlBQVk7b0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2lCQUN0QjtnQkFDRCxVQUFVLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7Z0JBQ2hELFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDO29CQUN0RCxFQUFDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDO2lCQUMvRDs7YUFDRjs7O3NCQUVFLGVBQWUsU0FBQyxTQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDOzJCQUM5QyxlQUFlLFNBQUMsWUFBWSxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzs0QkFDakQsWUFBWSxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNQVRfU0VMRUNUX1RSSUdHRVIsIF9NYXRTZWxlY3RCYXNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHtcbiAgTWF0T3B0Z3JvdXAsXG4gIE1hdE9wdGlvbixcbiAgTUFUX09QVEdST1VQLFxuICBNQVRfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsXG4gIF9nZXRPcHRpb25TY3JvbGxQb3NpdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7Q2RrT3ZlcmxheU9yaWdpbiwgQ29ubmVjdGVkUG9zaXRpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHttYXRTZWxlY3RBbmltYXRpb25zfSBmcm9tICcuL3NlbGVjdC1hbmltYXRpb25zJztcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBzZWxlY3QgdGhhdCBlbWl0dGVkIHRoZSBjaGFuZ2UgZXZlbnQuICovXG4gICAgcHVibGljIHNvdXJjZTogTWF0U2VsZWN0LFxuICAgIC8qKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBzZWxlY3QgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgdmFsdWU6IGFueSkgeyB9XG59XG5cbi8qKlxuICogQWxsb3dzIHRoZSB1c2VyIHRvIGN1c3RvbWl6ZSB0aGUgdHJpZ2dlciB0aGF0IGlzIGRpc3BsYXllZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGEgdmFsdWUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1zZWxlY3QtdHJpZ2dlcicsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfU0VMRUNUX1RSSUdHRVIsIHVzZUV4aXN0aW5nOiBNYXRTZWxlY3RUcmlnZ2VyfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNlbGVjdFRyaWdnZXIge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXNlbGVjdCcsXG4gIGV4cG9ydEFzOiAnbWF0U2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICdzZWxlY3QuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzZWxlY3QuY3NzJ10sXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ3RhYkluZGV4J10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnY29tYm9ib3gnLFxuICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6ICdub25lJyxcbiAgICAnYXJpYS1oYXNwb3B1cCc6ICdsaXN0Ym94JyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1zZWxlY3QnLFxuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICdwYW5lbE9wZW4gPyBpZCArIFwiLXBhbmVsXCIgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAncGFuZWxPcGVuJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnYXJpYUxhYmVsIHx8IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnZXJyb3JTdGF0ZScsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19hcmlhRGVzY3JpYmVkYnkgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCknLFxuICAgICdbY2xhc3MubWF0LW1kYy1zZWxlY3QtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc2VsZWN0LWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxuICAgICdbY2xhc3MubWF0LW1kYy1zZWxlY3QtcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtc2VsZWN0LWVtcHR5XSc6ICdlbXB0eScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLXNlbGVjdC1tdWx0aXBsZV0nOiAnbXVsdGlwbGUnLFxuICAgICcoa2V5ZG93biknOiAnX2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgJyhmb2N1cyknOiAnX29uRm9jdXMoKScsXG4gICAgJyhibHVyKSc6ICdfb25CbHVyKCknLFxuICB9LFxuICBhbmltYXRpb25zOiBbbWF0U2VsZWN0QW5pbWF0aW9ucy50cmFuc2Zvcm1QYW5lbF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBNYXRGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTWF0U2VsZWN0fSxcbiAgICB7cHJvdmlkZTogTUFUX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTWF0U2VsZWN0fVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3QgZXh0ZW5kcyBfTWF0U2VsZWN0QmFzZTxNYXRTZWxlY3RDaGFuZ2U+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRPcHRpb24sIHtkZXNjZW5kYW50czogdHJ1ZX0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNYXRPcHRpb24+O1xuICBAQ29udGVudENoaWxkcmVuKE1BVF9PUFRHUk9VUCwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8TWF0T3B0Z3JvdXA+O1xuICBAQ29udGVudENoaWxkKE1BVF9TRUxFQ1RfVFJJR0dFUikgY3VzdG9tVHJpZ2dlcjogTWF0U2VsZWN0VHJpZ2dlcjtcblxuICBfcG9zaXRpb25zOiBDb25uZWN0ZWRQb3NpdGlvbltdID0gW1xuICAgIHtcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgIH0sXG4gICAge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICBwYW5lbENsYXNzOiAnbWF0LW1kYy1zZWxlY3QtcGFuZWwtYWJvdmUnXG4gICAgfSxcbiAgXTtcblxuICAvKiogSWRlYWwgb3JpZ2luIGZvciB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgX3ByZWZlcnJlZE92ZXJsYXlPcmlnaW46IENka092ZXJsYXlPcmlnaW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFdpZHRoIG9mIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBfb3ZlcmxheVdpZHRoOiBudW1iZXI7XG5cbiAgZ2V0IHNob3VsZExhYmVsRmxvYXQoKTogYm9vbGVhbiB7XG4gICAgLy8gU2luY2UgdGhlIHBhbmVsIGRvZXNuJ3Qgb3ZlcmxhcCB0aGUgdHJpZ2dlciwgd2VcbiAgICAvLyB3YW50IHRoZSBsYWJlbCB0byBvbmx5IGZsb2F0IHdoZW4gdGhlcmUncyBhIHZhbHVlLlxuICAgIHJldHVybiB0aGlzLnBhbmVsT3BlbiB8fCAhdGhpcy5lbXB0eTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5fdmlld3BvcnRSdWxlci5jaGFuZ2UoKS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnBhbmVsT3Blbikge1xuICAgICAgICB0aGlzLl9vdmVybGF5V2lkdGggPSB0aGlzLl9nZXRPdmVybGF5V2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIE5vdGUgdGhhdCBpdCdzIGltcG9ydGFudCB0aGF0IHdlIHJlYWQgdGhpcyBpbiBgbmdBZnRlclZpZXdJbml0YCwgYmVjYXVzZVxuICAgIC8vIHJlYWRpbmcgaXQgZWFybGllciB3aWxsIGNhdXNlIHRoZSBmb3JtIGZpZWxkIHRvIHJldHVybiBhIGRpZmZlcmVudCBlbGVtZW50LlxuICAgIGlmICh0aGlzLl9wYXJlbnRGb3JtRmllbGQpIHtcbiAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiBjdXJyZW50bHkgdGhlIE1EQyBzZWxlY3QgaXMgYmFzZWQgb24gdGhlIHN0YW5kYXJkIG9uZSB3aGljaCB1c2VzIHRoZVxuICAgICAgLy8gY29ubmVjdGVkIG92ZXJsYXkgZGlyZWN0aXZlIGZvciBpdHMgcGFuZWwuIEluIG9yZGVyIHRvIGtlZXAgdGhlIGxvZ2ljIGFzIHNpbWlsYXIgYXNcbiAgICAgIC8vIHBvc3NpYmxlLCB3ZSBoYXZlIHRvIHVzZSB0aGUgZGlyZWN0aXZlIGhlcmUgd2hpY2ggb25seSBhY2NlcHRzIGEgYENka092ZXJsYXlPcmlnaW5gIGFzXG4gICAgICAvLyBpdHMgb3JpZ2luLiBGb3Igbm93IHdlIGZha2UgYW4gb3JpZ2luIGRpcmVjdGl2ZSBieSBjb25zdHJ1Y3RpbmcgYW4gb2JqZWN0IHRoYXQgbG9va3NcbiAgICAgIC8vIGxpa2UgaXQsIGFsdGhvdWdoIGV2ZW50dWFsbHkgd2Ugc2hvdWxkIHN3aXRjaCB0byBjcmVhdGluZyB0aGUgT3ZlcmxheVJlZiBoZXJlIGRpcmVjdGx5LlxuICAgICAgdGhpcy5fcHJlZmVycmVkT3ZlcmxheU9yaWdpbiA9IHtcbiAgICAgICAgZWxlbWVudFJlZjogdGhpcy5fcGFyZW50Rm9ybUZpZWxkLmdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX292ZXJsYXlXaWR0aCA9IHRoaXMuX2dldE92ZXJsYXlXaWR0aCgpO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgICAvLyBSZXF1aXJlZCBmb3IgdGhlIE1EQyBmb3JtIGZpZWxkIHRvIHBpY2sgdXAgd2hlbiB0aGUgb3ZlcmxheSBoYXMgYmVlbiBvcGVuZWQuXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgICAvLyBSZXF1aXJlZCBmb3IgdGhlIE1EQyBmb3JtIGZpZWxkIHRvIHBpY2sgdXAgd2hlbiB0aGUgb3ZlcmxheSBoYXMgYmVlbiBjbG9zZWQuXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgLyoqIFNjcm9sbHMgdGhlIGFjdGl2ZSBvcHRpb24gaW50byB2aWV3LiAqL1xuICBwcm90ZWN0ZWQgX3Njcm9sbE9wdGlvbkludG9WaWV3KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2luZGV4XTtcblxuICAgIGlmIChvcHRpb24pIHtcbiAgICAgIGNvbnN0IHBhbmVsOiBIVE1MRWxlbWVudCA9IHRoaXMucGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBvcHRpb24uX2dldEhvc3RFbGVtZW50KCk7XG5cbiAgICAgIHBhbmVsLnNjcm9sbFRvcCA9IF9nZXRPcHRpb25TY3JvbGxQb3NpdGlvbihcbiAgICAgICAgZWxlbWVudC5vZmZzZXRUb3AsXG4gICAgICAgIGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBwYW5lbC5zY3JvbGxUb3AsXG4gICAgICAgIHBhbmVsLm9mZnNldEhlaWdodFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Bvc2l0aW9uaW5nU2V0dGxlZCgpIHtcbiAgICB0aGlzLl9zY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0Q2hhbmdlRXZlbnQodmFsdWU6IGFueSkge1xuICAgIHJldHVybiBuZXcgTWF0U2VsZWN0Q2hhbmdlKHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGhvdyB3aWRlIHRoZSBvdmVybGF5IHBhbmVsIHNob3VsZCBiZS4gKi9cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheVdpZHRoKCkge1xuICAgIGNvbnN0IHJlZlRvTWVhc3VyZSA9ICh0aGlzLl9wcmVmZXJyZWRPdmVybGF5T3JpZ2luPy5lbGVtZW50UmVmIHx8IHRoaXMuX2VsZW1lbnRSZWYpO1xuICAgIHJldHVybiByZWZUb01lYXN1cmUubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxufVxuIl19