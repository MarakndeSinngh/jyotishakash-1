export type MembershipType = 'free' | 'pro' | 'vip' | 'lifetime';

export interface StudentCertificate {
  id: string;
  certificateNumber: string;
  courseId: string;
  courseTitle: string;
  academyId: string;
  academyName: string;
  instructorName: string;
  issueDate: string;
  verificationUrl?: string;
}

export interface CourseProgressDetail {
  courseId: string;
  academyId: string;
  progressPercentage: number; // 0 to 100
  totalLessons: number;
  completedLessonsCount: number;
  completedLessonIds: string[];
  lastAccessedAt: string;
  lastLessonTitle?: string;
  completedAt?: string;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  country: string;
  state: string;
  language: string;
  preferredAcademy: string;
  enrolledCourses: string[]; // Array of courseIds
  completedCourses: string[]; // Array of courseIds
  certificates: StudentCertificate[];
  progress: Record<string, CourseProgressDetail>;
  avatar: string;
  enrollmentDate: string;
  membershipType: MembershipType;
}

export interface RecentActivity {
  id: string;
  timestamp: string;
  type: 'course_enrolled' | 'lesson_completed' | 'course_completed' | 'certificate_earned' | 'quiz_passed';
  title: string;
  description: string;
  courseId?: string;
  academyId?: string;
}

export interface UpcomingLiveSession {
  id: string;
  title: string;
  academyId: string;
  academyName: string;
  instructorName: string;
  instructorAvatar?: string;
  scheduledAt: string;
  durationMinutes: number;
  meetingUrl?: string;
  isRegistered: boolean;
  topic: string;
}
