import {KanbanCardProps} from "./KanbanCard";
import {ReactNode} from "react";
import {AntDesignOutlined} from "@ant-design/icons";
export const initialCards: KanbanCardProps[] = [

    {
        id: 1,
        title: 'Card 2',
        description: '2nd Card',
        content: 'Foo Baar',
        columnId: 0,
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
        id: 0,
        title: 'Card 1',
        description: '1st Card',
        content: 'Foo Baar',
        columnId: 0,
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

export function moveCard(cardId: number, columnId: number) {

    initialCards.forEach((card) => {
        if (card.id === cardId) {
            card.columnId = columnId;
            emitChange();
        }
    })
}