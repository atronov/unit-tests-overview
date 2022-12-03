import {render, fireEvent, screen} from '@testing-library/react';
import copy from 'copy-to-clipboard';
import {CopyInput} from './CopyInput';

jest.mock('copy-to-clipboard');

describe('CopyInput', () => {
    it('copy value', () => {
        const someValue = 'abcdef';
        render(<CopyInput />);
        fireEvent.change(screen.getByRole('textbox'), {target: {value: someValue}});
        fireEvent.click(screen.getByRole('button'));
        expect(copy).toBeCalledWith(someValue);
    });
});
