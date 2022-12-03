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
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  padding-top: 20vh;
  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 25px;
  }
  h3 {
    font-size: 20px;
    margin-top: 20px;
  }
  h4 {
    margin-top: 10vh;
  }
  a {
    text-decoration: none;
  }
`;

const Img = styled.img`
  padding-top: 10vh;
`;

export default Home;
