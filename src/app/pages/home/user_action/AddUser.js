import React, { useEffect } from "react";
import { Portlet, PortletBody, PortletFooter, PortletHeader, PortletHeaderToolbar } from "../../../partials/content/Portlet";
import { FormHelperText, Switch, Tab, Tabs } from "@material-ui/core";
import { Formik } from "formik";

export default function AddPage() {
    useEffect(() => {
        document.title = 'Thêm mới';
    }, []);
    return (
        <>
            <div className="kt-form kt-form--label-right">
                <Portlet>
                    <PortletBody>
                        <div className="kt-section kt-margin-t-30">
                            <div className="kt-section__body">
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">
                                        Header Skin:
                                    </label>
                                    <div className="col-lg-9 col-xl-4">
                                        <select className="form-control" name="header.self.skin">
                                            <option value="light">Light (Default)</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                        <FormHelperText>Select header skin</FormHelperText>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PortletBody>
                </Portlet>
            </div>
        </>
    );
}