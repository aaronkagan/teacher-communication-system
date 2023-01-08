import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Used to retrieve the users full name from the user context based on the user's first and last name

const useUserFullName = () => {
  const { userState } = useContext(UserContext);
  return `${userState.firstName} ${userState.lastName}`;
};

export default useUserFullName;
