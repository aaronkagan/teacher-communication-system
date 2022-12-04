import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./style/GlobalStyles";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import TeacherBoard from "./pages/TeacherBoard";
import StudentBoard from "./pages/StudentBoard";
import UserAdminPanel from "./pages/UserAdminPanel";
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import TeacherAnnouncements from "./pages/TeacherAnnouncements";
import AnnouncementReaderBoard from "./pages/AnnouncementReaderBoard";
import NotAuthorized from "./pages/NotAuthorized";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Nav />
      {/* <Wrapper> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board/teacher" element={<TeacherBoard />} />
        <Route path="/board/student" element={<StudentBoard />} />
        <Route path="/users" element={<UserAdminPanel />} />
        <Route path="/announcements/teacher" element={<TeacherAnnouncements />} />
        <Route path="/announcements/reader" element={<AnnouncementReaderBoard />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
      {/* </Wrapper> */}
    </Router>
  );
};

const Wrapper = styled.div`
  /* background: #2297ff; */
  /* height: 100vh;
  display: flex;
  justify-content: center; */
  /* align-items: flex-start; */
  /* padding-top: 10vh; */
`;

export default App;
