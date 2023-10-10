import React from "react";
import "./style.scss";

const MessageContent = () => {
  return (
    <div className="message-content-container">
      <div className="message-content-header">
        <div className="message-content-header-name">
          <h6>Nguyen Tien Viet</h6>
        </div>

        <div className="message-content-header-btn-group">
          <i className="fa-solid fa-magnifying-glass message-content-header-btn"></i>
          <i className="fa-solid fa-file-lines message-content-header-btn"></i>
          <i className="fa-solid fa-ellipsis-vertical message-content-header-btn"></i>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
