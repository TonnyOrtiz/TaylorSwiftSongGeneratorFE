import React from 'react';
import Message from './Message';

const ChatLog = ({ messages }) => {
  return (
    <div className="chat-log">
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={{
            ...message,
            text: message.text.replace(/\\r\\n/g, '\n').replace(/\\"/g, '"'),
          }} 
        />
      ))}
    </div>
  );
};

export default ChatLog;
