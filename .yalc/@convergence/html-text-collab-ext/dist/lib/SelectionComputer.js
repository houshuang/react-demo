"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionComputer = void 0;

var _textareaCaret = _interopRequireDefault(require("textarea-caret"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var SelectionComputer =
/*#__PURE__*/
function () {
  _createClass(SelectionComputer, null, [{
    key: "calculateSelection",
    value: function calculateSelection(element, start, end) {
      var computer = new SelectionComputer(element, start, end);
      return computer.selectionRows;
    } // The calculated styles for each row.

  }]);

  function SelectionComputer(element, start, end) {
    _classCallCheck(this, SelectionComputer);

    this.element = element;
    this.start = start;
    this.end = end;

    _defineProperty(this, "selectionRows", void 0);

    _defineProperty(this, "startCoordinates", void 0);

    _defineProperty(this, "endCoordinates", void 0);

    _defineProperty(this, "lineHeight", void 0);

    _defineProperty(this, "elementPaddingLeft", void 0);

    _defineProperty(this, "elementPaddingRight", void 0);

    _defineProperty(this, "elementPaddingX", void 0);

    this.startCoordinates = (0, _textareaCaret.default)(element, start);
    this.endCoordinates = (0, _textareaCaret.default)(element, end);
    this.lineHeight = this.startCoordinates.height;
    this.elementPaddingLeft = parseFloat(element.style.paddingLeft) || 0;
    this.elementPaddingRight = parseFloat(element.style.paddingRight) || 0;
    this.elementPaddingX = this.elementPaddingLeft + this.elementPaddingRight;
    this.selectionRows = []; // Figure out whether this selection spans more than one "row", as determined by
    // the presence of a newline character. The computation of single line selections
    // is slightly different than for multiple line selections.

    var selectedText = element.value.substr(start, end - start);

    if (selectedText.indexOf('\n') < 0) {
      this.appendSingleLineSelection(this.startCoordinates, this.endCoordinates);
    } else {
      this.buildMultiRowSelection();
    }
  }

  _createClass(SelectionComputer, [{
    key: "appendSingleLineSelection",
    value: function appendSingleLineSelection(startCoordinates, endCoordinates) {
      var _this$selectionRows;

      (_this$selectionRows = this.selectionRows).push.apply(_this$selectionRows, _toConsumableArray(this.buildSingleLineSelection(startCoordinates, endCoordinates)));
    }
  }, {
    key: "buildSingleLineSelection",
    value: function buildSingleLineSelection(startCoordinates, endCoordinates) {
      // does this line wrap? If not, we can just calculate the row selection based on
      // the provided coordinates.
      if (startCoordinates.top === endCoordinates.top) {
        return [{
          width: endCoordinates.left - startCoordinates.left,
          top: startCoordinates.top,
          left: startCoordinates.left,
          height: this.lineHeight
        }];
      } else {
        return this.buildWrappedLineSelections(startCoordinates, endCoordinates);
      }
    }
    /**
     * Wrapped lines have a more complex computation since we have to create multiple
     * rows.
     *
     * @param startCoordinates
     * @param endCoordinates
     */

  }, {
    key: "buildWrappedLineSelections",
    value: function buildWrappedLineSelections(startCoordinates, endCoordinates) {
      var rows = []; // the first line just goes the full width of the textarea

      rows.push({
        width: this.element.scrollWidth - this.elementPaddingRight - startCoordinates.left,
        top: startCoordinates.top,
        left: startCoordinates.left,
        height: this.lineHeight
      }); // If the selection contains one or more rows that span the entire textarea,
      // calculate a single selection element, which may actually span multiple rows,
      // but fills the width of the textarea.

      if (endCoordinates.top > startCoordinates.top + this.lineHeight) {
        rows.push({
          width: this.element.scrollWidth - this.elementPaddingX,
          left: this.elementPaddingLeft,
          top: startCoordinates.top + this.lineHeight,
          height: endCoordinates.top - startCoordinates.top - this.lineHeight
        });
      } // The last line starts at the left edge of the textarea and doesn't span the
      // entire width of the textarea


      rows.push({
        width: endCoordinates.left - this.elementPaddingLeft,
        top: endCoordinates.top,
        left: this.elementPaddingLeft,
        height: this.lineHeight
      });
      return rows;
    }
  }, {
    key: "buildMultiRowSelection",
    value: function buildMultiRowSelection() {
      var currentCoordinates = this.startCoordinates;
      var currentIndex = +this.start; // build one or more selection elements for each row (as determined by newline
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

        var endOfLineCoordinates = (0, _textareaCaret.default)(this.element, endOfLinePosition); // console.log('target of line position', endOfLinePosition, 'coords', endOfLineCoordinates);
        // This "single line" may actually wrap multiple lines of the textarea

        this.appendSingleLineSelection(currentCoordinates, endOfLineCoordinates);
        currentIndex = endOfLinePosition + 1;
        currentCoordinates = (0, _textareaCaret.default)(this.element, currentIndex);
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
    }
  }]);

  return SelectionComputer;
}();

exports.SelectionComputer = SelectionComputer;