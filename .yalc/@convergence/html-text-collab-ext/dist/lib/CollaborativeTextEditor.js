"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollaborativeTextEditor = void 0;

var _CollaborativeSelectionManager = require("./CollaborativeSelectionManager");

var _TextInputManager = require("./TextInputManager");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CollaborativeTextEditor =
/*#__PURE__*/
function () {
  function CollaborativeTextEditor(options) {
    var _this = this;

    _classCallCheck(this, CollaborativeTextEditor);

    _defineProperty(this, "_selectionManager", void 0);

    _defineProperty(this, "_inputManager", void 0);

    _defineProperty(this, "_onInsert", void 0);

    _defineProperty(this, "_onDelete", void 0);

    if (!options) {
      throw new Error("options must be defined.");
    }

    if (!options.control) {
      throw new Error("options.control must be defined.");
    }

    var control = options.control;
    var insertCallback = options.onInsert;
    var deleteCallback = options.onDelete;

    var onInsert = function onInsert(index, value) {
      _this._selectionManager.updateSelectionsOnInsert(index, value);

      if (insertCallback) {
        insertCallback(index, value);
      }
    };

    var onDelete = function onDelete(index, length) {
      _this._selectionManager.updateSelectionsOnDelete(index, length);

      if (deleteCallback) {
        deleteCallback(index, length);
      }
    };

    var onSelectionChanged = options.onSelectionChanged !== undefined ? options.onSelectionChanged : function (selection) {};
    this._inputManager = new _TextInputManager.TextInputManager({
      control: control,
      onInsert: onInsert,
      onDelete: onDelete
    });
    this._selectionManager = new _CollaborativeSelectionManager.CollaborativeSelectionManager({
      control: control,
      onSelectionChanged: onSelectionChanged
    });
  }

  _createClass(CollaborativeTextEditor, [{
    key: "insertText",
    value: function insertText(index, value) {
      this._inputManager.insertText(index, value);

      this._selectionManager.updateSelectionsOnInsert(index, value);
    }
  }, {
    key: "deleteText",
    value: function deleteText(index, length) {
      this._inputManager.deleteText(index, length);

      this._selectionManager.updateSelectionsOnDelete(index, length);
    }
  }, {
    key: "setText",
    value: function setText(value) {
      this._inputManager.setText(value);
    }
  }, {
    key: "getText",
    value: function getText() {
      return this._inputManager.getText();
    }
  }, {
    key: "selectionManager",
    value: function selectionManager() {
      return this._selectionManager;
    }
  }]);

  return CollaborativeTextEditor;
}();

exports.CollaborativeTextEditor = CollaborativeTextEditor;