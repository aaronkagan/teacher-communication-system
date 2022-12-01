import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TeacherBoardTaskModal from "../modals/TeacherBoardTaskModal";
import ConfirmTaskDeleteModal from "../modals/ConfirmTaskDeleteModal";
import { useState } from "react";
import StickyNote from "./StickyNote";
import getRandomStickyColor from "../functions/getRandomStickyColor";
import getRandomStickyDirection from "../functions/getRandomStickyDirection";

const TeacherBoardTask = ({ task, index, boardState, forceRefreshTeacherBoard, setForceRefreshTeacherBoard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskDeleteModalOpen, setIsTaskDeleteModalOpen] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskCard {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <div {...provided.dragHandleProps} onClick={() => setIsModalOpen(true)}>
            <p>{task.title}</p>
            {task.comments.length > 0 && <span>Comments...</span>}
          </div>
          <p onClick={() => setIsTaskDeleteModalOpen(true)}>Delete</p>
          <ConfirmTaskDeleteModal
            isTaskDeleteModalOpen={isTaskDeleteModalOpen}
            setIsTaskDeleteModalOpen={setIsTaskDeleteModalOpen}
            boardState={boardState}
            task={task}
            forceRefreshTeacherBoard={forceRefreshTeacherBoard}
            setForceRefreshTeacherBoard={setForceRefreshTeacherBoard}
          />
          <TeacherBoardTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={task} boardState={boardState} />
        </TaskCard>
      )}
    </Draggable>
  );
};

const TaskCard = styled.div``;

export default TeacherBoardTask;
