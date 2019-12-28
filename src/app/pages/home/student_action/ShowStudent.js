import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { getStudent } from "../../../crud/students.crud";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

export default function Student_Show(props) {
    useEffect(() => {
        document.title = 'Thông tin sinh viên';
        // Lay du lieu
        getData();
    }, []);
    const [data, setData] = useState({university_class: []});
    var student_id = props.match.params.student_id;
    var university_class_id = data.university_class && data.university_class.id;

    const getData = () => {
        getStudent(student_id).then((result) => {
            var data = result.data.data;
            data.birthday = data.birthday.split("/").reverse().join("-");
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
                        <div className="kt-heading kt-heading--md">Thông Tin Sinh Viên:</div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Tên</label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="name">{data.name}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Email</label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="email">{data.email}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Giới tính</label>
                                    <p className="col-md-3 col-lg-3 col-form-label">{data.gender == 0 ? "Nữ" : "Nam"}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Ngày sinh </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="birthday">{data.birthday}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Số điện thoại </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="phone_number">{data.phone_number}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Lớp sinh hoạt </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="university_class"><Link to={"/university-classes/" + university_class_id}>{data.university_class && data.university_class.name}</Link></p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Khoa </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="faculty">{data.university_class && data.university_class.faculty}</p>
                                </div>
                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-xl-3"></div>
                                        <div className="col-lg-9 col-md-6">
                                            <Link to={student_id + "/edit"} className="mr-3" title="Edit"><button className="btn btn-label-brand btn-bold">Chỉnh sửa</button></Link>
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