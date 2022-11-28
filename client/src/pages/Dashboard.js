import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const DashBoard = () => {
  const { userState } = useContext(UserContext);
  return (
    <Wrapper>
      <Wrapper>
        <h1>Welcome {userState.firstName}</h1>
        <h3>Role: {userState.role}</h3>
      </Wrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DashBoard;
