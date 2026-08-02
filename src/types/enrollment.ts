export type PurchaseStatus = 'enrolled' | 'pending' | 'expired' | 'completed' | 'free_access';
export type CompletionStatus = 'not_started' | 'in_progress' | 'completed';
export type CertificateStatus = 'none' | 'eligible' | 'issued';
export type AccessStatus = 'free' | 'premium' | 'enrolled' | 'coming_soon' | 'locked';

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  academyId: string;
  purchaseStatus: PurchaseStatus;
  enrollmentDate: string;
  expiryDate?: string; // Optional future expiry
  progress: number; // 0 to 100
  completionStatus: CompletionStatus;
  certificateStatus: CertificateStatus;
  lastAccessedAt: string;
  completedLessons?: string[];
}

export interface CourseAccessInfo {
  courseId: string;
  academyId: string;
  isEnrolled: boolean;
  isLocked: boolean;
  isFree: boolean;
  isPremium: boolean;
  isComingSoon: boolean;
  accessStatus: AccessStatus;
  enrollmentDetails?: Enrollment;
}
