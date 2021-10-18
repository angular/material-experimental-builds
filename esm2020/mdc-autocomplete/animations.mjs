/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, group, state, style, transition, trigger, } from '@angular/animations';
// Animation values come from
// https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/_mixins.scss
// TODO(mmalerba): Ideally find a way to import the values from MDC's code.
export const panelAnimation = trigger('panelAnimation', [
    state('void, hidden', style({
        opacity: 0,
        transform: 'scaleY(0.8)',
    })),
    transition(':enter, hidden => visible', [
        group([
            animate('0.03s linear', style({ opacity: 1 })),
            animate('0.12s cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scaleY(1)' })),
        ]),
    ]),
    transition(':leave, visible => hidden', [animate('0.075s linear', style({ opacity: 0 }))]),
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWF1dG9jb21wbGV0ZS9hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxPQUFPLEVBRVAsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLDZCQUE2QjtBQUM3QixvSEFBb0g7QUFDcEgsMkVBQTJFO0FBQzNFLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBNkIsT0FBTyxDQUFDLGdCQUFnQixFQUFFO0lBQ2hGLEtBQUssQ0FDSCxjQUFjLEVBQ2QsS0FBSyxDQUFDO1FBQ0osT0FBTyxFQUFFLENBQUM7UUFDVixTQUFTLEVBQUUsYUFBYTtLQUN6QixDQUFDLENBQ0g7SUFDRCxVQUFVLENBQUMsMkJBQTJCLEVBQUU7UUFDdEMsS0FBSyxDQUFDO1lBQ0osT0FBTyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7U0FDN0UsQ0FBQztLQUNILENBQUM7SUFDRixVQUFVLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6RixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICBncm91cCxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuLy8gQW5pbWF0aW9uIHZhbHVlcyBjb21lIGZyb21cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL21kYy1tZW51LXN1cmZhY2UvX21peGlucy5zY3NzXG4vLyBUT0RPKG1tYWxlcmJhKTogSWRlYWxseSBmaW5kIGEgd2F5IHRvIGltcG9ydCB0aGUgdmFsdWVzIGZyb20gTURDJ3MgY29kZS5cbmV4cG9ydCBjb25zdCBwYW5lbEFuaW1hdGlvbjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhID0gdHJpZ2dlcigncGFuZWxBbmltYXRpb24nLCBbXG4gIHN0YXRlKFxuICAgICd2b2lkLCBoaWRkZW4nLFxuICAgIHN0eWxlKHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KScsXG4gICAgfSksXG4gICksXG4gIHRyYW5zaXRpb24oJzplbnRlciwgaGlkZGVuID0+IHZpc2libGUnLCBbXG4gICAgZ3JvdXAoW1xuICAgICAgYW5pbWF0ZSgnMC4wM3MgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXG4gICAgICBhbmltYXRlKCcwLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZVkoMSknfSkpLFxuICAgIF0pLFxuICBdKSxcbiAgdHJhbnNpdGlvbignOmxlYXZlLCB2aXNpYmxlID0+IGhpZGRlbicsIFthbmltYXRlKCcwLjA3NXMgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDB9KSldKSxcbl0pO1xuIl19