import React, {useState} from "react";
import {cards, columnsFromBackend, KanbanColumnItem} from "../lib/source";
import {css} from "@emotion/css";
import KanbanColumn from "../KanbanColumn/components/KanbanColumn";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const ItemTypes = {
    CARD: 'card'
}
export default function KanbanBoard() {

    const [columns, setColumns] = useState<KanbanColumnItem>(columnsFromBackend);
    const [loaded, setLoaded] = useState<boolean>(false)

    if (!loaded) {
        cards.forEach((card) => {
            columnsFromBackend[card.column].items.push(card);
        })
        setLoaded(true);
    }

    return (
        <div
            className={css`
              display: flex;
              justify-content: center;
              background: #F5F5F5;
              height: 100%;
            `}
        >
            <DndProvider backend={HTML5Backend}>
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <KanbanColumn key={columnId} id={columnId} column={column} />
                    );
                })}
            </DndProvider>
        </div>
    );
}
