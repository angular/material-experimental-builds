/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-slide-toggle/slide-toggle-config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * Default `mat-slide-toggle` options that can be overridden.
 * @record
 */
export function MatSlideToggleDefaultOptions() { }
if (false) {
    /**
     * Whether toggle action triggers value changes in slide toggle.
     * @type {?|undefined}
     */
    MatSlideToggleDefaultOptions.prototype.disableToggleValue;
    /**
     * Whether drag action triggers value changes in slide toggle.
     * @deprecated No longer being used.
     * \@breaking-change 9.0.0.
     * @type {?|undefined}
     */
    MatSlideToggleDefaultOptions.prototype.disableDragValue;
}
/**
 * Injection token to be used to override the default options for `mat-slide-toggle`.
 * @type {?}
 */
export const MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken('mat-slide-toggle-default-options', {
    providedIn: 'root',
    factory: (/**
     * @return {?}
     */
    () => ({ disableToggleValue: false, disableDragValue: false }))
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXNsaWRlLXRvZ2dsZS9zbGlkZS10b2dnbGUtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSTdDLGtEQVNDOzs7Ozs7SUFQQywwREFBNkI7Ozs7Ozs7SUFNN0Isd0RBQTJCOzs7Ozs7QUFJN0IsTUFBTSxPQUFPLGdDQUFnQyxHQUMzQyxJQUFJLGNBQWMsQ0FBK0Isa0NBQWtDLEVBQUU7SUFDbkYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTzs7O0lBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO0NBQ3RFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKiBEZWZhdWx0IGBtYXQtc2xpZGUtdG9nZ2xlYCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFNsaWRlVG9nZ2xlRGVmYXVsdE9wdGlvbnMge1xuICAvKiogV2hldGhlciB0b2dnbGUgYWN0aW9uIHRyaWdnZXJzIHZhbHVlIGNoYW5nZXMgaW4gc2xpZGUgdG9nZ2xlLiAqL1xuICBkaXNhYmxlVG9nZ2xlVmFsdWU/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciBkcmFnIGFjdGlvbiB0cmlnZ2VycyB2YWx1ZSBjaGFuZ2VzIGluIHNsaWRlIHRvZ2dsZS5cbiAgICogQGRlcHJlY2F0ZWQgTm8gbG9uZ2VyIGJlaW5nIHVzZWQuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgOS4wLjAuXG4gICAqL1xuICBkaXNhYmxlRHJhZ1ZhbHVlPzogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIGBtYXQtc2xpZGUtdG9nZ2xlYC4gKi9cbmV4cG9ydCBjb25zdCBNQVRfU0xJREVfVE9HR0xFX0RFRkFVTFRfT1BUSU9OUyA9XG4gIG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRTbGlkZVRvZ2dsZURlZmF1bHRPcHRpb25zPignbWF0LXNsaWRlLXRvZ2dsZS1kZWZhdWx0LW9wdGlvbnMnLCB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3Rvcnk6ICgpID0+ICh7ZGlzYWJsZVRvZ2dsZVZhbHVlOiBmYWxzZSwgZGlzYWJsZURyYWdWYWx1ZTogZmFsc2V9KVxuICB9KTtcbiJdfQ==