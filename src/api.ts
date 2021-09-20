const { REACT_APP_API_DOMAIN: API } = process.env;
console.log("API", API);

const getAPI = () => {
    return API;
};

export const postSignUp = () => {
    return `${getAPI()}/sign-up`;
};

export const postLogin = () => {
    return `${getAPI()}/login`;
};