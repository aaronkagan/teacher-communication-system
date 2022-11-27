import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({});

  const [userId, setUserId] = useState("");

  useEffect(() => {
    console.log("Current user state: ", userState);
  }, [userState]);

  // useEffect(() => {
  //   userId &&
  //     fetch(`/api/user/${userId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUserState(data.data);
  //         console.log(data.data);
  //       });
  // }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
        userId,
        setUserId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
