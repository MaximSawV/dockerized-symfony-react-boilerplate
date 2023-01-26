import React from 'react';
import {Card} from "antd";
import {css} from "@emotion/css";
import KanbanColumn, {KanbanColumnProps} from "./KanbanColumn";
import {KanbanCardProps} from "./KanbanCard";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const Columns: KanbanColumnProps[] = [
    {
        id: 0,
        title: 'Todo',
        cards: []
    },
    {
        id: 1,
        title: 'Doing',
        cards: []
    },
    {
        id: 2,
        title: 'Done',
        cards: []
    },
];
function renderColumn(cards: KanbanCardProps[]) {

    return (
        Columns.map((column, index) => {

            let columnCards: KanbanCardProps[] = []

            cards.forEach((card) => {
                if (card.columnId === column.id) {
                    columnCards.push(card);
                }
            })

            return (
                <KanbanColumn key={'column_'+index} id={column.id} title={column.title} cards={columnCards} />
            )
        })
    )
}

interface KanbanBordProps {
    cards: KanbanCardProps[];
}
export default function KanbanBoard(props: KanbanBordProps) {

    return (
        <DndProvider backend={HTML5Backend}>
            <Card
                title={"Board 1"}
                className={css`height: calc(100% - 100px);`}
                bodyStyle={{display: 'flex', flexDirection: 'row'}}
            >
                {renderColumn(props.cards)}
            </Card>
        </DndProvider>
    )
}