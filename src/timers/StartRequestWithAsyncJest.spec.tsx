import '@testing-library/jest-dom';
import {render, screen, fireEvent, act} from '@testing-library/react';
import {StartRequest} from './StartRequest';
import {wait} from './wait';
import React from 'react';

describe('StartRequest', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    })

    const request = jest.fn().mockImplementation(async () => {
        await wait(500);
        return 'success';
    });

    it('wait until request succeed - @sinonjs/fake-timers', async () => {
        render(<StartRequest request={request} />);
        fireEvent.click(screen.getByRole('button'));
        await act(() => jest.advanceTimersByTimeAsync(3500));
        expect(screen.getByText('Result success')).toBeInTheDocument();
    });
});
