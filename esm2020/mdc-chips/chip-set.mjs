/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, Optional, QueryList, ViewEncapsulation, } from '@angular/core';
import { mixinTabIndex } from '@angular/material-experimental/mdc-core';
import { deprecated } from '@material/chips';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChip } from './chip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
let uid = 0;
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
    constructor(_elementRef, _changeDetectorRef, _dir) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        this._lastDestroyedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip-set adapter interface.
         * These methods are called by the chip set foundation.
         */
        this._chipSetAdapter = {
            hasClass: className => this._hasMdcClass(className),
            // No-op. We keep track of chips via ContentChildren, which will be updated when a chip is
            // removed.
            removeChipAtIndex: () => { },
            // No-op for base chip set. MatChipListbox overrides the adapter to provide this method.
            selectChipAtIndex: () => { },
            getIndexOfChipById: (id) => this._chips.toArray().findIndex(chip => chip.id === id),
            focusChipPrimaryActionAtIndex: () => { },
            focusChipTrailingActionAtIndex: () => { },
            removeFocusFromChipAtIndex: () => { },
            isRTL: () => !!this._dir && this._dir.value === 'rtl',
            getChipListCount: () => this._chips.length,
            // TODO(mmalerba): Implement using LiveAnnouncer.
            announceMessage: () => { },
        };
        /** Uid of the chip set */
        this._uid = `mat-mdc-chip-set-${uid++}`;
        /**
         * Map from class to whether the class is enabled.
         * Enabled classes are set on the MDC chip-set div.
         */
        this._mdcClasses = {};
        this._disabled = false;
        this._role = null;
        this._chipSetFoundation = new deprecated.MDCChipSetFoundation(this._chipSetAdapter);
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
        if (this._role) {
            return this._role;
        }
        else {
            return this.empty ? null : 'presentation';
        }
    }
    set role(value) {
        this._role = value;
    }
    /** Whether any of the chips inside of this chip-set has focus. */
    get focused() {
        return this._hasFocusedChip();
    }
    /** Combined stream of all of the child chips' remove events. */
    get chipRemoveChanges() {
        return merge(...this._chips.map(chip => chip.removed));
    }
    /** Combined stream of all of the child chips' remove events. */
    get chipDestroyedChanges() {
        return merge(...this._chips.map(chip => chip.destroyed));
    }
    /** Combined stream of all of the child chips' interaction events. */
    get chipInteractionChanges() {
        return merge(...this._chips.map(chip => chip.interaction));
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
            this._resetChips();
        });
    }
    ngOnDestroy() {
        this._dropSubscriptions();
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
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    _setMdcClass(cssClass, active) {
        const classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    }
    /** Adapter method that returns true if the chip set has the given MDC class. */
    _hasMdcClass(className) {
        return this._elementRef.nativeElement.classList.contains(className);
    }
    /** Updates subscriptions to chip events. */
    _resetChips() {
        this._dropSubscriptions();
        this._subscribeToChipEvents();
    }
    /** Subscribes to events on the child chips. */
    _subscribeToChipEvents() {
        this._listenToChipsRemove();
        this._listenToChipsDestroyed();
        this._listenToChipsInteraction();
    }
    /** Subscribes to chip removal events. */
    _listenToChipsRemove() {
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe((event) => {
            this._chipSetFoundation.handleChipRemoval({
                chipId: event.chip.id,
                // TODO(mmalerba): Add removal message.
                removedAnnouncement: null,
            });
        });
    }
    /** Subscribes to chip destroyed events. */
    _listenToChipsDestroyed() {
        this._chipDestroyedSubscription = this.chipDestroyedChanges.subscribe((event) => {
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
    /** Subscribes to chip interaction events. */
    _listenToChipsInteraction() {
        this._chipInteractionSubscription = this.chipInteractionChanges.subscribe((id) => {
            this._chipSetFoundation.handleChipInteraction({ chipId: id });
        });
    }
    /** Unsubscribes from all chip events. */
    _dropSubscriptions() {
        if (this._chipRemoveSubscription) {
            this._chipRemoveSubscription.unsubscribe();
            this._chipRemoveSubscription = null;
        }
        if (this._chipInteractionSubscription) {
            this._chipInteractionSubscription.unsubscribe();
            this._chipInteractionSubscription = null;
        }
        if (this._chipDestroyedSubscription) {
            this._chipDestroyedSubscription.unsubscribe();
            this._chipDestroyedSubscription = null;
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
        return this._checkForClassInHierarchy(event, 'mdc-chip');
    }
    /**
     * Checks whether an event comes from inside a chip element in the editing
     * state.
     */
    _originatesFromEditingChip(event) {
        return this._checkForClassInHierarchy(event, 'mdc-chip--editing');
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
}
MatChipSet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChipSet, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatChipSet.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: MatChipSet, selector: "mat-chip-set", inputs: { disabled: "disabled", role: "role" }, host: { properties: { "attr.role": "role", "attr.aria-describedby": "_ariaDescribedby || null", "id": "_uid" }, classAttribute: "mat-mdc-chip-set mdc-chip-set" }, queries: [{ propertyName: "_chips", predicate: MatChip, descendants: true }], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: MatChipSet, decorators: [{
            type: Component,
            args: [{ selector: 'mat-chip-set', template: '<ng-content></ng-content>', host: {
                        'class': 'mat-mdc-chip-set mdc-chip-set',
                        '[attr.role]': 'role',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[id]': '_uid',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-deprecated-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-deprecated-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-deprecated-chip-trailing-action,.mdc-deprecated-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{animation:none;transition:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.mat-mdc-chip-grid{margin:-4px}.mat-mdc-chip-grid input.mat-mdc-chip-input{margin:4px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-mdc-chip-row-focusable-text-content{position:relative}.mat-mdc-chip-remove{border:none;-webkit-appearance:none;-moz-appearance:none;padding:0;background:none}.mat-mdc-chip-remove .mat-icon{width:inherit;height:inherit;font-size:inherit}.mat-mdc-chip-row-focusable-text-content,.mat-mdc-chip-remove-icon{display:flex;align-items:center}.mat-mdc-chip-content{display:inline-flex}.mdc-chip--editing{background-color:transparent;display:flex;flex-direction:column}.mdc-chip--editing .mat-mdc-chip-content{pointer-events:none;height:0;overflow:hidden}.mat-chip-edit-input{cursor:text;display:inline-block}.mat-mdc-chip-edit-input-container{width:100%;height:100%;display:flex;align-items:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { disabled: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFlLHFCQUFxQixFQUFjLE1BQU0sdUJBQXVCLENBQUM7QUFDdkYsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUVMLFFBQVEsRUFDUixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxhQUFhLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLEtBQUssRUFBYyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sUUFBUSxDQUFDOzs7QUFFN0MsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBRVo7OztHQUdHO0FBQ0gsTUFBZSxjQUFjO0lBRTNCLFlBQVksV0FBdUIsSUFBRyxDQUFDO0NBQ3hDO0FBQ0QsTUFBTSxvQkFBb0IsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFM0Q7Ozs7R0FJRztBQWVILE1BQU0sT0FBTyxVQUNYLFNBQVEsb0JBQW9CO0lBcUg1QixZQUNZLFdBQXVCLEVBQ3ZCLGtCQUFxQyxFQUN6QixJQUFvQjtRQUUxQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFKVCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3pCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBNUc1Qzs7OztXQUlHO1FBQ08sNEJBQXVCLEdBQWtCLElBQUksQ0FBQztRQUt4RCxnRUFBZ0U7UUFDdEQsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFM0M7OztXQUdHO1FBQ08sb0JBQWUsR0FBaUM7WUFDeEQsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDbkQsMEZBQTBGO1lBQzFGLFdBQVc7WUFDWCxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQzNCLHdGQUF3RjtZQUN4RixpQkFBaUIsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQzNCLGtCQUFrQixFQUFFLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQzNGLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7WUFDdkMsOEJBQThCLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztZQUN4QywwQkFBMEIsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQ3BDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLO1lBQ3JELGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUMxQyxpREFBaUQ7WUFDakQsZUFBZSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7U0FDMUIsQ0FBQztRQUtGLDBCQUEwQjtRQUMxQixTQUFJLEdBQVcsb0JBQW9CLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFFM0M7OztXQUdHO1FBQ0gsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1FBV2pDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFvQjdCLFVBQUssR0FBa0IsSUFBSSxDQUFDO1FBb0NsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFsRUQsd0NBQXdDO0lBQ3hDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBR0QsbURBQW1EO0lBQ25ELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCw2Q0FBNkM7SUFDN0MsSUFDSSxJQUFJO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQW9CO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFHRCxrRUFBa0U7SUFDbEUsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSxJQUFJLG9CQUFvQjtRQUN0QixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELHFFQUFxRTtJQUNyRSxJQUFJLHNCQUFzQjtRQUN4QixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQW1CRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNuRixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLGdEQUFnRDtnQkFDaEQsaURBQWlEO2dCQUNqRCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxrREFBa0Q7SUFDeEMsZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsNERBQTREO0lBQ2xELGVBQWU7UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsMEVBQTBFO0lBQ2hFLFlBQVksQ0FBQyxRQUFnQixFQUFFLE1BQWU7UUFDdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGdGQUFnRjtJQUN0RSxZQUFZLENBQUMsU0FBaUI7UUFDdEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCw0Q0FBNEM7SUFDcEMsV0FBVztRQUNqQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0NBQStDO0lBQ3JDLHNCQUFzQjtRQUM5QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQseUNBQXlDO0lBQ2pDLG9CQUFvQjtRQUMxQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUN0RixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3hDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLHVDQUF1QztnQkFDdkMsbUJBQW1CLEVBQUUsSUFBSTthQUMxQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBMkM7SUFDbkMsdUJBQXVCO1FBQzdCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBbUIsRUFBRSxFQUFFO1lBQzVGLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDeEIsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBFLG1GQUFtRjtZQUNuRixtRkFBbUY7WUFDbkYsaUJBQWlCO1lBQ2pCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7YUFDMUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBNkM7SUFDckMseUJBQXlCO1FBQy9CLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUU7WUFDdkYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQXlDO0lBQy9CLGtCQUFrQjtRQUMxQixJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztTQUNyQztRQUVELElBQUksSUFBSSxDQUFDLDRCQUE0QixFQUFFO1lBQ3JDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1NBQzFDO1FBRUQsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEVBQUU7WUFDbkMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQsZ0ZBQWdGO0lBQ2hGLEtBQUssS0FBSSxDQUFDO0lBRVY7Ozs7O09BS0c7SUFDTyxhQUFhLENBQUMsS0FBYTtRQUNuQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xELENBQUM7SUFFRCxnRUFBZ0U7SUFDdEQsbUJBQW1CLENBQUMsS0FBWTtRQUN4QyxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRztJQUNPLDBCQUEwQixDQUFDLEtBQVk7UUFDL0MsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLHlCQUF5QixDQUFDLEtBQVksRUFBRSxTQUFpQjtRQUMvRCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBNEIsQ0FBQztRQUV4RCxPQUFPLGNBQWMsSUFBSSxjQUFjLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDMUUsa0ZBQWtGO1lBQ2xGLElBQUksY0FBYyxDQUFDLFNBQVMsSUFBSSxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDNUUsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELGNBQWMsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDO1NBQy9DO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzsrR0ExUlUsVUFBVTttR0FBVixVQUFVLDhSQStHSixPQUFPLHVFQTNIZCwyQkFBMkI7bUdBWTFCLFVBQVU7a0JBZHRCLFNBQVM7K0JBQ0UsY0FBYyxZQUNkLDJCQUEyQixRQUUvQjt3QkFDSixPQUFPLEVBQUUsK0JBQStCO3dCQUN4QyxhQUFhLEVBQUUsTUFBTTt3QkFDckIsdURBQXVEO3dCQUN2RCx5QkFBeUIsRUFBRSwwQkFBMEI7d0JBQ3JELE1BQU0sRUFBRSxNQUFNO3FCQUNmLGlCQUNjLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OzBCQTJINUMsUUFBUTs0Q0E1RFAsUUFBUTtzQkFEWCxLQUFLO2dCQWlCRixJQUFJO3NCQURQLEtBQUs7Z0JBd0NOLE1BQU07c0JBTEwsZUFBZTt1QkFBQyxPQUFPLEVBQUU7d0JBQ3hCLHVFQUF1RTt3QkFDdkUsOENBQThDO3dCQUM5QyxXQUFXLEVBQUUsSUFBSTtxQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgTnVtYmVySW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0hhc1RhYkluZGV4LCBtaXhpblRhYkluZGV4fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtkZXByZWNhdGVkfSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHttZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3RhcnRXaXRoLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0Q2hpcCwgTWF0Q2hpcEV2ZW50fSBmcm9tICcuL2NoaXAnO1xuXG5sZXQgdWlkID0gMDtcblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXBTZXQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmFic3RyYWN0IGNsYXNzIE1hdENoaXBTZXRCYXNlIHtcbiAgYWJzdHJhY3QgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuY29uc3QgX01hdENoaXBTZXRNaXhpbkJhc2UgPSBtaXhpblRhYkluZGV4KE1hdENoaXBTZXRCYXNlKTtcblxuLyoqXG4gKiBCYXNpYyBjb250YWluZXIgY29tcG9uZW50IGZvciB0aGUgTWF0Q2hpcCBjb21wb25lbnQuXG4gKlxuICogRXh0ZW5kZWQgYnkgTWF0Q2hpcExpc3Rib3ggYW5kIE1hdENoaXBHcmlkIGZvciBkaWZmZXJlbnQgaW50ZXJhY3Rpb24gcGF0dGVybnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXNldCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtc2V0IG1kYy1jaGlwLXNldCcsXG4gICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgIC8vIFRPRE86IHJlcGxhY2UgdGhpcyBiaW5kaW5nIHdpdGggdXNlIG9mIEFyaWFEZXNjcmliZXJcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2lkXSc6ICdfdWlkJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBTZXRcbiAgZXh0ZW5kcyBfTWF0Q2hpcFNldE1peGluQmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEhhc1RhYkluZGV4LCBPbkRlc3Ryb3lcbntcbiAgLyoqIFN1YnNjcmlwdGlvbiB0byByZW1vdmUgY2hhbmdlcyBpbiBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfY2hpcFJlbW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGRlc3Ryb3llZCBldmVudHMgaW4gY2hpcHMuICovXG4gIHByaXZhdGUgX2NoaXBEZXN0cm95ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGlwIGludGVyYWN0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfY2hpcEludGVyYWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgY2hpcCBpcyBkZXN0cm95ZWQsIHdlIHN0b3JlIHRoZSBpbmRleCBvZiB0aGUgZGVzdHJveWVkIGNoaXAgdW50aWwgdGhlIGNoaXBzXG4gICAqIHF1ZXJ5IGxpc3Qgbm90aWZpZXMgYWJvdXQgdGhlIHVwZGF0ZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSB3ZSBjYW5ub3QgZGV0ZXJtaW5lIGFuXG4gICAqIGFwcHJvcHJpYXRlIGNoaXAgdGhhdCBzaG91bGQgcmVjZWl2ZSBmb2N1cyB1bnRpbCB0aGUgYXJyYXkgb2YgY2hpcHMgdXBkYXRlZCBjb21wbGV0ZWx5LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9sYXN0RGVzdHJveWVkQ2hpcEluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKiogVGhlIE1EQyBmb3VuZGF0aW9uIGNvbnRhaW5pbmcgYnVzaW5lc3MgbG9naWMgZm9yIE1EQyBjaGlwLXNldC4gKi9cbiAgcHJvdGVjdGVkIF9jaGlwU2V0Rm91bmRhdGlvbjogZGVwcmVjYXRlZC5NRENDaGlwU2V0Rm91bmRhdGlvbjtcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByb3RlY3RlZCBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gb2YgdGhlIE1EQyBjaGlwLXNldCBhZGFwdGVyIGludGVyZmFjZS5cbiAgICogVGhlc2UgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IHRoZSBjaGlwIHNldCBmb3VuZGF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jaGlwU2V0QWRhcHRlcjogZGVwcmVjYXRlZC5NRENDaGlwU2V0QWRhcHRlciA9IHtcbiAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuX2hhc01kY0NsYXNzKGNsYXNzTmFtZSksXG4gICAgLy8gTm8tb3AuIFdlIGtlZXAgdHJhY2sgb2YgY2hpcHMgdmlhIENvbnRlbnRDaGlsZHJlbiwgd2hpY2ggd2lsbCBiZSB1cGRhdGVkIHdoZW4gYSBjaGlwIGlzXG4gICAgLy8gcmVtb3ZlZC5cbiAgICByZW1vdmVDaGlwQXRJbmRleDogKCkgPT4ge30sXG4gICAgLy8gTm8tb3AgZm9yIGJhc2UgY2hpcCBzZXQuIE1hdENoaXBMaXN0Ym94IG92ZXJyaWRlcyB0aGUgYWRhcHRlciB0byBwcm92aWRlIHRoaXMgbWV0aG9kLlxuICAgIHNlbGVjdENoaXBBdEluZGV4OiAoKSA9PiB7fSxcbiAgICBnZXRJbmRleE9mQ2hpcEJ5SWQ6IChpZDogc3RyaW5nKSA9PiB0aGlzLl9jaGlwcy50b0FycmF5KCkuZmluZEluZGV4KGNoaXAgPT4gY2hpcC5pZCA9PT0gaWQpLFxuICAgIGZvY3VzQ2hpcFByaW1hcnlBY3Rpb25BdEluZGV4OiAoKSA9PiB7fSxcbiAgICBmb2N1c0NoaXBUcmFpbGluZ0FjdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgIHJlbW92ZUZvY3VzRnJvbUNoaXBBdEluZGV4OiAoKSA9PiB7fSxcbiAgICBpc1JUTDogKCkgPT4gISF0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyxcbiAgICBnZXRDaGlwTGlzdENvdW50OiAoKSA9PiB0aGlzLl9jaGlwcy5sZW5ndGgsXG4gICAgLy8gVE9ETyhtbWFsZXJiYSk6IEltcGxlbWVudCB1c2luZyBMaXZlQW5ub3VuY2VyLlxuICAgIGFubm91bmNlTWVzc2FnZTogKCkgPT4ge30sXG4gIH07XG5cbiAgLyoqIFRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgY2hpcCBsaXN0IGZvciBpbXByb3ZlZCBhMTF5LiAqL1xuICBfYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqIFVpZCBvZiB0aGUgY2hpcCBzZXQgKi9cbiAgX3VpZDogc3RyaW5nID0gYG1hdC1tZGMtY2hpcC1zZXQtJHt1aWQrK31gO1xuXG4gIC8qKlxuICAgKiBNYXAgZnJvbSBjbGFzcyB0byB3aGV0aGVyIHRoZSBjbGFzcyBpcyBlbmFibGVkLlxuICAgKiBFbmFibGVkIGNsYXNzZXMgYXJlIHNldCBvbiB0aGUgTURDIGNoaXAtc2V0IGRpdi5cbiAgICovXG4gIF9tZGNDbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBzZXQgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3N5bmNDaGlwc1N0YXRlKCk7XG4gIH1cbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgY29udGFpbnMgY2hpcHMgb3Igbm90LiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBzLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIC8qKiBUaGUgQVJJQSByb2xlIGFwcGxpZWQgdG8gdGhlIGNoaXAgc2V0LiAqL1xuICBASW5wdXQoKVxuICBnZXQgcm9sZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy5fcm9sZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JvbGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVtcHR5ID8gbnVsbCA6ICdwcmVzZW50YXRpb24nO1xuICAgIH1cbiAgfVxuXG4gIHNldCByb2xlKHZhbHVlOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgdGhpcy5fcm9sZSA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3JvbGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIGFueSBvZiB0aGUgY2hpcHMgaW5zaWRlIG9mIHRoaXMgY2hpcC1zZXQgaGFzIGZvY3VzLiAqL1xuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRm9jdXNlZENoaXAoKTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgcmVtb3ZlIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBSZW1vdmVDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWF0Q2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuX2NoaXBzLm1hcChjaGlwID0+IGNoaXAucmVtb3ZlZCkpO1xuICB9XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyByZW1vdmUgZXZlbnRzLiAqL1xuICBnZXQgY2hpcERlc3Ryb3llZENoYW5nZXMoKTogT2JzZXJ2YWJsZTxNYXRDaGlwRXZlbnQ+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5fY2hpcHMubWFwKGNoaXAgPT4gY2hpcC5kZXN0cm95ZWQpKTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgaW50ZXJhY3Rpb24gZXZlbnRzLiAqL1xuICBnZXQgY2hpcEludGVyYWN0aW9uQ2hhbmdlcygpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiBtZXJnZSguLi50aGlzLl9jaGlwcy5tYXAoY2hpcCA9PiBjaGlwLmludGVyYWN0aW9uKSk7XG4gIH1cblxuICAvKiogVGhlIGNoaXBzIHRoYXQgYXJlIHBhcnQgb2YgdGhpcyBjaGlwIHNldC4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRDaGlwLCB7XG4gICAgLy8gV2UgbmVlZCB0byB1c2UgYGRlc2NlbmRhbnRzOiB0cnVlYCwgYmVjYXVzZSBJdnkgd2lsbCBubyBsb25nZXIgbWF0Y2hcbiAgICAvLyBpbmRpcmVjdCBkZXNjZW5kYW50cyBpZiBpdCdzIGxlZnQgYXMgZmFsc2UuXG4gICAgZGVzY2VuZGFudHM6IHRydWUsXG4gIH0pXG4gIF9jaGlwczogUXVlcnlMaXN0PE1hdENoaXA+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICkge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbiA9IG5ldyBkZXByZWNhdGVkLk1EQ0NoaXBTZXRGb3VuZGF0aW9uKHRoaXMuX2NoaXBTZXRBZGFwdGVyKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fY2hpcHMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAvLyBTaW5jZSB0aGlzIGhhcHBlbnMgYWZ0ZXIgdGhlIGNvbnRlbnQgaGFzIGJlZW5cbiAgICAgICAgLy8gY2hlY2tlZCwgd2UgbmVlZCB0byBkZWZlciBpdCB0byB0aGUgbmV4dCB0aWNrLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9zeW5jQ2hpcHNTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVzZXRDaGlwcygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgb2YgdGhlIGNoaXBzIGlzIGZvY3VzZWQuICovXG4gIHByb3RlY3RlZCBfaGFzRm9jdXNlZENoaXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBzICYmIHRoaXMuX2NoaXBzLnNvbWUoY2hpcCA9PiBjaGlwLl9oYXNGb2N1cygpKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgY2hpcC1zZXQncyBzdGF0ZSB3aXRoIHRoZSBpbmRpdmlkdWFsIGNoaXBzLiAqL1xuICBwcm90ZWN0ZWQgX3N5bmNDaGlwc1N0YXRlKCkge1xuICAgIGlmICh0aGlzLl9jaGlwcykge1xuICAgICAgdGhpcy5fY2hpcHMuZm9yRWFjaChjaGlwID0+IHtcbiAgICAgICAgY2hpcC5kaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICBjaGlwLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgTURDIGNoaXAuICovXG4gIHByb3RlY3RlZCBfc2V0TWRjQ2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgYWN0aXZlID8gY2xhc3Nlcy5hZGQoY3NzQ2xhc3MpIDogY2xhc3Nlcy5yZW1vdmUoY3NzQ2xhc3MpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEFkYXB0ZXIgbWV0aG9kIHRoYXQgcmV0dXJucyB0cnVlIGlmIHRoZSBjaGlwIHNldCBoYXMgdGhlIGdpdmVuIE1EQyBjbGFzcy4gKi9cbiAgcHJvdGVjdGVkIF9oYXNNZGNDbGFzcyhjbGFzc05hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH1cblxuICAvKiogVXBkYXRlcyBzdWJzY3JpcHRpb25zIHRvIGNoaXAgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9yZXNldENoaXBzKCkge1xuICAgIHRoaXMuX2Ryb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5fc3Vic2NyaWJlVG9DaGlwRXZlbnRzKCk7XG4gIH1cblxuICAvKiogU3Vic2NyaWJlcyB0byBldmVudHMgb24gdGhlIGNoaWxkIGNoaXBzLiAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZVRvQ2hpcEV2ZW50cygpIHtcbiAgICB0aGlzLl9saXN0ZW5Ub0NoaXBzUmVtb3ZlKCk7XG4gICAgdGhpcy5fbGlzdGVuVG9DaGlwc0Rlc3Ryb3llZCgpO1xuICAgIHRoaXMuX2xpc3RlblRvQ2hpcHNJbnRlcmFjdGlvbigpO1xuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gY2hpcCByZW1vdmFsIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfbGlzdGVuVG9DaGlwc1JlbW92ZSgpIHtcbiAgICB0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlwUmVtb3ZlQ2hhbmdlcy5zdWJzY3JpYmUoKGV2ZW50OiBNYXRDaGlwRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmhhbmRsZUNoaXBSZW1vdmFsKHtcbiAgICAgICAgY2hpcElkOiBldmVudC5jaGlwLmlkLFxuICAgICAgICAvLyBUT0RPKG1tYWxlcmJhKTogQWRkIHJlbW92YWwgbWVzc2FnZS5cbiAgICAgICAgcmVtb3ZlZEFubm91bmNlbWVudDogbnVsbCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gY2hpcCBkZXN0cm95ZWQgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9saXN0ZW5Ub0NoaXBzRGVzdHJveWVkKCkge1xuICAgIHRoaXMuX2NoaXBEZXN0cm95ZWRTdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBEZXN0cm95ZWRDaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQ6IE1hdENoaXBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IGV2ZW50LmNoaXA7XG4gICAgICBjb25zdCBjaGlwSW5kZXg6IG51bWJlciA9IHRoaXMuX2NoaXBzLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50LmNoaXApO1xuXG4gICAgICAvLyBJbiBjYXNlIHRoZSBjaGlwIHRoYXQgd2lsbCBiZSByZW1vdmVkIGlzIGN1cnJlbnRseSBmb2N1c2VkLCB3ZSB0ZW1wb3JhcmlseSBzdG9yZVxuICAgICAgLy8gdGhlIGluZGV4IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gZGV0ZXJtaW5lIGFuIGFwcHJvcHJpYXRlIHNpYmxpbmcgY2hpcCB0aGF0IHdpbGxcbiAgICAgIC8vIHJlY2VpdmUgZm9jdXMuXG4gICAgICBpZiAodGhpcy5faXNWYWxpZEluZGV4KGNoaXBJbmRleCkgJiYgY2hpcC5faGFzRm9jdXMoKSkge1xuICAgICAgICB0aGlzLl9sYXN0RGVzdHJveWVkQ2hpcEluZGV4ID0gY2hpcEluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gY2hpcCBpbnRlcmFjdGlvbiBldmVudHMuICovXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNJbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLl9jaGlwSW50ZXJhY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBJbnRlcmFjdGlvbkNoYW5nZXMuc3Vic2NyaWJlKChpZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbi5oYW5kbGVDaGlwSW50ZXJhY3Rpb24oe2NoaXBJZDogaWR9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBVbnN1YnNjcmliZXMgZnJvbSBhbGwgY2hpcCBldmVudHMuICovXG4gIHByb3RlY3RlZCBfZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jaGlwSW50ZXJhY3Rpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBJbnRlcmFjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcEludGVyYWN0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIER1bW15IG1ldGhvZCBmb3Igc3ViY2xhc3NlcyB0byBvdmVycmlkZS4gQmFzZSBjaGlwIHNldCBjYW5ub3QgYmUgZm9jdXNlZC4gKi9cbiAgZm9jdXMoKSB7fVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggdG8gYmUgY2hlY2tlZC5cbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaW5kZXggaXMgdmFsaWQgZm9yIG91ciBsaXN0IG9mIGNoaXBzLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9pc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fY2hpcHMubGVuZ3RoO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGFuIGV2ZW50IGNvbWVzIGZyb20gaW5zaWRlIGEgY2hpcCBlbGVtZW50LiAqL1xuICBwcm90ZWN0ZWQgX29yaWdpbmF0ZXNGcm9tQ2hpcChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tGb3JDbGFzc0luSGllcmFyY2h5KGV2ZW50LCAnbWRjLWNoaXAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBhbiBldmVudCBjb21lcyBmcm9tIGluc2lkZSBhIGNoaXAgZWxlbWVudCBpbiB0aGUgZWRpdGluZ1xuICAgKiBzdGF0ZS5cbiAgICovXG4gIHByb3RlY3RlZCBfb3JpZ2luYXRlc0Zyb21FZGl0aW5nQ2hpcChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tGb3JDbGFzc0luSGllcmFyY2h5KGV2ZW50LCAnbWRjLWNoaXAtLWVkaXRpbmcnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrRm9yQ2xhc3NJbkhpZXJhcmNoeShldmVudDogRXZlbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiBjdXJyZW50RWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAvLyBOdWxsIGNoZWNrIHRoZSBjbGFzc0xpc3QsIGJlY2F1c2UgSUUgYW5kIEVkZ2UgZG9uJ3Qgc3VwcG9ydCBpdCBvbiBhbGwgZWxlbWVudHMuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0ICYmIGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90YWJJbmRleDogTnVtYmVySW5wdXQ7XG59XG4iXX0=