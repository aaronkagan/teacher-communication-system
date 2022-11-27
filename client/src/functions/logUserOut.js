const logUserOut = () => {
  window.localStorage.setItem("isLoggedIn", false);
  window.localStorage.removeItem("role");
  window.localStorage.removeItem("userId");
};

export default logUserOut;
