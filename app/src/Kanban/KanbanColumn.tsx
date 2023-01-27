import React, {useEffect, useState} from 'react';
import {Card} from "antd";
import {css} from "@emotion/css";
import KanbanCard, {DragItem, KanbanCardProps} from "./KanbanCard";
import CardContainer from "./CardContainer";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../index";
import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
import {deleteCards, generateCards, moveCard} from "./StateManager";
import DropSpace from "./DropSpace";

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
        }),
        [id]
    );

    const renderCards = () => {
        if (cards.length > 0) {
            return (
                cards.map((card, index) => {

                    return (
                        <>
                            {isOver && (
                                <CardContainer key={'AlwaysOver'+index} columnId={id} method={(index === 0) ? 'first' : 'over'} movedCard={card}/>
                            )}
                            <KanbanCard
                                key={'card_' + card.id}
                                id={card.id}
                                title={card.title}
                                order={id}
                                columnId={card.columnId}
                            />
                        </>
                    )
                })
            )
        }
    }

    const generateCardsInColumn = () => {
        generateCards(100, id);
    }

    const deleteCardsInColumn = () => {
        deleteCards(id);
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
            bodyStyle={{width: '350px', height: '900px', maxHeight: '1000px', overflowY: 'auto'}}
            actions={[
                <AppstoreAddOutlined key={"add"} onClick={generateCardsInColumn}/>,
                <DeleteOutlined key={"delete"} onClick={deleteCardsInColumn}/>,
            ]}
        >
            {renderCards()}
            {isOver && cards.length === 0 && (
                <CardContainer key={'AlwaysBottom'} columnId={id} method={'first'} movedCard={null}/>
            )}
            <DropSpace columnId={id} />
        </Card>
    )
}