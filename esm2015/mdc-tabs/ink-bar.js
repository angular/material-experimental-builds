/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator';
class TabIndicatorAdapter {
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    addClass(className) {
        if (!this._delegate._destroyed) {
            this._delegate._hostElement.classList.add(className);
        }
    }
    removeClass(className) {
        if (!this._delegate._destroyed) {
            this._delegate._hostElement.classList.remove(className);
        }
    }
    setContentStyleProperty(propName, value) {
        this._delegate._inkBarContentElement.style.setProperty(propName, value);
    }
    computeContentClientRect() {
        // `getBoundingClientRect` isn't available on the server.
        return this._delegate._destroyed ||
            !this._delegate._inkBarContentElement.getBoundingClientRect ? {
            width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0
        } : this._delegate._inkBarContentElement.getBoundingClientRect();
    }
}
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
        this._adapter = new TabIndicatorAdapter(this);
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
        if (this._inkBarElement.parentNode) {
            this._inkBarElement.parentNode.removeChild(this._inkBarElement);
        }
        this._hostElement = this._inkBarElement
            = this._inkBarContentElement = null;
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
        this._inkBarContentElement
            = this._document.createElement('span');
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
        if (!this._inkBarElement) {
            throw Error('Ink bar element has not been created and cannot be appended');
        }
        const parentElement = this._fitToContent ?
            this._hostElement.querySelector('.mdc-tab__content') :
            this._hostElement;
        if (!parentElement) {
            throw Error('Missing element to host the ink bar');
        }
        parentElement.appendChild(this._inkBarElement);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvaW5rLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQ0wsZ0NBQWdDLEVBR2pDLE1BQU0seUJBQXlCLENBQUM7QUFFakMsTUFBTSxtQkFBbUI7SUFDdkIsWUFBNkIsU0FBOEI7UUFBOUIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7SUFBRyxDQUFDO0lBQy9ELFFBQVEsQ0FBQyxTQUFpQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFDRCxXQUFXLENBQUMsU0FBaUI7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBQ0QsdUJBQXVCLENBQUMsUUFBZ0IsRUFBRSxLQUFvQjtRQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDRCx3QkFBd0I7UUFDdEIseURBQXlEO1FBQ3pELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVO1lBQzlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDOUQsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFB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WSxDQUFDO1FBRXRCLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEIsTUFBTSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUNwRDtRQUVELGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VsZW1lbnRSZWYsIFF1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNRENTbGlkaW5nVGFiSW5kaWNhdG9yRm91bmRhdGlvbixcbiAgTURDVGFiSW5kaWNhdG9yQWRhcHRlcixcbiAgTURDVGFiSW5kaWNhdG9yRm91bmRhdGlvblxufSBmcm9tICdAbWF0ZXJpYWwvdGFiLWluZGljYXRvcic7XG5cbmNsYXNzIFRhYkluZGljYXRvckFkYXB0ZXIgaW1wbGVtZW50cyBNRENUYWJJbmRpY2F0b3JBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBfZGVsZWdhdGU6IE1hdElua0JhckZvdW5kYXRpb24pIHt9XG4gIGFkZENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLl9kZWxlZ2F0ZS5fZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLl9kZWxlZ2F0ZS5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuICByZW1vdmVDbGFzcyhjbGFzc05hbWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fZGVsZWdhdGUuX2Rlc3Ryb3llZCkge1xuICAgICAgdGhpcy5fZGVsZWdhdGUuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbiAgc2V0Q29udGVudFN0eWxlUHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5faW5rQmFyQ29udGVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcE5hbWUsIHZhbHVlKTtcbiAgfVxuICBjb21wdXRlQ29udGVudENsaWVudFJlY3QoKSB7XG4gICAgLy8gYGdldEJvdW5kaW5nQ2xpZW50UmVjdGAgaXNuJ3QgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXIuXG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLl9kZXN0cm95ZWQgfHxcbiAgICAgICF0aGlzLl9kZWxlZ2F0ZS5faW5rQmFyQ29udGVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID8ge1xuICAgICAgd2lkdGg6IDAsIGhlaWdodDogMCwgdG9wOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgYm90dG9tOiAwXG4gICAgfSA6IHRoaXMuX2RlbGVnYXRlLl9pbmtCYXJDb250ZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxufVxuXG4vKipcbiAqIEl0ZW0gaW5zaWRlIGEgdGFiIGhlYWRlciByZWxhdGl2ZSB0byB3aGljaCB0aGUgaW5rIGJhciBjYW4gYmUgYWxpZ25lZC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRJbmtCYXJJdGVtIHtcbiAgX2ZvdW5kYXRpb246IE1hdElua0JhckZvdW5kYXRpb247XG4gIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xufVxuXG4vKipcbiAqIEFic3RyYWN0aW9uIGFyb3VuZCB0aGUgTURDIHRhYiBpbmRpY2F0b3IgdGhhdCBhY3RzIGFzIHRoZSB0YWIgaGVhZGVyJ3MgaW5rIGJhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdElua0JhciB7XG4gIC8qKiBJdGVtIHRvIHdoaWNoIHRoZSBpbmsgYmFyIGlzIGFsaWduZWQgY3VycmVudGx5LiAqL1xuICBwcml2YXRlIF9jdXJyZW50SXRlbTogTWF0SW5rQmFySXRlbXx1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlbXM6IFF1ZXJ5TGlzdDxNYXRJbmtCYXJJdGVtPikge31cblxuICAvKiogSGlkZXMgdGhlIGluayBiYXIuICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uX2ZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpKTtcbiAgfVxuXG4gIC8qKiBBbGlnbnMgdGhlIGluayBiYXIgdG8gYSBET00gbm9kZS4gKi9cbiAgYWxpZ25Ub0VsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nSXRlbSA9IHRoaXMuX2l0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA9PT0gZWxlbWVudCk7XG4gICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLl9jdXJyZW50SXRlbTtcblxuICAgIGlmIChjdXJyZW50SXRlbSkge1xuICAgICAgY3VycmVudEl0ZW0uX2ZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIGlmIChjb3JyZXNwb25kaW5nSXRlbSkge1xuICAgICAgY29uc3QgY2xpZW50UmVjdCA9IGN1cnJlbnRJdGVtID9cbiAgICAgICAgICBjdXJyZW50SXRlbS5fZm91bmRhdGlvbi5jb21wdXRlQ29udGVudENsaWVudFJlY3QoKSA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gVGhlIGluayBiYXIgd29uJ3QgYW5pbWF0ZSB1bmxlc3Mgd2UgZ2l2ZSBpdCB0aGUgYENsaWVudFJlY3RgIG9mIHRoZSBwcmV2aW91cyBpdGVtLlxuICAgICAgY29ycmVzcG9uZGluZ0l0ZW0uX2ZvdW5kYXRpb24uYWN0aXZhdGUoY2xpZW50UmVjdCk7XG4gICAgICB0aGlzLl9jdXJyZW50SXRlbSA9IGNvcnJlc3BvbmRpbmdJdGVtO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIE1EQydzIHNsaWRpbmcgdGFiIGluZGljYXRvciAoaW5rIGJhcikgZm91bmRhdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdElua0JhckZvdW5kYXRpb24ge1xuICByZWFkb25seSBfZGVzdHJveWVkOiBib29sZWFuO1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENUYWJJbmRpY2F0b3JGb3VuZGF0aW9uO1xuICBwcml2YXRlIF9pbmtCYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcmVhZG9ubHkgX2lua0JhckNvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfZml0VG9Db250ZW50ID0gZmFsc2U7XG4gIHByaXZhdGUgX2FkYXB0ZXI6IE1EQ1RhYkluZGljYXRvckFkYXB0ZXI7XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50KSB7XG4gICAgdGhpcy5fYWRhcHRlciA9IG5ldyBUYWJJbmRpY2F0b3JBZGFwdGVyKHRoaXMpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGluZ1RhYkluZGljYXRvckZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gIH1cblxuICAvKiogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIHRoZSBjdXJyZW50IGl0ZW0uICovXG4gIGFjdGl2YXRlKGNsaWVudFJlY3Q/OiBDbGllbnRSZWN0KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5hY3RpdmF0ZShjbGllbnRSZWN0KTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIHRoZSBpbmsgYmFyIGZyb20gdGhlIGN1cnJlbnQgaXRlbS4gKi9cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBDbGllbnRSZWN0IG9mIHRoZSBpbmsgYmFyLiAqL1xuICBjb21wdXRlQ29udGVudENsaWVudFJlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvdW5kYXRpb24uY29tcHV0ZUNvbnRlbnRDbGllbnRSZWN0KCk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhlIGZvdW5kYXRpb24uICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5fY3JlYXRlSW5rQmFyRWxlbWVudCgpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgLyoqIERlc3Ryb3lzIHRoZSBmb3VuZGF0aW9uLiAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9pbmtCYXJFbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMuX2lua0JhckVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9pbmtCYXJFbGVtZW50KTtcbiAgICB9XG5cbiAgICAodGhpcyBhcyB7X2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudH0pLl9ob3N0RWxlbWVudCA9IHRoaXMuX2lua0JhckVsZW1lbnRcbiAgICAgID0gKHRoaXMgYXMge19pbmtCYXJDb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnR9KS5faW5rQmFyQ29udGVudEVsZW1lbnQgPSBudWxsITtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgICAodGhpcyBhcyB7X2Rlc3Ryb3llZDogYm9vbGVhbn0pLl9kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgYmUgYXBwZW5kZWQgdG8gdGhlIGNvbnRlbnQsIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGluayBiYXJcbiAgICogdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHJhdGhlciB0aGFuIHRoZSB0YWIgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgc2V0Rml0VG9Db250ZW50KGZpdFRvQ29udGVudDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9maXRUb0NvbnRlbnQgIT09IGZpdFRvQ29udGVudCkge1xuICAgICAgdGhpcy5fZml0VG9Db250ZW50ID0gZml0VG9Db250ZW50O1xuICAgICAgaWYgKHRoaXMuX2lua0JhckVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fYXBwZW5kSW5rQmFyRWxlbWVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgYmUgYXBwZW5kZWQgdG8gdGhlIGNvbnRlbnQsIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGluayBiYXJcbiAgICogdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHJhdGhlciB0aGFuIHRoZSB0YWIgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgZ2V0Rml0VG9Db250ZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZml0VG9Db250ZW50OyB9XG5cbiAgLyoqIENyZWF0ZXMgYW5kIGFwcGVuZHMgdGhlIGluayBiYXIgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW5rQmFyRWxlbWVudCgpIHtcbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICh0aGlzIGFzIHtfaW5rQmFyQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50fSkuX2lua0JhckNvbnRlbnRFbGVtZW50XG4gICAgICA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgIHRoaXMuX2lua0JhckVsZW1lbnQuY2xhc3NOYW1lID0gJ21kYy10YWItaW5kaWNhdG9yJztcbiAgICB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5jbGFzc05hbWUgPSAnbWRjLXRhYi1pbmRpY2F0b3JfX2NvbnRlbnQnICtcbiAgICAgICAgJyBtZGMtdGFiLWluZGljYXRvcl9fY29udGVudC0tdW5kZXJsaW5lJztcblxuICAgIHRoaXMuX2lua0JhckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQpO1xuICAgIHRoaXMuX2FwcGVuZElua0JhckVsZW1lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHRoZSBpbmsgYmFyIHRvIHRoZSB0YWIgaG9zdCBlbGVtZW50IG9yIGNvbnRlbnQsIGRlcGVuZGluZyBvbiB3aGV0aGVyXG4gICAqIHRoZSBpbmsgYmFyIHNob3VsZCBmaXQgdG8gY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgX2FwcGVuZElua0JhckVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLl9pbmtCYXJFbGVtZW50KSB7XG4gICAgICB0aHJvdyBFcnJvcignSW5rIGJhciBlbGVtZW50IGhhcyBub3QgYmVlbiBjcmVhdGVkIGFuZCBjYW5ub3QgYmUgYXBwZW5kZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5fZml0VG9Db250ZW50ID9cbiAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy10YWJfX2NvbnRlbnQnKSA6XG4gICAgICAgIHRoaXMuX2hvc3RFbGVtZW50O1xuXG4gICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XG4gICAgICB0aHJvdyBFcnJvcignTWlzc2luZyBlbGVtZW50IHRvIGhvc3QgdGhlIGluayBiYXInKTtcbiAgICB9XG5cbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2lua0JhckVsZW1lbnQpO1xuICB9XG59XG4iXX0=