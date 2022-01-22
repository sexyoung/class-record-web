import { render, screen } from '@testing-library/react';
import UserEvent from "@testing-library/user-event";
import { RemoveRollCall } from '.';

it('should confirm be triggered', () => {
  const confirm = jest.fn();
  const { container, getByRole } = render(<RemoveRollCall confirm={confirm} />);
  UserEvent.click(getByRole('button'));
  expect(confirm.mock.calls.length).toBe(1);
  expect(container).toMatchSnapshot();
});

