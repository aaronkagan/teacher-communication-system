import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userState } = useContext(UserContext);

  // Might use later
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!userState.role) navigate("/login");
  // }, []);

  return (
    <Wrapper>
      <h1>Welcome to ReadMe</h1>
      <h3>Please login to access your profile</h3>
      <h4>For support please contact support@test.com</h4>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  padding-right: 10vw;
  color: #0000008d;
  padding-bottom: 100px;
`;

export default Home;
