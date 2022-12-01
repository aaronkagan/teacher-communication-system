import styled from "styled-components";
import StudentBoardTask from "./StudentBoardTask";
import { capitalize } from "@mui/material";

const StudentBoardColumn = ({ column, tasks, boardState, setBoardState }) => {
  return (
    <Wrapper>
      <ColumnTitle>{capitalize(column.title)}</ColumnTitle>
      <ColumnWrapper>
        {column.taskIds.map((taskId) => {
          return <StudentBoardTask key={taskId} task={tasks[taskId]} boardState={boardState} setBoardState={setBoardState} />;
        })}
      </ColumnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 11vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const ColumnWrapper = styled.div`
  height: 100%;
  border-radius: 5px;
`;

export default StudentBoardColumn;
