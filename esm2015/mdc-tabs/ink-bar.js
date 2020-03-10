/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-tabs/ink-bar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator';
/**
 * Item inside a tab header relative to which the ink bar can be aligned.
 * \@docs-private
 * @record
 */
export function MatInkBarItem() { }
if (false) {
    /** @type {?} */
    MatInkBarItem.prototype._foundation;
    /** @type {?} */
    MatInkBarItem.prototype.elementRef;
}
/**
 * Abstraction around the MDC tab indicator that acts as the tab header's ink bar.
 * \@docs-private
 */
export class MatInkBar {
    /**
     * @param {?} _items
     */
    constructor(_items) {
        this._items = _items;
    }
    /**
     * Hides the ink bar.
     * @return {?}
     */
    hide() {
        this._items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => item._foundation.deactivate()));
    }
    /**
     * Aligns the ink bar to a DOM node.
     * @param {?} element
     * @return {?}
     */
    alignToElement(element) {
        /** @type {?} */
        const correspondingItem = this._items.find((/**
         * @param {?} item
         * @return {?}
         */
        item => item.elementRef.nativeElement === element));
        /** @type {?} */
        const currentItem = this._currentItem;
        if (currentItem) {
            currentItem._foundation.deactivate();
        }
        if (correspondingItem) {
            /** @type {?} */
            const clientRect = currentItem ?
                currentItem._foundation.computeContentClientRect() : undefined;
            // The ink bar won't animate unless we give it the `ClientRect` of the previous item.
            correspondingItem._foundation.activate(clientRect);
            this._currentItem = correspondingItem;
        }
    }
}
if (false) {
    /**
     * Item to which the ink bar is aligned currently.
     * @type {?}
     * @private
     */
    MatInkBar.prototype._currentItem;
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._items;
}
/**
 * Implementation of MDC's sliding tab indicator (ink bar) foundation.
 * \@docs-private
 */
