import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import StudentBoardColumn from "../components/StudentBoardColumn";
const background = require("../style/assets/images/corkboard-background.jpeg");

const StudentBoard = () => {
  const { userState } = useContext(UserContext);

  const [boardState, setBoardState] = useState();

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setBoardState(data.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    boardState && (
      <Wrapper>
        <H2>Welcome {userState.firstName}</H2>
        <H3>Here's your homework for the week</H3>
        <BoardContainer>
          {/* Creating the columns from the board state */}
          {Object.values(boardState.columns).map((column) => {
            return <StudentBoardColumn key={column.id} column={column} tasks={boardState.tasks} boardState={boardState} setBoardState={setBoardState} />;
          })}
        </BoardContainer>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  background: url(${background});
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const H2 = styled.h2`
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: bold;
  font-family: "Comic Sans MS";
  margin-bottom: 0;
`;

const H3 = styled.h3`
  font-weight: bold;
  font-family: "Comic Sans MS";
  font-size: 30px;
  margin-bottom: 30px;
`;

const BoardContainer = styled.div`
  display: flex;
  gap: 5px;
  /* background: #0000ffb6; */
`;

export default StudentBoard;
