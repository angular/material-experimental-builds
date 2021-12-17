/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, ContentContainerComponentHarness, HarnessPredicate, parallel, } from '@angular/cdk/testing';
const iconSelector = '.mat-mdc-list-item-icon';
const avatarSelector = '.mat-mdc-list-item-avatar';
/**
 * Gets a `HarnessPredicate` that applies the given `BaseListItemHarnessFilters` to the given
 * list item harness.
 * @template H The type of list item harness to create a predicate for.
 * @param harnessType A constructor for a list item harness.
 * @param options An instance of `BaseListItemHarnessFilters` to apply.
 * @return A `HarnessPredicate` for the given harness type with the given options applied.
 */
export function getListItemPredicate(harnessType, options) {
    return new HarnessPredicate(harnessType, options)
        .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
        .addOption('fullText', options.fullText, (harness, fullText) => HarnessPredicate.stringMatches(harness.getFullText(), fullText))
        .addOption('title', options.title, (harness, title) => HarnessPredicate.stringMatches(harness.getTitle(), title))
        .addOption('secondaryText', options.secondaryText, (harness, secondaryText) => HarnessPredicate.stringMatches(harness.getSecondaryText(), secondaryText))
        .addOption('tertiaryText', options.tertiaryText, (harness, tertiaryText) => HarnessPredicate.stringMatches(harness.getTertiaryText(), tertiaryText));
}
/** Harness for interacting with a MDC-based list subheader. */
export class MatSubheaderHarness extends ComponentHarness {
    static with(options = {}) {
        return new HarnessPredicate(MatSubheaderHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
    }
    /** Gets the full text content of the list item (including text from any font icons). */
    async getText() {
        return (await this.host()).text();
    }
}
MatSubheaderHarness.hostSelector = '.mat-mdc-subheader';
/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 */
export class MatListItemHarnessBase extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._lines = this.locatorForAll('.mat-mdc-list-item-line');
        this._primaryText = this.locatorFor('.mdc-list-item__primary-text');
        this._avatar = this.locatorForOptional('.mat-mdc-list-item-avatar');
        this._icon = this.locatorForOptional('.mat-mdc-list-item-icon');
        this._unscopedTextContent = this.locatorFor('.mat-mdc-list-item-unscoped-content');
    }
    /** Gets the type of the list item, currently describing how many lines there are. */
    async getType() {
        const host = await this.host();
        const [isOneLine, isTwoLine] = await parallel(() => [
            host.hasClass('mdc-list-item--with-one-line'),
            host.hasClass('mdc-list-item--with-two-lines'),
        ]);
        if (isOneLine) {
            return 0 /* ONE_LINE_ITEM */;
        }
        else if (isTwoLine) {
            return 1 /* TWO_LINE_ITEM */;
        }
        else {
            return 2 /* THREE_LINE_ITEM */;
        }
    }
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     *
     * @deprecated Use the `getFullText` method instead.
     * @breaking-change 16.0.0
     */
    async getText() {
        return this.getFullText();
    }
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     */
    async getFullText() {
        return (await this.host()).text({ exclude: `${iconSelector}, ${avatarSelector}` });
    }
    /** Gets the title of the list item. */
    async getTitle() {
        return (await this._primaryText()).text();
    }
    /**
     * Gets the secondary line text of the list item. Null if the list item
     * does not have a secondary line.
     */
    async getSecondaryText() {
        const type = await this.getType();
        if (type === 0 /* ONE_LINE_ITEM */) {
            return null;
        }
        const [lines, unscopedTextContent] = await parallel(() => [
            this._lines(),
            this._unscopedTextContent(),
        ]);
        // If there is no explicit line for the secondary text, the unscoped text content
        // is rendered as the secondary text (with potential text wrapping enabled).
        if (lines.length >= 1) {
            return lines[0].text();
        }
        else {
            return unscopedTextContent.text();
        }
    }
    /**
     * Gets the tertiary line text of the list item. Null if the list item
     * does not have a tertiary line.
     */
    async getTertiaryText() {
        const type = await this.getType();
        if (type !== 2 /* THREE_LINE_ITEM */) {
            return null;
        }
        const [lines, unscopedTextContent] = await parallel(() => [
            this._lines(),
            this._unscopedTextContent(),
        ]);
        // First we check if there is an explicit line for the tertiary text. If so, we return it.
        // If there is at least an explicit secondary line though, then we know that the unscoped
        // text content corresponds to the tertiary line. If there are no explicit lines at all,
        // we know that the unscoped text content from the secondary text just wraps into the third
        // line, but there *no* actual dedicated tertiary text.
        if (lines.length === 2) {
            return lines[1].text();
        }
        else if (lines.length === 1) {
            return unscopedTextContent.text();
        }
        return null;
    }
    /** Whether this list item has an avatar. */
    async hasAvatar() {
        return !!(await this._avatar());
    }
    /** Whether this list item has an icon. */
    async hasIcon() {
        return !!(await this._icon());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLWhhcm5lc3MtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWxpc3QvdGVzdGluZy9saXN0LWl0ZW0taGFybmVzcy1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFFaEIsZ0NBQWdDLEVBQ2hDLGdCQUFnQixFQUNoQixRQUFRLEdBQ1QsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixNQUFNLFlBQVksR0FBRyx5QkFBeUIsQ0FBQztBQUMvQyxNQUFNLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztBQUVuRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxXQUEyQyxFQUMzQyxPQUFtQztJQUVuQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztTQUM5QyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FDakQsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FDeEQ7U0FDQSxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FDN0QsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FDaEU7U0FDQSxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDcEQsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FDMUQ7U0FD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QU0sS0FBSyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNuQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxLQUFLLENBQUMsU0FBUztRQUNiLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBwYXJhbGxlbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVycywgU3ViaGVhZGVySGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vbGlzdC1oYXJuZXNzLWZpbHRlcnMnO1xuXG5jb25zdCBpY29uU2VsZWN0b3IgPSAnLm1hdC1tZGMtbGlzdC1pdGVtLWljb24nO1xuY29uc3QgYXZhdGFyU2VsZWN0b3IgPSAnLm1hdC1tZGMtbGlzdC1pdGVtLWF2YXRhcic7XG5cbi8qKlxuICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGFwcGxpZXMgdGhlIGdpdmVuIGBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVyc2AgdG8gdGhlIGdpdmVuXG4gKiBsaXN0IGl0ZW0gaGFybmVzcy5cbiAqIEB0ZW1wbGF0ZSBIIFRoZSB0eXBlIG9mIGxpc3QgaXRlbSBoYXJuZXNzIHRvIGNyZWF0ZSBhIHByZWRpY2F0ZSBmb3IuXG4gKiBAcGFyYW0gaGFybmVzc1R5cGUgQSBjb25zdHJ1Y3RvciBmb3IgYSBsaXN0IGl0ZW0gaGFybmVzcy5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIGluc3RhbmNlIG9mIGBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVyc2AgdG8gYXBwbHkuXG4gKiBAcmV0dXJuIEEgYEhhcm5lc3NQcmVkaWNhdGVgIGZvciB0aGUgZ2l2ZW4gaGFybmVzcyB0eXBlIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMgYXBwbGllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExpc3RJdGVtUHJlZGljYXRlPEggZXh0ZW5kcyBNYXRMaXN0SXRlbUhhcm5lc3NCYXNlPihcbiAgaGFybmVzc1R5cGU6IENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxIPixcbiAgb3B0aW9uczogQmFzZUxpc3RJdGVtSGFybmVzc0ZpbHRlcnMsXG4pOiBIYXJuZXNzUHJlZGljYXRlPEg+IHtcbiAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKGhhcm5lc3NUeXBlLCBvcHRpb25zKVxuICAgIC5hZGRPcHRpb24oJ3RleHQnLCBvcHRpb25zLnRleHQsIChoYXJuZXNzLCB0ZXh0KSA9PlxuICAgICAgSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGV4dCgpLCB0ZXh0KSxcbiAgICApXG4gICAgLmFkZE9wdGlvbignZnVsbFRleHQnLCBvcHRpb25zLmZ1bGxUZXh0LCAoaGFybmVzcywgZnVsbFRleHQpID0+XG4gICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRGdWxsVGV4dCgpLCBmdWxsVGV4dCksXG4gICAgKVxuICAgIC5hZGRPcHRpb24oJ3RpdGxlJywgb3B0aW9ucy50aXRsZSwgKGhhcm5lc3MsIHRpdGxlKSA9PlxuICAgICAgSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGl0bGUoKSwgdGl0bGUpLFxuICAgIClcbiAgICAuYWRkT3B0aW9uKCdzZWNvbmRhcnlUZXh0Jywgb3B0aW9ucy5zZWNvbmRhcnlUZXh0LCAoaGFybmVzcywgc2Vjb25kYXJ5VGV4dCkgPT5cbiAgICAgIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFNlY29uZGFyeVRleHQoKSwgc2Vjb25kYXJ5VGV4dCksXG4gICAgKVxuICAgIC5hZGRPcHRpb24oJ3RlcnRpYXJ5VGV4dCcsIG9wdGlvbnMudGVydGlhcnlUZXh0LCAoaGFybmVzcywgdGVydGlhcnlUZXh0KSA9PlxuICAgICAgSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGVydGlhcnlUZXh0KCksIHRlcnRpYXJ5VGV4dCksXG4gICAgKTtcbn1cblxuLyoqIEhhcm5lc3MgZm9yIGludGVyYWN0aW5nIHdpdGggYSBNREMtYmFzZWQgbGlzdCBzdWJoZWFkZXIuICovXG5leHBvcnQgY2xhc3MgTWF0U3ViaGVhZGVySGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gJy5tYXQtbWRjLXN1YmhlYWRlcic7XG5cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU3ViaGVhZGVySGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0U3ViaGVhZGVySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTdWJoZWFkZXJIYXJuZXNzLCBvcHRpb25zKS5hZGRPcHRpb24oXG4gICAgICAndGV4dCcsXG4gICAgICBvcHRpb25zLnRleHQsXG4gICAgICAoaGFybmVzcywgdGV4dCkgPT4gSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0VGV4dCgpLCB0ZXh0KSxcbiAgICApO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGZ1bGwgdGV4dCBjb250ZW50IG9mIHRoZSBsaXN0IGl0ZW0gKGluY2x1ZGluZyB0ZXh0IGZyb20gYW55IGZvbnQgaWNvbnMpLiAqL1xuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG59XG5cbi8qKiBTZWxlY3RvcnMgZm9yIHRoZSB2YXJpb3VzIGxpc3QgaXRlbSBzZWN0aW9ucyB0aGF0IG1heSBjb250YWluIHVzZXIgY29udGVudC4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIE1hdExpc3RJdGVtU2VjdGlvbiB7XG4gIENPTlRFTlQgPSAnLm1kYy1saXN0LWl0ZW1fX2NvbnRlbnQnLFxufVxuXG4vKiogRW51bSBkZXNjcmliaW5nIHRoZSBwb3NzaWJsZSB2YXJpYW50cyBvZiBhIGxpc3QgaXRlbS4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIE1hdExpc3RJdGVtVHlwZSB7XG4gIE9ORV9MSU5FX0lURU0sXG4gIFRXT19MSU5FX0lURU0sXG4gIFRIUkVFX0xJTkVfSVRFTSxcbn1cblxuLyoqXG4gKiBTaGFyZWQgYmVoYXZpb3IgYW1vbmcgdGhlIGhhcm5lc3NlcyBmb3IgdGhlIHZhcmlvdXMgYE1hdExpc3RJdGVtYCBmbGF2b3JzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWF0TGlzdEl0ZW1IYXJuZXNzQmFzZSBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzPE1hdExpc3RJdGVtU2VjdGlvbj4ge1xuICBwcml2YXRlIF9saW5lcyA9IHRoaXMubG9jYXRvckZvckFsbCgnLm1hdC1tZGMtbGlzdC1pdGVtLWxpbmUnKTtcbiAgcHJpdmF0ZSBfcHJpbWFyeVRleHQgPSB0aGlzLmxvY2F0b3JGb3IoJy5tZGMtbGlzdC1pdGVtX19wcmltYXJ5LXRleHQnKTtcbiAgcHJpdmF0ZSBfYXZhdGFyID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLWxpc3QtaXRlbS1hdmF0YXInKTtcbiAgcHJpdmF0ZSBfaWNvbiA9IHRoaXMubG9jYXRvckZvck9wdGlvbmFsKCcubWF0LW1kYy1saXN0LWl0ZW0taWNvbicpO1xuICBwcml2YXRlIF91bnNjb3BlZFRleHRDb250ZW50ID0gdGhpcy5sb2NhdG9yRm9yKCcubWF0LW1kYy1saXN0LWl0ZW0tdW5zY29wZWQtY29udGVudCcpO1xuXG4gIC8qKiBHZXRzIHRoZSB0eXBlIG9mIHRoZSBsaXN0IGl0ZW0sIGN1cnJlbnRseSBkZXNjcmliaW5nIGhvdyBtYW55IGxpbmVzIHRoZXJlIGFyZS4gKi9cbiAgYXN5bmMgZ2V0VHlwZSgpOiBQcm9taXNlPE1hdExpc3RJdGVtVHlwZT4ge1xuICAgIGNvbnN0IGhvc3QgPSBhd2FpdCB0aGlzLmhvc3QoKTtcbiAgICBjb25zdCBbaXNPbmVMaW5lLCBpc1R3b0xpbmVdID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gW1xuICAgICAgaG9zdC5oYXNDbGFzcygnbWRjLWxpc3QtaXRlbS0td2l0aC1vbmUtbGluZScpLFxuICAgICAgaG9zdC5oYXNDbGFzcygnbWRjLWxpc3QtaXRlbS0td2l0aC10d28tbGluZXMnKSxcbiAgICBdKTtcbiAgICBpZiAoaXNPbmVMaW5lKSB7XG4gICAgICByZXR1cm4gTWF0TGlzdEl0ZW1UeXBlLk9ORV9MSU5FX0lURU07XG4gICAgfSBlbHNlIGlmIChpc1R3b0xpbmUpIHtcbiAgICAgIHJldHVybiBNYXRMaXN0SXRlbVR5cGUuVFdPX0xJTkVfSVRFTTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdExpc3RJdGVtVHlwZS5USFJFRV9MSU5FX0lURU07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGZ1bGwgdGV4dCBjb250ZW50IG9mIHRoZSBsaXN0IGl0ZW0sIGV4Y2x1ZGluZyB0ZXh0XG4gICAqIGZyb20gaWNvbnMgYW5kIGF2YXRhcnMuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB0aGUgYGdldEZ1bGxUZXh0YCBtZXRob2QgaW5zdGVhZC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxNi4wLjBcbiAgICovXG4gIGFzeW5jIGdldFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRGdWxsVGV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGZ1bGwgdGV4dCBjb250ZW50IG9mIHRoZSBsaXN0IGl0ZW0sIGV4Y2x1ZGluZyB0ZXh0XG4gICAqIGZyb20gaWNvbnMgYW5kIGF2YXRhcnMuXG4gICAqL1xuICBhc3luYyBnZXRGdWxsVGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLnRleHQoe2V4Y2x1ZGU6IGAke2ljb25TZWxlY3Rvcn0sICR7YXZhdGFyU2VsZWN0b3J9YH0pO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRpdGxlIG9mIHRoZSBsaXN0IGl0ZW0uICovXG4gIGFzeW5jIGdldFRpdGxlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLl9wcmltYXJ5VGV4dCgpKS50ZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2Vjb25kYXJ5IGxpbmUgdGV4dCBvZiB0aGUgbGlzdCBpdGVtLiBOdWxsIGlmIHRoZSBsaXN0IGl0ZW1cbiAgICogZG9lcyBub3QgaGF2ZSBhIHNlY29uZGFyeSBsaW5lLlxuICAgKi9cbiAgYXN5bmMgZ2V0U2Vjb25kYXJ5VGV4dCgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgdGhpcy5nZXRUeXBlKCk7XG4gICAgaWYgKHR5cGUgPT09IE1hdExpc3RJdGVtVHlwZS5PTkVfTElORV9JVEVNKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBbbGluZXMsIHVuc2NvcGVkVGV4dENvbnRlbnRdID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gW1xuICAgICAgdGhpcy5fbGluZXMoKSxcbiAgICAgIHRoaXMuX3Vuc2NvcGVkVGV4dENvbnRlbnQoKSxcbiAgICBdKTtcblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIGV4cGxpY2l0IGxpbmUgZm9yIHRoZSBzZWNvbmRhcnkgdGV4dCwgdGhlIHVuc2NvcGVkIHRleHQgY29udGVudFxuICAgIC8vIGlzIHJlbmRlcmVkIGFzIHRoZSBzZWNvbmRhcnkgdGV4dCAod2l0aCBwb3RlbnRpYWwgdGV4dCB3cmFwcGluZyBlbmFibGVkKS5cbiAgICBpZiAobGluZXMubGVuZ3RoID49IDEpIHtcbiAgICAgIHJldHVybiBsaW5lc1swXS50ZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bnNjb3BlZFRleHRDb250ZW50LnRleHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdGVydGlhcnkgbGluZSB0ZXh0IG9mIHRoZSBsaXN0IGl0ZW0uIE51bGwgaWYgdGhlIGxpc3QgaXRlbVxuICAgKiBkb2VzIG5vdCBoYXZlIGEgdGVydGlhcnkgbGluZS5cbiAgICovXG4gIGFzeW5jIGdldFRlcnRpYXJ5VGV4dCgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgdGhpcy5nZXRUeXBlKCk7XG4gICAgaWYgKHR5cGUgIT09IE1hdExpc3RJdGVtVHlwZS5USFJFRV9MSU5FX0lURU0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IFtsaW5lcywgdW5zY29wZWRUZXh0Q29udGVudF0gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICB0aGlzLl9saW5lcygpLFxuICAgICAgdGhpcy5fdW5zY29wZWRUZXh0Q29udGVudCgpLFxuICAgIF0pO1xuXG4gICAgLy8gRmlyc3Qgd2UgY2hlY2sgaWYgdGhlcmUgaXMgYW4gZXhwbGljaXQgbGluZSBmb3IgdGhlIHRlcnRpYXJ5IHRleHQuIElmIHNvLCB3ZSByZXR1cm4gaXQuXG4gICAgLy8gSWYgdGhlcmUgaXMgYXQgbGVhc3QgYW4gZXhwbGljaXQgc2Vjb25kYXJ5IGxpbmUgdGhvdWdoLCB0aGVuIHdlIGtub3cgdGhhdCB0aGUgdW5zY29wZWRcbiAgICAvLyB0ZXh0IGNvbnRlbnQgY29ycmVzcG9uZHMgdG8gdGhlIHRlcnRpYXJ5IGxpbmUuIElmIHRoZXJlIGFyZSBubyBleHBsaWNpdCBsaW5lcyBhdCBhbGwsXG4gICAgLy8gd2Uga25vdyB0aGF0IHRoZSB1bnNjb3BlZCB0ZXh0IGNvbnRlbnQgZnJvbSB0aGUgc2Vjb25kYXJ5IHRleHQganVzdCB3cmFwcyBpbnRvIHRoZSB0aGlyZFxuICAgIC8vIGxpbmUsIGJ1dCB0aGVyZSAqbm8qIGFjdHVhbCBkZWRpY2F0ZWQgdGVydGlhcnkgdGV4dC5cbiAgICBpZiAobGluZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gbGluZXNbMV0udGV4dCgpO1xuICAgIH0gZWxzZSBpZiAobGluZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gdW5zY29wZWRUZXh0Q29udGVudC50ZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBsaXN0IGl0ZW0gaGFzIGFuIGF2YXRhci4gKi9cbiAgYXN5bmMgaGFzQXZhdGFyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhIShhd2FpdCB0aGlzLl9hdmF0YXIoKSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIGxpc3QgaXRlbSBoYXMgYW4gaWNvbi4gKi9cbiAgYXN5bmMgaGFzSWNvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gISEoYXdhaXQgdGhpcy5faWNvbigpKTtcbiAgfVxufVxuIl19