import React, {ReactNode} from 'react';
import {moveCard} from "./StateManager";
import KanbanCard, {DragItem, KanbanCardProps} from "./KanbanCard";
import {useDrop} from "react-dnd";
import {ItemTypes} from '..';
import {css} from "@emotion/css";

interface CardContainerProps {
    id: number;
    card: KanbanCardProps | null;
    columnId: number;
    show: boolean;
}

export default function CardContainer(props: CardContainerProps) {

    const {card, id, columnId, show} = props;

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: DragItem) => moveCard(item.id, columnId, id + 1),
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
        }),
        [id]
    );

    return (
        <div ref={drop}
             className={css`
               height: ${card ? 'fit-content' : '50px'};
               width: 300px;
               background: #6E6E6E;
               opacity: ${card && !show ? 0.5 : 1};
               border-radius: 20px
             `}>
            {card && (
                <KanbanCard
                    key={'card_'+id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    content={card.content}
                    containerId={id}
                    columnId={card.columnId}
                    createdBy={card.createdBy}
                    assignedTo={card.assignedTo}
                />
            )}
        </div>
    )
}