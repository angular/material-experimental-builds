import * as i0 from "@angular/core";
import * as i1 from "./overlay-handle";
import * as i2 from "./column-resize-directives/default-enabled-column-resize";
import * as i3 from "./column-resize-directives/default-enabled-column-resize-flex";
import * as i4 from "./resizable-directives/default-enabled-resizable";
import * as i5 from "@angular/material/core";
import * as i6 from "@angular/cdk/overlay";
import * as i7 from "./column-resize-directives/column-resize";
import * as i8 from "./column-resize-directives/column-resize-flex";
import * as i9 from "./resizable-directives/resizable";
export declare class MatColumnResizeCommonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResizeCommonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatColumnResizeCommonModule, [typeof i1.MatColumnResizeOverlayHandle], never, [typeof i1.MatColumnResizeOverlayHandle]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatColumnResizeCommonModule>;
}
export declare class MatDefaultEnabledColumnResizeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDefaultEnabledColumnResizeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatDefaultEnabledColumnResizeModule, [typeof i2.MatDefaultEnabledColumnResize, typeof i3.MatDefaultEnabledColumnResizeFlex, typeof i4.MatDefaultResizable], [typeof i5.MatCommonModule, typeof i6.OverlayModule, typeof MatColumnResizeCommonModule], [typeof i2.MatDefaultEnabledColumnResize, typeof i3.MatDefaultEnabledColumnResizeFlex, typeof i4.MatDefaultResizable]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatDefaultEnabledColumnResizeModule>;
}
export declare class MatColumnResizeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatColumnResizeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatColumnResizeModule, [typeof i7.MatColumnResize, typeof i8.MatColumnResizeFlex, typeof i9.MatResizable], [typeof i5.MatCommonModule, typeof i6.OverlayModule, typeof MatColumnResizeCommonModule], [typeof i7.MatColumnResize, typeof i8.MatColumnResizeFlex, typeof i9.MatResizable]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatColumnResizeModule>;
}
