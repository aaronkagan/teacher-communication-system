import styled from 'styled-components';
import StudentBoardTask from './StudentBoardTask';
import { capitalize } from '@mui/material';

// This is the column component that is rendered for each day of the week on the student board
const StudentBoardColumn = ({ column, tasks, boardState, setBoardState }) => {
  return (
    <Wrapper>
      <ColumnTitle>{capitalize(column.title)}</ColumnTitle>
      <ColumnWrapper>
        {/* The tasks for that day's column being mapped for each day of the week */}
        {column.taskIds.map((taskId) => {
          return (
            <StudentBoardTask
              key={taskId}
              task={tasks[taskId]}
              // The board state and setState are needed to be able to add comments to each individual task (on each task there is a modal that opens with the ability to add comments to each task and we need to modify the boardState object with the comments that are being added)
              boardState={boardState}
              // Set board state is used for the student to be able to add comments via the comments input.
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
