import { Dialog } from "@mui/material";
import styled from "styled-components";

const TeacherBoardTaskModal = ({ isModalOpen, setIsModalOpen, task }) => {
  return (
    <Dialog open={isModalOpen}>
      <Wrapper>
        <h3>{task.title}</h3>
        <p>{task.message}</p>
        <h5>Due: {task.dueDate}</h5>
        <CommentsContainer>
          {/* TODO : create separate comment component to render here instead on rendering inline */}
          {task.comments.map((comment) => {
            console.log(comment);
            return (
              <CommentContainer>
                <h3>{comment.createdBy}</h3>
                <p>{comment.comment}</p>
              </CommentContainer>
            );
          })}
        </CommentsContainer>
        <button type="button" onClick={() => setIsModalOpen(false)}>
          Close
        </button>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const CommentsContainer = styled.div`
  box-shadow: 0 0 10px gray;
`;

const CommentContainer = styled.div``;

export default TeacherBoardTaskModal;
