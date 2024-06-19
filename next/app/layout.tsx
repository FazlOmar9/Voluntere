import type { Metadata } from 'next';
import Providers from './providers';
import NavBar from '@/components/Main/NavBar';
import Footer from '@/components/Main/Footer';

export const metadata: Metadata = {
  title: 'Voluntere',
  description: 'Voluntere is a platform for volunteering opportunities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
