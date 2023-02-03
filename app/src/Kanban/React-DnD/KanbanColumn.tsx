import React, {useState} from 'react';
import {css} from "@emotion/css";
import KanbanCard from "./KanbanCard";
import {generateCards} from "./StateManager";
import {RedoOutlined, SearchOutlined} from "@ant-design/icons";
import {KanbanColumnProps} from "../lib/resources/columns";
import {Card} from "antd";
import DropSpace from "./DropSpace";
import {v4} from "uuid";

export default function KanbanColumn(props: KanbanColumnProps) {

    const {id, title, cards} = props
    const [firstCardIndex, setFirstCardIndex] = useState<number>(0);
    const cardHeight = 152;
    const topSpacerHeight = firstCardIndex * cardHeight;
    const bottomSpacerHeight = (cards.length - (15 + firstCardIndex)) * cardHeight;

    const test = [...cards].slice(firstCardIndex,15 + firstCardIndex);
    const renderCards = () => {
        if (test.length > 0) {
            return (
                test.map((card) => {

                    return (
                        <div style={{overflowAnchor: 'none'}}>
                            <KanbanCard
                                key={v4()}
                                card={card}
                                />
                        </div>
                    )
                })
            )
        }
    }

    const generateCardsInColumn = () => {
        generateCards(100, id);
    }

    const onScroll = (event: any) => {
        const scrollHeight = event.currentTarget.scrollTop;
        const newIndex = Math.floor(scrollHeight / cardHeight)
        if (newIndex >= 95) {
            setFirstCardIndex(95);
        } else {
            if (newIndex >= 5 || newIndex < firstCardIndex) {
                setFirstCardIndex(newIndex);
            }
        }
        console.log(test.length)
    }

    const logCardIndex = () => {
        console.log(firstCardIndex)
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
                <RedoOutlined key={"generate!"} onClick={generateCardsInColumn}/>,
                <SearchOutlined key={"check"} onClick={logCardIndex}/>,
            ]}
        >
            <div className={'card-list'} style={{maxHeight: '800px', overflowY: 'auto', width: '100%'}} onScroll={(event) => onScroll(event)}>
                <div style={{height: (topSpacerHeight + bottomSpacerHeight + 15 * cardHeight) + 'px'}}>
                    <div style={{width: '100%', height: topSpacerHeight +'px'}} />
                    {renderCards()}
                    <div style={{width: '100%', height: bottomSpacerHeight - 150 +'px'}} />
                </div>
                <DropSpace height={300} key={'DropSpace' + id} columnId={id}/>
            </div>
        </Card>
    )
}