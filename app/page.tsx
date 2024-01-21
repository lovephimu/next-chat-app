import { getUserBrowserName } from '@/util/functions/getUserBrowserName';
import { getUserIp } from '@/util/functions/getUserIp';
import { headers } from 'next/headers';
import Chat from './components/Chat';

export default function Home() {
  const header = headers();

  // get user IP & user browser name

  const ip = getUserIp(header);
  console.log(ip);

  const browser = getUserBrowserName(header);
  console.log(browser);
  return (
    <main className="text-primaryPink  h-full w-full flex justify-center">
      <Chat ip={ip} browser={browser} />
    </main>
  );
}
