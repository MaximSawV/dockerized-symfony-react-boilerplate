import React from 'react';
import {KanbanCardProps} from "../lib/resources/kanbanProps";
import {Draggable} from "react-beautiful-dnd";
import {DeleteOutlined} from "@ant-design/icons";
import {Card} from "antd";
import {css} from "@emotion/css";

export default function KanbanCard(props: KanbanCardProps) {

    const {id, title, index} = props;

    return (
        <>
            <Draggable draggableId={id} index={index!}>
                {(provided) => (
                    <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        title={title}
                        className={css`
                          width: 300px;
                          opacity: 1;
                          margin: 1em 0 1em 0;
                        `}
                        actions={[
                            <DeleteOutlined key={"edit"}
                                            // onClick={props.onDelete}
                            />
                        ]}
                    >
                    </Card>
                )}
            </Draggable>
        </>
    )
}