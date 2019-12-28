import React from "react";
import { connect } from 'react-redux';

class MenuSection extends React.Component {
  renderContent = (item) => {
    if (!!item.admin_only && item.admin_only && !this.props.user.is_admin) {
      return <></>
    }
    else {
      return <li className="kt-menu__section">
      <h4 className="kt-menu__section-text">{item.section}</h4>
      <i className="kt-menu__section-icon flaticon-more-v2" />
    </li>
    }
  }
  render() {
    const { item } = this.props;
    if (item.admin_only && this.props.user.is_admin)
      console.log("True")
    return (
      <>{this.renderContent(item)}</>
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.auth.user,
  }
}
export default connect(mapStateToProps, null)(MenuSection);