import React, {ReactNode} from 'react';
import {Avatar, Card, Tooltip} from "antd";
import Meta from "antd/lib/card/Meta";
import {AppstoreAddOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {css} from "@emotion/css";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../index";
import {initialCards} from "./StateManager";

export interface KanbanCardProps {
    id: number,
    title: string,
    description: string,
    content: string,
    columnId: number,
    containerId: number,
    createdBy: Avatar,
    assignedTo: Avatar[],
}

export interface Avatar {
    name: string;
    acronym: string;
    color: string;
    icon?: ReactNode;

}

export interface DragItem {
    id: number,
    index: number
}

export default function KanbanCard(props: KanbanCardProps) {

    const {id, title, description, content, createdBy, assignedTo} = props;

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {id: id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }))

    const renderAvatar = (avatar: Avatar, creator: boolean, index?: number) => {
        return (
            <Tooltip key={index ? index + 'user' : null} title={avatar.name} placement={'top'}>
                <Avatar
                    size={creator ? 'large' : 'small'}
                    shape={creator ? 'circle' : 'square'}
                    style={{backgroundColor: avatar.color}}
                    icon={avatar.icon}
                >{avatar.icon ? null : avatar.acronym}</Avatar>
            </Tooltip>
        )
    }

    const postData = (test: any) => {
        initialCards.forEach((card) => {
            if (card.id === id) {
                console.log(card);
            }
        })
    }


    return (
        <Card
            ref={drag}
            className={css`
              width: 300px;
              opacity: ${isDragging ? 0.5 : 1};
            `}
            actions={isDragging ? [] : [
                <AppstoreAddOutlined key={"add"}/>,
                <DeleteOutlined key={"delete"}/>,
                <EditOutlined key={"edit"} onClick={postData}/>
            ]}
        >
            {!isDragging && (
                <>
                    <Meta
                        title={title}
                        description={description}
                        avatar={
                            renderAvatar(createdBy, true)
                        }/>
                    <p>{content}</p>
                    <hr/>
                    {assignedTo && (
                        <div>
                            <p>Assigned to:</p>
                            <Avatar.Group
                                maxCount={2}
                                maxPopoverTrigger="click"
                                size="small"
                                maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer'}}
                            >
                                {assignedTo.map((user, index) => {
                                    return renderAvatar(user, false, index);
                                })}
                            </Avatar.Group>
                        </div>
                    )}
                </>
            )}
        </Card>
    )
}