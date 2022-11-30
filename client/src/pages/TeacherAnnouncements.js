import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import CreateAnnouncementModal from "../modals/CreateAnnouncementModal";
import getUserId from "../functions/getUserId";

const TeacherAnnouncements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myAnnouncements, setMyAnnouncements] = useState();

  const userId = getUserId();

  useEffect(() => {
    fetch(`/api/announcements/${userId}`)
      .then((res) => res.json())
      .then((data) => setMyAnnouncements(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Wrapper>
      <h1>My Announcements</h1>
      {myAnnouncements
        ? myAnnouncements.map((announcement) => {
            return <Announcement key={announcement.announcementId} announcement={announcement} />;
          })
        : "Loading..."}
      <button onClick={() => setIsModalOpen(true)}>Create Announcement</button>
      <CreateAnnouncementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} myAnnouncements={myAnnouncements} setMyAnnouncements={setMyAnnouncements} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 50px;
`;

export default TeacherAnnouncements;
