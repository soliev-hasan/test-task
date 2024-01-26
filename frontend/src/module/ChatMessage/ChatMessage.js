import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  //-----------------------------------------------------
  // variables
  //-----------------------------------------------------
  const messageType = message.startsWith("You:") ? "sent" : "received";

  //-----------------------------------------------------
  return <div className={`message-container ${messageType}`}>{message}</div>;
};

export default ChatMessage;
