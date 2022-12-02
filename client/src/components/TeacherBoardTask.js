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
            <SideBar></SideBar>
            <ContentContainer>
              <Title>{task.title}</Title>
              <Message>{task.message}</Message>
              {task.comments.length > 0 && <SeeComments>See comments...</SeeComments>}
              {task.file.fileName && <SeeComments>See attached file...</SeeComments>}
            </ContentContainer>
          </div>
          <DeleteButton type="button" onClick={() => setIsTaskDeleteModalOpen(true)}>
            Delete
          </DeleteButton>
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

const TaskCard = styled.div`
  box-shadow: 0 0 3px var(--primary-color);
  /* border-radius: 5px; */
  padding: 10px 0 20px 8px;
  /* background: #f6e1ba; */
  background: white;
  text-align: start;
  -webkit-margin-top-collapse: 10px;
  margin-bottom: 15px;
  position: relative;
  &:hover {
    transform: scale(1.5);
    z-index: 1;
  }
`;

const SideBar = styled.div`
  height: 20px;
  width: 5px;
  background: blue;
  display: inline;
`;

const ContentContainer = styled.div``;

const Title = styled.h3``;

const Message = styled.p`
  font-size: 18px;
`;

const SeeComments = styled.p`
  font-size: 10px;
`;

const DeleteButton = styled.button`
  background: 0;
  padding: 0;
  color: var(--edit-color);
  font-size: 10px;
  font-weight: bolder;
  position: absolute;
  bottom: 3px;
`;

export default TeacherBoardTask;
