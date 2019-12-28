import React, { useEffect, useState } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import Container from '@material-ui/core/Container';
import { Formik } from "formik";
import { getTeachers } from '../../../crud/teachers.crud';
import { editUniversityClass } from "../../../crud/university_classes.crud";
import { getMeta, getClass } from "../../../crud/university_classes.crud"
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import swal from 'sweetalert';
import classnames from 'classnames';


export default function AddPage(props) {
    useEffect(() => {
        document.title = 'Chỉnh sửa';
        getTData();
        getMetaData();
        getCurrentData();
    }, []);

    const [Tdata, setTData] = useState([]);
    const [meta, setMeta] = useState([]);
    const [classData, setClassData] = useState([]);
    var class_id = props.match.params.universityclass_id;

    const getTData = () => {
        getTeachers().then((result) => {
            var data = result.data.data;
            setTData(data);
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

    const getMetaData = () => {
        getMeta().then((result) => {
            var data = result.data.data.meta;
            setMeta(data);
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

    const getCurrentData = () => {
        getClass(class_id).then((result) => {
            var data = result.data.data;
            setClassData(data);
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

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

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
                            {/* <NavItem>
                                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                                    <i className="flaticon2-infographic"></i> Cột điểm
                                </NavLink>
                            </NavItem> */}
                        </Nav>
                    </div>
                </div>
                <PortletBody>
                    <Container maxWidth="md">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                name: classData.name,
                                faculty_id: classData.faculty_id,
                                academic_year: classData.academic_year,
                                // teacher_id: "",
                            }}
                            onSubmit={(values, { setStatus, setSubmitting }) => {
                                var data = values;
                                console.log(data)
                                editUniversityClass(class_id, data)
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
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1">
                                                <div className="kt-heading kt-heading--md">Thông Tin Lớp Sinh Hoạt:</div>
                                                <div className="row">
                                                    <div className="col-xl-12">

                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Tên lớp sinh hoạt</label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <input className="form-control" type="text" name="name" placeholder="Tên lớp học phần" value={values.name} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Khoa</label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <select className="form-control" name="faculty_id" value={values.faculty_id} onChange={handleChange}>
                                                                    <option value="" disabled value="" >Chọn khoa</option>
                                                                    {meta.map((i, k) => {
                                                                        return <option value={i.id} key={k}>{i.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {/* <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Giáo viên chủ nhiệm </label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <select className="form-control" name="teacher_id" value={values.teacher_id} onChange={handleChange}>
                                                                    <option value="" disabled value="" >Chọn giáo viên</option>
                                                                    {Tdata.map((i, k) => {
                                                                        return <option value={i.user.id} key={k}>{i.user.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div> */}

                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-lg-3 col-form-label">Niên khóa </label>
                                                            <div className="col-lg-9 col-xl-9">
                                                                <input className="form-control" type="number" placeholder="YYYY" min="2019" max="2100" name="academic_year" value={values.academic_year} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="kt-form__actions" >
                                                    {/* <button disabled={isSubmitting} type="button" className="btn btn-primary btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u float-right" onClick={() => { toggle('2'); }} >
                                                        Bước tiếp theo
                                                    </button> */}
                                                    <button disabled={isSubmitting} className="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u ml-3 float-right" type="submit" >
                                                        Xác nhận
                                                    </button>
                                                </div>
                                            </TabPane>
                                            {/* <TabPane tabId="2">
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
                                            </TabPane> */}
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