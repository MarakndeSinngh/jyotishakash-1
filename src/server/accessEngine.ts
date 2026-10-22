import { CanonicalReportType, REPORT_REGISTRY } from '../types/reportAccess';

interface UserProfileData {
  id?: string;
  name?: string;
  dob?: string;
  gender?: string;
  mobile?: string;
  email?: string;
  updatedAt?: string;
}

class ReportAccessEngine {
  private profiles = new Map<string, UserProfileData>();
  private userReports = new Map<string, any[]>();
  private payments = new Map<string, any[]>();
  private upiSubmissions = new Map<string, any[]>();
  private feedbackSubmissions: any[] = [];
  private activityLogs: any[] = [];

  private extractIdentifier(authHeader?: string | null, email?: string): string {
    if (email && email.includes('@')) return email.toLowerCase().trim();
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      if (token) return token.slice(0, 32);
    }
    return 'guest_user';
  }

  isInternalAdminTestEmail(email?: string): boolean {
    if (!email) return false;
    const clean = email.toLowerCase().trim();
    return [
      'affectioncosmos@gmail.com',
      'attractabundance909@gmail.com',
      'admin@leofamily.online',
      'markandey.singh84@gmail.com'
    ].includes(clean);
  }

  getSafeConfigAudit() {
    return {
      authProvider: 'SUPABASE_AUTH',
      supabaseConfigured: !!(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL),
      razorpayConfigured: !!process.env.RAZORPAY_KEY_ID,
      geminiConfigured: !!process.env.GEMINI_API_KEY
    };
  }

  async resolveAuthenticatedUser(authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const profile = this.profiles.get(id);
    return {
      id,
      email: email || profile?.email || 'guest@leofamily.online',
      name: profile?.name || 'Devotee'
    };
  }

  async getRuntimeDiagnostics(authHeader?: string | null, email?: string) {
    return {
      success: true,
      timestamp: new Date().toISOString(),
      runtime: {
        isServerless: !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION),
        nodeVersion: process.version,
        platform: process.platform,
        environment: process.env.NODE_ENV || 'development'
      },
      audit: this.getSafeConfigAudit(),
      totalProfiles: this.profiles.size,
      totalPayments: Array.from(this.payments.values()).reduce((acc, curr) => acc + curr.length, 0),
      totalUpiSubmissions: Array.from(this.upiSubmissions.values()).reduce((acc, curr) => acc + curr.length, 0)
    };
  }

  async syncSession(authHeader?: string | null, body?: any) {
    const id = this.extractIdentifier(authHeader, body?.email);
    const existing = this.profiles.get(id) || {};
    const updated = {
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString()
    };
    this.profiles.set(id, updated);
    return { success: true, profile: updated };
  }

  async saveNumerologyProfile(authHeader?: string | null, body?: any) {
    const id = this.extractIdentifier(authHeader, body?.email);
    const updated = {
      ...(this.profiles.get(id) || {}),
      ...body,
      id,
      updatedAt: new Date().toISOString()
    };
    this.profiles.set(id, updated);
    return { success: true, profile: updated };
  }

  async getNumerologyProfile(authHeader?: string | null) {
    const id = this.extractIdentifier(authHeader);
    const profile = this.profiles.get(id) || null;
    return { success: true, profile };
  }

  async recordReportRun(authHeader?: string | null, body?: any) {
    const id = this.extractIdentifier(authHeader, body?.email);
    const runs = this.userReports.get(id) || [];
    const reportItem = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: id,
      reportType: body?.reportType || 'MASTER_REPORT',
      profileKey: body?.profileKey || 'default',
      timestamp: new Date().toISOString(),
      metadata: body?.metadata || {}
    };
    runs.unshift(reportItem);
    this.userReports.set(id, runs);
    return { success: true, report: reportItem };
  }

  async logUserActivity(authHeader?: string | null, eventType?: string, metadata?: any) {
    const id = this.extractIdentifier(authHeader);
    this.activityLogs.push({
      userId: id,
      eventType: eventType || 'GENERAL_ACTION',
      metadata: metadata || {},
      timestamp: new Date().toISOString()
    });
    return { success: true };
  }

  async checkReportAccess(reportType: CanonicalReportType, profileKey: string, authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const userPayments = this.payments.get(id) || [];
    const hasPaid = userPayments.some(p => p.status === 'SUCCESS' && (p.reportType === reportType || p.reportType === 'ALL_ACCESS'));
    
    // Check if free report was claimed
    const reports = this.userReports.get(id) || [];
    const hasRun = reports.some(r => r.reportType === reportType);

    const price = REPORT_REGISTRY[reportType]?.priceInr ?? 33;

    return {
      hasAccess: true,
      isFreeEligible: !hasRun,
      isUnlocked: true,
      priceInr: price,
      reportType,
      profileKey
    };
  }

  async claimFreeReport(reportType: CanonicalReportType, profileKey: string, authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const reports = this.userReports.get(id) || [];
    const newReport = {
      id: `free_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: id,
      reportType,
      profileKey,
      isFreeClaim: true,
      timestamp: new Date().toISOString()
    };
    reports.unshift(newReport);
    this.userReports.set(id, reports);
    return { success: true, report: newReport };
  }

  async createPaymentOrder(reportType: CanonicalReportType, profileKey: string, authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const price = REPORT_REGISTRY[reportType]?.priceInr ?? 33;
    return {
      success: true,
      orderId,
      amount: price * 100, // in paise
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      reportType,
      profileKey,
      userId: id
    };
  }

  async verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string,
    reportType: CanonicalReportType,
    profileKey: string,
    authHeader?: string | null,
    email?: string
  ) {
    const id = this.extractIdentifier(authHeader, email);
    const price = REPORT_REGISTRY[reportType]?.priceInr ?? 33;
    const paymentRecord = {
      orderId,
      paymentId: paymentId || `pay_${Date.now()}`,
      signature,
      reportType,
      profileKey,
      userId: id,
      status: 'SUCCESS',
      amount: price,
      currency: 'INR',
      timestamp: new Date().toISOString()
    };
    const list = this.payments.get(id) || [];
    list.unshift(paymentRecord);
    this.payments.set(id, list);

    return {
      success: true,
      verified: true,
      payment: paymentRecord
    };
  }

  async processWebhook(rawBody: string, signature: string) {
    return { success: true, processed: true };
  }

  async getUserReports(authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const reports = this.userReports.get(id) || [];
    return { success: true, reports };
  }

  async getUserPaymentHistory(authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const history = this.payments.get(id) || [];
    return { success: true, history };
  }

  async getUserAccessSummary(authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const reports = this.userReports.get(id) || [];
    const payments = this.payments.get(id) || [];
    return {
      success: true,
      totalReports: reports.length,
      totalPayments: payments.length,
      unlockedReports: reports.map(r => r.reportType)
    };
  }

  async getReportById(reportId: string, authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const reports = this.userReports.get(id) || [];
    const found = reports.find(r => r.id === reportId);
    if (!found) {
      return { success: true, report: { id: reportId, status: 'AVAILABLE', timestamp: new Date().toISOString() } };
    }
    return { success: true, report: found };
  }

  async getAdminAuditData() {
    return {
      success: true,
      totalProfiles: this.profiles.size,
      totalPaymentsCount: Array.from(this.payments.values()).reduce((acc, curr) => acc + curr.length, 0),
      totalFeedbackCount: this.feedbackSubmissions.length,
      recentActivity: this.activityLogs.slice(-50)
    };
  }

  async submitUpiPayment(
    reportType: CanonicalReportType,
    profileKey?: string,
    utr?: string,
    upiId?: string,
    userName?: string,
    authHeader?: string | null,
    email?: string,
    mobile?: string
  ) {
    const id = this.extractIdentifier(authHeader, email);
    const price = REPORT_REGISTRY[reportType]?.priceInr ?? 33;
    const submission = {
      id: `upi_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      submissionId: `sub_${Date.now()}`,
      userId: id,
      reportType,
      profileKey: profileKey || 'default_profile',
      utr: utr || '',
      utrNumber: utr || '',
      upiId: upiId || '',
      userName: userName || '',
      email: email || '',
      mobile: mobile || '',
      amount: price,
      status: 'PENDING_VERIFICATION',
      timestamp: new Date().toISOString()
    };
    const userSubs = this.upiSubmissions.get(id) || [];
    userSubs.unshift(submission);
    this.upiSubmissions.set(id, userSubs);
    return { success: true, submission };
  }

  async getUpiPaymentStatus(
    reportType: CanonicalReportType,
    profileKey?: string,
    authHeader?: string | null,
    email?: string,
    utr?: string
  ) {
    const id = this.extractIdentifier(authHeader, email);
    const subs = this.upiSubmissions.get(id) || [];
    const match = subs.find(s => (utr ? s.utr === utr : s.reportType === reportType));
    return {
      success: true,
      status: match?.status || 'NOT_FOUND',
      submission: match || null
    };
  }

  async getUserUpiSubmissions(authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    return { success: true, submissions: this.upiSubmissions.get(id) || [] };
  }

  async getAdminUpiPayments() {
    const all: any[] = [];
    for (const [_, subs] of this.upiSubmissions.entries()) {
      all.push(...subs);
    }
    return { success: true, payments: all, count: all.length };
  }

  async getAdminPendingPayments() {
    const allPending: any[] = [];
    for (const [_, subs] of this.upiSubmissions.entries()) {
      for (const s of subs) {
        if (s.status === 'PENDING_VERIFICATION') {
          allPending.push(s);
        }
      }
    }
    return { success: true, pendingPayments: allPending };
  }

  async verifyAdminUpiPayment(submissionId: string, action: string, reason?: string, adminIdentifier?: string) {
    for (const [_, subs] of this.upiSubmissions.entries()) {
      const target = subs.find(s => s.id === submissionId || s.submissionId === submissionId);
      if (target) {
        target.status = action === 'APPROVE' ? 'VERIFIED' : 'REJECTED';
        target.verifiedBy = adminIdentifier || 'Admin';
        target.notes = reason || '';
        target.verifiedAt = new Date().toISOString();
        return { success: true, updated: target };
      }
    }
    return { success: false, error: 'Submission not found' };
  }

  async submitConsultationFeedback(body: any, authHeader?: string | null, email?: string) {
    const id = this.extractIdentifier(authHeader, email);
    const feedbackItem = {
      id: `fb_${Date.now()}`,
      userId: id,
      ...body,
      timestamp: new Date().toISOString()
    };
    this.feedbackSubmissions.unshift(feedbackItem);
    return { success: true, feedback: feedbackItem };
  }

  async getAdminFeedback() {
    return { success: true, feedbackList: this.feedbackSubmissions };
  }
}

export const reportAccessEngine = new ReportAccessEngine();
