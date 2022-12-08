import '@testing-library/jest-dom';
import {render, screen, fireEvent, act} from '@testing-library/react';
import {StartRequest} from './StartRequest';
import {wait} from './wait';
import FakeTimers from '@sinonjs/fake-timers';

describe('StartRequest', () => {

    const clock = FakeTimers.install();

    const request = jest.fn().mockImplementation(async () => {
        await wait(500);
        return 'success';
    });

    it('wait until request succeed - @sinonjs/fake-timers', async () => {
        render(<StartRequest request={request} />);
        fireEvent.click(screen.getByRole('button'));
        await act(() => clock.tickAsync(3500));
        expect(screen.getByText('Result success')).toBeInTheDocument();
    });
});
