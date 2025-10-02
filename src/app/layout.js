import './globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';

export const metadata={ title: 'FakeStore Assignment', description: 'App Router — no Tailwind' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <NavBar />
          <main className="main container">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

