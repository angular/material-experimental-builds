/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, ElementRef, NgZone, ViewContainerRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { ConnectedPosition, Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { MatTooltipDefaultOptions, _MatTooltipBase, _TooltipComponentBase } from '@angular/material/tooltip';
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
export declare class MatTooltip extends _MatTooltipBase<TooltipComponent> {
    protected readonly _tooltipComponent: typeof TooltipComponent;
    protected readonly _transformOriginSelector = ".mat-mdc-tooltip";
    constructor(overlay: Overlay, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, viewContainerRef: ViewContainerRef, ngZone: NgZone, platform: Platform, ariaDescriber: AriaDescriber, focusMonitor: FocusMonitor, scrollStrategy: any, dir: Directionality, defaultOptions: MatTooltipDefaultOptions, 
    /** @breaking-change 11.0.0 _document argument to become required. */
    _document: any);
    protected _addOffset(position: ConnectedPosition): ConnectedPosition;
}
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export declare class TooltipComponent extends _TooltipComponentBase {
    constructor(changeDetectorRef: ChangeDetectorRef);
}
