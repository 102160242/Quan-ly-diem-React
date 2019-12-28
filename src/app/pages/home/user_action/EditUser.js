import React, { useEffect, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Formik } from "formik";
import { getEditUser, editUser } from '../../../crud/users.crud'
import swal from 'sweetalert';
import Container from '@material-ui/core/Container';


export default function EditPage(props) {
    useEffect(() => {
        document.title = 'Chỉnh sửa';
        getData();
    }, []);
    const [data, setData] = useState([]);
    const [avatar, setAvatar] = useState("");
    var user_id = props.match.params.user_id;
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const getData = () => {
        getEditUser(user_id).then((result) => {
            var data = result.data.data;
            var time = new Date(data.birthday);
            console.log("Time " + data.birthday.split("/"))
            data.birthday = data.birthday.split("/").reverse().join("-");
            setData(data);
            setAvatar(data.avatar_url);
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
    console.log(data);
    return (
        <>

            <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                <div className="kt-portlet kt-portlet--tabs" >
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-toolbar">
                            <Nav tabs className="nav-tabs-space-xl nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-brand">
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                                        <i className="flaticon2-user"></i>Thông tin
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                                        <i className="flaticon2-shield"></i> Mật khẩu
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <TabContent activeTab={activeTab}>

                            <TabPane tabId="1">
                            <Container maxWidth="md">
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        email: data.email,
                                        name: data.name,
                                        gender: data.gender,
                                        avatar: data.avatar_url,
                                        birthday: data.birthday,
                                        phone_number: data.phone_number,
                                        is_admin: data.is_admin,
                                        is_teacher: data.is_teacher,
                                    }}
                                    onSubmit={(values, { setStatus, setSubmitting }) => {
                                        const formData = new FormData();
                                        formData.append("email", values.email)
                                        formData.append("name", values.name)
                                        formData.append("gender", values.gender)
                                        formData.append("is_admin", values.is_admin)
                                        formData.append("is_teacher", values.is_teacher)
                                        formData.append("birthday", values.birthday)
                                        formData.append("phone_number", values.phone_number)
                                        formData.append("_method", "PUT")
                                        // console.log("formdata")
                                        // console.log(formData);
                                        editUser(user_id, formData)
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
                                            <form action="" method="" onSubmit={handleSubmit}>
                                                <div className="kt-form kt-form--label-right">
                                                    <div className="kt-form__body">
                                                        <div className="kt-section kt-section--first">
                                                            <div className="kt-section__body">

                                                                <div className="kt-heading kt-heading--md d-flex justify-content-center"><strong>Thông Tin Nhân Viên:</strong></div>
                                                                <div className="row">
                                                                    <div className="col-xl-12">
                                                                        <div className="form-group row">
                                                                            <label className="col-xl-3 col-lg-3 col-form-label">Ảnh đại diện</label>
                                                                            <div className="col-lg-9 col-xl-6">
                                                                                <div className="kt-avatar kt-avatar--outline" id="kt_user_add_avatar">
                                                                                    <div className="kt-avatar__holder" style={{ backgroundImage: `url(${avatar})` }} onChange={handleChange} ></div>
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
                                                                                            <input type="radio" className="form-check-input" id="radio1" name="gender" value="1" checked={values.gender} onChange={handleChange} />Nam</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-check-inline">
                                                                                    <div className="form-control border-0">
                                                                                        <label className="form-check-label" htmlFor="radio2">
                                                                                            <input type="radio" className="form-check-input" id="radio2" name="gender" checked={!values.gender} value="0" onChange={handleChange} />Nữ</label>
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
                                                                                    <input type="text" className="form-control" aria-describedby="basic-addon1" name="phone_number" value={values.phone_number} onChange={handleChange} />
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
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="kt-separator kt-separator--space-lg kt-separator--fit kt-separator--border-solid"></div>

                                                    <div className="kt-form__actions">
                                                        <div className="row">
                                                            <div className="col-xl-3"></div>
                                                            <div className="col-lg-9 col-xl-6">
                                                                {/* <a href="#" className="btn btn-label-brand btn-bold">Lưu thay đổi</a> */}
                                                                <button disabled={isSubmitting} className="btn btn-label-brand btn-bold" type="submit" >Lưu thay đổi</button>
                                                                {/* <a href="#" className="btn btn-clean btn-bold">Thoát</a> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                </Formik>
                                </Container>
                            </TabPane>

                            <TabPane tabId="2">
                            <Container maxWidth="md">
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        id: data.id,
                                        current_password: "",
                                        password: "",
                                        password_confirmation: ""
                                    }}
                                    onSubmit={(values, { setStatus, setSubmitting }) => {
                                        const formData = new FormData();
                                        formData.append("id", values.id)
                                        formData.append("current_password", values.current_password)
                                        formData.append("password", values.password)
                                        formData.append("password_confirmation", values.password_confirmation)
                                        formData.append("_method", "PUT")
                                        editUser(user_id, formData)
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
                                            <form action="" method="" onSubmit={handleSubmit}>
                                                <div className="kt-form kt-form--label-right">
                                                    <div className="kt-form__body">
                                                        <div className="kt-section kt-section--first">
                                                            <div className="kt-section__body">

                                                                <div className="row">
                                                                    <label className="col-xl-3"></label>
                                                                    <div className="col-lg-9 col-xl-6">
                                                                        <h3 className="kt-heading kt-heading--md"><strong>Thay đổi hoặc khôi phục lại mật khẩu:</strong></h3>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label className="col-xl-3 col-lg-3 col-form-label">Mật khẩu hiện tại</label>
                                                                    <div className="col-lg-9 col-xl-6">
                                                                        <input type="password" className="form-control" name="current_password" placeholder="Mật khẩu hiện tại" value={values.current_password} onChange={handleChange} />
                                                                        <a href="#" className="kt-link kt-font-sm kt-font-bold kt-margin-t-5">Quên mật khẩu ?</a>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label className="col-xl-3 col-lg-3 col-form-label">Mật khẩu mới</label>
                                                                    <div className="col-lg-9 col-xl-6">
                                                                        <input type="password" className="form-control" name="password" placeholder="Mật khẩu mới" value={values.password} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                                {
                                                                    console.log(values)
                                                                }
                                                                <div className="form-group form-group-last row">
                                                                    <label className="col-xl-3 col-lg-3 col-form-label">Xác nhận mật khẩu mới</label>
                                                                    <div className="col-lg-9 col-xl-6">
                                                                        <input type="password" className="form-control" name="password_confirmation" placeholder="Xác nhận mật khẩu mới" value={values.password_confirmation} onChange={handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="kt-separator kt-separator--space-lg kt-separator--fit kt-separator--border-solid"></div>

                                                    <div className="kt-form__actions">
                                                        <div className="row">
                                                            <div className="col-xl-3"></div>
                                                            <div className="col-lg-9 col-xl-6">
                                                                {/* <a href="#" className="btn btn-label-brand btn-bold">Lưu thay đổi</a> */}
                                                                <button disabled={isSubmitting} className="btn btn-label-brand btn-bold" type="submit" >Lưu thay đổi</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                </Formik>
                                </Container>
                            </TabPane>
                            
                        </TabContent>

                    </div>
                </div>
            </div>
        </>
    )
}