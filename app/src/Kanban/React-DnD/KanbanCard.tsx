import React from 'react';
import {Card} from "antd";
import {css} from "@emotion/css";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "../../index";
import {KanbanCardProps} from "../lib/resources/columns";
import {moveCard} from "./StateManager";

export default function KanbanCard(props: KanbanCardProps) {

    const {id, title} = props;

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: props,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()

        }),
    }));

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
            drop: (item: KanbanCardProps) => moveCard(item, props, item.columnId, props.columnId),
        }),
        [id]
    );

    return (
        <div ref={drop}
        >
            <Card style={{display: isOver ? 'block' : 'none', opacity: 0.3, marginBottom: '1em'}} />
            <Card
                ref={drag}
                key={'card' + id}
                title={title}
                className={css`
                  width: 300px;
                  opacity: ${isDragging ? 0.5 : 1};
                  margin-bottom: ${isOver ? '0' : '2em'};
                `}/>
        </div>
    )
}