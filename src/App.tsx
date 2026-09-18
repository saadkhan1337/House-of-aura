import React, { useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { trackTrafficEvent } from './utils/telemetry';
import { Navbar } from './components/Navbar';
import { SplitScreenStudioShowcase } from './components/SplitScreenStudioShowcase';
import { TrustBanner } from './components/TrustBanner';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { EmailSimulationModal } from './components/EmailSimulationModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    trackTrafficEvent('PAGE_VIEW').catch(() => {});
  }, []);

  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#faf8f5] text-[#18181b] font-sans selection:bg-[#c5a880] selection:text-[#18181b]">
        {/* Main Header & Announcement */}
        <Navbar />

        {/* Dubai Flagship Studio Showcase: 4 Products Split-Screen Layout */}
        <SplitScreenStudioShowcase />

        {/* Security & Trust Badges Banner */}
        <TrustBanner />

        {/* Footer */}
        <Footer />

        {/* Sticky Mobile Bottom Navigation */}
        <MobileBottomNav />

        {/* Modals & Overlays for complete order flow */}
        <ProductModal />
        <CartDrawer />
        <AuthModal />
        <ProfileDrawer />
        <CheckoutModal />
        <OrderSuccessModal />
        <EmailSimulationModal />
        <WhatsAppModal />

        {/* Floating Toast Notification Stack */}
        <ToastContainer />
      </div>
    </StoreProvider>
  );
}
