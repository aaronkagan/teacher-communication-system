const getUserId = () => {
  return window.localStorage.getItem("userId");
};

export default getUserId;
