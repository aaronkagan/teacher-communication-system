import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import CreateAnnouncementModal from "../modals/CreateAnnouncementModal";
import getUserId from "../functions/getUserId";
const image = require("../style/assets/images/teacher-announcements-image.png");

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
      .then((data) => data)
      .catch((err) => {
        console.log(err);
        alert("An unknown error has occurred");
        window.location.reload(0);
      });
  };
  return (
    <Wrapper>
      <Img src={image} />
      <Content>
        <H1>My Announcements</H1>
        {myAnnouncements
          ? myAnnouncements.map((announcement) => {
              return (
                <Container key={announcement.announcementId}>
                  <Announcement announcement={announcement} />
                  <DeleteAnnouncementButton onClick={() => handleDeleteAnnouncement(announcement.announcementId)}>Delete Announcement</DeleteAnnouncementButton>
                </Container>
              );
            })
          : "Loading..."}
        <CreateAnnouncementButton onClick={() => setIsModalOpen(true)}>Create Announcement</CreateAnnouncementButton>
        <CreateAnnouncementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} myAnnouncements={myAnnouncements} setMyAnnouncements={setMyAnnouncements} />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10vw;
  width: 90vw;
  padding-top: 10vh;
  * {
    font-family: "Courier New", Courier, monospace;
  }
`;

const Img = styled.img`
  width: 350px;
  height: 350px;
`;
const Content = styled.div`
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
`;

const H1 = styled.h1`
  margin-bottom: 20px;
  font-size: 25px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CreateAnnouncementButton = styled.button`
  background: var(--success-color);
  color: white;
  margin-top: 0px;
  font-weight: bold;
  color: black;
  padding: 0 10px;
`;
const DeleteAnnouncementButton = styled.button`
  background: 0;
  color: blue;
  margin-bottom: 20px;
  margin-right: auto;
`;

export default TeacherAnnouncements;
