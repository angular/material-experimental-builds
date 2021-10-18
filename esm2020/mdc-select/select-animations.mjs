/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, animateChild, query, state, style, transition, trigger, } from '@angular/animations';
/**
 * The following are all the animations for the mat-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mat-select animation.
 * @docs-private
 */
export const matSelectAnimations = {
    /**
     * This animation ensures the select's overlay panel animation (transformPanel) is called when
     * closing the select.
     * This is needed due to https://github.com/angular/angular/issues/23302
     */
    transformPanelWrap: trigger('transformPanelWrap', [
        transition('* => void', query('@transformPanel', [animateChild()], { optional: true })),
    ]),
    /** This animation transforms the select's overlay panel on and off the page. */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            opacity: 0,
            transform: 'scale(1, 0.8)',
        })),
        transition('void => showing', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)',
        }))),
        transition('* => void', animate('100ms linear', style({ opacity: 0 }))),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zZWxlY3Qvc2VsZWN0LWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLE9BQU8sRUFDUCxZQUFZLEVBRVosS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBRTdCOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQU81QjtJQUNGOzs7O09BSUc7SUFDSCxrQkFBa0IsRUFBRSxPQUFPLENBQUMsb0JBQW9CLEVBQUU7UUFDaEQsVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDdEYsQ0FBQztJQUVGLGdGQUFnRjtJQUNoRixjQUFjLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQ3hDLEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDO1lBQ0osT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsZUFBZTtTQUMzQixDQUFDLENBQ0g7UUFDRCxVQUFVLENBQ1IsaUJBQWlCLEVBQ2pCLE9BQU8sQ0FDTCxrQ0FBa0MsRUFDbEMsS0FBSyxDQUFDO1lBQ0osT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsYUFBYTtTQUN6QixDQUFDLENBQ0gsQ0FDRjtRQUNELFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RFLENBQUM7Q0FDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIGFuaW1hdGVDaGlsZCxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICBxdWVyeSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIGFyZSBhbGwgdGhlIGFuaW1hdGlvbnMgZm9yIHRoZSBtYXQtc2VsZWN0IGNvbXBvbmVudCwgd2l0aCBlYWNoXG4gKiBjb25zdCBjb250YWluaW5nIHRoZSBtZXRhZGF0YSBmb3Igb25lIGFuaW1hdGlvbi5cbiAqXG4gKiBUaGUgdmFsdWVzIGJlbG93IG1hdGNoIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgQW5ndWxhckpTIE1hdGVyaWFsIG1hdC1zZWxlY3QgYW5pbWF0aW9uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgbWF0U2VsZWN0QW5pbWF0aW9uczoge1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgTm8gbG9uZ2VyIGJlaW5nIHVzZWQuIFRvIGJlIHJlbW92ZWQuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTIuMC4wXG4gICAqL1xuICByZWFkb25seSB0cmFuc2Zvcm1QYW5lbFdyYXA6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbiAgcmVhZG9ubHkgdHJhbnNmb3JtUGFuZWw6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG4gIC8qKlxuICAgKiBUaGlzIGFuaW1hdGlvbiBlbnN1cmVzIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsIGFuaW1hdGlvbiAodHJhbnNmb3JtUGFuZWwpIGlzIGNhbGxlZCB3aGVuXG4gICAqIGNsb3NpbmcgdGhlIHNlbGVjdC5cbiAgICogVGhpcyBpcyBuZWVkZWQgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIzMzAyXG4gICAqL1xuICB0cmFuc2Zvcm1QYW5lbFdyYXA6IHRyaWdnZXIoJ3RyYW5zZm9ybVBhbmVsV3JhcCcsIFtcbiAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBxdWVyeSgnQHRyYW5zZm9ybVBhbmVsJywgW2FuaW1hdGVDaGlsZCgpXSwge29wdGlvbmFsOiB0cnVlfSkpLFxuICBdKSxcblxuICAvKiogVGhpcyBhbmltYXRpb24gdHJhbnNmb3JtcyB0aGUgc2VsZWN0J3Mgb3ZlcmxheSBwYW5lbCBvbiBhbmQgb2ZmIHRoZSBwYWdlLiAqL1xuICB0cmFuc2Zvcm1QYW5lbDogdHJpZ2dlcigndHJhbnNmb3JtUGFuZWwnLCBbXG4gICAgc3RhdGUoXG4gICAgICAndm9pZCcsXG4gICAgICBzdHlsZSh7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDAuOCknLFxuICAgICAgfSksXG4gICAgKSxcbiAgICB0cmFuc2l0aW9uKFxuICAgICAgJ3ZvaWQgPT4gc2hvd2luZycsXG4gICAgICBhbmltYXRlKFxuICAgICAgICAnMTIwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLCAxKScsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApLFxuICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpKSxcbiAgXSksXG59O1xuIl19