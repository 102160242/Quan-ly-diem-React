import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { importData } from '../../crud/import_export.crud';
import swal from 'sweetalert';

export default function DataImport(props)
{
    useEffect(() => {
        document.title = 'Import Dữ Liệu';
    }, []);
    const [data, setData] = useState({ table: "users", file: ""});

    const submitForm = (e) => 
    {
        e.preventDefault();

        var formData = new FormData();

        formData.append("table", data.table);
        formData.append("file", data.file);

        importData(formData).then((result) => {
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
    const fileChangeHandler = (e) =>
    {
        var newData = data;
        newData["file"] = e.target.files[0];
        console.log(newData);
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
                                        <i class="fas fa-file-import"></i>
                                    </span>
                                    <h3 class="kt-portlet__head-title">
                                        Import dữ liệu từ File
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
                                    Dữ liệu từ file của bạn sẽ được import vào bảng này.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formFileType">
                                    <Form.Label>Chọn file</Form.Label>
                                    <input type="file" name="file" class="form-control-file" accept=".xls, .xlsx, .csv" onChange={fileChangeHandler}/>
                                    <Form.Text className="text-muted">
                                    Vui lòng chọn File mà bạn cần import.
                                    </Form.Text>
                                </Form.Group>
                            </div>
                            <div class="kt-portlet__foot">
                                <Button variant="primary" type="submit" className="btn-block">
                                    Import
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}