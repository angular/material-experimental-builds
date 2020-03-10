(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/material/input/testing')) :
	typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-input/testing', ['exports', '@angular/material/input/testing'], factory) :
	(global = global || self, factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcInput = global.ng.materialExperimental.mdcInput || {}, global.ng.materialExperimental.mdcInput.testing = {}), global.ng.material.input.testing));
}(this, (function (exports, testing) { 'use strict';

	/**
	 * @license
	 * Copyright Google LLC All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */

	/**
	 * @license
	 * Copyright Google LLC All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */

	Object.defineProperty(exports, 'MatInputHarness', {
		enumerable: true,
		get: function () {
			return testing.MatInputHarness;
		}
	});

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-input-testing.umd.js.map
