import React, { useEffect, useState } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import Container from '@material-ui/core/Container';
import { getUser, } from '../../../crud/users.crud';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


export default function ShowPage(props) {
    useEffect(() => {
        document.title = 'Thông tin chi tiết';
        getData();
    }, []);
    const [data, setData] = useState([]);
    var user_id = props.match.params.user_id;
    const [avatar, setAvatar] = useState("");
    const getData = () => {
        getUser(user_id).then((result) => {
            var data = result.data.data;
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
    //console.log(data);
    return (
        <>
            <Portlet>
                <PortletBody>
                    <Container maxWidth="md">
                        <div className="kt-heading kt-heading--md">Thông Tin Nhân Viên:</div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Ảnh đại diện</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div className="kt-avatar kt-avatar--outline" id="kt_user_add_avatar">
                                            <div className="kt-avatar__holder" style={{ backgroundImage: `url(${avatar})` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Email</label>
                                    <p className="col-xl-3 col-lg-3 col-form-label" name="email">{data.email}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Tên</label>
                                    <p className="col-xl-3 col-lg-3 col-form-label" name="name">{data.name}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Giới tính</label>
                                    <p className="col-xl-3 col-lg-3 col-form-label">{data.gender == 0 ? "Nữ" : "Nam"}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Ngày sinh </label>
                                    <p className="col-xl-3 col-lg-3 col-form-label" name="birthday">{data.birthday}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Số điện thoại </label>
                                    <p className="col-xl-3 col-lg-3 col-form-label" name="phone_number">{data.phone_number}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Chức vụ</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <div className="form-check-inline">
                                            <div className="form-control border-0">
                                                <label className="form-check-label" >
                                                    <input type="checkbox" className="form-check-input" name="is_admin" value={data.is_admin} checked={data.is_admin} />Admin </label>
                                            </div>
                                        </div>
                                        <div className="form-check-inline">
                                            <div className="form-control border-0">
                                                <label className="form-check-label" >
                                                    <input type="checkbox" className="form-check-input" name="is_teacher" value={data.is_teacher} checked={data.is_teacher} />Giáo viên </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-xl-3"></div>
                                        <div className="col-lg-9 col-xl-6">
                                            <Link to={user_id + "/edit"} className="mr-3" title="Edit"><button className="btn btn-label-brand btn-bold">Chỉnh sửa</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </PortletBody>
            </Portlet>
        </>
    )
}