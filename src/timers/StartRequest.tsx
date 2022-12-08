import {useState} from 'react';
import {wait} from './wait';

export const StartRequest = ({request}: {request: () => Promise<string>}) => {
    const [result, setResult] = useState<string | undefined>(undefined);
    const [counter, setCounter] = useState<number | undefined>(undefined);
    const onClick = async () => {
        for (let i of [3, 2, 1]) {
            setCounter(i);
            await wait(1000);
        }
        setCounter(0);
        const result = await request();
        setResult(result);
    };
    return (
        <div>
            <button onClick={onClick}>Go</button>
            <span>{counter !== undefined ?`Request in ${counter} sec` : ''}</span>
            <span>{result !== undefined ? 'Result ' + result : ''}</span>
        </div>
    );
};
