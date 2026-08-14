import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ArrowLeft, Calendar, User, Clock, ExternalLink } from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants/contacts';

interface BlogsPageProps {
  navigate?: (path: string) => void;
}

export default function BlogsPage({ navigate }: BlogsPageProps) {
  const articles = [
    {
      id: 'blog-1',
      title: 'The Sacred Science of Chaldean Numerology vs Pythagorean Systems',
      excerpt: 'Discover why ancient Chaldean numerology remains the most potent vibrational diagnostic system for personal name and business branding.',
      category: 'Numerology',
      readTime: '5 min read',
      date: 'August 10, 2026',
      author: 'Raajeev Singh Chauhann',
      image: '/gemstone-assets/logo.jpg'
    },
    {
      id: 'blog-2',
      title: 'Planetary Transits & Vedic Astrology: Navigating Saturn Return',
      excerpt: 'A comprehensive guide on understanding Saturn (Shani) transits across houses and how ancient remedies restore cosmic harmony.',
      category: 'Astrology',
      readTime: '8 min read',
      date: 'August 4, 2026',
      author: 'Shaunak S. Patthak',
      image: '/gemstone-assets/logo.jpg'
    },
    {
      id: 'blog-3',
      title: 'Vastu Shastra for Modern Apartments: Directional Energy Flow',
      excerpt: 'Practical spatial alignment principles to maximize wealth, health, and positive life force chi in contemporary urban living spaces.',
      category: 'Vastu',
      readTime: '6 min read',
      date: 'July 28, 2026',
      author: 'Sannjoy Biswass',
      image: '/gemstone-assets/logo.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary pt-28 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Back Button / Header */}
        <div className="mb-8 flex items-center justify-between">
          {navigate && (
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}
          <div className="text-xs font-mono text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Spiritual Publications & Wisdom
          </div>
        </div>

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>LEO Family Knowledge Vault</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-cinzel tracking-tight text-text-primary"
          >
            Articles & Spiritual Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
          >
            Deep dive into masterclass guides, occult philosophy, and esoteric wisdom curated by our master mentors.
          </motion.p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-card border border-border/30 hover:border-amber-400/50 rounded-3xl overflow-hidden flex flex-col justify-between h-full shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(212,175,55,0.2)]"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/10] bg-background overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-90" />
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-primary text-background text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 text-[10px] text-text-secondary">
                  <span className="flex items-center gap-1 bg-card/90 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{article.date}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-card/90 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-3 font-sans font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest">LEO Publication</span>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notice Box */}
        <div className="mt-16 bg-card/50 border border-border/30 rounded-3xl p-8 max-w-3xl mx-auto text-center space-y-3 backdrop-blur-md">
          <BookOpen className="w-8 h-8 text-primary mx-auto opacity-75" />
          <h4 className="text-base font-cinzel font-bold text-text-primary">Dynamic Blog CMS Integration Ready</h4>
          <p className="text-xs text-text-secondary font-light leading-relaxed">
            Articles and insights are curated directly from verified LEO Family masters. Future database expansion can be seamlessly connected to store articles without altering frontend architecture.
          </p>
        </div>

      </div>
    </div>
  );
}
