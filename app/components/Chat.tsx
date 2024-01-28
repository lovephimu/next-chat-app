'use client';
import { Message } from '@/database/database';
import { checkedMessageLength } from '@/util/functions/checkedMessageLength';
import {
  emailPattern,
  globalCharacterLimit,
  urlPattern,
} from '@/util/variables/globalVariables';
import Pusher from 'pusher-js';
import React, { useEffect, useRef, useState } from 'react';
import InputButton from './InputButton';

export default function Chat() {
  // States

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [blockEnterKey, setBlockEnterKey] = useState(false);

  // References

  const scrollableDivRef = useRef<HTMLDivElement>(null);

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

    if (!checkedMessageLength(newMessage, globalCharacterLimit)) {
      setBlockEnterKey(false);
      return;
    }

    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        messageText: newMessage,
      }),
    });

    const data = await response.json();

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

  return (
    <section className="flex p-4 flex-grow flex-col self-end w-full justify-end h-[80dvh] max-h-[80dvh] sm:max-h-[70dvh] sm:h-full sm:max-w-2xl sm:px-8 sm:pb-8 sm:pt-0">
      {messages.length === 0 ? (
        <div className="w-full flex flex-col h-[70dvh] flex-grow justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
          <p className="text-sm">Loading</p>
        </div>
      ) : (
        <div className="overflow-y-auto" ref={scrollableDivRef}>
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
      )}

      {/* Inputs */}

      <div className="h-auto flex justify-between z-20 mt-5 p-1 bg-primaryPink border-primaryPink rounded-xl text-primaryBlue items-center relative">
        <span
          className={`text-sm transition duration-500 font-extralight absolute top-[-18px] right-[5rem] ${
            newMessage.length <= globalCharacterLimit
              ? 'text-primaryPink'
              : 'text-red-400'
          }`}
        >
          {newMessage.length}/{globalCharacterLimit}
        </span>

        {/* Info messages */}

        <span
          aria-hidden={newMessage.length >= globalCharacterLimit ? true : false}
          className={`text-sm font-extralight transition duration-500 absolute text-primaryPink message-alert left-[1rem] ${
            newMessage.length >= globalCharacterLimit
              ? ' message-alert-active'
              : 'opacity-0'
          }
          ${newMessage.length > globalCharacterLimit ? 'text-red-400 ' : ''}`}
        >
          Character limit reached.
        </span>

        {/* Input */}

        <label htmlFor="message-input" className="sr-only">
          Message input:
        </label>
        <input
          id="message-input"
          className="border-2 border-primaryBlue focus:border-primaryPink bg-primaryPink focus:ring-0 p-4 rounded-lg w-full"
          type="text"
          onChange={(event) => {
            setNewMessage(event.currentTarget.value);
          }}
          onKeyDown={(event) => handleKeyDown(event)}
          value={newMessage}
        ></input>
        <InputButton
          function={sendMessage}
          isBlocked={blockEnterKey}
          title={'Send'}
        />
      </div>
    </section>
  );
}
