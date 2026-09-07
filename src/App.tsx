import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CleanProductShowcase } from './components/CleanProductShowcase';
import { CustomerReviews } from './components/CustomerReviews';
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
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#0c0d12] text-zinc-100 font-sans selection:bg-[#c5a880] selection:text-[#0c0d12]">
        {/* Main Header & Announcement */}
        <Navbar />

        {/* Clean Luxury Hero Section */}
        <HeroSection />

        {/* Core Product Showcase: The 4 Dubai Essentials */}
        <CleanProductShowcase />

        {/* Customer Reviews & Experiences across Pakistan */}
        <CustomerReviews />

        {/* Security & Trust Badges Banner (SSL, Dubai Genuine, Open Parcel, Verified COD) - MOVED TO BOTTOM */}
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
