import { ISelectionRow } from "./ISelectionRow";
export declare class SelectionComputer {
    private element;
    private start;
    private end;
    static calculateSelection(element: HTMLTextAreaElement, start: number, end: number): ISelectionRow[];
    private readonly selectionRows;
    private readonly startCoordinates;
    private readonly endCoordinates;
    private readonly lineHeight;
    private readonly elementPaddingLeft;
    private readonly elementPaddingRight;
    private readonly elementPaddingX;
    private constructor();
    private appendSingleLineSelection;
    private buildSingleLineSelection;
    /**
     * Wrapped lines have a more complex computation since we have to create multiple
     * rows.
     *
     * @param startCoordinates
     * @param endCoordinates
     */
    private buildWrappedLineSelections;
    private buildMultiRowSelection;
}
