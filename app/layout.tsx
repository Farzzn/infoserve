// infoserve/app/[locale]/layout.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

// Updated metadata for the site
export const metadata: Metadata = {
  title: 'ഇൻഫോസെർവ് CSC സെന്റർ കാരത്തോട്',
  description: 'കാരത്തോടിൽ സർക്കാർ സേവനങ്ങൾ, ബിൽ പേയ്‌മെന്റുകൾ, യാത്രാ ബുക്കിംഗ് എന്നിവയും അതിലേറെയും നൽകുന്നു.',
  keywords: 'CSC, കാരത്തോട്, സർക്കാർ സേവനങ്ങൾ, ബിൽ പേയ്മെന്റ്, ആധാർ, പാൻ കാർഡ്',
  authors: [{ name: 'InfoServe CSC Karathode' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ml">
      <body>
        <header className="site-header">
          <div className="container">
            <h1 className="logo">InfoServe CSC</h1>
            <nav className="main-nav">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/news">News Feeds</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>

        <footer className="site-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} InfoServe CSC All rights reserved </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
