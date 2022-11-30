import { Dialog } from "@mui/material";
import styled from "styled-components";

const CreateAnnouncementModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Dialog open={isModalOpen}>
      <Wrapper>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div``;

export default CreateAnnouncementModal;
