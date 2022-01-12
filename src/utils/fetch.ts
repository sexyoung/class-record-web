import { getCookie } from "./cookie";

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type FetchApiOptionType = {
  body?: { [key: string]: any };
  withToken?: boolean;
  method?: HttpMethod;
}

interface IFetchApi {
  (url: string, option?: FetchApiOptionType) : Promise<any>;
}

export const fetchApi: IFetchApi = (url: string, option = {
  method: 'get',
  withToken: true,
}) => {
  const { token: apiToken } = getCookie();

  const {
    method = 'get',
    withToken = true,
    body,
  } = option;

  // if(['post', 'put'].includes(method)) {
  //   body!.token = document.getElementById('token')!.getAttribute('content');
  // }

  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(withToken ? { Authorization: `Bearer ${apiToken}` }: {}),
    },
    ...(body ? { body: JSON.stringify(body) }: {}),
  })
    .then(async (res) => {
      if(res.ok) return res.json();
      const error = await res.json();
      throw new Error(error.message || JSON.stringify(error));
    });
};

export const uploadApi = (url: string, body: FormData) => {
  const { token: apiToken } = getCookie();
  return fetch(url, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body,
  })
    .then(async (res) => {
      if(res.ok) return res.json();
      const error = await res.json();
      throw new Error(error.message || JSON.stringify(error));
    });
};