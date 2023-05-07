import React, { useCallback, useState } from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";

const Popup = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleComments = useCallback(() => {
    const newVal = !isEnabled;
    //for sending a message
    // chrome.runtime.sendMessage({ commenting: newVal }, function (response) {
    //   console.log("response", response);
    //   setIsEnabled(newVal);
    // });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { commenting: newVal },
        function (response) {
          console.log("response", response);
          setIsEnabled(newVal);
        }
      );
    });
  }, [isEnabled]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <button onClick={toggleComments}>Toggle</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  );
};

export default Popup;
