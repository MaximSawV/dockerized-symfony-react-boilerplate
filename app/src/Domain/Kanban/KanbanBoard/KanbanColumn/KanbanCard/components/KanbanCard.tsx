import React from 'react';
import {useDrag} from "react-dnd";
import {Avatar, Card} from "antd";
import Meta from "antd/lib/card/Meta";
import {KanbanCardItem} from "../../../lib/source";
import {css} from "@emotion/css";
import {ItemTypes} from "../../../components/KanbanBoard";

interface KanbanCardProps {
    item: KanbanCardItem
}
export default function KanbanCard(props: KanbanCardProps) {

    const {item} = props

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: ItemTypes.CARD,
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <Card
            ref={drag}
            size={"small"} key={item.id}
            actions={item.participants.map((participant) => {
                return (
                    <Avatar
                        className={css`background-color: ${participant.color}`}>
                        {participant.name}
                    </Avatar>
                );
            })}
        >
            <Meta
                avatar={
                    <Avatar className={css`background: ${item.createdBy.color}`}>
                        {item.createdBy.name}
                    </Avatar> }
                title={item.title}
            />
            <p>{item.description}</p>
        </Card>
    );
}