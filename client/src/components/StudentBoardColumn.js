import styled from "styled-components";

const StudentBoardColumn = ({ column, tasks }) => {
  return (
    <Wrapper>
      <h3>{column.id}</h3>
      <ColumnWrapper>
        {column.taskIds.map((taskId) => {
          return <h4 key={taskId}>{tasks[taskId].message}</h4>;
        })}
      </ColumnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnWrapper = styled.div`
  background: lightgray;
  height: 100%;
`;

export default StudentBoardColumn;
