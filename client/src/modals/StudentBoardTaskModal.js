import { Dialog } from "@mui/material";
import styled from "styled-components";

const StudentBoardTaskModal = ({ isModalOpen, setIsModalOpen, task }) => {
  return (
    <Dialog open={isModalOpen}>
      <Wrapper>
        <h3>{task.title}</h3>
        <p>{task.message}</p>
        <h5>{task.dueDate}</h5>
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
