/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ContentChildren, Directive, ElementRef, HostBinding, Inject, Input, NgZone, Optional, QueryList } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleRenderer, setLines, } from '@angular/material-experimental/mdc-core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatListAvatarCssMatStyler, MatListIconCssMatStyler } from './list-styling';
function toggleClass(el, className, on) {
    if (on) {
        el.classList.add(className);
    }
    else {
        el.classList.remove(className);
    }
}
/** @docs-private */
export class MatListItemBase {
    constructor(_elementRef, _ngZone, _listBase, _platform, globalRippleOptions) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._listBase = _listBase;
        this._platform = _platform;
        this._disableRipple = false;
        this._disabled = false;
        this._subscriptions = new Subscription();
        this._rippleRenderer = null;
        this._hostElement = this._elementRef.nativeElement;
        this.rippleConfig = globalRippleOptions || {};
        if (!this._listBase._isNonInteractive) {
            this._initInteractiveListItem();
        }
        // If no type attribute is specified for a host `<button>` element, set it to `button`. If a
        // type attribute is already specified, we do nothing. We do this for backwards compatibility.
        // TODO: Determine if we intend to continue doing this for the MDC-based list.
        if (this._hostElement.nodeName.toLowerCase() === 'button' &&
            !this._hostElement.hasAttribute('type')) {
            this._hostElement.setAttribute('type', 'button');
        }
    }
    get disableRipple() {
        return this.disabled || this._disableRipple || this._listBase.disableRipple;
    }
    set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }
    /** Whether the list-item is disabled. */
    get disabled() { return this._disabled || (this._listBase && this._listBase.disabled); }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Implemented as part of `RippleTarget`.
     * @docs-private
     */
    get rippleDisabled() { return this.disableRipple || !!this.rippleConfig.disabled; }
    ngAfterContentInit() {
        this._monitorLines();
    }
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
        if (this._rippleRenderer !== null) {
            this._rippleRenderer._removeTriggerEvents();
        }
    }
    /** Gets the label for the list item. This is used for the typeahead. */
    _getItemLabel() {
        return this._itemText ? (this._itemText.nativeElement.textContent || '') : '';
    }
    /** Whether the list item has icons or avatars. */
    _hasIconOrAvatar() {
        return !!(this._avatars.length || this._icons.length);
    }
    _initInteractiveListItem() {
        this._hostElement.classList.add('mat-mdc-list-item-interactive');
        this._rippleRenderer =
            new RippleRenderer(this, this._ngZone, this._hostElement, this._platform);
        this._rippleRenderer.setupTriggerEvents(this._hostElement);
    }
    /**
     * Subscribes to changes in `MatLine` content children and annotates them
     * appropriately when they change.
     */
    _monitorLines() {
        this._ngZone.runOutsideAngular(() => {
            this._subscriptions.add(this.lines.changes.pipe(startWith(this.lines))
                .subscribe((lines) => {
                toggleClass(this._hostElement, 'mat-mdc-list-item-single-line', lines.length <= 1);
                lines.forEach((line, index) => {
                    toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                    toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                });
                setLines(lines, this._elementRef, 'mat-mdc');
            }));
        });
    }
}
MatListItemBase.decorators = [
    { type: Directive }
];
MatListItemBase.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: MatListBase },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] }
];
MatListItemBase.propDecorators = {
    _avatars: [{ type: ContentChildren, args: [MatListAvatarCssMatStyler, { descendants: false },] }],
    _icons: [{ type: ContentChildren, args: [MatListIconCssMatStyler, { descendants: false },] }],
    disableRipple: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['class.mdc-list-item--disabled',] }, { type: HostBinding, args: ['attr.aria-disabled',] }, { type: Input }]
};
/** @docs-private */
export class MatListBase {
    constructor() {
        this._isNonInteractive = true;
        this._disableRipple = false;
        this._disabled = false;
    }
    /** Whether ripples for all list items is disabled. */
    get disableRipple() { return this._disableRipple; }
    set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }
    /** Whether all list items are disabled. */
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
}
MatListBase.decorators = [
    { type: Directive }
];
MatListBase.propDecorators = {
    _isNonInteractive: [{ type: HostBinding, args: ['class.mat-mdc-list-non-interactive',] }],
    disableRipple: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wseUJBQXlCLEVBR3pCLGNBQWMsRUFFZCxRQUFRLEdBQ1QsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMseUJBQXlCLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRixTQUFTLFdBQVcsQ0FBQyxFQUFXLEVBQUUsU0FBaUIsRUFBRSxFQUFXO0lBQzlELElBQUksRUFBRSxFQUFFO1FBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDN0I7U0FBTTtRQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2hDO0FBQ0gsQ0FBQztBQUdELG9CQUFvQjtBQUNwQixNQUFNLE9BQWdCLGVBQWU7SUEyQ25DLFlBQW1CLFdBQW9DLEVBQVksT0FBZSxFQUM5RCxTQUFzQixFQUFVLFNBQW1CLEVBRXZELG1CQUF5QztRQUh0QyxnQkFBVyxHQUFYLFdBQVcs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LEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQztxQkFDL0QsZUFBZSxTQUFDLHVCQUF1QixFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQzs0QkFFN0QsS0FBSzt1QkFRTCxXQUFXLFNBQUMsK0JBQStCLGNBQzNDLFdBQVcsU0FBQyxvQkFBb0IsY0FDaEMsS0FBSzs7QUE0RlIsb0JBQW9CO0FBQ3BCLE1BQU0sT0FBZ0IsV0FBVztJQUZqQztRQUlFLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQU0xQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQU9oQyxjQUFTLEdBQUcsS0FBSyxDQUFDO0lBSTVCLENBQUM7SUFmQyxzREFBc0Q7SUFDdEQsSUFDSSxhQUFhLEtBQWMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJLGFBQWEsQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFHekYsMkNBQTJDO0lBQzNDLElBRUksUUFBUSxLQUFjLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsSUFBSSxRQUFRLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUFoQmhGLFNBQVM7OztnQ0FHUCxXQUFXLFNBQUMsb0NBQW9DOzRCQUloRCxLQUFLO3VCQU1MLFdBQVcsU0FBQyxvQkFBb0IsY0FDaEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBSaXBwbGVDb25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gIFJpcHBsZVJlbmRlcmVyLFxuICBSaXBwbGVUYXJnZXQsXG4gIHNldExpbmVzLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TWF0TGlzdEF2YXRhckNzc01hdFN0eWxlciwgTWF0TGlzdEljb25Dc3NNYXRTdHlsZXJ9IGZyb20gJy4vbGlzdC1zdHlsaW5nJztcblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWw6IEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBvbjogYm9vbGVhbikge1xuICBpZiAob24pIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0SXRlbUJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIFJpcHBsZVRhcmdldCB7XG4gIC8qKiBRdWVyeSBsaXN0IG1hdGNoaW5nIGxpc3QtaXRlbSBsaW5lIGVsZW1lbnRzLiAqL1xuICBhYnN0cmFjdCBsaW5lczogUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+O1xuXG4gIC8qKiBFbGVtZW50IHJlZmVyZW5jZSByZWZlcnJpbmcgdG8gdGhlIHByaW1hcnkgbGlzdCBpdGVtIHRleHQuICovXG4gIGFic3RyYWN0IF9pdGVtVGV4dDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqIEhvc3QgZWxlbWVudCBmb3IgdGhlIGxpc3QgaXRlbS4gKi9cbiAgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBAQ29udGVudENoaWxkcmVuKE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfYXZhdGFyczogUXVlcnlMaXN0PG5ldmVyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaXN0SWNvbkNzc01hdFN0eWxlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIF9pY29uczogUXVlcnlMaXN0PG5ldmVyPjtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2xpc3RCYXNlLmRpc2FibGVSaXBwbGU7XG4gIH1cbiAgc2V0IGRpc2FibGVSaXBwbGUodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0LWl0ZW0gaXMgZGlzYWJsZWQuICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQnKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLl9saXN0QmFzZSAmJiB0aGlzLl9saXN0QmFzZS5kaXNhYmxlZCk7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgX3JpcHBsZVJlbmRlcmVyOiBSaXBwbGVSZW5kZXJlcnxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgUmlwcGxlVGFyZ2V0YC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmlwcGxlQ29uZmlnOiBSaXBwbGVDb25maWcgJiBSaXBwbGVHbG9iYWxPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBSaXBwbGVUYXJnZXRgLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgcmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmRpc2FibGVSaXBwbGUgfHwgISF0aGlzLnJpcHBsZUNvbmZpZy5kaXNhYmxlZDsgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2xpc3RCYXNlOiBNYXRMaXN0QmFzZSwgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMpXG4gICAgICAgICAgICAgICAgICBnbG9iYWxSaXBwbGVPcHRpb25zPzogUmlwcGxlR2xvYmFsT3B0aW9ucykge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucmlwcGxlQ29uZmlnID0gZ2xvYmFsUmlwcGxlT3B0aW9ucyB8fCB7fTtcblxuICAgIGlmICghdGhpcy5fbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2luaXRJbnRlcmFjdGl2ZUxpc3RJdGVtKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gdHlwZSBhdHRyaWJ1dGUgaXMgc3BlY2lmaWVkIGZvciBhIGhvc3QgYDxidXR0b24+YCBlbGVtZW50LCBzZXQgaXQgdG8gYGJ1dHRvbmAuIElmIGFcbiAgICAvLyB0eXBlIGF0dHJpYnV0ZSBpcyBhbHJlYWR5IHNwZWNpZmllZCwgd2UgZG8gbm90aGluZy4gV2UgZG8gdGhpcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gVE9ETzogRGV0ZXJtaW5lIGlmIHdlIGludGVuZCB0byBjb250aW51ZSBkb2luZyB0aGlzIGZvciB0aGUgTURDLWJhc2VkIGxpc3QuXG4gICAgaWYgKHRoaXMuX2hvc3RFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdidXR0b24nICYmXG4gICAgICAgICF0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3R5cGUnKSkge1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9tb25pdG9yTGluZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5fcmlwcGxlUmVuZGVyZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLl9yZW1vdmVUcmlnZ2VyRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldHMgdGhlIGxhYmVsIGZvciB0aGUgbGlzdCBpdGVtLiBUaGlzIGlzIHVzZWQgZm9yIHRoZSB0eXBlYWhlYWQuICovXG4gIF9nZXRJdGVtTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbVRleHQgPyAodGhpcy5faXRlbVRleHQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudCB8fCAnJykgOiAnJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IGl0ZW0gaGFzIGljb25zIG9yIGF2YXRhcnMuICovXG4gIF9oYXNJY29uT3JBdmF0YXIoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuX2F2YXRhcnMubGVuZ3RoIHx8IHRoaXMuX2ljb25zLmxlbmd0aCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0SW50ZXJhY3RpdmVMaXN0SXRlbSgpIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLWxpc3QtaXRlbS1pbnRlcmFjdGl2ZScpO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyID1cbiAgICAgICAgbmV3IFJpcHBsZVJlbmRlcmVyKHRoaXMsIHRoaXMuX25nWm9uZSwgdGhpcy5faG9zdEVsZW1lbnQsIHRoaXMuX3BsYXRmb3JtKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXR1cFRyaWdnZXJFdmVudHModGhpcy5faG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiBgTWF0TGluZWAgY29udGVudCBjaGlsZHJlbiBhbmQgYW5ub3RhdGVzIHRoZW1cbiAgICogYXBwcm9wcmlhdGVseSB3aGVuIHRoZXkgY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW9uaXRvckxpbmVzKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmxpbmVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5faG9zdEVsZW1lbnQsICdtYXQtbWRjLWxpc3QtaXRlbS1zaW5nbGUtbGluZScsIGxpbmVzLmxlbmd0aCA8PSAxKTtcbiAgICAgICAgICAgIGxpbmVzLmZvckVhY2goKGxpbmU6IEVsZW1lbnRSZWY8RWxlbWVudD4sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MobGluZS5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgJ21kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCcsIGluZGV4ID09PSAwICYmIGxpbmVzLmxlbmd0aCA+IDEpO1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhsaW5lLm5hdGl2ZUVsZW1lbnQsICdtZGMtbGlzdC1pdGVtX19zZWNvbmRhcnktdGV4dCcsIGluZGV4ICE9PSAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0TGluZXMobGluZXMsIHRoaXMuX2VsZW1lbnRSZWYsICdtYXQtbWRjJyk7XG4gICAgICAgICAgfSkpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG5cbkBEaXJlY3RpdmUoKVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0QmFzZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MubWF0LW1kYy1saXN0LW5vbi1pbnRlcmFjdGl2ZScpXG4gIF9pc05vbkludGVyYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciByaXBwbGVzIGZvciBhbGwgbGlzdCBpdGVtcyBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVSaXBwbGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlUmlwcGxlOyB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciBhbGwgbGlzdCBpdGVtcyBhcmUgZGlzYWJsZWQuICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZVJpcHBsZTogQm9vbGVhbklucHV0O1xufVxuIl19