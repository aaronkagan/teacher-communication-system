import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import isUserLoggedIn from "../functions/isUserLoggedIn";

const image = require("../style/assets/images/homepage-image.png");

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
      <Content>
        <h1>Welcome to ReadMe!</h1>
        <h2>Your premier application for teacher-student communication</h2>
        <h3>Please login to access your profile</h3>
        <h4>
          For support please contact <a href="mailto:support@readme.com">support@readme.com</a>
        </h4>
      </Content>
      <Img src={image} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: sans-serif;
  color: #0000008d;
  color: white;
  display: flex;
  justify-content: center;
  gap: 50px;
  background: #a8b7fa;
  height: 90vh;
  padding: 10vh 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  padding-top: 12vh;
  * {
    letter-spacing: 1.5px;
    font-weight: 500;
    line-height: 3rem;
  }
  h1 {
    font-size: 50px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 35px;
  }
  h3 {
    font-size: 25px;
    margin-top: 30px;
  }
  h4 {
    margin-top: 10vh;
  }
  a {
    text-decoration: none;
  }
`;

const Img = styled.img`
  padding-top: 5vh;
`;

export default Home;
