import React from 'react';
import {css} from "@emotion/css";
import KanbanCard from "./KanbanCard";
import {generateCards} from "./StateManager";
import DropSpace from "./DropSpace";
import {RedoOutlined} from "@ant-design/icons";
import {Card} from "antd";
import {KanbanColumnProps} from "../lib/resources/columns";

export default function KanbanColumn(props: KanbanColumnProps) {

    const {id, title, cards} = props

    const renderCards = () => {
        if (cards.length > 0) {
            return (
                cards.map((card) => {

                    return (
                        <>
                            <KanbanCard
                                key={'card_' + card.id}
                                id={card.id}
                                title={card.title}
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

    return (
        <Card
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
            <DropSpace key={'DropSpace' + id} columnId={id} />
        </Card>
    )
}