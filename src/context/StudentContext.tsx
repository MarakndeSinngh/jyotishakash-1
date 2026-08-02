import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, StudentCertificate, RecentActivity, UpcomingLiveSession } from '../types/student';
import { Enrollment, CourseAccessInfo, AccessStatus } from '../types/enrollment';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_ENROLLMENTS,
  INITIAL_RECENT_ACTIVITIES,
  INITIAL_UPCOMING_LIVE_SESSIONS,
} from '../data/mockStudent';

interface StudentContextType {
  student: StudentProfile;
  enrollments: Enrollment[];
  certificates: StudentCertificate[];
  activities: RecentActivity[];
  upcomingSessions: UpcomingLiveSession[];
  
  // LMS Actions
  enrollInCourse: (courseId: string, academyId: string) => void;
  updateCourseProgress: (courseId: string, progressPercentage: number, lessonId?: string) => void;
  markCourseCompleted: (courseId: string) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  registerForLiveSession: (sessionId: string) => void;
  
  // LMS Queries & Helpers
  getCourseAccessInfo: (courseId: string, academyId: string, isPremium?: boolean) => CourseAccessInfo;
  getEnrollment: (courseId: string) => Enrollment | undefined;
  isEnrolledInCourse: (courseId: string) => boolean;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PROFILE = 'leo_lms_student_profile';
const LOCAL_STORAGE_KEY_ENROLLMENTS = 'leo_lms_student_enrollments';

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ENROLLMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ENROLLMENTS;
    } catch {
      return INITIAL_ENROLLMENTS;
    }
  });

  const [certificates, setCertificates] = useState<StudentCertificate[]>(student.certificates || []);
  const [activities, setActivities] = useState<RecentActivity[]>(INITIAL_RECENT_ACTIVITIES);
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingLiveSession[]>(INITIAL_UPCOMING_LIVE_SESSIONS);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(student));
    } catch (err) {
      console.warn('Failed to persist student profile', err);
    }
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ENROLLMENTS, JSON.stringify(enrollments));
    } catch (err) {
      console.warn('Failed to persist enrollments', err);
    }
  }, [enrollments]);

  // LMS Core Function: Enroll Student in a Course
  const enrollInCourse = (courseId: string, academyId: string) => {
    if (student.enrolledCourses.includes(courseId)) {
      return; // Already enrolled
    }

    const newEnrollment: Enrollment = {
      id: `ENR-${Date.now()}`,
      studentId: student.id,
      courseId,
      academyId,
      purchaseStatus: 'enrolled',
      enrollmentDate: new Date().toISOString(),
      progress: 0,
      completionStatus: 'not_started',
      certificateStatus: 'none',
      lastAccessedAt: new Date().toISOString(),
      completedLessons: [],
    };

    const newActivity: RecentActivity = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'course_enrolled',
      title: 'Enrolled in New Course',
      description: `Joined course ${courseId} at ${academyId}`,
      courseId,
      academyId,
    };

    setEnrollments(prev => [newEnrollment, ...prev]);
    setActivities(prev => [newActivity, ...prev]);
    setStudent(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId],
      progress: {
        ...prev.progress,
        [courseId]: {
          courseId,
          academyId,
          progressPercentage: 0,
          totalLessons: 10,
          completedLessonsCount: 0,
          completedLessonIds: [],
          lastAccessedAt: new Date().toISOString(),
        },
      },
    }));
  };

  // LMS Core Function: Update Course Progress
  const updateCourseProgress = (courseId: string, progressPercentage: number, lessonId?: string) => {
    const clampedProgress = Math.min(100, Math.max(0, progressPercentage));
    const now = new Date().toISOString();

    setEnrollments(prev =>
      prev.map(enr => {
        if (enr.courseId !== courseId) return enr;
        const newCompleted = lessonId && !enr.completedLessons?.includes(lessonId)
          ? [...(enr.completedLessons || []), lessonId]
          : enr.completedLessons || [];
        
        const isFinished = clampedProgress >= 100;

        return {
          ...enr,
          progress: clampedProgress,
          completionStatus: isFinished ? 'completed' : clampedProgress > 0 ? 'in_progress' : 'not_started',
          certificateStatus: isFinished ? 'issued' : enr.certificateStatus,
          lastAccessedAt: now,
          completedLessons: newCompleted,
        };
      })
    );

    setStudent(prev => {
      const currentProg = prev.progress[courseId] || {
        courseId,
        academyId: 'general',
        progressPercentage: 0,
        totalLessons: 10,
        completedLessonsCount: 0,
        completedLessonIds: [],
        lastAccessedAt: now,
      };

      const newLessonIds = lessonId && !currentProg.completedLessonIds.includes(lessonId)
        ? [...currentProg.completedLessonIds, lessonId]
        : currentProg.completedLessonIds;

      const isCompletedNow = clampedProgress >= 100;
      const completedCoursesList = isCompletedNow && !prev.completedCourses.includes(courseId)
        ? [...prev.completedCourses, courseId]
        : prev.completedCourses;

      return {
        ...prev,
        completedCourses: completedCoursesList,
        progress: {
          ...prev.progress,
          [courseId]: {
            ...currentProg,
            progressPercentage: clampedProgress,
            completedLessonsCount: newLessonIds.length,
            completedLessonIds: newLessonIds,
            lastAccessedAt: now,
            completedAt: isCompletedNow ? now : currentProg.completedAt,
          },
        },
      };
    });

    if (clampedProgress >= 100) {
      markCourseCompleted(courseId);
    }
  };

  // LMS Core Function: Mark Course Completed & Issue Certificate
  const markCourseCompleted = (courseId: string) => {
    const existingCert = certificates.find(c => c.courseId === courseId);
    if (!existingCert) {
      const newCert: StudentCertificate = {
        id: `CERT-${Date.now()}`,
        certificateNumber: `LEO-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        courseId,
        courseTitle: `Certified Masterclass (${courseId})`,
        academyId: 'general',
        academyName: 'LEO Family Academy',
        instructorName: 'Master Faculty',
        issueDate: new Date().toISOString().split('T')[0],
        verificationUrl: `https://leo-family.org/verify/LEO-CERT-${courseId}`,
      };

      setCertificates(prev => [...prev, newCert]);
      setStudent(prev => ({
        ...prev,
        certificates: [...(prev.certificates || []), newCert],
      }));

      setActivities(prev => [
        {
          id: `ACT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'certificate_earned',
          title: 'Certificate Awarded!',
          description: `Earned official certificate for completing ${courseId}`,
          courseId,
        },
        ...prev,
      ]);
    }
  };

  // Update Profile
  const updateProfile = (updates: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...updates }));
  };

  // Register for Live Session
  const registerForLiveSession = (sessionId: string) => {
    setUpcomingSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, isRegistered: !s.isRegistered } : s))
    );
  };

  // Query: Check Enrollment & Access Status
  const getEnrollment = (courseId: string) => {
    return enrollments.find(e => e.courseId === courseId);
  };

  const isEnrolledInCourse = (courseId: string) => {
    return student.enrolledCourses.includes(courseId);
  };

  const getCourseAccessInfo = (courseId: string, academyId: string, isPremium: boolean = false): CourseAccessInfo => {
    const enrollment = getEnrollment(courseId);
    const isEnrolled = !!enrollment || student.enrolledCourses.includes(courseId);

    let accessStatus: AccessStatus = 'free';
    if (isEnrolled) {
      accessStatus = 'enrolled';
    } else if (isPremium) {
      accessStatus = 'premium';
    }

    return {
      courseId,
      academyId,
      isEnrolled,
      isLocked: isPremium && !isEnrolled,
      isFree: !isPremium,
      isPremium,
      isComingSoon: false,
      accessStatus,
      enrollmentDetails: enrollment,
    };
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        enrollments,
        certificates,
        activities,
        upcomingSessions,
        enrollInCourse,
        updateCourseProgress,
        markCourseCompleted,
        updateProfile,
        registerForLiveSession,
        getCourseAccessInfo,
        getEnrollment,
        isEnrolledInCourse,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
