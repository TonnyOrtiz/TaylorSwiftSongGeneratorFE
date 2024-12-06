import React from 'react';
import Message from './Message';

const ChatLog = ({ messages }) => {
  return (
    <div className="chat-log">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatLog;
