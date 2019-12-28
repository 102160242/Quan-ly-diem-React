import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { getCourseClass } from "../../../crud/course_classes.crud";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

export default function CourseClasses_Show(props) {
    useEffect(() => {
        document.title = 'Thông tin lớp học phần';
        // Lay du lieu
        getData();
    }, []);
    const [data, setData] = useState({teacher: [], course: []});
    var courseclass_id = props.match.params.courseclass_id;
    var teacher_id = data.teacher && data.teacher.id;
    var course_id = data.course && data.course.id;
   // console.log(teacher_id);
    const getData = () => {
        getCourseClass(courseclass_id).then((result) => {
            var data = result.data.data;
            setData(data);
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
    
    
    console.log(data);
    return (
        <>
            <Portlet>
                <PortletBody>
                    <Container maxWidth="sm">
                        <div className="kt-heading kt-heading--md">Thông Tin lớp học phần:</div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Tên lớp học phần</label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="name">{data.name}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Học phần</label>
                                    <p className="col-md-3 col-lg-3 col-form-label"><Link to={"/courses/" + course_id}>{data.course && data.course.name}</Link></p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Tên giảng viên</label>
                                    <p className="col-md-3 col-lg-3 col-form-label"><Link to={"/teachers/" + teacher_id}>{data.teacher && data.teacher.name}</Link></p>
                                </div>
                                
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Số tín chỉ </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" >{data.credits}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Học kỳ - Năm Học </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" >Học kỳ {data.semester} - {data.year}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Số sinh viên </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" ><Link to={"/students"}>{data.total_students}</Link></p>
                                </div>

                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-xl-3"></div>
                                        <div className="col-lg-9 col-md-6">
                                            <Link to={courseclass_id + "/edit"} className="mr-3" title="Edit"><button className="btn btn-label-brand btn-bold">Chỉnh sửa</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </PortletBody>
            </Portlet>
        </>
    );
}