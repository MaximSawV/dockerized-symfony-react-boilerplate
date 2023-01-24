import React, {ReactNode} from 'react';
import Square from "./Square";
import {useDrop} from "react-dnd";
import {canMoveKnight, moveKnight} from "./Game";
import {ItemTypes} from "../index";

export interface BoardSquareProps {
    x: number;
    y: number;
    children: ReactNode;
}

export default function BoardSquare(props: BoardSquareProps) {

    const {x, y, children} = props;

    const black = (x + y) % 2 === 1

    const [{isOver, canDrop}, drop] = useDrop(
        () => ({
            accept: ItemTypes.KNIGHT,
            drop: () => moveKnight(x, y),
            canDrop: () => canMoveKnight(x, y),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        }),
        [x, y]
    );

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}
        >
            <Square black={black}>{children}</Square>
        </div>
    )
}