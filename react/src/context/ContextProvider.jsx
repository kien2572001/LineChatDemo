import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  lineUser: null,
  lineToken: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setLineUser: () => {},
  setLineToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");
  const [lineUser, setLineUser] = useState({});
  const [lineToken, _setLineToken] = useState(
    JSON.parse(localStorage.getItem("LINE_ACCESS_TOKEN"))
  );

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  const setLineToken = (token) => {
    _setLineToken(token);
    if (token) {
      localStorage.setItem("LINE_ACCESS_TOKEN", JSON.stringify(token));
    } else {
      localStorage.removeItem("LINE_ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
        lineUser,
        setLineUser,
        lineToken,
        setLineToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
