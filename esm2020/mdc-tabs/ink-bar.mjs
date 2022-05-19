/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** Class that is applied when a tab indicator is active. */
const ACTIVE_CLASS = 'mdc-tab-indicator--active';
/** Class that is applied when the tab indicator should not transition. */
const NO_TRANSITION_CLASS = 'mdc-tab-indicator--no-transition';
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
        this._items.forEach(item => item.deactivateInkBar());
    }
    /** Aligns the ink bar to a DOM node. */
    alignToElement(element) {
        const correspondingItem = this._items.find(item => item.elementRef.nativeElement === element);
        const currentItem = this._currentItem;
        currentItem?.deactivateInkBar();
        if (correspondingItem) {
            const clientRect = currentItem?.elementRef.nativeElement.getBoundingClientRect?.();
            // The ink bar won't animate unless we give it the `ClientRect` of the previous item.
            correspondingItem.activateInkBar(clientRect);
            this._currentItem = correspondingItem;
        }
    }
}
/**
 * Mixin that can be used to apply the `MatInkBarItem` behavior to a class.
 * Base on MDC's `MDCSlidingTabIndicatorFoundation`:
 * https://github.com/material-components/material-components-web/blob/c0a11ef0d000a098fd0c372be8f12d6a99302855/packages/mdc-tab-indicator/sliding-foundation.ts
 * @docs-private
 */
