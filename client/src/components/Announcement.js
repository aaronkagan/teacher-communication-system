import { useContext } from "react";
// import UserContext from "../contexts/UserContext";

import styled from "styled-components";
const Announcement = () => {
  // const { userState } = useContext(UserContext);

  return (
    <Wrapper>
      {/* {console.log(userState)} */}
      <h3></h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid lightgray;
`;

export default Announcement;
