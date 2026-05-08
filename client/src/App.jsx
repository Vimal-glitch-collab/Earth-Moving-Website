import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#f2c200] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper to conditionally show Nav/Footer
const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      {!isAdminPage && <Navbar />}
      <main className="relative z-10">{children}</main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <WhatsAppButton />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#0F0F0F',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '0px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          },
          success: {
            iconTheme: {
              primary: '#F4B400',
              secondary: '#000',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
