import React from 'react';
import {Card} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {css} from "@emotion/css";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../index";
import {KanbanCardProps} from "../lib/resources/kanbanProps";

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
                    <DeleteOutlined key={"edit"} onClick={props.onDelete}/>
                ]}
            >
            </Card>
        </>
    )
}