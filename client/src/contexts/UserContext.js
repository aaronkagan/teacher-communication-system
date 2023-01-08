import { createContext, useEffect, useState } from 'react';
import getUserId from '../functions/getUserId';
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({});

  // using this useEffect to reload the component every time the userState variable is modified to make sure I don't have stale data
  // The reason i'm using this here and not just adding the userState variable to the dependency array of the next useEffect is that i want to reload the component even in the case that the userState variable is set to an empty string on logout and not just when the other useEffect fetches new data
  useEffect(() => {}, [userState]);

  // fetching the user data from the backend as soon as the component loads
  useEffect(() => {
    getUserId() &&
      fetch(`/api/user/${getUserId()}`)
        .then((res) => res.json())
        .then((data) => {
          // Setting the userState variable with the user data returned from the API
          setUserState(data.data);
        });
  }, []);

  return (
    // Exporting the userContext with the state and setState we created above
    // The set state is the function returned by useState to set the state of the state variable also returned by useState
    <UserContext.Provider
      value={{
        // state variable
        userState,
        // setState function to modify userState
        setUserState
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
