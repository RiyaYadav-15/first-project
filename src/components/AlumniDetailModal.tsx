import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Github, 
  Sparkles, 
  Bookmark, 
  ShieldCheck, 
  UserCheck, 
  MessageSquare
} from 'lucide-react';

export const AlumniDetailModal: React.FC = () => {
  const { 
    selectedAlumniForDetail, 
    setSelectedAlumniForDetail, 
    setSelectedMentorForBooking,
    sendConnectionRequest, 
    toggleBookmark,
    currentUser 
  } = useApp();

  if (!selectedAlumniForDetail) return null;

  const a = selectedAlumniForDetail;
  const isBookmarked = currentUser?.savedAlumniIds.includes(a.id);
  const isConnected = currentUser?.connectedAlumniIds.includes(a.id);
  const isPending = currentUser?.pendingRequests.includes(a.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="alumni-detail-modal-card"
        className="relative w-full max-w-2xl bg-[#0f0f12] rounded-xl shadow-2xl border border-[#27272a] overflow-hidden my-6 text-white"
      >
        {/* Modal Top Header with university heritage banner */}
        <div className="h-28 bg-[#042f2e] border-b border-[#0f766e] relative p-4 flex items-start justify-between">
          <div className="flex items-center gap-2 text-[#2dd4bf] text-xs">
            <GraduationCap className="w-4 h-4 text-[#2dd4bf]" />
            <span className="font-locania uppercase tracking-widest text-[11px] font-bold">
              GBU Alumni Profile
            </span>
          </div>

          <button
            id="close-alumni-modal-btn"
            onClick={() => setSelectedAlumniForDetail(null)}
            className="w-8 h-8 rounded-full bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#27272a]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 pt-0 relative">
          
          {/* Avatar and Top Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="relative">
              <img
                src={a.avatarUrl}
                alt={a.fullName}
                className="w-24 h-24 rounded-xl object-cover border-4 border-[#0f0f12] shadow-md bg-[#18181b]"
              />
              {a.verified && (
                <span 
                  title="Verified GBU Alumnus"
                  className="absolute bottom-1 right-1 p-1 rounded-full bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e] shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(a.id)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#042f2e] border-[#0d9488] text-[#2dd4bf]'
                    : 'bg-[#18181b] border-[#27272a] text-[#a1a1aa] hover:text-white'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark profile'}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              {a.isAvailableForMentoring && (
                <button
                  id="modal-request-mentor-btn"
                  onClick={() => {
                    setSelectedMentorForBooking(a);
                    setSelectedAlumniForDetail(null);
                  }}
                  className="px-3 py-2 rounded-lg bg-[#0d9488] text-white text-xs font-bold hover:bg-[#0f766e] transition-colors cursor-pointer flex items-center gap-1.5 border border-[#0d9488] shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Request Mentorship</span>
                </button>
              )}

              <button
                id="modal-connect-btn"
                onClick={() => sendConnectionRequest(a.id)}
                disabled={isConnected || isPending}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isConnected
                    ? 'bg-[#042f2e] text-[#2dd4bf] border border-[#0f766e]'
                    : isPending
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60 cursor-default'
                    : 'bg-[#18181b] text-[#2dd4bf] hover:bg-[#27272a] border border-[#27272a]'
                }`}
              >
                {isConnected ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Connected</span>
                  </>
                ) : isPending ? (
                  <>
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request Sent</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Alumnus Identity */}
          <div className="mb-5">
            <h3 className="font-locania text-2xl font-bold text-white">
              {a.fullName}
            </h3>
            <p className="text-sm font-semibold text-[#2dd4bf] flex items-center gap-1.5 mt-0.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{a.currentRole} at <strong className="text-white">{a.currentCompany}</strong></span>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#a1a1aa] mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span>{a.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span>Batch of {a.batchYear}</span>
              </span>
              {a.enrollmentNo && (
                <span className="text-[11px] bg-[#18181b] border border-[#27272a] px-2 py-0.5 rounded text-[#cbd5e1] font-mono">
                  Roll: {a.enrollmentNo}
                </span>
              )}
            </div>
          </div>

          {/* Academic Profile Details */}
          <div className="bg-[#18181b] p-3.5 rounded-lg border border-[#27272a] mb-5 space-y-1.5">
            <div className="text-xs">
              <span className="font-bold text-white">Faculty / School: </span>
              <span className="text-[#cbd5e1]">{a.school}</span>
            </div>
            <div className="text-xs">
              <span className="font-bold text-white">Degree: </span>
              <span className="text-[#cbd5e1]">{a.degree}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2dd4bf] mb-2">
              About & Career Journey
            </h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1] font-editorial text-[15px] sm:text-[16px] leading-relaxed">
              {a.bio}
            </p>
          </div>

          {/* Skills & Expertise */}
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2dd4bf] mb-2">
              Skills & Core Expertise
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {a.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#042f2e] text-[#2dd4bf] text-xs font-medium border border-[#0f766e]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mentorship Topics if available */}
          {a.isAvailableForMentoring && a.mentorshipTopics && a.mentorshipTopics.length > 0 && (
            <div className="mb-5 p-3.5 rounded-lg bg-[#18181b] border border-[#27272a]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2dd4bf] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span>Mentorship Offerings & Discussion Topics</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#cbd5e1]">
                {a.mentorshipTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#2dd4bf] font-bold">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact & Social Links */}
          <div className="pt-4 border-t border-[#27272a] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#2dd4bf]">
              <Mail className="w-4 h-4 text-[#2dd4bf]" />
              <span className="font-mono text-[11px]">{a.email}</span>
            </div>

            <div className="flex items-center gap-3">
              {a.linkedInUrl && (
                <a
                  href={a.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#18181b] hover:bg-[#27272a] text-white border border-[#27272a] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#2dd4bf]" />
                  <span>LinkedIn</span>
                </a>
              )}
              {a.githubUrl && (
                <a
                  href={a.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#18181b] hover:bg-[#27272a] text-white border border-[#27272a] transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-white" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
