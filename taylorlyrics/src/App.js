import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Importa el contexto de autenticación
import Sidebar from './components/SideBar';
import ChatLog from './components/ChatLog';
import ChatInput from './components/ChatInput';
import './App.css';
import './normal.css';

async function request(startString) {
  await fetch('http://localhost:3420/generate/?startString=' + startString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Request sent');
      console.log(response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function App() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  const { user, logout } = useAuth(); // Extrae la información del usuario y la función de logout desde el contexto de autenticación

  useEffect(() => {
    const storedChats = loadChatsFromLocalStorage();
    if (storedChats) {
      setChats(storedChats);
    }
  }, []);

  const handleSubmit = messageText => {
    if (currentChatIndex === null) {
      alert('Por favor, selecciona un chat primero.');
      return;
    }

    const newMessage = { id: Date.now(), text: messageText };

    const updatedChats = [...chats];
    updatedChats[currentChatIndex].messages.push(newMessage);
    setChats(updatedChats);

    saveChatsToLocalStorage(updatedChats);

    setMessages(updatedChats[currentChatIndex].messages);
  };

  const handleSelectChat = index => {
    setCurrentChatIndex(index);
    setMessages(chats[index].messages);
  };

  const handleNewChat = () => {
    const newChat = { id: Date.now(), name: `Chat ${chats.length + 1}`, messages: [] };
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);

    saveChatsToLocalStorage(updatedChats);

    setCurrentChatIndex(updatedChats.length - 1);
    setMessages([]);
  };

  const loadChatsFromLocalStorage = () => {
    const chatsJson = localStorage.getItem('chats');
    return chatsJson ? JSON.parse(chatsJson) : [];
  };

  const saveChatsToLocalStorage = chats => {
    localStorage.setItem('chats', JSON.stringify(chats));
  };

  return (
    <div className="App">
      <div className="topnav">
        <div className="header-title">Chat with Taylor Swift</div>
        <div className="header-user">
          {user ? (
            <>
              <span>User: {user.name}</span>
              <button onClick={logout} className="button">Logout</button>
            </>
          ) : (
            'User: Guest'
          )}
        </div>
      </div>
      <div className="main-body">
        <Sidebar onNewChat={handleNewChat} chats={chats} onSelectChat={handleSelectChat} />

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
    </div>
  );
}

export default App;