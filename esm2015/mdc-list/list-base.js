/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, HostBinding, NgZone } from '@angular/core';
import { RippleRenderer, setLines } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
function toggleClass(el, className, on) {
    if (on) {
        el.classList.add(className);
    }
    else {
        el.classList.remove(className);
    }
}
let MatListBase = /** @class */ (() => {
    let MatListBase = 
    /** @docs-private */
    class MatListBase {
        constructor() {
            // @HostBinding is used in the class as it is expected to be extended. Since @Component decorator
            // metadata is not inherited by child classes, instead the host binding data is defined in a way
            // that can be inherited.
            // tslint:disable-next-line:no-host-decorator-in-concrete
            this._isNonInteractive = false;
        }
    };
    __decorate([
        HostBinding('class.mdc-list--non-interactive'),
        __metadata("design:type", Boolean)
    ], MatListBase.prototype, "_isNonInteractive", void 0);
    MatListBase = __decorate([
        Directive()
        /** @docs-private */
    ], MatListBase);
    return MatListBase;
})();
export { MatListBase };
let MatListItemBase = /** @class */ (() => {
    let MatListItemBase = 
    /** @docs-private */
    class MatListItemBase {
        constructor(_element, _ngZone, listBase, platform) {
            this._element = _element;
            this._ngZone = _ngZone;
            this.rippleConfig = {};
            this._subscriptions = new Subscription();
            const el = this._element.nativeElement;
            this.rippleDisabled = listBase._isNonInteractive;
            if (!listBase._isNonInteractive) {
                el.classList.add('mat-mdc-list-item-interactive');
            }
            this._rippleRenderer =
                new RippleRenderer(this, this._ngZone, el, platform);
            this._rippleRenderer.setupTriggerEvents(el);
        }
        ngAfterContentInit() {
            this._monitorLines();
        }
        /**
         * Subscribes to changes in `MatLine` content children and annotates them appropriately when they
         * change.
         */
        _monitorLines() {
            this._ngZone.runOutsideAngular(() => {
                this._subscriptions.add(this.lines.changes.pipe(startWith(this.lines))
                    .subscribe((lines) => {
                    this._element.nativeElement.classList
                        .toggle('mat-mdc-list-item-single-line', lines.length <= 1);
                    lines.forEach((line, index) => {
                        toggleClass(line.nativeElement, 'mdc-list-item__primary-text', index === 0 && lines.length > 1);
                        toggleClass(line.nativeElement, 'mdc-list-item__secondary-text', index !== 0);
                    });
                    setLines(lines, this._element, 'mat-mdc');
                }));
            });
        }
        ngOnDestroy() {
            this._subscriptions.unsubscribe();
            this._rippleRenderer._removeTriggerEvents();
        }
    };
    MatListItemBase = __decorate([
        Directive()
        /** @docs-private */
        ,
        __metadata("design:paramtypes", [ElementRef, NgZone, MatListBase,
            Platform])
    ], MatListItemBase);
    return MatListItemBase;
})();
export { MatListItemBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsLWV4cGVyaW1lbnRhbC9tZGMtbGlzdC9saXN0LWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUdQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxjQUFjLEVBQWdCLFFBQVEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzVGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLFNBQVMsV0FBVyxDQUFDLEVBQVcsRUFBRSxTQUFpQixFQUFFLEVBQVc7SUFDOUQsSUFBSSxFQUFFLEVBQUU7UUFDTixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3QjtTQUFNO1FBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBSUQ7SUFBQSxJQUFzQixXQUFXO0lBRGpDLG9CQUFvQjtJQUNwQixNQUFzQixXQUFXO1FBQWpDO1lBQ0UsaUdBQWlHO1lBQ2pHLGdHQUFnRztZQUNoRyx5QkFBeUI7WUFDekIseURBQXlEO1lBRXpELHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNyQyxDQUFDO0tBQUEsQ0FBQTtJQURDO1FBREMsV0FBVyxDQUFDLGlDQUFpQyxDQUFDOzswREFDWjtJQU5mLFdBQVc7UUFGaEMsU0FBUyxFQUFFO1FBQ1osb0JBQW9CO09BQ0UsV0FBVyxDQU9oQztJQUFELGtCQUFDO0tBQUE7U0FQcUIsV0FBVztBQVdqQztJQUFBLElBQXNCLGVBQWU7SUFEckMsb0JBQW9CO0lBQ3BCLE1BQXNCLGVBQWU7UUFXbkMsWUFBc0IsUUFBb0IsRUFBWSxPQUFlLEVBQUUsUUFBcUIsRUFDaEYsUUFBa0I7WUFEUixhQUFRLEdBQVIsUUFBUSxDQUFZO1lBQVksWUFBTyxHQUFQLE9BQU8sQ0FBUTtZQVJyRSxpQkFBWSxHQUFpQixFQUFFLENBQUM7WUFJeEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBTTFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7Z0JBQy9CLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7YUFDbkQ7WUFDRCxJQUFJLENBQUMsZUFBZTtnQkFDaEIsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVELGtCQUFrQjtZQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7V0FHRztRQUNLLGFBQWE7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNqRSxTQUFTLENBQUMsQ0FBQyxLQUFxQyxFQUFFLEVBQUU7b0JBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVM7eUJBQ2hDLE1BQU0sQ0FBQywrQkFBK0IsRUFBRSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBeUIsRUFBRSxLQUFhLEVBQUUsRUFBRTt3QkFDekQsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQzFCLDZCQUE2QixFQUFFLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDcEUsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsK0JBQStCLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNoRixDQUFDLENBQUMsQ0FBQztvQkFDSCxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUMsQ0FBQztLQUNGLENBQUE7SUFuRHFCLGVBQWU7UUFGcEMsU0FBUyxFQUFFO1FBQ1osb0JBQW9COzt5Q0FZYyxVQUFVLEVBQXFCLE1BQU0sRUFBWSxXQUFXO1lBQ3RFLFFBQVE7T0FaVixlQUFlLENBbURwQztJQUFELHNCQUFDO0tBQUE7U0FuRHFCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JpcHBsZUNvbmZpZywgUmlwcGxlUmVuZGVyZXIsIFJpcHBsZVRhcmdldCwgc2V0TGluZXN9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWw6IEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBvbjogYm9vbGVhbikge1xuICBpZiAob24pIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0QmFzZSB7XG4gIC8vIEBIb3N0QmluZGluZyBpcyB1c2VkIGluIHRoZSBjbGFzcyBhcyBpdCBpcyBleHBlY3RlZCB0byBiZSBleHRlbmRlZC4gU2luY2UgQENvbXBvbmVudCBkZWNvcmF0b3JcbiAgLy8gbWV0YWRhdGEgaXMgbm90IGluaGVyaXRlZCBieSBjaGlsZCBjbGFzc2VzLCBpbnN0ZWFkIHRoZSBob3N0IGJpbmRpbmcgZGF0YSBpcyBkZWZpbmVkIGluIGEgd2F5XG4gIC8vIHRoYXQgY2FuIGJlIGluaGVyaXRlZC5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZScpXG4gIF9pc05vbkludGVyYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG59XG5cbkBEaXJlY3RpdmUoKVxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0SXRlbUJhc2UgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIFJpcHBsZVRhcmdldCB7XG4gIGxpbmVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxFbGVtZW50Pj47XG5cbiAgcmlwcGxlQ29uZmlnOiBSaXBwbGVDb25maWcgPSB7fTtcblxuICByaXBwbGVEaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIHByaXZhdGUgX3JpcHBsZVJlbmRlcmVyOiBSaXBwbGVSZW5kZXJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCBfbmdab25lOiBOZ1pvbmUsIGxpc3RCYXNlOiBNYXRMaXN0QmFzZSxcbiAgICAgICAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yaXBwbGVEaXNhYmxlZCA9IGxpc3RCYXNlLl9pc05vbkludGVyYWN0aXZlO1xuICAgIGlmICghbGlzdEJhc2UuX2lzTm9uSW50ZXJhY3RpdmUpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21hdC1tZGMtbGlzdC1pdGVtLWludGVyYWN0aXZlJyk7XG4gICAgfVxuICAgIHRoaXMuX3JpcHBsZVJlbmRlcmVyID1cbiAgICAgICAgbmV3IFJpcHBsZVJlbmRlcmVyKHRoaXMsIHRoaXMuX25nWm9uZSwgZWwsIHBsYXRmb3JtKTtcbiAgICB0aGlzLl9yaXBwbGVSZW5kZXJlci5zZXR1cFRyaWdnZXJFdmVudHMoZWwpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX21vbml0b3JMaW5lcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyBpbiBgTWF0TGluZWAgY29udGVudCBjaGlsZHJlbiBhbmQgYW5ub3RhdGVzIHRoZW0gYXBwcm9wcmlhdGVseSB3aGVuIHRoZXlcbiAgICogY2hhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW9uaXRvckxpbmVzKCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLmxpbmVzLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saW5lcykpXG4gICAgICAgICAgLnN1YnNjcmliZSgobGluZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEVsZW1lbnQ+PikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdFxuICAgICAgICAgICAgICAgIC50b2dnbGUoJ21hdC1tZGMtbGlzdC1pdGVtLXNpbmdsZS1saW5lJywgbGluZXMubGVuZ3RoIDw9IDEpO1xuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogRWxlbWVudFJlZjxFbGVtZW50PiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhsaW5lLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAnbWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0JywgaW5kZXggPT09IDAgJiYgbGluZXMubGVuZ3RoID4gMSk7XG4gICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGxpbmUubmF0aXZlRWxlbWVudCwgJ21kYy1saXN0LWl0ZW1fX3NlY29uZGFyeS10ZXh0JywgaW5kZXggIT09IDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMaW5lcyhsaW5lcywgdGhpcy5fZWxlbWVudCwgJ21hdC1tZGMnKTtcbiAgICAgICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmlwcGxlUmVuZGVyZXIuX3JlbW92ZVRyaWdnZXJFdmVudHMoKTtcbiAgfVxufVxuIl19