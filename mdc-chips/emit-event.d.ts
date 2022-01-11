/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Emits a custom event from an element.
 * @param element Element from which to emit the event.
 * @param _document Document that the element is placed in.
 * @param eventName Name of the event.
 * @param data Data attached to the event.
 * @param shouldBubble Whether the event should bubble.
 */
export declare function emitCustomEvent<T>(element: HTMLElement, _document: Document, eventName: string, data: T, shouldBubble: boolean): void;
