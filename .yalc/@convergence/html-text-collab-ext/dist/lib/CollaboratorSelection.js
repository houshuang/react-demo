"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollaboratorSelection = void 0;

var _SelectionComputer = require("./SelectionComputer");

var _textareaCaret = _interopRequireDefault(require("textarea-caret"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CollaboratorSelection =
/*#__PURE__*/
function () {
  function CollaboratorSelection(textInput, overlayContainer, color, label, options) {
    _classCallCheck(this, CollaboratorSelection);

    _defineProperty(this, "_rows", void 0);

    _defineProperty(this, "_cursorElement", void 0);

    _defineProperty(this, "_tooltipElement", void 0);

    _defineProperty(this, "_textInput", void 0);

    _defineProperty(this, "_container", void 0);

    _defineProperty(this, "_color", void 0);

    _defineProperty(this, "_selection", void 0);

    _defineProperty(this, "_cursor", void 0);

    _defineProperty(this, "_label", void 0);

    _defineProperty(this, "_margin", void 0);

    _defineProperty(this, "_tooltipTimeout", void 0);

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

  _createClass(CollaboratorSelection, [{
    key: "showSelection",
    value: function showSelection() {
      console.log("show selection");
      var cursorCoords = (0, _textareaCaret.default)(this._textInput, this._cursor);
      console.log(cursorCoords.left, this._container.offsetWidth);

      if (cursorCoords.left < this._container.offsetWidth) {
        console.log("yes");

        this._rows.forEach(function (row) {
          row.element.style.visibility = "visible";
        });
      }
    }
  }, {
    key: "hideSelection",
    value: function hideSelection() {
      this._rows.forEach(function (row) {
        row.element.style.visibility = "hidden";
      });
    }
  }, {
    key: "showCursor",
    value: function showCursor() {
      console.log("show cursor");
      var cursorCoords = (0, _textareaCaret.default)(this._textInput, this._cursor);
      console.log(cursorCoords.left, this._container.offsetWidth);

      if (cursorCoords.left < this._container.offsetWidth) {
        console.log("yes");

        this._rows.forEach(function (row) {
          row.element.style.visibility = "visible";
        });
      }

      this._cursorElement.style.visibility = "visible";
    }
  }, {
    key: "hideCursor",
    value: function hideCursor() {
      this._cursorElement.style.visibility = "hidden";
    }
  }, {
    key: "showCursorToolTip",
    value: function showCursorToolTip() {
      this._clearToolTipTimeout();

      this._tooltipElement.style.opacity = "1";
    }
  }, {
    key: "flashCursorToolTip",
    value: function flashCursorToolTip(duration) {
      var _this = this;

      this.showCursorToolTip();

      this._clearToolTipTimeout();

      this._tooltipTimeout = setTimeout(function () {
        return _this.hideCursorTooltip();
      }, duration * 1000);
    }
  }, {
    key: "hideCursorTooltip",
    value: function hideCursorTooltip() {
      this._clearToolTipTimeout();

      this._tooltipElement.style.opacity = "0";
    }
  }, {
    key: "_clearToolTipTimeout",
    value: function _clearToolTipTimeout() {
      if (this._tooltipTimeout !== null) {
        clearTimeout(this._tooltipTimeout);
        this._tooltipTimeout = null;
      }
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      var _this2 = this;

      this._color = color;

      this._rows.forEach(function (row) {
        row.element.style.background = _this2._color;
      });

      this._cursorElement.style.background = this._color;
      this._tooltipElement.style.background = this._color;
    }
  }, {
    key: "setSelection",
    value: function setSelection(selection) {
      if (selection === null) {
        this._cursor = null;
        this._selection = null;
      } else {
        this._cursor = selection.target;
        this._selection = _objectSpread({}, selection);
      }

      this.refresh();
    }
  }, {
    key: "getSelection",
    value: function getSelection() {
      return _objectSpread({}, this._selection);
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.setSelection(null);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this._updateCursor();

      this._updateSelection();
    }
  }, {
    key: "_updateCursor",
    value: function _updateCursor() {
      var cursorCoords = (0, _textareaCaret.default)(this._textInput, this._cursor);
      console.log(cursorCoords.left, this._container.offsetWidth);

      if (cursorCoords.left > this._container.offsetWidth) {
        console.log("hide");
        this.hideCursorTooltip();
        this.hideSelection();
        return;
      }

      if (this._cursor === null && this._container.contains(this._cursorElement)) {
        console.log("remove");

        this._container.removeChild(this._cursorElement);

        this._container.removeChild(this._tooltipElement);
      } else {
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

        if (toolTipLeft + this._tooltipElement.offsetWidth > this._container.offsetWidth - this._margin) {
          toolTipLeft = cursorLeft + this._cursorElement.offsetWidth - this._tooltipElement.offsetWidth;
        }

        this._tooltipElement.style.top = toolTipTop + "px";
        this._tooltipElement.style.left = toolTipLeft + "px";
      }
    }
  }, {
    key: "_updateSelection",
    value: function _updateSelection() {
      var _this3 = this;

      if (this._selection === null) {
        this._rows.forEach(function (row) {
          return row.element.parentElement.removeChild(row.element);
        });

        this._rows.splice(0, this._rows.length);
      } else {
        var start;
        var end;

        if (this._selection.anchor > this._selection.target) {
          start = Number(this._selection.target);
          end = Number(this._selection.anchor);
        } else {
          start = Number(this._selection.anchor);
          end = Number(this._selection.target);
        }

        var newRows = _SelectionComputer.SelectionComputer.calculateSelection(this._textInput, start, end); // Adjust size of rows as needed


        var delta = newRows.length - this._rows.length;

        if (delta > 0) {
          if (this._rows.length === 0 || this._rowsEqual(newRows[0], this._rows[0].rowData)) {
            this._addNewRows(delta, true);
          } else {
            this._addNewRows(delta, false);
          }
        } else if (delta < 0) {
          var removed = null;

          if (this._rowsEqual(newRows[0], this._rows[0].rowData)) {
            // Take from the target.
            removed = this._rows.splice(this._rows.length - 1 + delta, delta * -1);
          } else {
            removed = this._rows.splice(0, delta * -1);
          }

          removed.forEach(function (row) {
            return row.element.parentElement.removeChild(row.element);
          });
        } // Now compare each row and see if we need an update.


        newRows.forEach(function (newRowData, index) {
          var row = _this3._rows[index];

          _this3._updateRow(newRowData, row);
        });
      }
    }
  }, {
    key: "_addNewRows",
    value: function _addNewRows(count, append) {
      for (var i = 0; i < count; i++) {
        var element = this._container.ownerDocument.createElement("div");

        element.style.position = "absolute";
        element.style.backgroundColor = this._color;
        element.style.opacity = "0.25";

        this._container.append(element);

        var rowData = {
          height: 0,
          width: 0,
          top: 0,
          left: 0
        };
        var newRow = {
          element: element,
          rowData: rowData
        };

        if (append) {
          this._rows.push(newRow);
        } else {
          this._rows.unshift(newRow);
        }
      }
    }
  }, {
    key: "_rowsEqual",
    value: function _rowsEqual(a, b) {
      return a.height === b.height && a.width === b.width && a.top === b.top && a.left === b.left;
    }
  }, {
    key: "_updateRow",
    value: function _updateRow(newRowData, row) {
      if (newRowData.height !== row.rowData.height) {
        row.rowData.height = newRowData.height;
        row.element.style.height = "".concat(newRowData.height, "px");
      }

      if (newRowData.width !== row.rowData.width) {
        row.rowData.width = newRowData.width;
        row.element.style.width = "".concat(newRowData.width, "px");
      }

      if (newRowData.top !== row.rowData.top) {
        row.rowData.top = newRowData.top;
        row.element.style.top = "".concat(newRowData.top, "px");
      }

      if (newRowData.left !== row.rowData.left) {
        row.rowData.left = newRowData.left;
        row.element.style.left = "".concat(newRowData.left, "px");
      }
    }
  }]);

  return CollaboratorSelection;
}();

exports.CollaboratorSelection = CollaboratorSelection;