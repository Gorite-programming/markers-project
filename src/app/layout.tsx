import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'markers',
  description: 'A collection of useful tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
