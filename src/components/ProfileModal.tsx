import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolType } from '../types';
import { ScrollableOptionsBar } from './ScrollableOptionsBar';
import { 
  X, 
  User, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Bookmark, 
  MessageSquare, 
  Calendar, 
  Check, 
  Save, 
  Building2, 
  CheckCircle2, 
  Users,
  Clock
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

export const ProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    currentUser, 
    updateProfile, 
    alumniList, 
    setSelectedAlumniForDetail,
    mentorshipRequests,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'connections' | 'mentorships' | 'saved'>('profile');

  // Edit fields
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [currentRole, setCurrentRole] = useState(currentUser?.currentRole || '');
  const [currentCompany, setCurrentCompany] = useState(currentUser?.currentCompany || '');
  const [degree, setDegree] = useState(currentUser?.degree || '');
  const [batchYear, setBatchYear] = useState<number>(currentUser?.batchYear || 2022);
  const [school, setSchool] = useState<SchoolType>(currentUser?.school || SCHOOL_OPTIONS[0]);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [skillsInput, setSkillsInput] = useState(currentUser?.skills.join(', ') || '');
  const [isAvailableForMentoring, setIsAvailableForMentoring] = useState(!!currentUser?.isAvailableForMentoring);

  if (!isProfileModalOpen || !currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    updateProfile({
      fullName,
      currentRole,
      currentCompany,
      degree,
      batchYear: Number(batchYear),
      school,
      bio,
      skills,
      isAvailableForMentoring
    });
  };

  // Connected alumni
  const connectedAlumni = alumniList.filter(a => currentUser.connectedAlumniIds.includes(a.id));
  const savedAlumni = alumniList.filter(a => currentUser.savedAlumniIds.includes(a.id));
  const userMentorships = mentorshipRequests.filter(
    r => r.senderId === currentUser.id || r.mentorId === currentUser.id
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="user-profile-modal-card"
        className="relative w-full max-w-3xl bg-[#0f0f12] rounded-xl shadow-2xl border border-[#27272a] overflow-hidden my-6 flex flex-col max-h-[90vh] text-white"
      >
        {/* Header */}
        <div className="bg-[#18181b] text-white px-6 py-4 flex items-center justify-between border-b border-[#27272a] shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-10 h-10 rounded-full object-cover border border-[#27272a]"
            />
            <div>
              <h3 className="font-locania text-lg font-bold text-white tracking-wide">
                {currentUser.fullName}
              </h3>
              <p className="text-[11px] text-[#2dd4bf] font-medium">
                {currentUser.email} • {currentUser.role.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#3f3f46]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation with working moving right scroll button */}
        <div className="border-b border-[#27272a] bg-[#18181b] px-4 pt-2 shrink-0">
          <ScrollableOptionsBar idPrefix="profile-tabs" step={200} className="gap-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'profile'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#0f0f12]'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              Edit Profile
            </button>

            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'connections'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#0f0f12]'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Connections ({currentUser.connectedAlumniIds.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('mentorships')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'mentorships'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#0f0f12]'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2dd4bf]" />
              <span>Mentorship Sessions ({userMentorships.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'saved'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#0f0f12]'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedAlumni.length})</span>
            </button>
          </ScrollableOptionsBar>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#cbd5e1] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#cbd5e1] mb-1">Current Role / Designation</label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g. Lead Engineer, Student"
                    className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#cbd5e1] mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    placeholder="e.g. Amazon, Gautam Buddha University"
                    className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#cbd5e1] mb-1">Graduation Batch Year</label>
                  <input
                    type="number"
                    value={batchYear}
                    onChange={(e) => setBatchYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#cbd5e1] mb-1">School / Faculty</label>
                  <select
                    value={school}
                    onChange={(e) => setSchool(e.target.value as SchoolType)}
                    className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white focus:outline-none focus:border-[#0d9488]"
                  >
                    {SCHOOL_OPTIONS.map((sch) => (
                      <option key={sch} value={sch} className="bg-[#18181b] text-white">
                        {sch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#cbd5e1] mb-1">Degree / Specialization</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech (CSE), MBA"
                    className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#cbd5e1] mb-1">Skills & Domains (comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. React, Machine Learning, System Design"
                  className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#cbd5e1] mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your story, current research, or what guidance you seek..."
                  className="w-full px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-md text-white placeholder-[#71717a] focus:outline-none focus:border-[#0d9488]"
                />
              </div>

              <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-md flex items-center gap-2">
                <input
                  type="checkbox"
                  id="profile-mentor-toggle"
                  checked={isAvailableForMentoring}
                  onChange={(e) => setIsAvailableForMentoring(e.target.checked)}
                  className="w-4 h-4 accent-[#0d9488] rounded cursor-pointer"
                />
                <label htmlFor="profile-mentor-toggle" className="font-semibold text-white cursor-pointer">
                  Available as an active alumni mentor on AlumNet
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-[#0d9488] text-white font-bold uppercase tracking-wider hover:bg-[#0f766e] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#0d9488] shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: NETWORKING & CONNECTIONS */}
          {activeTab === 'connections' && (
            <div className="space-y-4">
              {currentUser.pendingRequests.length > 0 && (
                <div className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#2dd4bf] mb-2">
                    Pending Outgoing Requests ({currentUser.pendingRequests.length})
                  </h4>
                  <p className="text-xs text-[#a1a1aa]">
                    You have sent connection requests to verified alumni. You will be notified upon confirmation.
                  </p>
                </div>
              )}

              <h4 className="font-locania text-base font-bold text-white">
                Your Connected Alumni ({connectedAlumni.length})
              </h4>

              {connectedAlumni.length === 0 ? (
                <div className="p-8 text-center bg-[#18181b] rounded-xl border border-[#27272a]">
                  <Users className="w-10 h-10 text-[#2dd4bf] mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">No active connections yet</p>
                  <p className="text-[11px] text-[#a1a1aa] mt-1">
                    Explore the directory and tap "Connect" on alumni cards to build your network.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {connectedAlumni.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 rounded-xl border border-[#27272a] bg-[#18181b] shadow-2xs flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={a.avatarUrl}
                          alt={a.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-[#27272a]"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-white truncate">{a.fullName}</p>
                          <p className="text-[11px] text-[#2dd4bf] font-medium truncate">{a.currentRole}</p>
                          <p className="text-[10px] text-[#a1a1aa] truncate">{a.currentCompany}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAlumniForDetail(a)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#042f2e] hover:bg-[#0f766e] text-[#2dd4bf] hover:text-white border border-[#0f766e] shrink-0 transition-colors cursor-pointer"
                      >
                        Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MENTORSHIP SESSIONS */}
          {activeTab === 'mentorships' && (
            <div className="space-y-3">
              <h4 className="font-locania text-base font-bold text-white mb-3">
                Your Scheduled & Pending Mentorship Sessions
              </h4>

              {userMentorships.length === 0 ? (
                <div className="p-8 text-center bg-[#18181b] rounded-xl border border-[#27272a]">
                  <Sparkles className="w-10 h-10 text-[#2dd4bf] mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">No mentorship requests yet</p>
                  <p className="text-[11px] text-[#a1a1aa] mt-1">
                    Visit the Career Mentorship portal to book 1-on-1 sessions with senior alumni.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userMentorships.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl border border-[#27272a] bg-[#18181b] shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#2dd4bf]" />
                          <h5 className="font-bold text-xs text-white">
                            Session with {req.mentorName}
                          </h5>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          req.status === 'accepted' ? 'bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]' : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-[#2dd4bf]">
                        Topic: {req.topic}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] text-[#a1a1aa]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#2dd4bf]" />
                          <span>{req.requestedDate}</span>
                        </span>
                      </div>

                      <p className="text-xs text-[#cbd5e1] italic bg-[#0f0f12] p-2.5 rounded border border-[#27272a]">
                        "{req.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SAVED BOOKMARKS */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              <h4 className="font-locania text-base font-bold text-white mb-3">
                Saved Alumni Profiles ({savedAlumni.length})
              </h4>

              {savedAlumni.length === 0 ? (
                <div className="p-8 text-center bg-[#18181b] rounded-xl border border-[#27272a]">
                  <Bookmark className="w-10 h-10 text-[#2dd4bf] mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">No saved alumni</p>
                  <p className="text-[11px] text-[#a1a1aa] mt-1">
                    Bookmark alumni in the directory to quickly revisit their profiles later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAlumni.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 rounded-xl border border-[#27272a] bg-[#18181b] shadow-2xs flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={a.avatarUrl}
                          alt={a.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-[#27272a]"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-white truncate">{a.fullName}</p>
                          <p className="text-[11px] text-[#2dd4bf] font-medium truncate">{a.currentRole}</p>
                          <p className="text-[10px] text-[#a1a1aa] truncate">Batch {a.batchYear} • {a.currentCompany}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAlumniForDetail(a)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded bg-[#0d9488] hover:bg-[#0f766e] text-white shrink-0 transition-colors border border-[#0d9488] shadow-xs cursor-pointer"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
