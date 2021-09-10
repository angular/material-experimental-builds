/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { finalize, share, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Handles listening for all change and input events that occur on the document.
 *
 * This service exposes a single method #listen to allow users to subscribe to change and input
 * events that occur on the document. Since listening for these events can be expensive, we use
 * #fromEvent which will lazily attach a listener when the first subscription is made and remove the
 * listener once the last observer unsubscribes.
 */
export class GlobalChangeAndInputListener {
    constructor(document, _ngZone) {
        this._ngZone = _ngZone;
        /** Stores the subjects that emit the events that occur on the global document. */
        this._observables = new Map();
        /** The notifier that triggers the global event observables to stop emitting and complete. */
        this._destroyed = new Subject();
        this._document = document;
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._observables.clear();
    }
    /** Returns a subscription to global change or input events. */
    listen(type, callback) {
        // If this is the first time we are listening to this event, create the observable for it.
        if (!this._observables.has(type)) {
            this._observables.set(type, this._createGlobalEventObservable(type));
        }
        return this._ngZone.runOutsideAngular(() => this._observables.get(type).subscribe((event) => this._ngZone.run(() => callback(event))));
    }
    /** Creates an observable that emits all events of the given type. */
    _createGlobalEventObservable(type) {
        return fromEvent(this._document, type, { capture: true, passive: true }).pipe(takeUntil(this._destroyed), finalize(() => this._observables.delete(type)), share());
    }
}
GlobalChangeAndInputListener.ɵprov = i0.ɵɵdefineInjectable({ factory: function GlobalChangeAndInputListener_Factory() { return new GlobalChangeAndInputListener(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i0.NgZone)); }, token: GlobalChangeAndInputListener, providedIn: "root" });
GlobalChangeAndInputListener.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
GlobalChangeAndInputListener.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUMsU0FBUyxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTFEOzs7Ozs7O0dBT0c7QUFFSCxNQUFNLE9BQU8sNEJBQTRCO0lBV3ZDLFlBQThCLFFBQWEsRUFBVSxPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQU5wRSxrRkFBa0Y7UUFDMUUsaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztRQUV2RCw2RkFBNkY7UUFDckYsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFHakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsK0RBQStEO0lBQy9ELE1BQU0sQ0FBQyxJQUFPLEVBQUUsUUFBa0M7UUFDaEQsMEZBQTBGO1FBQzFGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUN4QyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQscUVBQXFFO0lBQzdELDRCQUE0QixDQUFDLElBQU87UUFDMUMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzlDLEtBQUssRUFBRSxDQUNSLENBQUM7SUFDSixDQUFDOzs7O1lBM0NGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs0Q0FZakIsTUFBTSxTQUFDLFFBQVE7WUF6QkYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3BlY2lmaWNFdmVudExpc3RlbmVyfSBmcm9tICdAbWF0ZXJpYWwvYmFzZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmluYWxpemUsIHNoYXJlLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBIYW5kbGVzIGxpc3RlbmluZyBmb3IgYWxsIGNoYW5nZSBhbmQgaW5wdXQgZXZlbnRzIHRoYXQgb2NjdXIgb24gdGhlIGRvY3VtZW50LlxuICpcbiAqIFRoaXMgc2VydmljZSBleHBvc2VzIGEgc2luZ2xlIG1ldGhvZCAjbGlzdGVuIHRvIGFsbG93IHVzZXJzIHRvIHN1YnNjcmliZSB0byBjaGFuZ2UgYW5kIGlucHV0XG4gKiBldmVudHMgdGhhdCBvY2N1ciBvbiB0aGUgZG9jdW1lbnQuIFNpbmNlIGxpc3RlbmluZyBmb3IgdGhlc2UgZXZlbnRzIGNhbiBiZSBleHBlbnNpdmUsIHdlIHVzZVxuICogI2Zyb21FdmVudCB3aGljaCB3aWxsIGxhemlseSBhdHRhY2ggYSBsaXN0ZW5lciB3aGVuIHRoZSBmaXJzdCBzdWJzY3JpcHRpb24gaXMgbWFkZSBhbmQgcmVtb3ZlIHRoZVxuICogbGlzdGVuZXIgb25jZSB0aGUgbGFzdCBvYnNlcnZlciB1bnN1YnNjcmliZXMuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEdsb2JhbENoYW5nZUFuZElucHV0TGlzdGVuZXI8SyBleHRlbmRzICdjaGFuZ2UnfCdpbnB1dCc+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvKiogVGhlIGluamVjdGVkIGRvY3VtZW50IGlmIGF2YWlsYWJsZSBvciBmYWxsYmFjayB0byB0aGUgZ2xvYmFsIGRvY3VtZW50IHJlZmVyZW5jZS4gKi9cbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gIC8qKiBTdG9yZXMgdGhlIHN1YmplY3RzIHRoYXQgZW1pdCB0aGUgZXZlbnRzIHRoYXQgb2NjdXIgb24gdGhlIGdsb2JhbCBkb2N1bWVudC4gKi9cbiAgcHJpdmF0ZSBfb2JzZXJ2YWJsZXMgPSBuZXcgTWFwPEssIE9ic2VydmFibGU8RXZlbnQ+PigpO1xuXG4gIC8qKiBUaGUgbm90aWZpZXIgdGhhdCB0cmlnZ2VycyB0aGUgZ2xvYmFsIGV2ZW50IG9ic2VydmFibGVzIHRvIHN0b3AgZW1pdHRpbmcgYW5kIGNvbXBsZXRlLiAqL1xuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnksIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XG4gICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZXMuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGEgc3Vic2NyaXB0aW9uIHRvIGdsb2JhbCBjaGFuZ2Ugb3IgaW5wdXQgZXZlbnRzLiAqL1xuICBsaXN0ZW4odHlwZTogSywgY2FsbGJhY2s6IFNwZWNpZmljRXZlbnRMaXN0ZW5lcjxLPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSB3ZSBhcmUgbGlzdGVuaW5nIHRvIHRoaXMgZXZlbnQsIGNyZWF0ZSB0aGUgb2JzZXJ2YWJsZSBmb3IgaXQuXG4gICAgaWYgKCF0aGlzLl9vYnNlcnZhYmxlcy5oYXModHlwZSkpIHtcbiAgICAgIHRoaXMuX29ic2VydmFibGVzLnNldCh0eXBlLCB0aGlzLl9jcmVhdGVHbG9iYWxFdmVudE9ic2VydmFibGUodHlwZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgIHRoaXMuX29ic2VydmFibGVzLmdldCh0eXBlKSEuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gY2FsbGJhY2soZXZlbnQpKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgYWxsIGV2ZW50cyBvZiB0aGUgZ2l2ZW4gdHlwZS4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlR2xvYmFsRXZlbnRPYnNlcnZhYmxlKHR5cGU6IEspIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCB0eXBlLCB7Y2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZX0pLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSxcbiAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuX29ic2VydmFibGVzLmRlbGV0ZSh0eXBlKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==