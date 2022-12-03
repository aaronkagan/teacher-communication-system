import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

import isUserLoggedIn from "../functions/isUserLoggedIn";

const Home = () => {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) navigate("/dashboard");
  }, []);

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
  gap: 30px;
  align-items: center;
  margin-top: 20vh;
  font-family: sans-serif;
  padding-right: 10vw;
  color: #0000008d;
  padding-bottom: 100px;
`;

export default Home;
