import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { getTextLabels } from './_datatable_locale';
import swal from 'sweetalert';

import Tooltip from "@material-ui/core/Tooltip";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { getMeta, getStudents, deleteStudent } from "../../crud/students.crud";

export default function Students(props) {
    useEffect(() => {
        document.title = 'Sinh viên';
        // Lay du lieu
        prepareData();
    }, []);
    const auth = useSelector(state => state.auth);

    const prepareData = () => {
        getMeta().then((result) => {
            var data = result.data.data;
            var t = [];
            for (var i = data.to; i >= data.from; i--) t.push(i);
            setAcademicYear(t);
            getData({ "academic_year": data.to });
        })
            .catch((e) => {
                alertError(e);
            });
    }
    const getData = (params) => {
        getStudents(params).then((result) => {
            var data = result.data.data;
            setTotal(data.length);
            setData(data);
        })
            .catch((e) => {
                alertError(e);
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
                    deleteStudent(id).then((data) => {
                        swal({
                            icon: 'success',
                            //title: 'O...',
                            text: data.data.messages[0],
                        });
                        getData(); // Lay lai du lieu
                    })
                        .catch((e) => {
                            alertError(e);
                        });
                }
            });

    }
    const alertError = (e) => {
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
            name: "gender", label: "Giới tính",
            options: {
                customBodyRender: (value) => {
                    if (value) return <span className="kt-badge kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">Nam</span>
                    else return <span className="kt-badge kt-badge--unified-danger kt-badge--lg kt-badge--rounded kt-badge--bold">Nữ</span>
                }
            }
        },
        {
            name: "birthday", label: "Ngày sinh"
        },
        {
            name: "phone_number", label: "Số điện thoại"
        },
        {
            name: "email", label: "Email"
        },
        {
            name: "university_class", label: "Lớp sinh hoạt",
            options: {
                customBodyRender: (value) => {
                    return value.name
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
                            <Tooltip title="Xem">
                                <Link to={path + tableMeta.rowData[0]} style={{ textDecoration: 'none', color: 'inherit' }}><Visibility fontSize="large" /></Link>
                            </Tooltip>
                            { auth.user.is_admin && 
                                <>
                                    <Tooltip title="Sửa">
                                        <Link to={path + tableMeta.rowData[0] + "/edit"} style={{ textDecoration: 'none', color: 'inherit' }}><Edit fontSize="large" /></Link>
                                    </Tooltip>

                                    <Tooltip title="Xoá">
                                        <Delete fontSize="large" onClick={() => { deleteItem(tableMeta.rowData[0]) }} />
                                    </Tooltip>
                                </>
                            }
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
    const [academicYear, setAcademicYear] = useState([]);

    const options = {
        fiter: true,
        filterType: 'multiselect',
        //serverSide: true,
        count: total,
        responsive: "scrollFullHeight",
        textLabels: getTextLabels()
    };

    const handleAcademicYearChange = (e) => {
        getData({ "academic_year": e.target.value });
    }
    return (
        <>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="academic_year">Chọn khoá</label>
                    <select className="form-control" id="academic_year" onChange={handleAcademicYearChange}>
                        {academicYear.map((i, k) => {
                            return <option value={i} key={k}>{i}</option>
                        })}
                    </select>
                </div>
                <div className="col-12">
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"Danh sách sinh viên"}
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