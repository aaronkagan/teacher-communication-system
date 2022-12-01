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

  const handleDeleteAnnouncement = (announcementId) => {
    setMyAnnouncements(
      [...myAnnouncements].filter((announcement) => {
        return announcement.announcementId !== announcementId;
      })
    );

    fetch("/api/announcement", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ announcementId: announcementId })
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
        alert("An unknown error has occurred");
        window.location.reload(0);
      });
  };
  return (
    <Wrapper>
      {console.log(myAnnouncements)}
      <h1>My Announcements</h1>
      {myAnnouncements
        ? myAnnouncements.map((announcement) => {
            return (
              <div key={announcement.announcementId}>
                <Announcement announcement={announcement} />
                <DeleteAnnouncementButton onClick={() => handleDeleteAnnouncement(announcement.announcementId)}>Delete Announcement</DeleteAnnouncementButton>
              </div>
            );
          })
        : "Loading..."}
      <CreateAnnouncementButton onClick={() => setIsModalOpen(true)}>Create Announcement</CreateAnnouncementButton>
      <CreateAnnouncementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} myAnnouncements={myAnnouncements} setMyAnnouncements={setMyAnnouncements} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 50px;
`;

const CreateAnnouncementButton = styled.button`
  background: var(--success-color);
  color: white;
`;

const DeleteAnnouncementButton = styled(CreateAnnouncementButton)`
  background: var(--cancel-color);
`;

export default TeacherAnnouncements;
