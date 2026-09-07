import React from 'react';
import { useApp } from '../context/AppContext';
import { ScrollableOptionsBar } from './ScrollableOptionsBar';
import { 
  Search, 
  GraduationCap, 
  Users, 
  Globe2, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  UserPlus, 
  CalendarDays,
  ShieldCheck
} from 'lucide-react';

export const HomeHero: React.FC = () => {
  const { 
    setActiveTab, 
    globalSearchQuery, 
    setGlobalSearchQuery, 
    setIsAddAlumniModalOpen,
    setIsAuthModalOpen,
    currentUser,
    alumniList
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('directory');
  };

  const handlePillClick = (term: string) => {
    setGlobalSearchQuery(term);
    setActiveTab('directory');
  };

  return (
    <section className="relative bg-gradient-to-b from-[#1a1a1a] via-[#1f1d1b] to-[#181615] border-b border-[#383430] overflow-hidden py-12 md:py-16">
      
      {/* Background architectural ornamental aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#8d7d70]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#c99c7b]/5 blur-2xl pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* University Proclamation & Locania Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242220] text-[#c99c7b] text-xs font-semibold uppercase tracking-widest border border-[#3e3833]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8d7d70]"></span>
            <span>Gautam Buddha University • AlumNet</span>
          </div>

          {/* Big and Clear Motto Display */}
          <div className="py-2">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#c99c7b] font-bold font-mono mb-2">
              University Alumni Motto
            </div>
            <h1 className="font-locania text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#f5f2ed] tracking-wider uppercase flex items-center justify-center gap-3 sm:gap-6 flex-wrap drop-shadow-md">
              <span className="text-[#f5f2ed]">Discover</span>
              <span className="text-[#8d7d70] text-3xl sm:text-5xl">•</span>
              <span className="text-[#f5f2ed]">Connect</span>
              <span className="text-[#8d7d70] text-3xl sm:text-5xl">•</span>
              <span className="text-[#c99c7b]">Grow</span>
            </h1>
            <div className="w-36 sm:w-48 h-1 bg-gradient-to-r from-transparent via-[#8d7d70] to-transparent mx-auto mt-3"></div>
          </div>

          <h2 className="font-locania text-xl sm:text-2xl lg:text-3xl font-bold text-[#d6cfc7] tracking-normal leading-snug">
            Uniting Gautam Buddha University Graduates Worldwide
          </h2>

          <p className="text-sm sm:text-base text-[#a1958b] font-editorial text-[17px] sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            From the serene 511-acre Greater Noida campus to global centers of technology, governance, sciences, and enterprise. Discover batchmates, unlock career mentorship, and empower the next generation.
          </p>
        </div>

        {/* Central Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex items-center bg-[#242220] rounded-xl shadow-2xl border border-[#383430] p-1.5 transition-all focus-within:ring-2 focus-within:ring-[#8d7d70]"
          >
            <div className="pl-3.5 pr-2 text-[#a1958b]">
              <Search className="w-5 h-5 text-[#c99c7b]" />
            </div>
            <input
              id="hero-alumni-search-input"
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search by alumnus name, batch year, school (e.g. SoICT, SoM), role or company..."
              className="w-full py-2.5 text-xs sm:text-sm text-[#f5f2ed] placeholder-[#78716c] focus:outline-none bg-transparent"
            />
            <button
              id="hero-search-submit-btn"
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#8d7d70] text-[#141414] text-xs sm:text-sm font-bold hover:bg-[#a1958b] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 text-[#141414]" />
            </button>
          </form>

          {/* Search suggestions pills with working moving right scroll button */}
          <div className="mt-3 text-xs">
            <div className="flex items-center justify-between text-[11px] text-[#78716c] mb-1 px-1">
              <span className="font-semibold uppercase tracking-wider text-[#a1958b]">
                Popular Search Queries:
              </span>
              <span className="hidden sm:inline text-[10px] text-[#78716c]">
                Scroll queries right →
              </span>
            </div>
            
            <ScrollableOptionsBar idPrefix="hero-queries" step={200}>
              {[
                'SoICT Tech', 
                'IAS / UPPSC', 
                'Google', 
                'SoM MBA', 
                'Uber', 
                'Biotech R&D', 
                '2015 Batch', 
                'Available Mentors',
                'McKinsey',
                'SoE Engineering',
                'Supreme Court Law',
                'Delhi-NCR',
                'Bengaluru Alums'
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handlePillClick(tag)}
                  className="px-3 py-1 rounded-md bg-[#282522] hover:bg-[#34302c] border border-[#3e3833] text-[#d6cfc7] hover:text-white text-[11px] font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </ScrollableOptionsBar>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            id="hero-explore-directory-btn"
            onClick={() => setActiveTab('directory')}
            className="px-5 py-2.5 rounded-lg bg-[#2d2a27] text-[#f5f2ed] text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#3a3530] transition-colors shadow-xs flex items-center gap-2 cursor-pointer border border-[#48423c]"
          >
            <GraduationCap className="w-4 h-4 text-[#c99c7b]" />
            <span>Search Alumni Directory</span>
          </button>

          <button
            id="hero-open-mentorship-btn"
            onClick={() => setActiveTab('mentorship')}
            className="px-5 py-2.5 rounded-lg bg-[#242220] text-[#c99c7b] text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#2d2a27] border border-[#48423c] transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#c99c7b]" />
            <span>Mentorship Portal</span>
          </button>

          <button
            id="hero-add-alumni-btn"
            onClick={() => setIsAddAlumniModalOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-[#8d7d70] text-[#141414] text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#a1958b] border border-[#a1958b] transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Alumni Record</span>
          </button>

          {!currentUser && (
            <button
              id="hero-join-network-btn"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-[#242220] hover:bg-[#2d2a27] text-[#f5f2ed] text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-[#383430] flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#c99c7b]" />
              <span>Login / Register</span>
            </button>
          )}
        </div>

        {/* Real-time University Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          
          <div className="bg-[#242220]/90 backdrop-blur-xs p-4 rounded-xl border border-[#383430] text-center shadow-lg">
            <div className="w-8 h-8 rounded-full bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833] flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-[#f5f2ed]">
              {alumniList.length + 5820}+
            </p>
            <p className="text-[11px] font-semibold text-[#a1958b] uppercase tracking-wider">
              Graduated Alumni
            </p>
          </div>

          <div className="bg-[#242220]/90 backdrop-blur-xs p-4 rounded-xl border border-[#383430] text-center shadow-lg">
            <div className="w-8 h-8 rounded-full bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833] flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-[#f5f2ed]">
              8 Schools
            </p>
            <p className="text-[11px] font-semibold text-[#a1958b] uppercase tracking-wider">
              Academic Faculties
            </p>
          </div>

          <div className="bg-[#242220]/90 backdrop-blur-xs p-4 rounded-xl border border-[#383430] text-center shadow-lg">
            <div className="w-8 h-8 rounded-full bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833] flex items-center justify-center mx-auto mb-2">
              <Globe2 className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-[#f5f2ed]">
              48+
            </p>
            <p className="text-[11px] font-semibold text-[#a1958b] uppercase tracking-wider">
              Countries Reached
            </p>
          </div>

          <div className="bg-[#242220]/90 backdrop-blur-xs p-4 rounded-xl border border-[#383430] text-center shadow-lg">
            <div className="w-8 h-8 rounded-full bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833] flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-[#f5f2ed]">
              340+
            </p>
            <p className="text-[11px] font-semibold text-[#a1958b] uppercase tracking-wider">
              Verified Mentors
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
