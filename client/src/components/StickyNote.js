import styled from "styled-components";

const StickyNote = ({ task, stickyColor, stickyDirection }) => {
  return (
    <Wrapper stickyColor={stickyColor} stickyDirection={stickyDirection}>
      <Title>{task.title}</Title>
      <Text>{task.message}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  width: 100px;
  background: ${(props) => props.stickyColor};
  box-shadow: 5px 5px 10px var(--primary-color);
  transform: ${(props) => props.stickyDirection};
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    transform: scale(1.5) rotate(0);
    position: relative;
    z-index: 1;
  }
`;

const Title = styled.h2`
  font-family: "Comic Sans Ms";
  font-size: 14px;
  margin: 5px 0 10px 0;
`;
const Text = styled.h3`
  font-size: 12px;
`;

export default StickyNote;
