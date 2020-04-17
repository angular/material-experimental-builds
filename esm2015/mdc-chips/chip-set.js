/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-chips/chip-set.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, Optional, QueryList, ViewEncapsulation } from '@angular/core';
import { mixinTabIndex } from '@angular/material/core';
import { MDCChipSetFoundation } from '@material/chips';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChip } from './chip';
/** @type {?} */
let uid = 0;
/**
 * Boilerplate for applying mixins to MatChipSet.
 * \@docs-private
 */
class MatChipSetBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) { }
}
if (false) {
    /** @type {?} */
    MatChipSetBase.prototype.disabled;
}
/** @type {?} */
const _MatChipSetMixinBase = mixinTabIndex(MatChipSetBase);
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
export class MatChipSet extends _MatChipSetMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _dir
     */
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
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip-set adapter interface.
         * These methods are called by the chip set foundation.
         */
        this._chipSetAdapter = {
            hasClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._hasMdcClass(className)),
            // No-op. We keep track of chips via ContentChildren, which will be updated when a chip is
            // removed.
            removeChipAtIndex: (/**
             * @return {?}
             */
            () => { }),
            // No-op for base chip set. MatChipListbox overrides the adapter to provide this method.
            selectChipAtIndex: (/**
             * @return {?}
             */
            () => { }),
            getIndexOfChipById: (/**
             * @param {?} id
             * @return {?}
             */
            (id) => this._chips.toArray().findIndex((/**
             * @param {?} chip
             * @return {?}
             */
            chip => chip.id === id))),
            focusChipPrimaryActionAtIndex: (/**
             * @return {?}
             */
            () => { }),
            focusChipTrailingActionAtIndex: (/**
             * @return {?}
             */
            () => { }),
            removeFocusFromChipAtIndex: (/**
             * @return {?}
             */
            () => { }),
            isRTL: (/**
             * @return {?}
             */
            () => !!this._dir && this._dir.value === 'rtl'),
            getChipListCount: (/**
             * @return {?}
             */
            () => this._chips.length),
            // TODO(mmalerba): Implement using LiveAnnouncer.
            announceMessage: (/**
             * @return {?}
             */
            () => { }),
        };
        /**
         * Uid of the chip set
         */
        this._uid = `mat-mdc-chip-set-${uid++}`;
        /**
         * Map from class to whether the class is enabled.
         * Enabled classes are set on the MDC chip-set div.
         */
        this._mdcClasses = {};
        this._disabled = false;
        this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
    }
    /**
     * Whether the chip set is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /**
     * Whether the chip list contains chips or not.
     * @return {?}
     */
    get empty() { return this._chips.length === 0; }
    /**
     * The ARIA role applied to the chip set.
     * @return {?}
     */
    get role() { return this.empty ? null : 'presentation'; }
    /**
     * Whether any of the chips inside of this chip-set has focus.
     * @return {?}
     */
    get focused() { return this._hasFocusedChip(); }
    /**
     * Combined stream of all of the child chips' remove events.
     * @return {?}
     */
    get chipRemoveChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.removed)));
    }
    /**
     * Combined stream of all of the child chips' remove events.
     * @return {?}
     */
    get chipDestroyedChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.destroyed)));
    }
    /**
     * Combined stream of all of the child chips' interaction events.
     * @return {?}
     */
    get chipInteractionChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.interaction)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._chipSetFoundation.init();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe((/**
         * @return {?}
         */
        () => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => {
                    this._syncChipsState();
                }));
            }
            this._resetChips();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dropSubscriptions();
        this._destroyed.next();
        this._destroyed.complete();
        this._chipSetFoundation.destroy();
    }
    /**
     * Checks whether any of the chips is focused.
     * @protected
     * @return {?}
     */
    _hasFocusedChip() {
        return this._chips.some((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip._hasFocus));
    }
    /**
     * Syncs the chip-set's state with the individual chips.
     * @protected
     * @return {?}
     */
    _syncChipsState() {
        if (this._chips) {
            this._chips.forEach((/**
             * @param {?} chip
             * @return {?}
             */
            chip => {
                chip.disabled = this._disabled;
                chip._changeDetectorRef.markForCheck();
            }));
        }
    }
    /**
     * Sets whether the given CSS class should be applied to the MDC chip.
     * @protected
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    _setMdcClass(cssClass, active) {
        /** @type {?} */
        const classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Adapter method that returns true if the chip set has the given MDC class.
     * @protected
     * @param {?} className
     * @return {?}
     */
    _hasMdcClass(className) {
        return this._elementRef.nativeElement.classList.contains(className);
    }
    /**
     * Updates subscriptions to chip events.
     * @private
     * @return {?}
     */
    _resetChips() {
        this._dropSubscriptions();
        this._subscribeToChipEvents();
    }
    /**
     * Subscribes to events on the child chips.
     * @protected
     * @return {?}
     */
    _subscribeToChipEvents() {
        this._listenToChipsRemove();
        this._listenToChipsDestroyed();
        this._listenToChipsInteraction();
    }
    /**
     * Subscribes to chip removal events.
     * @private
     * @return {?}
     */
    _listenToChipsRemove() {
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._chipSetFoundation.handleChipRemoval({
                chipId: event.chip.id,
                // TODO(mmalerba): Add removal message.
                removedAnnouncement: null,
            });
        }));
    }
    /**
     * Subscribes to chip destroyed events.
     * @private
     * @return {?}
     */
    _listenToChipsDestroyed() {
        this._chipDestroyedSubscription = this.chipDestroyedChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const chip = event.chip;
            /** @type {?} */
            const chipIndex = this._chips.toArray().indexOf(event.chip);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (this._isValidIndex(chipIndex) && chip._hasFocus) {
                this._lastDestroyedChipIndex = chipIndex;
            }
        }));
    }
    /**
     * Subscribes to chip interaction events.
     * @private
     * @return {?}
     */
    _listenToChipsInteraction() {
        this._chipInteractionSubscription = this.chipInteractionChanges.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        (id) => {
            this._chipSetFoundation.handleChipInteraction({ chipId: id });
        }));
    }
    /**
     * Unsubscribes from all chip events.
     * @protected
     * @return {?}
     */
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
    /**
     * Dummy method for subclasses to override. Base chip set cannot be focused.
     * @return {?}
     */
    focus() { }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @protected
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of chips.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this._chips.length;
    }
    /**
     * Checks whether an event comes from inside a chip element.
     * @protected
     * @param {?} event
     * @return {?}
     */
    _originatesFromChip(event) {
        /** @type {?} */
        let currentElement = (/** @type {?} */ (event.target));
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            // Null check the classList, because IE and Edge don't support it on all elements.
            if (currentElement.classList && currentElement.classList.contains('mdc-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
}
MatChipSet.decorators = [
    { type: Component, args: [{
                selector: 'mat-chip-set',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'mat-mdc-chip-set mdc-chip-set',
                    '[attr.role]': 'role',
                    // TODO: replace this binding with use of AriaDescriber
                    '[attr.aria-describedby]': '_ariaDescribedby || null',
                    '[id]': '_uid',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
            }] }
];
/** @nocollapse */
MatChipSet.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
MatChipSet.propDecorators = {
    disabled: [{ type: Input }],
    _chips: [{ type: ContentChildren, args: [MatChip, {
                    // We need to use `descendants: true`, because Ivy will no longer match
                    // indirect descendants if it's left as false.
                    descendants: true
                },] }]
};
if (false) {
    /** @type {?} */
    MatChipSet.ngAcceptInputType_disabled;
    /**
     * Subscription to remove changes in chips.
     * @type {?}
     * @private
     */
    MatChipSet.prototype._chipRemoveSubscription;
    /**
     * Subscription to destroyed events in chips.
     * @type {?}
     * @private
     */
    MatChipSet.prototype._chipDestroyedSubscription;
    /**
     * Subscription to chip interactions.
     * @type {?}
     * @private
     */
    MatChipSet.prototype._chipInteractionSubscription;
    /**
     * When a chip is destroyed, we store the index of the destroyed chip until the chips
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate chip that should receive focus until the array of chips updated completely.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._lastDestroyedChipIndex;
    /**
     * The MDC foundation containing business logic for MDC chip-set.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._chipSetFoundation;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._destroyed;
    /**
     * Implementation of the MDC chip-set adapter interface.
     * These methods are called by the chip set foundation.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._chipSetAdapter;
    /**
     * The aria-describedby attribute on the chip list for improved a11y.
     * @type {?}
     */
    MatChipSet.prototype._ariaDescribedby;
    /**
     * Uid of the chip set
     * @type {?}
     */
    MatChipSet.prototype._uid;
    /**
     * Map from class to whether the class is enabled.
     * Enabled classes are set on the MDC chip-set div.
     * @type {?}
     */
    MatChipSet.prototype._mdcClasses;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._disabled;
    /**
     * The chips that are part of this chip set.
     * @type {?}
     */
    MatChipSet.prototype._chips;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._dir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUVMLFFBQVEsRUFDUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBK0IsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkYsT0FBTyxFQUFvQixvQkFBb0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxLQUFLLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLFFBQVEsQ0FBQzs7SUFHekMsR0FBRyxHQUFHLENBQUM7Ozs7O0FBT1gsTUFBTSxjQUFjOzs7O0lBRWxCLFlBQVksV0FBdUIsSUFBRyxDQUFDO0NBQ3hDOzs7SUFGQyxrQ0FBbUI7OztNQUdmLG9CQUFvQixHQUN0QixhQUFhLENBQUMsY0FBYyxDQUFDOzs7Ozs7QUFxQmpDLE1BQU0sT0FBTyxVQUFXLFNBQVEsb0JBQW9COzs7Ozs7SUFpR2xELFlBQXNCLFdBQXVCLEVBQ3ZCLGtCQUFxQyxFQUN6QixJQUFvQjtRQUNwRCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFIQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2Qix1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Y0FBYyx1QkEySlAsUUFBUTs7O3VCQXpDcEIsS0FBSztxQkFpQ0wsZUFBZSxTQUFDLE9BQU8sRUFBRTs7O29CQUd4QixXQUFXLEVBQUUsSUFBSTtpQkFDbEI7Ozs7SUEwSkQsc0NBQWdEOzs7Ozs7SUF0UGhELDZDQUFxRDs7Ozs7O0lBR3JELGdEQUF3RDs7Ozs7O0lBR3hELGtEQUEwRDs7Ozs7Ozs7SUFPMUQsNkNBQXdEOzs7Ozs7SUFHeEQsd0NBQW1EOzs7Ozs7SUFHbkQsZ0NBQTJDOzs7Ozs7O0lBTTNDLHFDQWVFOzs7OztJQUdGLHNDQUF5Qjs7Ozs7SUFHekIsMEJBQTJDOzs7Ozs7SUFNM0MsaUNBQTJDOzs7OztJQVMzQywrQkFBcUM7Ozs7O0lBMkJyQyw0QkFJOEI7Ozs7O0lBRWxCLGlDQUFpQzs7Ozs7SUFDakMsd0NBQStDOzs7OztJQUMvQywwQkFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIYXNUYWJJbmRleCwgSGFzVGFiSW5kZXhDdG9yLCBtaXhpblRhYkluZGV4fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TURDQ2hpcFNldEFkYXB0ZXIsIE1EQ0NoaXBTZXRGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHttZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3RhcnRXaXRoLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0Q2hpcCwgTWF0Q2hpcEV2ZW50fSBmcm9tICcuL2NoaXAnO1xuXG5cbmxldCB1aWQgPSAwO1xuXG5cbi8qKlxuICogQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRDaGlwU2V0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5jbGFzcyBNYXRDaGlwU2V0QmFzZSB7XG4gIGRpc2FibGVkITogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5jb25zdCBfTWF0Q2hpcFNldE1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgdHlwZW9mIE1hdENoaXBTZXRCYXNlID1cbiAgICBtaXhpblRhYkluZGV4KE1hdENoaXBTZXRCYXNlKTtcblxuLyoqXG4gKiBCYXNpYyBjb250YWluZXIgY29tcG9uZW50IGZvciB0aGUgTWF0Q2hpcCBjb21wb25lbnQuXG4gKlxuICogRXh0ZW5kZWQgYnkgTWF0Q2hpcExpc3Rib3ggYW5kIE1hdENoaXBHcmlkIGZvciBkaWZmZXJlbnQgaW50ZXJhY3Rpb24gcGF0dGVybnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXNldCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWydjaGlwcy5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtc2V0IG1kYy1jaGlwLXNldCcsXG4gICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgIC8vIFRPRE86IHJlcGxhY2UgdGhpcyBiaW5kaW5nIHdpdGggdXNlIG9mIEFyaWFEZXNjcmliZXJcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnX2FyaWFEZXNjcmliZWRieSB8fCBudWxsJyxcbiAgICAnW2lkXSc6ICdfdWlkJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBTZXQgZXh0ZW5kcyBfTWF0Q2hpcFNldE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsXG4gIEhhc1RhYkluZGV4LCBPbkRlc3Ryb3kge1xuICAvKiogU3Vic2NyaXB0aW9uIHRvIHJlbW92ZSBjaGFuZ2VzIGluIGNoaXBzLiAqL1xuICBwcml2YXRlIF9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gZGVzdHJveWVkIGV2ZW50cyBpbiBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoaXAgaW50ZXJhY3Rpb25zLiAqL1xuICBwcml2YXRlIF9jaGlwSW50ZXJhY3Rpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFdoZW4gYSBjaGlwIGlzIGRlc3Ryb3llZCwgd2Ugc3RvcmUgdGhlIGluZGV4IG9mIHRoZSBkZXN0cm95ZWQgY2hpcCB1bnRpbCB0aGUgY2hpcHNcbiAgICogcXVlcnkgbGlzdCBub3RpZmllcyBhYm91dCB0aGUgdXBkYXRlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHdlIGNhbm5vdCBkZXRlcm1pbmUgYW5cbiAgICogYXBwcm9wcmlhdGUgY2hpcCB0aGF0IHNob3VsZCByZWNlaXZlIGZvY3VzIHVudGlsIHRoZSBhcnJheSBvZiBjaGlwcyB1cGRhdGVkIGNvbXBsZXRlbHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xhc3REZXN0cm95ZWRDaGlwSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgTURDIGZvdW5kYXRpb24gY29udGFpbmluZyBidXNpbmVzcyBsb2dpYyBmb3IgTURDIGNoaXAtc2V0LiAqL1xuICBwcm90ZWN0ZWQgX2NoaXBTZXRGb3VuZGF0aW9uOiBNRENDaGlwU2V0Rm91bmRhdGlvbjtcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByb3RlY3RlZCBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gb2YgdGhlIE1EQyBjaGlwLXNldCBhZGFwdGVyIGludGVyZmFjZS5cbiAgICogVGhlc2UgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IHRoZSBjaGlwIHNldCBmb3VuZGF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jaGlwU2V0QWRhcHRlcjogTURDQ2hpcFNldEFkYXB0ZXIgPSB7XG4gICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuX2hhc01kY0NsYXNzKGNsYXNzTmFtZSksXG4gICAgLy8gTm8tb3AuIFdlIGtlZXAgdHJhY2sgb2YgY2hpcHMgdmlhIENvbnRlbnRDaGlsZHJlbiwgd2hpY2ggd2lsbCBiZSB1cGRhdGVkIHdoZW4gYSBjaGlwIGlzXG4gICAgLy8gcmVtb3ZlZC5cbiAgICByZW1vdmVDaGlwQXRJbmRleDogKCkgPT4ge30sXG4gICAgLy8gTm8tb3AgZm9yIGJhc2UgY2hpcCBzZXQuIE1hdENoaXBMaXN0Ym94IG92ZXJyaWRlcyB0aGUgYWRhcHRlciB0byBwcm92aWRlIHRoaXMgbWV0aG9kLlxuICAgIHNlbGVjdENoaXBBdEluZGV4OiAoKSA9PiB7fSxcbiAgICBnZXRJbmRleE9mQ2hpcEJ5SWQ6IChpZDogc3RyaW5nKSA9PiB0aGlzLl9jaGlwcy50b0FycmF5KCkuZmluZEluZGV4KGNoaXAgPT4gY2hpcC5pZCA9PT0gaWQpLFxuICAgIGZvY3VzQ2hpcFByaW1hcnlBY3Rpb25BdEluZGV4OiAoKSA9PiB7fSxcbiAgICBmb2N1c0NoaXBUcmFpbGluZ0FjdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgIHJlbW92ZUZvY3VzRnJvbUNoaXBBdEluZGV4OiAoKSA9PiB7fSxcbiAgICBpc1JUTDogKCkgPT4gISF0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyxcbiAgICBnZXRDaGlwTGlzdENvdW50OiAoKSA9PiB0aGlzLl9jaGlwcy5sZW5ndGgsXG4gICAgLy8gVE9ETyhtbWFsZXJiYSk6IEltcGxlbWVudCB1c2luZyBMaXZlQW5ub3VuY2VyLlxuICAgIGFubm91bmNlTWVzc2FnZTogKCkgPT4ge30sXG4gIH07XG5cbiAgLyoqIFRoZSBhcmlhLWRlc2NyaWJlZGJ5IGF0dHJpYnV0ZSBvbiB0aGUgY2hpcCBsaXN0IGZvciBpbXByb3ZlZCBhMTF5LiAqL1xuICBfYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqIFVpZCBvZiB0aGUgY2hpcCBzZXQgKi9cbiAgX3VpZDogc3RyaW5nID0gYG1hdC1tZGMtY2hpcC1zZXQtJHt1aWQrK31gO1xuXG4gIC8qKlxuICAgKiBNYXAgZnJvbSBjbGFzcyB0byB3aGV0aGVyIHRoZSBjbGFzcyBpcyBlbmFibGVkLlxuICAgKiBFbmFibGVkIGNsYXNzZXMgYXJlIHNldCBvbiB0aGUgTURDIGNoaXAtc2V0IGRpdi5cbiAgICovXG4gIF9tZGNDbGFzc2VzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBzZXQgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9zeW5jQ2hpcHNTdGF0ZSgpO1xuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBsaXN0IGNvbnRhaW5zIGNoaXBzIG9yIG5vdC4gKi9cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY2hpcHMubGVuZ3RoID09PSAwOyB9XG5cbiAgLyoqIFRoZSBBUklBIHJvbGUgYXBwbGllZCB0byB0aGUgY2hpcCBzZXQuICovXG4gIGdldCByb2xlKCk6IHN0cmluZyB8IG51bGwgeyByZXR1cm4gdGhpcy5lbXB0eSA/IG51bGwgOiAncHJlc2VudGF0aW9uJzsgfVxuXG4gIC8qKiBXaGV0aGVyIGFueSBvZiB0aGUgY2hpcHMgaW5zaWRlIG9mIHRoaXMgY2hpcC1zZXQgaGFzIGZvY3VzLiAqL1xuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc0ZvY3VzZWRDaGlwKCk7IH1cblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIHJlbW92ZSBldmVudHMuICovXG4gIGdldCBjaGlwUmVtb3ZlQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1hdENoaXBFdmVudD4ge1xuICAgIHJldHVybiBtZXJnZSguLi50aGlzLl9jaGlwcy5tYXAoY2hpcCA9PiBjaGlwLnJlbW92ZWQpKTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgcmVtb3ZlIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBEZXN0cm95ZWRDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWF0Q2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuX2NoaXBzLm1hcChjaGlwID0+IGNoaXAuZGVzdHJveWVkKSk7XG4gIH1cblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIGludGVyYWN0aW9uIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBJbnRlcmFjdGlvbkNoYW5nZXMoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5fY2hpcHMubWFwKGNoaXAgPT4gY2hpcC5pbnRlcmFjdGlvbikpO1xuICB9XG5cbiAgLyoqIFRoZSBjaGlwcyB0aGF0IGFyZSBwYXJ0IG9mIHRoaXMgY2hpcCBzZXQuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0Q2hpcCwge1xuICAgIC8vIFdlIG5lZWQgdG8gdXNlIGBkZXNjZW5kYW50czogdHJ1ZWAsIGJlY2F1c2UgSXZ5IHdpbGwgbm8gbG9uZ2VyIG1hdGNoXG4gICAgLy8gaW5kaXJlY3QgZGVzY2VuZGFudHMgaWYgaXQncyBsZWZ0IGFzIGZhbHNlLlxuICAgIGRlc2NlbmRhbnRzOiB0cnVlXG4gIH0pIF9jaGlwczogUXVlcnlMaXN0PE1hdENoaXA+O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBfZGlyOiBEaXJlY3Rpb25hbGl0eSkge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcbiAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbiA9IG5ldyBNRENDaGlwU2V0Rm91bmRhdGlvbih0aGlzLl9jaGlwU2V0QWRhcHRlcik7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2NoaXBzLmNoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgLy8gU2luY2UgdGhpcyBoYXBwZW5zIGFmdGVyIHRoZSBjb250ZW50IGhhcyBiZWVuXG4gICAgICAgIC8vIGNoZWNrZWQsIHdlIG5lZWQgdG8gZGVmZXIgaXQgdG8gdGhlIG5leHQgdGljay5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fc3luY0NoaXBzU3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Jlc2V0Q2hpcHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Ryb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG9mIHRoZSBjaGlwcyBpcyBmb2N1c2VkLiAqL1xuICBwcm90ZWN0ZWQgX2hhc0ZvY3VzZWRDaGlwKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlwcy5zb21lKGNoaXAgPT4gY2hpcC5faGFzRm9jdXMpO1xuICB9XG5cbiAgLyoqIFN5bmNzIHRoZSBjaGlwLXNldCdzIHN0YXRlIHdpdGggdGhlIGluZGl2aWR1YWwgY2hpcHMuICovXG4gIHByb3RlY3RlZCBfc3luY0NoaXBzU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2NoaXBzKSB7XG4gICAgICB0aGlzLl9jaGlwcy5mb3JFYWNoKGNoaXAgPT4ge1xuICAgICAgICBjaGlwLmRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWQ7XG4gICAgICAgIGNoaXAuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgd2hldGhlciB0aGUgZ2l2ZW4gQ1NTIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBNREMgY2hpcC4gKi9cbiAgcHJvdGVjdGVkIF9zZXRNZGNDbGFzcyhjc3NDbGFzczogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgICAgYWN0aXZlID8gY2xhc3Nlcy5hZGQoY3NzQ2xhc3MpIDogY2xhc3Nlcy5yZW1vdmUoY3NzQ2xhc3MpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogQWRhcHRlciBtZXRob2QgdGhhdCByZXR1cm5zIHRydWUgaWYgdGhlIGNoaXAgc2V0IGhhcyB0aGUgZ2l2ZW4gTURDIGNsYXNzLiAqL1xuICBwcm90ZWN0ZWQgX2hhc01kY0NsYXNzKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIC8qKiBVcGRhdGVzIHN1YnNjcmlwdGlvbnMgdG8gY2hpcCBldmVudHMuICovXG4gIHByaXZhdGUgX3Jlc2V0Q2hpcHMoKSB7XG4gICAgdGhpcy5fZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLl9zdWJzY3JpYmVUb0NoaXBFdmVudHMoKTtcbiAgfVxuXG4gIC8qKiBTdWJzY3JpYmVzIHRvIGV2ZW50cyBvbiB0aGUgY2hpbGQgY2hpcHMuICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlVG9DaGlwRXZlbnRzKCkge1xuICAgIHRoaXMuX2xpc3RlblRvQ2hpcHNSZW1vdmUoKTtcbiAgICB0aGlzLl9saXN0ZW5Ub0NoaXBzRGVzdHJveWVkKCk7XG4gICAgdGhpcy5fbGlzdGVuVG9DaGlwc0ludGVyYWN0aW9uKCk7XG4gIH1cblxuICAvKiogU3Vic2NyaWJlcyB0byBjaGlwIHJlbW92YWwgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9saXN0ZW5Ub0NoaXBzUmVtb3ZlKCkge1xuICAgIHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBSZW1vdmVDaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQ6IE1hdENoaXBFdmVudCkgPT4ge1xuICAgICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmhhbmRsZUNoaXBSZW1vdmFsKHtcbiAgICAgICAgIGNoaXBJZDogZXZlbnQuY2hpcC5pZCxcbiAgICAgICAgIC8vIFRPRE8obW1hbGVyYmEpOiBBZGQgcmVtb3ZhbCBtZXNzYWdlLlxuICAgICAgICAgcmVtb3ZlZEFubm91bmNlbWVudDogbnVsbCxcbiAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTdWJzY3JpYmVzIHRvIGNoaXAgZGVzdHJveWVkIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfbGlzdGVuVG9DaGlwc0Rlc3Ryb3llZCgpIHtcbiAgICB0aGlzLl9jaGlwRGVzdHJveWVkU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlwRGVzdHJveWVkQ2hhbmdlcy5zdWJzY3JpYmUoKGV2ZW50OiBNYXRDaGlwRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNoaXAgPSBldmVudC5jaGlwO1xuICAgICAgY29uc3QgY2hpcEluZGV4OiBudW1iZXIgPSB0aGlzLl9jaGlwcy50b0FycmF5KCkuaW5kZXhPZihldmVudC5jaGlwKTtcblxuICAgICAgLy8gSW4gY2FzZSB0aGUgY2hpcCB0aGF0IHdpbGwgYmUgcmVtb3ZlZCBpcyBjdXJyZW50bHkgZm9jdXNlZCwgd2UgdGVtcG9yYXJpbHkgc3RvcmVcbiAgICAgIC8vIHRoZSBpbmRleCBpbiBvcmRlciB0byBiZSBhYmxlIHRvIGRldGVybWluZSBhbiBhcHByb3ByaWF0ZSBzaWJsaW5nIGNoaXAgdGhhdCB3aWxsXG4gICAgICAvLyByZWNlaXZlIGZvY3VzLlxuICAgICAgaWYgKHRoaXMuX2lzVmFsaWRJbmRleChjaGlwSW5kZXgpICYmIGNoaXAuX2hhc0ZvY3VzKSB7XG4gICAgICAgIHRoaXMuX2xhc3REZXN0cm95ZWRDaGlwSW5kZXggPSBjaGlwSW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU3Vic2NyaWJlcyB0byBjaGlwIGludGVyYWN0aW9uIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfbGlzdGVuVG9DaGlwc0ludGVyYWN0aW9uKCkge1xuICAgIHRoaXMuX2NoaXBJbnRlcmFjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuY2hpcEludGVyYWN0aW9uQ2hhbmdlcy5zdWJzY3JpYmUoKGlkOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmhhbmRsZUNoaXBJbnRlcmFjdGlvbih7Y2hpcElkOiBpZH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFVuc3Vic2NyaWJlcyBmcm9tIGFsbCBjaGlwIGV2ZW50cy4gKi9cbiAgcHJvdGVjdGVkIF9kcm9wU3Vic2NyaXB0aW9ucygpIHtcbiAgICBpZiAodGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NoaXBJbnRlcmFjdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY2hpcEludGVyYWN0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jaGlwSW50ZXJhY3Rpb25TdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jaGlwRGVzdHJveWVkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwRGVzdHJveWVkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jaGlwRGVzdHJveWVkU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogRHVtbXkgbWV0aG9kIGZvciBzdWJjbGFzc2VzIHRvIG92ZXJyaWRlLiBCYXNlIGNoaXAgc2V0IGNhbm5vdCBiZSBmb2N1c2VkLiAqL1xuICBmb2N1cygpIHt9XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgdG8gZW5zdXJlIGFsbCBpbmRleGVzIGFyZSB2YWxpZC5cbiAgICpcbiAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byBiZSBjaGVja2VkLlxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbmRleCBpcyB2YWxpZCBmb3Igb3VyIGxpc3Qgb2YgY2hpcHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2lzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9jaGlwcy5sZW5ndGg7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgYW4gZXZlbnQgY29tZXMgZnJvbSBpbnNpZGUgYSBjaGlwIGVsZW1lbnQuICovXG4gIHByb3RlY3RlZCBfb3JpZ2luYXRlc0Zyb21DaGlwKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgLy8gTnVsbCBjaGVjayB0aGUgY2xhc3NMaXN0LCBiZWNhdXNlIElFIGFuZCBFZGdlIGRvbid0IHN1cHBvcnQgaXQgb24gYWxsIGVsZW1lbnRzLlxuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdCAmJiBjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kYy1jaGlwJykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==