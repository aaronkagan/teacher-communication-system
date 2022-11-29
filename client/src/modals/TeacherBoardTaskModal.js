import { Dialog } from "@mui/material";

const TeacherBoardTaskModal = ({ isModalOpen, setIsModalOpen, task }) => {
  return (
    <Dialog open={isModalOpen}>
      {console.log(task)}
      <h1>{task.message}</h1>
      <button type="button" onClick={() => setIsModalOpen(false)}>
        Close
      </button>
    </Dialog>
  );
};

export default TeacherBoardTaskModal;
