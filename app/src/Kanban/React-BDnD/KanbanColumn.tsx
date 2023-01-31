import React from 'react';
import {generateCards} from "../React-DnD/StateManager";
import {Card} from "antd";
import {css} from "@emotion/css";
import {RedoOutlined} from "@ant-design/icons";
import {Droppable} from "react-beautiful-dnd";
import KanbanCard from "./KanbanCard";
import {KanbanColumnProps} from "../lib/resources/columns";

export default function KanbanColumn(props: KanbanColumnProps) {

    const {id, title, cards} = props

    const renderCards = () => {
        if (cards.length > 0) {
            return (
                cards.map((card, index) => {

                    return (
                        <KanbanCard
                            key={'card_' + card.id}
                            id={card.id}
                            title={card.title}
                            index={index}
                            columnId={id}/>
                    )
                })
            )
        }
    }

    const generateCardsInColumn = () => {
        generateCards(100, id);
    }

    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.droppableProps}
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
                    ]}
                >
                    {renderCards()}
                    {provided.placeholder}
                </Card>
            )}
        </Droppable>
    )
}