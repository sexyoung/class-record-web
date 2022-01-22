import { render, screen } from '@testing-library/react';
import UserEvent from "@testing-library/user-event";
import { StatusChanger } from '.';

const student = {
  email: "hfjdjd@djdur.djd",
  expiresAt: "2022-02-13 15:04:51",
  id: 28,
  isExpired: false,
  lineId: null,
  name: "WALLET",
  phone: "0930123456",
  picture: "e52dfdb11ca1691e0e266f4e82a428a9.png",
  planTimes: 8,
  rollcalls: 1,
  status: "join",
  times: 7
};

it('should changeStatus be triggered', () => {
  const changeStatus = jest.fn();
  const { container, getByRole } = render(
    <StatusChanger
      status='dropout'
      student={student}
      changeStatus={changeStatus}
    />);
  UserEvent.click(getByRole('button'));
  expect(changeStatus.mock.calls.length).toBe(1);
  expect(container).toMatchSnapshot();
});

