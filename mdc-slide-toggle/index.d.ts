import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import * as i2 from '@angular/material/slide-toggle';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/common';
import { InjectionToken } from '@angular/core';
import { MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR } from '@angular/material/slide-toggle';
import { _MatSlideToggleBase } from '@angular/material/slide-toggle';
import { MatSlideToggleRequiredValidator } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { Type } from '@angular/core';

declare namespace i1 {
    export {
        MAT_SLIDE_TOGGLE_VALUE_ACCESSOR,
        MatSlideToggleChange,
        MatSlideToggle
    }
}

/** Injection token to be used to override the default options for `mat-slide-toggle`. */
export declare const MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS: InjectionToken<MatSlideToggleDefaultOptions>;

export { MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR }

/** @docs-private */
export declare const MAT_SLIDE_TOGGLE_VALUE_ACCESSOR: {
    provide: InjectionToken<readonly ControlValueAccessor[]>;
    useExisting: Type<any>;
    multi: boolean;
};

export declare class MatSlideToggle extends _MatSlideToggleBase<MatSlideToggleChange> {
    /** Unique ID for the label element. */
    _labelId: string;
    /** Returns the unique id for the visual hidden button. */
    get buttonId(): string;
    /** Reference to the MDC switch element. */
    _switchElement: ElementRef<HTMLElement>;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor, changeDetectorRef: ChangeDetectorRef, tabIndex: string, defaults: MatSlideToggleDefaultOptions, animationMode?: string);
    /** Method being called whenever the underlying button is clicked. */
    _handleClick(): void;
    /** Focuses the slide-toggle. */
    focus(): void;
    protected _createChangeEvent(isChecked: boolean): MatSlideToggleChange;
    _getAriaLabelledBy(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSlideToggle, [null, null, null, { attribute: "tabindex"; }, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSlideToggle, "mat-slide-toggle", ["matSlideToggle"], { "disabled": "disabled"; "disableRipple": "disableRipple"; "color": "color"; "tabIndex": "tabIndex"; }, {}, never, ["*"], false>;
}

/** Change event object emitted by a slide toggle. */
export declare class MatSlideToggleChange {
    /** The source slide toggle of the event. */
    source: MatSlideToggle;
    /** The new `checked` value of the slide toggle. */
    checked: boolean;
    constructor(
    /** The source slide toggle of the event. */
    source: MatSlideToggle, 
    /** The new `checked` value of the slide toggle. */
    checked: boolean);
}

/** Default `mat-slide-toggle` options that can be overridden. */
export declare interface MatSlideToggleDefaultOptions {
    /** Whether toggle action triggers value changes in slide toggle. */
    disableToggleValue?: boolean;
    /** Default color for slide toggles. */
    color?: ThemePalette;
}

export declare class MatSlideToggleModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSlideToggleModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatSlideToggleModule, [typeof i1.MatSlideToggle], [typeof i2._MatSlideToggleRequiredValidatorModule, typeof i3.MatCommonModule, typeof i3.MatRippleModule, typeof i4.CommonModule], [typeof i2._MatSlideToggleRequiredValidatorModule, typeof i1.MatSlideToggle, typeof i3.MatCommonModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatSlideToggleModule>;
}

export { MatSlideToggleRequiredValidator }

export { }
