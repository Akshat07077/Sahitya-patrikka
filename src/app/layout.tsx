import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sahitya Sanskriti Patrika - Literary & Cultural Journal',
  description: 'A premier platform for literary and cultural research, scholarly articles, and academic discourse in Hindi and Sanskrit literature.',
  keywords: 'literary journal, cultural studies, Hindi literature, Sanskrit, academic research, scholarly articles',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
