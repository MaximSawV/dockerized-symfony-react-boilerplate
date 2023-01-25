import React from 'react';
import {useDrag} from "react-dnd";
import {ItemTypes} from "../index";

export default function Knight() {

    const [, drag] = useDrag(() => ({
        type: ItemTypes.KNIGHT
    }))

    return (
        <div
            ref={drag}
            style={{
                width: 'fit-content',
                height: 'fit-content',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5em',
                cursor: 'move',
            }}
        >
            ♘
        </div>
    )
}