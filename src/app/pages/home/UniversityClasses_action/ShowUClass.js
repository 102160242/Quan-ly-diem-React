import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { getClass } from "../../../crud/university_classes.crud";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

export default function UniversityClass_Show(props) {
    useEffect(() => {
        document.title = 'Thông tin lớp sinh hoạt';
        // Lay du lieu
        getData();
    }, []);
    var class_id = props.match.params.class_id;

    const getData = () => {
        getClass(class_id).then((result) => {
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
    const [data, setData] = useState([]);
    console.log(data);
    return (
        <>
            <Portlet>
                <PortletBody>
                    <Container maxWidth="sm">
                        <div className="kt-heading kt-heading--md">Thông Tin lớp sinh hoạt:</div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Tên</label>
                                    <p className="col-md-9 col-form-label" name="name">{data.name}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Khóa</label>
                                    <p className="col-md-9 col-form-label">{data.academic_year}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Khoa </label>
                                    <p className="col-md-9 col-form-label">{data.faculty}</p>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Số sinh viên </label>
                                    <p className="col-md-9 col-form-label" ><Link to={"/students"}>{data.total_students}</Link></p>
                                </div>

                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-9">
                                            <Link to={class_id + "/edit"} className="mr-3" title="Edit"><button className="btn btn-label-brand btn-bold">Chỉnh sửa</button></Link>
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