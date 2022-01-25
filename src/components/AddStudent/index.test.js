import { render, screen } from '@testing-library/react';
import UserEvent from "@testing-library/user-event";
import { AddStudent } from '.';

const addStudent = (({ name, planId, date }) =>
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

jest.mock('api', () =>  {
  return { addStudent };
});

it('should onSubmit be triggered', () => {
  const { getByTestId, getByRole } = render(<AddStudent
    planList={planList}
    closeModal={() => {}}
    addStudentDone={() => {}}
  />);

  UserEvent.type(getByTestId('name'), 'Kelly');
  UserEvent.type(getByTestId('2'), '2');
  UserEvent.type(getByTestId('date'), '2022-01-02');
  UserEvent.click(getByRole('button'));

  expect(getByTestId('name').value).toBe('Kelly');
  expect(getByTestId('2').value).toBe('2');
  expect(getByTestId('date').value).toBe('2022-01-02');
});


