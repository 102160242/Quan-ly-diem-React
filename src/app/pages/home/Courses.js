import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
//import axios from 'axios';
import { red } from "@material-ui/core/colors";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { getTextLabels } from './_datatable_locale';
import swal from 'sweetalert';

import Tooltip from "@material-ui/core/Tooltip";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { getCourses, deleteCourse } from "../../crud/courses.crud";

export default function Courses(props) {
    useEffect(() => {
        document.title = 'Học phần';
        getData();
        // Lay du lieu
    }, []);
    const auth = useSelector(state => state.auth);
    //const [semester, setSemester] = useState([]);
    // const prepareSemester = () => {
    //     getMeta().then((result) => {
    //         var from = result.data.data.from;
    //         var to = result.data.data.to;
    //         var data = [];
    //         var label = "";
    //         for(var i = from; i <= to; i++)
    //         {
    //             for(var j = 1; j <= 3; j++)
    //             {
    //                 switch(j)
    //                 {
    //                     case 1:
    //                         label = "Kỳ 2 " + (i - 1) + "-" + i;
    //                         break;
    //                     case 2: 
    //                         label = "Kỳ hè " + i;
    //                         break;
    //                     case 3:
    //                         label = "Kỳ 1 " + i + "-" + (i+1);
    //                         break;
    //                 }
    //                 data[label] = {"year": i, "semester": j}; 
    //             }
    //         }
    //         setSemester(data);
    //         var params = {
    //             "year": data[label].year,
    //             "semester": data[label].semester
    //         };
    //         //console.log("Params la ")
    //         //console.log(params)
    //         getData(params);
    //     })
    //     .catch((e) => {
    //         alertError(e);
    //     });;
    // }
    const getData = (params) => {
        getCourses(params).then((result) => {
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
                    deleteCourse(id).then((data) => {
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
            name: "name", label: "Tên học phần"
        },
        {
            name: "total_course_classes", label: "Số lượng lớp học phần"
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

    const options = {
        fiter: true,
        filterType: 'multiselect',
        //serverSide: true,
        count: total,
        responsive: "scrollFullHeight",
        textLabels: getTextLabels()
    };
    // const handleSemesterChange = (e) => {
    //     var params = {
    //         "year": semester[e.target.value].year,
    //         "semester": semester[e.target.value].semester
    //     };
    //     getData(params);
    //     // console.log(params)
    //     // console.log("CHANGE!!!!!!!!!!!");
    // }
    return (
        <>
            <div className="row">
                {/* <div className="col-md-3 mb-3">
                <label htmlFor="semester">Chọn kỳ học</label>
                <select className="form-control" id="semester" onChange={handleSemesterChange}>
                    { Object.keys(semester).reverse().map((i, k) => {
                        return <option value={i} key={k}>{i}</option>
                    }) }
                </select>
            </div> */}
                <div className="col-12">
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"Danh sách học phần"}
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