const DashboardData = {
  TeacherBoardCard: {
    image: require("../style/assets/images/teacher-board-card-image.png"),
    text: "Teacher Task Board",
    linkTo: "/board/teacher",
    id: 1
  },
  StudentBoardCard: {
    image: require("../style/assets/images/student-board-card-image.png"),
    text: "Student Task Board",
    linkTo: "/board/student",
    id: 2
  },
  TeacherAnnouncements: {
    image: require("../style/assets/images/teacher-announcements-image.png"),
    text: "Teacher Announcements",
    linkTo: "/announcements/teacher",
    id: 3
  },
  ReaderAnnouncements: {
    image: require("../style/assets/images/reader-image.png"),
    text: "Reader Announcements",
    linkTo: "/announcements/reader",
    id: 4
  },
  UserAdmin: {
    image: require("../style/assets/images/user-admin-image.png"),
    text: "User Administration",
    linkTo: "/users",
    id: 5
  }
};

export default DashboardData;
