import styled from 'styled-components';
import StudentBoardTask from './StudentBoardTask';
import { capitalize } from '@mui/material';

const StudentBoardColumn = ({ column, tasks, boardState, setBoardState }) => {
  return (
    <Wrapper>
      <ColumnTitle>{capitalize(column.title)}</ColumnTitle>
      <ColumnWrapper>
        {column.taskIds.map((taskId) => {
          return (
            <StudentBoardTask
              key={taskId}
              task={tasks[taskId]}
              boardState={boardState}
              setBoardState={setBoardState}
            />
          );
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
  font-family: 'Comic Sans MS';
  text-align: center;
  margin-bottom: 30px;
  background: #ffffff3b;
  line-height: 1;
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 20px;
`;

const ColumnWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background-color: #ffffff47;
`;

export default StudentBoardColumn;
