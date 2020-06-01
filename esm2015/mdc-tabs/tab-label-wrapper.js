/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabLabelWrapper as BaseMatTabLabelWrapper } from '@angular/material/tabs';
import { MatInkBarFoundation } from './ink-bar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
let MatTabLabelWrapper = /** @class */ (() => {
    class MatTabLabelWrapper extends BaseMatTabLabelWrapper {
        constructor(elementRef, _document) {
            super(elementRef);
            this.elementRef = elementRef;
            this._document = _document;
            this._foundation = new MatInkBarFoundation(this.elementRef.nativeElement, this._document);
        }
        /** Whether the ink bar should fit its width to the size of the tab label content. */
        get fitInkBarToContent() { return this._foundation.getFitToContent(); }
        set fitInkBarToContent(v) { this._foundation.setFitToContent(coerceBooleanProperty(v)); }
        ngOnInit() {
            this._foundation.init();
        }
        ngOnDestroy() {
            this._foundation.destroy();
        }
        /** Sets focus on the wrapper element */
        focus() {
            this.elementRef.nativeElement.focus();
        }
    }
    MatTabLabelWrapper.decorators = [
        { type: Directive, args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    }
                },] }
    ];
    /** @nocollapse */
    MatTabLabelWrapper.ctorParameters = () => [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    MatTabLabelWrapper.propDecorators = {
        fitInkBarToContent: [{ type: Input }]
    };
    return MatTabLabelWrapper;
})();
export { MatTabLabelWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwtZXhwZXJpbWVudGFsL21kYy10YWJzL3RhYi1sYWJlbC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsa0JBQWtCLElBQUksc0JBQXNCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsbUJBQW1CLEVBQWdCLE1BQU0sV0FBVyxDQUFDO0FBQzdELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTFFOzs7R0FHRztBQUNIO0lBQUEsTUFRYSxrQkFBbUIsU0FBUSxzQkFBc0I7UUFXNUQsWUFBbUIsVUFBc0IsRUFBb0IsU0FBYztZQUN6RSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFERCxlQUFVLEdBQVYsVUFBVSxDQUFZO1lBRXZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUYsQ0FBQztRQVRELHFGQUFxRjtRQUNyRixJQUNJLGtCQUFrQixLQUFjLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxrQkFBa0IsQ0FBQyxDQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFRbEcsUUFBUTtZQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFFRCx3Q0FBd0M7UUFDeEMsS0FBSztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLENBQUM7OztnQkFwQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLDhCQUE4QixFQUFFLFVBQVU7d0JBQzFDLHNCQUFzQixFQUFFLFlBQVk7cUJBQ3JDO2lCQUNGOzs7O2dCQWpCa0IsVUFBVTtnREE2QmlCLE1BQU0sU0FBQyxRQUFROzs7cUNBSjFELEtBQUs7O0lBd0JSLHlCQUFDO0tBQUE7U0EvQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNYXRUYWJMYWJlbFdyYXBwZXIgYXMgQmFzZU1hdFRhYkxhYmVsV3JhcHBlcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge01hdElua0JhckZvdW5kYXRpb24sIE1hdElua0Jhckl0ZW19IGZyb20gJy4vaW5rLWJhcic7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG4vKipcbiAqIFVzZWQgaW4gdGhlIGBtYXQtdGFiLWdyb3VwYCB2aWV3IHRvIGRpc3BsYXkgdGFiIGxhYmVscy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRhYkxhYmVsV3JhcHBlcl0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy10YWItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnISFkaXNhYmxlZCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0VGFiTGFiZWxXcmFwcGVyIGV4dGVuZHMgQmFzZU1hdFRhYkxhYmVsV3JhcHBlclxuICAgIGltcGxlbWVudHMgTWF0SW5rQmFySXRlbSwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgX2ZvdW5kYXRpb246IE1hdElua0JhckZvdW5kYXRpb247XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGluayBiYXIgc2hvdWxkIGZpdCBpdHMgd2lkdGggdG8gdGhlIHNpemUgb2YgdGhlIHRhYiBsYWJlbCBjb250ZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZml0SW5rQmFyVG9Db250ZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZm91bmRhdGlvbi5nZXRGaXRUb0NvbnRlbnQoKTsgfVxuICBzZXQgZml0SW5rQmFyVG9Db250ZW50KHY6IGJvb2xlYW4pIHsgdGhpcy5fZm91bmRhdGlvbi5zZXRGaXRUb0NvbnRlbnQoY29lcmNlQm9vbGVhblByb3BlcnR5KHYpKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2RvY3VtZW50ID0gX2RvY3VtZW50O1xuICAgIHRoaXMuX2ZvdW5kYXRpb24gPSBuZXcgTWF0SW5rQmFyRm91bmRhdGlvbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fZG9jdW1lbnQpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fZm91bmRhdGlvbi5pbml0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB3cmFwcGVyIGVsZW1lbnQgKi9cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXRJbmtCYXJUb0NvbnRlbnQ6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==