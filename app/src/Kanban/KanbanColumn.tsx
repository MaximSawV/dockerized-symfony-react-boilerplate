import React from 'react';
import {Card} from "antd";
import {css} from "@emotion/css";
import {KanbanCardProps} from "./KanbanCard";
import CardContainer from "./CardContainer";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../index";

export interface KanbanColumnProps {
    id: number;
    title: string;
    cards: KanbanCardProps[];
}
export default function KanbanColumn(props: KanbanColumnProps) {

    const { id, title, cards } = props

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
        }),
        [id]
    );

    console.log(cards);

    const renderCards = () => {
        if (cards.length > 0) {
            return (
                <>
                    <CardContainer
                        key={`container_${id}.0`}
                        show={isOver}
                        id={id * 10}
                        card={null}
                        columnId={id}/>
                    {cards.map((card, index) => {
                        if (card.containerId) {

                        }

                        return (
                            <>
                                <CardContainer
                                    key={`container_${id}.${index + 1}`}
                                    show={true}
                                    id={id * 10 + index + 1}
                                    card={card}
                                    columnId={id}/>
                                <CardContainer
                                    key={`container_${id}.${index + 2}`}
                                    show={isOver}
                                    id={id * 10 + index + 2}
                                    card={null}
                                    columnId={id}/>
                            </>
                        )
                    })}
                </>
            )
        }

        return (<CardContainer key={`container_${id}.${cards.length}`} show={isOver} id={id * 10 + cards.length} card={null} columnId={id}/>);
    }

    return (
        <Card
            ref={drop}
            key={id+'container'}
            title={title}
            className={css`
              height: fit-content;
              width: fit-content;
              margin: 20px;
              background-color: rgba(175, 193, 199, 0.75);
            `}
            bodyStyle={{width: '350px', height: '1000px', maxHeight: '1000px', overflowY: 'auto'}}
        >
            {renderCards()}
        </Card>
    )
}