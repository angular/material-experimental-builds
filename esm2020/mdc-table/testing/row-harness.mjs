/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatRowHarnessBase } from '@angular/material/table/testing';
import { MatCellHarness, MatHeaderCellHarness, MatFooterCellHarness } from './cell-harness';
/** Harness for interacting with an MDC-based Angular Material table row. */
export class MatRowHarness extends _MatRowHarnessBase {
    constructor() {
        super(...arguments);
        this._cellHarness = MatCellHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatRowHarness, options);
    }
}
/** The selector for the host element of a `MatRowHarness` instance. */
MatRowHarness.hostSelector = '.mat-mdc-row';
/** Harness for interacting with an MDC-based Angular Material table header row. */
export class MatHeaderRowHarness extends _MatRowHarnessBase {
    constructor() {
        super(...arguments);
        this._cellHarness = MatHeaderCellHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table header row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatHeaderRowHarness, options);
    }
}
/** The selector for the host element of a `MatHeaderRowHarness` instance. */
MatHeaderRowHarness.hostSelector = '.mat-mdc-header-row';
/** Harness for interacting with an MDC-based Angular Material table footer row. */
export class MatFooterRowHarness extends _MatRowHarnessBase {
    constructor() {
        super(...arguments);
        this._cellHarness = MatFooterCellHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for
     * a table footer row cell with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatFooterRowHarness, options);
    }
}
/** The selector for the host element of a `MatFooterRowHarness` instance. */
MatFooterRowHarness.hostSelector = '.mat-mdc-footer-row';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJsZS90ZXN0aW5nL3Jvdy1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBb0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RixPQUFPLEVBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUYsNEVBQTRFO0FBQzVFLE1BQU0sT0FBTyxhQUFjLFNBQVEsa0JBQXlEO0lBQTVGOztRQUdZLGlCQUFZLEdBQUcsY0FBYyxDQUFDO0lBVTFDLENBQUM7SUFSQzs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE2QixFQUFFO1FBQ3pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7QUFYRCx1RUFBdUU7QUFDaEUsMEJBQVksR0FBRyxjQUFjLENBQUM7QUFhdkMsbUZBQW1GO0FBQ25GLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxrQkFDVztJQURwRDs7UUFJWSxpQkFBWSxHQUFHLG9CQUFvQixDQUFDO0lBV2hELENBQUM7SUFUQzs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBNkIsRUFBRTtRQUN6QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7QUFaRCw2RUFBNkU7QUFDdEUsZ0NBQVksR0FBRyxxQkFBcUIsQ0FBQztBQWU5QyxtRkFBbUY7QUFDbkYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGtCQUNXO0lBRHBEOztRQUlZLGlCQUFZLEdBQUcsb0JBQW9CLENBQUM7SUFXaEQsQ0FBQztJQVRDOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUE2QixFQUFFO1FBQ3pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDOztBQVpELDZFQUE2RTtBQUN0RSxnQ0FBWSxHQUFHLHFCQUFxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtfTWF0Um93SGFybmVzc0Jhc2UsIFJvd0hhcm5lc3NGaWx0ZXJzfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZS90ZXN0aW5nJztcbmltcG9ydCB7TWF0Q2VsbEhhcm5lc3MsIE1hdEhlYWRlckNlbGxIYXJuZXNzLCBNYXRGb290ZXJDZWxsSGFybmVzc30gZnJvbSAnLi9jZWxsLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSByb3cuICovXG5leHBvcnQgY2xhc3MgTWF0Um93SGFybmVzcyBleHRlbmRzIF9NYXRSb3dIYXJuZXNzQmFzZTx0eXBlb2YgTWF0Q2VsbEhhcm5lc3MsIE1hdENlbGxIYXJuZXNzPiB7XG4gIC8qKiBUaGUgc2VsZWN0b3IgZm9yIHRoZSBob3N0IGVsZW1lbnQgb2YgYSBgTWF0Um93SGFybmVzc2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtcm93JztcbiAgcHJvdGVjdGVkIF9jZWxsSGFybmVzcyA9IE1hdENlbGxIYXJuZXNzO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHRhYmxlIHJvdyB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Um93SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRSb3dIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxufVxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSBoZWFkZXIgcm93LiAqL1xuZXhwb3J0IGNsYXNzIE1hdEhlYWRlclJvd0hhcm5lc3MgZXh0ZW5kcyBfTWF0Um93SGFybmVzc0Jhc2U8XG4gIHR5cGVvZiBNYXRIZWFkZXJDZWxsSGFybmVzcywgTWF0SGVhZGVyQ2VsbEhhcm5lc3M+IHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRIZWFkZXJSb3dIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1oZWFkZXItcm93JztcbiAgcHJvdGVjdGVkIF9jZWxsSGFybmVzcyA9IE1hdEhlYWRlckNlbGxIYXJuZXNzO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvclxuICAgKiBhIHRhYmxlIGhlYWRlciByb3cgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBIYXJuZXNzUHJlZGljYXRlPE1hdEhlYWRlclJvd0hhcm5lc3M+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoTWF0SGVhZGVyUm93SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cbn1cblxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhbiBNREMtYmFzZWQgQW5ndWxhciBNYXRlcmlhbCB0YWJsZSBmb290ZXIgcm93LiAqL1xuZXhwb3J0IGNsYXNzIE1hdEZvb3RlclJvd0hhcm5lc3MgZXh0ZW5kcyBfTWF0Um93SGFybmVzc0Jhc2U8XG4gIHR5cGVvZiBNYXRGb290ZXJDZWxsSGFybmVzcywgTWF0Rm9vdGVyQ2VsbEhhcm5lc3M+IHtcbiAgLyoqIFRoZSBzZWxlY3RvciBmb3IgdGhlIGhvc3QgZWxlbWVudCBvZiBhIGBNYXRGb290ZXJSb3dIYXJuZXNzYCBpbnN0YW5jZS4gKi9cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1mb290ZXItcm93JztcbiAgcHJvdGVjdGVkIF9jZWxsSGFybmVzcyA9IE1hdEZvb3RlckNlbGxIYXJuZXNzO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvclxuICAgKiBhIHRhYmxlIGZvb3RlciByb3cgY2VsbCB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogUm93SGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0Rm9vdGVyUm93SGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRGb290ZXJSb3dIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxufVxuIl19