import { ISelectionRange } from "./ISelectionRange";
export interface ICollaboratorSelectionOptions {
    margin?: number;
}
export declare class CollaboratorSelection {
    private readonly _rows;
    private readonly _cursorElement;
    private readonly _tooltipElement;
    private readonly _textInput;
    private readonly _container;
    private _color;
    private _selection;
    private _cursor;
    private _label;
    private readonly _margin;
    private _tooltipTimeout;
    constructor(textInput: HTMLTextAreaElement, overlayContainer: HTMLDivElement, color: string, label: string, options: ICollaboratorSelectionOptions);
    showSelection(): void;
    hideSelection(): void;
    showCursor(): void;
    hideCursor(): void;
    showCursorToolTip(): void;
    flashCursorToolTip(duration: number): void;
    hideCursorTooltip(): void;
    private _clearToolTipTimeout;
    setColor(color: string): void;
    setSelection(selection: ISelectionRange | null): void;
    getSelection(): ISelectionRange;
    clearSelection(): void;
    refresh(): void;
    private _updateCursor;
    private _updateSelection;
    private _addNewRows;
    private _rowsEqual;
    private _updateRow;
}
