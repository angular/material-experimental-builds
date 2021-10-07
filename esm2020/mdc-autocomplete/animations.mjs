/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, group, state, style, transition, trigger } from '@angular/animations';
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
    transition(':leave, visible => hidden', [
        animate('0.075s linear', style({ opacity: 0 })),
    ]),
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWF1dG9jb21wbGV0ZS9hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxPQUFPLEVBRVAsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLDZCQUE2QjtBQUM3QixvSEFBb0g7QUFDcEgsMkVBQTJFO0FBQzNFLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBNkIsT0FBTyxDQUFDLGdCQUFnQixFQUFFO0lBQ2hGLEtBQUssQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDO1FBQzFCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsU0FBUyxFQUFFLGFBQWE7S0FDekIsQ0FBQyxDQUFDO0lBQ0gsVUFBVSxDQUFDLDJCQUEyQixFQUFFO1FBQ3RDLEtBQUssQ0FBQztZQUNKLE9BQU8sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQy9FLENBQUM7S0FDSCxDQUFDO0lBQ0YsVUFBVSxDQUFDLDJCQUEyQixFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDaEQsQ0FBQztDQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBhbmltYXRlLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gIGdyb3VwLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8vIEFuaW1hdGlvbiB2YWx1ZXMgY29tZSBmcm9tXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9wYWNrYWdlcy9tZGMtbWVudS1zdXJmYWNlL19taXhpbnMuc2Nzc1xuLy8gVE9ETyhtbWFsZXJiYSk6IElkZWFsbHkgZmluZCBhIHdheSB0byBpbXBvcnQgdGhlIHZhbHVlcyBmcm9tIE1EQydzIGNvZGUuXG5leHBvcnQgY29uc3QgcGFuZWxBbmltYXRpb246IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9IHRyaWdnZXIoJ3BhbmVsQW5pbWF0aW9uJywgW1xuICBzdGF0ZSgndm9pZCwgaGlkZGVuJywgc3R5bGUoe1xuICAgIG9wYWNpdHk6IDAsXG4gICAgdHJhbnNmb3JtOiAnc2NhbGVZKDAuOCknLFxuICB9KSksXG4gIHRyYW5zaXRpb24oJzplbnRlciwgaGlkZGVuID0+IHZpc2libGUnLCBbXG4gICAgZ3JvdXAoW1xuICAgICAgYW5pbWF0ZSgnMC4wM3MgbGluZWFyJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcbiAgICAgIGFuaW1hdGUoJzAuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZVkoMSknIH0pKSxcbiAgICBdKSxcbiAgXSksXG4gIHRyYW5zaXRpb24oJzpsZWF2ZSwgdmlzaWJsZSA9PiBoaWRkZW4nLCBbXG4gICAgYW5pbWF0ZSgnMC4wNzVzIGxpbmVhcicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gIF0pLFxuXSk7XG4iXX0=