import React, { useEffect, useState } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import Container from '@material-ui/core/Container';
import { Formik } from "formik";
import { toastr } from 'react-redux-toastr';
import { getMeta } from '../../../crud/courses.crud';
import { createStudent } from '../../../crud/students.crud'
import swal from 'sweetalert';

export default function AddPage() {
    useEffect(() => {
        document.title = 'Thêm mới';
        getMetaData();
    }, []);

    const [metaData, setMetaData] = useState({university_class: []});

    const getMetaData = () => {
        getMeta().then((result) => {
            var data = result.data.data;
            setMetaData(data);
        }).catch((e) => {
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
    return (
        <>
            <Portlet>
                <PortletBody>
                    <Container maxWidth="md">
                        <Formik
                            initialValues={{
                                email: "",
                                name: "",
                                gender: true,
                                birthday: "",
                                phone_number: "",
                                university_class_id: "",
                            }}
                            onSubmit={(values, { setStatus, setSubmitting }) => {
                                var data = values;
                                createStudent(data).then((data) => {
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
                                        <div className="kt-heading kt-heading--md">Thông Tin Sinh Viên:</div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend"><span className="input-group-text"><i className="la la-at"></i></span></div>
                                                            <input type="text" className="form-control" placeholder="example@gmail.com" aria-describedby="basic-addon1" name="email" value={values.email} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Tên</label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <input className="form-control" type="text" name="name" value={values.name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Giới tính</label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <div className="form-check-inline">
                                                            <div className="form-control border-0">
                                                                <label className="form-check-label" htmlFor="radio1">
                                                                    <input type="radio" className="form-check-input" id="radio1" name="gender" value="1" onChange={handleChange} />Nam</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <div className="form-control border-0">
                                                                <label className="form-check-label" htmlFor="radio2">
                                                                    <input type="radio" className="form-check-input" id="radio2" name="gender" value="0" onChange={handleChange} />Nữ</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Ngày sinh </label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <input className="form-control" type="date" name="birthday" value={values.birthday} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Số điện thoại </label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend"><span className="input-group-text"><i className="la la-phone"></i></span></div>
                                                            <input type="number" className="form-control" aria-describedby="basic-addon1" name="phone_number" value={values.phone_number} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Lớp sinh hoạt</label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <select className="form-control" name="university_class_id" value={values.university_class_id} onChange={handleChange}>
                                                            <option value="" disabled >Chọn lớp sinh hoạt</option>
                                                            {metaData.university_class.map((i, k) => {
                                                                return <option value={i.id} key={k}>{i.id + ". " + i.name}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="kt-form__actions" >
                                            <button disabled={isSubmitting} className="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u float-right" type="submit" >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </form>
                                )}
                        </Formik>
                    </Container>
                </PortletBody>
            </Portlet>
        </>
    );
}