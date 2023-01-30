import {KanbanCardProps} from "./KanbanCard";
import {v4} from "uuid";

const cardsFromBackend: KanbanCardProps[] = [];
export let initialCards: KanbanCardProps[] = sort();


export function addCard(card: KanbanCardProps) {
    initialCards.push(card);
    emitChange();
}

export function deleteCard(card: KanbanCardProps) {
    initialCards.splice(initialCards.indexOf(card), 1);
    emitChange();
}
export function deleteCards(column: string) {
    initialCards = initialCards.filter(card => card.columnId !== column);

    emitChange();
}
export function generateCards(number: number, column: string) {

    for (let i = 0; i < number; i++) {
        initialCards.push(
            {
                id: v4(),
                title: 'Card Nr: ' + (initialCards.length + 1),
                columnId: column,
                order: initialCards.length + i,
            } as KanbanCardProps
        )
    }

    emitChange();
}

function compare( a: KanbanCardProps, b: KanbanCardProps ) {
    if ( a.order < b.order ){
        return -1;
    }

    if ( a.order > b.order ){
        return +1;
    }

    return 0;
}
function sort() {
    let sortedCards: KanbanCardProps[] = [];
    if (cardsFromBackend.length > 0) {
        sortedCards = cardsFromBackend.sort(compare);
    }

    return sortedCards;
}

let observer: any = null

function emitChange() {
    initialCards = initialCards.sort(compare);
    observer(initialCards)
}

export function observe(o: any) {
    if (observer) {
        throw new Error('Multiple observers not implemented.')
    }

    observer = o;
    emitChange();
}

function realign() {
    for (let i = 0; i < initialCards.length; i++) {
        initialCards[i].order = i;
    }
}

function placeCardOver(card: KanbanCardProps, index: number, movedCard: KanbanCardProps) {

    const moveIndex = initialCards.indexOf(movedCard);
    initialCards.splice(index, 1);
    initialCards.splice(moveIndex, 0, card);
}

function placeCardFirst(index: number, card: KanbanCardProps) {

    initialCards.splice(index, 1);
    initialCards.unshift(card)
}

function placeCardLast(index: number, card: KanbanCardProps) {

    initialCards.splice(index, 1);
    initialCards.push(card);
}

export function moveCard(movingCard: string, columnId: string, method: 'over' | 'last' | 'first', movedCard: KanbanCardProps|null ) {

    initialCards.forEach((card, index) => {

        if (card.id === movingCard) {

            if (card.columnId !== columnId) {
                card.columnId = columnId;
                card.order = initialCards.length - 1;
            }

            switch (method) {
                case 'first':
                    placeCardFirst(index, card);
                    break;
                case 'last':
                    placeCardLast(index, card);
                    break;
                case 'over':
                    if (movedCard) {
                        placeCardOver(card, index, movedCard);
                    }
                    break;
            }

            realign();
            emitChange();
        }
    })
}