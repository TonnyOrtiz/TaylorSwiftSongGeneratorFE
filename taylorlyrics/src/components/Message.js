import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={`chat-message ${message.sender === 'user' ? 'user' : 'bot'}`}>
      <div className="message">{message.text}</div>
    </div>
  );
};

export default Message;
