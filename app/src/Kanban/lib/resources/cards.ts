import {KanbanCardProps} from "./kanbanProps";

export const Cards: KanbanCardProps[] = [
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
];

export function findCard(id: string) {
    let searchedCard: KanbanCardProps|null = null;

    Cards.forEach((card) => {
        if (card.id === id) {
            searchedCard = card;
        }
    })

    return searchedCard;
}