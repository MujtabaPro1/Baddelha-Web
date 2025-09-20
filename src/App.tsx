import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Confirmation from './pages/Confirmation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/Login';
import Buy from './pages/Buy';
import CarDetail from './pages/CarDetails';
import Purchase from './pages/Purchase';
import TradeIn from './pages/TradeIn';
import Auction from './pages/Auction';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Appointments from './pages/Appointments';
import { Toaster } from './components/ui/toaster';

function App() {
  useEffect(() => {
    document.title = 'BADDELHA - Premium Car Marketplace';
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/step2',
      element: <Step2 />,
    },
    {
      path: '/step3',
      element: <Step3 />,
    },
    {
      path: '/confirmation',
      element: <Confirmation />,
    },
    {
      path: '/buy',
      element: <Buy />,
    },
    {
      path: '/car/:id',
      element: <CarDetail />,
    },
    {
      path: '/purchase/:id',
      element: <Purchase />,
    },
    {
      path: '/trade-in',
      element: <TradeIn />,
    },
    {
      path: '/auction',
      element: <Auction />,
    },
    {
      path: '/terms',
      element: <Terms />,
    },
    {
      path: '/privacy',
      element: <Privacy />,
    },
    {
      path: '/about-us',
      element: <AboutUs />,
    },
    {
      path: '/contact-us',
      element: <ContactUs />,
    },
    {
      path: '/appointments',
      element: <Appointments />,
    },
  ]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <RouterProvider router={router} />
        </main>
        <Footer />
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;