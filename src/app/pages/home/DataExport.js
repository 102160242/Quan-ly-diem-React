import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { exportData } from '../../crud/import_export.crud';
import swal from 'sweetalert';

export default function DataExport(props) {
    useEffect(() => {
        document.title = 'Export Dữ Liệu';
    }, []);

    const [data, setData] = useState({ table: "users", fileType: "csv"});

    const submitForm = (e) => 
    {
        e.preventDefault();
        exportData(data).then((result) => {
            swal({
                icon: 'success',
                title: 'Xong...',
                text: result.data.messages[0],
            })
            //console.log(result);
        })
        .catch(e => {
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
        })
    }
    const selectChangeHandler = (e) =>
    {
        var newData = data;
        newData[e.target.name] = e.target.value;
        //console.log(newData);
        setData(newData);
    }
    return (
        <div className="container">
            <div className="row row-full-height d-flex justify-content-center">
                <div className="col-md-8">
                    <Form onSubmit={submitForm}>
                        <div class="kt-portlet">
                            <div class="kt-portlet__head">
                                <div class="kt-portlet__head-label">
                                    <span class="kt-portlet__head-icon">
                                        <i class="fas fa-file-export"></i>
                                    </span>
                                    <h3 class="kt-portlet__head-title">
                                        Export dữ liệu từ Database
                                    </h3>
                                </div>
                            </div>
                            <div class="kt-portlet__body">
                                <Form.Group controlId="formTable">
                                    <Form.Label>Chọn bảng</Form.Label>
                                    <Form.Control as="select" name="table" onChange={selectChangeHandler}>
                                        <option value="users">Nhân Sự</option>
                                        <option value="university_classes">Lớp Sinh Hoạt</option>
                                        <option value="students">Sinh Viên</option>
                                        <option value="courses">Học Phần</option>
                                        <option value="course_classes">Lớp Học Phần</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                    Dữ liệu từ bảng này sẽ được xuất ra file cho bạn.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formFileType">
                                    <Form.Label>Chọn loại file</Form.Label>
                                    <Form.Control as="select" name="fileType" onChange={selectChangeHandler}>
                                        <option value="csv">CSV</option>
                                        <option value="xls">Excel (2003)</option>
                                        <option value="xlsx">Excel (2007 - 2019)</option>
                                        <option value="html">HTML</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                    Vui lòng chọn loại File mà bạn cần xuất ra.
                                    </Form.Text>
                                </Form.Group>
                            </div>
                            <div class="kt-portlet__foot">
                                <Button variant="primary" type="submit" className="btn-block">
                                    Export
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}