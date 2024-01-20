import { headers } from 'next/headers';
import Image from 'next/image';
import Chat from './components/Chat';

export default function Home() {
  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  return (
    <main className="text-primaryPink p-4 h-full w-full flex justify-center">
      <Chat ip={ip} />
    </main>
  );
}
