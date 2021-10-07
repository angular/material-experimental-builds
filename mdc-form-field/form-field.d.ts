/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, InjectionToken, NgZone, OnDestroy, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ThemePalette } from '@angular/material-experimental/mdc-core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatError } from './directives/error';
import { MatFormFieldFloatingLabel } from './directives/floating-label';
import { MatHint } from './directives/hint';
import { MatLabel } from './directives/label';
import { MatFormFieldLineRipple } from './directives/line-ripple';
import { MatFormFieldNotchedOutline } from './directives/notched-outline';
import { MatPrefix } from './directives/prefix';
import { MatSuffix } from './directives/suffix';
import { BooleanInput } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
/** Type for the available floatLabel values. */
export declare type FloatLabelType = 'always' | 'auto';
/** Possible appearance styles for the form field. */
export declare type MatFormFieldAppearance = 'fill' | 'outline';
/**
 * Represents the default options for the form field that can be configured
 * using the `MAT_FORM_FIELD_DEFAULT_OPTIONS` injection token.
 */
export interface MatFormFieldDefaultOptions {
    appearance?: MatFormFieldAppearance;
    hideRequiredMarker?: boolean;
    floatLabel?: FloatLabelType;
}
/**
 * Injection token that can be used to configure the
 * default options for all form field within an app.
 */
