import { getCookie } from "utils";

const { REACT_APP_API_DOMAIN: API } = process.env;


const getAPI = () => {
  return API;
};

export const postSignUp = () => {
  return `${getAPI()}/sign-up`;
};

export const postLogin = () => {
  return `${getAPI()}/login`;
};

export const getTeacherInfo = () => {
  return `${getAPI()}/me`;
}

export const getAuth = (code: string) => {
  return `${getAPI()}/validate-email/${code}`;
};

export const getClassRoom = () => {
  return `${getAPI()}/classroom`;
};

export const getHeaderWithToken = () => ({
  "Accept": "application/json",
  "content-type": "application/json",
  "Authorization": "Bearer " + getCookie().token,
});


