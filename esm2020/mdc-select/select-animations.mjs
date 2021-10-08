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
        transition('* => void', query('@transformPanel', [animateChild()], { optional: true }))
    ]),
    /** This animation transforms the select's overlay panel on and off the page. */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        transition('void => showing', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        transition('* => void', animate('100ms linear', style({ opacity: 0 })))
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy1zZWxlY3Qvc2VsZWN0LWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLE9BQU8sRUFDUCxZQUFZLEVBRVosS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBRTdCOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQU81QjtJQUNGOzs7O09BSUc7SUFDSCxrQkFBa0IsRUFBRSxPQUFPLENBQUMsb0JBQW9CLEVBQUU7UUFDOUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUM3RCxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQ3pCLENBQUM7SUFFRixnRkFBZ0Y7SUFDaEYsY0FBYyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN4QyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNsQixPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxpQkFBaUIsRUFBRyxPQUFPLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxDQUFDO1lBQy9FLE9BQU8sRUFBRSxDQUFDO1lBQ1YsU0FBUyxFQUFFLGFBQWE7U0FDekIsQ0FBQyxDQUFDLENBQUM7UUFDSixVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztLQUN0RSxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBhbmltYXRlLFxuICBhbmltYXRlQ2hpbGQsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgcXVlcnksXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBhcmUgYWxsIHRoZSBhbmltYXRpb25zIGZvciB0aGUgbWF0LXNlbGVjdCBjb21wb25lbnQsIHdpdGggZWFjaFxuICogY29uc3QgY29udGFpbmluZyB0aGUgbWV0YWRhdGEgZm9yIG9uZSBhbmltYXRpb24uXG4gKlxuICogVGhlIHZhbHVlcyBiZWxvdyBtYXRjaCB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIEFuZ3VsYXJKUyBNYXRlcmlhbCBtYXQtc2VsZWN0IGFuaW1hdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1hdFNlbGVjdEFuaW1hdGlvbnM6IHtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIE5vIGxvbmdlciBiZWluZyB1c2VkLiBUbyBiZSByZW1vdmVkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEyLjAuMFxuICAgKi9cbiAgcmVhZG9ubHkgdHJhbnNmb3JtUGFuZWxXcmFwOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG4gIHJlYWRvbmx5IHRyYW5zZm9ybVBhbmVsOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XG59ID0ge1xuICAvKipcbiAgICogVGhpcyBhbmltYXRpb24gZW5zdXJlcyB0aGUgc2VsZWN0J3Mgb3ZlcmxheSBwYW5lbCBhbmltYXRpb24gKHRyYW5zZm9ybVBhbmVsKSBpcyBjYWxsZWQgd2hlblxuICAgKiBjbG9zaW5nIHRoZSBzZWxlY3QuXG4gICAqIFRoaXMgaXMgbmVlZGVkIGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMzMwMlxuICAgKi9cbiAgdHJhbnNmb3JtUGFuZWxXcmFwOiB0cmlnZ2VyKCd0cmFuc2Zvcm1QYW5lbFdyYXAnLCBbXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBxdWVyeSgnQHRyYW5zZm9ybVBhbmVsJywgW2FuaW1hdGVDaGlsZCgpXSxcbiAgICAgICAgICB7b3B0aW9uYWw6IHRydWV9KSlcbiAgXSksXG5cbiAgLyoqIFRoaXMgYW5pbWF0aW9uIHRyYW5zZm9ybXMgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwgb24gYW5kIG9mZiB0aGUgcGFnZS4gKi9cbiAgdHJhbnNmb3JtUGFuZWw6IHRyaWdnZXIoJ3RyYW5zZm9ybVBhbmVsJywgW1xuICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEsIDAuOCknXG4gICAgfSkpLFxuICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gc2hvd2luZycsICBhbmltYXRlKCcxMjBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScsIHN0eWxlKHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLCAxKSdcbiAgICB9KSkpLFxuICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIGFuaW1hdGUoJzEwMG1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpKVxuICBdKVxufTtcbiJdfQ==