export declare const MAT_FORM_FIELD_DEFAULT_OPTIONS: InjectionToken<MatFormFieldDefaultOptions>;
/** Container for form controls that applies Material Design styling and behavior. */
export declare class MatFormField implements AfterViewInit, OnDestroy, AfterContentChecked, AfterContentInit {
    private _elementRef;
    private _changeDetectorRef;
    private _ngZone;
    private _dir;
    private _platform;
    private _defaults?;
    _animationMode?: string | undefined;
    private _document?;
    _textField: ElementRef<HTMLElement>;
    _iconPrefixContainer: ElementRef<HTMLElement>;
    _textPrefixContainer: ElementRef<HTMLElement>;
    _floatingLabel: MatFormFieldFloatingLabel | undefined;
    _notchedOutline: MatFormFieldNotchedOutline | undefined;
    _lineRipple: MatFormFieldLineRipple | undefined;
    _labelChildNonStatic: MatLabel | undefined;
    _labelChildStatic: MatLabel | undefined;
    _formFieldControl: MatFormFieldControl<any>;
    _prefixChildren: QueryList<MatPrefix>;
    _suffixChildren: QueryList<MatSuffix>;
    _errorChildren: QueryList<MatError>;
    _hintChildren: QueryList<MatHint>;
    /** Whether the required marker should be hidden. */
    get hideRequiredMarker(): boolean;
    set hideRequiredMarker(value: boolean);
    private _hideRequiredMarker;
    /** The color palette for the form-field. */
    color: ThemePalette;
    /** Whether the label should always float or float as the user types. */
    get floatLabel(): FloatLabelType;
    set floatLabel(value: FloatLabelType);
    private _floatLabel;
    /** The form-field appearance style. */
    get appearance(): MatFormFieldAppearance;
    set appearance(value: MatFormFieldAppearance);
    private _appearance;
    /** Text for the form field hint. */
    get hintLabel(): string;
    set hintLabel(value: string);
    private _hintLabel;
    _hasIconPrefix: boolean;
    _hasTextPrefix: boolean;
    _hasIconSuffix: boolean;
    _hasTextSuffix: boolean;
    readonly _labelId: string;
    readonly _hintLabelId: string;
    /** State of the mat-hint and mat-error animations. */
    _subscriptAnimationState: string;
    /** Width of the outline notch. */
    _outlineNotchWidth: number;
    /** Gets the current form field control */
    get _control(): MatFormFieldControl<any>;
    set _control(value: MatFormFieldControl<any>);
    private _destroyed;
    private _isFocused;
    private _explicitFormFieldControl;
    private _foundation;
    private _needsOutlineLabelOffsetUpdateOnStable;
    private _adapter;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef, _ngZone: NgZone, _dir: Directionality, _platform: Platform, _defaults?: MatFormFieldDefaultOptions | undefined, _animationMode?: string | undefined, _document?: any);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Gets the id of the label element. If no label is present, returns `null`.
     */
    getLabelId(): string | null;
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field
     * should be positioned relative to.
     */
    getConnectedOverlayOrigin(): ElementRef;
    /** Animates the placeholder up and locks it in position. */
    _animateAndLockLabel(): void;
    /** Initializes the registered form-field control. */
    private _initializeControl;
    private _checkPrefixAndSuffixTypes;
    /** Initializes the prefix and suffix containers. */
    private _initializePrefixAndSuffix;
    /**
     * Initializes the subscript by validating hints and synchronizing "aria-describedby" ids
     * with the custom form-field control. Also subscribes to hint and error changes in order
     * to be able to validate and synchronize ids on change.
     */
    private _initializeSubscript;
    /** Throws an error if the form field's control is missing. */
    private _assertFormFieldControl;
    private _updateFocusState;
    /**
     * The floating label in the docked state needs to account for prefixes. The horizontal offset
     * is calculated whenever the appearance changes to `outline`, the prefixes change, or when the
     * form-field is added to the DOM. This method sets up all subscriptions which are needed to
     * trigger the label offset update. In general, we want to avoid performing measurements often,
     * so we rely on the `NgZone` as indicator when the offset should be recalculated, instead of
     * checking every change detection cycle.
     */
    private _initializeOutlineLabelOffsetSubscriptions;
    /** Whether the floating label should always float or not. */
    _shouldAlwaysFloat(): boolean;
    _hasOutline(): boolean;
    /**
     * Whether the label should display in the infix. Labels in the outline appearance are
     * displayed as part of the notched-outline and are horizontally offset to account for
     * form-field prefix content. This won't work in server side rendering since we cannot
     * measure the width of the prefix container. To make the docked label appear as if the
     * right offset has been calculated, we forcibly render the label inside the infix. Since
     * the label is part of the infix, the label cannot overflow the prefix content.
     */
    _forceDisplayInfixLabel(): boolean | 0;
    _hasFloatingLabel(): boolean;
    _shouldLabelFloat(): boolean;
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: keyof NgControl): boolean;
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages(): 'error' | 'hint';
    /** Refreshes the width of the outline-notch, if present. */
    _refreshOutlineNotchWidth(): void;
    /** Does any extra processing that is required when handling the hints. */
    private _processHints;
    /**
     * Ensure that there is a maximum of one of each "mat-hint" alignment specified. The hint
     * label specified set through the input is being considered as "start" aligned.
     *
     * This method is a noop if Angular runs in production mode.
     */
    private _validateHints;
    /**
     * Sets the list of element IDs that describe the child control. This allows the control to update
     * its `aria-describedby` attribute accordingly.
     */
    private _syncDescribedByIds;
    /**
     * Updates the horizontal offset of the label in the outline appearance. In the outline
     * appearance, the notched-outline and label are not relative to the infix container because
     * the outline intends to surround prefixes, suffixes and the infix. This means that the
     * floating label by default overlaps prefixes in the docked state. To avoid this, we need to
     * horizontally offset the label by the width of the prefix container. The MDC text-field does
     * not need to do this because they use a fixed width for prefixes. Hence, they can simply
     * incorporate the horizontal offset into their default text-field styles.
     */
    private _updateOutlineLabelOffset;
    /** Checks whether the form field is attached to the DOM. */
    private _isAttachedToDom;
    static ngAcceptInputType_hideRequiredMarker: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatFormField, [null, null, null, null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatFormField, "mat-form-field", ["matFormField"], { "hideRequiredMarker": "hideRequiredMarker"; "color": "color"; "floatLabel": "floatLabel"; "appearance": "appearance"; "hintLabel": "hintLabel"; }, {}, ["_labelChildNonStatic", "_labelChildStatic", "_formFieldControl", "_prefixChildren", "_suffixChildren", "_errorChildren", "_hintChildren"], ["mat-label", "[matPrefix], [matIconPrefix]", "[matTextPrefix]", "*", "[matTextSuffix]", "[matSuffix], [matIconSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"]>;
}
