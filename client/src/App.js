import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./style/GlobalStyles";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import TeacherBoard from "./pages/TeacherBoard";
import StudentBoard from "./pages/StudentBoard";
import NotAuthorized from "./pages/NotAuthorized";
import UserAdminPanel from "./pages/UserAdminPanel";
import Login from "./pages/Login";
import getUserRole from "./functions/getUserRole";
import DashBoard from "./pages/Dashboard";
import TeacherAnnouncements from "./pages/TeacherAnnouncements";
import AnnouncementReaderBoard from "./pages/AnnouncementReaderBoard";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Nav />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board/teacher" element={getUserRole() === "teacher" || getUserRole() === "admin" ? <TeacherBoard /> : <NotAuthorized />} />
          <Route path="/board/student" element={getUserRole() === "student" || getUserRole() === "admin" ? <StudentBoard /> : <NotAuthorized />} />
          <Route path="/users" element={getUserRole() === "admin" ? <UserAdminPanel /> : <NotAuthorized />} />
          <Route path="/announcements/teacher" element={<TeacherAnnouncements />} />
          <Route path="/announcements/reader" element={<AnnouncementReaderBoard />} />
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
