/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple } from '@angular/material-experimental/mdc-core';
import { numbers } from '@material/ripple';
/** Inputs common to all buttons. */
export const MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/** Shared host configuration for all buttons */
export const MAT_BUTTON_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons.
    '[class.mat-mdc-button-base]': 'true',
};
/** Configuration for the ripple animation. */
const RIPPLE_ANIMATION_CONFIG = {
    enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
    exitDuration: numbers.FG_DEACTIVATION_MS
};
/** List of classes to add to buttons instances based on host attribute selector. */
const HOST_SELECTOR_MDC_CLASS_PAIR = [
    {
        selector: 'mat-button',
        mdcClasses: ['mdc-button', 'mat-mdc-button'],
    },
    {
        selector: 'mat-flat-button',
        mdcClasses: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button'],
    },
    {
        selector: 'mat-raised-button',
        mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    },
    {
        selector: 'mat-stroked-button',
        mdcClasses: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
    },
    {
        selector: 'mat-fab',
        mdcClasses: ['mdc-fab', 'mat-mdc-fab'],
    },
    {
        selector: 'mat-mini-fab',
        mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
    },
    {
        selector: 'mat-icon-button',
        mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
    }
];
// Boilerplate for applying mixins to MatButton.
/** @docs-private */
export class MatButtonMixinCore {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
export const _MatButtonBaseMixin = mixinColor(mixinDisabled(mixinDisableRipple(MatButtonMixinCore)));
/** Base class for all buttons.  */
export class MatButtonBase extends _MatButtonBaseMixin {
    constructor(elementRef, _platform, _ngZone, _animationMode) {
        super(elementRef);
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._animationMode = _animationMode;
        /** The ripple animation configuration to use for the buttons. */
        this._rippleAnimation = this._animationMode === 'NoopAnimations' ?
            { enterDuration: 0, exitDuration: 0 } :
            RIPPLE_ANIMATION_CONFIG;
        /** Whether the ripple is centered on the button. */
        this._isRippleCentered = false;
        const classList = elementRef.nativeElement.classList;
        // For each of the variant selectors that is present in the button's host
        // attributes, add the correct corresponding MDC classes.
        for (const pair of HOST_SELECTOR_MDC_CLASS_PAIR) {
            if (this._hasHostAttributes(pair.selector)) {
                pair.mdcClasses.forEach((className) => {
                    classList.add(className);
                });
            }
        }
    }
    /** Focuses the button. */
    focus(_origin = 'program', options) {
        this._elementRef.nativeElement.focus(options);
    }
    /** Gets whether the button has one of the given attributes. */
    _hasHostAttributes(...attributes) {
        return attributes.some(attribute => this._elementRef.nativeElement.hasAttribute(attribute));
    }
    _isRippleDisabled() {
        return this.disableRipple || this.disabled;
    }
}
MatButtonBase.decorators = [
    { type: Directive }
];
MatButtonBase.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String }
];
MatButtonBase.propDecorators = {
    ripple: [{ type: ViewChild, args: [MatRipple,] }]
};
/** Shared inputs by buttons using the `<a>` tag */
export const MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/** Shared host configuration for buttons using the `<a>` tag. */
export const MAT_ANCHOR_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // Note that we ignore the user-specified tabindex when it's disabled for
    // consistency with the `mat-button` applied on native buttons where even
    // though they have an index, they're not tabbable.
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
    '[attr.aria-disabled]': 'disabled.toString()',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons.
    '[class.mat-mdc-button-base]': 'true',
};
/**
 * Anchor button base.
 */
