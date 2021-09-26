export const getCookie: { (): { [key: string]: string } } = () => {
  return document.cookie.split("; ").reduce((obj, value) => {
    const [key, ...v] = value.split("=");
    return {
      ...obj,
      [key]: v.join("="),
    };
  }, {});
};

export const setToken = (apiToken: string) => {
  const expires = new Date(+new Date() + 86400000).toUTCString();
  document.cookie = `token=${apiToken}; expires=${expires}; path=/`;
};

export const clearToken = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/';
};
