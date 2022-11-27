const isUserLoggedIn = () => {
  return window.localStorage.getItem("isLoggedIn") === "true" && window.localStorage.getItem("userId") !== null;
};
