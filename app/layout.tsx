import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import ChatLogo from './components/ChatLogo';
import NavigationButton from './components/NavigationButton';
import StatisticsLogo from './components/StatisticsLogo';

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
        <main className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-center items-center">
          <section className="flex h-[20dvh] justify-center w-full sm:justify-between sm:max-w-2xl sm:border-primaryPink sm:border-t sm:border-x sm:rounded-t-2xl wide-screen-height-logo">
            <ChatLogo />

            <div className="hidden sm:block">
              <NavigationButton
                route={'visitors'}
                iconComponent={StatisticsLogo}
              />
            </div>
          </section>

          <section className="w-full flex justify-center h-[80dvh] sm:h-[70dvh] wide-screen-height">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
