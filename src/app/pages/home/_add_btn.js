import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
function _add_btn(props) {
    return (
        <Link
            to={ props.history.location.pathname + "/new" }
            className="btn btn-label-success btn-bold btn-icon-h kt-margin-l-10">
            <AddIcon /> Thêm mới
        </Link>
    );
}
export default withRouter(_add_btn);