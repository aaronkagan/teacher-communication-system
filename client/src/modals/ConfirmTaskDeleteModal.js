import { Dialog } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

// Modal to delete task from teacher board

const ConfirmTaskDeleteModal = ({ isTaskDeleteModalOpen, setIsTaskDeleteModalOpen, boardState, task, forceRefreshTeacherBoard, setForceRefreshTeacherBoard }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleDeleteTask = () => {
    // Disabling the buttons while processing delete
    setIsButtonDisabled(true);

    // 1. Delete the taskID from the current column's taskIds array

    // // Iterating over the values from the columns object, which is another object that holds the taskIds to associate the task to the correct column.
    // Object.values(boardState.columns).forEach((column) => {
    //   // If the columns taskIds array includes the taskId of the task we want to delete, then splice the taskId from that column.
    //   if (column.taskIds.includes(task.id)) {
    //     // How we do that is by splicing 1 element from taskIds array at the index of the task we are deleting.
    //     column.taskIds.splice(column.taskIds.indexOf(task.id), 1);
    //   }
    // });

    // 1. Delete the taskID from the current column's taskIds array
    // Columns === day of the week
    const columns = Object.values(boardState.columns);
    const taskToDelete = task.id;
    columns.forEach((column) => {
      // Tasks for column (day of the week)
      const columnTasks = column.taskIds;
      // If the column's taskIds array includes the taskId of the task we want to delete, then splice the taskId from that column.
      if (columnTasks.includes(taskToDelete)) {
        columnTasks.splice(columnTasks.indexOf(task.id), 1);
      }
    });

    console.log(Object.values(boardState.columns));
    // 2. Delete the task from the tasks object
    delete boardState.tasks[task.id];

    // Send the new board state to the DB
    fetch('/api/tasks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boardState)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          alert('An unknown error has occurred');
          setIsButtonDisabled(false);
          // Reloading the window in case of bad PATCH to get the latest data
          window.location.reload();
        } else {
          // alert("Task has been deleted");
          setIsTaskDeleteModalOpen(false);
          setForceRefreshTeacherBoard(!forceRefreshTeacherBoard);
          setIsButtonDisabled(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '0'
        }
      }}
      open={isTaskDeleteModalOpen}
    >
      <Wrapper>
        {isButtonDisabled ? (
          'Processing Deletion'
        ) : (
          <Container>
            <h3>Are you sure you want to delete?</h3>
            <ButtonsContainer>
              <ConfirmButton
                disabled={isButtonDisabled}
                onClick={handleDeleteTask}
              >
                Confirm
              </ConfirmButton>
              <CancelButton
                disabled={isButtonDisabled}
                onClick={() => setIsTaskDeleteModalOpen(false)}
              >
                Cancel
              </CancelButton>
            </ButtonsContainer>
          </Container>
        )}
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const Container = styled.div``;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background: var(--success-color);
  color: white;
`;

const CancelButton = styled(ConfirmButton)`
  background: var(--cancel-color);
`;

export default ConfirmTaskDeleteModal;
