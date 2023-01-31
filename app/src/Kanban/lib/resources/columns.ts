export interface KanbanBoardProps {
    data: KanbanColumnProps[]
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
    index?: number;
}

export const Columns: KanbanColumnProps[] = [
    {
        id: '0',
        title: 'Todo',
        cards: [
            {
                id: '0',
                title: 'test 1',
                columnId: '0'
            },
            {
                id: '1',
                title: 'test 2',
                columnId: '0'
            },
            {
                id: '2',
                title: 'test 3',
                columnId: '0'
            }
        ]
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

export function findCard(id: string) {
    let searchedCard: KanbanCardProps|null = null;

    for (const column of Columns) {
        for (const card of column.cards) {
            if (card.id === id) {
                searchedCard = card;
            }
        }
    }

    return searchedCard;
}

export function findColumn(id: string) {
    let searchedColumn: KanbanColumnProps|null = null;

    for (const column of Columns) {
        if (column.id === id) {
            searchedColumn = column;
        }
    }

    return searchedColumn;
}