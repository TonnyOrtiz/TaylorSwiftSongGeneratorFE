import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Importa el contexto de autenticación
import Sidebar from './components/SideBar';
import ChatLog from './components/ChatLog';
import ChatInput from './components/ChatInput';
import Slider from './Slider';
import './App.css';
import './normal.css';

function App() {
    // Estado para los mensajes individuales
    const [messages, setMessages] = useState([]);
    // Estado para múltiples chats
    const [chats, setChats] = useState([]);
    // Índice del chat actual
    const [currentChatIndex, setCurrentChatIndex] = useState(null);
    
    const { user, logout } = useAuth(); // Extrae la información del usuario y la función de logout desde el contexto de autenticación

    const [temperature, setTemperature] = useState(0);

  
    // Cargar chats desde localStorage al inicializar
    useEffect(() => {
      const storedChats = loadChatsFromLocalStorage();
      if (storedChats) {
        setChats(storedChats);
      }
    }, []);
  

     // Maneja el envío de un mensaje
    const handleSubmit = async (messageText) => {
      if (currentChatIndex === null) {
        alert('Por favor, selecciona un chat primero.');
        return;
      }

      const newMessage = { id: Date.now(), text: messageText };

      // Actualizar el log de mensajes en el chat actual
      const updatedChats = [...chats];
      updatedChats[currentChatIndex].messages.push(newMessage);

      // Llama al API para generar una canción y agrega el resultado como mensaje
      const generatedSong = await generateSong(messageText, temperature);
      if (generatedSong) {
        const songMessage = { id: Date.now(), text: generatedSong };
        updatedChats[currentChatIndex].messages.push(songMessage);
      }

      setChats(updatedChats);

      // Guardar en localStorage
      saveChatsToLocalStorage(updatedChats);

      // Actualizar el estado local de mensajes
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

    // Realiza una solicitud al API para generar una canción
    const generateSong = async (startString, temper) => {
      try {
        const response = await fetch(`http://localhost:3420/generate/?startString=${encodeURIComponent(startString)}&temperature=${encodeURIComponent(temper)}`);
        if (!response.ok) {
          throw new Error(`Error al generar la canción: ${response.statusText}`);
        }
        const data = await response.json();
        var temp = data.song.replace(/\\r\\n/g, '\n').replace(/\\"/g, '"');
        console.log(temp);
        return temp;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    // Aquí iría el return con el HTML
  return (
    <div className="App">
      <div className="topnav">
        <div className="header-title">Chat with Taylor Swift</div>
        <Slider temperature={temperature} setTemperature={setTemperature} />
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