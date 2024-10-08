import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='grid grid-rows-[auto_1fr_auto] min-h-[100dvh]'>
          <header className='shadow-sm border-b'>
            <Navbar />
          </header>
          <main className='max-w-5xl container'>{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
