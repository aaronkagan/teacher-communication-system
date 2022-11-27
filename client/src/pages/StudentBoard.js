import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const StudentBoard = () => {
  const { userState } = useContext(UserContext);
  return <h1>Welcome {userState.firstName}</h1>;
};

export default StudentBoard;
