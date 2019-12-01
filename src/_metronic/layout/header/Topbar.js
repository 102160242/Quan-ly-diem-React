import React from "react";
import QuickActionsPanel from "../../../app/partials/layout/QuickActionsPanel";
import UserProfile from "../../../app/partials/layout/UserProfile";
import { toAbsoluteUrl } from "../../utils/utils";

export default class Topbar extends React.Component {
  render() {
    return (
      <div className="kt-header__topbar">

        <QuickActionsPanel
          bgImage={toAbsoluteUrl("/media/misc/bg-2.jpg")}
          skin="dark"
          iconType=""
          useSVG="true"
          gridNavSkin="light"
        />
        <UserProfile showAvatar={true} showHi={true} showBadge={false} />
      </div>
    );
  }
}
