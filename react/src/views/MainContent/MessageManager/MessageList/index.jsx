import ListGroup from "react-bootstrap/ListGroup";
import MessageItem from "./MessageItem";
const MessageList = () => (
  <ul className="">
    <ul className="list-group list-group-flush">
      {[1, 2, 3].map((item, index) => (
        <MessageItem key={index} />
      ))}
    </ul>
  </ul>
);

export default MessageList;
