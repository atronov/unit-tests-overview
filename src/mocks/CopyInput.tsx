import copy from 'copy-to-clipboard';
import {useState} from 'react';

export const CopyInput = () => {
    const [value, setValue] = useState('');
    return (
        <div>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => copy(value)}>Copy value</button>
        </div>
    )
};
