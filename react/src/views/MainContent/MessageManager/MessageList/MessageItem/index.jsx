import "./index.scss";
import Badge from "react-bootstrap/Badge";
const MessageItem = () => {
  return (
    <li className="list-group-item">
      {/* Logo */}
      <div className="message-logo">
        <img src="/line.png" alt="" className="message-logo__img" />
      </div>
      {/* Content */}
      <div className="message-content">
        {/* Info */}
        <div className="message-content__info">
          <span className="message-content__organization">
            Công ty TNHH ABC
          </span>
          <span className="message-content__from">Nguyễn Văn A</span>
        </div>
        {/* Subject */}
        <span className="message-content__subject">Chào bạn</span>
        {/* Status */}
        <div className="message-content__status">
          <span className="message-content__status--icon">
            <Badge pill bg="danger">
              Important
            </Badge>
            {/* <Badge pill bg="secondary">
              Normal 
            </Badge> */}
          </span>
          <span className="message-content__status--time">Time: 12:00</span>
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
