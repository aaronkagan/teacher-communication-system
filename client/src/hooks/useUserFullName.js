import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUserFullName = () => {
  const { userState } = useContext(UserContext);
  return `${userState.firstName} ${userState.lastName}`;
};

export default useUserFullName;
