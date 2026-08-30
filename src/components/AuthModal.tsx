import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AccountType } from '../types';
import { sanitizeInput, isValidEmail, isValidPhone } from '../utils/security';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  Building2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    signup,
    googleLogin,
    setIsCheckoutOpen,
    cart
  } = useStore();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('retail');
  const [salonName, setSalonName] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await login(email, password, rememberMe);
      setIsAuthModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!isValidPhone(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter an 11-digit mobile number (e.g. 03001234567)';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (accountType === 'wholesale' && !salonName.trim()) {
      newErrors.salonName = 'Please enter your Salon or Studio name';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await signup({
        name: fullName,
        email,
        phone: mobileNumber,
        password,
        accountType,
        salonName: accountType === 'wholesale' ? salonName : undefined
      });
      setIsAuthModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrors({ email: 'Please enter a valid email to receive reset code' });
      return;
    }
    setErrors({});
    setResetEmailSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#15161f] border border-[#2d2f3d] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative my-auto"
      >
        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-5">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a880] font-bold">
            THE HOUSE OF AURA
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
            {forgotPasswordMode
              ? 'Reset Account Password'
              : authModalTab === 'login'
              ? 'Welcome to The House of Aura'
              : 'Create Luxury Account'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {forgotPasswordMode
              ? 'Enter your registered email to receive instant access link'
              : authModalTab === 'login'
              ? 'Access past orders, saved shipping profiles & salon discounts'
              : 'Unlock exclusive wholesale pricing, track shipments, and sync orders'}
          </p>
        </div>

        {/* 1-Click Google Login Button */}
        {!forgotPasswordMode && (
          <div className="mb-5">
            <button
              onClick={async () => {
                await googleLogin();
                setIsAuthModalOpen(false);
              }}
              className="w-full py-2.5 px-4 bg-[#1e202b] hover:bg-[#272938] border border-[#373949] hover:border-zinc-500 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"
                />
              </svg>
              <span>Continue with 1-Click Google</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2a2c3a]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-zinc-500">
                <span className="bg-[#15161f] px-3">or continue with email</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        {!forgotPasswordMode && (
          <div className="flex bg-[#101117] p-1 rounded-xl border border-[#272836] mb-5">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setErrors({});
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authModalTab === 'login'
                  ? 'bg-[#c5a880] text-[#0c0d10] shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('signup');
                setErrors({});
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authModalTab === 'signup'
                  ? 'bg-[#c5a880] text-[#0c0d10] shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Forgot Password Mode */}
        {forgotPasswordMode ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            {resetEmailSent ? (
              <div className="bg-[#12241b] border border-emerald-500/40 p-4 rounded-xl text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Reset Link Dispatched</h4>
                <p className="text-xs text-zinc-300 mt-1">
                  We sent instructions to <strong>{email}</strong>. Check your inbox or spam folder.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordMode(false);
                    setResetEmailSent(false);
                  }}
                  className="mt-3 text-xs text-[#c5a880] font-semibold underline"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Your Registered Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. fatima@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#101117] border border-[#2b2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-xs rounded-xl"
                >
                  Send Reset Password Link
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMode(false)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Back to Sign In
                  </button>
                </div>
              </>
            )}
          </form>
        ) : authModalTab === 'login' ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#101117] border border-[#2b2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordMode(true)}
                  className="text-[11px] text-[#c5a880] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2.5 bg-[#101117] border border-[#2b2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-900 text-[#c5a880] focus:ring-0"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-[#c5a880]/15"
            >
              {isSubmitting ? 'Verifying...' : 'Sign In to Account'}
            </button>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            {/* Account Type Toggle */}
            <div className="p-3 bg-[#101117] rounded-xl border border-[#262836]">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Select Account Type:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAccountType('retail')}
                  className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                    accountType === 'retail'
                      ? 'bg-[#262015] border-[#c5a880] text-amber-200 ring-1 ring-[#c5a880]'
                      : 'bg-[#161720] border-[#2c2d3a] text-zinc-400'
                  }`}
                >
                  <User className="w-3.5 h-3.5 mx-auto mb-1 text-[#c5a880]" />
                  <span>Retail Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('wholesale')}
                  className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                    accountType === 'wholesale'
                      ? 'bg-[#291f2d] border-purple-400 text-purple-200 ring-1 ring-purple-400'
                      : 'bg-[#161720] border-[#2c2d3a] text-zinc-400'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 mx-auto mb-1 text-purple-400" />
                  <span>Salon Owner / Bulk</span>
                </button>
              </div>
              {accountType === 'wholesale' && (
                <p className="text-[10px] text-purple-300 mt-2 bg-purple-950/50 p-2 rounded border border-purple-800/40">
                  ✨ Instant Wholesale Pricing unlocked automatically on all salon liters & kits!
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Fatima Khan"
                  className="w-full pl-9 pr-3 py-2 bg-[#101117] border border-[#2b2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
              )}
            </div>

            {accountType === 'wholesale' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Salon / Beauty Studio Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    placeholder="e.g. Aura Elite Studio Lahore"
                    className="w-full pl-9 pr-3 py-2 bg-[#101117] border border-[#2b2c3a] focus:border-purple-400 rounded-xl text-xs text-white outline-none"
                  />
                </div>
                {errors.salonName && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.salonName}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#101117] border border-[#2b2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Mobile Number (for WhatsApp Order Sync & SMS Tracking)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full pl-9 pr-3 py-2 bg-[#101117] border border-[#2b2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.mobileNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-9 py-2 bg-[#101117] border border-[#2b2c3a] focus:border-[#c5a880] rounded-xl text-xs text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#c5a880] hover:bg-[#d6ba92] text-[#0c0d10] font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-[#c5a880]/15"
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete VIP Registration'}
            </button>
          </form>
        )}

        {/* Guest Checkout Option */}
        <div className="mt-5 pt-4 border-t border-[#262836] text-center">
          <p className="text-xs text-zinc-400 mb-2">Want to place an order without signing up?</p>
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              if ((cart?.length || 0) > 0) {
                setIsCheckoutOpen(true);
              }
            }}
            className="text-xs font-semibold text-zinc-200 hover:text-[#c5a880] flex items-center justify-center gap-1.5 mx-auto py-1 px-3 rounded-lg hover:bg-zinc-800/60 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Proceed to 1-Click Guest Checkout</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
