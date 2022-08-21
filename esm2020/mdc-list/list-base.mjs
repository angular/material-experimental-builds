/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ContentChildren, Directive, ElementRef, Inject, Input, NgZone, Optional, QueryList, } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleRenderer, } from '@angular/material-experimental/mdc-core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subscription, merge } from 'rxjs';
import { MatListItemIcon, MatListItemAvatar, } from './list-item-sections';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
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
MatListBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatListBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatListBase, inputs: { disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mat-mdc-list-non-interactive": "_isNonInteractive", "attr.aria-disabled": "disabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatListBase, decorators: [{
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
/** @docs-private */
export class MatListItemBase {
    constructor(_elementRef, _ngZone, _listBase, _platform, globalRippleOptions, animationMode) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._listBase = _listBase;
        this._platform = _platform;
        this._explicitLines = null;
        this._disableRipple = false;
        this._disabled = false;
        this._subscriptions = new Subscription();
        this._rippleRenderer = null;
        /** Whether the list item has unscoped text content. */
        this._hasUnscopedTextContent = false;
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
    /**
     * The number of lines this list item should reserve space for. If not specified,
     * lines are inferred based on the projected content.
     *
     * Explicitly specifying the number of lines is useful if you want to acquire additional
     * space and enable the wrapping of text. The unscoped text content of a list item will
     * always be able to take up the remaining space of the item, unless it represents the title.
     *
     * A maximum of three lines is supported as per the Material Design specification.
     */
    set lines(lines) {
        this._explicitLines = coerceNumberProperty(lines, null);
        this._updateItemLines(false);
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
    ngAfterViewInit() {
        this._monitorProjectedLinesAndTitle();
        this._updateItemLines(true);
    }
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
        if (this._rippleRenderer !== null) {
            this._rippleRenderer._removeTriggerEvents();
        }
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
     * Subscribes to changes in the projected title and lines. Triggers a
     * item lines update whenever a change occurs.
     */
    _monitorProjectedLinesAndTitle() {
        this._ngZone.runOutsideAngular(() => {
            this._subscriptions.add(merge(this._lines.changes, this._titles.changes).subscribe(() => this._updateItemLines(false)));
        });
    }
    /**
     * Updates the lines of the list item. Based on the projected user content and optional
     * explicit lines setting, the visual appearance of the list item is determined.
     *
     * This method should be invoked whenever the projected user content changes, or
     * when the explicit lines have been updated.
     *
     * @param recheckUnscopedContent Whether the projected unscoped content should be re-checked.
     *   The unscoped content is not re-checked for every update as it is a rather expensive check
     *   for content that is expected to not change very often.
     */
    _updateItemLines(recheckUnscopedContent) {
        // If the updated is triggered too early before the view and content is initialized,
        // we just skip the update. After view initialization the update is triggered again.
        if (!this._lines || !this._titles || !this._unscopedContent) {
            return;
        }
        // Re-check the DOM for unscoped text content if requested. This needs to
        // happen before any computation or sanity checks run as these rely on the
        // result of whether there is unscoped text content or not.
        if (recheckUnscopedContent) {
            this._checkDomForUnscopedTextContent();
        }
        // Sanity check the list item lines and title in the content. This is a dev-mode only
        // check that can be dead-code eliminated by Terser in production.
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            sanityCheckListItemContent(this);
        }
        const numberOfLines = this._explicitLines ?? this._inferLinesFromContent();
        const unscopedContentEl = this._unscopedContent.nativeElement;
        // Update the list item element to reflect the number of lines.
        this._hostElement.classList.toggle('mat-mdc-list-item-single-line', numberOfLines <= 1);
        this._hostElement.classList.toggle('mdc-list-item--with-one-line', numberOfLines <= 1);
        this._hostElement.classList.toggle('mdc-list-item--with-two-lines', numberOfLines === 2);
        this._hostElement.classList.toggle('mdc-list-item--with-three-lines', numberOfLines === 3);
        // If there is no title and the unscoped content is the is the only line, the
        // unscoped text content will be treated as the title of the list-item.
        if (this._hasUnscopedTextContent) {
            const treatAsTitle = this._titles.length === 0 && numberOfLines === 1;
            unscopedContentEl.classList.toggle('mdc-list-item__primary-text', treatAsTitle);
            unscopedContentEl.classList.toggle('mdc-list-item__secondary-text', !treatAsTitle);
        }
        else {
            unscopedContentEl.classList.remove('mdc-list-item__primary-text');
            unscopedContentEl.classList.remove('mdc-list-item__secondary-text');
        }
    }
    /**
     * Infers the number of lines based on the projected user content. This is useful
     * if no explicit number of lines has been specified on the list item.
     *
     * The number of lines is inferred based on whether there is a title, the number of
     * additional lines (secondary/tertiary). An additional line is acquired if there is
     * unscoped text content.
     */
    _inferLinesFromContent() {
        let numOfLines = this._titles.length + this._lines.length;
        if (this._hasUnscopedTextContent) {
            numOfLines += 1;
        }
        return numOfLines;
    }
    /** Checks whether the list item has unscoped text content. */
    _checkDomForUnscopedTextContent() {
        this._hasUnscopedTextContent = Array.from(this._unscopedContent.nativeElement.childNodes)
            .filter(node => node.nodeType !== node.COMMENT_NODE)
            .some(node => !!(node.textContent && node.textContent.trim()));
    }
}
MatListItemBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatListItemBase, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: MatListBase }, { token: i1.Platform }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.0-rc.0", type: MatListItemBase, inputs: { lines: "lines", disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mdc-list-item--disabled": "disabled", "attr.aria-disabled": "disabled" } }, queries: [{ propertyName: "_avatars", predicate: MatListItemAvatar }, { propertyName: "_icons", predicate: MatListItemIcon }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0-rc.0", ngImport: i0, type: MatListItemBase, decorators: [{
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
                args: [MatListItemAvatar, { descendants: false }]
            }], _icons: [{
                type: ContentChildren,
                args: [MatListItemIcon, { descendants: false }]
            }], lines: [{
                type: Input
            }], disableRipple: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
