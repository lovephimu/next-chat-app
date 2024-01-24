import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import ChatLogo from './components/ChatLogo';

const inter = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat Schibidi',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-primaryBlue ${inter.className} dynamic-full-height flex flex-col w-full items-center sm:p-10`}
      >
        <main className="h-[100dvh] max-h-[100dvh]">
          <section className="flex h-[20dvh] justify-center w-full sm:justify-start sm:max-w-2xl sm:border-primaryPink sm:border-t sm:border-x sm:rounded-t-2xl">
            <ChatLogo />
          </section>
          <section>{children}</section>
        </main>
      </body>
    </html>
  );
}
