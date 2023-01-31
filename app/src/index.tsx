import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {observe} from "./Kanban/React-DnD/StateManager";
import {Columns, KanbanColumnProps} from "./Kanban/lib/resources/columns";
import DnDKanbanBoard from "./Kanban/React-DnD/DnDKanbanBoard";

export const ItemTypes = {
    CARD: 'card',
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);

observe( (data: KanbanColumnProps[]) => root.render(
    <React.StrictMode>
        <DnDKanbanBoard data={Columns} />
    </React.StrictMode>
))

// root.render(
//     <DnDKanbanBoard />
// )