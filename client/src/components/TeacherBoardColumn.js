import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import capitalize from "../functions/capitalize";

const TeacherBoardColumn = ({ columnName, columnTasks }) => {
  return (
    <Wrapper>
      <h3>{capitalize(columnName)}</h3>

      {/* Most of this below is the boilerplate from the beautiful react drag and drop documentation except for the mapping of the individual tasks */}
      <Droppable droppableId={columnName}>
        {(provided, snapshot) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
            {columnTasks.map((task, index) => !task.isDeleted && <Task key={task.id} task={task} index={index} />)}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TaskList = styled.div``;

export default TeacherBoardColumn;
