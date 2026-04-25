import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LinksPage from './pages/LinksPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#111111',
            border: '1px solid #E9ECEF',
            borderRadius: '12px',
            fontSize: '14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          },
        }}
      />
    </>
  );
}

export default App;