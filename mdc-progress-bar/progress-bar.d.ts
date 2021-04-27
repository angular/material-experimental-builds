/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, NgZone, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { CanColor, CanColorCtor } from '@angular/material-experimental/mdc-core';
import { ProgressAnimationEnd } from '@angular/material/progress-bar';
import { Directionality } from '@angular/cdk/bidi';
/** @docs-private */
declare class MatProgressBarBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const _MatProgressBarMixinBase: CanColorCtor & typeof MatProgressBarBase;
export declare type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';
export declare class MatProgressBar extends _MatProgressBarMixinBase implements AfterViewInit, OnDestroy, CanColor {
    _elementRef: ElementRef<HTMLElement>;
    private _ngZone;
    private _dir?;
    _animationMode?: string | undefined;
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _dir?: Directionality | undefined, _animationMode?: string | undefined);
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
}
export {};
