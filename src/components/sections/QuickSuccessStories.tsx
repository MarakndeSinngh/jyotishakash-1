import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Sparkles, ChevronLeft, ChevronRight, Search, 
  Settings, Check, Volume2, Share2, GraduationCap, 
  Calendar, MapPin, Clock, ArrowRight, UserCheck, Film, Layers, AlertCircle,
  Eye, Activity, Flame, BarChart3, Star
} from 'lucide-react';
import { useMedia } from '../../media/MediaProvider';
import { useReviews } from '../../media/MediaHooks';
import { createDynamicStory } from '../../media/MediaHelpers';
import { YoutubeThumbnail } from '../common/YoutubeThumbnail';

// Define the filter categories requested
const CATEGORIES = [
  "All",
  "Numerology",
  "Astrology",
  "Vastu",
  "Relationships",
  "Business",
  "Meditation",
  "Student Reviews",
  "Success Stories",
  "Motivational",
  "Latest"
];

export default function QuickSuccessStories() {
  const { 
    items, 
    addMediaItem, 
    deleteMediaItem, 
    incrementViews, 
    openPlayer,
    resetToDefault
  } = useMedia();

  // Retrieve student success reviews/stories using our centralized hook
  const reviewsPool = useReviews();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [metricToSortBy, setMetricToSortBy] = useState<'views' | 'watchTime'>('views');
  const [showShareToast, setShowShareToast] = useState(false);

  // Admin/CMS panel toggle & inputs
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminUrl, setAdminUrl] = useState("");
  const [adminTitle, setAdminTitle] = useState("");
  const [adminCategory, setAdminCategory] = useState("Numerology");
  const [adminDescription, setAdminDescription] = useState("");
  const [adminFeatured, setAdminFeatured] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState(false);

  // Carousel scroll ref for mobile/tablet carousels
  const carouselRef = useRef<HTMLDivElement>(null);

  // Trigger when a story is clicked to open our beautiful Cinema Player and increment telemetry view count
  const handleOpenCinema = (storyId: string) => {
    const item = items.find(i => i.id === storyId);
    if (item) {
      incrementViews(storyId);
      openPlayer(item);
    }
  };

  // Admin Create Handler
  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUrl || !adminTitle) return;

    // Create a robust MediaItem object using our central Helper
    const newMediaItem = createDynamicStory({
      youtubeUrl: adminUrl,
      title: adminTitle,
      category: adminCategory,
      description: adminDescription,
      featured: adminFeatured,
      collection: ['success-stories']
    });

    // Save to centralized Media library database
    addMediaItem(newMediaItem);

    // Reset Form
    setAdminUrl("");
    setAdminTitle("");
    setAdminDescription("");
    setAdminFeatured(false);
    setAdminSuccess(true);
    setTimeout(() => setAdminSuccess(false), 3000);
  };

  // Delete Story (Admin Action)
  const handleDeleteStory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this success story?")) {
      deleteMediaItem(id);
    }
  };

  // Reset to original registry
  const handleResetRegistry = () => {
    if (window.confirm("This will reset the entire media center to the original pre-seeded registry. Proceed?")) {
      resetToDefault();
    }
  };

  // Search and Filter Logic specifically mapped to success stories pool
  const filteredStories = useMemo(() => {
    return reviewsPool.filter(story => {
      // 1. Category check
      if (selectedCategory !== "All") {
        if (selectedCategory === "Latest") {
          // Handled during sorting below
        } else if (selectedCategory === "Success Stories") {
          const isSuccessStory = story.collection.includes("success-stories") || 
                                 story.category === "Student Success Stories" || 
                                 story.tags.some(t => t.toLowerCase() === "success stories");
          if (!isSuccessStory) return false;
        } else if (selectedCategory === "Student Reviews") {
          const isStudentReview = story.collection.includes("student-reviews") || 
                                  story.category === "Student Success Stories" || 
                                  story.tags.some(t => t.toLowerCase() === "student reviews");
          if (!isStudentReview) return false;
        } else {
          if (story.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }
      }

      // 2. Search query check
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const inTitle = story.title.toLowerCase().includes(q);
        const inDesc = story.description.toLowerCase().includes(q);
        const inCategory = story.category.toLowerCase().includes(q);
        const inSpeaker = story.speaker?.toLowerCase().includes(q) || false;
        const inTags = story.tags.some(t => t.toLowerCase().includes(q));
        
        if (!inTitle && !inDesc && !inCategory && !inSpeaker && !inTags) return false;
      }

      return true;
    });
  }, [reviewsPool, selectedCategory, searchQuery]);

  // Sort by date if "Latest" is selected
  const displayStories = useMemo(() => {
    if (selectedCategory === "Latest") {
      return [...filteredStories].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    }
    return filteredStories;
  }, [filteredStories, selectedCategory]);

  // Carousel navigation for mobile
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Copy Video URL for sharing
  const handleShare = (youtubeUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(youtubeUrl).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    });
  };

  // Retrieve top 3 most popular stories for the live telemetry widget
  const top3Popular = useMemo(() => {
    return [...reviewsPool]
      .sort((a, b) => {
        if (metricToSortBy === 'views') {
          return (b.viewCount || 0) - (a.viewCount || 0);
        } else {
          return (b.watchTime || 0) - (a.watchTime || 0);
        }
      })
      .slice(0, 3);
  }, [reviewsPool, metricToSortBy]);

  const maxMetricValue = useMemo(() => {
    const values = top3Popular.map(s => (metricToSortBy === 'views' ? (s.viewCount || 0) : (s.watchTime || 0)));
    return Math.max(...values, 1);
  }, [top3Popular, metricToSortBy]);

  return (
    <div className="w-full relative py-12" id="success-stories-section">
      
      {/* ==================================================
          SECTION HEADER
          ================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C29B47] font-extrabold block mb-1">
            LEO FAMILY TRANSFORMATIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-stone-100 tracking-tight">
            Quick Success Stories
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm font-sans mt-2 max-w-xl">
            A premium curation of living client transformations. Watch real individuals reclaim their cosmic alignments.
          </p>
        </div>

        {/* Search Bar & Admin Panel Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search by student, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-stone-900/60 border border-stone-800 focus:border-[#C29B47]/40 text-stone-200 text-xs rounded-xl focus:outline-none w-full sm:w-64 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              isAdminOpen 
                ? 'bg-[#C29B47] text-stone-950 border-[#C29B47]' 
                : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-stone-700'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>CMS Story Engine</span>
          </button>
        </div>
      </div>

      {/* ==================================================
          REAL-TIME TRANSFORMATION TELEMETRY (TOP 3 POPULAR STORIES)
          ================================================== */}
      <div className="mb-10 p-6 bg-gradient-to-r from-stone-950 via-stone-900/60 to-stone-950 border border-stone-800/80 rounded-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-[#C29B47]/5 blur-[60px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-[#C29B47]/3 blur-[60px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C29B47] flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> LIVE TRANSFORMATION TELEMETRY
              </span>
            </div>
            <h4 className="text-sm font-bold font-cinzel text-stone-100 flex items-center gap-2">
              Most Popular Student Breakthroughs
            </h4>
            <p className="text-stone-400 text-[11px] max-w-xl">
              Real-time student impact metrics. Play any trending success story below to automatically update the dashboard telemetry.
            </p>
          </div>

          {/* Metric Selector Toggle Pills */}
          <div className="flex bg-stone-950/80 border border-stone-800 p-1 rounded-xl self-start lg:self-center">
            <button
              onClick={() => setMetricToSortBy('views')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                metricToSortBy === 'views'
                  ? 'bg-[#C29B47] text-stone-950 shadow-[0_2px_8px_rgba(194,155,71,0.2)]'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Total Views</span>
            </button>
            <button
              onClick={() => setMetricToSortBy('watchTime')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                metricToSortBy === 'watchTime'
                  ? 'bg-[#C29B47] text-stone-950 shadow-[0_2px_8px_rgba(194,155,71,0.2)]'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Watch Duration</span>
            </button>
          </div>
        </div>

        {/* Dynamic Top 3 popular story list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3Popular.map((story, index) => {
            const metricValue = metricToSortBy === 'views' ? (story.viewCount || 0) : (story.watchTime || 0);
            const pctOfMax = Math.min((metricValue / maxMetricValue) * 100, 100);
            const isYt = story.youtubeUrl.includes('youtube.com') || story.youtubeUrl.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(story.youtubeUrl);

            const rankConfigs = [
              {
                badgeBg: "bg-gradient-to-tr from-[#C29B47] to-[#FCE9B3]",
                badgeText: "text-stone-950",
                label: "🥇 CHAMPION",
                borderHover: "hover:border-[#C29B47]/40 hover:shadow-[#C29B47]/5"
              },
              {
                badgeBg: "bg-gradient-to-tr from-stone-400 to-stone-100",
                badgeText: "text-stone-950",
                label: "🥈 RUNNER UP",
                borderHover: "hover:border-stone-400/30 hover:shadow-stone-400/5"
              },
              {
                badgeBg: "bg-gradient-to-tr from-amber-700 to-amber-500",
                badgeText: "text-white",
                label: "🥉 CONTENDER",
                borderHover: "hover:border-amber-700/30 hover:shadow-amber-700/5"
              }
            ];
            const config = rankConfigs[index] || rankConfigs[2];

            return (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => handleOpenCinema(story.id)}
                className={`p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl flex items-start gap-4 cursor-pointer select-none text-left transition-all relative group ${config.borderHover}`}
              >
                <div className="w-20 aspect-video shrink-0 bg-stone-900 rounded-lg overflow-hidden relative border border-stone-800/60 shadow-lg">
                  {isYt ? (
                    <YoutubeThumbnail
                      url={story.youtubeUrl}
                      aspectRatio="video"
                      showPlayButton={false}
                      hoverEffect={false}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Film className="w-5 h-5 text-stone-700 m-auto" />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60" />

                  <div className={`absolute top-1 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-extrabold font-mono tracking-wider shadow-md ${config.badgeBg} ${config.badgeText}`}>
                    #{index + 1}
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="w-3.5 h-3.5 text-[#C29B47] fill-current" />
                  </div>
                </div>

                <div className="space-y-1.5 flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[8px] uppercase tracking-wider text-[#C29B47] font-extrabold font-mono">{story.category}</span>
                    <span className="text-[8px] text-stone-500 font-bold font-mono uppercase">{story.duration}</span>
                  </div>

                  <h5 className="text-[11px] font-bold text-stone-200 font-cinzel truncate group-hover:text-[#E9C269] transition-colors leading-tight">
                    {story.title}
                  </h5>

                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between text-stone-400">
                      <span className="text-[9px] font-semibold text-stone-500">
                        {metricToSortBy === 'views' ? 'Engagement' : 'Attention Span'}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#E9C269] flex items-center gap-0.5">
                        {metricToSortBy === 'views' ? (
                          <>
                            <Eye className="w-3 h-3 shrink-0" />
                            {new Intl.NumberFormat().format(story.viewCount || 0)} views
                          </>
                        ) : (
                          <>
                            <Flame className="w-3 h-3 shrink-0 text-amber-500" />
                            {new Intl.NumberFormat().format(Math.round(story.watchTime || 0))} mins
                          </>
                        )}
                      </span>
                    </div>

                    <div className="w-full bg-stone-900/80 h-1 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pctOfMax}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          index === 0
                            ? 'bg-gradient-to-r from-[#7C5110] to-[#C29B47]'
                            : index === 1
                            ? 'bg-stone-400'
                            : 'bg-amber-700'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ==================================================
          CMS STORY ENGINE PANEL (ADMIN FORM)
          ================================================== */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-10 text-left"
          >
            <div className="p-6 bg-[#0E0601] border border-[#C29B47]/20 rounded-2xl relative shadow-2xl">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={handleResetRegistry}
                  className="text-[9px] uppercase tracking-wider text-red-400 hover:text-red-300 font-mono underline cursor-pointer"
                >
                  Reset all library data
                </button>
              </div>

              <h4 className="text-sm font-bold font-cinzel text-[#E9C269] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C29B47]" /> Create & Add New Transformation Story
              </h4>

              <form onSubmit={handleAddStory} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1 font-bold">YouTube URL / Share Link</label>
                    <input
                      type="url"
                      required
                      placeholder="https://youtube.com/watch?v=... or https://youtube.com/shorts/..."
                      value={adminUrl}
                      onChange={(e) => setAdminUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 focus:border-[#C29B47]/30 text-stone-200 text-xs rounded-xl focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1 font-bold">Story Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma's Career Breakthrough"
                      value={adminTitle}
                      onChange={(e) => setAdminTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 focus:border-[#C29B47]/30 text-stone-200 text-xs rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1 font-bold">Primary Category</label>
                      <select
                        value={adminCategory}
                        onChange={(e) => setAdminCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 focus:border-[#C29B47]/30 text-stone-200 text-xs rounded-xl focus:outline-none cursor-pointer"
                      >
                        {CATEGORIES.filter(c => c !== "All" && c !== "Latest" && c !== "Success Stories").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center pt-5">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={adminFeatured}
                        onChange={(e) => setAdminFeatured(e.target.checked)}
                        className="w-4 h-4 text-[#C29B47] bg-stone-950 border-stone-800 rounded focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor="featured" className="ml-2 text-xs text-stone-300 font-bold uppercase tracking-wider cursor-pointer select-none">
                        Featured Card?
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1 font-bold">Transformation Description</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Provide a concise description of the student's background, active issue, applied remediation, and ultimate professional success."
                      value={adminDescription}
                      onChange={(e) => setAdminDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 focus:border-[#C29B47]/30 text-stone-200 text-xs rounded-xl focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#C29B47] hover:bg-[#FCE9B3] text-stone-950 font-extrabold uppercase tracking-widest text-[10px] rounded-xl transition-all cursor-pointer flex-grow text-center animate-pulse"
                    >
                      Publish Story
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdminOpen(false)}
                      className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>

              {adminSuccess && (
                <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" /> Story parsed and created successfully with automated thumbnails and meta properties!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================
          FILTER CLIPS (TABS)
          ================================================== */}
      <div className="flex items-center justify-between border-b border-stone-800/60 pb-4 mb-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 pr-4 max-w-full">
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#C29B47] text-stone-950 shadow-[0_4px_12px_rgba(194,155,71,0.25)]"
                    : "bg-stone-900/50 text-stone-400 hover:text-stone-200 border border-stone-800/80 hover:border-stone-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Carousel Navigation */}
        <div className="hidden sm:flex gap-1.5">
          <button
            onClick={() => scrollCarousel('left')}
            className="p-2 bg-stone-900 border border-stone-800/80 hover:border-[#C29B47]/30 text-stone-400 hover:text-stone-200 rounded-full cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollCarousel('right')}
            className="p-2 bg-stone-900 border border-stone-800/80 hover:border-[#C29B47]/30 text-stone-400 hover:text-stone-200 rounded-full cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ==================================================
          MAIN CONTENT GALLERY
          ================================================== */}
      {displayStories.length === 0 ? (
        <div className="p-12 text-center bg-stone-950/40 border border-stone-900 rounded-2xl flex flex-col items-center gap-3">
          <AlertCircle className="w-10 h-10 text-stone-600" />
          <h4 className="text-sm font-bold font-cinzel text-stone-400">No matching success stories found</h4>
          <p className="text-xs text-stone-500">Try clearing search terms or selecting another category.</p>
          <button 
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            className="mt-2 text-xs text-[#C29B47] font-bold underline font-mono cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          {/* NETFLIX-STYLE PREMIUM GRID (DESKTOP & TABLET) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStories.map((story) => {
              const isYoutube = story.youtubeUrl.includes('youtube.com') || story.youtubeUrl.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(story.youtubeUrl);
              return (
                <motion.div
                  key={story.id}
                  layout
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-[#0E0601] border border-stone-900 hover:border-[#C29B47]/35 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between h-full cursor-pointer"
                  onClick={() => handleOpenCinema(story.id)}
                >
                  {/* Thumbnail / Video Artwork */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    {isYoutube ? (
                      <YoutubeThumbnail
                        url={story.youtubeUrl}
                        aspectRatio="video"
                        showPlayButton={true}
                        hoverEffect={true}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="relative w-full h-full aspect-video bg-stone-950 flex items-center justify-center">
                        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
                          {story.youtubeUrl.includes('instagram.com') ? (
                            <Film className="w-10 h-10 text-[#C29B47]/40" />
                          ) : (
                            <Layers className="w-10 h-10 text-[#C29B47]/40" />
                          )}
                        </div>
                        <span className="absolute bottom-2 right-2 text-[8px] bg-stone-900 px-1.5 py-0.5 rounded text-stone-400 font-mono">
                          {story.youtubeUrl.includes('instagram.com') ? 'Instagram Reel' : 'Social Video'}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-10 h-10 rounded-full bg-[#C29B47] text-stone-950 flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Ribbon badges */}
                    <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 bg-stone-950/80 border border-stone-800 text-[#C29B47] text-[8px] font-extrabold uppercase tracking-wider rounded">
                        {story.category}
                      </span>
                      {story.featured && (
                        <span className="px-2 py-0.5 bg-[#C29B47] text-stone-950 text-[8px] font-extrabold uppercase tracking-wider rounded flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5 fill-current" /> FEAT
                        </span>
                      )}
                    </div>

                    {/* Admin Delete Action Inside Thumbnail */}
                    {isAdminOpen && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteStory(story.id); }}
                        className="absolute top-3 right-3 z-30 p-1.5 bg-red-950/90 hover:bg-red-900 border border-red-500/20 text-red-400 hover:text-white rounded-lg transition-all cursor-pointer"
                        title="Delete Story"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Details Card Content */}
                  <div className="p-4 flex-grow flex flex-col justify-between text-left space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-stone-100 group-hover:text-[#E9C269] line-clamp-2 leading-snug transition-colors font-cinzel">
                        {story.title}
                      </h4>
                      <p className="text-stone-400 text-[11px] line-clamp-2 leading-relaxed font-sans">
                        {story.description}
                      </p>
                    </div>

                    <div className="border-t border-stone-900 pt-3 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1 text-[#E9C269] font-bold">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{story.speaker || "Verified Scholar"}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <Clock className="w-3 h-3" />
                        <span>{story.duration || "5 Min"}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* SMOOTH HORIZONTAL CAROUSEL (MOBILE PORTRAIT ONLY) */}
          <div className="md:hidden relative">
            <div
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory touch-pan-x"
            >
              {displayStories.map((story) => {
                const isYoutube = story.youtubeUrl.includes('youtube.com') || story.youtubeUrl.includes('youtu.be') || /^[a-zA-Z0-9_-]{11}$/.test(story.youtubeUrl);
                return (
                  <div
                    key={story.id}
                    className="min-w-[290px] max-w-[310px] snap-start bg-[#0E0601] border border-stone-900 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer"
                    onClick={() => handleOpenCinema(story.id)}
                  >
                    <div className="relative aspect-video">
                      {isYoutube ? (
                        <YoutubeThumbnail
                          url={story.youtubeUrl}
                          aspectRatio="video"
                          showPlayButton={true}
                          hoverEffect={false}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full bg-stone-950 flex items-center justify-center">
                          <Film className="w-8 h-8 text-[#C29B47]/20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-[#C29B47] text-stone-950 flex items-center justify-center">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5 z-20 flex gap-1">
                        <span className="px-2 py-0.5 bg-stone-950/80 border border-stone-800 text-[#C29B47] text-[8px] font-extrabold uppercase tracking-wider rounded">
                          {story.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 text-left">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-stone-100 font-cinzel line-clamp-2">
                          {story.title}
                        </h4>
                        <p className="text-stone-400 text-[10px] line-clamp-2">
                          {story.description}
                        </p>
                      </div>

                      <div className="border-t border-stone-900 pt-2.5 flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#E9C269]">{story.speaker || "Verified Scholar"}</span>
                        <span className="text-stone-500">{story.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center text-[10px] text-stone-500 font-mono mt-4">
              Swipe horizontally to browse {displayStories.length} stories
            </div>
          </div>
        </>
      )}

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
            Story Link Copied to Clipboard Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
