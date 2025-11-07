import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'Millionaire Morning POV',
  description: 'Step into a cinematic POV of a sunrise routine at the top of the world.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
