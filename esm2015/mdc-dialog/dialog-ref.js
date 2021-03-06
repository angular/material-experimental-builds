/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MatDialogRef as NonMdcDialogRef } from '@angular/material/dialog';
// Counter for unique dialog ids.
let uniqueId = 0;
/**
 * Reference to a dialog opened via the MatDialog service.
 */
export class MatDialogRef extends NonMdcDialogRef {
    constructor(overlayRef, containerInstance, id = `mat-mdc-dialog-${uniqueId++}`) {
        super(overlayRef, containerInstance, id);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWRpYWxvZy9kaWFsb2ctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxZQUFZLElBQUksZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFHekUsaUNBQWlDO0FBQ2pDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQjs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUF5QixTQUFRLGVBQXFCO0lBQ2pFLFlBQ0ksVUFBc0IsRUFDdEIsaUJBQXFDLEVBQ3JDLEtBQWEsa0JBQWtCLFFBQVEsRUFBRSxFQUFFO1FBQzdDLEtBQUssQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T3ZlcmxheVJlZn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtNYXREaWFsb2dSZWYgYXMgTm9uTWRjRGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtNYXREaWFsb2dDb250YWluZXJ9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lcic7XG5cbi8vIENvdW50ZXIgZm9yIHVuaXF1ZSBkaWFsb2cgaWRzLlxubGV0IHVuaXF1ZUlkID0gMDtcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYSBkaWFsb2cgb3BlbmVkIHZpYSB0aGUgTWF0RGlhbG9nIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXREaWFsb2dSZWY8VCwgUiA9IGFueT4gZXh0ZW5kcyBOb25NZGNEaWFsb2dSZWY8VCwgUj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgICBjb250YWluZXJJbnN0YW5jZTogTWF0RGlhbG9nQ29udGFpbmVyLFxuICAgICAgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWRpYWxvZy0ke3VuaXF1ZUlkKyt9YCkge1xuICAgIHN1cGVyKG92ZXJsYXlSZWYsIGNvbnRhaW5lckluc3RhbmNlLCBpZCk7XG4gIH1cbn1cbiJdfQ==