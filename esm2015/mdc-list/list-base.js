/**
 * @fileoverview added by tsickle
 * Generated from: src/material-experimental/mdc-list/list-base.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { setLines } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
export class MatListBase {
}
export class MatListItemBase {
    /**
     * @param {?} _element
     * @param {?} _ngZone
     */
    constructor(_element, _ngZone) {
        this._element = _element;
        this._ngZone = _ngZone;
        this._subscriptions = new Subscription();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._monitorLines();
    }
    /**
     * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
     * change.
     * @private
     * @return {?}
     */
    _monitorLines() {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this._subscriptions.add(this.lines.changes.pipe(startWith(this.lines))
                .subscribe((/**
             * @param {?} lines
             * @return {?}
             */
            (lines) => {
                lines.forEach((/**
                 * @param {?} line
                 * @param {?} index
                 * @return {?}
                 */
                (line, index) => {
                    line.nativeElement.classList.toggle('mdc-list-item__primary-text', index === 0);
                    line.nativeElement.classList.toggle('mdc-list-item__secondary-text', index !== 0);
                }));
                setLines(lines, this._element, 'mat-mdc');
            })));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }
}
if (false) {
    /** @type {?} */
    MatListItemBase.prototype.lines;
    /**
     * @type {?}
     * @private
     */
    MatListItemBase.prototype._subscriptions;
    /**
     * @type {?}
     * @protected
     */
    MatListItemBase.prototype._element;
    /**
     * @type {?}
     * @protected
     */
    MatListItemBase.prototype._ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLE1BQU0sT0FBTyxXQUFXO0NBQUc7QUFFM0IsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBSzFCLFlBQXNCLFFBQW9CLEVBQVksT0FBZTtRQUEvQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVksWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUY3RCxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFNEIsQ0FBQzs7OztJQUV6RSxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUFNTyxhQUFhO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pFLFNBQVM7Ozs7WUFBQyxDQUFDLEtBQXFDLEVBQUUsRUFBRTtnQkFDbkQsS0FBSyxDQUFDLE9BQU87Ozs7O2dCQUFDLENBQUMsSUFBeUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtvQkFDekQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDZCQUE2QixFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLCtCQUErQixFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEYsQ0FBQyxFQUFDLENBQUM7Z0JBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDVixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7OztJQTlCQyxnQ0FBc0M7Ozs7O0lBRXRDLHlDQUE0Qzs7Ozs7SUFFaEMsbUNBQThCOzs7OztJQUFFLGtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIEVsZW1lbnRSZWYsIE5nWm9uZSwgT25EZXN0cm95LCBRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtzZXRMaW5lc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgTWF0TGlzdEJhc2Uge31cblxuZXhwb3J0IGNsYXNzIE1hdExpc3RJdGVtQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIGxpbmVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj47XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX21vbml0b3JMaW5lcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiBgTWF0TGluZWAgY29udGVudCBjaGlsZHJlbiBhbmQgYW5ub3RhdGVzIHRoZW0gYXBwcm9wcmlhdGVseSB3aGVuIHRoZXlcbiAgICogY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW9uaXRvckxpbmVzKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmxpbmVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogRWxlbWVudFJlZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICBsaW5lLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0JywgaW5kZXggPT09IDApO1xuICAgICAgICAgICAgICBsaW5lLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQnLCBpbmRleCAhPT0gMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldExpbmVzKGxpbmVzLCB0aGlzLl9lbGVtZW50LCAnbWF0LW1kYycpO1xuICAgICAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19