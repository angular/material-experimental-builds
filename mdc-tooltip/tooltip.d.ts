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
import * as i0 from "@angular/core";
/**
 * CSS class that will be attached to the overlay panel.
 * @deprecated
 * @breaking-change 13.0.0 remove this variable
 */
export declare const TOOLTIP_PANEL_CLASS = "mat-mdc-tooltip-panel";
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
export declare class MatTooltip extends _MatTooltipBase<TooltipComponent> {
    protected readonly _tooltipComponent: typeof TooltipComponent;
    protected readonly _cssClassPrefix = "mat-mdc";
    constructor(overlay: Overlay, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, viewContainerRef: ViewContainerRef, ngZone: NgZone, platform: Platform, ariaDescriber: AriaDescriber, focusMonitor: FocusMonitor, scrollStrategy: any, dir: Directionality, defaultOptions: MatTooltipDefaultOptions, _document: any);
    protected _addOffset(position: ConnectedPosition): ConnectedPosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTooltip, [null, null, null, null, null, null, null, null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTooltip, "[matTooltip]", ["matTooltip"], {}, {}, never>;
}
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export declare class TooltipComponent extends _TooltipComponentBase {
    private _elementRef;
    _isMultiline: boolean;
    constructor(changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef);
    protected _onShow(): void;
    /** Whether the tooltip text has overflown to the next line */
    private _isTooltipMultiline;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipComponent, "mat-tooltip-component", never, {}, {}, never, never>;
}
