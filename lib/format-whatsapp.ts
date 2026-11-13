// Shows a WhatsApp number stored as bare digits with its country code (the
// CMS keeps it that way because wa.me needs it so) the way people write it.
// Mexican numbers, 52 plus ten digits, are grouped as `+52 228 826 5906`;
// anything else just gets its plus sign, ungrouped, rather than a guess.
export function formatWhatsapp(digits: string): string {
  const clean = digits.replace(/\D/g, "");
  const mexican = /^52(\d{3})(\d{3})(\d{4})$/.exec(clean);
  if (mexican) return `+52 ${mexican[1]} ${mexican[2]} ${mexican[3]}`;
  return `+${clean}`;
}
