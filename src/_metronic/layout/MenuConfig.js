export default {
  header: {
    self: {},
    items: [
      {
        title: "Dashboards",
        root: true,
        alignment: "left",
        page: "dashboard",
        translate: "MENU.DASHBOARD"
      }
    ]
  },
  aside: {
    self: {},
    items: [
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      { section: "Quản lý" },
      {
        title: "Nhân sự",
        root: true,
        icon: "fas fa-user-tie",
        page: "users"
      },
      {
        title: "Hồ sơ Giảng viên",
        root: true,
        icon: "fas fa-user-tie",
        page: "teachers"
      },
      {
        title: "Sinh viên",
        root: true,
        icon: "fas fa-users",
        page: "students"
      },
      {
        title: "Lớp sinh hoạt",
        root: true,
        icon: "fas fa-chalkboard-teacher",
        page: "university-classes"
      },
      {
        title: "Học phần",
        root: true,
        icon: "fas fa-book-open",
        page: "courses"
      },
      {
        title: "Lớp học phần",
        root: true,
        icon: "fas fa-book-reader",
        page: "course-classes"
      },
      { section: "Xem điểm" },
      {
        title: "Theo lớp học phần",
        root: true,
        icon: "fas fa-book-reader",
        page: "scores"
      },
      // {
      //   title: "Theo sinh viên",
      //   root: true,
      //   icon: "fas fa-book-reader",
      //   page: "student-scores"
      // },
    ]
  }
};
