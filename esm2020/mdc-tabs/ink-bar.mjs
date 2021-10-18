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
                this._inkBarContentElement.style.setProperty(propName, value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvaW5rLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQ0wsZ0NBQWdDLEdBR2pDLE1BQU0seUJBQXlCLENBQUM7QUFXakM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFNBQVM7SUFJcEIsWUFBb0IsTUFBZ0M7UUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7SUFBRyxDQUFDO0lBRXhELHlCQUF5QjtJQUN6QixJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxjQUFjLENBQUMsT0FBb0I7UUFDakMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQzlGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEMsSUFBSSxXQUFXLEVBQUU7WUFDZixXQUFXLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixNQUFNLFVBQVUsR0FBRyxXQUFXO2dCQUM1QixDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRTtnQkFDcEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUVkLHFGQUFxRjtZQUNyRixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdB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Q3BEO1FBRUQsYUFBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RWxlbWVudFJlZiwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1EQ1NsaWRpbmdUYWJJbmRpY2F0b3JGb3VuZGF0aW9uLFxuICBNRENUYWJJbmRpY2F0b3JBZGFwdGVyLFxuICBNRENUYWJJbmRpY2F0b3JGb3VuZGF0aW9uLFxufSBmcm9tICdAbWF0ZXJpYWwvdGFiLWluZGljYXRvcic7XG5cbi8qKlxuICogSXRlbSBpbnNpZGUgYSB0YWIgaGVhZGVyIHJlbGF0aXZlIHRvIHdoaWNoIHRoZSBpbmsgYmFyIGNhbiBiZSBhbGlnbmVkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdElua0Jhckl0ZW0ge1xuICBfZm91bmRhdGlvbjogTWF0SW5rQmFyRm91bmRhdGlvbjtcbiAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG59XG5cbi8qKlxuICogQWJzdHJhY3Rpb24gYXJvdW5kIHRoZSBNREMgdGFiIGluZGljYXRvciB0aGF0IGFjdHMgYXMgdGhlIHRhYiBoZWFkZXIncyBpbmsgYmFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgTWF0SW5rQmFyIHtcbiAgLyoqIEl0ZW0gdG8gd2hpY2ggdGhlIGluayBiYXIgaXMgYWxpZ25lZCBjdXJyZW50bHkuICovXG4gIHByaXZhdGUgX2N1cnJlbnRJdGVtOiBNYXRJbmtCYXJJdGVtIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8TWF0SW5rQmFySXRlbT4pIHt9XG5cbiAgLyoqIEhpZGVzIHRoZSBpbmsgYmFyLiAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKSk7XG4gIH1cblxuICAvKiogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIGEgRE9NIG5vZGUuICovXG4gIGFsaWduVG9FbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ0l0ZW0gPSB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQpO1xuICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gdGhpcy5fY3VycmVudEl0ZW07XG5cbiAgICBpZiAoY3VycmVudEl0ZW0pIHtcbiAgICAgIGN1cnJlbnRJdGVtLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoY29ycmVzcG9uZGluZ0l0ZW0pIHtcbiAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBjdXJyZW50SXRlbVxuICAgICAgICA/IGN1cnJlbnRJdGVtLl9mb3VuZGF0aW9uLmNvbXB1dGVDb250ZW50Q2xpZW50UmVjdCgpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAvLyBUaGUgaW5rIGJhciB3b24ndCBhbmltYXRlIHVubGVzcyB3ZSBnaXZlIGl0IHRoZSBgQ2xpZW50UmVjdGAgb2YgdGhlIHByZXZpb3VzIGl0ZW0uXG4gICAgICBjb3JyZXNwb25kaW5nSXRlbS5fZm91bmRhdGlvbi5hY3RpdmF0ZShjbGllbnRSZWN0KTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJdGVtID0gY29ycmVzcG9uZGluZ0l0ZW07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgTURDJ3Mgc2xpZGluZyB0YWIgaW5kaWNhdG9yIChpbmsgYmFyKSBmb3VuZGF0aW9uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgTWF0SW5rQmFyRm91bmRhdGlvbiB7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfZm91bmRhdGlvbjogTURDVGFiSW5kaWNhdG9yRm91bmRhdGlvbjtcbiAgcHJpdmF0ZSBfaW5rQmFyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2lua0JhckNvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfZml0VG9Db250ZW50ID0gZmFsc2U7XG4gIHByaXZhdGUgX2FkYXB0ZXI6IE1EQ1RhYkluZGljYXRvckFkYXB0ZXIgPSB7XG4gICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgIGlmICghdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldENvbnRlbnRTdHlsZVByb3BlcnR5OiAocHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wTmFtZSwgdmFsdWUpO1xuICAgIH0sXG4gICAgY29tcHV0ZUNvbnRlbnRDbGllbnRSZWN0OiAoKSA9PiB7XG4gICAgICAvLyBgZ2V0Qm91bmRpbmdDbGllbnRSZWN0YCBpc24ndCBhdmFpbGFibGUgb24gdGhlIHNlcnZlci5cbiAgICAgIHJldHVybiB0aGlzLl9kZXN0cm95ZWQgfHwgIXRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdFxuICAgICAgICA/ICh7XG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgIH0gYXMgQ2xpZW50UmVjdClcbiAgICAgICAgOiB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2hvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbiA9IG5ldyBNRENTbGlkaW5nVGFiSW5kaWNhdG9yRm91bmRhdGlvbih0aGlzLl9hZGFwdGVyKTtcbiAgfVxuXG4gIC8qKiBBbGlnbnMgdGhlIGluayBiYXIgdG8gdGhlIGN1cnJlbnQgaXRlbS4gKi9cbiAgYWN0aXZhdGUoY2xpZW50UmVjdD86IENsaWVudFJlY3QpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmFjdGl2YXRlKGNsaWVudFJlY3QpO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgdGhlIGluayBiYXIgZnJvbSB0aGUgY3VycmVudCBpdGVtLiAqL1xuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIENsaWVudFJlY3Qgb2YgdGhlIGluayBiYXIuICovXG4gIGNvbXB1dGVDb250ZW50Q2xpZW50UmVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5jb21wdXRlQ29udGVudENsaWVudFJlY3QoKTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyB0aGUgZm91bmRhdGlvbi4gKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLl9jcmVhdGVJbmtCYXJFbGVtZW50KCk7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICAvKiogRGVzdHJveXMgdGhlIGZvdW5kYXRpb24uICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5faW5rQmFyRWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9ob3N0RWxlbWVudCA9IHRoaXMuX2lua0JhckVsZW1lbnQgPSB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudCA9IG51bGwhO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGUgY29udGVudCwgd2hpY2ggd2lsbCBjYXVzZSB0aGUgaW5rIGJhclxuICAgKiB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgcmF0aGVyIHRoYW4gdGhlIHRhYiBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBzZXRGaXRUb0NvbnRlbnQoZml0VG9Db250ZW50OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2ZpdFRvQ29udGVudCAhPT0gZml0VG9Db250ZW50KSB7XG4gICAgICB0aGlzLl9maXRUb0NvbnRlbnQgPSBmaXRUb0NvbnRlbnQ7XG4gICAgICBpZiAodGhpcy5faW5rQmFyRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9hcHBlbmRJbmtCYXJFbGVtZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciB0aGUgaW5rIGJhciBzaG91bGQgYmUgYXBwZW5kZWQgdG8gdGhlIGNvbnRlbnQsIHdoaWNoIHdpbGwgY2F1c2UgdGhlIGluayBiYXJcbiAgICogdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHJhdGhlciB0aGFuIHRoZSB0YWIgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgZ2V0Rml0VG9Db250ZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXRUb0NvbnRlbnQ7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhbmQgYXBwZW5kcyB0aGUgaW5rIGJhciBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9jcmVhdGVJbmtCYXJFbGVtZW50KCkge1xuICAgIHRoaXMuX2lua0JhckVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50LmNsYXNzTmFtZSA9ICdtZGMtdGFiLWluZGljYXRvcic7XG4gICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuY2xhc3NOYW1lID1cbiAgICAgICdtZGMtdGFiLWluZGljYXRvcl9fY29udGVudCcgKyAnIG1kYy10YWItaW5kaWNhdG9yX19jb250ZW50LS11bmRlcmxpbmUnO1xuXG4gICAgdGhpcy5faW5rQmFyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudCk7XG4gICAgdGhpcy5fYXBwZW5kSW5rQmFyRWxlbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgdGhlIGluayBiYXIgdG8gdGhlIHRhYiBob3N0IGVsZW1lbnQgb3IgY29udGVudCwgZGVwZW5kaW5nIG9uIHdoZXRoZXJcbiAgICogdGhlIGluayBiYXIgc2hvdWxkIGZpdCB0byBjb250ZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwZW5kSW5rQmFyRWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMuX2lua0JhckVsZW1lbnQgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdJbmsgYmFyIGVsZW1lbnQgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgYW5kIGNhbm5vdCBiZSBhcHBlbmRlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLl9maXRUb0NvbnRlbnRcbiAgICAgID8gdGhpcy5faG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy10YWJfX2NvbnRlbnQnKVxuICAgICAgOiB0aGlzLl9ob3N0RWxlbWVudDtcblxuICAgIGlmICghcGFyZW50RWxlbWVudCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ01pc3NpbmcgZWxlbWVudCB0byBob3N0IHRoZSBpbmsgYmFyJyk7XG4gICAgfVxuXG4gICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyRWxlbWVudCk7XG4gIH1cbn1cbiJdfQ==