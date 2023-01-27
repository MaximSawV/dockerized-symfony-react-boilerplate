import React from 'react';
import {useDrop} from "react-dnd";
import {ItemTypes} from "../index";
import {DragItem} from "./KanbanCard";
import {moveCard} from "./StateManager";

interface props {
    columnId: string
}
export default function DropSpace(props: props) {

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: DragItem) => moveCard(item.id, props.columnId, 'last', null),
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
        }),
        [props.columnId]
    );

    return (
        <div ref={drop} style={{width: '100%', height: '50%', backgroundColor: '#6E6E6E', opacity: isOver ? 0.3 : 0}} />
    )
}