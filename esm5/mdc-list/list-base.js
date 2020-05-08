/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, HostBinding, NgZone } from '@angular/core';
import { RippleRenderer, setLines } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
var MatListBase = /** @class */ (function () {
    function MatListBase() {
    }
    MatListBase.decorators = [
        { type: Directive }
    ];
    MatListBase.propDecorators = {
        _isNonInteractive: [{ type: HostBinding, args: ['class.mdc-list--non-interactive',] }]
    };
    return MatListBase;
}());
export { MatListBase };
var MatListItemBase = /** @class */ (function () {
    function MatListItemBase(_element, _ngZone, listBase, platform) {
        this._element = _element;
        this._ngZone = _ngZone;
        this.rippleConfig = {};
        this._subscriptions = new Subscription();
        var el = this._element.nativeElement;
        this.rippleDisabled = listBase._isNonInteractive;
        if (!listBase._isNonInteractive) {
            el.classList.add('mat-mdc-list-item-interactive');
        }
        this._rippleRenderer =
            new RippleRenderer(this, this._ngZone, el, platform);
        this._rippleRenderer.setupTriggerEvents(el);
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
        this._rippleRenderer._removeTriggerEvents();
    };
    MatListItemBase.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    MatListItemBase.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: MatListBase },
        { type: Platform }
    ]; };
    return MatListItemBase;
}());
export { MatListItemBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLEVBR1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGNBQWMsRUFBZ0IsUUFBUSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFekM7SUFBQTtJQVFBLENBQUM7O2dCQVJBLFNBQVM7OztvQ0FNUCxXQUFXLFNBQUMsaUNBQWlDOztJQUVoRCxrQkFBQztDQUFBLEFBUkQsSUFRQztTQVBZLFdBQVc7QUFTeEI7SUFZRSx5QkFBc0IsUUFBb0IsRUFBWSxPQUFlLEVBQUUsUUFBcUIsRUFDaEYsUUFBa0I7UUFEUixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVksWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVJyRSxpQkFBWSxHQUFpQixFQUFFLENBQUM7UUFJeEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTFDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDL0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNuRDtRQUNELElBQUksQ0FBQyxlQUFlO1lBQ2hCLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCw0Q0FBa0IsR0FBbEI7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHVDQUFhLEdBQXJCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqRSxTQUFTLENBQUMsVUFBQyxLQUFxQztnQkFDL0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQXlCLEVBQUUsS0FBYTtvQkFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDZCQUE2QixFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLCtCQUErQixFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEYsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUMsQ0FBQzs7Z0JBaERGLFNBQVM7Ozs7Z0JBcEJSLFVBQVU7Z0JBRVYsTUFBTTtnQkE4QjJFLFdBQVc7Z0JBcEN0RixRQUFROztJQXlFaEIsc0JBQUM7Q0FBQSxBQWpERCxJQWlEQztTQWhEcUIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmlwcGxlQ29uZmlnLCBSaXBwbGVSZW5kZXJlciwgUmlwcGxlVGFyZ2V0LCBzZXRMaW5lc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBNYXRMaXN0QmFzZSB7XG4gIC8vIEBIb3N0QmluZGluZyBpcyB1c2VkIGluIHRoZSBjbGFzcyBhcyBpdCBpcyBleHBlY3RlZCB0byBiZSBleHRlbmRlZC4gU2luY2UgQENvbXBvbmVudCBkZWNvcmF0b3JcbiAgLy8gbWV0YWRhdGEgaXMgbm90IGluaGVyaXRlZCBieSBjaGlsZCBjbGFzc2VzLCBpbnN0ZWFkIHRoZSBob3N0IGJpbmRpbmcgZGF0YSBpcyBkZWZpbmVkIGluIGEgd2F5XG4gIC8vIHRoYXQgY2FuIGJlIGluaGVyaXRlZC5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZScpXG4gIF9pc05vbkludGVyYWN0aXZlOiBib29sZWFuO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0SXRlbUJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIFJpcHBsZVRhcmdldCB7XG4gIGxpbmVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj47XG5cbiAgcmlwcGxlQ29uZmlnOiBSaXBwbGVDb25maWcgPSB7fTtcblxuICByaXBwbGVEaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIHByaXZhdGUgX3JpcHBsZVJlbmRlcmVyOiBSaXBwbGVSZW5kZXJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsIGxpc3RCYXNlOiBNYXRMaXN0QmFzZSxcbiAgICAgICAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yaXBwbGVEaXNhYmxlZCA9IGxpc3RCYXNlLl9pc05vbkludGVyYWN0aXZlO1xuICAgIGlmICghbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtbGlzdC1pdGVtLWludGVyYWN0aXZlJyk7XG4gICAgfVxuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyID1cbiAgICAgICAgbmV3IFJpcHBsZVJlbmRlcmVyKHRoaXMsIHRoaXMuX25nWm9uZSwgZWwsIHBsYXRmb3JtKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXR1cFRyaWdnZXJFdmVudHMoZWwpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX21vbml0b3JMaW5lcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiBgTWF0TGluZWAgY29udGVudCBjaGlsZHJlbiBhbmQgYW5ub3RhdGVzIHRoZW0gYXBwcm9wcmlhdGVseSB3aGVuIHRoZXlcbiAgICogY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW9uaXRvckxpbmVzKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmxpbmVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogRWxlbWVudFJlZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICBsaW5lLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0JywgaW5kZXggPT09IDApO1xuICAgICAgICAgICAgICBsaW5lLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQnLCBpbmRleCAhPT0gMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldExpbmVzKGxpbmVzLCB0aGlzLl9lbGVtZW50LCAnbWF0LW1kYycpO1xuICAgICAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5fcmVtb3ZlVHJpZ2dlckV2ZW50cygpO1xuICB9XG59XG4iXX0=