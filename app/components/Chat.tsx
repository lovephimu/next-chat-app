'use client';
import { Message } from '@/database/database';
import { useEffect, useState } from 'react';

export default function Chat() {
  // States

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

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

    // setAnimalList([...animalList, data.animal]);
  }

  // UseEffects

  useEffect(() => {
    getCurrentMessages();
  }, []);

  return (
    <section>
      <div>chat messages</div>
      <div>
        {messages.map((message) => {
          return <p key={`${message.id}`}>{message.messageText}</p>;
        })}
      </div>
      <input
        type="text"
        onChange={(event) => {
          setNewMessage(event.currentTarget.value);
        }}
      ></input>
      <div>
        <button onClick={async () => await sendMessage()}>Send</button>
      </div>
    </section>
  );
}
