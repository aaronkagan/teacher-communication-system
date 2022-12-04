import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import getUserId from "../functions/getUserId";
import useUserFullName from "../hooks/useUserFullName";
import getRandomStickyColor from "../functions/getRandomStickyColor";

const { v4: uuidv4 } = require("uuid");

const StudentBoardTaskModal = ({ isModalOpen, setIsModalOpen, task, boardState, setBoardState }) => {
  const [comment, setComment] = useState("");
  const userFullName = useUserFullName();

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
          window.alert("An unknown error has occurred. Your comment wasn't able to be added. Please try again.");
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

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: "0"
        }
      }}
      open={isModalOpen}
    >
      <Wrapper>
        <TaskContent>
          <Title>{task.title}</Title>
          <Message>{task.message}</Message>
          {/* Showing only if due date was added to the task */}
          {task.dueDate !== "" && <DueDate>Due: {task.dueDate}</DueDate>}
          {/* Showing name of attached file if exists */}
          {task.file.fileName !== null ? (
            <div>
              <AttachedFile>
                Attached File:
                {/* Link to download attached file */}
                <a href={task.file.fileString} download={task.file.fileName}>
                  {task.file.fileName}
                </a>
              </AttachedFile>
            </div>
          ) : null}
        </TaskContent>
        {task.comments.length > 0 ? (
          <CommentsContainer>
            <CommentsTitle>Comments:</CommentsTitle>
            {task.comments.map((comment) => {
              // TODO CREATE COMPONENT FOR THE TASK COMMENTS
              return (
                <CommentContainer key={uuidv4()}>
                  <CreatedBy>{comment.createdBy}:</CreatedBy>
                  <Comment>{comment.comment}</Comment>
                </CommentContainer>
              );
            })}
          </CommentsContainer>
        ) : null}

        <form onSubmit={handleAddComment}>
          <input type="text" maxLength="40" placeholder="What's on your mind?" value={comment} onChange={(event) => setComment(event.target.value)} />
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
  background-color: ${getRandomStickyColor()};
  max-width: 500px;
  min-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  * {
    font-family: "Comic Sans MS";
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: wheat;
  }
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 25px;
`;

const Message = styled.p`
  font-size: 25px;
  margin-top: 20px;
`;

const DueDate = styled.p`
  font-weight: bold;
  margin-top: 20px;
`;

const AttachedFile = styled.p`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentsTitle = styled.h5``;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CreatedBy = styled.h5`
  font-size: 13px;
  font-weight: normal;
`;
const Comment = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const AddCommentButton = styled.button`
  background: transparent;
`;

const CloseButton = styled(AddCommentButton)`
  margin-top: 20px;
`;
export default StudentBoardTaskModal;
