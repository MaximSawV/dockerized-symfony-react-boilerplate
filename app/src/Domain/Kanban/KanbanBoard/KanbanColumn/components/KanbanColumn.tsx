import React from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {KanbanCardItem} from "../../lib/source";
import {css} from "@emotion/css";
import {Avatar, Card} from "antd";
import Meta from "antd/lib/card/Meta";

interface KanbanColumnProps {
    column: { items: KanbanCardItem[], name: string };
    columnId: string;

}

export default function KanbanColumn(props: KanbanColumnProps) {

    const {column, columnId} = props;

    return (
        <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
            key={columnId}
        >
            <p>{column.name}</p>
            <div style={{margin: 16}}>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={css`
                                  background: #c7d9e1;
                                  padding: 1em;
                                  width: 16em;
                                  min-height: 60em;
                                `}
                            >
                                {column.items.map((item, index) => {
                                    return (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided) => {
                                                return (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            userSelect: "none",
                                                            padding: 16,
                                                            margin: "0 0 8px 0",
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
                                                        <Card
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
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        </div>
    );
}