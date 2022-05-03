import { AfterViewInit } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '@angular/cdk/overlay';
import * as i4 from '@angular/material-experimental/mdc-core';
import * as i5 from '@angular/cdk/scrolling';
import * as i6 from '@angular/material-experimental/mdc-form-field';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material/select';
import { MAT_SELECT_TRIGGER } from '@angular/material/select';
import { MatOptgroup } from '@angular/material-experimental/mdc-core';
import { MatOption } from '@angular/material-experimental/mdc-core';
import { _MatSelectBase } from '@angular/material/select';
import { MatSelectConfig } from '@angular/material/select';
import { OnInit } from '@angular/core';
import { QueryList } from '@angular/core';

declare namespace i1 {
    export {
        MatSelectChange,
        MatSelectTrigger,
        MatSelect
    }
}

export { MAT_SELECT_CONFIG }

export { MAT_SELECT_SCROLL_STRATEGY }

export { MAT_SELECT_SCROLL_STRATEGY_PROVIDER }

export { MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY }

export { MAT_SELECT_TRIGGER }

export declare class MatSelect extends _MatSelectBase<MatSelectChange> implements OnInit, AfterViewInit {
    options: QueryList<MatOption>;
    optionGroups: QueryList<MatOptgroup>;
    customTrigger: MatSelectTrigger;
    _positions: ConnectedPosition[];
    /** Ideal origin for the overlay panel. */
    _preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;
    /** Width of the overlay panel. */
    _overlayWidth: number;
    get shouldLabelFloat(): boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    open(): void;
    close(): void;
    /** Scrolls the active option into view. */
    protected _scrollOptionIntoView(index: number): void;
    protected _positioningSettled(): void;
    protected _getChangeEvent(value: any): MatSelectChange;
    /** Gets how wide the overlay panel should be. */
    private _getOverlayWidth;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelect, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSelect, "mat-select", ["matSelect"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "tabIndex": "tabIndex"; }, {}, ["customTrigger", "options", "optionGroups"], ["mat-select-trigger", "*"], false>;
}

/**
 * The following are all the animations for the mat-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mat-select animation.
 * @docs-private
 */
export declare const matSelectAnimations: {
    /**
     * @deprecated No longer being used. To be removed.
     * @breaking-change 12.0.0
     */
    readonly transformPanelWrap: AnimationTriggerMetadata;
    readonly transformPanel: AnimationTriggerMetadata;
};

/** Change event object that is emitted when the select value has changed. */
export declare class MatSelectChange {
    /** Reference to the select that emitted the change event. */
    source: MatSelect;
    /** Current value of the select that emitted the event. */
    value: any;
    constructor(
    /** Reference to the select that emitted the change event. */
    source: MatSelect, 
    /** Current value of the select that emitted the event. */
    value: any);
}

export { MatSelectConfig }

export declare class MatSelectModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatSelectModule, [typeof i1.MatSelect, typeof i1.MatSelectTrigger], [typeof i2.CommonModule, typeof i3.OverlayModule, typeof i4.MatOptionModule, typeof i4.MatCommonModule], [typeof i5.CdkScrollableModule, typeof i6.MatFormFieldModule, typeof i1.MatSelect, typeof i1.MatSelectTrigger, typeof i4.MatOptionModule, typeof i4.MatCommonModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatSelectModule>;
}

/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
export declare class MatSelectTrigger {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectTrigger, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSelectTrigger, "mat-select-trigger", never, {}, {}, never, never, false>;
}

export { }
