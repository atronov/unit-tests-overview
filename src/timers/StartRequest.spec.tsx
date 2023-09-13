import '@testing-library/jest-dom';
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import {StartRequest} from './StartRequest';
import {wait} from './wait';
import React from 'react';

describe('StartRequest', () => {
    jest.useFakeTimers();

    const request = jest.fn().mockImplementation(async () => {
        await wait(500);
        return 'success';
    });

    it.skip('tick from 3 to 2 - fake timers do not work', async () => {
        render(<StartRequest request={request} />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Request in 3 sec')).toBeInTheDocument();
        await act(() => jest.advanceTimersByTime(1000));
        expect(screen.getByText('Request in 2 sec')).toBeInTheDocument();
    });

    it.skip('tick from 3 to 2', async () => {
        render(<StartRequest request={request} />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Request in 3 sec')).toBeInTheDocument();
        jest.advanceTimersByTime(1000);
        await act(() => Promise.resolve());
        expect(screen.getByText('Request in 2 sec')).toBeInTheDocument();
    });

    function flushPromise() {
        return new Promise(jest.requireActual("timers").setImmediate);
    }

    it.skip('wait until request succeed - fails with single flush promise', async () => {
        render(<StartRequest request={request} />);
        fireEvent.click(screen.getByRole('button'));
        await act(() => jest.advanceTimersByTimeAsync(3500));
        // we still see 'Request in 2 sec'
        expect(screen.getByText('Result success')).toBeInTheDocument();
    });

    it.skip('wait until request succeed - wait all ticks', async () => {
        render(<StartRequest request={request} />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Request in 3 sec')).toBeInTheDocument();

        for (let i of [1,2,3]) {
            jest.advanceTimersByTime(1000);
            await act(() => Promise.resolve());
        }
        jest.advanceTimersByTime(500);
        await act(() => Promise.resolve());

        expect(screen.getByText('Result success')).toBeInTheDocument();
    });

    
});
