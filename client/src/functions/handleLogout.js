import removePersistedLogin from './removePersistedLogin';

// This component handles the user logout

const handleLogout = (setUserState) => {
  // Setting the userState and resetting the userState to and empty object on logout
  setUserState({});
  // Removing the logged in user's credentials based on the current method being used in the removePersistedLogin function
  removePersistedLogin();
};

export default handleLogout;
