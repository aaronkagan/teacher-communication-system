import { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import CreateAnnouncementModal from "../modals/CreateAnnouncementModal";

const TeacherAnnouncements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Wrapper>
      <button onClick={() => setIsModalOpen(true)}>Open</button>
      <CreateAnnouncementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TeacherAnnouncements;