export class MatInkBarFoundation {
    /**
     * @param {?} _hostElement
     * @param {?} _document
     */
    constructor(_hostElement, _document) {
        this._hostElement = _hostElement;
        this._document = _document;
        this._fitToContent = false;
        this._adapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            className => {
                if (!this._destroyed) {
                    this._hostElement.classList.add(className);
                }
            }),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            className => {
                if (!this._destroyed) {
                    this._hostElement.classList.remove(className);
                }
            }),
            setContentStyleProperty: (/**
             * @param {?} propName
             * @param {?} value
             * @return {?}
             */
            (propName, value) => {
                this._inkBarContentElement.style.setProperty(propName, value);
            }),
            computeContentClientRect: (/**
             * @return {?}
             */
            () => {
                // `getBoundingClientRect` isn't available on the server.
                return this._destroyed || !this._inkBarContentElement.getBoundingClientRect ? {
                    width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0
                } : this._inkBarContentElement.getBoundingClientRect();
            })
        };
        this._foundation = new MDCSlidingTabIndicatorFoundation(this._adapter);
    }
    /**
     * Aligns the ink bar to the current item.
     * @param {?=} clientRect
     * @return {?}
     */
    activate(clientRect) {
        this._foundation.activate(clientRect);
    }
    /**
     * Removes the ink bar from the current item.
     * @return {?}
     */
    deactivate() {
        this._foundation.deactivate();
    }
    /**
     * Gets the ClientRect of the ink bar.
     * @return {?}
     */
    computeContentClientRect() {
        return this._foundation.computeContentClientRect();
    }
    /**
     * Initializes the foundation.
     * @return {?}
     */
    init() {
        this._createInkBarElement();
        this._foundation.init();
    }
    /**
     * Destroys the foundation.
     * @return {?}
     */
    destroy() {
        if (this._inkBarElement.parentNode) {
            this._inkBarElement.parentNode.removeChild(this._inkBarElement);
        }
        this._hostElement = this._inkBarElement = this._inkBarContentElement = (/** @type {?} */ (null));
        this._foundation.destroy();
        this._destroyed = true;
    }
    /**
     * Sets whether the ink bar should be appended to the content, which will cause the ink bar
     * to match the width of the content rather than the tab host element.
     * @param {?} fitToContent
     * @return {?}
     */
    setFitToContent(fitToContent) {
        if (this._fitToContent !== fitToContent) {
            this._fitToContent = fitToContent;
            if (this._inkBarElement) {
                this._appendInkBarElement();
            }
        }
    }
    /**
     * Gets whether the ink bar should be appended to the content, which will cause the ink bar
     * to match the width of the content rather than the tab host element.
     * @return {?}
     */
    getFitToContent() { return this._fitToContent; }
    /**
     * Creates and appends the ink bar element.
     * @private
     * @return {?}
     */
    _createInkBarElement() {
        this._inkBarElement = this._document.createElement('span');
        this._inkBarContentElement = this._document.createElement('span');
        this._inkBarElement.className = 'mdc-tab-indicator';
        this._inkBarContentElement.className = 'mdc-tab-indicator__content' +
            ' mdc-tab-indicator__content--underline';
        this._inkBarElement.appendChild(this._inkBarContentElement);
        this._appendInkBarElement();
    }
    /**
     * Appends the ink bar to the tab host element or content, depending on whether
     * the ink bar should fit to content.
     * @private
     * @return {?}
     */
    _appendInkBarElement() {
        if (!this._inkBarElement) {
            throw Error('Ink bar element has not been created and cannot be appended');
        }
        /** @type {?} */
        const parentElement = this._fitToContent ?
            this._hostElement.querySelector('.mdc-tab__content') :
            this._hostElement;
        if (!parentElement) {
            throw Error('Missing element to host the ink bar');
        }
        parentElement.appendChild(this._inkBarElement);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._destroyed;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._foundation;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._inkBarElement;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._inkBarContentElement;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._fitToContent;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._hostElement;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvaW5rLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQ0wsZ0NBQWdDLEVBR2pDLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQU1qQyxtQ0FHQzs7O0lBRkMsb0NBQWlDOztJQUNqQyxtQ0FBb0M7Ozs7OztBQU90QyxNQUFNLE9BQU8sU0FBUzs7OztJQUlwQixZQUFvQixNQUFnQztRQUFoQyxXQUFNLEdBQU4sTUFBTSxDQUEwQjtJQUFHLENBQUM7Ozs7O0lBR3hELElBQUk7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7SUFHRCxjQUFjLENBQUMsT0FBb0I7O2NBQzNCLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUFDOztjQUN2RixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVk7UUFFckMsSUFBSSxXQUFXLEVBQUU7WUFDZixXQUFXLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxpQkFBaUIsRUFBRTs7a0JBQ2YsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDO2dCQUM1QixXQUFXLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFFbEUscUZBQXFGO1lBQ3JGLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksR0FB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QUNGOzs7Ozs7SUFuSEMseUNBQTRCOzs7OztJQUM1QiwwQ0FBK0M7Ozs7O0lBQy9DLDZDQUFvQzs7Ozs7SUFDcEMsb0RBQTJDOzs7OztJQUMzQyw0Q0FBOEI7Ozs7O0lBQzlCLHVDQW9CRTs7Ozs7SUFFVSwyQ0FBaUM7Ozs7O0lBQUUsd0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RWxlbWVudFJlZiwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1EQ1NsaWRpbmdUYWJJbmRpY2F0b3JGb3VuZGF0aW9uLFxuICBNRENUYWJJbmRpY2F0b3JBZGFwdGVyLFxuICBNRENUYWJJbmRpY2F0b3JGb3VuZGF0aW9uXG59IGZyb20gJ0BtYXRlcmlhbC90YWItaW5kaWNhdG9yJztcblxuLyoqXG4gKiBJdGVtIGluc2lkZSBhIHRhYiBoZWFkZXIgcmVsYXRpdmUgdG8gd2hpY2ggdGhlIGluayBiYXIgY2FuIGJlIGFsaWduZWQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0SW5rQmFySXRlbSB7XG4gIF9mb3VuZGF0aW9uOiBNYXRJbmtCYXJGb3VuZGF0aW9uO1xuICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pjtcbn1cblxuLyoqXG4gKiBBYnN0cmFjdGlvbiBhcm91bmQgdGhlIE1EQyB0YWIgaW5kaWNhdG9yIHRoYXQgYWN0cyBhcyB0aGUgdGFiIGhlYWRlcidzIGluayBiYXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRJbmtCYXIge1xuICAvKiogSXRlbSB0byB3aGljaCB0aGUgaW5rIGJhciBpcyBhbGlnbmVkIGN1cnJlbnRseS4gKi9cbiAgcHJpdmF0ZSBfY3VycmVudEl0ZW06IE1hdElua0Jhckl0ZW18dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8TWF0SW5rQmFySXRlbT4pIHt9XG5cbiAgLyoqIEhpZGVzIHRoZSBpbmsgYmFyLiAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKSk7XG4gIH1cblxuICAvKiogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIGEgRE9NIG5vZGUuICovXG4gIGFsaWduVG9FbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ0l0ZW0gPSB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQpO1xuICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gdGhpcy5fY3VycmVudEl0ZW07XG5cbiAgICBpZiAoY3VycmVudEl0ZW0pIHtcbiAgICAgIGN1cnJlbnRJdGVtLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoY29ycmVzcG9uZGluZ0l0ZW0pIHtcbiAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBjdXJyZW50SXRlbSA/XG4gICAgICAgICAgY3VycmVudEl0ZW0uX2ZvdW5kYXRpb24uY29tcHV0ZUNvbnRlbnRDbGllbnRSZWN0KCkgOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIFRoZSBpbmsgYmFyIHdvbid0IGFuaW1hdGUgdW5sZXNzIHdlIGdpdmUgaXQgdGhlIGBDbGllbnRSZWN0YCBvZiB0aGUgcHJldmlvdXMgaXRlbS5cbiAgICAgIGNvcnJlc3BvbmRpbmdJdGVtLl9mb3VuZGF0aW9uLmFjdGl2YXRlKGNsaWVudFJlY3QpO1xuICAgICAgdGhpcy5fY3VycmVudEl0ZW0gPSBjb3JyZXNwb25kaW5nSXRlbTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBNREMncyBzbGlkaW5nIHRhYiBpbmRpY2F0b3IgKGluayBiYXIpIGZvdW5kYXRpb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRJbmtCYXJGb3VuZGF0aW9uIHtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuO1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENUYWJJbmRpY2F0b3JGb3VuZGF0aW9uO1xuICBwcml2YXRlIF9pbmtCYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfaW5rQmFyQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9maXRUb0NvbnRlbnQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDVGFiSW5kaWNhdG9yQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgIGlmICghdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q29udGVudFN0eWxlUHJvcGVydHk6IChwcm9wTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBjb21wdXRlQ29udGVudENsaWVudFJlY3Q6ICgpID0+IHtcbiAgICAgIC8vIGBnZXRCb3VuZGluZ0NsaWVudFJlY3RgIGlzbid0IGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyLlxuICAgICAgcmV0dXJuIHRoaXMuX2Rlc3Ryb3llZCB8fCAhdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID8ge1xuICAgICAgICB3aWR0aDogMCwgaGVpZ2h0OiAwLCB0b3A6IDAsIGxlZnQ6IDAsIHJpZ2h0OiAwLCBib3R0b206IDBcbiAgICAgIH0gOiB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uID0gbmV3IE1EQ1NsaWRpbmdUYWJJbmRpY2F0b3JGb3VuZGF0aW9uKHRoaXMuX2FkYXB0ZXIpO1xuICB9XG5cbiAgLyoqIEFsaWducyB0aGUgaW5rIGJhciB0byB0aGUgY3VycmVudCBpdGVtLiAqL1xuICBhY3RpdmF0ZShjbGllbnRSZWN0PzogQ2xpZW50UmVjdCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uYWN0aXZhdGUoY2xpZW50UmVjdCk7XG4gIH1cblxuICAvKiogUmVtb3ZlcyB0aGUgaW5rIGJhciBmcm9tIHRoZSBjdXJyZW50IGl0ZW0uICovXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgQ2xpZW50UmVjdCBvZiB0aGUgaW5rIGJhci4gKi9cbiAgY29tcHV0ZUNvbnRlbnRDbGllbnRSZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9mb3VuZGF0aW9uLmNvbXB1dGVDb250ZW50Q2xpZW50UmVjdCgpO1xuICB9XG5cbiAgLyoqIEluaXRpYWxpemVzIHRoZSBmb3VuZGF0aW9uLiAqL1xuICBpbml0KCkge1xuICAgIHRoaXMuX2NyZWF0ZUlua0JhckVsZW1lbnQoKTtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmluaXQoKTtcbiAgfVxuXG4gIC8qKiBEZXN0cm95cyB0aGUgZm91bmRhdGlvbi4gKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5faW5rQmFyRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLl9pbmtCYXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5faW5rQmFyRWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5faG9zdEVsZW1lbnQgPSB0aGlzLl9pbmtCYXJFbGVtZW50ID0gdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQgPSBudWxsITtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgYmUgYXBwZW5kZWQgdG8gdGhlIGNvbnRlbnQsIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGluayBiYXJcbiAgICogdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHJhdGhlciB0aGFuIHRoZSB0YWIgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgc2V0Rml0VG9Db250ZW50KGZpdFRvQ29udGVudDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9maXRUb0NvbnRlbnQgIT09IGZpdFRvQ29udGVudCkge1xuICAgICAgdGhpcy5fZml0VG9Db250ZW50ID0gZml0VG9Db250ZW50O1xuICAgICAgaWYgKHRoaXMuX2lua0JhckVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fYXBwZW5kSW5rQmFyRWxlbWVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgYmUgYXBwZW5kZWQgdG8gdGhlIGNvbnRlbnQsIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGluayBiYXJcbiAgICogdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHJhdGhlciB0aGFuIHRoZSB0YWIgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgZ2V0Rml0VG9Db250ZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZml0VG9Db250ZW50OyB9XG5cbiAgLyoqIENyZWF0ZXMgYW5kIGFwcGVuZHMgdGhlIGluayBiYXIgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW5rQmFyRWxlbWVudCgpIHtcbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgdGhpcy5faW5rQmFyRWxlbWVudC5jbGFzc05hbWUgPSAnbWRjLXRhYi1pbmRpY2F0b3InO1xuICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LmNsYXNzTmFtZSA9ICdtZGMtdGFiLWluZGljYXRvcl9fY29udGVudCcgK1xuICAgICAgICAnIG1kYy10YWItaW5kaWNhdG9yX19jb250ZW50LS11bmRlcmxpbmUnO1xuXG4gICAgdGhpcy5faW5rQmFyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudCk7XG4gICAgdGhpcy5fYXBwZW5kSW5rQmFyRWxlbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgdGhlIGluayBiYXIgdG8gdGhlIHRhYiBob3N0IGVsZW1lbnQgb3IgY29udGVudCwgZGVwZW5kaW5nIG9uIHdoZXRoZXJcbiAgICogdGhlIGluayBiYXIgc2hvdWxkIGZpdCB0byBjb250ZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwZW5kSW5rQmFyRWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMuX2lua0JhckVsZW1lbnQpIHtcbiAgICAgIHRocm93IEVycm9yKCdJbmsgYmFyIGVsZW1lbnQgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgYW5kIGNhbm5vdCBiZSBhcHBlbmRlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLl9maXRUb0NvbnRlbnQgP1xuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLXRhYl9fY29udGVudCcpIDpcbiAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQ7XG5cbiAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRocm93IEVycm9yKCdNaXNzaW5nIGVsZW1lbnQgdG8gaG9zdCB0aGUgaW5rIGJhcicpO1xuICAgIH1cblxuICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyRWxlbWVudCk7XG4gIH1cbn1cbiJdfQ==