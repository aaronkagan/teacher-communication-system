import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
const image = require("../style/assets/images/reader-image.png");

const AnnouncementReaderBoard = () => {
  const [announcements, setAnnouncements] = useState();
  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleMarkRead = (announcement) => {
    const { announcementId, isRead } = announcement;

    // Would probably do this in a cleaner way in the future instead of having to map over the whole array.
    // I would created two separate announcement components, one for the teachers and one for the reader. I would have this function in the reader's announcement component. I would also have a state local to that component for the specific announcement and then just call the function and the setState on that specific announcement's state. That way i wouldn't have to map over the whole announcements array.
    setAnnouncements(
      announcements.map((elem, index) => {
        if (index === announcements.indexOf(announcement)) {
          return { ...announcement, isRead: true };
        } else {
          return elem;
        }
      })
    );
    fetch("/api/announcement/markRead", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ announcementId })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Img src={image} />
      <Content>
        <h1>School Announcements</h1>
        {announcements
          ? announcements.map((announcement) => {
              return (
                <Container key={announcement.announcementId}>
                  <Announcement announcement={announcement} />

                  {!announcement.isRead ? <MarkAsReadButton onClick={() => handleMarkRead(announcement)}>Mark Read</MarkAsReadButton> : null}
                </Container>
              );
            })
          : "Loading..."}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #ffa7b587;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  gap: 20px;
  padding: 5vh 0;

  justify-content: center;
  * {
    font-family: "Courier New", Courier, monospace;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  width: 600px;
  margin-top: 5vh;
  margin-left: 5vw;
  padding: 5vh 5vh 2vh 5vh;
  height: max-content;
  background: #ffffffc2;
  border-radius: 10px;

  * {
    width: 95%;
  }
`;

const Img = styled.img`
  width: 350px;
  height: 350px;
  margin-top: 5vh;
  background: #ffffffb7;
  border-radius: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const MarkAsReadButton = styled.button`
  background-color: var(--success-color);
  color: white;
  padding: 0 10px;
  font-weight: bold;
  width: 150px;
  margin-right: auto;
  margin-left: 15px;
`;

export default AnnouncementReaderBoard;
