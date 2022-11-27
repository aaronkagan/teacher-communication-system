import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();
  const [progressState, setProgressState] = useState(3);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setProgressState((progressState) => progressState - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  return (
    <Wrapper>
      <h1>ERROR 401!!!</h1>
      <h3>Slow down there!</h3>
      <h3>You're not authorized to view this page</h3>
      <h2>
        Redirecting in <span style={{ color: "red" }}>{progressState}</span>
      </h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  h1 {
    font-size: 90px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 60px;
  }
  h3 {
    font-size: 30px;
    margin: 5px 0 0 0;
  }
`;

export default NotAuthorized;
