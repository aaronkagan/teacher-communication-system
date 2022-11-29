import { useState } from "react";

import StudentBoardTaskModal from "../modals/StudentBoardTaskModal";

const StudentBoardTask = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <h3 onClick={() => setIsModalOpen(true)}>{task.title}</h3>
      <StudentBoardTaskModal task={task} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default StudentBoardTask;
