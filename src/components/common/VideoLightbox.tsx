import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Share2, Maximize2, Minimize2, 
  ExternalLink, Youtube, Sparkles, Volume2, Info, Check
} from 'lucide-react';
import { parseYoutubeUrl } from '../../utils/youtube';

export interface VideoItem {
  url: string;
  title?: string;
  channelName?: string;
}

interface VideoLightboxContextType {
  isOpen: boolean;
  currentVideo: VideoItem | null;
  videoList: VideoItem[];
  currentIndex: number;
  openLightbox: (url: string, title?: string, channelName?: string, siblings?: VideoItem[]) => void;
  closeLightbox: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const VideoLightboxContext = createContext<VideoLightboxContextType | undefined>(undefined);

export const useVideoLightbox = () => {
  const context = useContext(VideoLightboxContext);
  if (!context) {
    throw new Error('useVideoLightbox must be used within a VideoLightboxProvider');
  }
  return context;
};

export const VideoLightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollPositionRef = useRef<number>(0);

  const openLightbox = (url: string, title?: string, channelName?: string, siblings?: VideoItem[]) => {
    // 1. Save exact scroll position
    scrollPositionRef.current = window.scrollY;

    const currentItem: VideoItem = { url, title, channelName };
    
    if (siblings && siblings.length > 0) {
      setVideoList(siblings);
      const foundIdx = siblings.findIndex(item => item.url === url);
      setCurrentIndex(foundIdx >= 0 ? foundIdx : 0);
      setCurrentVideo(foundIdx >= 0 ? siblings[foundIdx] : currentItem);
    } else {
      setVideoList([currentItem]);
      setCurrentIndex(0);
      setCurrentVideo(currentItem);
    }
    
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    // Timeout to match exit animations before clearing active video
    setTimeout(() => {
      setCurrentVideo(null);
      setVideoList([]);
      setCurrentIndex(0);
      
      // Verify scroll position is completely restored
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: 'auto'
      });
    }, 300);
  };

  const playNext = () => {
    if (videoList.length <= 1) return;
    const nextIdx = (currentIndex + 1) % videoList.length;
    setCurrentIndex(nextIdx);
    setCurrentVideo(videoList[nextIdx]);
  };

  const playPrevious = () => {
    if (videoList.length <= 1) return;
    const prevIdx = (currentIndex - 1 + videoList.length) % videoList.length;
    setCurrentIndex(prevIdx);
    setCurrentVideo(videoList[prevIdx]);
  };

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Extra touch guard for iOS devices
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  return (
    <VideoLightboxContext.Provider 
      value={{
        isOpen,
        currentVideo,
        videoList,
        currentIndex,
        openLightbox,
        closeLightbox,
        playNext,
        playPrevious
      }}
    >
      {children}
      <VideoLightboxComponent />
    </VideoLightboxContext.Provider>
  );
};

