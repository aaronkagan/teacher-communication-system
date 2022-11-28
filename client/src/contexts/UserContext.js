import { createContext, useEffect, useState } from "react";
import getUserId from "../functions/getUserId";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({});

  useEffect(() => {
    console.log("Current user state: ", userState);
  }, [userState]);

  useEffect(() => {
    getUserId() &&
      fetch(`/api/user/${getUserId()}`)
        .then((res) => res.json())
        .then((data) => {
          setUserState(data.data);
          // console.log(data.data);
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
