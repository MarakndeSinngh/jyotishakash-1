import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  BookOpen,
  Star,
  Lock,
  CheckCircle,
  Bookmark,
  Award,
  Sparkles,
  Play,
  ArrowUpRight,
} from 'lucide-react';
import { EnterpriseCourse } from '../../types/course';
import { useCourseEngine } from '../../context/CourseEngineContext';
import { useStudent } from '../../context/StudentContext';
import SmartImage from '../sections/SmartImage';

export interface EnterpriseCourseCardProps {
  course: EnterpriseCourse;
  onEnroll?: (course: EnterpriseCourse) => void;
  onViewDetails?: (course: EnterpriseCourse) => void;
  className?: string;
}

export const EnterpriseCourseCard: React.FC<EnterpriseCourseCardProps> = ({
  course,
  onEnroll,
  onViewDetails,
  className = '',
}) => {
  const { toggleBookmark, isBookmarked } = useCourseEngine();
  const { getCourseAccessInfo, enrollInCourse } = useStudent();

  const accessInfo = getCourseAccessInfo(course.id, course.academyId, course.isPremium);
  const bookmarked = isBookmarked(course.id);

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEnroll) {
      onEnroll(course);
    } else {
      enrollInCourse(course.id, course.academyId);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`group bg-card border border-border/15 hover:border-primary/30 rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-xl transition-all duration-300 relative text-left ${className}`}
    >
      {/* Top Media Thumbnail Container */}
      <div className="relative aspect-[4/3] bg-background overflow-hidden">
        <SmartImage
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105 bg-background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5">
          {course.badge && (
            <span className="bg-primary text-background text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
              {course.badge}
            </span>
          )}
          {course.isBestseller && !course.badge && (
            <span className="bg-amber-400 text-background text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
              Bestseller
            </span>
          )}
          {accessInfo.isEnrolled && (
            <span className="bg-emerald-500 text-white text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Enrolled
            </span>
          )}
        </div>

        {/* Bookmark Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(course.id);
          }}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            bookmarked
              ? 'bg-primary text-background'
              : 'bg-black/40 text-white hover:bg-black/60 hover:text-primary'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Course'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-background' : ''}`} />
        </button>

        {/* Bottom Overlay Meta */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-between items-center text-[10px] text-white">
          <span className="bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{course.duration}</span>
          </span>
          <span className="bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded flex items-center gap-1 font-medium">
            <BookOpen className="w-3 h-3 text-emerald-400" />
            <span>{course.modules?.length || 2} Modules ({course.lessonsCount || 8} Lessons)</span>
          </span>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] text-text-secondary tracking-wider font-bold uppercase">
            <span>Category: <strong className="text-primary">{course.category}</strong></span>
            <span className="flex items-center gap-1 text-amber-400 font-bold font-cinzel">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{course.rating}</span>
            </span>
          </div>

          <h3
            onClick={() => onViewDetails && onViewDetails(course)}
            className="text-base sm:text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
          >
            {course.title}
          </h3>

          <p className="text-text-secondary text-xs font-light leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Footer & Actions */}
        <div className="pt-4 border-t border-border/10 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] text-text-secondary">
              Instructor: <strong className="text-text-primary">{course.instructorName}</strong>
            </span>
            <div className="text-right">
              {course.discountPrice ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] line-through text-text-secondary">₹{course.price}</span>
                  <span className="text-primary font-bold font-cinzel text-sm">₹{course.discountPrice}</span>
                </div>
              ) : (
                <span className="text-primary font-bold font-cinzel text-sm">
                  {course.price > 0 ? `₹${course.price}` : 'Free'}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleEnrollClick}
              className={`py-2.5 font-extrabold uppercase tracking-wider text-[9px] rounded-lg transition-all text-center shadow-md cursor-pointer flex items-center justify-center gap-1 ${
                accessInfo.isEnrolled
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-primary text-background hover:opacity-90'
              }`}
            >
              {accessInfo.isEnrolled ? (
                <>
                  <Play className="w-3 h-3 fill-emerald-400" />
                  <span>Resume Course</span>
                </>
              ) : (
                <span>Enroll Now</span>
              )}
            </button>

            <button
              onClick={() => onViewDetails && onViewDetails(course)}
              className="py-2.5 bg-background hover:bg-card border border-border/20 text-text-secondary hover:text-text-primary font-bold uppercase tracking-wider text-[9px] rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Curriculum</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
