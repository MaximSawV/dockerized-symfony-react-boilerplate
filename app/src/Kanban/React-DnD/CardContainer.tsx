import React from 'react';
import {moveCard} from "./StateManager";
import {DragItem} from "./KanbanCard";
import {useDrop} from "react-dnd";
import {ItemTypes} from '../../index';
import {css} from "@emotion/css";
import {KanbanCardProps} from "../lib/resources/kanbanProps";

interface CardContainerProps {
    columnId: string;
    method: 'over' | 'last' | 'first';
    movedCard: KanbanCardProps|null;
}

export default function CardContainer(props: CardContainerProps) {

    const {columnId, method, movedCard} = props;

    const [ {isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
            drop: (item: DragItem) => moveCard(item.id, columnId, method, movedCard),

        }),
        []
    );

    return (
        <div ref={drop}
             className={css`
               height: 3em;
               width: 300px;
               background-color: #6E6E6E;
               opacity: ${isOver ? 0.3 : 0};
             `}>
        </div>
    )
}