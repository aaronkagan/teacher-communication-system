import styled from "styled-components";
const Announcement = ({ announcement }) => {
  return (
    <Wrapper>
      <h3>{announcement.createdByName}</h3>
      <p>{announcement.message}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 0 10px lightgray;
  border-radius: 5px;
  padding: 20px;
  width: 200px;
  font-family: monospace;
  overflow-wrap: break-word;
  p {
    font-size: 25px;
  }
`;

export default Announcement;
