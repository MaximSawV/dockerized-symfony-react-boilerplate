import React from 'react';
import Knight from "./Knight";
import {canMoveKnight, moveKnight} from "./Game";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BoardSquare from "./BoardSquare";

interface BoardProps {
    knightPosition: [x: number, y: number];
}

function handleSquareClick(toX: number, toY: number) {
    if (canMoveKnight(toX, toY)) {
        moveKnight(toX, toY)
    }
}

function renderPiece(x: number, y: number, [knightX, knightY]: number[]) {
    if (x === knightX && y === knightY) {
        return <Knight />
    }
}
export default function ChessBoard(props: BoardProps) {

    const { knightPosition } = props;

    function renderSquare(i: number, [knightX, knightY]: [x: number, y: number]) {
        const x = i % 8
        const y = Math.floor(i / 8)
        const black = (x + y) % 2 === 1
        const isKnightHere = knightX === x && knightY === y
        const piece = isKnightHere ? <Knight /> : null

        return (
            <div onClick={() => handleSquareClick(x, y)} key={i} style={{ width: '12.5%', height: '12.5%' }}>
                <BoardSquare x={x} y={y}>
                    {renderPiece(x, y, knightPosition)}
                </BoardSquare>
            </div>
        )
    }

    const squares = [];

    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition))
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    width: '1000px',
                    height: '1000px',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {squares}
            </div>
        </DndProvider>
    )
}