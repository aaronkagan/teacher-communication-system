import styled from "styled-components";

const Announcement = ({ announcement }) => {
  return (
    <Wrapper isRead={announcement.isRead}>
      <h3>{announcement.createdByName}</h3>
      <p>{announcement.message}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 0 10px lightgray;
  border-radius: 5px;
  padding: 5px 20px;
  width: 600px;

  font-family: monospace;
  overflow-wrap: break-word;
  p {
    font-size: 25px;
  }
  background: ${(props) => (props.isRead ? "lightgray" : "white")};
  color: ${(props) => (props.isRead ? "darkgray" : "black")};
`;

export default Announcement;
