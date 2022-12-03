import '@testing-library/jest-dom';
import {renderHook, act, waitFor} from '@testing-library/react';
import {usePersonalInfo} from './usePersonalInfo';

describe('usePersonalInfo', () => {
    let oldFetch: typeof global.fetch;
    beforeAll(() => {
        oldFetch = global.fetch;
        global.fetch = jest.fn();
    })
    afterAll(() => {
        global.fetch = oldFetch;
    });

    it('use values from fetch response', async () => {
        const mockedData: ReturnType<typeof usePersonalInfo>['data'] = {
            name: 'Alexey',
            surname: 'Tronov',
            birthdate: '26-08-1990',
        };
        jest.spyOn(global, 'fetch')
            .mockResolvedValue({
            json: () => act(() => Promise.resolve(mockedData)),
        } as unknown as Response);
        const {result} = renderHook(() => usePersonalInfo());
        expect(result.current).toEqual(expect.objectContaining({isLoading: true}));
        await waitFor(() => {
            expect(result.current).toEqual(expect.objectContaining({isLoading: false, data: mockedData}))
        });
    });
});
