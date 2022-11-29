import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import StudentBoardColumn from "../components/StudentBoardColumn";

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

  return boardState ? (
    <Wrapper>
      <h1>Welcome {userState.firstName}</h1>
      <BoardContainer>
        {/* Creating the columns from the board state */}
        {Object.values(boardState.columns).map((column) => {
          return <StudentBoardColumn key={column.id} column={column} tasks={boardState.tasks} boardState={boardState} setBoardState={setBoardState} />;
        })}
      </BoardContainer>
    </Wrapper>
  ) : (
    <></>
  );
};

const Wrapper = styled.div``;

const BoardContainer = styled.div`
  display: flex;
`;

export default StudentBoard;
