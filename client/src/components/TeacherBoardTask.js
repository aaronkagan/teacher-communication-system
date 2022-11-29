import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TeacherBoardTaskModal from "../modals/TeacherBoardTaskModal";
import ConfirmTaskDeleteModal from "../modals/ConfirmTaskDeleteModal";
import { useState } from "react";
import { spacing } from "@mui/system";
import { Dialog } from "@mui/material";

const TeacherBoardTask = ({ task, index, boardState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskDeleteModalOpen, setIsTaskDeleteModalOpen] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <TaskCard {...provided.dragHandleProps} onClick={() => setIsModalOpen(true)}>
            <p>{task.title}</p>
            {task.comments.length > 0 && <span>Comments...</span>}
          </TaskCard>

          <p onClick={() => setIsTaskDeleteModalOpen(true)}>Delete</p>
          <ConfirmTaskDeleteModal isTaskDeleteModalOpen={isTaskDeleteModalOpen} setIsTaskDeleteModalOpen={setIsTaskDeleteModalOpen} boardState={boardState} task={task} />
          <TeacherBoardTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={task} boardState={boardState} />
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div``;

const TaskCard = styled.div``;

export default TeacherBoardTask;
