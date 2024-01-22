'use client';
import { Message } from '@/database/database';
import Pusher from 'pusher-js';
import React, { useEffect, useRef, useState } from 'react';

type Props = { ip: string; browser: string };

const updateSwitch = false;

export default function Chat(props: Props) {
  // States

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [update, setUpdate] = useState(updateSwitch);
  const [blockEnterKey, setBlockEnterKey] = useState(false);

  // References

  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const characterLimit = 280;

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

    if (!newMessage.trim() || newMessage.length > characterLimit) {
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

    const data = await response.json();

    setNewMessage('');
    setBlockEnterKey(false);
    setUpdate(!updateSwitch);
  }

  // UI functions

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && !blockEnterKey) {
      sendMessage();
    }
  }

  // UseEffects
  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [messages]);

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
    /(?<![\w])(https?:\/\/|www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;

  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

  return (
    <section className="flex p-4 flex-grow flex-col self-end w-full max-w-lg  justify-end max-h-[80dvh]">
      <div className="overflow-y-auto flex-grow" ref={scrollableDivRef}>
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
              <p className="text-xl break-words hyphens-auto">
                {segments.map((segment, index) => {
                  if (urlPattern.test(segment)) {
                    if (emailPattern.test(segment)) {
                      return (
                        <a
                          key={index}
                          href={`mailto:${segment}`}
                          className="underline decoration-4 hover:text-pink-400"
                        >
                          {segment}
                        </a>
                      );
                    } else {
                      // It's a URL but not an email
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
                    }
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

      <div className="h-auto flex justify-between mt-5 p-1 bg-primaryPink border-primaryPink rounded-xl text-primaryBlue items-center relative">
        <span
          className={`text-sm font-extralight absolute top-[-18px] right-[5rem] ${
            newMessage.length > characterLimit
              ? 'text-red-400'
              : 'text-primaryPink'
          }`}
        >
          {newMessage.length}/{characterLimit}
        </span>
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
          <button
            className={blockEnterKey ? 'text-gray-300' : ''}
            onClick={async () => await sendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
