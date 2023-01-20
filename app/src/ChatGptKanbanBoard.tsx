import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { Column, Task } from './models';
import {HTML5Backend} from "react-dnd-html5-backend";

interface Props {}

const KanbanBoard: React.FC<Props> = () => {
    const [columns, setColumns] = useState<Column[]>([
        { name: 'To Do', tasks: ['Task 1', 'Task 2'] },
        { name: 'In Progress', tasks: ['Task 3'] },
        { name: 'Done', tasks: ['Task 4'] },
    ]);

    const moveTask = (dragIndex: Task, hoverIndex: Task) => {
        const draggedTask = columns[dragIndex.columnIndex].tasks[dragIndex.taskIndex];
        const newColumns = columns.map((column, columnIndex) => {
            if (columnIndex === dragIndex.columnIndex) {
                return {
                    ...column,
                    tasks: column.tasks.filter((task, taskIndex) => taskIndex !== dragIndex.taskIndex)
                }
            } else if (columnIndex === hoverIndex.columnIndex) {
                return {
                    ...column,
                    tasks: [...column.tasks, draggedTask]
                }
            }
            return column;
        });
        setColumns(newColumns);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {columns.map((column, columnIndex) => (
                    <Column
                        key={column.name}
                        column={column}
                        columnIndex={columnIndex}
                        moveTask={moveTask}
                    />
                ))}
            </div>
        </DndProvider>
    );
}

export default KanbanBoard;
