import React, {useState} from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {cards, columnsFromBackend, KanbanColumnItem} from "../lib/source";
import {css} from "@emotion/css";
import KanbanColumn from "../KanbanColumn/components/KanbanColumn";

export default function KanbanBoard() {

    const [columns, setColumns] = useState<KanbanColumnItem>(columnsFromBackend);
    const [loaded, setLoaded] = useState<boolean>(false)

    if (!loaded) {
        cards.forEach((card) => {
            columnsFromBackend[card.column].items.push(card);
        })
        setLoaded(true);
    }
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination?.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination?.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination?.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination?.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination?.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
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
            <DragDropContext onDragEnd={result => onDragEnd(result)}>
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <KanbanColumn key={columnId} columnId={columnId} column={column} />
                    );
                })}
            </DragDropContext>
        </div>
    );
}