export class MatAnchorBase extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(mmalerba): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    _haltDisabledEvents(event) {
        // A disabled button shouldn't apply any actions
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
MatAnchorBase.decorators = [
    { type: Directive }
];
MatAnchorBase.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String }
];
MatAnchorBase.propDecorators = {
    _haltDisabledEvents: [{ type: HostListener, args: ['click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1idXR0b24vYnV0dG9uLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFPTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGFBQWEsRUFDYixrQkFBa0IsRUFFbkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHekMsb0NBQW9DO0FBQ3BDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV4RSxnREFBZ0Q7QUFDaEQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHO0lBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjtJQUNyQyxpQ0FBaUMsRUFBRSxxQ0FBcUM7SUFDeEUsMEZBQTBGO0lBQzFGLHNGQUFzRjtJQUN0RixpQ0FBaUM7SUFDakMsc0JBQXNCLEVBQUUsUUFBUTtJQUNoQyxzRkFBc0Y7SUFDdEYsd0NBQXdDO0lBQ3hDLDZCQUE2QixFQUFFLE1BQU07Q0FDdEMsQ0FBQztBQUVGLDhDQUE4QztBQUM5QyxNQUFNLHVCQUF1QixHQUEwQjtJQUNyRCxhQUFhLEVBQUUsT0FBTyxDQUFDLHVCQUF1QjtJQUM5QyxZQUFZLEVBQUUsT0FBTyxDQUFDLGtCQUFrQjtDQUN6QyxDQUFDO0FBRUYsb0ZBQW9GO0FBQ3BGLE1BQU0sNEJBQTRCLEdBQStDO0lBQy9FO1FBQ0UsUUFBUSxFQUFFLFlBQVk7UUFDdEIs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UUFBUTtZQUM2QixNQUFNOzs7O2tDQTJLaEQsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBOZ1pvbmUsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYW5Db2xvcixcbiAgQ2FuQ29sb3JDdG9yLFxuICBDYW5EaXNhYmxlLFxuICBDYW5EaXNhYmxlQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIE1hdFJpcHBsZSxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxuICBSaXBwbGVBbmltYXRpb25Db25maWdcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1jb3JlJztcbmltcG9ydCB7bnVtYmVyc30gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZSc7XG5pbXBvcnQge0ZvY3VzT3JpZ2lufSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5cbi8qKiBJbnB1dHMgY29tbW9uIHRvIGFsbCBidXR0b25zLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9CVVRUT05fSU5QVVRTID0gWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ2NvbG9yJ107XG5cbi8qKiBTaGFyZWQgaG9zdCBjb25maWd1cmF0aW9uIGZvciBhbGwgYnV0dG9ucyAqL1xuZXhwb3J0IGNvbnN0IE1BVF9CVVRUT05fSE9TVCA9IHtcbiAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gIC8vIE1EQyBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIHByaW1hcnkgdGhlbWUgY29sb3IgdG8gdGhlIGJ1dHRvbiwgYnV0IHdlIHdhbnQgdG8gc3VwcG9ydFxuICAvLyBhbiB1bnRoZW1lZCB2ZXJzaW9uLiBJZiBjb2xvciBpcyB1bmRlZmluZWQsIGFwcGx5IGEgQ1NTIGNsYXNzIHRoYXQgbWFrZXMgaXQgZWFzeSB0b1xuICAvLyBzZWxlY3QgYW5kIHN0eWxlIHRoaXMgXCJ0aGVtZVwiLlxuICAnW2NsYXNzLm1hdC11bnRoZW1lZF0nOiAnIWNvbG9yJyxcbiAgLy8gQWRkIGEgY2xhc3MgdGhhdCBhcHBsaWVzIHRvIGFsbCBidXR0b25zLiBUaGlzIG1ha2VzIGl0IGVhc2llciB0byB0YXJnZXQgaWYgc29tZWJvZHlcbiAgLy8gd2FudHMgdG8gdGFyZ2V0IGFsbCBNYXRlcmlhbCBidXR0b25zLlxuICAnW2NsYXNzLm1hdC1tZGMtYnV0dG9uLWJhc2VdJzogJ3RydWUnLFxufTtcblxuLyoqIENvbmZpZ3VyYXRpb24gZm9yIHRoZSByaXBwbGUgYW5pbWF0aW9uLiAqL1xuY29uc3QgUklQUExFX0FOSU1BVElPTl9DT05GSUc6IFJpcHBsZUFuaW1hdGlvbkNvbmZpZyA9IHtcbiAgZW50ZXJEdXJhdGlvbjogbnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUyxcbiAgZXhpdER1cmF0aW9uOiBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NU1xufTtcblxuLyoqIExpc3Qgb2YgY2xhc3NlcyB0byBhZGQgdG8gYnV0dG9ucyBpbnN0YW5jZXMgYmFzZWQgb24gaG9zdCBhdHRyaWJ1dGUgc2VsZWN0b3IuICovXG5jb25zdCBIT1NUX1NFTEVDVE9SX01EQ19DTEFTU19QQUlSOiB7c2VsZWN0b3I6IHN0cmluZywgbWRjQ2xhc3Nlczogc3RyaW5nW119W10gPSBbXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtYXQtbWRjLWJ1dHRvbiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtZmxhdC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtZGMtYnV0dG9uLS11bmVsZXZhdGVkJywgJ21hdC1tZGMtdW5lbGV2YXRlZC1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LXJhaXNlZC1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWJ1dHRvbicsICdtZGMtYnV0dG9uLS1yYWlzZWQnLCAnbWF0LW1kYy1yYWlzZWQtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1zdHJva2VkLWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21kYy1idXR0b24tLW91dGxpbmVkJywgJ21hdC1tZGMtb3V0bGluZWQtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1mYWInLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWZhYicsICdtYXQtbWRjLWZhYiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtbWluaS1mYWInLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWZhYicsICdtZGMtZmFiLS1taW5pJywgJ21hdC1tZGMtbWluaS1mYWInXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWljb24tYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1pY29uLWJ1dHRvbicsICdtYXQtbWRjLWljb24tYnV0dG9uJ10sXG4gIH1cbl07XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0QnV0dG9uLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNYXRCdXR0b25NaXhpbkNvcmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbmV4cG9ydCBjb25zdCBfTWF0QnV0dG9uQmFzZU1peGluOiBDYW5EaXNhYmxlUmlwcGxlQ3RvciZDYW5EaXNhYmxlQ3RvciZDYW5Db2xvckN0b3ImXG4gICAgdHlwZW9mIE1hdEJ1dHRvbk1peGluQ29yZSA9IG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChtaXhpbkRpc2FibGVSaXBwbGUoTWF0QnV0dG9uTWl4aW5Db3JlKSkpO1xuXG4vKiogQmFzZSBjbGFzcyBmb3IgYWxsIGJ1dHRvbnMuICAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uQmFzZSBleHRlbmRzIF9NYXRCdXR0b25CYXNlTWl4aW4gaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBDYW5Db2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbkRpc2FibGVSaXBwbGUge1xuICAvKiogVGhlIHJpcHBsZSBhbmltYXRpb24gY29uZmlndXJhdGlvbiB0byB1c2UgZm9yIHRoZSBidXR0b25zLiAqL1xuICBfcmlwcGxlQW5pbWF0aW9uOiBSaXBwbGVBbmltYXRpb25Db25maWcgPVxuICAgICAgdGhpcy5fYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJyA/XG4gICAgICAgICAge2VudGVyRHVyYXRpb246IDAsIGV4aXREdXJhdGlvbjogMH0gOlxuICAgICAgICAgIFJJUFBMRV9BTklNQVRJT05fQ09ORklHO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgaXMgY2VudGVyZWQgb24gdGhlIGJ1dHRvbi4gKi9cbiAgX2lzUmlwcGxlQ2VudGVyZWQgPSBmYWxzZTtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBNYXRSaXBwbGUgaW5zdGFuY2Ugb2YgdGhlIGJ1dHRvbi4gKi9cbiAgQFZpZXdDaGlsZChNYXRSaXBwbGUpIHJpcHBsZTogTWF0UmlwcGxlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHVibGljIF9wbGF0Zm9ybTogUGxhdGZvcm0sIHB1YmxpYyBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBwdWJsaWMgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IChlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdDtcblxuICAgIC8vIEZvciBlYWNoIG9mIHRoZSB2YXJpYW50IHNlbGVjdG9ycyB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIGJ1dHRvbidzIGhvc3RcbiAgICAvLyBhdHRyaWJ1dGVzLCBhZGQgdGhlIGNvcnJlY3QgY29ycmVzcG9uZGluZyBNREMgY2xhc3Nlcy5cbiAgICBmb3IgKGNvbnN0IHBhaXIgb2YgSE9TVF9TRUxFQ1RPUl9NRENfQ0xBU1NfUEFJUikge1xuICAgICAgaWYgKHRoaXMuX2hhc0hvc3RBdHRyaWJ1dGVzKHBhaXIuc2VsZWN0b3IpKSB7XG4gICAgICAgIHBhaXIubWRjQ2xhc3Nlcy5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGJ1dHRvbi4gKi9cbiAgZm9jdXMoX29yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScsIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBidXR0b24gaGFzIG9uZSBvZiB0aGUgZ2l2ZW4gYXR0cmlidXRlcy4gKi9cbiAgcHJpdmF0ZSBfaGFzSG9zdEF0dHJpYnV0ZXMoLi4uYXR0cmlidXRlczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gYXR0cmlidXRlcy5zb21lKGF0dHJpYnV0ZSA9PiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpO1xuICB9XG5cbiAgX2lzUmlwcGxlRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZVJpcHBsZSB8fCB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBCb29sZWFuSW5wdXQ7XG59XG5cbi8qKiBTaGFyZWQgaW5wdXRzIGJ5IGJ1dHRvbnMgdXNpbmcgdGhlIGA8YT5gIHRhZyAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BTkNIT1JfSU5QVVRTID0gWydkaXNhYmxlZCcsICdkaXNhYmxlUmlwcGxlJywgJ2NvbG9yJywgJ3RhYkluZGV4J107XG5cbi8qKiBTaGFyZWQgaG9zdCBjb25maWd1cmF0aW9uIGZvciBidXR0b25zIHVzaW5nIHRoZSBgPGE+YCB0YWcuICovXG5leHBvcnQgY29uc3QgTUFUX0FOQ0hPUl9IT1NUID0ge1xuICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcblxuICAvLyBOb3RlIHRoYXQgd2UgaWdub3JlIHRoZSB1c2VyLXNwZWNpZmllZCB0YWJpbmRleCB3aGVuIGl0J3MgZGlzYWJsZWQgZm9yXG4gIC8vIGNvbnNpc3RlbmN5IHdpdGggdGhlIGBtYXQtYnV0dG9uYCBhcHBsaWVkIG9uIG5hdGl2ZSBidXR0b25zIHdoZXJlIGV2ZW5cbiAgLy8gdGhvdWdoIHRoZXkgaGF2ZSBhbiBpbmRleCwgdGhleSdyZSBub3QgdGFiYmFibGUuXG4gICdbYXR0ci50YWJpbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6ICh0YWJJbmRleCB8fCAwKScsXG4gICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgLy8gTURDIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgcHJpbWFyeSB0aGVtZSBjb2xvciB0byB0aGUgYnV0dG9uLCBidXQgd2Ugd2FudCB0byBzdXBwb3J0XG4gIC8vIGFuIHVudGhlbWVkIHZlcnNpb24uIElmIGNvbG9yIGlzIHVuZGVmaW5lZCwgYXBwbHkgYSBDU1MgY2xhc3MgdGhhdCBtYWtlcyBpdCBlYXN5IHRvXG4gIC8vIHNlbGVjdCBhbmQgc3R5bGUgdGhpcyBcInRoZW1lXCIuXG4gICdbY2xhc3MubWF0LXVudGhlbWVkXSc6ICchY29sb3InLFxuICAvLyBBZGQgYSBjbGFzcyB0aGF0IGFwcGxpZXMgdG8gYWxsIGJ1dHRvbnMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIHRhcmdldCBpZiBzb21lYm9keVxuICAvLyB3YW50cyB0byB0YXJnZXQgYWxsIE1hdGVyaWFsIGJ1dHRvbnMuXG4gICdbY2xhc3MubWF0LW1kYy1idXR0b24tYmFzZV0nOiAndHJ1ZScsXG59O1xuXG4vKipcbiAqIEFuY2hvciBidXR0b24gYmFzZS5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWF0QW5jaG9yQmFzZSBleHRlbmRzIE1hdEJ1dHRvbkJhc2Uge1xuICB0YWJJbmRleDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHBsYXRmb3JtOiBQbGF0Zm9ybSwgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBwbGF0Zm9ybSwgbmdab25lLCBhbmltYXRpb25Nb2RlKTtcbiAgfVxuXG4gIC8vIFdlIGhhdmUgdG8gdXNlIGEgYEhvc3RMaXN0ZW5lcmAgaGVyZSBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggSXZ5IGFuZCBWaWV3RW5naW5lLlxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBiaW5kaW5ncyB3aWxsIGJlIG1lcmdlZCB3aGVuIHRoaXMgY2xhc3MgaXMgZXh0ZW5kZWQsIHdoZXJlYXMgaW5cbiAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAvLyBUT0RPKG1tYWxlcmJhKTogd2UgbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAgb25jZSBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIF9oYWx0RGlzYWJsZWRFdmVudHMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgLy8gQSBkaXNhYmxlZCBidXR0b24gc2hvdWxkbid0IGFwcGx5IGFueSBhY3Rpb25zXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==