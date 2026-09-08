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
    <section className="relative bg-black border-b border-[#27272a] overflow-hidden py-12 md:py-16 text-white">
      
      {/* Background architectural ornamental aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#0d9488]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#14b8a6]/10 blur-2xl pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* University Proclamation & Locania Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042f2e] text-[#2dd4bf] text-xs font-semibold uppercase tracking-widest border border-[#0f766e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]"></span>
            <span>Gautam Buddha University • AlumNet</span>
          </div>

          {/* Big and Clear Motto Display */}
          <div className="py-2">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#2dd4bf] font-bold font-mono mb-2">
              University Alumni Motto
            </div>
            <h1 className="font-locania text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-wider uppercase flex items-center justify-center gap-3 sm:gap-6 flex-wrap drop-shadow-xs">
              <span className="text-white">Discover</span>
              <span className="text-[#14b8a6] text-3xl sm:text-5xl">•</span>
              <span className="text-white">Connect</span>
              <span className="text-[#14b8a6] text-3xl sm:text-5xl">•</span>
              <span className="text-[#2dd4bf]">Grow</span>
            </h1>
            <div className="w-36 sm:w-48 h-1 bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent mx-auto mt-3"></div>
          </div>

          <h2 className="font-locania text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-normal leading-snug">
            Uniting Gautam Buddha University Graduates Worldwide
          </h2>

          <p className="text-sm sm:text-base text-[#cbd5e1] font-editorial text-[17px] sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            From the serene 511-acre Greater Noida campus to global centers of technology, governance, sciences, and enterprise. Discover batchmates, unlock career mentorship, and empower the next generation.
          </p>
        </div>

        {/* Central Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex items-center bg-[#0a0a0a] rounded-xl shadow-lg border border-[#27272a] p-1.5 transition-all focus-within:ring-2 focus-within:ring-[#14b8a6]"
          >
            <div className="pl-3.5 pr-2 text-[#2dd4bf]">
              <Search className="w-5 h-5 text-[#2dd4bf]" />
            </div>
            <input
              id="hero-alumni-search-input"
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search by alumnus name, batch year, school (e.g. SoICT, SoM), role or company..."
              className="w-full py-2.5 text-xs sm:text-sm text-white placeholder-[#71717a] focus:outline-none bg-transparent"
            />
            <button
              id="hero-search-submit-btn"
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#0d9488] text-white text-xs sm:text-sm font-bold hover:bg-[#0f766e] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer border border-[#0d9488]"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Search suggestions pills with working moving right scroll button */}
          <div className="mt-3 text-xs">
            <div className="flex items-center justify-between text-[11px] text-[#a1a1aa] mb-1 px-1">
              <span className="font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Popular Search Queries:
              </span>
              <span className="hidden sm:inline text-[10px] text-[#71717a]">
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
                  className="px-3 py-1 rounded-md bg-[#18181b] hover:bg-[#042f2e] hover:text-[#2dd4bf] border border-[#27272a] hover:border-[#0d9488] text-[#cbd5e1] text-[11px] font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap shadow-2xs"
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
            className="px-5 py-2.5 rounded-lg bg-[#0d9488] text-white text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#0f766e] transition-colors shadow-sm flex items-center gap-2 cursor-pointer border border-[#0d9488]"
          >
            <GraduationCap className="w-4 h-4 text-white" />
            <span>Search Alumni Directory</span>
          </button>

          <button
            id="hero-open-mentorship-btn"
            onClick={() => setActiveTab('mentorship')}
            className="px-5 py-2.5 rounded-lg bg-[#18181b] text-[#2dd4bf] text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#042f2e] border border-[#27272a] hover:border-[#14b8a6] transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#2dd4bf]" />
            <span>Mentorship Portal</span>
          </button>

          <button
            id="hero-add-alumni-btn"
            onClick={() => setIsAddAlumniModalOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-[#0d9488] text-white text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#0f766e] border border-[#0d9488] transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Alumni Record</span>
          </button>

          {!currentUser && (
            <button
              id="hero-join-network-btn"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-white hover:text-[#2dd4bf] text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-[#27272a] flex items-center gap-1.5 shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#2dd4bf]" />
              <span>Login / Register</span>
            </button>
          )}
        </div>

        {/* Real-time University Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          
          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#27272a] text-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-white">
              {alumniList.length + 5820}+
            </p>
            <p className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">
              Graduated Alumni
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#27272a] text-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-white">
              8 Schools
            </p>
            <p className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">
              Academic Faculties
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#27272a] text-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mx-auto mb-2">
              <Globe2 className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-white">
              48+
            </p>
            <p className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">
              Countries Reached
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#27272a] text-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="font-locania text-2xl font-extrabold text-white">
              340+
            </p>
            <p className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">
              Verified Mentors
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
