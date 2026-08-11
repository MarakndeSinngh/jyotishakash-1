import * as XLSX from 'xlsx';
import { Testimonial } from '../types/cms';

export interface ParsedTestimonialRow {
  rowNumber: number;
  testimonialCode: string;
  name: string;
  role?: string;
  course?: string;
  feedback: string;
  rating: number;
  image?: string;
  published: boolean;
  displayOrder: number;
  testimonialDate?: string;
  errors: string[];
  action?: 'INSERT' | 'UPDATE';
  status: 'Valid' | 'Error';
}

export interface ImportValidationResult {
  rows: ParsedTestimonialRow[];
  totalRows: number;
  validRowsCount: number;
  errorRowsCount: number;
  hasErrors: boolean;
}

export function normalizeBoolean(val: any): { value: boolean; error?: string } {
  if (val === undefined || val === null || val === '') {
    return { value: false };
  }
  if (typeof val === 'boolean') {
    return { value: val };
  }
  if (typeof val === 'number') {
    if (val === 1) return { value: true };
    if (val === 0) return { value: false };
    return { value: false, error: 'Invalid boolean number value' };
  }
  const str = String(val).trim().toLowerCase();
  if (['true', 'yes', 'published', '1'].includes(str)) {
    return { value: true };
  }
  if (['false', 'no', 'draft', '0', 'unpub', 'unpublished'].includes(str)) {
    return { value: false };
  }
  return { value: false, error: `Invalid published value "${val}". Expected True/False, Yes/No, Published/Draft.` };
}

export function normalizeRating(val: any): { value: number; error?: string } {
  if (val === undefined || val === null || val === '') {
    return { value: 5, error: 'Rating is required.' };
  }
  const num = Number(val);
  if (isNaN(num) || !Number.isInteger(num)) {
    return { value: 5, error: `Invalid rating "${val}". Must be an integer between 1 and 5.` };
  }
  if (num < 1 || num > 5) {
    return { value: num, error: `Rating "${num}" is out of range. Must be between 1 and 5.` };
  }
  return { value: num };
}

export function normalizeDisplayOrder(val: any): { value: number; error?: string } {
  if (val === undefined || val === null || val === '') {
    return { value: 0 };
  }
  const num = Number(val);
  if (isNaN(num) || !Number.isInteger(num)) {
    return { value: 0, error: `Invalid display_order "${val}". Must be an integer.` };
  }
  return { value: num };
}

export function normalizeDate(val: any): { value?: string; error?: string } {
  if (val === undefined || val === null || val === '') {
    return { value: undefined };
  }
  if (val instanceof Date) {
    if (!isNaN(val.getTime())) {
      return { value: val.toISOString().substring(0, 10) };
    }
    return { value: undefined, error: 'Invalid date object' };
  }
  if (typeof val === 'number') {
    const dateObj = XLSX.SSF.parse_date_code(val);
    if (dateObj) {
      const y = dateObj.y;
      const m = String(dateObj.m).padStart(2, '0');
      const d = String(dateObj.d).padStart(2, '0');
      return { value: `${y}-${m}-${d}` };
    }
  }
  const str = String(val).trim();
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (regex.test(str)) {
    return { value: str };
  }
  const parsed = Date.parse(str);
  if (!isNaN(parsed)) {
    const dObj = new Date(parsed);
    return { value: dObj.toISOString().substring(0, 10) };
  }
  return { value: undefined, error: `Invalid date format "${str}". Use YYYY-MM-DD.` };
}

