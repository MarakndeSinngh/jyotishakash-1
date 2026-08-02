import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Globe,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
  Clock,
  User,
  Star,
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { StudentProfile } from '../../types/student';

// ==========================================
// 1. PROGRESS RING COMPONENT
// ==========================================
export interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number; // size in px, default 80
  strokeWidth?: number; // stroke width, default 6
  showLabel?: boolean;
  className?: string;
  colorClass?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 80,
  strokeWidth = 6,
  showLabel = true,
  className = '',
  colorClass = 'text-primary',
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border/20 fill-none"
        />
        {/* Animated Progress bar */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          strokeLinecap="round"
          className={`${colorClass} fill-none`}
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-extrabold font-cinzel text-text-primary">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. STUDENT AVATAR COMPONENT
// ==========================================
export interface StudentAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  membershipType?: string;
  className?: string;
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  src,
  name,
  size = 'md',
  showBadge = true,
  membershipType = 'pro',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-2xl',
  };

  const getInitials = (n: string) => {
    const parts = n.split(' ').filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-primary/40 shadow-md`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center font-bold font-cinzel text-primary shadow-md`}
        >
          {getInitials(name)}
        </div>
      )}

      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 bg-primary text-background text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full shadow-md border border-background flex items-center gap-0.5"
          title={`Membership: ${membershipType}`}
        >
          <Sparkles className="w-2.5 h-2.5 fill-background" />
          <span className="hidden sm:inline">{membershipType}</span>
        </span>
      )}
    </div>
  );
};

// ==========================================
// 3. LEARNING STATISTICS WIDGET COMPONENT
// ==========================================
export const LearningStatistics: React.FC = () => {
  const { student, enrollments, certificates } = useStudent();

  const totalEnrolled = student.enrolledCourses.length;
  const totalCompleted = student.completedCourses.length;
  const totalCerts = certificates.length;

  // Calculate overall average progress
  const progressValues = enrollments.map(e => e.progress);
  const avgProgress = progressValues.length > 0 
    ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
    : 0;

  const stats = [
    {
      label: 'Enrolled Courses',
      value: totalEnrolled,
      icon: BookOpen,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
    },
    {
      label: 'Completed Courses',
      value: totalCompleted,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Certificates Earned',
      value: totalCerts,
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20',
    },
    {
      label: 'Average Progress',
      value: `${avgProgress}%`,
      icon: Zap,
      color: 'text-sky-400',
      bg: 'bg-sky-400/10',
      border: 'border-sky-400/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`p-4 rounded-xl bg-card border ${stat.border} flex items-center gap-4 shadow-sm hover:border-primary/40 transition-all`}
          >
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-extrabold font-cinzel text-text-primary block leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary block">
                {stat.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ==========================================
// 4. PROFILE CARD COMPONENT
// ==========================================
export interface ProfileCardProps {
  customStudent?: StudentProfile;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ customStudent, className = '' }) => {
  const { student: activeStudent, enrollments } = useStudent();
  const student = customStudent || activeStudent;

  // Calculate average progress for ring display
  const progressValues = enrollments.map(e => e.progress);
  const overallProgress = progressValues.length > 0 
    ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
    : 0;

  return (
    <div className={`bg-card border border-primary/25 rounded-2xl p-6 shadow-xl relative overflow-hidden text-left ${className}`}>
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        
        {/* Left: Avatar + Identity */}
        <div className="flex items-center gap-4">
          <StudentAvatar
            src={student.avatar}
            name={student.fullName}
            size="xl"
            membershipType={student.membershipType}
          />

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold font-cinzel text-text-primary">
                {student.fullName}
              </h2>
              <span className="bg-primary/10 border border-primary/30 text-primary text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                {student.membershipType} Member
              </span>
            </div>

            <p className="text-xs text-text-secondary flex items-center gap-1.5 font-sans">
              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{student.email}</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-text-secondary pt-1">
              {student.country && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{student.state ? `${student.state}, ${student.country}` : student.country}</span>
                </span>
              )}
              {student.language && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-sky-400" />
                  <span>{student.language}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Overall Learning Progress Ring */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-background/60 border border-border/10">
          <ProgressRing progress={overallProgress} size={68} strokeWidth={5} colorClass="text-primary" />
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary block">
              LMS Mastery
            </span>
            <span className="text-xs font-bold font-cinzel text-text-primary block">
              {student.completedCourses.length} of {student.enrolledCourses.length} Courses Complete
            </span>
            <span className="text-[9px] text-primary block mt-0.5 font-sans">
              Student ID: {student.id}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
