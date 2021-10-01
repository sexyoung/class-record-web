import { getCookie } from "utils";

const { REACT_APP_API_DOMAIN: API } = process.env;

export enum Query {
  Join = 'join',
  Dropout = 'dropout',
  Current = 'current',
  Zero = 'zero',
  Debts = 'debts',
}

const getAPI = () => {
  return API;
};

// 老師註冊
export const postSignUp = () => {
  return `${getAPI()}/sign-up`;
};

// 老師登入
export const postLogin = () => {
  return `${getAPI()}/login`;
};

// 老師資訊
export const getTeacherInfo = () => {
  return `${getAPI()}/me`;
};

// 信箱認證
export const getAuth = (code: string) => {
  return `${getAPI()}/validate-email/${code}`;
};

export const getClassRoom = (id?: number) => {
  return id ? `${getAPI()}/classroom/${id}`: `${getAPI()}/classroom`;
};

// 學生查詢
export const getAllStudent = (status: `${Query}`) => {
  return `${getAPI()}/student?status=${status}`;
};

// 學生資訊
export const getOneStudent = (id: number) => {
  return `${getAPI()}/student/${id}`;
};

// 儲值
export const postDeposit = () => {
  return `${getAPI()}/deposit`;
};

// 帶token的header
export const getHeaderWithToken = () => ({
  "Accept": "application/json",
  "content-type": "application/json",
  "Authorization": "Bearer " + getCookie().token,
});


