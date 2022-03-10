/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MDCSlidingTabIndicatorFoundation, } from '@material/tab-indicator';
/**
 * Abstraction around the MDC tab indicator that acts as the tab header's ink bar.
 * @docs-private
 */
export class MatInkBar {
    constructor(_items) {
        this._items = _items;
    }
    /** Hides the ink bar. */
    hide() {
        this._items.forEach(item => item._foundation.deactivate());
    }
    /** Aligns the ink bar to a DOM node. */
    alignToElement(element) {
        const correspondingItem = this._items.find(item => item.elementRef.nativeElement === element);
        const currentItem = this._currentItem;
        if (currentItem) {
            currentItem._foundation.deactivate();
        }
        if (correspondingItem) {
            const clientRect = currentItem
                ? currentItem._foundation.computeContentClientRect()
                : undefined;
            // The ink bar won't animate unless we give it the `ClientRect` of the previous item.
            correspondingItem._foundation.activate(clientRect);
            this._currentItem = correspondingItem;
        }
    }
}
/**
 * Implementation of MDC's sliding tab indicator (ink bar) foundation.
 * @docs-private
 */
export class MatInkBarFoundation {
    constructor(_hostElement, _document) {
        this._hostElement = _hostElement;
        this._document = _document;
        this._fitToContent = false;
        this._adapter = {
            addClass: className => {
                if (!this._destroyed) {
                    this._hostElement.classList.add(className);
                }
            },
            removeClass: className => {
                if (!this._destroyed) {
                    this._hostElement.classList.remove(className);
                }
            },
            setContentStyleProperty: (propName, value) => {
                if (!this._destroyed) {
                    this._inkBarContentElement.style.setProperty(propName, value);
                }
            },
            computeContentClientRect: () => {
                // `getBoundingClientRect` isn't available on the server.
                return this._destroyed || !this._inkBarContentElement.getBoundingClientRect
                    ? {
                        width: 0,
                        height: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        x: 0,
                        y: 0,
                    }
                    : this._inkBarContentElement.getBoundingClientRect();
            },
        };
        this._foundation = new MDCSlidingTabIndicatorFoundation(this._adapter);
    }
    /** Aligns the ink bar to the current item. */
    activate(clientRect) {
        this._foundation.activate(clientRect);
    }
    /** Removes the ink bar from the current item. */
    deactivate() {
        this._foundation.deactivate();
    }
    /** Gets the ClientRect of the ink bar. */
    computeContentClientRect() {
        return this._foundation.computeContentClientRect();
    }
    /** Initializes the foundation. */
    init() {
        this._createInkBarElement();
        this._foundation.init();
    }
    /** Destroys the foundation. */
    destroy() {
        this._inkBarElement.remove();
        this._hostElement = this._inkBarElement = this._inkBarContentElement = null;
        this._foundation.destroy();
        this._destroyed = true;
    }
    /**
     * Sets whether the ink bar should be appended to the content, which will cause the ink bar
     * to match the width of the content rather than the tab host element.
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
     */
    getFitToContent() {
        return this._fitToContent;
    }
    /** Creates and appends the ink bar element. */
    _createInkBarElement() {
        this._inkBarElement = this._document.createElement('span');
        this._inkBarContentElement = this._document.createElement('span');
        this._inkBarElement.className = 'mdc-tab-indicator';
        this._inkBarContentElement.className =
            'mdc-tab-indicator__content' + ' mdc-tab-indicator__content--underline';
        this._inkBarElement.appendChild(this._inkBarContentElement);
        this._appendInkBarElement();
    }
    /**
     * Appends the ink bar to the tab host element or content, depending on whether
     * the ink bar should fit to content.
     */
    _appendInkBarElement() {
        if (!this._inkBarElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('Ink bar element has not been created and cannot be appended');
        }
        const parentElement = this._fitToContent
            ? this._hostElement.querySelector('.mdc-tab__content')
            : this._hostElement;
        if (!parentElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('Missing element to host the ink bar');
        }
        parentElement.appendChild(this._inkBarElement);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvaW5rLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQ0wsZ0NBQWdDLEdBR2pDLE1BQU0seUJBQXlCLENBQUM7QUFXakM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFNBQVM7SUFJcEIsWUFBb0IsTUFBZ0M7UUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7SUFBRyxDQUFDO0lBRXhELHlCQUF5QjtJQUN6QixJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxjQUFjLENBQUMsT0FBb0I7UUFDakMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQzlGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEMsSUFBSSxXQUFXLEVBQUU7WUFDZixXQUFXLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixNQUFNLFVBQVUsR0FBRyxXQUFXO2dCQUM1QixDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRTtnQkFDcEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUVkLHFGQUFxRjtZQUNyRixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdB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QUU7WUFDckUsTUFBTSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUNwRDtRQUVELGFBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VsZW1lbnRSZWYsIFF1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNRENTbGlkaW5nVGFiSW5kaWNhdG9yRm91bmRhdGlvbixcbiAgTURDVGFiSW5kaWNhdG9yQWRhcHRlcixcbiAgTURDVGFiSW5kaWNhdG9yRm91bmRhdGlvbixcbn0gZnJvbSAnQG1hdGVyaWFsL3RhYi1pbmRpY2F0b3InO1xuXG4vKipcbiAqIEl0ZW0gaW5zaWRlIGEgdGFiIGhlYWRlciByZWxhdGl2ZSB0byB3aGljaCB0aGUgaW5rIGJhciBjYW4gYmUgYWxpZ25lZC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRJbmtCYXJJdGVtIHtcbiAgX2ZvdW5kYXRpb246IE1hdElua0JhckZvdW5kYXRpb247XG4gIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xufVxuXG4vKipcbiAqIEFic3RyYWN0aW9uIGFyb3VuZCB0aGUgTURDIHRhYiBpbmRpY2F0b3IgdGhhdCBhY3RzIGFzIHRoZSB0YWIgaGVhZGVyJ3MgaW5rIGJhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdElua0JhciB7XG4gIC8qKiBJdGVtIHRvIHdoaWNoIHRoZSBpbmsgYmFyIGlzIGFsaWduZWQgY3VycmVudGx5LiAqL1xuICBwcml2YXRlIF9jdXJyZW50SXRlbTogTWF0SW5rQmFySXRlbSB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVtczogUXVlcnlMaXN0PE1hdElua0Jhckl0ZW0+KSB7fVxuXG4gIC8qKiBIaWRlcyB0aGUgaW5rIGJhci4gKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5fZm91bmRhdGlvbi5kZWFjdGl2YXRlKCkpO1xuICB9XG5cbiAgLyoqIEFsaWducyB0aGUgaW5rIGJhciB0byBhIERPTSBub2RlLiAqL1xuICBhbGlnblRvRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGNvcnJlc3BvbmRpbmdJdGVtID0gdGhpcy5faXRlbXMuZmluZChpdGVtID0+IGl0ZW0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ID09PSBlbGVtZW50KTtcbiAgICBjb25zdCBjdXJyZW50SXRlbSA9IHRoaXMuX2N1cnJlbnRJdGVtO1xuXG4gICAgaWYgKGN1cnJlbnRJdGVtKSB7XG4gICAgICBjdXJyZW50SXRlbS5fZm91bmRhdGlvbi5kZWFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKGNvcnJlc3BvbmRpbmdJdGVtKSB7XG4gICAgICBjb25zdCBjbGllbnRSZWN0ID0gY3VycmVudEl0ZW1cbiAgICAgICAgPyBjdXJyZW50SXRlbS5fZm91bmRhdGlvbi5jb21wdXRlQ29udGVudENsaWVudFJlY3QoKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gVGhlIGluayBiYXIgd29uJ3QgYW5pbWF0ZSB1bmxlc3Mgd2UgZ2l2ZSBpdCB0aGUgYENsaWVudFJlY3RgIG9mIHRoZSBwcmV2aW91cyBpdGVtLlxuICAgICAgY29ycmVzcG9uZGluZ0l0ZW0uX2ZvdW5kYXRpb24uYWN0aXZhdGUoY2xpZW50UmVjdCk7XG4gICAgICB0aGlzLl9jdXJyZW50SXRlbSA9IGNvcnJlc3BvbmRpbmdJdGVtO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIE1EQydzIHNsaWRpbmcgdGFiIGluZGljYXRvciAoaW5rIGJhcikgZm91bmRhdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdElua0JhckZvdW5kYXRpb24ge1xuICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ1RhYkluZGljYXRvckZvdW5kYXRpb247XG4gIHByaXZhdGUgX2lua0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9pbmtCYXJDb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2ZpdFRvQ29udGVudCA9IGZhbHNlO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENUYWJJbmRpY2F0b3JBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRDb250ZW50U3R5bGVQcm9wZXJ0eTogKHByb3BOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcE5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVDb250ZW50Q2xpZW50UmVjdDogKCkgPT4ge1xuICAgICAgLy8gYGdldEJvdW5kaW5nQ2xpZW50UmVjdGAgaXNuJ3QgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICByZXR1cm4gdGhpcy5fZGVzdHJveWVkIHx8ICF0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAgICAgICAgPyAoe1xuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICB9IGFzIENsaWVudFJlY3QpXG4gICAgICAgIDogdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGluZ1RhYkluZGljYXRvckZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gIH1cblxuICAvKiogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIHRoZSBjdXJyZW50IGl0ZW0uICovXG4gIGFjdGl2YXRlKGNsaWVudFJlY3Q/OiBDbGllbnRSZWN0KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5hY3RpdmF0ZShjbGllbnRSZWN0KTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIHRoZSBpbmsgYmFyIGZyb20gdGhlIGN1cnJlbnQgaXRlbS4gKi9cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBDbGllbnRSZWN0IG9mIHRoZSBpbmsgYmFyLiAqL1xuICBjb21wdXRlQ29udGVudENsaWVudFJlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvdW5kYXRpb24uY29tcHV0ZUNvbnRlbnRDbGllbnRSZWN0KCk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhlIGZvdW5kYXRpb24uICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5fY3JlYXRlSW5rQmFyRWxlbWVudCgpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgLyoqIERlc3Ryb3lzIHRoZSBmb3VuZGF0aW9uLiAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2lua0JhckVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5faG9zdEVsZW1lbnQgPSB0aGlzLl9pbmtCYXJFbGVtZW50ID0gdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQgPSBudWxsITtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgYmUgYXBwZW5kZWQgdG8gdGhlIGNvbnRlbnQsIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGluayBiYXJcbiAgICogdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHJhdGhlciB0aGFuIHRoZSB0YWIgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgc2V0Rml0VG9Db250ZW50KGZpdFRvQ29udGVudDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9maXRUb0NvbnRlbnQgIT09IGZpdFRvQ29udGVudCkge1xuICAgICAgdGhpcy5fZml0VG9Db250ZW50ID0gZml0VG9Db250ZW50O1xuICAgICAgaWYgKHRoaXMuX2lua0JhckVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fYXBwZW5kSW5rQmFyRWxlbWVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHdoZXRoZXIgdGhlIGluayBiYXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvIHRoZSBjb250ZW50LCB3aGljaCB3aWxsIGNhdXNlIHRoZSBpbmsgYmFyXG4gICAqIHRvIG1hdGNoIHRoZSB3aWR0aCBvZiB0aGUgY29udGVudCByYXRoZXIgdGhhbiB0aGUgdGFiIGhvc3QgZWxlbWVudC5cbiAgICovXG4gIGdldEZpdFRvQ29udGVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZml0VG9Db250ZW50O1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYW5kIGFwcGVuZHMgdGhlIGluayBiYXIgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW5rQmFyRWxlbWVudCgpIHtcbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgdGhpcy5faW5rQmFyRWxlbWVudC5jbGFzc05hbWUgPSAnbWRjLXRhYi1pbmRpY2F0b3InO1xuICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LmNsYXNzTmFtZSA9XG4gICAgICAnbWRjLXRhYi1pbmRpY2F0b3JfX2NvbnRlbnQnICsgJyBtZGMtdGFiLWluZGljYXRvcl9fY29udGVudC0tdW5kZXJsaW5lJztcblxuICAgIHRoaXMuX2lua0JhckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQpO1xuICAgIHRoaXMuX2FwcGVuZElua0JhckVsZW1lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHRoZSBpbmsgYmFyIHRvIHRoZSB0YWIgaG9zdCBlbGVtZW50IG9yIGNvbnRlbnQsIGRlcGVuZGluZyBvbiB3aGV0aGVyXG4gICAqIHRoZSBpbmsgYmFyIHNob3VsZCBmaXQgdG8gY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgX2FwcGVuZElua0JhckVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLl9pbmtCYXJFbGVtZW50ICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignSW5rIGJhciBlbGVtZW50IGhhcyBub3QgYmVlbiBjcmVhdGVkIGFuZCBjYW5ub3QgYmUgYXBwZW5kZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5fZml0VG9Db250ZW50XG4gICAgICA/IHRoaXMuX2hvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtdGFiX19jb250ZW50JylcbiAgICAgIDogdGhpcy5faG9zdEVsZW1lbnQ7XG5cbiAgICBpZiAoIXBhcmVudEVsZW1lbnQgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdNaXNzaW5nIGVsZW1lbnQgdG8gaG9zdCB0aGUgaW5rIGJhcicpO1xuICAgIH1cblxuICAgIHBhcmVudEVsZW1lbnQhLmFwcGVuZENoaWxkKHRoaXMuX2lua0JhckVsZW1lbnQpO1xuICB9XG59XG4iXX0=