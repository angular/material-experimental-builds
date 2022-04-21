/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
import { RippleConfig, RippleGlobalOptions, RippleTarget } from '@angular/material-experimental/mdc-core';
import { MatListItemLine, MatListItemTitle } from './list-item-sections';
import * as i0 from "@angular/core";
export declare abstract class MatListItemBase implements AfterViewInit, OnDestroy, RippleTarget {
    _elementRef: ElementRef<HTMLElement>;
    protected _ngZone: NgZone;
    private _listBase;
    private _platform;
    /** Query list matching list-item line elements. */
    abstract _lines: QueryList<MatListItemLine> | undefined;
    /** Query list matching list-item title elements. */
    abstract _titles: QueryList<MatListItemTitle> | undefined;
    /**
     * Element reference to the unscoped content in a list item.
     *
     * Unscoped content is user-projected text content in a list item that is
     * not part of an explicit line or title.
     */
    abstract _unscopedContent: ElementRef<HTMLSpanElement> | undefined;
    /** Host element for the list item. */
    _hostElement: HTMLElement;
    /** Whether animations are disabled. */
    _noopAnimations: boolean;
    _avatars: QueryList<never>;
    _icons: QueryList<never>;
    /**
     * The number of lines this list item should reserve space for. If not specified,
     * lines are inferred based on the projected content.
     *
     * Explicitly specifying the number of lines is useful if you want to acquire additional
     * space and enable the wrapping of text. The unscoped text content of a list item will
     * always be able to take up the remaining space of the item, unless it represents the title.
     *
     * A maximum of three lines is supported as per the Material Design specification.
     */
    set lines(lines: number | string | null);
    _explicitLines: number | null;
    get disableRipple(): boolean;
    set disableRipple(value: boolean);
    private _disableRipple;
    /** Whether the list-item is disabled. */
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    private _disabled;
    private _subscriptions;
    private _rippleRenderer;
    /** Whether the list item has unscoped text content. */
    _hasUnscopedTextContent: boolean;
    /**
     * Implemented as part of `RippleTarget`.
     * @docs-private
     */
    rippleConfig: RippleConfig & RippleGlobalOptions;
    /**
     * Implemented as part of `RippleTarget`.
     * @docs-private
     */
    get rippleDisabled(): boolean;
    protected constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, _listBase: MatListBase, _platform: Platform, globalRippleOptions?: RippleGlobalOptions, animationMode?: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Gets the label for the list item. This is used for the typeahead. */
    _getItemLabel(): string;
    /** Whether the list item has icons or avatars. */
    _hasIconOrAvatar(): boolean;
    private _initInteractiveListItem;
    /**
     * Subscribes to changes in the projected title and lines. Triggers a
     * item lines update whenever a change occurs.
     */
    private _monitorProjectedLinesAndTitle;
    /**
     * Updates the lines of the list item. Based on the projected user content and optional
     * explicit lines setting, the visual appearance of the list item is determined.
     *
     * This method should be invoked whenever the projected user content changes, or
     * when the explicit lines have been updated.
     *
     * @param recheckUnscopedContent Whether the projected unscoped content should be re-checked.
     *   The unscoped content is not re-checked for every update as it is a rather expensive check
     *   for content that is expected to not change very often.
     */
    _updateItemLines(recheckUnscopedContent: boolean): void;
    /**
     * Infers the number of lines based on the projected user content. This is useful
     * if no explicit number of lines has been specified on the list item.
     *
     * The number of lines is inferred based on whether there is a title, the number of
     * additional lines (secondary/tertiary). An additional line is acquired if there is
     * unscoped text content.
     */
    private _inferLinesFromContent;
    /** Checks whether the list item has unscoped text content. */
    private _checkDomForUnscopedTextContent;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListItemBase, [null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListItemBase, never, never, { "lines": "lines"; "disableRipple": "disableRipple"; "disabled": "disabled"; }, {}, ["_avatars", "_icons"], never, false>;
}
export declare abstract class MatListBase {
    _isNonInteractive: boolean;
    /** Whether ripples for all list items is disabled. */
    get disableRipple(): boolean;
    set disableRipple(value: BooleanInput);
    private _disableRipple;
    /** Whether all list items are disabled. */
    get disabled(): boolean;
    set disabled(value: BooleanInput);
    private _disabled;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatListBase, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatListBase, never, never, { "disableRipple": "disableRipple"; "disabled": "disabled"; }, {}, never, never, false>;
}
