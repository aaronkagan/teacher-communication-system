import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TeacherBoardTaskModal from "../modals/TeacherBoardTaskModal";
import { useState } from "react";
import { spacing } from "@mui/system";
import { Dialog } from "@mui/material";

const TeacherBoardTask = ({ task, index, boardState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteTask = () => {
    console.log(task);
    console.log("delete");
    console.log(boardState);

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
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <TaskCard {...provided.dragHandleProps} onClick={() => setIsModalOpen(true)}>
            <p>{task.title}</p>
            {task.comments.length > 0 && <span>Comments...</span>}
          </TaskCard>

          <p onClick={handleDeleteTask}>Delete</p>
          <TeacherBoardTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={task} boardState={boardState} />
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div``;

const TaskCard = styled.div``;

export default TeacherBoardTask;
