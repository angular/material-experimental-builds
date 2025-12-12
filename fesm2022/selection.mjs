import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkSelection, CdkSelectAll, CdkSelectionToggle, CdkRowSelection } from '@angular/cdk-experimental/selection';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, inject, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, NgModule } from '@angular/core';
import { MatTable, MatColumnDef, MatCellDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatTableModule } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

class MatSelection extends CdkSelection {
  get multiple() {
    return this._multiple;
  }
  set multiple(multiple) {
    this._multiple = coerceBooleanProperty(multiple);
  }
  change = new EventEmitter();
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatSelection,
    deps: null,
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "21.0.3",
    type: MatSelection,
    isStandalone: true,
    selector: "[matSelection]",
    inputs: {
      multiple: ["matSelectionMultiple", "multiple"]
    },
    outputs: {
      change: "matSelectionChange"
    },
    providers: [{
      provide: CdkSelection,
      useExisting: MatSelection
    }],
    exportAs: ["matSelection"],
    usesInheritance: true,
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.3",
  ngImport: i0,
  type: MatSelection,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[matSelection]',
      exportAs: 'matSelection',
      providers: [{
        provide: CdkSelection,
        useExisting: MatSelection
      }]
    }]
  }],
  propDecorators: {
    multiple: [{
      type: Input,
      args: ['matSelectionMultiple']
    }],
    change: [{
      type: Output,
      args: ['matSelectionChange']
    }]
  }
});

class MatSelectAll extends CdkSelectAll {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatSelectAll,
    deps: null,
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "21.0.3",
    type: MatSelectAll,
    isStandalone: true,
    selector: "[matSelectAll]",
    providers: [{
      provide: CdkSelectAll,
      useExisting: MatSelectAll
    }],
    exportAs: ["matSelectAll"],
    usesInheritance: true,
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.3",
  ngImport: i0,
  type: MatSelectAll,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[matSelectAll]',
      exportAs: 'matSelectAll',
      providers: [{
        provide: CdkSelectAll,
        useExisting: MatSelectAll
      }]
    }]
  }]
});

class MatSelectionToggle extends CdkSelectionToggle {
  value = undefined;
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatSelectionToggle,
    deps: null,
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "21.0.3",
    type: MatSelectionToggle,
    isStandalone: true,
    selector: "[matSelectionToggle]",
    inputs: {
      index: ["matSelectionToggleIndex", "index"],
      value: ["matSelectionToggleValue", "value"]
    },
    providers: [{
      provide: CdkSelectionToggle,
      useExisting: MatSelectionToggle
    }],
    exportAs: ["matSelectionToggle"],
    usesInheritance: true,
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.3",
  ngImport: i0,
  type: MatSelectionToggle,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[matSelectionToggle]',
      exportAs: 'matSelectionToggle',
      inputs: [{
        name: 'index',
        alias: 'matSelectionToggleIndex'
      }],
      providers: [{
        provide: CdkSelectionToggle,
        useExisting: MatSelectionToggle
      }]
    }]
  }],
  propDecorators: {
    value: [{
      type: Input,
      args: ['matSelectionToggleValue']
    }]
  }
});

