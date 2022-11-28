import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { UserContext } from "../contexts/UserContext";
import TeacherBoardColumn from "../components/TeacherBoardColumn";

const TeacherBoard = () => {
  const { userState } = useContext(UserContext);
  // const [tasksState, setTasksState] = useState();
  const [boardState, setBoardState] = useState();

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setBoardState(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      {/* {console.log(boardState)} */}
      <h1>Welcome {userState.firstName}</h1>
      <DragDropContext>
        <Container>
          {/* Creating the columns */}
          {boardState &&
            boardState.columnOrder.map((columnName) => {
              // Getting an array of task objects that are associated to the taskIds array for each column (ie getting an array of task objects for that column). These task object will be passed down to the column component to render the tasks for the columns.

              // To get the task objects I'm iterating over the taskIds array for this column and returning the task objects with that id to get all the task object for the column
              const columnTasks = boardState.columns[columnName].taskIds.map((taskId) => boardState.tasks[taskId]);
              // Rendering the columns
              return <TeacherBoardColumn key={columnName} columnName={columnName} columnTasks={columnTasks} />;
            })}
        </Container>
      </DragDropContext>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
`;

export default TeacherBoard;
