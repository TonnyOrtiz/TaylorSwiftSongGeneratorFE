import React from 'react';

const Sidebar = ({ onNewChat, chats, onSelectChat }) => {
  return (
    <aside className="sidemenu">
      <div className="side-menu-button" onClick={onNewChat}>
        <span>+</span> New Chat
      </div>

      <div className="past-chats">
        {chats.map((chat, index) => (
          <div 
            key={index} 
            className="past-chat-button" 
            onClick={() => onSelectChat(index)}
          >
            Chat {index + 1}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
