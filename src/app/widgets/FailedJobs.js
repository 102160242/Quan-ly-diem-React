import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getFailedJobs } from "../crud/dashboard";
import { useState, useEffect } from "react";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

export default function FailedJobs() {
  useEffect(() => {
    getFailedJobs().then(result => {
        setData(result.data.data);
    });
  }, []);
  const [data, setData] = useState([]);
  return (
    <>
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Jobs lỗi gần đây</h3>
          </div>
        </div>
        <div className="kt-portlet__body">
          {/* style="max-height: 50vh;" */}
          <PerfectScrollbar
            options={perfectScrollbarOptions}
            style={{ maxHeight: "50vh", position: "relative" }}
          >
            <div className="kt-timeline-v2 ps ps--active-y">
              <div className="kt-timeline-v2__items kt-padding-top-25 kt-padding-bottom-30">
                { data.map((i, k) => {
                    var time = new Date(i.failed_at);
                    var shownString = time.getHours() + ":" + (time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes());
                    return(
                        <div className="kt-timeline-v2__item" key ={k}>
                            <span className="kt-timeline-v2__item-time" title={time.toString()}>{shownString}</span>
                            <div className="kt-timeline-v2__item-cricle">
                            <i className="fa fa-genderless kt-font-danger" />
                            </div>
                            <div className="kt-timeline-v2__item-text kt-padding-top-5">
                            {i.exception}
                            </div>
                            <div className="kt-list-pics kt-list-pics--sm kt-padding-l-20" />
                        </div> 
                    )
                })}              
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
}
