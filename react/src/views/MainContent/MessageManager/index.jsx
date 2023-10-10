import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MessageList from "./MessageList";

const MessageManager = () => {
  const [key, setKey] = useState("all");
  return (
    <div className="row">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="col-8 w-100"
        fill
      >
        <Tab eventKey="all" title="All">
          <MessageList />
        </Tab>
        <Tab eventKey="unread" title="Unread">
          <MessageList />
        </Tab>
        <Tab eventKey="important" title="Important">
          <MessageList />
        </Tab>
        <Tab eventKey="normal" title="Normal">
          <MessageList />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MessageManager;
