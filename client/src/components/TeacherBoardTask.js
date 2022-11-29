import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TeacherBoardTask = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <TaskCard {...provided.dragHandleProps}>
            <p>{task.message}</p>
          </TaskCard>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div``;

const TaskCard = styled.div``;

export default TeacherBoardTask;
