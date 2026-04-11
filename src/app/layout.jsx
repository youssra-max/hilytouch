import '../index.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BeautyBot from '../components/ui/BeautyBot';

export const metadata = {
  title: 'Hilytouch',
  description: 'Hilytouch Beauty Marketplace'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className="layout">
          <Header />
          <main className="main-content">
            {children}
          </main>
          <BeautyBot />
          <Footer />
        </div>
      </body>
    </html>
  );
}
