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
        {console.log(comment)}
        {console.log(boardState)}
        <h3>{task.title}</h3>
        <p>{task.message}</p>
        <h5>{task.dueDate}</h5>
        <span>Comments:</span>
        {task.comments.map((comment) => {
          return (
            <span key={uuidv4()}>
              Comment: {comment.comment} CreatedBy: {comment.createdBy}
            </span>
          );
        })}
        <input type="text" placeholder="Add Comment" onChange={(event) => setComment(event.target.value)} />
        <button onClick={handleAddComment}>Submit</button>
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
export default StudentBoardTaskModal;
