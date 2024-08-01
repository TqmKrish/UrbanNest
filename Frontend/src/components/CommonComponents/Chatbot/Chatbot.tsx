import React, { useState } from "react";
import "./Chatbot.scss";
import { SiChatbot } from "react-icons/si";

const dummyMessages = [
  {
    sender: "bot",
    text: "Hello! How can I assist you today?",
    timestamp: "10:00 AM",
  },
  {
    sender: "user",
    text: "I have a question about your services.",
    timestamp: "10:01 AM",
  },
  { sender: "bot", text: "Sure! Please go ahead.", timestamp: "10:02 AM" },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(dummyMessages);
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        sender: "user",
        text: inputValue,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-button" onClick={handleButtonClick}>
          {/* <img src="bot-image-url" alt="Chatbot" /> */}
          <SiChatbot />
        </button>
      )}
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>Chatbot</h3>
            <button className="close-button" onClick={handleCloseClick}>
              ×
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                <div className="message-text">{message.text}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
