import React, { useEffect, useRef, useState } from "react";

const IframePage: React.FC = () => {
  const [showSecondIframe, setShowSecondIframe] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  const ref2 = useRef<HTMLIFrameElement>(null);
  const [stage, setStage] = useState("subscribe");

  const toggleSecondIframe = () => {
    setStage("transfer proof");
    if (ref.current) {
      ref.current.src = "http://localhost:3000/payment-transfer";
    }
  };
  const TransferStage = () => (
    <>
      wadwakdmawd
      <button onClick={toggleSecondIframe}>Transfer</button>
    </>
  );

  const InformationStage = () => (
    <>
      <p>Information Only</p>
    </>
  );

  useEffect(() => {
    // Function to handle messages received from iframe
    const handleMessage = (event: any) => {
      // Do something with the received message
      const data = event.data;

      if (data.stage) {
        setStage(data.stage);
        // if(data.stage == 'transfer'){
        //     if (ref.current) {
        //         ref.current.src = "";
        //     }
        // }
      }

      if (data.secondFrame) {
        setShowSecondIframe(true);
      }

      if (data.redirectUrl) {
        if (ref.current) {
          ref.current.src = data.redirectUrl;
        }
      }

      if (data.secondFrame === false) setShowSecondIframe(false);
    };

    // Add event listener to listen for messages from iframe
    window.addEventListener("message", handleMessage);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <p>step {stage}</p>
      <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
        <iframe
          src="http://localhost:3000/startgame"
          style={{
            border: "1px",
            width: showSecondIframe ? "50%" : "100%",
            height: "500px",
          }}
          ref={ref}
        ></iframe>
        {showSecondIframe && (
          <iframe
            src="http://localhost:3000/mobile-transfer"
            style={{
              border: "1px",
              width: "50%",
              height: "500px",
            }}
            ref={ref2}
          ></iframe>
        )}
      </div>
    </>
  );
};

export default IframePage;
