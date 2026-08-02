import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Star, Zap, ShieldCheck } from 'lucide-react';

interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const METRICS: MetricItem[] = [
  {
    id: 'students',
    value: '25,000+',
    label: 'Students Enrolled',
    sublabel: 'Across 3 Specialized Academies',
    icon: Users,
  },
  {
    id: 'countries',
    value: '45+',
    label: 'Countries Reached',
    sublabel: 'Global Alumni Network',
    icon: Globe,
  },
  {
    id: 'consultations',
    value: '50,000+',
    label: 'Consultations Delivered',
    sublabel: 'Celebrities, Founders & Families',
    icon: Award,
  },
  {
    id: 'rating',
    value: '4.95 / 5',
    label: 'Average Student Rating',
    sublabel: 'Overwhelming Alumnus Trust',
    icon: Star,
  },
];

export default function SuccessMetricsSection() {
  return (
    <section id="metrics" className="relative py-20 bg-background text-text-primary overflow-hidden z-10 border-t border-border/15">
      
      {/* Background Decorative Engine */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-block">
            Impact & Proven Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cinzel text-text-primary">
            Empowering Thousands Globally
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {METRICS.map((metric, index) => {
            const IconComp = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group relative bg-card/80 border border-border/30 hover:border-amber-400/40 p-8 rounded-3xl backdrop-blur-md text-center flex flex-col items-center justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(212,175,55,0.18)]"
              >
                {/* Glow behind icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300 shadow-md">
                  <IconComp className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-amber-400 tracking-tight">
                    {metric.value}
                  </h3>
                  <p className="text-xs font-bold text-text-primary uppercase tracking-wider font-cinzel pt-1">
                    {metric.label}
                  </p>
                  <p className="text-[11px] text-text-secondary font-light font-sans">
                    {metric.sublabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
