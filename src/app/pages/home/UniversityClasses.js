import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { getTextLabels } from './_datatable_locale';
import swal from 'sweetalert';
import { toAbsoluteUrl } from "../../../_metronic";
import { getClasses, deleteClass } from "../../crud/university_classes.crud";
import { Dropdown } from 'react-bootstrap';

export default function UniversityClasses(props) {
    useEffect(() => {
        document.title = 'Lớp sinh hoạt';
        // Lay du lieu
        getData();
    }, []);
    const auth = useSelector(state => state.auth);
    const getData = () => {
        getClasses().then((result) => {
            var data = result.data.data;
            setTotal(data.length);
            setData(data);
        })
            .catch((e) => {
                if (!!e.response) {
                    swal({
                        icon: 'error',
                        title: 'Ôi...',
                        text: e.response.data.messages[0],
                    })
                }
                else {
                    swal({
                        icon: 'error',
                        title: 'Ôi...',
                        text: 'Đã có lỗi xảy ra khi kết nối đến server!',
                    })
                }
            });
    }
    const deleteItem = (id) => {

        swal({
            title: "Bạn có chắc chắn?",
            text: "Hãy đảm bảo rằng bạn thực sự muốn xoá",
            icon: "warning",
            buttons: ["Huỷ", "Xoá!"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteClass(id).then((data) => {
                        swal({
                            icon: 'success',
                            //title: 'O...',
                            text: data.data.messages[0],
                        });
                        getData(); // Lay lai du lieu
                    })
                        .catch((e) => {
                            if (!!e.response) {
                                swal({
                                    icon: 'error',
                                    title: 'Ôi...',
                                    text: e.response.data.messages[0],
                                })
                            }
                            else {
                                swal({
                                    icon: 'error',
                                    title: 'Ôi...',
                                    text: 'Đã có lỗi xảy ra khi kết nối đến server!',
                                })
                            }
                        });
                }
            });

    }
    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    fontSize: "1 rem"
                }
            }
        }
    })
    const [columns] = useState([
        {
            name: "id", label: "ID",
        },
        {
            name: "name", label: "Tên"
        },
        {
            name: "academic_year", label: "Khoá"
        },
        {
            name: "faculty", label: "Khoa"
        },
        {
            name: "total_students", label: "Số sinh viên"
        },
        {
            name: "head_users", label: "Chủ nhiệm",
            options: {
                customBodyRender: (value) => {
                    if (value.length == 0)
                        return "Không có chủ nhiệm";
                    else {
                        return value.map((i) => {
                            return <Link to={toAbsoluteUrl('/users/' + i.id)} key={i.id}>{i.name + ", "}</Link>
                        });
                    }
                }
            }
        },
        {
            name: "actions", label: "Hành động",
            options:
            {
                customBodyRender: (value, tableMeta, updateValue) => {
                    var path = props.history.location.pathname + "/";
                    return (
                        <>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                                <i class="flaticon-more-1"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Link to={path + tableMeta.rowData[0]} className="dropdown-item" style={{ textDecoration: 'none', color: 'inherit' }}><i className="flaticon-information"></i> Xem</Link>
                                {auth.user.is_admin &&
                                    <>
                                        <Link to={path + tableMeta.rowData[0] + "/edit"} className="dropdown-item" style={{ textDecoration: 'none', color: 'inherit' }}><i className="flaticon-edit"></i> Sửa</Link>
                                        <Link to={"#"} className="dropdown-item" onClick={() => { deleteItem(tableMeta.rowData[0]) }}><i className="flaticon-delete"></i> Xoá</Link>
                                    </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        </>
                    )
                },
                sort: false,
                filter: false
            }
        }
    ]);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(1);
    //const [academicYear, setAcademicYear] = useState([]);

    const options = {
        fiter: true,
        filterType: 'multiselect',
        selectableRows: 'none',
        //serverSide: true,
        count: total,
        responsive: "scrollFullHeight",
        textLabels: getTextLabels()
    };
    // const handleAcademicYearChange = (e) => {

    // }
    return (
        <>
            <div className="row">
                {/* <div className="col-md-3 mb-3">
                    <label htmlFor="academic_year">Chọn khoá</label>
                    <select className="form-control" id="academic_year" onChange={handleAcademicYearChange}>
                        {academicYear.map((i, k) => {
                            return <option value={i} key={k}>{i}</option>
                        })}
                    </select>
                </div> */}
                <div className="col-12">
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"Danh sách lớp sinh hoạt"}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        </>
    );
}