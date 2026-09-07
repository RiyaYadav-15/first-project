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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="user-profile-modal-card"
        className="relative w-full max-w-3xl bg-[#242220] rounded-xl shadow-2xl border border-[#383430] overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#1c1a18] text-[#f5f2ed] px-6 py-4 flex items-center justify-between border-b border-[#383430] shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-10 h-10 rounded-full object-cover border border-[#383430]"
            />
            <div>
              <h3 className="font-locania text-lg font-bold text-[#f5f2ed] tracking-wide">
                {currentUser.fullName}
              </h3>
              <p className="text-[11px] text-[#c99c7b]">
                {currentUser.email} • {currentUser.role.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#2d2a27] hover:bg-[#383430] text-[#a1958b] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#383430]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation with working moving right scroll button */}
        <div className="border-b border-[#383430] bg-[#1c1a18] px-4 pt-2 shrink-0">
          <ScrollableOptionsBar idPrefix="profile-tabs" step={200} className="gap-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'profile'
                  ? 'border-[#8d7d70] text-[#f5f2ed] bg-[#242220]'
                  : 'border-transparent text-[#a1958b] hover:text-[#f5f2ed]'
              }`}
            >
              Edit Profile
            </button>

            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'connections'
                  ? 'border-[#8d7d70] text-[#f5f2ed] bg-[#242220]'
                  : 'border-transparent text-[#a1958b] hover:text-[#f5f2ed]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Connections ({currentUser.connectedAlumniIds.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('mentorships')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'mentorships'
                  ? 'border-[#8d7d70] text-[#f5f2ed] bg-[#242220]'
                  : 'border-transparent text-[#a1958b] hover:text-[#f5f2ed]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c99c7b]" />
              <span>Mentorship Sessions ({userMentorships.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'saved'
                  ? 'border-[#8d7d70] text-[#f5f2ed] bg-[#242220]'
                  : 'border-transparent text-[#a1958b] hover:text-[#f5f2ed]'
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
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Current Role / Designation</label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g. Lead Engineer, Student"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    placeholder="e.g. Amazon, Gautam Buddha University"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Graduation Batch Year</label>
                  <input
                    type="number"
                    value={batchYear}
                    onChange={(e) => setBatchYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">School / Faculty</label>
                  <select
                    value={school}
                    onChange={(e) => setSchool(e.target.value as SchoolType)}
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] focus:outline-none focus:border-[#8d7d70]"
                  >
                    {SCHOOL_OPTIONS.map((sch) => (
                      <option key={sch} value={sch} className="bg-[#242220]">
                        {sch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#d6cfc7] mb-1">Degree / Specialization</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech (CSE), MBA"
                    className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#d6cfc7] mb-1">Skills & Domains (comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. React, Machine Learning, System Design"
                  className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#d6cfc7] mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your story, current research, or what guidance you seek..."
                  className="w-full px-3 py-2 bg-[#1a1816] border border-[#383430] rounded-md text-[#f5f2ed] placeholder-[#78716c] focus:outline-none focus:border-[#8d7d70]"
                />
              </div>

              <div className="p-3 bg-[#1c1a18] border border-[#383430] rounded-md flex items-center gap-2">
                <input
                  type="checkbox"
                  id="profile-mentor-toggle"
                  checked={isAvailableForMentoring}
                  onChange={(e) => setIsAvailableForMentoring(e.target.checked)}
                  className="w-4 h-4 accent-[#8d7d70] rounded"
                />
                <label htmlFor="profile-mentor-toggle" className="font-semibold text-[#f5f2ed] cursor-pointer">
                  Available as an active alumni mentor on AlumNet
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-[#8d7d70] text-[#141414] font-bold uppercase tracking-wider hover:bg-[#a1958b] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#141414]" />
                  <span>Update Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: NETWORKING & CONNECTIONS */}
          {activeTab === 'connections' && (
            <div className="space-y-4">
              {currentUser.pendingRequests.length > 0 && (
                <div className="bg-[#1c1a18] border border-[#383430] p-4 rounded-xl">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#c99c7b] mb-2">
                    Pending Outgoing Requests ({currentUser.pendingRequests.length})
                  </h4>
                  <p className="text-xs text-[#a1958b]">
                    You have sent connection requests to verified alumni. You will be notified upon confirmation.
                  </p>
                </div>
              )}

              <h4 className="font-locania text-base font-bold text-[#f5f2ed]">
                Your Connected Alumni ({connectedAlumni.length})
              </h4>

              {connectedAlumni.length === 0 ? (
                <div className="p-8 text-center bg-[#1c1a18] rounded-xl border border-[#383430]">
                  <Users className="w-10 h-10 text-[#8d7d70] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#f5f2ed]">No active connections yet</p>
                  <p className="text-[11px] text-[#a1958b] mt-1">
                    Explore the directory and tap "Connect" on alumni cards to build your network.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {connectedAlumni.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 rounded-xl border border-[#383430] bg-[#1a1816] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={a.avatarUrl}
                          alt={a.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-[#383430]"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-[#f5f2ed] truncate">{a.fullName}</p>
                          <p className="text-[11px] text-[#c99c7b] truncate">{a.currentRole}</p>
                          <p className="text-[10px] text-[#a1958b] truncate">{a.currentCompany}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAlumniForDetail(a)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#2d2a27] hover:bg-[#383430] text-[#f5f2ed] border border-[#383430] shrink-0 transition-colors"
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
              <h4 className="font-locania text-base font-bold text-[#f5f2ed] mb-3">
                Your Scheduled & Pending Mentorship Sessions
              </h4>

              {userMentorships.length === 0 ? (
                <div className="p-8 text-center bg-[#1c1a18] rounded-xl border border-[#383430]">
                  <Sparkles className="w-10 h-10 text-[#8d7d70] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#f5f2ed]">No mentorship requests yet</p>
                  <p className="text-[11px] text-[#a1958b] mt-1">
                    Visit the Career Mentorship portal to book 1-on-1 sessions with senior alumni.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userMentorships.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl border border-[#383430] bg-[#1a1816] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#8d7d70]" />
                          <h5 className="font-bold text-xs text-[#f5f2ed]">
                            Session with {req.mentorName}
                          </h5>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          req.status === 'accepted' ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800' : 'bg-amber-950/70 text-amber-300 border border-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-[#c99c7b]">
                        Topic: {req.topic}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] text-[#a1958b]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#8d7d70]" />
                          <span>{req.requestedDate}</span>
                        </span>
                      </div>

                      <p className="text-xs text-[#d6cfc7] italic bg-[#242220] p-2.5 rounded border border-[#383430]">
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
              <h4 className="font-locania text-base font-bold text-[#f5f2ed] mb-3">
                Saved Alumni Profiles ({savedAlumni.length})
              </h4>

              {savedAlumni.length === 0 ? (
                <div className="p-8 text-center bg-[#1c1a18] rounded-xl border border-[#383430]">
                  <Bookmark className="w-10 h-10 text-[#8d7d70] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#f5f2ed]">No saved alumni</p>
                  <p className="text-[11px] text-[#a1958b] mt-1">
                    Bookmark alumni in the directory to quickly revisit their profiles later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAlumni.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 rounded-xl border border-[#383430] bg-[#1a1816] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={a.avatarUrl}
                          alt={a.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-[#383430]"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-[#f5f2ed] truncate">{a.fullName}</p>
                          <p className="text-[11px] text-[#c99c7b] truncate">{a.currentRole}</p>
                          <p className="text-[10px] text-[#a1958b] truncate">Batch {a.batchYear} • {a.currentCompany}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAlumniForDetail(a)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded bg-[#8d7d70] hover:bg-[#a1958b] text-[#141414] shrink-0 transition-colors"
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
