import React from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getStatistics } from "../crud/dashboard";
import { useState, useEffect } from "react";

const perfectScrollbarOptions = {
    wheelSpeed: 2,
    wheelPropagation: false
};

export default function Statistics() {
    useEffect(() => {
        getStatistics().then(result => {
            setData(result.data.data);
        });
    }, []);
    const [data, setData] = useState([]);
    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <div className="kt-portlet kt-callout kt-callout--diagonal-bg">
                        <div className="kt-portlet__body">
                            <div className="kt-callout__body">
                                <div className="kt-callout__content">
                                    <h3 className="kt-callout__title">Nhân Sự</h3>
                                    <p className="kt-callout__desc">
                                        Tổng số Nhân Sự hiện có là <span className="kt-badge kt-badge--unified-brand kt-badge--lg kt-badge--bold">{data.total_users}</span> người
						            </p>
                                </div>
                                <div className="kt-callout__action">
                                    <Link to={"/users"} className="btn btn-custom btn-bold btn-upper btn-font-sm btn-warning">Xem</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="kt-portlet kt-callout kt-callout--diagonal-bg">
                        <div className="kt-portlet__body">
                            <div className="kt-callout__body">
                                <div className="kt-callout__content">
                                    <h3 className="kt-callout__title">Giảng Viên</h3>
                                    <p className="kt-callout__desc">
                                    Tổng số Giảng Viên hiện có là <span className="kt-badge kt-badge--unified-primary kt-badge--lg kt-badge--bold">{data.total_teachers}</span> người
						            </p>
                                </div>
                                <div className="kt-callout__action">
                                    <Link to={"/teachers"} className="btn btn-custom btn-bold btn-upper btn-font-sm  btn-info">Xem</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="kt-portlet kt-callout kt-callout--diagonal-bg">
                        <div className="kt-portlet__body">
                            <div className="kt-callout__body">
                                <div className="kt-callout__content">
                                    <h3 className="kt-callout__title">Sinh Viên</h3>
                                    <p className="kt-callout__desc">
                                    Tổng số Sinh Viên hiện có là <span className="kt-badge kt-badge--unified-success kt-badge--lg kt-badge--bold">{data.total_students}</span> người
						            </p>
                                </div>
                                <div className="kt-callout__action">
                                    <Link to={"/students"} className="btn btn-custom btn-bold btn-upper btn-font-sm  btn-primary">Xem</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="kt-portlet kt-callout kt-callout--warning kt-callout--diagonal-bg">
                        <div className="kt-portlet__body">
                            <div className="kt-callout__body">
                                <div className="kt-callout__content">
                                    <h3 className="kt-callout__title">Lớp Sinh Hoạt</h3>
                                    <p className="kt-callout__desc">
                                     Tổng số Lớp Sinh Hoạt hiện có là <span className="kt-badge kt-badge--unified-info kt-badge--lg kt-badge--bold">{data.total_university_classes}</span> lớp
						            </p>
                                </div>
                                <div className="kt-callout__action">
                                    <Link to={"/university-classes"} className="btn btn-custom btn-bold btn-upper btn-font-sm  btn-warning">Xem</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="kt-portlet kt-callout kt-callout--info kt-callout--diagonal-bg">
                        <div className="kt-portlet__body">
                            <div className="kt-callout__body">
                                <div className="kt-callout__content">
                                    <h3 className="kt-callout__title">Học Phần</h3>
                                    <p className="kt-callout__desc">
                                    Tổng số Học Phần hiện có là <span className="kt-badge kt-badge--unified-warning kt-badge--lg kt-badge--bold">{data.total_courses}</span> học phần
						            </p>
                                </div>
                                <div className="kt-callout__action">
                                    <Link to={"/courses"} className="btn btn-custom btn-bold btn-upper btn-font-sm  btn-info">Xem</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="kt-portlet kt-callout kt-callout--success kt-callout--diagonal-bg">
                        <div className="kt-portlet__body">
                            <div className="kt-callout__body">
                                <div className="kt-callout__content">
                                    <h3 className="kt-callout__title">Lớp Học Phần</h3>
                                    <p className="kt-callout__desc">
                                    Tổng số Lớp Học Phần hiện có là <span className="kt-badge kt-badge--unified-danger kt-badge--lg kt-badge--bold">{data.total_course_classes}</span> lớp
						            </p>
                                </div>
                                <div className="kt-callout__action">
                                    <Link to={"/course-classes"} className="btn btn-custom btn-bold btn-upper btn-font-sm  btn-success">Xem</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
