import styled from 'styled-components';

// This is the announcement component used on both the teacher announcement board and the reader announcement board

const Announcement = ({ announcement }) => {
  return (
    // The read status of the announcement
    // isRead attribute that i'm using to style the announcement conditionally in style components
    <Wrapper isRead={announcement.isRead}>
      {/* The announcement author */}
      <h3>{announcement.createdByName}</h3>
      {/* The announcement content */}
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
  // Displaying the font color and background color conditionally depending on the isRead status of the announcement
  background: ${(props) => (props.isRead ? 'lightgray' : 'white')};
  color: ${(props) => (props.isRead ? 'darkgray' : 'black')};
`;

export default Announcement;
