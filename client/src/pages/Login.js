import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import persistUserLogin from "../functions/persistUserLogin";
import getUserRole from "../functions/getUserRole";
const initialLoginFormData = { username: "", password: "" };
const image = require("../style/assets/images/login-image.png");
const background = require("../style/assets//images/login-background.jpeg");

const Login = () => {
  const { userId, setUserId, userState, setUserState } = useContext(UserContext);

  const [loginFormData, setLoginFormData] = useState({ ...initialLoginFormData });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginFormData({ ...loginFormData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    const formElements = Array.from(form.elements);

    formElements.forEach((elem) => {
      elem.setAttribute("disabled", "");
    });

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginFormData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          persistUserLogin(data.data);
          setUserState(data.data);
          setLoginFormData({ ...initialLoginFormData });
          formElements.forEach((elem) => {
            elem.removeAttribute("disabled");
          });
          alert(data.message);
          navigate("/dashboard");
        } else {
          alert(data.error);
          formElements.forEach((elem) => {
            elem.removeAttribute("disabled");
          });
          setLoginFormData({ ...initialLoginFormData });
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <Wrapper>
      <Card>
        <Img src={image} />
        <Form id="form" onSubmit={handleSubmit} autoComplete="off">
          <FormTitle>Sign In</FormTitle>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={loginFormData.username} onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={loginFormData.password} onChange={handleChange} required />
          <SignInButton>Sign In</SignInButton>
        </Form>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  height: 90vh;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15vh;
  background: white;
  width: 50vw;
  height: max-content;
  padding: 60px 0 40px 0;
`;

const Img = styled.img`
  height: 300px;
  border-right: 2px solid var(--primary-color);
`;

const Form = styled.form`
  * {
    margin: 0 0 0 50px;
    padding: 0;
    font-size: 16px;
    font-family: sans-serif;
    color: var(--primary-color);
    letter-spacing: 1px;
    width: 220px;
  }
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 2px;
`;

const FormTitle = styled.h2`
  margin-bottom: 10px;
`;

const SignInButton = styled.button`
  background: var(--edit-color);
  color: white;
  padding: 3px 0;
  border: 1px solid var(--primary-color);
  margin-top: 20px;
  border-radius: 2px;
`;

export default Login;
