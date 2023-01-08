// Helper function to get the current logged in user ID (currently it's from local storage but will change when i implement a more secure authentication and authorization system)

const getUserId = () => {
  return window.localStorage.getItem('userId');
};

export default getUserId;
