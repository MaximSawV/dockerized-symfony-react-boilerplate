import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import KanbanBoard from "./Kanban/KanbanBoard";
import {observe} from "./Kanban/StateManager";
import {KanbanCardProps} from "./Kanban/KanbanCard";


const rootChess = ReactDOM.createRoot(
  document.getElementById('rootChess') as HTMLElement
);

export const ItemTypes = {
    KNIGHT: 'knight',
    CARD: 'card',
}

// observe((knightPosition: [x: number, y: number]) =>
//     rootChess.render(
//         <ChessBoard knightPosition={knightPosition} />
//     )
// );

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);

observe((initialCards: KanbanCardProps[]) => root.render(
    <React.StrictMode>
        <KanbanBoard cards={initialCards}/>
    </React.StrictMode>
))