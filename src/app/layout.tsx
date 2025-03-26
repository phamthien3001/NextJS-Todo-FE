import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MuiProvider from './providers/MuiProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}