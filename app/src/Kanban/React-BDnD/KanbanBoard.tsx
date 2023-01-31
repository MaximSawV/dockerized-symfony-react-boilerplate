import React, {useState} from 'react';
import {Columns, findCard, KanbanColumnProps} from "../lib/resources/columns";
import {Button, Card} from "antd";
import Title from "antd/lib/typography/Title";
import {AppstoreAddOutlined} from "@ant-design/icons";
import KanbanForm from "../React-DnD/KanbanForm";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import {css} from "@emotion/css";
export default function KanbanBoard() {

    const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
    const [columns, setColumns] = useState<KanbanColumnProps[]>(Columns);
    const toggleForm = () => {
        setFormIsOpen(!formIsOpen);
    }

    const renderColumn = () => {

        return (
            columns.map((column, index) => {

                return (
                    <KanbanColumn key={'column_'+index} id={column.id} title={column.title} cards={column.cards} />
                )

            })
        )
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        const draggedCard = findCard(draggableId);

        if (!draggedCard) return;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        for (const column of columns) {
            if (column.id === source.droppableId) {
                column.cards.splice(source.index, 1);
            }

            if (column.id === destination.droppableId) {
                column.cards.splice(destination.index, 0, draggedCard);
            }
        }

        setColumns(columns);
    }

    return (
        <>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result)}>
                <Card
                    title={
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Title>React Beautiful DnD</Title>
                            <Button onClick={toggleForm} size={'large'} style={{right: '3em', position: 'absolute'}} icon={<AppstoreAddOutlined/>}></Button>
                        </div>
                    }
                    className={css`height: calc(100% - 100px);`}
                    bodyStyle={{display: 'flex', flexDirection: 'row'}}
                >
                    {renderColumn()}
                </Card>
            </DragDropContext>
            {formIsOpen && (
                <KanbanForm toggleForm={toggleForm} columns={columns} setColumns={setColumns}/>
            )}
        </>
    )
}