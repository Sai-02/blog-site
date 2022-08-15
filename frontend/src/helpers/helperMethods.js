export const isValidEmail = (email) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  }
  return false;
};

export const isLoggedIn = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) return true;
  return false;
};
