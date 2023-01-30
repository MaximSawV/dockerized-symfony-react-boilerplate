import {v4} from "uuid";
import {KanbanColumnProps} from "./kanbanProps";

export const Columns: KanbanColumnProps[] = [
    {
        id: '0',
        title: 'Todo',
        cards: []
    },
    {
        id: '1',
        title: 'Doing',
        cards: []
    },
    {
        id: '2',
        title: 'Done',
        cards: []
    },
];

export function findColumn(id: string) {
    let searchedColumn: KanbanColumnProps|null = null;

    Columns.forEach((column) => {
        if (column.id === id) {
            searchedColumn = column;
        }
    })

    return searchedColumn;
}