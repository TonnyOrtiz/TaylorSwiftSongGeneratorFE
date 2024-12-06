import logo from './logo.svg';
import './App.css';
import  './normal.css'
import React,{ useState, useEffect } from 'react';
import Sidebar from './components/SideBar'; // Import the Sidebar component
import ChatLog from './components/ChatLog';
import ChatInput from './components/ChatInput';


async function request(startString){
  await fetch('http://localhost:3420/generate/?startString='+startString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => {
    console.log('Request sent');
    console.log(response);
    /* response.json(); */
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function App() {
    // Estado para los mensajes individuales
    const [messages, setMessages] = useState([]);
    // Estado para múltiples chats
    const [chats, setChats] = useState([]);
    // Índice del chat actual
    const [currentChatIndex, setCurrentChatIndex] = useState(null);
  
    // Cargar chats desde localStorage al inicializar
    useEffect(() => {
      const storedChats = loadChatsFromLocalStorage();
      if (storedChats) {
        setChats(storedChats);
      }
    }, []);
  
    // Maneja el envío de un mensaje
    const handleSubmit = (messageText) => {
      if (currentChatIndex === null) {
        alert('Por favor, selecciona un chat primero.');
        return;
      }
  
      const newMessage = { id: Date.now(), text: messageText };
  
      // Actualizar el log de mensajes en el chat actual
      const updatedChats = [...chats];
      updatedChats[currentChatIndex].messages.push(newMessage);
      setChats(updatedChats);
  
      // Guardar en localStorage
      saveChatsToLocalStorage(updatedChats);
  
      // Actualizar el estado local de mensajes (opcional)
      setMessages(updatedChats[currentChatIndex].messages);
    };
  
    // Maneja la selección de un chat existente
    const handleSelectChat = (index) => {
      setCurrentChatIndex(index);
      setMessages(chats[index].messages);
    };
  
    // Maneja la creación de un nuevo chat
    const handleNewChat = () => {
      const newChat = { id: Date.now(), name: `Chat ${chats.length + 1}`, messages: [] };
      const updatedChats = [...chats, newChat];
      setChats(updatedChats);
      
      // Guardar en localStorage
      saveChatsToLocalStorage(updatedChats);
  
      // Cambiar al nuevo chat
      setCurrentChatIndex(updatedChats.length - 1);
      setMessages([]);
    };
  
    // Simula cargar los chats desde localStorage
    const loadChatsFromLocalStorage = () => {
      const chatsJson = localStorage.getItem('chats');
      return chatsJson ? JSON.parse(chatsJson) : [];
    };
  
    // Simula guardar los chats en localStorage
    const saveChatsToLocalStorage = (chats) => {
      localStorage.setItem('chats', JSON.stringify(chats));
    };
  
    // Aquí iría el return con el HTML
  
  return (
    <div className="App">
      <div className='topnav'>
        <div className='header-title'>Chat with Taylor Swift</div>
        <div className='header-user'>User: Taylor Swift</div>
      </div>
      <div className='main-body'>
        
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
    </div>
  );
}

export default App;
