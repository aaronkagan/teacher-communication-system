import styled from "styled-components";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Board from "./components/Board";
import Nav from "./components/Nav";
// import MultiColumnBoard from "./components/MultiColumnBoard";
// import StudentBoard from "./components/StudentBoard";
import AddUser from "./modals/AddUser";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import NotAuthorized from "./pages/NotAuthorized";
import Home from "./pages/Home";
import UserAccounts from "./pages/UserAccounts";

const App = () => {
  // const { userState } = useContext(UserContext);
  console.log(useContext(UserContext));

  return (
    <Router>
      <Nav />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/board/teacher" element={userState.role === "teacher" || userState.role === "admin" ? <MultiColumnBoard /> : <NotAuthorized />} /> */}
          {/* <Route path="/board/teacher" element={<MultiColumnBoard />} /> */}

          {/* <Route path="/board/student" element={userState.role === "student" || userState.role === "admin" ? <StudentBoard /> : <NotAuthorized />} /> */}
          {/* <Route path="/board/student" element={<StudentBoard />} /> */}

          {/* <Route path="/users" element={userState.role === "admin" ? <UserAccounts /> : <NotAuthorized />} /> */}
          <Route path="/users" element={<UserAccounts />} />
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
