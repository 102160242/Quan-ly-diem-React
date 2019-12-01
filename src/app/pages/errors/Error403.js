import React from "react";
import { toAbsoluteUrl } from "../../../_metronic";
import "../../../_metronic/_assets/sass/pages/error/error-6.scss";

export function Error403() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          className="kt-grid__item kt-grid__item--fluid kt-grid  kt-error-v6"
          style={{
            backgroundImage: `url(${toAbsoluteUrl("/media//error/bg6.jpg")})`
          }}
        >
          <div className="kt-error_container">
            <div className="kt-error_subtitle kt-font-light">
              <h1>Ôi...</h1>
            </div>

            <p className="kt-error_description kt-font-light">
              Có vẻ như bạn không đủ quyền để truy cập trang này.
              <br />
              Liên hệ Admin để biết thêm chi tiết nhé!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