export function mixinInkBarItem(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this._fitToContent = false;
        }
        /** Whether the ink bar should fit to the entire tab or just its content. */
        get fitInkBarToContent() {
            return this._fitToContent;
        }
        set fitInkBarToContent(v) {
            const newValue = coerceBooleanProperty(v);
            if (this._fitToContent !== newValue) {
                this._fitToContent = newValue;
                if (this._inkBarElement) {
                    this._appendInkBarElement();
                }
            }
        }
        /** Aligns the ink bar to the current item. */
        activateInkBar(previousIndicatorClientRect) {
            const element = this.elementRef.nativeElement;
            // Early exit if no indicator is present to handle cases where an indicator
            // may be activated without a prior indicator state
            if (!previousIndicatorClientRect ||
                !element.getBoundingClientRect ||
                !this._inkBarContentElement) {
                element.classList.add(ACTIVE_CLASS);
                return;
            }
            // This animation uses the FLIP approach. You can read more about it at the link below:
            // https://aerotwist.com/blog/flip-your-animations/
            // Calculate the dimensions based on the dimensions of the previous indicator
            const currentClientRect = element.getBoundingClientRect();
            const widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
            const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
            element.classList.add(NO_TRANSITION_CLASS);
            this._inkBarContentElement.style.setProperty('transform', `translateX(${xPosition}px) scaleX(${widthDelta})`);
            // Force repaint before updating classes and transform to ensure the transform properly takes effect
            element.getBoundingClientRect();
            element.classList.remove(NO_TRANSITION_CLASS);
            element.classList.add(ACTIVE_CLASS);
            this._inkBarContentElement.style.setProperty('transform', '');
        }
        /** Removes the ink bar from the current item. */
        deactivateInkBar() {
            this.elementRef.nativeElement.classList.remove(ACTIVE_CLASS);
        }
        /** Initializes the foundation. */
        ngOnInit() {
            this._createInkBarElement();
        }
        /** Destroys the foundation. */
        ngOnDestroy() {
            this._inkBarElement?.remove();
            this._inkBarElement = this._inkBarContentElement = null;
        }
        /** Creates and appends the ink bar element. */
        _createInkBarElement() {
            const documentNode = this.elementRef.nativeElement.ownerDocument || document;
            this._inkBarElement = documentNode.createElement('span');
            this._inkBarContentElement = documentNode.createElement('span');
            this._inkBarElement.className = 'mdc-tab-indicator';
            this._inkBarContentElement.className =
                'mdc-tab-indicator__content mdc-tab-indicator__content--underline';
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
                ? this.elementRef.nativeElement.querySelector('.mdc-tab__content')
                : this.elementRef.nativeElement;
            if (!parentElement && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('Missing element to host the ink bar');
            }
            parentElement.appendChild(this._inkBarElement);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5rLWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLXRhYnMvaW5rLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQWMxRSw0REFBNEQ7QUFDNUQsTUFBTSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7QUFFakQsMEVBQTBFO0FBQzFFLE1BQU0sbUJBQW1CLEdBQUcsa0NBQWtDLENBQUM7QUFFL0Q7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFNBQVM7SUFJcEIsWUFBb0IsTUFBZ0M7UUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7SUFBRyxDQUFDO0lBRXhELHlCQUF5QjtJQUN6QixJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsY0FBYyxDQUFDLE9BQW9CO1FBQ2pDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUM5RixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRXRDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO1FBRWhDLElBQUksaUJBQWlCLEVBQUU7WUFDckIsTUFBTSxVQUFVLEdBQUcsV0FBVyxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDO1lBRW5GLHFGQUFxRjtZQUNyRixpQkFBaUIsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0MsSUFB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QUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7WUFDcEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVM7Z0JBQ2xDLGtFQUFrRSxDQUFDO1lBRXJFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFFRDs7O1dBR0c7UUFDSyxvQkFBb0I7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLEVBQUU7Z0JBQzNFLE1BQU0sS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7YUFDNUU7WUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYTtnQkFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBRWxDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLEVBQUU7Z0JBQ3JFLE1BQU0sS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7YUFDcEQ7WUFFRCxhQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFlLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7RWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFF1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogSXRlbSBpbnNpZGUgYSB0YWIgaGVhZGVyIHJlbGF0aXZlIHRvIHdoaWNoIHRoZSBpbmsgYmFyIGNhbiBiZSBhbGlnbmVkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdElua0Jhckl0ZW0gZXh0ZW5kcyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBhY3RpdmF0ZUlua0JhcihwcmV2aW91c0luZGljYXRvckNsaWVudFJlY3Q/OiBDbGllbnRSZWN0KTogdm9pZDtcbiAgZGVhY3RpdmF0ZUlua0JhcigpOiB2b2lkO1xuICBmaXRJbmtCYXJUb0NvbnRlbnQ6IGJvb2xlYW47XG59XG5cbi8qKiBDbGFzcyB0aGF0IGlzIGFwcGxpZWQgd2hlbiBhIHRhYiBpbmRpY2F0b3IgaXMgYWN0aXZlLiAqL1xuY29uc3QgQUNUSVZFX0NMQVNTID0gJ21kYy10YWItaW5kaWNhdG9yLS1hY3RpdmUnO1xuXG4vKiogQ2xhc3MgdGhhdCBpcyBhcHBsaWVkIHdoZW4gdGhlIHRhYiBpbmRpY2F0b3Igc2hvdWxkIG5vdCB0cmFuc2l0aW9uLiAqL1xuY29uc3QgTk9fVFJBTlNJVElPTl9DTEFTUyA9ICdtZGMtdGFiLWluZGljYXRvci0tbm8tdHJhbnNpdGlvbic7XG5cbi8qKlxuICogQWJzdHJhY3Rpb24gYXJvdW5kIHRoZSBNREMgdGFiIGluZGljYXRvciB0aGF0IGFjdHMgYXMgdGhlIHRhYiBoZWFkZXIncyBpbmsgYmFyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgTWF0SW5rQmFyIHtcbiAgLyoqIEl0ZW0gdG8gd2hpY2ggdGhlIGluayBiYXIgaXMgYWxpZ25lZCBjdXJyZW50bHkuICovXG4gIHByaXZhdGUgX2N1cnJlbnRJdGVtOiBNYXRJbmtCYXJJdGVtIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8TWF0SW5rQmFySXRlbT4pIHt9XG5cbiAgLyoqIEhpZGVzIHRoZSBpbmsgYmFyLiAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmRlYWN0aXZhdGVJbmtCYXIoKSk7XG4gIH1cblxuICAvKiogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIGEgRE9NIG5vZGUuICovXG4gIGFsaWduVG9FbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY29ycmVzcG9uZGluZ0l0ZW0gPSB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQpO1xuICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gdGhpcy5fY3VycmVudEl0ZW07XG5cbiAgICBjdXJyZW50SXRlbT8uZGVhY3RpdmF0ZUlua0JhcigpO1xuXG4gICAgaWYgKGNvcnJlc3BvbmRpbmdJdGVtKSB7XG4gICAgICBjb25zdCBjbGllbnRSZWN0ID0gY3VycmVudEl0ZW0/LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3Q/LigpO1xuXG4gICAgICAvLyBUaGUgaW5rIGJhciB3b24ndCBhbmltYXRlIHVubGVzcyB3ZSBnaXZlIGl0IHRoZSBgQ2xpZW50UmVjdGAgb2YgdGhlIHByZXZpb3VzIGl0ZW0uXG4gICAgICBjb3JyZXNwb25kaW5nSXRlbS5hY3RpdmF0ZUlua0JhcihjbGllbnRSZWN0KTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJdGVtID0gY29ycmVzcG9uZGluZ0l0ZW07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWl4aW4gdGhhdCBjYW4gYmUgdXNlZCB0byBhcHBseSB0aGUgYE1hdElua0Jhckl0ZW1gIGJlaGF2aW9yIHRvIGEgY2xhc3MuXG4gKiBCYXNlIG9uIE1EQydzIGBNRENTbGlkaW5nVGFiSW5kaWNhdG9yRm91bmRhdGlvbmA6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL2MwYTExZWYwZDAwMGEwOThmZDBjMzcyYmU4ZjEyZDZhOTkzMDI4NTUvcGFja2FnZXMvbWRjLXRhYi1pbmRpY2F0b3Ivc2xpZGluZy1mb3VuZGF0aW9uLnRzXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbklua0Jhckl0ZW08XG4gIFQgZXh0ZW5kcyBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiB7ZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD59LFxuPihiYXNlOiBUKTogVCAmIChuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBNYXRJbmtCYXJJdGVtKSB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBzdXBlciguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbmtCYXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfaW5rQmFyQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBwcml2YXRlIF9maXRUb0NvbnRlbnQgPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbmsgYmFyIHNob3VsZCBmaXQgdG8gdGhlIGVudGlyZSB0YWIgb3IganVzdCBpdHMgY29udGVudC4gKi9cbiAgICBnZXQgZml0SW5rQmFyVG9Db250ZW50KCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2ZpdFRvQ29udGVudDtcbiAgICB9XG4gICAgc2V0IGZpdElua0JhclRvQ29udGVudCh2OiBCb29sZWFuSW5wdXQpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuXG4gICAgICBpZiAodGhpcy5fZml0VG9Db250ZW50ICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLl9maXRUb0NvbnRlbnQgPSBuZXdWYWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5faW5rQmFyRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuX2FwcGVuZElua0JhckVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBBbGlnbnMgdGhlIGluayBiYXIgdG8gdGhlIGN1cnJlbnQgaXRlbS4gKi9cbiAgICBhY3RpdmF0ZUlua0JhcihwcmV2aW91c0luZGljYXRvckNsaWVudFJlY3Q/OiBDbGllbnRSZWN0KSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIC8vIEVhcmx5IGV4aXQgaWYgbm8gaW5kaWNhdG9yIGlzIHByZXNlbnQgdG8gaGFuZGxlIGNhc2VzIHdoZXJlIGFuIGluZGljYXRvclxuICAgICAgLy8gbWF5IGJlIGFjdGl2YXRlZCB3aXRob3V0IGEgcHJpb3IgaW5kaWNhdG9yIHN0YXRlXG4gICAgICBpZiAoXG4gICAgICAgICFwcmV2aW91c0luZGljYXRvckNsaWVudFJlY3QgfHxcbiAgICAgICAgIWVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0IHx8XG4gICAgICAgICF0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudFxuICAgICAgKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChBQ1RJVkVfQ0xBU1MpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoaXMgYW5pbWF0aW9uIHVzZXMgdGhlIEZMSVAgYXBwcm9hY2guIFlvdSBjYW4gcmVhZCBtb3JlIGFib3V0IGl0IGF0IHRoZSBsaW5rIGJlbG93OlxuICAgICAgLy8gaHR0cHM6Ly9hZXJvdHdpc3QuY29tL2Jsb2cvZmxpcC15b3VyLWFuaW1hdGlvbnMvXG5cbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGltZW5zaW9ucyBiYXNlZCBvbiB0aGUgZGltZW5zaW9ucyBvZiB0aGUgcHJldmlvdXMgaW5kaWNhdG9yXG4gICAgICBjb25zdCBjdXJyZW50Q2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB3aWR0aERlbHRhID0gcHJldmlvdXNJbmRpY2F0b3JDbGllbnRSZWN0LndpZHRoIC8gY3VycmVudENsaWVudFJlY3Qud2lkdGg7XG4gICAgICBjb25zdCB4UG9zaXRpb24gPSBwcmV2aW91c0luZGljYXRvckNsaWVudFJlY3QubGVmdCAtIGN1cnJlbnRDbGllbnRSZWN0LmxlZnQ7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoTk9fVFJBTlNJVElPTl9DTEFTUyk7XG4gICAgICB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICAgIGB0cmFuc2xhdGVYKCR7eFBvc2l0aW9ufXB4KSBzY2FsZVgoJHt3aWR0aERlbHRhfSlgLFxuICAgICAgKTtcblxuICAgICAgLy8gRm9yY2UgcmVwYWludCBiZWZvcmUgdXBkYXRpbmcgY2xhc3NlcyBhbmQgdHJhbnNmb3JtIHRvIGVuc3VyZSB0aGUgdHJhbnNmb3JtIHByb3Blcmx5IHRha2VzIGVmZmVjdFxuICAgICAgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE5PX1RSQU5TSVRJT05fQ0xBU1MpO1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKEFDVElWRV9DTEFTUyk7XG4gICAgICB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgndHJhbnNmb3JtJywgJycpO1xuICAgIH1cblxuICAgIC8qKiBSZW1vdmVzIHRoZSBpbmsgYmFyIGZyb20gdGhlIGN1cnJlbnQgaXRlbS4gKi9cbiAgICBkZWFjdGl2YXRlSW5rQmFyKCkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShBQ1RJVkVfQ0xBU1MpO1xuICAgIH1cblxuICAgIC8qKiBJbml0aWFsaXplcyB0aGUgZm91bmRhdGlvbi4gKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIHRoaXMuX2NyZWF0ZUlua0JhckVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICAvKiogRGVzdHJveXMgdGhlIGZvdW5kYXRpb24uICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICB0aGlzLl9pbmtCYXJFbGVtZW50Py5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX2lua0JhckVsZW1lbnQgPSB0aGlzLl9pbmtCYXJDb250ZW50RWxlbWVudCA9IG51bGwhO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGFuZCBhcHBlbmRzIHRoZSBpbmsgYmFyIGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBfY3JlYXRlSW5rQmFyRWxlbWVudCgpIHtcbiAgICAgIGNvbnN0IGRvY3VtZW50Tm9kZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICB0aGlzLl9pbmtCYXJFbGVtZW50ID0gZG9jdW1lbnROb2RlLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnROb2RlLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgdGhpcy5faW5rQmFyRWxlbWVudC5jbGFzc05hbWUgPSAnbWRjLXRhYi1pbmRpY2F0b3InO1xuICAgICAgdGhpcy5faW5rQmFyQ29udGVudEVsZW1lbnQuY2xhc3NOYW1lID1cbiAgICAgICAgJ21kYy10YWItaW5kaWNhdG9yX19jb250ZW50IG1kYy10YWItaW5kaWNhdG9yX19jb250ZW50LS11bmRlcmxpbmUnO1xuXG4gICAgICB0aGlzLl9pbmtCYXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2lua0JhckNvbnRlbnRFbGVtZW50KTtcbiAgICAgIHRoaXMuX2FwcGVuZElua0JhckVsZW1lbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIHRoZSBpbmsgYmFyIHRvIHRoZSB0YWIgaG9zdCBlbGVtZW50IG9yIGNvbnRlbnQsIGRlcGVuZGluZyBvbiB3aGV0aGVyXG4gICAgICogdGhlIGluayBiYXIgc2hvdWxkIGZpdCB0byBjb250ZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgX2FwcGVuZElua0JhckVsZW1lbnQoKSB7XG4gICAgICBpZiAoIXRoaXMuX2lua0JhckVsZW1lbnQgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0luayBiYXIgZWxlbWVudCBoYXMgbm90IGJlZW4gY3JlYXRlZCBhbmQgY2Fubm90IGJlIGFwcGVuZGVkJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLl9maXRUb0NvbnRlbnRcbiAgICAgICAgPyB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLXRhYl9fY29udGVudCcpXG4gICAgICAgIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIGlmICghcGFyZW50RWxlbWVudCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignTWlzc2luZyBlbGVtZW50IHRvIGhvc3QgdGhlIGluayBiYXInKTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQodGhpcy5faW5rQmFyRWxlbWVudCEpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==