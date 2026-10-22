export function formatLocalizedDate(dateStr?: string | Date, locale: string = 'en'): string {
  if (!dateStr) return '';
  try {
    const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch {}
  return String(dateStr);
}

export function getProfileIsolationKey(profile?: { name?: string; dob?: string; mobile?: string; gender?: string }): string {
  if (!profile) return 'default_profile';
  const name = (profile.name || 'seeker').toLowerCase().replace(/[^a-z0-9]/g, '');
  const dob = (profile.dob || '19900101').replace(/[^0-9]/g, '');
  const mobile = (profile.mobile || '').replace(/[^0-9]/g, '').slice(-4);
  return `${name}_${dob}${mobile ? `_${mobile}` : ''}`;
}
