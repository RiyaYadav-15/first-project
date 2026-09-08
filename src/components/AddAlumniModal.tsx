import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolType, AlumniProfile } from '../types';
import { ScrollableOptionsBar } from './ScrollableOptionsBar';
import { 
  X, 
  UserPlus, 
  GraduationCap, 
  Building2, 
  Mail, 
  MapPin, 
  Linkedin, 
  Sparkles, 
  FileText,
  Check
} from 'lucide-react';

const SCHOOL_OPTIONS: SchoolType[] = [
  'School of Information & Communication Technology (SoICT)',
  'School of Management (SoM)',
  'School of Biotechnology (SoBT)',
  'School of Engineering (SoE)',
  'School of Vocational Studies & Applied Sciences (SoVSAS)',
  'School of Humanities & Social Sciences (SoHSS)',
  'School of Law, Justice & Governance (SoLJG)',
  'School of Buddhist Studies & Civilization (SoBSC)'
];

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580894732484-82559779ad0a?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
];

export const AddAlumniModal: React.FC = () => {
  const { isAddAlumniModalOpen, setIsAddAlumniModalOpen, addAlumni, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [batchYear, setBatchYear] = useState<number>(2020);
  const [school, setSchool] = useState<SchoolType>(SCHOOL_OPTIONS[0]);
  const [degree, setDegree] = useState('B.Tech in Computer Science');
  const [currentRole, setCurrentRole] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [location, setLocation] = useState('Noida, India');
  const [country, setCountry] = useState('India');
  const [email, setEmail] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATARS[0]);
  const [bio, setBio] = useState('');
  const [skillsInput, setSkillsInput] = useState('Distributed Systems, Cloud, Leadership');
  const [industry, setIndustry] = useState('Technology');
  const [isAvailableForMentoring, setIsAvailableForMentoring] = useState(true);
  const [mentorshipTopicsInput, setMentorshipTopicsInput] = useState('Career advice, Interview prep, Code reviews');

  if (!isAddAlumniModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !currentRole.trim() || !currentCompany.trim()) {
      showToast('Please fill in all mandatory fields (Name, Email, Role, Company).');
      return;
    }

    const skills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const mentorshipTopics = mentorshipTopicsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newProfile: Omit<AlumniProfile, 'id' | 'verified'> = {
      fullName: fullName.trim(),
      enrollmentNo: enrollmentNo.trim() || undefined,
      batchYear: Number(batchYear),
      school,
      degree: degree.trim(),
      currentRole: currentRole.trim(),
      currentCompany: currentCompany.trim(),
      location: location.trim(),
      country: country.trim(),
      email: email.trim(),
      linkedInUrl: linkedInUrl.trim() || undefined,
      avatarUrl,
      bio: bio.trim() || `Graduate of Gautam Buddha University, ${school}, batch of ${batchYear}.`,
      skills: skills.length > 0 ? skills : ['Leadership', 'Problem Solving'],
      isAvailableForMentoring,
      mentorshipTopics: isAvailableForMentoring ? mentorshipTopics : [],
      industry,
      featured: false
    };

    addAlumni(newProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="add-alumni-modal-card"
        className="relative w-full max-w-2xl bg-[#0f0f12] rounded-xl shadow-2xl border border-[#27272a] overflow-hidden my-6 text-white"
      >
        {/* Header */}
        <div className="bg-[#18181b] text-white px-6 py-4 flex items-center justify-between border-b border-[#27272a]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]">
              <UserPlus className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-locania text-lg font-bold text-white tracking-wide uppercase">
                Add Alumni Record
              </h3>
              <p className="text-[11px] text-[#2dd4bf] font-medium">
                Record a graduate into the official Gautam Buddha University directory
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddAlumniModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#3f3f46]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          
          {/* Avatar selector with working moving right scroll button */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2dd4bf]">
                Select Profile Avatar
              </label>
              <span className="text-[10px] text-[#a1a1aa]">
                Scroll avatars right →
              </span>
            </div>

            <ScrollableOptionsBar idPrefix="modal-avatars" step={180}>
              {DEFAULT_AVATARS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Avatar option ${i}`}
                  onClick={() => setAvatarUrl(url)}
                  className={`w-11 h-11 rounded-full object-cover cursor-pointer border-2 transition-transform hover:scale-105 shrink-0 ${
                    avatarUrl === url ? 'border-[#2dd4bf] ring-2 ring-[#0d9488]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </ScrollableOptionsBar>
          </div>

          {/* Full Name & Enrollment No */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Full Name *
              </label>
              <input
                id="add-alumni-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Varun Kashyap"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                GBU Enrollment / Roll No (Optional)
              </label>
              <input
                id="add-alumni-enrollment"
                type="text"
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value)}
                placeholder="e.g. 16/ICT/055"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>
          </div>

          {/* School Selection */}
          <div>
            <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
              GBU School / Faculty *
            </label>
            <select
              id="add-alumni-school"
              value={school}
              onChange={(e) => setSchool(e.target.value as SchoolType)}
              className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
            >
              {SCHOOL_OPTIONS.map((sch) => (
                <option key={sch} value={sch} className="bg-[#18181b] text-white">
                  {sch}
                </option>
              ))}
            </select>
          </div>

          {/* Batch Year & Degree */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Graduation Year / Batch *
              </label>
              <input
                id="add-alumni-batch"
                type="number"
                min="2008"
                max="2030"
                required
                value={batchYear}
                onChange={(e) => setBatchYear(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Degree / Program *
              </label>
              <input
                id="add-alumni-degree"
                type="text"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.Tech (ECE), MBA, M.Tech"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>
          </div>

          {/* Current Role & Current Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Current Role / Designation *
              </label>
              <input
                id="add-alumni-role"
                type="text"
                required
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="e.g. Engineering Manager, IAS Officer"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Organization / Company *
              </label>
              <input
                id="add-alumni-company"
                type="text"
                required
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                placeholder="e.g. Amazon, Government of India"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>
          </div>

          {/* Industry & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Industry Sector
              </label>
              <select
                id="add-alumni-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
              >
                <option value="Technology" className="bg-[#18181b] text-white">Technology & Software</option>
                <option value="Civil Services & Governance" className="bg-[#18181b] text-white">Civil Services & Govt</option>
                <option value="Finance & Consulting" className="bg-[#18181b] text-white">Finance & Consulting</option>
                <option value="Biotechnology & Healthcare" className="bg-[#18181b] text-white">Biotech & Healthcare</option>
                <option value="Infrastructure & Engineering" className="bg-[#18181b] text-white">Core Engineering</option>
                <option value="Legal Services" className="bg-[#18181b] text-white">Legal & Judiciary</option>
                <option value="Startups & Venture Capital" className="bg-[#18181b] text-white">Startups & Venture</option>
                <option value="Academia & Research" className="bg-[#18181b] text-white">Academia & Research</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                City / Region
              </label>
              <input
                id="add-alumni-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Country
              </label>
              <input
                id="add-alumni-country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. India, USA, UK"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>
          </div>

          {/* Email & LinkedIn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                Contact Email *
              </label>
              <input
                id="add-alumni-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alumnus@company.com"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
                LinkedIn Profile URL
              </label>
              <input
                id="add-alumni-linkedin"
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>
          </div>

          {/* Skills comma separated */}
          <div>
            <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
              Skills / Core Competencies (comma separated)
            </label>
            <input
              id="add-alumni-skills"
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. Cloud Architecture, Python, Financial Strategy"
              className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          {/* Mentorship Options */}
          <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-md space-y-2">
            <div className="flex items-center gap-2">
              <input
                id="add-alumni-is-mentor"
                type="checkbox"
                checked={isAvailableForMentoring}
                onChange={(e) => setIsAvailableForMentoring(e.target.checked)}
                className="w-4 h-4 accent-[#0d9488] rounded cursor-pointer"
              />
              <label htmlFor="add-alumni-is-mentor" className="text-xs font-bold text-white cursor-pointer">
                Available to mentor GBU graduates & current students
              </label>
            </div>

            {isAvailableForMentoring && (
              <div>
                <label className="block text-[10.5px] font-medium text-[#2dd4bf] mb-1">
                  Mentorship Topics (comma separated)
                </label>
                <input
                  id="add-alumni-topics"
                  type="text"
                  value={mentorshipTopicsInput}
                  onChange={(e) => setMentorshipTopicsInput(e.target.value)}
                  placeholder="e.g. System Design, UPSC GS prep, Startup pitching"
                  className="w-full px-2.5 py-1.5 text-xs bg-[#0f0f12] border border-[#27272a] rounded text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                />
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[11px] font-semibold text-[#cbd5e1] mb-1">
              Bio / Achievements / Campus Memories
            </label>
            <textarea
              id="add-alumni-bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief summary of professional journey, achievements, and fond memories of Gautam Buddha University..."
              className="w-full px-3 py-2 text-xs bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#27272a]">
            <button
              type="button"
              onClick={() => setIsAddAlumniModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#a1a1aa] hover:bg-[#18181b] rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-add-alumni-btn"
              type="submit"
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0d9488] hover:bg-[#0f766e] rounded-md transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 border border-[#0d9488]"
            >
              <Check className="w-4 h-4 text-white" />
              <span>Save to Database</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
