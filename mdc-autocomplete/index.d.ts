import { getMatAutocompleteMissingPanelError } from '@angular/material/autocomplete';
import * as i0 from '@angular/core';
import * as i4 from '@angular/cdk/overlay';
import * as i5 from '@angular/material-experimental/mdc-core';
import * as i6 from '@angular/common';
import * as i7 from '@angular/cdk/scrolling';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY } from '@angular/material/autocomplete';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY } from '@angular/material/autocomplete';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { MatAutocompleteDefaultOptions } from '@angular/material/autocomplete';
import { _MatAutocompleteOriginBase } from '@angular/material/autocomplete';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { _MatAutocompleteTriggerBase } from '@angular/material/autocomplete';
import { MatOptgroup } from '@angular/material-experimental/mdc-core';
import { MatOption } from '@angular/material-experimental/mdc-core';
import { QueryList } from '@angular/core';

export { getMatAutocompleteMissingPanelError }

declare namespace i1 {
    export {
        MatAutocomplete
    }
}

declare namespace i2 {
    export {
        MAT_AUTOCOMPLETE_VALUE_ACCESSOR,
        MatAutocompleteTrigger
    }
}

declare namespace i3 {
    export {
        MatAutocompleteOrigin
    }
}

export { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS }

export { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY }

export { MAT_AUTOCOMPLETE_SCROLL_STRATEGY }

export { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY }

export { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER }

/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export declare const MAT_AUTOCOMPLETE_VALUE_ACCESSOR: any;

export declare class MatAutocomplete extends _MatAutocompleteBase {
    /** Reference to all option groups within the autocomplete. */
    optionGroups: QueryList<MatOptgroup>;
    /** Reference to all options within the autocomplete. */
    options: QueryList<MatOption>;
    protected _visibleClass: string;
    protected _hiddenClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatAutocomplete, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatAutocomplete, "mat-autocomplete", ["matAutocomplete"], { "disableRipple": "disableRipple"; }, {}, ["optionGroups", "options"], ["*"], false>;
}

export { MatAutocompleteActivatedEvent }

export { MatAutocompleteDefaultOptions }

export declare class MatAutocompleteModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatAutocompleteModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatAutocompleteModule, [typeof i1.MatAutocomplete, typeof i2.MatAutocompleteTrigger, typeof i3.MatAutocompleteOrigin], [typeof i4.OverlayModule, typeof i5.MatOptionModule, typeof i5.MatCommonModule, typeof i6.CommonModule], [typeof i7.CdkScrollableModule, typeof i1.MatAutocomplete, typeof i5.MatOptionModule, typeof i5.MatCommonModule, typeof i2.MatAutocompleteTrigger, typeof i3.MatAutocompleteOrigin]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatAutocompleteModule>;
}

/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
export declare class MatAutocompleteOrigin extends _MatAutocompleteOriginBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatAutocompleteOrigin, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatAutocompleteOrigin, "[matAutocompleteOrigin]", ["matAutocompleteOrigin"], {}, {}, never, never, false>;
}

export { MatAutocompleteSelectedEvent }

export declare class MatAutocompleteTrigger extends _MatAutocompleteTriggerBase {
    protected _aboveClass: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatAutocompleteTrigger, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatAutocompleteTrigger, "input[matAutocomplete], textarea[matAutocomplete]", ["matAutocompleteTrigger"], {}, {}, never, never, false>;
}

export { }
