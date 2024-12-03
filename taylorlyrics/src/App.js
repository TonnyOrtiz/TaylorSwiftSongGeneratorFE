import logo from './logo.svg';
import './App.css';
import  './normal.css'
import { useState } from 'react';


function App() {
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
  const handleSubmit = () => {
    let startStr =inputText;
    setChatLog([...chatLog, inputText]);
    setInputText('');

    // Aquí se enviaría el mensaje al servidor con fetch async
    let response = fetch('http://localhost:3420/generate/?startString='+startStr, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }).then(response => {
      console.log('Request sent');
      response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });

    /* fetch('http://localhost:3420/generate/?startString='+startStr,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error)); */

    // Aquí se recibiría la respuesta del servidor y se añadiría al chat
    response.then(data => {
      setChatLog([...chatLog, data]);
    });


  };
  return (
    <div className="App">
      <div className='topnav'>
        <div className='header-title'>Chat with Taylor Swift</div>
        <div className='header-user'>User: Taylor Swift</div>
      </div>
      <div className='main-body'>
        <aside className='sidemenu'>  
        <div className='side-menu-button'><span >+</span>New chat</div>      
        </aside>
        <section className='chatbox'> 
          <div className='chat-log'>
            <div className='chat-message'>
                <div className='message-text'>
                  <p>Hi! I'm Taylor Swift. I'm here to help you write a song. Type the starting words for your song and I'll generate the rest of the lyrics for you.</p>
                </div>
            </div>  
            {/* Aquí se mostrarán los mensajes */
            chatLog.map((message, index) => {
              return (
                <div key={index} className='chat-message'>
                  <div className='message-text'>{message}</div>
                </div>
              );
            })}          

          </div>
          <div className='chatbox-input-holder'>
            <textarea onKeyDown={handleKeyDown} 
            value={inputText}
            onChange={handleInputChange}
            className='chat-input-textarea'
            placeholder='Type the starting words for your song here'></textarea>
          </div>
           
        </section>
      </div>
    </div>
  );
}

export default App;
