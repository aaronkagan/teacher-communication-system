import { useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import useUserFullName from "../hooks/useUserFullName";
import getUserId from "../functions/getUserId";

const { v4: uuidv4 } = require("uuid");

const TeacherBoardTaskModal = ({ isModalOpen, setIsModalOpen, task, boardState }) => {
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
        <h3>{task.title}</h3>
        <p>{task.message}</p>
        {/* Showing only if due date was added to the task */}
        {task.dueDate !== "" && <DueDate>Due: {task.dueDate}</DueDate>}
        {/* Showing name of attached file if exists */}
        {task.file.fileName !== null ? <p>Attached File: {task.file.fileName}</p> : null}
        <CommentsContainer>
          {/* TODO : create separate comment component to render here instead on rendering inline */}
          {task.comments.map((comment) => {
            return (
              <CommentContainer key={uuidv4()}>
                <h3>{comment.createdBy}</h3>
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

const DueDate = styled.p``;

const CommentsContainer = styled.div`
  box-shadow: 0 0 10px gray;
`;

const CommentContainer = styled.div``;

export default TeacherBoardTaskModal;
