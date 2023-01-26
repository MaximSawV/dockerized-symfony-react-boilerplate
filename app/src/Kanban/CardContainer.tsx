import React from 'react';
import {moveCard} from "./StateManager";
import {DragItem} from "./KanbanCard";
import {useDrop} from "react-dnd";
import {ItemTypes} from '..';
import {css} from "@emotion/css";

interface CardContainerProps {
    columnId: number;
    isOver: boolean;
    first: boolean;
    last: boolean;
}

export default function CardContainer(props: CardContainerProps) {

    const {columnId, first, last} = props;

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: DragItem) => moveCard(item.id, columnId, props.isOver, first, last),
        }),
        []
    );

    return (
        <div ref={drop}
             className={css`
               height: 50px;
               width: 300px;
               background: #6E6E6E;
               opacity: 0.5;
               border-radius: 20px
             `}>
        </div>
    )
}