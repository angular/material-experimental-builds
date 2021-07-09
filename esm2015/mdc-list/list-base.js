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
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { numbers } from '@material/ripple';
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
    constructor(_elementRef, _ngZone, _listBase, _platform, globalRippleOptions, animationMode) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._listBase = _listBase;
        this._platform = _platform;
        this._disableRipple = false;
        this._disabled = false;
        this._subscriptions = new Subscription();
        this._rippleRenderer = null;
        // We have to clone the object, because we don't want to mutate a global value when we assign
        // the `animation` further down. The downside of doing this is that the ripple renderer won't
        // pick up dynamic changes to `disabled`, but it's not something we officially support.
        this.rippleConfig = Object.assign({}, (globalRippleOptions || {}));
        this._hostElement = this._elementRef.nativeElement;
        this._noopAnimations = animationMode === 'NoopAnimations';
        if (!this.rippleConfig.animation) {
            this.rippleConfig.animation = {
                enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
                exitDuration: numbers.FG_DEACTIVATION_MS
            };
        }
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
        return this.disabled || this._disableRipple || this._listBase.disableRipple ||
            this._noopAnimations;
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
                toggleClass(this._hostElement, 'mdc-list-item--with-one-line', lines.length <= 1);
                lines.forEach((line, index) => {
                    toggleClass(this._hostElement, 'mdc-list-item--with-two-lines', lines.length === 2);
                    toggleClass(this._hostElement, 'mdc-list-item--with-three-lines', lines.length === 3);
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
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wseUJBQXlCLEVBR3pCLGNBQWMsRUFFZCxRQUFRLEdBQ1QsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLHlCQUF5QixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEYsU0FBUyxXQUFXLENBQUMsRUFBVyxFQUFFLFNBQWlCLEVBQUUsRUFBVztJQUM5RCxJQUFJLEVBQUUsRUFBRTtRQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNoQztBQUNILENBQUM7QUFHRCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFnQixlQUFl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QUFjLEdBQVksS0FBSyxDQUFDO1FBT2hDLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFJNUIsQ0FBQztJQWZDLHNEQUFzRDtJQUN0RCxJQUNJLGFBQWEsS0FBYyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzVELElBQUksYUFBYSxDQUFDLEtBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUd6RiwyQ0FBMkM7SUFDM0MsSUFFSSxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsRCxJQUFJLFFBQVEsQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQWhCaEYsU0FBUzs7O2dDQUdQLFdBQVcsU0FBQyxvQ0FBb0M7NEJBSWhELEtBQUs7dUJBTUwsV0FBVyxTQUFDLG9CQUFvQixjQUNoQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMsXG4gIFJpcHBsZUNvbmZpZyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgUmlwcGxlUmVuZGVyZXIsXG4gIFJpcHBsZVRhcmdldCxcbiAgc2V0TGluZXMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLCBNYXRMaXN0SWNvbkNzc01hdFN0eWxlcn0gZnJvbSAnLi9saXN0LXN0eWxpbmcnO1xuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbDogRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIG9uOiBib29sZWFuKSB7XG4gIGlmIChvbikge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RJdGVtQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgUmlwcGxlVGFyZ2V0IHtcbiAgLyoqIFF1ZXJ5IGxpc3QgbWF0Y2hpbmcgbGlzdC1pdGVtIGxpbmUgZWxlbWVudHMuICovXG4gIGFic3RyYWN0IGxpbmVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj47XG5cbiAgLyoqIEVsZW1lbnQgcmVmZXJlbmNlIHJlZmVycmluZyB0byB0aGUgcHJpbWFyeSBsaXN0IGl0ZW0gdGV4dC4gKi9cbiAgYWJzdHJhY3QgX2l0ZW1UZXh0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogSG9zdCBlbGVtZW50IGZvciB0aGUgbGlzdCBpdGVtLiAqL1xuICBfaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgYXJlIGRpc2FibGVkLiAqL1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaXN0QXZhdGFyQ3NzTWF0U3R5bGVyLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgX2F2YXRhcnM6IFF1ZXJ5TGlzdDxuZXZlcj47XG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0TGlzdEljb25Dc3NNYXRTdHlsZXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfaWNvbnM6IFF1ZXJ5TGlzdDxuZXZlcj47XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVSaXBwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5fZGlzYWJsZVJpcHBsZSB8fCB0aGlzLl9saXN0QmFzZS5kaXNhYmxlUmlwcGxlIHx8XG4gICAgICAgICAgIHRoaXMuX25vb3BBbmltYXRpb25zO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgbGlzdC1pdGVtIGlzIGRpc2FibGVkLiAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkJylcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fbGlzdEJhc2UgJiYgdGhpcy5fbGlzdEJhc2UuZGlzYWJsZWQpOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIF9yaXBwbGVSZW5kZXJlcjogUmlwcGxlUmVuZGVyZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYFJpcHBsZVRhcmdldGAuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHJpcHBsZUNvbmZpZzogUmlwcGxlQ29uZmlnICYgUmlwcGxlR2xvYmFsT3B0aW9ucztcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgUmlwcGxlVGFyZ2V0YC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgZ2V0IHJpcHBsZURpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5kaXNhYmxlUmlwcGxlIHx8ICEhdGhpcy5yaXBwbGVDb25maWcuZGlzYWJsZWQ7IH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcm90ZWN0ZWQgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIF9saXN0QmFzZTogTWF0TGlzdEJhc2UsIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKVxuICAgICAgICAgICAgICAgICAgZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7XG4gICAgLy8gV2UgaGF2ZSB0byBjbG9uZSB0aGUgb2JqZWN0LCBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gbXV0YXRlIGEgZ2xvYmFsIHZhbHVlIHdoZW4gd2UgYXNzaWduXG4gICAgLy8gdGhlIGBhbmltYXRpb25gIGZ1cnRoZXIgZG93bi4gVGhlIGRvd25zaWRlIG9mIGRvaW5nIHRoaXMgaXMgdGhhdCB0aGUgcmlwcGxlIHJlbmRlcmVyIHdvbid0XG4gICAgLy8gcGljayB1cCBkeW5hbWljIGNoYW5nZXMgdG8gYGRpc2FibGVkYCwgYnV0IGl0J3Mgbm90IHNvbWV0aGluZyB3ZSBvZmZpY2lhbGx5IHN1cHBvcnQuXG4gICAgdGhpcy5yaXBwbGVDb25maWcgPSB7Li4uKGdsb2JhbFJpcHBsZU9wdGlvbnMgfHwge30pfTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9ub29wQW5pbWF0aW9ucyA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG5cbiAgICBpZiAoIXRoaXMucmlwcGxlQ29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgdGhpcy5yaXBwbGVDb25maWcuYW5pbWF0aW9uID0ge1xuICAgICAgICBlbnRlckR1cmF0aW9uOiBudW1iZXJzLkRFQUNUSVZBVElPTl9USU1FT1VUX01TLFxuICAgICAgICBleGl0RHVyYXRpb246IG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2luaXRJbnRlcmFjdGl2ZUxpc3RJdGVtKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gdHlwZSBhdHRyaWJ1dGUgaXMgc3BlY2lmaWVkIGZvciBhIGhvc3QgYDxidXR0b24+YCBlbGVtZW50LCBzZXQgaXQgdG8gYGJ1dHRvbmAuIElmIGFcbiAgICAvLyB0eXBlIGF0dHJpYnV0ZSBpcyBhbHJlYWR5IHNwZWNpZmllZCwgd2UgZG8gbm90aGluZy4gV2UgZG8gdGhpcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gVE9ETzogRGV0ZXJtaW5lIGlmIHdlIGludGVuZCB0byBjb250aW51ZSBkb2luZyB0aGlzIGZvciB0aGUgTURDLWJhc2VkIGxpc3QuXG4gICAgaWYgKHRoaXMuX2hvc3RFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdidXR0b24nICYmXG4gICAgICAgICF0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3R5cGUnKSkge1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9tb25pdG9yTGluZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5fcmlwcGxlUmVuZGVyZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLl9yZW1vdmVUcmlnZ2VyRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldHMgdGhlIGxhYmVsIGZvciB0aGUgbGlzdCBpdGVtLiBUaGlzIGlzIHVzZWQgZm9yIHRoZSB0eXBlYWhlYWQuICovXG4gIF9nZXRJdGVtTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbVRleHQgPyAodGhpcy5faXRlbVRleHQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudCB8fCAnJykgOiAnJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IGl0ZW0gaGFzIGljb25zIG9yIGF2YXRhcnMuICovXG4gIF9oYXNJY29uT3JBdmF0YXIoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuX2F2YXRhcnMubGVuZ3RoIHx8IHRoaXMuX2ljb25zLmxlbmd0aCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0SW50ZXJhY3RpdmVMaXN0SXRlbSgpIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLWxpc3QtaXRlbS1pbnRlcmFjdGl2ZScpO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyID1cbiAgICAgICAgbmV3IFJpcHBsZVJlbmRlcmVyKHRoaXMsIHRoaXMuX25nWm9uZSwgdGhpcy5faG9zdEVsZW1lbnQsIHRoaXMuX3BsYXRmb3JtKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXR1cFRyaWdnZXJFdmVudHModGhpcy5faG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiBgTWF0TGluZWAgY29udGVudCBjaGlsZHJlbiBhbmQgYW5ub3RhdGVzIHRoZW1cbiAgICogYXBwcm9wcmlhdGVseSB3aGVuIHRoZXkgY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW9uaXRvckxpbmVzKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmxpbmVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5faG9zdEVsZW1lbnQsICdtYXQtbWRjLWxpc3QtaXRlbS1zaW5nbGUtbGluZScsIGxpbmVzLmxlbmd0aCA8PSAxKTtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuX2hvc3RFbGVtZW50LCAnbWRjLWxpc3QtaXRlbS0td2l0aC1vbmUtbGluZScsIGxpbmVzLmxlbmd0aCA8PSAxKTtcblxuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogRWxlbWVudFJlZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3N0RWxlbWVudCwgJ21kYy1saXN0LWl0ZW0tLXdpdGgtdHdvLWxpbmVzJywgbGluZXMubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQsICdtZGMtbGlzdC1pdGVtLS13aXRoLXRocmVlLWxpbmVzJywgbGluZXMubGVuZ3RoID09PSAzKTtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MobGluZS5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgJ21kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCcsIGluZGV4ID09PSAwICYmIGxpbmVzLmxlbmd0aCA+IDEpO1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICAgIGxpbmUubmF0aXZlRWxlbWVudCwgJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JywgaW5kZXggIT09IDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaW5lcyhsaW5lcywgdGhpcy5fZWxlbWVudFJlZiwgJ21hdC1tZGMnKTtcbiAgICAgICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RCYXNlIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXQtbWRjLWxpc3Qtbm9uLWludGVyYWN0aXZlJylcbiAgX2lzTm9uSW50ZXJhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgZm9yIGFsbCBsaXN0IGl0ZW1zIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7IH1cbiAgc2V0IGRpc2FibGVSaXBwbGUodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIGFsbCBsaXN0IGl0ZW1zIGFyZSBkaXNhYmxlZC4gKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=