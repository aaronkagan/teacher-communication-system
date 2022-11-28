import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TeacherBoardTask = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <TaskCard {...provided.dragHandleProps}>
            <h3>{task.title}</h3>
            <p>{task.content}</p>
            <h5>Due: {task.dueDate}</h5>
          </TaskCard>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div``;

const TaskCard = styled.div``;

export default TeacherBoardTask;
