import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {Card} from "antd";
import {css} from "@emotion/css";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../index";
import {moveCard} from "./StateManager";
import KanbanCard, {DragItem, KanbanCardProps} from "./KanbanCard";
import update from 'immutability-helper'

export interface KanbanColumnProps {
    id: number;
    title: string;
    cards: KanbanCardProps[];
}
export default function KanbanColumn(props: KanbanColumnProps) {

    const { id, title, cards } = props

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (item: DragItem) => moveCard(item.id, id),
            collect: monitor => ({
                isOver: monitor.isOver(),
            }),
        }),
        [id]
    );

    const renderCards = () => {
        if (cards.length > 0) {
            return (
                <>
                    {cards.map((card, index) => {
                        return (
                            <KanbanCard
                                key={card.id + 'card'}
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                content={card.content}
                                columnId={id}
                                createdBy={card.createdBy}
                                assignedTo={card.assignedTo}
                            />
                        )
                    })}
                </>
            )
        }

        return (
            <></>
        )
    }

    return (
        <Card
            ref={drop}
            title={title}
            className={css`
              height: fit-content;
              width: fit-content;
              margin: 20px;
              background-color: rgba(175, 193, 199, 0.75);
            `}
            bodyStyle={{width: '350px',height: '1000px', maxHeight: '1000px', overflowY: 'auto'}}
        >
            {renderCards()}
            {isOver && (
                <div className={css`height: 50px; width: 300px; background: #6E6E6E; opacity: 0.5; border-radius: 20px`}></div>
            )}
        </Card>
    )
}