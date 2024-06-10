import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const InputField = () => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {
    const newSocket = io('ws://localhost:4000');
    setSocket(newSocket);

    // Set up the response listener
    newSocket.on('response', (data) => {
      console.log("My Response", data);
      setReceivedData((prevData) => [...prevData, data]);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message is::::", message);
    if (socket) {
      socket.emit('message', message);
    }
    setMessage('');
  };

  return (
    <>
      <div>InputField</div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={e => setMessage(e.target.value)} placeholder='Type here...' />
        <button type='submit'>send</button>
      </form>
      <div>
        {receivedData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </div>
    </>
  );
};

export default InputField;
