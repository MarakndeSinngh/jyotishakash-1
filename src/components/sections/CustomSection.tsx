import React from 'react';
import { Section } from '../../types/cms';
import { motion } from 'framer-motion';
import SmartImage from './SmartImage';

const CustomSection: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <section className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {section.title && (
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 font-cinzel text-text-primary drop-shadow-lg tracking-wider gold-glow-text text-center">
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <h3 className="text-xl lg:text-2xl text-primary font-bold tracking-[0.2em] uppercase mb-8 text-center opacity-80">
              {section.subtitle}
            </h3>
          )}
          {section.image && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
              <SmartImage 
                src={section.image} 
                alt={section.title || 'Section Image'} 
                className="w-full h-auto object-contain relative z-[50]" 
              />
            </div>
          )}
          {section.content && (
            <div 
              className="prose prose-lg prose-neutral max-w-none text-text-secondary prose-headings:font-cinzel prose-headings:text-text-primary prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: section.content }} 
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomSection;
