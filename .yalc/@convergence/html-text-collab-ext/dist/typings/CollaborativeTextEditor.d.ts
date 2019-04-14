import { CollaborativeSelectionManager, ISelectionCallback } from "./CollaborativeSelectionManager";
export interface ICollaborativeTextAreaOptions {
    control: HTMLTextAreaElement;
    onInsert: (index: number, value: string) => void;
    onDelete: (index: number, length: number) => void;
    onSelectionChanged: ISelectionCallback;
}
export declare class CollaborativeTextEditor {
    private readonly _selectionManager;
    private readonly _inputManager;
    private readonly _onInsert;
    private readonly _onDelete;
    constructor(options: ICollaborativeTextAreaOptions);
    insertText(index: number, value: string): void;
    deleteText(index: number, length: number): void;
    setText(value: string): void;
    getText(): string;
    selectionManager(): CollaborativeSelectionManager;
}
