import React, {useState} from 'react';
import {css} from "@emotion/css";
import KanbanCard from "./KanbanCard";
import {generateCards} from "./StateManager";
import {RedoOutlined} from "@ant-design/icons";
import {KanbanColumnProps} from "../lib/resources/columns";
import {Card} from "antd";
import DropSpace from "./DropSpace";

export default function KanbanColumn(props: KanbanColumnProps) {

    const {id, title, cards} = props
    const [firstCardIndex, setFirstCardIndex] = useState<number>(0);

    const test = [...cards].slice(firstCardIndex,15+firstCardIndex);
    const renderCards = () => {
        if (test.length > 0) {
            return (
                test.map((card) => {

                    return (
                        <div>
                            <KanbanCard
                                key={'card_' + card.id}
                                card={card}
                                />
                        </div>
                    )
                })
            )
        }
    }

    const generateCardsInColumn = () => {
        generateCards(1000, id);
    }

    const onScroll = (event: any) => {
        setFirstCardIndex(Math.floor(event.currentTarget.scrollTop / 148));
        console.log(event.currentTarget.scrollTop);
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
            bodyStyle={{width: '350px', height: '850px'}}
            actions={[
                <RedoOutlined key={"generate"} onClick={generateCardsInColumn}/>,
            ]}
        >
            <div className={'card-list'} style={{height: '100%', maxHeight: '850px', overflowY: 'auto', width: '100%'}} onScroll={(event) => onScroll(event)}>
                {renderCards()}
                <DropSpace key={'DropSpace' + id} columnId={id}/>
            </div>
        </Card>
    )
}