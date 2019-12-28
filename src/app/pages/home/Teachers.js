import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { getTeachers, deleteTeacher } from '../../crud/teachers.crud';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { getTextLabels } from './_datatable_locale';
import swal from 'sweetalert';

import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { toAbsoluteUrl } from "../../../_metronic";

export default function Teachers(props) {
    useEffect(() => {
        document.title = 'Nhân sự';
        // Lay du lieu
        getData();
    }, []);
    const auth = useSelector(state => state.auth);
    const getData = () => {
        getTeachers().then((result) => {
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
                    deleteTeacher(id).then((data) => {
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
    //const [filters, setFilters] = useState([]);
    const [columns] = useState([
        {
            name: "id", label: "ID",
        },
        {
            name: "user", label: "Tên",
            options: {
                customBodyRender: (value) => {
                    return <><Link to={toAbsoluteUrl('users/' + value.id)} style={{ color: "black" }}><Avatar src={value.avatar_url} className="" alt="Avatar" /> {value.name}</Link></>;
                }
            }
        },
        {
            name: "academic_rank", label: "Học hàm",
            options: {
                customBodyRender: (value) => {
                    if (!!value) return value;
                    else return "Không";
                }
            }
        },
        {
            name: "degree", label: "Học vị",
            options: {
                customBodyRender: (value) => {
                    if (!!value) return value;
                    else return "Không";
                }
            }
        },
        {
            name: "specialization", label: "Chuyên môn",
            options: {
                customBodyRender: (value) => {
                    if (!!value) return value;
                    else return "Không";
                }
            }
        },
        {
            name: "faculty", label: "Khoa",
            options: {
                customBodyRender: (value) => {
                    if (!!value) return value;
                    else return "Không";
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
                                <Link to={path + tableMeta.rowData[1].id} style={{ textDecoration: 'none', color: 'inherit' }}><Visibility fontSize="large" /></Link>
                            </Tooltip>
                            {auth.user.is_admin &&
                                <>
                                    <Tooltip title="Sửa">
                                        <Link to={path + tableMeta.rowData[1].id + "/edit"} style={{ textDecoration: 'none', color: 'inherit' }}><Edit fontSize="large" /></Link>
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

    const options = {
        fiter: true,
        filterType: 'multiselect',
        count: total,
        responsive: "scrollFullHeight",
        textLabels: getTextLabels()
    };
    return (
        <>
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Hồ sơ Giảng viên"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        </>
    );
}