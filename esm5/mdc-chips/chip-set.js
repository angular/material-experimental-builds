/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends, __read, __spread } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, Optional, QueryList, ViewEncapsulation } from '@angular/core';
import { mixinTabIndex } from '@angular/material/core';
import { MDCChipSetFoundation } from '@material/chips';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChip } from './chip';
var uid = 0;
/**
 * Boilerplate for applying mixins to MatChipSet.
 * @docs-private
 */
var MatChipSetBase = /** @class */ (function () {
    function MatChipSetBase(_elementRef) {
    }
    return MatChipSetBase;
}());
var _MatChipSetMixinBase = mixinTabIndex(MatChipSetBase);
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
var MatChipSet = /** @class */ (function (_super) {
    __extends(MatChipSet, _super);
    function MatChipSet(_elementRef, _changeDetectorRef, _dir) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._dir = _dir;
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        _this._lastDestroyedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        _this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip-set adapter interface.
         * These methods are called by the chip set foundation.
         */
        _this._chipSetAdapter = {
            hasClass: function (className) { return _this._hasMdcClass(className); },
            // No-op. We keep track of chips via ContentChildren, which will be updated when a chip is
            // removed.
            removeChipAtIndex: function () { },
            // No-op for base chip set. MatChipListbox overrides the adapter to provide this method.
            selectChipAtIndex: function () { },
            getIndexOfChipById: function (id) { return _this._chips.toArray().findIndex(function (chip) { return chip.id === id; }); },
            focusChipPrimaryActionAtIndex: function () { },
            focusChipTrailingActionAtIndex: function () { },
            removeFocusFromChipAtIndex: function () { },
            isRTL: function () { return !!_this._dir && _this._dir.value === 'rtl'; },
            getChipListCount: function () { return _this._chips.length; },
            // TODO(mmalerba): Implement using LiveAnnouncer.
            announceMessage: function () { },
        };
        /** Uid of the chip set */
        _this._uid = "mat-mdc-chip-set-" + uid++;
        /**
         * Map from class to whether the class is enabled.
         * Enabled classes are set on the MDC chip-set div.
         */
        _this._mdcClasses = {};
        _this._disabled = false;
        _this._chipSetFoundation = new MDCChipSetFoundation(_this._chipSetAdapter);
        return _this;
    }
    Object.defineProperty(MatChipSet.prototype, "disabled", {
        /** Whether the chip set is disabled. */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            this._syncChipsState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipSet.prototype, "empty", {
        /** Whether the chip list contains chips or not. */
        get: function () { return this._chips.length === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipSet.prototype, "role", {
        /** The ARIA role applied to the chip set. */
        get: function () { return this.empty ? null : 'presentation'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipSet.prototype, "focused", {
        /** Whether any of the chips inside of this chip-set has focus. */
        get: function () { return this._hasFocusedChip(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipSet.prototype, "chipRemoveChanges", {
        /** Combined stream of all of the child chips' remove events. */
        get: function () {
            return merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip.removed; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipSet.prototype, "chipDestroyedChanges", {
        /** Combined stream of all of the child chips' remove events. */
        get: function () {
            return merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip.destroyed; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipSet.prototype, "chipInteractionChanges", {
        /** Combined stream of all of the child chips' interaction events. */
        get: function () {
            return merge.apply(void 0, __spread(this._chips.map(function (chip) { return chip.interaction; })));
        },
        enumerable: true,
        configurable: true
    });
    MatChipSet.prototype.ngAfterViewInit = function () {
        this._chipSetFoundation.init();
    };
    MatChipSet.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(function () {
            if (_this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(function () {
                    _this._syncChipsState();
                });
            }
            _this._resetChips();
        });
    };
    MatChipSet.prototype.ngOnDestroy = function () {
        this._dropSubscriptions();
        this._destroyed.next();
        this._destroyed.complete();
        this._chipSetFoundation.destroy();
    };
    /** Checks whether any of the chips is focused. */
    MatChipSet.prototype._hasFocusedChip = function () {
        return this._chips.some(function (chip) { return chip._hasFocus; });
    };
    /** Syncs the chip-set's state with the individual chips. */
    MatChipSet.prototype._syncChipsState = function () {
        var _this = this;
        if (this._chips) {
            this._chips.forEach(function (chip) {
                chip.disabled = _this._disabled;
                chip._changeDetectorRef.markForCheck();
            });
        }
    };
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    MatChipSet.prototype._setMdcClass = function (cssClass, active) {
        var classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    };
    /** Adapter method that returns true if the chip set has the given MDC class. */
    MatChipSet.prototype._hasMdcClass = function (className) {
        return this._elementRef.nativeElement.classList.contains(className);
    };
    /** Updates subscriptions to chip events. */
    MatChipSet.prototype._resetChips = function () {
        this._dropSubscriptions();
        this._subscribeToChipEvents();
    };
    /** Subscribes to events on the child chips. */
    MatChipSet.prototype._subscribeToChipEvents = function () {
        this._listenToChipsRemove();
        this._listenToChipsDestroyed();
        this._listenToChipsInteraction();
    };
    /** Subscribes to chip removal events. */
    MatChipSet.prototype._listenToChipsRemove = function () {
        var _this = this;
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe(function (event) {
            _this._chipSetFoundation.handleChipRemoval({
                chipId: event.chip.id,
                // TODO(mmalerba): Add removal message.
                removedAnnouncement: null,
            });
        });
    };
    /** Subscribes to chip destroyed events. */
    MatChipSet.prototype._listenToChipsDestroyed = function () {
        var _this = this;
        this._chipDestroyedSubscription = this.chipDestroyedChanges.subscribe(function (event) {
            var chip = event.chip;
            var chipIndex = _this._chips.toArray().indexOf(event.chip);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (_this._isValidIndex(chipIndex) && chip._hasFocus) {
                _this._lastDestroyedChipIndex = chipIndex;
            }
        });
    };
    /** Subscribes to chip interaction events. */
    MatChipSet.prototype._listenToChipsInteraction = function () {
        var _this = this;
        this._chipInteractionSubscription = this.chipInteractionChanges.subscribe(function (id) {
            _this._chipSetFoundation.handleChipInteraction({ chipId: id });
        });
    };
    /** Unsubscribes from all chip events. */
    MatChipSet.prototype._dropSubscriptions = function () {
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
    };
    /** Dummy method for subclasses to override. Base chip set cannot be focused. */
    MatChipSet.prototype.focus = function () { };
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    MatChipSet.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this._chips.length;
    };
    /** Checks whether an event comes from inside a chip element. */
    MatChipSet.prototype._originatesFromChip = function (event) {
        var currentElement = event.target;
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            // Null check the classList, because IE and Edge don't support it on all elements.
            if (currentElement.classList && currentElement.classList.contains('mdc-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    };
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
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
                }] }
    ];
    /** @nocollapse */
    MatChipSet.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    MatChipSet.propDecorators = {
        disabled: [{ type: Input }],
        _chips: [{ type: ContentChildren, args: [MatChip, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return MatChipSet;
}(_MatChipSetMixinBase));
export { MatChipSet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLEtBQUssRUFFTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQStCLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25GLE9BQU8sRUFBb0Isb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsS0FBSyxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxRQUFRLENBQUM7QUFHN0MsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBR1o7OztHQUdHO0FBQ0g7SUFFRSx3QkFBWSxXQUF1QjtJQUFHLENBQUM7SUFDekMscUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUNELElBQU0sb0JBQW9CLEdBQ3RCLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUVsQzs7OztHQUlHO0FBQ0g7SUFjZ0MsOEJBQW9CO0lBaUdsRCxvQkFBc0IsV0FBdUIsRUFDdkIsa0JBQXFDLEVBQ3pCLElBQW9CO1FBRnRELFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FB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QzdFLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxjQUFjLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQztTQUMvQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBclFGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLDJCQUEyQjtvQkFFckMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSwrQkFBK0I7d0JBQ3hDLGFBQWEsRUFBRSxNQUFNO3dCQUNyQix1REFBdUQ7d0JBQ3ZELHlCQUF5QixFQUFFLDBCQUEwQjt3QkFDckQsTUFBTSxFQUFFLE1BQU07cUJBQ2Y7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBOUNDLFVBQVU7Z0JBSFYsaUJBQWlCO2dCQU5YLGNBQWMsdUJBMkpQLFFBQVE7OzsyQkF6Q3BCLEtBQUs7eUJBaUNMLGVBQWUsU0FBQyxPQUFPLEVBQUU7d0JBQ3hCLHVFQUF1RTt3QkFDdkUsOENBQThDO3dCQUM5QyxXQUFXLEVBQUUsSUFBSTtxQkFDbEI7O0lBMkpILGlCQUFDO0NBQUEsQUF4UUQsQ0FjZ0Msb0JBQW9CLEdBMFBuRDtTQTFQWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SGFzVGFiSW5kZXgsIEhhc1RhYkluZGV4Q3RvciwgbWl4aW5UYWJJbmRleH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01EQ0NoaXBTZXRBZGFwdGVyLCBNRENDaGlwU2V0Rm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7bWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdENoaXAsIE1hdENoaXBFdmVudH0gZnJvbSAnLi9jaGlwJztcblxuXG5sZXQgdWlkID0gMDtcblxuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcFNldC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY2xhc3MgTWF0Q2hpcFNldEJhc2Uge1xuICBkaXNhYmxlZCE6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuY29uc3QgX01hdENoaXBTZXRNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIHR5cGVvZiBNYXRDaGlwU2V0QmFzZSA9XG4gICAgbWl4aW5UYWJJbmRleChNYXRDaGlwU2V0QmFzZSk7XG5cbi8qKlxuICogQmFzaWMgY29udGFpbmVyIGNvbXBvbmVudCBmb3IgdGhlIE1hdENoaXAgY29tcG9uZW50LlxuICpcbiAqIEV4dGVuZGVkIGJ5IE1hdENoaXBMaXN0Ym94IGFuZCBNYXRDaGlwR3JpZCBmb3IgZGlmZmVyZW50IGludGVyYWN0aW9uIHBhdHRlcm5zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtY2hpcC1zZXQnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnY2hpcHMuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1jaGlwLXNldCBtZGMtY2hpcC1zZXQnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAvLyBUT0RPOiByZXBsYWNlIHRoaXMgYmluZGluZyB3aXRoIHVzZSBvZiBBcmlhRGVzY3JpYmVyXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ19hcmlhRGVzY3JpYmVkYnkgfHwgbnVsbCcsXG4gICAgJ1tpZF0nOiAnX3VpZCcsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDaGlwU2V0IGV4dGVuZHMgX01hdENoaXBTZXRNaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICBIYXNUYWJJbmRleCwgT25EZXN0cm95IHtcbiAgLyoqIFN1YnNjcmlwdGlvbiB0byByZW1vdmUgY2hhbmdlcyBpbiBjaGlwcy4gKi9cbiAgcHJpdmF0ZSBfY2hpcFJlbW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGRlc3Ryb3llZCBldmVudHMgaW4gY2hpcHMuICovXG4gIHByaXZhdGUgX2NoaXBEZXN0cm95ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGlwIGludGVyYWN0aW9ucy4gKi9cbiAgcHJpdmF0ZSBfY2hpcEludGVyYWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgY2hpcCBpcyBkZXN0cm95ZWQsIHdlIHN0b3JlIHRoZSBpbmRleCBvZiB0aGUgZGVzdHJveWVkIGNoaXAgdW50aWwgdGhlIGNoaXBzXG4gICAqIHF1ZXJ5IGxpc3Qgbm90aWZpZXMgYWJvdXQgdGhlIHVwZGF0ZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSB3ZSBjYW5ub3QgZGV0ZXJtaW5lIGFuXG4gICAqIGFwcHJvcHJpYXRlIGNoaXAgdGhhdCBzaG91bGQgcmVjZWl2ZSBmb2N1cyB1bnRpbCB0aGUgYXJyYXkgb2YgY2hpcHMgdXBkYXRlZCBjb21wbGV0ZWx5LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9sYXN0RGVzdHJveWVkQ2hpcEluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKiogVGhlIE1EQyBmb3VuZGF0aW9uIGNvbnRhaW5pbmcgYnVzaW5lc3MgbG9naWMgZm9yIE1EQyBjaGlwLXNldC4gKi9cbiAgcHJvdGVjdGVkIF9jaGlwU2V0Rm91bmRhdGlvbjogTURDQ2hpcFNldEZvdW5kYXRpb247XG5cbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcm90ZWN0ZWQgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBNREMgY2hpcC1zZXQgYWRhcHRlciBpbnRlcmZhY2UuXG4gICAqIFRoZXNlIG1ldGhvZHMgYXJlIGNhbGxlZCBieSB0aGUgY2hpcCBzZXQgZm91bmRhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBfY2hpcFNldEFkYXB0ZXI6IE1EQ0NoaXBTZXRBZGFwdGVyID0ge1xuICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLl9oYXNNZGNDbGFzcyhjbGFzc05hbWUpLFxuICAgIC8vIE5vLW9wLiBXZSBrZWVwIHRyYWNrIG9mIGNoaXBzIHZpYSBDb250ZW50Q2hpbGRyZW4sIHdoaWNoIHdpbGwgYmUgdXBkYXRlZCB3aGVuIGEgY2hpcCBpc1xuICAgIC8vIHJlbW92ZWQuXG4gICAgcmVtb3ZlQ2hpcEF0SW5kZXg6ICgpID0+IHt9LFxuICAgIC8vIE5vLW9wIGZvciBiYXNlIGNoaXAgc2V0LiBNYXRDaGlwTGlzdGJveCBvdmVycmlkZXMgdGhlIGFkYXB0ZXIgdG8gcHJvdmlkZSB0aGlzIG1ldGhvZC5cbiAgICBzZWxlY3RDaGlwQXRJbmRleDogKCkgPT4ge30sXG4gICAgZ2V0SW5kZXhPZkNoaXBCeUlkOiAoaWQ6IHN0cmluZykgPT4gdGhpcy5fY2hpcHMudG9BcnJheSgpLmZpbmRJbmRleChjaGlwID0+IGNoaXAuaWQgPT09IGlkKSxcbiAgICBmb2N1c0NoaXBQcmltYXJ5QWN0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgZm9jdXNDaGlwVHJhaWxpbmdBY3Rpb25BdEluZGV4OiAoKSA9PiB7fSxcbiAgICByZW1vdmVGb2N1c0Zyb21DaGlwQXRJbmRleDogKCkgPT4ge30sXG4gICAgaXNSVEw6ICgpID0+ICEhdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcsXG4gICAgZ2V0Q2hpcExpc3RDb3VudDogKCkgPT4gdGhpcy5fY2hpcHMubGVuZ3RoLFxuICAgIC8vIFRPRE8obW1hbGVyYmEpOiBJbXBsZW1lbnQgdXNpbmcgTGl2ZUFubm91bmNlci5cbiAgICBhbm5vdW5jZU1lc3NhZ2U6ICgpID0+IHt9LFxuICB9O1xuXG4gIC8qKiBUaGUgYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGUgb24gdGhlIGNoaXAgbGlzdCBmb3IgaW1wcm92ZWQgYTExeS4gKi9cbiAgX2FyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuXG4gIC8qKiBVaWQgb2YgdGhlIGNoaXAgc2V0ICovXG4gIF91aWQ6IHN0cmluZyA9IGBtYXQtbWRjLWNoaXAtc2V0LSR7dWlkKyt9YDtcblxuICAvKipcbiAgICogTWFwIGZyb20gY2xhc3MgdG8gd2hldGhlciB0aGUgY2xhc3MgaXMgZW5hYmxlZC5cbiAgICogRW5hYmxlZCBjbGFzc2VzIGFyZSBzZXQgb24gdGhlIE1EQyBjaGlwLXNldCBkaXYuXG4gICAqL1xuICBfbWRjQ2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgc2V0IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fc3luY0NoaXBzU3RhdGUoKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgbGlzdCBjb250YWlucyBjaGlwcyBvciBub3QuICovXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NoaXBzLmxlbmd0aCA9PT0gMDsgfVxuXG4gIC8qKiBUaGUgQVJJQSByb2xlIGFwcGxpZWQgdG8gdGhlIGNoaXAgc2V0LiAqL1xuICBnZXQgcm9sZSgpOiBzdHJpbmcgfCBudWxsIHsgcmV0dXJuIHRoaXMuZW1wdHkgPyBudWxsIDogJ3ByZXNlbnRhdGlvbic7IH1cblxuICAvKiogV2hldGhlciBhbnkgb2YgdGhlIGNoaXBzIGluc2lkZSBvZiB0aGlzIGNoaXAtc2V0IGhhcyBmb2N1cy4gKi9cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oYXNGb2N1c2VkQ2hpcCgpOyB9XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyByZW1vdmUgZXZlbnRzLiAqL1xuICBnZXQgY2hpcFJlbW92ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxNYXRDaGlwRXZlbnQ+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5fY2hpcHMubWFwKGNoaXAgPT4gY2hpcC5yZW1vdmVkKSk7XG4gIH1cblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgY2hpcHMnIHJlbW92ZSBldmVudHMuICovXG4gIGdldCBjaGlwRGVzdHJveWVkQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1hdENoaXBFdmVudD4ge1xuICAgIHJldHVybiBtZXJnZSguLi50aGlzLl9jaGlwcy5tYXAoY2hpcCA9PiBjaGlwLmRlc3Ryb3llZCkpO1xuICB9XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyBpbnRlcmFjdGlvbiBldmVudHMuICovXG4gIGdldCBjaGlwSW50ZXJhY3Rpb25DaGFuZ2VzKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuX2NoaXBzLm1hcChjaGlwID0+IGNoaXAuaW50ZXJhY3Rpb24pKTtcbiAgfVxuXG4gIC8qKiBUaGUgY2hpcHMgdGhhdCBhcmUgcGFydCBvZiB0aGlzIGNoaXAgc2V0LiAqL1xuICBAQ29udGVudENoaWxkcmVuKE1hdENoaXAsIHtcbiAgICAvLyBXZSBuZWVkIHRvIHVzZSBgZGVzY2VuZGFudHM6IHRydWVgLCBiZWNhdXNlIEl2eSB3aWxsIG5vIGxvbmdlciBtYXRjaFxuICAgIC8vIGluZGlyZWN0IGRlc2NlbmRhbnRzIGlmIGl0J3MgbGVmdCBhcyBmYWxzZS5cbiAgICBkZXNjZW5kYW50czogdHJ1ZVxuICB9KSBfY2hpcHM6IFF1ZXJ5TGlzdDxNYXRDaGlwPjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgX2RpcjogRGlyZWN0aW9uYWxpdHkpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcFNldEZvdW5kYXRpb24odGhpcy5fY2hpcFNldEFkYXB0ZXIpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9jaGlwcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgIC8vIFNpbmNlIHRoaXMgaGFwcGVucyBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlblxuICAgICAgICAvLyBjaGVja2VkLCB3ZSBuZWVkIHRvIGRlZmVyIGl0IHRvIHRoZSBuZXh0IHRpY2suXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3N5bmNDaGlwc1N0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZXNldENoaXBzKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBvZiB0aGUgY2hpcHMgaXMgZm9jdXNlZC4gKi9cbiAgcHJvdGVjdGVkIF9oYXNGb2N1c2VkQ2hpcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpcHMuc29tZShjaGlwID0+IGNoaXAuX2hhc0ZvY3VzKTtcbiAgfVxuXG4gIC8qKiBTeW5jcyB0aGUgY2hpcC1zZXQncyBzdGF0ZSB3aXRoIHRoZSBpbmRpdmlkdWFsIGNoaXBzLiAqL1xuICBwcm90ZWN0ZWQgX3N5bmNDaGlwc1N0YXRlKCkge1xuICAgIGlmICh0aGlzLl9jaGlwcykge1xuICAgICAgdGhpcy5fY2hpcHMuZm9yRWFjaChjaGlwID0+IHtcbiAgICAgICAgY2hpcC5kaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkO1xuICAgICAgICBjaGlwLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHdoZXRoZXIgdGhlIGdpdmVuIENTUyBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgTURDIGNoaXAuICovXG4gIHByb3RlY3RlZCBfc2V0TWRjQ2xhc3MoY3NzQ2xhc3M6IHN0cmluZywgYWN0aXZlOiBib29sZWFuKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICAgIGFjdGl2ZSA/IGNsYXNzZXMuYWRkKGNzc0NsYXNzKSA6IGNsYXNzZXMucmVtb3ZlKGNzc0NsYXNzKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEFkYXB0ZXIgbWV0aG9kIHRoYXQgcmV0dXJucyB0cnVlIGlmIHRoZSBjaGlwIHNldCBoYXMgdGhlIGdpdmVuIE1EQyBjbGFzcy4gKi9cbiAgcHJvdGVjdGVkIF9oYXNNZGNDbGFzcyhjbGFzc05hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH1cblxuICAvKiogVXBkYXRlcyBzdWJzY3JpcHRpb25zIHRvIGNoaXAgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9yZXNldENoaXBzKCkge1xuICAgIHRoaXMuX2Ryb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5fc3Vic2NyaWJlVG9DaGlwRXZlbnRzKCk7XG4gIH1cblxuICAvKiogU3Vic2NyaWJlcyB0byBldmVudHMgb24gdGhlIGNoaWxkIGNoaXBzLiAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZVRvQ2hpcEV2ZW50cygpIHtcbiAgICB0aGlzLl9saXN0ZW5Ub0NoaXBzUmVtb3ZlKCk7XG4gICAgdGhpcy5fbGlzdGVuVG9DaGlwc0Rlc3Ryb3llZCgpO1xuICAgIHRoaXMuX2xpc3RlblRvQ2hpcHNJbnRlcmFjdGlvbigpO1xuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gY2hpcCByZW1vdmFsIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfbGlzdGVuVG9DaGlwc1JlbW92ZSgpIHtcbiAgICB0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlwUmVtb3ZlQ2hhbmdlcy5zdWJzY3JpYmUoKGV2ZW50OiBNYXRDaGlwRXZlbnQpID0+IHtcbiAgICAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbi5oYW5kbGVDaGlwUmVtb3ZhbCh7XG4gICAgICAgICBjaGlwSWQ6IGV2ZW50LmNoaXAuaWQsXG4gICAgICAgICAvLyBUT0RPKG1tYWxlcmJhKTogQWRkIHJlbW92YWwgbWVzc2FnZS5cbiAgICAgICAgIHJlbW92ZWRBbm5vdW5jZW1lbnQ6IG51bGwsXG4gICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU3Vic2NyaWJlcyB0byBjaGlwIGRlc3Ryb3llZCBldmVudHMuICovXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNEZXN0cm95ZWQoKSB7XG4gICAgdGhpcy5fY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbiA9IHRoaXMuY2hpcERlc3Ryb3llZENoYW5nZXMuc3Vic2NyaWJlKChldmVudDogTWF0Q2hpcEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjaGlwID0gZXZlbnQuY2hpcDtcbiAgICAgIGNvbnN0IGNoaXBJbmRleDogbnVtYmVyID0gdGhpcy5fY2hpcHMudG9BcnJheSgpLmluZGV4T2YoZXZlbnQuY2hpcCk7XG5cbiAgICAgIC8vIEluIGNhc2UgdGhlIGNoaXAgdGhhdCB3aWxsIGJlIHJlbW92ZWQgaXMgY3VycmVudGx5IGZvY3VzZWQsIHdlIHRlbXBvcmFyaWx5IHN0b3JlXG4gICAgICAvLyB0aGUgaW5kZXggaW4gb3JkZXIgdG8gYmUgYWJsZSB0byBkZXRlcm1pbmUgYW4gYXBwcm9wcmlhdGUgc2libGluZyBjaGlwIHRoYXQgd2lsbFxuICAgICAgLy8gcmVjZWl2ZSBmb2N1cy5cbiAgICAgIGlmICh0aGlzLl9pc1ZhbGlkSW5kZXgoY2hpcEluZGV4KSAmJiBjaGlwLl9oYXNGb2N1cykge1xuICAgICAgICB0aGlzLl9sYXN0RGVzdHJveWVkQ2hpcEluZGV4ID0gY2hpcEluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gY2hpcCBpbnRlcmFjdGlvbiBldmVudHMuICovXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNJbnRlcmFjdGlvbigpIHtcbiAgICB0aGlzLl9jaGlwSW50ZXJhY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBJbnRlcmFjdGlvbkNoYW5nZXMuc3Vic2NyaWJlKChpZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbi5oYW5kbGVDaGlwSW50ZXJhY3Rpb24oe2NoaXBJZDogaWR9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBVbnN1YnNjcmliZXMgZnJvbSBhbGwgY2hpcCBldmVudHMuICovXG4gIHByb3RlY3RlZCBfZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBSZW1vdmVTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jaGlwSW50ZXJhY3Rpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBJbnRlcmFjdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcEludGVyYWN0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fY2hpcERlc3Ryb3llZFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIER1bW15IG1ldGhvZCBmb3Igc3ViY2xhc3NlcyB0byBvdmVycmlkZS4gQmFzZSBjaGlwIHNldCBjYW5ub3QgYmUgZm9jdXNlZC4gKi9cbiAgZm9jdXMoKSB7fVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IHRvIGVuc3VyZSBhbGwgaW5kZXhlcyBhcmUgdmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggdG8gYmUgY2hlY2tlZC5cbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaW5kZXggaXMgdmFsaWQgZm9yIG91ciBsaXN0IG9mIGNoaXBzLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9pc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fY2hpcHMubGVuZ3RoO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIGFuIGV2ZW50IGNvbWVzIGZyb20gaW5zaWRlIGEgY2hpcCBlbGVtZW50LiAqL1xuICBwcm90ZWN0ZWQgX29yaWdpbmF0ZXNGcm9tQ2hpcChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50ICYmIGN1cnJlbnRFbGVtZW50ICE9PSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIC8vIE51bGwgY2hlY2sgdGhlIGNsYXNzTGlzdCwgYmVjYXVzZSBJRSBhbmQgRWRnZSBkb24ndCBzdXBwb3J0IGl0IG9uIGFsbCBlbGVtZW50cy5cbiAgICAgIGlmIChjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QgJiYgY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZGMtY2hpcCcpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=