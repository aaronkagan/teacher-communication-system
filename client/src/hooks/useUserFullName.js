import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Used to retrieve the users full name from the user context based on the user's first and last name (I can't recall why I used a custom hook rather than just creating a helper function. I think i just wanted to practice creating custom hooks)

const useUserFullName = () => {
  const { userState } = useContext(UserContext);
  return `${userState.firstName} ${userState.lastName}`;
};

export default useUserFullName;
