import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { getTeacher } from "../../../crud/teachers.crud";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

export default function Teacher_Show(props) {
    useEffect(() => {
        document.title = 'Thông tin giáo viên';
        // Lay du lieu
        getData();
    }, []);
    var teacher_id = props.match.params.teacher_id;

    const getData = () => {
        getTeacher(teacher_id).then((result) => {
            var data = result.data.data;
            data.user.birthday = data.user.birthday.split("/").reverse().join("-");
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
    const [data, setData] = useState([]);
    console.log(data);
    return (
        <>
            <Portlet>
                <PortletBody>
                    <Container maxWidth="sm">
                        <div className="kt-heading kt-heading--md">Thông Tin Giáo Viên:</div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Tên</label>
                                    <p className="col-md-3 col-lg-3 col-form-label">{data.user && data.user.name}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Giới tính</label>
                                    <p className="col-md-3 col-lg-3 col-form-label">{data.user && data.user.gender == 0 ? "Nữ" : "Nam"}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Ngày sinh </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="birthday">{data.user && data.user.birthday}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Số điện thoại </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="phone_number">{data.user && data.user.phone_number}</p>
                                </div>
    
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Học hàm</label>
                                    <p className="col-md-3 col-lg-3 col-form-label">{data.academic_rank == null ? "Không" : data.academic_rank}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Học Vị</label>
                                    <p className="col-md-3 col-lg-3 col-form-label">{data.degree == null ? "Không" : data.degree}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Chuyên Môn </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="specialiation">{data.specialization == null ? "Không" : data.specialization}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Khoa </label>
                                    <p className="col-md-3 col-lg-3 col-form-label" name="faculty">{data.faculty == null ? "Không" : data.faculty}</p>
                                </div>

                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-xl-3"></div>
                                        <div className="col-lg-9 col-md-6">
                                            <Link to={teacher_id + "/edit"} className="mr-3" title="Edit"><button className="btn btn-label-brand btn-bold">Chỉnh sửa</button></Link>
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