/**
 * Sanity checks the configuration of the list item with respect to the amount
 * of lines, whether there is a title, or if there is unscoped text content.
 *
 * The checks are extracted into a top-level function that can be dead-code
 * eliminated by Terser or other optimizers in production mode.
 */
function sanityCheckListItemContent(item) {
    const numTitles = item._titles.length;
    const numLines = item._titles.length;
    if (numTitles > 1) {
        throw Error('A list item cannot have multiple titles.');
    }
    if (numTitles === 0 && numLines > 0) {
        throw Error('A list item line can only be used if there is a list item title.');
    }
    if (numTitles === 0 &&
        item._hasUnscopedTextContent &&
        item._explicitLines !== null &&
        item._explicitLines > 1) {
        throw Error('A list item cannot have wrapping content without a title.');
    }
    if (numLines > 2 || (numLines === 2 && item._hasUnscopedTextContent)) {
        throw Error('A list item can have at maximum three lines.');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEcsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx5QkFBeUIsRUFHekIsY0FBYyxHQUVmLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUdMLGVBQWUsRUFDZixpQkFBaUIsR0FDbEIsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBUTlCLG9CQUFvQjtBQUNwQixNQUFNLE9BQWdCLFdBQVc7SUFQakM7UUFRRSxzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFVMUIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFVaEMsY0FBUyxHQUFHLEtBQUssQ0FBQztLQUMzQjtJQW5CQyxzREFBc0Q7SUFDdEQsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxLQUFtQjtRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFHRCwyQ0FBMkM7SUFDM0MsSUFDSSxR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QWtFLENBQUMsQ0FBQztLQUNqRjtJQUNELElBQ0UsU0FBUyxLQUFLLENBQUM7UUFDZixJQUFJLENBQUMsdUJBQXVCO1FBQzVCLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSTtRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFDdkI7UUFDQSxNQUFNLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO0tBQzFFO0lBQ0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRTtRQUNwRSxNQUFNLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQzdEO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgUmlwcGxlQ29uZmlnLFxuICBSaXBwbGVHbG9iYWxPcHRpb25zLFxuICBSaXBwbGVSZW5kZXJlcixcbiAgUmlwcGxlVGFyZ2V0LFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWNvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgbWVyZ2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgTWF0TGlzdEl0ZW1MaW5lLFxuICBNYXRMaXN0SXRlbVRpdGxlLFxuICBNYXRMaXN0SXRlbUljb24sXG4gIE1hdExpc3RJdGVtQXZhdGFyLFxufSBmcm9tICcuL2xpc3QtaXRlbS1zZWN0aW9ucyc7XG5cbkBEaXJlY3RpdmUoe1xuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtbWRjLWxpc3Qtbm9uLWludGVyYWN0aXZlXSc6ICdfaXNOb25JbnRlcmFjdGl2ZScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbn0pXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RCYXNlIHtcbiAgX2lzTm9uSW50ZXJhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgZm9yIGFsbCBsaXN0IGl0ZW1zIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVJpcHBsZTtcbiAgfVxuICBzZXQgZGlzYWJsZVJpcHBsZSh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIGFsbCBsaXN0IGl0ZW1zIGFyZSBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICB9LFxufSlcbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0TGlzdEl0ZW1CYXNlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBSaXBwbGVUYXJnZXQge1xuICAvKiogUXVlcnkgbGlzdCBtYXRjaGluZyBsaXN0LWl0ZW0gbGluZSBlbGVtZW50cy4gKi9cbiAgYWJzdHJhY3QgX2xpbmVzOiBRdWVyeUxpc3Q8TWF0TGlzdEl0ZW1MaW5lPiB8IHVuZGVmaW5lZDtcblxuICAvKiogUXVlcnkgbGlzdCBtYXRjaGluZyBsaXN0LWl0ZW0gdGl0bGUgZWxlbWVudHMuICovXG4gIGFic3RyYWN0IF90aXRsZXM6IFF1ZXJ5TGlzdDxNYXRMaXN0SXRlbVRpdGxlPiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogRWxlbWVudCByZWZlcmVuY2UgdG8gdGhlIHVuc2NvcGVkIGNvbnRlbnQgaW4gYSBsaXN0IGl0ZW0uXG4gICAqXG4gICAqIFVuc2NvcGVkIGNvbnRlbnQgaXMgdXNlci1wcm9qZWN0ZWQgdGV4dCBjb250ZW50IGluIGEgbGlzdCBpdGVtIHRoYXQgaXNcbiAgICogbm90IHBhcnQgb2YgYW4gZXhwbGljaXQgbGluZSBvciB0aXRsZS5cbiAgICovXG4gIGFic3RyYWN0IF91bnNjb3BlZENvbnRlbnQ6IEVsZW1lbnRSZWY8SFRNTFNwYW5FbGVtZW50PiB8IHVuZGVmaW5lZDtcblxuICAvKiogSG9zdCBlbGVtZW50IGZvciB0aGUgbGlzdCBpdGVtLiAqL1xuICBfaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgYXJlIGRpc2FibGVkLiAqL1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaXN0SXRlbUF2YXRhciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIF9hdmF0YXJzOiBRdWVyeUxpc3Q8bmV2ZXI+O1xuICBAQ29udGVudENoaWxkcmVuKE1hdExpc3RJdGVtSWNvbiwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIF9pY29uczogUXVlcnlMaXN0PG5ldmVyPjtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBsaW5lcyB0aGlzIGxpc3QgaXRlbSBzaG91bGQgcmVzZXJ2ZSBzcGFjZSBmb3IuIElmIG5vdCBzcGVjaWZpZWQsXG4gICAqIGxpbmVzIGFyZSBpbmZlcnJlZCBiYXNlZCBvbiB0aGUgcHJvamVjdGVkIGNvbnRlbnQuXG4gICAqXG4gICAqIEV4cGxpY2l0bHkgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGxpbmVzIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBhY3F1aXJlIGFkZGl0aW9uYWxcbiAgICogc3BhY2UgYW5kIGVuYWJsZSB0aGUgd3JhcHBpbmcgb2YgdGV4dC4gVGhlIHVuc2NvcGVkIHRleHQgY29udGVudCBvZiBhIGxpc3QgaXRlbSB3aWxsXG4gICAqIGFsd2F5cyBiZSBhYmxlIHRvIHRha2UgdXAgdGhlIHJlbWFpbmluZyBzcGFjZSBvZiB0aGUgaXRlbSwgdW5sZXNzIGl0IHJlcHJlc2VudHMgdGhlIHRpdGxlLlxuICAgKlxuICAgKiBBIG1heGltdW0gb2YgdGhyZWUgbGluZXMgaXMgc3VwcG9ydGVkIGFzIHBlciB0aGUgTWF0ZXJpYWwgRGVzaWduIHNwZWNpZmljYXRpb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgbGluZXMobGluZXM6IG51bWJlciB8IHN0cmluZyB8IG51bGwpIHtcbiAgICB0aGlzLl9leHBsaWNpdExpbmVzID0gY29lcmNlTnVtYmVyUHJvcGVydHkobGluZXMsIG51bGwpO1xuICAgIHRoaXMuX3VwZGF0ZUl0ZW1MaW5lcyhmYWxzZSk7XG4gIH1cbiAgX2V4cGxpY2l0TGluZXM6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlUmlwcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmRpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVSaXBwbGUgfHwgdGhpcy5fbGlzdEJhc2UuZGlzYWJsZVJpcHBsZSB8fCB0aGlzLl9ub29wQW5pbWF0aW9uc1xuICAgICk7XG4gIH1cbiAgc2V0IGRpc2FibGVSaXBwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlUmlwcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlUmlwcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxpc3QtaXRlbSBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy5fbGlzdEJhc2UgJiYgdGhpcy5fbGlzdEJhc2UuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBfcmlwcGxlUmVuZGVyZXI6IFJpcHBsZVJlbmRlcmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxpc3QgaXRlbSBoYXMgdW5zY29wZWQgdGV4dCBjb250ZW50LiAqL1xuICBfaGFzVW5zY29wZWRUZXh0Q29udGVudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBSaXBwbGVUYXJnZXRgLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICByaXBwbGVDb25maWc6IFJpcHBsZUNvbmZpZyAmIFJpcHBsZUdsb2JhbE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgYFJpcHBsZVRhcmdldGAuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGdldCByaXBwbGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlUmlwcGxlIHx8ICEhdGhpcy5yaXBwbGVDb25maWcuZGlzYWJsZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfbGlzdEJhc2U6IE1hdExpc3RCYXNlLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUylcbiAgICBnbG9iYWxSaXBwbGVPcHRpb25zPzogUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgdGhpcy5yaXBwbGVDb25maWcgPSBnbG9iYWxSaXBwbGVPcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX2hvc3RFbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX25vb3BBbmltYXRpb25zID0gYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJztcblxuICAgIGlmICghdGhpcy5fbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuX2luaXRJbnRlcmFjdGl2ZUxpc3RJdGVtKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gdHlwZSBhdHRyaWJ1dGUgaXMgc3BlY2lmaWVkIGZvciBhIGhvc3QgYDxidXR0b24+YCBlbGVtZW50LCBzZXQgaXQgdG8gYGJ1dHRvbmAuIElmIGFcbiAgICAvLyB0eXBlIGF0dHJpYnV0ZSBpcyBhbHJlYWR5IHNwZWNpZmllZCwgd2UgZG8gbm90aGluZy4gV2UgZG8gdGhpcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gVE9ETzogRGV0ZXJtaW5lIGlmIHdlIGludGVuZCB0byBjb250aW51ZSBkb2luZyB0aGlzIGZvciB0aGUgTURDLWJhc2VkIGxpc3QuXG4gICAgaWYgKFxuICAgICAgdGhpcy5faG9zdEVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2J1dHRvbicgJiZcbiAgICAgICF0aGlzLl9ob3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3R5cGUnKVxuICAgICkge1xuICAgICAgdGhpcy5faG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9tb25pdG9yUHJvamVjdGVkTGluZXNBbmRUaXRsZSgpO1xuICAgIHRoaXMuX3VwZGF0ZUl0ZW1MaW5lcyh0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5fcmlwcGxlUmVuZGVyZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLl9yZW1vdmVUcmlnZ2VyRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGxpc3QgaXRlbSBoYXMgaWNvbnMgb3IgYXZhdGFycy4gKi9cbiAgX2hhc0ljb25PckF2YXRhcigpIHtcbiAgICByZXR1cm4gISEodGhpcy5fYXZhdGFycy5sZW5ndGggfHwgdGhpcy5faWNvbnMubGVuZ3RoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRJbnRlcmFjdGl2ZUxpc3RJdGVtKCkge1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtbGlzdC1pdGVtLWludGVyYWN0aXZlJyk7XG4gICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIgPSBuZXcgUmlwcGxlUmVuZGVyZXIoXG4gICAgICB0aGlzLFxuICAgICAgdGhpcy5fbmdab25lLFxuICAgICAgdGhpcy5faG9zdEVsZW1lbnQsXG4gICAgICB0aGlzLl9wbGF0Zm9ybSxcbiAgICApO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyLnNldHVwVHJpZ2dlckV2ZW50cyh0aGlzLl9ob3N0RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byBjaGFuZ2VzIGluIHRoZSBwcm9qZWN0ZWQgdGl0bGUgYW5kIGxpbmVzLiBUcmlnZ2VycyBhXG4gICAqIGl0ZW0gbGluZXMgdXBkYXRlIHdoZW5ldmVyIGEgY2hhbmdlIG9jY3Vycy5cbiAgICovXG4gIHByaXZhdGUgX21vbml0b3JQcm9qZWN0ZWRMaW5lc0FuZFRpdGxlKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgICAgbWVyZ2UodGhpcy5fbGluZXMhLmNoYW5nZXMsIHRoaXMuX3RpdGxlcyEuY2hhbmdlcykuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgdGhpcy5fdXBkYXRlSXRlbUxpbmVzKGZhbHNlKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgbGluZXMgb2YgdGhlIGxpc3QgaXRlbS4gQmFzZWQgb24gdGhlIHByb2plY3RlZCB1c2VyIGNvbnRlbnQgYW5kIG9wdGlvbmFsXG4gICAqIGV4cGxpY2l0IGxpbmVzIHNldHRpbmcsIHRoZSB2aXN1YWwgYXBwZWFyYW5jZSBvZiB0aGUgbGlzdCBpdGVtIGlzIGRldGVybWluZWQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBpbnZva2VkIHdoZW5ldmVyIHRoZSBwcm9qZWN0ZWQgdXNlciBjb250ZW50IGNoYW5nZXMsIG9yXG4gICAqIHdoZW4gdGhlIGV4cGxpY2l0IGxpbmVzIGhhdmUgYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gcmVjaGVja1Vuc2NvcGVkQ29udGVudCBXaGV0aGVyIHRoZSBwcm9qZWN0ZWQgdW5zY29wZWQgY29udGVudCBzaG91bGQgYmUgcmUtY2hlY2tlZC5cbiAgICogICBUaGUgdW5zY29wZWQgY29udGVudCBpcyBub3QgcmUtY2hlY2tlZCBmb3IgZXZlcnkgdXBkYXRlIGFzIGl0IGlzIGEgcmF0aGVyIGV4cGVuc2l2ZSBjaGVja1xuICAgKiAgIGZvciBjb250ZW50IHRoYXQgaXMgZXhwZWN0ZWQgdG8gbm90IGNoYW5nZSB2ZXJ5IG9mdGVuLlxuICAgKi9cbiAgX3VwZGF0ZUl0ZW1MaW5lcyhyZWNoZWNrVW5zY29wZWRDb250ZW50OiBib29sZWFuKSB7XG4gICAgLy8gSWYgdGhlIHVwZGF0ZWQgaXMgdHJpZ2dlcmVkIHRvbyBlYXJseSBiZWZvcmUgdGhlIHZpZXcgYW5kIGNvbnRlbnQgaXMgaW5pdGlhbGl6ZWQsXG4gICAgLy8gd2UganVzdCBza2lwIHRoZSB1cGRhdGUuIEFmdGVyIHZpZXcgaW5pdGlhbGl6YXRpb24gdGhlIHVwZGF0ZSBpcyB0cmlnZ2VyZWQgYWdhaW4uXG4gICAgaWYgKCF0aGlzLl9saW5lcyB8fCAhdGhpcy5fdGl0bGVzIHx8ICF0aGlzLl91bnNjb3BlZENvbnRlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBSZS1jaGVjayB0aGUgRE9NIGZvciB1bnNjb3BlZCB0ZXh0IGNvbnRlbnQgaWYgcmVxdWVzdGVkLiBUaGlzIG5lZWRzIHRvXG4gICAgLy8gaGFwcGVuIGJlZm9yZSBhbnkgY29tcHV0YXRpb24gb3Igc2FuaXR5IGNoZWNrcyBydW4gYXMgdGhlc2UgcmVseSBvbiB0aGVcbiAgICAvLyByZXN1bHQgb2Ygd2hldGhlciB0aGVyZSBpcyB1bnNjb3BlZCB0ZXh0IGNvbnRlbnQgb3Igbm90LlxuICAgIGlmIChyZWNoZWNrVW5zY29wZWRDb250ZW50KSB7XG4gICAgICB0aGlzLl9jaGVja0RvbUZvclVuc2NvcGVkVGV4dENvbnRlbnQoKTtcbiAgICB9XG5cbiAgICAvLyBTYW5pdHkgY2hlY2sgdGhlIGxpc3QgaXRlbSBsaW5lcyBhbmQgdGl0bGUgaW4gdGhlIGNvbnRlbnQuIFRoaXMgaXMgYSBkZXYtbW9kZSBvbmx5XG4gICAgLy8gY2hlY2sgdGhhdCBjYW4gYmUgZGVhZC1jb2RlIGVsaW1pbmF0ZWQgYnkgVGVyc2VyIGluIHByb2R1Y3Rpb24uXG4gICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgc2FuaXR5Q2hlY2tMaXN0SXRlbUNvbnRlbnQodGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtYmVyT2ZMaW5lcyA9IHRoaXMuX2V4cGxpY2l0TGluZXMgPz8gdGhpcy5faW5mZXJMaW5lc0Zyb21Db250ZW50KCk7XG4gICAgY29uc3QgdW5zY29wZWRDb250ZW50RWwgPSB0aGlzLl91bnNjb3BlZENvbnRlbnQubmF0aXZlRWxlbWVudDtcblxuICAgIC8vIFVwZGF0ZSB0aGUgbGlzdCBpdGVtIGVsZW1lbnQgdG8gcmVmbGVjdCB0aGUgbnVtYmVyIG9mIGxpbmVzLlxuICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ21hdC1tZGMtbGlzdC1pdGVtLXNpbmdsZS1saW5lJywgbnVtYmVyT2ZMaW5lcyA8PSAxKTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtZGMtbGlzdC1pdGVtLS13aXRoLW9uZS1saW5lJywgbnVtYmVyT2ZMaW5lcyA8PSAxKTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtZGMtbGlzdC1pdGVtLS13aXRoLXR3by1saW5lcycsIG51bWJlck9mTGluZXMgPT09IDIpO1xuICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ21kYy1saXN0LWl0ZW0tLXdpdGgtdGhyZWUtbGluZXMnLCBudW1iZXJPZkxpbmVzID09PSAzKTtcblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIHRpdGxlIGFuZCB0aGUgdW5zY29wZWQgY29udGVudCBpcyB0aGUgaXMgdGhlIG9ubHkgbGluZSwgdGhlXG4gICAgLy8gdW5zY29wZWQgdGV4dCBjb250ZW50IHdpbGwgYmUgdHJlYXRlZCBhcyB0aGUgdGl0bGUgb2YgdGhlIGxpc3QtaXRlbS5cbiAgICBpZiAodGhpcy5faGFzVW5zY29wZWRUZXh0Q29udGVudCkge1xuICAgICAgY29uc3QgdHJlYXRBc1RpdGxlID0gdGhpcy5fdGl0bGVzLmxlbmd0aCA9PT0gMCAmJiBudW1iZXJPZkxpbmVzID09PSAxO1xuICAgICAgdW5zY29wZWRDb250ZW50RWwuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0JywgdHJlYXRBc1RpdGxlKTtcbiAgICAgIHVuc2NvcGVkQ29udGVudEVsLmNsYXNzTGlzdC50b2dnbGUoJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JywgIXRyZWF0QXNUaXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVuc2NvcGVkQ29udGVudEVsLmNsYXNzTGlzdC5yZW1vdmUoJ21kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCcpO1xuICAgICAgdW5zY29wZWRDb250ZW50RWwuY2xhc3NMaXN0LnJlbW92ZSgnbWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5mZXJzIHRoZSBudW1iZXIgb2YgbGluZXMgYmFzZWQgb24gdGhlIHByb2plY3RlZCB1c2VyIGNvbnRlbnQuIFRoaXMgaXMgdXNlZnVsXG4gICAqIGlmIG5vIGV4cGxpY2l0IG51bWJlciBvZiBsaW5lcyBoYXMgYmVlbiBzcGVjaWZpZWQgb24gdGhlIGxpc3QgaXRlbS5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBsaW5lcyBpcyBpbmZlcnJlZCBiYXNlZCBvbiB3aGV0aGVyIHRoZXJlIGlzIGEgdGl0bGUsIHRoZSBudW1iZXIgb2ZcbiAgICogYWRkaXRpb25hbCBsaW5lcyAoc2Vjb25kYXJ5L3RlcnRpYXJ5KS4gQW4gYWRkaXRpb25hbCBsaW5lIGlzIGFjcXVpcmVkIGlmIHRoZXJlIGlzXG4gICAqIHVuc2NvcGVkIHRleHQgY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgX2luZmVyTGluZXNGcm9tQ29udGVudCgpIHtcbiAgICBsZXQgbnVtT2ZMaW5lcyA9IHRoaXMuX3RpdGxlcyEubGVuZ3RoICsgdGhpcy5fbGluZXMhLmxlbmd0aDtcbiAgICBpZiAodGhpcy5faGFzVW5zY29wZWRUZXh0Q29udGVudCkge1xuICAgICAgbnVtT2ZMaW5lcyArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbnVtT2ZMaW5lcztcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciB0aGUgbGlzdCBpdGVtIGhhcyB1bnNjb3BlZCB0ZXh0IGNvbnRlbnQuICovXG4gIHByaXZhdGUgX2NoZWNrRG9tRm9yVW5zY29wZWRUZXh0Q29udGVudCgpIHtcbiAgICB0aGlzLl9oYXNVbnNjb3BlZFRleHRDb250ZW50ID0gQXJyYXkuZnJvbTxDaGlsZE5vZGU+KFxuICAgICAgdGhpcy5fdW5zY29wZWRDb250ZW50IS5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMsXG4gICAgKVxuICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUubm9kZVR5cGUgIT09IG5vZGUuQ09NTUVOVF9OT0RFKVxuICAgICAgLnNvbWUobm9kZSA9PiAhIShub2RlLnRleHRDb250ZW50ICYmIG5vZGUudGV4dENvbnRlbnQudHJpbSgpKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTYW5pdHkgY2hlY2tzIHRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBsaXN0IGl0ZW0gd2l0aCByZXNwZWN0IHRvIHRoZSBhbW91bnRcbiAqIG9mIGxpbmVzLCB3aGV0aGVyIHRoZXJlIGlzIGEgdGl0bGUsIG9yIGlmIHRoZXJlIGlzIHVuc2NvcGVkIHRleHQgY29udGVudC5cbiAqXG4gKiBUaGUgY2hlY2tzIGFyZSBleHRyYWN0ZWQgaW50byBhIHRvcC1sZXZlbCBmdW5jdGlvbiB0aGF0IGNhbiBiZSBkZWFkLWNvZGVcbiAqIGVsaW1pbmF0ZWQgYnkgVGVyc2VyIG9yIG90aGVyIG9wdGltaXplcnMgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICovXG5mdW5jdGlvbiBzYW5pdHlDaGVja0xpc3RJdGVtQ29udGVudChpdGVtOiBNYXRMaXN0SXRlbUJhc2UpIHtcbiAgY29uc3QgbnVtVGl0bGVzID0gaXRlbS5fdGl0bGVzIS5sZW5ndGg7XG4gIGNvbnN0IG51bUxpbmVzID0gaXRlbS5fdGl0bGVzIS5sZW5ndGg7XG5cbiAgaWYgKG51bVRpdGxlcyA+IDEpIHtcbiAgICB0aHJvdyBFcnJvcignQSBsaXN0IGl0ZW0gY2Fubm90IGhhdmUgbXVsdGlwbGUgdGl0bGVzLicpO1xuICB9XG4gIGlmIChudW1UaXRsZXMgPT09IDAgJiYgbnVtTGluZXMgPiAwKSB7XG4gICAgdGhyb3cgRXJyb3IoJ0EgbGlzdCBpdGVtIGxpbmUgY2FuIG9ubHkgYmUgdXNlZCBpZiB0aGVyZSBpcyBhIGxpc3QgaXRlbSB0aXRsZS4nKTtcbiAgfVxuICBpZiAoXG4gICAgbnVtVGl0bGVzID09PSAwICYmXG4gICAgaXRlbS5faGFzVW5zY29wZWRUZXh0Q29udGVudCAmJlxuICAgIGl0ZW0uX2V4cGxpY2l0TGluZXMgIT09IG51bGwgJiZcbiAgICBpdGVtLl9leHBsaWNpdExpbmVzID4gMVxuICApIHtcbiAgICB0aHJvdyBFcnJvcignQSBsaXN0IGl0ZW0gY2Fubm90IGhhdmUgd3JhcHBpbmcgY29udGVudCB3aXRob3V0IGEgdGl0bGUuJyk7XG4gIH1cbiAgaWYgKG51bUxpbmVzID4gMiB8fCAobnVtTGluZXMgPT09IDIgJiYgaXRlbS5faGFzVW5zY29wZWRUZXh0Q29udGVudCkpIHtcbiAgICB0aHJvdyBFcnJvcignQSBsaXN0IGl0ZW0gY2FuIGhhdmUgYXQgbWF4aW11bSB0aHJlZSBsaW5lcy4nKTtcbiAgfVxufVxuIl19