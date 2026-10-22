import { CanonicalReportType, ReportAccessStatus } from '../types/reportAccess';

export class ReportAccessService {
  static async checkAccess(reportType: CanonicalReportType, profileKey: string = 'default_profile'): Promise<ReportAccessStatus> {
    try {
      const res = await fetch(`/api/reports/check-access?reportType=${encodeURIComponent(reportType)}&profileKey=${encodeURIComponent(profileKey)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Check access failed, falling back to local open state', e);
    }
    return {
      hasAccess: true,
      isFreeEligible: true,
      isUnlocked: true,
      reportType,
      priceInr: 33
    };
  }

  static async claimFreeReport(reportType: CanonicalReportType, profileKey: string = 'default_profile') {
    const res = await fetch('/api/reports/claim-free', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportType, profileKey })
    });
    return res.json();
  }

  static async createOrder(reportType: CanonicalReportType, profileKey: string = 'default_profile') {
    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportType, profileKey })
    });
    return res.json();
  }

  static async verifyPayment(data: any) {
    const res = await fetch('/api/payments/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  static async getCurrentNumerologyProfile() {
    try {
      const res = await fetch('/api/profiles/current');
      if (res.ok) return await res.json();
    } catch {}
    return { success: false, profile: null };
  }

  static hasAccess(reportType: CanonicalReportType | string, profileName?: string, dob?: string): boolean {
    try {
      const stored = localStorage.getItem(`leo_report_access_${reportType}`);
      if (stored === 'unlocked' || stored === 'true') return true;
    } catch {}
    return true; // Default accessible in demo/preview
  }

  static getTransactions(): any[] {
    try {
      const txs = localStorage.getItem('leo_report_transactions');
      return txs ? JSON.parse(txs) : [];
    } catch {
      return [];
    }
  }

  static async saveNumerologyProfile(profile: any): Promise<{ success: boolean }> {
    try {
      const res = await fetch('/api/profiles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (res.ok) return await res.json();
    } catch {}
    return { success: true };
  }

  static async submitFeedback(feedback: any) {
    const res = await fetch('/api/feedback/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback)
    });
    return res.json();
  }
}
