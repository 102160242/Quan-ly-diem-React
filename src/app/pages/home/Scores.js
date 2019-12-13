import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import swal from 'sweetalert';

import { getScores, updateScore } from '../../crud/scores.crud';
import { getMeta, getCourseClasses } from "../../crud/course_classes.crud";

export default function Scores(props) {
    useEffect(() => {
        document.title = 'Điểm lớp học phần';
        // Lay du lieu
        prepareSemester();
    }, []);
    const [semester, setSemester] = useState([]);
    const [courseClasses, setCourseClasses] = useState([]);
    const prepareSemester = () => {
        getMeta().then((result) => {
            var from = result.data.data.from;
            var to = result.data.data.to;
            var data = [];
            var label = "";
            for(var i = from; i <= to; i++)
            {
                for(var j = 1; j <= 3; j++)
                {
                    switch(j)
                    {
                        case 1:
                            label = "Kỳ 2 " + (i - 1) + "-" + i;
                            break;
                        case 2: 
                            label = "Kỳ hè " + i;
                            break;
                        case 3:
                            label = "Kỳ 1 " + i + "-" + (i+1);
                            break;
                    }
                    data[label] = {"year": i, "semester": j}; 
                }
            }
            setSemester(data);
            var params = {
                "year": data[label].year,
                "semester": data[label].semester
            };

            // Lấy ds các lớp học phần
            getCourseClasses_(params);
        })
        .catch((e) => {
            alertError(e);
        });
    }
    const getCourseClasses_ = (params) => {
        getCourseClasses(params).then((result) => {
            var data = result.data.data;
            //console.log(data);
            setCourseClasses(data);
            if(data.length !== 0) getData(data[0].id);
        })
        .catch((e) => {
            alertError(e);
        });
    }
    const getData = (course_class_id) => {
        var params = { view: 'course_class', id: course_class_id}
        getScores(params).then((result) => {
            var result = result.data.data;
            //console.log(result);

            // Tạo columns
            var columns = [];
            columns.push({ title: "#", field: "no", editable: 'never', type: "numeric" })
            columns.push({ title: "MSSV", field: "student_id", editable: "never" }); // ID của sinh viên
            columns.push({ title: "Tên", field: "name", editable: 'never' });
            result[0].scores.columns.forEach((i) => {
                //console.log(i)
                columns.push({ title: i.name, field: i.id.toString(), type: "numeric" });
            })
            columns.push({ title: "Điểm TB", field: "avg", editable: 'never' });
            //console.log(columns);

            // Tạo Data
            var data = [];
            var count = 1;
            result.forEach((i) => {
                var d = {};
                var avg = 0;
                d[columns[0].field] = count++; // Số thứ tự
                d[columns[2].field] = i.name; // Tên
                for(var j = 0; j < i.scores.columns.length; j++)
                {
                    //console.log(i);
                    d[columns[j+3].field] = i.scores.data[j]; 
                    avg += !!i.scores.data[j] ? (i.scores.data[j] * i.scores.columns[j].ratio) : 0;
                }
                d["avg"] = avg.toFixed(2);
                d["student_id"] = i.id; // ID Sinh viên
                data.push(d);
            })

            setState({ columns: columns, data: data});
        })
        .catch((e) => {
            alertError(e);
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

    const [state, setState] = React.useState({
        columns: [],
        data: [],
      });

    const handleSemesterChange = (e) => {
        var params = {
            "year": semester[e.target.value].year,
            "semester": semester[e.target.value].semester
        };
        getCourseClasses_(params);
    }
    const handleCourseClassesChange = (e) => {
        getData(e.target.value);
    }
      return (
        <>
        <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="semester">Chọn kỳ học</label>
                <select className="form-control" id="semester" onChange={handleSemesterChange}>
                    { Object.keys(semester).reverse().map((i, k) => {
                        return <option value={i} key={k}>{i}</option>
                    }) }
                </select>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="courseClass">Chọn lớp học phần</label>
                <select className="form-control" id="courseClass" onChange={handleCourseClassesChange}>
                    { courseClasses.map((i, k) => {
                        return <option value={i.id} key={k}>{i.id + ". " + i.name}</option>
                    }) }
                </select>
            </div>
            <div className="col-12">
            <MuiThemeProvider theme={getMuiTheme()}>
                <MaterialTable
                    title="Bảng điểm"
                    columns={state.columns}
                    data={state.data}
                    options={{
                        exportButton: true,
                        pageSize: 20
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            if (oldData) {
                                console.log(oldData)
                                var keys = Object.keys(oldData);
                                for(var i = 0; i < keys.length - 2; i++)
                                {
                                    if(oldData[keys[i]] != newData[keys[i]])
                                    {
                                        //console.log(keys[i] + " Thay doi");
                                        updateScore(newData.student_id, parseInt(keys[i]), parseFloat(newData[keys[i]]))
                                        .then(() => {
                                            
                                        })
                                        .catch((e) =>
                                        {
                                            newData[keys[i]] = oldData[keys[i]];
                                        });     
                                    }
                                }
                                setState(prevState => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                                });
                            }
                            }, 600);
                        }),
                    }}
                    />
                </MuiThemeProvider>
            </div>
        </div>
        </>
      );
}