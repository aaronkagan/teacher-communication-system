import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import useUserFullName from "../hooks/useUserFullName";
import getUserId from "../functions/getUserId";

const { v4: uuidv4 } = require("uuid");

const background = require("../style/assets/images/teacher-task-background.jpeg");
const TeacherBoardTaskModal = ({ isModalOpen, setIsModalOpen, task, boardState }) => {
  // This is the comment state for the new comment being added
  const [comment, setComment] = useState("");
  const userFullName = useUserFullName();
  const [forceRefreshTeacherTaskModal, setForceRefreshTeacherTaskModal] = useState(false);

  const handleAddComment = (event) => {
    event.preventDefault();
    if (comment === "") return;

    // Adding the comment to the comments array for this task in the boardState
    task.comments.push({ comment: comment, createdByID: getUserId(), createdBy: userFullName, commentId: uuidv4() });
    // Pushing the new boardState with the comment to the server
    fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(boardState)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          window.alert(data.error);
          // Reloading window on failed PATCH to fetch the latest data
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        // Reloading window on failed PATCH to fetch the latest data
        window.location.reload();
      });

    setComment("");
  };

  const handleDeleteComment = (comment) => {
    // Removing comment from the comments array for this task
    // console.log(boardState.tasks);
    console.log(task.comments);
    task.comments.forEach((elem) => {
      if (elem.commentId === comment.commentId) {
        task.comments.splice(task.comments.indexOf(comment), 1);
      }
    });

    // Pushing the new boardState with the comment to the server
    fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(boardState)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          window.alert(data.error);
          // Reloading window on failed PATCH to fetch the latest data
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        // Reloading window on failed PATCH to fetch the latest data
        window.location.reload();
      });

    // Use to refresh this component when a comment is deleted
    setForceRefreshTeacherTaskModal(!forceRefreshTeacherTaskModal);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          borderRadius: "0"
        }
      }}
      open={isModalOpen}
    >
      <Wrapper>
        <Title>{task.title}</Title>
        <Message>{task.message}</Message>
        {/* Showing only if due date was added to the task */}
        {task.dueDate !== "" && <DueDate>Due: {task.dueDate}</DueDate>}
        {/* Showing name of attached file if exists */}
        {task.file.fileName !== null ? (
          <div>
            <p>
              Attached File:
              {/* Link to download attached file */}
              <a href={task.file.fileString} download={task.file.fileName}>
                {task.file.fileName}
              </a>
            </p>
          </div>
        ) : null}
        <CommentsContainer>
          {/* TODO : create separate comment component to render here instead on rendering inline */}
          {task.comments.length > 0 && <p>Comments:</p>}
          {task.comments.map((comment) => {
            return (
              <CommentContainer key={uuidv4()}>
                <Div>
                  <h3>{comment.createdBy}:</h3>
                  <p>{comment.comment}</p>
                </Div>

                <DeleteCommentButton onClick={() => handleDeleteComment(comment)}>Delete</DeleteCommentButton>
              </CommentContainer>
            );
          })}
        </CommentsContainer>
        <form onSubmit={handleAddComment}>
          <input type="text" placeholder="What's on your mind?" value={comment} onChange={(event) => setComment(event.target.value)} />
          <AddCommentButton type="submit">Add Comment</AddCommentButton>
        </form>
        <CloseButton
          type="button"
          onClick={(event) => {
            // This is needed because both the modal and the task card that opens the modal have opposite setting of the modal's open state
            event.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          Close
        </CloseButton>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background: #ffffff;
  * {
    font-family: "Comic Sans MS";
  }
`;

const Title = styled.h3`
  font-size: 30px;
`;

const Message = styled.p`
  font-size: 30px;
`;

const DueDate = styled.p`
  font-weight: bold;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentContainer = styled.div`
  padding: 0 30px 5px 15px;
  width: 300px;
  h3 {
    font-size: 12px;
  }
  p {
    font-size: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-weight: bold;
  }
`;

const AddCommentButton = styled.button`
  background: var(--success-color);
  color: white;
  margin-left: 10px;
  height: 30px;
  font-weight: bold;
`;

const DeleteCommentButton = styled.button`
  background: 0;
  border: 0;
  padding: 0;
  font-size: 12px;
  color: blue;
`;

const CloseButton = styled(AddCommentButton)`
  background: var(--cancel-color);
  margin-left: 0;
`;

export default TeacherBoardTaskModal;
