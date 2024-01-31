import { countUsers } from '@/util/functions/countUsers';
import { globalMessageLimit } from '@/util/variables/globalVariables';
import ChatUsers from '../components/ChatUsers';

export default async function VisitorsPage() {
  async function getCurrentMessages() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    const data = await response.json();

    return data.messages;
  }

  const currentMessages = await getCurrentMessages();

  const countedUsers = countUsers(currentMessages);

  return (
    <section className="text-primaryPink h-full w-full flex justify-center sm:max-w-2xl relative">
      <div className="text-primaryPink h-full w-full flex flex-col justify-center sm:max-w-2xl sm:border-b-8 sm:border-x sm:rounded-b-2xl sm:border-primaryPink items-center">
        {countedUsers.length > 1 ? (
          <h3>Most chatty browsers of the last 5 messages:</h3>
        ) : (
          <h3>The most chatty browser of the last 5 messages:</h3>
        )}
        <ChatUsers agents={countedUsers} />
      </div>
    </section>
  );
}
