import AddTaskModal from "../modals/AddTaskModal";
import { useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import capitalize from "../functions/capitalize";
import TeacherBoardTask from "./TeacherBoardTask";
// import addNewTaskToBoard from "../functions/addNewTaskToBoard";

const TeacherBoardColumn = ({ columnName, boardState, setBoardState }) => {
  // Getting an array of task objects that are associated to the taskIds array for each column (ie getting an array of task objects for that column). These task object will be passed down to the column component to render the tasks for the columns.
  // To get the task objects I'm iterating over the taskIds array for this column and returning the task objects with that id to get all the task object for the column
  const columnTasks = boardState.columns[columnName].taskIds.map((taskId) => boardState.tasks[taskId]);
  const column = boardState.columns[columnName];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper>
      {/* {console.log(column)} */}
      <h4>{capitalize(columnName)}</h4>
      {/* Most of this below is the boilerplate from the react-beautiful-dnd documentation except for the mapping of the individual tasks */}
      <DroppableContainer>
        <Droppable droppableId={columnName}>
          {(provided, snapshot) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
              {columnTasks.length > 0 && columnTasks[0] !== undefined && columnTasks.map((task, index) => <TeacherBoardTask key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </DroppableContainer>
      <AddNoteButton onClick={() => setIsModalOpen(true)}>Add Task +</AddNoteButton>
      <AddTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} boardState={boardState} setBoardState={setBoardState} column={column} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 10vw;
  text-align: center;
`;

const DroppableContainer = styled.div`
  background: lightgray;
  min-height: 50vh;
  height: 100%;
  margin-bottom: 20px;
`;

const TaskList = styled.div`
  background-color: ${(props) => (props.isDraggingOver ? " skyblue" : "transparent")};
  height: 100%;
`;

const AddNoteButton = styled.button`
  background: lightblue;
  color: white;
  border: 0;
  padding: 5px;
  width: 100%;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default TeacherBoardColumn;
