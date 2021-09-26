export const getCookie: {(): {[key: string]: string}} = () => {
  return document.cookie.split('; ').reduce((obj, value) => {
    const [key, ...v] = value.split('=');
    return ({
      ...obj,
      [key]: v.join('=')
    });
  }, {});
};