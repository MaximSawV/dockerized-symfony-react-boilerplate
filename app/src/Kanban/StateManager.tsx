import KanbanCard, {KanbanCardProps} from "./KanbanCard";
import {ReactNode} from "react";
import {AntDesignOutlined} from "@ant-design/icons";
const cardsFromBackend: KanbanCardProps[] = [

    {
        id: 0,
        title: 'Card 1',
        description: '1st Card',
        content: 'Foo Baar',
        columnId: 0,
        order: 0,
        createdBy: {
            name: 'ADMIN',
            acronym: 'ADM',
            color: '#5fa0ff',
            icon: <AntDesignOutlined />
        },
        assignedTo: [
            {
                name: 'John Wick',
                acronym: 'JK',
                color: '#5fa0ff'
            },
            {
                name: 'Dreckiger Dan',
                acronym: 'DD',
                color: '#925917'
            },
            {
                name: 'Spitzkopf Larry',
                acronym: 'SKL',
                color: '#00ff82'
            },
        ]
    },
    {
        id: 1,
        title: 'Card 2',
        description: '2nd Card',
        content: 'Foo Baar',
        columnId: 0,
        order: 1,
        createdBy: {
            name: 'John Wick',
            acronym: 'JK',
            color: '#5fa0ff',
        },
        assignedTo: [
            {
                name: 'Spitzkopf Larry',
                acronym: 'SKL',
                color: '#00ff82'
            },
            {
                name: 'Dreckiger Dan',
                acronym: 'DD',
                color: '#925917'
            }
        ]
    },
    {
        id: 2,
        title: 'Card 3',
        description: '3rd Card',
        content: 'Foo Baar',
        columnId: 0,
        order: 2,
        createdBy: {
            name: 'John Wick',
            acronym: 'JK',
            color: '#5fa0ff',
        },
        assignedTo: [
            {
                name: 'Spitzkopf Larry',
                acronym: 'SKL',
                color: '#00ff82'
            },
            {
                name: 'Dreckiger Dan',
                acronym: 'DD',
                color: '#925917'
            }
        ]
    },
];

function compare( a: KanbanCardProps, b: KanbanCardProps ) {
    if ( a.order < b.order ){
        return -1;
    }

    if ( a.order > b.order ){
        return +1;
    }

    return 0;
}
const testFunction = () => {
    let sortedCards: KanbanCardProps[] = [];
    if (cardsFromBackend.length > 0) {
        sortedCards = cardsFromBackend.sort(compare);
    }

    return sortedCards;
}
export let initialCards: KanbanCardProps[] = testFunction();
console.log(...initialCards);


let observer: any = null

function emitChange() {
    observer(initialCards)
}

export function observe(o: any) {
    if (observer) {
        throw new Error('Multiple observers not implemented.')
    }

    observer = o;
    emitChange();
}

export function moveCard(cardId: number, columnId: number, isOverCard: boolean, first: boolean) {

    initialCards.forEach((card, index) => {

        if (card.id === cardId) {
            card.columnId = columnId;
            emitChange();

            if (isOverCard) {
                if (index > 0) {
                    card.order = initialCards[index - 1].order;
                    initialCards[index - 1].order++;
                }

                initialCards = initialCards.sort(compare);

                emitChange();
            }

            if (first) {
                for (let i = 0; i < initialCards.length; i++) {
                    console.log(initialCards[i].id, card.id)
                    if (initialCards[i].id === card.id) {
                        card.order = 0;
                        console.log(card.order)
                        emitChange();
                        return;
                    }
                    initialCards[i].order += (i + 1);
                    emitChange();
                    console.log(initialCards[i].order)
                }
            }

            if (!first && !isOverCard) {
                if (index > 0) {
                    card.order = 1 + initialCards[index - 1].order;
                    for (let i = index; i >= 0; i--) {
                        initialCards[i].order ++;
                    }

                    for (let i = index; i < initialCards.length; i++) {
                        initialCards[i].order ++;
                    }
                } else {
                    card.order = initialCards.length;
                }
                emitChange();
            }
        }
    })
}