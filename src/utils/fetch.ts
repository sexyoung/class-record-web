import { getCookie } from "./cookie";

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type FetchApiOptionType = {
  body?: { [key: string]: any };
  withToken?: boolean;
  method?: HttpMethod;
  isUpload?: boolean;
}

interface IFetchApi {
  (url: string, option?: FetchApiOptionType) : Promise<any>;
}

export const fetchApi: IFetchApi = (url: string, option = {
  method: 'get',
  withToken: true,
  isUpload: false,
}) => {
  const { token: apiToken } = getCookie();

  const {
    method = 'get',
    withToken = true,
    isUpload = false,
    body,
  } = option;

  // if(['post', 'put'].includes(method)) {
  //   body!.token = document.getElementById('token')!.getAttribute('content');
  // }

  console.log(body);
  return fetch(url, {
    method,
    headers: {
      ...(isUpload ? {}: {"Content-Type": "application/json"}),
      ...(withToken ? { Authorization: `Bearer ${apiToken}` }: {}),
    },
    ...(body ? { body: (isUpload ? body as FormData: JSON.stringify(body)) }: {}),
  })
    .then(async (res) => {
      if(res.ok) return res.json();
      const error = await res.json();
      throw new Error(error.message || JSON.stringify(error));
    });
};