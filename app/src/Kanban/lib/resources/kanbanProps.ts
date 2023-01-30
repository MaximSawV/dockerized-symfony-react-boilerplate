export interface KanbanBoardProps {
    cards: KanbanCardProps[];
}

export interface KanbanColumnProps {
    id: string;
    title: string;
    cards: KanbanCardProps[];
}

export interface KanbanCardProps {
    id: string;
    title: string;
    columnId: string;
    order?: number;

    onDelete?: () => void;
    index?: number;
}