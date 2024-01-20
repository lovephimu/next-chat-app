'use client';
import { Message } from '@/database/database';
import { useEffect, useState } from 'react';

export default function Chat() {
  // States

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [update, setUpdate] = useState();

  // Fetch functions to read and write Messages

  async function getCurrentMessages() {
    const response = await fetch('api/messages', {
      method: 'GET',
    });

    const data = await response.json();
    setMessages([...data.messages]);
    console.log(data);
  }

  async function sendMessage() {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        messageText: newMessage,
        chatUser: 'testtyp',
      }),
    });

    // const data = await response.json();

    setNewMessage('');
  }

  // UX functions

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  // UseEffects

  useEffect(() => {
    getCurrentMessages();
  }, []);

  return (
    <section>
      {/* Chat messages */}

      <div>
        {messages.map((message) => {
          return <p key={`${message.id}`}>{message.messageText}</p>;
        })}
      </div>

      {/* Inputs */}

      <div className="flex justify-between mt-4 p-1 bg-primaryPink border-primaryPink rounded-xl text-primaryBlue items-center">
        <input
          className="bg-transparent border-2 border-primaryBlue focus:border-primaryPink focus:ring-0 p-4 rounded-lg w-full"
          type="text"
          autoFocus
          onChange={(event) => {
            setNewMessage(event.currentTarget.value);
          }}
          onKeyDown={(event) => handleKeyDown(event)}
          value={newMessage}
        ></input>
        <div className="flex justify-center w-20">
          <button onClick={async () => await sendMessage()}>Send</button>
        </div>
      </div>
    </section>
  );
}
