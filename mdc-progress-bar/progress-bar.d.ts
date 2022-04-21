/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, NgZone, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { CanColor } from '@angular/material-experimental/mdc-core';
import { MatProgressBarDefaultOptions, ProgressAnimationEnd } from '@angular/material/progress-bar';
import { Directionality } from '@angular/cdk/bidi';
import * as i0 from "@angular/core";
/** @docs-private */
declare const _MatProgressBarBase: import("@angular/material-experimental/mdc-core")._Constructor<CanColor> & import("@angular/material-experimental/mdc-core")._AbstractConstructor<CanColor> & {
    new (_elementRef: ElementRef): {
        _elementRef: ElementRef;
    };
};
export declare type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';
export declare class MatProgressBar extends _MatProgressBarBase implements AfterViewInit, OnDestroy, CanColor {
    private _ngZone;
    _animationMode?: string | undefined;
    constructor(elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, dir?: Directionality, _animationMode?: string | undefined, defaults?: MatProgressBarDefaultOptions);
    /** Implements all of the logic of the MDC progress bar. */
    private _foundation;
    /** Adapter used by MDC to interact with the DOM. */
    private _adapter;
    /** Flag that indicates whether NoopAnimations mode is set to true. */
    _isNoopAnimation: boolean;
    /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
    get value(): number;
    set value(v: number);
    private _value;
    /** Buffer value of the progress bar. Defaults to zero. */
    get bufferValue(): number;
    set bufferValue(v: number);
    private _bufferValue;
    private _primaryBar;
    private _bufferBar;
    /**
     * Event emitted when animation of the primary progress bar completes. This event will not
     * be emitted when animations are disabled, nor will it be emitted for modes with continuous
     * animations (indeterminate and query).
     */
    readonly animationEnd: EventEmitter<ProgressAnimationEnd>;
    /** Reference to animation end subscription to be unsubscribed on destroy. */
    private _animationEndSubscription;
    /** Subscription to when the layout direction changes. */
    private _dirChangeSubscription;
    /**
     * Mode of the progress bar.
     *
     * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
     * 'determinate'.
     * Mirrored to mode attribute.
     */
    get mode(): ProgressBarMode;
    set mode(value: ProgressBarMode);
    private _mode;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Syncs the state of the progress bar with the MDC foundation. */
    private _syncFoundation;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatProgressBar, [null, null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatProgressBar, "mat-progress-bar", ["matProgressBar"], { "color": "color"; "value": "value"; "bufferValue": "bufferValue"; "mode": "mode"; }, { "animationEnd": "animationEnd"; }, never, never, false>;
}
export {};
