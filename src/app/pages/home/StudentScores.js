import React, { useEffect, useState } from "react";
import swal from 'sweetalert';

import { getScores, updateScore } from '../../crud/scores.crud';
import { getClasses } from "../../crud/university_classes.crud";
import { getStudents } from "../../crud/students.crud";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function StudentScores(props) {
    useEffect(() => {
        document.title = 'Điểm lớp học phần';
        // Lay du lieu
        prepareData();
    }, []);
    const [universityClass, setUniversityClass] = useState([]);
    const [students, setStudents] = useState([]);

    const prepareData = () => {
        getClasses().then((result) => {
            var result = result.data.data;
            setUniversityClass(result);

            if(result.length !== 0)
            {
                var params = {
                    "university_class_id": result[0].id,
                };
    
                // Lấy ds các lớp học phần
                getStudents_(params);
            }
        })
            .catch((e) => {
                alertError(e);
            });
    }
    const getStudents_ = (params) => {
        getStudents(params).then((result) => {
            var data = result.data.data;
            setStudents(data);
            getData(data[0].id);
        })
            .catch((e) => {
                alertError(e);
            });
    }
    const getData = (student_id) => {
        var params = { view: 'student', id: student_id }
        getScores(params).then((result) => {
            var result = result.data.data;
            //console.log(result);

            // Tạo columns
            var columns = [];
            var courseClassName = [];
            var data = [];

            for (var i = 0; i < result.length; i++) {
                //console.log(result[i])
                //console.log((columns));
                courseClassName.push(result[i].name);
                var d = [];
                var index = 0;
                result[i].scores.columns.forEach((column) => {
                    d[column.name] = result[i].scores.data[index++];
                    if (!Object.keys(columns).includes(column.name)) {
                        columns[column.name] = column.ratio; // Nếu chưa tồn tại cột điểm thì thêm vào
                    }

                    //console.log(column.name)
                });
                data.push(d);
                //if(!columns.includes(result[i]))
            }
            //console.log(data);
            setState({ columns: columns, data: data, courseClassName: courseClassName });
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

    const [state, setState] = React.useState({
        columns: [],
        data: [],
        courseClassName: []
    });

    const handleuniversityClassesChange = (e) => {
        var params = {
            "university_class_id": e.target.value,
        };
        getStudents_(params);
    }
    const handleStudentsChange = (e) => {
        getData(e.target.value);
    }

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
    }));
    const classes = useStyles();
    const getMuiTheme = createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    fontSize: "1 rem"
                }
            }
        }
    })
    return (
        <>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <label htmlFor="universityClass">Chọn lớp sinh hoạt</label>
                    <select className="form-control" id="universityClass" onChange={handleuniversityClassesChange}>
                        {universityClass.map((i, k) => {
                            return <option value={i.id} key={k}>{i.id + ". " + i.name}</option>
                        })}
                    </select>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="student">Chọn sinh viên</label>
                    <select className="form-control" id="student" onChange={handleStudentsChange}>
                        {students.map((i, k) => {
                            return <option value={i.id} key={k}>{i.id + ". " + i.name}</option>
                        })}
                    </select>
                </div>
                <div className="col-12">
                    <MuiThemeProvider theme={getMuiTheme}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Tên lớp học phần</TableCell>
                                        {Object.keys(state.columns).map((i, k) => {
                                            return <TableCell key={k}>{i}</TableCell>
                                        })}
                                        <TableCell>Điểm TB</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.data.map((i, k) => {
                                        var avg = 0;
                                        return (
                                            <TableRow key={k}>
                                                <TableCell>{k + 1}</TableCell>
                                                <TableCell>{state.courseClassName[k]}</TableCell>
                                                {Object.keys(state.columns).map((item, j) => {
                                                    if (!!i[item]) avg += i[item] * state.columns[item];
                                                    return <TableCell key={j}>{i[item]}</TableCell>
                                                })}
                                                <TableCell>{avg.toFixed(2)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </MuiThemeProvider>
                </div>
            </div>
        </>
    );
}