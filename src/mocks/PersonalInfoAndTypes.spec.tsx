import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {PersonalInfo} from './PersonalInfo';
import {usePersonalInfo} from './usePersonalInfo';

jest.mock('./usePersonalInfo');

describe('PersonalInfo', () => {
    it('show data and types', () => {
        const personalData = {
            name: 'Alexey', surname: 'Tronov', birthdate: '26-08-1990',
        };
        const mockReturnData = { data: personalData, isLoading: false };
        // now TypeScript don't know that we can call mockReturnValue for usePersonalInfo
        // we can tell about it with default cast approach
        (usePersonalInfo as jest.Mock<ReturnType<typeof usePersonalInfo>>).mockReturnValue(mockReturnData);
        // better to use jest.mocked helper
        jest.mocked(usePersonalInfo).mockReturnValue(mockReturnData);
        render(<PersonalInfo />)
        expect(screen.getByTitle('name')).toHaveTextContent(personalData.name);
    });
});
