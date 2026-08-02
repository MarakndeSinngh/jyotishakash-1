import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Play, RotateCcw, Share2, Heart, Clock, ExternalLink, 
  ChevronLeft, ChevronRight, BookOpen, Volume2, Sparkles, Flame,
  Check, Youtube, Star, Eye
} from 'lucide-react';
import { useMedia } from './MediaProvider';
import { useRelatedMedia } from './MediaHooks';
import { YoutubeThumbnail } from '../components/common/YoutubeThumbnail';

export const MediaPlayer: React.FC = () => {
  const { 
    activeItem, 
    closePlayer, 
    items,
    openPlayer,
    favorites,
    watchLater,
    toggleFavorite,
    toggleWatchLater,
    addWatchTime
  } = useMedia();

  const [activeTab, setActiveTab] = useState<'details' | 'learnings'>('details');
  const [copied, setCopied] = useState(false);
  
  // Track simulation playback
  const [fakeProgress, setFakeProgress] = useState(12); // starts at a random percentage
  const [isPlayingSim, setIsPlayingSim] = useState(true);

  // Retrieve related items based on active item
  const relatedItems = useRelatedMedia(activeItem?.id || '', 6);

  // Dynamic watch time tracker (adds 0.1 minutes of active attention span every 6 seconds)
  useEffect(() => {
    if (!activeItem || !isPlayingSim) return;

    const interval = setInterval(() => {
      addWatchTime(activeItem.id, 0.1);
      setFakeProgress(prev => Math.min(prev + 1, 99));
    }, 6000);

    return () => clearInterval(interval);
  }, [activeItem?.id, isPlayingSim]);

  if (!activeItem) return null;

  const isYt = activeItem.youtubeUrl.includes('youtube.com') || activeItem.youtubeUrl.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(activeItem.youtubeUrl);
  
  // Navigate Previous/Next inside the active collection/feed pool
  const handlePrev = () => {
    const currentIdx = items.findIndex(s => s.id === activeItem.id);
    if (currentIdx > 0) {
      openPlayer(items[currentIdx - 1]);
    } else {
      openPlayer(items[items.length - 1]);
    }
  };

  const handleNext = () => {
    const currentIdx = items.findIndex(s => s.id === activeItem.id);
    if (currentIdx < items.length - 1) {
      openPlayer(items[currentIdx + 1]);
    } else {
      openPlayer(items[0]);
    }
  };

  // Share link copy
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/?v=${activeItem.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const isFavorite = favorites.includes(activeItem.id);
  const isWatchLater = watchLater.includes(activeItem.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6 lg:p-8">
        
        {/* Animated Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-stone-950 border border-stone-800 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:grid lg:grid-cols-12 h-full max-h-[90vh] relative"
        >
          {/* Close trigger top right */}
          <button 
            onClick={closePlayer}
            className="absolute top-4 right-4 z-50 bg-stone-900/85 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 p-2.5 rounded-full text-stone-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT PANEL: Cinema Player & Controls (8 Cols on Desktop) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-black h-full overflow-hidden relative">
            
            {/* The Cinematic Screen Wrapper */}
            <div className="relative aspect-video w-full bg-stone-950 flex items-center justify-center group overflow-hidden">
              {isYt ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeItem.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="text-center p-6 space-y-4">
                  <Youtube className="w-16 h-16 text-[#C29B47] mx-auto animate-pulse" />
                  <p className="text-stone-300 font-medium text-sm">Media Source Available on YouTube</p>
                  <a 
                    href={activeItem.youtubeUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C29B47] text-stone-950 px-4 py-2 rounded-xl text-xs font-extrabold hover:bg-[#E9C269] transition-all"
                  >
                    Open Link directly <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Engagement Heart/Watch Later small tags on screen top left */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="bg-stone-900/90 border border-stone-800 text-[#C29B47] text-[9px] font-extrabold uppercase px-2 py-1 rounded-md tracking-wider flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  {activeItem.category}
                </span>
                {activeItem.isShort && (
                  <span className="bg-red-950/95 border border-red-900/50 text-red-400 text-[9px] font-extrabold uppercase px-2 py-1 rounded-md tracking-wider flex items-center gap-1 shadow-md">
                    <Flame className="w-3 h-3 fill-current" />
                    REEL SHORT
                  </span>
                )}
              </div>
            </div>

            {/* Quick Cinema Bar: Prev / Next / Simulated Progress */}
            <div className="p-4 bg-stone-950 border-t border-stone-900 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                
                {/* Navigation Pills */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar and simulated status */}
                <div className="flex items-center gap-4 flex-grow max-w-xs md:max-w-md">
                  <div className="text-[10px] text-stone-500 font-bold font-mono uppercase tracking-wider hidden sm:block">
                    Attention Span Tracker:
                  </div>
                  <div className="flex-grow bg-stone-900 h-1.5 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C29B47] to-amber-500 transition-all duration-1000"
                      style={{ width: `${fakeProgress}%` }}
                    />
                  </div>
                  <button 
                    onClick={() => setIsPlayingSim(!isPlayingSim)}
                    className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C29B47]"
                  >
                    {isPlayingSim ? "● tracking" : "|| idle"}
                  </button>
                </div>

                {/* Open in YouTube pill */}
                <a 
                  href={activeItem.youtubeUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-stone-400 hover:text-red-500 transition-all flex items-center gap-1 text-[11px] font-bold font-mono"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="hidden sm:inline">EXTERNAL</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Details, Actions & Related Feed (4 Cols on Desktop) */}
          <div className="lg:col-span-4 bg-stone-950 border-l border-stone-900 flex flex-col justify-between h-full overflow-hidden">
            
            {/* Header section of Right panel */}
            <div className="p-5 border-b border-stone-900">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#C29B47] block mb-1">
                LEO FAMILY MEDIA CENTER
              </span>
              <h2 className="text-base font-bold text-stone-100 font-cinzel leading-snug line-clamp-2">
                {activeItem.title}
              </h2>
              {activeItem.speaker && (
                <p className="text-xs text-stone-400 mt-1 font-semibold flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#C29B47] fill-current" />
                  Speaker: <span className="text-stone-200">{activeItem.speaker}</span>
                  {activeItem.location && <span className="text-stone-500 font-normal">({activeItem.location})</span>}
                </p>
              )}
              {activeItem.instructor && (
                <p className="text-xs text-stone-400 mt-1 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C29B47]" />
                  Instructor: <span className="text-stone-200">{activeItem.instructor}</span>
                </p>
              )}
            </div>

            {/* Tab Selection (About vs Learnings) */}
            <div className="flex border-b border-stone-900/60 bg-stone-950 px-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-3 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeTab === 'details'
                    ? 'border-[#C29B47] text-[#C29B47]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                About Video
              </button>
              {activeItem.learnings && activeItem.learnings.length > 0 && (
                <button
                  onClick={() => setActiveTab('learnings')}
                  className={`py-2 px-3 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                    activeTab === 'learnings'
                      ? 'border-[#C29B47] text-[#C29B47]'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Key Learnings
                </button>
              )}
            </div>

            {/* Scrolling Core Content (Details or Related Feed) */}
            <div className="flex-grow overflow-y-auto p-5 space-y-5 custom-scrollbar">
              
              {activeTab === 'details' ? (
                <div className="space-y-4">
                  {/* Meta pill grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-stone-900/60 border border-stone-800/60 p-2 rounded-xl text-left">
                      <span className="text-[8px] font-extrabold text-stone-500 uppercase block tracking-wider">DURATION</span>
                      <span className="text-[11px] font-bold text-stone-300 font-mono">{activeItem.duration}</span>
                    </div>
                    <div className="bg-stone-900/60 border border-stone-800/60 p-2 rounded-xl text-left">
                      <span className="text-[8px] font-extrabold text-stone-500 uppercase block tracking-wider">LANGUAGE</span>
                      <span className="text-[11px] font-bold text-stone-300">{activeItem.language}</span>
                    </div>
                    <div className="bg-stone-900/60 border border-stone-800/60 p-2 rounded-xl text-left">
                      <span className="text-[8px] font-extrabold text-stone-500 uppercase block tracking-wider">PUBLISHED</span>
                      <span className="text-[11px] font-bold text-stone-300 font-mono">{activeItem.publishedDate}</span>
                    </div>
                    <div className="bg-stone-900/60 border border-stone-800/60 p-2 rounded-xl text-left">
                      <span className="text-[8px] font-extrabold text-stone-500 uppercase block tracking-wider">TELEMETRY</span>
                      <span className="text-[11px] font-bold text-[#E9C269] font-mono flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[#C29B47]" />
                        {new Intl.NumberFormat().format((activeItem.viewCount || 0) + 1)} Views
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-left">
                    <h4 className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest mb-1">SUMMARY</h4>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {activeItem.tags && activeItem.tags.length > 0 && (
                    <div className="text-left space-y-1">
                      <h4 className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest">TAGS</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.tags.map(tag => (
                          <span key={tag} className="bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-[#C29B47] text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors border border-stone-850">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-left">
                  <h4 className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C29B47]" /> WHAT YOU WILL GRASP
                  </h4>
                  <ul className="space-y-2.5">
                    {activeItem.learnings?.map((l, index) => (
                      <li key={index} className="flex gap-2.5 items-start text-xs text-stone-300 leading-relaxed">
                        <span className="w-5 h-5 bg-stone-900 text-[#C29B47] font-extrabold text-[10px] rounded-full flex items-center justify-center shrink-0 border border-stone-800 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related/Playlist list widget inside the sliding space */}
              <div className="border-t border-stone-900/80 pt-4 text-left">
                <h4 className="text-[10px] font-extrabold text-[#C29B47] uppercase tracking-[0.2em] mb-3">
                  NEXT FOR YOU (AUTO-RECOMMENDED)
                </h4>
                
                <div className="space-y-2.5">
                  {relatedItems.map(sibling => {
                    const isSiblingYt = sibling.youtubeUrl.includes('youtube.com') || sibling.youtubeUrl.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(sibling.youtubeUrl);
                    return (
                      <div
                        key={sibling.id}
                        onClick={() => openPlayer(sibling)}
                        className="bg-stone-900/45 border border-stone-900 hover:border-[#C29B47]/20 p-2 rounded-xl flex gap-3 items-center cursor-pointer select-none transition-all hover:scale-[1.01]"
                      >
                        <div className="w-16 aspect-video shrink-0 bg-stone-900 rounded-lg overflow-hidden relative border border-stone-800/40">
                          {isSiblingYt ? (
                            <YoutubeThumbnail
                              url={sibling.youtubeUrl}
                              aspectRatio="video"
                              showPlayButton={false}
                              hoverEffect={false}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Youtube className="w-4 h-4 text-stone-700 m-auto" />
                          )}
                          <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
                        </div>
                        <div className="min-w-0 flex-grow text-left">
                          <span className="text-[8px] font-extrabold text-[#C29B47] uppercase tracking-wider block mb-0.5">{sibling.category}</span>
                          <h5 className="text-[11px] font-bold text-stone-200 line-clamp-1 group-hover:text-[#E9C269]">
                            {sibling.title}
                          </h5>
                          <span className="text-[9px] text-stone-500 font-mono font-bold uppercase">{sibling.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Actions section (WhatsApp Consultation + Favorites / Watch Later / Share) */}
            <div className="p-4 bg-stone-950 border-t border-stone-900 space-y-3">
              
              {/* Core CTA: WhatsApp Consultation / Course enrollment link */}
              {activeItem.consultationLink && (
                <a
                  href={activeItem.consultationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-stone-950 fill-current animate-bounce" />
                  Connect for Consultation
                </a>
              )}

              {/* Functional Row: Share, Favorite, Watch Later */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleShare}
                  className="py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 rounded-xl text-[10px] font-bold uppercase tracking-wider text-stone-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </>
                  )}
                </button>
                <button
                  onClick={() => toggleFavorite(activeItem.id)}
                  className={`py-2.5 border rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-950/40 border-rose-900 text-rose-400'
                      : 'bg-stone-900 border-stone-800 hover:bg-stone-800 hover:border-stone-700 text-stone-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-rose-500' : ''}`} /> Fav
                </button>
                <button
                  onClick={() => toggleWatchLater(activeItem.id)}
                  className={`py-2.5 border rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isWatchLater
                      ? 'bg-amber-950/40 border-amber-900 text-amber-400'
                      : 'bg-stone-900 border-stone-800 hover:bg-stone-800 hover:border-stone-700 text-stone-300 hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> Later
                </button>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
