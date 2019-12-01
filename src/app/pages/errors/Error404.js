import React from "react";
import { toAbsoluteUrl } from "../../../_metronic";
import "../../../_metronic/_assets/sass/pages/error/error-3.scss";

export function Error404() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          className="kt-grid__item kt-grid__item--fluid kt-grid kt-error-v3"
          style={{
            backgroundImage: `url(${toAbsoluteUrl(
              "/media/error/bg3.jpg"
            )})`
          }}
        >
          <div className="kt-error_container">
            <div className="kt-error_number">
              <h1>404</h1>
            </div>
            <p className="kt-error_title kt-font-light">Bạn đến đây bằng cách nào vậy??</p>
            <p className="kt-error_subtitle">
              Xin lỗi bạn nhưng chúng tôi không thể tìm được trang web mà bạn đang tìm kiếm.
            </p>
            <p className="kt-error_description">
              Có lẽ bạn đã gõ nhầm địa chỉ chăng?
              <br />
              hoặc đơn giản hơn là trang web bạn tìm kiếm không hề tồn tại.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
