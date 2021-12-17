/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, ComponentHarnessConstructor, ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { BaseListItemHarnessFilters, SubheaderHarnessFilters } from './list-harness-filters';
/**
 * Gets a `HarnessPredicate` that applies the given `BaseListItemHarnessFilters` to the given
 * list item harness.
 * @template H The type of list item harness to create a predicate for.
 * @param harnessType A constructor for a list item harness.
 * @param options An instance of `BaseListItemHarnessFilters` to apply.
 * @return A `HarnessPredicate` for the given harness type with the given options applied.
 */
export declare function getListItemPredicate<H extends MatListItemHarnessBase>(harnessType: ComponentHarnessConstructor<H>, options: BaseListItemHarnessFilters): HarnessPredicate<H>;
/** Harness for interacting with a MDC-based list subheader. */
export declare class MatSubheaderHarness extends ComponentHarness {
    static hostSelector: string;
    static with(options?: SubheaderHarnessFilters): HarnessPredicate<MatSubheaderHarness>;
    /** Gets the full text content of the list item (including text from any font icons). */
    getText(): Promise<string>;
}
/** Selectors for the various list item sections that may contain user content. */
export declare const enum MatListItemSection {
    CONTENT = ".mdc-list-item__content"
}
/** Enum describing the possible variants of a list item. */
export declare const enum MatListItemType {
    ONE_LINE_ITEM = 0,
    TWO_LINE_ITEM = 1,
    THREE_LINE_ITEM = 2
}
/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 */
export declare abstract class MatListItemHarnessBase extends ContentContainerComponentHarness<MatListItemSection> {
    private _lines;
    private _primaryText;
    private _avatar;
    private _icon;
    private _unscopedTextContent;
    /** Gets the type of the list item, currently describing how many lines there are. */
    getType(): Promise<MatListItemType>;
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     *
     * @deprecated Use the `getFullText` method instead.
     * @breaking-change 16.0.0
     */
    getText(): Promise<string>;
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     */
    getFullText(): Promise<string>;
    /** Gets the title of the list item. */
    getTitle(): Promise<string>;
    /**
     * Gets the secondary line text of the list item. Null if the list item
     * does not have a secondary line.
     */
    getSecondaryText(): Promise<string | null>;
    /**
     * Gets the tertiary line text of the list item. Null if the list item
     * does not have a tertiary line.
     */
    getTertiaryText(): Promise<string | null>;
    /** Whether this list item has an avatar. */
    hasAvatar(): Promise<boolean>;
    /** Whether this list item has an icon. */
    hasIcon(): Promise<boolean>;
}
