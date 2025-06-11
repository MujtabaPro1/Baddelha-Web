import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Confirmation from './pages/Confirmation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Buy from './pages/Buy';

function App() {
  useEffect(() => {
    document.title = 'DriveMarket - Premium Car Marketplace';
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
  ]);

  return (
    <div className="min-h-screen bg-white">
    <Navbar />
     <main>
    <RouterProvider router={router} />
    </main>
    <Footer />
    </div>
  );
}

export default App;