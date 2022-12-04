import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { UserContext } from "../contexts/UserContext";
import TeacherBoardColumn from "../components/TeacherBoardColumn";

const background = require("../style/assets/images/teacher-board-background-80.png");

const TeacherBoard = () => {
  const { userState } = useContext(UserContext);
  // const [tasksState, setTasksState] = useState();
  const [boardState, setBoardState] = useState();

  const [forceRefreshTeacherBoard, setForceRefreshTeacherBoard] = useState(false);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setBoardState(data.data))
      .catch((err) => console.log(err));
  }, [forceRefreshTeacherBoard]);

  // Defines what happens when you begin dragging
  const onDragStart = () => {
    // Sets the text color on drag start
    // document.body.style.color = "purple";
  };

  // Defines what happens when the task is dragged to a new position, be it withing the same column or to another column
  const onDragUpdate = (update) => {
    const { destination } = update;
    // sets opacity of the background based on the index of the task
    // As we drag the task up or down the list, the background opacity of the whole application is changing
    // DOCS https://egghead.io/lessons/react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend
    const opacity = destination ? destination.index / Object.keys(boardState.tasks).length : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    document.body.style.transition = "background-color 0.2s ease";
  };

  // // Defines what happens when a task is dropped, be it in the same column, a new column, or in it's original position
  const onDragEnd = (result) => {
    // Set the color back to original when drag ends
    document.body.style.color = "black";
    document.body.style.backgroundColor = "white";

    // DOCS for this part
    // https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback
    const { destination, source, draggableId } = result;

    // This is if the user drags the item into a non draggable location. Destination is null.
    if (!destination) return;

    // Checking if the user dropped the item into the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = boardState.columns[source.droppableId];
    const finish = boardState.columns[destination.droppableId];

    // Case for when dragging inside same column
    if (start === finish) {
      // This is created to mutate a copy of the boardState and not the original boardState
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...finish,
        taskIds: newTaskIds
      };

      const newBoardState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [newColumn.id]: newColumn
        }
      };
      setBoardState(newBoardState);

      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newBoardState = {
      ...boardState,
      columns: {
        ...boardState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setBoardState(newBoardState);

    // Updating the DB every time a task is moved
    fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...newBoardState })
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          window.alert(data.error);
          window.location.reload();
        }
      });
  };

  return (
    <Wrapper>
      {/* {console.log(boardState)} */}
      {/* <h1>Welcome {userState.firstName}</h1> */}
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <h2>Click on the day's title to add a task</h2>
      {/* Creating the columns */}
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
        <Container>
          {boardState &&
            boardState.columnOrder.map((columnName) => {
              // Rendering the columns
              return (
                <TeacherBoardColumn
                  key={columnName}
                  columnName={columnName}
                  boardState={boardState}
                  setBoardState={setBoardState}
                  forceRefreshTeacherBoard={forceRefreshTeacherBoard}
                  setForceRefreshTeacherBoard={setForceRefreshTeacherBoard}
                />
              );
            })}
        </Container>
      </DragDropContext>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 4vh;
  background: url(${background});

  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;

  h2 {
    color: white;
    font-weight: 300;
    font-size: 30px;
    font-family: "Comic Sans MS";
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-right: 30px;
  padding: 20px;
`;

export default TeacherBoard;
