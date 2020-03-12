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
var MatListBase = /** @class */ (function () {
    function MatListBase() {
    }
    return MatListBase;
}());
export { MatListBase };
var MatListItemBase = /** @class */ (function () {
    function MatListItemBase(_element, _ngZone) {
        this._element = _element;
        this._ngZone = _ngZone;
        this._subscriptions = new Subscription();
    }
    MatListItemBase.prototype.ngAfterContentInit = function () {
        this._monitorLines();
    };
    /**
     * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
     * change.
     */
    MatListItemBase.prototype._monitorLines = function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            _this._subscriptions.add(_this.lines.changes.pipe(startWith(_this.lines))
                .subscribe(function (lines) {
                lines.forEach(function (line, index) {
                    line.nativeElement.classList.toggle('mdc-list-item__primary-text', index === 0);
                    line.nativeElement.classList.toggle('mdc-list-item__secondary-text', index !== 0);
                });
                setLines(lines, _this._element, 'mat-mdc');
            }));
        });
    };
    MatListItemBase.prototype.ngOnDestroy = function () {
        this._subscriptions.unsubscribe();
    };
    return MatListItemBase;
}());
export { MatListItemBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpDO0lBQUE7SUFBMEIsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUEzQixJQUEyQjs7QUFFM0I7SUFLRSx5QkFBc0IsUUFBb0IsRUFBWSxPQUFlO1FBQS9DLGFBQVEsR0FBUixRQUFRLENBQVk7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRjdELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUU0QixDQUFDO0lBRXpFLDRDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssdUNBQWEsR0FBckI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pFLFNBQVMsQ0FBQyxVQUFDLEtBQXFDO2dCQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBeUIsRUFBRSxLQUFhO29CQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsK0JBQStCLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwRixDQUFDLENBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEvQkQsSUErQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBZnRlckNvbnRlbnRJbml0LCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uRGVzdHJveSwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7c2V0TGluZXN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIE1hdExpc3RCYXNlIHt9XG5cbmV4cG9ydCBjbGFzcyBNYXRMaXN0SXRlbUJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBsaW5lczogUXVlcnlMaXN0PEVsZW1lbnRSZWY8RWxlbWVudD4+O1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9lbGVtZW50OiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgX25nWm9uZTogTmdab25lKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9tb25pdG9yTGluZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgaW4gYE1hdExpbmVgIGNvbnRlbnQgY2hpbGRyZW4gYW5kIGFubm90YXRlcyB0aGVtIGFwcHJvcHJpYXRlbHkgd2hlbiB0aGV5XG4gICAqIGNoYW5nZS5cbiAgICovXG4gIHByaXZhdGUgX21vbml0b3JMaW5lcygpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5saW5lcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMubGluZXMpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGxpbmVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj4pID0+IHtcbiAgICAgICAgICAgIGxpbmVzLmZvckVhY2goKGxpbmU6IEVsZW1lbnRSZWY8RWxlbWVudD4sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgbGluZS5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ21kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCcsIGluZGV4ID09PSAwKTtcbiAgICAgICAgICAgICAgbGluZS5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JywgaW5kZXggIT09IDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaW5lcyhsaW5lcywgdGhpcy5fZWxlbWVudCwgJ21hdC1tZGMnKTtcbiAgICAgICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==