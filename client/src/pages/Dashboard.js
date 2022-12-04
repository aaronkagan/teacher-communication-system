import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const DashBoard = () => {
  const { userState } = useContext(UserContext);
  return (
    <Wrapper>
      <Content>
        <h1>Welcome {userState.firstName}</h1>
        <h3>Role: {userState.role}</h3>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin-top: 20vh;
`;

const Content = styled.div`
  h1 {
    font-size: 30px;
  }
  h3 {
    font-size: 20px;
  }
`;

export default DashBoard;
