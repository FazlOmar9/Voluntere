import type { Metadata } from 'next';
import Providers from './providers';
import NavBar from '@/components/main/NavBar';
import Footer from '@/components/main/Footer';

export const metadata: Metadata = {
  title: 'Voluntere',
  description: 'Voluntere is a platform for volunteering opportunities.',
  publisher: 'Voluntere Inc.',
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
