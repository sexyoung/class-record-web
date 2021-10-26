import { fetchApi } from "utils";

const { REACT_APP_API_DOMAIN: API } = process.env;

export enum Query {
  Join = 'join',
  Dropout = 'dropout',
  Current = 'current',
  Zero = 'zero',
  Debts = 'debts',
}

const getAPI = () => {
  return API;
};

type LoginParams = {
  email: string;
  password: string
}

type SignUpParams = {
  name: string;
  passwordConfirm: string
} & LoginParams;

// 老師註冊
export const postSignUp = (body: SignUpParams) => {
  return fetchApi(`${getAPI()}/sign-up`, {
    method: "post",
    withToken: false,
    body,
  });
};

// 老師登入
export const postLogin = (body: LoginParams) =>
  fetchApi(`${getAPI()}/login`, {
    method: "post",
    withToken: false,
    body,
  });

// 老師資訊
export const getTeacherInfo = () => fetchApi(`${getAPI()}/me`);

// 信箱認證
export const getAuth = (code: string) =>
  fetchApi(`${getAPI()}/validate-email/${code}`);

// 課程資訊 ＆ 課程查詢
export const getClassRoom = (id?: number) =>
  fetchApi(
    id ?
      `${getAPI()}/classroom/${id}`:
      `${getAPI()}/classroom`
  );

type RollCallParam = {date: string; studentIdList: string[]}

export const postClassRoom = (body: RollCallParam) =>
  fetchApi(`${getAPI()}/classroom`, {
    method: "post",
    body,
  });

export const updateClassRoom = (id: number, body: RollCallParam) =>
  fetchApi(`${getAPI()}/classroom/${id}`, {
    method: "put",
    body,
  });

// 學生查詢
export const getAllStudent = (status: `${Query}`) =>
  fetchApi(`${getAPI()}/student?status=${status}`);

// 學生資訊
export const getStudent = (id: number) =>
  fetchApi(`${getAPI()}/student/${id}`);

export const updateStudent = (id: number, body: any) =>
  fetchApi(`${getAPI()}/student/${id}`, {
    method: "post",
    withToken: true,
    body,
  });

// 儲值
export const postDeposit = (body: { planId: number, studentId: number}) =>
  fetchApi(`${getAPI()}/deposit`, {
    method: "post",
    body,
  });

// 課程方案
export const getPlan = () => fetchApi(`${getAPI()}/plan`);

// 刪除課程方案
export const delPlan = (id: number) => fetchApi(`${getAPI()}/plan/${id}`);