export async function parseTestimonialFile(file: File, existingCodes: string[]): Promise<ImportValidationResult> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  
  const sheetName = workbook.SheetNames.includes('Testimonials') ? 'Testimonials' : workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  
  const parsedRows: ParsedTestimonialRow[] = [];
  const codeCounts = new Map<string, number[]>();

  rawRows.forEach((row, index) => {
    const rowNumber = index + 2;
    const code = String(row.testimonial_code || row.testimonialCode || row.Code || row.code || '').trim();
    if (code) {
      const list = codeCounts.get(code) || [];
      list.push(rowNumber);
      codeCounts.set(code, list);
    }
  });

  rawRows.forEach((row, index) => {
    const rowNumber = index + 2;
    const errors: string[] = [];

    const testimonialCode = String(row.testimonial_code || row.testimonialCode || row.Code || row.code || '').trim();
    const name = String(row.name || row.Name || '').trim();
    const role = String(row.role || row.Role || '').trim();
    const course = String(row.course || row.Course || '').trim();
    const feedback = String(row.feedback || row.Feedback || row.content || '').trim();
    const image = String(row.image || row.Image || row.imageUrl || '').trim();
    const rawPublished = row.published ?? row.Published ?? row.status;
    const rawDisplayOrder = row.display_order ?? row.displayOrder ?? row.order;
    const rawDate = row.testimonial_date ?? row.testimonialDate ?? row.date;

    if (!testimonialCode) {
      errors.push('testimonial_code is required.');
    }
    if (!name) {
      errors.push('name is required.');
    }
    if (!feedback) {
      errors.push('feedback is required.');
    }

    const ratingRes = normalizeRating(row.rating ?? row.Rating);
    if (ratingRes.error) {
      errors.push(ratingRes.error);
    }

    const pubRes = normalizeBoolean(rawPublished);
    if (pubRes.error) {
      errors.push(pubRes.error);
    }

    const orderRes = normalizeDisplayOrder(rawDisplayOrder);
    if (orderRes.error) {
      errors.push(orderRes.error);
    }

    const dateRes = normalizeDate(rawDate);
    if (dateRes.error) {
      errors.push(dateRes.error);
    }

    if (testimonialCode && codeCounts.get(testimonialCode)!.length > 1) {
      errors.push(`Duplicate testimonial_code "${testimonialCode}" found in file (rows: ${codeCounts.get(testimonialCode)!.join(', ')}).`);
    }

    const action: 'INSERT' | 'UPDATE' = existingCodes.includes(testimonialCode) ? 'UPDATE' : 'INSERT';
    const status: 'Valid' | 'Error' = errors.length > 0 ? 'Error' : 'Valid';

    parsedRows.push({
      rowNumber,
      testimonialCode,
      name,
      role: role || undefined,
      course: course || undefined,
      feedback,
      rating: ratingRes.value,
      image: image || undefined,
      published: pubRes.value,
      displayOrder: orderRes.value,
      testimonialDate: dateRes.value,
      errors,
      action,
      status
    });
  });

  const validRowsCount = parsedRows.filter(r => r.status === 'Valid').length;
  const errorRowsCount = parsedRows.filter(r => r.status === 'Error').length;

  return {
    rows: parsedRows,
    totalRows: parsedRows.length,
    validRowsCount,
    errorRowsCount,
    hasErrors: errorRowsCount > 0
  };
}

export function generateTestimonialTemplate(): void {
  const wb = XLSX.utils.book_new();

  const sampleData = [
    {
      testimonial_code: 'TEST-001',
      name: 'Dr. Rameshwar Varma',
      role: 'Enterprise CEO',
      course: 'Vedic Business Numerology',
      feedback: 'The insights from the masterclass transformed how we approach strategic timing in business.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      published: 'True',
      display_order: 1,
      testimonial_date: '2026-06-15'
    }
  ];

  const wsTestimonials = XLSX.utils.json_to_sheet(sampleData);
  XLSX.utils.book_append_sheet(wb, wsTestimonials, 'Testimonials');

  const instructionsData = [
    { Field: 'testimonial_code', Required: 'YES', Type: 'String (Unique)', Description: 'Unique identifier code (e.g. TEST-001). Existing codes will be updated; new codes will be created.' },
    { Field: 'name', Required: 'YES', Type: 'String', Description: 'Full name of the student or client.' },
    { Field: 'role', Required: 'NO', Type: 'String', Description: 'Professional title or role (e.g. Managing Director).' },
    { Field: 'course', Required: 'NO', Type: 'String', Description: 'Associated course or academy program name.' },
    { Field: 'feedback', Required: 'YES', Type: 'String (Text)', Description: 'The testimonial quote or review text.' },
    { Field: 'rating', Required: 'YES', Type: 'Integer (1-5)', Description: 'Star rating from 1 to 5.' },
    { Field: 'image', Required: 'NO', Type: 'URL String', Description: 'Public avatar/image URL.' },
    { Field: 'published', Required: 'NO', Type: 'Boolean / Text', Description: 'Accepts True/False, Yes/No, Published/Draft. Blank defaults to False.' },
    { Field: 'display_order', Required: 'NO', Type: 'Integer', Description: 'Numeric display order sequence (lower numbers appear first). Blank defaults to 0.' },
    { Field: 'testimonial_date', Required: 'NO', Type: 'Date (YYYY-MM-DD)', Description: 'Date when testimonial was given.' }
  ];

  const wsInstructions = XLSX.utils.json_to_sheet(instructionsData);
  XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');

  XLSX.writeFile(wb, 'LEO_Family_Testimonials_Template.xlsx');
}
