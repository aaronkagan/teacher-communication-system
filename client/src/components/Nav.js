import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import isUserLoggedIn from "../functions/isUserLoggedIn";
import handleLogout from "../functions/handleLogout";
import getUserRole from "../functions/getUserRole";
const Nav = () => {
  const { userState, setUserState } = useContext(UserContext);

  return (
    <Navbar>
      <StyledLink to={isUserLoggedIn() ? "/dashboard" : "/"}>Home</StyledLink>
      {getUserRole() === "admin" || getUserRole() === "teacher" ? <StyledLink to="/board/teacher">Teacher Board</StyledLink> : null}
      {getUserRole() === "admin" || getUserRole() === "student" ? <StyledLink to="/board/student">Student Board</StyledLink> : null}
      {getUserRole() === "admin" && <StyledLink to="/users">Users</StyledLink>}
      {isUserLoggedIn() ? (
        <StyledLink to="/login" onClick={() => handleLogout(setUserState)}>
          Logout
        </StyledLink>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
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
