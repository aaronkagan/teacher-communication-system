import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { UserContext } from "../contexts/UserContext";

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
      {console.log(boardState)}
      <h1>Welcome {userState.firstName}</h1>
      <DragDropContext>
        <Container>
          {/* Creating the columns */}
          {boardState &&
            boardState.columnOrder.map((column) => {
              // Getting an array of task objects that are associated to the taskIds array for each column (ie getting an array of task objects for that column)
              // const columnTasks = column.taskIds.map((taskId) => tasksState.tasks[taskId]);
              // Renering the columns
              return <h3 key={column}>{column}</h3>;
            })}
        </Container>
      </DragDropContext>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div``;

export default TeacherBoard;
