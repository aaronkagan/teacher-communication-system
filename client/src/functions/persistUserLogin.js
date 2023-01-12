// Helper function used to persist the user login state as well as role and ID.
// Using local storage for now but will modify helper function to use more secure method when a more robust authentication and authorization system is implemented

const persistUserLogin = (user) => {
  window.localStorage.setItem('userId', user.userId);
  window.localStorage.setItem('role', user.role);
  window.localStorage.setItem('isLoggedIn', 'true');
};

export default persistUserLogin;
