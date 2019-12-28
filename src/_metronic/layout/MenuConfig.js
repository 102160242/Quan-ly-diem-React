export default {
  header: {
    self: {},
    items: [
      // {
      //   title: "Dashboards",
      //   root: true,
      //   alignment: "left",
      //   page: "dashboard",
      //   translate: "MENU.DASHBOARD"
      // }
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
        bullet: "dot",
        admin_only: true
      },
      { section: "Quản lý" },
      {
        title: "Nhân sự",
        root: true,
        icon: "fas fa-user-tie",
        page: "users",
        admin_only: true
      },
      {
        title: "Hồ sơ Giảng viên",
        root: true,
        icon: "fas fa-user-tie",
        page: "teachers",
        admin_only: true
      },
      {
        title: "Sinh viên",
        root: true,
        icon: "fas fa-users",
        page: "students",
        admin_only: true
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
        page: "courses",
        admin_only: true
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
        page: "course-class-scores"
      },
      {
        title: "Theo sinh viên",
        root: true,
        icon: "fas fa-user-graduate",
        page: "student-scores"
      },
      { section: "Import/Export dữ liệu", admin_only: true },
      {
        title: "Import",
        root: true,
        icon: "fas fa-file-import",
        page: "data/import",
        admin_only: true
      },
      {
        title: "Export",
        root: true,
        icon: "fas fa-file-export",
        page: "data/export",
        admin_only: true
      },
    ]
  }
};
