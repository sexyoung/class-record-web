import { render, cleanup, getByText } from '@testing-library/react';
import UserEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from '.';

afterEach(cleanup);


it('should first', () => {
  const { container } = render(<BrowserRouter><HomePage /></BrowserRouter>);
  expect(container).toHaveTextContent('上課點點名');
  expect(container).toHaveTextContent('老師註冊');
  expect(container).toHaveTextContent('已註冊');
  expect(container).toHaveTextContent('點此登入');
  expect(container).toHaveTextContent('掌握學生出席狀況');
  expect(container).toHaveTextContent('終生免費');
  expect(container).toHaveTextContent('職人推薦');
  expect(container).toMatchSnapshot();
});

// it('should go to sign-up page', () => {
//   const { container, getByText } = render(<BrowserRouter><HomePage /></BrowserRouter>);
//   UserEvent.click(getByText('老師註冊'));
//   expect(container).toHaveTextContent('已有帳號');
// });
