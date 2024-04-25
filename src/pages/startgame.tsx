import { getCookie, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const IframePage: React.FC = () => {
  const [showSecondIframe, setShowSecondIframe] = useState(true);
  const [cookieValue, setCookieValue] = useState("");
  const toggleSecondIframe = () => {
    setShowSecondIframe(!showSecondIframe);
  };

  useEffect(() => {
    // Function to handle messages received from parent window
    const handleMessage = (event: any) => {
      // Do something with the received message
      console.log("Message received in iframe:", event.data);
    };

    // Add event listener to listen for messages
    window.addEventListener("message", handleMessage);

    // Get cookie
    const cookie = getCookie("cookieName");
    if (cookie) setCookieValue(cookie);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const sendMessageToParent = () => {
    const message = {
      secondFrame: true,
      redirectUrl: "http://localhost:3000/payment-info",
      stage: "transfer",
    };
    // Send message to parent window
    window.parent.postMessage(message, "*");
  };

  const clearCookie = () => {
    setCookie("cookieName", "", { expires: new Date(0) });
    //refresh the page
    window.location.reload();
  };

  return (
    <div style={{ background: "white" }}>
      {cookieValue ? (
        <>
          <p style={{ color: "black" }}>Cookie: {cookieValue}</p>
          <button onClick={clearCookie}>Clear Cookie</button>
        </>
      ) : (
        <button onClick={sendMessageToParent}>subscribe now</button>
      )}
    </div>
  );
};

export default IframePage;
