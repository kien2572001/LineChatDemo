import MessageContent from "./MessageContent";
import MessageManager from "./MessageManager";

const MainContent = () => {
  return (
    <div className="row ">
      <div className="col-5 ">
        <MessageManager />
      </div>
      <div className="col-7">
        <MessageContent />
      </div>
    </div>
  );
};

export default MainContent;
