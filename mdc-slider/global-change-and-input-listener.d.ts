import { NgZone, OnDestroy } from '@angular/core';
import { SpecificEventListener } from '@material/base';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Handles listening for all change and input events that occur on the document.
 *
 * This service exposes a single method #listen to allow users to subscribe to change and input
 * events that occur on the document. Since listening for these events can be expensive, we use
 * #fromEvent which will lazily attach a listener when the first subscription is made and remove the
 * listener once the last observer unsubscribes.
 */
export declare class GlobalChangeAndInputListener<K extends 'change' | 'input'> implements OnDestroy {
    private _ngZone;
    /** The injected document if available or fallback to the global document reference. */
    private _document;
    /** Stores the subjects that emit the events that occur on the global document. */
    private _observables;
    /** The notifier that triggers the global event observables to stop emitting and complete. */
    private _destroyed;
    constructor(document: any, _ngZone: NgZone);
    ngOnDestroy(): void;
    /** Returns a subscription to global change or input events. */
    listen(type: K, callback: SpecificEventListener<K>): Subscription;
    /** Creates an observable that emits all events of the given type. */
    private _createGlobalEventObservable;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalChangeAndInputListener<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalChangeAndInputListener<any>>;
}
