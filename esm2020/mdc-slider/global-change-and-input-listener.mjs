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
        return this._ngZone.runOutsideAngular(() => this._observables.get(type).subscribe((event) => this._ngZone.run(() => callback(event))));
    }
    /** Creates an observable that emits all events of the given type. */
    _createGlobalEventObservable(type) {
        return fromEvent(this._document, type, { capture: true, passive: true }).pipe(takeUntil(this._destroyed), finalize(() => this._observables.delete(type)), share());
    }
}
GlobalChangeAndInputListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: GlobalChangeAndInputListener, deps: [{ token: DOCUMENT }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
GlobalChangeAndInputListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: GlobalChangeAndInputListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: GlobalChangeAndInputListener, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zbGlkZXIvZ2xvYmFsLWNoYW5nZS1hbmQtaW5wdXQtbGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUMsU0FBUyxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFMUQ7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyw0QkFBNEI7SUFXdkMsWUFBOEIsUUFBYSxFQUFVLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBTnBFLGtGQUFrRjtRQUMxRSxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1FBRXZELDZGQUE2RjtRQUNyRixlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsTUFBTSxDQUFDLElBQU8sRUFBRSxRQUFrQztRQUNoRCwwRkFBMEY7UUFDMUYsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ3hDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxxRUFBcUU7SUFDN0QsNEJBQTRCLENBQUMsSUFBTztRQUMxQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsSUFBSSxDQUN6RSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUMxQixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDOUMsS0FBSyxFQUFFLENBQ1IsQ0FBQztJQUNKLENBQUM7O2lJQTFDVSw0QkFBNEIsa0JBV25CLFFBQVE7cUlBWGpCLDRCQUE0QixjQURoQixNQUFNO21HQUNsQiw0QkFBNEI7a0JBRHhDLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzswQkFZakIsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTcGVjaWZpY0V2ZW50TGlzdGVuZXJ9IGZyb20gJ0BtYXRlcmlhbC9iYXNlJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaW5hbGl6ZSwgc2hhcmUsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEhhbmRsZXMgbGlzdGVuaW5nIGZvciBhbGwgY2hhbmdlIGFuZCBpbnB1dCBldmVudHMgdGhhdCBvY2N1ciBvbiB0aGUgZG9jdW1lbnQuXG4gKlxuICogVGhpcyBzZXJ2aWNlIGV4cG9zZXMgYSBzaW5nbGUgbWV0aG9kICNsaXN0ZW4gdG8gYWxsb3cgdXNlcnMgdG8gc3Vic2NyaWJlIHRvIGNoYW5nZSBhbmQgaW5wdXRcbiAqIGV2ZW50cyB0aGF0IG9jY3VyIG9uIHRoZSBkb2N1bWVudC4gU2luY2UgbGlzdGVuaW5nIGZvciB0aGVzZSBldmVudHMgY2FuIGJlIGV4cGVuc2l2ZSwgd2UgdXNlXG4gKiAjZnJvbUV2ZW50IHdoaWNoIHdpbGwgbGF6aWx5IGF0dGFjaCBhIGxpc3RlbmVyIHdoZW4gdGhlIGZpcnN0IHN1YnNjcmlwdGlvbiBpcyBtYWRlIGFuZCByZW1vdmUgdGhlXG4gKiBsaXN0ZW5lciBvbmNlIHRoZSBsYXN0IG9ic2VydmVyIHVuc3Vic2NyaWJlcy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgR2xvYmFsQ2hhbmdlQW5kSW5wdXRMaXN0ZW5lcjxLIGV4dGVuZHMgJ2NoYW5nZSd8J2lucHV0Jz4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8qKiBUaGUgaW5qZWN0ZWQgZG9jdW1lbnQgaWYgYXZhaWxhYmxlIG9yIGZhbGxiYWNrIHRvIHRoZSBnbG9iYWwgZG9jdW1lbnQgcmVmZXJlbmNlLiAqL1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgLyoqIFN0b3JlcyB0aGUgc3ViamVjdHMgdGhhdCBlbWl0IHRoZSBldmVudHMgdGhhdCBvY2N1ciBvbiB0aGUgZ2xvYmFsIGRvY3VtZW50LiAqL1xuICBwcml2YXRlIF9vYnNlcnZhYmxlcyA9IG5ldyBNYXA8SywgT2JzZXJ2YWJsZTxFdmVudD4+KCk7XG5cbiAgLyoqIFRoZSBub3RpZmllciB0aGF0IHRyaWdnZXJzIHRoZSBnbG9iYWwgZXZlbnQgb2JzZXJ2YWJsZXMgdG8gc3RvcCBlbWl0dGluZyBhbmQgY29tcGxldGUuICovXG4gIHByaXZhdGUgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLl9kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlcy5jbGVhcigpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYSBzdWJzY3JpcHRpb24gdG8gZ2xvYmFsIGNoYW5nZSBvciBpbnB1dCBldmVudHMuICovXG4gIGxpc3Rlbih0eXBlOiBLLCBjYWxsYmFjazogU3BlY2lmaWNFdmVudExpc3RlbmVyPEs+KTogU3Vic2NyaXB0aW9uIHtcbiAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHdlIGFyZSBsaXN0ZW5pbmcgdG8gdGhpcyBldmVudCwgY3JlYXRlIHRoZSBvYnNlcnZhYmxlIGZvciBpdC5cbiAgICBpZiAoIXRoaXMuX29ic2VydmFibGVzLmhhcyh0eXBlKSkge1xuICAgICAgdGhpcy5fb2JzZXJ2YWJsZXMuc2V0KHR5cGUsIHRoaXMuX2NyZWF0ZUdsb2JhbEV2ZW50T2JzZXJ2YWJsZSh0eXBlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgdGhpcy5fb2JzZXJ2YWJsZXMuZ2V0KHR5cGUpIS5zdWJzY3JpYmUoKGV2ZW50OiBFdmVudCkgPT5cbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiBjYWxsYmFjayhldmVudCkpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyBhbGwgZXZlbnRzIG9mIHRoZSBnaXZlbiB0eXBlLiAqL1xuICBwcml2YXRlIF9jcmVhdGVHbG9iYWxFdmVudE9ic2VydmFibGUodHlwZTogSykge1xuICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsIHR5cGUsIHtjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlfSkucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpLFxuICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5fb2JzZXJ2YWJsZXMuZGVsZXRlKHR5cGUpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgfVxufVxuIl19