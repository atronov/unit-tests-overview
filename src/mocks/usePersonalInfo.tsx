import {useReducer, useEffect} from 'react';

type State = {
    isLoading: boolean,
    data?: {
        name: string,
        surname: string,
        birthdate: string,
    },
};

export const usePersonalInfo = (): State => {
    type Action = Partial<State>;
    const [state, dispatch] = useReducer(
        (state: State, action: Action) => ({...state, ...action}),
        {isLoading: true, data: undefined},
    );
    useEffect(() => {
        fetch('/personal', {credentials: 'include'})
            .then(resp => resp.json())
            .then((data: State['data']) => dispatch({data, isLoading: false}));
    });
    return state;
};
