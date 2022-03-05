/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Inject, Input, QueryList, ViewEncapsulation, } from '@angular/core';
import { mixinTabIndex } from '@angular/material-experimental/mdc-core';
import { MDCChipSetFoundation, MDCChipEvents, MDCChipActionType, } from '@material/chips';
import { merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MatChip } from './chip';
import { emitCustomEvent } from './emit-event';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
/**
 * Boilerplate for applying mixins to MatChipSet.
 * @docs-private
 */
class MatChipSetBase {
    constructor(_elementRef) { }
}
const _MatChipSetMixinBase = mixinTabIndex(MatChipSetBase);
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
export class MatChipSet extends _MatChipSetMixinBase {
    constructor(_liveAnnouncer, _document, _elementRef, _changeDetectorRef) {
        super(_elementRef);
        this._liveAnnouncer = _liveAnnouncer;
        this._document = _document;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        this._lastDestroyedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /** Role to use if it hasn't been overwritten by the user. */
        this._defaultRole = 'presentation';
        /**
         * Implementation of the MDC chip-set adapter interface.
         * These methods are called by the chip set foundation.
         */
        this._chipSetAdapter = {
            announceMessage: message => this._liveAnnouncer.announce(message),
            emitEvent: (eventName, eventDetail) => {
                emitCustomEvent(this._elementRef.nativeElement, this._document, eventName, eventDetail, true);
            },
            getAttribute: name => this._elementRef.nativeElement.getAttribute(name),
            getChipActionsAtIndex: index => this._chipFoundation(index)?.getActions() || [],
            getChipCount: () => this._chips.length,
            getChipIdAtIndex: index => this._chipFoundation(index)?.getElementID() || '',
            getChipIndexById: id => {
                return this._chips.toArray().findIndex(chip => chip._getFoundation().getElementID() === id);
            },
            isChipFocusableAtIndex: (index, actionType) => {
                return this._chipFoundation(index)?.isActionFocusable(actionType) || false;
            },
            isChipSelectableAtIndex: (index, actionType) => {
                return this._chipFoundation(index)?.isActionSelectable(actionType) || false;
            },
            isChipSelectedAtIndex: (index, actionType) => {
                return this._chipFoundation(index)?.isActionSelected(actionType) || false;
            },
            removeChipAtIndex: index => this._chips.toArray()[index]?.remove(),
            setChipFocusAtIndex: (index, action, behavior) => {
                this._chipFoundation(index)?.setActionFocus(action, behavior);
            },
            setChipSelectedAtIndex: (index, actionType, isSelected) => {
                // Setting the trailing action as deselected ends up deselecting the entire chip.
                // This is working as expected, but it's not something we want so we only apply the
                // selected state to the primary chip.
                if (actionType === MDCChipActionType.PRIMARY) {
                    this._chipFoundation(index)?.setActionSelected(actionType, isSelected);
                }
            },
            startChipAnimationAtIndex: (index, animation) => {
                this._chipFoundation(index)?.startAnimation(animation);
            },
        };
        /**
         * Map from class to whether the class is enabled.
         * Enabled classes are set on the MDC chip-set div.
         */
        this._mdcClasses = {};
        this._disabled = false;
        this._explicitRole = null;
        this._handleChipAnimation = (event) => {
            this._chipSetFoundation.handleChipAnimation(event);
        };
        this._handleChipInteraction = (event) => {
            this._chipSetFoundation.handleChipInteraction(event);
        };
        this._handleChipNavigation = (event) => {
            this._chipSetFoundation.handleChipNavigation(event);
        };
        const element = _elementRef.nativeElement;
        this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
        element.addEventListener(MDCChipEvents.ANIMATION, this._handleChipAnimation);
        element.addEventListener(MDCChipEvents.INTERACTION, this._handleChipInteraction);
        element.addEventListener(MDCChipEvents.NAVIGATION, this._handleChipNavigation);
    }
    /** Combined stream of all of the child chips' remove events. */
    get chipDestroyedChanges() {
        return this._getChipStream(chip => chip.destroyed);
    }
    /** Whether the chip set is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /** Whether the chip list contains chips or not. */
    get empty() {
        return this._chips.length === 0;
    }
    /** The ARIA role applied to the chip set. */
    get role() {
        if (this._explicitRole) {
            return this._explicitRole;
        }
        return this.empty ? null : this._defaultRole;
    }
    set role(value) {
        this._explicitRole = value;
    }
    /** Whether any of the chips inside of this chip-set has focus. */
    get focused() {
        return this._hasFocusedChip();
    }
    ngAfterViewInit() {
        this._chipSetFoundation.init();
    }
    ngAfterContentInit() {
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(() => {
                    this._syncChipsState();
                });
            }
        });
        this.chipDestroyedChanges.pipe(takeUntil(this._destroyed)).subscribe((event) => {
            const chip = event.chip;
            const chipIndex = this._chips.toArray().indexOf(event.chip);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (this._isValidIndex(chipIndex) && chip._hasFocus()) {
                this._lastDestroyedChipIndex = chipIndex;
            }
        });
    }
    ngOnDestroy() {
        const element = this._elementRef.nativeElement;
        element.removeEventListener(MDCChipEvents.ANIMATION, this._handleChipAnimation);
        element.removeEventListener(MDCChipEvents.INTERACTION, this._handleChipInteraction);
        element.removeEventListener(MDCChipEvents.NAVIGATION, this._handleChipNavigation);
        this._destroyed.next();
        this._destroyed.complete();
        this._chipSetFoundation.destroy();
    }
    /** Checks whether any of the chips is focused. */
    _hasFocusedChip() {
        return this._chips && this._chips.some(chip => chip._hasFocus());
    }
    /** Syncs the chip-set's state with the individual chips. */
    _syncChipsState() {
        if (this._chips) {
            this._chips.forEach(chip => {
                chip.disabled = this._disabled;
                chip._changeDetectorRef.markForCheck();
            });
        }
    }
    /** Dummy method for subclasses to override. Base chip set cannot be focused. */
    focus() { }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this._chips.length;
    }
    /** Checks whether an event comes from inside a chip element. */
    _originatesFromChip(event) {
        return this._checkForClassInHierarchy(event, 'mdc-evolution-chip');
    }
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    _allowFocusEscape() {
        const previousTabIndex = this.tabIndex;
        if (this.tabIndex !== -1) {
            this.tabIndex = -1;
            setTimeout(() => {
                this.tabIndex = previousTabIndex;
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    /**
     * Gets a stream of events from all the chips within the set.
     * The stream will automatically incorporate any newly-added chips.
     */
    _getChipStream(mappingFunction) {
        return this._chips.changes.pipe(startWith(null), switchMap(() => merge(...this._chips.map(mappingFunction))));
    }
    _checkForClassInHierarchy(event, className) {
        let currentElement = event.target;
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            // Null check the classList, because IE and Edge don't support it on all elements.
            if (currentElement.classList && currentElement.classList.contains(className)) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    _chipFoundation(index) {
        return this._chips.toArray()[index]?._getFoundation();
    }
}
MatChipSet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatChipSet, deps: [{ token: i1.LiveAnnouncer }, { token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MatChipSet.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "14.0.0-next.5", type: MatChipSet, selector: "mat-chip-set", inputs: { disabled: "disabled", role: "role" }, host: { properties: { "attr.role": "role", "attr.aria-describedby": "_ariaDescribedby || null" }, classAttribute: "mat-mdc-chip-set mdc-evolution-chip-set" }, queries: [{ propertyName: "_chips", predicate: MatChip, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, isInline: true, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.5", ngImport: i0, type: MatChipSet, decorators: [{
            type: Component,
            args: [{ selector: 'mat-chip-set', template: `
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </span>
  `, host: {
                        'class': 'mat-mdc-chip-set mdc-evolution-chip-set',
                        '[attr.role]': 'role',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mdc-evolution-chip-set{display:flex}.mdc-evolution-chip-set:focus{outline:none}.mdc-evolution-chip-set__chips{display:flex;flex-flow:wrap;min-width:0}.mdc-evolution-chip-set--overflow .mdc-evolution-chip-set__chips{flex-flow:nowrap}.mdc-evolution-chip-set .mdc-evolution-chip-set__chips{margin-left:-8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip-set__chips,.mdc-evolution-chip-set .mdc-evolution-chip-set__chips[dir=rtl]{margin-left:0;margin-right:-8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-left:8px;margin-right:0}[dir=rtl] .mdc-evolution-chip-set .mdc-evolution-chip,.mdc-evolution-chip-set .mdc-evolution-chip[dir=rtl]{margin-left:0;margin-right:8px}.mdc-evolution-chip-set .mdc-evolution-chip{margin-top:4px;margin-bottom:4px}.mat-mdc-chip-set .mdc-evolution-chip-set__chips{min-width:100%}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px;margin-left:8px}[dir=rtl] input.mat-mdc-chip-input{margin-left:0;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.LiveAnnouncer }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], role: [{
                type: Input
            }], _chips: [{
                type: ContentChildren,
                args: [MatChip, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsYUFBYSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUNMLG9CQUFvQixFQUdwQixhQUFhLEVBSWIsaUJBQWlCLEdBQ2xCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLEtBQUssRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7QUFFN0M7OztHQUdHO0FBQ0gsTUFBZSxjQUFjO0lBRTNCLFlBQVksV0FBdUIsSUFBRyxDQUFDO0NBQ3hDO0FBQ0QsTUFBTSxvQkFBb0IsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFM0Q7Ozs7R0FJRztBQWtCSCxNQUFNLE9BQU8sVUFDWCxTQUFRLG9CQUFvQjtJQXVINUIs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Q0FBQyxhQUFhLENBQUM7U0FDL0M7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxlQUFlLENBQUMsS0FBYTtRQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUM7SUFDeEQsQ0FBQzs7OEdBN1BVLFVBQVUsK0NBMEhYLFFBQVE7a0dBMUhQLFVBQVUsMFJBaUhKLE9BQU8sdUVBaElkOzs7O0dBSVQ7a0dBV1UsVUFBVTtrQkFqQnRCLFNBQVM7K0JBQ0UsY0FBYyxZQUNkOzs7O0dBSVQsUUFFSzt3QkFDSixPQUFPLEVBQUUseUNBQXlDO3dCQUNsRCxhQUFhLEVBQUUsTUFBTTt3QkFDckIsdURBQXVEO3dCQUN2RCx5QkFBeUIsRUFBRSwwQkFBMEI7cUJBQ3RELGlCQUNjLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OzBCQTRINUMsTUFBTTsyQkFBQyxRQUFRO3FHQTVDZCxRQUFRO3NCQURYLEtBQUs7Z0JBaUJGLElBQUk7c0JBRFAsS0FBSztnQkF5Qk4sTUFBTTtzQkFMTCxlQUFlO3VCQUFDLE9BQU8sRUFBRTt3QkFDeEIsdUVBQXVFO3dCQUN2RSw4Q0FBOEM7d0JBQzlDLFdBQVcsRUFBRSxJQUFJO3FCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xpdmVBbm5vdW5jZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SGFzVGFiSW5kZXgsIG1peGluVGFiSW5kZXh9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge1xuICBNRENDaGlwU2V0Rm91bmRhdGlvbixcbiAgTURDQ2hpcFNldEFkYXB0ZXIsXG4gIE1EQ0NoaXBGb3VuZGF0aW9uLFxuICBNRENDaGlwRXZlbnRzLFxuICBDaGlwQW5pbWF0aW9uRXZlbnQsXG4gIENoaXBJbnRlcmFjdGlvbkV2ZW50LFxuICBDaGlwTmF2aWdhdGlvbkV2ZW50LFxuICBNRENDaGlwQWN0aW9uVHlwZSxcbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7bWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdENoaXAsIE1hdENoaXBFdmVudH0gZnJvbSAnLi9jaGlwJztcbmltcG9ydCB7ZW1pdEN1c3RvbUV2ZW50fSBmcm9tICcuL2VtaXQtZXZlbnQnO1xuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcFNldC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuYWJzdHJhY3QgY2xhc3MgTWF0Q2hpcFNldEJhc2Uge1xuICBhYnN0cmFjdCBkaXNhYmxlZDogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5jb25zdCBfTWF0Q2hpcFNldE1peGluQmFzZSA9IG1peGluVGFiSW5kZXgoTWF0Q2hpcFNldEJhc2UpO1xuXG4vKipcbiAqIEJhc2ljIGNvbnRhaW5lciBjb21wb25lbnQgZm9yIHRoZSBNYXRDaGlwIGNvbXBvbmVudC5cbiAqXG4gKiBFeHRlbmRlZCBieSBNYXRDaGlwTGlzdGJveCBhbmQgTWF0Q2hpcEdyaWQgZm9yIGRpZmZlcmVudCBpbnRlcmFjdGlvbiBwYXR0ZXJucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtc2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cIm1kYy1ldm9sdXRpb24tY2hpcC1zZXRfX2NoaXBzXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJ2NoaXAtc2V0LmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hpcC1zZXQgbWRjLWV2b2x1dGlvbi1jaGlwLXNldCcsXG4gICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgIC8vIFRPRE86IHJlcGxhY2UgdGhpcyBiaW5kaW5nIHdpdGggdXNlIG9mIEFyaWFEZXNjcmliZXJcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBTZXRcbiAgZXh0ZW5kcyBfTWF0Q2hpcFNldE1peGluQmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEhhc1RhYkluZGV4LCBPbkRlc3Ryb3lcbntcbiAgLyoqXG4gICAqIFdoZW4gYSBjaGlwIGlzIGRlc3Ryb3llZCwgd2Ugc3RvcmUgdGhlIGluZGV4IG9mIHRoZSBkZXN0cm95ZWQgY2hpcCB1bnRpbCB0aGUgY2hpcHNcbiAgICogcXVlcnkgbGlzdCBub3RpZmllcyBhYm91dCB0aGUgdXBkYXRlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHdlIGNhbm5vdCBkZXRlcm1pbmUgYW5cbiAgICogYXBwcm9wcmlhdGUgY2hpcCB0aGF0IHNob3VsZCByZWNlaXZlIGZvY3VzIHVudGlsIHRoZSBhcnJheSBvZiBjaGlwcyB1cGRhdGVkIGNvbXBsZXRlbHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xhc3REZXN0cm95ZWRDaGlwSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgTURDIGZvdW5kYXRpb24gY29udGFpbmluZyBidXNpbmVzcyBsb2dpYyBmb3IgTURDIGNoaXAtc2V0LiAqL1xuICBwcm90ZWN0ZWQgX2NoaXBTZXRGb3VuZGF0aW9uOiBNRENDaGlwU2V0Rm91bmRhdGlvbjtcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByb3RlY3RlZCBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogUm9sZSB0byB1c2UgaWYgaXQgaGFzbid0IGJlZW4gb3ZlcndyaXR0ZW4gYnkgdGhlIHVzZXIuICovXG4gIHByb3RlY3RlZCBfZGVmYXVsdFJvbGUgPSAncHJlc2VudGF0aW9uJztcblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIHJlbW92ZSBldmVudHMuICovXG4gIGdldCBjaGlwRGVzdHJveWVkQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1hdENoaXBFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLl9nZXRDaGlwU3RyZWFtKGNoaXAgPT4gY2hpcC5kZXN0cm95ZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBNREMgY2hpcC1zZXQgYWRhcHRlciBpbnRlcmZhY2UuXG4gICAqIFRoZXNlIG1ldGhvZHMgYXJlIGNhbGxlZCBieSB0aGUgY2hpcCBzZXQgZm91bmRhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBfY2hpcFNldEFkYXB0ZXI6IE1EQ0NoaXBTZXRBZGFwdGVyID0ge1xuICAgIGFubm91bmNlTWVzc2FnZTogbWVzc2FnZSA9PiB0aGlzLl9saXZlQW5ub3VuY2VyLmFubm91bmNlKG1lc3NhZ2UpLFxuICAgIGVtaXRFdmVudDogKGV2ZW50TmFtZSwgZXZlbnREZXRhaWwpID0+IHtcbiAgICAgIGVtaXRDdXN0b21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2RvY3VtZW50LCBldmVudE5hbWUsIGV2ZW50RGV0YWlsLCB0cnVlKTtcbiAgICB9LFxuICAgIGdldEF0dHJpYnV0ZTogbmFtZSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpLFxuICAgIGdldENoaXBBY3Rpb25zQXRJbmRleDogaW5kZXggPT4gdGhpcy5fY2hpcEZvdW5kYXRpb24oaW5kZXgpPy5nZXRBY3Rpb25zKCkgfHwgW10sXG4gICAgZ2V0Q2hpcENvdW50OiAoKSA9PiB0aGlzLl9jaGlwcy5sZW5ndGgsXG4gICAgZ2V0Q2hpcElkQXRJbmRleDogaW5kZXggPT4gdGhpcy5fY2hpcEZvdW5kYXRpb24oaW5kZXgpPy5nZXRFbGVtZW50SUQoKSB8fCAnJyxcbiAgICBnZXRDaGlwSW5kZXhCeUlkOiBpZCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hpcHMudG9BcnJheSgpLmZpbmRJbmRleChjaGlwID0+IGNoaXAuX2dldEZvdW5kYXRpb24oKS5nZXRFbGVtZW50SUQoKSA9PT0gaWQpO1xuICAgIH0sXG4gICAgaXNDaGlwRm9jdXNhYmxlQXRJbmRleDogKGluZGV4LCBhY3Rpb25UeXBlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hpcEZvdW5kYXRpb24oaW5kZXgpPy5pc0FjdGlvbkZvY3VzYWJsZShhY3Rpb25UeXBlKSB8fCBmYWxzZTtcbiAgICB9LFxuICAgIGlzQ2hpcFNlbGVjdGFibGVBdEluZGV4OiAoaW5kZXgsIGFjdGlvblR5cGUpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGlwRm91bmRhdGlvbihpbmRleCk/LmlzQWN0aW9uU2VsZWN0YWJsZShhY3Rpb25UeXBlKSB8fCBmYWxzZTtcbiAgICB9LFxuICAgIGlzQ2hpcFNlbGVjdGVkQXRJbmRleDogKGluZGV4LCBhY3Rpb25UeXBlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hpcEZvdW5kYXRpb24oaW5kZXgpPy5pc0FjdGlvblNlbGVjdGVkKGFjdGlvblR5cGUpIHx8IGZhbHNlO1xuICAgIH0sXG4gICAgcmVtb3ZlQ2hpcEF0SW5kZXg6IGluZGV4ID0+IHRoaXMuX2NoaXBzLnRvQXJyYXkoKVtpbmRleF0/LnJlbW92ZSgpLFxuICAgIHNldENoaXBGb2N1c0F0SW5kZXg6IChpbmRleCwgYWN0aW9uLCBiZWhhdmlvcikgPT4ge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24oaW5kZXgpPy5zZXRBY3Rpb25Gb2N1cyhhY3Rpb24sIGJlaGF2aW9yKTtcbiAgICB9LFxuICAgIHNldENoaXBTZWxlY3RlZEF0SW5kZXg6IChpbmRleCwgYWN0aW9uVHlwZSwgaXNTZWxlY3RlZCkgPT4ge1xuICAgICAgLy8gU2V0dGluZyB0aGUgdHJhaWxpbmcgYWN0aW9uIGFzIGRlc2VsZWN0ZWQgZW5kcyB1cCBkZXNlbGVjdGluZyB0aGUgZW50aXJlIGNoaXAuXG4gICAgICAvLyBUaGlzIGlzIHdvcmtpbmcgYXMgZXhwZWN0ZWQsIGJ1dCBpdCdzIG5vdCBzb21ldGhpbmcgd2Ugd2FudCBzbyB3ZSBvbmx5IGFwcGx5IHRoZVxuICAgICAgLy8gc2VsZWN0ZWQgc3RhdGUgdG8gdGhlIHByaW1hcnkgY2hpcC5cbiAgICAgIGlmIChhY3Rpb25UeXBlID09PSBNRENDaGlwQWN0aW9uVHlwZS5QUklNQVJZKSB7XG4gICAgICAgIHRoaXMuX2NoaXBGb3VuZGF0aW9uKGluZGV4KT8uc2V0QWN0aW9uU2VsZWN0ZWQoYWN0aW9uVHlwZSwgaXNTZWxlY3RlZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydENoaXBBbmltYXRpb25BdEluZGV4OiAoaW5kZXgsIGFuaW1hdGlvbikgPT4ge1xuICAgICAgdGhpcy5fY2hpcEZvdW5kYXRpb24oaW5kZXgpPy5zdGFydEFuaW1hdGlvbihhbmltYXRpb24pO1xuICAgIH0sXG4gIH07XG5cbiAgLyoqIFRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgY2hpcCBsaXN0IGZvciBpbXByb3ZlZCBhMTF5LiAqL1xuICBfYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIE1hcCBmcm9tIGNsYXNzIHRvIHdoZXRoZXIgdGhlIGNsYXNzIGlzIGVuYWJsZWQuXG4gICAqIEVuYWJsZWQgY2xhc3NlcyBhcmUgc2V0IG9uIHRoZSBNREMgY2hpcC1zZXQgZGl2LlxuICAgKi9cbiAgX21kY0NsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIHNldCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9zeW5jQ2hpcHNTdGF0ZSgpO1xuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBsaXN0IGNvbnRhaW5zIGNoaXBzIG9yIG5vdC4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGlwcy5sZW5ndGggPT09IDA7XG4gIH1cblxuICAvKiogVGhlIEFSSUEgcm9sZSBhcHBsaWVkIHRvIHRoZSBjaGlwIHNldC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHJvbGUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2V4cGxpY2l0Um9sZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V4cGxpY2l0Um9sZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbXB0eSA/IG51bGwgOiB0aGlzLl9kZWZhdWx0Um9sZTtcbiAgfVxuXG4gIHNldCByb2xlKHZhbHVlOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgdGhpcy5fZXhwbGljaXRSb2xlID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfZXhwbGljaXRSb2xlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciBhbnkgb2YgdGhlIGNoaXBzIGluc2lkZSBvZiB0aGlzIGNoaXAtc2V0IGhhcyBmb2N1cy4gKi9cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0ZvY3VzZWRDaGlwKCk7XG4gIH1cblxuICAvKiogVGhlIGNoaXBzIHRoYXQgYXJlIHBhcnQgb2YgdGhpcyBjaGlwIHNldC4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRDaGlwLCB7XG4gICAgLy8gV2UgbmVlZCB0byB1c2UgYGRlc2NlbmRhbnRzOiB0cnVlYCwgYmVjYXVzZSBJdnkgd2lsbCBubyBsb25nZXIgbWF0Y2hcbiAgICAvLyBpbmRpcmVjdCBkZXNjZW5kYW50cyBpZiBpdCdzIGxlZnQgYXMgZmFsc2UuXG4gICAgZGVzY2VuZGFudHM6IHRydWUsXG4gIH0pXG4gIF9jaGlwczogUXVlcnlMaXN0PE1hdENoaXA+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2xpdmVBbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgY29uc3QgZWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcFNldEZvdW5kYXRpb24odGhpcy5fY2hpcFNldEFkYXB0ZXIpO1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihNRENDaGlwRXZlbnRzLkFOSU1BVElPTiwgdGhpcy5faGFuZGxlQ2hpcEFuaW1hdGlvbik7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKE1EQ0NoaXBFdmVudHMuSU5URVJBQ1RJT04sIHRoaXMuX2hhbmRsZUNoaXBJbnRlcmFjdGlvbik7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKE1EQ0NoaXBFdmVudHMuTkFWSUdBVElPTiwgdGhpcy5faGFuZGxlQ2hpcE5hdmlnYXRpb24pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9jaGlwcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIC8vIFNpbmNlIHRoaXMgaGFwcGVucyBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlblxuICAgICAgICAvLyBjaGVja2VkLCB3ZSBuZWVkIHRvIGRlZmVyIGl0IHRvIHRoZSBuZXh0IHRpY2suXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3N5bmNDaGlwc1N0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jaGlwRGVzdHJveWVkQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKGV2ZW50OiBNYXRDaGlwRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNoaXAgPSBldmVudC5jaGlwO1xuICAgICAgY29uc3QgY2hpcEluZGV4ID0gdGhpcy5fY2hpcHMudG9BcnJheSgpLmluZGV4T2YoZXZlbnQuY2hpcCk7XG5cbiAgICAgIC8vIEluIGNhc2UgdGhlIGNoaXAgdGhhdCB3aWxsIGJlIHJlbW92ZWQgaXMgY3VycmVudGx5IGZvY3VzZWQsIHdlIHRlbXBvcmFyaWx5IHN0b3JlXG4gICAgICAvLyB0aGUgaW5kZXggaW4gb3JkZXIgdG8gYmUgYWJsZSB0byBkZXRlcm1pbmUgYW4gYXBwcm9wcmlhdGUgc2libGluZyBjaGlwIHRoYXQgd2lsbFxuICAgICAgLy8gcmVjZWl2ZSBmb2N1cy5cbiAgICAgIGlmICh0aGlzLl9pc1ZhbGlkSW5kZXgoY2hpcEluZGV4KSAmJiBjaGlwLl9oYXNGb2N1cygpKSB7XG4gICAgICAgIHRoaXMuX2xhc3REZXN0cm95ZWRDaGlwSW5kZXggPSBjaGlwSW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihNRENDaGlwRXZlbnRzLkFOSU1BVElPTiwgdGhpcy5faGFuZGxlQ2hpcEFuaW1hdGlvbik7XG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKE1EQ0NoaXBFdmVudHMuSU5URVJBQ1RJT04sIHRoaXMuX2hhbmRsZUNoaXBJbnRlcmFjdGlvbik7XG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKE1EQ0NoaXBFdmVudHMuTkFWSUdBVElPTiwgdGhpcy5faGFuZGxlQ2hpcE5hdmlnYXRpb24pO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBvZiB0aGUgY2hpcHMgaXMgZm9jdXNlZC4gKi9cbiAgcHJvdGVjdGVkIF9oYXNGb2N1c2VkQ2hpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcHMgJiYgdGhpcy5fY2hpcHMuc29tZShjaGlwID0+IGNoaXAuX2hhc0ZvY3VzKCkpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBjaGlwLXNldCdzIHN0YXRlIHdpdGggdGhlIGluZGl2aWR1YWwgY2hpcHMuICovXG4gIHByb3RlY3RlZCBfc3luY0NoaXBzU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2NoaXBzKSB7XG4gICAgICB0aGlzLl9jaGlwcy5mb3JFYWNoKGNoaXAgPT4ge1xuICAgICAgICBjaGlwLmRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWQ7XG4gICAgICAgIGNoaXAuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIER1bW15IG1ldGhvZCBmb3Igc3ViY2xhc3NlcyB0byBvdmVycmlkZS4gQmFzZSBjaGlwIHNldCBjYW5ub3QgYmUgZm9jdXNlZC4gKi9cbiAgZm9jdXMoKSB7fVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggdG8gYmUgY2hlY2tlZC5cbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaW5kZXggaXMgdmFsaWQgZm9yIG91ciBsaXN0IG9mIGNoaXBzLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9pc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fY2hpcHMubGVuZ3RoO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGFuIGV2ZW50IGNvbWVzIGZyb20gaW5zaWRlIGEgY2hpcCBlbGVtZW50LiAqL1xuICBwcm90ZWN0ZWQgX29yaWdpbmF0ZXNGcm9tQ2hpcChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tGb3JDbGFzc0luSGllcmFyY2h5KGV2ZW50LCAnbWRjLWV2b2x1dGlvbi1jaGlwJyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgYHRhYmluZGV4YCBmcm9tIHRoZSBjaGlwIGdyaWQgYW5kIHJlc2V0cyBpdCBiYWNrIGFmdGVyd2FyZHMsIGFsbG93aW5nIHRoZVxuICAgKiB1c2VyIHRvIHRhYiBvdXQgb2YgaXQuIFRoaXMgcHJldmVudHMgdGhlIGdyaWQgZnJvbSBjYXB0dXJpbmcgZm9jdXMgYW5kIHJlZGlyZWN0aW5nXG4gICAqIGl0IGJhY2sgdG8gdGhlIGZpcnN0IGNoaXAsIGNyZWF0aW5nIGEgZm9jdXMgdHJhcCwgaWYgaXQgdXNlciB0cmllcyB0byB0YWIgYXdheS5cbiAgICovXG4gIHByb3RlY3RlZCBfYWxsb3dGb2N1c0VzY2FwZSgpIHtcbiAgICBjb25zdCBwcmV2aW91c1RhYkluZGV4ID0gdGhpcy50YWJJbmRleDtcblxuICAgIGlmICh0aGlzLnRhYkluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy50YWJJbmRleCA9IC0xO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IHByZXZpb3VzVGFiSW5kZXg7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBzdHJlYW0gb2YgZXZlbnRzIGZyb20gYWxsIHRoZSBjaGlwcyB3aXRoaW4gdGhlIHNldC5cbiAgICogVGhlIHN0cmVhbSB3aWxsIGF1dG9tYXRpY2FsbHkgaW5jb3Jwb3JhdGUgYW55IG5ld2x5LWFkZGVkIGNoaXBzLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRDaGlwU3RyZWFtPFQsIEMgZXh0ZW5kcyBNYXRDaGlwID0gTWF0Q2hpcD4oXG4gICAgbWFwcGluZ0Z1bmN0aW9uOiAoY2hpcDogQykgPT4gT2JzZXJ2YWJsZTxUPixcbiAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBzLmNoYW5nZXMucGlwZShcbiAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiBtZXJnZSguLi4odGhpcy5fY2hpcHMgYXMgUXVlcnlMaXN0PEM+KS5tYXAobWFwcGluZ0Z1bmN0aW9uKSkpLFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoZWNrRm9yQ2xhc3NJbkhpZXJhcmNoeShldmVudDogRXZlbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiBjdXJyZW50RWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAvLyBOdWxsIGNoZWNrIHRoZSBjbGFzc0xpc3QsIGJlY2F1c2UgSUUgYW5kIEVkZ2UgZG9uJ3Qgc3VwcG9ydCBpdCBvbiBhbGwgZWxlbWVudHMuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0ICYmIGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hpcEZvdW5kYXRpb24oaW5kZXg6IG51bWJlcik6IE1EQ0NoaXBGb3VuZGF0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcHMudG9BcnJheSgpW2luZGV4XT8uX2dldEZvdW5kYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUNoaXBBbmltYXRpb24gPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24uaGFuZGxlQ2hpcEFuaW1hdGlvbihldmVudCBhcyBDaGlwQW5pbWF0aW9uRXZlbnQpO1xuICB9O1xuXG4gIHByaXZhdGUgX2hhbmRsZUNoaXBJbnRlcmFjdGlvbiA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbi5oYW5kbGVDaGlwSW50ZXJhY3Rpb24oZXZlbnQgYXMgQ2hpcEludGVyYWN0aW9uRXZlbnQpO1xuICB9O1xuXG4gIHByaXZhdGUgX2hhbmRsZUNoaXBOYXZpZ2F0aW9uID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmhhbmRsZUNoaXBOYXZpZ2F0aW9uKGV2ZW50IGFzIENoaXBOYXZpZ2F0aW9uRXZlbnQpO1xuICB9O1xufVxuIl19