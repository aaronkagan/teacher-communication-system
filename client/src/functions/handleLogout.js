import removePersistedLogin from "./removePersistedLogin";

const handleLogout = (setUserState) => {
  setUserState({});
  removePersistedLogin();
};

export default handleLogout;
