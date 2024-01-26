import Chat from './components/Chat';
import NavigationButton from './components/NavigationButton';

export default function Home() {
  return (
    <section className="text-primaryPink h-full w-full flex justify-center sm:max-w-2xl relative">
      <section className="hidden md:block absolute left-[-80px]">
        <NavigationButton />
      </section>
      <section className="text-primaryPink h-full w-full flex justify-center sm:max-w-2xl sm:border-b-8 sm:border-x sm:rounded-b-2xl sm:border-primaryPink">
        <Chat />
      </section>
    </section>
  );
}
