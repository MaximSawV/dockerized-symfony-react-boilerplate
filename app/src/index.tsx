import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChessBoard from "./tutorial/ChessBoard";
import {observe} from "./tutorial/Game";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const ItemTypes = {
    KNIGHT: 'knight'
}

observe((knightPosition: [x: number, y: number]) =>
    root.render(
        <ChessBoard knightPosition={knightPosition} />
    )
);
