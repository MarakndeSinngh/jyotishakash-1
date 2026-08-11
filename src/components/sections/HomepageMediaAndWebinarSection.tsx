import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Clock, Calendar, Users, ExternalLink, Video } from 'lucide-react';
import { useContentEngine } from '../../hooks/useContentEngine';
import { useMedia } from '../../media/MediaProvider';
import { YoutubeThumbnail } from '../common/YoutubeThumbnail';
import SmartImage from './SmartImage';

export default function HomepageMediaAndWebinarSection() {
  const { data, loading, error } = useContentEngine({ type: 'homepage' });
  const { openPlayer } = useMedia();

  const homepageData = data as any;
  const featuredMedia = homepageData?.featuredMedia || [];
  const liveEvents = homepageData?.liveEvents || [];

  return (
    <section className="relative py-24 sm:py-32 bg-background text-text-primary overflow-hidden z-10 border-t border-border/20">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-20">
        
        {/* ==================== FEATURED MEDIA ==================== */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-primary" />
              <span>Visual Wisdom & Teachings</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight text-text-primary"
            >
              Featured Media Library
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans"
            >
              Watch hand-picked masterclasses, success stories, and occult teachings curated through the ContentEngine.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMedia.slice(0, 3).map((media) => (
              <motion.div
                key={media.id}
                whileHover={{ y: -6 }}
                onClick={() => openPlayer({
                  id: media.id,
                  title: media.title || 'Masterclass',
                  description: media.description || '',
                  youtubeUrl: media.youtubeUrl,
                  youtubeId: media.youtubeVideoId || media.id,
                  thumbnail: media.thumbnail,
                  category: media.category,
                  instructor: media.speaker || 'LEO Faculty',
                  duration: '15:00',
                  publishedDate: media.publishedDate || '2025-01-01',
                  language: 'English & Hindi',
                  tags: [media.category],
                  visibility: 'public',
                  createdAt: media.createdAt || '2025-01-01',
                  updatedAt: media.updatedAt || '2025-01-01',
                  viewCount: media.viewCount || 1250,
                  isShort: false,
                  collection: ['homepage']
                })}
                className="group bg-card border border-border/30 hover:border-primary/50 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer transition-all duration-300"
              >
                <div className="relative aspect-video bg-background overflow-hidden">
                  <YoutubeThumbnail
                    url={media.youtubeUrl}
                    aspectRatio="video"
                    className="w-full h-full opacity-80 group-hover:opacity-100"
                    showPlayButton={true}
                    hoverEffect={true}
                    alt={media.title || 'Media'}
                  />
                  <span className="absolute top-4 left-4 z-20 bg-card/90 border border-border/30 px-3 py-1 rounded-full text-[9px] font-extrabold text-primary uppercase tracking-wider backdrop-blur-md">
                    {media.category}
                  </span>
                </div>

                <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                      {media.title || 'Masterclass'}
                    </h3>
                    <p className="text-text-secondary text-xs font-light leading-relaxed line-clamp-2">
                      {media.description || ''}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/15 flex items-center justify-between text-[11px] text-text-secondary">
                    <span className="font-semibold text-primary">{media.speaker || 'LEO Master'}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Play className="w-3 h-3 text-primary fill-primary" /> Watch
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==================== LIVE WEBINARS & EVENTS ==================== */}
        <div className="space-y-12 pt-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              <Video className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>Live Masterclasses</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel tracking-tight text-text-primary">
              Upcoming Live Webinars
            </h2>

            <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans">
              Join interactive live sessions with our expert mentors. Reserve your complimentary seat today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {liveEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -4 }}
                className="group bg-card border border-amber-400/30 hover:border-amber-400 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300"
              >
                {event.banner && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-background/50">
                    <SmartImage
                      src={event.banner}
                      alt={`${event.title} webinar banner`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60" />
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-400/15 border border-amber-400/35 px-3 py-1 rounded-full text-[9px] font-extrabold text-amber-400 uppercase tracking-widest">
                        {event.status || 'Live Masterclass'}
                      </span>
                      <span className="text-xs text-text-secondary font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> {event.date} • {event.time}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-cinzel text-text-primary group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary pt-2">
                      <div className="bg-background/60 p-2.5 rounded-xl border border-border/20">
                        <span className="block text-[9px] uppercase tracking-wider text-text-secondary">Language</span>
                        <span className="font-bold text-text-primary font-cinzel">{event.language}</span>
                      </div>
                      <div className="bg-background/60 p-2.5 rounded-xl border border-border/20">
                        <span className="block text-[9px] uppercase tracking-wider text-text-secondary">Available Seats</span>
                        <span className="font-bold text-amber-400 font-cinzel">{event.seats}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/15">
                    <a
                      href={event.registrationLink || "https://wa.me/919953713176"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-primary hover:brightness-110 text-background font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Register For Free</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
