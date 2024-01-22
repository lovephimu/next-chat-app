next-chat-app:

# Chat-Schibidi

### work-in-progress

An open chat-room where everyone with an IP and a browser can post!

### Technologies Used

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Ley/Migrations](https://github.com/lukeed/ley)
- REST API
- [Tailwind CSS](https://tailwindcss.com/)

### Technical Conception

### Todos

- Add Jest tests
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

6. All set!
