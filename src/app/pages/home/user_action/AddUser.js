import React, { useEffect, useState } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import Container from '@material-ui/core/Container';
import { Formik } from "formik";
import { createUser } from '../../../crud/users.crud'


export default function AddPage() {
    useEffect(() => {
        document.title = 'Thêm mới';
    }, []);
    const [avatar, setAvatar] = useState("");
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
                                avatar: "",
                                birthday: "",
                                phone_number: "",
                                is_admin: false,
                                is_teacher: false,
                                password: "",
                                password_confirmation: ""
                            }}
                            onSubmit={(values, { setStatus, setSubmitting }) => {
                                const formData = new FormData();
                                formData.append("email", values.email)
                                formData.append("name", values.name)
                                formData.append("gender", values.gender)
                                formData.append("avatar", values.avatar)
                                formData.append("is_admin", values.is_admin)
                                formData.append("is_teacher", values.is_teacher)
                                formData.append("birthday", values.birthday)
                                formData.append("phone_number", values.phone_number)
                                formData.append("password", values.password)
                                formData.append("password_confirmation", values.password_confirmation)
                                createUser(formData)
                                    .catch((e) => {
                                        var messages;
                                        if (e.response == null) {
                                            messages = ["Có lỗi xảy ra!"]
                                        }
                                        else {
                                            messages = e.response.data.messages
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
                                        <div className="kt-heading kt-heading--md">Thông Tin Nhân Viên:</div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Ảnh đại diện</label>
                                                    <div className="col-lg-9 col-xl-6">
                                                        <div className="kt-avatar kt-avatar--outline" id="kt_user_add_avatar">
                                                            <div className="kt-avatar__holder" style={{ backgroundImage: `url(${avatar})` }}  onChange={handleChange} ></div>
                                                            <label className="kt-avatar__upload" data-toggle="kt-tooltip" title="" data-original-title="Change avatar">
                                                                <i className="fa fa-pen"></i>
                                                                <input type="file" name="avatar" type="file" onChange={(e) => {
                                                                    var reader = new FileReader();
                                                                    var img = e.target.files[0];
                                                                    values.avatar = img;
                                                                    setAvatar(img);
                                                                    reader.addEventListener("load", function () {
                                                                        setAvatar(reader.result);
                                                                    }, false);

                                                                    if (img) {
                                                                        reader.readAsDataURL(img);
                                                                    }
                                                                }}
                                                                />
                                                            </label>
                                                            <span className="kt-avatar__cancel" data-toggle="kt-tooltip" title="" data-original-title="Cancel avatar">
                                                                <i className="fa fa-times"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Chức vụ</label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <div className="form-check-inline">
                                                            <div className="form-control border-0">
                                                                <label className="form-check-label" >
                                                                    <input type="checkbox" className="form-check-input" name="is_admin" value="true" checked={values.is_admin} onChange={handleChange} />Admin </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <div className="form-control border-0">
                                                                <label className="form-check-label" >
                                                                    <input type="checkbox" className="form-check-input" name="is_teacher" value="true" checked={values.is_teacher} onChange={handleChange} />Giáo viên </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Mật khẩu </label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <input className="form-control" type="password" name="password" value={values.password} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-xl-3 col-lg-3 col-form-label">Xác nhận mật khẩu</label>
                                                    <div className="col-lg-9 col-xl-9">
                                                        <input className="form-control" type="password" name="password_confirmation" value={values.password_confirmation} onChange={handleChange} />
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