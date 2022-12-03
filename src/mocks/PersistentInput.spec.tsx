import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {PersistentInput} from './PersistentInput';

describe('PersistentInput', () => {
    it('restore value', async () => {
        const persistedId = String(jest.getSeed());
        const persistedValue = 'hi bro';
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(id => {
            return id === persistedId ? persistedValue : null
        });
        render(<PersistentInput id={persistedId} />);
        expect(await screen.findByDisplayValue(persistedValue)).toBeInTheDocument();
    });
});
