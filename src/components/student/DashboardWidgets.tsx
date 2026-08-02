import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Calendar,
  ChevronRight,
  Play,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Video,
  User,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useAcademy } from '../../context/AcademyContext';
import { ProgressRing } from './ProfileComponents';

// ==========================================
// 1. CONTINUE LEARNING WIDGET
// ==========================================
export const ContinueLearningWidget: React.FC = () => {
  const { student, enrollments, updateCourseProgress } = useStudent();
  const { allAcademies } = useAcademy();

  // Find active in-progress enrollment
  const inProgressEnrollment = enrollments.find(e => e.completionStatus === 'in_progress') || enrollments[0];

  if (!inProgressEnrollment) {
    return (
      <div className="bg-card border border-border/15 rounded-2xl p-6 text-center space-y-3">
        <BookOpen className="w-8 h-8 text-primary/60 mx-auto" />
        <h3 className="text-sm font-bold font-cinzel text-text-primary">No Active Courses</h3>
        <p className="text-xs text-text-secondary">Enroll in a masterclass course to start your learning journey.</p>
      </div>
    );
  }

  // Find course details
  const matchingAcademy = allAcademies.find(a => a.id === inProgressEnrollment.academyId || a.slug === inProgressEnrollment.academyId);
  const courseDetails = matchingAcademy?.courses.find(c => c.id === inProgressEnrollment.courseId);
  const studentProg = student.progress[inProgressEnrollment.courseId];

  return (
    <div className="bg-card border border-primary/30 rounded-2xl p-6 shadow-xl relative overflow-hidden text-left space-y-4">
      <div className="flex items-center justify-between border-b border-border/10 pb-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
          <Sparkles className="w-3 h-3" />
          <span>Continue Learning</span>
        </span>
        <span className="text-[10px] text-text-secondary">
          Last active: {new Date(inProgressEnrollment.lastAccessedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <span className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
            {matchingAcademy?.name || 'Academy Course'}
          </span>
          <h3 className="text-base sm:text-lg font-bold font-cinzel text-text-primary">
            {courseDetails?.title || inProgressEnrollment.courseId}
          </h3>
          <p className="text-xs text-text-secondary font-light">
            {studentProg?.lastLessonTitle || 'Next Module: Advanced Analytical Techniques & Remedial Science'}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <ProgressRing progress={inProgressEnrollment.progress} size={60} strokeWidth={4} />
          
          <button
            onClick={() => {
              // Simulates resuming and adding progress
              updateCourseProgress(
                inProgressEnrollment.courseId,
                Math.min(100, inProgressEnrollment.progress + 10)
              );
            }}
            className="px-5 py-3 bg-primary text-background font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
          >
            <Play className="w-3.5 h-3.5 fill-background" />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MY COURSES WIDGET
// ==========================================
export const MyCoursesWidget: React.FC = () => {
  const { enrollments, updateCourseProgress } = useStudent();
  const { allAcademies } = useAcademy();

  return (
    <div className="bg-card border border-border/15 rounded-2xl p-6 shadow-lg text-left space-y-6">
      <div className="flex items-center justify-between border-b border-border/10 pb-3">
        <div>
          <h3 className="text-base font-bold font-cinzel text-text-primary">My Enrolled Courses</h3>
          <span className="text-[10px] text-text-secondary">Active LMS Enrollment Roster</span>
        </div>
        <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
          {enrollments.length} Courses
        </span>
      </div>

      <div className="space-y-4">
        {enrollments.map((enr) => {
          const matchingAcademy = allAcademies.find(a => a.id === enr.academyId || a.slug === enr.academyId);
          const course = matchingAcademy?.courses.find(c => c.id === enr.courseId);

          return (
            <div
              key={enr.id}
              className="p-4 rounded-xl bg-background/50 border border-border/15 hover:border-primary/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 text-left flex-grow">
                <div className="flex items-center gap-2 text-[10px] text-text-secondary uppercase tracking-wider">
                  <span className="font-semibold text-primary">{matchingAcademy?.shortName || enr.academyId}</span>
                  <span>•</span>
                  <span>Status: <strong className="text-text-primary capitalize">{enr.completionStatus.replace('_', ' ')}</strong></span>
                </div>

                <h4 className="text-sm font-bold font-cinzel text-text-primary">
                  {course?.title || enr.courseId}
                </h4>

                {/* Progress Bar */}
                <div className="w-full max-w-md bg-border/20 rounded-full h-2 overflow-hidden mt-2">
                  <div
                    className="bg-primary h-full transition-all duration-500 rounded-full"
                    style={{ width: `${enr.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 sm:self-center">
                <span className="text-xs font-bold font-cinzel text-primary">{enr.progress}%</span>
                
                <button
                  onClick={() => updateCourseProgress(enr.courseId, Math.min(100, enr.progress + 15))}
                  className="px-3.5 py-2 bg-card border border-border/20 hover:border-primary/40 text-text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer hover:bg-surface"
                >
                  {enr.progress >= 100 ? 'Review' : 'Continue'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 3. RECOMMENDED COURSES WIDGET
// ==========================================
export const RecommendedCoursesWidget: React.FC = () => {
  const { enrollInCourse, isEnrolledInCourse } = useStudent();
  const { allAcademies } = useAcademy();

  // Gather courses from all academies that the student is NOT enrolled in
  const availableCourses = allAcademies.flatMap(academy =>
    academy.courses
      .filter(c => !isEnrolledInCourse(c.id))
      .map(c => ({ course: c, academy }))
  );

  return (
    <div className="bg-card border border-border/15 rounded-2xl p-6 shadow-lg text-left space-y-6">
      <div className="flex items-center justify-between border-b border-border/10 pb-3">
        <div>
          <h3 className="text-base font-bold font-cinzel text-text-primary">Recommended Masterclasses</h3>
          <span className="text-[10px] text-text-secondary">Expand your spiritual & numerological mastery</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableCourses.slice(0, 4).map(({ course, academy }) => (
          <div
            key={course.id}
            className="p-4 rounded-xl bg-background/50 border border-border/15 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold tracking-widest text-primary block">
                {academy.shortName}
              </span>
              <h4 className="text-xs font-bold font-cinzel text-text-primary line-clamp-1">
                {course.title}
              </h4>
              <p className="text-[11px] text-text-secondary line-clamp-2 font-light">
                {course.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/10">
              <span className="text-[10px] text-text-secondary">{course.difficulty}</span>
              
              <button
                onClick={() => enrollInCourse(course.id, academy.slug)}
                className="px-3 py-1.5 bg-primary/10 border border-primary/30 hover:bg-primary hover:text-background text-primary text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. CERTIFICATES WIDGET
// ==========================================
export const CertificatesWidget: React.FC = () => {
  const { certificates } = useStudent();

  return (
    <div className="bg-card border border-border/15 rounded-2xl p-6 shadow-lg text-left space-y-6">
      <div className="flex items-center justify-between border-b border-border/10 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold font-cinzel text-text-primary">My Certificates</h3>
        </div>
        <span className="text-[10px] text-text-secondary">{certificates.length} Issued</span>
      </div>

      {certificates.length === 0 ? (
        <div className="p-6 text-center text-xs text-text-secondary space-y-1">
          <p>No certificates earned yet.</p>
          <p className="text-[10px]">Complete 100% of any course to auto-generate your verified certificate.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-gradient-to-r from-amber-500/5 via-primary/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-cinzel">
                    Verified Credential
                  </span>
                </div>
                <h4 className="text-sm font-bold font-cinzel text-text-primary">
                  {cert.courseTitle}
                </h4>
                <p className="text-[10px] text-text-secondary">
                  Instructor: {cert.instructorName} • Issued: {cert.issueDate}
                </p>
                <span className="text-[9px] text-primary/80 font-mono block">
                  ID: {cert.certificateNumber}
                </span>
              </div>

              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-card border border-amber-500/30 hover:border-amber-500 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. RECENT ACTIVITY WIDGET
// ==========================================
export const RecentActivityWidget: React.FC = () => {
  const { activities } = useStudent();

  return (
    <div className="bg-card border border-border/15 rounded-2xl p-6 shadow-lg text-left space-y-6">
      <div className="border-b border-border/10 pb-3">
        <h3 className="text-base font-bold font-cinzel text-text-primary">Recent Learning Activity</h3>
        <span className="text-[10px] text-text-secondary">Audit Trail & LMS Progress</span>
      </div>

      <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-border/20">
        {activities.map((act) => (
          <div key={act.id} className="relative pl-8 text-left space-y-0.5">
            <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-card -translate-x-1/2" />
            
            <div className="flex items-center justify-between text-[10px] text-text-secondary">
              <span className="font-bold uppercase tracking-wider text-primary">{act.type.replace('_', ' ')}</span>
              <span>{new Date(act.timestamp).toLocaleDateString()}</span>
            </div>

            <h4 className="text-xs font-bold text-text-primary font-sans">{act.title}</h4>
            <p className="text-[11px] text-text-secondary font-light">{act.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 6. UPCOMING LIVE SESSIONS WIDGET
// ==========================================
export const UpcomingLiveSessionsWidget: React.FC = () => {
  const { upcomingSessions, registerForLiveSession } = useStudent();

  return (
    <div className="bg-card border border-border/15 rounded-2xl p-6 shadow-lg text-left space-y-6">
      <div className="flex items-center justify-between border-b border-border/10 pb-3">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold font-cinzel text-text-primary">Upcoming Live Workshops</h3>
        </div>
      </div>

      <div className="space-y-4">
        {upcomingSessions.map((sess) => (
          <div
            key={sess.id}
            className="p-4 rounded-xl bg-background/50 border border-border/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest text-primary">
                {sess.academyName}
              </span>
              <h4 className="text-xs sm:text-sm font-bold font-cinzel text-text-primary">
                {sess.title}
              </h4>
              <p className="text-[11px] text-text-secondary font-light">
                Topic: {sess.topic}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-text-secondary pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span>{new Date(sess.scheduledAt).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{sess.durationMinutes} Mins</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => registerForLiveSession(sess.id)}
              className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all shrink-0 cursor-pointer ${
                sess.isRegistered
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-primary text-background hover:bg-opacity-90 shadow-md'
              }`}
            >
              {sess.isRegistered ? 'Registered' : 'Reserve Spot'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
