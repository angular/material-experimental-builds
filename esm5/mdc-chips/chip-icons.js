/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from "tslib";
import { ChangeDetectorRef, Directive, ElementRef, } from '@angular/core';
import { mixinDisabled, mixinTabIndex, } from '@angular/material/core';
import { Subject } from 'rxjs';
/**
 * Directive to add CSS classes to chip leading icon.
 * @docs-private
 */
var MatChipAvatar = /** @class */ (function () {
    function MatChipAvatar(_changeDetectorRef, _elementRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
    }
    /** Sets whether the given CSS class should be applied to the leading icon. */
    MatChipAvatar.prototype.setClass = function (cssClass, active) {
        this._elementRef.nativeElement.classList.toggle(cssClass, active);
        this._changeDetectorRef.markForCheck();
    };
    MatChipAvatar.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: {
                        'class': 'mat-mdc-chip-avatar mdc-chip__icon mdc-chip__icon--leading',
                        'role': 'img'
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipAvatar.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return MatChipAvatar;
}());
export { MatChipAvatar };
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * @docs-private
 */
var MatChipTrailingIcon = /** @class */ (function () {
    function MatChipTrailingIcon(_elementRef) {
        this._elementRef = _elementRef;
    }
    MatChipTrailingIcon.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    /** Sets an attribute on the icon. */
    MatChipTrailingIcon.prototype.setAttribute = function (name, value) {
        this._elementRef.nativeElement.setAttribute(name, value);
    };
    MatChipTrailingIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: {
                        'class': 'mat-mdc-chip-trailing-icon mdc-chip__icon mdc-chip__icon--trailing',
                        'tabindex': '-1',
                        'aria-hidden': 'true',
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipTrailingIcon.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return MatChipTrailingIcon;
}());
export { MatChipTrailingIcon };
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * @docs-private
 */
var MatChipRemoveBase = /** @class */ (function (_super) {
    __extends(MatChipRemoveBase, _super);
    function MatChipRemoveBase(_elementRef) {
        return _super.call(this, _elementRef) || this;
    }
    return MatChipRemoveBase;
}(MatChipTrailingIcon));
var _MatChipRemoveMixinBase = mixinTabIndex(mixinDisabled(MatChipRemoveBase), 0);
/**
 * Directive to remove the parent chip when the trailing icon is clicked or
 * when the ENTER key is pressed on it.
 *
 * Recommended for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 * ```
 * <mat-chip>
 *   <mat-icon matChipRemove>cancel</mat-icon>
 * </mat-chip>
 * ```
 */
var MatChipRemove = /** @class */ (function (_super) {
    __extends(MatChipRemove, _super);
    function MatChipRemove(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        /**
         * Emits when the user interacts with the icon.
         * @docs-private
         */
        _this.interaction = new Subject();
        if (elementRef.nativeElement.nodeName === 'BUTTON') {
            elementRef.nativeElement.setAttribute('type', 'button');
        }
        return _this;
    }
    MatChipRemove.decorators = [
        { type: Directive, args: [{
                    selector: '[matChipRemove]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': "mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-mdc-focus-indicator\n        mdc-chip__icon mdc-chip__icon--trailing",
                        '[tabIndex]': 'tabIndex',
                        'role': 'button',
                        '(click)': 'interaction.next($event)',
                        '(keydown)': 'interaction.next($event)',
                        // We need to remove this explicitly, because it gets inherited from MatChipTrailingIcon.
                        '[attr.aria-hidden]': 'null',
                    }
                },] }
    ];
    /** @nocollapse */
    MatChipRemove.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return MatChipRemove;
}(_MatChipRemoveMixinBase));
export { MatChipRemove };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNoaXBzL2NoaXAtaWNvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsR0FDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBS0wsYUFBYSxFQUNiLGFBQWEsR0FDZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHN0I7OztHQUdHO0FBQ0g7SUFRRSx1QkFBb0Isa0JBQXFDLEVBQ3JDLFdBQW9DO1FBRHBDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO0lBQUcsQ0FBQztJQUU1RCw4RUFBOEU7SUFDOUUsZ0NBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsTUFBZTtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Z0JBZkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsNERBQTREO3dCQUNyRSxNQUFNLEVBQUUsS0FBSztxQkFDZDtpQkFDRjs7OztnQkF6QkMsaUJBQWlCO2dCQUVqQixVQUFVOztJQWlDWixvQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBVFksYUFBYTtBQVcxQjs7O0dBR0c7QUFDSDtJQVNFLDZCQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFFOUMsbUNBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsMENBQVksR0FBWixVQUFhLElBQVksRUFBRSxLQUFhO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Z0JBbEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLG9FQUFvRTt3QkFDN0UsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLGFBQWEsRUFBRSxNQUFNO3FCQUN0QjtpQkFDRjs7OztnQkE5Q0MsVUFBVTs7SUEwRFosMEJBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQVhZLG1CQUFtQjtBQWFoQzs7O0dBR0c7QUFDSDtJQUFnQyxxQ0FBbUI7SUFDakQsMkJBQVksV0FBdUI7ZUFDakMsa0JBQU0sV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFKRCxDQUFnQyxtQkFBbUIsR0FJbEQ7QUFFRCxJQUFNLHVCQUF1QixHQUl6QixhQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSDtJQWVtQyxpQ0FBdUI7SUFPeEQsdUJBQVksVUFBc0I7UUFBbEMsWUFDRSxrQkFBTSxVQUFVLENBQUMsU0FLbEI7UUFaRDs7O1dBR0c7UUFDSCxpQkFBVyxHQUF3QyxJQUFJLE9BQU8sRUFBOEIsQ0FBQztRQUszRixJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNsRCxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDekQ7O0lBQ0gsQ0FBQzs7Z0JBNUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLHlIQUNtQzt3QkFDNUMsWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixTQUFTLEVBQUUsMEJBQTBCO3dCQUNyQyxXQUFXLEVBQUUsMEJBQTBCO3dCQUV2Qyx5RkFBeUY7d0JBQ3pGLG9CQUFvQixFQUFFLE1BQU07cUJBQzdCO2lCQUNGOzs7O2dCQXpHQyxVQUFVOztJQTBIWixvQkFBQztDQUFBLEFBL0JELENBZW1DLHVCQUF1QixHQWdCekQ7U0FoQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIEhhc1RhYkluZGV4LFxuICBIYXNUYWJJbmRleEN0b3IsXG4gIG1peGluRGlzYWJsZWQsXG4gIG1peGluVGFiSW5kZXgsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgQ1NTIGNsYXNzZXMgdG8gY2hpcCBsZWFkaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLWF2YXRhciwgW21hdENoaXBBdmF0YXJdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtYXZhdGFyIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS1sZWFkaW5nJyxcbiAgICAncm9sZSc6ICdpbWcnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEF2YXRhciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgLyoqIFNldHMgd2hldGhlciB0aGUgZ2l2ZW4gQ1NTIGNsYXNzIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBsZWFkaW5nIGljb24uICovXG4gIHNldENsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNzc0NsYXNzLCBhY3RpdmUpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGFkZCBDU1MgY2xhc3NlcyB0byBhbmQgY29uZmlndXJlIGF0dHJpYnV0ZXMgZm9yIGNoaXAgdHJhaWxpbmcgaWNvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtdHJhaWxpbmctaWNvbiwgW21hdENoaXBUcmFpbGluZ0ljb25dJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWNoaXAtdHJhaWxpbmctaWNvbiBtZGMtY2hpcF9faWNvbiBtZGMtY2hpcF9faWNvbi0tdHJhaWxpbmcnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBUcmFpbGluZ0ljb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogU2V0cyBhbiBhdHRyaWJ1dGUgb24gdGhlIGljb24uICovXG4gIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcFJlbW92ZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuY2xhc3MgTWF0Q2hpcFJlbW92ZUJhc2UgZXh0ZW5kcyBNYXRDaGlwVHJhaWxpbmdJY29uIHtcbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihfZWxlbWVudFJlZik7XG4gIH1cbn1cblxuY29uc3QgX01hdENoaXBSZW1vdmVNaXhpbkJhc2U6XG4gIENhbkRpc2FibGVDdG9yICZcbiAgSGFzVGFiSW5kZXhDdG9yICZcbiAgdHlwZW9mIE1hdENoaXBSZW1vdmVCYXNlID1cbiAgICBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWF0Q2hpcFJlbW92ZUJhc2UpLCAwKTtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gcmVtb3ZlIHRoZSBwYXJlbnQgY2hpcCB3aGVuIHRoZSB0cmFpbGluZyBpY29uIGlzIGNsaWNrZWQgb3JcbiAqIHdoZW4gdGhlIEVOVEVSIGtleSBpcyBwcmVzc2VkIG9uIGl0LlxuICpcbiAqIFJlY29tbWVuZGVkIGZvciB1c2Ugd2l0aCB0aGUgTWF0ZXJpYWwgRGVzaWduIFwiY2FuY2VsXCIgaWNvblxuICogYXZhaWxhYmxlIGF0IGh0dHBzOi8vbWF0ZXJpYWwuaW8vaWNvbnMvI2ljX2NhbmNlbC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogPG1hdC1jaGlwPlxuICogICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICogPC9tYXQtY2hpcD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcFJlbW92ZV0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6IGBtYXQtbWRjLWNoaXAtcmVtb3ZlIG1hdC1tZGMtY2hpcC10cmFpbGluZy1pY29uIG1hdC1tZGMtZm9jdXMtaW5kaWNhdG9yXG4gICAgICAgIG1kYy1jaGlwX19pY29uIG1kYy1jaGlwX19pY29uLS10cmFpbGluZ2AsXG4gICAgJ1t0YWJJbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICdyb2xlJzogJ2J1dHRvbicsXG4gICAgJyhjbGljayknOiAnaW50ZXJhY3Rpb24ubmV4dCgkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ2ludGVyYWN0aW9uLm5leHQoJGV2ZW50KScsXG5cbiAgICAvLyBXZSBuZWVkIHRvIHJlbW92ZSB0aGlzIGV4cGxpY2l0bHksIGJlY2F1c2UgaXQgZ2V0cyBpbmhlcml0ZWQgZnJvbSBNYXRDaGlwVHJhaWxpbmdJY29uLlxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnbnVsbCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJlbW92ZSBleHRlbmRzIF9NYXRDaGlwUmVtb3ZlTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgge1xuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgaWNvbi5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgaW50ZXJhY3Rpb246IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgaWYgKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=