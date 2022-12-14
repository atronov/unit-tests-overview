import {MouseEvent} from 'react';

type Props = {
    onClick: () => void,
};
export const IsolatedButton = function (props: Props) {
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        props.onClick();
    };
    return (
        <button onClick={handleClick}>Click me</button>
    );
};
