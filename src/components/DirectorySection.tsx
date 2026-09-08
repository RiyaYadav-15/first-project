import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolType, AlumniProfile } from '../types';
import { ScrollableOptionsBar } from './ScrollableOptionsBar';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  Bookmark, 
  UserPlus, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  ShieldCheck, 
  Linkedin, 
  ExternalLink,
  ChevronRight,
  School
} from 'lucide-react';

const SCHOOL_CHIPS: { label: string; value: string; short: string }[] = [
  { label: 'All GBU Schools', value: 'All', short: 'All GBU' },
  { label: 'SoICT (Info & Comm Tech)', value: 'School of Information & Communication Technology (SoICT)', short: 'SoICT' },
  { label: 'SoM (Management)', value: 'School of Management (SoM)', short: 'SoM' },
  { label: 'SoBT (Biotechnology)', value: 'School of Biotechnology (SoBT)', short: 'SoBT' },
  { label: 'SoE (Engineering)', value: 'School of Engineering (SoE)', short: 'SoE' },
  { label: 'SoVSAS (Applied Sciences)', value: 'School of Vocational Studies & Applied Sciences (SoVSAS)', short: 'SoVSAS' },
  { label: 'SoHSS (Humanities & Social)', value: 'School of Humanities & Social Sciences (SoHSS)', short: 'SoHSS' },
  { label: 'SoLJG (Law & Justice)', value: 'School of Law, Justice & Governance (SoLJG)', short: 'SoLJG' },
  { label: 'SoBSC (Buddhist Studies)', value: 'School of Buddhist Studies & Civilization (SoBSC)', short: 'SoBSC' }
];

const INDUSTRY_CHIPS: { label: string; value: string }[] = [
  { label: 'All Sectors', value: 'All' },
  { label: 'Technology & AI', value: 'Technology' },
  { label: 'Civil Services & Govt', value: 'Civil Services & Governance' },
  { label: 'Finance & Strategy', value: 'Finance & Consulting' },
  { label: 'Biotech & Health', value: 'Biotechnology & Healthcare' },
  { label: 'Core Engineering', value: 'Infrastructure & Engineering' },
  { label: 'Legal & Law', value: 'Legal Services' },
  { label: 'Startups & VC', value: 'Startups & Venture Capital' },
];

const SCHOOL_OPTIONS: (SchoolType | 'All')[] = [
  'All',
  'School of Information & Communication Technology (SoICT)',
  'School of Management (SoM)',
  'School of Biotechnology (SoBT)',
  'School of Engineering (SoE)',
  'School of Vocational Studies & Applied Sciences (SoVSAS)',
  'School of Humanities & Social Sciences (SoHSS)',
  'School of Law, Justice & Governance (SoLJG)',
  'School of Buddhist Studies & Civilization (SoBSC)'
];

const BATCH_RANGES = [
  { label: 'All Batches', min: 2000, max: 2030 },
  { label: '2021 - 2025 (Recent)', min: 2021, max: 2025 },
  { label: '2016 - 2020 (Mid-level)', min: 2016, max: 2020 },
  { label: '2011 - 2015 (Senior)', min: 2011, max: 2015 },
  { label: '2008 - 2010 (Founding)', min: 2008, max: 2010 },
];

