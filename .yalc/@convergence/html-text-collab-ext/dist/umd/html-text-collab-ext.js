/**!
© 2018 Convergence Labs, Inc.
@version 0.1.1
@license MIT
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.HtmlTextCollabExt = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var textareaCaret = createCommonjsModule(function (module) {
    /* jshint browser: true */

    (function () {

    // We'll copy the properties below into the mirror div.
    // Note that some browsers, such as Firefox, do not concatenate properties
    // into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
    // so we have to list every single property explicitly.
    var properties = [
      'direction',  // RTL support
      'boxSizing',
      'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
      'height',
      'overflowX',
      'overflowY',  // copy the scrollbar for IE

      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'borderStyle',

      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',

      // https://developer.mozilla.org/en-US/docs/Web/CSS/font
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'fontSize',
      'fontSizeAdjust',
      'lineHeight',
      'fontFamily',

      'textAlign',
      'textTransform',
      'textIndent',
      'textDecoration',  // might not make a difference, but better be safe

      'letterSpacing',
      'wordSpacing',

      'tabSize',
      'MozTabSize'

    ];

    var isBrowser = (typeof window !== 'undefined');
    var isFirefox = (isBrowser && window.mozInnerScreenX != null);

    function getCaretCoordinates(element, position, options) {
      if (!isBrowser) {
        throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
      }

      var debug = options && options.debug || false;
      if (debug) {
        var el = document.querySelector('#input-textarea-caret-position-mirror-div');
        if (el) el.parentNode.removeChild(el);
      }

      // The mirror div will replicate the textarea's style
      var div = document.createElement('div');
      div.id = 'input-textarea-caret-position-mirror-div';
      document.body.appendChild(div);

      var style = div.style;
      var computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9
      var isInput = element.nodeName === 'INPUT';

      // Default textarea styles
      style.whiteSpace = 'pre-wrap';
      if (!isInput)
        style.wordWrap = 'break-word';  // only for textarea-s

      // Position off-screen
      style.position = 'absolute';  // required to return coordinates properly
      if (!debug)
        style.visibility = 'hidden';  // not 'display: none' because we want rendering

      // Transfer the element's properties to the div
      properties.forEach(function (prop) {
        if (isInput && prop === 'lineHeight') {
          // Special case for <input>s because text is rendered centered and line height may be != height
          style.lineHeight = computed.height;
        } else {
          style[prop] = computed[prop];
        }
      });

      if (isFirefox) {
        // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
        if (element.scrollHeight > parseInt(computed.height))
          style.overflowY = 'scroll';
      } else {
        style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
      }

      div.textContent = element.value.substring(0, position);
      // The second special handling for input type="text" vs textarea:
      // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
      if (isInput)
        div.textContent = div.textContent.replace(/\s/g, '\u00a0');

      var span = document.createElement('span');
      // Wrapping must be replicated *exactly*, including when a long word gets
      // onto the next line, with whitespace at the end of the line before (#7).
      // The  *only* reliable way to do that is to copy the *entire* rest of the
      // textarea's content into the <span> created at the caret position.
      // For inputs, just '.' would be enough, but no need to bother.
      span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
      div.appendChild(span);

      var coordinates = {
        top: span.offsetTop + parseInt(computed['borderTopWidth']),
        left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
        height: parseInt(computed['lineHeight'])
      };

      if (debug) {
        span.style.backgroundColor = '#aaa';
      } else {
        document.body.removeChild(div);
      }

      return coordinates;
    }

    {
      module.exports = getCaretCoordinates;
    }

    }());
    });

    // @ts-ignore
    /*
     * Computes the dimensions of the text selection.  Each line in the textarea has its own
     * selection dimensions, which are intended to be used to render a div with the specified
     * position, dimensions and background color.
     *
     * This has only been tested on a textarea, but should be able to be adapted to be used
     * in other HTML form elements.
     *
     * TODO unit test, this is pretty brittle
     */
    var SelectionComputer = /** @class */ (function () {
        function SelectionComputer(element, start, end) {
            this.element = element;
            this.start = start;
            this.end = end;
            this.startCoordinates = textareaCaret(element, start);
            this.endCoordinates = textareaCaret(element, end);
            this.lineHeight = this.startCoordinates.height;
            this.elementPaddingLeft = parseFloat(element.style.paddingLeft) || 0;
            this.elementPaddingRight = parseFloat(element.style.paddingRight) || 0;
            this.elementPaddingX = this.elementPaddingLeft + this.elementPaddingRight;
            this.selectionRows = [];
            // Figure out whether this selection spans more than one "row", as determined by
            // the presence of a newline character. The computation of single line selections
            // is slightly different than for multiple line selections.
            var selectedText = element.value.substr(start, end - start);
            if (selectedText.indexOf('\n') < 0) {
                this.appendSingleLineSelection(this.startCoordinates, this.endCoordinates);
            }
            else {
                this.buildMultiRowSelection();
            }
        }
        SelectionComputer.calculateSelection = function (element, start, end) {
            var computer = new SelectionComputer(element, start, end);
            return computer.selectionRows;
        };
        SelectionComputer.prototype.appendSingleLineSelection = function (startCoordinates, endCoordinates) {
            var _a;
            (_a = this.selectionRows).push.apply(_a, this.buildSingleLineSelection(startCoordinates, endCoordinates));
        };
        SelectionComputer.prototype.buildSingleLineSelection = function (startCoordinates, endCoordinates) {
            // does this line wrap? If not, we can just calculate the row selection based on
            // the provided coordinates.
            if (startCoordinates.top === endCoordinates.top) {
                return [{
                        width: endCoordinates.left - startCoordinates.left,
                        top: startCoordinates.top,
                        left: startCoordinates.left,
                        height: this.lineHeight
                    }];
            }
            else {
                return this.buildWrappedLineSelections(startCoordinates, endCoordinates);
            }
        };
        /**
         * Wrapped lines have a more complex computation since we have to create multiple
         * rows.
         *
         * @param startCoordinates
         * @param endCoordinates
         */
        SelectionComputer.prototype.buildWrappedLineSelections = function (startCoordinates, endCoordinates) {
            var rows = [];
            // the first line just goes the full width of the textarea
            rows.push({
                width: this.element.scrollWidth - this.elementPaddingRight - startCoordinates.left,
                top: startCoordinates.top,
                left: startCoordinates.left,
                height: this.lineHeight
            });
            // If the selection contains one or more rows that span the entire textarea,
            // calculate a single selection element, which may actually span multiple rows,
            // but fills the width of the textarea.
            if (endCoordinates.top > startCoordinates.top + this.lineHeight) {
                rows.push({
                    width: this.element.scrollWidth - this.elementPaddingX,
                    left: this.elementPaddingLeft,
                    top: startCoordinates.top + this.lineHeight,
                    height: endCoordinates.top - startCoordinates.top - this.lineHeight
                });
            }
            // The last line starts at the left edge of the textarea and doesn't span the
            // entire width of the textarea
            rows.push({
                width: endCoordinates.left - this.elementPaddingLeft,
                top: endCoordinates.top,
                left: this.elementPaddingLeft,
                height: this.lineHeight
            });
            return rows;
        };
        SelectionComputer.prototype.buildMultiRowSelection = function () {
            var currentCoordinates = this.startCoordinates;
            var currentIndex = +this.start;
            // build one or more selection elements for each row (as determined by newline
            // characters)
            while (currentCoordinates.top < this.endCoordinates.top) {
                var nextLineBreakPosition = this.element.value.indexOf('\n', currentIndex);
                var endOfLinePosition = this.element.value.length;
                if (nextLineBreakPosition >= 0) {
                    endOfLinePosition = nextLineBreakPosition;
                }
                if (endOfLinePosition > this.end) {
                    endOfLinePosition = this.end;
                }
                var endOfLineCoordinates = textareaCaret(this.element, endOfLinePosition);
                // console.log('target of line position', endOfLinePosition, 'coords', endOfLineCoordinates);
                // This "single line" may actually wrap multiple lines of the textarea
                this.appendSingleLineSelection(currentCoordinates, endOfLineCoordinates);
                currentIndex = endOfLinePosition + 1;
                currentCoordinates = textareaCaret(this.element, currentIndex);
            }
            if (currentIndex < this.end) {
                var lastLine = {
                    width: this.endCoordinates.left - currentCoordinates.left,
                    top: currentCoordinates.top,
                    left: currentCoordinates.left,
                    height: this.lineHeight
                };
                this.selectionRows.push(lastLine);
            }
        };
        return SelectionComputer;
    }());

    var CollaboratorSelection = /** @class */ (function () {
        function CollaboratorSelection(textInput, overlayContainer, color, label, options) {
            this._label = label;
            this._textInput = textInput;
            this._color = color;
            this._cursor = null;
            this._selection = null;
            this._rows = [];
            this._container = overlayContainer;
            options = options || {};
            this._margin = options.margin || 5;
            this._tooltipTimeout = null;
            this._cursorElement = this._container.ownerDocument.createElement("div");
            this._cursorElement.className = "collaborator-cursor";
            this._cursorElement.style.backgroundColor = this._color;
            this._tooltipElement = this._container.ownerDocument.createElement("div");
            this._tooltipElement.innerHTML = label;
            this._tooltipElement.className = "collaborator-cursor-tooltip";
            this._tooltipElement.style.backgroundColor = this._color;
            this.hideCursorTooltip();
            this.refresh();
        }
        CollaboratorSelection.prototype.showSelection = function () {
            console.log("show selection");
            var cursorCoords = textareaCaret(this._textInput, this._cursor);
            console.log(cursorCoords.left, this._container.offsetWidth);
            if (cursorCoords.left < this._container.offsetWidth) {
                console.log("yes");
                this._rows.forEach(function (row) {
                    row.element.style.visibility = "visible";
                });
            }
        };
        CollaboratorSelection.prototype.hideSelection = function () {
            this._rows.forEach(function (row) {
                row.element.style.visibility = "hidden";
            });
        };
        CollaboratorSelection.prototype.showCursor = function () {
            console.log("show cursor");
            var cursorCoords = textareaCaret(this._textInput, this._cursor);
            console.log(cursorCoords.left, this._container.offsetWidth);
            if (cursorCoords.left < this._container.offsetWidth) {
                console.log("yes");
                this._rows.forEach(function (row) {
                    row.element.style.visibility = "visible";
                });
            }
            this._cursorElement.style.visibility = "visible";
        };
        CollaboratorSelection.prototype.hideCursor = function () {
            this._cursorElement.style.visibility = "hidden";
        };
        CollaboratorSelection.prototype.showCursorToolTip = function () {
            this._clearToolTipTimeout();
            this._tooltipElement.style.opacity = "1";
        };
        CollaboratorSelection.prototype.flashCursorToolTip = function (duration) {
            var _this = this;
            this.showCursorToolTip();
            this._clearToolTipTimeout();
            this._tooltipTimeout = setTimeout(function () { return _this.hideCursorTooltip(); }, duration * 1000);
        };
        CollaboratorSelection.prototype.hideCursorTooltip = function () {
            this._clearToolTipTimeout();
            this._tooltipElement.style.opacity = "0";
        };
        CollaboratorSelection.prototype._clearToolTipTimeout = function () {
            if (this._tooltipTimeout !== null) {
                clearTimeout(this._tooltipTimeout);
                this._tooltipTimeout = null;
            }
        };
        CollaboratorSelection.prototype.setColor = function (color) {
            var _this = this;
            this._color = color;
            this._rows.forEach(function (row) {
                row.element.style.background = _this._color;
            });
            this._cursorElement.style.background = this._color;
            this._tooltipElement.style.background = this._color;
        };
        CollaboratorSelection.prototype.setSelection = function (selection) {
            if (selection === null) {
                this._cursor = null;
                this._selection = null;
            }
            else {
                this._cursor = selection.target;
                this._selection = __assign({}, selection);
            }
            this.refresh();
        };
        CollaboratorSelection.prototype.getSelection = function () {
            return __assign({}, this._selection);
        };
        CollaboratorSelection.prototype.clearSelection = function () {
            this.setSelection(null);
        };
        CollaboratorSelection.prototype.refresh = function () {
            this._updateCursor();
            this._updateSelection();
        };
        CollaboratorSelection.prototype._updateCursor = function () {
            var cursorCoords = textareaCaret(this._textInput, this._cursor);
            console.log(cursorCoords.left, this._container.offsetWidth);
            if (cursorCoords.left > this._container.offsetWidth) {
                console.log("hide");
                this.hideCursorTooltip();
                this.hideSelection();
                return;
            }
            if (this._cursor === null &&
                this._container.contains(this._cursorElement)) {
                console.log("remove");
                this._container.removeChild(this._cursorElement);
                this._container.removeChild(this._tooltipElement);
            }
            else {
                if (!this._cursorElement.parentElement) {
                    console.log("add");
                    this._container.append(this._cursorElement);
                    this._container.append(this._tooltipElement);
                }
                this._cursorElement.style.height = cursorCoords.height + "px";
                this._cursorElement.style.top = cursorCoords.top + "px";
                var cursorLeft = cursorCoords.left - this._cursorElement.offsetWidth / 2;
                this._cursorElement.style.left = cursorLeft + "px";
                var toolTipTop = cursorCoords.top - this._tooltipElement.offsetHeight;
                if (toolTipTop + this._container.offsetTop < this._margin) {
                    toolTipTop = cursorCoords.top + cursorCoords.height;
                }
                var toolTipLeft = cursorLeft;
                if (toolTipLeft + this._tooltipElement.offsetWidth >
                    this._container.offsetWidth - this._margin) {
                    toolTipLeft =
                        cursorLeft +
                            this._cursorElement.offsetWidth -
                            this._tooltipElement.offsetWidth;
                }
                this._tooltipElement.style.top = toolTipTop + "px";
                this._tooltipElement.style.left = toolTipLeft + "px";
            }
        };
        CollaboratorSelection.prototype._updateSelection = function () {
            var _this = this;
            if (this._selection === null) {
                this._rows.forEach(function (row) {
                    return row.element.parentElement.removeChild(row.element);
                });
                this._rows.splice(0, this._rows.length);
            }
            else {
                var start = void 0;
                var end = void 0;
                if (this._selection.anchor > this._selection.target) {
                    start = Number(this._selection.target);
                    end = Number(this._selection.anchor);
                }
                else {
                    start = Number(this._selection.anchor);
                    end = Number(this._selection.target);
                }
                var newRows = SelectionComputer.calculateSelection(this._textInput, start, end);
                // Adjust size of rows as needed
                var delta = newRows.length - this._rows.length;
                if (delta > 0) {
                    if (this._rows.length === 0 ||
                        this._rowsEqual(newRows[0], this._rows[0].rowData)) {
                        this._addNewRows(delta, true);
                    }
                    else {
                        this._addNewRows(delta, false);
                    }
                }
                else if (delta < 0) {
                    var removed = null;
                    if (this._rowsEqual(newRows[0], this._rows[0].rowData)) {
                        // Take from the target.
                        removed = this._rows.splice(this._rows.length - 1 + delta, delta * -1);
                    }
                    else {
                        removed = this._rows.splice(0, delta * -1);
                    }
                    removed.forEach(function (row) {
                        return row.element.parentElement.removeChild(row.element);
                    });
                }
                // Now compare each row and see if we need an update.
                newRows.forEach(function (newRowData, index) {
                    var row = _this._rows[index];
                    _this._updateRow(newRowData, row);
                });
            }
        };
        CollaboratorSelection.prototype._addNewRows = function (count, append) {
            for (var i = 0; i < count; i++) {
                var element = this._container.ownerDocument.createElement("div");
                element.style.position = "absolute";
                element.style.backgroundColor = this._color;
                element.style.opacity = "0.25";
                this._container.append(element);
                var rowData = { height: 0, width: 0, top: 0, left: 0 };
                var newRow = {
                    element: element,
                    rowData: rowData
                };
                if (append) {
                    this._rows.push(newRow);
                }
                else {
                    this._rows.unshift(newRow);
                }
            }
        };
        CollaboratorSelection.prototype._rowsEqual = function (a, b) {
            return (a.height === b.height &&
                a.width === b.width &&
                a.top === b.top &&
                a.left === b.left);
        };
        CollaboratorSelection.prototype._updateRow = function (newRowData, row) {
            if (newRowData.height !== row.rowData.height) {
                row.rowData.height = newRowData.height;
                row.element.style.height = newRowData.height + "px";
            }
            if (newRowData.width !== row.rowData.width) {
                row.rowData.width = newRowData.width;
                row.element.style.width = newRowData.width + "px";
            }
            if (newRowData.top !== row.rowData.top) {
                row.rowData.top = newRowData.top;
                row.element.style.top = newRowData.top + "px";
            }
            if (newRowData.left !== row.rowData.left) {
                row.rowData.left = newRowData.left;
                row.element.style.left = newRowData.left + "px";
            }
        };
        return CollaboratorSelection;
    }());

    var IndexUtils = /** @class */ (function () {
        function IndexUtils() {
        }
        IndexUtils.transformIndexOnInsert = function (index, insertIndex, value) {
            if (insertIndex <= index) {
                return index + value.length;
            }
            return index;
        };
        IndexUtils.transformIndexOnDelete = function (index, deleteIndex, length) {
            if (index > deleteIndex) {
                return index - Math.min(index - deleteIndex, length);
            }
            return index;
        };
        return IndexUtils;
    }());

    var CollaborativeSelectionManager = /** @class */ (function () {
        function CollaborativeSelectionManager(options) {
            var _this = this;
            this._checkSelection = function () {
                setTimeout(function () {
                    var changed = _this._textElement.selectionStart !== _this._selectionAnchor ||
                        _this._textElement.selectionEnd !== _this._selectionTarget;
                    if (changed) {
                        if (_this._selectionAnchor === _this._textElement.selectionStart) {
                            _this._selectionAnchor = _this._textElement.selectionStart;
                            _this._selectionTarget = _this._textElement.selectionEnd;
                        }
                        else {
                            _this._selectionAnchor = _this._textElement.selectionEnd;
                            _this._selectionTarget = _this._textElement.selectionStart;
                        }
                        _this._onSelection({
                            anchor: _this._selectionAnchor,
                            target: _this._selectionTarget
                        });
                    }
                }, 0);
            };
            this._onMouseMove = function () {
                _this._checkResize();
                _this._checkSelection();
            };
            this._checkResize = function () {
                if (_this._textElement.offsetWidth !== _this._overlayContainer.offsetWidth ||
                    _this._textElement.offsetHeight !== _this._overlayContainer.offsetHeight) {
                    _this._updateOverlay();
                    _this._collaborators.forEach(function (renderer) { return renderer.refresh(); });
                }
            };
            this._collaborators = new Map();
            this._textElement = options.control;
            // TODO handle the line height better. The issue here
            // is that the textarea-caret library can't handle
            // a non-number.
            var computed = window.getComputedStyle(this._textElement);
            if (computed.lineHeight === "normal") {
                throw new Error("Text areas must have a numeric line-height.");
            }
            this._onSelection = options.onSelectionChanged;
            this._selectionAnchor = this._textElement.selectionStart;
            this._selectionTarget = this._textElement.selectionEnd;
            this._overlayContainer = this._textElement.ownerDocument.createElement("div");
            this._overlayContainer.className = "text-collab-ext";
            this._textElement.parentElement.append(this._overlayContainer);
            this._scroller = this._textElement.ownerDocument.createElement("div");
            this._scroller.className = "text-collab-ext-scroller";
            this._overlayContainer.append(this._scroller);
            // Provide resize handling. After the mose down, we register for mouse
            // movement and check if we have resized. We then listen for a mouse up
            // to unregister.
            this._textElement.addEventListener("mousedown", function () {
                window.addEventListener("mousemove", _this._onMouseMove);
            });
            window.addEventListener("mouseup", function () {
                window.removeEventListener("mousemove", _this._onMouseMove);
                _this._checkResize();
            });
            this._textElement.addEventListener("scroll", function () { return _this._updateScroller(); });
            this._textElement.addEventListener("keydown", this._checkSelection);
            this._textElement.addEventListener("click", this._checkSelection);
            this._textElement.addEventListener("focus", this._checkSelection);
            this._textElement.addEventListener("blur", this._checkSelection);
            this._updateOverlay();
        }
        CollaborativeSelectionManager.prototype.addCollaborator = function (id, label, color, selection) {
            if (this._collaborators.has(id)) {
                throw new Error("A collaborator with the specified id already exists: " + id);
            }
            var collaborator = new CollaboratorSelection(this._textElement, this._scroller, color, label, { margin: 5 });
            this._collaborators.set(id, collaborator);
            if (selection !== undefined && selection !== null) {
                collaborator.setSelection(selection);
            }
            return collaborator;
        };
        CollaborativeSelectionManager.prototype.getCollaborator = function (id) {
            return this._collaborators.get(id);
        };
        CollaborativeSelectionManager.prototype.removeCollaborator = function (id) {
            var renderer = this._collaborators.get(id);
            if (renderer !== undefined) {
                renderer.clearSelection();
                this._collaborators.delete(id);
            }
            else {
                throw new Error("Unknown collaborator: " + id);
            }
        };
        CollaborativeSelectionManager.prototype.getSelection = function () {
            return {
                anchor: this._selectionAnchor,
                target: this._selectionTarget
            };
        };
        CollaborativeSelectionManager.prototype.show = function () {
            this._overlayContainer.style.visibility = "visible";
        };
        CollaborativeSelectionManager.prototype.hide = function () {
            this._overlayContainer.style.visibility = "hidden";
        };
        CollaborativeSelectionManager.prototype.dispose = function () {
            this._overlayContainer.parentElement.removeChild(this._overlayContainer);
        };
        CollaborativeSelectionManager.prototype.updateSelectionsOnInsert = function (index, value) {
            this._collaborators.forEach(function (collaborator) {
                var selection = collaborator.getSelection();
                var anchor = IndexUtils.transformIndexOnInsert(selection.anchor, index, value);
                var target = IndexUtils.transformIndexOnInsert(selection.target, index, value);
                collaborator.setSelection({ anchor: anchor, target: target });
            });
        };
        CollaborativeSelectionManager.prototype.updateSelectionsOnDelete = function (index, length) {
            this._collaborators.forEach(function (collaborator) {
                var selection = collaborator.getSelection();
                var anchor = IndexUtils.transformIndexOnDelete(selection.anchor, index, length);
                var target = IndexUtils.transformIndexOnDelete(selection.target, index, length);
                collaborator.setSelection({ anchor: anchor, target: target });
            });
        };
        CollaborativeSelectionManager.prototype._updateOverlay = function () {
            var top = this._textElement.offsetTop;
            var left = this._textElement.offsetLeft;
            var height = this._textElement.offsetHeight;
            var width = this._textElement.offsetWidth;
            this._overlayContainer.style.top = top + "px";
            this._overlayContainer.style.left = left + "px";
            this._overlayContainer.style.height = height + "px";
            this._overlayContainer.style.width = width + "px";
        };
        CollaborativeSelectionManager.prototype._updateScroller = function () {
            this._scroller.style.top = (this._textElement.scrollTop * -1) + "px";
            this._scroller.style.left = (this._textElement.scrollLeft * -1) + "px";
        };
        return CollaborativeSelectionManager;
    }());

    var StringChangeDetector_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var StringChangeDetector = exports.StringChangeDetector = function () {
      function StringChangeDetector(options) {
        _classCallCheck(this, StringChangeDetector);

        if (!options) {
          throw new Error("options must be defined");
        }

        if (typeof options.onInsert !== "function") {
          throw new Error("options.onInsert must be a function");
        }

        if (typeof options.onRemove !== "function") {
          throw new Error("options.onRemove must be a function");
        }

        if (typeof options.value !== "string") {
          throw new Error("options.value must be a string");
        }

        this._onInsert = options.onInsert;
        this._onRemove = options.onRemove;
        this._value = options.value;
      }

      /**
       * Inserts a string into the current value at the specified index.
       *
       * @param index {number}
       *    The index in the string to insert into.
       * @param value {string}
       *   The value to insert into the string.
       */


      _createClass(StringChangeDetector, [{
        key: "insertText",
        value: function insertText(index, value) {
          var oldVal = this._value;
          var newVal = oldVal.substring(0, index) + value + oldVal.substring(index, oldVal.length);
          this.setValue(newVal);
        }

        /**
         * Removes a specified number of characters from the current string at
         * a specific location.
         *
         * @param index {number}
         *    The index in the string to remove characters.
         * @param length {number}
         *   The number of characters to remove.
         */

      }, {
        key: "removeText",
        value: function removeText(index, length) {
          var oldVal = this._value;
          var newVal = oldVal.substring(0, index) + oldVal.substring(index + length, oldVal.length);
          this.setValue(newVal);
        }

        /**
         * Sets the current value of the string.
         *
         * @param value {string}
         *   The new value of the string.
         */

      }, {
        key: "setValue",
        value: function setValue(value) {
          this._value = value;
        }

        /**
         * Gets the current value of the string.
         *
         * @returns {string}
         */

      }, {
        key: "getValue",
        value: function getValue() {
          return this._value;
        }

        /**
         * Process the new value of the string after a single edit.
         *
         * @param newValue {string}
         *   The new value to process.
         */

      }, {
        key: "processNewValue",
        value: function processNewValue(newValue) {
          var commonEnd = 0;
          var commonStart = 0;

          if (this._value === newValue) {
            return;
          }

          while (this._value.charAt(commonStart) === newValue.charAt(commonStart)) {
            commonStart++;
          }

          while (this._value.charAt(this._value.length - 1 - commonEnd) === newValue.charAt(newValue.length - 1 - commonEnd) && commonEnd + commonStart < this._value.length && commonEnd + commonStart < newValue.length) {
            commonEnd++;
          }

          // Characters were removed.
          if (this._value.length !== commonStart + commonEnd) {
            if (this._onRemove) {
              this._onRemove(commonStart, this._value.length - commonStart - commonEnd);
            }
          }

          // Characters were added
          if (newValue.length !== commonStart + commonEnd) {
            if (this._onInsert) {
              this._onInsert(commonStart, newValue.slice(commonStart, newValue.length - commonEnd));
            }
          }

          this._value = newValue;
        }
      }]);

      return StringChangeDetector;
    }();

    });

    unwrapExports(StringChangeDetector_1);
    var StringChangeDetector_2 = StringChangeDetector_1.StringChangeDetector;

    var lib = StringChangeDetector_1.StringChangeDetector;

    // @ts-ignore
    var TextInputManager = /** @class */ (function () {
        /**
         *
         * @param options
         */
        function TextInputManager(options) {
            var _this = this;
            this._onLocalInput = function () {
                _this._changeDetector.processNewValue(_this._control.value);
            };
            this._control = options.control;
            this._onLocalInsert = options.onInsert;
            this._onLocalDelete = options.onDelete;
            this._changeDetector = null;
            this.bind();
        }
        TextInputManager.prototype.bind = function () {
            this._changeDetector = new lib({
                value: this._control.value,
                onInsert: this._onLocalInsert,
                onRemove: this._onLocalDelete
            });
            this._control.addEventListener("input", this._onLocalInput);
        };
        TextInputManager.prototype.unbind = function () {
            this._control.removeEventListener("input", this._onLocalInput);
            this._changeDetector = null;
        };
        TextInputManager.prototype.insertText = function (index, value) {
            this._assertBound();
            var _a = this._getSelection(), start = _a.start, end = _a.end;
            var xStart = IndexUtils.transformIndexOnInsert(start, index, value);
            var xEnd = IndexUtils.transformIndexOnInsert(end, index, value);
            this._changeDetector.insertText(index, value);
            this._updateControl();
            this._setTextSelection(xStart, xEnd);
        };
        TextInputManager.prototype.deleteText = function (index, length) {
            this._assertBound();
            var _a = this._getSelection(), start = _a.start, end = _a.end;
            var xStart = IndexUtils.transformIndexOnDelete(start, index, length);
            var xEnd = IndexUtils.transformIndexOnDelete(end, index, length);
            this._changeDetector.removeText(index, length);
            this._updateControl();
            this._setTextSelection(xStart, xEnd);
        };
        TextInputManager.prototype.setText = function (value) {
            this._assertBound();
            this._changeDetector.setValue(value);
            this._updateControl();
            this._setTextSelection(0, 0);
        };
        TextInputManager.prototype.getText = function () {
            return this._control.value;
        };
        TextInputManager.prototype._updateControl = function () {
            this._control.value = this._changeDetector.getValue();
        };
        TextInputManager.prototype._assertBound = function () {
            if (this._changeDetector === null) {
                throw new Error("The TextInputManager is not bound.");
            }
        };
        TextInputManager.prototype._getSelection = function () {
            return { 'start': this._control.selectionStart, 'end': this._control.selectionEnd };
        };
        TextInputManager.prototype._setTextSelection = function (start, end) {
            // this._control.focus();
            this._control.setSelectionRange(start, end);
        };
        return TextInputManager;
    }());

    var CollaborativeTextEditor = /** @class */ (function () {
        function CollaborativeTextEditor(options) {
            var _this = this;
            if (!options) {
                throw new Error("options must be defined.");
            }
            if (!options.control) {
                throw new Error("options.control must be defined.");
            }
            var control = options.control;
            var insertCallback = options.onInsert;
            var deleteCallback = options.onDelete;
            var onInsert = function (index, value) {
                _this._selectionManager.updateSelectionsOnInsert(index, value);
                if (insertCallback) {
                    insertCallback(index, value);
                }
            };
            var onDelete = function (index, length) {
                _this._selectionManager.updateSelectionsOnDelete(index, length);
                if (deleteCallback) {
                    deleteCallback(index, length);
                }
            };
            var onSelectionChanged = options.onSelectionChanged !== undefined ?
                options.onSelectionChanged : function (selection) {
            };
            this._inputManager = new TextInputManager({ control: control, onInsert: onInsert, onDelete: onDelete });
            this._selectionManager = new CollaborativeSelectionManager({ control: control, onSelectionChanged: onSelectionChanged });
        }
        CollaborativeTextEditor.prototype.insertText = function (index, value) {
            this._inputManager.insertText(index, value);
            this._selectionManager.updateSelectionsOnInsert(index, value);
        };
        CollaborativeTextEditor.prototype.deleteText = function (index, length) {
            this._inputManager.deleteText(index, length);
            this._selectionManager.updateSelectionsOnDelete(index, length);
        };
        CollaborativeTextEditor.prototype.setText = function (value) {
            this._inputManager.setText(value);
        };
        CollaborativeTextEditor.prototype.getText = function () {
            return this._inputManager.getText();
        };
        CollaborativeTextEditor.prototype.selectionManager = function () {
            return this._selectionManager;
        };
        return CollaborativeTextEditor;
    }());

    exports.CollaborativeSelectionManager = CollaborativeSelectionManager;
    exports.CollaboratorSelection = CollaboratorSelection;
    exports.TextInputManager = TextInputManager;
    exports.CollaborativeTextEditor = CollaborativeTextEditor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

//# sourceMappingURL=html-text-collab-ext.js.map
