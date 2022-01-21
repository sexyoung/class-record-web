import { render, screen } from '@testing-library/react';
import UserEvent from "@testing-library/user-event";
import { Deposit } from '.';

const postDeposit = (({ planId, studentId, date }) =>
  Promise.resolve({})
);

const planList = [{
  createdAt: "2021-10-28 22:29:12",
  expiresDays: 56,
  id: 2,
  isActive: true,
  money: 2000,
  name: "五堂套票",
  teacherId: 1,
  times: 5,
  updatedAt: "2021-10-28 22:29:12"
},
{
  createdAt: "2021-10-28 22:29:12",
  expiresDays: 84,
  id: 3,
  isActive: true,
  money: 2400,
  name: "八堂套票",
  teacherId: 1,
  times: 8,
  updatedAt: "2021-10-28 22:29:12"
}];

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

jest.mock('api', () =>  {
  return { postDeposit };
});

it('should onSubmit be triggered', () => {
  const { getByTestId, getByRole } = render(<Deposit
    planList={planList}
    student={student}
    closeModal={() => {}}
    depositDone={() => {}}
  />);

  UserEvent.type(getByTestId('2'), '2');
  UserEvent.type(getByTestId('date'), '2022-01-02');
  UserEvent.click(getByRole('button'));

  expect(getByTestId('2').value).toBe('2');
  expect(getByTestId('date').value).toBe('2022-01-02');
});

