const getUserRole = () => {
  return window.localStorage.getItem("role");
};

export default getUserRole;
