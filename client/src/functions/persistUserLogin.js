const persistUserLogin = (user) => {
  window.localStorage.setItem("userId", user.userId);
  window.localStorage.setItem("role", user.role);
  window.localStorage.setItem("isLoggedIn", "true");
};

export default persistUserLogin;
