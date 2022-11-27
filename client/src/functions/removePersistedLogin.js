const removePersistedLogin = () => {
  window.localStorage.setItem("isLoggedIn", false);
  window.localStorage.removeItem("role");
  window.localStorage.removeItem("userId");
};

export default removePersistedLogin;
