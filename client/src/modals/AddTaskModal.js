import styled from "styled-components";
import { Dialog } from "@mui/material";

const AddTaskModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Dialog open={isModalOpen}>
      <Wrapper>
        <Form>
          <h2>Add New Task</h2>
          <input type="text" id="title" placeholder="Title" />
          <textarea name="content" id="content" cols="30" rows="4" placeholder="Message" />
          <label htmlFor="due">Due:</label>
          <input type="date" placeholder="due" />
          <input type="file" />
          <ButtonsContainer>
            <SubmitButton type="button">Submit</SubmitButton>
            <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CancelButton>
          </ButtonsContainer>
        </Form>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 10px 30px 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background: lightblue;
  border: 0;
  color: white;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const CancelButton = styled(SubmitButton)`
  background: lightpink;
`;

export default AddTaskModal;
