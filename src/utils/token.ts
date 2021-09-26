export const setApiToken = (apiToken: string) => {
  const expires = new Date(+new Date() + 86400000).toUTCString();
  document.cookie = `token=${apiToken}; expires=${expires}; path=/`;
  
};

export const clearApiToken = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/';
};
