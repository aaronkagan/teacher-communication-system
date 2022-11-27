const removePersistedLogin = () => {
  window.localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("role");
  window.localStorage.removeItem("userId");
};

export default removePersistedLogin;
