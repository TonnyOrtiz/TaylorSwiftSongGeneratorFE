import React, { useState } from 'react';
import { IoIosSend } from "react-icons/io";

const ChatInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chatbox-input-holder">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="textarea-wrapper">
          <textarea
            className="chat-input-textarea"
            placeholder="Type your message here"
            value={inputValue}
            onChange={handleInputChange}
            rows="1"
          />
          <button type="submit" className="send-icon-button">
            <IoIosSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
