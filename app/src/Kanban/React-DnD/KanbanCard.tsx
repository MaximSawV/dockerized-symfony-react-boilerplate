import React, {useState} from 'react';
import {Avatar, Card, Tooltip} from "antd";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "../../index";
import {KanbanCardProps} from "../lib/resources/columns";
import {moveCard} from "./StateManager";
import {SearchOutlined, UserOutlined} from "@ant-design/icons";

interface KanbanCardViewProps {
    card: KanbanCardProps,
}
export default function KanbanCard(props: KanbanCardViewProps, ) {

    const {card} = props;
    const { Meta } = Card;

    const [hoveringCard, setHoveringCard] = useState<KanbanCardProps | null>(null);

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: card,
        // isDragging(monitor) {
        //     const item = monitor.getItem();
        //     setHoveringCard(item);
        //     return test === item.id;
        // },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: KanbanCardProps) => moveCard(item, card, item.columnId, card.columnId),
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
        }),
        [card]
    );

    const canDrop = () => {

        return !(hoveringCard && hoveringCard.id === card.id);
    }

    const logCard = () => {
        console.log(props);
    }

    return (
        <div ref={drop}>
            <Card
                style={{
                    backgroundColor: 'none',
                    opacity: (isOver && canDrop()) ? '0.3' : '0',
                    height: (isOver && canDrop()) ? '10em' : '0',
                    marginTop: (isOver && canDrop()) ? '1em' : '0',
                    marginBottom: (isOver && canDrop()) ? '1em' : '0',
                    transition: 'all 0.2s ease-out',
                    transitionProperty: 'height, color',
                    borderRadius: '0px',
                }}
            />
            <Card
                onDragStart={() => setHoveringCard(card)}
                ref={drag}
                key={'card' + card.id}
                style={{
                    minHeight: '150px',
                    maxHeight: '200px',
                    width: '300px',
                    opacity: isDragging ? 0.5 : 1,
                    borderRadius: '0px',
                }}
                actions={isDragging ? [] : [
                    <SearchOutlined onClick={logCard} />
                ]}
            >
                { !isDragging && (
                    <Meta
                        title={card.title}
                        description={'This is a card'}
                        avatar={
                            <Tooltip title={'name'}>
                                <Avatar
                                    style={{ backgroundColor: card.avatarColor}}
                                    size={'large'} icon={<UserOutlined />} />
                            </Tooltip>
                        }
                    />
                )}
            </Card>
        </div>
    )
}