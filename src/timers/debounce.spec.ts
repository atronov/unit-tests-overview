import {debounce} from './debounce';
import { wait } from './wait';

describe.skip('debounce', () => {
    // more then 3000ms
    it('calls callback once after timeout', async () => {
        const cb = jest.fn();
        const timeout = 3000;
        const f = debounce(cb, timeout);
        f();
        await wait(timeout - 100);
        expect(cb).not.toBeCalled();
        await wait(200);
        expect(cb).toBeCalledTimes(1);
    });
});

describe.skip('debounce with fake timers', () => {
    // we don't need real timer
    beforeEach(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        // wait for all pending timers
        jest.runOnlyPendingTimers()
        jest.useRealTimers();
    });

    // now this test is sync
    // timespent – 5ms
    it('calls callback once after fake-timeout', () => {
        const cb = jest.fn();
        const timeout = 3000;
        const f = debounce(cb, timeout);
        f();
        jest.advanceTimersByTime(timeout - 100);
        expect(cb).not.toBeCalled();
        jest.advanceTimersByTime(200);
        expect(cb).toBeCalledTimes(1);
    });
});

describe('debounce with promisified wait', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('test fails with timeout cause of Promises', async () => {
        const cb = jest.fn();
        const timeout = 3000;
        const f = debounce(cb, timeout);
        f();
        // oops, test fails with timeout here
        await wait(timeout - 100);
        expect(cb).toBeCalledTimes(1);
    });
});
