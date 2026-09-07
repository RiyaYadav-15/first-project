import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENTORSHIP_TRACKS } from '../data/initialData';
import { JobOpportunity } from '../types';
import { ScrollableOptionsBar } from './ScrollableOptionsBar';
import { 
  Sparkles, 
  Code2, 
  Briefcase, 
  Landmark, 
  Dna, 
  Scale, 
  Rocket, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  PlusCircle, 
  Building2, 
  Search,
  Users,
  ShieldCheck,
  Send,
  Compass
} from 'lucide-react';

export const MentorshipPortal: React.FC = () => {
  const { 
    alumniList, 
    setSelectedMentorForBooking, 
    setSelectedAlumniForDetail,
    jobs,
    postJob,
    currentUser,
    setIsAuthModalOpen,
    showToast 
  } = useApp();

  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [mentorSearch, setMentorSearch] = useState<string>('');
  const [jobFilter, setJobFilter] = useState<string>('All');
  
  // Job posting modal state
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Delhi-NCR / Remote');
  const [newJobType, setNewJobType] = useState<'Full-time' | 'Internship'>('Full-time');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobEmail, setNewJobEmail] = useState('');
  const [newJobSkills, setNewJobSkills] = useState('React, Node.js, SQL');

  // Filter verified mentors
  const mentors = alumniList.filter(a => {
    if (!a.isAvailableForMentoring) return false;
    if (mentorSearch.trim()) {
      const q = mentorSearch.toLowerCase();
      const match = a.fullName.toLowerCase().includes(q) ||
        a.currentRole.toLowerCase().includes(q) ||
        a.currentCompany.toLowerCase().includes(q) ||
        a.skills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedTrack !== 'All') {
      if (selectedTrack === 'Technology' && a.industry !== 'Technology') return false;
      if (selectedTrack === 'Management' && !a.industry.includes('Finance') && !a.degree.includes('MBA')) return false;
      if (selectedTrack === 'Civil Services' && !a.industry.includes('Civil')) return false;
      if (selectedTrack === 'Biotechnology' && !a.school.includes('Biotechnology')) return false;
      if (selectedTrack === 'Law' && !a.school.includes('Law')) return false;
      if (selectedTrack === 'Entrepreneurship' && !a.currentRole.includes('Founder') && !a.industry.includes('Startups')) return false;
    }
    return true;
  });

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-[#c99c7b]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#c99c7b]" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-[#c99c7b]" />;
      case 'Dna': return <Dna className="w-5 h-5 text-[#c99c7b]" />;
      case 'Scale': return <Scale className="w-5 h-5 text-[#c99c7b]" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-[#c99c7b]" />;
      default: return <Sparkles className="w-5 h-5 text-[#c99c7b]" />;
    }
  };

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle || !newJobCompany || !newJobEmail) {
      showToast('Please fill in title, company, and application email.');
      return;
    }

    const jobData: Omit<JobOpportunity, 'id' | 'postedAt'> = {
      title: newJobTitle,
      company: newJobCompany,
      location: newJobLocation,
      type: newJobType,
      postedByAlumniName: currentUser ? currentUser.fullName : 'GBU Alumnus',
      postedByBatch: currentUser?.batchYear || 2020,
      postedBySchool: currentUser?.school ? currentUser.school.split('(')[1]?.replace(')', '') : 'SoICT',
      description: newJobDesc || `Exciting opportunity at ${newJobCompany}. GBU applicants will be referred directly.`,
      applicationUrlOrEmail: newJobEmail,
      skillsRequired: newJobSkills.split(',').map(s => s.trim()).filter(Boolean)
    };

    postJob(jobData);
    setIsPostJobModalOpen(false);
    // Reset
    setNewJobTitle('');
    setNewJobCompany('');
    setNewJobDesc('');
  };

  return (
    <div id="career-mentorship-portal" className="py-10 px-4 sm:px-6 lg:px-8 bg-[#1a1816]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-[#1f1d1b] via-[#242220] to-[#1c1a18] rounded-2xl p-6 sm:p-10 text-white shadow-xl border border-[#383430] mb-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d2a27] text-[#c99c7b] text-xs font-semibold uppercase tracking-wider border border-[#3e3833]">
              <Sparkles className="w-3.5 h-3.5 text-[#c99c7b]" />
              <span>GBU Career Mentorship Network</span>
            </div>
            
            <h2 className="font-locania text-2xl sm:text-4xl font-extrabold tracking-wide text-[#f5f2ed]">
              Bridge the Gap Between Campus & Global Careers
            </h2>
            
            <p className="text-xs sm:text-sm text-[#a1958b] font-editorial text-[16px] sm:text-[18px] leading-relaxed">
              Connect directly with alumni mentors excelling in global tech giants, civil services, Tier-1 consulting, biotechnology labs, and venture-backed startups.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#available-mentors"
                className="px-4 py-2 bg-[#8d7d70] text-[#141414] hover:bg-[#a1958b] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Browse Mentors ({mentors.length})
              </a>
              <a
                href="#alumni-job-board"
                className="px-4 py-2 bg-[#2d2a27] text-[#c99c7b] hover:bg-[#383430] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#3e3833] transition-colors cursor-pointer"
              >
                Job & Referral Board ({jobs.length})
              </a>
            </div>
          </div>
        </div>

        {/* Mentorship Tracks Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c99c7b]">
                Structured Guidance
              </span>
              <h3 className="font-locania text-xl sm:text-2xl font-bold text-[#f5f2ed]">
                Mentorship Tracks for Graduates
              </h3>
            </div>
            {selectedTrack !== 'All' && (
              <button
                onClick={() => setSelectedTrack('All')}
                className="text-xs font-semibold text-[#c99c7b] hover:underline cursor-pointer"
              >
                Show All Tracks
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MENTORSHIP_TRACKS.map((track) => {
              const isSelected = selectedTrack === track.category;
              return (
                <div
                  key={track.id}
                  onClick={() => setSelectedTrack(isSelected ? 'All' : track.category)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#2d2a27] text-white border-[#8d7d70] shadow-md ring-2 ring-[#8d7d70]'
                      : 'bg-[#242220] text-[#f5f2ed] border-[#383430] hover:border-[#504842] hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-[#1c1a18] border border-[#383430]">
                        {getTrackIcon(track.iconName)}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#383430] ${
                        isSelected ? 'bg-[#383430] text-[#c99c7b]' : 'bg-[#1c1a18] text-[#c99c7b]'
                      }`}>
                        {track.activeMentorCount} Mentors
                      </span>
                    </div>

                    <h4 className="font-locania text-base font-bold mb-1 text-[#f5f2ed]">
                      {track.title}
                    </h4>

                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-[#d6cfc7]' : 'text-[#a1958b]'}`}>
                      {track.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#383430] flex items-center justify-between text-xs font-semibold text-[#c99c7b]">
                    <span>{isSelected ? 'Filter Active' : 'Filter by Track'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AVAILABLE MENTORS SECTION */}
        <div id="available-mentors" className="mb-14 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#383430]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c99c7b]">
                Book 1-on-1 Sessions
              </span>
              <h3 className="font-locania text-xl sm:text-2xl font-bold text-[#f5f2ed]">
                Verified Alumni Mentors ({mentors.length})
              </h3>
            </div>

            {/* Mentor Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716c]" />
              <input
                type="text"
                value={mentorSearch}
                onChange={(e) => setMentorSearch(e.target.value)}
                placeholder="Search mentors by topic, name, company..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#242220] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
              />
            </div>
          </div>

          {/* Quick Track Options with Working Moving Right Button */}
          <div className="mb-6 bg-[#201e1c] p-3 rounded-xl border border-[#383430]">
            <div className="flex items-center justify-between text-xs text-[#a1958b] mb-1.5 px-1">
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#c99c7b] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#c99c7b]" />
                <span>Filter Mentorship Fields</span>
              </span>
              <span className="text-[10.5px] text-[#78716c] hidden sm:inline">
                Click right arrow to view more fields →
              </span>
            </div>

            <ScrollableOptionsBar idPrefix="mentor-tracks" step={240}>
              {[
                { label: 'All Mentorship Tracks', value: 'All' },
                { label: '💻 Software & AI Systems', value: 'Technology' },
                { label: '📊 Tier-1 Consulting & Strategy', value: 'Management' },
                { label: '🏛️ Civil Services & Governance', value: 'Civil Services' },
                { label: '🧬 Biotechnology & Pharma R&D', value: 'Biotechnology' },
                { label: '⚖️ Judiciary & Corporate Law', value: 'Law' },
                { label: '🚀 Startup Founders & VC', value: 'Entrepreneurship' }
              ].map((opt) => {
                const isActive = selectedTrack === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedTrack(opt.value)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 border ${
                      isActive
                        ? 'bg-[#8d7d70] text-[#141414] font-bold border-[#8d7d70] shadow-xs'
                        : 'bg-[#242220] text-[#c99c7b] border-[#383430] hover:bg-[#2d2a27] hover:text-[#f5f2ed]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </ScrollableOptionsBar>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-[#242220] rounded-xl border border-[#383430] p-5 shadow-md flex flex-col justify-between hover:border-[#504842] transition-all"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.fullName}
                      className="w-14 h-14 rounded-full object-cover border border-[#8d7d70]"
                    />
                    <div className="min-w-0">
                      <h4 
                        onClick={() => setSelectedAlumniForDetail(mentor)}
                        className="font-locania text-base font-bold text-[#f5f2ed] hover:text-[#c99c7b] cursor-pointer truncate"
                      >
                        {mentor.fullName}
                      </h4>
                      <p className="text-xs font-semibold text-[#c99c7b] truncate">
                        {mentor.currentRole}
                      </p>
                      <p className="text-xs text-[#a1958b] truncate flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-[#8d7d70] shrink-0" />
                        <span>{mentor.currentCompany}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#a1958b] bg-[#1c1a18] p-2.5 rounded-lg mb-3 space-y-1 border border-[#383430]">
                    <p className="font-medium text-[#f5f2ed] truncate">
                      {mentor.degree} • Batch {mentor.batchYear}
                    </p>
                    <p className="text-[10.5px] text-[#8d7d70] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{mentor.location}</span>
                    </p>
                  </div>

                  {/* Mentorship Focus Areas */}
                  {mentor.mentorshipTopics && mentor.mentorshipTopics.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#c99c7b] mb-1">
                        Can Advise On:
                      </p>
                      <ul className="space-y-1 text-xs text-[#a1958b]">
                        {mentor.mentorshipTopics.slice(0, 2).map((top, idx) => (
                          <li key={idx} className="flex items-start gap-1 text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-[#c99c7b] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{top}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#383430] grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedAlumniForDetail(mentor)}
                    className="py-1.5 px-3 rounded-md text-xs font-semibold text-[#d6cfc7] bg-[#2d2a27] hover:bg-[#383430] hover:text-white border border-[#3e3833] transition-colors cursor-pointer text-center"
                  >
                    View Bio
                  </button>
                  <button
                    onClick={() => setSelectedMentorForBooking(mentor)}
                    className="py-1.5 px-3 rounded-md text-xs font-bold uppercase tracking-wider text-[#141414] bg-[#8d7d70] hover:bg-[#a1958b] transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#141414]" />
                    <span>Request</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALUMNI JOB & REFERRAL BOARD */}
        <div id="alumni-job-board" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#383430]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c99c7b]">
                Career Opportunities
              </span>
              <h3 className="font-locania text-xl sm:text-2xl font-bold text-[#f5f2ed]">
                Alumni Job & Referral Board
              </h3>
              <p className="text-xs text-[#a1958b] mt-0.5">
                Roles and internships posted directly by GBU alumni seeking to refer fellow graduates.
              </p>
            </div>

            <button
              onClick={() => {
                if (!currentUser) {
                  setIsAuthModalOpen(true);
                  showToast('Please sign in to post a career opportunity.');
                  return;
                }
                setIsPostJobModalOpen(true);
              }}
              className="px-4 py-2 rounded-md bg-[#8d7d70] text-[#141414] text-xs font-bold uppercase tracking-wider hover:bg-[#a1958b] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4 text-[#141414]" />
              <span>Post an Opportunity</span>
            </button>
          </div>

          {/* Job Filter Options with working moving right scroll button */}
          <div className="mb-4">
            <ScrollableOptionsBar idPrefix="job-roles" step={200}>
              {[
                { label: 'All Openings', value: 'All' },
                { label: 'Full-time Roles', value: 'Full-time' },
                { label: 'Graduate Internships', value: 'Internship' },
                { label: 'Software & Cloud', value: 'Tech' },
                { label: 'Strategy & Analysis', value: 'Consulting' }
              ].map((opt) => {
                const isActive = jobFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setJobFilter(opt.value)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 border ${
                      isActive
                        ? 'bg-[#c99c7b] text-[#141414] font-bold border-[#c99c7b] shadow-xs'
                        : 'bg-[#242220] text-[#a1958b] border-[#383430] hover:bg-[#2d2a27] hover:text-[#f5f2ed]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </ScrollableOptionsBar>
          </div>

          <div className="space-y-4">
            {jobs
              .filter(job => {
                if (jobFilter === 'All') return true;
                if (jobFilter === 'Full-time') return job.type === 'Full-time';
                if (jobFilter === 'Internship') return job.type === 'Internship';
                if (jobFilter === 'Tech') return job.skillsRequired.some(s => s.toLowerCase().includes('react') || s.toLowerCase().includes('python') || s.toLowerCase().includes('sql') || s.toLowerCase().includes('developer'));
                if (jobFilter === 'Consulting') return job.company.toLowerCase().includes('mckinsey') || job.title.toLowerCase().includes('consult') || job.title.toLowerCase().includes('analyst');
                return true;
              })
              .map((job) => (
              <div
                key={job.id}
                className="bg-[#242220] rounded-xl border border-[#383430] p-5 shadow-md hover:border-[#504842] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-locania text-lg font-bold text-[#f5f2ed]">
                      {job.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-bold uppercase tracking-wider bg-[#2d2a27] text-[#c99c7b] border border-[#3e3833]">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#a1958b]">
                    <span className="flex items-center gap-1 font-semibold text-[#f5f2ed]">
                      <Building2 className="w-3.5 h-3.5 text-[#c99c7b]" />
                      <span>{job.company}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8d7d70]" />
                      <span>{job.location}</span>
                    </span>
                    <span className="text-[11px] text-[#c99c7b]">
                      Referred by: <strong>{job.postedByAlumniName}</strong> ({job.postedBySchool} '{job.postedByBatch})
                    </span>
                  </div>

                  <p className="text-xs text-[#d6cfc7] leading-relaxed max-w-3xl">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10.5px] bg-[#1c1a18] text-[#d6cfc7] border border-[#383430]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
                  <a
                    href={`mailto:${job.applicationUrlOrEmail}?subject=Application / Referral via GBU AlumNet: ${job.title}`}
                    className="px-4 py-2 rounded-md bg-[#8d7d70] text-[#141414] text-xs font-bold uppercase tracking-wider hover:bg-[#a1958b] transition-colors cursor-pointer flex items-center gap-1.5 text-center"
                  >
                    <span>Request Referral</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#141414]" />
                  </a>
                  <span className="text-[10px] text-[#78716c]">
                    Posted {job.postedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Post Job Modal */}
      {isPostJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#242220] rounded-xl shadow-2xl border border-[#383430] overflow-hidden my-6">
            <div className="bg-[#1c1a18] text-[#f5f2ed] px-6 py-4 flex items-center justify-between border-b border-[#383430]">
              <h3 className="font-locania text-lg font-bold text-[#f5f2ed] uppercase">
                Post Job or Internship for GBU Graduates
              </h3>
              <button
                onClick={() => setIsPostJobModalOpen(false)}
                className="text-[#a1958b] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#d6cfc7] mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  placeholder="e.g. Associate Product Manager"
                  className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={newJobCompany}
                    onChange={(e) => setNewJobCompany(e.target.value)}
                    placeholder="e.g. Swiggy, PwC, Amazon"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Employment Type</label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70]"
                  >
                    <option value="Full-time" className="bg-[#242220]">Full-time</option>
                    <option value="Internship" className="bg-[#242220]">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Location</label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    placeholder="e.g. Noida / Hybrid"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Referral / Application Email *</label>
                  <input
                    type="email"
                    required
                    value={newJobEmail}
                    onChange={(e) => setNewJobEmail(e.target.value)}
                    placeholder="alumni@company.com"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#d6cfc7] mb-1">Key Skills Required</label>
                <input
                  type="text"
                  value={newJobSkills}
                  onChange={(e) => setNewJobSkills(e.target.value)}
                  placeholder="e.g. Python, SQL, Financial modeling"
                  className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#d6cfc7] mb-1">Brief Description & Referral Notes</label>
                <textarea
                  rows={3}
                  value={newJobDesc}
                  onChange={(e) => setNewJobDesc(e.target.value)}
                  placeholder="Brief details about the team, required experience, and how GBU candidates can prepare..."
                  className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPostJobModalOpen(false)}
                  className="px-3 py-1.5 rounded text-[#a1958b] hover:bg-[#2d2a27] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#8d7d70] text-[#141414] font-bold uppercase hover:bg-[#a1958b] cursor-pointer"
                >
                  Post Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
