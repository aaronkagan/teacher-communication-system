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
  width: 10vw;
  height: 70vh;
`;

const ColumnTitle = styled.h2`
  text-align: center;
`;

const ColumnWrapper = styled.div`
  background: #f0f5fd;
  height: 100%;
  border-radius: 5px;
`;

export default StudentBoardColumn;
