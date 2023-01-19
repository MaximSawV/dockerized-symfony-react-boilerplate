import React from 'react';
import {KanbanCardItem} from "../../lib/source";
import {css} from "@emotion/css";
import KanbanCard from "../KanbanCard/components/KanbanCard";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../components/KanbanBoard";

interface KanbanColumnProps {
    column: { items: KanbanCardItem[], name: string };
    id: string
}

export default function KanbanColumn(props: KanbanColumnProps) {

    const {column, id} = props;

    const [collectedProps, drop] = useDrop(() => ({
        accept: ItemTypes.CARD
    }))

    return (
        <div
            key={id}
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
        >
            <p>{column.name}</p>
            <div style={{margin: 16}}>
                <div
                    className={css`
                      background: #c7d9e1;
                      padding: 1em;
                      width: 16em;
                      min-height: 60em;
                    `}
                >
                    <div
                        ref={drop}
                        style={{
                            userSelect: "none",
                        }}
                    >
                        {column.items.map((item, index) => {
                            return (
                                <KanbanCard item={item} key={item.id}/>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}