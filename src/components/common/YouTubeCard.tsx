import React, { useState } from 'react';
import { Play, Clock, Sparkles, UserCheck, Tag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem, getAutoYoutubeThumbnail } from '../../config/mediaRegistry';
import { getFallbackThumbnails } from '../../utils/youtube';

interface YouTubeCardProps {
  media: MediaItem;
  className?: string;
  aspectRatio?: 'video' | 'shorts' | 'square';
  showDetails?: boolean;
}

export const YouTubeCard: React.FC<YouTubeCardProps> = ({
  media,
  className = '',
  aspectRatio = 'video',
  showDetails = true,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [thumbSrc, setThumbSrc] = useState<string>(
    media.thumbnail || getAutoYoutubeThumbnail(media.youtubeVideoId, 'maxresdefault')
  );
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const fallbacks = getFallbackThumbnails(media.youtubeVideoId);

  const handleThumbError = () => {
    const nextIdx = fallbackIndex + 1;
    if (nextIdx < fallbacks.length) {
      setFallbackIndex(nextIdx);
      setThumbSrc(fallbacks[nextIdx]);
    }
  };

  // Detect 120x90 youtube error image placeholder
  const handleThumbLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth === 120 && img.naturalHeight === 90) {
      handleThumbError();
    }
  };

  const aspectClass = {
    video: 'aspect-video',
    shorts: 'aspect-[9/16]',
    square: 'aspect-square',
  }[aspectRatio];

  const teacherNameMap: Record<string, string> = {
    raajeev: 'Raajeev Singh Chauhann',
    shaunak: 'Shaunak S. Patthak',
    sannjoy: 'Sannjoy Biswass',
    all: 'LEO Family Master',
  };

  return (
    <div
      className={`group relative bg-card border border-border/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      {/* Video Thumbnail / Active Embed Container */}
      <div className={`relative w-full overflow-hidden bg-black/90 ${aspectClass}`}>
        {!isPlaying ? (
          <>
            {/* Thumbnail Image */}
            <img
              src={thumbSrc}
              alt={media.title}
              loading="lazy"
              decoding="async"
              onLoad={handleThumbLoad}
              onError={handleThumbError}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />

            {/* Gradient Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

            {/* Category Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/70 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {media.category}
              </span>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 text-white text-[10px] font-semibold tracking-wider backdrop-blur-md">
                <Clock className="w-3 h-3 text-stone-300" />
                {media.duration}
              </span>
            </div>

            {/* Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              aria-label={`Play video: ${media.title}`}
              className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer group/btn"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-stone-950 shadow-2xl backdrop-blur-sm group-hover/btn:bg-amber-300 transition-colors duration-300"
              >
                <Play className="h-6 w-6 fill-current ml-1 text-stone-950" />
              </motion.div>
            </button>
          </>
        ) : (
          /* Lazy Loaded YouTube Iframe (Loaded ONLY on Play click) */
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${media.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={media.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-2 z-30 p-1.5 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors"
              title="Close Video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Card Content Details */}
      {showDetails && (
        <div className="p-5 flex flex-col justify-between flex-1 space-y-3 text-left">
          <div className="space-y-2">
            {/* Teacher Badge */}
            <div className="flex items-center justify-between text-[11px] text-text-secondary font-sans">
              <span className="flex items-center gap-1.5 text-primary font-semibold">
                <UserCheck className="w-3.5 h-3.5" />
                {teacherNameMap[media.teacherId] || 'LEO Family Mentor'}
              </span>
              {media.language && (
                <span className="px-2 py-0.5 rounded bg-surface border border-border/20 text-stone-300 font-mono text-[9px]">
                  {media.language}
                </span>
              )}
            </div>

            {/* Video Title */}
            <h3 className="text-sm sm:text-base font-bold font-cinzel text-text-primary line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
              {media.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-text-secondary line-clamp-2 font-light leading-relaxed font-sans">
              {media.description}
            </p>
          </div>

          {/* Tags */}
          {media.tags && media.tags.length > 0 && (
            <div className="pt-3 border-t border-border/15 flex flex-wrap items-center gap-1.5">
              {media.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-md bg-primary/5 text-primary/80 border border-primary/15 font-sans"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
