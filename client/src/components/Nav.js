import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Nav = () => {
  const { userState, setUserState } = useContext(UserContext);

  const handleLogout = () => {
    setUserState({});
  };

  return (
    <Navbar>
      <StyledLink to="/">Home</StyledLink>
      {userState.role === "admin" || userState.role === "teacher" ? <StyledLink to="/board/teacher">Teacher Board</StyledLink> : null}
      {userState.role === "admin" || userState.role === "student" ? <StyledLink to="/board/student">Student Board</StyledLink> : null}
      <StyledLink to="/users">Users</StyledLink>
      {userState.role && (
        <StyledLink to="/login" onClick={handleLogout}>
          Logout
        </StyledLink>
      )}
      {!userState.role && <StyledLink to="/login">Login</StyledLink>}
    </Navbar>
  );
};

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 50px;
  padding-right: 40px;
  padding-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: sans-serif;
  color: #727272;
`;

export default Nav;
