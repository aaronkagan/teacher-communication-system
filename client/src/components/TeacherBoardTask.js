import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TeacherBoardTaskModal from "../modals/TeacherBoardTaskModal";
import { useState } from "react";
import { spacing } from "@mui/system";

const TeacherBoardTask = ({ task, index, boardState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <TaskCard {...provided.dragHandleProps} onClick={() => setIsModalOpen(true)}>
            <p>{task.title}</p>
            {task.comments.length > 0 && <span>Comments...</span>}
          </TaskCard>
          <TeacherBoardTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={task} boardState={boardState} />
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div``;

const TaskCard = styled.div``;

export default TeacherBoardTask;
