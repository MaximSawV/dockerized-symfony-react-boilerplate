import React from 'react';
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../index";
import {moveCard} from "./StateManager";
import {KanbanCardProps} from "../lib/resources/columns";

interface props {
    columnId: string
    height: number
}
export default function DropSpace(props: props) {

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: KanbanCardProps) => moveCard(item, null, item.columnId, props.columnId),
        }),
        [props.columnId]
    );

    return (
        <div ref={drop} style={{width: '100%', height: props.height+'px', opacity: 0}} />
    )
}