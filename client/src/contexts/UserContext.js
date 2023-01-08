import { createContext, useEffect, useState } from 'react';
import getUserId from '../functions/getUserId';
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({});

  useEffect(() => {}, [userState]);

  useEffect(() => {
    getUserId() &&
      fetch(`/api/user/${getUserId()}`)
        .then((res) => res.json())
        .then((data) => {
          setUserState(data.data);
        });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
