import styled from "styled-components";
const thumbtack = require("../style/assets/icons/thumbtack.png");

const StickyNote = ({ task, stickyColor, stickyDirection }) => {
  return (
    <Wrapper stickyColor={stickyColor} stickyDirection={stickyDirection}>
      <Img src={thumbtack} />
      <Title>{task.title}</Title>
      <Text>{task.message}</Text>
      {task.comments.length > 0 && <SeeComments>See comments...</SeeComments>}
      {task.file.fileName && <SeeFile>See attached file...</SeeFile>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100px;
  padding-bottom: 10px;
  background: ${(props) => props.stickyColor};
  box-shadow: 5px 5px 10px var(--primary-color);
  transform: ${(props) => props.stickyDirection};
  text-align: center;
  overflow: hidden;

  &:hover {
    transform: scale(1.5) rotate(0);
    position: relative;
    z-index: 1;
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 30px;
  margin-left: 30px;
`;

const Title = styled.h2`
  font-family: "Comic Sans Ms";
  font-size: 14px;
  margin: 5px 0 10px 0;
`;
const Text = styled.h3`
  font-size: 12px;
  font-family: "Comic Sans Ms";
`;

const SeeComments = styled.p`
  font-family: "Comic Sans Ms";
  font-size: 10px;
  margin-top: 5px;
`;

const SeeFile = styled(SeeComments)`
  font-size: 10px;
  margin-top: 0;
`;

export default StickyNote;
