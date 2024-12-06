import logo from './logo.svg';
import './App.css';
import  './normal.css'
import React,{ useState } from 'react';
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
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [data, setData] = useState(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita el salto de línea por defecto
      handleSubmit();
    }
  };
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
