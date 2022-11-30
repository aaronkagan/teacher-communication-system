import styled from "styled-components";
const Announcement = ({ announcement }) => {
  return (
    <Wrapper>
      {console.log(announcement)}
      <h3>Teacher: {announcement.createdByName}</h3>
      <p>{announcement.message}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid lightgray;
`;

export default Announcement;
