const baseUrl = process.env.REACT_APP_URL;

export const getRegisterUserAPI = () => {
  return `${baseUrl}/register`;
};

export const getLoginUserAPI = () => {
  return `${baseUrl}/login`;
};

export const getCreateBlogAPI = () => {
  return `${baseUrl}/blog/create`;
};

export const getMyBlogsAPI = () => {
  return `${baseUrl}/blog/myblogs`;
};

export const getBlogAPI = (id) => {
  return `${baseUrl}/blog/blog?id=${id}`;
};
