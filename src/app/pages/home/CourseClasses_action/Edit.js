import React, { useEffect, useState } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import Container from '@material-ui/core/Container';
import { Formik } from "formik";
import { getTeachers } from '../../../crud/teachers.crud';
import { getCourses } from "../../../crud/courses.crud";
import { getEditCourseClass, editCourseClass } from "../../../crud/course_classes.crud";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import swal from 'sweetalert';
import classnames from 'classnames';
import { deleteColumn } from '../../../crud/score_columns.crud';
import { toastr } from 'react-redux-toastr';

export default function EditPage(props) {
    useEffect(() => {
        document.title = 'Chỉnh sửa';
        getCData();
        getTData();
        getCurrentdata();        
    }, []);

    const [Tdata, setTData] = useState([]);
    const [Cdata, setCData] = useState([]);
    const [courseClassData, setCourseClassData] = useState({ course: [], teacher: [] });
    const [column, setColumn] = useState([]);

    var courseclass_id = props.match.params.courseclass_id;
    const getCurrentdata = () => {
        getEditCourseClass(courseclass_id).then((result) => {
            var data = result.data.data;
            
            setCourseClassData(data);
            setColumn(data.score_columns);
            
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
    console.log(courseClassData)
    const getCData = () => {
        getCourses().then((result) => {
            var data = result.data.data;
            setCData(data);
        })
        .catch((e) => {
            alertError(e);
        });
    }

    const getTData = () => {
        getTeachers().then((result) => {
            var data = result.data.data;
            setTData(data);
        })
        .catch((e) => {
            alertError(e);
        });
    }
    const alertError = e => {
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
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    function deleteScore(k) {
        console.log(k);
        var data = [...column];
        if(!!data[k].id)
        {
            deleteColumn(data[k].id)
            .catch(e => {
                alertError(e);
            })
        }
        data.splice(k,1);
        setColumn(data);
    }

    function addScore() {
        var data = [...column];
        data.push({
            'name': "",
            'ratio': ""
        });
        setColumn(data);
    }

    function changeNameHander(e,k){
        var data = [...column];
        data[k].name = e.target.value;
        setColumn(data);
    }
    function changeRatioHander(e,k){
        var data = [...column];
        data[k].ratio = e.target.value;
        setColumn(data);
    }

    // var course_data =  [] ;
    // var teacher_data =  [] ;
    // if(Currentdata.length != 0)
    // {
    //     course_data = Currentdata.course;
    //     teacher_data = Currentdata.teacher;
    //     if(dk)         
    //     {
    //         setColumn(Currentdata.score_columns);
    //         dk = false;
    //     }
    // }


    return (
        <>
            <Portlet className="kt-portlet--tabs">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-toolbar">
                        <Nav tabs className="nav-tabs-space-xl nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-brand">
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                                    <i className="flaticon2-information"></i>Thông tin
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                                    <i className="flaticon2-infographic"></i> Cột điểm
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <PortletBody>
                    <Container maxWidth="md">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                course_id: courseClassData.course.id,
                                name: courseClassData.name,
                                credits: courseClassData.credits,
                                year: courseClassData.year,
                                teacher_id: courseClassData.teacher.id,
                                semester: courseClassData.semester,
                            }}
                            onSubmit={(values, { setStatus, setSubmitting }) => {
                                var data = values;
                                data["score_columns"] = column;
                                editCourseClass( courseclass_id, data).then((data) => {
                                    toastr.success("Thành công", data.data.messages[0]);
                                    setSubmitting(false);
                                    })
                                    .catch((e) => {
                                        var messages;
                                        if (e.response == null) {
                                            toastr.error("Lỗi", 'Đã có lỗi xảy ra!');
                                        }
                                        else {
                                            toastr.error("Lỗi", e.response.data.messages[0]);
                                        }
                                        setSubmitting(false);
                                        setStatus(
                                            messages
                                        );
                                    });
                            }}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                    <form className="kt-form" id="kt_user_add_form" noValidate="novalidate" onSubmit={handleSubmit}>
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1">
                                                <div className="kt-heading kt-heading--md">Thông Tin Lớp Học Phần:</div>
                                                <div className="row">
                                                    <div className="col-xl-12">

                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Tên lớp học phần</label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <input className="form-control" type="text" name="name" placeholder="Tên lớp học phần" value={values.name} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Học phần</label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <select className="form-control" name="course_id" value={values.course_id} onChange={handleChange}>
                                                                    <option value="" disabled value="" > ----------Chọn học phần----------</option>
                                                                    {Cdata.map((i, k) => {
                                                                        return <option value={i.id} key={k}>{i.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>  
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Giáo viên giảng dạy </label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <select className="form-control" name="teacher_id" value={values.teacher_id} onChange={handleChange}>
                                                                    <option value="" disabled value="" >----------Chọn giảng viên----------</option>
                                                                    {Tdata.map((i, k) => {
                                                                        return <option value={i.user.id} key={k}>{i.user.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Học kỳ </label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <select className="form-control" name="semester" value={values.semester} onChange={handleChange}>
                                                                    <option value="" disabled value="" >----------Chọn kỳ học----------</option>
                                                                    <option value={1} >Kỳ 1</option>
                                                                    <option value={2} >Kỳ 2</option>
                                                                    <option value={3} >Kỳ hè</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Niên khóa </label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <input className="form-control" type="number" placeholder="YYYY" min="2019" max="2100" name="year" value={values.year} onChange={handleChange} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Số tín chỉ </label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <input className="form-control" type="number" placeholder="1~5" min="1" max="5" name="credits" value={values.credits} onChange={handleChange} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="kt-form__actions" >
                                                    <button disabled={isSubmitting} type="button" className="btn btn-primary btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u float-right" onClick={() => { toggle('2'); }} >
                                                        Bước tiếp theo
                                                    </button>
                                                </div>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <div className="kt-heading kt-heading--md">Cột điểm:</div>
                                                <div className="row">
                                                    <div className="col-xl-12">

                                                        {column.map((i, k) => {
                                                            return (
                                                                <div className="form-group row" key={k}>
                                                                    <label className="col-xl-2 col-lg-2 col-form-label">Thông tin cột điểm</label>
                                                                    <div className="col-lg-5 col-xl-5" >
                                                                        <input className="form-control" placeholder="Tên cột điểm" type="text" name="" value={i.name} onChange={ (e) => {changeNameHander(e,k)} } />
                                                                    </div>
                                                                    <div className="col-lg-3 col-xl-3">
                                                                        <input className="form-control" placeholder="Hệ số" type="number" min="0.1" max="1.0" step="0.1" name="" value={i.ratio} onChange={ (e) => {changeRatioHander(e,k)} } />
                                                                    </div>
                                                                    <div className="col-lg-2 col-xl-2">
                                                                        <button type="button" className="btn btn-outline-danger border-0 "  onClick={ () => { deleteScore(k)}} > <i className="flaticon2-cancel" ></i> </button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}


                                                        <div className="form-group row">
                                                            <div className="col-lg-4 col-xl-4">
                                                                <button type="button" className="btn btn-outline-info btn-tall btn-wide kt-font-bold kt-font-transform-u" onClick={addScore} > <i className="flaticon2-plus"></i> Thêm cột điểm </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="kt-form__actions" >
                                                    <button disabled={isSubmitting} className="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u ml-3 float-right" type="submit" >
                                                        Xác nhận
                                                    </button>
                                                    <button disabled={isSubmitting} className="btn btn-outline-secondary border-0 btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u ml-3 float-right" type="button" onClick={() => { toggle('1'); }} >
                                                        Bước trước
                                                    </button>
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </form>
                                )}
                        </Formik>
                    </Container>
                </PortletBody>
            </Portlet>
        </>
    );
}