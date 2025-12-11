import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ToastWrapper from '@/components/ToastWrapper/ToastWrapper';

import ReduxProvider from '@/store/ReduxProvider';

import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'skypro-fitness',
  description: 'skypro-fitness-app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${roboto.variable}`}>
          {children}

          <ToastWrapper />
        </body>
      </html>
    </ReduxProvider>
  );
}
