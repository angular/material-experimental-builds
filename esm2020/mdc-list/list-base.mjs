/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ContentChildren, Directive, ElementRef, Inject, Input, NgZone, Optional, QueryList, } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleRenderer, setLines, } from '@angular/material-experimental/mdc-core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatListAvatarCssMatStyler, MatListIconCssMatStyler } from './list-styling';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
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
        this.rippleConfig = globalRippleOptions || {};
        this._hostElement = this._elementRef.nativeElement;
        this._noopAnimations = animationMode === 'NoopAnimations';
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
        return (this.disabled || this._disableRipple || this._listBase.disableRipple || this._noopAnimations);
    }
    set disableRipple(value) {
        this._disableRipple = coerceBooleanProperty(value);
    }
    /** Whether the list-item is disabled. */
    get disabled() {
        return this._disabled || (this._listBase && this._listBase.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Implemented as part of `RippleTarget`.
     * @docs-private
     */
    get rippleDisabled() {
        return this.disableRipple || !!this.rippleConfig.disabled;
    }
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
        return this._itemText ? this._itemText.nativeElement.textContent || '' : '';
    }
    /** Whether the list item has icons or avatars. */
    _hasIconOrAvatar() {
        return !!(this._avatars.length || this._icons.length);
    }
    _initInteractiveListItem() {
        this._hostElement.classList.add('mat-mdc-list-item-interactive');
        this._rippleRenderer = new RippleRenderer(this, this._ngZone, this._hostElement, this._platform);
        this._rippleRenderer.setupTriggerEvents(this._hostElement);
    }
    /**
     * Subscribes to changes in `MatLine` content children and annotates them
     * appropriately when they change.
     */
    _monitorLines() {
        this._ngZone.runOutsideAngular(() => {
            this._subscriptions.add(this.lines.changes
                .pipe(startWith(this.lines))
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
MatListItemBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListItemBase, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: MatListBase }, { token: i1.Platform }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MatListItemBase, inputs: { disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mdc-list-item--disabled": "disabled", "attr.aria-disabled": "disabled" } }, queries: [{ propertyName: "_avatars", predicate: MatListAvatarCssMatStyler }, { propertyName: "_icons", predicate: MatListIconCssMatStyler }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListItemBase, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        '[class.mdc-list-item--disabled]': 'disabled',
                        '[attr.aria-disabled]': 'disabled',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: MatListBase }, { type: i1.Platform }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_RIPPLE_GLOBAL_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { _avatars: [{
                type: ContentChildren,
                args: [MatListAvatarCssMatStyler, { descendants: false }]
            }], _icons: [{
                type: ContentChildren,
                args: [MatListIconCssMatStyler, { descendants: false }]
            }], disableRipple: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
/** @docs-private */
export class MatListBase {
    constructor() {
        this._isNonInteractive = true;
        this._disableRipple = false;
        this._disabled = false;
    }
    /** Whether ripples for all list items is disabled. */
    get disableRipple() {
        return this._disableRipple;
    }
    set disableRipple(value) {
        this._disableRipple = coerceBooleanProperty(value);
    }
    /** Whether all list items are disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
}
MatListBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MatListBase, inputs: { disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mat-mdc-list-non-interactive": "_isNonInteractive", "attr.aria-disabled": "disabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MatListBase, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        '[class.mat-mdc-list-non-interactive]': '_isNonInteractive',
                        '[attr.aria-disabled]': 'disabled',
                    },
                }]
        }], propDecorators: { disableRipple: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx5QkFBeUIsRUFHekIsY0FBYyxFQUVkLFFBQVEsR0FDVCxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7QUFFbEYsU0FBUyxXQUFXLENBQUMsRUFBVyxFQUFFLFNBQWlCLEVBQUUsRUFBVztJQUM5RCxJQUFJLEVBQUUsRUFBRTtRQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO1NBQU07UUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNoQztBQUNILENBQUM7QUFRRCxvQkFBb0I7QUFDcEIsTUFBTSxPQUFnQixlQUFlO0lBc0RuQyxZQUNTLFdBQW9DLEVBQ2pDLE9BQWUsRUFDakIsU0FBc0IsRUFDdEIsU0FB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QWMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxhQUFhLENBQUMsS0FBbUI7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBR0QsMkNBQTJDO0lBQzNDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBbUI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDOzt3R0FwQm1CLFdBQVc7NEZBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQVBoQyxTQUFTO21CQUFDO29CQUNULElBQUksRUFBRTt3QkFDSixzQ0FBc0MsRUFBRSxtQkFBbUI7d0JBQzNELHNCQUFzQixFQUFFLFVBQVU7cUJBQ25DO2lCQUNGOzhCQU9LLGFBQWE7c0JBRGhCLEtBQUs7Z0JBV0YsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMsXG4gIFJpcHBsZUNvbmZpZyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgUmlwcGxlUmVuZGVyZXIsXG4gIFJpcHBsZVRhcmdldCxcbiAgc2V0TGluZXMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyfSBmcm9tICcuL2xpc3Qtc3R5bGluZyc7XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsOiBFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZywgb246IGJvb2xlYW4pIHtcbiAgaWYgKG9uKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICB9LFxufSlcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0TGlzdEl0ZW1CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBSaXBwbGVUYXJnZXQge1xuICAvKiogUXVlcnkgbGlzdCBtYXRjaGluZyBsaXN0LWl0ZW0gbGluZSBlbGVtZW50cy4gKi9cbiAgYWJzdHJhY3QgbGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PjtcblxuICAvKiogRWxlbWVudCByZWZlcmVuY2UgcmVmZXJyaW5nIHRvIHRoZSBwcmltYXJ5IGxpc3QgaXRlbSB0ZXh0LiAqL1xuICBhYnN0cmFjdCBfaXRlbVRleHQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBIb3N0IGVsZW1lbnQgZm9yIHRoZSBsaXN0IGl0ZW0uICovXG4gIF9ob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFdoZXRoZXIgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQuICovXG4gIF9ub29wQW5pbWF0aW9uczogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfYXZhdGFyczogUXVlcnlMaXN0PG5ldmVyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaXN0SWNvbkNzc01hdFN0eWxlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIF9pY29uczogUXVlcnlMaXN0PG5ldmVyPjtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5kaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2xpc3RCYXNlLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5fbm9vcEFuaW1hdGlvbnNcbiAgICApO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0LWl0ZW0gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMuX2xpc3RCYXNlICYmIHRoaXMuX2xpc3RCYXNlLmRpc2FibGVkKTtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgX3JpcHBsZVJlbmRlcmVyOiBSaXBwbGVSZW5kZXJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBSaXBwbGVUYXJnZXRgLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByaXBwbGVDb25maWc6IFJpcHBsZUNvbmZpZyAmIFJpcHBsZUdsb2JhbE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYFJpcHBsZVRhcmdldGAuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGdldCByaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlUmlwcGxlIHx8ICEhdGhpcy5yaXBwbGVDb25maWcuZGlzYWJsZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfbGlzdEJhc2U6IE1hdExpc3RCYXNlLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUylcbiAgICBnbG9iYWxSaXBwbGVPcHRpb25zPzogUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgdGhpcy5yaXBwbGVDb25maWcgPSBnbG9iYWxSaXBwbGVPcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX2hvc3RFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX25vb3BBbmltYXRpb25zID0gYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcblxuICAgIGlmICghdGhpcy5fbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2luaXRJbnRlcmFjdGl2ZUxpc3RJdGVtKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gdHlwZSBhdHRyaWJ1dGUgaXMgc3BlY2lmaWVkIGZvciBhIGhvc3QgYDxidXR0b24+YCBlbGVtZW50LCBzZXQgaXQgdG8gYGJ1dHRvbmAuIElmIGFcbiAgICAvLyB0eXBlIGF0dHJpYnV0ZSBpcyBhbHJlYWR5IHNwZWNpZmllZCwgd2UgZG8gbm90aGluZy4gV2UgZG8gdGhpcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gVE9ETzogRGV0ZXJtaW5lIGlmIHdlIGludGVuZCB0byBjb250aW51ZSBkb2luZyB0aGlzIGZvciB0aGUgTURDLWJhc2VkIGxpc3QuXG4gICAgaWYgKFxuICAgICAgdGhpcy5faG9zdEVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2J1dHRvbicgJiZcbiAgICAgICF0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3R5cGUnKVxuICAgICkge1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9tb25pdG9yTGluZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5fcmlwcGxlUmVuZGVyZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLl9yZW1vdmVUcmlnZ2VyRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldHMgdGhlIGxhYmVsIGZvciB0aGUgbGlzdCBpdGVtLiBUaGlzIGlzIHVzZWQgZm9yIHRoZSB0eXBlYWhlYWQuICovXG4gIF9nZXRJdGVtTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbVRleHQgPyB0aGlzLl9pdGVtVGV4dC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50IHx8ICcnIDogJyc7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbGlzdCBpdGVtIGhhcyBpY29ucyBvciBhdmF0YXJzLiAqL1xuICBfaGFzSWNvbk9yQXZhdGFyKCkge1xuICAgIHJldHVybiAhISh0aGlzLl9hdmF0YXJzLmxlbmd0aCB8fCB0aGlzLl9pY29ucy5sZW5ndGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEludGVyYWN0aXZlTGlzdEl0ZW0oKSB7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LW1kYy1saXN0LWl0ZW0taW50ZXJhY3RpdmUnKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlciA9IG5ldyBSaXBwbGVSZW5kZXJlcihcbiAgICAgIHRoaXMsXG4gICAgICB0aGlzLl9uZ1pvbmUsXG4gICAgICB0aGlzLl9ob3N0RWxlbWVudCxcbiAgICAgIHRoaXMuX3BsYXRmb3JtLFxuICAgICk7XG4gICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIuc2V0dXBUcmlnZ2VyRXZlbnRzKHRoaXMuX2hvc3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgaW4gYE1hdExpbmVgIGNvbnRlbnQgY2hpbGRyZW4gYW5kIGFubm90YXRlcyB0aGVtXG4gICAqIGFwcHJvcHJpYXRlbHkgd2hlbiB0aGV5IGNoYW5nZS5cbiAgICovXG4gIHByaXZhdGUgX21vbml0b3JMaW5lcygpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIHRoaXMubGluZXMuY2hhbmdlc1xuICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLmxpbmVzKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChsaW5lczogUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+KSA9PiB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLl9ob3N0RWxlbWVudCwgJ21hdC1tZGMtbGlzdC1pdGVtLXNpbmdsZS1saW5lJywgbGluZXMubGVuZ3RoIDw9IDEpO1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5faG9zdEVsZW1lbnQsICdtZGMtbGlzdC1pdGVtLS13aXRoLW9uZS1saW5lJywgbGluZXMubGVuZ3RoIDw9IDEpO1xuXG4gICAgICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lOiBFbGVtZW50UmVmPEVsZW1lbnQ+LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuX2hvc3RFbGVtZW50LCAnbWRjLWxpc3QtaXRlbS0td2l0aC10d28tbGluZXMnLCBsaW5lcy5sZW5ndGggPT09IDIpO1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLl9ob3N0RWxlbWVudCwgJ21kYy1saXN0LWl0ZW0tLXdpdGgtdGhyZWUtbGluZXMnLCBsaW5lcy5sZW5ndGggPT09IDMpO1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICBsaW5lLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgJ21kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCcsXG4gICAgICAgICAgICAgICAgaW5kZXggPT09IDAgJiYgbGluZXMubGVuZ3RoID4gMSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MobGluZS5uYXRpdmVFbGVtZW50LCAnbWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQnLCBpbmRleCAhPT0gMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldExpbmVzKGxpbmVzLCB0aGlzLl9lbGVtZW50UmVmLCAnbWF0LW1kYycpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy1saXN0LW5vbi1pbnRlcmFjdGl2ZV0nOiAnX2lzTm9uSW50ZXJhY3RpdmUnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG59KVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0QmFzZSB7XG4gIF9pc05vbkludGVyYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciByaXBwbGVzIGZvciBhbGwgbGlzdCBpdGVtcyBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVSaXBwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7XG4gIH1cbiAgc2V0IGRpc2FibGVSaXBwbGUodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciBhbGwgbGlzdCBpdGVtcyBhcmUgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbn1cbiJdfQ==