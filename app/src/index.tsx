import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import KanbanBoard from "./Kanban/React-BDnD/KanbanBoard";

export const ItemTypes = {
    CARD: 'card',
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);

// observe((initialCards: KanbanCardProps[]) => root.render(
//     <React.StrictMode>
//         <KanbanBoard cards={initialCards}/>
//     </React.StrictMode>
// ))

root.render(
    <KanbanBoard />
)