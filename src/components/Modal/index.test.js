import { render, screen } from '@testing-library/react';
import UserEvent from "@testing-library/user-event";
import { Modal } from '.';

it('should onClose be triggered', () => {
  const onClose = jest.fn();
  const { container, getByTestId } = render(<Modal onClose={onClose} />);
  UserEvent.click(getByTestId('modalBG'));
  expect(onClose.mock.calls.length).toBe(1);
  expect(container).toMatchSnapshot();
});

it('should have children', () => {
  const onClose = jest.fn();
  const { container } = render(<Modal onClose={onClose}><div>test</div></Modal>);
  expect(container).toHaveTextContent('test');
});

