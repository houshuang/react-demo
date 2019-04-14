"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollaborativeSelectionManager = void 0;

var _CollaboratorSelection = require("./CollaboratorSelection");

var _IndexUtils = require("./IndexUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CollaborativeSelectionManager =
/*#__PURE__*/
function () {
  function CollaborativeSelectionManager(options) {
    var _this = this;

    _classCallCheck(this, CollaborativeSelectionManager);

    _defineProperty(this, "_collaborators", void 0);

    _defineProperty(this, "_textElement", void 0);

    _defineProperty(this, "_overlayContainer", void 0);

    _defineProperty(this, "_scroller", void 0);

    _defineProperty(this, "_onSelection", void 0);

    _defineProperty(this, "_selectionAnchor", void 0);

    _defineProperty(this, "_selectionTarget", void 0);

    _defineProperty(this, "_checkSelection", function () {
      setTimeout(function () {
        var changed = _this._textElement.selectionStart !== _this._selectionAnchor || _this._textElement.selectionEnd !== _this._selectionTarget;

        if (changed) {
          if (_this._selectionAnchor === _this._textElement.selectionStart) {
            _this._selectionAnchor = _this._textElement.selectionStart;
            _this._selectionTarget = _this._textElement.selectionEnd;
          } else {
            _this._selectionAnchor = _this._textElement.selectionEnd;
            _this._selectionTarget = _this._textElement.selectionStart;
          }

          _this._onSelection({
            anchor: _this._selectionAnchor,
            target: _this._selectionTarget
          });
        }
      }, 0);
    });

    _defineProperty(this, "_onMouseMove", function () {
      _this._checkResize();

      _this._checkSelection();
    });

    _defineProperty(this, "_checkResize", function () {
      if (_this._textElement.offsetWidth !== _this._overlayContainer.offsetWidth || _this._textElement.offsetHeight !== _this._overlayContainer.offsetHeight) {
        _this._updateOverlay();

        _this._collaborators.forEach(function (renderer) {
          return renderer.refresh();
        });
      }
    });

    this._collaborators = new Map();
    this._textElement = options.control; // TODO handle the line height better. The issue here
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

    this._overlayContainer.append(this._scroller); // Provide resize handling. After the mose down, we register for mouse
    // movement and check if we have resized. We then listen for a mouse up
    // to unregister.


    this._textElement.addEventListener("mousedown", function () {
      window.addEventListener("mousemove", _this._onMouseMove);
    });

    window.addEventListener("mouseup", function () {
      window.removeEventListener("mousemove", _this._onMouseMove);

      _this._checkResize();
    });

    this._textElement.addEventListener("scroll", function () {
      return _this._updateScroller();
    });

    this._textElement.addEventListener("keydown", this._checkSelection);

    this._textElement.addEventListener("click", this._checkSelection);

    this._textElement.addEventListener("focus", this._checkSelection);

    this._textElement.addEventListener("blur", this._checkSelection);

    this._updateOverlay();
  }

  _createClass(CollaborativeSelectionManager, [{
    key: "addCollaborator",
    value: function addCollaborator(id, label, color, selection) {
      if (this._collaborators.has(id)) {
        throw new Error("A collaborator with the specified id already exists: ".concat(id));
      }

      var collaborator = new _CollaboratorSelection.CollaboratorSelection(this._textElement, this._scroller, color, label, {
        margin: 5
      });

      this._collaborators.set(id, collaborator);

      if (selection !== undefined && selection !== null) {
        collaborator.setSelection(selection);
      }

      return collaborator;
    }
  }, {
    key: "getCollaborator",
    value: function getCollaborator(id) {
      return this._collaborators.get(id);
    }
  }, {
    key: "removeCollaborator",
    value: function removeCollaborator(id) {
      var renderer = this._collaborators.get(id);

      if (renderer !== undefined) {
        renderer.clearSelection();

        this._collaborators.delete(id);
      } else {
        throw new Error("Unknown collaborator: ".concat(id));
      }
    }
  }, {
    key: "getSelection",
    value: function getSelection() {
      return {
        anchor: this._selectionAnchor,
        target: this._selectionTarget
      };
    }
  }, {
    key: "show",
    value: function show() {
      this._overlayContainer.style.visibility = "visible";
    }
  }, {
    key: "hide",
    value: function hide() {
      this._overlayContainer.style.visibility = "hidden";
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._overlayContainer.parentElement.removeChild(this._overlayContainer);
    }
  }, {
    key: "updateSelectionsOnInsert",
    value: function updateSelectionsOnInsert(index, value) {
      this._collaborators.forEach(function (collaborator) {
        var selection = collaborator.getSelection();

        var anchor = _IndexUtils.IndexUtils.transformIndexOnInsert(selection.anchor, index, value);

        var target = _IndexUtils.IndexUtils.transformIndexOnInsert(selection.target, index, value);

        collaborator.setSelection({
          anchor: anchor,
          target: target
        });
      });
    }
  }, {
    key: "updateSelectionsOnDelete",
    value: function updateSelectionsOnDelete(index, length) {
      this._collaborators.forEach(function (collaborator) {
        var selection = collaborator.getSelection();

        var anchor = _IndexUtils.IndexUtils.transformIndexOnDelete(selection.anchor, index, length);

        var target = _IndexUtils.IndexUtils.transformIndexOnDelete(selection.target, index, length);

        collaborator.setSelection({
          anchor: anchor,
          target: target
        });
      });
    }
  }, {
    key: "_updateOverlay",
    value: function _updateOverlay() {
      var top = this._textElement.offsetTop;
      var left = this._textElement.offsetLeft;
      var height = this._textElement.offsetHeight;
      var width = this._textElement.offsetWidth;
      this._overlayContainer.style.top = top + "px";
      this._overlayContainer.style.left = left + "px";
      this._overlayContainer.style.height = height + "px";
      this._overlayContainer.style.width = width + "px";
    }
  }, {
    key: "_updateScroller",
    value: function _updateScroller() {
      this._scroller.style.top = this._textElement.scrollTop * -1 + "px";
      this._scroller.style.left = this._textElement.scrollLeft * -1 + "px";
    }
  }]);

  return CollaborativeSelectionManager;
}();

exports.CollaborativeSelectionManager = CollaborativeSelectionManager;