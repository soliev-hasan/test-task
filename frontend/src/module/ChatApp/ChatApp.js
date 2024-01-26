import React, { useState, useEffect } from "react";
import "./ChatApp.css";
jest.mock("websocket", () => ({
  ...jest.requireActual("websocket"),
  w3cwebsocket: jest.fn(),
}));
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ChatMessage from "../ChatMessage/ChatMessage";

const ChatApp = () => {
  //-----------------------------------------------------
  // variables
  //-----------------------------------------------------
  const client = new W3CWebSocket("ws://localhost:8080");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //-----------------------------------------------------
  // effects
  //-----------------------------------------------------

  useEffect(() => {
    client.onmessage = (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `Server: ${message.data}`,
      ]);
    };
  }, []);

  //-----------------------------------------------------
  // functions
  //-----------------------------------------------------

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (message.trim() !== "") {
      client.send(message);
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage("");
    }
  };

  //-----------------------------------------------------
  return (
    <div className="container" data-testid="chat-container">
      <div className="chat-container">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className="form">
        <input
          type="text"
          className="input"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
