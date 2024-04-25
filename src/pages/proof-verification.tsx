 import { setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

 const IframePage: React.FC = () => {
   const [showSecondIframe, setShowSecondIframe] = useState(true);

   useEffect(() => {
     // Function to handle messages received from parent window
     const handleMessage = (event: any) => {
       // Do something with the received message
       console.log("Message received in iframe:", event.data);
     };

     // Add event listener to listen for messages
     window.addEventListener("message", handleMessage);

     setCookie("cookieName", "cookieValue");
     // Clean up the event listener when component unmounts
     return () => {
       window.removeEventListener("message", handleMessage);
     };
   }, []);

   const sendMessageToParent = () => {
     const message = {
       redirectUrl: "http://localhost:3000/startgame",
       stage: "play",
     };
     // Send message to parent window
     window.parent.postMessage(message, "*");
   };

   return (
     <div style={{ background: "white", color: "black" }}>
       <button onClick={sendMessageToParent}>proof verification</button>
     </div>
   );
 };

 export default IframePage;
