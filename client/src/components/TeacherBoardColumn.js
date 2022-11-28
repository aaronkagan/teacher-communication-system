import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import capitalize from "../functions/capitalize";
import TeacherBoardTask from "./TeacherBoardTask";

const TeacherBoardColumn = ({ columnName, columnTasks }) => {
  return (
    <Wrapper>
      <h3>{capitalize(columnName)}</h3>
      {/* Most of this below is the boilerplate from the react-beautiful-dnd documentation except for the mapping of the individual tasks */}
      <DroppableContainer>
        <Droppable droppableId={columnName}>
          {(provided, snapshot) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
              {columnTasks.map((task, index) => (
                <TeacherBoardTask key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </DroppableContainer>
      <AddNoteButton>Add Note +</AddNoteButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 10vw;
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
