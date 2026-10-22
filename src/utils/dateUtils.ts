export function formatDateIndian(dateStr?: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

export function formatDateForDisplay(dateStr?: string): string {
  if (!dateStr) return '';
  return formatDateIndian(dateStr);
}

export function parseIndianDate(dateStr?: string): any {
  if (!dateStr) {
    const def = '1990-01-01';
    return Object.assign(def, { day: 1, month: 1, year: 1990 });
  }
  let day = 1, month = 1, year = 1990;
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    year = parseInt(parts[0], 10) || 1990;
    month = parseInt(parts[1], 10) || 1;
    day = parseInt(parts[2], 10) || 1;
  } else if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    day = parseInt(parts[0], 10) || 1;
    month = parseInt(parts[1], 10) || 1;
    year = parseInt(parts[2], 10) || 1990;
  }
  const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return Object.assign(iso, { day, month, year });
}
