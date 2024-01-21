'use client';
import { Message } from '@/database/database';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';

type Props = { ip: string; browser: string };

export default function Chat(props: Props) {
  // States

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [update, setUpdate] = useState();
  const [blockEnterKey, setBlockEnterKey] = useState(false);

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
    // lock input to avoid double posts

    setBlockEnterKey(true);

    // client side check if message is empty or too long

    if (!newMessage || newMessage.length > 280) {
      setBlockEnterKey(false);
      return;
    }

    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        messageText: newMessage,
        chatUser: `${props.browser} @ ${props.ip}`,
      }),
    });

    // const data = await response.json();

    setNewMessage('');
    setBlockEnterKey(false);
  }

  // UI functions

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && !blockEnterKey) {
      sendMessage();
    }
  }

  // UseEffects

  useEffect(() => {
    // Fetch current messages
    getCurrentMessages();

    // Subscribe to Pusher channel
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('earthy-dawn-65');
    channel.bind('new-message', (data: any) => {
      console.log('Pusher event received:', data);
      getCurrentMessages(); // Fetch messages again when a new message is received
    });

    // Cleanup: Unsubscribe from the channel when the component unmounts
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // Text formatting functions
  const urlPattern =
    /(\bhttps?:\/\/|\bwww\.|\b)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?/gi;

  // function isUrl(word: string) {
  //   const urlPattern =
  //     /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  //   return word.match(urlPattern);
  // }

  // function addMarkup(word: string) {
  //   return isUrl(word) ? `<a href="${word}">${word}</a>` : word;
  // }
  return (
    <section className="flex flex-col h-full w-full max-w-lg">
      <div className="flex-grow flex flex-col justify-end">
        {messages.map((message) => {
          const urls = [];
          let match;
          let lastIndex = 0;
          const segments = [];

          // Find all URLs and store them along with their indices
          while ((match = urlPattern.exec(message.messageText)) !== null) {
            urls.push({ url: match[0], index: match.index });
          }

          // Build the segments array
          urls.forEach((item, index) => {
            // Add text segment before the URL
            segments.push(message.messageText.slice(lastIndex, item.index));
            // Add the URL
            segments.push(item.url);
            lastIndex = item.index + item.url.length;
          });

          // Add any remaining text after the last URL
          segments.push(message.messageText.slice(lastIndex));

          return (
            <div className="mb-4" key={message.id}>
              <p className="text-xl">
                {segments.map((segment, index) => {
                  if (urlPattern.test(segment)) {
                    const href = segment.startsWith('http')
                      ? segment
                      : `http://${segment}`;
                    return (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-4 hover:text-pink-400"
                      >
                        {segment}
                      </a>
                    );
                  } else {
                    return (
                      <React.Fragment key={index}>{segment}</React.Fragment>
                    );
                  }
                })}
              </p>
              <p className="text-sm font-extralight">{message.chatUser}</p>
            </div>
          );
        })}
      </div>
      {/* Inputs */}

      <div className="h-auto flex justify-between mt-4 p-1 bg-primaryPink border-primaryPink rounded-xl text-primaryBlue items-center">
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
