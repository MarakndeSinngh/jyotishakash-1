import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, SlidersHorizontal, Play, Volume2, Share2, ExternalLink, 
  ChevronLeft, ChevronRight, Clock, Sparkles, 
  BookOpen, Calendar, MessageSquare, Check, Bookmark, History, 
  TrendingUp, Heart, Award, Compass, HelpCircle, Info, ArrowLeft,
  Flame, Eye, User, Star, ThumbsUp, RotateCcw
} from 'lucide-react';
import { useMedia } from '../../media/MediaProvider';
import { useLatestVideos, useShorts, useContinueWatchingList } from '../../media/MediaHooks';
import { YoutubeThumbnail } from '../common/YoutubeThumbnail';

const MEDIA_CATEGORIES = [
  "All",
  "Numerology",
  "Astrology",
  "Vastu",
  "Remedies & Gemstones",
  "Meditation & Mantras",
  "Free Webinars & Guidance",
  "Student Success Stories"
];

export default function MediaCenterPage() {
  const { 
    items, 
    openPlayer, 
    favorites, 
    watchLater, 
    toggleFavorite, 
    toggleWatchLater 
  } = useMedia();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Newest');
  const [filterType, setFilterType] = useState<string>('All'); // 'All' | 'Student Reviews' | 'Courses' | 'Free'
  const [showShareToast, setShowShareToast] = useState(false);

  // Retrieve continue watching list using our smart centralized hook
  const continueWatchingList = useContinueWatchingList();

  // Retrieve short videos using our centralized hook
  const spiritualShorts = useShorts(8);

  // Filter & Search logic using full unified media items pool
  const filteredVideos = useMemo(() => {
    return items.filter(video => {
      // Exclude shorts from the main video gallery
      if (video.isShort) return false;

      // Category tab alignment
      if (activeTab !== 'All' && video.category !== activeTab) return false;

      // Global search string matches
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = video.title.toLowerCase().includes(q);
        const matchCat = video.category.toLowerCase().includes(q);
        const matchInst = video.instructor?.toLowerCase().includes(q) || video.speaker?.toLowerCase().includes(q) || false;
        const matchDesc = video.description.toLowerCase().includes(q);
        const matchTags = video.tags?.some(tag => tag.toLowerCase().includes(q));
        if (!matchTitle && !matchCat && !matchInst && !matchDesc && !matchTags) return false;
      }

      // Secondary filters
      if (filterType === 'Student Reviews') {
        return video.category === 'Student Success Stories' || video.collection.includes('student-reviews');
      } else if (filterType === 'Courses') {
        return !!video.relatedCourseId;
      } else if (filterType === 'Free') {
        return video.category.toLowerCase().includes('free') || video.category.toLowerCase().includes('webinar');
      }

      return true;
    });
  }, [items, activeTab, searchQuery, filterType]);

  // Sort logic
  const sortedVideos = useMemo(() => {
    return [...filteredVideos].sort((a, b) => {
      if (sortBy === 'Newest') {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      if (sortBy === 'Oldest') {
        return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
      }
      if (sortBy === 'Most Popular') {
        return (b.viewCount || 0) - (a.viewCount || 0);
      }
      return 0;
    });
  }, [filteredVideos, sortBy]);

  // Social trigger sharing copy
  const handleShareVideo = async (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    } catch (err) {
      console.warn('Share copy failed:', err);
    }
  };

  const featuredVideo = useMemo(() => {
    const nonShorts = items.filter(v => !v.isShort);
    return nonShorts.find(v => v.featured) || nonShorts[0];
  }, [items]);

  return (
    <div className="min-h-screen bg-[#1C0F02] text-stone-100 font-sans relative overflow-x-hidden pb-12">
      {/* Cinematic animated Maharaja Gold floating lights background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(194,155,71,0.08)_0%,_transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-[25%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#7C5110]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#A86E25]/10 blur-[120px] pointer-events-none" />

      {/* Embedded decorative sacred geometry line reflections */}
      <div className="absolute top-20 right-10 opacity-5 w-48 h-48 border border-[#C29B47] rounded-full pointer-events-none animate-spin-slow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28">

        <div className="space-y-12">
          {/* ==================================================
              CINEMATIC HERO HEADER
              ================================================== */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C29B47]/10 border border-[#C29B47]/20 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#E9C269] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E9C269]">
                LEO FAMILY KNOWLEDGE HUB
              </span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#C29B47] via-[#FCE9B3] to-[#C29B47] bg-clip-text text-transparent">
              LEO Family Media Center
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Watch inspiring teachings, student success stories, webinars, practical demonstrations, spiritual guidance, and transformational journeys—all in one place.
            </p>
          </div>

          {/* ==================================================
              CINEMATIC HERO VIDEO SLOT (MasterClass style)
              ================================================== */}
          {featuredVideo && (
            <div className="relative w-full rounded-[2rem] overflow-hidden border border-[#C29B47]/15 bg-gradient-to-b from-stone-900 to-stone-950 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Hero Thumbnail Preview Screen */}
                <div 
                  className="lg:col-span-7 relative aspect-video w-full overflow-hidden bg-[#0A0501] group cursor-pointer" 
                  onClick={() => openPlayer(featuredVideo)}
                >
                  <YoutubeThumbnail
                    url={featuredVideo.youtubeUrl}
                    aspectRatio="video"
                    className="w-full h-full opacity-70 group-hover:opacity-85 transition-opacity"
                    showPlayButton={true}
                    hoverEffect={true}
                    alt={featuredVideo.title}
                  />
                  {/* Premium Label */}
                  <span className="absolute top-4 left-4 z-20 bg-stone-950/85 border border-[#C29B47]/30 px-3 py-1.5 rounded-full text-[9px] text-[#E9C269] font-extrabold uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-sm">
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
                    FEATURED MASTERCLASS
                  </span>
                  <span className="absolute bottom-4 left-4 z-20 bg-stone-950/80 px-2.5 py-1 rounded text-[10px] text-stone-300 font-mono flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5 text-[#C29B47]" /> {featuredVideo.duration}
                  </span>
                </div>

                {/* Hero Information */}
                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-left space-y-6 relative border-t lg:border-t-0 lg:border-l border-[#C29B47]/15">
                  <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-[1px] pointer-events-none z-0" />
                  
                  <div className="relative z-10 space-y-4">
                    <span className="text-[10px] font-bold tracking-wider text-[#C29B47] uppercase block">
                      {featuredVideo.category} • Instructor: {featuredVideo.instructor || featuredVideo.speaker}
                    </span>
                    <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 tracking-wide line-clamp-2">
                      {featuredVideo.title}
                    </h2>
                    <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                      {featuredVideo.description}
                    </p>

                    <div className="flex items-center gap-6 text-[11px] text-stone-500 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#C29B47]" /> {new Intl.NumberFormat().format(featuredVideo.viewCount || 0)} Views
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Published: {featuredVideo.publishedDate}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-3 pt-4">
                    <button
                      onClick={() => openPlayer(featuredVideo)}
                      className="px-6 py-3 bg-[#C29B47] text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl hover:scale-[1.03] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" /> Watch Now
                    </button>
                    
                    <a
                      href="https://wa.me/919953713176"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-stone-900 border border-stone-800 hover:border-[#C29B47]/40 text-stone-300 font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-green-500" /> WhatsApp
                    </a>

                    <button
                      onClick={() => toggleWatchLater(featuredVideo.id)}
                      aria-label="Save to watch later"
                      className="p-3 bg-stone-900 border border-stone-800 hover:border-[#C29B47]/40 text-stone-400 hover:text-[#C29B47] rounded-xl transition-all cursor-pointer"
                    >
                      <Bookmark className={`w-4 h-4 ${watchLater.includes(featuredVideo.id) ? 'text-[#C29B47] fill-[#C29B47]' : ''}`} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==================================================
              SEARCH BAR & SMART FILTER MODULE
              ================================================== */}
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 sm:p-6 backdrop-blur-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Global Search input */}
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search teachings, success stories, keywords, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-[#C29B47]/50 rounded-xl py-3 pl-11 pr-4 text-sm text-stone-100 outline-none transition-all placeholder-stone-500 font-light"
                />
              </div>

              {/* Filter controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C29B47]" />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-stone-300 outline-none border-none cursor-pointer font-bold"
                  >
                    <option value="Newest" className="bg-stone-950 text-stone-100">Newest First</option>
                    <option value="Oldest" className="bg-stone-950 text-stone-100">Oldest First</option>
                    <option value="Most Popular" className="bg-stone-950 text-stone-100">Most Popular</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  {['All', 'Student Reviews', 'Courses', 'Free'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-2 text-xs rounded-xl font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                        filterType === type 
                          ? 'bg-[#C29B47] text-stone-950 border-[#C29B47]' 
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories Horizontal Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MEDIA_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 text-xs rounded-full font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === category 
                      ? 'bg-[#C29B47]/20 border border-[#C29B47] text-[#E9C269]' 
                      : 'bg-stone-950/40 hover:bg-stone-950 border border-stone-800/60 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ==================================================
              CONTINUE WATCHING & WATCH HISTORY
              ================================================== */}
          {continueWatchingList.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-mono text-[#E9C269] font-bold text-left">
                <History className="w-4 h-4 text-[#C29B47]" />
                Recently Viewed / Continue Watching
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {continueWatchingList.map(v => (
                  <div
                    key={v.id}
                    onClick={() => openPlayer(v)}
                    className="group bg-stone-950 border border-stone-900 rounded-xl overflow-hidden cursor-pointer shadow-md hover:border-[#C29B47]/30 transition-all duration-300"
                  >
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <YoutubeThumbnail url={v.youtubeUrl} showPlayButton={false} aspectRatio="video" />
                      <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-[#C29B47] fill-current" />
                      </div>
                      {/* Active Progress line */}
                      <div 
                        className="absolute bottom-0 left-0 h-1 bg-[#C29B47]" 
                        style={{ width: `${v.progress}%` }}
                      />
                    </div>
                    <div className="p-3 text-left">
                      <h4 className="text-xs font-bold font-cinzel text-stone-100 truncate">{v.title}</h4>
                      <div className="flex items-center justify-between text-[9px] text-stone-500 mt-0.5">
                        <span>{v.category}</span>
                        <span className="font-mono text-amber-500 font-bold">{v.progress}% watched</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              MAIN VIDEO CARD GRID
              ================================================== */}
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-2xl font-bold tracking-wide bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
                {activeTab === 'All' ? 'Complete Library Collection' : `${activeTab} Teachings`}
              </h3>
              <span className="text-xs text-stone-400 font-mono">
                Showing {sortedVideos.length} Video{sortedVideos.length !== 1 ? 's' : ''}
              </span>
            </div>

            {sortedVideos.length === 0 ? (
              <div className="text-center py-16 bg-stone-950/40 rounded-3xl border border-stone-900 flex flex-col items-center justify-center gap-4">
                <Compass className="w-12 h-12 text-[#C29B47]/40 animate-pulse" />
                <div className="space-y-1">
                  <p className="text-stone-400 font-semibold">No lessons found matching your filters</p>
                  <p className="text-stone-500 text-xs">Try selecting another category or adjusting your search phrase.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab('All'); setSearchQuery(''); setFilterType('All'); }}
                  className="px-4 py-2 bg-stone-900 border border-stone-800 text-[#C29B47] font-bold text-xs rounded-xl hover:bg-[#C29B47]/10 transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    layout
                    whileHover={{ y: -6 }}
                    onClick={() => openPlayer(video)}
                    className="group bg-stone-950 border border-stone-900 hover:border-[#C29B47]/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 cursor-pointer"
                  >
                    {/* Artwork Screen */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[#0A0501]">
                      <YoutubeThumbnail
                        url={video.youtubeUrl}
                        aspectRatio="video"
                        className="w-full h-full opacity-80 group-hover:opacity-100"
                        showPlayButton={true}
                        hoverEffect={true}
                        alt={video.title}
                      />
                      <span className="absolute bottom-3 left-3 z-20 bg-stone-950/80 px-2.5 py-1 rounded-full text-[9px] text-stone-300 font-mono flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#C29B47]" /> {video.duration}
                      </span>
                      
                      <div className="absolute top-3 right-3 z-20 flex gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWatchLater(video.id); }}
                          aria-label="Watch Later"
                          className="p-1.5 bg-stone-950/80 border border-stone-800 rounded-full text-stone-400 hover:text-[#C29B47] transition-all cursor-pointer"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${watchLater.includes(video.id) ? 'text-[#C29B47] fill-[#C29B47]' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(video.id); }}
                          aria-label="Add to Favorites"
                          className="p-1.5 bg-stone-950/80 border border-stone-800 rounded-full text-stone-400 hover:text-red-500 transition-all cursor-pointer"
                        >
                          <Heart className={`w-3.5 h-3.5 ${favorites.includes(video.id) ? 'text-red-500 fill-red-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Text Metadata */}
                    <div className="p-5 text-left flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#C29B47]">
                          {video.category}
                        </span>
                        <h4 className="font-cinzel text-base font-bold text-stone-100 group-hover:text-[#E9C269] line-clamp-2 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-stone-400 text-xs font-light leading-relaxed line-clamp-2">
                          {video.description}
                        </p>
                      </div>

                      <div className="border-t border-stone-900 mt-4 pt-4 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-[#C29B47]" /> {video.instructor || video.speaker}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {new Intl.NumberFormat().format(video.viewCount || 0)} Views
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* ==================================================
              SHORTS SHELF Viewport (TikTok/Reels scrollable rows)
              ================================================== */}
          <div className="space-y-6 text-left border-t border-stone-900 pt-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-500 fill-red-500 animate-bounce" />
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100">
                    Trending Spiritual Shorts
                  </h3>
                </div>
                <p className="text-xs text-stone-500 font-light">Short, high-impact stories from students worldwide. Swipe up/down style previews.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
              {spiritualShorts.map((short) => (
                <div
                  key={short.id}
                  onClick={() => openPlayer(short)}
                  className="min-w-[260px] max-w-[280px] snap-start group relative aspect-[9/16] bg-[#0A0501] border border-stone-900 hover:border-[#C29B47]/40 rounded-[2rem] overflow-hidden flex flex-col justify-between p-5 shadow-xl cursor-pointer transition-all duration-300"
                >
                  {/* Background Thumbnail preview */}
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity">
                    <YoutubeThumbnail url={short.youtubeUrl} showPlayButton={false} aspectRatio="shorts" />
                  </div>

                  {/* Top indicators */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="bg-red-600 text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Short
                    </span>
                    <span className="text-[9px] text-stone-400 bg-stone-950/60 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                      ♥ {short.viewCount ? Math.round(short.viewCount * 0.12) : 105} Likes
                    </span>
                  </div>

                  {/* Center Play Glow */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#C29B47] text-stone-950 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom overlay */}
                  <div className="relative z-10 space-y-2 text-left">
                    {short.tags && short.tags[0] && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C29B47] bg-[#C29B47]/10 border border-[#C29B47]/20 px-2.5 py-0.5 rounded">
                        {short.tags[0]}
                      </span>
                    )}
                    <p className="text-stone-100 text-xs font-bold leading-relaxed line-clamp-3 font-cinzel">
                      "{short.description}"
                    </p>
                    <div className="border-t border-stone-800/60 pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-stone-300">{short.speaker}</span>
                      <span className="text-[9px] text-stone-500">{short.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Share Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[10000] px-5 py-3 bg-[#C29B47] text-stone-950 font-bold tracking-wide rounded-xl shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-stone-950" />
            Link Copied to Clipboard Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
