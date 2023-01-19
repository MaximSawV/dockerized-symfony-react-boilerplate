import {v4 as uuidv4} from 'uuid';


interface AvatarIconProps {
    color: string;
    name: string
}
export interface KanbanCardItem {
    id: string,
    title: string,
    description: string,
    participants: AvatarIconProps[]

    createdBy: AvatarIconProps;
    column: string,
}

export interface KanbanColumnItem {
    [id: string]: {
        name: string,
        items: KanbanCardItem[],
    }
}

export const cards: KanbanCardItem[] = [
    {
        id: uuidv4(),
        title: "Task 1",
        description: "First Task made",
        participants: [
            {
                color: '#c7d9e1',
                name: 'MS'
            }
        ],
        createdBy: {
            color: '#e8a400',
            name: 'ADMIN'
        },
        column: '0'
    },
    {
        id: uuidv4(),
        title: "Task 2",
        description: "Second Task made",
        participants: [
            {
                color: '#bd97f8',
                name: 'AS'
            }
        ],
        createdBy: {
            color: '#e8a400',
            name: 'ADMIN'
        },
        column: '0'
    },
    {
        id: uuidv4(),
        title: "Task 3",
        description: "Third Task made",
        participants: [
            {
                color: '#1977e2',
                name: 'DF'
            }
        ],
        createdBy: {
            color: '#e8a400',
            name: 'ADMIN'
        },
        column: '0'
    },
];

export const columnsFromBackend: KanbanColumnItem = {
    ["0"]: {
        name: "Requested",
        items: []
    },
    ["1"]: {
        name: "To do",
        items: []
    },
    ["2"]: {
        name: "In Progress",
        items: []
    },
    ["3"]: {
        name: "Done",
        items: []
    }
};