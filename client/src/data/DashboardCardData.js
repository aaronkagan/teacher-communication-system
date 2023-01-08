// This is the array used to create the dashboard features cards

const DashboardData = [
  {
    image: require('../style/assets/images/teacher-board-card-image.png'),
    text: 'Teacher Task Board',
    linkTo: '/board/teacher',
    rolesCanAccess: ['admin', 'teacher'],
    id: 1
  },
  {
    image: require('../style/assets/images/teacher-announcements-image.png'),
    text: 'Teacher Announcements',
    linkTo: '/announcements/teacher',
    rolesCanAccess: ['admin', 'teacher'],
    id: 2
  },
  {
    image: require('../style/assets/images/student-board-card-image.png'),
    text: 'Student Task Board',
    linkTo: '/board/student',
    rolesCanAccess: ['admin', 'student'],
    id: 3
  },

  {
    image: require('../style/assets/images/reader-image.png'),
    text: 'Reader Announcements',
    linkTo: '/announcements/reader',
    rolesCanAccess: ['admin', 'reader'],
    id: 4
  },
  {
    image: require('../style/assets/images/user-admin-image.png'),
    text: 'User Administration',
    linkTo: '/users',
    rolesCanAccess: ['admin'],
    id: 5
  }
];

export default DashboardData;
