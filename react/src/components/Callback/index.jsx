import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

const Callback = () => {
  const location = useLocation();
  const { setLineUser, setLineToken } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      // Gửi mã xác nhận đến server của bạn để lấy access token từ dịch vụ LINE
      axiosClient
        .get("/line/login/callback", {
          params: {
            code: code,
          },
        })
        .then((response) => {
          // Xử lý phản hồi từ server, có thể lưu thông tin người dùng vào state hoặc context
          //console.log("response", response);
          setLineUser(response.data.profile);
          setLineToken(response.data.token);
          navigate("/messages");
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
        });
    } else {
      // Xử lý trường hợp người dùng từ chối quyền truy cập
      console.log("Người dùng từ chối quyền truy cập.");
    }
  }, [location.search]);

  return (
    <div>
      <p>Xử lý phản hồi từ dịch vụ LINE...</p>
    </div>
  );
};

export default Callback;