class MatSelectionColumn {
  _table = inject(MatTable, {
    optional: true
  });
  selection = inject(MatSelection, {
    optional: true
  });
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
    this._syncColumnDefName();
  }
  _name;
  _columnDef;
  _cell;
  _headerCell;
  ngOnInit() {
    if (!this.selection && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error('MatSelectionColumn: missing MatSelection in the parent');
    }
    this._syncColumnDefName();
    if (this._table) {
      this._columnDef.cell = this._cell;
      this._columnDef.headerCell = this._headerCell;
      this._table.addColumnDef(this._columnDef);
    } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
      throw Error('MatSelectionColumn: missing parent table');
    }
  }
  ngOnDestroy() {
    if (this._table) {
      this._table.removeColumnDef(this._columnDef);
    }
  }
  _syncColumnDefName() {
    if (this._columnDef) {
      this._columnDef.name = this._name;
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatSelectionColumn,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: "17.0.0",
    version: "21.0.3",
    type: MatSelectionColumn,
    isStandalone: true,
    selector: "mat-selection-column",
    inputs: {
      name: "name"
    },
    viewQueries: [{
      propertyName: "_columnDef",
      first: true,
      predicate: MatColumnDef,
      descendants: true,
      static: true
    }, {
      propertyName: "_cell",
      first: true,
      predicate: MatCellDef,
      descendants: true,
      static: true
    }, {
      propertyName: "_headerCell",
      first: true,
      predicate: MatHeaderCellDef,
      descendants: true,
      static: true
    }],
    ngImport: i0,
    template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef class="mat-selection-column-header">
        @if (selection && selection.multiple) {
          <mat-checkbox
              matSelectAll
              #allToggler="matSelectAll"
              [indeterminate]="allToggler.indeterminate | async"></mat-checkbox>
        }
      </th>
      <td mat-cell *matCellDef="let row; let i = $index" class="mat-selection-column-cell">
        <mat-checkbox
            matSelectionToggle
            [matSelectionToggleValue]="row"
            [matSelectionToggleIndex]="i"></mat-checkbox>
      </td>
    </ng-container>
  `,
    isInline: true,
    styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}\n"],
    dependencies: [{
      kind: "directive",
      type: MatColumnDef,
      selector: "[matColumnDef]",
      inputs: ["matColumnDef"]
    }, {
      kind: "directive",
      type: MatHeaderCellDef,
      selector: "[matHeaderCellDef]"
    }, {
      kind: "directive",
      type: MatHeaderCell,
      selector: "mat-header-cell, th[mat-header-cell]"
    }, {
      kind: "component",
      type: MatCheckbox,
      selector: "mat-checkbox",
      inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"],
      outputs: ["change", "indeterminateChange"],
      exportAs: ["matCheckbox"]
    }, {
      kind: "directive",
      type: MatSelectAll,
      selector: "[matSelectAll]",
      exportAs: ["matSelectAll"]
    }, {
      kind: "directive",
      type: MatCellDef,
      selector: "[matCellDef]"
    }, {
      kind: "directive",
      type: MatCell,
      selector: "mat-cell, td[mat-cell]"
    }, {
      kind: "directive",
      type: MatSelectionToggle,
      selector: "[matSelectionToggle]",
      inputs: ["matSelectionToggleIndex", "matSelectionToggleValue"],
      exportAs: ["matSelectionToggle"]
    }, {
      kind: "pipe",
      type: AsyncPipe,
      name: "async"
    }],
    changeDetection: i0.ChangeDetectionStrategy.OnPush,
    encapsulation: i0.ViewEncapsulation.None
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.3",
  ngImport: i0,
  type: MatSelectionColumn,
  decorators: [{
    type: Component,
    args: [{
      selector: 'mat-selection-column',
      template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef class="mat-selection-column-header">
        @if (selection && selection.multiple) {
          <mat-checkbox
              matSelectAll
              #allToggler="matSelectAll"
              [indeterminate]="allToggler.indeterminate | async"></mat-checkbox>
        }
      </th>
      <td mat-cell *matCellDef="let row; let i = $index" class="mat-selection-column-cell">
        <mat-checkbox
            matSelectionToggle
            [matSelectionToggleValue]="row"
            [matSelectionToggleIndex]="i"></mat-checkbox>
      </td>
    </ng-container>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCheckbox, MatSelectAll, MatCellDef, MatCell, MatSelectionToggle, AsyncPipe],
      styles: ["th.mat-selection-column-header,td.mat-selection-column-cell{text-align:center;width:48px}\n"]
    }]
  }],
  propDecorators: {
    name: [{
      type: Input
    }],
    _columnDef: [{
      type: ViewChild,
      args: [MatColumnDef, {
        static: true
      }]
    }],
    _cell: [{
      type: ViewChild,
      args: [MatCellDef, {
        static: true
      }]
    }],
    _headerCell: [{
      type: ViewChild,
      args: [MatHeaderCellDef, {
        static: true
      }]
    }]
  }
});

class MatRowSelection extends CdkRowSelection {
  value = undefined;
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatRowSelection,
    deps: null,
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "21.0.3",
    type: MatRowSelection,
    isStandalone: true,
    selector: "[matRowSelection]",
    inputs: {
      index: ["matRowSelectionIndex", "index"],
      value: ["matRowSelectionValue", "value"]
    },
    host: {
      properties: {
        "class.mat-selected": "_selection.isSelected(this.value, this.index)",
        "attr.aria-selected": "_selection.isSelected(this.value, this.index)"
      }
    },
    providers: [{
      provide: CdkRowSelection,
      useExisting: MatRowSelection
    }],
    usesInheritance: true,
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.3",
  ngImport: i0,
  type: MatRowSelection,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[matRowSelection]',
      host: {
        '[class.mat-selected]': '_selection.isSelected(this.value, this.index)',
        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)'
      },
      providers: [{
        provide: CdkRowSelection,
        useExisting: MatRowSelection
      }],
      inputs: [{
        name: 'index',
        alias: 'matRowSelectionIndex'
      }]
    }]
  }],
  propDecorators: {
    value: [{
      type: Input,
      args: ['matRowSelectionValue']
    }]
  }
});

class MatSelectionModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatSelectionModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatSelectionModule,
    imports: [MatTableModule, MatCheckboxModule, MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection],
    exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection]
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "21.0.3",
    ngImport: i0,
    type: MatSelectionModule,
    imports: [MatTableModule, MatCheckboxModule, MatSelectionColumn]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.3",
  ngImport: i0,
  type: MatSelectionModule,
  decorators: [{
    type: NgModule,
    args: [{
      imports: [MatTableModule, MatCheckboxModule, MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection],
      exports: [MatSelectAll, MatSelection, MatSelectionToggle, MatSelectionColumn, MatRowSelection]
    }]
  }]
});

export { MatRowSelection, MatSelectAll, MatSelection, MatSelectionColumn, MatSelectionModule, MatSelectionToggle };
//# sourceMappingURL=selection.mjs.map
