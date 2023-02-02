import {v4} from "uuid";
import {Columns, findColumn, KanbanCardProps} from "../lib/resources/columns";

export function addCard(card: KanbanCardProps, columnId: string) {
    const column = findColumn(columnId);

    if (column) {
        column.cards.push(card)
        emitChange();
    }
}

export function generateCards(number: number, columnId: string) {
    const column = findColumn(columnId);

    if (!column) return;

    for (let i = 0; i < number; i++) {
        column.cards.push(
            {
                id: v4(),
                title: 'Card Nr: ' + (column.cards.length + 1),
                columnId: column.id,
                order: column.cards.length + i,
                avatarColor: '#'+(0x1000000+Math.random()*0xffffff).toString(16).slice(0,6),
            } as KanbanCardProps
        )
    }

    emitChange();
}

let observer: any = null

function emitChange() {
    observer(Columns);
}

export function observe(o: any) {
    if (observer) {
        throw new Error('Multiple observers not implemented.')
    }

    observer = o;
    emitChange();
}

export function moveCard(sourceCard: KanbanCardProps, destinationCard: KanbanCardProps | null, sourceColumnId: string, destinationColumnId: string) {

    if(sourceCard === destinationCard) return;

    const newSourceCard = {...sourceCard, columnId: destinationColumnId};

    for (const column of Columns) {
        if (column.id === sourceColumnId) {
            for (let i = 0; i < column.cards.length; i++) {
                if (column.cards[i].id === newSourceCard.id) {
                    column.cards.splice(i, 1);
                    break;
                }
            }
        }

        if (column.id === destinationColumnId && destinationCard) {
            for (let i = 0; i < column.cards.length; i++) {
                if (column.cards[i].id === destinationCard.id) {
                    column.cards.splice(i, 0, newSourceCard);
                    break;
                }
            }
        }

        if (!destinationCard && column.id === destinationColumnId) {
            column.cards.push(newSourceCard);
        }
    }

    emitChange();
}