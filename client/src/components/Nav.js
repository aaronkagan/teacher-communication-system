import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import isUserLoggedIn from "../functions/isUserLoggedIn";
import handleLogout from "../functions/handleLogout";
import getUserRole from "../functions/getUserRole";
const image = require("../style/assets/images/readme-large.png");
const Nav = () => {
  const { userState, setUserState } = useContext(UserContext);

  return (
    <Navbar>
      <Logo src={image} />
      <Links>
        <StyledLink to={isUserLoggedIn() ? "/dashboard" : "/"}>Home</StyledLink>
        {getUserRole() === "admin" || getUserRole() === "teacher" ? <StyledLink to="/board/teacher">Teacher Board</StyledLink> : null}
        {getUserRole() === "admin" || getUserRole() === "student" ? <StyledLink to="/board/student">Student Board</StyledLink> : null}
        {getUserRole() === "admin" || getUserRole() === "teacher" ? <StyledLink to="/announcements/teacher">Teacher Announcements</StyledLink> : null}
        {getUserRole() === "admin" || getUserRole() === "reader" ? <StyledLink to="/announcements/reader">Reader Announcements</StyledLink> : null}
        {getUserRole() === "admin" && <StyledLink to="/users">Users</StyledLink>}
        {isUserLoggedIn() ? (
          <StyledLink to="/" onClick={() => handleLogout(setUserState)}>
            Logout
          </StyledLink>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
      </Links>
    </Navbar>
  );
};

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 40px;
`;

const Logo = styled.img``;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: sans-serif;
  color: #727272;
`;

export default Nav;
