import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const StudentBoard = () => {
  const { userState } = useContext(UserContext);

  const [allTasks, setAllTasks] = useState();

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setAllTasks(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <h1>Welcome {userState.firstName}</h1>
      <div>{console.log(allTasks)}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default StudentBoard;
