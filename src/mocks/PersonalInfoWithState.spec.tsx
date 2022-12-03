import '@testing-library/jest-dom';
import {render, screen, act} from '@testing-library/react';
import {useState} from 'react';
import {PersonalInfo} from './PersonalInfo';
import {usePersonalInfo} from './usePersonalInfo';

jest.mock('./usePersonalInfo');

describe('PersonalInfo', () => {
    it('loading than show data', () => {
        const personalData = {
            name: 'Alexey',
            surname: 'Tronov',
            birthdate: '26-08-1990',
        };
        let triggerLoaded: Function;
        jest.mocked(usePersonalInfo).mockImplementation(() => {
            const [isLoading, setLoading] = useState(true);
            triggerLoaded = () => setLoading(false);
            if (isLoading) {
                return {
                    isLoading: true,
                    data: undefined,
                };
            }
            return {
                isLoading: false,
                data: personalData
            };
        });
        render(<PersonalInfo />);
        expect(screen.getByTitle('loading')).toBeInTheDocument();
        expect(screen.queryByTitle('name')).not.toBeInTheDocument();
        act(() => triggerLoaded());
        expect(screen.getByTitle('name')).toHaveTextContent(personalData.name);
    });
});
