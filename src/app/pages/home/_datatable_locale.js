export const getTextLabels = () => {
    return {
        body: {
            noMatch: "Xin lỗi, không có dữ liệu phù hợp!",
            toolTip: "Sắp xếp",
            columnHeaderTooltip: column => `Sắp xếp theo cột ${column.label}`
        },
        pagination: {
            next: "Trang tiếp theo",
            previous: "Trang trước",
            rowsPerPage: "Số dòng trên mỗi trang:",
            displayRows: "trong",
        },
        toolbar: {
            search: "Tìm kiếm",
            downloadCsv: "Download CSV",
            print: "In",
            viewColumns: "Xem các cột",
            filterTable: "Lọc bảng",
        },
        filter: {
            all: "TẤT CẢ",
            title: "LỌC",
            reset: "RESET",
        },
        viewColumns: {
            title: "Hiện các cột",
            titleAria: "Ẩn/Hiện các cột của bảng",
        },
        selectedRows: {
            text: "dòng đã được chọn",
            delete: "Xoá",
            deleteAria: "Xoá những dòng đã chọn",
        }
    }
}
