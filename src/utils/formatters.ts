/**
 * Formats a number into Nigerian Naira currency representation (₦)
 */
export function formatNaira(amount: number): string {
  if (isNaN(amount)) return '₦0';
  return '₦' + Math.round(amount).toLocaleString('en-NG');
}

/**
 * Creates dynamic WhatsApp direct message link as required:
 * "Hi, I saw your [Product Name] on UniMarket for ₦[Price]. Is it still available?"
 */
export function generateWhatsAppUrl(phone: string, productTitle: string, price: number): string {
  // Clean phone number: remove +, spaces, dashes
  let cleaned = phone.replace(/[^0-9]/g, '');
  
  // If Nigerian local format starting with 0 (e.g. 0803...), convert to 234803...
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.slice(1);
  }
  
  const formattedPrice = formatNaira(price);
  const text = `Hi, I saw your ${productTitle} on UniMarket for ${formattedPrice}. Is it still available?`;
  
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}

/**
 * Masks a matriculation number for privacy (e.g. 190805041 -> 190805***)
 */
export function maskMatricNumber(matric: string): string {
  if (!matric) return 'Unverified';
  if (matric.length <= 6) return matric + '***';
  return matric.slice(0, 6) + '***';
}
