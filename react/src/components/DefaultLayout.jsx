import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import axios from "axios";
import { useEffect, useState } from "react";
import LineLogin from "./LineLogin";
import { v4 as uuidv4 } from "uuid";
export default function DefaultLayout() {
  const {
    user,
    token,
    setUser,
    setToken,
    notification,
    lineUser,
    lineToken,
    setLineUser,
    setLineToken,
  } = useStateContext();
  const [payload, setPayload] = useState(null);
  const [idToken, setIdToken] = useState(null);
  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      setLineUser({});
      setLineToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (lineToken && lineToken.access_token) {
      axios
        .get("https://api.line.me/v2/profile", {
          headers: {
            Authorization: `Bearer ${lineToken.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          //console.log("res", res);
          setLineUser(res.data);
        });
    }
  }, []);

  return (
    <div id="defaultLayout">
      <header>
        <div>Header</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="">
            {lineToken ? (
              <>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "30px",
                  }}
                >
                  Line: {lineUser.displayName}
                </span>
              </>
            ) : (
              <LineLogin
                clientID="2001082930"
                clientSecret="81f29a820b2fc763ce27f51dd1c5ede3"
                state={uuidv4()}
                nonce={uuidv4()}
                redirectURI="http://localhost:3000/callback"
                scope="profile openid email phone friends"
                setPayload={setPayload}
                setIdToken={setIdToken}
              />
            )}
          </div>
          {user.name} &nbsp; &nbsp;
          <a onClick={onLogout} className="btn-logout" href="#">
            Logout
          </a>
        </div>
      </header>
      <div className="content">
        <aside>
          {/* <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link> */}
          <Link to="/messages">Messages</Link>
          <Link to="">Drafts</Link>
          <Link to="">Sent</Link>
          <Link to="">Trash</Link>
        </aside>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}
