import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {PersonalInfo} from './PersonalInfo';
import {usePersonalInfo} from './usePersonalInfo';

jest.mock('./usePersonalInfo');

describe('PersonalInfo', () => {
    it('show data', () => {
        const personalData = {
            name: 'Alexey',
            surname: 'Tronov',
            birthdate: '26-08-1990',
        };
        jest.mocked(usePersonalInfo).mockReturnValue({
            isLoading: false,
            data: personalData,
        });
        render(<PersonalInfo />)
        expect(screen.getByTitle('name')).toHaveTextContent(personalData.name);
        expect(screen.getByTitle('surname')).toHaveTextContent(personalData.surname);
        expect(screen.getByTitle('birthdate')).toHaveTextContent(personalData.birthdate);
    });
});
