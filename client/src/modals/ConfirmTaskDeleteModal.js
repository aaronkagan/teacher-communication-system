import { Dialog } from "@mui/material";
import styled from "styled-components";

const ConfirmTaskDeleteModal = ({ isTaskDeleteModalOpen, setIsTaskDeleteModalOpen, boardState, task }) => {
  const handleDeleteTask = () => {
    // 1. Delete the taskID from the current column's taskIds array
    Object.values(boardState.columns).forEach((column) => {
      if (column.taskIds.includes(task.id)) {
        column.taskIds.splice(column.taskIds.indexOf(task.id), 1);
      }
    });
    // 2. Delete the task from the tasks object
    delete boardState.tasks[task.id];

    // Send the new board state to the DB
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
          alert("An unknown error has occurred");
          // Reloading the window in case of bad PATCH to get the latest data
          window.location.reload();
        } else {
          alert("Task has been deleted");
        }
        // window.location.reload();
      })
      .catch((err) => console.log(err));
    setIsTaskDeleteModalOpen(false);
  };

  return (
    <Dialog open={isTaskDeleteModalOpen}>
      <Wrapper>
        <ButtonsContainer>
          <h3>Are you sure you want to delete?</h3>
          <ConfirmButton onClick={handleDeleteTask}>Confirm</ConfirmButton>
          <CancelButton onClick={() => setIsTaskDeleteModalOpen(false)}>Cancel</CancelButton>
        </ButtonsContainer>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div``;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ConfirmButton = styled.button``;

const CancelButton = styled.button``;

export default ConfirmTaskDeleteModal;
