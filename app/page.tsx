import { getUserBrowserName } from '@/util/functions/getUserBrowserName';
import { getUserIp } from '@/util/functions/getUserIp';
import { headers } from 'next/headers';
import Chat from './components/Chat';

const header = headers();

// get user IP & user browser name

const ip = getUserIp(header);
console.log(ip);

const browser = getUserBrowserName(header);
console.log(browser);

export default function Home() {
  return (
    <main className="text-primaryPink p-4 h-full w-full flex justify-center">
      <Chat ip={ip} browser={browser} />
    </main>
  );
}
