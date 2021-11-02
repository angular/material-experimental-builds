/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ContentChildren, Directive, ElementRef, HostBinding, Inject, Input, NgZone, Optional, QueryList, } from '@angular/core';
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
MatListItemBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatListItemBase, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: MatListBase }, { token: i1.Platform }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatListItemBase, inputs: { disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mdc-list-item--disabled": "this.disabled", "attr.aria-disabled": "this.disabled" } }, queries: [{ propertyName: "_avatars", predicate: MatListAvatarCssMatStyler }, { propertyName: "_icons", predicate: MatListIconCssMatStyler }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatListItemBase, decorators: [{
            type: Directive
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
                type: HostBinding,
                args: ['class.mdc-list-item--disabled']
            }, {
                type: HostBinding,
                args: ['attr.aria-disabled']
            }, {
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
MatListBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatListBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: MatListBase, inputs: { disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mat-mdc-list-non-interactive": "this._isNonInteractive", "attr.aria-disabled": "this.disabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: MatListBase, decorators: [{
            type: Directive
        }], propDecorators: { _isNonInteractive: [{
                type: HostBinding,
                args: ['class.mat-mdc-list-non-interactive']
            }], disableRipple: [{
                type: Input
            }], disabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wseUJBQXlCLEVBR3pCLGNBQWMsRUFFZCxRQUFRLEdBQ1QsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMseUJBQXlCLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRWxGLFNBQVMsV0FBVyxDQUFDLEVBQVcsRUFBRSxTQUFpQixFQUFFLEVBQVc7SUFDOUQsSUFBSSxFQUFFLEVBQUU7UUFDTixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3QjtTQUFNO1FBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBR0Qsb0JBQW9CO0FBQ3BCLE1BQU0sT0FBZ0IsZUFBZTtJQXdEbkMsWUFDUyxXQUFvQyxFQUNqQyxPQUFlLEVBQ2pCLFNBQXNC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RCxJQUFJLGFBQWEsQ0FBQyxLQUFjO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUdELDJDQUEyQztJQUMzQyxJQUVJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs2R0F0Qm1CLFdBQVc7aUdBQVgsV0FBVztnR0FBWCxXQUFXO2tCQUZoQyxTQUFTOzhCQUlSLGlCQUFpQjtzQkFEaEIsV0FBVzt1QkFBQyxvQ0FBb0M7Z0JBSzdDLGFBQWE7c0JBRGhCLEtBQUs7Z0JBWUYsUUFBUTtzQkFGWCxXQUFXO3VCQUFDLG9CQUFvQjs7c0JBQ2hDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMsXG4gIFJpcHBsZUNvbmZpZyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgUmlwcGxlUmVuZGVyZXIsXG4gIFJpcHBsZVRhcmdldCxcbiAgc2V0TGluZXMsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsIE1hdExpc3RJY29uQ3NzTWF0U3R5bGVyfSBmcm9tICcuL2xpc3Qtc3R5bGluZyc7XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsOiBFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZywgb246IGJvb2xlYW4pIHtcbiAgaWYgKG9uKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0TGlzdEl0ZW1CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBSaXBwbGVUYXJnZXQge1xuICAvKiogUXVlcnkgbGlzdCBtYXRjaGluZyBsaXN0LWl0ZW0gbGluZSBlbGVtZW50cy4gKi9cbiAgYWJzdHJhY3QgbGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PjtcblxuICAvKiogRWxlbWVudCByZWZlcmVuY2UgcmVmZXJyaW5nIHRvIHRoZSBwcmltYXJ5IGxpc3QgaXRlbSB0ZXh0LiAqL1xuICBhYnN0cmFjdCBfaXRlbVRleHQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBIb3N0IGVsZW1lbnQgZm9yIHRoZSBsaXN0IGl0ZW0uICovXG4gIF9ob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFdoZXRoZXIgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQuICovXG4gIF9ub29wQW5pbWF0aW9uczogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKE1hdExpc3RBdmF0YXJDc3NNYXRTdHlsZXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfYXZhdGFyczogUXVlcnlMaXN0PG5ldmVyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaXN0SWNvbkNzc01hdFN0eWxlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIF9pY29uczogUXVlcnlMaXN0PG5ldmVyPjtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5kaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2xpc3RCYXNlLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5fbm9vcEFuaW1hdGlvbnNcbiAgICApO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0LWl0ZW0gaXMgZGlzYWJsZWQuICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQnKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMuX2xpc3RCYXNlICYmIHRoaXMuX2xpc3RCYXNlLmRpc2FibGVkKTtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIF9yaXBwbGVSZW5kZXJlcjogUmlwcGxlUmVuZGVyZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgUmlwcGxlVGFyZ2V0YC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmlwcGxlQ29uZmlnOiBSaXBwbGVDb25maWcgJiBSaXBwbGVHbG9iYWxPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBSaXBwbGVUYXJnZXRgLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgcmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZVJpcHBsZSB8fCAhIXRoaXMucmlwcGxlQ29uZmlnLmRpc2FibGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcm90ZWN0ZWQgX25nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX2xpc3RCYXNlOiBNYXRMaXN0QmFzZSxcbiAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMpXG4gICAgZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICkge1xuICAgIHRoaXMucmlwcGxlQ29uZmlnID0gZ2xvYmFsUmlwcGxlT3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9ub29wQW5pbWF0aW9ucyA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RCYXNlLl9pc05vbkludGVyYWN0aXZlKSB7XG4gICAgICB0aGlzLl9pbml0SW50ZXJhY3RpdmVMaXN0SXRlbSgpO1xuICAgIH1cblxuICAgIC8vIElmIG5vIHR5cGUgYXR0cmlidXRlIGlzIHNwZWNpZmllZCBmb3IgYSBob3N0IGA8YnV0dG9uPmAgZWxlbWVudCwgc2V0IGl0IHRvIGBidXR0b25gLiBJZiBhXG4gICAgLy8gdHlwZSBhdHRyaWJ1dGUgaXMgYWxyZWFkeSBzcGVjaWZpZWQsIHdlIGRvIG5vdGhpbmcuIFdlIGRvIHRoaXMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIC8vIFRPRE86IERldGVybWluZSBpZiB3ZSBpbnRlbmQgdG8gY29udGludWUgZG9pbmcgdGhpcyBmb3IgdGhlIE1EQy1iYXNlZCBsaXN0LlxuICAgIGlmIChcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdidXR0b24nICYmXG4gICAgICAhdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCd0eXBlJylcbiAgICApIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fbW9uaXRvckxpbmVzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuX3JpcHBsZVJlbmRlcmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5fcmVtb3ZlVHJpZ2dlckV2ZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBsYWJlbCBmb3IgdGhlIGxpc3QgaXRlbS4gVGhpcyBpcyB1c2VkIGZvciB0aGUgdHlwZWFoZWFkLiAqL1xuICBfZ2V0SXRlbUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1UZXh0ID8gdGhpcy5faXRlbVRleHQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudCB8fCAnJyA6ICcnO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxpc3QgaXRlbSBoYXMgaWNvbnMgb3IgYXZhdGFycy4gKi9cbiAgX2hhc0ljb25PckF2YXRhcigpIHtcbiAgICByZXR1cm4gISEodGhpcy5fYXZhdGFycy5sZW5ndGggfHwgdGhpcy5faWNvbnMubGVuZ3RoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRJbnRlcmFjdGl2ZUxpc3RJdGVtKCkge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtbGlzdC1pdGVtLWludGVyYWN0aXZlJyk7XG4gICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIgPSBuZXcgUmlwcGxlUmVuZGVyZXIoXG4gICAgICB0aGlzLFxuICAgICAgdGhpcy5fbmdab25lLFxuICAgICAgdGhpcy5faG9zdEVsZW1lbnQsXG4gICAgICB0aGlzLl9wbGF0Zm9ybSxcbiAgICApO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLnNldHVwVHJpZ2dlckV2ZW50cyh0aGlzLl9ob3N0RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byBjaGFuZ2VzIGluIGBNYXRMaW5lYCBjb250ZW50IGNoaWxkcmVuIGFuZCBhbm5vdGF0ZXMgdGhlbVxuICAgKiBhcHByb3ByaWF0ZWx5IHdoZW4gdGhleSBjaGFuZ2UuXG4gICAqL1xuICBwcml2YXRlIF9tb25pdG9yTGluZXMoKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgICB0aGlzLmxpbmVzLmNoYW5nZXNcbiAgICAgICAgICAucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5faG9zdEVsZW1lbnQsICdtYXQtbWRjLWxpc3QtaXRlbS1zaW5nbGUtbGluZScsIGxpbmVzLmxlbmd0aCA8PSAxKTtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuX2hvc3RFbGVtZW50LCAnbWRjLWxpc3QtaXRlbS0td2l0aC1vbmUtbGluZScsIGxpbmVzLmxlbmd0aCA8PSAxKTtcblxuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogRWxlbWVudFJlZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLl9ob3N0RWxlbWVudCwgJ21kYy1saXN0LWl0ZW0tLXdpdGgtdHdvLWxpbmVzJywgbGluZXMubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5faG9zdEVsZW1lbnQsICdtZGMtbGlzdC1pdGVtLS13aXRoLXRocmVlLWxpbmVzJywgbGluZXMubGVuZ3RoID09PSAzKTtcbiAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgbGluZS5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICdtZGMtbGlzdC1pdGVtX19wcmltYXJ5LXRleHQnLFxuICAgICAgICAgICAgICAgIGluZGV4ID09PSAwICYmIGxpbmVzLmxlbmd0aCA+IDEsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGxpbmUubmF0aXZlRWxlbWVudCwgJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JywgaW5kZXggIT09IDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaW5lcyhsaW5lcywgdGhpcy5fZWxlbWVudFJlZiwgJ21hdC1tZGMnKTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cblxuQERpcmVjdGl2ZSgpXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RCYXNlIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXQtbWRjLWxpc3Qtbm9uLWludGVyYWN0aXZlJylcbiAgX2lzTm9uSW50ZXJhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgZm9yIGFsbCBsaXN0IGl0ZW1zIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVJpcHBsZTtcbiAgfVxuICBzZXQgZGlzYWJsZVJpcHBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVSaXBwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciBhbGwgbGlzdCBpdGVtcyBhcmUgZGlzYWJsZWQuICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJylcbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVSaXBwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==