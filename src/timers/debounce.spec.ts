import {debounce} from './debounce';

// async обёртка над setTimeout для красивого теста
const wait = (mils: number) => new Promise((resolve) => setTimeout(resolve, mils));

describe('debounce', () => {
    // Этот тест идёт больше 3000ms
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

describe('debounce with fake timers', () => {
    // нам не нужны реальны таймауты, будем перемещаться на "машине времени"
    beforeEach(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        // после теста дожидаемся незавершённых и возвращаем реальные таймеры
        jest.runOnlyPendingTimers()
        jest.useRealTimers();
    });

    // тест теперь не асинхронный
    // и работает 5ms
    it('calls callback once after timeout', () => {
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
