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
        if (this._inkBarElement.parentNode) {
            this._inkBarElement.parentNode.removeChild(this._inkBarElement);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvaW5rLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQ0wsZ0NBQWdDLEVBR2pDLE1BQU0seUJBQXlCLENBQUM7QUFXakM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFNBQVM7SUFJcEIsWUFBb0IsTUFBZ0M7UUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7SUFBRyxDQUFDO0lBRXhELHlCQUF5QjtJQUN6QixJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxjQUFjLENBQUMsT0FBb0I7UUFDakMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQzlGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEMsSUFBSSxXQUFXLEVBQUU7WUFDZixXQUFXLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQztnQkFDNUIsV0FBVyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFbkUscUZBQXFGO1lBQ3JGLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBaUIsQ0FBQztTQUN2QztJQUNILENBQUM7Q0FDRjtBQUVEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxtQkFBbUI7SUE0QjlCLFlBQW9CLFlBQXlCLEVBQVUsU0FBbUI7UUFBdEQsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBdkJsRSxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQTJCO1lBQ3pDLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDNUM7WUFDSCxDQUFDO1lBQ0QsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQztZQUNILENBQUM7WUFDRCx1QkFBdUIsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLENBQUM7WUFDRCx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7Z0JBQzdCLHlEQUF5RDtnQkFDekQsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztvQkFDNUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDeEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdkUsQ0FBQztTQUNGLENBQUM7UUFHQSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksZ0NBQWdDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsUUFBUSxDQUFDLFVBQXVCO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxpREFBaUQ7SUFDakQsVUFBVTtRQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELDBDQUEwQztJQUMxQyx3QkFBd0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxJQUFJO1FBQ0YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0JBQStCO0lBQy9CLE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDakU7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUssQ0FBQztRQUM3RSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlLENBQUMsWUFBcUI7UUFDbkMsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFlBQVksRUFBRTtZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztZQUNsQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzdCO1NBQ0Y7SUFDSCxDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsZUFBZSxLQUFjLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFFekQsK0NBQStDO0lBQ3ZDLG9CQUFvQjtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztRQUNwRCxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxHQUFHLDRCQUE0QjtZQUMvRCx3Q0FBd0MsQ0FBQztRQUU3QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxFQUFFO1lBQzNFLE1BQU0sS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7U0FDNUU7UUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEIsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsRUFBRTtZQUNyRSxNQUFNLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsYUFBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RWxlbWVudFJlZiwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1EQ1NsaWRpbmdUYWJJbmRpY2F0b3JGb3VuZGF0aW9uLFxuICBNRENUYWJJbmRpY2F0b3JBZGFwdGVyLFxuICBNRENUYWJJbmRpY2F0b3JGb3VuZGF0aW9uXG59IGZyb20gJ0BtYXRlcmlhbC90YWItaW5kaWNhdG9yJztcblxuLyoqXG4gKiBJdGVtIGluc2lkZSBhIHRhYiBoZWFkZXIgcmVsYXRpdmUgdG8gd2hpY2ggdGhlIGluayBiYXIgY2FuIGJlIGFsaWduZWQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0SW5rQmFySXRlbSB7XG4gIF9mb3VuZGF0aW9uOiBNYXRJbmtCYXJGb3VuZGF0aW9uO1xuICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pjtcbn1cblxuLyoqXG4gKiBBYnN0cmFjdGlvbiBhcm91bmQgdGhlIE1EQyB0YWIgaW5kaWNhdG9yIHRoYXQgYWN0cyBhcyB0aGUgdGFiIGhlYWRlcidzIGluayBiYXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRJbmtCYXIge1xuICAvKiogSXRlbSB0byB3aGljaCB0aGUgaW5rIGJhciBpcyBhbGlnbmVkIGN1cnJlbnRseS4gKi9cbiAgcHJpdmF0ZSBfY3VycmVudEl0ZW06IE1hdElua0Jhckl0ZW18dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8TWF0SW5rQmFySXRlbT4pIHt9XG5cbiAgLyoqIEhpZGVzIHRoZSBpbmsgYmFyLiAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKSk7XG4gIH1cblxuICAvKiogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIGEgRE9NIG5vZGUuICovXG4gIGFsaWduVG9FbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ0l0ZW0gPSB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQpO1xuICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gdGhpcy5fY3VycmVudEl0ZW07XG5cbiAgICBpZiAoY3VycmVudEl0ZW0pIHtcbiAgICAgIGN1cnJlbnRJdGVtLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAoY29ycmVzcG9uZGluZ0l0ZW0pIHtcbiAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBjdXJyZW50SXRlbSA/XG4gICAgICAgICAgY3VycmVudEl0ZW0uX2ZvdW5kYXRpb24uY29tcHV0ZUNvbnRlbnRDbGllbnRSZWN0KCkgOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIFRoZSBpbmsgYmFyIHdvbid0IGFuaW1hdGUgdW5sZXNzIHdlIGdpdmUgaXQgdGhlIGBDbGllbnRSZWN0YCBvZiB0aGUgcHJldmlvdXMgaXRlbS5cbiAgICAgIGNvcnJlc3BvbmRpbmdJdGVtLl9mb3VuZGF0aW9uLmFjdGl2YXRlKGNsaWVudFJlY3QpO1xuICAgICAgdGhpcy5fY3VycmVudEl0ZW0gPSBjb3JyZXNwb25kaW5nSXRlbTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBNREMncyBzbGlkaW5nIHRhYiBpbmRpY2F0b3IgKGluayBiYXIpIGZvdW5kYXRpb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRJbmtCYXJGb3VuZGF0aW9uIHtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuO1xuICBwcml2YXRlIF9mb3VuZGF0aW9uOiBNRENUYWJJbmRpY2F0b3JGb3VuZGF0aW9uO1xuICBwcml2YXRlIF9pbmtCYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfaW5rQmFyQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9maXRUb0NvbnRlbnQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogTURDVGFiSW5kaWNhdG9yQWRhcHRlciA9IHtcbiAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcbiAgICAgIGlmICghdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgIHRoaXMuX2hvc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q29udGVudFN0eWxlUHJvcGVydHk6IChwcm9wTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBjb21wdXRlQ29udGVudENsaWVudFJlY3Q6ICgpID0+IHtcbiAgICAgIC8vIGBnZXRCb3VuZGluZ0NsaWVudFJlY3RgIGlzbid0IGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyLlxuICAgICAgcmV0dXJuIHRoaXMuX2Rlc3Ryb3llZCB8fCAhdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID8ge1xuICAgICAgICB3aWR0aDogMCwgaGVpZ2h0OiAwLCB0b3A6IDAsIGxlZnQ6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIHg6IDAsIHk6IDBcbiAgICAgIH0gYXMgQ2xpZW50UmVjdCA6IHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudCkge1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGluZ1RhYkluZGljYXRvckZvdW5kYXRpb24odGhpcy5fYWRhcHRlcik7XG4gIH1cblxuICAvKiogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIHRoZSBjdXJyZW50IGl0ZW0uICovXG4gIGFjdGl2YXRlKGNsaWVudFJlY3Q/OiBDbGllbnRSZWN0KSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5hY3RpdmF0ZShjbGllbnRSZWN0KTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVzIHRoZSBpbmsgYmFyIGZyb20gdGhlIGN1cnJlbnQgaXRlbS4gKi9cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBDbGllbnRSZWN0IG9mIHRoZSBpbmsgYmFyLiAqL1xuICBjb21wdXRlQ29udGVudENsaWVudFJlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvdW5kYXRpb24uY29tcHV0ZUNvbnRlbnRDbGllbnRSZWN0KCk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhlIGZvdW5kYXRpb24uICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5fY3JlYXRlSW5rQmFyRWxlbWVudCgpO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uaW5pdCgpO1xuICB9XG5cbiAgLyoqIERlc3Ryb3lzIHRoZSBmb3VuZGF0aW9uLiAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9pbmtCYXJFbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMuX2lua0JhckVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9pbmtCYXJFbGVtZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLl9ob3N0RWxlbWVudCA9IHRoaXMuX2lua0JhckVsZW1lbnQgPSB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudCA9IG51bGwhO1xuICAgIHRoaXMuX2ZvdW5kYXRpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGUgY29udGVudCwgd2hpY2ggd2lsbCBjYXVzZSB0aGUgaW5rIGJhclxuICAgKiB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgcmF0aGVyIHRoYW4gdGhlIHRhYiBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBzZXRGaXRUb0NvbnRlbnQoZml0VG9Db250ZW50OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2ZpdFRvQ29udGVudCAhPT0gZml0VG9Db250ZW50KSB7XG4gICAgICB0aGlzLl9maXRUb0NvbnRlbnQgPSBmaXRUb0NvbnRlbnQ7XG4gICAgICBpZiAodGhpcy5faW5rQmFyRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9hcHBlbmRJbmtCYXJFbGVtZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGUgY29udGVudCwgd2hpY2ggd2lsbCBjYXVzZSB0aGUgaW5rIGJhclxuICAgKiB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgcmF0aGVyIHRoYW4gdGhlIHRhYiBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBnZXRGaXRUb0NvbnRlbnQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9maXRUb0NvbnRlbnQ7IH1cblxuICAvKiogQ3JlYXRlcyBhbmQgYXBwZW5kcyB0aGUgaW5rIGJhciBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9jcmVhdGVJbmtCYXJFbGVtZW50KCkge1xuICAgIHRoaXMuX2lua0JhckVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50LmNsYXNzTmFtZSA9ICdtZGMtdGFiLWluZGljYXRvcic7XG4gICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuY2xhc3NOYW1lID0gJ21kYy10YWItaW5kaWNhdG9yX19jb250ZW50JyArXG4gICAgICAgICcgbWRjLXRhYi1pbmRpY2F0b3JfX2NvbnRlbnQtLXVuZGVybGluZSc7XG5cbiAgICB0aGlzLl9pbmtCYXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50KTtcbiAgICB0aGlzLl9hcHBlbmRJbmtCYXJFbGVtZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyB0aGUgaW5rIGJhciB0byB0aGUgdGFiIGhvc3QgZWxlbWVudCBvciBjb250ZW50LCBkZXBlbmRpbmcgb24gd2hldGhlclxuICAgKiB0aGUgaW5rIGJhciBzaG91bGQgZml0IHRvIGNvbnRlbnQuXG4gICAqL1xuICBwcml2YXRlIF9hcHBlbmRJbmtCYXJFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy5faW5rQmFyRWxlbWVudCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0luayBiYXIgZWxlbWVudCBoYXMgbm90IGJlZW4gY3JlYXRlZCBhbmQgY2Fubm90IGJlIGFwcGVuZGVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMuX2ZpdFRvQ29udGVudCA/XG4gICAgICAgIHRoaXMuX2hvc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZGMtdGFiX19jb250ZW50JykgOlxuICAgICAgICB0aGlzLl9ob3N0RWxlbWVudDtcblxuICAgIGlmICghcGFyZW50RWxlbWVudCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ01pc3NpbmcgZWxlbWVudCB0byBob3N0IHRoZSBpbmsgYmFyJyk7XG4gICAgfVxuXG4gICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyRWxlbWVudCk7XG4gIH1cbn1cbiJdfQ==