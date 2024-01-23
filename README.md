<img src="https://github.com/lovephimu/next-chat-app/raw/main/public/chat_logo_markup.png" alt="Chat Logo" width="200" height="auto">

next-chat-app:

# Chat-Schibidi

### work-in-progress

An open chat-room where everyone with an IP and a browser can post!

### Technologies Used

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Ley/Migrations](https://github.com/lukeed/ley)
- REST API
- [Pusher Websocket API](https://pusher.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JEST](https://jestjs.io/)

### Technical Conception

- An open chat room that updates upon receiving a new message.
- A PostgreSQL database stores 5 messages - when limit is exceeded older messages get deleted until the limit is matched again
- Frontend an database are communicating over restAPI
- User can input messages of up to 280 characters (empty messages are not allowed)
- When the API completes the database queries successfully a Pusher event is triggered
- In the frontend a useEffect is subscribed to a Pusher channel
- When receiving a signal from Pusher the frontend triggers a React rerender by updating the states with the newest messages

### Todos

- UI Feedback on erros
- UI for large screens

### Problems

UI:

- Send button allows super-fast-double clicking

IP/User Agent:

- Evaluation needs to be moved to API, leaving the website open and switching networks wont update IP or browser info

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

5. Before using `pnpm dev` you have to migrate up using pnpm `migrate up`

6. All set!!
