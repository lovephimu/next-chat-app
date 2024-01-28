import { countUsers } from '@/util/functions/countUsers';
import ChatUsers from '../components/ChatUsers';

export default async function VisitorsPage() {
  async function getCurrentMessages() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();
    console.log(data);
    return data.messages;
  }

  const currentMessages = await getCurrentMessages();

  const countedUsers = countUsers(currentMessages);

  return (
    <section className="text-primaryPink h-full w-full flex justify-center sm:max-w-2xl relative">
      <section className="text-primaryPink h-full w-full flex justify-center sm:max-w-2xl sm:border-b-8 sm:border-x sm:rounded-b-2xl sm:border-primaryPink items-center">
        <ChatUsers agents={countedUsers} />
      </section>
    </section>
  );
}
