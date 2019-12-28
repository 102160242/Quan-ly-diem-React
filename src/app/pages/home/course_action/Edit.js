import React, { useEffect, useState } from "react";
import { Portlet, PortletBody } from "../../../partials/content/Portlet";
import Container from '@material-ui/core/Container';
import { Formik } from "formik";
import { getCourse, editCourse } from "../../../crud/courses.crud"
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { toastr } from 'react-redux-toastr';
import swal from 'sweetalert';

export default function EditPage(props) {
    useEffect(() => {
        document.title = 'Chỉnh sửa';
        getData();
    }, []);

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    var course_id = props.match.params.course_id;
    const [currentData, setCurrentData] = useState([]);
    const getData = () => {
        getCourse(course_id).then((result) => {
            var data = result.data.data;
            setCurrentData(data);
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
                                name: currentData.name
                                // teacher_id: "",
                            }}
                            onSubmit={(values, { setStatus, setSubmitting }) => {
                                var data = values;
                                editCourse(course_id,data).then((data) => {
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
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1">
                                                <div className="kt-heading kt-heading--md">Thông Tin Học Phần:</div>
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <div className="form-group row">
                                                            <label className="col-md-3  col-form-label">Tên học phần</label>
                                                            <div className="col-md-9 ">
                                                                <input className="form-control" type="text" name="name" placeholder="Tên học phần" value={values.name} onChange={handleChange} />
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