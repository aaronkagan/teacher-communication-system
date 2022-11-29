import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import getUserId from "../functions/getUserId";
import useUserFullName from "../hooks/useUserFullName";

const { v4: uuidv4 } = require("uuid");

const StudentBoardTaskModal = ({ isModalOpen, setIsModalOpen, task, boardState, setBoardState }) => {
  const [comment, setComment] = useState("");
  const userFullName = useUserFullName();

  const handleAddComment = (event) => {
    event.preventDefault();
    if (comment === "") return;

    // Adding the comment to the comments array for this task in the boardState
    task.comments.push({ comment: comment, createdByID: getUserId(), createdBy: userFullName });
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

  return (
    <Dialog open={isModalOpen}>
      <Wrapper>
        <TaskContent>
          {console.log(comment)}
          {console.log(boardState)}
          <Title>{task.title}</Title>
          <Message>{task.message}</Message>
          <DueDate>Due: {task.dueDate}</DueDate>
          {/* Showing name of attached file if exists */}
          {task.file.filename !== "" && (
            <div>
              <p>
                Attached File:{" "}
                <a href={task.file.fileString} download={task.file.fileName}>
                  {task.file.fileName}
                </a>
              </p>
            </div>
          )}
        </TaskContent>

        <CommentsContainer>
          <span>Comments</span>
          {task.comments.map((comment) => {
            // TODO CREATE COMPONENT FOR THE TASK COMMENTS
            return (
              <CommentContainer key={uuidv4()}>
                <span>{comment.createdBy}</span>
                <p>{comment.comment}</p>
              </CommentContainer>
            );
          })}
        </CommentsContainer>
        <form onSubmit={handleAddComment}>
          <input type="text" placeholder="What's on your mind?" value={comment} onChange={(event) => setComment(event.target.value)} />
          <button type="submit">Add Comment</button>
        </form>
        <button
          type="button"
          onClick={(event) => {
            // This is needed because both the modal and the task card that opens the modal have opposite setting of the modal's open state
            event.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          Close
        </button>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.h3``;

const Message = styled.p``;

const DueDate = styled.p``;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentContainer = styled.div`
  border: 1px solid lightgray;
  span {
    color: lightblue;
  }
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;
export default StudentBoardTaskModal;
