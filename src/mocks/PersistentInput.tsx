import {useState, useEffect, ChangeEvent} from 'react';

export const PersistentInput = (props: {id: string}) => {
    const [value, setValue] = useState('');
    useEffect(() => {
        const persistedValue = localStorage.getItem(props.id);
        if (value !== null) {
            setValue(persistedValue);
        }
    }, [props.id, setValue]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        localStorage.setItem(props.id, e.target.value);
    };
    return (
        <input type="text" value={value} onChange={handleChange}/>
    );
};

