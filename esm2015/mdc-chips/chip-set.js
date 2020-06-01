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
let MatChipSet = /** @class */ (() => {
    class MatChipSet extends _MatChipSetMixinBase {
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
                hasClass: (className) => this._hasMdcClass(className),
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
            this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
        }
        /** Whether the chip set is disabled. */
        get disabled() { return this._disabled; }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
            this._syncChipsState();
        }
        /** Whether the chip list contains chips or not. */
        get empty() { return this._chips.length === 0; }
        /** The ARIA role applied to the chip set. */
        get role() { return this.empty ? null : 'presentation'; }
        /** Whether any of the chips inside of this chip-set has focus. */
        get focused() { return this._hasFocusedChip(); }
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
            return this._chips.some(chip => chip._hasFocus);
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
                if (this._isValidIndex(chipIndex) && chip._hasFocus) {
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
            let currentElement = event.target;
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
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip{border-radius:16px;height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(0.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-chip{cursor:default}.mat-mdc-chip._mat-animation-noopable{transition-duration:1ms;animation:none}.mat-mdc-chip._mat-animation-noopable .mdc-chip__checkmark-svg{transition:none}.cdk-high-contrast-active .mat-mdc-chip{outline:solid 1px}.cdk-high-contrast-active .mat-mdc-chip:focus{outline:dotted 2px}.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-chip__ripple::after,.mdc-chip__ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";pointer-events:none;opacity:0;border-radius:inherit}._mat-animation-noopable .mdc-chip__ripple::after,._mat-animation-noopable .mdc-chip__ripple::before{transition:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon,.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content{pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::after,.mat-mdc-chip-disabled.mat-mdc-chip .mdc-chip__ripple::before{display:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}._mat-animation-noopable .mdc-chip__checkmark-path{transition:none}.cdk-high-contrast-black-on-white .mdc-chip__checkmark-path{stroke:#000 !important}.mat-chip-row-focusable-text-content{position:relative}\n"]
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
    return MatChipSet;
})();
export { MatChipSet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1zZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jaGlwcy9jaGlwLXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUVMLFFBQVEsRUFDUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBK0IsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkYsT0FBTyxFQUFvQixvQkFBb0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxLQUFLLEVBQWMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLFFBQVEsQ0FBQztBQUc3QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFHWjs7O0dBR0c7QUFDSCxNQUFNLGNBQWM7SUFFbEIsWUFBWSxXQUF1QixJQUFHLENBQUM7Q0FDeEM7QUFDRCxNQUFNLG9CQUFvQixHQUN0QixhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFbEM7Ozs7R0FJRztBQUNIO0lBQUEsTUFjYSxVQUFXLFNBQVEsb0JBQW9CO1FBaUdsRCxZQUFzQixXQUF1QixFQUN2QixrQkFBcUMsRUFDekIsSUFBb0I7WUFDcEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBSEMsZ0JBQVcsR0FBWCxXQUFX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QjtvQkFFckMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSwrQkFBK0I7d0JBQ3hDLGFBQWEsRUFBRSxNQUFNO3dCQUNyQix1REFBdUQ7d0JBQ3ZELHlCQUF5QixFQUFFLDBCQUEwQjt3QkFDckQsTUFBTSxFQUFFLE1BQU07cUJBQ2Y7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBOUNDLFVBQVU7Z0JBSFYsaUJBQWlCO2dCQU5YLGNBQWMsdUJBMkpQLFFBQVE7OzsyQkF6Q3BCLEtBQUs7eUJBaUNMLGVBQWUsU0FBQyxPQUFPLEVBQUU7d0JBQ3hCLHVFQUF1RTt3QkFDdkUsOENBQThDO3dCQUM5QyxXQUFXLEVBQUUsSUFBSTtxQkFDbEI7O0lBMkpILGlCQUFDO0tBQUE7U0ExUFksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0hhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsIG1peGluVGFiSW5kZXh9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNRENDaGlwU2V0QWRhcHRlciwgTURDQ2hpcFNldEZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge21lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGgsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRDaGlwLCBNYXRDaGlwRXZlbnR9IGZyb20gJy4vY2hpcCc7XG5cblxubGV0IHVpZCA9IDA7XG5cblxuLyoqXG4gKiBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdENoaXBTZXQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmNsYXNzIE1hdENoaXBTZXRCYXNlIHtcbiAgZGlzYWJsZWQhOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcihfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cbmNvbnN0IF9NYXRDaGlwU2V0TWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiB0eXBlb2YgTWF0Q2hpcFNldEJhc2UgPVxuICAgIG1peGluVGFiSW5kZXgoTWF0Q2hpcFNldEJhc2UpO1xuXG4vKipcbiAqIEJhc2ljIGNvbnRhaW5lciBjb21wb25lbnQgZm9yIHRoZSBNYXRDaGlwIGNvbXBvbmVudC5cbiAqXG4gKiBFeHRlbmRlZCBieSBNYXRDaGlwTGlzdGJveCBhbmQgTWF0Q2hpcEdyaWQgZm9yIGRpZmZlcmVudCBpbnRlcmFjdGlvbiBwYXR0ZXJucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtc2V0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtY2hpcC1zZXQgbWRjLWNoaXAtc2V0JyxcbiAgICAnW2F0dHIucm9sZV0nOiAncm9sZScsXG4gICAgLy8gVE9ETzogcmVwbGFjZSB0aGlzIGJpbmRpbmcgd2l0aCB1c2Ugb2YgQXJpYURlc2NyaWJlclxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdfYXJpYURlc2NyaWJlZGJ5IHx8IG51bGwnLFxuICAgICdbaWRdJzogJ191aWQnLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFNldCBleHRlbmRzIF9NYXRDaGlwU2V0TWl4aW5CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCxcbiAgSGFzVGFiSW5kZXgsIE9uRGVzdHJveSB7XG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gcmVtb3ZlIGNoYW5nZXMgaW4gY2hpcHMuICovXG4gIHByaXZhdGUgX2NoaXBSZW1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiB0byBkZXN0cm95ZWQgZXZlbnRzIGluIGNoaXBzLiAqL1xuICBwcml2YXRlIF9jaGlwRGVzdHJveWVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gY2hpcCBpbnRlcmFjdGlvbnMuICovXG4gIHByaXZhdGUgX2NoaXBJbnRlcmFjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAvKipcbiAgICogV2hlbiBhIGNoaXAgaXMgZGVzdHJveWVkLCB3ZSBzdG9yZSB0aGUgaW5kZXggb2YgdGhlIGRlc3Ryb3llZCBjaGlwIHVudGlsIHRoZSBjaGlwc1xuICAgKiBxdWVyeSBsaXN0IG5vdGlmaWVzIGFib3V0IHRoZSB1cGRhdGUuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugd2UgY2Fubm90IGRldGVybWluZSBhblxuICAgKiBhcHByb3ByaWF0ZSBjaGlwIHRoYXQgc2hvdWxkIHJlY2VpdmUgZm9jdXMgdW50aWwgdGhlIGFycmF5IG9mIGNoaXBzIHVwZGF0ZWQgY29tcGxldGVseS5cbiAgICovXG4gIHByb3RlY3RlZCBfbGFzdERlc3Ryb3llZENoaXBJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBNREMgZm91bmRhdGlvbiBjb250YWluaW5nIGJ1c2luZXNzIGxvZ2ljIGZvciBNREMgY2hpcC1zZXQuICovXG4gIHByb3RlY3RlZCBfY2hpcFNldEZvdW5kYXRpb246IE1EQ0NoaXBTZXRGb3VuZGF0aW9uO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJvdGVjdGVkIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgTURDIGNoaXAtc2V0IGFkYXB0ZXIgaW50ZXJmYWNlLlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBjYWxsZWQgYnkgdGhlIGNoaXAgc2V0IGZvdW5kYXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NoaXBTZXRBZGFwdGVyOiBNRENDaGlwU2V0QWRhcHRlciA9IHtcbiAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5faGFzTWRjQ2xhc3MoY2xhc3NOYW1lKSxcbiAgICAvLyBOby1vcC4gV2Uga2VlcCB0cmFjayBvZiBjaGlwcyB2aWEgQ29udGVudENoaWxkcmVuLCB3aGljaCB3aWxsIGJlIHVwZGF0ZWQgd2hlbiBhIGNoaXAgaXNcbiAgICAvLyByZW1vdmVkLlxuICAgIHJlbW92ZUNoaXBBdEluZGV4OiAoKSA9PiB7fSxcbiAgICAvLyBOby1vcCBmb3IgYmFzZSBjaGlwIHNldC4gTWF0Q2hpcExpc3Rib3ggb3ZlcnJpZGVzIHRoZSBhZGFwdGVyIHRvIHByb3ZpZGUgdGhpcyBtZXRob2QuXG4gICAgc2VsZWN0Q2hpcEF0SW5kZXg6ICgpID0+IHt9LFxuICAgIGdldEluZGV4T2ZDaGlwQnlJZDogKGlkOiBzdHJpbmcpID0+IHRoaXMuX2NoaXBzLnRvQXJyYXkoKS5maW5kSW5kZXgoY2hpcCA9PiBjaGlwLmlkID09PSBpZCksXG4gICAgZm9jdXNDaGlwUHJpbWFyeUFjdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgIGZvY3VzQ2hpcFRyYWlsaW5nQWN0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgcmVtb3ZlRm9jdXNGcm9tQ2hpcEF0SW5kZXg6ICgpID0+IHt9LFxuICAgIGlzUlRMOiAoKSA9PiAhIXRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnLFxuICAgIGdldENoaXBMaXN0Q291bnQ6ICgpID0+IHRoaXMuX2NoaXBzLmxlbmd0aCxcbiAgICAvLyBUT0RPKG1tYWxlcmJhKTogSW1wbGVtZW50IHVzaW5nIExpdmVBbm5vdW5jZXIuXG4gICAgYW5ub3VuY2VNZXNzYWdlOiAoKSA9PiB7fSxcbiAgfTtcblxuICAvKiogVGhlIGFyaWEtZGVzY3JpYmVkYnkgYXR0cmlidXRlIG9uIHRoZSBjaGlwIGxpc3QgZm9yIGltcHJvdmVkIGExMXkuICovXG4gIF9hcmlhRGVzY3JpYmVkYnk6IHN0cmluZztcblxuICAvKiogVWlkIG9mIHRoZSBjaGlwIHNldCAqL1xuICBfdWlkOiBzdHJpbmcgPSBgbWF0LW1kYy1jaGlwLXNldC0ke3VpZCsrfWA7XG5cbiAgLyoqXG4gICAqIE1hcCBmcm9tIGNsYXNzIHRvIHdoZXRoZXIgdGhlIGNsYXNzIGlzIGVuYWJsZWQuXG4gICAqIEVuYWJsZWQgY2xhc3NlcyBhcmUgc2V0IG9uIHRoZSBNREMgY2hpcC1zZXQgZGl2LlxuICAgKi9cbiAgX21kY0NsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIHNldCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3N5bmNDaGlwc1N0YXRlKCk7XG4gIH1cbiAgcHJvdGVjdGVkIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgY29udGFpbnMgY2hpcHMgb3Igbm90LiAqL1xuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jaGlwcy5sZW5ndGggPT09IDA7IH1cblxuICAvKiogVGhlIEFSSUEgcm9sZSBhcHBsaWVkIHRvIHRoZSBjaGlwIHNldC4gKi9cbiAgZ2V0IHJvbGUoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLmVtcHR5ID8gbnVsbCA6ICdwcmVzZW50YXRpb24nOyB9XG5cbiAgLyoqIFdoZXRoZXIgYW55IG9mIHRoZSBjaGlwcyBpbnNpZGUgb2YgdGhpcyBjaGlwLXNldCBoYXMgZm9jdXMuICovXG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzRm9jdXNlZENoaXAoKTsgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgcmVtb3ZlIGV2ZW50cy4gKi9cbiAgZ2V0IGNoaXBSZW1vdmVDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWF0Q2hpcEV2ZW50PiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuX2NoaXBzLm1hcChjaGlwID0+IGNoaXAucmVtb3ZlZCkpO1xuICB9XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIGNoaXBzJyByZW1vdmUgZXZlbnRzLiAqL1xuICBnZXQgY2hpcERlc3Ryb3llZENoYW5nZXMoKTogT2JzZXJ2YWJsZTxNYXRDaGlwRXZlbnQ+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5fY2hpcHMubWFwKGNoaXAgPT4gY2hpcC5kZXN0cm95ZWQpKTtcbiAgfVxuXG4gIC8qKiBDb21iaW5lZCBzdHJlYW0gb2YgYWxsIG9mIHRoZSBjaGlsZCBjaGlwcycgaW50ZXJhY3Rpb24gZXZlbnRzLiAqL1xuICBnZXQgY2hpcEludGVyYWN0aW9uQ2hhbmdlcygpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiBtZXJnZSguLi50aGlzLl9jaGlwcy5tYXAoY2hpcCA9PiBjaGlwLmludGVyYWN0aW9uKSk7XG4gIH1cblxuICAvKiogVGhlIGNoaXBzIHRoYXQgYXJlIHBhcnQgb2YgdGhpcyBjaGlwIHNldC4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRDaGlwLCB7XG4gICAgLy8gV2UgbmVlZCB0byB1c2UgYGRlc2NlbmRhbnRzOiB0cnVlYCwgYmVjYXVzZSBJdnkgd2lsbCBubyBsb25nZXIgbWF0Y2hcbiAgICAvLyBpbmRpcmVjdCBkZXNjZW5kYW50cyBpZiBpdCdzIGxlZnQgYXMgZmFsc2UuXG4gICAgZGVzY2VuZGFudHM6IHRydWVcbiAgfSkgX2NoaXBzOiBRdWVyeUxpc3Q8TWF0Q2hpcD47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIF9kaXI6IERpcmVjdGlvbmFsaXR5KSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uID0gbmV3IE1EQ0NoaXBTZXRGb3VuZGF0aW9uKHRoaXMuX2NoaXBTZXRBZGFwdGVyKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9jaGlwU2V0Rm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fY2hpcHMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAvLyBTaW5jZSB0aGlzIGhhcHBlbnMgYWZ0ZXIgdGhlIGNvbnRlbnQgaGFzIGJlZW5cbiAgICAgICAgLy8gY2hlY2tlZCwgd2UgbmVlZCB0byBkZWZlciBpdCB0byB0aGUgbmV4dCB0aWNrLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9zeW5jQ2hpcHNTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVzZXRDaGlwcygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZHJvcFN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2NoaXBTZXRGb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgb2YgdGhlIGNoaXBzIGlzIGZvY3VzZWQuICovXG4gIHByb3RlY3RlZCBfaGFzRm9jdXNlZENoaXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaXBzLnNvbWUoY2hpcCA9PiBjaGlwLl9oYXNGb2N1cyk7XG4gIH1cblxuICAvKiogU3luY3MgdGhlIGNoaXAtc2V0J3Mgc3RhdGUgd2l0aCB0aGUgaW5kaXZpZHVhbCBjaGlwcy4gKi9cbiAgcHJvdGVjdGVkIF9zeW5jQ2hpcHNTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fY2hpcHMpIHtcbiAgICAgIHRoaXMuX2NoaXBzLmZvckVhY2goY2hpcCA9PiB7XG4gICAgICAgIGNoaXAuZGlzYWJsZWQgPSB0aGlzLl9kaXNhYmxlZDtcbiAgICAgICAgY2hpcC5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyB3aGV0aGVyIHRoZSBnaXZlbiBDU1MgY2xhc3Mgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIE1EQyBjaGlwLiAqL1xuICBwcm90ZWN0ZWQgX3NldE1kY0NsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgICBhY3RpdmUgPyBjbGFzc2VzLmFkZChjc3NDbGFzcykgOiBjbGFzc2VzLnJlbW92ZShjc3NDbGFzcyk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBBZGFwdGVyIG1ldGhvZCB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgY2hpcCBzZXQgaGFzIHRoZSBnaXZlbiBNREMgY2xhc3MuICovXG4gIHByb3RlY3RlZCBfaGFzTWRjQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgc3Vic2NyaXB0aW9ucyB0byBjaGlwIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfcmVzZXRDaGlwcygpIHtcbiAgICB0aGlzLl9kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgIHRoaXMuX3N1YnNjcmliZVRvQ2hpcEV2ZW50cygpO1xuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gZXZlbnRzIG9uIHRoZSBjaGlsZCBjaGlwcy4gKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVUb0NoaXBFdmVudHMoKSB7XG4gICAgdGhpcy5fbGlzdGVuVG9DaGlwc1JlbW92ZSgpO1xuICAgIHRoaXMuX2xpc3RlblRvQ2hpcHNEZXN0cm95ZWQoKTtcbiAgICB0aGlzLl9saXN0ZW5Ub0NoaXBzSW50ZXJhY3Rpb24oKTtcbiAgfVxuXG4gIC8qKiBTdWJzY3JpYmVzIHRvIGNoaXAgcmVtb3ZhbCBldmVudHMuICovXG4gIHByaXZhdGUgX2xpc3RlblRvQ2hpcHNSZW1vdmUoKSB7XG4gICAgdGhpcy5fY2hpcFJlbW92ZVN1YnNjcmlwdGlvbiA9IHRoaXMuY2hpcFJlbW92ZUNoYW5nZXMuc3Vic2NyaWJlKChldmVudDogTWF0Q2hpcEV2ZW50KSA9PiB7XG4gICAgICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24uaGFuZGxlQ2hpcFJlbW92YWwoe1xuICAgICAgICAgY2hpcElkOiBldmVudC5jaGlwLmlkLFxuICAgICAgICAgLy8gVE9ETyhtbWFsZXJiYSk6IEFkZCByZW1vdmFsIG1lc3NhZ2UuXG4gICAgICAgICByZW1vdmVkQW5ub3VuY2VtZW50OiBudWxsLFxuICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFN1YnNjcmliZXMgdG8gY2hpcCBkZXN0cm95ZWQgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9saXN0ZW5Ub0NoaXBzRGVzdHJveWVkKCkge1xuICAgIHRoaXMuX2NoaXBEZXN0cm95ZWRTdWJzY3JpcHRpb24gPSB0aGlzLmNoaXBEZXN0cm95ZWRDaGFuZ2VzLnN1YnNjcmliZSgoZXZlbnQ6IE1hdENoaXBFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IGV2ZW50LmNoaXA7XG4gICAgICBjb25zdCBjaGlwSW5kZXg6IG51bWJlciA9IHRoaXMuX2NoaXBzLnRvQXJyYXkoKS5pbmRleE9mKGV2ZW50LmNoaXApO1xuXG4gICAgICAvLyBJbiBjYXNlIHRoZSBjaGlwIHRoYXQgd2lsbCBiZSByZW1vdmVkIGlzIGN1cnJlbnRseSBmb2N1c2VkLCB3ZSB0ZW1wb3JhcmlseSBzdG9yZVxuICAgICAgLy8gdGhlIGluZGV4IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gZGV0ZXJtaW5lIGFuIGFwcHJvcHJpYXRlIHNpYmxpbmcgY2hpcCB0aGF0IHdpbGxcbiAgICAgIC8vIHJlY2VpdmUgZm9jdXMuXG4gICAgICBpZiAodGhpcy5faXNWYWxpZEluZGV4KGNoaXBJbmRleCkgJiYgY2hpcC5faGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy5fbGFzdERlc3Ryb3llZENoaXBJbmRleCA9IGNoaXBJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTdWJzY3JpYmVzIHRvIGNoaXAgaW50ZXJhY3Rpb24gZXZlbnRzLiAqL1xuICBwcml2YXRlIF9saXN0ZW5Ub0NoaXBzSW50ZXJhY3Rpb24oKSB7XG4gICAgdGhpcy5fY2hpcEludGVyYWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlwSW50ZXJhY3Rpb25DaGFuZ2VzLnN1YnNjcmliZSgoaWQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5fY2hpcFNldEZvdW5kYXRpb24uaGFuZGxlQ2hpcEludGVyYWN0aW9uKHtjaGlwSWQ6IGlkfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogVW5zdWJzY3JpYmVzIGZyb20gYWxsIGNoaXAgZXZlbnRzLiAqL1xuICBwcm90ZWN0ZWQgX2Ryb3BTdWJzY3JpcHRpb25zKCkge1xuICAgIGlmICh0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9jaGlwUmVtb3ZlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2hpcEludGVyYWN0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9jaGlwSW50ZXJhY3Rpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBJbnRlcmFjdGlvblN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NoaXBEZXN0cm95ZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoaXBEZXN0cm95ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2NoaXBEZXN0cm95ZWRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEdW1teSBtZXRob2QgZm9yIHN1YmNsYXNzZXMgdG8gb3ZlcnJpZGUuIEJhc2UgY2hpcCBzZXQgY2Fubm90IGJlIGZvY3VzZWQuICovXG4gIGZvY3VzKCkge31cblxuICAvKipcbiAgICogVXRpbGl0eSB0byBlbnN1cmUgYWxsIGluZGV4ZXMgYXJlIHZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IHRvIGJlIGNoZWNrZWQuXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGluZGV4IGlzIHZhbGlkIGZvciBvdXIgbGlzdCBvZiBjaGlwcy5cbiAgICovXG4gIHByb3RlY3RlZCBfaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuX2NoaXBzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhbiBldmVudCBjb21lcyBmcm9tIGluc2lkZSBhIGNoaXAgZWxlbWVudC4gKi9cbiAgcHJvdGVjdGVkIF9vcmlnaW5hdGVzRnJvbUNoaXAoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudCAmJiBjdXJyZW50RWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAvLyBOdWxsIGNoZWNrIHRoZSBjbGFzc0xpc3QsIGJlY2F1c2UgSUUgYW5kIEVkZ2UgZG9uJ3Qgc3VwcG9ydCBpdCBvbiBhbGwgZWxlbWVudHMuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0ICYmIGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbWRjLWNoaXAnKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19