const VideoLightboxComponent: React.FC = () => {
  const { 
    isOpen, 
    currentVideo, 
    videoList, 
    currentIndex, 
    closeLightbox, 
    playNext, 
    playPrevious 
  } = useVideoLightbox();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  // Swipe-to-close touch tracking
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
      setDragOffset(0);
      return;
    }

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        playNext();
      } else if (e.key === 'ArrowLeft') {
        playPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, videoList]);

  if (!isOpen || !currentVideo) return null;

  const parsed = parseYoutubeUrl(currentVideo.url);
  
  // Construct a beautiful privacy-enhanced YouTube Embed URL
  let embedUrl = '';
  if (parsed.type === 'playlist') {
    embedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${parsed.id}&autoplay=1&rel=0&enablejsapi=1&showinfo=0&controls=1`;
  } else if (parsed.type === 'shorts' || parsed.type === 'video') {
    embedUrl = `https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=1&rel=0&enablejsapi=1&showinfo=0&controls=1`;
  } else {
    // Custom URL or unparseable - directly fallback to YouTube Embed
    embedUrl = `https://www.youtube-nocookie.com/embed/${parsed.id || 'RcmLxAECJAc'}?autoplay=1&rel=0&enablejsapi=1`;
  }

  // Handle sharing
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentVideo.title || 'LEO Family Transformation Story',
          text: `Watch this student review: ${currentVideo.title}`,
          url: currentVideo.url,
        });
      } else {
        await navigator.clipboard.writeText(currentVideo.url);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      }
    } catch (err) {
      // Fallback paste to clipboard
      try {
        await navigator.clipboard.writeText(currentVideo.url);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      } catch (innerErr) {
        console.warn('Share/Clipboard failed:', innerErr);
      }
    }
  };

  // Toggle fullscreen mode on containerRef
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Sync state on native fullscreen change event (e.g. ESC button press from OS fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Touch Swipe-to-Close Listeners
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentY.current = e.touches[0].clientY;
    const deltaY = touchCurrentY.current - touchStartY.current;
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 140) {
      closeLightbox();
    } else {
      // Reset back with smooth bounce
      setDragOffset(0);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-stone-950/95 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center p-3 sm:p-6 select-none"
        style={{
          y: dragOffset,
          transition: dragOffset === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft Radial Gold background ambience like cinema lights */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,155,71,0.06)_0%,_transparent_75%)] pointer-events-none z-0" />

        {/* Swipe indicator for mobile */}
        <div className="absolute top-2 w-12 h-1 bg-stone-700 rounded-full sm:hidden z-10 opacity-60" />

        <div className="relative w-full max-w-5xl z-10 flex flex-col gap-4">
          
          {/* ==================================================
              HEADER & META INFORMATION
              ================================================== */}
          <div className="flex items-center justify-between gap-4 border-b border-[#C29B47]/15 pb-4 px-1">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C29B47] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C29B47] animate-pulse" />
                {currentVideo.channelName || 'LEO Family Network'}
              </span>
              <h3 className="text-sm sm:text-base md:text-lg font-cinzel font-bold text-stone-100 line-clamp-1">
                {currentVideo.title || 'Verification Success Story'}
              </h3>
            </div>

            {/* Top Toolbar Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleShare}
                aria-label="Share Video"
                className="p-2 sm:p-2.5 bg-stone-900/80 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-full transition-all duration-300 cursor-pointer"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); window.open(currentVideo.url, '_blank'); }}
                aria-label="Open on YouTube"
                className="p-2 sm:p-2.5 bg-stone-900/80 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-full transition-all duration-300 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="p-2 sm:p-2.5 bg-stone-900/80 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-full transition-all duration-300 cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                aria-label="Close Lightbox"
                className="p-2 sm:p-2.5 bg-stone-900/80 border border-stone-800 hover:border-red-500/40 text-stone-400 hover:text-red-400 rounded-full transition-all duration-300 cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* ==================================================
              MAIN COGNITIVE THEATRE (THE PLAYER FRAME)
              ================================================== */}
          <div className="relative flex items-center justify-center">
            
            {/* Sibling Previous Navigation button (desktop only) */}
            {videoList.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); playPrevious(); }}
                aria-label="Previous Video"
                className="absolute left-[-20px] sm:left-[-55px] p-3 sm:p-4 bg-stone-900/80 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-full transition-all duration-300 z-10 hover:scale-105 cursor-pointer hidden md:flex items-center justify-center shadow-xl"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            <motion.div
              ref={playerWrapperRef}
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-video bg-black rounded-2xl md:rounded-[2rem] overflow-hidden border border-[#C29B47]/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
            >
              <iframe
                src={embedUrl}
                title={currentVideo.title || "LEO Family Media Screen"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>

            {/* Sibling Next Navigation button (desktop only) */}
            {videoList.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); playNext(); }}
                aria-label="Next Video"
                className="absolute right-[-20px] sm:right-[-55px] p-3 sm:p-4 bg-stone-900/80 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-full transition-all duration-300 z-10 hover:scale-105 cursor-pointer hidden md:flex items-center justify-center shadow-xl"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* ==================================================
              MOBILE & FOOTER INTEGRATED CONTROLS
              ================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 px-1 text-stone-500 text-xs">
            
            {/* Navigation buttons for Mobile viewports */}
            {videoList.length > 1 && (
              <div className="flex items-center gap-3 md:hidden w-full sm:w-auto justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); playPrevious(); }}
                  className="flex items-center gap-1 px-4 py-2 bg-stone-900 border border-stone-800 text-stone-300 rounded-xl hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <span className="text-stone-400 font-mono">
                  {currentIndex + 1} / {videoList.length}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); playNext(); }}
                  className="flex items-center gap-1 px-4 py-2 bg-stone-900 border border-stone-800 text-stone-300 rounded-xl hover:text-white"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-1.5 select-none text-[10px] uppercase tracking-wider font-mono">
              <Volume2 className="w-3.5 h-3.5 text-[#C29B47]" />
              Autoplay Active • Privacy Enhanced Streaming
            </div>

            {videoList.length > 1 && (
              <div className="hidden md:flex items-center gap-1.5 text-stone-400 font-mono">
                Item <span className="text-[#C29B47] font-bold">{currentIndex + 1}</span> of {videoList.length} in collection
              </div>
            )}
          </div>
        </div>

        {/* Copy Success Toast */}
        <AnimatePresence>
          {showShareToast && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-12 z-[10000] px-5 py-3 bg-[#C29B47] text-stone-950 font-bold tracking-wide rounded-xl shadow-2xl flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-stone-950" />
              Link Copied to Clipboard Successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
