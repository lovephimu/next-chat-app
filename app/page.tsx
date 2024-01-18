import Image from 'next/image';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="text-primaryPink">
      <div>Chat Schibidi</div>
      <Chat />
    </main>
  );
}
