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
MatListItemBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatListItemBase, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: MatListBase }, { token: i1.Platform }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatListItemBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatListItemBase, inputs: { lines: "lines", disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mdc-list-item--disabled": "disabled", "attr.aria-disabled": "disabled" } }, queries: [{ propertyName: "_avatars", predicate: MatListItemAvatar }, { propertyName: "_icons", predicate: MatListItemIcon }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatListItemBase, decorators: [{
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
MatListBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatListBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatListBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.1", type: MatListBase, inputs: { disableRipple: "disableRipple", disabled: "disabled" }, host: { properties: { "class.mat-mdc-list-non-interactive": "_isNonInteractive", "attr.aria-disabled": "disabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: MatListBase, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEcsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx5QkFBeUIsRUFHekIsY0FBYyxHQUVmLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUdMLGVBQWUsRUFDZixpQkFBaUIsR0FDbEIsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBUTlCLG9CQUFvQjtBQUNwQixNQUFNLE9BQWdCLGVBQWU7SUFrRm5DLFlBQ1MsV0FBb0MsRUFDakMsT0FBZSxFQUNqQixTQUFzQixFQUN0QixTQUFtQixFQUczQixtQkFBeUMsRUFDRSxhQUFzQjtRQVAxRCxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDakMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUEvQzdCLG1CQUFjLEdBQWtCLElBQUksQ0FBQztRQVc3QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVVoQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLG1CQUFj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a0UsQ0FBQyxDQUFDO0tBQ2pGO0lBQ0QsSUFDRSxTQUFTLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyx1QkFBdUI7UUFDNUIsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUN2QjtRQUNBLE1BQU0sS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7S0FDMUU7SUFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1FBQ3BFLE1BQU0sS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7S0FDN0Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBSaXBwbGVDb25maWcsXG4gIFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gIFJpcHBsZVJlbmRlcmVyLFxuICBSaXBwbGVUYXJnZXQsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBtZXJnZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBNYXRMaXN0SXRlbUxpbmUsXG4gIE1hdExpc3RJdGVtVGl0bGUsXG4gIE1hdExpc3RJdGVtSWNvbixcbiAgTWF0TGlzdEl0ZW1BdmF0YXIsXG59IGZyb20gJy4vbGlzdC1pdGVtLXNlY3Rpb25zJztcblxuQERpcmVjdGl2ZSh7XG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbn0pXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RJdGVtQmFzZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgUmlwcGxlVGFyZ2V0IHtcbiAgLyoqIFF1ZXJ5IGxpc3QgbWF0Y2hpbmcgbGlzdC1pdGVtIGxpbmUgZWxlbWVudHMuICovXG4gIGFic3RyYWN0IF9saW5lczogUXVlcnlMaXN0PE1hdExpc3RJdGVtTGluZT4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFF1ZXJ5IGxpc3QgbWF0Y2hpbmcgbGlzdC1pdGVtIHRpdGxlIGVsZW1lbnRzLiAqL1xuICBhYnN0cmFjdCBfdGl0bGVzOiBRdWVyeUxpc3Q8TWF0TGlzdEl0ZW1UaXRsZT4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgcmVmZXJlbmNlIHRvIHRoZSB1bnNjb3BlZCBjb250ZW50IGluIGEgbGlzdCBpdGVtLlxuICAgKlxuICAgKiBVbnNjb3BlZCBjb250ZW50IGlzIHVzZXItcHJvamVjdGVkIHRleHQgY29udGVudCBpbiBhIGxpc3QgaXRlbSB0aGF0IGlzXG4gICAqIG5vdCBwYXJ0IG9mIGFuIGV4cGxpY2l0IGxpbmUgb3IgdGl0bGUuXG4gICAqL1xuICBhYnN0cmFjdCBfdW5zY29wZWRDb250ZW50OiBFbGVtZW50UmVmPEhUTUxTcGFuRWxlbWVudD4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIEhvc3QgZWxlbWVudCBmb3IgdGhlIGxpc3QgaXRlbS4gKi9cbiAgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAvKiogV2hldGhlciBhbmltYXRpb25zIGFyZSBkaXNhYmxlZC4gKi9cbiAgX25vb3BBbmltYXRpb25zOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0TGlzdEl0ZW1BdmF0YXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfYXZhdGFyczogUXVlcnlMaXN0PG5ldmVyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihNYXRMaXN0SXRlbUljb24sIHtkZXNjZW5kYW50czogZmFsc2V9KSBfaWNvbnM6IFF1ZXJ5TGlzdDxuZXZlcj47XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgbGluZXMgdGhpcyBsaXN0IGl0ZW0gc2hvdWxkIHJlc2VydmUgc3BhY2UgZm9yLiBJZiBub3Qgc3BlY2lmaWVkLFxuICAgKiBsaW5lcyBhcmUgaW5mZXJyZWQgYmFzZWQgb24gdGhlIHByb2plY3RlZCBjb250ZW50LlxuICAgKlxuICAgKiBFeHBsaWNpdGx5IHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBsaW5lcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gYWNxdWlyZSBhZGRpdGlvbmFsXG4gICAqIHNwYWNlIGFuZCBlbmFibGUgdGhlIHdyYXBwaW5nIG9mIHRleHQuIFRoZSB1bnNjb3BlZCB0ZXh0IGNvbnRlbnQgb2YgYSBsaXN0IGl0ZW0gd2lsbFxuICAgKiBhbHdheXMgYmUgYWJsZSB0byB0YWtlIHVwIHRoZSByZW1haW5pbmcgc3BhY2Ugb2YgdGhlIGl0ZW0sIHVubGVzcyBpdCByZXByZXNlbnRzIHRoZSB0aXRsZS5cbiAgICpcbiAgICogQSBtYXhpbXVtIG9mIHRocmVlIGxpbmVzIGlzIHN1cHBvcnRlZCBhcyBwZXIgdGhlIE1hdGVyaWFsIERlc2lnbiBzcGVjaWZpY2F0aW9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGxpbmVzKGxpbmVzOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsKSB7XG4gICAgdGhpcy5fZXhwbGljaXRMaW5lcyA9IGNvZXJjZU51bWJlclByb3BlcnR5KGxpbmVzLCBudWxsKTtcbiAgICB0aGlzLl91cGRhdGVJdGVtTGluZXMoZmFsc2UpO1xuICB9XG4gIF9leHBsaWNpdExpbmVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5kaXNhYmxlZCB8fCB0aGlzLl9kaXNhYmxlUmlwcGxlIHx8IHRoaXMuX2xpc3RCYXNlLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5fbm9vcEFuaW1hdGlvbnNcbiAgICApO1xuICB9XG4gIHNldCBkaXNhYmxlUmlwcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0LWl0ZW0gaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMuX2xpc3RCYXNlICYmIHRoaXMuX2xpc3RCYXNlLmRpc2FibGVkKTtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgX3JpcHBsZVJlbmRlcmVyOiBSaXBwbGVSZW5kZXJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IGl0ZW0gaGFzIHVuc2NvcGVkIHRleHQgY29udGVudC4gKi9cbiAgX2hhc1Vuc2NvcGVkVGV4dENvbnRlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBgUmlwcGxlVGFyZ2V0YC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcmlwcGxlQ29uZmlnOiBSaXBwbGVDb25maWcgJiBSaXBwbGVHbG9iYWxPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIGBSaXBwbGVUYXJnZXRgLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgcmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZVJpcHBsZSB8fCAhIXRoaXMucmlwcGxlQ29uZmlnLmRpc2FibGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcm90ZWN0ZWQgX25nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX2xpc3RCYXNlOiBNYXRMaXN0QmFzZSxcbiAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1BVF9SSVBQTEVfR0xPQkFMX09QVElPTlMpXG4gICAgZ2xvYmFsUmlwcGxlT3B0aW9ucz86IFJpcHBsZUdsb2JhbE9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICkge1xuICAgIHRoaXMucmlwcGxlQ29uZmlnID0gZ2xvYmFsUmlwcGxlT3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9ub29wQW5pbWF0aW9ucyA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG5cbiAgICBpZiAoIXRoaXMuX2xpc3RCYXNlLl9pc05vbkludGVyYWN0aXZlKSB7XG4gICAgICB0aGlzLl9pbml0SW50ZXJhY3RpdmVMaXN0SXRlbSgpO1xuICAgIH1cblxuICAgIC8vIElmIG5vIHR5cGUgYXR0cmlidXRlIGlzIHNwZWNpZmllZCBmb3IgYSBob3N0IGA8YnV0dG9uPmAgZWxlbWVudCwgc2V0IGl0IHRvIGBidXR0b25gLiBJZiBhXG4gICAgLy8gdHlwZSBhdHRyaWJ1dGUgaXMgYWxyZWFkeSBzcGVjaWZpZWQsIHdlIGRvIG5vdGhpbmcuIFdlIGRvIHRoaXMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIC8vIFRPRE86IERldGVybWluZSBpZiB3ZSBpbnRlbmQgdG8gY29udGludWUgZG9pbmcgdGhpcyBmb3IgdGhlIE1EQy1iYXNlZCBsaXN0LlxuICAgIGlmIChcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdidXR0b24nICYmXG4gICAgICAhdGhpcy5faG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKCd0eXBlJylcbiAgICApIHtcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fbW9uaXRvclByb2plY3RlZExpbmVzQW5kVGl0bGUoKTtcbiAgICB0aGlzLl91cGRhdGVJdGVtTGluZXModHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuX3JpcHBsZVJlbmRlcmVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5fcmVtb3ZlVHJpZ2dlckV2ZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IGl0ZW0gaGFzIGljb25zIG9yIGF2YXRhcnMuICovXG4gIF9oYXNJY29uT3JBdmF0YXIoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuX2F2YXRhcnMubGVuZ3RoIHx8IHRoaXMuX2ljb25zLmxlbmd0aCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0SW50ZXJhY3RpdmVMaXN0SXRlbSgpIHtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtbWRjLWxpc3QtaXRlbS1pbnRlcmFjdGl2ZScpO1xuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyID0gbmV3IFJpcHBsZVJlbmRlcmVyKFxuICAgICAgdGhpcyxcbiAgICAgIHRoaXMuX25nWm9uZSxcbiAgICAgIHRoaXMuX2hvc3RFbGVtZW50LFxuICAgICAgdGhpcy5fcGxhdGZvcm0sXG4gICAgKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXR1cFRyaWdnZXJFdmVudHModGhpcy5faG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiB0aGUgcHJvamVjdGVkIHRpdGxlIGFuZCBsaW5lcy4gVHJpZ2dlcnMgYVxuICAgKiBpdGVtIGxpbmVzIHVwZGF0ZSB3aGVuZXZlciBhIGNoYW5nZSBvY2N1cnMuXG4gICAqL1xuICBwcml2YXRlIF9tb25pdG9yUHJvamVjdGVkTGluZXNBbmRUaXRsZSgpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIG1lcmdlKHRoaXMuX2xpbmVzIS5jaGFuZ2VzLCB0aGlzLl90aXRsZXMhLmNoYW5nZXMpLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgIHRoaXMuX3VwZGF0ZUl0ZW1MaW5lcyhmYWxzZSksXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGxpbmVzIG9mIHRoZSBsaXN0IGl0ZW0uIEJhc2VkIG9uIHRoZSBwcm9qZWN0ZWQgdXNlciBjb250ZW50IGFuZCBvcHRpb25hbFxuICAgKiBleHBsaWNpdCBsaW5lcyBzZXR0aW5nLCB0aGUgdmlzdWFsIGFwcGVhcmFuY2Ugb2YgdGhlIGxpc3QgaXRlbSBpcyBkZXRlcm1pbmVkLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgaW52b2tlZCB3aGVuZXZlciB0aGUgcHJvamVjdGVkIHVzZXIgY29udGVudCBjaGFuZ2VzLCBvclxuICAgKiB3aGVuIHRoZSBleHBsaWNpdCBsaW5lcyBoYXZlIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHJlY2hlY2tVbnNjb3BlZENvbnRlbnQgV2hldGhlciB0aGUgcHJvamVjdGVkIHVuc2NvcGVkIGNvbnRlbnQgc2hvdWxkIGJlIHJlLWNoZWNrZWQuXG4gICAqICAgVGhlIHVuc2NvcGVkIGNvbnRlbnQgaXMgbm90IHJlLWNoZWNrZWQgZm9yIGV2ZXJ5IHVwZGF0ZSBhcyBpdCBpcyBhIHJhdGhlciBleHBlbnNpdmUgY2hlY2tcbiAgICogICBmb3IgY29udGVudCB0aGF0IGlzIGV4cGVjdGVkIHRvIG5vdCBjaGFuZ2UgdmVyeSBvZnRlbi5cbiAgICovXG4gIF91cGRhdGVJdGVtTGluZXMocmVjaGVja1Vuc2NvcGVkQ29udGVudDogYm9vbGVhbikge1xuICAgIC8vIElmIHRoZSB1cGRhdGVkIGlzIHRyaWdnZXJlZCB0b28gZWFybHkgYmVmb3JlIHRoZSB2aWV3IGFuZCBjb250ZW50IGlzIGluaXRpYWxpemVkLFxuICAgIC8vIHdlIGp1c3Qgc2tpcCB0aGUgdXBkYXRlLiBBZnRlciB2aWV3IGluaXRpYWxpemF0aW9uIHRoZSB1cGRhdGUgaXMgdHJpZ2dlcmVkIGFnYWluLlxuICAgIGlmICghdGhpcy5fbGluZXMgfHwgIXRoaXMuX3RpdGxlcyB8fCAhdGhpcy5fdW5zY29wZWRDb250ZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmUtY2hlY2sgdGhlIERPTSBmb3IgdW5zY29wZWQgdGV4dCBjb250ZW50IGlmIHJlcXVlc3RlZC4gVGhpcyBuZWVkcyB0b1xuICAgIC8vIGhhcHBlbiBiZWZvcmUgYW55IGNvbXB1dGF0aW9uIG9yIHNhbml0eSBjaGVja3MgcnVuIGFzIHRoZXNlIHJlbHkgb24gdGhlXG4gICAgLy8gcmVzdWx0IG9mIHdoZXRoZXIgdGhlcmUgaXMgdW5zY29wZWQgdGV4dCBjb250ZW50IG9yIG5vdC5cbiAgICBpZiAocmVjaGVja1Vuc2NvcGVkQ29udGVudCkge1xuICAgICAgdGhpcy5fY2hlY2tEb21Gb3JVbnNjb3BlZFRleHRDb250ZW50KCk7XG4gICAgfVxuXG4gICAgLy8gU2FuaXR5IGNoZWNrIHRoZSBsaXN0IGl0ZW0gbGluZXMgYW5kIHRpdGxlIGluIHRoZSBjb250ZW50LiBUaGlzIGlzIGEgZGV2LW1vZGUgb25seVxuICAgIC8vIGNoZWNrIHRoYXQgY2FuIGJlIGRlYWQtY29kZSBlbGltaW5hdGVkIGJ5IFRlcnNlciBpbiBwcm9kdWN0aW9uLlxuICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIHNhbml0eUNoZWNrTGlzdEl0ZW1Db250ZW50KHRoaXMpO1xuICAgIH1cblxuICAgIGNvbnN0IG51bWJlck9mTGluZXMgPSB0aGlzLl9leHBsaWNpdExpbmVzID8/IHRoaXMuX2luZmVyTGluZXNGcm9tQ29udGVudCgpO1xuICAgIGNvbnN0IHVuc2NvcGVkQ29udGVudEVsID0gdGhpcy5fdW5zY29wZWRDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBVcGRhdGUgdGhlIGxpc3QgaXRlbSBlbGVtZW50IHRvIHJlZmxlY3QgdGhlIG51bWJlciBvZiBsaW5lcy5cbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtYXQtbWRjLWxpc3QtaXRlbS1zaW5nbGUtbGluZScsIG51bWJlck9mTGluZXMgPD0gMSk7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWxpc3QtaXRlbS0td2l0aC1vbmUtbGluZScsIG51bWJlck9mTGluZXMgPD0gMSk7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWxpc3QtaXRlbS0td2l0aC10d28tbGluZXMnLCBudW1iZXJPZkxpbmVzID09PSAyKTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtZGMtbGlzdC1pdGVtLS13aXRoLXRocmVlLWxpbmVzJywgbnVtYmVyT2ZMaW5lcyA9PT0gMyk7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyB0aXRsZSBhbmQgdGhlIHVuc2NvcGVkIGNvbnRlbnQgaXMgdGhlIGlzIHRoZSBvbmx5IGxpbmUsIHRoZVxuICAgIC8vIHVuc2NvcGVkIHRleHQgY29udGVudCB3aWxsIGJlIHRyZWF0ZWQgYXMgdGhlIHRpdGxlIG9mIHRoZSBsaXN0LWl0ZW0uXG4gICAgaWYgKHRoaXMuX2hhc1Vuc2NvcGVkVGV4dENvbnRlbnQpIHtcbiAgICAgIGNvbnN0IHRyZWF0QXNUaXRsZSA9IHRoaXMuX3RpdGxlcy5sZW5ndGggPT09IDAgJiYgbnVtYmVyT2ZMaW5lcyA9PT0gMTtcbiAgICAgIHVuc2NvcGVkQ29udGVudEVsLmNsYXNzTGlzdC50b2dnbGUoJ21kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCcsIHRyZWF0QXNUaXRsZSk7XG4gICAgICB1bnNjb3BlZENvbnRlbnRFbC5jbGFzc0xpc3QudG9nZ2xlKCdtZGMtbGlzdC1pdGVtX19zZWNvbmRhcnktdGV4dCcsICF0cmVhdEFzVGl0bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bnNjb3BlZENvbnRlbnRFbC5jbGFzc0xpc3QucmVtb3ZlKCdtZGMtbGlzdC1pdGVtX19wcmltYXJ5LXRleHQnKTtcbiAgICAgIHVuc2NvcGVkQ29udGVudEVsLmNsYXNzTGlzdC5yZW1vdmUoJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZmVycyB0aGUgbnVtYmVyIG9mIGxpbmVzIGJhc2VkIG9uIHRoZSBwcm9qZWN0ZWQgdXNlciBjb250ZW50LiBUaGlzIGlzIHVzZWZ1bFxuICAgKiBpZiBubyBleHBsaWNpdCBudW1iZXIgb2YgbGluZXMgaGFzIGJlZW4gc3BlY2lmaWVkIG9uIHRoZSBsaXN0IGl0ZW0uXG4gICAqXG4gICAqIFRoZSBudW1iZXIgb2YgbGluZXMgaXMgaW5mZXJyZWQgYmFzZWQgb24gd2hldGhlciB0aGVyZSBpcyBhIHRpdGxlLCB0aGUgbnVtYmVyIG9mXG4gICAqIGFkZGl0aW9uYWwgbGluZXMgKHNlY29uZGFyeS90ZXJ0aWFyeSkuIEFuIGFkZGl0aW9uYWwgbGluZSBpcyBhY3F1aXJlZCBpZiB0aGVyZSBpc1xuICAgKiB1bnNjb3BlZCB0ZXh0IGNvbnRlbnQuXG4gICAqL1xuICBwcml2YXRlIF9pbmZlckxpbmVzRnJvbUNvbnRlbnQoKSB7XG4gICAgbGV0IG51bU9mTGluZXMgPSB0aGlzLl90aXRsZXMhLmxlbmd0aCArIHRoaXMuX2xpbmVzIS5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2hhc1Vuc2NvcGVkVGV4dENvbnRlbnQpIHtcbiAgICAgIG51bU9mTGluZXMgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG51bU9mTGluZXM7XG4gIH1cblxuICAvKiogQ2hlY2tzIHdoZXRoZXIgdGhlIGxpc3QgaXRlbSBoYXMgdW5zY29wZWQgdGV4dCBjb250ZW50LiAqL1xuICBwcml2YXRlIF9jaGVja0RvbUZvclVuc2NvcGVkVGV4dENvbnRlbnQoKSB7XG4gICAgdGhpcy5faGFzVW5zY29wZWRUZXh0Q29udGVudCA9IEFycmF5LmZyb208Q2hpbGROb2RlPihcbiAgICAgIHRoaXMuX3Vuc2NvcGVkQ29udGVudCEubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzLFxuICAgIClcbiAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVUeXBlICE9PSBub2RlLkNPTU1FTlRfTk9ERSlcbiAgICAgIC5zb21lKG5vZGUgPT4gISEobm9kZS50ZXh0Q29udGVudCAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSkpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tYXQtbWRjLWxpc3Qtbm9uLWludGVyYWN0aXZlXSc6ICdfaXNOb25JbnRlcmFjdGl2ZScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbn0pXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RCYXNlIHtcbiAgX2lzTm9uSW50ZXJhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgZm9yIGFsbCBsaXN0IGl0ZW1zIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVJpcHBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVJpcHBsZTtcbiAgfVxuICBzZXQgZGlzYWJsZVJpcHBsZSh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzYWJsZVJpcHBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVJpcHBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIGFsbCBsaXN0IGl0ZW1zIGFyZSBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFNhbml0eSBjaGVja3MgdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGxpc3QgaXRlbSB3aXRoIHJlc3BlY3QgdG8gdGhlIGFtb3VudFxuICogb2YgbGluZXMsIHdoZXRoZXIgdGhlcmUgaXMgYSB0aXRsZSwgb3IgaWYgdGhlcmUgaXMgdW5zY29wZWQgdGV4dCBjb250ZW50LlxuICpcbiAqIFRoZSBjaGVja3MgYXJlIGV4dHJhY3RlZCBpbnRvIGEgdG9wLWxldmVsIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGRlYWQtY29kZVxuICogZWxpbWluYXRlZCBieSBUZXJzZXIgb3Igb3RoZXIgb3B0aW1pemVycyBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gKi9cbmZ1bmN0aW9uIHNhbml0eUNoZWNrTGlzdEl0ZW1Db250ZW50KGl0ZW06IE1hdExpc3RJdGVtQmFzZSkge1xuICBjb25zdCBudW1UaXRsZXMgPSBpdGVtLl90aXRsZXMhLmxlbmd0aDtcbiAgY29uc3QgbnVtTGluZXMgPSBpdGVtLl90aXRsZXMhLmxlbmd0aDtcblxuICBpZiAobnVtVGl0bGVzID4gMSkge1xuICAgIHRocm93IEVycm9yKCdBIGxpc3QgaXRlbSBjYW5ub3QgaGF2ZSBtdWx0aXBsZSB0aXRsZXMuJyk7XG4gIH1cbiAgaWYgKG51bVRpdGxlcyA9PT0gMCAmJiBudW1MaW5lcyA+IDApIHtcbiAgICB0aHJvdyBFcnJvcignQSBsaXN0IGl0ZW0gbGluZSBjYW4gb25seSBiZSB1c2VkIGlmIHRoZXJlIGlzIGEgbGlzdCBpdGVtIHRpdGxlLicpO1xuICB9XG4gIGlmIChcbiAgICBudW1UaXRsZXMgPT09IDAgJiZcbiAgICBpdGVtLl9oYXNVbnNjb3BlZFRleHRDb250ZW50ICYmXG4gICAgaXRlbS5fZXhwbGljaXRMaW5lcyAhPT0gbnVsbCAmJlxuICAgIGl0ZW0uX2V4cGxpY2l0TGluZXMgPiAxXG4gICkge1xuICAgIHRocm93IEVycm9yKCdBIGxpc3QgaXRlbSBjYW5ub3QgaGF2ZSB3cmFwcGluZyBjb250ZW50IHdpdGhvdXQgYSB0aXRsZS4nKTtcbiAgfVxuICBpZiAobnVtTGluZXMgPiAyIHx8IChudW1MaW5lcyA9PT0gMiAmJiBpdGVtLl9oYXNVbnNjb3BlZFRleHRDb250ZW50KSkge1xuICAgIHRocm93IEVycm9yKCdBIGxpc3QgaXRlbSBjYW4gaGF2ZSBhdCBtYXhpbXVtIHRocmVlIGxpbmVzLicpO1xuICB9XG59XG4iXX0=