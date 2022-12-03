import {render, fireEvent, screen} from '@testing-library/react';
import {IsolatedButton} from './IsolatedButton';

describe('IsolatedButton', () => {
    it('stops propagation & prevent default', () => {
        jest.spyOn(MouseEvent.prototype, 'stopPropagation');
        jest.spyOn(MouseEvent.prototype, 'preventDefault');
        const onClick = jest.fn();
        render(<IsolatedButton onClick={onClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(MouseEvent.prototype.preventDefault).toBeCalled();
        expect(MouseEvent.prototype.stopPropagation).toBeCalled();
    });
});
