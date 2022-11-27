import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import TeacherBoard from "./pages/TeacherBoard";
import StudentBoard from "./pages/StudentBoard";
import NotAuthorized from "./pages/NotAuthorized";
import UserAccounts from "./pages/UserAccounts";
import Login from "./pages/Login";

import getUserRole from "./functions/getUserRole";

const App = () => {
  return (
    <Router>
      <Nav />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board/teacher" element={getUserRole() === "teacher" || getUserRole() === "admin" ? <TeacherBoard /> : <NotAuthorized />} />

          <Route path="/board/student" element={getUserRole() === "student" || getUserRole() === "admin" ? <StudentBoard /> : <NotAuthorized />} />
          <Route path="/users" element={getUserRole() === "admin" ? <UserAccounts /> : <NotAuthorized />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

const Wrapper = styled.div`
  /* background: #2297ff; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
`;

export default App;
