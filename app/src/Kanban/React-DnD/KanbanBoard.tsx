import React, {useState} from 'react';
import {Button, Card} from "antd";
import {css} from "@emotion/css";
import KanbanColumn from "./KanbanColumn";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {AppstoreAddOutlined} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import KanbanForm from "./KanbanForm";
import {Columns} from "../lib/resources/columns";
import {KanbanCardProps, KanbanColumnProps} from "../lib/resources/kanbanProps";
interface KanbanBordProps {
    cards: KanbanCardProps[];
}
export default function KanbanBoard(props: KanbanBordProps) {

    const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
    const [columns, setColumns] = useState<KanbanColumnProps[]>(Columns);
    const toggleForm = () => {
        setFormIsOpen(!formIsOpen);
    }

    const renderColumn = (cards: KanbanCardProps[]) => {

        return (
            columns.map((column, index) => {

                let columnCards: KanbanCardProps[] = []

                cards.forEach((card) => {
                    if (card.columnId === column.id) {
                        columnCards.push(card);
                    }
                })

                return (
                    <KanbanColumn key={'column_'+index} id={column.id} title={column.title} cards={columnCards} />
                )
            })
        )
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Card
                    title={
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Title>Card 1</Title>
                            <Button onClick={toggleForm} size={'large'} style={{right: '3em', position: 'absolute'}} icon={<AppstoreAddOutlined/>}></Button>
                        </div>
                    }
                    className={css`height: calc(100% - 100px);`}
                    bodyStyle={{display: 'flex', flexDirection: 'row'}}
                >
                    {renderColumn(props.cards)}
                </Card>
            </DndProvider>
            {formIsOpen && (
                <KanbanForm toggleForm={toggleForm} columns={columns} setColumns={setColumns}/>
            )}
        </>
    )
}