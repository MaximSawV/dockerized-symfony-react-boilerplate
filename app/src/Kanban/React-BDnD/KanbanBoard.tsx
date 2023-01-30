import React, {useState} from 'react';
import {Columns, findColumn} from "../lib/resources/columns";
import {Button, Card} from "antd";
import Title from "antd/lib/typography/Title";
import {AppstoreAddOutlined} from "@ant-design/icons";
import KanbanForm from "../React-DnD/KanbanForm";
import {KanbanCardProps, KanbanColumnProps} from "../lib/resources/kanbanProps";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import {Cards, findCard} from "../lib/resources/cards";
import {css} from "@emotion/css";
export default function KanbanBoard() {

    const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
    const [columns, setColumns] = useState<KanbanColumnProps[]>(Columns);
    const [cards, setCards] = useState<KanbanCardProps[]>(Cards)
    const toggleForm = () => {
        setFormIsOpen(!formIsOpen);
    }

    const renderColumn = (cards: KanbanCardProps[]) => {

        return (
            columns.map((column, index) => {
                cards.forEach((card) => {
                    if (card.columnId === column.id) {
                        column.cards.push(card);
                    }
                })

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

        const column: KanbanColumnProps|null = findColumn(source.droppableId);

        if (column) {
            const newCardIds: KanbanCardProps[] = column['cards'];
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggedCard);

            setCards([]);
            setCards(newCardIds);
        }

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
                    {renderColumn(cards)}
                </Card>
            </DragDropContext>
            {formIsOpen && (
                <KanbanForm toggleForm={toggleForm} columns={columns} setColumns={setColumns}/>
            )}
        </>
    )
}