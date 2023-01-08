// Helper function to check if a user is logged in based on the login state stored in local storage. (Using local storage for now but will modify this when i implement a more secure login system)

const isUserLoggedIn = () => {
  return window.localStorage.getItem('isLoggedIn') === 'true' && window.localStorage.getItem('userId') !== null;
};

export default isUserLoggedIn;
