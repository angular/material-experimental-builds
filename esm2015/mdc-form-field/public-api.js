/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export * from './directives/label';
export * from './directives/error';
export * from './directives/hint';
export * from './directives/prefix';
export * from './directives/suffix';
export * from './form-field';
export * from './module';
export { MAT_FORM_FIELD, MatFormFieldControl, getMatFormFieldDuplicatedHintError, getMatFormFieldMissingControlError, getMatFormFieldPlaceholderConflictError, _MAT_HINT, MatPlaceholder, matFormFieldAnimations, } from '@angular/material/form-field';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC1leHBlcmltZW50YWwvbWRjLWZvcm0tZmllbGQvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyxtQkFBbUIsQ0FBQztBQUNsQyxjQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGNBQWMscUJBQXFCLENBQUM7QUFDcEMsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyxVQUFVLENBQUM7QUFFekIsT0FBTyxFQUNMLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsa0NBQWtDLEVBQ2xDLGtDQUFrQyxFQUNsQyx1Q0FBdUMsRUFDdkMsU0FBUyxFQUNULGNBQWMsRUFDZCxzQkFBc0IsR0FDdkIsTUFBTSw4QkFBOEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2RpcmVjdGl2ZXMvbGFiZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9kaXJlY3RpdmVzL2Vycm9yJztcbmV4cG9ydCAqIGZyb20gJy4vZGlyZWN0aXZlcy9oaW50JztcbmV4cG9ydCAqIGZyb20gJy4vZGlyZWN0aXZlcy9wcmVmaXgnO1xuZXhwb3J0ICogZnJvbSAnLi9kaXJlY3RpdmVzL3N1ZmZpeCc7XG5leHBvcnQgKiBmcm9tICcuL2Zvcm0tZmllbGQnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGUnO1xuXG5leHBvcnQge1xuICBNQVRfRk9STV9GSUVMRCxcbiAgTWF0Rm9ybUZpZWxkQ29udHJvbCxcbiAgZ2V0TWF0Rm9ybUZpZWxkRHVwbGljYXRlZEhpbnRFcnJvcixcbiAgZ2V0TWF0Rm9ybUZpZWxkTWlzc2luZ0NvbnRyb2xFcnJvcixcbiAgZ2V0TWF0Rm9ybUZpZWxkUGxhY2Vob2xkZXJDb25mbGljdEVycm9yLFxuICBfTUFUX0hJTlQsXG4gIE1hdFBsYWNlaG9sZGVyLFxuICBtYXRGb3JtRmllbGRBbmltYXRpb25zLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbiJdfQ==