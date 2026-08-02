import React from 'react';
import { Search, Filter, RotateCcw, Sparkles } from 'lucide-react';
import { useCourseEngine } from '../../context/CourseEngineContext';
import { useAcademy } from '../../context/AcademyContext';
import { CourseLevel } from '../../types/course';

export const CourseSearchAndFilter: React.FC = () => {
  const { filters, setFilter, resetFilters, filteredCourses } = useCourseEngine();
  const { allAcademies } = useAcademy();

  const categories = ['All', 'Numerology', 'Astrology', 'Vastu', 'Spiritual Science'];
  const levels: (CourseLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  return (
    <div className="bg-card border border-border/15 rounded-2xl p-6 shadow-xl space-y-6 text-left">
      {/* Top Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-grow w-full">
          <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => setFilter('query', e.target.value)}
            placeholder="Search courses by title, keywords, or topics..."
            className="w-full bg-background border border-border/20 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary/50 transition-all font-sans"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
            Results: <strong className="text-primary">{filteredCourses.length}</strong>
          </span>
          <button
            onClick={resetFilters}
            className="p-2.5 rounded-xl bg-background border border-border/20 hover:border-primary/40 text-text-secondary hover:text-primary transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Row 1: Academy & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-border/10">
        
        {/* Academy Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary block font-cinzel">
            Academy Filter
          </label>
          <select
            value={filters.academyId}
            onChange={(e) => setFilter('academyId', e.target.value)}
            className="w-full bg-background border border-border/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            <option value="All">All Academies</option>
            {allAcademies.map(ac => (
              <option key={ac.id} value={ac.slug}>{ac.name}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary block font-cinzel">
            Subject Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
            className="w-full bg-background border border-border/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary block font-cinzel">
            Difficulty Level
          </label>
          <select
            value={filters.level}
            onChange={(e) => setFilter('level', e.target.value as any)}
            className="w-full bg-background border border-border/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            {levels.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary block font-cinzel">
            Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilter('sortBy', e.target.value as any)}
            className="w-full bg-background border border-border/20 rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

      </div>
    </div>
  );
};
