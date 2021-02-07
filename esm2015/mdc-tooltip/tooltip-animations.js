/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
/**
 * Animations used by MatTooltip.
 * @docs-private
 */
export const matTooltipAnimations = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: trigger('state', [
        // TODO(crisbeto): these values are based on MDC's CSS.
        // We should be able to use their styles directly once we land #19432.
        state('initial, void, hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
        state('visible', style({ transform: 'scale(1)' })),
        transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
        transition('* => hidden', animate('75ms cubic-bezier(0.4, 0, 1, 1)')),
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtdG9vbHRpcC90b29sdGlwLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUNMLE9BQU8sRUFFUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUU3Qjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FFN0I7SUFDRix1REFBdUQ7SUFDdkQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDN0IsdURBQXVEO1FBQ3ZELHNFQUFzRTtRQUN0RSxLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUM1RSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ2hELFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDdkUsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUN0RSxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSBNYXRUb29sdGlwLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgbWF0VG9vbHRpcEFuaW1hdGlvbnM6IHtcbiAgcmVhZG9ubHkgdG9vbHRpcFN0YXRlOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAvKiogQW5pbWF0aW9uIHRoYXQgdHJhbnNpdGlvbnMgYSB0b29sdGlwIGluIGFuZCBvdXQuICovXG4gIHRvb2x0aXBTdGF0ZTogdHJpZ2dlcignc3RhdGUnLCBbXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHRoZXNlIHZhbHVlcyBhcmUgYmFzZWQgb24gTURDJ3MgQ1NTLlxuICAgIC8vIFdlIHNob3VsZCBiZSBhYmxlIHRvIHVzZSB0aGVpciBzdHlsZXMgZGlyZWN0bHkgb25jZSB3ZSBsYW5kICMxOTQzMi5cbiAgICBzdGF0ZSgnaW5pdGlhbCwgdm9pZCwgaGlkZGVuJywgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlKDAuOCknfSkpLFxuICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDEpJ30pKSxcbiAgICB0cmFuc2l0aW9uKCcqID0+IHZpc2libGUnLCBhbmltYXRlKCcxNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScpKSxcbiAgICB0cmFuc2l0aW9uKCcqID0+IGhpZGRlbicsIGFuaW1hdGUoJzc1bXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMSwgMSknKSksXG4gIF0pXG59O1xuIl19