import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button, Card, Form, Input, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {v4} from "uuid";
import {addCard} from "./StateManager";
import {KanbanCardProps, KanbanColumnProps} from "../lib/resources/columns";

interface KanbanFormProps {
    toggleForm: () => void;
    columns: KanbanColumnProps[];
    setColumns: Dispatch<SetStateAction<KanbanColumnProps[]>>;
}

export default function KanbanForm(props: KanbanFormProps) {

    const {toggleForm, columns, setColumns} = props;

    const [formType, setFormType] = useState<string|null>('card');

    const [formCard] = Form.useForm();
    const [formColumn] = Form.useForm();

    const {Option} = Select;

    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 16},
    };

    const tailLayout = {
        wrapperCol: {offset: 4, span: 16},
    };

    const onFinishCard = (values: { column: string, title: string }) => {
        let newCard: KanbanCardProps = {
            id: v4(),
            title: values.title,
            columnId: values.column,
            avatarColor: '#'+(0x1000000+Math.random()*0xffffff).toString(16).slice(0,6),
        }
        addCard(newCard, values.column);
        formCard.resetFields();
    };

    const onFinishColumn = (values: { position: string, title: string }) => {

        let newColumn: KanbanColumnProps = {
            id: v4(),
            title: values.title,
            cards: [],
        }

        if (values.position === 'first') {
            columns.splice(0, 0, newColumn);
        }

        if (values.position === 'last') {
            columns.push(newColumn);
        }

        if (values.position !== 'first' && values.position !== 'last') {

            let firstColumn: KanbanColumnProps|null = null;
            let secondColumn: KanbanColumnProps|null = null;

            columns.forEach((column) => {
                if(values.position.slice(0, values.position.indexOf('-')) === column.title) {
                    firstColumn = column;
                }

                if(values.position.slice(values.position.indexOf('-') + 1) === column.title) {
                    secondColumn = column;
                }
            })

            if (firstColumn && secondColumn) {
                columns.splice(columns.indexOf(firstColumn)+1, 0, newColumn);
            }
        }

        setColumns(columns);
        formCard.resetFields();
        toggleForm();
    };

    const onSelect = (value: string) => {
        setFormType(value);
    }

    return (
        <Card
            style={{
                width: 'fit-content',
                minWidth: '500px',
                position: 'fixed',
                top: '12.9%',
                right: '30%'
            }}
            title={
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Select style={{width: '100px'}} defaultValue={'card'} onChange={value => onSelect(value)}>
                        <Option style={{width: '100%'}} value={'card'}>Card</Option>
                        <Option style={{width: '100%'}} value={'column'}>Column </Option>
                    </Select>
                    <Button danger onClick={toggleForm} size={'small'} shape={'circle'}
                            style={{right: '1em', position: 'absolute'}} icon={<CloseOutlined/>}></Button>
                </div>
            }
        >
            {formType === 'card' && (
                <Form {...layout} onFinish={onFinishCard} form={formCard}>
                    <Form.Item name="column" label="Column" rules={[{required: true}]}>
                        <Select
                            placeholder="Select Column to add the Card to"
                            allowClear
                        >
                            {columns.map((column, index) => {
                                return (
                                    <Option key={index} value={column.id}>{column.title}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'title'} label={'Title'} rules={[{required: true}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Add Card
                        </Button>
                    </Form.Item>
                </Form>
            )}
            {formType === 'column' && (
                <Form {...layout} form={formColumn} onFinish={onFinishColumn}>
                    <Form.Item name="position" label="Position" rules={[{required: true}]}>
                        <Select
                            placeholder="Select Column to add the Card to"
                            allowClear
                        >
                            <Option key={'first'}>First</Option>
                            {columns.map((column, index) => {
                                if (index < columns.length - 1) {
                                    return (
                                        <Option
                                            key={index}
                                            value={column.title + '-' + columns[index+1].title}
                                        >
                                            Between {column.title} and {columns[index+1].title}
                                        </Option>
                                    )
                                }
                            })}
                            <Option key={'last'}>Last</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'title'} label={'Title'} rules={[{required: true}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Add Column
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Card>
    )
}