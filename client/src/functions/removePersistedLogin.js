// Helper function used to remove the user's persisted login information/
// Using local storage for now but will modify helper function to use more secure method when a more robust authentication and authorization system is implemented

const removePersistedLogin = () => {
  window.localStorage.removeItem('isLoggedIn');
  window.localStorage.removeItem('role');
  window.localStorage.removeItem('userId');
};

export default removePersistedLogin;
