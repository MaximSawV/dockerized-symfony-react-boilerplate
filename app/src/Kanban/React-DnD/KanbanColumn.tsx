import React from 'react';
import {css} from "@emotion/css";
import KanbanCard from "./KanbanCard";
import CardContainer from "./CardContainer";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../index";
import {deleteCard, deleteCards, generateCards} from "./StateManager";
import DropSpace from "./DropSpace";
import {DeleteOutlined, RedoOutlined} from "@ant-design/icons";
import {Card} from "antd";
import {KanbanColumnProps} from "../lib/resources/kanbanProps";

export default function KanbanColumn(props: KanbanColumnProps) {

    const {id, title, cards} = props

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
                                <CardContainer key={'AlwaysOver'+card.id} columnId={id} method={(index === 0) ? 'first' : 'over'} movedCard={card}/>
                            )}
                            <KanbanCard
                                onDelete = {() => deleteCard(card)}
                                key={'card_' + card.id}
                                id={card.id}
                                title={card.title}
                                order={card.order}
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
            bodyStyle={{width: '350px', height: '850px', maxHeight: '1000px', overflowY: 'auto'}}
            actions={[
                <RedoOutlined key={"generate"} onClick={generateCardsInColumn}/>,
                <DeleteOutlined key={"delete"} onClick={deleteCardsInColumn}/>,
            ]}
        >
            {renderCards()}
            {isOver && cards.length === 0 && (
                <CardContainer key={'AlwaysBottom' + id} columnId={id} method={'first'} movedCard={null}/>
            )}
            <DropSpace key={'DropSpace' + id} columnId={id} />
        </Card>
    )
}