export const DirectorySection: React.FC = () => {
  const { 
    alumniList, 
    globalSearchQuery, 
    setGlobalSearchQuery,
    setSelectedAlumniForDetail,
    setSelectedMentorForBooking,
    sendConnectionRequest,
    toggleBookmark,
    setIsAddAlumniModalOpen,
    currentUser 
  } = useApp();

  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [selectedBatchRange, setSelectedBatchRange] = useState<string>('All Batches');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [onlyMentors, setOnlyMentors] = useState<boolean>(false);
  const [onlySaved, setOnlySaved] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter alumni
  const filteredAlumni = useMemo(() => {
    return alumniList.filter(item => {
      // Search query (name, company, role, skills, location)
      if (globalSearchQuery.trim()) {
        const query = globalSearchQuery.toLowerCase();
        const matchesName = item.fullName.toLowerCase().includes(query);
        const matchesCompany = item.currentCompany.toLowerCase().includes(query);
        const matchesRole = item.currentRole.toLowerCase().includes(query);
        const matchesSchool = item.school.toLowerCase().includes(query);
        const matchesDegree = item.degree.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesBatch = item.batchYear.toString().includes(query);
        const matchesSkill = item.skills.some(s => s.toLowerCase().includes(query));

        if (!matchesName && !matchesCompany && !matchesRole && !matchesSchool && !matchesDegree && !matchesLocation && !matchesBatch && !matchesSkill) {
          return false;
        }
      }

      // School filter
      if (selectedSchool !== 'All' && item.school !== selectedSchool) {
        return false;
      }

      // Batch filter
      if (selectedBatchRange !== 'All Batches') {
        const range = BATCH_RANGES.find(r => r.label === selectedBatchRange);
        if (range && (item.batchYear < range.min || item.batchYear > range.max)) {
          return false;
        }
      }

      // Industry filter
      if (selectedIndustry !== 'All' && item.industry !== selectedIndustry) {
        return false;
      }

      // Only Mentors
      if (onlyMentors && !item.isAvailableForMentoring) {
        return false;
      }

      // Only Saved Bookmarks
      if (onlySaved) {
        if (!currentUser || !currentUser.savedAlumniIds.includes(item.id)) {
          return false;
        }
      }

      return true;
    });
  }, [alumniList, globalSearchQuery, selectedSchool, selectedBatchRange, selectedIndustry, onlyMentors, onlySaved, currentUser]);

  const resetAllFilters = () => {
    setGlobalSearchQuery('');
    setSelectedSchool('All');
    setSelectedBatchRange('All Batches');
    setSelectedIndustry('All');
    setOnlyMentors(false);
    setOnlySaved(false);
  };

  return (
    <section id="directory-section" className="py-10 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#27272a]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Gautam Buddha University Database</span>
            </div>
            <h2 className="font-locania text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              Searchable Alumni Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 font-editorial text-[16px]">
              Explore verified records of GBU graduates across all departments, years, and global locations.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="directory-add-record-btn"
              onClick={() => setIsAddAlumniModalOpen(true)}
              className="px-4 py-2 rounded-md bg-[#0d9488] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0f766e] transition-colors shadow-2xs flex items-center gap-2 cursor-pointer border border-[#0d9488]"
            >
              <UserPlus className="w-4 h-4 text-white" />
              <span>Add Alumni Record</span>
            </button>

            {/* View toggle */}
            <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-md p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#042f2e] text-[#2dd4bf] font-bold shadow-xs border border-[#0f766e]' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-[#042f2e] text-[#2dd4bf] font-bold shadow-xs border border-[#0f766e]' : 'text-[#a1a1aa] hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0f0f12] rounded-xl border border-[#27272a] p-4 shadow-sm mb-6 space-y-3.5">
          
          {/* Top Search Field & Quick Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
              <input
                id="directory-search-input"
                type="text"
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder="Search alumni by name, roll no, company, role, skill..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]"
              />
            </div>

            {/* School Filter Dropdown */}
            <div className="md:col-span-4">
              <select
                id="filter-school"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488] cursor-pointer"
              >
                {SCHOOL_OPTIONS.map((sch) => (
                  <option key={sch} value={sch} className="bg-[#18181b] text-white">
                    {sch === 'All' ? 'All GBU Schools & Faculties' : sch}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Filter */}
            <div className="md:col-span-3">
              <select
                id="filter-batch"
                value={selectedBatchRange}
                onChange={(e) => setSelectedBatchRange(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488] cursor-pointer"
              >
                {BATCH_RANGES.map((b) => (
                  <option key={b.label} value={b.label} className="bg-[#18181b] text-white">
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* School Quick Options Ribbon with Working Moving Right Button */}
          <div className="pt-2 border-t border-[#27272a]">
            <div className="flex items-center justify-between text-[11px] text-[#a1a1aa] mb-1.5 px-0.5">
              <span className="font-bold uppercase tracking-wider text-[#2dd4bf] flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span>GBU Schools & Faculties ({SCHOOL_CHIPS.length - 1} Departments)</span>
              </span>
              <span className="text-[10.5px] text-[#71717a] hidden sm:inline">
                Scroll options right →
              </span>
            </div>

            <ScrollableOptionsBar idPrefix="dir-schools" step={260}>
              {SCHOOL_CHIPS.map((chip) => {
                const isActive = selectedSchool === chip.value;
                return (
                  <button
                    key={chip.value}
                    type="button"
                    onClick={() => setSelectedSchool(chip.value)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 border ${
                      isActive
                        ? 'bg-[#0d9488] text-white font-bold border-[#0d9488] shadow-xs'
                        : 'bg-[#18181b] text-[#cbd5e1] border-[#27272a] hover:bg-[#27272a] hover:text-[#2dd4bf] hover:border-[#0f766e]'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </ScrollableOptionsBar>
          </div>

          {/* Industry Quick Options Ribbon with Working Moving Right Button */}
          <div className="pt-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#a1a1aa] mb-1.5 px-0.5">
              <span className="font-bold uppercase tracking-wider text-[#2dd4bf] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span>Industry Sectors</span>
              </span>
              <span className="text-[10.5px] text-[#71717a] hidden sm:inline">
                Scroll sectors right →
              </span>
            </div>

            <ScrollableOptionsBar idPrefix="dir-industries" step={220}>
              {INDUSTRY_CHIPS.map((chip) => {
                const isActive = selectedIndustry === chip.value;
                return (
                  <button
                    key={chip.value}
                    type="button"
                    onClick={() => setSelectedIndustry(chip.value)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 border ${
                      isActive
                        ? 'bg-[#0d9488] text-white font-bold border-[#0d9488] shadow-xs'
                        : 'bg-[#18181b] text-[#cbd5e1] border-[#27272a] hover:bg-[#27272a] hover:text-[#2dd4bf] hover:border-[#0f766e]'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </ScrollableOptionsBar>
          </div>

          {/* Secondary Filter Row: Industry, Mentors Toggle, Bookmarks Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#27272a] text-xs">
            <div className="flex flex-wrap items-center gap-3">
              
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#2dd4bf] uppercase tracking-wider">
                  Industry:
                </span>
                <select
                  id="filter-industry"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="px-2 py-1 bg-[#18181b] border border-[#27272a] rounded text-xs text-white focus:outline-none focus:border-[#0d9488] cursor-pointer"
                >
                  <option value="All" className="bg-[#18181b] text-white">All Sectors</option>
                  <option value="Technology" className="bg-[#18181b] text-white">Technology & AI</option>
                  <option value="Civil Services & Governance" className="bg-[#18181b] text-white">Civil Services & Govt</option>
                  <option value="Finance & Consulting" className="bg-[#18181b] text-white">Finance & Consulting</option>
                  <option value="Biotechnology & Healthcare" className="bg-[#18181b] text-white">Biotech & Healthcare</option>
                  <option value="Infrastructure & Engineering" className="bg-[#18181b] text-white">Core Engineering</option>
                  <option value="Legal Services" className="bg-[#18181b] text-white">Legal & Law</option>
                  <option value="Startups & Venture Capital" className="bg-[#18181b] text-white">Startups</option>
                </select>
              </div>

              {/* Mentors toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#e4e4e7] font-medium">
                <input
                  type="checkbox"
                  checked={onlyMentors}
                  onChange={(e) => setOnlyMentors(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#0d9488] rounded"
                />
                <span className="text-xs">Mentors Only</span>
              </label>

              {/* Saved Bookmarks toggle */}
              {currentUser && (
                <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#e4e4e7] font-medium">
                  <input
                    type="checkbox"
                    checked={onlySaved}
                    onChange={(e) => setOnlySaved(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#0d9488] rounded"
                  />
                  <span className="text-xs">My Saved ({currentUser.savedAlumniIds.length})</span>
                </label>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#a1a1aa]">
                Showing <strong className="text-white">{filteredAlumni.length}</strong> of {alumniList.length} alumni
              </span>

              {(globalSearchQuery || selectedSchool !== 'All' || selectedBatchRange !== 'All Batches' || selectedIndustry !== 'All' || onlyMentors || onlySaved) && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#2dd4bf] hover:text-[#5eead4] flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* ALUMNI CARDS / TABLE VIEW */}
        {filteredAlumni.length === 0 ? (
          <div className="bg-[#0f0f12] rounded-xl border border-[#27272a] p-12 text-center max-w-lg mx-auto my-8 shadow-sm">
            <GraduationCap className="w-12 h-12 text-[#2dd4bf] mx-auto mb-3" />
            <h3 className="font-locania text-xl font-bold text-white mb-2">
              No alumni match the specified criteria
            </h3>
            <p className="text-xs text-[#a1a1aa] mb-6">
              Try adjusting your search terms, changing the school or batch filter, or add an alumnus to the directory.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-md bg-[#18181b] text-white text-xs font-semibold hover:bg-[#27272a] border border-[#27272a] transition-colors cursor-pointer shadow-2xs"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsAddAlumniModalOpen(true)}
                className="px-4 py-2 rounded-md bg-[#0d9488] text-white text-xs font-bold hover:bg-[#0f766e] transition-colors cursor-pointer border border-[#0d9488] shadow-xs"
              >
                Add This Alumnus
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAlumni.map((alumnus) => {
              const isBookmarked = currentUser?.savedAlumniIds.includes(alumnus.id);
              const isConnected = currentUser?.connectedAlumniIds.includes(alumnus.id);
              const isPending = currentUser?.pendingRequests.includes(alumnus.id);

              return (
                <div
                  key={alumnus.id}
                  id={`alumni-card-${alumnus.id}`}
                  className="bg-[#0f0f12] rounded-xl border border-[#27272a] hover:border-[#0d9488]/60 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top: Avatar & Tags */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="relative">
                        <img
                          src={alumnus.avatarUrl}
                          alt={alumnus.fullName}
                          className="w-14 h-14 rounded-full object-cover border border-[#0d9488]/40 bg-[#18181b]"
                        />
                        {alumnus.verified && (
                          <span 
                            title="Verified GBU Alumnus"
                            className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#042f2e] text-[#2dd4bf] border-2 border-black"
                          >
                            <ShieldCheck className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          onClick={() => toggleBookmark(alumnus.id)}
                          className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-[#042f2e] border-[#0f766e] text-[#2dd4bf]'
                              : 'bg-[#18181b] border-[#27272a] text-[#a1a1aa] hover:text-white'
                          }`}
                          title={isBookmarked ? 'Remove bookmark' : 'Bookmark alumnus'}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>

                        {alumnus.isAvailableForMentoring && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Mentor</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Alumnus Identity */}
                    <div className="mb-3">
                      <h4 
                        onClick={() => setSelectedAlumniForDetail(alumnus)}
                        className="font-locania text-lg font-bold text-white hover:text-[#2dd4bf] cursor-pointer transition-colors"
                      >
                        {alumnus.fullName}
                      </h4>
                      <p className="text-xs font-semibold text-[#2dd4bf] truncate mt-0.5">
                        {alumnus.currentRole}
                      </p>
                      <p className="text-xs text-[#a1a1aa] font-medium truncate flex items-center gap-1 mt-0.5">
                        <Briefcase className="w-3 h-3 text-[#2dd4bf] shrink-0" />
                        <span>{alumnus.currentCompany}</span>
                      </p>
                    </div>

                    {/* Academic info */}
                    <div className="bg-[#18181b] p-2.5 rounded-lg border border-[#27272a] text-[11px] text-[#a1a1aa] space-y-1 mb-3.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{alumnus.degree}</span>
                        <span className="text-[#2dd4bf] font-semibold">Batch {alumnus.batchYear}</span>
                      </div>
                      <p className="text-[10.5px] text-[#a1a1aa] truncate">
                        {alumnus.school}
                      </p>
                      <div className="flex items-center gap-1 text-[10.5px] text-[#a1a1aa] pt-0.5">
                        <MapPin className="w-3 h-3 text-[#2dd4bf] shrink-0" />
                        <span className="truncate">{alumnus.location}</span>
                      </div>
                    </div>

                    {/* Skills Chips */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {alumnus.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10.5px] bg-[#18181b] text-[#cbd5e1] border border-[#27272a] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {alumnus.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-[#2dd4bf] bg-[#042f2e] border border-[#0f766e] font-semibold">
                          +{alumnus.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#27272a] grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedAlumniForDetail(alumnus)}
                      className="py-1.5 px-3 rounded-md text-xs font-semibold text-[#e4e4e7] bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] transition-colors cursor-pointer text-center"
                    >
                      View Profile
                    </button>

                    {alumnus.isAvailableForMentoring ? (
                      <button
                        onClick={() => setSelectedMentorForBooking(alumnus)}
                        className="py-1.5 px-3 rounded-md text-xs font-bold text-white bg-[#0d9488] hover:bg-[#0f766e] transition-colors cursor-pointer text-center flex items-center justify-center gap-1 border border-[#0d9488] shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                        <span>Request</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => sendConnectionRequest(alumnus.id)}
                        disabled={isConnected || isPending}
                        className={`py-1.5 px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer text-center ${
                          isConnected
                            ? 'bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]'
                            : isPending
                            ? 'bg-amber-950/60 text-amber-300 border border-amber-700/50 cursor-default'
                            : 'bg-[#0d9488] border border-[#0d9488] text-white hover:bg-[#0f766e] shadow-2xs'
                        }`}
                      >
                        {isConnected ? 'Connected' : isPending ? 'Pending' : 'Connect'}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-[#0f0f12] rounded-xl border border-[#27272a] overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#18181b] border-b border-[#27272a] text-[11px] font-bold text-[#2dd4bf] uppercase tracking-wider">
                  <th className="py-3 px-4">Alumnus</th>
                  <th className="py-3 px-4">Role & Company</th>
                  <th className="py-3 px-4">School & Degree</th>
                  <th className="py-3 px-4">Batch</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {filteredAlumni.map((alumnus) => (
                  <tr key={alumnus.id} className="hover:bg-[#18181b]/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={alumnus.avatarUrl}
                          alt={alumnus.fullName}
                          className="w-8 h-8 rounded-full object-cover border border-[#0d9488]/40"
                        />
                        <div>
                          <p 
                            onClick={() => setSelectedAlumniForDetail(alumnus)}
                            className="font-bold text-white hover:text-[#2dd4bf] cursor-pointer"
                          >
                            {alumnus.fullName}
                          </p>
                          <p className="text-[10px] text-[#a1a1aa] font-mono">{alumnus.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#2dd4bf]">{alumnus.currentRole}</p>
                      <p className="text-[#a1a1aa] text-[11px]">{alumnus.currentCompany}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-white truncate max-w-xs">{alumnus.degree}</p>
                      <p className="text-[10px] text-[#a1a1aa] truncate max-w-xs">{alumnus.school.split('(')[1]?.replace(')', '') || alumnus.school}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#2dd4bf]">
                      {alumnus.batchYear}
                    </td>
                    <td className="py-3 px-4 text-[#a1a1aa]">
                      {alumnus.location}
                    </td>
                    <td className="py-3 px-4">
                      {alumnus.isAvailableForMentoring ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]">
                          Mentor
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
                          Alumni
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedAlumniForDetail(alumnus)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-[#18181b] border border-[#27272a] text-white hover:bg-[#27272a] hover:text-[#2dd4bf] cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
