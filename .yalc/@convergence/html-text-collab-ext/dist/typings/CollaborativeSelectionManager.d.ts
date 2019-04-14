import { ISelectionRange } from "./ISelectionRange";
import { CollaboratorSelection } from "./CollaboratorSelection";
export declare type ISelectionCallback = (selection: ISelectionRange) => void;
export interface ICollaborativeSelectionManagerOptions {
    control: HTMLTextAreaElement;
    onSelectionChanged: ISelectionCallback;
}
export declare class CollaborativeSelectionManager {
    private readonly _collaborators;
    private readonly _textElement;
    private readonly _overlayContainer;
    private readonly _scroller;
    private readonly _onSelection;
    private _selectionAnchor;
    private _selectionTarget;
    constructor(options: ICollaborativeSelectionManagerOptions);
    addCollaborator(id: string, label: string, color: string, selection?: ISelectionRange): CollaboratorSelection;
    getCollaborator(id: string): CollaboratorSelection;
    removeCollaborator(id: string): void;
    getSelection(): ISelectionRange;
    show(): void;
    hide(): void;
    dispose(): void;
    updateSelectionsOnInsert(index: number, value: string): void;
    updateSelectionsOnDelete(index: number, length: number): void;
    private _checkSelection;
    private _onMouseMove;
    private _checkResize;
    private _updateOverlay;
    private _updateScroller;
}
