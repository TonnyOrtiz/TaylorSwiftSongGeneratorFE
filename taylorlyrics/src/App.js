import React, { useState } from 'react';
import './App.css';
import './normal.css';
import Sidebar from './components/SideBar'; // Import the Sidebar component
import ChatLog from './components/ChatLog';
import ChatInput from './components/ChatInput';




function App() {

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  // Function to start a new chat
  const handleNewChat = () => {
    // Save current messages as a past chat if there are messages
    if (messages.length > 0) {
      setChats((prevChats) => [...prevChats, messages]);
    }

    // Clear the current messages for the new chat
    setMessages([]);
    setCurrentChatIndex(chats.length); // Set to the next chat index (new chat)
  };

  // Function to handle message submission
  const handleSubmit = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: message },
    ]);
  };

  // Function to switch to a past chat
  const handleSelectChat = (index) => {
    setCurrentChatIndex(index);
    setMessages(chats[index]); // Set the messages for the selected past chat
  };
  return (
    <div className="App">
      <Sidebar 
        onNewChat={handleNewChat} 
        chats={chats} 
        onSelectChat={handleSelectChat} 
      />

      <section className="chatbox">
        <div className="chat-container">
          {/* Display current chat */}
          {currentChatIndex !== null && (
            <div className="current-chat">
              <ChatLog messages={messages} />
              <ChatInput onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
