import { CollaborativeSelectionManager } from "./CollaborativeSelectionManager";
import { TextInputManager } from "./TextInputManager";
export class CollaborativeTextEditor {
    constructor(options) {
        if (!options) {
            throw new Error("options must be defined.");
        }
        if (!options.control) {
            throw new Error("options.control must be defined.");
        }
        const control = options.control;
        const insertCallback = options.onInsert;
        const deleteCallback = options.onDelete;
        const onInsert = (index, value) => {
            this._selectionManager.updateSelectionsOnInsert(index, value);
            if (insertCallback) {
                insertCallback(index, value);
            }
        };
        const onDelete = (index, length) => {
            this._selectionManager.updateSelectionsOnDelete(index, length);
            if (deleteCallback) {
                deleteCallback(index, length);
            }
        };
        const onSelectionChanged = options.onSelectionChanged !== undefined ?
            options.onSelectionChanged : (selection) => {
        };
        this._inputManager = new TextInputManager({ control, onInsert, onDelete });
        this._selectionManager = new CollaborativeSelectionManager({ control, onSelectionChanged });
    }
    insertText(index, value) {
        this._inputManager.insertText(index, value);
        this._selectionManager.updateSelectionsOnInsert(index, value);
    }
    deleteText(index, length) {
        this._inputManager.deleteText(index, length);
        this._selectionManager.updateSelectionsOnDelete(index, length);
    }
    setText(value) {
        this._inputManager.setText(value);
    }
    getText() {
        return this._inputManager.getText();
    }
    selectionManager() {
        return this._selectionManager;
    }
}
