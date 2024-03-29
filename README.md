<img src="https://github.com/lovephimu/next-chat-app/raw/main/public/chat_logo_markup.png" alt="Chat Logo" width="200" height="auto">

next-chat-app:

# Chat-Schibidi

### Version 1.0

An open chat-room where everyone with an IP and a browser can post!

### Technologies Used

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Ley/Migrations](https://github.com/lukeed/ley)
- [Pusher Websocket API](https://pusher.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [D3](https://d3js.org/)
- [JEST](https://jestjs.io/)
- REST API
- TypeScript
- Regex

### Technical Conception

- An open chat room that updates upon receiving a new message.
- A PostgreSQL database stores 5 messages - when limit is exceeded older messages get deleted until the limit is matched again
- Frontend and database are communicating over restAPI
- User can input messages of up to 280 characters (empty messages are not allowed)
- User input checks are both on the client- and server side, checking for valid character length and making sure the input isn't empty
- Messages are stored using this endpoint: /api/messages
- When the API completes the database queries successfully a Pusher event is triggered.
- In the frontend a useEffect is subscribed to a Pusher channel
- When receiving a signal from Pusher the frontend triggers a React rerender by updating the states with the newest messages

### UI

<img src="https://github.com/lovephimu/next-chat-app/blob/main/public/ui_mobile.png" alt="Mobile layout" width="200" height="auto">

<img src="https://github.com/lovephimu/next-chat-app/blob/main/public/ui_screen.png" alt="Screen layout" width="200" height="auto">

- The chat interface has a simplistic design in the spirit of old open chat rooms.
- Navigation consists of two elements: the chat logo leading to the chat and a statistics icon leading to a D3 chart
- Responsive design: Screen resolution covered: Mobile to 1080p

<img src="https://github.com/lovephimu/next-chat-app/blob/main/public/ui_feedback1.png" alt="First notification" width="200" height="auto">

<img src="https://github.com/lovephimu/next-chat-app/blob/main/public/ui_feedback2.png" alt="Second notification" width="200" height="auto">

- Visual feedback: the messaging system is designed to allow only short messages. To keep the user informed there is a character count and additional alerts when the character limit is reached or exceeded
- Although most of the app is styed using Tailwind I do use CSS in special cases like the animated statistics button and the D3 chart
- All drawings and icons were made by myself using Affinity Designer

### Feature List

- Character limit & maximum stored messages are controlled by the global variables "globalCharacterLimit" and "globalMessageLimit". By default they are set to 280 and 5 (util/variables/globalVariables.ts).
- Character limit is checked client and server side to ensure the correct format at all times
- Links are being rendered as clickable links using a regex.

<img src="https://github.com/lovephimu/next-chat-app/blob/main/public/d3_feature.png" alt="Simple D3 chart tracking browser usage" width="200" height="auto">

- A d3 chart visualizes the most used browser among the stored chat messages [D3 Statistic](https://chat-schibidi.vercel.app/visitors)

### Todos

- Add ent-to-end tests
- Add default 404 page
- Connect chart to websocket for live updates

### Problems

UI:

- Send button allows super-fast-double clicking
- Sometimes the statistics bar don't appear descending by message number as intended
- Sometimes the URL regex responsible for identifying links fails

### Local setup (using pnpm / npm will work as well)

1. To run the project locally you need postgres installed on your computer and an access to a pusher channel.
2. After cloning the repo on your computer use `pnpm i`
3. Set up a local database using the terminal

```
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
\connect <database name>;
CREATE SCHEMA <user name> AUTHORIZATION <user name>;
```

4. create a .env file with your database and pusher credentials like so:

```
PGHOST=localhost
PGUSERNAME=<user name>
PGPASSWORD=<user password>
PGDATABASE=<database name>

NEXT_PUBLIC_BASE_URL=http://localhost:3000

PUSHER_APP_ID=<pusher id>
PUSHER_KEY=<pusher key>
PUSHER_SECRET=<pusher secret>
PUSHER_CLUSTER=<pusher cluster>

NEXT_PUBLIC_PUSHER_APP_KEY=<pusher key>
NEXT_PUBLIC_PUSHER_CLUSTER=<pusher cluster>
```

5. Before using `pnpm dev` you have to migrate up using `pnpm migrate up`

6. All set!!
