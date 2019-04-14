// @ts-ignore
import StringChangeDetector from "@convergence/string-change-detector";
import { IndexUtils } from "./IndexUtils";
export class TextInputManager {
    /**
     *
     * @param options
     */
    constructor(options) {
        this._onLocalInput = () => {
            this._changeDetector.processNewValue(this._control.value);
        };
        this._control = options.control;
        this._onLocalInsert = options.onInsert;
        this._onLocalDelete = options.onDelete;
        this._changeDetector = null;
        this.bind();
    }
    bind() {
        this._changeDetector = new StringChangeDetector({
            value: this._control.value,
            onInsert: this._onLocalInsert,
            onRemove: this._onLocalDelete
        });
        this._control.addEventListener("input", this._onLocalInput);
    }
    unbind() {
        this._control.removeEventListener("input", this._onLocalInput);
        this._changeDetector = null;
    }
    insertText(index, value) {
        this._assertBound();
        const { start, end } = this._getSelection();
        const xStart = IndexUtils.transformIndexOnInsert(start, index, value);
        const xEnd = IndexUtils.transformIndexOnInsert(end, index, value);
        this._changeDetector.insertText(index, value);
        this._updateControl();
        this._setTextSelection(xStart, xEnd);
    }
    deleteText(index, length) {
        this._assertBound();
        const { start, end } = this._getSelection();
        const xStart = IndexUtils.transformIndexOnDelete(start, index, length);
        const xEnd = IndexUtils.transformIndexOnDelete(end, index, length);
        this._changeDetector.removeText(index, length);
        this._updateControl();
        this._setTextSelection(xStart, xEnd);
    }
    setText(value) {
        this._assertBound();
        this._changeDetector.setValue(value);
        this._updateControl();
        this._setTextSelection(0, 0);
    }
    getText() {
        return this._control.value;
    }
    _updateControl() {
        this._control.value = this._changeDetector.getValue();
    }
    _assertBound() {
        if (this._changeDetector === null) {
            throw new Error("The TextInputManager is not bound.");
        }
    }
    _getSelection() {
        return { 'start': this._control.selectionStart, 'end': this._control.selectionEnd };
    }
    _setTextSelection(start, end) {
        // this._control.focus();
        this._control.setSelectionRange(start, end);
    }
}
