import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {DummyElement} from './DummyElement';
import {getCurrentDate} from './fakeHelpers';

type ModuleType = typeof import('./fakeHelpers')
jest.mock<ModuleType>('./fakeHelpers', () => {
    const realModule = jest.requireActual<ModuleType>('./fakeHelpers');
    const mockModule = jest.createMockFromModule<ModuleType>('./fakeHelpers');
    return {
        __esModule: true, // tell that is ES6 module
        ...mockModule, // copy all items from mock module
        getFormatDate: realModule.getFormatDate, // pick one real function
        getRandItem: jest.fn(array => array[0]), // and custom mock implementation for one func
    };
});

describe('DummyElement', () => {
    it('render with right data', () => {
        // getCurrentDate is mocked automatically, so it returns undefined
        // configure it to show predictable date
        jest.mocked(getCurrentDate).mockReturnValue(new Date('2019-08-11'));
        render(<DummyElement items={['jogging', 'cycling']} />);
        expect(screen.getByText(/8\/11\/2019.*jogging/)).toBeInTheDocument();
    });
})
