import styled from "styled-components";

const StickyNote = ({ task, stickyColor, stickyDirection }) => {
  return (
    <Wrapper stickyColor={stickyColor} stickyDirection={stickyDirection}>
      <h2>{task.title}</h2>
      <h5>{task.message}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  width: 100px;
  background: ${(props) => props.stickyColor};
  box-shadow: 5px 5px 10px var(--primary-color);
  transform: ${(props) => props.stickyDirection};

  &:hover {
    transform: scale(1.5) rotate(0);
    position: relative;
    z-index: 1;
  }
`;

export default StickyNote;
