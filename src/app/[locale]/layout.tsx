import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import Header from '@/components/Header/Header';
import Providers from '../Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fisioterapia Dagà',
  description: 'Pide tu cita en Fisioterapia Dagà',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  let messages;

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={'es'}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <Providers>{children}</Providers>
          <footer className="w-full bg-darkBlue">
            <p>Footer</p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
