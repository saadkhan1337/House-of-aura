import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBanner } from './components/TrustBanner';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { ProductCatalog } from './components/ProductCatalog';
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

        {/* Hero Banner with UAE direct import aesthetics */}
        <HeroSection />

        {/* 4 Security & Trust Badges Banner (SSL, Dubai Import, Open Parcel, Verified COD) */}
        <TrustBanner />

        {/* Flagship Featured Products Showcase (Apple Hair Color, Cosmo Shampoo, Bakhoor Hamidi) */}
        <FeaturedShowcase />

        {/* Extensible Dynamic Catalog with Instant Search & Category Filters */}
        <ProductCatalog />

        {/* Footer */}
        <Footer />

        {/* Sticky Mobile Bottom Navigation */}
        <MobileBottomNav />

        {/* Modals & Overlays */}
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
