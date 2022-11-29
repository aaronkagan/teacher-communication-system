import { useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import getUserId from "../functions/getUserId";
import useUserFullName from "../hooks/useUserFullName";

const { v4: uuidv4 } = require("uuid");

const StudentBoardTaskModal = ({ isModalOpen, setIsModalOpen, task, boardState, setBoardState }) => {
  const [comment, setComment] = useState("");
  const userFullName = useUserFullName();

  const handleAddComment = () => {
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
    setIsModalOpen(false);
    window.alert("Comment successfully added");
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
          <input type="text" placeholder="What's on your mind?" onChange={(event) => setComment(event.target.value)} />
        </CommentsContainer>

        <button onClick={handleAddComment}>Add Comment</button>
        <button type="button" onClick={() => setIsModalOpen(false)}>
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