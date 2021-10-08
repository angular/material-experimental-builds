/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator';
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
            const clientRect = currentItem ?
                currentItem._foundation.computeContentClientRect() : undefined;
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
                this._inkBarContentElement.style.setProperty(propName, value);
            },
            computeContentClientRect: () => {
                // `getBoundingClientRect` isn't available on the server.
                return this._destroyed || !this._inkBarContentElement.getBoundingClientRect ? {
                    width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0
                } : this._inkBarContentElement.getBoundingClientRect();
            }
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
    getFitToContent() { return this._fitToContent; }
    /** Creates and appends the ink bar element. */
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
     */
    _appendInkBarElement() {
        if (!this._inkBarElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('Ink bar element has not been created and cannot be appended');
        }
        const parentElement = this._fitToContent ?
            this._hostElement.querySelector('.mdc-tab__content') :
            this._hostElement;
        if (!parentElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('Missing element to host the ink bar');
        }
        parentElement.appendChild(this._inkBarElement);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvaW5rLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQ0wsZ0NBQWdDLEVBR2pDLE1BQU0seUJBQXlCLENBQUM7QUFXakM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFNBQVM7SUFJcEIsWUFBb0IsTUFBZ0M7UUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7SUFBRyxDQUFDO0lBRXhELHlCQUF5QjtJQUN6QixJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxjQUFjLENBQUMsT0FBb0I7UUFDakMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQzlGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEMsSUFBSSxXQUFXLEVBQUU7WUFDZixXQUFXLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQztnQkFDNUIsV0FBVyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFbkUscUZBQXFGO1lBQ3JGLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksR0FB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QUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFbGVtZW50UmVmLCBRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTURDU2xpZGluZ1RhYkluZGljYXRvckZvdW5kYXRpb24sXG4gIE1EQ1RhYkluZGljYXRvckFkYXB0ZXIsXG4gIE1EQ1RhYkluZGljYXRvckZvdW5kYXRpb25cbn0gZnJvbSAnQG1hdGVyaWFsL3RhYi1pbmRpY2F0b3InO1xuXG4vKipcbiAqIEl0ZW0gaW5zaWRlIGEgdGFiIGhlYWRlciByZWxhdGl2ZSB0byB3aGljaCB0aGUgaW5rIGJhciBjYW4gYmUgYWxpZ25lZC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRJbmtCYXJJdGVtIHtcbiAgX2ZvdW5kYXRpb246IE1hdElua0JhckZvdW5kYXRpb247XG4gIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xufVxuXG4vKipcbiAqIEFic3RyYWN0aW9uIGFyb3VuZCB0aGUgTURDIHRhYiBpbmRpY2F0b3IgdGhhdCBhY3RzIGFzIHRoZSB0YWIgaGVhZGVyJ3MgaW5rIGJhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdElua0JhciB7XG4gIC8qKiBJdGVtIHRvIHdoaWNoIHRoZSBpbmsgYmFyIGlzIGFsaWduZWQgY3VycmVudGx5LiAqL1xuICBwcml2YXRlIF9jdXJyZW50SXRlbTogTWF0SW5rQmFySXRlbXx1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlbXM6IFF1ZXJ5TGlzdDxNYXRJbmtCYXJJdGVtPikge31cblxuICAvKiogSGlkZXMgdGhlIGluayBiYXIuICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uX2ZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpKTtcbiAgfVxuXG4gIC8qKiBBbGlnbnMgdGhlIGluayBiYXIgdG8gYSBET00gbm9kZS4gKi9cbiAgYWxpZ25Ub0VsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nSXRlbSA9IHRoaXMuX2l0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA9PT0gZWxlbWVudCk7XG4gICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLl9jdXJyZW50SXRlbTtcblxuICAgIGlmIChjdXJyZW50SXRlbSkge1xuICAgICAgY3VycmVudEl0ZW0uX2ZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIGlmIChjb3JyZXNwb25kaW5nSXRlbSkge1xuICAgICAgY29uc3QgY2xpZW50UmVjdCA9IGN1cnJlbnRJdGVtID9cbiAgICAgICAgICBjdXJyZW50SXRlbS5fZm91bmRhdGlvbi5jb21wdXRlQ29udGVudENsaWVudFJlY3QoKSA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gVGhlIGluayBiYXIgd29uJ3QgYW5pbWF0ZSB1bmxlc3Mgd2UgZ2l2ZSBpdCB0aGUgYENsaWVudFJlY3RgIG9mIHRoZSBwcmV2aW91cyBpdGVtLlxuICAgICAgY29ycmVzcG9uZGluZ0l0ZW0uX2ZvdW5kYXRpb24uYWN0aXZhdGUoY2xpZW50UmVjdCk7XG4gICAgICB0aGlzLl9jdXJyZW50SXRlbSA9IGNvcnJlc3BvbmRpbmdJdGVtO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIE1EQydzIHNsaWRpbmcgdGFiIGluZGljYXRvciAoaW5rIGJhcikgZm91bmRhdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdElua0JhckZvdW5kYXRpb24ge1xuICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2ZvdW5kYXRpb246IE1EQ1RhYkluZGljYXRvckZvdW5kYXRpb247XG4gIHByaXZhdGUgX2lua0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9pbmtCYXJDb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2ZpdFRvQ29udGVudCA9IGZhbHNlO1xuICBwcml2YXRlIF9hZGFwdGVyOiBNRENUYWJJbmRpY2F0b3JBZGFwdGVyID0ge1xuICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRDb250ZW50U3R5bGVQcm9wZXJ0eTogKHByb3BOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcE5hbWUsIHZhbHVlKTtcbiAgICB9LFxuICAgIGNvbXB1dGVDb250ZW50Q2xpZW50UmVjdDogKCkgPT4ge1xuICAgICAgLy8gYGdldEJvdW5kaW5nQ2xpZW50UmVjdGAgaXNuJ3QgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICByZXR1cm4gdGhpcy5fZGVzdHJveWVkIHx8ICF0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPyB7XG4gICAgICAgIHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHRvcDogMCwgbGVmdDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgeDogMCwgeTogMFxuICAgICAgfSBhcyBDbGllbnRSZWN0IDogdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkaW5nVGFiSW5kaWNhdG9yRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgfVxuXG4gIC8qKiBBbGlnbnMgdGhlIGluayBiYXIgdG8gdGhlIGN1cnJlbnQgaXRlbS4gKi9cbiAgYWN0aXZhdGUoY2xpZW50UmVjdD86IENsaWVudFJlY3QpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmFjdGl2YXRlKGNsaWVudFJlY3QpO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgdGhlIGluayBiYXIgZnJvbSB0aGUgY3VycmVudCBpdGVtLiAqL1xuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIENsaWVudFJlY3Qgb2YgdGhlIGluayBiYXIuICovXG4gIGNvbXB1dGVDb250ZW50Q2xpZW50UmVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5jb21wdXRlQ29udGVudENsaWVudFJlY3QoKTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyB0aGUgZm91bmRhdGlvbi4gKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLl9jcmVhdGVJbmtCYXJFbGVtZW50KCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICAvKiogRGVzdHJveXMgdGhlIGZvdW5kYXRpb24uICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5faW5rQmFyRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudCA9IHRoaXMuX2lua0JhckVsZW1lbnQgPSB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudCA9IG51bGwhO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGUgY29udGVudCwgd2hpY2ggd2lsbCBjYXVzZSB0aGUgaW5rIGJhclxuICAgKiB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgcmF0aGVyIHRoYW4gdGhlIHRhYiBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBzZXRGaXRUb0NvbnRlbnQoZml0VG9Db250ZW50OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2ZpdFRvQ29udGVudCAhPT0gZml0VG9Db250ZW50KSB7XG4gICAgICB0aGlzLl9maXRUb0NvbnRlbnQgPSBmaXRUb0NvbnRlbnQ7XG4gICAgICBpZiAodGhpcy5faW5rQmFyRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9hcHBlbmRJbmtCYXJFbGVtZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGUgY29udGVudCwgd2hpY2ggd2lsbCBjYXVzZSB0aGUgaW5rIGJhclxuICAgKiB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgcmF0aGVyIHRoYW4gdGhlIHRhYiBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBnZXRGaXRUb0NvbnRlbnQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9maXRUb0NvbnRlbnQ7IH1cblxuICAvKiogQ3JlYXRlcyBhbmQgYXBwZW5kcyB0aGUgaW5rIGJhciBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9jcmVhdGVJbmtCYXJFbGVtZW50KCkge1xuICAgIHRoaXMuX2lua0JhckVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50LmNsYXNzTmFtZSA9ICdtZGMtdGFiLWluZGljYXRvcic7XG4gICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuY2xhc3NOYW1lID0gJ21kYy10YWItaW5kaWNhdG9yX19jb250ZW50JyArXG4gICAgICAgICcgbWRjLXRhYi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZSc7XG5cbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50KTtcbiAgICB0aGlzLl9hcHBlbmRJbmtCYXJFbGVtZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyB0aGUgaW5rIGJhciB0byB0aGUgdGFiIGhvc3QgZWxlbWVudCBvciBjb250ZW50LCBkZXBlbmRpbmcgb24gd2hldGhlclxuICAgKiB0aGUgaW5rIGJhciBzaG91bGQgZml0IHRvIGNvbnRlbnQuXG4gICAqL1xuICBwcml2YXRlIF9hcHBlbmRJbmtCYXJFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy5faW5rQmFyRWxlbWVudCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0luayBiYXIgZWxlbWVudCBoYXMgbm90IGJlZW4gY3JlYXRlZCBhbmQgY2Fubm90IGJlIGFwcGVuZGVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMuX2ZpdFRvQ29udGVudCA/XG4gICAgICAgIHRoaXMuX2hvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtdGFiX19jb250ZW50JykgOlxuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudDtcblxuICAgIGlmICghcGFyZW50RWxlbWVudCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ01pc3NpbmcgZWxlbWVudCB0byBob3N0IHRoZSBpbmsgYmFyJyk7XG4gICAgfVxuXG4gICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyRWxlbWVudCk7XG4gIH1cbn1cbiJdfQ==