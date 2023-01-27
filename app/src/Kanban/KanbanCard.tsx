import React, {ReactNode} from 'react';
import {Card} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {css} from "@emotion/css";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../index";
import {initialCards} from "./StateManager";

export interface KanbanCardProps {
    id: string,
    title: string,
    columnId: number,
    order: number,
}

export interface Avatar {
    name: string;
    acronym: string;
    color: string;
    icon?: ReactNode;

}

export interface DragItem {
    id: string,
    index: number
}

export default function KanbanCard(props: KanbanCardProps) {

    const {id, title} = props;

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {id: id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }));
    const postData = () => {
        initialCards.forEach((card) => {
            if (card.id === id) {
                console.log(card);
            }
        })
    }

    return (
        <>
            <Card
                title={title}
                ref={drag}
                className={css`
              width: 300px;
              opacity: ${isDragging ? 0.5 : 1};
              margin: 1em 0 1em 0;
            `}
                actions={[
                    <EditOutlined key={"edit"} onClick={postData}/>
                ]}
            >
            </Card>
        </>
    )
}