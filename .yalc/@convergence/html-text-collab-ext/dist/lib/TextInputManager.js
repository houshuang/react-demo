"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInputManager = void 0;

var _stringChangeDetector = _interopRequireDefault(require("@convergence/string-change-detector"));

var _IndexUtils = require("./IndexUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TextInputManager =
/*#__PURE__*/
function () {
  /**
   *
   * @param options
   */
  function TextInputManager(options) {
    var _this = this;

    _classCallCheck(this, TextInputManager);

    _defineProperty(this, "_control", void 0);

    _defineProperty(this, "_onLocalInsert", void 0);

    _defineProperty(this, "_onLocalDelete", void 0);

    _defineProperty(this, "_changeDetector", void 0);

    _defineProperty(this, "_onLocalInput", function () {
      _this._changeDetector.processNewValue(_this._control.value);
    });

    this._control = options.control;
    this._onLocalInsert = options.onInsert;
    this._onLocalDelete = options.onDelete;
    this._changeDetector = null;
    this.bind();
  }

  _createClass(TextInputManager, [{
    key: "bind",
    value: function bind() {
      this._changeDetector = new _stringChangeDetector.default({
        value: this._control.value,
        onInsert: this._onLocalInsert,
        onRemove: this._onLocalDelete
      });

      this._control.addEventListener("input", this._onLocalInput);
    }
  }, {
    key: "unbind",
    value: function unbind() {
      this._control.removeEventListener("input", this._onLocalInput);

      this._changeDetector = null;
    }
  }, {
    key: "insertText",
    value: function insertText(index, value) {
      this._assertBound();

      var _this$_getSelection = this._getSelection(),
          start = _this$_getSelection.start,
          end = _this$_getSelection.end;

      var xStart = _IndexUtils.IndexUtils.transformIndexOnInsert(start, index, value);

      var xEnd = _IndexUtils.IndexUtils.transformIndexOnInsert(end, index, value);

      this._changeDetector.insertText(index, value);

      this._updateControl();

      this._setTextSelection(xStart, xEnd);
    }
  }, {
    key: "deleteText",
    value: function deleteText(index, length) {
      this._assertBound();

      var _this$_getSelection2 = this._getSelection(),
          start = _this$_getSelection2.start,
          end = _this$_getSelection2.end;

      var xStart = _IndexUtils.IndexUtils.transformIndexOnDelete(start, index, length);

      var xEnd = _IndexUtils.IndexUtils.transformIndexOnDelete(end, index, length);

      this._changeDetector.removeText(index, length);

      this._updateControl();

      this._setTextSelection(xStart, xEnd);
    }
  }, {
    key: "setText",
    value: function setText(value) {
      this._assertBound();

      this._changeDetector.setValue(value);

      this._updateControl();

      this._setTextSelection(0, 0);
    }
  }, {
    key: "getText",
    value: function getText() {
      return this._control.value;
    }
  }, {
    key: "_updateControl",
    value: function _updateControl() {
      this._control.value = this._changeDetector.getValue();
    }
  }, {
    key: "_assertBound",
    value: function _assertBound() {
      if (this._changeDetector === null) {
        throw new Error("The TextInputManager is not bound.");
      }
    }
  }, {
    key: "_getSelection",
    value: function _getSelection() {
      return {
        'start': this._control.selectionStart,
        'end': this._control.selectionEnd
      };
    }
  }, {
    key: "_setTextSelection",
    value: function _setTextSelection(start, end) {
      // this._control.focus();
      this._control.setSelectionRange(start, end);
    }
  }]);

  return TextInputManager;
}();

exports.TextInputManager = TextInputManager;