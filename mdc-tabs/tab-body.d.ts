/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatTabBodyPortal as BaseMatTabBodyPortal, _MatTabBodyBase } from '@angular/material/tabs';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
export declare class MatTabBodyPortal extends BaseMatTabBodyPortal {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, host: MatTabBody);
}
/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
export declare class MatTabBody extends _MatTabBodyBase {
    _portalHost: PortalHostDirective;
    constructor(elementRef: ElementRef<HTMLElement>, dir: Directionality, changeDetectorRef: ChangeDetectorRef);
}
