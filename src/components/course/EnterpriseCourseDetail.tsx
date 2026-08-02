import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  Play,
  Lock,
  ChevronDown,
  Award,
  Globe,
  Sparkles,
  ShieldCheck,
  FileText,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { EnterpriseCourse, CourseModule, CourseLesson } from '../../types/course';
import { useStudent } from '../../context/StudentContext';
import SmartImage from '../sections/SmartImage';

export interface EnterpriseCourseDetailProps {
  course: EnterpriseCourse;
  onBack?: () => void;
}

export const EnterpriseCourseDetail: React.FC<EnterpriseCourseDetailProps> = ({ course, onBack }) => {
  const { getCourseAccessInfo, enrollInCourse, updateCourseProgress } = useStudent();
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(course.modules?.[0]?.id || null);
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(course.modules?.[0]?.lessons?.[0] || null);

  const accessInfo = getCourseAccessInfo(course.id, course.academyId, course.isPremium);

  const toggleModule = (id: string) => {
    setExpandedModuleId(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background text-text-primary py-12 px-6 max-w-7xl mx-auto space-y-12 text-left">
      
      {/* Back Action */}
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          ← Back to Catalog
        </button>
      )}

      {/* HERO BANNER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card border border-primary/25 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">{course.category}</span>
            <span className="bg-card border border-border/20 px-3 py-1 rounded-full text-text-secondary">{course.level}</span>
            <span className="flex items-center gap-1 text-amber-400 font-cinzel">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{course.rating} ({course.studentsEnrolled} Students)</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-text-primary leading-tight">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed max-w-2xl">
            {course.subtitle || course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-text-secondary border-t border-border/10">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{course.duration} Total Duration</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{course.modules?.length || 0} Modules</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>{course.language}</span>
            </span>
            {course.hasCertificate && (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Certificate Included</span>
              </span>
            )}
          </div>
        </div>

        {/* Right CTA Card */}
        <div className="lg:col-span-4 bg-background border border-border/20 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-border/10">
            <SmartImage src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 fill-background ml-0.5" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">Tuition Fee</span>
            <span className="text-2xl font-extrabold font-cinzel text-primary">
              {course.price > 0 ? `₹${course.discountPrice || course.price}` : 'Free'}
            </span>
          </div>

          <button
            onClick={() => enrollInCourse(course.id, course.academyId)}
            className={`w-full py-3.5 font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-xl transition-all cursor-pointer ${
              accessInfo.isEnrolled
                ? 'bg-emerald-500 text-white'
                : 'bg-primary text-background hover:opacity-90'
            }`}
          >
            {accessInfo.isEnrolled ? 'Enrolled - Access Lessons' : 'Enroll in Masterclass'}
          </button>
        </div>

      </div>

      {/* CURRICULUM MODULES & LESSONS */}
      <div className="bg-card border border-border/15 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold font-cinzel text-text-primary">Course Curriculum & Syllabus</h2>
          <p className="text-xs text-text-secondary">Structured modules designed for comprehensive mastery</p>
        </div>

        <div className="space-y-4">
          {course.modules?.map((mod, modIdx) => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div key={mod.id} className="border border-border/15 rounded-xl overflow-hidden bg-background/40">
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-4 flex items-center justify-between font-bold font-cinzel text-sm text-text-primary hover:text-primary transition-colors cursor-pointer text-left"
                >
                  <span>Module {modIdx + 1}: {mod.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 space-y-2 border-t border-border/10 pt-3"
                    >
                      {mod.lessons.map((les) => (
                        <div
                          key={les.id}
                          onClick={() => {
                            setActiveLesson(les);
                            if (accessInfo.isEnrolled) {
                              updateCourseProgress(course.id, 50, les.id);
                            }
                          }}
                          className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-all cursor-pointer ${
                            activeLesson?.id === les.id
                              ? 'bg-primary/10 border-primary/40 text-primary font-bold'
                              : 'bg-card border-border/10 hover:border-primary/20 text-text-primary'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {les.isFreePreview || accessInfo.isEnrolled ? (
                              <Play className="w-3.5 h-3.5 text-primary shrink-0" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-text-secondary/60 shrink-0" />
                            )}
                            <span>{les.title}</span>
                          </div>

                          <div className="flex items-center gap-3 text-[10px] text-text-secondary">
                            <span>{les.duration}</span>
                            {les.isFreePreview && (
                              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">
                                Free Preview
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
