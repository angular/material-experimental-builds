import { AnimationTriggerMetadata } from '@angular/animations';
import { AriaDescriber } from '@angular/cdk/a11y';
import { ChangeDetectorRef } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
import * as i0 from '@angular/core';
import * as i2 from '@angular/cdk/a11y';
import * as i3 from '@angular/common';
import * as i4 from '@angular/cdk/overlay';
import * as i5 from '@angular/material-experimental/mdc-core';
import * as i6 from '@angular/cdk/scrolling';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';
import { MAT_TOOLTIP_SCROLL_STRATEGY } from '@angular/material/tooltip';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY } from '@angular/material/tooltip';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { _MatTooltipBase } from '@angular/material/tooltip';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { NgZone } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { SCROLL_THROTTLE_MS } from '@angular/material/tooltip';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { _TooltipComponentBase } from '@angular/material/tooltip';
import { TooltipPosition } from '@angular/material/tooltip';
import { TooltipTouchGestures } from '@angular/material/tooltip';
import { TooltipVisibility } from '@angular/material/tooltip';
import { ViewContainerRef } from '@angular/core';

export { getMatTooltipInvalidPositionError }

declare namespace i1 {
    export {
        TOOLTIP_PANEL_CLASS,
        MatTooltip,
        TooltipComponent
    }
}

export { MAT_TOOLTIP_DEFAULT_OPTIONS }

export { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY }

export { MAT_TOOLTIP_SCROLL_STRATEGY }

export { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY }

export { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER }

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
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTooltip, "[matTooltip]", ["matTooltip"], {}, {}, never, never, false>;
}

/**
 * Animations used by MatTooltip.
 * @docs-private
 */
export declare const matTooltipAnimations: {
    readonly tooltipState: AnimationTriggerMetadata;
};

export { MatTooltipDefaultOptions }

export declare class MatTooltipModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTooltipModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatTooltipModule, [typeof i1.MatTooltip, typeof i1.TooltipComponent], [typeof i2.A11yModule, typeof i3.CommonModule, typeof i4.OverlayModule, typeof i5.MatCommonModule], [typeof i1.MatTooltip, typeof i1.TooltipComponent, typeof i5.MatCommonModule, typeof i6.CdkScrollableModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatTooltipModule>;
}

export { SCROLL_THROTTLE_MS }

/**
 * CSS class that will be attached to the overlay panel.
 * @deprecated
 * @breaking-change 13.0.0 remove this variable
 */
export declare const TOOLTIP_PANEL_CLASS = "mat-mdc-tooltip-panel";

/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export declare class TooltipComponent extends _TooltipComponentBase {
    private _elementRef;
    _isMultiline: boolean;
    /** Reference to the internal tooltip element. */
    _tooltip: ElementRef<HTMLElement>;
    _showAnimation: string;
    _hideAnimation: string;
    constructor(changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef<HTMLElement>, animationMode?: string);
    protected _onShow(): void;
    /** Whether the tooltip text has overflown to the next line */
    private _isTooltipMultiline;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipComponent, "mat-tooltip-component", never, {}, {}, never, never, false>;
}

export { TooltipPosition }

export { TooltipTouchGestures }

export { TooltipVisibility }

export { }
