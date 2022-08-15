const baseUrl = process.env.REACT_APP_URL;

export const getRegisterUserAPI = () => {
  return `${baseUrl}/register`;
};

export const getLoginUserAPI = () => {
  return `${baseUrl}/login`;
};
