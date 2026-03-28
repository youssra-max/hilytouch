import '../index.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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
          <Footer />
        </div>
      </body>
    </html>
  );
}
