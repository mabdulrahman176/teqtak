import React, { Fragment } from "react";
import UserSubscribed from "./UserSubscribed";
import UserSubscribers from "./UserSubscribers";

const UserSub = () => {
  return (
    <Fragment>
      <div
        className="flex flex-wrap bg-white mt-1 h-[99%] overflow-y-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          WebkitScrollbar: {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div
          className="w-[48%] h-[600px] overflow-y-auto ml-1"
          style={{
            WebkitOverflowScrolling: "touch",
            WebkitScrollbar: {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <UserSubscribed />
        </div>
        <div
          className="w-[48%] h-[600px] overflow-y-auto ml-1"
          style={{
            WebkitOverflowScrolling: "touch",
            WebkitScrollbar: {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <UserSubscribers />
        </div>
      </div>
    </Fragment>
  );
};

export default UserSub;