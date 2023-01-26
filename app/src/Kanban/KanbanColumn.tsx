import React, {useEffect, useState} from 'react';
import {Card} from "antd";
import {css} from "@emotion/css";
import KanbanCard, {DragItem, KanbanCardProps} from "./KanbanCard";
import CardContainer from "./CardContainer";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../index";
import {moveCard} from "./StateManager";

export interface KanbanColumnProps {
    id: number;
    title: string;
    cards: KanbanCardProps[];
}

export default function KanbanColumn(props: KanbanColumnProps) {

    const {id, title, cards} = props

    const [firstCard, setFirstCard] = useState<boolean>(true)

    useEffect(() => {
        cards.forEach((card) => {
            if (card.columnId === id) {
                setFirstCard(false);
            }
        })
    })

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
            //drop: (item: DragItem) => moveCard(item.id, id, false, firstCard),
        }),
        [id]
    );

    const renderCards = () => {
        if (cards.length > 0) {
            return (
                cards.map((card, index) => {

                    return (
                        <KanbanCard
                            key={'card_' + card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            content={card.content}
                            order={id}
                            columnId={card.columnId}
                            createdBy={card.createdBy}
                            assignedTo={card.assignedTo}
                        />
                    )
                })
            )
        }
    }

    return (
        <Card
            ref={drop}
            title={title}
            className={css`
              height: fit-content;
              width: fit-content;
              margin: 20px;
              background-color: rgba(175, 193, 199, 0.75);
            `}
            bodyStyle={{width: '350px', height: '1000px', maxHeight: '1000px', overflowY: 'auto'}}
        >
            {isOver && (cards.length < 1) && (
                <CardContainer key={'container_1'+id} columnId={id} isOver={false} first />
            )}

            {isOver && (cards.length > 0) && (
                <CardContainer key={'container_2'+id} columnId={id} isOver={false} first={true} />
            )}
            {renderCards()}

            {isOver && (cards.length > 0) && (
                <CardContainer key={'container_3'+id} columnId={id} isOver={false} first={false} />
            )}

        </Card>
    )
}