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
        return this._ngZone.runOutsideAngular(() => this._observables
            .get(type)
            .subscribe((event) => this._ngZone.run(() => callback(event))));
    }
    /** Creates an observable that emits all events of the given type. */
    _createGlobalEventObservable(type) {
        return fromEvent(this._document, type, { capture: true, passive: true }).pipe(takeUntil(this._destroyed), finalize(() => this._observables.delete(type)), share());
    }
}
GlobalChangeAndInputListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-rc.0", ngImport: i0, type: GlobalChangeAndInputListener, deps: [{ token: DOCUMENT }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
GlobalChangeAndInputListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0-rc.0", ngImport: i0, type: GlobalChangeAndInputListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-rc.0", ngImport: i0, type: GlobalChangeAndInputListener, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUMsU0FBUyxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFMUQ7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyw0QkFBNEI7SUFVdkMsWUFBOEIsUUFBYSxFQUFVLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBTnBFLGtGQUFrRjtRQUMxRSxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1FBRXZELDZGQUE2RjtRQUNyRixlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsTUFBTSxDQUFDLElBQU8sRUFBRSxRQUFrQztRQUNoRCwwRkFBMEY7UUFDMUYsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FDekMsSUFBSSxDQUFDLFlBQVk7YUFDZCxHQUFHLENBQUMsSUFBSSxDQUFFO2FBQ1YsU0FBUyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUN4RSxDQUFDO0lBQ0osQ0FBQztJQUVELHFFQUFxRTtJQUM3RCw0QkFBNEIsQ0FBQyxJQUFPO1FBQzFDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQzFCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM5QyxLQUFLLEVBQUUsQ0FDUixDQUFDO0lBQ0osQ0FBQzs7OEhBekNVLDRCQUE0QixrQkFVbkIsUUFBUTtrSUFWakIsNEJBQTRCLGNBRGhCLE1BQU07Z0dBQ2xCLDRCQUE0QjtrQkFEeEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OzBCQVdqQixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NwZWNpZmljRXZlbnRMaXN0ZW5lcn0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbmFsaXplLCBzaGFyZSwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogSGFuZGxlcyBsaXN0ZW5pbmcgZm9yIGFsbCBjaGFuZ2UgYW5kIGlucHV0IGV2ZW50cyB0aGF0IG9jY3VyIG9uIHRoZSBkb2N1bWVudC5cbiAqXG4gKiBUaGlzIHNlcnZpY2UgZXhwb3NlcyBhIHNpbmdsZSBtZXRob2QgI2xpc3RlbiB0byBhbGxvdyB1c2VycyB0byBzdWJzY3JpYmUgdG8gY2hhbmdlIGFuZCBpbnB1dFxuICogZXZlbnRzIHRoYXQgb2NjdXIgb24gdGhlIGRvY3VtZW50LiBTaW5jZSBsaXN0ZW5pbmcgZm9yIHRoZXNlIGV2ZW50cyBjYW4gYmUgZXhwZW5zaXZlLCB3ZSB1c2VcbiAqICNmcm9tRXZlbnQgd2hpY2ggd2lsbCBsYXppbHkgYXR0YWNoIGEgbGlzdGVuZXIgd2hlbiB0aGUgZmlyc3Qgc3Vic2NyaXB0aW9uIGlzIG1hZGUgYW5kIHJlbW92ZSB0aGVcbiAqIGxpc3RlbmVyIG9uY2UgdGhlIGxhc3Qgb2JzZXJ2ZXIgdW5zdWJzY3JpYmVzLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBHbG9iYWxDaGFuZ2VBbmRJbnB1dExpc3RlbmVyPEsgZXh0ZW5kcyAnY2hhbmdlJyB8ICdpbnB1dCc+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBpbmplY3RlZCBkb2N1bWVudCBpZiBhdmFpbGFibGUgb3IgZmFsbGJhY2sgdG8gdGhlIGdsb2JhbCBkb2N1bWVudCByZWZlcmVuY2UuICovXG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICAvKiogU3RvcmVzIHRoZSBzdWJqZWN0cyB0aGF0IGVtaXQgdGhlIGV2ZW50cyB0aGF0IG9jY3VyIG9uIHRoZSBnbG9iYWwgZG9jdW1lbnQuICovXG4gIHByaXZhdGUgX29ic2VydmFibGVzID0gbmV3IE1hcDxLLCBPYnNlcnZhYmxlPEV2ZW50Pj4oKTtcblxuICAvKiogVGhlIG5vdGlmaWVyIHRoYXQgdHJpZ2dlcnMgdGhlIGdsb2JhbCBldmVudCBvYnNlcnZhYmxlcyB0byBzdG9wIGVtaXR0aW5nIGFuZCBjb21wbGV0ZS4gKi9cbiAgcHJpdmF0ZSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX29ic2VydmFibGVzLmNsZWFyKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyBhIHN1YnNjcmlwdGlvbiB0byBnbG9iYWwgY2hhbmdlIG9yIGlucHV0IGV2ZW50cy4gKi9cbiAgbGlzdGVuKHR5cGU6IEssIGNhbGxiYWNrOiBTcGVjaWZpY0V2ZW50TGlzdGVuZXI8Sz4pOiBTdWJzY3JpcHRpb24ge1xuICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgd2UgYXJlIGxpc3RlbmluZyB0byB0aGlzIGV2ZW50LCBjcmVhdGUgdGhlIG9ic2VydmFibGUgZm9yIGl0LlxuICAgIGlmICghdGhpcy5fb2JzZXJ2YWJsZXMuaGFzKHR5cGUpKSB7XG4gICAgICB0aGlzLl9vYnNlcnZhYmxlcy5zZXQodHlwZSwgdGhpcy5fY3JlYXRlR2xvYmFsRXZlbnRPYnNlcnZhYmxlKHR5cGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+XG4gICAgICB0aGlzLl9vYnNlcnZhYmxlc1xuICAgICAgICAuZ2V0KHR5cGUpIVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gY2FsbGJhY2soZXZlbnQpKSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyBhbGwgZXZlbnRzIG9mIHRoZSBnaXZlbiB0eXBlLiAqL1xuICBwcml2YXRlIF9jcmVhdGVHbG9iYWxFdmVudE9ic2VydmFibGUodHlwZTogSykge1xuICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsIHR5cGUsIHtjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlfSkucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpLFxuICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5fb2JzZXJ2YWJsZXMuZGVsZXRlKHR5cGUpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgfVxufVxuIl19