import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const TeacherBoard = () => {
  const { userState, setUserState } = useContext(UserContext);
  return (
    <Wrapper>
      <h1>Welcome {userState.firstName}</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TeacherBoard;
