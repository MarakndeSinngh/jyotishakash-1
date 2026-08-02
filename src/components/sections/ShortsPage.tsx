import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Flame, ChevronUp, ChevronDown, Share2, Heart, Check, Play
} from 'lucide-react';
import { useMedia } from '../../media/MediaProvider';
import { useShorts } from '../../media/MediaHooks';

export default function ShortsPage({ navigate }: { navigate: (path: string) => void }) {
  const { openPlayer, incrementViews, toggleFavorite, favorites } = useMedia();
  const shortsList = useShorts();

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareToast, setShowShareToast] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for arrow keys up/down
  useEffect(() => {
    if (shortsList.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, shortsList]);

  const handleNext = () => {
    if (shortsList.length === 0) return;
    if (activeIndex < shortsList.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else {
      // Loop back to start
      setActiveIndex(0);
    }
  };

  const handlePrev = () => {
    if (shortsList.length === 0) return;
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    } else {
      // Loop to end
      setActiveIndex(shortsList.length - 1);
    }
  };

  const handleCopyLink = (shortId: string) => {
    const url = `${window.location.origin}/?v=${shortId}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    });
  };

  const activeShort = useMemo(() => {
    return shortsList[activeIndex] || null;
  }, [shortsList, activeIndex]);

  // When active short loads, trigger telemetry increment views
  useEffect(() => {
    if (activeShort) {
      incrementViews(activeShort.id);
    }
  }, [activeShort?.id]);

  if (shortsList.length === 0 || !activeShort) {
    return (
      <div className="min-h-screen bg-black text-stone-400 flex items-center justify-center font-cinzel">
        Loading Spiritual Reel Shorts...
      </div>
    );
  }

  const isFav = favorites.includes(activeShort.id);

  return (
    <div className="min-h-screen bg-black text-stone-100 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#1C0F02] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-stone-950/80 to-transparent pointer-events-none z-10" />
      <div className="absolute top-1/4 left-[-10%] w-[40%] h-[40%] rounded-full bg-[#7C5110]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[40%] h-[40%] rounded-full bg-[#C29B47]/10 blur-[100px] pointer-events-none" />

      {/* HEADER BAR */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-24 pb-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/media')}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-[#C29B47] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#C29B47]" /> Media Center
        </button>

        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-red-500 fill-current animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-mono text-[#E9C269] uppercase font-bold">
            LEO Family Shorts
          </span>
        </div>
      </div>

      {/* SHORTS SWIPER ENGINE CONTAINER */}
      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        
        {/* Navigation arrow buttons */}
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          <button
            onClick={handlePrev}
            aria-label="Previous Short"
            className="p-3 bg-stone-900 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-full transition-all cursor-pointer shadow-lg"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            aria-label="Next Short"
            className="p-3 bg-stone-900 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-full transition-all cursor-pointer shadow-lg"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Swipe-able dynamic viewport card */}
        <div ref={containerRef} className="relative w-full max-w-[340px] md:max-w-[360px] aspect-[9/16] bg-[#0E0601] border border-[#C29B47]/15 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] flex flex-col justify-end">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeShort.id}
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -150 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              className="absolute inset-0 w-full h-full"
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeShort.youtubeId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${activeShort.youtubeId}`}
                title={activeShort.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full pointer-events-auto"
                style={{ height: '100%', objectFit: 'cover' }}
              />

              {/* Dark luxury content gradient layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40 pointer-events-none z-10" />

              {/* Floating control buttons */}
              <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-5 items-center">
                <button
                  onClick={() => handleCopyLink(activeShort.id)}
                  aria-label="Share Link"
                  className="w-11 h-11 rounded-full bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-[#C29B47] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => toggleFavorite(activeShort.id)}
                    aria-label="Like"
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                      isFav 
                        ? "bg-rose-600 text-white" 
                        : "bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-rose-500"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFav ? "fill-current text-white" : ""}`} />
                  </button>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {new Intl.NumberFormat().format(Math.round((activeShort.viewCount || 0) * 0.12))}
                  </span>
                </div>

                <button
                  onClick={() => openPlayer(activeShort)}
                  aria-label="Expand Cinema Lightbox"
                  className="w-11 h-11 rounded-full bg-[#C29B47] text-stone-950 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                  <Play className="w-5 h-5 fill-current text-stone-950 ml-0.5" />
                </button>
              </div>

              {/* Bottom detailed information panel over short */}
              <div className="absolute bottom-6 left-6 right-16 z-20 text-left space-y-3 pointer-events-none">
                <div className="flex flex-wrap gap-1.5">
                  {activeShort.tags && activeShort.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-[#C29B47]/15 border border-[#C29B47]/20 text-[#E9C269] text-[9px] font-bold uppercase tracking-wider rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-stone-100 text-sm font-bold tracking-wide leading-relaxed font-cinzel line-clamp-3">
                  "{activeShort.description}"
                </p>

                <div className="border-t border-stone-800/60 pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-300">{activeShort.speaker}</span>
                  <span className="text-[9px] text-stone-500">{activeShort.location}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Share Toast Notification */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100000] px-5 py-3 bg-[#C29B47] text-stone-950 font-bold tracking-wide rounded-xl shadow-2xl flex items-center gap-2 text-xs"
          >
            <Check className="w-4 h-4 text-stone-950" />
            Short link copied to Clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
