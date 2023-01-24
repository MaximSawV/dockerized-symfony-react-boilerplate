import React, {ReactNode} from 'react'

interface SquareProps {
    black: boolean;
    children: ReactNode;
}
export default function Square(props: SquareProps) {

    const { black, children } = props;

    const fill = black ? 'black' : 'white'
    const stroke = black ? 'white' : 'black'

    return (
        <div
            style={{
                backgroundColor: fill,
                color: stroke,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </div>
    )
}