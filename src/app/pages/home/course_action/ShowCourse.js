import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { getCourse } from "../../../crud/courses.crud";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

export default function CourseClasses_Show(props) {
    useEffect(() => {
        document.title = 'Thông tin lớp học phần';
        // Lay du lieu
        getData();
    }, []);
    var course_id = props.match.params.course_id;

    const getData = () => {
        getCourse(course_id).then((result) => {
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
    const [data, setData] = useState({ course_classes: []});
    console.log(data);
    return (
        <>
            <Portlet>
                <PortletBody>
                    <Container maxWidth="sm">
                        <div className="kt-heading kt-heading--md">Thông Tin lớp học phần:</div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Tên học phần</label>
                                    <p className="col-md-9 col-form-label" name="name">{data.name}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Số lượng lớp học phần</label>
                                    <p className="col-md-9 col-form-label"><Link to={"/course_classes/" + data.id}>{data.total_course_classes}</Link></p>
                                </div>

                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-9">
                                            <Link to={course_id + "/edit"} className="mr-3" title="Edit"><button className="btn btn-label-brand btn-bold">Chỉnh sửa</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </PortletBody>
            </Portlet>
            <Portlet>
                <PortletBody>
                    <Container maxWidth="">
                        <div className="kt-heading kt-heading--md">Danh sách lớp học phần:</div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>ID</th>
                                                <th>Tên</th>
                                                <th>Giảng viên</th>
                                                <th>Số tín chỉ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.course_classes.map((i, k) => {
                                                return(
                                                    <tr key={k}>
                                                        <td>{k+1}</td>
                                                        <td>{i.id}</td>
                                                        <td>{i.name}</td>
                                                        <td>{i.teacher.name}</td>
                                                        <td>{i.credits}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Container>
                </PortletBody>
            </Portlet>
        </>
    );
}