import Image from 'next/image';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="text-primaryPink p-4 h-full">
      <Chat />
    </main>
  );
}
