// Custom hook to retrieve the array of available user roles

// Used in various placed throughout the application such as when rendering the dropdown menu for creating new users in the admin panel
const useRoles = () => {
  return ['admin', 'teacher', 'reader', 'student'];
};

export default useRoles;
