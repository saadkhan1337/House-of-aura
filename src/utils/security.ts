/**
 * Security & Data Sanitization Utilities
 * Prevents XSS, cleans malformed inputs, validates forms & generates tracking codes
 */

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip angle brackets to prevent HTML/script injection
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

export const isValidEmail = validateEmail;

export function validatePhone(phone: string): { isValid: boolean; formatted: string } {
  if (!phone) return { isValid: false, formatted: '' };
  // Clean non-digits except leading +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Accept PK formats: 03001234567, +923001234567, 923001234567, 03xx xxxxxxx
  const digitsOnly = cleaned.replace(/\D/g, '');
  if (digitsOnly.length === 11 && digitsOnly.startsWith('03')) {
    return { isValid: true, formatted: `+92 ${digitsOnly.substring(1, 4)} ${digitsOnly.substring(4)}` };
  } else if (digitsOnly.length === 12 && digitsOnly.startsWith('923')) {
    return { isValid: true, formatted: `+92 ${digitsOnly.substring(2, 5)} ${digitsOnly.substring(5)}` };
  } else if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
    return { isValid: true, formatted: cleaned.startsWith('+') ? cleaned : `+${cleaned}` };
  }

  return { isValid: false, formatted: cleaned };
}

export function isValidPhone(phone: string): boolean {
  return validatePhone(phone).isValid;
}

export function sanitizePhoneForWhatsApp(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.startsWith('03')) {
    return `92${digitsOnly.substring(1)}`;
  }
  if (digitsOnly.startsWith('92')) {
    return digitsOnly;
  }
  return digitsOnly;
}

export function generateOrderTrackingCode(): string {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
  return `HOA-PK-${randomDigits}${randomChar}`;
}

export const generateOrderId = generateOrderTrackingCode;

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export interface CouponResult {
  valid: boolean;
  code: string;
  discountPercentage: number;
  discountAmount: number;
  message: string;
}

export function applyCoupon(code: string, subtotal: number): CouponResult {
  const cleaned = code.trim().toUpperCase();
  if (cleaned === 'AURA10') {
    const discount = Math.round(subtotal * 0.1);
    return { valid: true, code: 'AURA10', discountPercentage: 10, discountAmount: discount, message: '10% Aura Welcome Discount Applied!' };
  }
  if (cleaned === 'DUBAI15') {
    const discount = Math.round(subtotal * 0.15);
    return { valid: true, code: 'DUBAI15', discountPercentage: 15, discountAmount: discount, message: '15% Dubai Import Celebration Discount Applied!' };
  }
  if (cleaned === 'SALONVIP') {
    const discount = Math.round(subtotal * 0.2);
    return { valid: true, code: 'SALONVIP', discountPercentage: 20, discountAmount: discount, message: '20% Professional Studio Discount Applied!' };
  }
  return { valid: false, code: '', discountPercentage: 0, discountAmount: 0, message: 'Invalid or expired promo code.' };
}
