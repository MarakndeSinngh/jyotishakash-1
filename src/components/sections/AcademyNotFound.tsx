import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export default function AcademyNotFound() {
  const { allAcademies, switchAcademy } = useAcademy();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-6 relative overflow-hidden text-text-primary z-10">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
        
        {/* Warning Icon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-5 py-2 rounded-full"
        >
          <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 font-cinzel">
            Academy Not Found
          </span>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight leading-tight">
            Requested Academy Profile Is Unavailable
          </h2>
          <p className="text-text-secondary text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            The instructor academy route you requested could not be located. Please select from our verified, accredited instructor academies below:
          </p>
        </div>

        {/* Verified Academies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {allAcademies.map((academy) => (
            <motion.div
              key={academy.id}
              whileHover={{ y: -6 }}
              className="bg-card border border-primary/20 hover:border-primary/50 rounded-3xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 group cursor-pointer"
              onClick={() => switchAcademy(academy.slug)}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={academy.assets.profileImage}
                    alt={academy.instructorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 shadow-md"
                  />
                  <div>
                    <h3 className="text-sm font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors leading-tight">
                      {academy.shortName}
                    </h3>
                    <span className="text-[10px] text-primary font-semibold uppercase tracking-wider block">
                      {academy.instructorTitle}
                    </span>
                  </div>
                </div>

                <p className="text-text-secondary text-xs font-light leading-relaxed line-clamp-3">
                  {academy.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Explore Programs
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
