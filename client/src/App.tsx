import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LinksPage from './pages/LinksPage';
import ImageConvertPage from './pages/ImageConvertPage';
import PdfToolsPage from './pages/PdfToolsPage';
import NotFoundPage from './pages/NotFoundPage';

// Google Client ID
const GOOGLE_CLIENT_ID = "207600491295-lgusa9d9sslmbpu8nf51fq0spfs8q475.apps.googleusercontent.com";


function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Short alias for URL Masking */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tools/url-mask" element={<DashboardPage />} />
        
        {/* Media Tools */}
        <Route path="/tools/image-convert" element={<ImageConvertPage />} />
        <Route path="/tools/pdf-tools" element={<PdfToolsPage />} />
        
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
    </GoogleOAuthProvider>
  );
}


export default App;